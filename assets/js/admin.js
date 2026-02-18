const jsonFile = document.getElementById("jsonFile");

const state = {
  data: null
};

function getData(){
  return fetch("data/data.json").then(r => r.json()).then(json => {
    const local = localStorage.getItem("portfolioData");
    if(local){
      try { return JSON.parse(local); } catch { return json; }
    }
    return json;
  });
}

function bindInput(id, path){
  const el = document.getElementById(id);
  el.addEventListener("input", () => {
    setValue(path, el.value);
  });
}

function setValue(path, value){
  let obj = state.data;
  for(let i=0;i<path.length-1;i++){
    obj = obj[path[i]];
  }
  obj[path[path.length-1]] = value;
}

function getValue(path){
  let obj = state.data;
  for(let i=0;i<path.length;i++){
    obj = obj[path[i]];
  }
  return obj;
}

function renderBasic(){
  document.getElementById("brand_en").value = getValue(["brand","name","en"]);
  document.getElementById("brand_fa").value = getValue(["brand","name","fa"]);
  document.getElementById("logo").value = getValue(["brand","logo"]);
  document.getElementById("themeLight").value = getValue(["meta","theme","lightLabel"]);
  document.getElementById("themeDark").value = getValue(["meta","theme","darkLabel"]);
  document.getElementById("projectsBtnEn").value = getValue(["ui","nav","projects","en"]);
  document.getElementById("projectsBtnFa").value = getValue(["ui","nav","projects","fa"]);

  bindInput("brand_en", ["brand","name","en"]);
  bindInput("brand_fa", ["brand","name","fa"]);
  bindInput("logo", ["brand","logo"]);
  bindInput("themeLight", ["meta","theme","lightLabel"]);
  bindInput("themeDark", ["meta","theme","darkLabel"]);
  bindInput("projectsBtnEn", ["ui","nav","projects","en"]);
  bindInput("projectsBtnFa", ["ui","nav","projects","fa"]);
}

function renderHero(){
  document.getElementById("heroNameEn").value = getValue(["hero","name","en"]);
  document.getElementById("heroNameFa").value = getValue(["hero","name","fa"]);
  document.getElementById("heroSubEn").value = getValue(["hero","subtitle","en"]);
  document.getElementById("heroSubFa").value = getValue(["hero","subtitle","fa"]);
  document.getElementById("avatar").value = getValue(["profile","avatar"]);
  document.getElementById("roleEn").value = getValue(["profile","role","en"]);
  document.getElementById("roleFa").value = getValue(["profile","role","fa"]);
  document.getElementById("ctaPrimEn").value = getValue(["hero","cta","primary","label","en"]);
  document.getElementById("ctaPrimFa").value = getValue(["hero","cta","primary","label","fa"]);
  document.getElementById("ctaPrimLink").value = getValue(["hero","cta","primary","link"]);
  document.getElementById("ctaSecEn").value = getValue(["hero","cta","secondary","label","en"]);
  document.getElementById("ctaSecFa").value = getValue(["hero","cta","secondary","label","fa"]);
  document.getElementById("ctaSecLink").value = getValue(["hero","cta","secondary","link"]);

  document.getElementById("orbitTitleEn").value = getValue(["hero","orbit","title","en"]);
  document.getElementById("orbitTitleFa").value = getValue(["hero","orbit","title","fa"]);
  document.getElementById("orbitDescEn").value = getValue(["hero","orbit","desc","en"]);
  document.getElementById("orbitDescFa").value = getValue(["hero","orbit","desc","fa"]);

  bindInput("heroNameEn", ["hero","name","en"]);
  bindInput("heroNameFa", ["hero","name","fa"]);
  bindInput("heroSubEn", ["hero","subtitle","en"]);
  bindInput("heroSubFa", ["hero","subtitle","fa"]);
  bindInput("avatar", ["profile","avatar"]);
  bindInput("roleEn", ["profile","role","en"]);
  bindInput("roleFa", ["profile","role","fa"]);
  bindInput("ctaPrimEn", ["hero","cta","primary","label","en"]);
  bindInput("ctaPrimFa", ["hero","cta","primary","label","fa"]);
  bindInput("ctaPrimLink", ["hero","cta","primary","link"]);
  bindInput("ctaSecEn", ["hero","cta","secondary","label","en"]);
  bindInput("ctaSecFa", ["hero","cta","secondary","label","fa"]);
  bindInput("ctaSecLink", ["hero","cta","secondary","link"]);
  bindInput("orbitTitleEn", ["hero","orbit","title","en"]);
  bindInput("orbitTitleFa", ["hero","orbit","title","fa"]);
  bindInput("orbitDescEn", ["hero","orbit","desc","en"]);
  bindInput("orbitDescFa", ["hero","orbit","desc","fa"]);
}

function renderAbout(){
  document.getElementById("aboutTitleEn").value = getValue(["about","title","en"]);
  document.getElementById("aboutTitleFa").value = getValue(["about","title","fa"]);
  document.getElementById("aboutEn").value = getValue(["about","text","en"]);
  document.getElementById("aboutFa").value = getValue(["about","text","fa"]);

  bindInput("aboutTitleEn", ["about","title","en"]);
  bindInput("aboutTitleFa", ["about","title","fa"]);
  bindInput("aboutEn", ["about","text","en"]);
  bindInput("aboutFa", ["about","text","fa"]);
}

function repeater(containerId, dataArray, templateFn, addFn){
  const container = document.getElementById(containerId);
  container.innerHTML = "";
  dataArray.forEach((item, idx) => {
    const wrap = document.createElement("div");
    wrap.className = "repeater-item";
    wrap.innerHTML = templateFn(item, idx);
    container.appendChild(wrap);
  });

  container.querySelectorAll("[data-remove]").forEach(btn => {
    btn.addEventListener("click", () => {
      const i = parseInt(btn.dataset.remove, 10);
      dataArray.splice(i, 1);
      renderAll();
    });
  });

  container.querySelectorAll("[data-path]").forEach(input => {
    input.addEventListener("input", () => {
      const path = input.dataset.path.split(".");
      const i = parseInt(input.dataset.index, 10);
      if(path.length === 1){
        dataArray[i][path[0]] = input.value;
      } else {
        let obj = dataArray[i];
        for(let p=0;p<path.length-1;p++){
          obj = obj[path[p]];
        }
        obj[path[path.length-1]] = input.value;
      }
    });
  });
}

function renderStats(){
  repeater("statsRepeater", state.data.stats, (item, idx) => `
    <label>Label EN</label><input data-index="${idx}" data-path="label.en" value="${item.label.en}">
    <label>Label FA</label><input data-index="${idx}" data-path="label.fa" value="${item.label.fa}">
    <label>Value</label><input data-index="${idx}" data-path="value" value="${item.value}">
    <button class="btn" data-remove="${idx}"><i class="fa-solid fa-trash"></i><span>Remove</span></button>
  `);

  document.getElementById("addStat").onclick = () => {
    state.data.stats.push({ label:{en:"",fa:""}, value:"" });
    renderAll();
  };
}

function renderSkills(){
  repeater("skillsRepeater", state.data.skills, (item, idx) => `
    <label>Name EN</label><input data-index="${idx}" data-path="name.en" value="${item.name.en}">
    <label>Name FA</label><input data-index="${idx}" data-path="name.fa" value="${item.name.fa}">
    <label>Level</label><input data-index="${idx}" data-path="level" value="${item.level}">
    <button class="btn" data-remove="${idx}"><i class="fa-solid fa-trash"></i><span>Remove</span></button>
  `);

  document.getElementById("addSkill").onclick = () => {
    state.data.skills.push({ name:{en:"",fa:""}, level:"50%" });
    renderAll();
  };
}

function renderEducation(){
  repeater("eduRepeater", state.data.education, (item, idx) => `
    <label>Title EN</label><input data-index="${idx}" data-path="title.en" value="${item.title.en}">
    <label>Title FA</label><input data-index="${idx}" data-path="title.fa" value="${item.title.fa}">
    <label>Place EN</label><input data-index="${idx}" data-path="place.en" value="${item.place.en}">
    <label>Place FA</label><input data-index="${idx}" data-path="place.fa" value="${item.place.fa}">
    <label>Period</label><input data-index="${idx}" data-path="period" value="${item.period}">
    <label>Desc EN</label><input data-index="${idx}" data-path="desc.en" value="${item.desc.en}">
    <label>Desc FA</label><input data-index="${idx}" data-path="desc.fa" value="${item.desc.fa}">
    <button class="btn" data-remove="${idx}"><i class="fa-solid fa-trash"></i><span>Remove</span></button>
  `);

  document.getElementById("addEdu").onclick = () => {
    state.data.education.push({ title:{en:"",fa:""}, place:{en:"",fa:""}, period:"", desc:{en:"",fa:""} });
    renderAll();
  };
}

function renderLanguages(){
  repeater("langRepeater", state.data.languages, (item, idx) => `
    <label>Name</label><input data-index="${idx}" data-path="name" value="${item.name}">
    <label>Score</label><input data-index="${idx}" data-path="score" value="${item.score}">
    <button class="btn" data-remove="${idx}"><i class="fa-solid fa-trash"></i><span>Remove</span></button>
  `);

  document.getElementById("addLang").onclick = () => {
    state.data.languages.push({ name:"", score:"" });
    renderAll();
  };
}

function renderArticles(){
  repeater("articlesRepeater", state.data.articles, (item, idx) => `
    <label>Title EN</label><input data-index="${idx}" data-path="title.en" value="${item.title.en}">
    <label>Title FA</label><input data-index="${idx}" data-path="title.fa" value="${item.title.fa}">
    <label>Summary EN</label><input data-index="${idx}" data-path="summary.en" value="${item.summary.en}">
    <label>Summary FA</label><input data-index="${idx}" data-path="summary.fa" value="${item.summary.fa}">
    <label>Image URL</label><input data-index="${idx}" data-path="image" value="${item.image}">
    <label>URL</label><input data-index="${idx}" data-path="url" value="${item.url}">
    <label>Date</label><input data-index="${idx}" data-path="date" value="${item.date}">
    <button class="btn" data-remove="${idx}"><i class="fa-solid fa-trash"></i><span>Remove</span></button>
  `);

  document.getElementById("addArticle").onclick = () => {
    state.data.articles.push({ title:{en:"",fa:""}, summary:{en:"",fa:""}, image:"", url:"", date:"" });
    renderAll();
  };
}

function renderProjects(){
  const container = document.getElementById("projectsRepeater");
  container.innerHTML = "";

  state.data.projects.forEach((p, idx) => {
    const wrap = document.createElement("div");
    wrap.className = "repeater-item";
    wrap.innerHTML = `
      <label>Title EN</label><input data-index="${idx}" data-path="title.en" value="${p.title.en}">
      <label>Title FA</label><input data-index="${idx}" data-path="title.fa" value="${p.title.fa}">
      <label>Desc EN</label><input data-index="${idx}" data-path="desc.en" value="${p.desc.en}">
      <label>Desc FA</label><input data-index="${idx}" data-path="desc.fa" value="${p.desc.fa}">
      <label>Tags (comma)</label><input data-index="${idx}" data-path="tags" value="${p.tags.join(",")}">

      <div class="subsection">
        <h4>Gallery</h4>
        <div id="gallery_${idx}"></div>
        <button class="btn addGallery" data-index="${idx}"><i class="fa-solid fa-plus"></i><span>Add Media</span></button>
      </div>

      <button class="btn removeProject" data-remove="${idx}"><i class="fa-solid fa-trash"></i><span>Remove Project</span></button>
    `;
    container.appendChild(wrap);

    const galleryWrap = wrap.querySelector(`#gallery_${idx}`);
    p.gallery.forEach((g, gidx) => {
      const row = document.createElement("div");
      row.className = "repeater-item";
      row.innerHTML = `
        <label>Type (image/video)</label><input data-index="${idx}" data-gindex="${gidx}" data-path="type" value="${g.type}">
        <label>Source URL</label><input data-index="${idx}" data-gindex="${gidx}" data-path="src" value="${g.src}">
        <label>Thumb URL</label><input data-index="${idx}" data-gindex="${gidx}" data-path="thumb" value="${g.thumb || ""}">
        <label>Provider (local/external)</label><input data-index="${idx}" data-gindex="${gidx}" data-path="provider" value="${g.provider}">
        <label>Ratio</label><input data-index="${idx}" data-gindex="${gidx}" data-path="ratio" value="${g.ratio || ""}">
        <button class="btn removeGallery" data-index="${idx}" data-gindex="${gidx}"><i class="fa-solid fa-trash"></i><span>Remove Media</span></button>
      `;
      galleryWrap.appendChild(row);
    });
  });

  container.querySelectorAll("[data-path]").forEach(input => {
    input.addEventListener("input", () => {
      const i = parseInt(input.dataset.index,10);
      const path = input.dataset.path;
      if(path === "tags"){
        state.data.projects[i].tags = input.value.split(",").map(x => x.trim()).filter(Boolean);
        return;
      }
      const parts = path.split(".");
      let obj = state.data.projects[i];
      for(let p=0;p<parts.length-1;p++){
        obj = obj[parts[p]];
      }
      obj[parts[parts.length-1]] = input.value;
    });
  });

  container.querySelectorAll(".removeProject").forEach(btn => {
    btn.addEventListener("click", () => {
      const i = parseInt(btn.dataset.remove,10);
      state.data.projects.splice(i,1);
      renderAll();
    });
  });

  container.querySelectorAll(".addGallery").forEach(btn => {
    btn.addEventListener("click", () => {
      const i = parseInt(btn.dataset.index,10);
      state.data.projects[i].gallery.push({ type:"image", src:"", thumb:"", provider:"local", ratio:"16:9" });
      renderAll();
    });
  });

  container.querySelectorAll(".removeGallery").forEach(btn => {
    btn.addEventListener("click", () => {
      const i = parseInt(btn.dataset.index,10);
      const g = parseInt(btn.dataset.gindex,10);
      state.data.projects[i].gallery.splice(g,1);
      renderAll();
    });
  });

  document.getElementById("addProject").onclick = () => {
    state.data.projects.push({
      title:{en:"",fa:""},
      desc:{en:"",fa:""},
      tags:[],
      gallery:[],
      links:[]
    });
    renderAll();
  };
}

function renderContact(){
  document.getElementById("email").value = getValue(["contact","email"]);
  document.getElementById("phone").value = getValue(["contact","phone"]);
  document.getElementById("location").value = getValue(["contact","location"]);
  document.getElementById("telegram").value = getValue(["contact","telegram"]);
  document.getElementById("instagram").value = getValue(["contact","instagram"]);
  document.getElementById("linkedin").value = getValue(["contact","linkedin"]);
  document.getElementById("github").value = getValue(["contact","github"]);
  document.getElementById("website").value = getValue(["contact","website"]);

  bindInput("email", ["contact","email"]);
  bindInput("phone", ["contact","phone"]);
  bindInput("location", ["contact","location"]);
  bindInput("telegram", ["contact","telegram"]);
  bindInput("instagram", ["contact","instagram"]);
  bindInput("linkedin", ["contact","linkedin"]);
  bindInput("github", ["contact","github"]);
  bindInput("website", ["contact","website"]);
}

function renderAll(){
  renderBasic();
  renderHero();
  renderAbout();
  renderStats();
  renderSkills();
  renderEducation();
  renderLanguages();
  renderArticles();
  renderProjects();
  renderContact();
}

document.getElementById("saveLocal").addEventListener("click", () => {
  localStorage.setItem("portfolioData", JSON.stringify(state.data, null, 2));
  alert("Saved to LocalStorage");
});

document.getElementById("clearLocal").addEventListener("click", () => {
  localStorage.removeItem("portfolioData");
  alert("LocalStorage cleared");
});

document.getElementById("saveJson").addEventListener("click", () => {
  const blob = new Blob([JSON.stringify(state.data, null, 2)], {type:"application/json"});
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "data.json";
  link.click();
});

document.getElementById("loadJson").addEventListener("click", () => {
  jsonFile.click();
});

jsonFile.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if(!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    state.data = JSON.parse(reader.result);
    renderAll();
  };
  reader.readAsText(file);
});

getData().then(data => {
  state.data = data;
  renderAll();
});
