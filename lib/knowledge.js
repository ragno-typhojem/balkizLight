// Small reviewed reference notes, not a live web search or a fact-checking service.
export const KNOWLEDGE_VERSION = '2026-10-05';
export const SOURCES = [
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
];

export const DISCLAIMER = 'BALKIZ hata yapabilir. Bilimsel bilgiyi kaynaklardan kontrol et; deneyleri yaşa uygunluk ve güvenlik açısından bir öğretmenle değerlendir.';

export function normalize(text) {
  return String(text).toLocaleLowerCase('tr-TR').normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/ı/g, 'i');
}

export function retrieveSources(text, domain = 'general') {
  const query = normalize(text);
  const words = new Set(query.split(/[^\p{L}\p{N}]+/u));
  return SOURCES.map(source => {
    const hits = source.keywords.reduce((n, keyword) => {
      const key = normalize(keyword);
      return n + (key.length <= 3 ? Number(words.has(key)) : Number(query.includes(key)));
    }, 0);
    return { source, score: hits };
  }).filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score || Number(b.source.domain === domain) - Number(a.source.domain === domain))
    .slice(0, 3).map(item => item.source);
}

export function publicSource(source) {
  return { id: source.id, title: source.title, publisher: source.publisher, url: source.url, reviewed: KNOWLEDGE_VERSION };
}
