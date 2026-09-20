const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".main-nav");
const navLinks = [...document.querySelectorAll(".main-nav a")];

menuButton?.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
});

navLinks.forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuButton?.setAttribute("aria-expanded", "false");
  });
});

const sections = [...document.querySelectorAll("main section[id]")];
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    navLinks.forEach(link => {
      link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
    });
  });
}, { rootMargin: "-35% 0px -55% 0px", threshold: 0 });

sections.forEach(section => observer.observe(section));

document.getElementById("year").textContent = new Date().getFullYear();

const copyBtn = document.getElementById("copy-email");
const copyStatus = document.getElementById("copy-status");
const email = "dmsql1602@naver.com";

copyBtn?.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(email);
    copyStatus.textContent = "이메일 주소를 복사했습니다.";
  } catch {
    copyStatus.textContent = `이메일: ${email}`;
  }
  setTimeout(() => { copyStatus.textContent = ""; }, 2200);
});
