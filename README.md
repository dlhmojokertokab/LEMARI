# LEMARI DLH — Assets 02

Versi final-polish asset pack untuk GitHub Pages.

## Prinsip
- Asset gambar hanya dipakai untuk branding/ilustrasi yang memang perlu.
- Ikon UI biasa TIDAK memakai PNG hasil crop.
- Tombol dan aksi memakai icon bawaan/emoji ringan agar tetap tajam dan konsisten.

## Struktur
- `assets/logo/` — logo utama, square, minimal, favicon
- `assets/pwa/` — icon 192/512, Apple Touch, splash
- `assets/hero/` — hero/banner
- `assets/illustrations/` — empty/success/error
- `manifest.json` — metadata PWA
- `index.html` — frontend LEMARI yang sudah memakai asset branded + icon UI bawaan

## Urutan GitHub
1. Upload folder `assets/` dan `manifest.json` ke root repo LEMARI.
2. Replace root `index.html` dengan `index.html` dari paket ini.
3. Commit.
4. Hard refresh GitHub Pages (`Ctrl+F5`).

Tidak ada folder `assets/icons/` pada versi ini.
