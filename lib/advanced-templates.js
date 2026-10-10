import { SOURCES } from './knowledge.js?v=2.2.0';
const drafts = [
  {
    id: 'pendulum-data', title: 'Sarkaçtan yerçekimi tahmini', domain: 'physics', age: '13–15', duration: 50,
    summary: 'Uzunluk–periyot verisinden grafik ve model kurun.', materials: 'PhET Sarkaç Laboratuvarı, ekran, kâğıt, kalem ve hesap makinesi.', sourceIds: ['pendulum', 'phet-pendulum', 'nist-si'],
    goal: 'Küçük açı modelini veriye uygulamak; T²–L grafiğinden g tahmin etmek ve model sınırlarını açıklamak.',
    flow: ['0–8 dk: T, L ve g’nin anlamlarını belirleyin; yalnızca uzunluğu değiştiren bir araştırma sorusu kurun.', '8–25 dk: PhET modelinde aynı küçük başlangıç açısı ve aynı yerçekimiyle en az beş uzunluğu karşılaştırın. Her uzunlukta 10 salınımın süresini kaydedip 10’a bölün; ölçümü üç kez tekrarlayın.', '25–40 dk: L (metre) ve T² (saniye kare) tablosundan grafik çizin. Yaklaşık eğim a için g ≈ 4π²/a bağıntısını kullanın; birimleri kontrol edin.', '40–50 dk: Başlangıç açısını büyüterek küçük açı yaklaşımının sınırını araştırın. Simülasyonun ayarlı g’siyle tahmini karşılaştırın; farkların nedenlerini yazın.'],
    depth: 'Eğim iki noktadan alındıysa bunun yaklaşık bir tahmin olduğunu belirtin. Tek ölçümden yüzde hassasiyet iddia etmeyin. Fiziksel sarkaçta askıdan kütle merkezine uzunluk ve kronometre tepki süresi ek belirsizlik yaratır.',
    safety: 'Bu taslak sanal ölçüm içindir. Sallanan ağır cisim, yüksek askı ve yüz hizasında ip düzeneği kurmayın. Ekranı ortak kullanın; internete erişim yoksa gönüllünün önceden aldığı veriyle çalışın.',
  },
  {
    id: 'malus-data', title: 'Polarizörle cos²θ modelini araştır', domain: 'physics', age: '16+', duration: 50,
    summary: 'Açı–ışık ilişkisini ölçün; ideal modelle gerçek kayıpları ayırın.', materials: 'İki eğitim polarizörü, soğuk LED ışık, açı ölçeği, ışık sensörü veya önceden hazırlanmış veri tablosu.', sourceIds: ['polarization', 'nist-si'],
    goal: 'Malus yasasını açıya bağlı bir model olarak kullanmak ve sensör/filtre sınırlarını tartışmak.',
    flow: ['0–10 dk: İlk polarizörden geçen ışık için θ = 0° durumunu referans alın. Sensörün sabit konumunu, ışık kaynağını ve ortam ışığını kaydedin.', '10–25 dk: İkinci filtreyi 0°, 15°, 30°, 45°, 60°, 75° ve 90° için karşılaştırın. Her ölçümü tekrarlayın; ışık kapalıyken arka planı kaydedin.', '25–40 dk: Arka plan çıkarılmış okumaları 0° değerine bölün. Normalize sinyal–cos²θ grafiği çizin; arka plan veya doygunlukla bozulmuş veriyi işaretleyin.', '40–50 dk: Üçüncü filtrenin uygun ara açıdaki etkisini önce tahmin edin, sonra karşılaştırın. Filtrelerin ideal olmamasının sonuçlara etkisini tartışın.'],
    depth: 'I0 ilk polarizörden sonraki referanstır. Sensörün doğrusal yanıt verdiği varsayılır; telefonun otomatik pozlamalı fotoğraf parlaklığı doğrudan ışık şiddeti değildir. Sayısal araç yoksa nitel gözlem yapın ve nicel uyum iddiası kurmayın.',
    safety: 'Lazer, Güneş, güçlü lamba ve gözlere doğrultulan ışık kullanmayın. Cihazlar düşük güçlü, kapalı eğitim araçları olsun. Sensör yoksa önceden hazırlanmış veriyle grafik çalışın.',
  },
  {
    id: 'acid-investigation', title: 'Asit kuvveti ile derişimi ayır', domain: 'chemistry', age: '13–15', duration: 45,
    summary: 'Kimyasal kullanmadan pH, iyonlaşma ve derişim ilişkisini inceleyin.', materials: 'PhET Asit–Baz Çözeltileri, ekran, tablo kâğıdı ve kalem.', sourceIds: ['iupac-ph', 'acid-strength', 'phet-acid'],
    goal: 'Asit kuvveti ve derişimi ayrı değişkenler olarak araştırıp gözlenen pH’ı açıklamak.',
    flow: ['0–8 dk: “Kuvvetli” ile “derişik” sözcüklerini ayrı tanımlayın; iki karşılaştırma tahmini yazın.', '8–20 dk: Simülasyonda aynı derişimde farklı asit kuvvetlerini karşılaştırın. Ayarları ve pH okumalarını tabloya kaydedin.', '20–32 dk: Asit kuvvetini sabit tutup derişimi değiştirin. pH değişiminin doğrusal bir ölçek olmadığını tartışın.', '32–45 dk: Farklı derişimlerde kuvvetli/zayıf asit karşılaştırması için bir soru tasarlayın. Sonucu simülasyonun model koşullarıyla sınırlı olarak açıklayın.'],
    depth: 'pH etkinlik üzerinden tanımlanır; seyreltik çözeltilerde derişim yaklaşımı kullanılır. Modelin seçtiği sıcaklık ve varsayımları belirtin. pH = 7’yi her sıcaklık için nötr değer, 0–14’ü evrensel sınır saymayın.',
    safety: 'Kimyasal karışım, gerçek asit/baz veya pH ölçer hazırlığı yoktur. Çevrimdışı kullanım için önce erişilebilirliğini kontrol edin; bağlantı yoksa gönüllünün önceden oluşturduğu tabloyu kullanın.',
  },
  {
    id: 'graph-routes', title: 'Bir rota, iki farklı matematik kuralı', domain: 'math', age: '13–15', duration: 45,
    summary: 'Euler ve Hamilton görevlerini aynı ağ üzerinde karşılaştırın.', materials: 'Kâğıt, büyük düğüm kartları ve renkli kalemler.', sourceIds: ['math-graphs'],
    goal: 'Kenarları bir kez geçme ile düğümleri bir kez ziyaret etme şartlarını ayırmak; karşı örnek ve gerekçe üretmek.',
    flow: ['0–8 dk: Küçük, bağlantılı, yönsüz bir ağ çizin; düğüm, kenar ve dereceyi işaretleyin.', '8–20 dk: Her kenarı tam bir kez kullanma görevini deneyin. Tek dereceli düğümleri sayarak başlangıç/bitiş tahmini yapın.', '20–32 dk: Aynı ağda her düğümü tam bir kez ziyaret etme görevini deneyin; başlangıca dönüş istenip istenmediğini açıkça belirleyin.', '32–45 dk: Bir kenarı ekleyip silerek Euler koşulunu değiştirin. Hamilton görevi için Euler derece kuralını otomatik kullanamayacağınız bir örnek tartışın.'],
    depth: 'Euler yolu için sıfır veya iki tek dereceli düğüm koşulunu bağlantılı yönsüz graflarda kullanın. Birkaç başarısız deneme Hamilton yolu yokluğunun ispatı değildir. Küçük ağlarda olası rotaları düzenli listeleyin.',
    safety: 'Yerde ip/koşu rotası kurmak yerine masa üstü çizim kullanın. Büyük kartlarla çalışın; hız yarışı ve çocukların performansını puanlama yapmayın.',
  },
  {
    id: 'ai-error-table', title: 'Bir sınıflandırıcının hata haritası', domain: 'ai', age: '13–15', duration: 45,
    summary: 'Yeni örnekler, hata tablosu ve veri dengesini birlikte inceleyin.', materials: 'Gönüllünün çizdiği nesne kartları, eğitim/test zarfları, kâğıt ve kalem.', sourceIds: ['google-ml', 'google-metrics', 'nist-genai'],
    goal: 'Örneklerden geliştirilen bir kuralı yeni örneklerle karşılaştırmak; hata türlerini ve veri kapsamını açıklamak.',
    flow: ['0–8 dk: Daire/diğer gibi iki açık sınıf seçin. Kişisel fotoğraf ve isim içermeyen örnekleri eğitim ve test olarak ayırın.', '8–20 dk: Eğitim kartlarından bir kural türetin. Test zarfını açmadan kuralı yazıp sabitleyin.', '20–32 dk: Test kartlarında gerçek sınıf ve tahmini ayrı kaydedin; doğru/yanlış sonuçları ikiye iki tabloda sayın.', '32–45 dk: Bir sınıfı azaltınca veya yalnızca tek renkte örnek verince ne olacağını araştırın. Kuralı güncellerseniz yeni test kartlarıyla karşılaştırın.'],
    depth: 'Bu elle yürütülen bir benzetmedir, gerçek bir makine öğrenmesi eğitimi değildir. Doğruluk = doğru tahmin / test örneği sayısı; az veya dengesiz örneklerde tek sayı yanıltıcı olabilir. Aynı test verisine sürekli uyarlama yeni verideki başarıyı göstermez.',
    safety: 'Çocukları, yüzlerini, seslerini, sağlık veya başarı bilgilerini sınıflandırmayın. Örnekler çizim ve nesne özelliklerinden oluşsun; internet veya yapay zekâ çağrısı gerekmez.',
  },
  {
    id: 'viscosity-data', title: 'Akış süresi: neyi gerçekten ölçüyoruz?', domain: 'table', age: '13–15', duration: 45,
    summary: 'Yoğunluk, viskozite ve ölçüm geometrisini ayıran araştırma taslağı.', materials: 'Gönüllünün önceden hazırladığı aynı kap/geometride su ve bitkisel yağ akış videoları, süre tablosu, kâğıt ve kalem.', sourceIds: ['viscosity', 'solutions', 'nist-si'],
    goal: 'Bir gözlemin hangi özelliğe kanıt olabileceğini tartışmak ve kontrollü bir ölçüm planı tasarlamak.',
    flow: ['0–8 dk: Yoğunluk, viskozite ve karışabilirlik için ayrı tahmin soruları yazın.', '8–22 dk: Eş hacim, aynı kap ve benzer sıcaklıktaki akış videolarından başlangıç/bitiş kuralıyla süre çıkarın; her koşul için tekrarları tabloya alın.', '22–35 dk: Ortalama süreleri ve aralıkları karşılaştırın. Kap veya sıcaklık değişseydi karşılaştırmanın nasıl etkilenebileceğini tartışın.', '35–45 dk: Yeni bir kontrollü araştırma tasarlayın; yalnızca akış süresinden kesin viskozite değeri hesaplayamayacağınızı model varsayımlarıyla açıklayın.'],
    depth: 'Viskozite için nicel değer belirli bir ölçüm yöntemi ve geometri gerektirir. Akış süresi karşılaştırması tek başına yoğunluk veya karışabilirliği ölçmez. Grafik eksenlerine koşulu, süreyi ve birimleri yazın.',
    safety: 'Bu taslak önceden hazırlanmış veri/video kullanır. Sıvı ısıtma, cam tüp, şırınga veya tüketme yoktur. Yeni fiziksel düzenek öğretmen tarafından ayrıca planlanmalı; yağ döküntüsü kayma riskidir.',
  },
];
export const ADVANCED_TEMPLATES = drafts.map(draft => ({ ...draft, difficulty: 'advanced', content: `## ${draft.title}\n**İleri düzey taslak · ${draft.age} yaş · ${draft.duration} dakika**\n\n### Öğrenme hedefi\n${draft.goal}\n\n### Malzemeler ve görevler\n${draft.materials} Gruplarda ölçen, kaydeden, kontrol eden ve anlatan rollerini dönüşümlü kullanın.\n\n### Akış\n${draft.flow.map((step, i) => `${i + 1}. ${step}`).join('\n')}\n\n### Model, birimler ve belirsizlik\n${draft.depth}\n\n### Yeni keşif görevi\nGrup, bir sonraki denemede değiştireceği tek koşulu ve beklediği sonucu gerekçesiyle yazsın.\n\n### Güvenlik ve kontrol\n${draft.safety} Öğretmen yaş, önbilgi, erişilebilirlik ve ortam koşullarını uygulamadan önce değerlendirsin.\n\n### Başvuru kaynakları\n${SOURCES.filter(source => draft.sourceIds.includes(source.id)).map(source => `- [${source.publisher} · ${source.title}](${source.url})`).join('\n')}\n\n*Düzenlenebilir geliştirme önerisi; hazır taslağı açmak yapay zekâ kotası kullanmaz. Dış kaynak ve simülasyonları açmak internet gerektirebilir.*` }));
