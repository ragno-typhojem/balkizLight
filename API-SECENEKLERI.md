# API seçimi · 14 Ekim 2026 · 2.8.0 güncel karar

Ücretsiz canlı kullanım için Cloudflare Workers Free + Groq yedeği hazırlandı. Cloudflare günlük 10.000 neuron sağlar ve Free planı kotada işlemi reddeder; ücretli plan ayrıca açılmalıdır. Ekonomik Qwen3-30B-A3B-FP8 için milyon giriş/çıkış tokenı başına 4.625/30.475 neuron, araştırma GPT-OSS 120B için 31.818/68.182 neuron listelenir. Bu oranlar kullanım tahmini içindir; düşünme tokenları, gerçek istem/yanıt uzunluğu ve diğer hesap tüketimi sonucu değiştirir. Sayısal kullanıcı kapasitesi veya kalite üstünlüğü ölçülmedi.

Cloudflare'ın ücretli faturalandırma gerektirdiğini belirttiği Kimi K2.6/K2.7, GLM 5.x ve DeepSeek V4 modelleri seçilmedi. Kod yalnız üç belgelenmiş Free uygun model ID'sine izin verir. Plan beyanı faturalandırma kontrolünün yerine geçmez; kullanıcı gerçek Workers Free hesabını bağlamalıdır.

Vercel AI Gateway'in ücretsiz katmanı aylık 5 USD ve uygun modellerle sınırlıdır; ücretsiz günlük hesap kotası yerine aylık kredi sağlar. Hesabın ücretsiz kredisi/faturalandırma durumu görülemediği için otomatik etkinleştirilmedi. Satın alma veya otomatik bakiye yükleme yapılmadı.

NVIDIA'da ücretsiz API vardır. Ancak güncel GPT-OSS 120B model sayfasında Free Endpoint Deprecated, GPT-OSS 20B sayfasında Available yazıyor. Önceki 120B ücretsiz varsayımı düzeltildi; NVIDIA şablonu 20B iç test/preview içindir. API Trial Terms 1.2 ve 1.4 iç test/değerlendirme ile gerçek üretim kullanımını ayırır.

Kaynaklar: [Cloudflare fiyat/kota](https://developers.cloudflare.com/workers-ai/platform/pricing/), [OpenAI uyumlu Cloudflare API](https://developers.cloudflare.com/workers-ai/configuration/open-ai-compatibility/), [Qwen modeli](https://developers.cloudflare.com/workers-ai/models/qwen3-30b-a3b-fp8/), [GPT-OSS 120B modeli](https://developers.cloudflare.com/workers-ai/models/gpt-oss-120b/), [Qwen resmî non-thinking istemi](https://huggingface.co/Qwen/Qwen3-30B-A3B), [Vercel Gateway fiyatlandırması](https://vercel.com/docs/ai-gateway/pricing), [NVIDIA 20B](https://build.nvidia.com/openai/gpt-oss-20b), [NVIDIA 120B](https://build.nvidia.com/openai/gpt-oss-120b), [NVIDIA API Trial Terms](https://assets.ngc.nvidia.com/products/api-catalog/legal/NVIDIA%20API%20Trial%20Terms%20of%20Service.pdf).

---

# Önceki 2.7.0 karşılaştırması

Bu karşılaştırmada güncel doğrudan belgeler arama motorunun eski özetlerinden önceliklidir. BALKIZ'ın yayımlanan sürümü varsayılan olarak Groq kullanır. NVIDIA sunucu bağlantısı isteğe bağlıdır; hesap, API anahtarı veya üretim lisansı bu kod değişikliğiyle verilmez.

| Seçenek | Güncel durum | Seçim |
|---|---|---|
| Hugging Face Serverless / Inference Providers | Doğrudan güncel fiyat sayfasında ücretsiz kullanıcıya dahil aylık kredi **yok**. Eski 0,10 USD bilgisi arama sonuçlarında kalabiliyor. Model/provider üzerinden kredi satın alarak kullanım var. | Kalıcı yüksek ücretsiz kota için seçilmedi. |
| GitHub Models Marketplace | GitHub'a göre 30 Temmuz 2026'da tamamen emekliye ayrıldı; katalog, playground, inference API ve BYOK kapalı. Copilot ayrı bir üründür. | Yeni BALKIZ backend'i olarak kullanılamıyor. |
| NVIDIA API Catalog / NIM | Developer Program ile model API'lerini denemek mümkün. Resmî FAQ ve API Trial Terms ücretsiz erişimi test/geliştirme/evaluation ile sınırlar; gerçek son kullanıcı hizmeti production sayılır ve ayrıca production yetkisi gerektirir. | Üçlü içinden **model denemesi için seçildi**; açık gönüllü yayını otomatik taşınmadı. |

NVIDIA'da başlangıç modelleri, belgelenmiş hosted endpointleri bulunan `openai/gpt-oss-120b` ve `openai/gpt-oss-20b` olarak belirlendi. Bu, NVIDIA'nın ayrı bir GPT modeli ürettiği iddiası değildir; GPT-OSS modelleri NVIDIA altyapısında çağrılır. Nemotron-3-Super model kartının resmî desteklenen dil listesinde Türkçe olmadığı için Türkçe BALKIZ'ın varsayılanı yapılmadı. Bu tercih canlı karşılaştırmalı kalite testinin sonucu değildir.

Hesabın kesin NVIDIA kota/credit değerleri görülmedi. İnternetteki 40 RPM veya eski 1.000 kredi sayıları bu hesap için garanti sayılmaz. Kodda NVIDIA için 10 RPM, 1.000 RPD, 20.000 TPM ve 200.000 TPD ihtiyatlı **uygulama sınırı** vardır; bunlar sağlayıcının sana tanıdığı ücretsiz limit değildir. Hesap paneline göre `NVIDIA_RPM/RPD/TPM/TPD` düzenlenir. Groq'un kendi gerçek sınırları veya NVIDIA erişim koşulları kaldırılmaz.

## NVIDIA bağlantısını açmak

- Yalnız geliştirme/test ortamında: sunucuda `AI_PROVIDER=nvidia`, `NVIDIA_API_KEY` ve `NVIDIA_ACCESS_MODE=evaluation`. Mevcut Groq anahtarını silebilmen gerekmez.
- Gerçek production hakkı alındıktan sonra: `NVIDIA_ACCESS_MODE=production-authorized`. Bu değişken bir teknik beyan/kurulum ayarıdır; NVIDIA'dan hak veya lisans satın almaz/doğrulamaz. Vercel production ortamında evaluation ayarıyla NVIDIA çağrısı reddedilir.
- Önceki yayına dönüş: `AI_PROVIDER=groq`. Otomatik provider/model atlama, ikinci generation veya ücretli fallback yoktur.

Anahtarlar yalnız Edge fonksiyonundadır; statik `public/` klasörüne kopyalanmaz. Tarayıcı sadece aynı sitenin `/api/chat` uç noktasına gider. İstemciden provider/endpoint/API key seçilemez; izin verilen iki endpoint kodda sabittir. Kullanıcı BALKIZ arayüzünü görür. Harici AI servisine gönderilen sohbet/alinti için sıfır kayıt veya kusursuz doğruluk iddiası yoktur.

NVIDIA adapter'ı hosted GPT-OSS belgelerindeki `max_tokens` ve `reasoning_effort` alanlarını kullanır. Hosted dokümanda doğrulanmayan Groq'a ait `max_completion_tokens/include_reasoning` alanları gönderilmez. Bilimsel JSON sözleşmesi promptta istenir ve tamamlanan cevap BALKIZ'ın biçim/risk kontrollerinden geçer; NVIDIA tarafında strict constrained decoding garantisi verilmez. Düşünme/özel metadata kullanıcıya aktarılmaz. Live API denemesi yapılmadı.

Kaynaklar: [Hugging Face güncel fiyat sayfası](https://huggingface.co/docs/inference-providers/pricing), [GitHub Models kapanışı](https://docs.github.com/en/github-models), [NVIDIA resmî FAQ](https://docs.api.nvidia.com/nim/docs/product), [NVIDIA API Trial Terms](https://assets.ngc.nvidia.com/products/api-catalog/legal/NVIDIA%20API%20Trial%20Terms%20of%20Service.pdf), [NVIDIA GPT-OSS 120B API](https://docs.api.nvidia.com/nim/reference/openai-gpt-oss-120b-infer), [NVIDIA GPT-OSS 20B API](https://docs.api.nvidia.com/nim/reference/openai-gpt-oss-20b-infer), [Nemotron model kartı](https://docs.api.nvidia.com/nim/reference/nvidia-nemotron-3-super-120b-a12b).

---

# Önceki araştırma · 13 Ekim 2026

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
