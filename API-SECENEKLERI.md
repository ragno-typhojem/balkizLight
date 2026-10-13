# API seçenekleri · 13 Ekim 2026

Kullanıcı Gemini'ı ve Mistral'ı istemediği için bu sürüme yeni sağlayıcı bağlanmadı. BALKIZ'ın mevcut Groq bağlantısı korundu. Sağlayıcı hesabı veya ödeme açılmadı; yeni ücretli çağrı eklenmedi. Kişisel sohbet siteleri sunucu API'si olarak otomatik kullanılmaz.

| Servis | Doğrulanan kullanım biçimi | BALKIZ açısından sonuç |
|---|---|---|
| Groq | GPT-OSS 20B ve 120B için model başına 30 RPM, 1.000 RPD, 8.000 TPM, 200.000 TPD; kesin sınır hesap panelindedir | Mevcut ücretsiz API korunur; 20B'ye geçmek tek başına kota sınırını artırmaz |
| DeepSeek | Güncel doğrudan API token başına ücretlidir | Ücretsiz, kalıcı Groq alternatifi diye sunulmadı |
| Monica | Resmî Open API sohbet aboneliğinden ayrıdır ve bakiye gerektirir | Ücretsiz sohbet hakkı BALKIZ API kotasına çevrilemez |
| OpenRouter | Ücretsiz hesapta 50 istek/gün, 20 RPM; en az 10 USD krediyle ücretsiz model günlük sınırı 1.000 olur | Tamamen ücretsiz hesapta Groq'un günlük istek üst sınırından düşük |
| SambaNova | Ücretsiz modeller için 20 RPM, 20 RPD, 200.000 TPD | Büyük çok kullanıcılı ücretsiz havuz olarak seçilmedi |
| Cerebras | Kalıcı ücretsiz katman yok; kartla verilen 5 USD deneme 30 gün sonra sona erer | Deneme, sürekli ücretsiz kapasite sayılmaz |
| Cloudflare Workers AI | Yenilenen 10.000 neuron/gün; model başına tüketim değişir, bazı modeller ücretli erişim ister | Yenilenen ücretsiz alternatif var, ancak tek API anahtarlı Groq'la aynı kurulum/kota birimi değil; bu sürüme bağlanmadı |
| Mistral | Kart gerektirmeyen API Free mode; kesin kullanım hesap panelindedir | Kullanıcı kapsam dışı bıraktı |

Bu sınırlar belirli kullanıcı sayısını garanti etmez. RPM ile günlük token limiti farklı darboğazlardır; istem uzunluğu ve yanıt uzunluğu kapasiteyi değiştirir. Yeni anahtar açmak aynı hesabın kotasını artırmaz.

Kaynaklar: [Groq limitleri](https://console.groq.com/docs/rate-limits), [DeepSeek fiyatları](https://api-docs.deepseek.com/quick_start/pricing/), [Monica API](https://platform.monica.im/), [Monica sohbet kullanım koşulları](https://monica.im/pricing?c=BN75FQPG), [OpenRouter resmî kullanım özeti](https://openrouter.ai/blog/tutorials/how-to-get-the-lowest-cost-llm-inference-on-openrouter/), [SambaNova limitleri](https://docs.sambanova.ai/docs/en/models/rate-limits), [Cerebras limitleri ve deneme şartları](https://inference-docs.cerebras.ai/support/rate-limits), [Cloudflare fiyat/kota bilgisi](https://developers.cloudflare.com/workers-ai/platform/pricing/), [Mistral API kurulum](https://docs.mistral.ai/getting-started/quickstarts/studio/activate-and-generate-api-key).
