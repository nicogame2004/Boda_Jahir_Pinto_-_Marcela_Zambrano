window.initSobre = function () {
  const btn = document.getElementById("openEnvelope");
  if (!btn) return;

  btn.addEventListener("click", () => {
    window.navigate("invitacion");
  });
};
