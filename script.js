/* ===== Utils ===== */
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

/* ===== Datos de ejemplo (reemplaza por los tuyos) ===== */
const WORKS = [
  {
    id: "w1",
    title: "Dias de las madres - ChocoBreak",
    role: "Branding",
    year: 2025,
    tags: ["Marketing", "Packaging"],
    category: "branding",
    thumb: "img/projects/madres3.webp",
    image: "img/projects/madres2.webp",
    desc: "Sistema visual cálido con tipografía humanista y paleta tostada. Packaging modular.",
    link: "https://www.behance.net/",
  },
  {
    id: "w2",
    title: "Temporada · Navidad",
    role: "Ilustración",
    year: 2025,
    tags: ["Marketing", "Ilustracion"],
    category: "ilustracion",
    thumb: "img/projects/navidad1.webp",
    image: "img/projects/navidad3.webp",
    desc: "Serie de ilustraciones botánicas para publicación impresa y social media.",
    link: "https://www.instagram.com/",
  },
  // {
  //   id: "w3",
  //   title: " · Revista Lumen",
  //   role: "Editorial",
  //   year: 2025,
  //   tags: ["editorial", "reticula"],
  //   category: "editorial",
  //   thumb:
  //     "https://images.unsplash.com/photo-1491841573634-28140fc7ced7?q=80&w=1200&auto=format&fit=crop",
  //   image:
  //     "https://images.unsplash.com/photo-1491841651911-c44c30c34548?q=80&w=1600&auto=format&fit=crop",
  //   desc: "Retícula modular y tipografía serif para lectura larga con acentos de color.",
  //   link: "https://dribbble.com/",
  // },
  {
    id: "w4",
    title: "Tattoo - Izabella",
    role: "UI",
    year: 2025,
    tags: ["ui", "figma"],
    category: "ui",
    thumb: "img/projects/tatoo1.webp",
    image: "img/projects/tatoo2.webp",
    desc: "Componentes atómicos, grid de 8px y estilo minimal para productividad.",
    link: "https://www.instagram.com/izaatatto?igsh=M243ZGhibGVxZ3I0",
  },
  {
    id: "w5",
    title: "Menu ·Sabor en las alturas ",
    role: "Branding",
    year: 2025,
    tags: ["Marketing", "Branding"],
    category: "branding",
    thumb: "img/projects/menu h.webp",
    image: "img/projects/menu p.webp",
    desc: "Identidad artesanal con lettering e íconos de granos, tono cercano y cálido.",
    link: "https://www.instagram.com/saborenlasalturas_?utm_source=ig_web_button_share_sheet&igsh=MTJobXJscXJrd2ExZg==",
  },
  {
    id: "w6",
    title: "Perfumen · Versace",
    role: "Ilustración",
    year: 2025,
    tags: ["ilustracion", "Branding"],
    category: "ilustracion",
    thumb: "img/projects/perfumen1.webp",
    image: "img/projects/perfumen2.webp",
    desc: "Serie de pósters con trazos vectoriales y paleta vibrante.",
    link: "https://www.instagram.com/",
  },
];

/* ===== Init ===== */
document.addEventListener("DOMContentLoaded", () => {
  $("#year").textContent = new Date().getFullYear();
  // $("#btnTheme").addEventListener("click", toggleTheme);
  $("#filterSelect").addEventListener("change", renderGrid);
  $("#searchInput").addEventListener("input", renderGrid);
  renderGrid();
  observeFadeIns();
});

/* ===== Tema claro/oscuro ===== */
// function toggleTheme() {
//   const html = document.documentElement;
//   const current = html.getAttribute("data-bs-theme") === "dark";
//   html.setAttribute("data-bs-theme", current === "dark");
// }

/* ===== Render grid ===== */
function renderGrid() {
  const grid = $("#grid");
  const q = $("#searchInput").value?.toLowerCase() || "";
  const filter = $("#filterSelect").value;

  let list = WORKS.filter((w) =>
    filter === "all" ? true : w.category === filter
  )
    .filter(
      (w) =>
        !q ||
        w.title.toLowerCase().includes(q) ||
        w.role.toLowerCase().includes(q) ||
        w.tags.join(" ").toLowerCase().includes(q)
    )
    .sort((a, b) => b.year - a.year);

  grid.innerHTML = "";
  if (!list.length) {
    grid.innerHTML = `<div class="col"><div class="text-center text-secondary py-5">No hay proyectos para ese filtro/búsqueda.</div></div>`;
    return;
  }

  const frag = document.createDocumentFragment();
  list.forEach((w) => frag.appendChild(renderCard(w)));
  grid.appendChild(frag);
  observeFadeIns();
}

function renderCard(w) {
  const col = document.createElement("div");
  col.className = "col fade-in-up";

  const card = document.createElement("div");
  card.className = "card h-100 card-work";

  const media = document.createElement("div");
  media.className = "ratio ratio-4x3 bg-body-secondary";
  const img = document.createElement("img");
  img.loading = "lazy";
  img.alt = w.title;
  img.src = w.thumb;
  img.className = "w-100 h-100 object-fit-cover";
  img.addEventListener("click", () => openModal(w.id));
  media.appendChild(img);

  const body = document.createElement("div");
  body.className = "card-body d-flex flex-column";

  const title = document.createElement("h3");
  title.className = "h6 fw-bold mb-1 text-truncate";
  title.textContent = w.title;

  const meta = document.createElement("p");
  meta.className = "small text-secondary mb-2";
  meta.textContent = `${w.role} • ${w.year}`;

  const tags = document.createElement("div");
  (w.tags || []).forEach((t) => {
    const span = document.createElement("span");
    span.className = "badge text-bg-secondary me-1 mb-1";
    span.textContent = t;
    tags.appendChild(span);
  });

  const actions = document.createElement("div");
  actions.className = "mt-auto d-flex align-items-center gap-2 pt-2";
  const btnView = document.createElement("button");
  btnView.className = "btn btn-sm btn-outline-primary ms-auto";
  btnView.innerHTML = `<i class="bi bi-arrows-fullscreen"></i> Ver`;
  btnView.addEventListener("click", () => openModal(w.id));

  actions.append(btnView);
  body.append(title, meta, tags, actions);
  card.append(media, body);
  col.appendChild(card);
  return col;
}

/* ===== Modal de proyecto ===== */
let bsModal;
function openModal(id) {
  const w = WORKS.find((x) => x.id === id);
  if (!w) return;
  $("#modalImg").src = w.image;
  $("#modalTitle").textContent = w.title;
  $("#modalMeta").textContent = `${w.role} • ${w.year}`;
  $("#modalDesc").textContent = w.desc;
  const tagsBox = $("#modalTags");
  tagsBox.innerHTML = "";
  (w.tags || []).forEach((t) => {
    const s = document.createElement("span");
    s.className = "badge text-bg-secondary me-1 mb-1";
    s.textContent = t;
    tagsBox.appendChild(s);
  });
  const link = $("#modalLink");
  link.href = w.link || "#";
  bsModal = bsModal || new bootstrap.Modal("#workModal", { backdrop: true });
  bsModal.show();
}

/* ===== Mailto simple ===== */
function handleMailto(e) {
  e.preventDefault();
  const name = $("#nameInput").value.trim();
  const email = $("#emailInput").value.trim();
  const msg = $("#msgInput").value.trim();
  const subject = encodeURIComponent(`Contacto Portafolio — ${name}`);
  const body = encodeURIComponent(
    `Hola Sofía,\n\n${msg}\n\n— ${name}\n${email}`
  );
  window.location.href = `mailto:sofia.diaz@example.com?subject=${subject}&body=${body}`;
  return false;
}

/* ===== Animaciones on-scroll ===== */
function observeFadeIns() {
  const els = $$(".fade-in-up");
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          en.target.classList.add("is-visible");
          io.unobserve(en.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  els.forEach((el) => io.observe(el));
}
