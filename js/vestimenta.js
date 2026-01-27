window.initVestimenta = function () {
  document.body.style.overflow = "auto";

  const btn = document.getElementById("btnVolverInvitacion");
  if (btn) {
    btn.addEventListener("click", () => window.navigate("invitacion"));
  }
};
