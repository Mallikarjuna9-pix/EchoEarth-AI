/**
 * Ultra-fast embedded demo images for hackathon demonstrations.
 * These SVG/base64 data URIs load with 0ms network latency and work 100% offline.
 */

// Lightweight high-fidelity SVG representations formatted as data URIs
function svgToDataUri(svgContent: string): string {
  return `data:image/svg+xml;utf8,${encodeURIComponent(svgContent.trim())}`;
}

export const DEMO_WASTE_PHOTOS: Record<string, { title: string; material: string; dataUrl: string }> = {
  bottle: {
    title: "Crushed 500ml PET Plastic Water Bottle",
    material: "PET #1 Plastic",
    dataUrl: svgToDataUri(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="600" height="600">
        <defs>
          <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#f5f5f4"/>
            <stop offset="100%" stop-color="#e7e5e4"/>
          </linearGradient>
          <linearGradient id="plastic" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#dbeafe" stop-opacity="0.9"/>
            <stop offset="30%" stop-color="#ffffff" stop-opacity="0.95"/>
            <stop offset="70%" stop-color="#bfdbfe" stop-opacity="0.8"/>
            <stop offset="100%" stop-color="#93c5fd" stop-opacity="0.9"/>
          </linearGradient>
          <linearGradient id="cap" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#16a34a"/>
            <stop offset="100%" stop-color="#15803d"/>
          </linearGradient>
        </defs>
        <rect width="600" height="600" fill="url(#bg)"/>
        <!-- Soft shadow -->
        <ellipse cx="300" cy="510" rx="140" ry="25" fill="#000000" opacity="0.12"/>
        <!-- Screw cap -->
        <rect x="270" y="80" width="60" height="30" rx="4" fill="url(#cap)"/>
        <line x1="275" y1="80" x2="275" y2="110" stroke="#ffffff" stroke-width="2" opacity="0.4"/>
        <line x1="285" y1="80" x2="285" y2="110" stroke="#ffffff" stroke-width="2" opacity="0.4"/>
        <line x1="315" y1="80" x2="315" y2="110" stroke="#ffffff" stroke-width="2" opacity="0.4"/>
        <line x1="325" y1="80" x2="325" y2="110" stroke="#ffffff" stroke-width="2" opacity="0.4"/>
        <!-- Bottle neck -->
        <path d="M280,110 L280,140 L260,170 L340,170 L320,140 L320,110 Z" fill="url(#plastic)" stroke="#93c5fd" stroke-width="2"/>
        <!-- Bottle body with crumple facets -->
        <path d="M260,170 C240,200 235,240 250,280 C240,320 230,360 255,410 C245,450 250,480 270,490 L330,490 C350,480 355,450 345,410 C370,360 360,320 350,280 C365,240 360,200 340,170 Z" fill="url(#plastic)" stroke="#60a5fa" stroke-width="2"/>
        <!-- Ribbed texture and crumple indentations -->
        <path d="M250,280 Q300,300 350,280" stroke="#60a5fa" stroke-width="3" fill="none" opacity="0.6"/>
        <path d="M245,340 Q300,365 355,340" stroke="#60a5fa" stroke-width="3" fill="none" opacity="0.6"/>
        <path d="M255,410 Q300,430 345,410" stroke="#60a5fa" stroke-width="3" fill="none" opacity="0.6"/>
        <!-- Highlights -->
        <path d="M275,190 Q270,320 280,460" stroke="#ffffff" stroke-width="8" stroke-linecap="round" fill="none" opacity="0.7"/>
        <!-- Resin Code Stamp -->
        <circle cx="300" cy="385" r="18" fill="#ffffff" opacity="0.85"/>
        <text x="300" y="391" font-family="sans-serif" font-size="16" font-weight="bold" fill="#0284c7" text-anchor="middle">♳ 1</text>
        <!-- Item Label Badge -->
        <rect x="180" y="540" width="240" height="32" rx="16" fill="#1c1917" opacity="0.85"/>
        <text x="300" y="561" font-family="sans-serif" font-size="13" font-weight="bold" fill="#ffffff" text-anchor="middle">DEMO: #1 PET Water Bottle</text>
      </svg>
    `),
  },
  cardboard: {
    title: "Corrugated Cardboard Box & Kraft Paper Roll",
    material: "Kraft Paperboard / Corrugated Cellulose",
    dataUrl: svgToDataUri(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="600" height="600">
        <defs>
          <linearGradient id="cbbg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#fafaf9"/>
            <stop offset="100%" stop-color="#e7e5e4"/>
          </linearGradient>
          <linearGradient id="craft1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#d7a15c"/>
            <stop offset="100%" stop-color="#b47836"/>
          </linearGradient>
          <linearGradient id="craft2" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#c9924d"/>
            <stop offset="100%" stop-color="#9d6428"/>
          </linearGradient>
        </defs>
        <rect width="600" height="600" fill="url(#cbbg)"/>
        <ellipse cx="300" cy="510" rx="180" ry="25" fill="#000000" opacity="0.14"/>
        <!-- Shipping Box (isometric angle) -->
        <!-- Front side -->
        <polygon points="170,280 320,350 320,490 170,410" fill="url(#craft1)" stroke="#82501a" stroke-width="2"/>
        <!-- Right side -->
        <polygon points="320,350 450,280 450,410 320,490" fill="url(#craft2)" stroke="#82501a" stroke-width="2"/>
        <!-- Top flaps (open) -->
        <polygon points="170,280 320,350 450,280 300,220" fill="#e4b574" stroke="#82501a" stroke-width="2"/>
        <polygon points="170,280 120,240 250,190 300,220" fill="#c9924d" stroke="#82501a" stroke-width="2"/>
        <polygon points="450,280 500,240 370,190 300,220" fill="#b47836" stroke="#82501a" stroke-width="2"/>
        <!-- Toilet paper roll next to it -->
        <ellipse cx="430" cy="460" rx="45" ry="18" fill="#82501a"/>
        <path d="M385,380 L385,460 C385,470 475,470 475,460 L475,380 Z" fill="#d7a15c" stroke="#82501a" stroke-width="2"/>
        <ellipse cx="430" cy="380" rx="45" ry="18" fill="#e4b574" stroke="#82501a" stroke-width="2"/>
        <ellipse cx="430" cy="380" rx="18" ry="7" fill="#5c3810"/>
        <!-- Recycling Symbol on Box -->
        <text x="245" y="380" font-family="sans-serif" font-size="34" fill="#5c3810" opacity="0.7">♺</text>
        <rect x="180" y="540" width="240" height="32" rx="16" fill="#1c1917" opacity="0.85"/>
        <text x="300" y="561" font-family="sans-serif" font-size="13" font-weight="bold" fill="#ffffff" text-anchor="middle">DEMO: Corrugated Cardboard</text>
      </svg>
    `),
  },
  jar: {
    title: "Empty Glass Jam Jar with Lid",
    material: "Soda-Lime Glass & Steel Cap",
    dataUrl: svgToDataUri(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="600" height="600">
        <defs>
          <linearGradient id="jarbg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#f5f5f4"/>
            <stop offset="100%" stop-color="#e7e5e4"/>
          </linearGradient>
          <linearGradient id="glass" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#e0f2fe" stop-opacity="0.8"/>
            <stop offset="25%" stop-color="#ffffff" stop-opacity="0.95"/>
            <stop offset="70%" stop-color="#bae6fd" stop-opacity="0.7"/>
            <stop offset="100%" stop-color="#7dd3fc" stop-opacity="0.85"/>
          </linearGradient>
          <linearGradient id="goldcap" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#fbbf24"/>
            <stop offset="100%" stop-color="#d97706"/>
          </linearGradient>
        </defs>
        <rect width="600" height="600" fill="url(#jarbg)"/>
        <ellipse cx="300" cy="500" rx="120" ry="25" fill="#000000" opacity="0.14"/>
        <!-- Gold Metal Lid -->
        <rect x="220" y="140" width="160" height="40" rx="6" fill="url(#goldcap)" stroke="#b45309" stroke-width="2"/>
        <line x1="230" y1="165" x2="370" y2="165" stroke="#ffffff" stroke-width="2" opacity="0.5"/>
        <!-- Glass Jar Body -->
        <rect x="210" y="180" width="180" height="300" rx="28" fill="url(#glass)" stroke="#38bdf8" stroke-width="3"/>
        <!-- Highlights -->
        <path d="M235,210 L235,450" stroke="#ffffff" stroke-width="10" stroke-linecap="round" opacity="0.8"/>
        <path d="M365,220 L365,440" stroke="#ffffff" stroke-width="4" stroke-linecap="round" opacity="0.6"/>
        <!-- Empty paper label trace -->
        <rect x="230" y="270" width="140" height="110" rx="8" fill="#ffffff" opacity="0.8" stroke="#cbd5e1"/>
        <text x="300" y="325" font-family="sans-serif" font-size="14" font-weight="bold" fill="#0369a1" text-anchor="middle">CLEAN REUSABLE</text>
        <text x="300" y="345" font-family="sans-serif" font-size="12" fill="#64748b" text-anchor="middle">100% Infinitely Recyclable</text>
        <rect x="180" y="540" width="240" height="32" rx="16" fill="#1c1917" opacity="0.85"/>
        <text x="300" y="561" font-family="sans-serif" font-size="13" font-weight="bold" fill="#ffffff" text-anchor="middle">DEMO: Glass Food Jar</text>
      </svg>
    `),
  },
  can: {
    title: "Empty Aluminum Beverage Soda Can",
    material: "Aluminum Alloy 3004",
    dataUrl: svgToDataUri(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="600" height="600">
        <defs>
          <linearGradient id="canbg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#f5f5f4"/>
            <stop offset="100%" stop-color="#e7e5e4"/>
          </linearGradient>
          <linearGradient id="metal" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#e2e8f0"/>
            <stop offset="25%" stop-color="#ffffff"/>
            <stop offset="50%" stop-color="#cbd5e1"/>
            <stop offset="75%" stop-color="#94a3b8"/>
            <stop offset="100%" stop-color="#64748b"/>
          </linearGradient>
          <linearGradient id="redsoda" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#dc2626"/>
            <stop offset="35%" stop-color="#ef4444"/>
            <stop offset="70%" stop-color="#b91c1c"/>
            <stop offset="100%" stop-color="#991b1b"/>
          </linearGradient>
        </defs>
        <rect width="600" height="600" fill="url(#canbg)"/>
        <ellipse cx="300" cy="510" rx="110" ry="22" fill="#000000" opacity="0.14"/>
        <!-- Top Rim and Pull Tab -->
        <ellipse cx="300" cy="150" rx="85" ry="25" fill="url(#metal)" stroke="#475569" stroke-width="2"/>
        <ellipse cx="300" cy="150" rx="60" ry="16" fill="#64748b"/>
        <!-- Pull tab -->
        <rect x="290" y="140" width="30" height="18" rx="4" fill="#e2e8f0" stroke="#334155" stroke-width="1.5"/>
        <circle cx="300" cy="149" r="4" fill="#334155"/>
        <!-- Can cylinder -->
        <path d="M215,150 L215,480 C215,495 385,495 385,480 L385,150 Z" fill="url(#redsoda)" stroke="#7f1d1d" stroke-width="2"/>
        <!-- Silver bottom bevel -->
        <path d="M225,480 C225,495 375,495 375,480 L370,500 C370,510 230,510 230,500 Z" fill="url(#metal)" stroke="#475569" stroke-width="2"/>
        <!-- Vertical sheen highlight -->
        <path d="M245,160 L245,480" stroke="#ffffff" stroke-width="16" opacity="0.4"/>
        <!-- Chasing arrows logo -->
        <text x="300" y="330" font-family="sans-serif" font-size="44" fill="#ffffff" text-anchor="middle">♳ 41</text>
        <text x="300" y="360" font-family="sans-serif" font-size="14" font-weight="bold" fill="#ffffff" text-anchor="middle">ALU</text>
        <rect x="180" y="540" width="240" height="32" rx="16" fill="#1c1917" opacity="0.85"/>
        <text x="300" y="561" font-family="sans-serif" font-size="13" font-weight="bold" fill="#ffffff" text-anchor="middle">DEMO: Aluminum Soda Can</text>
      </svg>
    `),
  },
};
