import { useState } from "react";

// Cargamos la key desde tu archivo .env
// Debe llamarse: PUBLIC_WEB3FORMS_KEY=xxxx
const ACCESS_KEY = import.meta.env.PUBLIC_WEB3FORMS_KEY;

export default function ContactForm() {
  const [status, setStatus] = useState("idle");
  const [result, setResult] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();

    setStatus("sending");

    const formData = new FormData(event.target);

   
    formData.append("access_key", ACCESS_KEY);

    // Asunto del correo
    formData.append("subject", "Nuevo mensaje desde Brilint");

    // Anti-bots
    formData.append("botcheck", "");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setStatus("sent");
        setResult("Gracias. Recibí tu mensaje y te responderé pronto.");
        event.target.reset();
      } else {
        setStatus("error");
        setResult("Ocurrió un error. Intenta nuevamente o escríbeme por WhatsApp.");
      }
    } catch (error) {
      console.error("Error al enviar formulario:", error);
      setStatus("error");
      setResult("Hubo un problema al enviar el mensaje.");
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="space-y-4 bg-brilint-surface p-6 rounded-2xl border border-brilint-border"
    >
      {/* Honeypot */}
      <input type="text" name="botcheck" className="hidden" autoComplete="off" />

      <div className="space-y-1">
        <label className="text-xs font-medium text-brilint-muted">
          Tu nombre
        </label>
        <input
          type="text"
          name="name"
          className="w-full bg-brilint-bg border border-brilint-border p-3 rounded-lg text-sm"
          placeholder="Cómo te llamas"
          required
        />
      </div>

      <div className="space-y-1">
        <label className="text-xs font-medium text-brilint-muted">
          Tu correo
        </label>
        <input
          type="email"
          name="email"
          className="w-full bg-brilint-bg border border-brilint-border p-3 rounded-lg text-sm"
          placeholder="correo@ejemplo.com"
          required
        />
      </div>

      <div className="space-y-1">
        <label className="text-xs font-medium text-brilint-muted">
          Tu mensaje
        </label>
        <textarea
          name="message"
          rows="4"
          className="w-full bg-brilint-bg border border-brilint-border p-3 rounded-lg text-sm"
          placeholder="Cuéntame qué necesitas"
          required
        ></textarea>
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full bg-brilint-accent text-brilint-bg rounded-lg py-3 font-semibold text-sm transition duration-fast hover:bg-brilint-accent/90 disabled:opacity-60"
      >
        {status === "sending" ? "Enviando…" : "Enviar mensaje"}
      </button>

      {result && (
        <p
          className={`text-sm ${
            status === "sent" ? "text-emerald-400" : "text-red-400"
          }`}
        >
          {result}
        </p>
      )}
    </form>
  );
}
