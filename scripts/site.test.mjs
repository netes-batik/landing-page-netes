import test from "node:test";
import assert from "node:assert/strict";
import { readFile, access } from "node:fs/promises";
import { createContext, runInContext } from "node:vm";
const context = createContext({ encodeURIComponent });
runInContext(
  await readFile(new URL("../app.js", import.meta.url), "utf8"),
  context,
);
const { whatsappUrl, CHAT_MESSAGES } = runInContext(
  "({ whatsappUrl, CHAT_MESSAGES })",
  context,
);
const html = await readFile(new URL("../index.html", import.meta.url), "utf8");
test("purchase links reach the confirmed number with prefilled messages", () => {
  const links = [...html.matchAll(/href="(https:\/\/wa\.me\/[^"]+)"/g)];
  assert.ok(links.length >= 7);
  for (const [, href] of links) {
    const url = new URL(href);
    assert.equal(url.pathname, "/6287738212840");
    if (url.search)
      assert.match(url.searchParams.get("text"), /^Halo Netes Batik,/);
  }
  for (const product of Object.keys(CHAT_MESSAGES)) {
    assert.equal(
      new URL(whatsappUrl(product)).searchParams.get("text"),
      CHAT_MESSAGES[product],
    );
  }
});
test("all local navigation targets and production assets exist", async () => {
  const ids = new Set(
    [...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]),
  );
  for (const [, target] of html.matchAll(/href="#([^"]+)"/g))
    assert.ok(ids.has(target), target);
  for (const [, path] of html.matchAll(/(?:src|href)="\.\/([^"]+)"/g)) {
    await access(new URL(`../${path}`, import.meta.url));
  }
});
test("semantic and SEO basics are present without invented reviews or stock", () => {
  assert.match(html, /<html lang="id">/);
  assert.equal([...html.matchAll(/<h1\b/g)].length, 1);
  assert.match(html, /src="\.\/app.js" defer/);
  assert.match(html, /aria-controls="mobile-nav"/);
  for (const [, attrs] of html.matchAll(/<img\b([^>]+)>/g)) {
    assert.match(attrs, /alt="[^"]+"/);
    assert.match(attrs, /width="\d+"/);
    assert.match(attrs, /height="\d+"/);
  }
  const schema = JSON.parse(
    html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1],
  );
  assert.equal(schema.name, "Netes Batik");
  assert.equal(schema.foundingDate, "2014-12-25");
  assert.ok(!html.includes("aggregateRating"));
  assert.ok(!html.includes("InStock"));
  assert.ok(!html.includes("—"));
});
