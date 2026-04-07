# ⚙️ Barber Royale — Backend

> Node.js · Express · Nodemailer · dotenv

REST API for the Barber Royale booking form. Receives appointment requests and sends branded HTML emails to both the shop owner and the client.

---

## ⚡ Quick Start

```bash
cd backend
npm install
cp .env.example .env     # Fill in your SMTP credentials
npm start                # → http://localhost:5000
```

For development with auto-reload:
```bash
npm install -D nodemon
npx nodemon server.js
```

---

## 🗂️ Project Structure

```
backend/
├── server.js                    # Express app, middleware, routes, listen
├── routes/
│   └── contact.js               # POST /api/contact → contactController
├── controllers/
│   └── contactController.js     # Email logic via Nodemailer
├── config/                      # Reserved for future config (DB, auth, etc.)
├── .env.example                 # Environment variables template
└── package.json
```

---

## 🔌 API Endpoints

### `GET /api/health`
Health check. Returns server status.

**Response:**
```json
{ "status": "OK", "message": "Barber Royale API is running" }
```

---

### `POST /api/contact`
Receives a booking request and sends two emails:
1. **Owner notification** — styled HTML email to the barber shop
2. **Client confirmation** — styled HTML email to the customer

**Request body (JSON):**
```json
{
  "name":    "John Doe",           // required
  "email":   "john@example.com",  // required
  "phone":   "+212 6XX XXX XXX",  // optional
  "service": "Coupe Classique",   // optional
  "date":    "2025-06-15",        // optional
  "message": "I prefer 10am"      // optional
}
```

**Success response (200):**
```json
{ "success": true, "message": "Message sent successfully." }
```

**Validation error (400):**
```json
{ "success": false, "message": "Name and email are required." }
```

**Server error (500):**
```json
{ "success": false, "message": "Failed to send email.", "error": "..." }
```

---

## 🔐 Environment Variables

Copy `.env.example` to `.env` and fill in your values:

```env
# Server
PORT=5000
CLIENT_URL=http://localhost:5173

# SMTP — Gmail recommended
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-16-char-app-password

# Where booking notifications are sent
OWNER_EMAIL=owner@barbershop.com
```

### Gmail Setup (recommended)

Gmail requires an **App Password** — not your regular password:

1. Go to [myaccount.google.com](https://myaccount.google.com)
2. Security → 2-Step Verification → **App Passwords**
3. Select "Mail" + "Other" → name it "Barber Royale"
4. Copy the 16-character password → paste into `SMTP_PASS`

### Other SMTP Providers

| Provider | SMTP_HOST | SMTP_PORT |
|----------|-----------|-----------|
| Gmail | smtp.gmail.com | 587 |
| Outlook | smtp-mail.outlook.com | 587 |
| Yahoo | smtp.mail.yahoo.com | 587 |
| SendGrid | smtp.sendgrid.net | 587 |
| Mailgun | smtp.mailgun.org | 587 |

---

## 📧 Email Templates

Both emails are fully styled HTML, matching the Barber Royale brand (black, red `#E10600`, white).

**Owner email** includes:
- All submitted fields (name, email, phone, service, date, message)
- Clickable mailto and tel links
- Branded header/footer

**Client confirmation email** includes:
- Personalized greeting
- Summary of requested service and date
- WhatsApp quick-contact button
- Shop address and hours

To customize the templates, edit `controllers/contactController.js` — look for the `html:` fields in `ownerMailOptions` and `clientMailOptions`.

---

## 🛡️ Security & Middleware

| Middleware | Purpose |
|-----------|---------|
| `cors` | Restricts requests to `CLIENT_URL` only |
| `express.json()` | Parses JSON request bodies |
| `express.urlencoded()` | Parses form-encoded bodies |
| `dotenv` | Loads `.env` into `process.env` |

**CORS** is locked to `CLIENT_URL` from `.env`. Update this for production:
```env
CLIENT_URL=https://your-frontend-domain.com
```

---

## 🧪 Testing the API

### With curl:
```bash
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "+212600000000",
    "service": "Coupe Classique",
    "date": "2025-06-20",
    "message": "Test booking request"
  }'
```

### With Postman / Insomnia:
- Method: `POST`
- URL: `http://localhost:5000/api/contact`
- Body: `raw` → `JSON`
- Paste the JSON above

### Health check:
```bash
curl http://localhost:5000/api/health
```

---

## 🚀 Deployment

### Railway (recommended — free tier)
1. Push code to GitHub
2. New project → Deploy from GitHub repo
3. Set environment variables in the Railway dashboard
4. Railway auto-detects Node.js and runs `npm start`

### Render
1. New Web Service → connect GitHub repo
2. Build command: `npm install`
3. Start command: `node server.js`
4. Add environment variables in dashboard

### VPS / Manual
```bash
# Install PM2 for process management
npm install -g pm2

cd backend
pm2 start server.js --name "barber-royale-api"
pm2 save
pm2 startup    # auto-restart on reboot
```

### After deploying
Update your frontend's API URL:
```env
# frontend .env
VITE_API_URL=https://your-api-url.railway.app
```

And update `CLIENT_URL` in your backend `.env` to your live frontend domain.

---

## 📦 Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `express` | ^4.18 | HTTP server & routing |
| `nodemailer` | ^6.9 | SMTP email sending |
| `cors` | ^2.8 | Cross-origin request control |
| `dotenv` | ^16.4 | Environment variable loader |

Dev only:
| Package | Purpose |
|---------|---------|
| `nodemon` | Auto-reload on file changes |

---

## 🔮 Extending the Backend

### Add a database (MongoDB example)
```bash
npm install mongoose
```
```js
// config/db.js
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI);
```

### Add rate limiting (prevent spam)
```bash
npm install express-rate-limit
```
```js
const rateLimit = require('express-rate-limit');
const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 10 });
app.use('/api/contact', limiter);
```

### Add input sanitization
```bash
npm install express-validator
```

---

*Barber Royale Backend © 2025*