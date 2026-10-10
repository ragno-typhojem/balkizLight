# Teslim notu · 2.2.0 · 10 Ekim 2026

Bu sürüm ragno-typhojem/balkizLight reposunun bu çalışma sırasında indirilen main arşivinden hazırlanmıştır. GitHub’a push veya Vercel’e yayın yapılmadı.

BALKIZ’ın varsayılan amacı etkinlik geliştirmektir. Kullanıcı istemedikçe geri bildirim raporu, puanlama veya eleştiri üretmez. Yeni keşif soruları, varyasyonlar, bilimsel derinlik ve uygulanabilir akış sunar. Başlangıç/orta/ileri bilimsel derinlik seçimi eklenmiştir.

Paylaşılan arşivden 131 kılavuz ve ek için kısa geliştirme bilgileri ve asıl belge bağlantıları vardır. 80 başvuru kaynağı, kaynak türü/alan/konu araması ve 31 hazır taslak (6 ileri düzey araştırma) bulunur. Kılavuz kartı geliştirme isteği hazırlar; kullanıcı göndermeden yapay zekâ çağrılmaz. Tanıtım klasörü ve edebiyat kitapları kaynak araştırmasının dışındadır. Asıl PDF/Word dosyaları ve kişisel bilgiler pakete alınmamıştır. Görsel/formül çıkarımı tam değildir; 6 ek görsel olarak işaretlenmiştir. Ayrıntılı kapsam ve kaynakça SOURCE-NOTES.md içindedir.

Kaynak seçimi yerelde yapılır: normal istekte en fazla 4, kısa/yoğun modda 3 bilimsel not ve 1 kısa kılavuz bağlamı. Notların karakter bütçeleri sınırlıdır; kaynaklar için ayrı embedding veya arama servisi kullanılmaz. Dosya alıntıları aynı sınırlı seçimde kaynak eşleştirmesine yardımcı olur. Mevcut kota, iptal, cache ve isteğe bağlı ortak Redis rezervasyonu korunur. Daha çok kaynak ücretsiz kapasiteyi sınırsız hâle getirmez.

Vercel’de zorunlu tek gizli değişken GROQ_API_KEY. Model ve kota örnekleri .env.example içindedir; gerçek hesap sınırları kullanılmalıdır. Node.js 22+ ve vercel.json ile kurulur. Paket önceki dosyalarla birlikte güncellenmelidir; yalnızca app.js kopyalamak yeterli değildir.

Bu sürümde kullanıcı isteği doğrultusunda otomatik test, tarayıcı/cihaz testi ve canlı Vercel/Groq denemesi çalıştırılmadı. Build dağıtım dosyalarını hazırlamak içindir; çalışma davranışını doğrulamaz. Mobil görünüm, kaynak filtreleri, eski sohbet uyumu, çevrimdışı güncelleme, PDF/DOCX, model yanıtları ve ortak kota denemeleri kullanıcıya bırakıldı.
