// ---- EDIT THESE FOR EACH HOTEL ----
const CONFIG = {
  hotelName: "MANALI Hotel",
  whatsappNumber: "" // digits only with country code, e.g. 2348012345678. Leave empty until verified.
};
// -----------------------------------
document.getElementById("brandName").textContent = CONFIG.hotelName;

// Mobile menu
const nav = document.getElementById("nav");
const menuBtn = document.getElementById("menuBtn");
menuBtn.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", open);
});
nav.addEventListener("click", e => { if (e.target.tagName === "A") { nav.classList.remove("open"); menuBtn.setAttribute("aria-expanded", false); } });

// Light / dark mode
const root = document.documentElement;
try { const saved = localStorage.getItem("theme"); if (saved) root.dataset.theme = saved; } catch (e) {}
document.getElementById("themeBtn").addEventListener("click", () => {
  const next = root.dataset.theme === "light" ? "dark" : "light";
  root.dataset.theme = next;
  try { localStorage.setItem("theme", next); } catch (e) {}
});

// Enquiry form -> WhatsApp message
const today = new Date().toISOString().split("T")[0];
const checkin = document.getElementById("checkin");
const checkout = document.getElementById("checkout");
checkin.min = checkout.min = today;
document.querySelectorAll("[data-room]").forEach(a => a.addEventListener("click", () => {
  document.getElementById("roomType").value = a.dataset.room;
}));
const status = document.getElementById("status");
document.getElementById("enquire").addEventListener("submit", e => {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  if (!name || !checkin.value || !checkout.value) { status.textContent = "Please fill in your name and both dates."; return; }
  if (checkout.value <= checkin.value) { status.textContent = "Check-out must be after check-in."; return; }
  if (!CONFIG.whatsappNumber) { status.textContent = "Demo only: no WhatsApp number is set yet."; return; }
  const msg = `Hello ${CONFIG.hotelName}, my name is ${name}. I would like to check availability for a ${document.getElementById("roomType").value} room for ${document.getElementById("guests").value} guest(s), from ${checkin.value} to ${checkout.value}.`;
  window.open(`https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(msg)}`, "_blank", "noopener");
  status.textContent = "Opening WhatsApp. This is an enquiry, not a confirmed booking.";
});

// Gallery lightbox
const lb = document.getElementById("lightbox");
document.querySelectorAll(".g").forEach(b => b.addEventListener("click", () => {
  document.getElementById("lbText").textContent = b.dataset.label + " (photo goes here)";
  lb.showModal();
}));
document.getElementById("lbClose").addEventListener("click", () => lb.close());
