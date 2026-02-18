const DATA_KEY = "portfolioData";

const state = {
  data: null,
  lang: localStorage.getItem("lang") || "fa",
  theme: localStorage.getItem("theme") || "dark"
};

function applyTheme() {
  document.documentElement.setAttribute("data-theme", state.theme);
  updateThemeLabel();
}

function updateThemeLabel() {
  const isLight = state.theme === "light";
  const isFa = state.lang === "fa";
  const label = isFa ? (isLight ? "روشن" : "تاریک") : (isLight ? "Light" : "Dark");
  document.getElementById("themeToggle").textContent = label;
}

function applyLang() {
  document.documentElement.setAttribute("lang", state.lang);
  document.documentElement.setAttribute("dir", state.lang === "fa" ? "rtl" : "ltr");
  const label = state.lang === "fa" ? "EN" : "FA";
  document.getElementById("langToggle").textContent = label;
}

async function loadData() {
  const local = localStorage.getItem(DATA_KEY);
  if (local) return JSON.parse(local);
  const res = await fetch("assets/data/content.json");
  return await res.json();
}

function t(obj) {
  if (typeof obj === "string") return obj;
  return obj[state.lang] || obj.fa || obj.en || "";
}

function renderProjects(projects) {
  const grid = document.getElementById("projectsGallery");
  grid.innerHTML = "";
  projects.forEach(p => {
    const card = document.createElement("div");
    card.className = "project-card glow-card";
    card.innerHTML = `
      <img class="project-thumb" src="${p.thumbnail}" alt="${t(p.title)}">
      <div class="project-info">
        <h3>${t(p.title)}</h3>
        <p>${t(p.desc)}</p>
        ${(p.tags || []).map(tag => `<span class="chip">${tag}</span>`).join("")}
        <div class="media-row">
          ${(p.media || []).map(m => `<img src="${m}" class="project-thumb" alt="">`).join("")}
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
}

function renderArticles(articles) {
  const grid = document.getElementById("articlesGrid");
  grid.innerHTML = "";
  articles.forEach(a => {
    const card = document.createElement("div");
    card.className = "card glow-card";
    card.innerHTML = `
      <h3>${t(a.title)}</h3>
      <p>${t(a.desc)}</p>
      ${a.link ? `<a class="chip" href="${a.link}">Read</a>` : ""}
    `;
    grid.appendChild(card);
  });
}

function bindLightbox() {
  const lightbox = document.getElementById("lightbox");
  const lbImg = document.querySelector(".lb-img");
  document.body.addEventListener("click", (e) => {
    if (e.target.classList.contains("project-thumb")) {
      lbImg.src = e.target.src;
      lightbox.style.display = "flex";
    }
  });
  document.querySelector(".lb-close").addEventListener("click", () => {
    lightbox.style.display = "none";
  });
}

function bindGlow() {
  document.addEventListener("mousemove", (e) => {
    document.querySelectorAll(".glow-card").forEach(card => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      card.style.setProperty("--mx", `${x}%`);
      card.style.setProperty("--my", `${y}%`);
    });
  });
}

function bindScrollProgress() {
  const bar = document.querySelector(".scroll-progress");
  window.addEventListener("scroll", () => {
    const scrolled = window.scrollY;
    const height = document.body.scrollHeight - window.innerHeight;
    bar.style.width = (scrolled / height) * 100 + "%";
  });
}

function bindThemeAndLang() {
  document.getElementById("themeToggle").addEventListener("click", () => {
    state.theme = state.theme === "dark" ? "light" : "dark";
    localStorage.setItem("theme", state.theme);
    applyTheme();
  });
  document.getElementById("langToggle").addEventListener("click", () => {
    state.lang = state.lang === "fa" ? "en" : "fa";
    localStorage.setItem("lang", state.lang);
    applyLang();
    renderAll();
  });
}

function renderAll() {
  const d = state.data;
  document.getElementById("brandName").textContent = t(d.site.name);
  document.getElementById("brandRole").textContent = t(d.site.role);
  document.getElementById("projectsTitle").textContent = t(d.sections.projects);
  document.getElementById("projectsDesc").textContent = t(d.sections.projectsDesc);
  document.getElementById("articlesTitle").textContent = t(d.sections.articles);
  document.getElementById("articlesDesc").textContent = t(d.sections.articlesDesc);

  renderProjects(d.projects);
  renderArticles(d.articles);
}

(async function init() {
  state.data = await loadData();
  applyTheme();
  applyLang();
  bindThemeAndLang();
  bindScrollProgress();
  bindLightbox();
  bindGlow();
  renderAll();
})();
