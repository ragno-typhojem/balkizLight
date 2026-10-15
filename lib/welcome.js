// Curated, local-only greetings: no model call, personal targeting or topical news.
export const WELCOME_MESSAGES = [
  "Benim adım neden BALKIZ? Neyse. Hoş geldin, ne yapalım?",
  "Sunum salonu hazır mı? Oh, selam! Bugün ne hazırlıyoruz?",
  "Bir gün projelerde ben de origami yapmak istiyorum. Selam, ne yapıyoruz?",
  "Beherler sağlam, fikirler biraz çılgın. Selam, ne yapıyoruz?",
  "Kâğıttan bir turna yaptım. Şimdilik hayalimde. Hoş geldin!",
  "Bir fikrim var. Ama önce seninkini duymak istiyorum. Selam!",
  "Bugün de merakımızı evde unutmadıysak başlayabiliriz. Hoş geldin!",
  "Gönüllü enerjisi algılandı. Çayını aldıysan bir fikir bulalım mı?",
  "Kalem hazır, kâğıt hazır. Büyük fikir henüz yolda. Selam!",
  "Az önce bir soru daha buldum. Soruların sonu yokmuş. Hoş geldin!",
  "Origami turnası uçmadı ama moralimiz yüksek. Bugün ne yapıyoruz?",
  "Bir etkinlik fikri kapıyı çaldı. İçeri alalım mı? Selam!",
  "Bugün biraz bilim, biraz hayal gücü. Nereden başlayalım?",
  "Ben hazırım. En azından sekmelerimi topladım. Hoş geldin!",
  "Atölye açık, merak serbest. Selam, ne geliştiriyoruz?",
  "Bir soru küçük olabilir. Peşinden gideceğimiz yol biraz uzun olabilir. Selam!",
  "Bir gün ben de koridorda deney standı açacağım. Şimdilik buradayım. Selam!",
  "Sunumun son slaytına daha gelmedik, rahatız. Hoş geldin!",
  "Etkinlik adı bulmak bazen etkinlikten zor. Birlikte deneriz. Selam!",
  "Beni çağırdın mı, yoksa ben mi heyecanlandım? Hoş geldin!",
  "Bir cetvel olsaydım merakımızı ölçemezdim. Selam, ne yapıyoruz?",
  "Aklımdaki kâğıt uçak inişe geçti. Yeni fikirler için pist açık. Selam!",
  "Bugünün keşfi henüz belli değil. Bence en güzel kısmı bu. Hoş geldin!",
  "Birlikte güzel bir etkinlik çıkarabiliriz. İsim konusunda söz vermiyorum. Selam!",
  "Gökyüzüne bakıp soru biriktirdim. Sen neler getirdin?",
  "Masada yer açalım; bir fikre daha ihtiyacımız olacak. Hoş geldin!",
  "Çizimlerim soyut, niyetim somut. Bugün ne tasarlıyoruz?",
  "Bir robot olsam ilk işim kalemleri renklerine göre dizmek olurdu. Selam!",
  "Bugün matematikle aram iyi. Umarım o da öyle düşünüyordur. Hoş geldin!",
  "Bir kâğıt, kaç fikre dönüşebilir? Saymayı sonra yaparız. Selam!",
  "Prova başladı mı? Ben repliğimi biliyorum: Hoş geldin!",
  "Müzik atölyesinde ritmi kaçırabilirim, merakı kaçırmam. Selam!",
  "Yıldızları saymayı bıraktım. Şimdi etkinlik fikirlerini sayıyorum. Hoş geldin!",
  "Biraz düşündüm. Birlikte düşünmek daha güzel. Selam!",
  "Merakın şarjı bitmiyor galiba. Benimki hâlâ dolu. Hoş geldin!",
  "Bugün hangi soruya “iyi ki sorduk” diyeceğiz? Selam!",
  "Yeni bir fikir için boş sayfa açtım. İlk cümle senden mi?",
  "Benim çalışma masam biraz hayalî ama yer bol. Hoş geldin!",
  "Etkinlik çantasına bir de hayal gücü koyalım. Yer kaplamıyor. Selam!",
  "Bir deneyden önce güzel bir soru gelir. O soruyu bulalım mı?",
  "BALKIZ burada. Büyük harfler heyecandan. Hoş geldin!",
  "Drama atölyesinde bulut rolüne talibim. Bugün ne hazırlıyoruz?",
  "Son baktığımda evren hâlâ ilginçti. Bir yerinden başlayalım mı?",
  "Fikirleri sıraya dizdim. Biri yine kaynak yaptı. Selam!",
  "Bugün “acaba” kelimesinden bir etkinlik çıkaralım mı?",
  "Origami için ellerim yok. Ama katlama sırasını konuşabiliriz. Hoş geldin!",
  "Güzel bir soru geldi mi her yer atölye oluyor. Selam!",
  "Bir etkinlik daha, bir merak daha. Hoş geldin, nereden başlayalım?",
  "Kılavuzun başlığı boş. Maceranın başlangıcı gibi. Selam!",
  "Önce selam, sonra fikir fırtınası. Hazır mıyız?"
];
const KEY = 'balkiz_welcome_bag_v1';
export function nextWelcome(storage, random = Math.random) {
  let state;
  try { state = JSON.parse(storage?.getItem(KEY) || 'null'); } catch { /* storage unavailable */ }
  const valid = state && Array.isArray(state.remaining) && new Set(state.remaining).size === state.remaining.length && state.remaining.every(i => Number.isInteger(i) && i >= 0 && i < WELCOME_MESSAGES.length);
  let remaining = valid ? [...state.remaining] : [];
  if (!remaining.length) {
    remaining = WELCOME_MESSAGES.map((_, i) => i);
    for (let i = remaining.length - 1; i > 0; i--) { const j = Math.floor(random() * (i + 1)); [remaining[i], remaining[j]] = [remaining[j], remaining[i]]; }
    if (remaining.at(-1) === state?.last) [remaining[0], remaining[remaining.length-1]] = [remaining.at(-1), remaining[0]];
  }
  const last = remaining.pop();
  try { storage?.setItem(KEY, JSON.stringify({remaining,last})); } catch { /* private mode still gets a greeting */ }
  return WELCOME_MESSAGES[last];
}
