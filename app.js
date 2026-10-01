// All CTAs have usable, prefilled links in HTML even when JavaScript is disabled.
const WHATSAPP_NUMBER = "6287738212840";
const CHAT_MESSAGES = Object.freeze({
  general:
    "Halo Netes Batik, saya melihat website dan ingin menanyakan produk yang tersedia. Boleh dibantu?",
  blangkon:
    "Halo Netes Batik, saya tertarik dengan blangkon alusan di website. Boleh minta foto motif, pilihan ukuran, stok, dan harga terbarunya?",
  jarik:
    "Halo Netes Batik, saya ingin melihat pilihan jarik di website. Boleh minta foto motif, detail kain, stok, dan harganya?",
  surjan:
    "Halo Netes Batik, saya ingin menanyakan surjan di website. Boleh minta foto, pilihan ukuran, stok, dan harganya?",
  price:
    "Halo Netes Batik, saya melihat panduan harga blangkon di website. Boleh minta pilihan motif dan harga terbarunya?",
});

function whatsappUrl(product = "general") {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(CHAT_MESSAGES[product] ?? CHAT_MESSAGES.general)}`;
}

if (typeof document !== "undefined") {
  document.querySelectorAll("[data-chat]").forEach((link) => {
    link.href = whatsappUrl(link.dataset.chat);
  });
  document.querySelector("#year").textContent = String(
    new Date().getFullYear(),
  );
  const menuButton = document.querySelector(".menu-toggle");
  const menu = document.querySelector("#mobile-nav");
  const closeMenu = () => {
    menu.hidden = true;
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Buka navigasi");
  };
  menuButton.addEventListener("click", () => {
    const opening = menu.hidden;
    menu.hidden = !opening;
    menuButton.setAttribute("aria-expanded", String(opening));
    menuButton.setAttribute(
      "aria-label",
      opening ? "Tutup navigasi" : "Buka navigasi",
    );
  });
  menu
    .querySelectorAll("a")
    .forEach((link) => link.addEventListener("click", closeMenu));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !menu.hidden) {
      closeMenu();
      menuButton.focus();
    }
  });
  const desktop = window.matchMedia("(min-width: 768px)");
  desktop.addEventListener("change", (event) => {
    if (event.matches) closeMenu();
  });
}
