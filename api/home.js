// api/home.js
module.exports = (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send(`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Barber Royale — API</title>
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=DM+Mono:wght@300;400&family=Outfit:wght@300;400;500&display=swap" rel="stylesheet">
    <style>
        *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

        :root {
            --red: #C8000A;
            --red-dim: #8a0007;
            --white: #F5F0EB;
            --black: #0A0A0A;
            --surface: #111111;
            --surface-2: #1A1A1A;
            --border: rgba(255,255,255,0.07);
            --border-accent: rgba(200,0,10,0.4);
        }

        html, body {
            height: 100%;
            background: var(--black);
            color: var(--white);
            font-family: 'Outfit', sans-serif;
            font-weight: 300;
            overflow-x: hidden;
        }

        /* — Grain overlay — */
        body::before {
            content: '';
            position: fixed;
            inset: 0;
            background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E");
            opacity: 0.028;
            pointer-events: none;
            z-index: 100;
        }

        /* — Red top rule — */
        body::after {
            content: '';
            position: fixed;
            top: 0; left: 0; right: 0;
            height: 3px;
            background: var(--red);
            z-index: 99;
        }

        .page {
            min-height: 100vh;
            display: grid;
            grid-template-rows: auto 1fr auto;
            max-width: 860px;
            margin: 0 auto;
            padding: 0 32px;
        }

        /* ─── Header ─── */
        header {
            padding: 36px 0 0;
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            border-bottom: 0.5px solid var(--border);
            padding-bottom: 28px;
            animation: fadeDown 0.6s ease both;
        }

        .wordmark {
            display: flex;
            flex-direction: column;
            gap: 2px;
        }

        .wordmark-top {
            font-size: 10px;
            letter-spacing: 4px;
            text-transform: uppercase;
            color: rgba(245,240,235,0.35);
            font-weight: 400;
        }

        .wordmark-brand {
            font-family: 'Playfair Display', serif;
            font-size: 22px;
            font-weight: 700;
            letter-spacing: 3px;
            text-transform: uppercase;
            color: var(--white);
            line-height: 1;
        }

        .wordmark-brand span { color: var(--red); }

        .status-pill {
            display: flex;
            align-items: center;
            gap: 8px;
            background: rgba(200,0,10,0.08);
            border: 0.5px solid var(--border-accent);
            padding: 7px 14px;
            border-radius: 2px;
            font-family: 'DM Mono', monospace;
            font-size: 11px;
            font-weight: 300;
            color: #ff4444;
            letter-spacing: 1px;
        }

        .pulse-dot {
            width: 6px; height: 6px;
            border-radius: 50%;
            background: var(--red);
            flex-shrink: 0;
            animation: pulse 2s ease-in-out infinite;
        }

        @keyframes pulse {
            0%, 100% { opacity: 1; box-shadow: 0 0 0 0 rgba(200,0,10,0.5); }
            50% { opacity: 0.7; box-shadow: 0 0 0 4px rgba(200,0,10,0); }
        }

        /* ─── Hero ─── */
        main {
            padding: 64px 0 48px;
            animation: fadeUp 0.7s 0.1s ease both;
        }

        .eyebrow {
            font-family: 'DM Mono', monospace;
            font-size: 10px;
            letter-spacing: 5px;
            text-transform: uppercase;
            color: var(--red);
            margin-bottom: 20px;
            font-weight: 300;
        }

        .hero-title {
            font-family: 'Playfair Display', serif;
            font-size: clamp(48px, 9vw, 86px);
            font-weight: 900;
            line-height: 0.92;
            letter-spacing: -1px;
            color: var(--white);
            margin-bottom: 32px;
        }

        .hero-title em {
            font-style: italic;
            color: rgba(245,240,235,0.2);
        }

        .hero-sub {
            font-size: 14px;
            font-weight: 300;
            color: rgba(245,240,235,0.4);
            letter-spacing: 0.5px;
            line-height: 1.7;
            max-width: 380px;
            margin-bottom: 56px;
            border-left: 2px solid var(--red);
            padding-left: 16px;
        }

        /* ─── Divider label ─── */
        .section-label {
            display: flex;
            align-items: center;
            gap: 16px;
            margin-bottom: 20px;
        }

        .section-label span {
            font-family: 'DM Mono', monospace;
            font-size: 9px;
            letter-spacing: 4px;
            text-transform: uppercase;
            color: rgba(245,240,235,0.25);
            white-space: nowrap;
        }

        .section-label::after {
            content: '';
            flex: 1;
            height: 0.5px;
            background: var(--border);
        }

        /* ─── Endpoints ─── */
        .endpoints {
            display: flex;
            flex-direction: column;
            gap: 1px;
            background: var(--border);
            border: 0.5px solid var(--border);
            border-radius: 4px;
            overflow: hidden;
            margin-bottom: 48px;
        }

        .endpoint {
            background: var(--surface);
            padding: 18px 24px;
            display: grid;
            grid-template-columns: 56px 1fr auto;
            align-items: center;
            gap: 20px;
            transition: background 0.2s ease;
            cursor: default;
            position: relative;
        }

        .endpoint::before {
            content: '';
            position: absolute;
            left: 0; top: 0; bottom: 0;
            width: 2px;
            background: transparent;
            transition: background 0.2s ease;
        }

        .endpoint:hover { background: var(--surface-2); }
        .endpoint:hover::before { background: var(--red); }

        .method {
            font-family: 'DM Mono', monospace;
            font-size: 10px;
            font-weight: 400;
            letter-spacing: 1px;
            padding: 4px 0;
            text-align: center;
            border-radius: 2px;
        }

        .method-get {
            color: #4ade80;
            background: rgba(74,222,128,0.07);
            border: 0.5px solid rgba(74,222,128,0.2);
        }

        .method-post {
            color: #60a5fa;
            background: rgba(96,165,250,0.07);
            border: 0.5px solid rgba(96,165,250,0.2);
        }

        .endpoint-info { display: flex; flex-direction: column; gap: 4px; }

        .endpoint-path {
            font-family: 'DM Mono', monospace;
            font-size: 13px;
            font-weight: 300;
            color: var(--white);
            letter-spacing: 0.3px;
        }

        .endpoint-desc {
            font-size: 11px;
            color: rgba(245,240,235,0.3);
            font-weight: 300;
            letter-spacing: 0.3px;
        }

        .endpoint-arrow {
            font-size: 14px;
            color: rgba(245,240,235,0.12);
            transition: color 0.2s, transform 0.2s;
        }

        .endpoint:hover .endpoint-arrow {
            color: var(--red);
            transform: translateX(3px);
        }

        /* ─── Stats row ─── */
        .stats {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 1px;
            background: var(--border);
            border: 0.5px solid var(--border);
            border-radius: 4px;
            overflow: hidden;
        }

        .stat {
            background: var(--surface);
            padding: 20px 24px;
            display: flex;
            flex-direction: column;
            gap: 6px;
        }

        .stat-value {
            font-family: 'Playfair Display', serif;
            font-size: 26px;
            font-weight: 700;
            color: var(--white);
            line-height: 1;
        }

        .stat-value span { color: var(--red); }

        .stat-label {
            font-family: 'DM Mono', monospace;
            font-size: 9px;
            letter-spacing: 3px;
            text-transform: uppercase;
            color: rgba(245,240,235,0.25);
            font-weight: 300;
        }

        /* ─── Footer ─── */
        footer {
            padding: 24px 0 32px;
            border-top: 0.5px solid var(--border);
            display: flex;
            justify-content: space-between;
            align-items: center;
            animation: fadeUp 0.7s 0.25s ease both;
        }

        .footer-copy {
            font-family: 'DM Mono', monospace;
            font-size: 10px;
            letter-spacing: 2px;
            color: rgba(245,240,235,0.2);
            font-weight: 300;
        }

        .footer-loc {
            display: flex;
            align-items: center;
            gap: 6px;
            font-size: 10px;
            letter-spacing: 2px;
            text-transform: uppercase;
            color: rgba(245,240,235,0.2);
        }

        .footer-loc::before {
            content: '';
            display: inline-block;
            width: 5px; height: 5px;
            border-radius: 50%;
            background: var(--red);
        }

        /* ─── Animations ─── */
        @keyframes fadeDown {
            from { opacity: 0; transform: translateY(-12px); }
            to   { opacity: 1; transform: translateY(0); }
        }

        @keyframes fadeUp {
            from { opacity: 0; transform: translateY(16px); }
            to   { opacity: 1; transform: translateY(0); }
        }

        /* ─── Responsive ─── */
        @media (max-width: 560px) {
            .page { padding: 0 20px; }
            .stats { grid-template-columns: 1fr 1fr; }
            .stats .stat:last-child { display: none; }
            header { flex-direction: column; gap: 16px; }
            .endpoint { grid-template-columns: 48px 1fr auto; gap: 12px; }
        }
    </style>
</head>
<body>
    <div class="page">

        <header>
            <div class="wordmark">
                <span class="wordmark-top">REST Interface</span>
                <span class="wordmark-brand">Barber <span>Royale</span></span>
            </div>
            <div class="status-pill">
                <span class="pulse-dot"></span>
                OPERATIONAL
            </div>
        </header>

        <main>
            <p class="eyebrow">// API Reference</p>

            <h1 class="hero-title">
                Sharp.<br>
                <em>Clean.</em><br>
                Precise.
            </h1>

            <p class="hero-sub">
                Production API for Barber Royale — serving appointments,
                client records, and booking flows from Casablanca.
            </p>

            <div class="section-label">
                <span>Endpoints</span>
            </div>

            <div class="endpoints">

                <div class="endpoint">
                    <span class="method method-get">GET</span>
                    <div class="endpoint-info">
                        <span class="endpoint-path">/api/testDB</span>
                        <span class="endpoint-desc">Database connectivity check</span>
                    </div>
                    <span class="endpoint-arrow">→</span>
                </div>

                <div class="endpoint">
                    <span class="method method-post">POST</span>
                    <div class="endpoint-info">
                        <span class="endpoint-path">/api/contact</span>
                        <span class="endpoint-desc">Submit booking request</span>
                    </div>
                    <span class="endpoint-arrow">→</span>
                </div>

            </div>

            <div class="section-label">
                <span>Service</span>
            </div>

            <div class="stats">
                <div class="stat">
                    <span class="stat-value">v<span>2</span>.0</span>
                    <span class="stat-label">API Version</span>
                </div>
                <div class="stat">
                    <span class="stat-value"><span>99</span>.9%</span>
                    <span class="stat-label">Uptime SLA</span>
                </div>
                <div class="stat">
                    <span class="stat-value">Casa<span>.</span></span>
                    <span class="stat-label">Region</span>
                </div>
            </div>
        </main>

        <footer>
            <span class="footer-copy">&copy; 2026 Barber Royale</span>
            <span class="footer-loc">Casablanca, MA</span>
        </footer>

    </div>
</body>
</html>
    `);
};