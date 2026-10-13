# Teslim notu · 2.4.0 · 13 Ekim 2026

Gönderilen örnekte olumsuz isteğin yok sayılması, kesilmiş tarifler ve hatalı kimyasal/güvenlik ifadeleri vardı. Bu sürüm tanımlı dışlamaları ayrı işler, ilgili kaynakları eler ve önceki riskli adımları uygulama dayanağı olarak yeniden taşımaz.

Bilimsel içerik yapılandırılmış biçimde tamamlanır, ardından yerel biçim/dışlama ve bazı riskli tarif kontrollerinden geçer. Hazırlık bilgisi hemen gönderilir; tarif ancak kontrol sonrasında görünür. Strict schema için upstream streaming kapalıdır. Kısa deney kartları ve reasoning için daha geniş tamamlanma payı kullanılır. Kesilmiş/reddedilmiş yanıtta otomatik ikinci model çağrısı yapılmaz.

Bilinmeyen kimyasallarla açık laboratuvar isteğinde miktar/derişim uydurmak yerine ücretsiz netleştirme sorusu sorulur. Asit–baz ve gıda boyası dışlamaları sonraki kısa turlarda korunur. Kontroller tüm Türkçe ifadeleri, bütün bilimsel yanlışları veya kimyasal riskleri kapsamaz; ön deneme/öğretmen kontrolü gerekir.

102 kaynak, 131 kılavuz/ek ve 31 yerel taslak vardır. API anahtarı, asıl belgeler ve örnek konuşmanın tam metni repoya/pakete alınmaz.

Sözdizimi/JSON kontrolü ve build yapılmıştır. Gönderilen istek sırası, dışlamalar ve yarım/riskli tariflerin gösterilmemesi için yerel senaryolar yazılmıştır. Kullanıcının önceki tercihi gereği otomatik kontroller için yeni tercih soruldu; yanıt gelmeden çalıştırılmaz. Canlı Groq/Vercel/cihaz davranışı doğrulanmamıştır.

GitHub main gönderimi kapsam içindedir. Gerçek sağlayıcı kotaları artırılmaz veya kaldırılmaz.
