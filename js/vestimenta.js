window.initVestimenta = function () {
  document.body.style.overflow = "auto";

  const btn = document.getElementById("btnVolverInvitacion");

  if (btn) {
    btn.addEventListener("click", async () => {
      await window.navigate("invitacion");

      // esperar a que cargue el HTML
      setTimeout(() => {
        const el = document.getElementById("dresscode");
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    });
  }
};
