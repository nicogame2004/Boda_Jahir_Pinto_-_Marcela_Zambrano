const app = document.getElementById("app");

// Detecta base path correcto para:
// - Local (Live Server): "/"
// - GitHub Pages: "/NOMBRE_REPO/"
function getBasePath() {
  // Localhost / 127.0.0.1 / file:// => usamos raíz
  if (
    location.hostname === "127.0.0.1" ||
    location.hostname === "localhost" ||
    location.protocol === "file:"
  ) {
    return "/";
  }

  // GitHub Pages: /REPO/...
  const parts = location.pathname.split("/").filter(Boolean);

  // Si termina en index.html, quítalo
  if (parts[parts.length - 1].endsWith(".html")) parts.pop();

  // primer segmento suele ser el repo
  return parts.length ? `/${parts[0]}/` : "/";
}

const BASE = getBasePath();

async function loadView(viewName) {
  const res = await fetch(`${BASE}pages/${viewName}.html`);
  if (!res.ok) throw new Error(`No pude cargar ${BASE}pages/${viewName}.html`);
  app.innerHTML = await res.text();

  // Arregla rutas relativas de imágenes dentro del HTML cargado
  app.querySelectorAll("img").forEach((img) => {
    const src = img.getAttribute("src");
    if (!src) return;

    // Si ya es absoluta (http, https, data) o empieza por "/" => no tocar
    if (/^(https?:|data:|\/)/i.test(src)) return;

    // Normaliza: quita ./ y ../ (solo al inicio)
    const cleaned = src.replace(/^(\.\/)+/, "").replace(/^(\.\.\/)+/, "");
    img.setAttribute("src", `${BASE}${cleaned}`);
  });
}

async function navigate(viewName) {
  await loadView(viewName);

  if (viewName === "sobre" && window.initSobre) window.initSobre();
  if (viewName === "invitacion" && window.initInvitacion) window.initInvitacion();
}

window.navigate = navigate;

document.addEventListener("DOMContentLoaded", () => {
  navigate("sobre").catch(console.error);
});
