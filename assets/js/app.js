const progress = document.getElementById("scrollProgress");
const themeToggle = document.getElementById("themeToggle");
const langToggle = document.getElementById("langToggle");
const root = document.documentElement;

const i18n = {
  fa: {
    brand_name: "مهندس مکاترونیک",
    brand_tag: "پژوهشگر دیپ‌لرنینگ",
    lang_btn: "EN",
    theme_btn: "تاریک",
    cta_contact: "ارتباط",
    hero_eyebrow: "طراحی آینده با مکاترونیک و هوش مصنوعی",
    hero_title: "من مهندس مکاترونیک هستم و سیستم‌های هوشمند با دیپ‌لرنینگ می‌سازم",
    hero_desc: "تجربه‌ام در طراحی رباتیک، کنترل پیشرفته، بینایی ماشین و یادگیری عمیق باعث شده پروژه‌هایی بسازم که فراتر از استانداردهای معمول باشند.",
    cta_projects: "مشاهده پروژه‌ها",
    cta_cv: "دانلود رزومه",
    stat_projects: "پروژه هوشمند",
    stat_years: "سال تجربه",
    stat_tools: "ابزار تخصصی",
    badge_mechatronics: "مکاترونیک",
    badge_dl: "دیپ‌لرنینگ",
    about_title: "درباره من",
    about_desc: "ترکیبی از مهندسی دقیق و هوش مصنوعی برای ساخت سیستم‌های هوشمند و قابل اتکا.",
    about_1_title: "رباتیک پیشرفته",
    about_1_desc: "طراحی مکانیزم، کنترل تطبیقی و اجرای هوشمند در محیط‌های واقعی.",
    about_2_title: "بینایی ماشین",
    about_2_desc: "تحلیل و ادراک تصویری با شبکه‌های عصبی عمیق.",
    about_3_title: "طراحی سیستم",
    about_3_desc: "ترکیب الکترونیک، نرم‌افزار و مکانیک با معماری پایدار.",
    skills_title: "مهارت‌ها",
    skills_desc: "توانمندی‌های کلیدی در مهندسی مکاترونیک و یادگیری عمیق",
    projects_title: "پروژه‌ها",
    projects_desc: "نمونه‌هایی از پروژه‌های هوشمند و صنعتی",
    proj1_title: "بازوی رباتیک هوشمند",
    proj1_desc: "کنترل دقیق با شبکه عصبی و سنسورهای چندگانه",
    proj2_title: "سیستم تشخیص عیب",
    proj2_desc: "تشخیص خودکار خطاها در خطوط تولید صنعتی",
    proj3_title: "بینایی ماشین صنعتی",
    proj3_desc: "تشخیص کیفیت با پردازش تصویر بلادرنگ",
    cta_more_projects: "مشاهده همه پروژه‌ها",
    exp_title: "مسیر حرفه‌ای",
    exp_desc: "گام‌های کلیدی و پروژه‌های تاثیرگذار",
    exp1_title: "طراحی سیستم رباتیک خودکار",
    exp1_desc: "پیاده‌سازی کنترلر تطبیقی و پایدار برای محیط‌های صنعتی.",
    exp2_title: "مدل تشخیص نقص با CNN",
    exp2_desc: "افزایش دقت تشخیص تا 98% با معماری سفارشی.",
    exp3_title: "بهینه‌سازی خط تولید با داده",
    exp3_desc: "کاهش 20% زمان توقف با الگوریتم‌های پیش‌بینی.",
    contact_title: "برای همکاری آماده‌ام",
    contact_desc: "اگر پروژه‌ای در حوزه مکاترونیک یا هوش مصنوعی دارید، خوشحال می‌شوم همکاری کنیم.",
    contact_email: "ارسال ایمیل",
    contact_linkedin: "لینکدین",
    footer_text: "© 2026 تمام حقوق محفوظ است."
  },
  en: {
    brand_name: "Mechatronics Engineer",
    brand_tag: "Deep Learning Researcher",
    lang_btn: "FA",
    theme_btn: "Dark",
    cta_contact: "Contact",
    hero_eyebrow: "Designing the Future with Mechatronics and AI",
    hero_title: "I build intelligent systems with mechatronics and deep learning",
    hero_desc: "My experience in robotics design, advanced control, computer vision and deep learning helps me deliver high‑impact projects.",
    cta_projects: "View Projects",
    cta_cv: "Download CV",
    stat_projects: "Smart Projects",
    stat_years: "Years Experience",
    stat_tools: "Specialized Tools",
    badge_mechatronics: "Mechatronics",
    badge_dl: "Deep Learning",
    about_title: "About Me",
    about_desc: "A fusion of precise engineering and AI to build reliable intelligent systems.",
    about_1_title: "Advanced Robotics",
    about_1_desc: "Mechanism design, adaptive control and real‑world execution.",
    about_2_title: "Computer Vision",
    about_2_desc: "Perception and analysis with deep neural networks.",
    about_3_title: "System Design",
    about_3_desc: "Combining electronics, software and mechanics into scalable architectures.",
    skills_title: "Skills",
    skills_desc: "Key capabilities in mechatronics and deep learning",
    projects_title: "Projects",
    projects_desc: "Selected smart and industrial projects",
    proj1_title: "Smart Robotic Arm",
    proj1_desc: "High‑precision control with neural networks and multi‑sensor fusion",
    proj2_title: "Fault Detection System",
    proj2_desc: "Automatic fault detection in industrial production lines",
    proj3_title: "Industrial Vision",
    proj3_desc: "Real‑time quality inspection with image processing",
    cta_more_projects: "View All Projects",
    exp_title: "Professional Journey",
    exp_desc: "Key steps and impactful projects",
    exp1_title: "Autonomous Robotic System",
    exp1_desc: "Adaptive and stable controller for industrial environments.",
    exp2_title: "CNN Defect Detection",
    exp2_desc: "Raised detection accuracy to 98% with custom architecture.",
    exp3_title: "Data‑Driven Optimization",
    exp3_desc: "Reduced downtime by 20% using predictive algorithms.",
    contact_title: "Ready to Collaborate",
    contact_desc: "If you have a project in mechatronics or AI, let’s work together.",
    contact_email: "Send Email",
    contact_linkedin: "LinkedIn",
    footer_text: "© 2026 All rights reserved."
  }
};

function applyLang(lang) {
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    el.textContent = i18n[lang][key] || el.textContent;
  });
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "fa" ? "rtl" : "ltr";
}

function setTheme(theme) {
  root.setAttribute("data-theme", theme);
  const icon = theme === "dark" ? "ri-moon-clear-line" : "ri-sun-line";
  themeToggle.querySelector("i").className = icon;
}

window.addEventListener("scroll", () => {
  const scrolled = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
  progress.style.width = `${scrolled}%`;
});

themeToggle.addEventListener("click", () => {
  const current = root.getAttribute("data-theme");
  setTheme(current === "dark" ? "light" : "dark");
});

langToggle.addEventListener("click", () => {
  const current = document.documentElement.lang === "fa" ? "en" : "fa";
  applyLang(current);
});

applyLang("fa");
setTheme("dark");
