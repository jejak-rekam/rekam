'use strict';
/* ========== CONFIG ========== */
const CONFIG = {
  VERSI: '1.5.4',
  API: 'https://generativelanguage.googleapis.com',
  MODEL: 'gemini-flash-latest',       // model utama (bisa diganti / dicek di menu Atur)
  MODEL_CADANGAN: 'gemini-flash-lite-latest', // dipakai kalau model utama tidak tersedia
  MAKS_MB: 1900                       // batas ukuran rekaman (batas Gemini 2 GB)
};
const WARNA = ['coral', 'butter', 'sage', 'blue', 'lilac'];
const HEX = { coral: '#E0704F', butter: '#E0A532', sage: '#5E8C7A', blue: '#6F8FBC', lilac: '#9476AE' };
const PASTEL = { coral: '#F9DCCD', butter: '#FAEBC2', sage: '#DCE8DC', blue: '#D8E3F1', lilac: '#EADCF0' };
const TEKS = { coral: '#7A3A22', butter: '#6B5320', sage: '#2F5A47', blue: '#34507A', lilac: '#5A3E70' };

/* ========== IKON ========== */
const P = (d, c) => `<path fill="${c}" d="${d}"/>`;
const S = (d, c, w = 2.4) => `<path d="${d}" fill="none" stroke="${c}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>`;
const ICON = {
  home: c => P('M12 3l9 7.5V20a1.5 1.5 0 0 1-1.5 1.5H15v-6H9v6H4.5A1.5 1.5 0 0 1 3 20v-9.5z', c),
  orang: c => `<circle cx="9" cy="8" r="4" fill="${c}"/>${P('M1.5 20.5c.6-4.4 3.6-7 7.5-7s6.9 2.6 7.5 7z', c)}<circle cx="17.5" cy="9" r="3" fill="${c}" opacity=".7"/>${P('M17.5 13.5c2.8 0 4.6 2 5 5.5h-5c-.2-2.2-1-4-2.3-5.2.7-.2 1.5-.3 2.3-.3z', c).replace('/>', ' opacity=".7"/>')}`,
  tugas: (c, k = '#fff') => `<rect x="4" y="3" width="16" height="18" rx="4" fill="${c}"/>${S('M8 12.5l2.6 2.6L16 9.6', k, 2.6)}`,
  atur: (c, k = '#FBF4EC') => P('M10.3 2h3.4l.6 2.8 1.9.8 2.4-1.6 2.4 2.4-1.6 2.4.8 1.9 2.8.6v3.4l-2.8.6-.8 1.9 1.6 2.4-2.4 2.4-2.4-1.6-1.9.8-.6 2.8h-3.4l-.6-2.8-1.9-.8-2.4 1.6-2.4-2.4 1.6-2.4-.8-1.9L2 13.7v-3.4l2.8-.6.8-1.9L4 5.4 6.4 3l2.4 1.6 1.9-.8z', c) + `<circle cx="12" cy="12" r="3.4" fill="${k}"/>`,
  plus: c => S('M12 5v14M5 12h14', c, 2.8),
  mic: c => P('M12 2a3.5 3.5 0 0 1 3.5 3.5v6a3.5 3.5 0 0 1-7 0v-6A3.5 3.5 0 0 1 12 2z', c) + S('M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21', c),
  unggah: c => P('M12 3l5.5 5.5h-3.5v6h-4v-6H6.5z', c) + P('M4 15h3v3h10v-3h3v4.5a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 19.5z', c),
  bell: c => P('M12 2.5a6.5 6.5 0 0 0-6.5 6.5c0 5.5-2.5 7.5-2.5 7.5h18s-2.5-2-2.5-7.5A6.5 6.5 0 0 0 12 2.5zM9.5 19a2.5 2.5 0 0 0 5 0z', c),
  back: c => S('M15 18l-6-6 6-6', c, 2.6),
  star: c => P('M12 2.5l2.9 6 6.6.8-4.9 4.5 1.3 6.5L12 17l-5.9 3.3 1.3-6.5L2.5 9.3l6.6-.8z', c),
  ok: (c, k = '#fff') => `<circle cx="12" cy="12" r="10" fill="${c}"/>${S('M7.5 12.5l3 3 6-6', k, 2.6)}`,
  jam: (c, k) => `<circle cx="12" cy="12" r="9.5" fill="${c}"/>${S('M12 7v5.2l3.4 2', k)}`,
  tanya: (c, k) => `<circle cx="12" cy="12" r="10" fill="${c}"/>${S('M9.5 9.5a2.5 2.5 0 1 1 3.4 2.3c-.6.3-.9.8-.9 1.4v.5', k)}<circle cx="12" cy="17" r="1.4" fill="${k}"/>`,
  kutip: c => P('M4 6h6v6c0 4-2.5 6.5-5.5 7.5l-.8-1.6C5.6 17 7 15.2 7 13H4zm10 0h6v6c0 4-2.5 6.5-5.5 7.5l-.8-1.6c1.9-.9 3.3-2.7 3.3-4.9h-3z', c),
  hati: c => P('M12 21s-7.5-4.6-9.5-9.3C1 8.2 3.3 5 6.6 5c2 0 3.5 1.1 4.4 2.5C11.9 6.1 13.4 5 15.4 5c3.3 0 5.6 3.2 4.1 6.7C17.5 16.4 12 21 12 21z', c),
  kirim: c => P('M2.5 11.3L21 3l-8.3 18.5-2.4-7.8z', c),
  unduh: c => P('M12 15l-5.5-5.5H10V3h4v6.5h3.5z', c) + P('M4 15h3v3h10v-3h3v4.5a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 19.5z', c),
  sampah: c => P('M9 3h6l1 2h4v2H4V5h4zM6 9h12l-1 11.5a1.5 1.5 0 0 1-1.5 1.5h-7A1.5 1.5 0 0 1 7 20.5z', c),
  centang: c => S('M5 12.5l4.5 4.5L19 7.5', c, 3.2)
};
const svg = (n, c = '#fff', k, box = '0 0 24 24') => `<svg viewBox="${box}" aria-hidden="true">${ICON[n](c, k)}</svg>`;

/* Ilustrasi kecil untuk kartu poin (viewBox 70x56) */
const ILL = {
  kasir: '<rect x="6" y="6" width="52" height="34" rx="8" fill="#fff"/><rect x="12" y="12" width="40" height="22" rx="4" fill="#F6CDB8"/><rect x="16" y="17" width="18" height="4" rx="2" fill="#E0704F"/><rect x="16" y="25" width="28" height="4" rx="2" fill="#fff"/><rect x="24" y="42" width="16" height="8" rx="3" fill="#E2BBA5"/><circle cx="60" cy="10" r="8" fill="#5E8C7A"/><path d="M56 10l3 3 5-6" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round"/>',
  stok: '<rect x="4" y="24" width="28" height="26" rx="5" fill="#E9C27A"/><rect x="4" y="24" width="28" height="7" rx="3" fill="#F3D79A"/><rect x="34" y="12" width="28" height="38" rx="5" fill="#E9C27A"/><rect x="34" y="12" width="28" height="7" rx="3" fill="#F3D79A"/><circle cx="60" cy="9" r="8" fill="#E0704F"/><rect x="59" y="4" width="2.4" height="6" rx="1.2" fill="#fff"/><circle cx="60.2" cy="13" r="1.4" fill="#fff"/>',
  orang: '<circle cx="22" cy="18" r="9" fill="#F3D3BD"/><path d="M8 50c1-11 7-17 14-17s13 6 14 17z" fill="#5E8C7A"/><circle cx="44" cy="20" r="8" fill="#F3D3BD"/><path d="M32 50c1-10 6-15 12-15s11 5 12 15z" fill="#6F8FBC"/>',
  laporan: '<rect x="16" y="2" width="32" height="52" rx="7" fill="#4A5D7E"/><rect x="19" y="7" width="26" height="40" rx="4" fill="#fff"/><rect x="23" y="32" width="5" height="11" rx="2" fill="#6F8FBC"/><rect x="30" y="24" width="5" height="19" rx="2" fill="#E0704F"/><rect x="37" y="18" width="5" height="25" rx="2" fill="#5E8C7A"/><circle cx="58" cy="8" r="4" fill="#F3CF6E"/>',
  uang: '<ellipse cx="24" cy="44" rx="16" ry="6" fill="#D9A93A"/><rect x="8" y="34" width="32" height="10" fill="#E9C27A"/><ellipse cx="24" cy="34" rx="16" ry="6" fill="#F3D79A"/><ellipse cx="24" cy="26" rx="16" ry="6" fill="#D9A93A"/><rect x="8" y="16" width="32" height="10" fill="#E9C27A"/><ellipse cx="24" cy="16" rx="16" ry="6" fill="#F3D79A"/><path d="M44 10h16a4 4 0 0 1 4 4v14l-12 12-12-12V14a4 4 0 0 1 4-4z" fill="#9476AE"/><circle cx="51" cy="18" r="3" fill="#fff"/>',
  jadwal: '<rect x="6" y="8" width="44" height="42" rx="8" fill="#fff"/><rect x="6" y="8" width="44" height="12" rx="6" fill="#E0704F"/><rect x="14" y="3" width="4" height="10" rx="2" fill="#4A3428"/><rect x="38" y="3" width="4" height="10" rx="2" fill="#4A3428"/><circle cx="18" cy="30" r="3" fill="#F6CDB8"/><circle cx="28" cy="30" r="3" fill="#F6CDB8"/><circle cx="38" cy="30" r="3" fill="#5E8C7A"/><circle cx="18" cy="40" r="3" fill="#F6CDB8"/><circle cx="58" cy="40" r="9" fill="#F3CF6E"/><path d="M58 35v5l3 2" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round"/>',
  ide: '<circle cx="34" cy="22" r="16" fill="#F3CF6E"/><circle cx="29" cy="17" r="5" fill="#fff" opacity=".6"/><rect x="27" y="38" width="14" height="10" rx="3" fill="#B8A898"/><rect x="29" y="48" width="10" height="4" rx="2" fill="#8F7E6E"/><path d="M8 18h6M54 18h6M14 4l4 4M54 4l-4 4" stroke="#E0A532" stroke-width="3" stroke-linecap="round"/>',
  masalah: '<path d="M35 4l29 48H6z" fill="#F7AE92"/><path d="M35 12l22 36H13z" fill="#E0704F"/><rect x="33" y="22" width="4" height="14" rx="2" fill="#fff"/><circle cx="35" cy="42" r="2.4" fill="#fff"/>',
  dokumen: '<rect x="14" y="4" width="36" height="48" rx="6" fill="#fff"/><rect x="20" y="12" width="20" height="4" rx="2" fill="#E0704F"/><rect x="20" y="22" width="24" height="3" rx="1.5" fill="#D9C7B6"/><rect x="20" y="30" width="24" height="3" rx="1.5" fill="#D9C7B6"/><rect x="20" y="38" width="16" height="3" rx="1.5" fill="#D9C7B6"/><circle cx="54" cy="44" r="9" fill="#5E8C7A"/><path d="M50 44l3 3 5-6" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round"/>',
  target: '<circle cx="30" cy="30" r="22" fill="#fff"/><circle cx="30" cy="30" r="15" fill="#F7AE92"/><circle cx="30" cy="30" r="8" fill="#fff"/><circle cx="30" cy="30" r="4" fill="#E0704F"/><path d="M31 29L60 6" stroke="#4A3428" stroke-width="3" stroke-linecap="round"/><path d="M56 4l8-2-2 8z" fill="#5E8C7A"/>',
  chat: '<rect x="4" y="6" width="40" height="26" rx="10" fill="#fff"/><path d="M12 30l-2 10 10-8z" fill="#fff"/><rect x="26" y="22" width="40" height="26" rx="10" fill="#6F8FBC"/><path d="M58 46l2 8-10-6z" fill="#6F8FBC"/><circle cx="16" cy="19" r="3" fill="#E0704F"/><circle cx="25" cy="19" r="3" fill="#E0A532"/><circle cx="34" cy="19" r="3" fill="#5E8C7A"/>',
  rumah: '<path d="M8 26L34 6l26 20v24H8z" fill="#fff"/><path d="M4 28L34 4l30 24" fill="none" stroke="#E0704F" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/><rect x="28" y="34" width="12" height="16" rx="2" fill="#E0A532"/><rect x="14" y="30" width="9" height="9" rx="2" fill="#AFC6E6"/>'
};
const ILK_SVG = {
  matahari: '<circle cx="35" cy="28" r="13" fill="#F3CF6E"/><path d="M35 4v8M35 44v8M11 28h8M51 28h8M18 11l6 6M46 39l6 6M52 11l-6 6M24 39l-6 6" stroke="#E0A532" stroke-width="3.5" stroke-linecap="round"/>',
  hati: '<path d="M35 50C14 36 10 26 14 18c4-8 15-9 21 0 6-9 17-8 21 0 4 8 0 18-21 32z" fill="#AFC6E6"/><path d="M24 20c-3 1-5 4-5 7" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round"/>',
  buku: '<path d="M8 14c9-4 18-4 27 2v34c-9-6-18-6-27-2z" fill="#fff"/><path d="M62 14c-9-4-18-4-27 2v34c9-6 18-6 27-2z" fill="#F3E3C4"/><path d="M35 16v34" stroke="#B08560" stroke-width="3"/><rect x="45" y="22" width="4" height="12" rx="1" fill="#C9A24A"/><rect x="41" y="26" width="12" height="4" rx="1" fill="#C9A24A"/>',
  merpati: '<path d="M10 34c10-2 18-10 22-20 4 9 6 16 4 22 8-6 16-6 24-4-6 10-18 16-32 14-7-1-13-6-18-12z" fill="#fff"/><path d="M36 36c-2 6-8 10-14 10" stroke="#AFC6E6" stroke-width="3" fill="none" stroke-linecap="round"/><circle cx="18" cy="32" r="2" fill="#4A6E99"/>',
  cahaya: '<path d="M35 6l7 16 17 2-13 11 4 17-15-9-15 9 4-17-13-11 17-2z" fill="#F6E6C4" stroke="#E0A532" stroke-width="3" stroke-linejoin="round"/>'
};
const ILS_SVG = { // ikon belajar (seminar / kelas)
  buku: '<path d="M8 12h24a6 6 0 0 1 6 6v32a5 5 0 0 0-5-5H8z" fill="#fff"/><path d="M62 12H44a6 6 0 0 0-6 6v32a5 5 0 0 1 5-5h19z" fill="#DDEBD9"/><rect x="44" y="20" width="12" height="3" rx="1.5" fill="#3F6B45"/><rect x="44" y="27" width="10" height="3" rx="1.5" fill="#3F6B45"/>',
  pensil: '<rect x="10" y="22" width="40" height="12" rx="3" fill="#F3C94E" transform="rotate(-30 30 28)"/><path d="M47 13l9-3-4 9z" fill="#4A3428"/><rect x="6" y="36" width="9" height="12" rx="3" fill="#F29BA0" transform="rotate(-30 10 42)"/>',
  lampu: '<circle cx="35" cy="22" r="15" fill="#F3CF6E"/><circle cx="30" cy="17" r="4" fill="#fff" opacity=".7"/><rect x="28" y="37" width="14" height="9" rx="3" fill="#3F6B45"/><path d="M8 20h6M56 20h6M14 6l4 4M56 6l-4 4" stroke="#E0A82E" stroke-width="3" stroke-linecap="round"/>',
  topi: '<path d="M35 8l30 12-30 12L5 20z" fill="#2E3A55"/><path d="M18 26v12c8 6 26 6 34 0V26l-17 7z" fill="#3E4C6E"/><path d="M60 22v16" stroke="#E0A82E" stroke-width="3"/><circle cx="60" cy="40" r="4" fill="#E0A82E"/>',
  papan: '<rect x="6" y="8" width="58" height="36" rx="5" fill="#3F6B45"/><rect x="6" y="8" width="58" height="36" rx="5" fill="none" stroke="#B88A55" stroke-width="4"/><path d="M14 20h20M14 28h30M14 36h14" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".85"/>'
};
const TEMA = { // tampilan per jenis: gambar Ippo, judul, warna, ikon kartu
  khotbah: { k: 'CATATAN KHOTBAH', app: 'ippo-alkitab', wa: 'ippo-doa', kep: '#F6E6C4', bg: '#F3ECE0', pos: '#FFFBF3', kc: '#8A6A1E', jc: '#4A3A2A', ic: '#6E5530', ikon: ['matahari', 'hati', 'buku', 'merpati', 'cahaya'].map(n => ILK_SVG[n]),
    PA: { coral: '#F3E9DD', butter: '#FBF1D9', sage: '#E8EFE6', blue: '#E3ECF6', lilac: '#E3ECF6' }, TK: { coral: '#8A6248', butter: '#9A7420', sage: '#4E7560', blue: '#4A6E99', lilac: '#4A6E99' }, HX: { coral: '#B08560', butter: '#C9A24A', sage: '#6E9682', blue: '#6F8FBC', lilac: '#6F8FBC' } },
  meeting: { k: 'NOTULEN MEETING', app: 'ippo-meeting', wa: 'ippo-meeting', kep: '#DCE4F0', bg: '#EEF1F6', pos: '#F8FAFD', kc: '#C25A1C', jc: '#1F3358', ic: '#3D5070',
    PA: { coral: '#FDE3D2', butter: '#FFEFD6', sage: '#E1E8F2', blue: '#DCE4F0', lilac: '#E6E9F2' }, TK: { coral: '#9A4214', butter: '#8A5A10', sage: '#2C4266', blue: '#24406E', lilac: '#3A4470' }, HX: { coral: '#E8762B', butter: '#E89A2B', sage: '#2F4A78', blue: '#3D5A8C', lilac: '#5A6890' } },
  kelas: { k: 'CATATAN BELAJAR', app: 'ippo-kelas', wa: 'ippo-kelas', kep: '#CFE0C8', bg: '#EFF3E8', pos: '#FBFCF6', kc: '#3F6B45', jc: '#24402A', ic: '#4A5E40', ikon: Object.values(ILS_SVG),
    PA: { coral: '#FFF1C9', butter: '#FFF6D6', sage: '#DDEBD9', blue: '#E3EEDF', lilac: '#EEF3E6' }, TK: { coral: '#7A5A10', butter: '#7A5A10', sage: '#2E5232', blue: '#3A5A3A', lilac: '#4A5A3A' }, HX: { coral: '#E0A82E', butter: '#D99A1E', sage: '#3F6B45', blue: '#557F5A', lilac: '#6E8A4E' } },
  lain: { k: '', app: 'ippo-lainnya', wa: 'ippo-lainnya', kep: '#E9DBF3', bg: '#F4EEF7', pos: '#FCF8FD', kc: '#8A4A9E', jc: '#3E2A52', ic: '#5E4870',
    PA: { coral: '#FADDE6', butter: '#FBE9EF', sage: '#EDE1F4', blue: '#E6DDF3', lilac: '#F1E2F2' }, TK: { coral: '#8A3555', butter: '#8A4A60', sage: '#5A3E78', blue: '#4E3E7A', lilac: '#6A3A70' }, HX: { coral: '#E0708F', butter: '#E58AA6', sage: '#8A6AB8', blue: '#7A68B8', lilac: '#A070B0' } }
};
const temaDari = m => { const t = TEMA[m.jenis || 'meeting'] || TEMA.lain; return { ...t, k: t.k || 'CATATAN ' + namaJenis(m.jenis).toUpperCase() }; };
const gayaTema = t => `--peach:${t.kep};background:${t.pos};--kc:${t.kc};--jc:${t.jc};--ic:${t.ic};` + WARNA.map(c => `--p-${c}:${t.PA[c]};--tk-${c}:${t.TK[c]};--hx-${c}:${t.HX[c]}`).join(';');
const ill = n => `<svg class="ill" viewBox="0 0 70 56" aria-hidden="true">${ILL[n] || ILL.ide}</svg>`;

/* ========== UTIL ========== */
const $ = (s, r = document) => r.querySelector(s);
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const uid = () => (crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(36) + Math.random().toString(36).slice(2));
const inisial = n => String(n).trim().split(/\s+/).map(w => w[0]).join('').slice(0, 2).toUpperCase() || '?';
const BLN = ['JAN', 'FEB', 'MAR', 'APR', 'MEI', 'JUN', 'JUL', 'AGU', 'SEP', 'OKT', 'NOV', 'DES'];
const tglPanjang = t => new Date(t).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
const tglPendek = t => new Date(t).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' });
const durasiTeks = d => { if (!d) return ''; const j = Math.floor(d / 3600), m = Math.round((d % 3600) / 60); return j ? `${j} jam ${m} mnt` : `${Math.max(1, m)} menit`; };
const kapan = t => { const h = Math.floor((Date.now() - t) / 864e5); return h <= 0 ? 'hari ini' : h === 1 ? 'kemarin' : h < 7 ? `${h} hari lalu` : h < 30 ? `${Math.floor(h / 7)} minggu lalu` : tglPendek(t); };
const potong = (s, n) => String(s ?? '').trim().slice(0, n);
let toastT;
function toast(msg, lama = 2600) { const t = $('#toast'); t.textContent = msg; t.hidden = false; clearTimeout(toastT); toastT = setTimeout(() => t.hidden = true, lama); }
async function tombolProses(btn, teks, fn) { // loading yang jelas di setiap tombol aksi
  const asal = btn.innerHTML; btn.disabled = true; btn.textContent = teks;
  try { return await fn(); } finally { btn.disabled = false; btn.innerHTML = asal; }
}

/* ========== DATA (satu pintu, IndexedDB di HP) ========== */
const DB = (() => {
  let p;
  const open = () => p || (p = new Promise((ok, no) => {
    const r = indexedDB.open('jejak', 1);
    r.onupgradeneeded = () => { const b = r.result; b.createObjectStore('orang', { keyPath: 'id' }); b.createObjectStore('meeting', { keyPath: 'id' }); b.createObjectStore('transkrip', { keyPath: 'id' }); b.createObjectStore('setelan', { keyPath: 'k' }); };
    r.onsuccess = () => ok(r.result); r.onerror = () => no(r.error);
  }));
  const tx = async (stores, mode, fn) => {
    const db = await open();
    return new Promise((ok, no) => {
      const t = db.transaction(stores, mode); let res;
      const st = Array.isArray(stores) ? stores.map(s => t.objectStore(s)) : t.objectStore(stores);
      const q = fn(st); if (q) q.onsuccess = () => res = q.result;
      t.oncomplete = () => ok(res); t.onerror = t.onabort = () => no(t.error || new Error('Gagal menyimpan'));
    });
  };
  return {
    all: s => tx(s, 'readonly', o => o.getAll()),
    get: (s, k) => tx(s, 'readonly', o => o.get(k)),
    put: (s, v) => tx(s, 'readwrite', o => { o.put(v); }),
    // simpan banyak sekaligus dalam satu transaksi: semua tersimpan, atau tidak ada yang tersimpan
    putMany: map => { const ks = Object.keys(map); return tx(ks, 'readwrite', sts => { ks.forEach((k, i) => map[k].forEach(v => sts[i].put(v))); }); },
    delMany: map => { const ks = Object.keys(map); return tx(ks, 'readwrite', sts => { ks.forEach((k, i) => map[k].forEach(id => sts[i].delete(id))); }); },
    ganti: (baru, hapus) => tx(['meeting', 'transkrip'], 'readwrite', ([m, t]) => { baru.forEach(x => m.put(x)); hapus.forEach(id => { m.delete(id); t.delete(id); }); }), // simpan gabungan + hapus potongan lama: semua atau tidak sama sekali
    kosongkan: s => tx(s, 'readwrite', o => { o.clear(); }),
    clearAll: () => tx(['orang', 'meeting', 'transkrip'], 'readwrite', sts => { sts.forEach(s => s.clear()); })
  };
})();

/* Salinan di memori supaya cepat; diperbarui setiap ada perubahan */
const S0 = { orang: [], meeting: [], kunci: '', model: CONFIG.MODEL };
async function muatData() {
  const [o, m, k, md] = await Promise.all([DB.all('orang'), DB.all('meeting'), DB.get('setelan', 'kunci'), DB.get('setelan', 'model')]);
  S0.orang = o; S0.meeting = m.sort((a, b) => b.tanggal - a.tanggal);
  S0.kunci = k?.v || ''; S0.model = md?.v || CONFIG.MODEL;
}
const orangById = id => S0.orang.find(o => o.id === id);
const meetingOrang = id => S0.meeting.filter(m => m.orangId === id);
const tugasTerbuka = list => list.reduce((n, m) => n + (m.hasil.tugas || []).filter(t => !t.selesai).length, 0);
function perbaruiLencana() { const n = tugasTerbuka(S0.meeting), b = $('#badgeTugas'); b.textContent = n > 99 ? '99+' : n; b.hidden = n === 0; }

/* ========== GEMINI ========== */
class GagalAI extends Error { constructor(pesan, tahap) { super(pesan); this.tahap = tahap; } }
function pesanError(status, teks = '') { const k = status ? ` (kode ${status})` : ''; return pesanDasar(status, teks) + k; }
function pesanDasar(status, teks) {
  if (status === 0) return 'Internet terputus. Cek sinyal lalu tekan Coba lagi.';
  if (status === 400 && /API key|API_KEY/i.test(teks)) return 'Kunci API salah. Cek lagi di menu Atur.';
  if (status === 401 || status === 403) return 'Kunci API tidak bisa dipakai. Cek lagi di menu Atur.';
  if (status === 404) return 'Model AI tidak tersedia. Pilih model lain lewat Atur, Cek model.';
  if (status === 413) return 'Rekaman terlalu besar.';
  if (status === 429) return 'Kuota model ini sedang penuh. Tunggu beberapa menit, atau pilih model lain lewat Atur, Cek model.';
  if (status >= 500) return 'Server Google sedang sibuk. Rekamanmu sudah terkirim, jadi tekan Coba lagi beberapa menit lagi (tidak perlu unggah ulang).';
  return 'Gagal memproses rekaman. Coba lagi.';
}
async function panggil(url, opt = {}) {
  let r;
  try { r = await fetch(CONFIG.API + url, { ...opt, headers: { 'x-goog-api-key': S0.kunci, ...(opt.headers || {}) } }); }
  catch (e) { throw new GagalAI(pesanError(0)); }
  if (!r.ok) { const t = await r.text().catch(() => ''); console.warn('Gemini', r.status, t); const e = new GagalAI(pesanError(r.status, t)); e.status = r.status; e.detail = t; throw e; }
  return r;
}
async function unggahKeGemini(blob, mime, onProg) {
  const r = await panggil('/upload/v1beta/files', {
    method: 'POST',
    headers: { 'X-Goog-Upload-Protocol': 'resumable', 'X-Goog-Upload-Command': 'start', 'X-Goog-Upload-Header-Content-Length': String(blob.size), 'X-Goog-Upload-Header-Content-Type': mime, 'Content-Type': 'application/json' },
    body: JSON.stringify({ file: { display_name: 'rekaman-jejak' } })
  });
  const urlUp = r.headers.get('x-goog-upload-url');
  if (!urlUp) throw new GagalAI('Google tidak memberi alamat unggah. Coba lagi.');
  const hasil = await new Promise((ok, no) => {
    const x = new XMLHttpRequest();
    x.open('POST', urlUp);
    x.setRequestHeader('x-goog-api-key', S0.kunci);
    x.setRequestHeader('X-Goog-Upload-Offset', '0');
    x.setRequestHeader('X-Goog-Upload-Command', 'upload, finalize');
    x.upload.onprogress = e => e.lengthComputable && onProg(e.loaded / e.total);
    x.onload = () => { if (x.status >= 200 && x.status < 300) { try { ok(JSON.parse(x.responseText).file); } catch { no(new GagalAI('Jawaban Google rusak. Coba lagi.')); } } else no(new GagalAI(pesanError(x.status, x.responseText))); };
    x.onerror = () => no(new GagalAI(pesanError(0)));
    x.send(blob);
  });
  let f = hasil;
  for (let i = 0; f.state === 'PROCESSING' && i < 120; i++) { // tunggu Google selesai membaca file
    await new Promise(s => setTimeout(s, 3000));
    f = await (await panggil('/v1beta/' + f.name)).json();
  }
  if (f.state !== 'ACTIVE') throw new GagalAI('Google gagal membaca rekaman. Pastikan file suara tidak rusak.');
  return f;
}
const hapusFileGemini = name => name && fetch(CONFIG.API + '/v1beta/' + name, { method: 'DELETE', headers: { 'x-goog-api-key': S0.kunci } }).catch(() => {});

const A = t => ({ type: 'ARRAY', items: t }), STR = { type: 'STRING' }, O = (p, req) => ({ type: 'OBJECT', properties: p, required: req || Object.keys(p) });
/* Template per jenis rekaman: AI wajib mengisi bagian-bagian ini dengan urutan dan judul yang sama */
const BENTUK = ['belum', 'daftar', 'centang', 'langkah', 'angka', 'linimasa', 'kutipan', 'ayat', 'istilah', 'pesan'];
const TEMPLATE = {
  meeting: { nama: 'Meeting', orang: 'Meeting dengan siapa?', contoh: 'Bu Rina', tugas: true, seksi: [
    ['Sudah disepakati', 'centang', 'hal yang sudah disepakati bersama'],
    ['Angka & tanggal penting', 'angka', 'harga, jumlah, persen, tanggal penting; label = nama angkanya (maks 4 kata), teks = nilainya singkat'],
    ['Linimasa', 'linimasa', 'jadwal dan tenggat berurutan; label = hari/tanggal singkat, teks = kegiatan, ket = siapa'],
    ['Masih belum jelas', 'belum', 'hal yang belum dijawab, belum dijelaskan, belum diputuskan, angka/klaim tanpa dasar, atau yang saling bertentangan. Tulis langsung sebagai kalimat pendek (bukan format celah-tanya). Kosongkan kalau memang tidak ada'],
    ['Kalimat penting', 'kutipan', 'maksimal 3; teks = kalimat asli seperti diucapkan (boleh bahasa Jawa), ket = artinya dalam bahasa Indonesia dan siapa yang bilang'],
    ['Draf pesan tindak lanjut', 'pesan', 'SATU pesan WhatsApp sopan dari pemilik HP kepada orang itu: terima kasih, ringkasan kesepakatan, tugas dan tanggalnya; tulis di isi[0].teks']] },
  khotbah: { nama: 'Khotbah', orang: 'Pengkhotbah / gereja', contoh: 'Pdt. Andreas · GKJ', tugas: false, seksi: [
    ['Ayat yang dibahas', 'ayat', 'label = referensi ayat (mis. Mazmur 100:5), teks = isi ayatnya. Kalau ayat DIBACAKAN di rekaman, tulis persis seperti yang dibacakan dan ket = "dibacakan". Kalau hanya disebut, tulis isinya dari Alkitab Terjemahan Baru dan ket = "cek di Alkitab"'],
    ['Kalimat yang menguatkan', 'kutipan', 'maksimal 3 kalimat pengkhotbah yang paling menguatkan; ket boleh kosong'],
    ['Penerapan minggu ini', 'daftar', 'hal praktis yang bisa dilakukan minggu ini'],
    ['Pertanyaan renungan', 'daftar', 'pertanyaan untuk direnungkan sendiri atau dibahas di komsel']] },
  kelas: { nama: 'Seminar / kelas', orang: 'Pembicara / tempat', contoh: 'Pak Dimas · kelas Canva', tugas: false, seksi: [
    ['Angka & tabel penting', 'angka', 'SALIN semua angka penting dari materi: persen, tarif, biaya, tenor, plafon, tanggal/periode, syarat berangka, nomor kontak. Untuk TABEL: SATU baris tabel = SATU item, label = nama tabel + baris (mis. "Pasti Fixed · Mass 1-5 th"), teks = semua kolomnya dalam satu baris, SETIAP nilai WAJIB diawali nama kolomnya (mis. "Primary 7,40% · Gold/TO 7,75% · Secondary 8,00% · Multiguna 8,25%"); kolom yang kosong (-) dilewati, jangan menulis nilai tanpa nama kolom. Salin SEMUA baris dari SEMUA tabel, juga catatan di bawah tabel (biaya pelunasan, batas tenor). Jangan dibulatkan atau dilewati. Maksimal 70 baris; dahulukan semua tabel tarif, tenor maksimal, biaya, plafon, lalu kontak. Kosongkan kalau tidak ada angka'],
    ['Syarat & ketentuan', 'daftar', 'syarat, kriteria, ketentuan, siapa/produk yang berlaku atau TIDAK berlaku, promo dan batasnya, ditulis sesuai materi (satu poin = satu syarat). Angka tetap boleh ditulis di sini kalau bagian dari syarat. Kosongkan kalau tidak ada'],
    ['Istilah penting', 'istilah', 'HANYA istilah yang artinya dijelaskan di materi. label = istilah, teks = artinya sesuai materi (wajib diisi). Istilah yang artinya tidak dijelaskan jangan ditulis'],
    ['Langkah praktik', 'langkah', 'HANYA kalau materi benar-benar mengajarkan urutan langkah/cara (mis. tutorial "langkah 1, 2, 3"). Daftar produk, syarat, atau info BUKAN langkah. Dilarang menyusun langkah sendiri dari isi materi. Kalau tidak ada, WAJIB daftar kosong'],
    ['Masih belum jelas', 'belum', 'hal yang belum dijawab, belum dijelaskan, belum diputuskan, angka/klaim tanpa dasar, atau yang saling bertentangan. Tulis langsung sebagai kalimat pendek (bukan format celah-tanya). Kosongkan kalau memang tidak ada']] }
};
const templateDari = jenis => TEMPLATE[jenis] || null; // jenis lain (diisi sendiri): AI yang menyusun bagian
const namaJenis = jenis => TEMPLATE[jenis]?.nama || jenis || 'Meeting';
const SKEMA = O({
  judul: STR, inti: STR, penutup: STR,
  bagian: A(STR),
  poin: A(O({ bagian: STR, judul: STR, isi: STR, ikon: { type: 'STRING', format: 'enum', enum: Object.keys(ILL) } })),
  tugas: A(O({ apa: STR, siapa: STR, kapan: STR, selesai: { type: 'BOOLEAN' } }, ['apa', 'siapa', 'kapan'])),
  seksi: A(O({ judul: STR, bentuk: { type: 'STRING', format: 'enum', enum: BENTUK }, isi: A(O({ teks: STR, label: STR, ket: STR }, ['teks'])) }, ['judul', 'bentuk', 'isi']))
});
function aturanSeksi(jenis) {
  const t = templateDari(jenis);
  if (t) return `- seksi: WAJIB berisi bagian-bagian ini, dengan judul dan bentuk persis seperti di bawah dan urutan yang sama. Kalau tidak ada isinya, isi dengan daftar kosong:\n${t.seksi.map(([a, b, c], i) => `  ${i + 1}. judul "${a}", bentuk "${b}": ${c}`).join('\n')}`;
  return `- seksi: susun sendiri 3-6 bagian yang paling berguna untuk jenis "${jenis}". Kalau materi berisi syarat/ketentuan, buat juga bagian "Syarat & ketentuan" bentuk "daftar". Kalau materi berisi angka/tabel/biaya/kontak, bagian pertama WAJIB judul "Angka & tabel penting" bentuk "angka" yang menyalin semua angka itu per baris tanpa dilewati. Jangan mengarang isi bagian mana pun. Bagian terakhir WAJIB judul "Masih belum jelas" bentuk "belum": hal yang belum dijawab, belum dijelaskan, belum diputuskan, angka tanpa dasar, atau saling bertentangan, ditulis langsung sebagai kalimat pendek (kosongkan kalau tidak ada). Judul bagian singkat (maks 4 kata). Pilih bentuk yang cocok: daftar (poin biasa), centang (hal yang sudah pasti), langkah (urutan langkah), angka (label = nama, teks = nilai), linimasa (label = waktu/tanggal, teks = kegiatan, ket = keterangan), kutipan (teks = kalimat, ket = keterangan), istilah (label = istilah, teks = arti), pesan (satu teks siap kirim).`;
}
function buatPrompt(j, sumber = 'rekaman', n = 1) {
  const jenis = j.jenis || 'meeting', t = templateDari(jenis);
  const pembuka = { rekaman: 'Dengarkan seluruh rekaman ini sampai habis. Bahasanya bisa campuran Indonesia dan Jawa (atau bahasa daerah lain).', foto: `Berikut ${n} foto (misalnya slide, papan tulis, catatan, atau dokumen). Baca semua tulisan, angka, dan gambar penting di foto.`, pdf: 'Berikut sebuah dokumen PDF. Baca seluruh isinya, termasuk tabel dan gambar.' }[sumber];
  return `Kamu pencatat yang teliti. Jenis acara: ${namaJenis(jenis)}. ${pembuka}
Tulis semua jawaban dalam bahasa Indonesia sehari-hari yang sederhana, bukan bahasa kaku.
Info: ${t ? t.orang.replace('?', '') : 'dengan'} "${j.nama}". Topik: "${j.topik || 'tidak disebut'}".${sumber === 'rekaman' ? ` Durasi kira-kira ${durasiTeks(j.durasi) || 'tidak diketahui'}.` : ''}

Aturan:
- Jangan mengarang. Tulis hanya yang benar-benar ada di ${sumber}. Bagian yang tidak jelas tulis "(tidak jelas)".
${sumber !== 'rekaman' ? '- Ini dokumen: poin harus jelas dan lengkap (boleh sampai 12 poin, isi maksimal 30 kata). Semua angka, tanggal, nama, harga, tarif, tenor, dan syarat penting wajib ikut ditulis, jangan diringkas sampai hilang. Bagian "Masih belum jelas" wajib diperiksa sungguh-sungguh.\n' : ''}${(j.jenis || 'meeting') !== 'khotbah' ? '- PAGAR WAJIB: setiap kalimat harus bisa ditunjuk sumbernya di materi. DILARANG menambah pengetahuan umum, definisi, alasan, atau contoh dari luar materi, walaupun kamu tahu itu benar. Kalau materi hanya menyebut sebuah istilah tanpa menjelaskan artinya, istilah itu JANGAN ditulis di Istilah penting (boleh masuk Masih belum jelas: "arti X tidak dijelaskan"). Lebih baik kosong daripada mengarang.\n' : ''}- judul: topik utama, maksimal 6 kata. inti: 1 kalimat (maksimal 20 kata).
- bagian: kelompokkan isi menurut topik (1-6 topik, 1-2 kata).
- poin: poin paling penting. Isi pendek 3-4 poin, sedang 4-6, panjang 6-10. Judul maksimal 5 kata, isi maksimal 18 kata. Kolom "bagian" sama persis dengan salah satu nama bagian. Pilih ikon yang cocok.
- tugas: ${t && !t.tugas ? 'isi HANYA kalau pembicara jelas memberi tugas/PR (siapa mengerjakan apa). Nomor kontak, ajakan menghubungi, dan info umum BUKAN tugas. Kalau tidak ada, daftar kosong.' : 'siapa mengerjakan apa dan kapan. Satu baris = satu pekerjaan, jangan gabungkan. Kalau waktunya tidak disebut, kapan = "".'}
${aturanSeksi(jenis)}
- penutup: hal terpenting berikutnya (langkah berikutnya atau pesan utama), 1 kalimat pendek.${j.potongan ? `\n\nPENTING: rekaman ini adalah bagian ${j.potongan.k} dari ${j.potongan.N} dari SATU acara yang sama, dimulai pada menit ke-${j.potongan.mulai}. Ringkas hanya isi bagian ini. Waktu di linimasa dihitung dari awal acara (tambahkan ${j.potongan.mulai} menit).` : ''}${sumber === 'foto' ? '\n- Untuk waktu di linimasa yang dari foto, pakai nomor foto, misalnya "Foto 1-3".' : ''}`;
}
/* Jawaban AI dikirim sedikit demi sedikit (streaming) supaya sambungan tidak "diam" lalu diputus jaringan */
async function mintaRingkasan(m, body, onTeks, batas = 60000) {
  const ac = new AbortController(); let alasan = '', jam;
  const pasangJam = (ms, a) => { clearTimeout(jam); jam = setTimeout(() => { alasan = a; ac.abort(); }, ms); };
  pasangJam(8 * 60000, 'awal'); // menunggu Google selesai mendengarkan rekaman
  let r;
  try { r = await fetch(`${CONFIG.API}/v1beta/models/${encodeURIComponent(m)}:streamGenerateContent?alt=sse`, { method: 'POST', signal: ac.signal, headers: { 'x-goog-api-key': S0.kunci, 'Content-Type': 'application/json' }, body }); }
  catch { clearTimeout(jam); const e = new GagalAI(alasan ? 'Google terlalu lama menjawab. Tekan Coba lagi (tidak perlu unggah ulang).' : pesanError(0)); e.status = alasan ? 'waktu' : 0; throw e; }
  if (!r.ok) { clearTimeout(jam); const t = await r.text().catch(() => ''); console.warn('Gemini', r.status, t); const e = new GagalAI(pesanError(r.status, t)); e.status = r.status; e.detail = t; throw e; }
  const baca = r.body.getReader(), dek = new TextDecoder(); let sisa = '', teks = '', blok = '';
  try {
    for (;;) {
      pasangJam(2 * 60000, 'diam'); // kalau 2 menit tidak ada kiriman sama sekali, anggap putus
      const { value, done } = await baca.read(); if (done) break;
      sisa += dek.decode(value, { stream: true });
      const baris = sisa.split('\n'); sisa = baris.pop();
      for (const b of baris) {
        if (!b.startsWith('data:')) continue;
        let d; try { d = JSON.parse(b.slice(5)); } catch { continue; }
        if (d.error) { const e = new GagalAI(pesanError(d.error.code || 500, d.error.message)); e.status = d.error.code || 500; e.detail = d.error.message || ''; throw e; }
        if (d.promptFeedback?.blockReason) throw new GagalAI('Rekaman ditolak oleh AI. Coba rekaman lain.');
        for (const p of d.candidates?.[0]?.content?.parts || []) { if (p.thought) blok = 'mikir'; else if (p.text) { teks += p.text; blok = 'tulis'; } }
        if (teks.length > batas) { const e = new GagalAI('Jawaban AI kepanjangan (berulang-ulang).'); e.status = 'panjang'; throw e; } // AI macet mengulang tulisan: hentikan, jangan ditunggu
        onTeks(teks.length, blok);
      }
    }
  } catch (e) {
    if (e instanceof GagalAI) throw e;
    const x = new GagalAI(alasan ? 'Sambungan ke Google terputus. Tekan Coba lagi (tidak perlu unggah ulang).' : pesanError(0)); x.status = alasan ? 'waktu' : 0; throw x;
  } finally { clearTimeout(jam); }
  return teks;
}
/* Model yang dicoba: pilihan di Atur dulu, lalu model lain yang tersedia untuk kunci ini. Model yang kuotanya penuh dilewati otomatis */
const PENUH = new Set(); let daftarModel = null;
async function calonModel() {
  if (!daftarModel) {
    try {
      const v = n => parseFloat((n.match(/(\d+(\.\d+)?)/) || [0, 0])[1]);
      daftarModel = ((await (await panggil('/v1beta/models?pageSize=200')).json()).models || [])
        .filter(m => (m.supportedGenerationMethods || ['generateContent']).includes('generateContent')).map(m => m.name.replace('models/', ''))
        .filter(n => /^gemini/.test(n) && !/tts|image|embed|live|audio|thinking|computer|robotics|exp/.test(n))
        .sort((a, b) => (/flash/.test(b) - /flash/.test(a)) || (/lite/.test(a) - /lite/.test(b)) || (v(b) - v(a)));
    } catch { daftarModel = []; }
  }
  return [...new Set([S0.modelJalan, S0.model, ...daftarModel, CONFIG.MODEL_CADANGAN])].filter(m => m && !PENUH.has(m)).slice(0, 8);
}
async function mintaJSON(isi, maju, cepat = false) { // cepat: untuk menyatukan (teks saja), tanpa mode berpikir dan jawaban dibatasi // kirim ke AI, terima ringkasan berbentuk data
  let pikir = cepat ? null : { thinkingBudget: 512, includeThoughts: true }, galat, semuaPenuh = true;
  const body = () => JSON.stringify({ contents: [{ role: 'user', parts: isi }], generationConfig: { responseMimeType: 'application/json', responseSchema: SKEMA, maxOutputTokens: cepat ? 16000 : 32768, temperature: 0.2, ...(pikir ? { thinkingConfig: pikir } : {}) } });
  const tunggu = d => new Promise(s => setTimeout(s, d));
  const calon = await calonModel(), gagal = [];
  for (let putaran = 0; putaran < 2; putaran++) for (const m of calon) { // putaran kedua: semua model dicoba lagi setelah jeda
    if (PENUH.has(m)) continue;
    if (putaran) { setTahap('Server sibuk, mencoba lagi otomatis…', null, 'Semua model sibuk. Menunggu 30 detik lalu mencoba lagi.'); await tunggu(30000); }
    for (let coba = 0; coba < 1 + !putaran; coba++) {
      try {
        const teks = await mintaRingkasan(m, body(), maju, cepat ? 60000 : 80000);
        let o; try { o = JSON.parse(teks.replace(/^```(json)?|```$/g, '').trim()); } catch { o = null; }
        if (!o) { const x = new GagalAI('Jawaban AI terpotong atau kosong. Coba lagi.'); x.status = 'panjang'; throw x; }
        S0.modelJalan = m; // model yang berhasil dicoba duluan untuk bagian berikutnya
        return rapikan(o);
      } catch (e) {
        galat = e;
        if (e.status === 400 && pikir && /think/i.test(e.detail || '')) { pikir = null; coba--; continue; } // model ini tidak mendukung pengaturan berpikir
        if (e.status === 429 || e.status === 404) { PENUH.add(m); setTahap('Kuota model penuh, pindah ke model lain…', null, `Otomatis, tidak perlu menekan apa-apa. (${m} dilewati)`); break; }
        semuaPenuh = false;
        if (e.status === 'panjang') { gagal.push(m); setTahap('Jawaban AI kacau, pindah ke model lain…', null, `Otomatis, tidak perlu menekan apa-apa. (${m})`); break; }
        if (e.status >= 500) { gagal.push(m); setTahap('Server sibuk, mencoba lagi otomatis…', null, `Tidak perlu menekan apa-apa, tunggu sebentar. (${m})`); if (!coba && !putaran) await tunggu(8000); continue; } // sekali ulang, lalu pindah model
        throw e; // putus, terlalu lama, atau kunci salah: tampilkan tombol Coba lagi
      }
    }
  }
  if (galat?.status === 429 && semuaPenuh) { PENUH.clear(); throw Object.assign(new GagalAI('Kuota gratis semua model sedang penuh. Coba lagi beberapa menit lagi; kalau tetap penuh, biasanya pulih besok sekitar jam 3 sore. (kode 429)'), { status: 429 }); }
  if (galat?.status >= 500) throw Object.assign(new GagalAI(`Server Google sedang sibuk untuk semua model (${[...new Set(gagal)].join(', ')}). Bagian yang sudah selesai tetap tersimpan. Tekan Coba lagi 5-10 menit lagi.`), { status: galat.status });
  throw galat || new GagalAI('Gagal memproses. Coba lagi.');
}
const maju = (lo, hi, label = '') => (n, blok) => { // bar kemajuan mengikuti jawaban yang benar-benar diterima
  if (!n) return blok === 'mikir' && setTahap(label + 'Mencari poin penting…', lo + (hi - lo) * 0.3);
  setTahap(label + 'Menulis kartu…', Math.min(hi, lo + (hi - lo) * (0.4 + 0.6 * Math.min(1, n / 5000))), 'Jawaban sedang diterima. Jangan tutup aplikasi.');
};
const rangkumFoto = (data, j, mj) => mintaJSON([...data.map(d => ({ inline_data: { mime_type: 'image/jpeg', data: d } })), { text: buatPrompt({ ...j, potongan: null }, 'foto', data.length) }], mj);
const kecilkanFoto = f => new Promise((ok, no) => { // foto dikecilkan di HP (sisi terpanjang 1280 px) supaya cepat & hemat kuota
  const u = URL.createObjectURL(f), im = new Image();
  im.onload = () => { const s = Math.min(1, 1280 / Math.max(im.width, im.height)), c = document.createElement('canvas'); c.width = Math.round(im.width * s); c.height = Math.round(im.height * s); c.getContext('2d').drawImage(im, 0, 0, c.width, c.height); URL.revokeObjectURL(u); c.toBlob(b => b ? ok(b) : no(), 'image/jpeg', 0.72); };
  im.onerror = () => { URL.revokeObjectURL(u); no(new Error('foto rusak')); }; im.src = u;
});
const keBase64 = b => new Promise(ok => { const r = new FileReader(); r.onload = () => ok(r.result.split(',')[1]); r.readAsDataURL(b); });
const rangkum = (file, j, mj, sumber = 'rekaman') => mintaJSON([{ file_data: { mime_type: file.mimeType, file_uri: file.uri } }, { text: buatPrompt(j, sumber) }], mj);
function gabungkan(list, j, mj) { // satukan ringkasan beberapa bagian jadi satu kesimpulan menyeluruh
  const data = list.map((h, i) => ({ bagian_ke: i + 1, ...h, seksi: seksiDari(h), tugas: h.tugas.map(({ apa, siapa, kapan, selesai }) => ({ apa, siapa, kapan, selesai })) }));
  const t = templateDari(j.jenis || 'meeting');
  return mintaJSON([{ text: `Kamu pencatat yang teliti. Jenis acara: ${namaJenis(j.jenis)}. Di bawah ini ada ringkasan dari ${list.length} bagian (potongan rekaman, kumpulan foto, dan/atau dokumen) dari SATU acara dengan "${j.nama}"${j.topik ? ` (topik: ${j.topik})` : ''}.
Satukan semuanya menjadi SATU kesimpulan menyeluruh, seolah-olah merangkum seluruh acara sekaligus. Tulis dalam bahasa Indonesia sehari-hari yang sederhana.

Aturan:
- Jangan mengarang. Pakai hanya isi dari data.
- judul (maksimal 6 kata) dan inti (1 kalimat, maksimal 25 kata) untuk keseluruhan.
- bagian: kelompokkan ulang menurut topik keseluruhan (2-6 topik, 1-2 kata), BUKAN per bagian data.
- poin: 6-12 poin paling penting dari keseluruhan. Gabungkan yang mirip. Judul maksimal 5 kata, isi maksimal 25 kata. Kolom "bagian" sama persis dengan salah satu nama bagian.
- tugas: gabungkan yang sama, satu baris = satu pekerjaan. Kalau di data selesai true, tetap tulis selesai true.
${aturanSeksi(j.jenis || 'meeting')}
- Jangan menambah isi apa pun yang tidak ada di DATA (tidak boleh menambah definisi, alasan, atau angka sendiri).
- Isi tiap seksi: gabungkan dari semua bagian tanpa dobel; angka & tabel jangan dikurangi; linimasa diurutkan menurut waktu; buang pertanyaan yang ternyata sudah terjawab di bagian lain.${t && t.seksi.some(s => s[1] === 'pesan') ? ' Draf pesan ditulis ulang untuk keseluruhan.' : ''}
- penutup: hal terpenting berikutnya, 1 kalimat pendek.

DATA:
${JSON.stringify(data)}` }], mj, true);
}
const GAYA = { belum: ['coral', 'tanya'], centang: ['sage', 'star'], angka: ['coral', 'star'], linimasa: ['blue', 'jam'], daftar: ['lilac', 'tanya'], kutipan: ['sage', 'kutip'], ayat: ['butter', 'kutip'], istilah: ['blue', 'star'], langkah: ['coral', 'tugas'], pesan: ['sage', 'kirim'] };
function gabungLokal(list) { // cadangan kalau AI gagal menyatukan: gabungkan semua bagian apa adanya tanpa dobel
  const unik = (xs, k) => { const s = new Set(); return xs.filter(x => { const v = k(x).toLowerCase().trim(); return v && !s.has(v) && s.add(v); }); };
  const sk = {}; list.forEach(h => seksiDari(h).forEach(s => { const a = sk[s.judul] = sk[s.judul] || { judul: s.judul, bentuk: s.bentuk, isi: [] }; a.isi.push(...s.isi); }));
  const poin = []; for (let i = 0; poin.length < 10 && list.some(h => h.poin[i]); i++) list.forEach(h => h.poin[i] && poin.length < 10 && poin.push(h.poin[i]));
  return { judul: list[0].judul, inti: list[0].inti, penutup: list[list.length - 1].penutup, bagian: unik(list.flatMap(h => h.bagian), x => x).slice(0, 6),
    poin, tugas: unik(list.flatMap(h => h.tugas), t => t.apa), seksi: Object.values(sk).map(s => ({ ...s, isi: unik(s.isi, x => x.label + x.teks).slice(0, s.bentuk === 'angka' ? 70 : 20) })) };
}
function seksiDari(h) { // ringkasan versi lama (sebelum ada template) diubah ke bentuk seksi
  if (Array.isArray(h.seksi)) return h.seksi.map(s => s.bentuk !== 'ayat' ? s : { ...s, isi: s.isi.map(x => ({ ...x, ket: /dibaca/i.test(x.ket || '') ? 'dibacakan' : 'cek di Alkitab' })) }); // keterangan ayat hanya boleh dua ini
  return [
    ['Sudah disepakati', 'centang', (h.sepakat || []).map(teks => ({ teks }))],
    ['Masih belum jelas', 'belum', (h.tanya || []).map(teks => ({ teks }))],
    ['Kalimat penting', 'kutipan', (h.kutipan || []).map(k => ({ teks: k.asli, ket: [k.arti, k.siapa].filter(Boolean).join(' — ') }))]
  ].map(([judul, bentuk, isi]) => ({ judul, bentuk, isi })).filter(s => s.isi.length);
}
function rapikan(o) { // bersihkan & batasi isi dari AI sebelum disimpan
  const arr = (a, n) => Array.isArray(a) ? a.slice(0, n) : [];
  const bagian = arr(o.bagian, 8).map(b => potong(b, 30)).filter(Boolean);
  return {
    judul: potong(o.judul, 80) || 'Ringkasan meeting', inti: potong(o.inti, 240), penutup: potong(o.penutup, 160),
    bagian: bagian.length ? bagian : ['Umum'],
    poin: arr(o.poin, 12).map(p => ({ bagian: potong(p.bagian, 30), judul: potong(p.judul, 60), isi: potong(p.isi, 320), ikon: ILL[p.ikon] ? p.ikon : 'ide' })).filter(p => p.judul),
    tugas: arr(o.tugas, 25).map(t => ({ id: uid(), apa: potong(t.apa, 200), siapa: potong(t.siapa, 40), kapan: potong(t.kapan, 40), selesai: t.selesai === true })).filter(t => t.apa),
    seksi: arr(seksiDari(o), 9).map(s => ({ judul: potong(s.judul, 40), bentuk: BENTUK.includes(s.bentuk) ? s.bentuk : 'daftar', isi: arr(s.isi, s.bentuk === 'angka' ? 70 : 20).map(x => ({ teks: potong(x.teks, s.bentuk === 'pesan' ? 1500 : 400), label: potong(x.label, 80), ket: potong(x.ket, 200) })).filter(x => x.teks && (s.bentuk !== 'istilah' || (x.label && x.label.trim().toLowerCase() !== x.teks.trim().toLowerCase()))) })).filter(s => s.judul && s.isi.length)
  };
}

/* ========== POTONG REKAMAN PANJANG (tanpa alat tambahan) ========== */
const POTONG_DETIK = 15 * 60; // potongan pendek = lebih jarang ditolak server sibuk
const bacaByte = async (blob, a, b) => new Uint8Array(await blob.slice(a, b).arrayBuffer());
async function potongRekaman(b) { // b: { blob, mime, namaFile, durasi }
  if (!b.durasi || b.durasi <= POTONG_DETIK + 120) return [b];
  try {
    if (b.mime === 'audio/mp4') return await potongM4a(b);
    if (b.mime === 'audio/mp3') return potongMp3(b);
    if (b.mime === 'audio/wav') return await potongWav(b);
  } catch (e) { console.warn('Tidak bisa dipotong, dikirim utuh', e); }
  return [b];
}
const namaBagian = (n, k, ext) => n.replace(/\.[^.]+$/, '') + `-bagian-${k}.${ext}`;
function potongMp3(b) { // MP3 tersusun dari potongan kecil yang berdiri sendiri, jadi aman dipotong per ukuran
  const n = Math.ceil(b.durasi / POTONG_DETIK), uk = Math.ceil(b.blob.size / n);
  return Array.from({ length: n }, (_, i) => ({ blob: b.blob.slice(i * uk, (i + 1) * uk, 'audio/mpeg'), mime: 'audio/mp3', namaFile: namaBagian(b.namaFile, i + 1, 'mp3'), durasi: b.durasi / n }));
}
async function potongWav(b) {
  const h = await bacaByte(b.blob, 0, Math.min(b.blob.size, 65536)), v = new DataView(h.buffer), tag = o => String.fromCharCode(...h.slice(o, o + 4));
  if (tag(0) !== 'RIFF' || tag(8) !== 'WAVE') throw new Error('bukan wav');
  let o = 12, fmt, data;
  while (o + 8 <= h.length) { const id = tag(o), s = v.getUint32(o + 4, true); if (id === 'fmt ') fmt = o + 8; if (id === 'data') { data = o + 8; break; } o += 8 + s + (s & 1); }
  if (!fmt || !data || v.getUint16(fmt, true) !== 1) throw new Error('wav tidak biasa');
  const ch = v.getUint16(fmt + 2, true), sr = v.getUint32(fmt + 4, true), br = v.getUint32(fmt + 8, true), ba = v.getUint16(fmt + 12, true), bit = v.getUint16(fmt + 14, true);
  const total = b.blob.size - data, per = Math.ceil(total / Math.ceil(total / br / POTONG_DETIK) / ba) * ba, out = []; // dibagi rata
  for (let a = 0, k = 1; a < total; a += per, k++) {
    const len = Math.min(per, total - a), hd = new DataView(new ArrayBuffer(44)), w = (p, s) => [...s].forEach((c, i) => hd.setUint8(p + i, c.charCodeAt(0)));
    w(0, 'RIFF'); hd.setUint32(4, 36 + len, true); w(8, 'WAVE'); w(12, 'fmt '); hd.setUint32(16, 16, true); hd.setUint16(20, 1, true); hd.setUint16(22, ch, true);
    hd.setUint32(24, sr, true); hd.setUint32(28, br, true); hd.setUint16(32, ba, true); hd.setUint16(34, bit, true); w(36, 'data'); hd.setUint32(40, len, true);
    out.push({ blob: new Blob([hd.buffer, b.blob.slice(data + a, data + a + len)], { type: 'audio/wav' }), mime: 'audio/wav', namaFile: namaBagian(b.namaFile, k, 'wav'), durasi: len / br });
  }
  return out;
}
/* .m4a (perekam HP): ambil potongan suara AAC dari dalam file, lalu dibungkus ulang jadi file .aac per bagian */
async function potongM4a(b) {
  const f = b.blob; let o = 0, moov;
  while (o + 8 <= f.size) { // cari kotak 'moov' (daftar isi file)
    const h = await bacaByte(f, o, o + 16), v = new DataView(h.buffer), t = String.fromCharCode(...h.slice(4, 8));
    let s = v.getUint32(0); if (s === 1) s = Number(v.getBigUint64(8)); if (s === 0) s = f.size - o; if (s < 8) throw new Error('rusak');
    if (t === 'moov') { moov = await bacaByte(f, o, o + s); break; } o += s;
  }
  if (!moov) throw new Error('moov tidak ada');
  const dv = new DataView(moov.buffer), tp = p => String.fromCharCode(...moov.slice(p + 4, p + 8));
  const anak = (a, z) => { const r = []; for (let p = a; p + 8 <= z;) { const s = dv.getUint32(p); if (s < 8) break; r.push({ t: tp(p), a: p + 8, z: p + s }); p += s; } return r; };
  const cari = (kotak, t) => anak(kotak.a, kotak.z).find(x => x.t === t);
  const traks = anak(8, moov.length).filter(x => x.t === 'trak');
  const trak = traks.find(tr => { const md = cari(tr, 'mdia'), hd = md && cari(md, 'hdlr'); return hd && String.fromCharCode(...moov.slice(hd.a + 8, hd.a + 12)) === 'soun'; });
  if (!trak) throw new Error('tidak ada suara');
  const stbl = cari(cari(cari(trak, 'mdia'), 'minf'), 'stbl');
  const stsd = cari(stbl, 'stsd'), stsz = cari(stbl, 'stsz'), stsc = cari(stbl, 'stsc'), stco = cari(stbl, 'stco') || cari(stbl, 'co64');
  if (!stsd || !stsz || !stsc || !stco) throw new Error('tabel kurang');
  // konfigurasi AAC (jenis, frekuensi, jumlah saluran) dari descriptor 0x05 di dalam 'esds'
  let p = stsd.a; while (p < stsd.z - 4 && tp(p - 4) !== 'esds') p++;
  if (p >= stsd.z - 4) throw new Error('esds tidak ada');
  let q = p + 4, asc;
  const panjang = () => { let n = 0, c; do { c = moov[q++]; n = (n << 7) | (c & 0x7f); } while (c & 0x80); return n; };
  while (q < stsd.z) { const tag = moov[q++], n = panjang(); if (tag === 3) { q += 2; const fl = moov[q++]; if (fl & 0x80) q += 2; if (fl & 0x40) q += 1 + moov[q]; if (fl & 0x20) q += 2; } else if (tag === 4) q += 13; else if (tag === 5) { asc = moov.slice(q, q + n); break; } else q += n; }
  if (!asc) throw new Error('asc tidak ada');
  const ot = asc[0] >> 3, fi = ((asc[0] & 7) << 1) | (asc[1] >> 7), chn = (asc[1] >> 3) & 15;
  if (ot < 1 || ot > 4 || fi > 12 || !chn) throw new Error('jenis AAC tidak didukung');
  const SR = [96000, 88200, 64000, 48000, 44100, 32000, 24000, 22050, 16000, 12000, 11025, 8000, 7350][fi];
  // ukuran dan letak tiap potongan suara
  const tetap = dv.getUint32(stsz.a + 4), n = dv.getUint32(stsz.a + 8), uk = i => tetap || dv.getUint32(stsz.a + 12 + i * 4);
  const nc = dv.getUint32(stco.a + 4), c64 = stco.t === 'co64', off = i => c64 ? Number(dv.getBigUint64(stco.a + 8 + i * 8)) : dv.getUint32(stco.a + 8 + i * 4);
  const ne = dv.getUint32(stsc.a + 4), ent = Array.from({ length: ne }, (_, i) => [dv.getUint32(stsc.a + 8 + i * 12), dv.getUint32(stsc.a + 12 + i * 12)]);
  const letak = new Float64Array(n); let si = 0;
  for (let c = 0, e = 0; c < nc && si < n; c++) { if (e + 1 < ne && c + 1 >= ent[e + 1][0]) e++; let x = off(c); for (let k = 0; k < ent[e][1] && si < n; k++) { letak[si] = x; x += uk(si++); } }
  const per = Math.ceil(n / Math.ceil(n * 1024 / SR / POTONG_DETIK)), out = []; // dibagi rata, tiap bagian maksimal 30 menit
  for (let a = 0, k = 1; a < n; a += per, k++) {
    const z = Math.min(n, a + per); let awal = Infinity, akhir = 0, tot = 0;
    for (let i = a; i < z; i++) { awal = Math.min(awal, letak[i]); akhir = Math.max(akhir, letak[i] + uk(i)); tot += uk(i) + 7; }
    const src = await bacaByte(f, awal, akhir), dst = new Uint8Array(tot); let w = 0;
    for (let i = a; i < z; i++) {
      const s = uk(i), L = s + 7, r = letak[i] - awal;
      dst.set([0xFF, 0xF1, ((ot - 1) << 6) | (fi << 2) | (chn >> 2), ((chn & 3) << 6) | (L >> 11), (L >> 3) & 0xFF, ((L & 7) << 5) | 0x1F, 0xFC], w);
      dst.set(src.subarray(r, r + s), w + 7); w += L;
    }
    out.push({ blob: new Blob([dst], { type: 'audio/aac' }), mime: 'audio/aac', namaFile: namaBagian(b.namaFile, k, 'aac'), durasi: (z - a) * 1024 / SR });
  }
  return out;
}

/* ========== ROUTER ========== */
const R = {};
function buka(h) { location.hash = h; }
async function jalan() {
  const [path, qs] = (location.hash.slice(1) || '/').split('?');
  const p = path.split('/').filter(Boolean), q = new URLSearchParams(qs);
  const tab = p[0] === 'orang' ? 'orang' : p[0] === 'tugas' ? 'tugas' : p[0] === 'atur' ? 'atur' : (!p[0] ? 'beranda' : '');
  document.querySelectorAll('#nav a').forEach(a => {
    const on = a.dataset.tab === tab; a.classList.toggle('on', on); on ? a.setAttribute('aria-current', 'page') : a.removeAttribute('aria-current');
    const s = a.querySelector('.ni'), n = s.dataset.ic, c = { beranda: 'sage', orang: 'blue', tugas: 'butter', atur: 'lilac' }[a.dataset.tab];
    s.className = 'ni' + (on ? ' i3 c-' + c : ''); s.innerHTML = svg(n === 'home' ? 'home' : n, on ? '#fff' : HEX[c], on ? HEX[c] : undefined);
  });
  $('#nav').hidden = p[0] === 'proses';
  const fn = !p[0] ? R.beranda : p[0] === 'orang' && p[1] ? () => R.orangDetail(p[1]) : p[0] === 'm' ? () => R.hasil(p[1]) : R[p[0]];
  window.scrollTo(0, 0);
  try { await (fn ? fn(q) : R.beranda()); } catch (e) { console.error(e); $('#app').innerHTML = `<div class="kotak clay kosong">Ada yang salah saat membuka halaman ini.<br><a href="#/">Kembali ke beranda</a></div>`; }
}
const atas = (judul, kanan = '') => `<div class="top"><button class="btn-ikon clay" data-back aria-label="Kembali">${svg('back', '#4A3428')}</button><h1 style="flex:1">${esc(judul)}</h1>${kanan}</div>`;
document.addEventListener('click', e => { if (e.target.closest('[data-back]')) history.length > 1 ? history.back() : buka('#/'); });

/* ---- Beranda ---- */
R.beranda = () => {
  const nTugas = tugasTerbuka(S0.meeting);
  const terakhir = {}; S0.meeting.forEach(m => { terakhir[m.orangId] = Math.max(terakhir[m.orangId] || 0, m.tanggal); });
  const orang = [...S0.orang].sort((a, b) => (terakhir[b.id] || b.dibuat) - (terakhir[a.id] || a.dibuat)).slice(0, 5);
  $('#app').innerHTML = `
  <div class="top"><h1>Jejak</h1><a href="#/tugas" class="btn-ikon clay" aria-label="Tugas terbuka: ${nTugas}">${svg('bell', '#E0A532')}${nTugas ? `<i class="badge">${nTugas}</i>` : ''}</a></div>
  <section class="hero clay"><img src="./ippo.webp" alt=""><div class="isi">
    ${S0.kunci ? `<h2>Halo!</h2><p>${nTugas ? `Ada ${nTugas} tugas yang belum selesai.` : 'Semua tugas sudah beres.'}</p><button class="btn utama i3 c-coral" data-baru style="height:40px;font-size:13px;align-self:flex-start;margin-top:4px">Meeting baru</button>`
      : `<h2>Selamat datang!</h2><p>Pasang kunci API Gemini dulu supaya bisa merangkum.</p><a href="#/atur" class="btn utama i3 c-coral" style="height:40px;font-size:13px;align-self:flex-start;margin-top:4px;text-decoration:none">Buka Atur</a>`}
  </div></section>
  <div class="dua">
    <div class="stat clay p-sage"><span class="i3 ic c-sage">${svg('mic')}</span><span>Total meeting</span><b>${S0.meeting.length}</b></div>
    <a href="#/tugas" class="stat clay p-butter" style="text-decoration:none"><span class="i3 ic c-butter">${svg('tugas', '#fff', '#E0A532')}</span><span>Tugas terbuka</span><b>${nTugas}</b></a>
  </div>
  <div class="judul"><span>Orang</span>${S0.orang.length > 5 ? '<a href="#/orang">Lihat semua</a>' : ''}</div>
  ${orang.length ? orang.map(barisOrang).join('') : `<div class="kotak clay kosong">Belum ada meeting.<br>Tekan tombol <b>+</b> di bawah untuk mulai.</div>`}`;
};
function barisOrang(o) {
  const ms = meetingOrang(o.id), t = tugasTerbuka(ms), w = o.warna || 'coral';
  const akhir = ms.length ? Math.max(...ms.map(m => m.tanggal)) : 0;
  return `<a href="#/orang/${encodeURIComponent(o.id)}" class="baris clay"><span class="i3 av c-${w}"><span>${esc(inisial(o.nama))}</span></span><span class="tx"><b>${esc(o.nama)}</b><small>${ms.length} meeting${akhir ? ' · ' + kapan(akhir) : ''}</small></span>${t ? `<span class="pill oren">${t} tugas</span>` : ''}</a>`;
}

/* ---- Daftar orang ---- */
R.orang = () => {
  const list = [...S0.orang].sort((a, b) => a.nama.localeCompare(b.nama, 'id'));
  $('#app').innerHTML = `<div class="top"><h1>Orang</h1></div>
  <input class="in" id="cari" type="search" placeholder="Cari nama" aria-label="Cari nama">
  <div id="daftar">${list.length ? list.map(barisOrang).join('') : '<div class="kotak clay kosong">Belum ada orang. Nama otomatis tersimpan saat kamu membuat meeting baru.</div>'}</div>`;
  $('#cari').oninput = e => { const k = e.target.value.toLowerCase().trim(); $('#daftar').innerHTML = list.filter(o => o.nama.toLowerCase().includes(k)).map(barisOrang).join('') || '<div class="kosong">Tidak ketemu.</div>'; };
};

/* ---- Detail orang + riwayat ---- */
R.orangDetail = id => {
  const o = orangById(decodeURIComponent(id)); if (!o) return buka('#/orang');
  const ms = meetingOrang(o.id), w = o.warna || 'coral';
  const nKep = ms.reduce((n, m) => n + seksiDari(m.hasil).filter(s => s.bentuk === 'centang').reduce((a, s) => a + s.isi.length, 0), 0);
  const grup = {}; ms.forEach(m => { const k = new Date(m.tanggal).toDateString(); (grup[k] = grup[k] || []).push(m); });
  const dobel = Object.values(grup).filter(g => g.length > 1);
  const ingat = [...ms.flatMap(m => m.hasil.tugas.filter(t => !t.selesai).map(t => t.apa)), ...(ms[0] ? seksiDari(ms[0].hasil).filter(s => s.bentuk === 'belum').flatMap(s => s.isi.map(x => x.teks)) : [])].slice(0, 4);
  $('#app').innerHTML = atas('') + `
  <section class="kotak clay" style="background:var(--peach)"><div style="display:flex;align-items:center;gap:14px;margin-bottom:14px"><span class="i3 av c-${w}" style="width:60px;height:60px;border-radius:20px;font-size:21px"><span>${esc(inisial(o.nama))}</span></span><div><h2 style="font-size:23px;font-weight:900">${esc(o.nama)}</h2><small style="font-size:13px;font-weight:700;color:#6E4A38">Sejak ${esc(tglPendek(o.dibuat))}</small></div></div>
  <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px">${[['meeting', ms.length], ['tugas', tugasTerbuka(ms)], ['keputusan', nKep]].map(([l, n]) => `<div class="clay" style="background:var(--card);border-radius:18px;padding:10px 12px"><b style="font-size:22px;font-weight:900;display:block">${n}</b><small style="font-size:12px;font-weight:700;color:var(--sub)">${l}</small></div>`).join('')}</div></section>
  ${ingat.length ? `<section class="kotak clay p-butter" style="display:flex;gap:12px"><span class="i3 ic c-butter">${svg('bell')}</span><div><h3 style="font-size:14px;font-weight:900">Ingat sebelum meeting lagi</h3><ul style="margin:6px 0 0;padding-left:18px;font-size:13px;font-weight:700;color:#6B5320;line-height:1.5">${ingat.map(x => `<li>${esc(x)}</li>`).join('')}</ul></div></section>` : ''}
  ${dobel.map(g => `<section class="kotak clay p-blue" style="display:flex;gap:12px;align-items:center"><span class="i3 ic c-blue">${svg('star')}</span><div style="flex:1"><h3 style="font-size:14px;font-weight:900">${g.length} meeting pada ${esc(tglPendek(g[0].tanggal))}</h3><p style="font-size:12px;font-weight:700;color:#34507A;line-height:1.4">Satukan jadi satu kesimpulan utuh.</p></div><button class="btn utama i3 c-blue" style="height:44px;font-size:13px" data-satukan="${esc(new Date(g[0].tanggal).toDateString())}"><span>Satukan</span></button></section>`).join('')}
  <div class="judul"><span>Riwayat meeting</span></div>
  ${ms.map((m, i) => { const d = new Date(m.tanggal), c = WARNA[i % 5]; return `<a href="#/m/${encodeURIComponent(m.id)}" class="baris clay"><span class="i3 tgl c-${c}"><b>${String(d.getDate()).padStart(2, '0')}</b><small>${BLN[d.getMonth()]}</small></span><span class="tx"><b>${esc(m.hasil.judul)}</b><small>${esc([durasiTeks(m.durasi), m.hasil.poin.length + ' poin'].filter(Boolean).join(' · '))}</small></span>${i === 0 && Date.now() - m.tanggal < 864e5 ? '<span class="pill ijo">Baru</span>' : ''}</a>`; }).join('') || '<div class="kotak clay kosong">Belum ada meeting.</div>'}
  <button class="link" id="hapusOrang" style="color:#A8331A">Hapus ${esc(o.nama)} dan semua meeting-nya</button>`;
  document.querySelectorAll('[data-satukan]').forEach(b => b.onclick = () => tombolProses(b, 'AI sedang menyatukan…', async () => {
    const g = grup[b.dataset.satukan].slice().sort((a, c) => a.tanggal - c.tanggal);
    let h; try { h = await gabungkan(g.map(m => m.hasil), { nama: o.nama, topik: '', jenis: g[0].jenis || 'meeting' }, () => {}); } catch (x) { return toast(x.message || 'Gagal menyatukan. Coba lagi.', 5000); }
    const baru = { id: uid(), orangId: o.id, tanggal: g[0].tanggal, durasi: g.reduce((a, m) => a + (m.durasi || 0), 0), topik: '', jenis: g[0].jenis, hasil: h, versi: 1 };
    try { await DB.ganti([baru], g.map(m => m.id)); } catch { return toast('Gagal menyimpan. Coba lagi.'); } // potongan lama baru dihapus kalau gabungan tersimpan
    S0.meeting = [baru, ...S0.meeting.filter(m => !g.includes(m))].sort((a, c) => c.tanggal - a.tanggal); perbaruiLencana();
    toast('Sudah disatukan jadi satu kesimpulan'); buka('#/m/' + encodeURIComponent(baru.id));
  }));
  $('#hapusOrang').onclick = e => tombolProses(e.currentTarget, 'Sedang menghapus…', async () => {
    if (!confirm(`Hapus ${o.nama} dan ${ms.length} meeting? Ini tidak bisa dibatalkan.`)) return;
    try { await DB.delMany({ orang: [o.id], meeting: ms.map(m => m.id), transkrip: ms.map(m => m.id) }); }
    catch { return toast('Gagal menghapus. Coba lagi.'); }
    S0.orang = S0.orang.filter(x => x.id !== o.id); S0.meeting = S0.meeting.filter(m => m.orangId !== o.id);
    perbaruiLencana(); toast('Sudah dihapus'); buka('#/orang');
  });
};

/* ---- Tugas ---- */
R.tugas = q => {
  const lihat = q.get('lihat') === 'selesai' ? 'selesai' : 'belum';
  const rows = S0.meeting.flatMap(m => m.hasil.tugas.filter(t => (lihat === 'selesai') === !!t.selesai).map(t => ({ t, m })));
  $('#app').innerHTML = `<div class="top"><h1>Tugas</h1></div>
  <div class="chips"><a href="#/tugas" class="chip ${lihat === 'belum' ? 'on i3 c-butter' : 'clay'}" style="display:inline-flex;align-items:center;text-decoration:none"><span>Belum selesai</span></a><a href="#/tugas?lihat=selesai" class="chip ${lihat === 'selesai' ? 'on i3 c-sage' : 'clay'}" style="display:inline-flex;align-items:center;text-decoration:none"><span>Sudah selesai</span></a></div>
  <section class="kotak clay">${rows.length ? rows.map(({ t, m }) => barisTugas(t, m, true)).join('') : `<div class="kosong">${lihat === 'belum' ? 'Tidak ada tugas yang menunggu.' : 'Belum ada tugas yang selesai.'}</div>`}</section>`;
};
function barisTugas(t, m, denganNama) {
  const o = orangById(m.orangId);
  const ket = [t.siapa, t.kapan, denganNama && o ? 'meeting ' + o.nama : ''].filter(Boolean).join(' · ');
  return `<div class="tg ${t.selesai ? 'done' : ''}"><button class="centang ${t.selesai ? 'i3 c-sage' : ''}" data-tugas="${esc(m.id)}|${esc(t.id)}" aria-pressed="${t.selesai}" aria-label="${t.selesai ? 'Tandai belum selesai' : 'Tandai selesai'}: ${esc(t.apa)}">${t.selesai ? svg('centang') : ''}</button><span class="tx">${esc(t.apa)}${ket ? `<small>${esc(ket)}</small>` : ''}</span>${!t.selesai && t.kapan ? `<span class="pill oren">${esc(t.kapan)}</span>` : ''}<button class="hapus-tg" data-hapustugas="${esc(m.id)}|${esc(t.id)}" aria-label="Hapus tugas: ${esc(t.apa)}">×</button></div>`;
}
document.addEventListener('click', async e => { // hapus satu tugas saja (meeting tetap ada)
  const b = e.target.closest('[data-hapustugas]'); if (!b || b.disabled) return;
  const [mid, tid] = b.dataset.hapustugas.split('|'); const m = S0.meeting.find(x => x.id === mid); const t = m?.hasil.tugas.find(x => x.id === tid); if (!t) return;
  if (!confirm(`Hapus tugas "${t.apa}"?`)) return;
  b.disabled = true; b.textContent = '…';
  const baru = { ...m, hasil: { ...m.hasil, tugas: m.hasil.tugas.filter(x => x.id !== tid) } };
  try { await DB.put('meeting', baru); } catch { b.disabled = false; b.textContent = '×'; return toast('Gagal menghapus. Coba lagi.'); }
  Object.assign(m, baru); perbaruiLencana(); b.closest('.tg').remove(); toast('Tugas dihapus');
  if (location.hash.startsWith('#/tugas') && !document.querySelector('.tg')) jalan();
});
document.addEventListener('click', async e => {
  const b = e.target.closest('[data-tugas]'); if (!b || b.disabled) return;
  const [mid, tid] = b.dataset.tugas.split('|'); const m = S0.meeting.find(x => x.id === mid); const t = m?.hasil.tugas.find(x => x.id === tid); if (!t) return;
  b.disabled = true;
  const baru = { ...m, hasil: { ...m.hasil, tugas: m.hasil.tugas.map(x => x.id === tid ? { ...x, selesai: !x.selesai } : x) } };
  try { await DB.put('meeting', baru); } catch { b.disabled = false; return toast('Gagal menyimpan. Coba lagi.'); }
  Object.assign(m, baru); perbaruiLencana();
  const row = b.closest('.tg'); const t2 = baru.hasil.tugas.find(x => x.id === tid);
  if (location.hash.startsWith('#/tugas')) { row.remove(); toast(t2.selesai ? 'Tugas selesai' : 'Tugas dibuka lagi'); if (!document.querySelector('.tg')) jalan(); }
  else row.outerHTML = barisTugas(t2, m, false);
});

/* ---- Pilih cara: unggah / rekam ---- */
const sheet = $('#sheet');
$('#btnBaru').onclick = () => { sheet.hidden = false; sheet.querySelector('.pil').focus(); };
document.addEventListener('click', e => { if (e.target.closest('[data-baru]')) $('#btnBaru').click(); });
sheet.onclick = e => {
  const p = e.target.closest('[data-pilih]');
  if (p) { sheet.hidden = true; buka('#/baru?cara=' + p.dataset.pilih); }
  else if (e.target === sheet || e.target.closest('[data-tutup]')) sheet.hidden = true;
};
document.addEventListener('keydown', e => { if (e.key === 'Escape') sheet.hidden = true; });

/* ---- Form meeting baru ---- */
let JOB = null; // pekerjaan yang sedang diproses
const tipeAudio = f => {
  const n = (f.name || '').toLowerCase(), t = f.type || '';
  if (/\.m4a$|\.mp4$/.test(n) || /mp4|m4a/.test(t)) return 'audio/mp4';
  if (/\.mp3$/.test(n) || /mpeg|mp3/.test(t)) return 'audio/mp3';
  if (/\.wav$/.test(n) || /wav/.test(t)) return 'audio/wav';
  if (/\.(ogg|opus)$/.test(n) || /ogg|opus/.test(t)) return 'audio/ogg';
  if (/\.aac$/.test(n) || /aac/.test(t)) return 'audio/aac';
  if (/\.flac$/.test(n) || /flac/.test(t)) return 'audio/flac';
  if (/\.webm$/.test(n) || /webm/.test(t)) return 'audio/webm';
  if (/\.(aiff|aif)$/.test(n)) return 'audio/aiff';
  return t.startsWith('audio/') ? t.split(';')[0] : '';
};
const lamaAudio = blob => new Promise(ok => {
  const a = new Audio(), u = URL.createObjectURL(blob), selesai = d => { URL.revokeObjectURL(u); ok(isFinite(d) ? Math.round(d) : 0); };
  a.preload = 'metadata'; a.onloadedmetadata = () => selesai(a.duration); a.onerror = () => selesai(0); setTimeout(() => selesai(0), 8000); a.src = u;
});
R.baru = q => {
  if (!S0.kunci) { toast('Pasang kunci API dulu di menu Atur'); return buka('#/atur'); }
  const rekam = q.get('cara') === 'rekam';
  const saran = [...S0.orang].sort((a, b) => (b.dibuat || 0) - (a.dibuat || 0)).slice(0, 6);
  $('#app').innerHTML = atas('Meeting baru') + `
  <section class="kotak clay">
    <label class="lb">Jenis rekaman</label>
    <div class="chips" id="jenisChips">${[...Object.entries(TEMPLATE).map(([k, t]) => [k, t.nama]), ['lain', 'Lainnya']].map(([k, n], i) => `<button type="button" class="chip ${i ? 'clay' : 'on i3 c-sage'}" data-jenis="${k}"><span>${esc(n)}</span></button>`).join('')}</div>
    <input class="in" id="jenisLain" maxlength="30" autocomplete="off" placeholder="Tulis jenisnya, mis. Les bahasa Inggris" hidden style="margin-top:8px">
    <label class="lb" for="nama" id="lbNama">Meeting dengan siapa?</label>
    <input class="in" id="nama" maxlength="40" autocomplete="off" placeholder="Bu Rina">
    ${saran.length ? `<div class="chips">${saran.map(o => `<button type="button" class="chip clay" data-nama="${esc(o.nama)}">${esc(o.nama)}</button>`).join('')}</div>` : ''}
    <div class="err" id="errNama" hidden></div>
    <label class="lb" for="topik">Topik (boleh kosong)</label>
    <input class="in" id="topik" maxlength="60" autocomplete="off" placeholder="Webapp kasir toko">
  </section>
  ${rekam ? `<section class="kotak clay" id="rekamBox" style="text-align:center">
      <div class="rec-time" id="recTime">00:00</div>
      <button type="button" class="btn utama i3 c-coral" id="btnRekam" style="width:100%">${svg('mic')}<span>Mulai rekam</span></button>
      <p class="hint">Layar HP harus tetap menyala dan aplikasi ini harus tetap terbuka selama merekam. Kalau ada telepon masuk, rekaman bisa berhenti.</p>
    </section>`
    : `<input type="file" id="fileIn" accept="audio/*,.m4a,.mp3,.wav,.ogg,.opus,.aac,.flac,.webm" multiple hidden>
    <button type="button" class="file clay" id="pilihFile"><span class="i3 ic c-sage" style="width:52px;height:52px;border-radius:17px">${svg('unggah')}</span><span class="tx"><b id="fNama">Pilih file rekaman</b><small id="fInfo">Bisa pilih beberapa file sekaligus. Rekaman panjang dipotong otomatis.</small></span></button>`}
  <section class="kotak clay"><div class="sek-h"><span class="i3 ic c-butter">${svg('unggah')}</span><h3 style="flex:1">Foto & PDF (boleh kosong)</h3><button type="button" class="chip clay" id="tambahFoto">+ Tambah</button></div>
    <input type="file" id="fotoIn" accept="image/*,application/pdf,.pdf" multiple hidden>
    <div id="daftarFoto" style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px"></div>
    <p class="hint" id="infoFoto">Slide, papan tulis, catatan, atau file PDF. Bisa banyak.</p></section>
  <div class="err" id="errFile" hidden></div>
  <button type="button" class="btn utama i3 c-coral" id="btnRangkum" style="width:100%"><span>Rangkum sekarang</span></button>
  <p class="hint" style="text-align:center">Pakai WiFi supaya cepat. Rekaman dikirim ke Google Gemini untuk dirangkum, lalu dihapus dari sana.</p>`;
  let berkas = [], jenis = 'meeting';
  document.querySelectorAll('[data-jenis]').forEach(b => b.onclick = () => {
    document.querySelectorAll('[data-jenis]').forEach(x => x.className = 'chip ' + (x === b ? 'on i3 c-sage' : 'clay'));
    const lain = b.dataset.jenis === 'lain', t = TEMPLATE[b.dataset.jenis];
    jenis = lain ? '' : b.dataset.jenis; $('#jenisLain').hidden = !lain; if (lain) $('#jenisLain').focus();
    $('#lbNama').textContent = t ? t.orang : 'Dengan siapa / di mana?'; $('#nama').placeholder = t ? t.contoh : 'Miss Ana · kursus';
  });
  const nama = $('#nama'), errN = $('#errNama'), errF = $('#errFile'), salah = t => { errF.textContent = t; errF.hidden = false; return null; };
  document.querySelectorAll('[data-nama]').forEach(b => b.onclick = () => { nama.value = b.dataset.nama; errN.hidden = true; });
  nama.oninput = () => errN.hidden = true;
  const periksa = async (blob, namaFile) => {
    const mime = tipeAudio({ name: namaFile, type: blob.type });
    if (!mime) return salah(`"${namaFile}" bukan rekaman suara. Pilih file seperti .m4a, .mp3, .ogg, atau .wav.`);
    if (blob.size > CONFIG.MAKS_MB * 1048576) return salah(`"${namaFile}" terlalu besar (lebih dari 1,9 GB).`);
    if (blob.size < 2000) return salah(`"${namaFile}" terlalu pendek atau kosong.`);
    return { blob, mime, namaFile, durasi: await lamaAudio(blob) };
  };
  const tampil = () => {
    if (rekam) return;
    const tot = berkas.reduce((a, b) => a + (b.durasi || 0), 0), mb = berkas.reduce((a, b) => a + b.blob.size, 0) / 1048576;
    $('#fNama').textContent = berkas.length > 1 ? `${berkas.length} file: ${berkas.map(b => b.namaFile).join(', ')}` : berkas[0].namaFile;
    $('#fInfo').textContent = [durasiTeks(tot), mb.toFixed(1) + ' MB', berkas.some(b => b.durasi > POTONG_DETIK + 180) ? 'akan dipotong otomatis' : '', berkas.length > 1 ? 'jadi satu kesimpulan' : ''].filter(Boolean).join(' · ');
  };
  const pasang = async (blob, namaFile) => { errF.hidden = true; const b = await periksa(blob, namaFile); if (b) { berkas = [b]; tampil(); } };
  const pasangBanyak = async files => {
    errF.hidden = true; $('#fInfo').textContent = 'Sedang memeriksa file…';
    const list = [...files].sort((a, b) => a.name.localeCompare(b.name, 'id', { numeric: true })), hasil = [];
    for (const f of list) { const b = await periksa(f, f.name); if (!b) return; hasil.push(b); }
    berkas = hasil; tampil();
  };
  if (!rekam) { $('#pilihFile').onclick = () => $('#fileIn').click(); $('#fileIn').onchange = e => { if (e.target.files.length) pasangBanyak(e.target.files); }; }
  else pasangPerekam(pasang);
  if (!rekam && q.get('dibagikan')) ambilKiriman(pasang);
  let fotos = []; const daftar = $('#daftarFoto');
  const gambarFoto = () => { daftar.innerHTML = fotos.map((f, i) => `<div style="position:relative;aspect-ratio:1;border-radius:14px;overflow:hidden;background:var(--well)">${f.url ? `<img src="${f.url}" alt="Foto ${i + 1}" style="width:100%;height:100%;object-fit:cover">` : `<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;padding:4px;text-align:center"><b style="font-size:13px;font-weight:900;color:#A8331A">PDF</b><small style="font-size:9px;font-weight:700;word-break:break-all;line-height:1.2">${esc((f.nama || '').slice(0, 24))}</small></div>`}<button type="button" data-hapusfoto="${i}" aria-label="Hapus foto ${i + 1}" style="position:absolute;top:4px;right:4px;width:28px;height:28px;border-radius:999px;border:0;background:rgba(74,52,40,.75);color:#fff;font-weight:900">×</button></div>`).join(''); const nP = fotos.filter(f => f.pdf).length, nF = fotos.length - nP; $('#infoFoto').textContent = fotos.length ? [nF && nF + ' foto', nP && nP + ' PDF'].filter(Boolean).join(' dan ') + ' dipilih.' : 'Slide, papan tulis, catatan, atau file PDF. Bisa banyak.'; };
  $('#tambahFoto').onclick = () => $('#fotoIn').click();
  $('#fotoIn').onchange = async e => {
    const semua = [...e.target.files]; e.target.value = '';
    const pdf = f => f.type === 'application/pdf' || /\.pdf$/i.test(f.name);
    for (const f of semua.filter(pdf)) { if (f.size > 50 * 1048576) toast(`"${f.name}" lebih dari 50 MB, dilewati.`, 4000); else fotos.push({ pdf: f, nama: f.name }); }
    const fs = semua.filter(f => f.type.startsWith('image/')); gambarFoto(); if (!fs.length) return;
    const btn = $('#tambahFoto'); await tombolProses(btn, 'Menyiapkan foto…', async () => {
      for (const f of fs) { try { const b = await kecilkanFoto(f); fotos.push({ blob: b, url: URL.createObjectURL(b) }); } catch { toast('Ada foto yang tidak bisa dibaca, dilewati.'); } gambarFoto(); }
    });
  };
  daftar.onclick = e => { const b = e.target.closest('[data-hapusfoto]'); if (!b) return; const [f] = fotos.splice(+b.dataset.hapusfoto, 1); if (f.url) URL.revokeObjectURL(f.url); gambarFoto(); };
  $('#btnRangkum').onclick = () => {
    const n = nama.value.trim().replace(/\s+/g, ' ');
    if (!n) { errN.textContent = 'Tulis dulu namanya.'; errN.hidden = false; nama.focus(); return; }
    if (rekam && REC.aktif) { errF.textContent = 'Hentikan rekaman dulu.'; errF.hidden = false; return; }
    if (!berkas.length && !fotos.length) { errF.textContent = rekam ? 'Rekam dulu obrolannya atau tambahkan foto/PDF.' : 'Pilih rekaman atau tambahkan foto/PDF dulu.'; errF.hidden = false; return; }
    const jn = jenis || $('#jenisLain').value.trim().replace(/\s+/g, ' ').slice(0, 30);
    if (!jn) { errF.textContent = 'Tulis dulu jenis rekamannya.'; errF.hidden = false; $('#jenisLain').focus(); return; }
    if (fotos.some(f => !f.blob && !f.pdf)) { errF.textContent = 'Foto masih disiapkan, tunggu sebentar.'; errF.hidden = false; return; }
    JOB = { foto: fotos.filter(f => f.blob).map(f => f.blob), pdf: fotos.filter(f => f.pdf).map(f => f.pdf), jenis: jn, nama: n, topik: $('#topik').value.trim().slice(0, 60), sumber: berkas, durasi: berkas.reduce((a, b) => a + (b.durasi || 0), 0), bagian: null };
    buka('#/proses');
  };
};

/* Rekaman yang dikirim lewat tombol Bagikan (Android) */
async function ambilKiriman(pasang) {
  try {
    const c = await caches.open('jejak-bagikan'), url = new URL('./bagikan-file', location.href).href, r = await c.match(url);
    if (!r) return toast('Rekaman tidak ikut terkirim. Coba Bagikan lagi atau pilih file.', 4000);
    const nama = decodeURIComponent(r.headers.get('x-nama') || 'rekaman'), blob = await r.blob();
    await pasang(new Blob([blob], { type: r.headers.get('content-type') || '' }), nama);
    await c.delete(url); history.replaceState(null, '', '#/baru?cara=unggah');
    toast('Rekaman sudah masuk. Tulis nama, lalu Rangkum.'); $('#nama').focus();
  } catch { toast('Gagal membaca rekaman kiriman. Pilih file secara manual.', 4000); }
}

/* ---- Perekam di dalam aplikasi ---- */
const REC = { aktif: false };
function pasangPerekam(pasang) {
  const btn = $('#btnRekam'), waktu = $('#recTime');
  btn.onclick = async () => {
    if (REC.aktif) return REC.mr.stop();
    let stream;
    try { stream = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true } }); }
    catch { return toast('Izin mikrofon ditolak. Buka pengaturan browser untuk mengizinkan.', 4000); }
    const tipe = ['audio/mp4', 'audio/webm;codecs=opus', 'audio/webm'].find(t => window.MediaRecorder?.isTypeSupported?.(t)) || '';
    const mr = new MediaRecorder(stream, tipe ? { mimeType: tipe } : undefined), potongan = [];
    Object.assign(REC, { aktif: true, mr, mulai: Date.now() });
    try { REC.kunciLayar = await navigator.wakeLock?.request('screen'); } catch {}
    mr.ondataavailable = e => e.data.size && potongan.push(e.data);
    mr.onstop = async () => {
      clearInterval(REC.t); REC.aktif = false; stream.getTracks().forEach(t => t.stop()); REC.kunciLayar?.release?.().catch(() => {});
      const blob = new Blob(potongan, { type: mr.mimeType || tipe || 'audio/webm' });
      const ext = /mp4/.test(blob.type) ? 'm4a' : 'webm';
      btn.innerHTML = `${svg('mic')}<span>Rekam ulang</span>`;
      await pasang(blob, `rekaman.${ext}`);
      toast('Rekaman siap. Tekan Rangkum sekarang.');
    };
    mr.start(1000);
    btn.innerHTML = `<span>Berhenti rekam</span>`;
    REC.t = setInterval(() => { const d = Math.floor((Date.now() - REC.mulai) / 1000); waktu.textContent = `${String(Math.floor(d / 60)).padStart(2, '0')}:${String(d % 60).padStart(2, '0')}`; }, 500);
  };
}
document.addEventListener('visibilitychange', () => { if (document.hidden && REC.aktif) toast('Jangan tinggalkan aplikasi saat merekam, rekaman bisa berhenti.', 5000); });
window.addEventListener('hashchange', () => { if (REC.aktif && !location.hash.startsWith('#/baru')) REC.mr.stop(); });

/* ---- Proses (loading not balok) ---- */
R.proses = () => {
  if (!JOB) return buka('#/');
  const not = Array.from({ length: 7 }, (_, i) => `<span class="not" style="color:${HEX[WARNA[i % 5]]};left:${18 + i * 10}%;--x:${(i % 2 ? 1 : -1) * (10 + i * 4)}px;--r:${(i % 2 ? 1 : -1) * 25}deg;animation-delay:${i * 0.4}s">${'♪♫♩♬'[i % 4]}</span>`).join('');
  $('#app').innerHTML = `<section class="kotak clay" style="margin-top:20px;padding:22px 18px">
    <div class="panggung" aria-hidden="true"><div class="ring"></div><div class="ring b"></div><div class="i3 mic c-coral">${svg('mic')}</div>${not}</div>
    <div class="lbl" id="pLbl">Mengirim rekaman…</div>
    <div class="sub" id="pSub">Jangan tutup aplikasi dulu, ya.</div>
    <div class="bar"><div id="pBar" class="c-coral"></div></div>
    <div id="pAksi"></div></section>
  <p class="hint" style="text-align:center">${esc(namaJenis(JOB.jenis))} · ${esc(JOB.nama)}${JOB.durasi ? ' · ' + esc(durasiTeks(JOB.durasi)) : ''}</p>`;
  prosesJalan();
};
let lamaT;
function setTahap(teks, persen, sub) {
  const l = $('#pLbl'); if (!l) return;
  l.textContent = teks; if (persen != null) $('#pBar').style.width = Math.round(persen) + '%';
  $('#pSub').textContent = sub || 'Jangan tutup aplikasi dulu, ya.';
  clearTimeout(lamaT); lamaT = setTimeout(() => { if ($('#pSub')) $('#pSub').textContent = 'Masih diproses, mohon tunggu sebentar. Rekaman panjang bisa sampai 10 menit.'; }, 12000);
}
const jagaTutup = e => { e.preventDefault(); e.returnValue = ''; };
async function prosesJalan() {
  const j = JOB; addEventListener('beforeunload', jagaTutup);
  try {
    if (!j.bagian) { // rekaman panjang dipotong per ±30 menit di HP, tanpa diunggah dulu
      setTahap('Menyiapkan rekaman…', 2, j.durasi > POTONG_DETIK + 180 ? 'Rekaman panjang sedang dipotong per 30 menit.' : '');
      const bag = []; let mulai = 0;
      for (const s of j.sumber) for (const p of await potongRekaman(s)) { bag.push({ ...p, mulai, file: null, hasil: null }); mulai += p.durasi || 0; }
      for (const f of j.pdf || []) bag.push({ blob: f, mime: 'application/pdf', pdf: true, file: null, hasil: null });
      for (let i = 0; i < (j.foto || []).length; i += 6) bag.push({ foto: j.foto.slice(i, i + 6), hasil: null }); // foto dikirim per 6, dibaca 3 kiriman sekaligus (lebih cepat)
      j.bagian = bag;
    }
    const fb = j.bagian.filter(p => p.foto && !p.hasil);
    if (fb.length) { // kumpulan foto dibaca bersamaan, maksimal 3 sekaligus
      let sel = 0; const total = fb.length, info = () => setTahap(`Membaca foto: ${sel} dari ${total} kumpulan selesai…`, 3 + 40 * sel / total);
      info(); const antre = [...fb], galat = [];
      await Promise.all(Array.from({ length: Math.min(3, total) }, async () => { for (let p; (p = antre.shift());) {
        try { p.hasil = await rangkumFoto(await Promise.all(p.foto.map(keBase64)), j, () => {}); p.foto = null; sel++; info(); } catch (e) { galat.push(e); }
      } }));
      if (galat.length) throw galat[0]; // yang sudah selesai tetap tersimpan, Coba lagi hanya mengulang yang gagal
    }
    const N = j.bagian.length, lebar = (N > 1 ? 82 : 92) / N;
    for (let k = 0; k < N; k++) {
      const p = j.bagian[k], lo = 3 + k * lebar, label = N > 1 ? `Bagian ${k + 1} dari ${N}: ` : '';
      if (p.hasil) continue; // sudah selesai sebelumnya (saat Coba lagi)
      if (p.foto) { setTahap(label + `Membaca ${p.foto.length} foto…`, lo + lebar * 0.2); p.hasil = await rangkumFoto(await Promise.all(p.foto.map(keBase64)), j, maju(lo + lebar * 0.3, lo + lebar, label)); p.foto = null; continue; }
      if (p.pdf) {
        if (!p.file) { setTahap(label + 'Mengirim PDF…', lo); p.file = await unggahKeGemini(p.blob, p.mime, f => setTahap(`${label}Mengirim PDF… ${Math.round(f * 100)}%`, lo + f * lebar * 0.4)); }
        setTahap(label + 'Membaca PDF…', lo + lebar * 0.45);
        p.hasil = await rangkum(p.file, { ...j, potongan: null }, maju(lo + lebar * 0.5, lo + lebar, label), 'pdf');
        hapusFileGemini(p.file.name); p.file = null; p.blob = null; continue;
      }
      if (!p.file) { setTahap(label + 'Mengirim rekaman…', lo); p.file = await unggahKeGemini(p.blob, p.mime, f => setTahap(`${label}Mengirim rekaman… ${Math.round(f * 100)}%`, lo + f * lebar * 0.4)); }
      setTahap(label + 'Mendengarkan obrolan…', lo + lebar * 0.45, (p.durasi || 0) > 15 * 60 ? 'Google perlu beberapa menit untuk mendengarkan. Jangan tutup aplikasi.' : '');
      p.hasil = await rangkum(p.file, { ...j, durasi: p.durasi, potongan: N > 1 ? { k: k + 1, N, mulai: Math.round(p.mulai / 60) } : null }, maju(lo + lebar * 0.5, lo + lebar, label));
      hapusFileGemini(p.file.name); p.file = null; p.blob = null; // rekaman bagian ini tidak dipakai lagi
    }
    let hasil = j.bagian[0].hasil;
    if (N > 1) { try { hasil = await gabungkan(j.bagian.map(p => p.hasil), j, maju(86, 96, 'Menyatukan kesimpulan: ')); } catch (e) { if (e.status === 401 || e.status === 403) throw e; hasil = gabungLokal(j.bagian.map(p => p.hasil)); toast('AI gagal menyatukan, jadi bagian-bagiannya digabung langsung. Isinya tetap lengkap.', 6000); } }
    setTahap('Menyimpan…', 97);
    let o = S0.orang.find(x => x.nama.toLowerCase() === j.nama.toLowerCase());
    const orangBaru = !o; if (!o) o = { id: uid(), nama: j.nama, warna: WARNA[S0.orang.length % 5], dibuat: Date.now() };
    const m = { id: uid(), orangId: o.id, tanggal: Date.now(), durasi: j.durasi, topik: j.topik, jenis: j.jenis, hasil, versi: 1 };
    await DB.putMany({ orang: [o], meeting: [m] }); // satu transaksi
    if (orangBaru) S0.orang.push(o);
    S0.meeting.unshift(m); perbaruiLencana(); JOB = null;
    setTahap('Kartu siap!', 100, '');
    removeEventListener('beforeunload', jagaTutup);
    setTimeout(() => location.replace('#/m/' + encodeURIComponent(m.id)), 500);
  } catch (e) {
    console.error(e); clearTimeout(lamaT); removeEventListener('beforeunload', jagaTutup);
    const pesan = e instanceof GagalAI ? e.message : (e?.name === 'QuotaExceededError' ? 'Memori HP penuh. Hapus beberapa data dulu.' : 'Gagal memproses. Coba lagi.');
    const sudah = (j.bagian || []).filter(p => p.hasil).length;
    $('#pLbl').textContent = 'Belum berhasil'; $('#pSub').textContent = pesan + (sudah ? ` ${sudah} bagian sudah selesai dan tidak perlu diulang.` : '');
    $('#pAksi').innerHTML = `<div class="dua" style="margin-top:14px"><button class="btn clay" id="pBatal">Batal</button><button class="btn utama i3 c-coral" id="pUlang"><span>Coba lagi</span></button></div>`;
    $('#pUlang').onclick = () => { $('#pAksi').innerHTML = ''; prosesJalan(); };
    $('#pBatal').onclick = () => { (j.bagian || []).forEach(p => hapusFileGemini(p.file?.name)); JOB = null; buka('#/'); };
  }
}

/* ---- Hasil (kartu ringkasan) ---- */
function seksiHtml(s, n) { // satu bagian di halaman hasil, tampilannya mengikuti bentuk
  const [c, ik] = GAYA[s.bentuk] || GAYA.daftar, e = esc;
  const isi = s.isi.map((x, i) => ({
    centang: () => `<div class="cek">${svg('ok', HEX.sage)}<span>${e(x.teks)}</span></div>`,
    angka: () => `<div class="sx-angka clay p-${WARNA[i % 5]}"><small>${e(x.label)}</small><b>${e(x.teks)}</b></div>`,
    linimasa: () => `<div class="alur"><span class="w">${e(x.label)}</span><div class="t"><b>${e(x.teks)}</b><small>${e(x.ket)}</small></div></div>`,
    daftar: () => `<p class="sx-poin">${e(x.teks)}</p>`,
    belum: () => `<p class="sx-poin">${e(x.teks)}</p>`,
    langkah: () => `<div class="sx-langkah"><span class="i3 c-coral"><span>${i + 1}</span></span><p>${e(x.teks)}</p></div>`,
    kutipan: () => `<blockquote class="sx-kutip">"${e(x.teks)}"${x.ket ? `<small>${e(x.ket)}</small>` : ''}</blockquote>`,
    ayat: () => `<div class="sx-ayat"><b>${e(x.label)}</b>${x.ket ? `<span class="pill ${/dibaca/i.test(x.ket) ? 'ijo' : 'kuning'}">${e(x.ket)}</span>` : ''}<p>${e(x.teks)}</p></div>`,
    istilah: () => `<div class="sx-istilah"><b>${e(x.label)}</b><span>${e(x.teks)}</span></div>`,
    pesan: () => `<div class="sx-pesan">${e(x.teks)}</div><button class="btn clay" data-salin="${e(x.teks)}" style="width:100%;margin-top:10px">${svg('kirim', '#4A3428')}<span>Salin pesan</span></button>`
  }[s.bentuk] || (() => ''))()).join('');
  return `<section class="kotak clay${s.bentuk === 'belum' ? ' sx-belum' : ''}"><div class="sek-h"><span class="i3 ic c-${c}">${svg(ik, '#fff', HEX[c])}</span><h3>${e(s.judul)}</h3></div><div class="${s.bentuk === 'angka' ? 'sx-grid' : ''}">${isi}</div></section>`;
}
R.hasil = id => {
  const m = S0.meeting.find(x => x.id === decodeURIComponent(id)); if (!m) return buka('#/');
  const h = m.hasil, o = orangById(m.orangId) || { nama: '?' };
  const iBag = b => Math.max(0, h.bagian.indexOf(b));
  const TM = temaDari(m);
  const kartu = (p, i) => { const c = WARNA[i % 5]; return `<article class="k1 clay p-${c}" data-bag="${iBag(p.bagian)}"><span class="tag t-${c}">${esc(p.bagian || h.bagian[0])}</span><div class="hd"><span class="i3 n c-${c}"><span>${i + 1}</span></span><h3>${esc(p.judul)}</h3></div><p class="t-${c}">${esc(p.isi)}</p>${TM.ikon ? `<svg class="ill" viewBox="0 0 70 56" aria-hidden="true">${TM.ikon[i % TM.ikon.length]}</svg>` : ill(p.ikon)}</article>`; };
  $('#app').innerHTML = `
  <div class="top"><button class="btn-ikon clay" data-back aria-label="Kembali">${svg('back', '#4A3428')}</button><span class="pill clay" style="background:var(--card);color:var(--ink);font-weight:800">${esc(o.nama)} · ${esc(tglPendek(m.tanggal))}${m.durasi ? ' · ' + esc(durasiTeks(m.durasi)) : ''}</span></div>
  <section class="poster tm clay" style="${esc(gayaTema(TM))}">
    <div class="kepala"><img src="./${TM.app}.webp" alt=""><div class="isi"><small class="k">${esc(TM.k)}</small><h2>${esc(h.judul)}</h2><p class="inti">${esc(h.inti)}</p></div></div>
    ${h.bagian.length > 1 ? `<div class="filter" role="group" aria-label="Saring per bagian"><button class="chip on i3 c-sage" data-f="-1"><span>Semua</span></button>${h.bagian.map((b, i) => `<button class="chip clay" data-f="${i}">${i + 1} · ${esc(b)}</button>`).join('')}</div>` : ''}
    <div class="kartu">${h.poin.map(kartu).join('') || '<p class="kosong">Tidak ada poin penting.</p>'}</div>
    ${h.penutup ? `<div class="pita clay">${svg('hati', '#E0704F')}<span>${esc(h.penutup)}</span></div>` : ''}
  </section>
  ${h.tugas.length ? `<section class="kotak clay"><div class="sek-h"><span class="i3 ic c-butter">${svg('tugas', '#fff', '#E0A532')}</span><h3>Tugas</h3></div>${h.tugas.map(t => barisTugas(t, m, false)).join('')}</section>` : ''}
  ${seksiDari(h).map(seksiHtml).join('')}
  <div class="dua"><button class="btn clay" id="bSimpan">${svg('unduh', '#4A3428')}<span>Simpan gambar</span></button><button class="btn utama i3 c-coral" id="bKirim"><img class="wa" src="./wa.svg" alt=""><span>Kirim ke WA</span></button></div>
  <button class="link" id="bHapus" style="color:#A8331A">Hapus meeting ini</button>`;
  document.querySelectorAll('[data-f]').forEach(b => b.onclick = () => {
    const f = +b.dataset.f;
    document.querySelectorAll('[data-f]').forEach(x => { const on = x === b; x.className = 'chip ' + (on ? 'on i3 c-sage' : 'clay'); x.innerHTML = on ? `<span>${esc(x.textContent)}</span>` : esc(x.textContent); });
    document.querySelectorAll('.k1').forEach(k => k.hidden = f >= 0 && +k.dataset.bag !== f);
  });
  document.querySelectorAll('[data-salin]').forEach(b => b.onclick = async () => { try { await navigator.clipboard.writeText(b.dataset.salin); toast('Pesan disalin. Tinggal tempel di WA.'); } catch { toast('Gagal menyalin. Tekan lama teksnya untuk menyalin.'); } });
  $('#bSimpan').onclick = e => tombolProses(e.currentTarget, 'Sedang membuat gambar…', async () => {
    const fs = await gambarPoster(m, o).catch(e => { console.error(e); return null; }); if (!fs) return toast('Gagal membuat gambar. Coba lagi.');
    for (const f of fs) { const a = document.createElement('a'); a.href = URL.createObjectURL(f); a.download = f.name; a.click(); setTimeout(() => URL.revokeObjectURL(a.href), 8000); await new Promise(s => setTimeout(s, 500)); }
    toast(fs.length > 1 ? `${fs.length} gambar disimpan` : 'Gambar disimpan');
  });
  $('#bKirim').onclick = e => tombolProses(e.currentTarget, 'Sedang menyiapkan…', async () => {
    const fs = await gambarPoster(m, o).catch(() => null);
    const teks = `Ringkasan ${namaJenis(m.jenis).toLowerCase()} · ${o.nama} (${tglPendek(m.tanggal)})\n${h.judul}\n\n${h.poin.map((p, i) => `${i + 1}. ${p.judul}: ${p.isi}`).join('\n')}${h.tugas.length ? `\n\nTugas:\n${h.tugas.map(t => `${t.selesai ? '✓' : '☐'} ${t.apa}${t.siapa || t.kapan ? ` (${[t.siapa, t.kapan].filter(Boolean).join(', ')})` : ''}`).join('\n')}` : ''}${h.penutup ? `\n\nLangkah berikutnya: ${h.penutup}` : ''}`;
    if (fs && navigator.canShare?.({ files: fs })) { try { await navigator.share({ files: fs, text: teks }); } catch {} return; }
    window.open('https://wa.me/?text=' + encodeURIComponent(teks), '_blank', 'noopener');
  });
  $('#bHapus').onclick = e => tombolProses(e.currentTarget, 'Sedang menghapus…', async () => {
    if (!confirm('Hapus meeting ini? Tidak bisa dibatalkan.')) return;
    try { await DB.delMany({ meeting: [m.id], transkrip: [m.id] }); } catch { return toast('Gagal menghapus. Coba lagi.'); }
    S0.meeting = S0.meeting.filter(x => x.id !== m.id); perbaruiLencana(); toast('Meeting dihapus'); history.back();
  });
};


/* Gambar poster (PNG) untuk disimpan / dikirim */
const muatGambar = src => new Promise((ok, no) => { const i = new Image(); i.onload = () => ok(i); i.onerror = no; i.src = src; });
async function gambarPoster(m, o) { // ringkasan jadi SATU gambar: isi disusun beberapa kolom berdampingan supaya tidak memanjang
  const kh = m.jenis === 'khotbah', TM = temaDari(m), { PA, TK, HX } = TM; // tiap jenis punya warna, Ippo, dan ikon sendiri
  const h = m.hasil, W = 1080, pad = 48, gap = 22, kw = (W - pad * 2 - gap) / 2, iw = W - pad * 2 - 80, X0 = pad + 40;
  await document.fonts?.load?.('900 40px Nunito').catch(() => {});
  const ukur = document.createElement('canvas').getContext('2d');
  const F = (s, w = 800) => `${w} ${s}px Nunito, system-ui, sans-serif`;
  const bungkus = (t, maks, font) => { ukur.font = font; const out = []; let l = ''; String(t || '').split(/\s+/).forEach(w => { const c = l ? l + ' ' + w : w; if (ukur.measureText(c).width > maks && l) { out.push(l); l = w; } else l = c; }); if (l) out.push(l); return out; };
  const gbr = s => muatGambar('data:image/svg+xml;charset=utf-8,' + encodeURIComponent(s.replace('<svg ', '<svg xmlns="http://www.w3.org/2000/svg" ' + (/^<svg[^>]* width=/.test(s) ? '' : 'width="96" height="96" '))));
  const anjing = await muatGambar(`./${TM.wa}.webp`).catch(() => null);
  let x; // kanvas halaman yang sedang digambar
  const kotak = (X, Y, w, hh, r, c) => { x.fillStyle = c; x.beginPath(); x.roundRect(X, Y, w, hh, r); x.fill(); };
  const tulis = (baris, X, Y, font, warna, jarak) => { x.font = font; x.fillStyle = warna; baris.forEach((l, i) => x.fillText(l, X, Y + i * jarak)); };
  const blok = [], KEP = TM.kep;
  // kepala (judul + inti + anjing)
  const jdl = bungkus(h.judul, 470, F(60, 900)), inti = bungkus(h.inti, 470, F(28, 700)), tK = Math.max(380, 150 + jdl.length * 66 + inti.length * 38 + 30);
  blok.push({ h: tK, g: async y => {
    kotak(pad, y, W - pad * 2, tK, 56, KEP);
    if (anjing) { const s = Math.min(440, (tK - 24) * anjing.width / anjing.height); x.drawImage(anjing, W - pad - s + 20, y + tK - s * anjing.height / anjing.width - 10, s, s * anjing.height / anjing.width); }
    tulis([`${TM.k} · ${o.nama.toUpperCase()}`], pad + 44, y + 74, F(24, 900), TM.kc, 0);
    tulis(jdl, pad + 44, y + 160, F(60, 900), TM.jc, 66);
    tulis(inti, pad + 44, y + 172 + jdl.length * 66, F(28, 700), TM.ic, 38);
  } });
  let daftarSeksi = seksiDari(h);
  if (kh) { const sa = daftarSeksi.find(s => s.bentuk === 'ayat' && s.isi.length); if (sa) {
    const u = sa.isi.find(x => /dibaca/i.test(x.ket)) || sa.isi[0], ut = bungkus(`"${u.teks}"`, W - pad * 2 - 100, F(36, 900)), hh = ut.length * 46 + 110;
    blok.push({ h: hh, g: async y => { kotak(pad, y, W - pad * 2, hh, 40, '#E3ECF6'); x.textAlign = 'center'; tulis(ut, W / 2, y + 66, F(36, 900), '#2F4C70', 46); tulis([u.label + (u.ket ? ' · ' + u.ket : '')], W / 2, y + 66 + ut.length * 46 + 8, F(26, 800), '#4A6E99', 0); x.textAlign = 'left'; } });
    daftarSeksi = daftarSeksi.map(s => s === sa ? { ...s, judul: 'Ayat lainnya', isi: s.isi.filter(x => x !== u) } : s).filter(s => s.isi.length);
  } }
  // kartu poin, satu baris (2 kartu) = satu blok supaya bisa pindah halaman
  const isiK = h.poin.map(p => ({ t: bungkus(p.judul, kw - 110, F(34, 900)), d: bungkus(p.isi, kw - 48, F(28, 700)) }));
  const tinggi = isiK.map(k => 96 + k.t.length * 40 + k.d.length * 36 + 124);
  for (let r = 0; r < h.poin.length; r += 2) {
    const hh = Math.max(tinggi[r], tinggi[r + 1] || 0);
    blok.push({ h: hh, g: async y => {
      for (let i = r; i < Math.min(r + 2, h.poin.length); i++) {
        const p = h.poin[i], c = WARNA[i % 5], X = pad + (i % 2) * (kw + gap), k = isiK[i];
        kotak(X, y, kw, hh, 40, PA[c]);
        tulis([String(p.bagian || '').toUpperCase()], X + 28, y + 50, F(20, 900), TK[c], 0);
        x.fillStyle = HX[c]; x.beginPath(); x.arc(X + 58, y + 98, 30, 0, 7); x.fill();
        x.textAlign = 'center'; tulis([String(i + 1)], X + 58, y + 110, F(32, 900), '#fff', 0); x.textAlign = 'left';
        tulis(k.t, X + 104, y + 120, F(34, 900), '#4A3428', 40);
        tulis(k.d, X + 28, y + 132 + k.t.length * 40, F(28, 700), TK[c], 36);
        try { x.drawImage(await gbr(`<svg viewBox="0 0 70 56" width="140" height="112">${TM.ikon ? TM.ikon[i % TM.ikon.length] : ILL[p.ikon] || ILL.ide}</svg>`), X + kw - 160, y + hh - 124, 140, 112); } catch {}
      }
    } });
  }
  if (h.penutup) { const pt = bungkus(h.penutup, W - pad * 2 - 120, F(30, 900)), hh = pt.length * 40 + 56; blok.push({ h: hh, g: async y => { kotak(pad, y, W - pad * 2, hh, hh / 2, KEP); x.textAlign = 'center'; tulis(pt, W / 2, y + 58, F(30, 900), TM.ic, 40); x.textAlign = 'left'; } }); }
  // seksi berisi daftar; kalau tidak muat, sisanya lanjut di halaman berikutnya
  const seksi = (judul, ikon, c, items, latar = '#FBF4EC') => blok.push({ judul, ikon, c, items, latar });
  if (h.tugas.length) seksi('Tugas', svg('tugas', '#fff', HX.butter), 'butter', h.tugas.map(t => { const l = bungkus(t.apa, iw - 70, F(28, 800)), k = [t.siapa, t.kapan].filter(Boolean).join(' · '); return { h: l.length * 38 + (k ? 34 : 0) + 26, g: async y => {
    if (t.selesai) { kotak(X0, y, 40, 40, 12, HX.sage); try { x.drawImage(await gbr(svg('centang')), X0 + 8, y + 8, 24, 24); } catch {} } else kotak(X0, y, 40, 40, 12, '#EADBCB');
    tulis(l, X0 + 60, y + 30, F(28, 800), t.selesai ? '#9A8476' : '#4A3428', 38);
    if (t.selesai) l.forEach((s, n) => { x.fillRect(X0 + 60, y + 20 + n * 38, x.measureText(s).width, 3); });
    if (k) tulis([k], X0 + 60, y + 30 + l.length * 38, F(24, 700), '#7A6152', 0);
  } }; }));
  const pl = (t, w, f) => bungkus(t, w, f);
  for (const s of daftarSeksi) {
    const [c, ik] = GAYA[s.bentuk] || GAYA.daftar, it = s.isi.map((q, i) => {
      if (s.bentuk === 'linimasa') { const t = pl(q.teks, iw - 150, F(30, 900)), k = pl(q.ket, iw - 150, F(26, 700)), hh = t.length * 38 + k.length * 34 + 24; return { h: hh, g: async y => { x.fillStyle = PA.blue; x.fillRect(X0 + 128, y - 6, 5, hh); tulis(pl(q.label, 120, F(24, 900)), X0, y + 26, F(24, 900), HX.blue, 28); tulis(t, X0 + 152, y + 26, F(30, 900), '#4A3428', 38); tulis(k, X0 + 152, y + 26 + t.length * 38, F(26, 700), '#7A6152', 34); } }; }
      if (s.bentuk === 'centang') { const l = pl(q.teks, iw - 70, F(28, 800)); return { h: l.length * 38 + 18, g: async y => { try { x.drawImage(await gbr(svg('ok', HX.sage)), X0, y, 40, 40); } catch {} tulis(l, X0 + 60, y + 30, F(28, 800), '#4A3428', 38); } }; }
      if (s.bentuk === 'angka' && q.teks.length <= 22) { const vw = iw * 0.36, a = pl(q.label, iw - vw - 16, F(26, 800)), hh = Math.max(1, a.length) * 34 + 14; return { h: hh, g: async y => { x.fillStyle = PA[c]; x.fillRect(X0, y + hh - 4, iw, 2); tulis(a, X0, y + 28, F(26, 800), TK[c], 34); x.textAlign = 'right'; tulis([q.teks], X0 + iw, y + 30, F(28, 900), '#4A3428', 0); x.textAlign = 'left'; } }; } // angka pendek: satu baris (nama kiri, nilai kanan) supaya tabel tidak memanjang
      if (s.bentuk === 'angka' || s.bentuk === 'istilah') { const a = pl(q.label, iw, F(24, 900)), b = pl(q.teks, iw, F(28, s.bentuk === 'angka' ? 800 : 700)), lb = 36; return { h: a.length * 30 + b.length * lb + 26, g: async y => { tulis(a, X0, y + 24, F(24, 900), TK[c], 30); tulis(b, X0, y + 28 + a.length * 30, F(28, s.bentuk === 'angka' ? 800 : 700), '#4A3428', lb); } }; }
      if (s.bentuk === 'langkah') { const l = pl(q.teks, iw - 70, F(28, 800)); return { h: Math.max(48, l.length * 38) + 16, g: async y => { x.fillStyle = HX.coral; x.beginPath(); x.arc(X0 + 20, y + 20, 20, 0, 7); x.fill(); x.textAlign = 'center'; tulis([String(i + 1)], X0 + 20, y + 29, F(24, 900), '#fff', 0); x.textAlign = 'left'; tulis(l, X0 + 60, y + 30, F(28, 800), '#4A3428', 38); } }; }
      if (s.bentuk === 'kutipan' || s.bentuk === 'ayat') { const top = s.bentuk === 'ayat' ? pl(q.label + (q.ket ? ` (${q.ket})` : ''), iw, F(26, 900)) : [], a = pl(s.bentuk === 'ayat' ? q.teks : `"${q.teks}"`, iw, F(28, s.bentuk === 'ayat' ? 700 : 900)), b = s.bentuk === 'kutipan' ? pl(q.ket, iw, F(26, 700)) : []; return { h: top.length * 34 + a.length * 38 + b.length * 34 + 24, g: async y => { tulis(top, X0, y + 28, F(26, 900), TK[c], 34); tulis(a, X0, y + 30 + top.length * 34, F(28, s.bentuk === 'ayat' ? 700 : 900), '#2F4A3E', 38); tulis(b, X0, y + 30 + top.length * 34 + a.length * 38, F(26, 700), TK[c], 34); } }; }
      const l = pl((s.bentuk === 'pesan' ? '' : '• ') + q.teks, iw - 20, F(28, 800)); return { h: l.length * 38 + 14, g: async y => tulis(l, X0, y + 30, F(28, 800), s.bentuk === 'daftar' ? TK.lilac : s.bentuk === 'belum' ? TK.coral : '#4A3428', 38) };
    });
    if (s.bentuk === 'pesan') continue; // draf pesan tidak ikut di gambar (pesan untuk dikirim terpisah)
    seksi(s.judul, svg(ik, '#fff', HX[c]), c, it, s.bentuk === 'daftar' ? PA.lilac : s.bentuk === 'belum' ? PA.coral : s.bentuk === 'kutipan' ? PA.sage : '#FBF4EC');
  }
  // susun jadi beberapa kolom berdampingan dalam SATU gambar (tidak memanjang ke bawah)
  const tinggiSeksi = b => 154 + b.items.reduce((s, it) => s + it.h, 0);
  const T = blok.reduce((s, b) => s + (b.items ? tinggiSeksi(b) : b.h) + gap, 0);
  const n = Math.min(4, Math.max(1, Math.ceil(Math.sqrt(T / (W * 1.25)) - 0.25))); // jumlah kolom supaya bentuknya mendekati 4:5
  const pack = batas => { // isi kolom satu per satu sampai batas tinggi
    const kolom = []; let isi, sisa;
    const kolBaru = () => { isi = []; kolom.push(isi); sisa = batas; };
    kolBaru();
    for (const b of blok) {
      if (!b.items) { if (b.h > sisa && isi.length) kolBaru(); isi.push(b); sisa -= b.h + gap; continue; }
      let i = 0, lanjut = false;
      while (i < b.items.length) {
        if (124 + b.items[i].h + 30 > sisa && isi.length) kolBaru();
        let tot = 154, z = i; while (z < b.items.length && tot + b.items[z].h <= sisa) tot += b.items[z++].h;
        if (z === i) tot += b.items[z++].h;
        const potong = b.items.slice(i, z), jd = b.judul + (lanjut ? ' (lanjutan)' : ''), hh = tot;
        isi.push({ h: hh, g: async y => {
          kotak(pad, y, W - pad * 2, hh, 44, b.latar); kotak(pad + 36, y + 36, 64, 64, 20, HX[b.c]); kotak(pad + 44, y + 40, 48, 20, 10, 'rgba(255,255,255,.35)');
          try { x.drawImage(await gbr(b.ikon), pad + 50, y + 50, 36, 36); } catch {}
          tulis([jd], pad + 120, y + 80, F(34, 900), '#4A3428', 0);
          let yy = y + 124; for (const it of potong) { await it.g(yy); yy += it.h; }
        } });
        sisa -= hh + gap; i = z; lanjut = true;
      }
    }
    return kolom;
  };
  // cari tinggi kolom terkecil yang masih muat dalam n kolom, supaya kolom-kolomnya seimbang
  let batas = Math.max(Math.ceil(T / n), ...blok.map(b => b.items ? 154 + Math.max(...b.items.map(i => i.h)) : b.h)), kolom = pack(batas);
  while (kolom.length > n) { batas += 30; kolom = pack(batas); }
  const tinggiKol = kolom.map(k => k.reduce((s, b) => s + b.h + gap, 0) - gap);
  const cv = document.createElement('canvas'); cv.width = W * kolom.length - pad * (kolom.length - 1); cv.height = pad + Math.max(...tinggiKol) + 90; x = cv.getContext('2d');
  x.fillStyle = TM.bg; x.fillRect(0, 0, cv.width, cv.height);
  for (let c = 0; c < kolom.length; c++) { // tiap kolom digambar bergeser ke kanan
    x.save(); x.translate(c * (W - pad), 0);
    let y = pad; for (const b of kolom[c]) { await b.g(y); y += b.h + gap; }
    x.restore();
  }
  x.textAlign = 'center'; tulis([`Jejak · ${tglPanjang(m.tanggal)}`], cv.width / 2, cv.height - 36, F(24, 800), '#9A8476', 0);
  const blob = await new Promise(ok => cv.toBlob(ok, 'image/png'));
  return [new File([blob], `ringkasan-${o.nama.replace(/[^\w-]+/g, '-').toLowerCase()}-${new Date(m.tanggal).toISOString().slice(0, 10)}.png`, { type: 'image/png' })];
}

/* ---- Atur ---- */
R.atur = () => {
  const iphone = /iPhone|iPad|iPod/.test(navigator.userAgent);
  $('#app').innerHTML = `<div class="top"><h1>Atur</h1></div>
  <section class="kotak clay">
    <div class="sek-h"><span class="i3 ic c-lilac">${svg('atur', '#fff', '#9476AE')}</span><h3>Kunci API Gemini</h3></div>
    <label class="lb" for="kunci">Kunci API</label>
    <input class="in" id="kunci" type="password" autocomplete="off" spellcheck="false" placeholder="AIza…" value="${esc(S0.kunci)}">
    <label style="display:flex;gap:8px;align-items:center;font-size:13px;font-weight:700;margin:-4px 2px 12px"><input type="checkbox" id="lihatKunci"> Tampilkan kunci</label>
    <label class="lb" for="model">Model AI</label>
    <input class="in" id="model" autocomplete="off" spellcheck="false" value="${esc(S0.model)}">
    <div class="err" id="errKunci" hidden></div>
    <button class="btn utama i3 c-coral" id="bKunci" style="width:100%"><span>Simpan</span></button>
    <button class="btn clay" id="bCekModel" style="width:100%;margin-top:10px"><span>Cek model</span></button>
    <div id="hasilCek"></div>
  </section>
  <section class="kotak clay">
    <div class="sek-h"><span class="i3 ic c-sage">${svg('unduh')}</span><h3>Cadangan data</h3></div>
    <p class="panduan">Data hanya ada di HP ini. Sesekali tekan Cadangkan, lalu simpan filenya di tempat aman (folder File, Drive, atau kirim ke WA sendiri).</p>
    <div class="dua" style="margin-top:12px"><button class="btn clay" id="bBackup"><span>Cadangkan</span></button><button class="btn clay" id="bRestore"><span>Pulihkan</span></button></div>
    <input type="file" id="fRestore" accept="application/json,.json" hidden>
  </section>
  <section class="kotak clay">
    <div class="sek-h"><span class="i3 ic c-blue">${svg('home')}</span><h3>Pasang di HP / laptop</h3></div>
    <div class="panduan">${iphone ? '<ol><li>Buka aplikasi ini di <b>Safari</b>.</li><li>Tekan tombol <b>Bagikan</b> (kotak dengan panah ke atas).</li><li>Pilih <b>Tambah ke Layar Utama</b>, lalu <b>Tambah</b>.</li></ol><b>Penting di iPhone:</b> buka Jejak dari ikon di layar utama, bukan dari Safari, supaya datanya tidak dihapus iPhone.' : '<ol><li>Di Chrome, tekan menu titik tiga.</li><li>Pilih <b>Instal aplikasi</b> atau <b>Tambahkan ke layar utama</b>.</li></ol>Di laptop/PC: tekan ikon instal di ujung kanan kolom alamat.'}</div>
  </section>
  <section class="kotak clay">
    <div class="sek-h"><span class="i3 ic c-coral">${svg('sampah')}</span><h3>Hapus semua data</h3></div>
    <p class="panduan">Semua orang, meeting, dan tugas di HP ini akan hilang. Cadangkan dulu kalau masih perlu.</p>
    <button class="btn clay" id="bHapusSemua" style="width:100%;margin-top:12px;color:#A8331A"><span>Hapus semua data</span></button>
  </section>
  <p class="hint" style="text-align:center">Jejak versi ${CONFIG.VERSI}</p>`;
  $('#lihatKunci').onchange = e => $('#kunci').type = e.target.checked ? 'text' : 'password';
  $('#bCekModel').onclick = e => tombolProses(e.currentTarget, 'Sedang mengecek…', cekModel);
  $('#bKunci').onclick = e => tombolProses(e.currentTarget, 'Sedang mengecek kunci…', async () => {
    const k = $('#kunci').value.replace(/^[\s"']+|[\s"']+$/g, ''), md = $('#model').value.trim() || CONFIG.MODEL, err = $('#errKunci'); err.hidden = true;
    if (!/^[A-Za-z0-9._~+\/=-]{20,200}$/.test(k)) { err.textContent = /\s/.test(k) ? 'Kunci ada spasi atau baris baru di tengahnya. Salin ulang dari AI Studio.' : 'Kunci terlalu pendek atau ada huruf aneh. Salin ulang dari AI Studio.'; err.hidden = false; return; }
    if (!/^[\w.-]{3,60}$/.test(md)) { err.textContent = 'Nama model tidak sesuai.'; err.hidden = false; return; }
    const lama = S0.kunci; S0.kunci = k;
    try { await panggil('/v1beta/models?pageSize=1'); }
    catch (x) { S0.kunci = lama; err.textContent = x.message; err.hidden = false; return; }
    try { await DB.putMany({ setelan: [{ k: 'kunci', v: k }, { k: 'model', v: md }] }); } catch { S0.kunci = lama; return toast('Gagal menyimpan. Coba lagi.'); }
    S0.model = md; toast('Kunci benar dan sudah disimpan');
  });
  $('#bBackup').onclick = e => tombolProses(e.currentTarget, 'Sedang menyiapkan…', async () => {
    const [orang, meeting] = await Promise.all([DB.all('orang'), DB.all('meeting')]);
    const f = new File([JSON.stringify({ app: 'jejak', skema: 1, dibuat: new Date().toISOString(), orang, meeting, transkrip: [] })], `cadangan-jejak-${new Date().toISOString().slice(0, 10)}.json`, { type: 'application/json' });
    if (navigator.canShare?.({ files: [f] })) { try { await navigator.share({ files: [f] }); return; } catch (x) { if (x.name === 'AbortError') return; } }
    const a = document.createElement('a'); a.href = URL.createObjectURL(f); a.download = f.name; a.click(); setTimeout(() => URL.revokeObjectURL(a.href), 4000); toast('File cadangan dibuat');
  });
  $('#bRestore').onclick = () => $('#fRestore').click();
  $('#fRestore').onchange = async e => {
    const f = e.target.files[0]; e.target.value = ''; if (!f) return;
    const btn = $('#bRestore');
    await tombolProses(btn, 'Sedang memulihkan…', async () => {
      let d; try { d = JSON.parse(await f.text()); } catch { return toast('File cadangan rusak atau salah.'); }
      const ok = d?.app === 'jejak' && [d.orang, d.meeting].every(Array.isArray)
        && d.orang.every(o => typeof o.id === 'string' && typeof o.nama === 'string')
        && d.meeting.every(m => typeof m.id === 'string' && typeof m.orangId === 'string' && m.hasil && Array.isArray(m.hasil.poin) && Array.isArray(m.hasil.tugas));
      if (!ok) return toast('Ini bukan file cadangan Jejak.');
      if (!confirm(`Pulihkan ${d.orang.length} orang dan ${d.meeting.length} meeting? Data yang sudah ada tetap disimpan.`)) return;
      const bersih = { orang: d.orang.map(o => ({ id: o.id, nama: potong(o.nama, 40), warna: WARNA.includes(o.warna) ? o.warna : 'coral', dibuat: +o.dibuat || Date.now() })),
        meeting: d.meeting.map(m => ({ id: m.id, orangId: m.orangId, tanggal: +m.tanggal || Date.now(), durasi: +m.durasi || 0, topik: potong(m.topik, 60), jenis: potong(m.jenis, 30) || 'meeting', hasil: (({ transkrip, ...r }) => r)(rapikanLama(m.hasil)), versi: 1 })) };
      try { await DB.putMany(bersih); } catch { return toast('Gagal memulihkan. Coba lagi.'); }
      await muatData(); perbaruiLencana(); toast(`Berhasil: ${bersih.meeting.length} meeting dipulihkan`);
    });
  };
  $('#bHapusSemua').onclick = e => tombolProses(e.currentTarget, 'Sedang menghapus…', async () => {
    if (!confirm('Hapus SEMUA data di HP ini?')) return;
    if (prompt('Ketik HAPUS untuk memastikan') !== 'HAPUS') return toast('Batal dihapus');
    try { await DB.clearAll(); } catch { return toast('Gagal menghapus. Coba lagi.'); }
    S0.orang = []; S0.meeting = []; perbaruiLencana(); toast('Semua data dihapus');
  });
};
/* Cek model: daftar model yang bisa dipakai kunci ini, dicoba dengan pesan super pendek */
async function cekModel() {
  const box = $('#hasilCek'), lbl = t => box.innerHTML = `<p class="hint">${esc(t)}</p>`;
  if (!S0.kunci) return lbl('Simpan kunci API dulu.');
  let list;
  try { list = (await (await panggil('/v1beta/models?pageSize=200')).json()).models || []; } catch (x) { return lbl(x.message); }
  const versi = n => parseFloat((n.match(/(\d+(\.\d+)?)/) || [0, 0])[1]);
  const cocok = list.map(m => m.name.replace('models/', '')).filter(n => /^gemini/.test(n) && !/tts|image|embed|live|audio|thinking|computer|robotics|exp/.test(n))
    .sort((a, b) => versi(b) - versi(a) || (/lite/.test(b) - /lite/.test(a)) || a.length - b.length).slice(0, 8);
  if (!cocok.length) return lbl('Tidak ada model yang cocok untuk kunci ini.');
  const hasil = [];
  for (let i = 0; i < cocok.length; i++) {
    lbl(`Mengecek ${i + 1} dari ${cocok.length}: ${cocok[i]}…`);
    let st = 'ok';
    try { await panggil(`/v1beta/models/${encodeURIComponent(cocok[i])}:generateContent`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ contents: [{ role: 'user', parts: [{ text: 'Balas satu kata: OK' }] }], generationConfig: { maxOutputTokens: 8 } }) }); }
    catch (x) { st = x.status === 429 ? 'kuota' : 'tidak'; }
    hasil.push([cocok[i], st]);
  }
  const lb = { ok: ['ijo', 'Bisa dipakai'], kuota: ['oren', 'Kuota penuh'], tidak: ['abu', 'Tidak bisa'] };
  box.innerHTML = `<div style="margin-top:12px">${hasil.map(([n, s]) => `<div class="tg"><span class="tx">${esc(n)}${n === S0.model ? '<small>Sedang dipakai</small>' : ''}</span><span class="pill ${lb[s][0]}">${lb[s][1]}</span>${s === 'ok' && n !== S0.model ? `<button class="chip clay" data-pakai="${esc(n)}">Pakai</button>` : ''}</div>`).join('')}</div><p class="hint">Saran: untuk rekaman panjang pilih model "flash-lite" yang bisa dipakai, jatah gratisnya paling besar. Tes ini hampir tidak memakai kuota.</p>`;
  box.querySelectorAll('[data-pakai]').forEach(b => b.onclick = () => tombolProses(b, 'Menyimpan…', async () => {
    try { await DB.put('setelan', { k: 'model', v: b.dataset.pakai }); } catch { return toast('Gagal menyimpan. Coba lagi.'); }
    S0.model = b.dataset.pakai; $('#model').value = S0.model; toast('Model diganti ke ' + S0.model); cekTampil();
  }));
  const cekTampil = () => box.querySelectorAll('.tg').forEach(r => { const n = r.querySelector('.tx').firstChild.textContent; r.querySelector('small')?.remove(); if (n === S0.model) r.querySelector('.tx').insertAdjacentHTML('beforeend', '<small>Sedang dipakai</small>'); });
}
function rapikanLama(h) { const r = rapikan(h || {}); r.tugas = r.tugas.map((t, i) => ({ ...t, id: typeof h?.tugas?.[i]?.id === 'string' ? h.tugas[i].id : t.id, selesai: !!h?.tugas?.[i]?.selesai })); return r; }

/* ========== MULAI ========== */
(async () => {
  document.querySelectorAll('[data-ic]').forEach(s => { if (!s.classList.contains('ni')) s.innerHTML = svg(s.dataset.ic); });
  try { await muatData(); } catch (e) { console.error(e); $('#app').innerHTML = '<div class="kotak clay kosong">Penyimpanan HP tidak bisa dibuka. Pastikan tidak memakai mode penyamaran (incognito).</div>'; return; }
  perbaruiLencana();
  DB.get('setelan', 'transkripDihapus').then(x => x || DB.kosongkan('transkrip').then(() => DB.put('setelan', { k: 'transkripDihapus', v: 1 }))).catch(() => {}); // transkrip tidak disimpan lagi
  navigator.storage?.persist?.().catch(() => {});
  if (new URLSearchParams(location.search).has('dibagikan')) history.replaceState(null, '', location.pathname + '#/baru?cara=unggah&dibagikan=1');
  addEventListener('hashchange', jalan); jalan();
  if ('serviceWorker' in navigator) navigator.serviceWorker.register('./sw.js').catch(() => {});
})();
