import { SCIENCE_SOURCES } from './science-sources.js?v=2.2.0';
import { GUIDES } from './guide-catalog.js?v=2.2.0';
import { normalize, createRetriever } from './retrieval.js?v=2.2.0';
export { normalize, GUIDES };
export const KNOWLEDGE_VERSION = '2026-10-10';
const LEGACY_SOURCES = [
  {
    id: 'nasa-seasons', title: 'Mevsimler nasıl oluşur?', publisher: 'NASA', domain: 'astronomy',
    url: 'https://spaceplace.nasa.gov/seasons/en/',
    keywords: ['mevsim', 'eksen', 'yaz', 'kış', 'güneş', 'dünya', 'seasons'],
    facts: 'Mevsimlerin temel nedeni Dünya ekseninin eğikliğidir. Güneş ışığının geliş açısı ve gündüz süresi yıl boyunca değişir. Kuzey ve güney yarımküreler zıt mevsimler yaşar; mevsimleri yalnızca Güneş’e uzaklıkla açıklamak yanlıştır.',
  },
  {
    id: 'nasa-moon', title: 'Ay’ın evreleri', publisher: 'NASA', domain: 'astronomy',
    url: 'https://science.nasa.gov/moon/moon-phases/',
    keywords: ['ay', 'evre', 'dolunay', 'hilal', 'moon', 'astronomi', 'uzay'],
    facts: 'Ay’ın görünen ışığı yansıttığı Güneş ışığıdır. Normal evrelerde Güneş’in aydınlattığı yarısının Dünya’dan görünen oranı değişir. Ay evreleri Dünya’nın gölgesinden kaynaklanmaz; Dünya’nın gölgesi Ay tutulmasında rol oynar.',
  },
  {
    id: 'acs-reaction', title: 'Sirke ve karbonat tepkimesi', publisher: 'American Chemical Society', domain: 'chemistry',
    url: 'https://www.acs.org/middleschoolchemistry/lessonplans/chapter6/lesson2.html',
    keywords: ['sirke', 'karbonat', 'tepkime', 'reaksiyon', 'kimya', 'gaz', 'karbondioksit'],
    facts: 'Sirkenin asetik asidi ile sodyum bikarbonat tepkimesi karbondioksit, su ve sodyum asetat oluşturur. Ürün miktarı reaktan miktarına bağlıdır; bir reaktan tükenince diğerini eklemek tepkimeyi sınırsız artırmaz. Uygulama güvenliği ayrıca değerlendirilmelidir.',
  },
  {
    id: 'nist-si', title: 'Bilimde ölçüm ve SI birimleri', publisher: 'NIST', domain: 'physics',
    url: 'https://www.nist.gov/pml/owm/metric-si/si-units',
    keywords: ['ölç', 'birim', 'fizik', 'metre', 'kütle', 'kilogram', 'sıcaklık', 'kelvin', 'akım', 'ampere', 'saniye'],
    facts: 'SI’ın yedi temel birimi metre (uzunluk), kilogram (kütle), saniye (zaman), amper (elektrik akımı), kelvin (termodinamik sıcaklık), mol (madde miktarı) ve kandela (ışık şiddeti) olarak sıralanır. Sayısal sonuçlar birimleriyle birlikte verilmelidir.',
  },
  {
    id: 'google-ml', title: 'Makine öğrenmesi nedir?', publisher: 'Google Developers', domain: 'ai',
    url: 'https://developers.google.com/machine-learning/intro-to-ml/what-is-ml',
    keywords: ['yapay zeka', 'yapay zekâ', 'makine', 'öğrenme', 'model', 'veri', 'sınıflandır', 'algoritma', 'ai', 'ml'],
    facts: 'Makine öğrenmesi, veriden tahminler yapmak veya içerik üretmek için bir modelin eğitilmesidir. Gözetimli öğrenmede etiketli örnekler, gözetimsiz öğrenmede etiketlenmemiş veriler kullanılabilir. Üretken modeller öğrenilen örüntülerden yeni içerik üretir; çıktıyı bağımsız doğrulamak gerekir.',
  },
  {
    id: 'acs-colors', title: 'Kâğıt kromatografisi', publisher: 'American Chemical Society', domain: 'chemistry',
    url: 'https://www.acs.org/education/whatischemistry/adventures-in-chemistry/experiments/chromatography.html',
    keywords: ['kromatografi', 'boya', 'pigment', 'renk karışımı', 'filtre'],
    facts: 'Kâğıt kromatografisi bir karışımdaki bileşenleri ayırmaya yardımcı olur. Bileşenlerin su ve kâğıtla etkileşimleri ilerleme mesafelerini etkiler. Gıda boyasıyla yapılan gözlemde belirli renklerin ayrışması kullanılan karışıma bağlıdır; her boya için aynı sonucu vaat etme.',
  },
  {
    id: 'bridge-shape', title: 'Kâğıt köprülerde biçim ve yük', publisher: 'Science Buddies', domain: 'physics',
    url: 'https://www.sciencebuddies.org/stem-activities/build-best-bridge',
    keywords: ['köprü', 'kağıt', 'kâğıt', 'katlama', 'yük taşı', 'destek aralığı'],
    facts: 'Kâğıt köprünün geometrisi eğilmeye ve yük taşımaya karşı davranışını etkiler. Biçimleri karşılaştırırken kâğıt türü, destek aralığı ve yükleme yöntemi sabit tutulmalıdır. Bir şeklin tüm koşullarda en güçlü olduğunu iddia etme; sonuçları ölçüm ve tekrarlarla karşılaştır.',
  },
  {
    id: 'exploratorium-balance', title: 'Denge noktası ve ağırlık dağılımı', publisher: 'Exploratorium', domain: 'balance',
    url: 'https://annex.exploratorium.edu/xref/exhibits/center_of_gravity.html',
    keywords: ['denge', 'ağırlık merkezi', 'kütle dağılımı', 'destek noktası'],
    facts: 'Uzun ince bir nesne ağırlık merkezinin altından desteklendiğinde dengelenebilir. Ağırlığın eşit dağılmadığı nesnelerde bu nokta geometrik ortayla aynı olmak zorunda değildir. Bu basit düzenek, bütün cisimlerin her koşuldaki dengesini açıklayan bir kural olarak genellenmemelidir.',
  },
  {
    id: 'nasa-stars', title: 'Takımyıldızları ve gece göğü', publisher: 'NASA', domain: 'night',
    url: 'https://spaceplace.nasa.gov/constellations/en/',
    keywords: ['takımyıldız', 'takım yıldız', 'yıldız', 'gece göğü', 'gökyüzü'],
    facts: 'Görülebilen takımyıldızlar gözlem konumuna ve yılın zamanına bağlıdır. Takımyıldız desenlerindeki yıldızlar uzayda birbirine çizgilerle bağlı değildir ve aynı uzaklıkta bulunmak zorunda değildir. Yer ve tarih bilinmeden belirli bir desenin kesin görüleceğini söyleme.',
  },
  {
    id: 'kidbots', title: 'Komutlar, programlama ve hata ayıklama', publisher: 'CS Unplugged · University of Canterbury', domain: 'robotics',
    url: 'https://www.csunplugged.org/en/topics/kidbots/',
    keywords: ['robot', 'komut', 'programlama', 'kodlama', 'hata ayıkla', 'algoritma'],
    facts: 'Programlama; planlama, komut yazma, çalıştırma, hataları bulma ve düzeltme adımlarını içerebilir. Farklı rollerle komut dizisi oyunları bu süreçleri görünür kılar. Kâğıt üstünde komut uygulamak gerçek bir fiziksel robot veya makine öğrenmesi modeli çalıştırmak değildir.',
  },
  {
    id: 'ilkyar-official', title: 'İLKYAR resmi tanıtımı', publisher: 'İLKYAR', domain: 'ilkyar',
    url: 'https://ilkyar.org.tr/tanitim/',
    keywords: ['ilkyar', 'vakıf', 'gönüllülük', 'yatılı bölge okulu', 'köy okulu'],
    facts: 'İLKYAR resmi tanıtımında 1998 yılında kurulmuş olduğunu ve köy okulları ile yatılı bölge okullarına yönelik gönüllü eğitim çalışmalarını anlatır. Güncel proje sayısı, program tarihi, etki sonucu veya bu uygulama için kurumsal onay çıkarımı yapma.',
  },
  {
    id: 'amnh-microbes', title: 'Mikroorganizmalar hakkında temel bilgiler', publisher: 'American Museum of Natural History', domain: 'microbiology',
    url: 'https://www.amnh.org/explore/microbe-facts',
    keywords: ['mikrop', 'mikroorganizma', 'mikrobiyoloji', 'mikroskop', 'bakteri', 'arke', 'göremediğimiz'],
    facts: 'Mikroorganizmalar mikroskop olmadan görülemeyecek kadar küçük olabilir. Bakteriler, arkeler ve mikroskobik ökaryotlar bu kapsama girebilir; tüm mikroorganizmalar bakteri değildir. Hepsi zararlı değildir; yararlı ve nötr ilişkiler de vardır. Bir temas çizimi gerçek hastalık veya bulaşma olasılığını ölçmez.',
  },
];

export const DISCLAIMER = 'BALKIZ hata yapabilir. Bilimsel bilgiyi kaynaklardan kontrol et; deneyleri yaşa uygunluk ve güvenlik açısından bir öğretmenle değerlendir.';

export const SOURCES = [...LEGACY_SOURCES.map(source => ({ ...source, kind: source.id === 'ilkyar-official' ? 'institution' : 'reference', reviewed: '2026-10-05' })), ...SCIENCE_SOURCES];
export const REFERENCE_LIBRARY = [...SOURCES, ...GUIDES];
const rankSources = createRetriever(SOURCES.filter(source => source.kind !== 'institution')), rankGuides = createRetriever(GUIDES);
export function retrieveSources(text, domain = 'general') {
  return rankSources(text, domain).slice(0, 3).map(item => item.record);
}
export function retrieveKnowledge(text, domain = 'general', compact = false) {
  const guides = rankGuides(text, domain).filter(item => item.score >= 5).slice(0, 1).map(item => item.record);
  const scores = new Map(rankSources(text, domain).map(item => [item.record, item.score]));
  // An exact activity heading can lead to its physics/chemistry references even without scientific jargon.
  for (const guide of guides) for (const id of guide.sourceIds) {
    const source = SOURCES.find(item => item.id === id);
    if (source) scores.set(source, (scores.get(source) || 0) + 4);
  }
  const candidates = [...scores].sort((a, b) => b[1] - a[1]);
  const notes = [], sources = []; let used = 0;
  const budget = compact ? 1600 : 2400;
  for (const [source] of candidates) {
    if (sources.length >= (compact ? 3 : 4)) break;
    const note = JSON.stringify({ kind: source.kind, title: source.title, url: source.url, reviewed: source.reviewed, facts: source.facts });
    // Keep each reviewed statement complete, including its assumptions and caveats.
    if (used + note.length > budget) continue;
    notes.push(note); sources.push(source); used += note.length;
  }
  for (const guide of guides) {
    const note = JSON.stringify({ kind: 'guide', title: guide.title, goal: guide.goal.slice(0, 160), development: guide.development.slice(0, 300), scope: guide.scope, warning: guide.warning || '', url: guide.url });
    if (note.length <= 1100) { notes.push(note); sources.push(guide); }
  }
  return { sources, context: notes.join('\n') };
}

export function publicSource(source) {
  return { id: source.id, title: source.title, publisher: source.publisher, url: source.url, kind: source.kind, reviewed: source.reviewed || KNOWLEDGE_VERSION };
}
