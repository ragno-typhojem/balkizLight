# Teslim notu · 5 Ekim 2026

Bu paket `ragno-typhojem/balkizLight` reposunun `4367199` sürümünden hazırlanmış güncellenmiş kaynakları içerir. GitHub’a push veya Vercel’e canlı yayın yapılmadı.

Vercel’de gereken tek zorunlu gizli değişken `GROQ_API_KEY`. Yüksek kullanıcı trafiğinde instance’lar arasında ortak kota kontrolü için isteğe bağlı Redis REST ayarları README’de anlatılmıştır. Bu ayarlar olmadan sınırlar instance bazındadır.

Kullanıcının isteği üzerine son cihaz ve canlı servis testleri kullanıcıya bırakıldı. İstek yönlendirme, eşzamanlılık, önbellek, iptal ve akış ayrıştırmasına ilişkin 20 otomatik kontrol önceki aşamada geçti. Tarayıcı test motoru çalışma ortamında başlatılamadı; gerçek mobil/masaüstü görünümü, PDF/DOCX davranışı, Redis Lua çalışması ve Vercel/Groq uçtan uca kullanımı doğrulanmış sayılmaz. Son paketleme değişiklikleri için yeniden test çalıştırılmadı.

Ücretsiz kapasite sınırsız değildir. Bilimsel yanıtların doğruluğu garanti edilmez; kaynak seçkisi, görünür uyarılar ve öğretmen kontrolü birlikte kullanılmalıdır.
