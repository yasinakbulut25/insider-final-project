# Carousel Bileşeni

LC Waikiki ürün detay sayfasına entegre edilecek şekilde hazırladığım **“Bunları da Beğenebilirsiniz”** carousel bileşenini tamamladım ve aşağıda detaylarıyla açıklanmaktadır.

---

## Proje Detayları

- Sayfada **jQuery** yüklü değilse, otomatik olarak CDN üzerinden eklenmektedir.
- Ürün listesi, verilen JSON API’den `fetch` ile alınmakta ve `localStorage`’a kaydedilmektedir.
- Eğer localStorage'da veri varsa, yeniden istek yapılmadan buradaki veri kullanılmaktadır.
- Carousel, sadece `.product-detail` sınıfına sahip ürün detay sayfalarında çalışacak şekilde yapılandırılmıştır.
- HTML ve CSS içerikleri **tamamen JavaScript üzerinden DOM’a dinamik** olarak eklenmektedir.
- Kullanılan class isimleri, mevcuttaki LC Waikiki class yapısıyla çakışmaması için özel olarak farklılaştırılmıştır.
- Her ürün:
  - Görsel
  - İsim
  - Fiyat bilgisi
  içerecek şekilde, mevcut LCW ürün kartları ile **pixel perfect** uyumda listelenmektedir.
- Tablet ve mobil ekranlarda görünen bir **"Sepete Ekle"** butonu da bulunmaktadır.
- **Kalp ikonuna tıklanarak ürün favorilere** eklenebilir ve bu durum `localStorage` üzerinde kalıcı olarak saklanır.
  - Favoriye alınan ürünlerde kalp ikonu **mavi renk** ile gösterilmektedir.
- Ürün bağlantısına tıklandığında ilgili ürün sayfası **yeni sekmede açılır**.
- Sağ ve sol yön ok butonları ile kaydırma yapılabilir.
- Kaydırma işlemi:
  - `transform: translateX`
  - `CSS transition`
  ile **yumuşak (animasyonlu)** şekilde sağlanmaktadır.
- **Son ürüne kadar** kaydırma yapılabilir, kalan mesafe **dinamik olarak hesaplanır**.

---

## Mobil Davranışı (Ekran genişliği ≤ 992px)

- Ok ikonları **otomatik olarak gizlenir**.
- Kullanıcı, parmağıyla sağa-sola **sürükleyerek** kaydırma yapabilir.
- Scroll bar **gizlidir**.
- Scroll sonrası ürün listesi, en yakın ürün kartına hizalanarak **“snap” hissi** verir.

---

## Teknik Kurallar

- Tüm yapı sadece **JavaScript** ve **jQuery** ile geliştirilmiştir.
- Harici herhangi bir kütüphane (**Swiper**, **Bootstrap**, vb.) kullanılmamıştır.
- Kod tek bir `.js` dosyası şeklinde teslim edilmektedir.
- Kod `Chrome Developer Console` üzerinden çalıştırılabilecek yapıdadır.
- Kod yapısı:
  - Sade
  - Okunabilir
  - Tekrar kullanılabilir olacak şekilde yazılmıştır.

---
