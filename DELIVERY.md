# Teslim notu · 2.3.1 · 12 Ekim 2026

2.3.0'ın “başka deney” mesajını eski etkinliğe devam olarak yorumlaması düzeltildi. Yeni deney isteği kılavuz alıntısı ve eski konuya devam talimatından ayrıldı. Önceki öneriler kısa tekrar-etme alıntıları olarak taşınır; modelden başka soru/yöntem içeren tek yeni deney kartı istenir. Kaynak bilimsel ilkeye dayanak olur; deneyin yapılmış veya güvenliği onaylanmış olduğu iddia edilmez.

Normal kısa takipte tek bilimsel not, daha kısa sistem talimatı ve sınırlı geçmiş kullanılır. Token rezervasyonu önce bilinen kalan bütçeye göre küçültülür. Kaynak sayısı 100, kılavuz/ek 131, yerel taslak 31 olarak kalır. API anahtarı yalnız sunucudadır.

Sağlayıcı Retry-After veya ilgili reset başlığı varsa bekleme süresi ondan hesaplanır; süre olmadan veya gerçek dakika/gün/IP kapasitesi dolduğunda limit ve ihtiyatlı fallback korunur. Kota veya beklemenin tamamen kalktığı iddia edilmez.

Sözdizimi/JSON kontrolü ve build tamamlandı. Regresyon senaryoları yazıldı; kullanıcı tercihi gereği otomatik, cihaz ve canlı Groq/Vercel testleri çalıştırılmadı. Gerçek çıktı tekrarı ve kota performansı canlı ölçülmedi. GitHub main gönderimi bu çalışmanın kapsamındadır.
