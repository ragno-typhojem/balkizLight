# Teslim notu · 2.3.0 · 12 Ekim 2026

Sohbet bağlamı uzun yanıt, hazır taslak ve başarısız tur sonrasında korunacak biçimde güncellendi. Yeni fikir, deney tasarımı ve kısa takip için her seferinde kılavuz üretme zorunluluğu kaldırıldı. Kılavuzda paylaşılan arşivin başlık düzeni veya araştırma düzeni seçilir. Geri bildirim yalnız istendiğinde üretilir.

100 başvuru kaynağı, 131 kılavuz/ek ve 31 yerel taslak vardır. Yeni 20 not araştırma yöntemi, mühendislik döngüsü, istatistik, ölçüm belirsizliği, genelleme ve simülasyonları kapsar. Kaynaklar canlı arama değildir; özgün kılavuz dosyaları ve kişisel bilgiler repoya alınmaz.

Kısa takipte iki sınırlı bilimsel not, tam planda en fazla üç not ve bir kılavuz kullanılır. Kısa geçmiş alıntıları ek model çağrısı harcamaz. Yerel/Redis token rezervasyonu doğrulanan kullanımla uzlaştırılır; sağlayıcı cache tokenları düşülür. Bilinmeyen kullanımda ihtiyatlı rezervasyon korunur. Sağlayıcının gerçek kuruluş kotası aşılmaz veya artırılmış sayılmaz.

Kaydırma için grid satır yükseklikleri sınırlandı; mobil klavye/visual viewport ve kısa yatay ekran düzeni eklendi. Geçmiş kayıt anahtarı aynı kaldı; eski çalışmalar okunabilir. İlk yeni açılış internet gerektirir.

JavaScript/JSON sözdizimi kontrolü ve build tamamlandı. Regresyon senaryoları eklenip güncellendi, ancak kullanıcı önceki isteğinde testleri kendisine bıraktığı için otomatik test, tarayıcı/cihaz ve canlı Groq/Vercel testi çalıştırılmadı. Build gerçek sohbet davranışı veya cihaz görünümü kanıtı değildir.

GitHub main dalına gönderim bu çalışmanın kapsamındadır. Vercel bağlıysa push dağıtımı tetikleyebilir; başarılı canlı dağıtım ayrıca doğrulanmalıdır. Ortam değişkenleri .env.example içindedir; gerçek API anahtarı pakete veya repoya dahil değildir.
