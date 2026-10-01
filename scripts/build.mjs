import { cp, mkdir, rm } from "node:fs/promises";
import { fileURLToPath } from "node:url";
const root = fileURLToPath(new URL("../", import.meta.url));
const output = new URL("../dist/", import.meta.url);
await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
for (const file of [
  "index.html",
  "styles.css",
  "app.js",
  "assets",
  ".nojekyll",
  "robots.txt",
  "sitemap.xml",
]) {
  await cp(`${root}${file}`, new URL(file, output), { recursive: true });
}
console.log("Static site built in dist/");
// Export the requested route as well as the standalone project preview.
// Copy only public page files, preserving the hosting site's other routes.
const mountedOutput = new URL("netes/", output);
await mkdir(mountedOutput, { recursive: true });
for (const file of [
  "index.html",
  "styles.css",
  "app.js",
  "assets",
  "sitemap.xml",
]) {
  await cp(new URL(file, output), new URL(file, mountedOutput), {
    recursive: true,
  });
}
console.log("Domain subdirectory export ready in dist/netes/");
