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
