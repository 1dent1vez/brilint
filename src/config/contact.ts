export const WHATSAPP_NUMBER = "527223579869";
export const WHATSAPP_URL = (mensaje: string = "") =>
  `https://wa.me/${WHATSAPP_NUMBER}${mensaje ? `?text=${encodeURIComponent(mensaje)}` : ""}`;
