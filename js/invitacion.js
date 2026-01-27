window.initInvitacion = function () {
  // Fecha objetivo: 18 Julio 2026 a las 4:30 PM (Colombia -05:00)
  const target = new Date("2026-07-18T16:30:00-05:00");

  const elDateText = document.getElementById("weddingDateText");
  const elDays = document.getElementById("cdDays");
  const elHours = document.getElementById("cdHours");
  const elMins = document.getElementById("cdMins");
  const elSecs = document.getElementById("cdSecs");

  // Mostrar fecha arriba: "18 JULIO 2026"
  if (elDateText) {
    const fmt = new Intl.DateTimeFormat("es-CO", { day: "2-digit", month: "long", year: "numeric" });
    const parts = fmt.formatToParts(target);
    const day = parts.find(p => p.type === "day")?.value ?? "18";
    const month = (parts.find(p => p.type === "month")?.value ?? "julio").toUpperCase();
    const year = parts.find(p => p.type === "year")?.value ?? "2026";
    elDateText.textContent = `${day} ${month} ${year}`;
  }

  const pad2 = (n) => String(n).padStart(2, "0");

  function tick() {
    const now = new Date();
    let diffMs = target.getTime() - now.getTime();

    if (diffMs <= 0) {
      if (elDays) elDays.textContent = "0";
      if (elHours) elHours.textContent = "00";
      if (elMins) elMins.textContent = "00";
      if (elSecs) elSecs.textContent = "00";
      return;
    }

    const totalSec = Math.floor(diffMs / 1000);
    const days = Math.floor(totalSec / 86400);
    const hours = Math.floor((totalSec % 86400) / 3600);
    const mins = Math.floor((totalSec % 3600) / 60);
    const secs = totalSec % 60;

    if (elDays) elDays.textContent = String(days);
    if (elHours) elHours.textContent = pad2(hours);
    if (elMins) elMins.textContent = pad2(mins);
    if (elSecs) elSecs.textContent = pad2(secs);
  }

  tick();
  setInterval(tick, 1000);

  // 🎵 Música
  const audio = document.getElementById("bgm");
  if (audio) {
    audio.volume = 0.6;
    audio.play().catch(err => {
      console.warn("Autoplay bloqueado:", err);
    });
    console.log("🎵 Música de invitación iniciada");
  }

  // ==========================
  // 📸 Lightbox (agrandar fotos)
  // ==========================
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightboxImg");
  const closeBtn = document.querySelector(".lightbox__close");

  // Si aún no pegaste el HTML del lightbox, no rompe
  if (lightbox && lightboxImg && closeBtn) {
    document.querySelectorAll(".love-gallery__img").forEach(img => {
      img.addEventListener("click", () => {
        lightboxImg.src = img.src;
        lightbox.classList.add("is-active");
        document.body.style.overflow = "hidden";
      });
    });

    function closeLightbox() {
      lightbox.classList.remove("is-active");
      document.body.style.overflow = "";
    }

    closeBtn.addEventListener("click", closeLightbox);

    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) closeLightbox();
    });

    // cerrar con ESC (PC)
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && lightbox.classList.contains("is-active")) {
        closeLightbox();
      }
    });
  }

  const btnVestimenta = document.getElementById("btnVestimenta");
if (btnVestimenta) {
  btnVestimenta.addEventListener("click", () => {
    window.navigate("vestimenta");
  });
}


};
