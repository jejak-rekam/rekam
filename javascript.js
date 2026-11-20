'use strict';
/* ========== CONFIG ========== */
const CONFIG = {
  VERSI: '1.0.7',
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
const SKEMA = O({
  judul: STR, inti: STR, penutup: STR,
  bagian: A(STR),
  poin: A(O({ bagian: STR, judul: STR, isi: STR, ikon: { type: 'STRING', format: 'enum', enum: Object.keys(ILL) } })),
  sepakat: A(STR), tanya: A(STR),
  tugas: A(O({ apa: STR, siapa: STR, kapan: STR })),
  kutipan: A(O({ asli: STR, arti: STR, siapa: STR })),
  alur: A(O({ waktu: STR, judul: STR, ket: STR })),
  transkrip: A(O({ waktu: STR, siapa: STR, teks: STR }))
});
function buatPrompt(j) {
  return `Kamu pencatat meeting yang teliti. Dengarkan seluruh rekaman ini sampai habis.
Bahasa rekaman bisa campuran Indonesia dan Jawa (atau bahasa daerah lain). Tulis semua jawaban dalam bahasa Indonesia sehari-hari yang sederhana, bukan bahasa kaku.
Info: meeting dengan "${j.nama}". Topik: "${j.topik || 'tidak disebut'}". Durasi rekaman kira-kira ${durasiTeks(j.durasi) || 'tidak diketahui'}.

Aturan:
- Jangan mengarang. Tulis hanya yang benar-benar dibicarakan. Bagian yang tidak jelas terdengar tulis "(tidak jelas)".
- judul: topik utama meeting, maksimal 6 kata.
- inti: 1 kalimat (maksimal 20 kata) tentang inti meeting.
- bagian: kelompokkan obrolan menurut topik. Meeting pendek 1-2 bagian, meeting panjang 3-6 bagian. Nama bagian 1-2 kata.
- poin: jumlahnya menyesuaikan panjang meeting. Kurang dari 15 menit: 3-4 poin. 15-45 menit: 4-6 poin. Lebih dari 45 menit: 6-10 poin. Pilih yang paling penting. Judul maksimal 5 kata, isi maksimal 18 kata. Kolom "bagian" harus sama persis dengan salah satu nama di daftar bagian. Pilih ikon yang paling cocok.
- sepakat: hal yang sudah disepakati bersama.
- tugas: siapa mengerjakan apa dan kapan. Kalau waktunya tidak disebut, isi kapan dengan "".
- tanya: hal yang belum jelas dan perlu ditanyakan lagi.
- kutipan: maksimal 3 kalimat penting. "asli" persis seperti diucapkan (boleh bahasa Jawa), "arti" terjemahannya ke bahasa Indonesia.
- alur: urutan jalannya meeting per bagian, dengan waktu mulai dari awal rekaman (format m:ss atau j:mm:ss).
- penutup: langkah berikutnya yang paling penting, 1 kalimat pendek.
- transkrip: tulis lengkap per giliran bicara, dengan waktu dan nama pembicara (pakai nama kalau disebut, kalau tidak "Pembicara 1", "Pembicara 2"). Untuk kalimat bahasa Jawa, tulis aslinya lalu artinya dalam kurung.
- Kalau tidak ada isinya, kirim daftar kosong.${j.tanpaTranskrip ? '\n- PENTING: transkrip kirim sebagai daftar kosong [] supaya jawaban tidak terlalu panjang.' : ''}`;
}
/* Jawaban AI dikirim sedikit demi sedikit (streaming) supaya sambungan tidak "diam" lalu diputus jaringan */
async function mintaRingkasan(m, body, onTeks) {
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
        onTeks(teks.length, blok);
      }
    }
  } catch (e) {
    if (e instanceof GagalAI) throw e;
    const x = new GagalAI(alasan ? 'Sambungan ke Google terputus. Tekan Coba lagi (tidak perlu unggah ulang).' : pesanError(0)); x.status = alasan ? 'waktu' : 0; throw x;
  } finally { clearTimeout(jam); }
  return teks;
}
async function rangkum(file, j, tanpaTranskrip = j.durasi > 45 * 60) { // rekaman > 45 menit: tanpa transkrip supaya tidak kepanjangan
  let pikir = { thinkingBudget: 512, includeThoughts: true };
  const body = t => JSON.stringify({
    contents: [{ role: 'user', parts: [{ file_data: { mime_type: file.mimeType, file_uri: file.uri } }, { text: buatPrompt({ ...j, tanpaTranskrip: t }) }] }],
    generationConfig: { responseMimeType: 'application/json', responseSchema: SKEMA, maxOutputTokens: 65536, temperature: 0.3, ...(pikir ? { thinkingConfig: pikir } : {}) }
  });
  const tunggu = d => new Promise(s => setTimeout(s, d));
  const target = t => t ? 5000 : 5000 + (j.durasi || 600) * 12; // perkiraan panjang jawaban, hanya untuk bar
  const kemajuan = t => (n, blok) => {
    if (blok === 'mikir' && !n) return setTahap('Mencari poin penting…', 65);
    if (n) setTahap('Menulis kartu…', Math.min(95, 70 + 25 * n / target(t)), 'Jawaban sedang diterima. Jangan tutup aplikasi.');
  };
  // kalau server Google sibuk, coba otomatis: jeda bertambah, lalu tanpa transkrip, lalu model cadangan
  const rencana = [[S0.model, tanpaTranskrip, 0], [S0.model, true, 8000], [S0.model, true, 20000], [CONFIG.MODEL_CADANGAN, true, 5000]];
  let teks, galat, pakaiTanpa = tanpaTranskrip;
  for (const [m, t, jeda] of rencana) {
    if (jeda) { setTahap('Server sibuk, mencoba lagi otomatis…', 60, 'Tidak perlu menekan apa-apa, tunggu sebentar.'); await tunggu(jeda); }
    try { teks = await mintaRingkasan(m, body(t), kemajuan(t)); pakaiTanpa = t; break; }
    catch (e) {
      galat = e;
      if (e.status === 400 && pikir && /think/i.test(e.detail || '')) { pikir = null; try { teks = await mintaRingkasan(m, body(t), kemajuan(t)); pakaiTanpa = t; break; } catch (e3) { galat = e3; } } // model tidak mendukung pengaturan berpikir
      if (e.status === 404 && m !== CONFIG.MODEL_CADANGAN) { try { teks = await mintaRingkasan(CONFIG.MODEL_CADANGAN, body(t), kemajuan(t)); pakaiTanpa = t; break; } catch (e2) { galat = e2; } }
      if (!(galat.status >= 500)) throw galat; // kuota penuh/putus/salah kunci: jangan diulang otomatis (supaya kuota tidak terbuang)
    }
  }
  if (teks === undefined) throw galat;
  if (!teks) throw new GagalAI('AI tidak memberi jawaban. Coba lagi.');
  let o; try { o = JSON.parse(teks.replace(/^```(json)?|```$/g, '').trim()); } catch { o = null; }
  if (!o) { // jawaban terpotong (biasanya karena transkrip): ulangi sekali tanpa transkrip
    if (!pakaiTanpa) return rangkum(file, j, true);
    throw new GagalAI('Jawaban AI terpotong. Coba lagi.');
  }
  return rapikan(o);
}
function rapikan(o) { // bersihkan & batasi isi dari AI sebelum disimpan
  const arr = (a, n) => Array.isArray(a) ? a.slice(0, n) : [];
  const bagian = arr(o.bagian, 8).map(b => potong(b, 30)).filter(Boolean);
  return {
    judul: potong(o.judul, 80) || 'Ringkasan meeting', inti: potong(o.inti, 240), penutup: potong(o.penutup, 160),
    bagian: bagian.length ? bagian : ['Umum'],
    poin: arr(o.poin, 12).map(p => ({ bagian: potong(p.bagian, 30), judul: potong(p.judul, 60), isi: potong(p.isi, 220), ikon: ILL[p.ikon] ? p.ikon : 'ide' })).filter(p => p.judul),
    sepakat: arr(o.sepakat, 15).map(s => potong(s, 200)).filter(Boolean),
    tanya: arr(o.tanya, 10).map(s => potong(s, 200)).filter(Boolean),
    tugas: arr(o.tugas, 20).map(t => ({ id: uid(), apa: potong(t.apa, 200), siapa: potong(t.siapa, 40), kapan: potong(t.kapan, 40), selesai: false })).filter(t => t.apa),
    kutipan: arr(o.kutipan, 3).map(k => ({ asli: potong(k.asli, 240), arti: potong(k.arti, 240), siapa: potong(k.siapa, 40) })).filter(k => k.asli),
    alur: arr(o.alur, 12).map(a => ({ waktu: potong(a.waktu, 10), judul: potong(a.judul, 60), ket: potong(a.ket, 160) })),
    transkrip: arr(o.transkrip, 4000).map(t => ({ waktu: potong(t.waktu, 10), siapa: potong(t.siapa, 40), teks: potong(t.teks, 2000) }))
  };
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
  const nKep = ms.reduce((n, m) => n + m.hasil.sepakat.length, 0);
  const ingat = [...ms.flatMap(m => m.hasil.tugas.filter(t => !t.selesai).map(t => t.apa)), ...(ms[0]?.hasil.tanya || [])].slice(0, 4);
  $('#app').innerHTML = atas('') + `
  <section class="kotak clay" style="background:var(--peach)"><div style="display:flex;align-items:center;gap:14px;margin-bottom:14px"><span class="i3 av c-${w}" style="width:60px;height:60px;border-radius:20px;font-size:21px"><span>${esc(inisial(o.nama))}</span></span><div><h2 style="font-size:23px;font-weight:900">${esc(o.nama)}</h2><small style="font-size:13px;font-weight:700;color:#6E4A38">Sejak ${esc(tglPendek(o.dibuat))}</small></div></div>
  <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px">${[['meeting', ms.length], ['tugas', tugasTerbuka(ms)], ['keputusan', nKep]].map(([l, n]) => `<div class="clay" style="background:var(--card);border-radius:18px;padding:10px 12px"><b style="font-size:22px;font-weight:900;display:block">${n}</b><small style="font-size:12px;font-weight:700;color:var(--sub)">${l}</small></div>`).join('')}</div></section>
  ${ingat.length ? `<section class="kotak clay p-butter" style="display:flex;gap:12px"><span class="i3 ic c-butter">${svg('bell')}</span><div><h3 style="font-size:14px;font-weight:900">Ingat sebelum meeting lagi</h3><ul style="margin:6px 0 0;padding-left:18px;font-size:13px;font-weight:700;color:#6B5320;line-height:1.5">${ingat.map(x => `<li>${esc(x)}</li>`).join('')}</ul></div></section>` : ''}
  <div class="judul"><span>Riwayat meeting</span></div>
  ${ms.map((m, i) => { const d = new Date(m.tanggal), c = WARNA[i % 5]; return `<a href="#/m/${encodeURIComponent(m.id)}" class="baris clay"><span class="i3 tgl c-${c}"><b>${String(d.getDate()).padStart(2, '0')}</b><small>${BLN[d.getMonth()]}</small></span><span class="tx"><b>${esc(m.hasil.judul)}</b><small>${esc([durasiTeks(m.durasi), m.hasil.poin.length + ' poin'].filter(Boolean).join(' · '))}</small></span>${i === 0 && Date.now() - m.tanggal < 864e5 ? '<span class="pill ijo">Baru</span>' : ''}</a>`; }).join('') || '<div class="kotak clay kosong">Belum ada meeting.</div>'}
  <button class="link" id="hapusOrang" style="color:#A8331A">Hapus ${esc(o.nama)} dan semua meeting-nya</button>`;
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
  return `<div class="tg ${t.selesai ? 'done' : ''}"><button class="centang ${t.selesai ? 'i3 c-sage' : ''}" data-tugas="${esc(m.id)}|${esc(t.id)}" aria-pressed="${t.selesai}" aria-label="${t.selesai ? 'Tandai belum selesai' : 'Tandai selesai'}: ${esc(t.apa)}">${t.selesai ? svg('centang') : ''}</button><span class="tx">${esc(t.apa)}${ket ? `<small>${esc(ket)}</small>` : ''}</span>${!t.selesai && t.kapan ? `<span class="pill oren">${esc(t.kapan)}</span>` : ''}</div>`;
}
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
    <label class="lb" for="nama">Meeting dengan siapa?</label>
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
    : `<input type="file" id="fileIn" accept="audio/*,.m4a,.mp3,.wav,.ogg,.opus,.aac,.flac,.webm" hidden>
    <button type="button" class="file clay" id="pilihFile"><span class="i3 ic c-sage" style="width:52px;height:52px;border-radius:17px">${svg('unggah')}</span><span class="tx"><b id="fNama">Pilih file rekaman</b><small id="fInfo">Dari perekam suara HP, WhatsApp, atau folder File</small></span></button>`}
  <div class="err" id="errFile" hidden></div>
  <button type="button" class="btn utama i3 c-coral" id="btnRangkum" style="width:100%"><span>Rangkum sekarang</span></button>
  <p class="hint" style="text-align:center">Pakai WiFi supaya cepat. Rekaman dikirim ke Google Gemini untuk dirangkum, lalu dihapus dari sana.</p>`;
  let berkas = null;
  const nama = $('#nama'), errN = $('#errNama'), errF = $('#errFile');
  document.querySelectorAll('[data-nama]').forEach(b => b.onclick = () => { nama.value = b.dataset.nama; errN.hidden = true; });
  nama.oninput = () => errN.hidden = true;
  const pasang = async (blob, namaFile) => {
    errF.hidden = true;
    const mime = tipeAudio({ name: namaFile, type: blob.type });
    if (!mime) { errF.textContent = 'File ini bukan rekaman suara. Pilih file seperti .m4a, .mp3, .ogg, atau .wav.'; errF.hidden = false; return; }
    if (blob.size > CONFIG.MAKS_MB * 1048576) { errF.textContent = 'Rekaman terlalu besar (lebih dari 1,9 GB).'; errF.hidden = false; return; }
    if (blob.size < 2000) { errF.textContent = 'Rekaman terlalu pendek atau kosong.'; errF.hidden = false; return; }
    const durasi = await lamaAudio(blob);
    berkas = { blob, mime, namaFile, durasi };
    if (!rekam) { $('#fNama').textContent = namaFile; $('#fInfo').textContent = [durasiTeks(durasi), (blob.size / 1048576).toFixed(1) + ' MB'].filter(Boolean).join(' · '); }
  };
  if (!rekam) { $('#pilihFile').onclick = () => $('#fileIn').click(); $('#fileIn').onchange = e => { const f = e.target.files[0]; if (f) pasang(f, f.name); }; }
  else pasangPerekam(pasang);
  if (!rekam && q.get('dibagikan')) ambilKiriman(pasang);
  $('#btnRangkum').onclick = () => {
    const n = nama.value.trim().replace(/\s+/g, ' ');
    if (!n) { errN.textContent = 'Tulis dulu nama orangnya.'; errN.hidden = false; nama.focus(); return; }
    if (rekam && REC.aktif) { errF.textContent = 'Hentikan rekaman dulu.'; errF.hidden = false; return; }
    if (!berkas) { errF.textContent = rekam ? 'Rekam dulu obrolannya.' : 'Pilih dulu file rekamannya.'; errF.hidden = false; return; }
    JOB = { nama: n, topik: $('#topik').value.trim().slice(0, 60), ...berkas, file: null, tahap: 'unggah' };
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
  <p class="hint" style="text-align:center">Meeting dengan ${esc(JOB.nama)}${JOB.durasi ? ' · ' + esc(durasiTeks(JOB.durasi)) : ''}</p>`;
  prosesJalan();
};
let lamaT;
function setTahap(teks, persen, sub) {
  const l = $('#pLbl'); if (!l) return;
  l.textContent = teks; $('#pBar').style.width = Math.round(persen) + '%';
  $('#pSub').textContent = sub || 'Jangan tutup aplikasi dulu, ya.';
  clearTimeout(lamaT); lamaT = setTimeout(() => { if ($('#pSub')) $('#pSub').textContent = 'Masih diproses, mohon tunggu sebentar. Rekaman panjang bisa sampai 10 menit.'; }, 12000);
}
const jagaTutup = e => { e.preventDefault(); e.returnValue = ''; };
async function prosesJalan() {
  const j = JOB; addEventListener('beforeunload', jagaTutup);
  try {
    if (!j.file) {
      setTahap('Mengirim rekaman…', 3);
      j.file = await unggahKeGemini(j.blob, j.mime, f => setTahap(`Mengirim rekaman… ${Math.round(f * 100)}%`, 3 + f * 42));
    }
    setTahap('Mendengarkan obrolan…', 50, j.durasi > 30 * 60 ? 'Rekaman panjang: Google perlu beberapa menit untuk mendengarkan. Jangan tutup aplikasi.' : '');
    const hasil = await rangkum(j.file, j);
    setTahap('Menyimpan…', 96);
    let o = S0.orang.find(x => x.nama.toLowerCase() === j.nama.toLowerCase());
    const orangBaru = !o; if (!o) o = { id: uid(), nama: j.nama, warna: WARNA[S0.orang.length % 5], dibuat: Date.now() };
    const { transkrip, ...ringkas } = hasil;
    const m = { id: uid(), orangId: o.id, tanggal: Date.now(), durasi: j.durasi, topik: j.topik, hasil: ringkas, versi: 1 };
    await DB.putMany({ orang: [o], meeting: [m], transkrip: [{ id: m.id, isi: transkrip }] }); // satu transaksi
    if (orangBaru) S0.orang.push(o);
    S0.meeting.unshift(m); perbaruiLencana();
    hapusFileGemini(j.file.name); JOB = null;
    setTahap('Kartu siap!', 100, '');
    removeEventListener('beforeunload', jagaTutup);
    setTimeout(() => location.replace('#/m/' + encodeURIComponent(m.id)), 500);
  } catch (e) {
    console.error(e); clearTimeout(lamaT); removeEventListener('beforeunload', jagaTutup);
    const pesan = e instanceof GagalAI ? e.message : (e?.name === 'QuotaExceededError' ? 'Memori HP penuh. Hapus beberapa data dulu.' : 'Gagal menyimpan hasil. Coba lagi.');
    $('#pLbl').textContent = 'Belum berhasil'; $('#pSub').textContent = pesan;
    $('#pAksi').innerHTML = `<div class="dua" style="margin-top:14px"><button class="btn clay" id="pBatal">Batal</button><button class="btn utama i3 c-coral" id="pUlang"><span>Coba lagi</span></button></div>`;
    $('#pUlang').onclick = () => { $('#pAksi').innerHTML = ''; prosesJalan(); };
    $('#pBatal').onclick = () => { hapusFileGemini(j.file?.name); JOB = null; buka('#/'); };
  }
}

/* ---- Hasil (kartu ringkasan) ---- */
R.hasil = id => {
  const m = S0.meeting.find(x => x.id === decodeURIComponent(id)); if (!m) return buka('#/');
  const h = m.hasil, o = orangById(m.orangId) || { nama: '?' };
  const iBag = b => Math.max(0, h.bagian.indexOf(b));
  const kartu = (p, i) => { const c = WARNA[i % 5]; return `<article class="k1 clay p-${c}" data-bag="${iBag(p.bagian)}"><span class="tag t-${c}">${esc(p.bagian || h.bagian[0])}</span><div class="hd"><span class="i3 n c-${c}"><span>${i + 1}</span></span><h3>${esc(p.judul)}</h3></div><p class="t-${c}">${esc(p.isi)}</p>${ill(p.ikon)}</article>`; };
  $('#app').innerHTML = `
  <div class="top"><button class="btn-ikon clay" data-back aria-label="Kembali">${svg('back', '#4A3428')}</button><span class="pill clay" style="background:var(--card);color:var(--ink);font-weight:800">${esc(o.nama)} · ${esc(tglPendek(m.tanggal))}${m.durasi ? ' · ' + esc(durasiTeks(m.durasi)) : ''}</span></div>
  <section class="poster clay">
    <div class="kepala"><img src="./ippo.webp" alt=""><div class="isi"><small class="k">RINGKASAN MEETING</small><h2>${esc(h.judul)}</h2><p class="inti">${esc(h.inti)}</p></div></div>
    ${h.bagian.length > 1 ? `<div class="filter" role="group" aria-label="Saring per bagian"><button class="chip on i3 c-sage" data-f="-1"><span>Semua</span></button>${h.bagian.map((b, i) => `<button class="chip clay" data-f="${i}">${i + 1} · ${esc(b)}</button>`).join('')}</div>` : ''}
    <div class="kartu">${h.poin.map(kartu).join('') || '<p class="kosong">Tidak ada poin penting.</p>'}</div>
    ${h.penutup ? `<div class="pita clay">${svg('hati', '#E0704F')}<span>${esc(h.penutup)}</span></div>` : ''}
  </section>
  ${h.alur.length ? `<section class="kotak clay"><div class="sek-h"><span class="i3 ic c-blue">${svg('jam', '#fff', '#6F8FBC')}</span><h3>Jalannya meeting</h3></div>${h.alur.map(a => `<div class="alur"><span class="w">${esc(a.waktu)}</span><div class="t"><b>${esc(a.judul)}</b><small>${esc(a.ket)}</small></div></div>`).join('')}</section>` : ''}
  ${h.sepakat.length ? `<section class="kotak clay"><div class="sek-h"><span class="i3 ic c-sage">${svg('star')}</span><h3>Sudah disepakati</h3></div>${h.sepakat.map(s => `<div class="cek">${svg('ok', '#5E8C7A')}<span>${esc(s)}</span></div>`).join('')}</section>` : ''}
  ${h.tugas.length ? `<section class="kotak clay"><div class="sek-h"><span class="i3 ic c-butter">${svg('tugas', '#fff', '#E0A532')}</span><h3>Tugas</h3></div>${h.tugas.map(t => barisTugas(t, m, false)).join('')}</section>` : ''}
  ${h.tanya.length || h.kutipan.length ? `<div class="dua" style="margin-bottom:14px;align-items:start">
    ${h.tanya.length ? `<section class="mini clay p-lilac"><span class="i3 ic c-lilac" style="width:36px;height:36px">${svg('tanya', '#fff', '#9476AE')}</span><h3>Perlu ditanya</h3>${h.tanya.map(t => `<p class="t-lilac">${esc(t)}</p>`).join('')}</section>` : ''}
    ${h.kutipan.map(k => `<section class="mini clay p-sage"><span class="i3 ic c-sage" style="width:36px;height:36px">${svg('kutip')}</span><h3>"${esc(k.asli)}"</h3><p class="t-sage">${esc(k.arti)}${k.siapa ? ' — ' + esc(k.siapa) : ''}</p></section>`).join('')}
  </div>` : ''}
  <section class="kotak clay peta"><div class="sek-h"><span class="i3 ic c-coral">${svg('star')}</span><h3>Peta alur</h3></div>${petaSvg(h)}</section>
  <div class="dua"><button class="btn clay" id="bSimpan">${svg('unduh', '#4A3428')}<span>Simpan gambar</span></button><button class="btn utama i3 c-coral" id="bKirim">${svg('kirim')}<span>Kirim ke WA</span></button></div>
  <button class="link" id="bTrans">Lihat transkrip lengkap</button><div id="trans"></div>
  <button class="link" id="bHapus" style="color:#A8331A">Hapus meeting ini</button>`;
  document.querySelectorAll('[data-f]').forEach(b => b.onclick = () => {
    const f = +b.dataset.f;
    document.querySelectorAll('[data-f]').forEach(x => { const on = x === b; x.className = 'chip ' + (on ? 'on i3 c-sage' : 'clay'); x.innerHTML = on ? `<span>${esc(x.textContent)}</span>` : esc(x.textContent); });
    document.querySelectorAll('.k1').forEach(k => k.hidden = f >= 0 && +k.dataset.bag !== f);
  });
  $('#bTrans').onclick = e => tombolProses(e.currentTarget, 'Sedang membuka…', async () => {
    const box = $('#trans'); if (box.innerHTML) { box.innerHTML = ''; return; }
    const t = await DB.get('transkrip', m.id).catch(() => null);
    box.innerHTML = `<section class="kotak clay trans">${(t?.isi || []).map(x => `<p><b>${esc(x.waktu)} ${esc(x.siapa)}:</b> ${esc(x.teks)}</p>`).join('') || '<p>Transkrip tidak dibuat. Untuk rekaman lebih dari 45 menit, Jejak hanya membuat ringkasan supaya tidak gagal. Rekaman aslinya tetap ada di HP-mu.</p>'}</section>`;
  });
  $('#bSimpan').onclick = e => tombolProses(e.currentTarget, 'Sedang membuat gambar…', async () => {
    const f = await gambarPoster(m, o).catch(() => null); if (!f) return toast('Gagal membuat gambar. Coba lagi.');
    const a = document.createElement('a'); a.href = URL.createObjectURL(f); a.download = f.name; a.click(); setTimeout(() => URL.revokeObjectURL(a.href), 4000);
    toast('Gambar disimpan');
  });
  $('#bKirim').onclick = e => tombolProses(e.currentTarget, 'Sedang menyiapkan…', async () => {
    const f = await gambarPoster(m, o).catch(() => null);
    const teks = `Ringkasan meeting dengan ${o.nama} (${tglPendek(m.tanggal)})\n${h.judul}\n\n${h.poin.map((p, i) => `${i + 1}. ${p.judul}: ${p.isi}`).join('\n')}${h.penutup ? `\n\nLangkah berikutnya: ${h.penutup}` : ''}`;
    if (f && navigator.canShare?.({ files: [f] })) { try { await navigator.share({ files: [f], text: teks }); } catch {} return; }
    window.open('https://wa.me/?text=' + encodeURIComponent(teks), '_blank', 'noopener');
  });
  $('#bHapus').onclick = e => tombolProses(e.currentTarget, 'Sedang menghapus…', async () => {
    if (!confirm('Hapus meeting ini? Tidak bisa dibatalkan.')) return;
    try { await DB.delMany({ meeting: [m.id], transkrip: [m.id] }); } catch { return toast('Gagal menghapus. Coba lagi.'); }
    S0.meeting = S0.meeting.filter(x => x.id !== m.id); perbaruiLencana(); toast('Meeting dihapus'); history.back();
  });
};

/* Peta alur: judul di tengah, bagian di sekelilingnya */
function petaSvg(h) {
  const W = 340, H = 300, cx = W / 2, cy = H / 2, bag = h.bagian.slice(0, 6), n = bag.length;
  const baris = (s, max = 14) => { const w = String(s).split(' '), out = ['']; w.forEach(x => { if ((out[out.length - 1] + ' ' + x).trim().length > max && out[out.length - 1]) out.push(x); else out[out.length - 1] = (out[out.length - 1] + ' ' + x).trim(); }); return out.slice(0, 2); };
  const teks = (x, y, s, c, sz = 13, max) => { const l = baris(s, max); return l.map((t, i) => `<text x="${x}" y="${y + (i - (l.length - 1) / 2) * (sz + 3) + sz / 3}" text-anchor="middle" font-family="Nunito,sans-serif" font-size="${sz}" font-weight="800" fill="${c}">${esc(t)}</text>`).join(''); };
  let g = '', node = '';
  bag.forEach((b, i) => {
    const a = -Math.PI / 2 + i * 2 * Math.PI / n, x = cx + Math.cos(a) * 118, y = cy + Math.sin(a) * 104, c = WARNA[i % 5];
    const jml = h.poin.filter(p => p.bagian === b).length;
    g += `<path d="M${cx} ${cy} Q${(cx + x) / 2 + 10} ${(cy + y) / 2 - 10} ${x} ${y}" stroke="#E3CDBA" stroke-width="3" fill="none" stroke-dasharray="1 7" stroke-linecap="round"/>`;
    node += `<rect x="${x - 58}" y="${y - 24}" width="116" height="48" rx="16" fill="${PASTEL[c]}"/>${teks(x, y - (jml ? 5 : 0), b, '#4A3428', 13)}${jml ? `<text x="${x}" y="${y + 17}" text-anchor="middle" font-family="Nunito,sans-serif" font-size="11" font-weight="800" fill="${TEKS[c]}">${jml} poin</text>` : ''}`;
  });
  return `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Peta alur: ${esc(h.judul)} dengan bagian ${esc(bag.join(', '))}">${g}${node}<rect x="${cx - 74}" y="${cy - 28}" width="148" height="56" rx="20" fill="#E0704F"/>${teks(cx, cy, h.judul, '#fff', 14, 18)}</svg>`;
}

/* Gambar poster (PNG) untuk disimpan / dikirim */
const muatGambar = src => new Promise((ok, no) => { const i = new Image(); i.onload = () => ok(i); i.onerror = no; i.src = src; });
async function gambarPoster(m, o) {
  const h = m.hasil, W = 1080, pad = 48, gap = 24, kw = (W - pad * 2 - gap) / 2;
  await document.fonts?.load?.('900 40px Nunito').catch(() => {});
  const cv = document.createElement('canvas'), x = cv.getContext('2d');
  const F = (s, w = 800) => `${w} ${s}px Nunito, system-ui, sans-serif`;
  const bungkus = (t, maks, font) => { x.font = font; const out = []; let l = ''; String(t).split(/\s+/).forEach(w => { const c = l ? l + ' ' + w : w; if (x.measureText(c).width > maks && l) { out.push(l); l = w; } else l = c; }); if (l) out.push(l); return out; };
  // hitung tinggi
  const jdl = bungkus(h.judul, 470, F(64, 900)), inti = bungkus(h.inti, 470, F(30, 700));
  const tinggiKepala = Math.max(420, 110 + jdl.length * 70 + inti.length * 40 + 40);
  const isiK = h.poin.map(p => ({ t: bungkus(p.judul, kw - 110, F(34, 900)), d: bungkus(p.isi, kw - 48, F(28, 700)) }));
  const tinggiK = isiK.map(k => 96 + k.t.length * 40 + k.d.length * 36 + 130);
  const baris = []; for (let i = 0; i < tinggiK.length; i += 2) baris.push(Math.max(tinggiK[i], tinggiK[i + 1] || 0));
  const pt = h.penutup ? bungkus(h.penutup, W - pad * 2 - 120, F(30, 900)) : [];
  const H = pad + tinggiKepala + 32 + baris.reduce((a, b) => a + b + gap, 0) + (pt.length ? pt.length * 40 + 60 + 24 : 0) + 90;
  cv.width = W; cv.height = H;
  const kotak = (X, Y, w, hh, r, c) => { x.fillStyle = c; x.beginPath(); x.roundRect(X, Y, w, hh, r); x.fill(); };
  x.fillStyle = '#F5EADF'; x.fillRect(0, 0, W, H);
  kotak(pad, pad, W - pad * 2, tinggiKepala, 56, '#F6CDB8');
  try { const im = await muatGambar('./ippo.webp'); const s = 470; x.drawImage(im, W - pad - s + 20, pad + tinggiKepala - s * im.height / im.width - 10, s, s * im.height / im.width); } catch {}
  let y = pad + 80; x.fillStyle = '#8A3E22'; x.font = F(26, 900); x.fillText('RINGKASAN MEETING · ' + o.nama.toUpperCase(), pad + 44, y);
  y += 30; x.fillStyle = '#4A2A1C'; x.font = F(64, 900); jdl.forEach(l => { y += 70; x.fillText(l, pad + 44, y); });
  y += 16; x.fillStyle = '#6E4A38'; x.font = F(30, 700); inti.forEach(l => { y += 40; x.fillText(l, pad + 44, y); });
  y = pad + tinggiKepala + 32;
  for (let i = 0; i < h.poin.length; i++) {
    const p = h.poin[i], c = WARNA[i % 5], col = i % 2, X = pad + col * (kw + gap), hh = baris[Math.floor(i / 2)], k = isiK[i];
    kotak(X, y, kw, hh, 40, PASTEL[c]);
    x.fillStyle = TEKS[c]; x.font = F(20, 900); x.fillText(String(p.bagian || '').toUpperCase(), X + 28, y + 50);
    x.fillStyle = HEX[c]; x.beginPath(); x.arc(X + 58, y + 98, 30, 0, 7); x.fill();
    x.fillStyle = '#fff'; x.font = F(32, 900); x.textAlign = 'center'; x.fillText(String(i + 1), X + 58, y + 110); x.textAlign = 'left';
    let yy = y + 80; x.fillStyle = '#4A3428'; x.font = F(34, 900); k.t.forEach(l => { yy += 40; x.fillText(l, X + 104, yy); });
    yy += 16; x.fillStyle = TEKS[c]; x.font = F(28, 700); k.d.forEach(l => { yy += 36; x.fillText(l, X + 28, yy); });
    try { const im = await muatGambar('data:image/svg+xml;charset=utf-8,' + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 70 56" width="140" height="112">${ILL[p.ikon] || ILL.ide}</svg>`)); x.drawImage(im, X + kw - 160, y + hh - 128, 140, 112); } catch {}
    if (col === 1 || i === h.poin.length - 1) y += hh + gap;
  }
  if (pt.length) { const hh = pt.length * 40 + 60; kotak(pad, y, W - pad * 2, hh, hh / 2, '#F6CDB8'); x.fillStyle = '#6E3420'; x.font = F(30, 900); x.textAlign = 'center'; pt.forEach((l, i) => x.fillText(l, W / 2, y + 60 + i * 40)); x.textAlign = 'left'; y += hh + 24; }
  x.fillStyle = '#7A6152'; x.font = F(24, 800); x.textAlign = 'center'; x.fillText(`Jejak · ${tglPanjang(m.tanggal)}`, W / 2, H - 40);
  const blob = await new Promise(ok => cv.toBlob(ok, 'image/png'));
  const nm = `ringkasan-${o.nama.replace(/[^\w-]+/g, '-').toLowerCase()}-${new Date(m.tanggal).toISOString().slice(0, 10)}.png`;
  return new File([blob], nm, { type: 'image/png' });
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
    <div class="panduan" style="margin-top:12px">Cara ambil kunci (gratis):<ol><li>Buka aistudio.google.com di browser.</li><li>Masuk dengan akun Google.</li><li>Tekan <b>Get API key</b>, lalu <b>Create API key</b>.</li><li>Salin kuncinya, tempel di kolom di atas, lalu Simpan.</li></ol>Kunci hanya tersimpan di HP ini. Jangan bagikan kunci ke orang lain.</div>
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
    const [orang, meeting, transkrip] = await Promise.all([DB.all('orang'), DB.all('meeting'), DB.all('transkrip')]);
    const f = new File([JSON.stringify({ app: 'jejak', skema: 1, dibuat: new Date().toISOString(), orang, meeting, transkrip })], `cadangan-jejak-${new Date().toISOString().slice(0, 10)}.json`, { type: 'application/json' });
    if (navigator.canShare?.({ files: [f] })) { try { await navigator.share({ files: [f] }); return; } catch (x) { if (x.name === 'AbortError') return; } }
    const a = document.createElement('a'); a.href = URL.createObjectURL(f); a.download = f.name; a.click(); setTimeout(() => URL.revokeObjectURL(a.href), 4000); toast('File cadangan dibuat');
  });
  $('#bRestore').onclick = () => $('#fRestore').click();
  $('#fRestore').onchange = async e => {
    const f = e.target.files[0]; e.target.value = ''; if (!f) return;
    const btn = $('#bRestore');
    await tombolProses(btn, 'Sedang memulihkan…', async () => {
      let d; try { d = JSON.parse(await f.text()); } catch { return toast('File cadangan rusak atau salah.'); }
      const ok = d?.app === 'jejak' && [d.orang, d.meeting, d.transkrip].every(Array.isArray)
        && d.orang.every(o => typeof o.id === 'string' && typeof o.nama === 'string')
        && d.meeting.every(m => typeof m.id === 'string' && typeof m.orangId === 'string' && m.hasil && Array.isArray(m.hasil.poin) && Array.isArray(m.hasil.tugas));
      if (!ok) return toast('Ini bukan file cadangan Jejak.');
      if (!confirm(`Pulihkan ${d.orang.length} orang dan ${d.meeting.length} meeting? Data yang sudah ada tetap disimpan.`)) return;
      const bersih = { orang: d.orang.map(o => ({ id: o.id, nama: potong(o.nama, 40), warna: WARNA.includes(o.warna) ? o.warna : 'coral', dibuat: +o.dibuat || Date.now() })),
        meeting: d.meeting.map(m => ({ id: m.id, orangId: m.orangId, tanggal: +m.tanggal || Date.now(), durasi: +m.durasi || 0, topik: potong(m.topik, 60), hasil: (({ transkrip, ...r }) => r)(rapikanLama(m.hasil)), versi: 1 })),
        transkrip: d.transkrip.filter(t => typeof t.id === 'string').map(t => ({ id: t.id, isi: rapikan({ transkrip: t.isi }).transkrip })) };
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
  navigator.storage?.persist?.().catch(() => {});
  if (new URLSearchParams(location.search).has('dibagikan')) history.replaceState(null, '', location.pathname + '#/baru?cara=unggah&dibagikan=1');
  addEventListener('hashchange', jalan); jalan();
  if ('serviceWorker' in navigator) navigator.serviceWorker.register('./sw.js').catch(() => {});
})();
