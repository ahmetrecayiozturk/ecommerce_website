# Medusa v2 Admin Kullanım Rehberi

Bu rehber, LegnoNest e-ticaret projesindeki Medusa v2 Admin panelini Türkçe açıklamalarla kullanmak için hazırlanmıştır. Admin panelinin kendi buton ve menü isimleri Medusa tarafından İngilizce gösterilir; rehberde bu isimler **İngilizce olarak aynen**, açıklamalar Türkçe verilmiştir.

## 1. Admin paneline giriş

### Yerel ortam

```text
http://localhost:9000/app
```

### Canlı ortam

Render üzerinde çalışan backend adresinin sonuna `/app` eklenir:

```text
https://ecommerce-website-7nwl.onrender.com/app
```

Giriş ekranında Medusa admin kullanıcısının e-posta ve şifresi kullanılır.

> Admin paneli açılmıyorsa backend servisinin çalıştığını, Render loglarında bir hata olmadığını ve `DISABLE_MEDUSA_ADMIN=false` olduğunu kontrol edin.

## 2. Admin panelinin temel yapısı

Medusa Admin’de sol menüdeki başlıca bölümler şunlardır:

| İngilizce menü | Türkçe karşılığı | Ne için kullanılır? |
|---|---|---|
| `Orders` | Siparişler | Siparişleri, ödeme durumlarını ve gönderileri yönetme |
| `Products` | Ürünler | Ürün, varyant, fiyat, stok ve koleksiyon yönetimi |
| `Customers` | Müşteriler | Müşteri hesaplarını ve adreslerini görme |
| `Regions` | Bölgeler | Ülke, para birimi, vergi ve ödeme yapılandırması |
| `Sales channels` | Satış kanalları | Storefront ve diğer satış kanallarını yönetme |
| `Shipping` | Kargo | Kargo profili, taşıma seçenekleri ve fulfillment ayarları |
| `Settings` | Ayarlar | API anahtarları, kullanıcılar ve sistem ayarları |
| `Promotions` | Kampanyalar | İndirim kodu ve kampanya tanımlama |
| `Gift cards` | Hediye kartları | Hediye kartı oluşturma ve takip |
| `Reviews` | Değerlendirmeler | Projedeki custom review ekranları varsa moderasyon |
| `Support` | Destek | Projede eklenen destek talepleri ekranı |
| `Return Requests` | İade talepleri | Projede eklenen iade ve iptal talepleri ekranı |

Medusa sürümüne göre bazı menülerin adı veya konumu küçük farklılıklar gösterebilir.

## 3. İlk kurulum sırası

Yeni bir kurulumda aşağıdaki sırayı izlemek en güvenli yöntemdir:

1. `Settings > Users` bölümünden admin kullanıcılarını oluşturun.
2. `Settings > Publishable API keys` bölümünden storefront için publishable key oluşturun.
3. `Regions` bölümünde Türkiye bölgesini ve para birimini kontrol edin.
4. `Sales channels` bölümünde storefront satış kanalını oluşturun veya mevcut kanalı kullanın.
5. `Products` bölümünde ürün kataloğunu oluşturun.
6. `Shipping > Shipping profiles` bölümünde kargo profilini kontrol edin.
7. `Shipping > Shipping options` bölümünde Türkiye için taşıma seçeneği oluşturun.
8. Ödeme sağlayıcılarının aktif olduğunu kontrol edin.
9. Test ürünüyle sepet, adres, kargo, ödeme ve sipariş akışını baştan sona test edin.

## 4. Publishable API key oluşturma

Storefront, Medusa Store API isteklerinde publishable API key kullanır.

1. `Settings` menüsünü açın.
2. `Publishable API keys` bölümüne girin.
3. `Create API key` düğmesine basın.
4. Örneğin `LegnoNest Storefront` adını verin.
5. Anahtarı oluşturun.
6. Anahtarı storefront environment değişkenine yazın:

```env
NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=pk_...
```

Anahtarın başındaki `pk_` korunmalıdır. Secret key ile publishable key karıştırılmamalıdır. Publishable key tarayıcıya gönderilebilir; secret key gönderilemez.

## 5. Regions ayarları

Region, fiyatların hangi para birimiyle gösterileceğini, hangi ülkelerin kapsandığını, vergi ve ödeme davranışını belirler.

### Türkiye region oluşturma veya kontrol etme

1. `Regions` menüsüne girin.
2. `Create region` veya mevcut Türkiye region’ını açın.
3. Region adını örneğin `Turkey` olarak belirleyin.
4. Para birimini `TRY` seçin.
5. Ülke listesine `Turkey (TR)` ekleyin.
6. Kullanılacak ödeme sağlayıcılarını aktif edin.
7. Kargo seçeneklerinin bu region ile uyumlu olduğunu kontrol edin.
8. `Save` düğmesine basın.

Storefront’taki:

```env
NEXT_PUBLIC_DEFAULT_REGION=tr
```

değeri, Medusa’daki ülke koduyla uyumlu olmalıdır.

## 6. Sales channels

Sales channel, ürünlerin hangi satış kanalında satılacağını belirler.

1. `Sales channels` bölümünü açın.
2. `Create sales channel` ile yeni kanal oluşturun veya mevcut kanalı açın.
3. Örneğin `LegnoNest Storefront` adını kullanın.
4. Kanalı aktif bırakın.
5. Kullanılacak ürünleri bu kanala ekleyin.
6. Region ve kargo ayarlarının aynı satış akışıyla uyumlu olduğunu kontrol edin.

Bir ürün storefront’ta görünmüyorsa yalnızca ürünün aktif olması yeterli değildir. Ürünün satış kanalına eklenmiş, yayınlanmış ve stok/region koşullarının uygun olması gerekir.

## 7. Ürün ekleme

### Basit ürün

1. `Products` menüsüne girin.
2. `Create product` düğmesine basın.
3. `Title` alanına ürün adını yazın.
4. `Handle` alanını kontrol edin. URL’de kullanılacak kısa ve benzersiz değerdir.
5. `Subtitle` ve `Description` alanlarını doldurun.
6. `Images` bölümünden ürün görsellerini yükleyin.
7. `Categories` ve `Collections` alanlarında sınıflandırma yapın.
8. Ürünü ilgili `Sales channel` içine ekleyin.
9. `Save` ile kaydedin.

### Product status

Ürünün storefront’ta görünmesi için ürünün durumu genellikle `Published` olmalıdır. Taslak ürün müşterilere gösterilmez.

### Varyant ekleme

1. Ürün detayında `Options` bölümünden seçenek oluşturun.
2. Örnek seçenekler: `Size`, `Color`, `Material`.
3. `Variants` bölümünde `Add variant` seçin.
4. Varyant seçenek değerlerini girin.
5. `SKU` değerini benzersiz girin.
6. `Prices` bölümünde Türkiye region için fiyat belirleyin.
7. Stok yönetimi kullanılıyorsa inventory location ve stok miktarını kontrol edin.
8. `Save` ile kaydedin.

### Ürün fiyatı

Fiyatı kontrol ederken şu alanlara dikkat edin:

- Para birimi: `TRY`
- Region veya currency rule
- Variant fiyatı
- İndirim/kampanya etkisi
- Vergi dahil veya hariç gösterim davranışı

Ürün listeye geliyor ancak sepete eklenemiyorsa çoğu zaman satış kanalı, variant, fiyat veya stok bağlantılarından biri eksiktir.

## 8. Shipping profiles ve shipping options

Bu proje için checkout hatalarının en önemli kaynaklarından biri shipping profile ile shipping option uyumsuzluğudur.

### Shipping profile

1. `Settings` veya `Shipping` altındaki `Shipping profiles` bölümünü açın.
2. Ürünün kullanacağı profile’ı kontrol edin.
3. Ürün detayında `Shipping profile` alanından uygun profile’ı seçin.
4. Ürünün bütün varyantlarının da doğru profile ile ilişkili olduğunu kontrol edin.

Ürünün shipping profile değeri boş kalırsa checkout completion sırasında şu tip hata görülebilir:

```text
The cart items require shipping profiles that are not satisfied by the current shipping methods
```

### Shipping option

1. `Shipping` bölümüne girin.
2. `Shipping options` sekmesini açın.
3. `Create shipping option` seçin.
4. İlgili region ve shipping profile’ı seçin.
5. Provider olarak projedeki uygun provider’ı seçin. Örneğin `manual_manual`.
6. Gösterilecek adı girin: `Yurtiçi Kargo`.
7. Fiyatı belirleyin.
8. Ürünün shipping profile’ı ile option profile’ının eşleştiğini kontrol edin.
9. `Save` ile kaydedin.

Müşteri checkout’ta kargo seçtiği halde sipariş tamamlanamıyorsa şunları kontrol edin:

- Cart’ta gerçekten shipping method var mı?
- Ürün ve variant shipping profile’a bağlı mı?
- Shipping option doğru region’a bağlı mı?
- Shipping option’ın profile’ı ürünün profile’ı ile aynı mı?
- Kargo seçeneği aktif mi?

Mevcut müşterinin seçimini değiştirmek yerine bu bağlantılar düzeltilmelidir.

## 9. Sipariş yönetimi

### Siparişleri görüntüleme

1. `Orders` menüsünü açın.
2. Listeden siparişi seçin.
3. Sipariş detayında müşteri, adres, ürünler, toplamlar, ödeme ve fulfillment bilgilerini inceleyin.

### Sipariş durumları

Medusa sürümüne göre isimler değişebilse de genellikle şu durumlar kullanılır:

- `Pending`: Sipariş beklemede.
- `Completed`: Sipariş tamamlandı.
- `Canceled`: Sipariş iptal edildi.
- `Requires action`: Ödeme veya işlem için müdahale gerekiyor.

Sipariş durumunu değiştirirken ödeme ve fulfillment durumunu ayrıca kontrol edin. Yalnızca status alanını değiştirmek gerçek ödeme iadesi veya kargo hareketi oluşturmayabilir.

### Sipariş detayında kontrol listesi

- `Customer`
- `Shipping address`
- `Billing address`
- `Line items`
- `Payment`
- `Shipping`
- `Fulfillment`
- `Totals`
- Varsa `Tracking`
- Varsa iade veya iptal talebi

## 10. Ödeme yönetimi ve iyzico

Bu projede iyzico sandbox ödeme sağlayıcısı kullanılır.

### Test öncesi kontrol

1. `Settings` veya ödeme yapılandırmasında iyzico provider’ın aktif olduğunu kontrol edin.
2. Backend’de `IYZICO_BASE_URL` değerinin düz URL olduğundan emin olun:

```env
IYZICO_BASE_URL=https://sandbox-api.iyzipay.com
```

3. URL’yi Markdown bağlantısı olarak kaydetmeyin.
4. `STOREFRONT_URL` canlı storefront adresiyle aynı olmalıdır.
5. Iyzico callback adresinin Render backend’e ulaştığını kontrol edin.
6. Cart’ta email, adres, shipping method ve payment session bulunduğundan emin olun.

### İyzico test akışı

1. Storefront’ta ürünü sepete ekleyin.
2. Teslimat adresini doldurun.
3. Kargo yöntemini seçin.
4. Ödeme yöntemini seçin.
5. `iyzico ile Öde` düğmesine basın.
6. Sandbox ödeme sayfasında test bilgileriyle ödeme yapın.
7. Callback sonrası storefront’taki sonuç sayfasını kontrol edin.
8. `Orders` bölümünde siparişin oluştuğunu kontrol edin.

İyzico ekranı açılmıyorsa:

- payment session oluşmuş mu?
- `paymentPageUrl` dönmüş mü?
- Iyzico API key ve secret doğru mu?
- `IYZICO_BASE_URL` doğru mu?
- Render loglarında `status: success` veya iyzico hata kodu var mı?

## 11. Promotions ve indirim kodları

1. `Promotions` menüsünü açın.
2. `Create promotion` düğmesine basın.
3. Promotion türünü seçin.
4. `Code` alanına müşterinin kullanacağı kodu yazın.
5. İndirim tipini belirleyin:
   - Sabit tutar
   - Yüzde
   - Ücretsiz kargo
6. Başlangıç ve bitiş tarihlerini ayarlayın.
7. Minimum sepet tutarı varsa girin.
8. Kullanım limitlerini belirleyin.
9. Uygulanacağı ürün, kategori veya koleksiyonu seçin.
10. `Save` ve gerekiyorsa `Activate` ile etkinleştirin.

Test sırasında promotion’ın region, currency ve satış kanalıyla uyumlu olduğundan emin olun.

## 12. Customers

`Customers` bölümünden müşteri hesaplarını görüntüleyebilirsiniz.

Bir müşteri kaydında genellikle:

- Ad ve soyad
- E-posta
- Telefon
- Kayıt tarihi
- Adresler
- Sipariş geçmişi

bulunur.

Şifreleri Admin panelinden okumak mümkün değildir. Şifre sıfırlama gerekiyorsa storefront’taki `Forgot password` akışı veya projedeki reset-password akışı kullanılmalıdır.

## 13. İade ve iptal talepleri

Bu projede custom Admin ekranı bulunmaktadır:

```text
/app/return-requests
```

Sol menüde `Return Requests` olarak görülebilir.

### Talep inceleme

1. `Return Requests` ekranını açın.
2. Filtre olarak `Pending` seçin.
3. Talep satırını açın.
4. Sipariş, müşteri, ürün ve gerekçe bilgilerini kontrol edin.
5. Gerekirse `Admin note` alanına not yazın.

### Talebi onaylama

1. Talep detayını inceleyin.
2. `Approve` düğmesine basın.
3. Gerekirse müşteriye açıklama yazın.
4. İade talebi için kargo bilgisi gerekiyorsa:
   - `Carrier`
   - `Return code`
   - `Return instructions`
   alanlarını doldurun.
5. `Save shipping information` ile kaydedin.

### Talebi reddetme

1. Gerekçeyi `Admin note` alanına yazın.
2. `Reject` düğmesine basın.
3. Müşteriyle iletişim gerekiyorsa destek talebi üzerinden açıklama yapın.

### İade edildi olarak işaretleme

`Refunded` durumu, uygulamadaki talep kaydının durumunu belirtir. Bu işlem payment provider üzerinde otomatik para iadesi yaptığı anlamına gelmeyebilir. Gerçek iyzico refund işlemi gerekiyorsa provider refund akışının ayrıca çalıştırılması ve sonucu kontrol edilmesi gerekir.

## 14. Destek talepleri

Projede custom destek ekranı varsa Admin menüsünde `Support` olarak görünür.

1. `Support` ekranını açın.
2. `Open` veya bekleyen talepleri filtreleyin.
3. Müşteri mesajını okuyun.
4. Yanıtınızı ekleyin.
5. Talebi `Close` veya uygun durumda `Reopen` yapın.

Müşteri sahipliği ve erişim kontrolleri nedeniyle bir destek talebini müşteriye ait olduğunu doğrulamadan paylaşmayın.

## 15. Ürün değerlendirmeleri

Projede review özelliği aktifse:

1. `Reviews` veya ilgili ürün detay ekranını açın.
2. `Pending` değerlendirmeleri inceleyin.
3. Küfür, spam, kişisel veri veya alakasız içerik varsa reddedin.
4. Uygun değerlendirmeyi `Approve` edin.
5. Silme işlemini yalnızca açıkça gerekli olduğunda kullanın.

## 16. Kargo ve tracking

Tracking özelliği kullanılıyorsa sipariş detayında:

1. Siparişi açın.
2. `Shipment tracking` veya custom tracking widget’ını bulun.
3. `Carrier` seçin.
4. `Tracking number` girin.
5. `Add` veya `Save` ile kaydedin.
6. Müşteri sipariş sayfasında tracking bilgisinin göründüğünü kontrol edin.

Tracking numarasını kopyalarken boşluk ve yanlış karakter olmadığından emin olun.

## 17. Gift cards

1. `Gift cards` menüsünü açın.
2. `Create gift card` düğmesine basın.
3. Kod, tutar, para birimi ve son kullanım tarihini belirleyin.
4. Kullanım limitini ayarlayın.
5. `Save` ile oluşturun.

Gift card’ın region ve currency ayarları sepetle uyumlu olmalıdır.

## 18. Settings

### Users

`Settings > Users` bölümünde Admin kullanıcılarını yönetin. Her kullanıcıya yalnızca gerekli erişimi verin.

### API keys

- `Publishable API keys`: Storefront istekleri için.
- Secret veya private key’ler: Yalnızca backend için.

Secret değerleri browser, storefront kodu, GitHub veya müşteri iletişim kanallarına yazılmamalıdır.

### System configuration

Environment değişkenleri Admin panelinden değil, Render/Vercel servis ayarlarından yönetilir. Değişiklik yaptıktan sonra ilgili servisin redeploy edilmesi gerekebilir.

## 19. Render ve Vercel deploy kontrolü

### Backend - Render

Backend branch ayarı `main` ise:

- `main` push’ları production deploy başlatır.
- `trlan` gibi farklı branch push’ları mevcut production servisini değiştirmez.
- Farklı branch’i test etmek için ayrı Render service veya geçici branch ayarı gerekir.

Deploy sonrası:

1. Render deploy loglarını açın.
2. `Build successful` ve servis başlangıç mesajlarını kontrol edin.
3. Backend health endpoint’ini veya `/app` adresini açın.
4. Admin girişini test edin.

### Storefront - Vercel

Vercel’de:

- `main` genellikle Production Branch’tir.
- Diğer branch’ler çoğunlukla Preview Deployment oluşturur.
- Preview URL’de environment değerlerinin doğru scope’a, özellikle `Preview` veya `Production` scope’una eklendiğini kontrol edin.

## 20. Üretim kontrol listesi

Deploy öncesi:

- [ ] `DATABASE_URL` doğru ve gizli.
- [ ] `JWT_SECRET` ve `COOKIE_SECRET` güçlü ve gizli.
- [ ] `ADMIN_CORS`, `AUTH_CORS` ve `STORE_CORS` doğru domainleri içeriyor.
- [ ] `STOREFRONT_URL` aktif Vercel domain’i.
- [ ] `NEXT_PUBLIC_MEDUSA_BACKEND_URL` Render domain’i.
- [ ] `NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY` doğru key.
- [ ] `NEXT_PUBLIC_DEFAULT_REGION=tr`.
- [ ] Türkiye region mevcut.
- [ ] TRY fiyatları mevcut.
- [ ] Ürünler satış kanalına bağlı.
- [ ] Ürün ve varyantların shipping profile’ı var.
- [ ] Shipping option doğru profile’a bağlı.
- [ ] Iyzico sandbox URL’si düz URL.
- [ ] Callback sonrası sipariş oluşuyor.
- [ ] SendGrid sender ve template ayarları doğru.

## 21. Sık karşılaşılan hatalar

### `The cart items require shipping profiles...`

Ürün/variant shipping profile ile seçilen shipping method uyumsuzdur. Ürünü doğru shipping profile’a bağlayın ve aynı profile’a bağlı shipping option oluşturun.

### `Payment page could not be prepared`

Payment session veya iyzico initialization başarısızdır. Render loglarında iyzico response code/message değerlerini inceleyin.

### Admin panel açılmıyor

Backend çalışmıyor olabilir, admin devre dışı olabilir veya CORS/domain ayarı yanlış olabilir. Render loglarını ve `DISABLE_MEDUSA_ADMIN` değerini kontrol edin.

### Ürün storefront’ta görünmüyor

Ürün status, sales channel, region, fiyat, variant ve stok bağlantılarını kontrol edin.

### Sipariş oluşturulamıyor

Cart’ın email, shipping address, billing address, shipping method ve payment session alanlarını kontrol edin. Ardından backend ve storefront loglarını aynı zaman aralığında karşılaştırın.

## 22. Güvenlik kuralları

- Secret key, database URL, SendGrid key ve iyzico secret’ı paylaşmayın.
- Environment değerlerini Git’e commit etmeyin.
- Production secret’ları konuşma, ekran görüntüsü veya log içine yazmayın.
- Admin kullanıcılarında ortak şifre kullanmayın.
- İade ve ödeme durumunu değiştirmeden önce sipariş ve provider durumunu doğrulayın.
- Gerçek para iadesi ile yalnızca Admin kaydındaki `Refunded` durumunu birbirinden ayırın.
- Production’da test siparişi açacaksanız test ürününü ve sandbox ödeme hesabını açıkça ayırın.

## 23. Önerilen günlük Admin rutini

1. `Orders` ekranında yeni siparişleri kontrol edin.
2. Ödeme durumu ve fulfillment durumlarını doğrulayın.
3. Kargo bekleyen siparişlere tracking bilgisi ekleyin.
4. `Return Requests` bölümünde bekleyen talepleri inceleyin.
5. `Support` bölümünde açık müşteri taleplerini yanıtlayın.
6. `Products` bölümünde düşük stoklu ürünleri kontrol edin.
7. `Reviews` bölümünde bekleyen değerlendirmeleri moderasyon edin.
8. Gün sonunda Render ve Vercel deployment loglarında hata olup olmadığını kontrol edin.

