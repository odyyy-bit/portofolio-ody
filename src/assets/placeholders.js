function svgToDataUrl(svgString) {
  return `data:image/svg+xml;utf8,${encodeURIComponent(svgString.trim())}`;
}

export const defaultAvatarPlaceholder = svgToDataUrl(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 480" fill="none">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="480" y2="480" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#18181F" />
      <stop offset="100%" stop-color="#0E0E13" />
    </linearGradient>
    <linearGradient id="accent" x1="80" y1="60" x2="400" y2="420" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#8B5CF6" stop-opacity="0.55" />
      <stop offset="100%" stop-color="#3B82F6" stop-opacity="0.55" />
    </linearGradient>
  </defs>
  <rect width="480" height="480" fill="url(#bg)" />
  <circle cx="240" cy="185" r="78" fill="url(#accent)" />
  <path d="M108 424C108 344.471 167.085 280 240 280C312.915 280 372 344.471 372 424" fill="url(#accent)" />
  <text x="240" y="454" text-anchor="middle" fill="#94A3B8" font-family="sans-serif" font-size="15" letter-spacing="1">GANTI FOTO PROFIL (src/data/profileData.js)</text>
</svg>
`);

// Placeholder PNG/SVG transparan (tanpa latar belakang) untuk bagian Skills Orbit
export const transparentCutoutPlaceholder = svgToDataUrl(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 420 460" fill="none">
  <defs>
    <linearGradient id="cutoutGrad" x1="110" y1="60" x2="310" y2="430" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#8B5CF6" stop-opacity="0.72" />
      <stop offset="100%" stop-color="#3B82F6" stop-opacity="0.72" />
    </linearGradient>
    <linearGradient id="cutoutStroke" x1="110" y1="60" x2="310" y2="430" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#C4B5FD" />
      <stop offset="100%" stop-color="#93C5FD" />
    </linearGradient>
  </defs>
  <circle cx="210" cy="145" r="66" fill="url(#cutoutGrad)" stroke="url(#cutoutStroke)" stroke-width="2" />
  <path d="M88 415C88 328.291 142.621 258 210 258C277.379 258 332 328.291 332 415" fill="url(#cutoutGrad)" stroke="url(#cutoutStroke)" stroke-width="2" />
  <text x="210" y="345" text-anchor="middle" fill="#FFFFFF" font-family="sans-serif" font-weight="700" font-size="14">FOTO PNG TANPA</text>
  <text x="210" y="365" text-anchor="middle" fill="#FFFFFF" font-family="sans-serif" font-weight="700" font-size="14">LATAR BELAKANG</text>
</svg>
`);

export function createProjectPlaceholder(title, tag = 'PROJECT') {
  return svgToDataUrl(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 480" fill="none">
  <defs>
    <linearGradient id="pbg" x1="0" y1="0" x2="800" y2="480" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#14141B" />
      <stop offset="100%" stop-color="#0B0B0F" />
    </linearGradient>
    <linearGradient id="pline" x1="120" y1="90" x2="680" y2="390" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#8B5CF6" stop-opacity="0.4" />
      <stop offset="100%" stop-color="#3B82F6" stop-opacity="0.4" />
    </linearGradient>
  </defs>
  <rect width="800" height="480" fill="url(#pbg)" />
  <rect x="48" y="44" width="704" height="392" rx="20" fill="#181820" stroke="url(#pline)" stroke-width="2" />
  <circle cx="88" cy="76" r="6" fill="#8B5CF6" />
  <circle cx="108" cy="76" r="6" fill="#3B82F6" />
  <circle cx="128" cy="76" r="6" fill="#64748B" />
  <text x="400" y="218" text-anchor="middle" fill="#A78BFA" font-family="monospace" font-size="16" letter-spacing="3">${escapeXml(tag)}</text>
  <text x="400" y="262" text-anchor="middle" fill="#F8FAFC" font-family="sans-serif" font-weight="700" font-size="30">${escapeXml(title)}</text>
  <text x="400" y="302" text-anchor="middle" fill="#94A3B8" font-family="sans-serif" font-size="15">Thumbnail placeholder — dapat diganti di src/data/projectsData.js</text>
</svg>
`);
}

export function createCertificatePlaceholder(title, issuer = 'ISSUER') {
  return svgToDataUrl(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 540" fill="none">
  <defs>
    <linearGradient id="cbg" x1="0" y1="0" x2="800" y2="540" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#15151E" />
      <stop offset="100%" stop-color="#0C0C10" />
    </linearGradient>
    <linearGradient id="cborder" x1="60" y1="50" x2="740" y2="490" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#8B5CF6" />
      <stop offset="100%" stop-color="#3B82F6" />
    </linearGradient>
  </defs>
  <rect width="800" height="540" fill="url(#cbg)" />
  <rect x="36" y="36" width="728" height="468" rx="18" fill="#13131A" stroke="url(#cborder)" stroke-width="2" stroke-opacity="0.65" />
  <rect x="54" y="54" width="692" height="432" rx="12" stroke="rgba(255,255,255,0.08)" stroke-width="1" stroke-dasharray="6 6" />
  <text x="400" y="165" text-anchor="middle" fill="#93C5FD" font-family="monospace" font-size="15" letter-spacing="4">CERTIFICATE OF COMPLETION</text>
  <text x="400" y="248" text-anchor="middle" fill="#F8FAFC" font-family="sans-serif" font-weight="700" font-size="28">${escapeXml(title)}</text>
  <text x="400" y="294" text-anchor="middle" fill="#94A3B8" font-family="sans-serif" font-size="17">${escapeXml(issuer)}</text>
  <text x="400" y="388" text-anchor="middle" fill="#64748B" font-family="sans-serif" font-size="14">Placeholder sertifikat — perbarui gambar &amp; data di src/data/certificatesData.js</text>
</svg>
`);
}

function escapeXml(str = '') {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}
