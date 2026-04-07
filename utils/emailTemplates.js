// 🔒 Prevent HTML injection
const escapeHTML = (str = '') => {
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
};

// 🎯 Helper (field optional)
const renderField = (label, value) => {
    if (!value) return '';
    return `<p><strong>${label}:</strong> ${escapeHTML(value)}</p>`;
};

// ==========================
// ✂️ OWNER EMAIL
// ==========================
const ownerTemplate = (data) => {
    return `
  <div style="font-family:Arial,sans-serif;background:#f4f4f4;padding:20px">
    <div style="max-width:600px;margin:auto;background:#fff;border-radius:8px;overflow:hidden">

      <div style="background:#E10600;padding:20px;text-align:center">
        <h1 style="color:#fff;margin:0">BARBER ROYALE</h1>
        <p style="color:#fff;font-size:12px;letter-spacing:2px">
          NEW BOOKING REQUEST
        </p>
      </div>

      <div style="padding:20px">
        ${renderField('Name', data.name)}
        ${renderField('Email', data.email)}
        ${renderField('Phone', data.phone)}
        ${renderField('Service', data.service)}
        ${renderField('Date', data.date)}

        ${data.message
            ? `<p><strong>Message:</strong><br>${escapeHTML(data.message)}</p>`
            : ''
        }
      </div>

      <div style="background:#111;padding:15px;text-align:center">
        <p style="color:#aaa;font-size:12px;margin:0">
          New reservation received from website
        </p>
      </div>

    </div>
  </div>
  `;
};

// ==========================
// 🇫🇷 CLIENT EMAIL (FR)
// ==========================
const clientTemplateFR = (data) => {
    return `
  <div style="font-family:Arial,sans-serif;background:#f4f4f4;padding:20px">
    <div style="max-width:600px;margin:auto;background:#fff;border-radius:8px;overflow:hidden">

      <div style="background:#000;padding:25px;text-align:center">
        <h1 style="color:#E10600;margin:0">BARBER ROYALE</h1>
        <p style="color:#aaa;font-size:12px">STYLE · PRÉCISION · EXCELLENCE</p>
      </div>

      <div style="padding:25px">
        <h2 style="color:#111">Bonjour ${escapeHTML(data.name)},</h2>

        <p style="color:#555;line-height:1.6">
          Nous avons bien reçu votre demande de réservation.
          Notre équipe vous contactera très bientôt pour confirmer votre rendez-vous.
        </p>

        ${renderField('Service', data.service)}
        ${renderField('Date', data.date)}

        <a href="https://wa.me/212600000000"
          style="display:inline-block;margin-top:15px;padding:12px 25px;background:#E10600;color:#fff;text-decoration:none;border-radius:4px">
          Contacter sur WhatsApp
        </a>
      </div>

      <div style="background:#111;padding:15px;text-align:center">
        <p style="color:#aaa;font-size:12px;margin:0">
          Barber Royale — Casablanca
        </p>
      </div>

    </div>
  </div>
  `;
};

// ==========================
// 🇬🇧 CLIENT EMAIL (EN)
// ==========================
const clientTemplateEN = (data) => {
    return `
  <div style="font-family:Arial,sans-serif;background:#f4f4f4;padding:20px">
    <div style="max-width:600px;margin:auto;background:#fff;border-radius:8px;overflow:hidden">

      <div style="background:#000;padding:25px;text-align:center">
        <h1 style="color:#E10600;margin:0">BARBER ROYALE</h1>
        <p style="color:#aaa;font-size:12px">STYLE · PRECISION · EXCELLENCE</p>
      </div>

      <div style="padding:25px">
        <h2 style="color:#111">Hello ${escapeHTML(data.name)},</h2>

        <p style="color:#555;line-height:1.6">
          We have received your booking request.
          Our team will contact you shortly to confirm your appointment.
        </p>

        ${renderField('Service', data.service)}
        ${renderField('Date', data.date)}

        <a href="https://wa.me/212600000000"
          style="display:inline-block;margin-top:15px;padding:12px 25px;background:#E10600;color:#fff;text-decoration:none;border-radius:4px">
          Contact on WhatsApp
        </a>
      </div>

      <div style="background:#111;padding:15px;text-align:center">
        <p style="color:#aaa;font-size:12px;margin:0">
          Barber Royale — Casablanca
        </p>
      </div>

    </div>
  </div>
  `;
};

module.exports = {
    ownerTemplate,
    clientTemplateFR,
    clientTemplateEN
};