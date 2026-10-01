# Mengaktifkan adittamavincent.my.id/netes

Alamat produksi yang diminta: **https://adittamavincent.my.id/netes/**.

File halaman sudah memakai alamat ini untuk canonical, Open Graph, schema, dan sitemap. `npm run build` menghasilkan `dist/netes/`, berisi halaman dan aset dengan path relatif. Domain dan DNS belum diubah; alamat produksi belum diverifikasi aktif.

## Tentukan situs yang memegang domain

GitHub Pages menerima domain atau subdomain, tanpa `https://` dan tanpa `/netes`. DNS juga tidak mengatur path. Folder `/netes` harus berada di hasil deployment situs yang memegang `adittamavincent.my.id`.

Repo sumber sekarang adalah `netes-batik/landing-page-netes`. Ini berada di akun yang berbeda dari `adittamavincent`. Project Pages hanya mewarisi custom domain dari user/organization site di akun yang sama. Mengatur domain pada `adittamavincent/adittamavincent.github.io` tidak membuat repo milik `netes-batik` muncul otomatis di `/netes`.

### Jika domain sudah dipakai untuk situs utama

Pertahankan hosting dan DNS situs utama. Tambahkan isi `dist/netes/` sebagai folder `netes/` ke output situs utama tersebut.

Untuk situs utama di GitHub Pages, gabungkan folder itu dengan artifact deployment atau source publish situs utama. Jangan menimpa halaman utama, workflow, `CNAME`, atau `robots.txt` yang sudah ada. Jika situs utama memakai framework, folder Netes harus masuk ke direktori aset publik/output sesuai framework itu.

Jika situs utama berada di hosting lain dan Netes tetap harus di GitHub Pages, host utama perlu mendukung proxy untuk path `/netes`. DNS saja tidak dapat memisahkan hosting berdasarkan path. Jangan memindahkan domain utama ke repo Netes sebelum memilih arsitektur ini.

### Jika domain kosong dan boleh dipakai untuk deployment repo ini

Artifact `dist/` sudah memiliki halaman di `/netes/`. Repo ini dapat memegang custom domain `adittamavincent.my.id` secara langsung, sehingga `/netes/` dilayani dari folder tersebut. Artifact yang sama juga menyediakan halaman Netes di root untuk preview mandiri. Tidak perlu mengganti nama repo.

Jika nantinya domain membutuhkan homepage terpisah, gabungkan Netes ke situs utama seperti skenario pertama.

## Commit dan push repo sumber

Jalankan dari checkout ini pada terminal yang dapat mengakses GitHub dan menulis `.git`:

```sh
npm test
npm run build
git add .
git commit -m "feat: add Netes Batik landing page and domain export"
git push -u origin main
```

## Konfigurasi GitHub Pages

Pada repo yang akan memegang domain:

1. Buka **Settings → Pages**.
2. Pilih **Source: GitHub Actions** jika memakai workflow artifact. Repo Netes sudah memiliki `.github/workflows/pages.yml` untuk upload `dist/` dan deployment Pages.
3. Pada **Custom domain**, isi `adittamavincent.my.id`, lalu **Save**. Lakukan ini sebelum mengarahkan DNS ke GitHub.
4. Jika domain sudah terkait dengan repo situs utama, pertahankan konfigurasi domain di repo itu dan tambahkan folder Netes ke deployment situs tersebut.
5. Sesudah DNS dan sertifikat siap, aktifkan **Enforce HTTPS**.

Untuk workflow GitHub Actions, file `CNAME` tidak dipakai untuk menetapkan custom domain. Domain harus disetel lewat pengaturan Pages atau API. Jangan membuat `CNAME` berisi path `/netes`.

## DNS di IDwebhost

Gunakan halaman domain yang Anda berikan:

https://member.idwebhost.com/clientarea.php?action=domaindetails&id=1076450

Buka **Kelola DNS / DNS Management**. Isi record pada penyedia DNS yang benar-benar menjadi authoritative nameserver domain. Jika nameserver menggunakan penyedia lain, perubahan record harus dilakukan di penyedia itu. Jangan mengganti nameserver tanpa memindahkan record situs dan email yang masih dipakai.

**Record berikut hanya diperlukan jika domain utama akan diarahkan ke GitHub Pages.** Jika situs utama sudah aktif di hosting lain, pilih dulu cara menambahkan `/netes` sebelum mengubah record apex.

| Type | Host / Name | Value           | TTL               |
| ---- | ----------- | --------------- | ----------------- |
| A    | @           | 185.199.108.153 | Default atau 3600 |
| A    | @           | 185.199.109.153 | Default atau 3600 |
| A    | @           | 185.199.110.153 | Default atau 3600 |
| A    | @           | 185.199.111.153 | Default atau 3600 |

Jika panel memakai kolom host kosong untuk domain utama, gunakan format yang dijelaskan panel. Sesuaikan record A/AAAA apex lama yang bertentangan setelah memastikan tujuan domain. Pertahankan record email seperti MX dan TXT yang masih diperlukan.

Opsional untuk `www`: tambah CNAME dengan host `www` dan value default GitHub Pages domain dari **akun pemilik repo yang memegang domain**:

- Jika domain dipegang repo milik `adittamavincent`: `adittamavincent.github.io`.
- Jika domain dipegang repo milik `netes-batik`: `netes-batik.github.io`.

Value CNAME tidak mengandung `https://`, nama repo, atau `/netes`. Tidak perlu record DNS bernama `netes` untuk path `/netes`; record itu akan membuat subdomain yang berbeda.

## Verifikasi setelah deployment

GitHub menyebut propagasi DNS dan ketersediaan HTTPS dapat memerlukan hingga 24 jam. Cek deployment Pages berstatus sukses, kemudian:

```sh
dig adittamavincent.my.id A +short
curl -I https://adittamavincent.my.id/netes/
curl -I https://adittamavincent.my.id/netes/assets/blangkon-hero.webp
```

Halaman dan aset harus merespons 200. Buka URL produksi, cek tampilan seluler, menu, FAQ, dan tombol WhatsApp. Pastikan situs utama tetap tampil sesuai yang diinginkan. `/netes` dapat diarahkan server ke `/netes/`; trailing slash diperlukan agar URL aset relatif mengarah ke folder yang benar.

## Status dan hal yang belum diketahui

- Akses terminal ke GitHub/npm belum tersedia pada sesi ini.
- `.git` checkout ini hanya dapat dibaca, sehingga commit dan push belum berhasil.
- Belum diketahui apakah domain sudah dipakai, authoritative nameserver-nya apa, dan repo/hosting situs utama ada di mana.
- Halaman IDwebhost yang diberikan tidak dapat dibaca melalui alat web; perubahan akun belum dilakukan.

## Rujukan

- [GitHub: Custom domain dan penggunaan lintas repo](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/about-custom-domains-and-github-pages)
- [GitHub: Pengaturan domain, record DNS, dan HTTPS](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)
- [IDwebhost: Custom domain GitHub Pages](https://tutorial.idwebhost.com/cara-custom-domain-di-github-pages-ternyata-semudah-ini/)
