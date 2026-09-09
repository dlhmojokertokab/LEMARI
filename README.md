# LEMARI DLH — Asset Pack

Asset hasil pemisahan dari brand board LEMARI yang sudah disetujui di chat.

Struktur:
- assets/logo — logo utama, square, minimal, favicon
- assets/pwa — icon 192/512, Apple Touch, splash
- assets/hero — hero/banner
- assets/icons — icon UI raster
- assets/illustrations — empty/success/error
- manifest.json — metadata ikon aplikasi

Urutan deploy ke GitHub:
1. Upload folder `assets/` dan `manifest.json` ke root repo LEMARI.
2. Setelah semua asset ada, replace root `index.html` dengan `index_LEMARI_ASSETS_01.html`.
3. Hard refresh GitHub Pages (Ctrl+F5).

Catatan: jangan rename path asset tanpa ikut mengubah referensi di index.html.
