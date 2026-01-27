const app = document.getElementById("app");

async function loadView(viewName) {
  const res = await fetch(`pages/${viewName}.html`);
  if (!res.ok) throw new Error(`No pude cargar pages/${viewName}.html`);
  app.innerHTML = await res.text();
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
