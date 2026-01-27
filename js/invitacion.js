window.initInvitacion = function () {
  // Fecha objetivo: 18 Julio 2026 (ajusta hora si quieres)
  // IMPORTANTE: usamos formato ISO para evitar errores de idioma.
  const target = new Date("2026-07-18T16:30:00-05:00"); // Colombia -05:00

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
      elDays.textContent = "0";
      elHours.textContent = "00";
      elMins.textContent = "00";
      elSecs.textContent = "00";
      return;
    }

    const totalSec = Math.floor(diffMs / 1000);
    const days = Math.floor(totalSec / 86400);
    const hours = Math.floor((totalSec % 86400) / 3600);
    const mins = Math.floor((totalSec % 3600) / 60);
    const secs = totalSec % 60;

    elDays.textContent = String(days);
    elHours.textContent = pad2(hours);
    elMins.textContent = pad2(mins);
    elSecs.textContent = pad2(secs);
  }

  tick();
  setInterval(tick, 1000);

    const audio = document.getElementById("bgm");
  if (!audio) return;

  audio.volume = 0.6; // opcional
  audio.play().catch(err => {
    console.warn("Autoplay bloqueado:", err);
  });

  console.log("🎵 Música de invitación iniciada");

};

