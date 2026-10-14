// Curated on 2026-10-14; proposals are not measured results or application approvals.
export const ENRICHED_EXPERIMENTS = [
  {
    "id": "precipitate-control",
    "title": "İki berrak çözeltiden katı oluşması",
    "domain": "chemistry",
    "materials": [
      "calcium",
      "bicarbonate",
      "water",
      "cups",
      "dropper",
      "goggles"
    ],
    "question": "Bulanıklığın nedeni karışma mı, yeni bir katı oluşması mı?",
    "steps": [
      "Öğretmen ACS dersinin kalsiyum klorür–bikarbonat bölümüne ve ürün etiketine göre çözeltileri hazırlasın; farklı reaktif gösterilerini eklemeyin.",
      "Açık kapta su–su, reaktif–su kontrollerini aynı gözlem koşulunda karşılaştırın.",
      "Yalnız tanımlı iki çözeltinin karışımını açık kapta gözlemleyin; köpürme, bulanıklık ve çökelmeyi ayrı kaydedin."
    ],
    "principle": "Yeni katı çökelmesi ile gaz oluşumu farklı kanıtlardır; tek görsel kimlik tayini değildir.",
    "variation": "Bulanıklığı sabit ışık altında zamana göre izleyip çökelme ile süspansiyonu ayır.",
    "sourceId": "acs-precipitate-safe",
    "controls": "Çözelti partisi/hacmi, kap ve ışık sabit; su kontrolü.",
    "measure": "Saniye ve önceden tanımlanmış bulanıklık kategorisi.",
    "timing": "20–40 dakika; ön deneme gerekir.",
    "minAge": 13,
    "depth": "Önce mekanizmaya dayalı tahmin kur; ölçüm çözünürlüğünü ve alternatif açıklamayı yaz. Tek koşulu değiştir; sonuç çıkmazsa kurulum/kör ölçüm kontrolüne dön."
  },
  {
    "id": "solution-calorimetry",
    "title": "Çözünme ısısında kap kaybını ölçmek",
    "domain": "chemistry",
    "materials": [
      "calcium",
      "water",
      "cups",
      "thermometer",
      "scale",
      "goggles"
    ],
    "question": "Aynı kimyasal süreçte ölçülen sıcaklık artışı kap değişince neden farklı?",
    "steps": [
      "Öğretmen ACS yöntemine uygun, miktarı ve hidrat formu kayıtlı eğitim örneklerini hazırlasın.",
      "Açık iki ölçü kabında başlangıç sıcaklığını eşitleyin; boş su kontrolünün eğrisini kaydedin.",
      "Öğretmen gözetiminde aynı tanımlı çözünme işlemini iki kap türünde izleyin; sıcaklığı eşit aralıklarla kaydedin."
    ],
    "principle": "Çözünme ile çevreye ısı aktarımı birlikte ölçülür; kap da enerji alır.",
    "variation": "Ham sıcaklık eğrisi ile kayıp varsayımı düzeltilmiş modeli karşılaştır; bilinmeyen entalpi uydurma.",
    "sourceId": "acs-thermal-change",
    "controls": "Madde/su miktarı, başlangıç sıcaklığı ve karıştırma sabit; yalnız kap tipi değişir.",
    "measure": "Sıcaklık °C, zaman s; termometre gecikmesi ve oda sıcaklığı.",
    "timing": "30–45 dakika; öğretmen reaktif hazırlığını önceden yapar.",
    "minAge": 13,
    "depth": "Önce mekanizmaya dayalı tahmin kur; ölçüm çözünürlüğünü ve alternatif açıklamayı yaz. Tek koşulu değiştir; sonuç çıkmazsa kurulum/kör ölçüm kontrolüne dön."
  },
  {
    "id": "glow-rate",
    "title": "Işıldama hızını ışık ömründen ayırmak",
    "domain": "chemistry",
    "materials": [
      "glow-sticks",
      "water",
      "cups",
      "thermometer",
      "timer",
      "goggles"
    ],
    "question": "Daha parlak ışıldayan çubuk daha uzun süre mi ışıldar?",
    "steps": [
      "Aynı marka/boyuttaki kapalı ve sağlam ürünleri seçin; etiket sıcaklık sınırına uyun.",
      "Eşzamanlı başlatılmış çubukları serin ve ılık su koşullarında karşılaştırın; çubukları açmayın.",
      "Sabit mesafe/aydınlatmada parlaklığı kategoriyle kaydedin; uzun süreli takip için sonraki gözlemi planlayın."
    ],
    "principle": "Sıcaklık tepkime hızını değiştirebilir; anlık parlaklık toplam üretilen ışık değildir.",
    "variation": "İlk parlaklık ile zamana bağlı sönmenin ayrı grafiklerini kur.",
    "sourceId": "acs-rate-light",
    "controls": "Marka, aktivasyon anı, kamera ayarı ve gözlem mesafesi sabit.",
    "measure": "Sıcaklık °C; zaman dakika; sabit ayarlı göreli parlaklık.",
    "timing": "İlk gözlem 20 dakika; ömür takibi saatlere uzayabilir.",
    "minAge": 13,
    "depth": "Önce mekanizmaya dayalı tahmin kur; ölçüm çözünürlüğünü ve alternatif açıklamayı yaz. Tek koşulu değiştir; sonuç çıkmazsa kurulum/kör ölçüm kontrolüne dön."
  },
  {
    "id": "freezing-curve",
    "title": "Buz–tuz karışımında sıcaklık eğrisi",
    "domain": "chemistry",
    "materials": [
      "salt",
      "ice",
      "cups",
      "thermometer",
      "scale",
      "timer"
    ],
    "question": "Tuz eklenen buzun sıcaklık eğrisi saf buzla aynı mı?",
    "steps": [
      "Soğuk teması önleyen öğretmen açık kaplarda aynı buz/su başlangıcını kurar.",
      "Bir kontrolü tuzsuz tutun; diğerinde öğretmenin kayıtlı tuz koşulunu kullanın.",
      "Termometreyi aynı konumda tutup sıcaklık-zaman eğrisi ve kalan buz görünümünü kaydedin."
    ],
    "principle": "Koligatif etki ve ısı alışverişi birlikte rol oynar; minimum sıcaklık kesin donma noktası değildir.",
    "variation": "Molalite ile ideal tahmin oluştur; aşırı soğuma ve çevre kaybının sınırlılıklarını tartış.",
    "sourceId": "colligative-freezing",
    "controls": "Buz/su miktarı, tuz kimliği, kap ve ortam sabit.",
    "measure": "°C, s, tuz kütlesi g; zaman eğrisi.",
    "timing": "30–45 dakika; soğuk yanığına karşı çıplak el teması yok.",
    "minAge": 13,
    "depth": "Önce mekanizmaya dayalı tahmin kur; ölçüm çözünürlüğünü ve alternatif açıklamayı yaz. Tek koşulu değiştir; sonuç çıkmazsa kurulum/kör ölçüm kontrolüne dön."
  },
  {
    "id": "galvanic-surfaces",
    "title": "Bakır–çinko hücrede yüzey ve gerilim",
    "domain": "chemistry",
    "materials": [
      "electrodes",
      "multimeter",
      "salt",
      "water",
      "cups",
      "goggles"
    ],
    "question": "Gerilim değişimi yalnız metal türüne mi bağlı?",
    "steps": [
      "Öğretmenin düşük gerilimli eğitim seti yönergesini kullanın; gerçek Cu/Zn elektrotları PCB levhadan ayırın.",
      "Aynı elektrolitte geometrisi sabit elektrotların açık devre gerilimini multimetrenin voltaj girişinde ölçün.",
      "Standart yüzey hazırlığını tekrar ederek okumanın kararlılığını izleyin; kısa devre veya dış güç uygulamayın."
    ],
    "principle": "Açık devre gerilimi ile akım/enerji kapasitesi ayrı büyüklüklerdir; standart Daniell modeliyle birebir eşitleme.",
    "variation": "Yüzeyin ölçüm tekrarlanabilirliğini inceleyip derişim değişimini ayrı bir seride ele al.",
    "sourceId": "galvanic-cell",
    "controls": "Elektrot aralığı/daldırma alanı, elektrolit, sıcaklık sabit.",
    "measure": "mV veya V; aynı bekleme süreli en az üç okuma.",
    "timing": "30–45 dakika; metal atıkları öğretmen tarafından toplanır.",
    "minAge": 13,
    "depth": "Önce mekanizmaya dayalı tahmin kur; ölçüm çözünürlüğünü ve alternatif açıklamayı yaz. Tek koşulu değiştir; sonuç çıkmazsa kurulum/kör ölçüm kontrolüne dön."
  },
  {
    "id": "corrosion-map",
    "title": "Pas araştırmasında tuz ve nemi ayırmak",
    "domain": "chemistry",
    "materials": [
      "steel-washers",
      "salt",
      "water",
      "cups",
      "timer"
    ],
    "question": "Suya tuz eklemek demir yüzeyindeki değişimi nasıl etkiler?",
    "steps": [
      "Aynı partiden kör kenarlı eğitim numuneleriyle kuru, su ve kayıtlı tuzlu su koşullarını ayrı açık kaplarda kurun.",
      "Öğretmen sabit aralıkta, aynı ışık/açıda numuneleri görüntüler; kişisel veri çekilmez.",
      "Yüzeyde değişen alanı önceden tanımlı çizelgede puanlayın; renk değişimini kimyasal analiz saymayın."
    ],
    "principle": "Korozyon elektrokimyasal çevre koşullarına bağlıdır; fotoğraf tek başına ürün kimliği değildir.",
    "variation": "Kaplama etkisini ayrı bir seriyle sınayıp nem ile tuzluluğu aynı anda değiştirmemeyi tartış.",
    "sourceId": "corrosion-controls",
    "controls": "Metal alanı/kaplama, kap, ışık ve başlangıç yüzeyi sabit.",
    "measure": "Gün, değişen görünür alan yüzdesi (görsel tahmin).",
    "timing": "Kurulum 25 dakika; izleme birkaç gün; paslı örnekler dağıtılmaz.",
    "minAge": 13,
    "depth": "Önce mekanizmaya dayalı tahmin kur; ölçüm çözünürlüğünü ve alternatif açıklamayı yaz. Tek koşulu değiştir; sonuç çıkmazsa kurulum/kör ölçüm kontrolüne dön."
  },
  {
    "id": "crystal-growth",
    "title": "Magnezyum sülfatta çekirdeklenme günlüğü",
    "domain": "chemistry",
    "materials": [
      "magnesium-sulfate",
      "water",
      "cups",
      "timer",
      "ruler",
      "goggles"
    ],
    "question": "Aynı başlangıç örneğinde görülen kristaller aynı hızda mı büyür?",
    "steps": [
      "Öğretmen tanımlı eğitim yönergesine ve ürün hidrat etiketine göre açık kap numunelerini hazırlar; ısıtma çocuklara verilmez.",
      "Eş numuneleri aynı ortamda açık kapta öğretmen erişiminde bırakın; kap kütlesi ve fotoğraf zamanını kaydedin.",
      "Görünür kristal boyutlarını cetvelle izleyin; kristal görülmezse doygunluk ve buharlaşma koşullarını kontrol edin."
    ],
    "principle": "Kristal büyümesi aşırı doygunluk ve çekirdeklenmeye bağlıdır; her koşulda aynı kristal vaat edilmez.",
    "variation": "Aynı yöntemle farklı yüzeylerde çekirdek sayısını incele; hız/çözünürlük ayrımını koru.",
    "sourceId": "solubility",
    "controls": "Başlangıç çözeltisi, hidrat formu, kap alanı ve sıcaklık sabit.",
    "measure": "Gün, görünür boy mm, kap kütlesi g.",
    "timing": "Kurulum 20 dakika; birkaç gün izleme; numuneler tüketilmez.",
    "minAge": 13,
    "depth": "Önce mekanizmaya dayalı tahmin kur; ölçüm çözünürlüğünü ve alternatif açıklamayı yaz. Tek koşulu değiştir; sonuç çıkmazsa kurulum/kör ölçüm kontrolüne dön."
  },
  {
    "id": "density-standard",
    "title": "Yoğunlukla kör çözelti karşılaştırması",
    "domain": "chemistry",
    "materials": [
      "salt",
      "water",
      "scale",
      "measure-cup",
      "cups"
    ],
    "question": "Kütle/hacim ölçümü etiketli çözeltileri ayırabilir mi?",
    "steps": [
      "Öğretmen kayıtlı tuz serisini hazırlar ve boş kapları tartar.",
      "Aynı sıcaklıkta bilinen hacimleri tartın; kap kütlesini çıkarın.",
      "Kör kodlanmış aynı seriden örnekleri yalnız kalibrasyon aralığında kıyaslayın; kimyasal kimlik tanısı yapmayın."
    ],
    "principle": "Yoğunluk kütle/hacimdir; derişim tahmini seçilen madde/sıcaklık için kalibre edilir.",
    "variation": "Doğrusal uyum ile aralık dışı tahminin riskini karşılaştır.",
    "sourceId": "acs-volume-density",
    "controls": "Tuz kimliği, hacim, sıcaklık, kap darası sabit.",
    "measure": "g, mL, g/mL; terazi çözünürlüğü ve hacim okuması.",
    "timing": "30–40 dakika.",
    "minAge": 13,
    "depth": "Önce mekanizmaya dayalı tahmin kur; ölçüm çözünürlüğünü ve alternatif açıklamayı yaz. Tek koşulu değiştir; sonuç çıkmazsa kurulum/kör ölçüm kontrolüne dön."
  },
  {
    "id": "ionic-mixture",
    "title": "İletkenlikten iyon kimliği çıkarılır mı?",
    "domain": "chemistry",
    "materials": [
      "conductivity-meter",
      "salt",
      "citrate",
      "magnesium-sulfate",
      "water",
      "cups",
      "goggles"
    ],
    "question": "Aynı iletkenliği veren iki çözelti aynı madde mi?",
    "steps": [
      "Öğretmen etiketli eğitim çözeltilerini ve ölçerin kalibrasyon/durulama yönergesini kontrol eder.",
      "Aynı sıcaklıkta ayrı kodlanmış çözeltilerin iletkenliğini ve su kontrolünü ölçün.",
      "Yakın okumalar veren örneklerin kimlik ve derişiminin mutlaka aynı olmadığını tartışın; karışımları analiz diye tanımayın."
    ],
    "principle": "İletkenlik iyon yoğunluğu, hareketliliği ve sıcaklığa bağlıdır; EC kimyasal kimlik ya da içilebilirlik sertifikası değildir.",
    "variation": "Derişim ve iyon türünü ayrı serilerde değiştirip tek ölçümle kimlik çıkarımını sınırla.",
    "sourceId": "electrolytes",
    "controls": "Sıcaklık, sensör derinliği, durulama ve ölçüm bekleme süresi sabit.",
    "measure": "µS/cm veya mS/cm, °C; cihaz kalibrasyon aralığı.",
    "timing": "30–40 dakika.",
    "minAge": 13,
    "depth": "Önce mekanizmaya dayalı tahmin kur; ölçüm çözünürlüğünü ve alternatif açıklamayı yaz. Tek koşulu değiştir; sonuç çıkmazsa kurulum/kör ölçüm kontrolüne dön."
  },
  {
    "id": "chrom-ratio",
    "title": "Kromatografide Rf ve çözücü cephesi",
    "domain": "chemistry",
    "materials": [
      "filter",
      "marker",
      "water",
      "ruler",
      "pencil",
      "cups"
    ],
    "question": "Bant mesafesini ölçmek mi, cepheye oranlamak mı daha karşılaştırılabilir?",
    "steps": [
      "Aynı su bazlı kalemin noktalarını aynı filtreye başlangıç çizgisi su üstünde kalacak biçimde koyun.",
      "Su cephesini zamanında işaretleyin; bandın ve cephenin başlangıca mesafesini ölçün.",
      "Rf oranını hesaplayıp aynı kâğıt/kalemde tekrar edin; bant yoksa kalemin suda çözünürlüğünü kontrol edin."
    ],
    "principle": "Rf oranı aynı kromatografi koşullarında karşılaştırılır; her renk saf bir bileşiği kanıtlamaz.",
    "variation": "Kâğıt türünü ayrı seride değiştir; su yerine yanıcı çözücü kullanma.",
    "sourceId": "acs-paper-chrom",
    "controls": "Kâğıt, kalem, su ve başlangıç nokta miktarı sabit.",
    "measure": "mm, Rf = bant mesafesi / cephe mesafesi; birimsiz.",
    "timing": "30–45 dakika.",
    "minAge": 13,
    "depth": "Önce mekanizmaya dayalı tahmin kur; ölçüm çözünürlüğünü ve alternatif açıklamayı yaz. Tek koşulu değiştir; sonuç çıkmazsa kurulum/kör ölçüm kontrolüne dön."
  },
  {
    "id": "droplet-calibration",
    "title": "Damlalık ölçümü neden önce kalibre edilir?",
    "domain": "chemistry",
    "materials": [
      "dropper",
      "water",
      "scale",
      "cups"
    ],
    "question": "Damlalıkta sayılan damlalar güvenilir hacim ölçüsü mü?",
    "steps": [
      "Aynı damlalıkla eşit damla sayısını üç kez ayrı kaplara aktarın; yalnız su kullanın.",
      "Dara alınmış kapta su kütlesini ölçün; çözünürlük yetmezse damla sayısını artırın.",
      "Tutuş açısını ayrı bir seriyle değiştirip ortalama ve saçılmayı karşılaştırın."
    ],
    "principle": "Damla büyüklüğü uç, tutuş ve sıvıyla değişebilir; su kalibrasyonu tüm reaktiflere genellenmez.",
    "variation": "Eş sayıda damla yerine tartımla miktar sabitlemenin hata payını tartış.",
    "sourceId": "uncertainty-instrument",
    "controls": "Sıvı, damlalık, tutuş ve damla sayısı sabit.",
    "measure": "g / damla; hacme dönüşümde sıcaklık/yoğunluk varsayımı.",
    "timing": "20–30 dakika.",
    "minAge": 13,
    "depth": "Önce mekanizmaya dayalı tahmin kur; ölçüm çözünürlüğünü ve alternatif açıklamayı yaz. Tek koşulu değiştir; sonuç çıkmazsa kurulum/kör ölçüm kontrolüne dön."
  },
  {
    "id": "gel-swelling",
    "title": "Aljinat ağında şişme ve şekil kararlılığı",
    "domain": "chemistry",
    "materials": [
      "gel-kit",
      "water",
      "cups",
      "ruler",
      "goggles"
    ],
    "question": "Aynı jel ağı farklı bekleme koşullarında aynı boyutta kalır mı?",
    "steps": [
      "Öğretmenin ürün yönergesiyle hazırladığı boyasız eş jel örneklerini seçin.",
      "Bir başlangıç örneğini fotoğraf/cetvelle kaydedip tanımlı eğitim koşullarında bekletin.",
      "Şekil değişimi ve görünen boyutu ayrı kaydedin; gözlem ile çapraz bağ yoğunluğu çıkarımını ayırın."
    ],
    "principle": "Su alımı ve polimer ağı birlikte etkilidir; tek boyut ölçümü ağ yapısını doğrudan vermez.",
    "variation": "Aynı partide hacim yaklaşımı ile deformasyon ölçümünü karşılaştır.",
    "sourceId": "alginate-rheology",
    "controls": "Jel partisi, başlangıç boyutu, sıcaklık ve bekleme süresi sabit.",
    "measure": "mm, boyut oranı, dakika; aynı ölçüm yükü.",
    "timing": "Kurulum 30 dakika; bekleme birkaç saate uzayabilir.",
    "minAge": 13,
    "depth": "Önce mekanizmaya dayalı tahmin kur; ölçüm çözünürlüğünü ve alternatif açıklamayı yaz. Tek koşulu değiştir; sonuç çıkmazsa kurulum/kör ölçüm kontrolüne dön."
  },
  {
    "id": "three-polarizers",
    "title": "Üçüncü filtre ışığı neden geri getirir?",
    "domain": "physics",
    "materials": [
      "polarizers",
      "led",
      "light-meter",
      "protractor"
    ],
    "question": "İki dik filtre arasına açılı bir filtre koyunca ışık nasıl değişir?",
    "steps": [
      "Üç doğrusal filtre sağlayın; LED ve ölçeri sabit mesafeye kurun.",
      "İlk/son filtreyi yaklaşık dik tutup araya üçüncüyü farklı açılarla yerleştirin.",
      "Arka plan okumalarını çıkarıp göreli ışığı kaydedin; ideal tam kararma beklemeyin."
    ],
    "principle": "İdeal doğrusal filtreler için ardışık Malus çarpanları geçerlidir; polarizasyon duvarda fiziksel delik değildir.",
    "variation": "İdeal I/I0 = cos²(θ) cos²(90°−θ) modeliyle ofsetli ölçümü karşılaştır.",
    "sourceId": "polarization",
    "controls": "LED, sensör yönü, ilk/son açı ve ortam ışığı sabit.",
    "measure": "Derece, göreli ışık veya lux; sensör doygunluğu.",
    "timing": "25–40 dakika.",
    "minAge": 13,
    "depth": "Önce mekanizmaya dayalı tahmin kur; ölçüm çözünürlüğünü ve alternatif açıklamayı yaz. Tek koşulu değiştir; sonuç çıkmazsa kurulum/kör ölçüm kontrolüne dön."
  },
  {
    "id": "refraction-path",
    "title": "Su içindeki ışık yolundan kırılma modeli",
    "domain": "physics",
    "materials": [
      "led",
      "cups",
      "water",
      "protractor",
      "paper"
    ],
    "question": "Görünür yön değişimi hangi açıda daha belirgin?",
    "steps": [
      "Öğretmenin LED kullanan kırılmaya dayanıklı optik eğitim düzeneğini hazırlayın.",
      "Açıları yüzey normaline göre işaretleyin; ortam ve ışık yolunu çizimle izleyin.",
      "Aynı geometriyi tekrarlayın; sıradan bardak eğrisinin Snell ölçümüne ek etkisini belirtin."
    ],
    "principle": "Kırılma açıları normalden ölçülür; bardakla kayma gözlemi düz arayüz ölçümünün yerine geçmez.",
    "variation": "Düz yüzeyli eğitim kabında sinüs oranını araştır; lazer ve Güneş kullanılmaz.",
    "sourceId": "refraction",
    "controls": "Ortam, arayüz biçimi, ışık kaynağı ve çizim ölçeği sabit.",
    "measure": "Derece; sin(i)/sin(r), boyutsuz; çizgi kalınlığı.",
    "timing": "30–40 dakika.",
    "minAge": 13,
    "depth": "Önce mekanizmaya dayalı tahmin kur; ölçüm çözünürlüğünü ve alternatif açıklamayı yaz. Tek koşulu değiştir; sonuç çıkmazsa kurulum/kör ölçüm kontrolüne dön."
  },
  {
    "id": "inertia-design",
    "title": "Yuvarlanmada dönme eylemsizliği",
    "domain": "physics",
    "materials": [
      "toy-car",
      "cardboard",
      "ruler",
      "timer"
    ],
    "question": "Aynı yük farklı yere konunca aynı araç neden farklı hareket eder?",
    "steps": [
      "Alçak rampada güvenli, yuvarlak kenarlı oyuncak düzeneği ve sabit bitiş çizgisini hazırlayın.",
      "Üreticiye uygun sabitlenmiş eş yükü farklı konumlarla karşılaştırın; hareketli parçalara el sokmayın.",
      "Başlangıçta itmeden bırakın; zaman ile kayma/yuvarlanma farkını kaydedin."
    ],
    "principle": "Kütle dağılımı, teker eylemsizliği, sürtünme ve yükün yerleşimi birlikte etkileyebilir; tek neden ilan edilmez.",
    "variation": "Kayma olup olmadığını videonun yalnız düzeneği gösteren kareleriyle incele.",
    "sourceId": "angular-momentum",
    "controls": "Toplam yük, rampa, araç ve başlangıç noktası sabit.",
    "measure": "Mesafe cm, süre s, en az üç bırakma.",
    "timing": "30–40 dakika.",
    "minAge": 13,
    "depth": "Önce mekanizmaya dayalı tahmin kur; ölçüm çözünürlüğünü ve alternatif açıklamayı yaz. Tek koşulu değiştir; sonuç çıkmazsa kurulum/kör ölçüm kontrolüne dön."
  },
  {
    "id": "sound-beats",
    "title": "Yakın frekanslarda vuru ve ses tonu",
    "domain": "music",
    "materials": [
      "tuning-fork",
      "computer",
      "timer"
    ],
    "question": "İki yakın frekans birlikte nasıl dalgalanan bir ses oluşturur?",
    "steps": [
      "Düşük sesli iki yakın frekansın hazır eğitim sesini ya da etiketli diyapazon setini kullanın.",
      "Tek ve birlikte sesi karşılaştırıp duyulan şiddet dalgalanmasını sayın.",
      "Kulak dibinde ses üretmeden zaman aralığındaki dalgalanma sıklığını tahmin edin."
    ],
    "principle": "İdeal iki yakın frekansta vuru sıklığı farkın mutlak değeridir; ses şiddeti ses tonuyla aynı değildir.",
    "variation": "Kayıtlı frekans farkı tahminiyle kulaktan sayılan değeri karşılaştır.",
    "sourceId": "sound-speed",
    "controls": "Ses düzeyi, mesafe, iki frekans ve sayma aralığı sabit.",
    "measure": "Hz, dalgalanma sayısı / s; güvenli ses düzeyi.",
    "timing": "20–30 dakika.",
    "minAge": 13,
    "depth": "Önce mekanizmaya dayalı tahmin kur; ölçüm çözünürlüğünü ve alternatif açıklamayı yaz. Tek koşulu değiştir; sonuç çıkmazsa kurulum/kör ölçüm kontrolüne dön."
  },
  {
    "id": "sound-envelope",
    "title": "Aynı nota farklı tını",
    "domain": "music",
    "materials": [
      "computer",
      "cards"
    ],
    "question": "Aynı temel frekansta çalınan iki araç neden farklı duyulur?",
    "steps": [
      "Önceden indirilmiş, kullanım izni uygun kısa ses örnekleriyle aynı notayı seçin.",
      "Ses seviyesini eşitleyip kimliği gizli örnekleri dinletin; dinlemek istemeyene çizim görevi verin.",
      "Atak, sönüm ve harmonik görünümünü çevrimdışı analiz ekranıyla karşılaştırın."
    ],
    "principle": "Tını harmonikler ve zamana bağlı zarfla ilişkilidir; tek spektrum tüm algıyı açıklamaz.",
    "variation": "Başlangıç bölümünü kesince tanıma nasıl değişir sorusunu yeni bir karşılaştırmada dene.",
    "sourceId": "air-modes",
    "controls": "Nota, kayıt süresi, ses düzeyi ve dinleme düzeni sabit.",
    "measure": "Hz, zaman s; kişisel veri içermeyen örnek etiketleri.",
    "timing": "25–40 dakika.",
    "minAge": 13,
    "depth": "Önce mekanizmaya dayalı tahmin kur; ölçüm çözünürlüğünü ve alternatif açıklamayı yaz. Tek koşulu değiştir; sonuç çıkmazsa kurulum/kör ölçüm kontrolüne dön."
  },
  {
    "id": "transit-noise",
    "title": "Gezegen geçişinde gürültü ve örnekleme",
    "domain": "astronomy",
    "materials": [
      "led",
      "ball",
      "light-meter",
      "ruler",
      "timer"
    ],
    "question": "Aynı geçiş farklı örnekleme hızında fark edilir mi?",
    "steps": [
      "LED yıldız modeli ve küçük örtücü cismin yolunu sabitleyin.",
      "Aynı geçişin ışık eğrisini sık ve seyrek zaman aralıklarıyla ölçün.",
      "Geçiş dışı arka planı çıkarın; gerçek yıldızın karmaşık yapısını bu modelden ölçtüğünüzü iddia etmeyin."
    ],
    "principle": "Geçiş derinliği ideal disk geometrisine bağlıdır; örnekleme ve gürültü olayın görünmesini etkiler.",
    "variation": "Aynı eğriyi alt örnekleyip küçük geçişi hangi koşulda kaçırdığını araştır.",
    "sourceId": "nasa-transit",
    "controls": "LED, örtücü çapı, yol, sensör konumu ve ortam ışığı sabit.",
    "measure": "Göreli ışık, s; geçiş içi/dışı oran.",
    "timing": "30–45 dakika.",
    "minAge": 13,
    "depth": "Önce mekanizmaya dayalı tahmin kur; ölçüm çözünürlüğünü ve alternatif açıklamayı yaz. Tek koşulu değiştir; sonuç çıkmazsa kurulum/kör ölçüm kontrolüne dön."
  },
  {
    "id": "sky-sampling",
    "title": "Gökyüzü gözleminde alan ve örnekleme",
    "domain": "night",
    "materials": [
      "cards",
      "ruler",
      "paper"
    ],
    "question": "Farklı büyüklükteki gökyüzü pencereleri karşılaştırılır mı?",
    "steps": [
      "Önceden kaydedilmiş aynı yıldız alanı resmini kâğıda basın; çıplak gözle Güneş gözlemi yok.",
      "Eş alanlı pencereleri rastgele seçip görünen nokta sayısını kaydedin.",
      "Pencere alanı değişince ham sayım yerine alan başına sıklığı karşılaştırın."
    ],
    "principle": "Resimdeki yıldız sayımı gerçek parlaklık/uzaklık ölçümü değildir; seçilen alan ve eşik sonuçta rol oynar.",
    "variation": "Eşik ve alan etkisini ayrı serilerde sınayarak ışık kirliliği gözlem tasarımına taşı.",
    "sourceId": "nasa-stars",
    "controls": "Görsel, algılama eşiği ve pencere alanı sabit.",
    "measure": "Nokta sayısı / cm²; seçilen pencere konumu.",
    "timing": "25–35 dakika.",
    "minAge": 9,
    "depth": "Önce mekanizmaya dayalı tahmin kur; ölçüm çözünürlüğünü ve alternatif açıklamayı yaz. Tek koşulu değiştir; sonuç çıkmazsa kurulum/kör ölçüm kontrolüne dön."
  },
  {
    "id": "graph-repair",
    "title": "Bir kenar değişirse Euler yolu bozulur mu?",
    "domain": "math",
    "materials": [
      "cards",
      "paper",
      "pencil"
    ],
    "question": "Bir ağda bütün kenarları bir kez geçen rota hangi değişiklikle bozulur?",
    "steps": [
      "Küçük bağlı yönsüz grafın düğüm ve kenarlarını farklı işaretlerle çizin.",
      "Her kenarı bir kez geçen yol arayın ve ziyaretleri kaydedin.",
      "Bir kenar ekleyip düğüm derecelerini yeniden sayın; köşeyi bir kez ziyaret etme koşuluyla karıştırmayın."
    ],
    "principle": "Bağlı yönsüz graf için tek dereceli düğümlerin sayısı Euler yolunun varlığına koşul koyar; Hamilton yolu farklıdır.",
    "variation": "Bir kenarla grafı tamir edip birden fazla geçerli rotayı karşılaştır.",
    "sourceId": "math-graphs",
    "controls": "Başlangıç grafı ve rota koşulu sabit; yalnız tek kenar değişir.",
    "measure": "Düğüm derecesi, kullanılan kenar sayısı; çözüm doğrulama çizelgesi.",
    "timing": "25–40 dakika.",
    "minAge": 9,
    "depth": "Önce mekanizmaya dayalı tahmin kur; ölçüm çözünürlüğünü ve alternatif açıklamayı yaz. Tek koşulu değiştir; sonuç çıkmazsa kurulum/kör ölçüm kontrolüne dön."
  },
  {
    "id": "sampling-fair",
    "title": "Örneklem seçimi ve tahmin yanlılığı",
    "domain": "math",
    "materials": [
      "cards",
      "color-cards",
      "paper",
      "pencil"
    ],
    "question": "Rahat ulaşılan kartlar bütünü temsil eder mi?",
    "steps": [
      "Kurgusal bir kart topluluğu ve gerçek kategori sayılarını öğretmen hazırlasın.",
      "Üstten alma ile karıştırıp rastgele alma stratejisini aynı örneklem büyüklüğünde karşılaştırın.",
      "Tahminleri bilinen toplamla kıyaslayın; hiçbir öğrenci hakkında veri toplamadan hata dağılımı çizin."
    ],
    "principle": "Kolay erişilen örneklem sistematik yanlılık gösterebilir; çok tekrar aynı yanlılığı kendiliğinden çözmez.",
    "variation": "Aynı bütçeyle örneklem büyüklüğü ve seçim yöntemini ayrı serilerde dene.",
    "sourceId": "statistics-design",
    "controls": "Evren, örneklem büyüklüğü ve tahmin kuralı sabit.",
    "measure": "Kategori oranı, yüzde puan hatası; bağımsız karıştırmalar.",
    "timing": "30–40 dakika.",
    "minAge": 13,
    "depth": "Önce mekanizmaya dayalı tahmin kur; ölçüm çözünürlüğünü ve alternatif açıklamayı yaz. Tek koşulu değiştir; sonuç çıkmazsa kurulum/kör ölçüm kontrolüne dön."
  },
  {
    "id": "ai-shift",
    "title": "Modelin alışmadığı veride sınanması",
    "domain": "ai",
    "materials": [
      "cards",
      "color-cards",
      "paper",
      "pencil"
    ],
    "question": "Aynı kural başka örnek dağılımında başarılı kalır mı?",
    "steps": [
      "Kurgusal şekil/renk kartlarını eğitim ve görülmemiş test gruplarına ayırın.",
      "Eğitimden bir sınıflandırma kuralı kurup farklı dağılımlı testte hataları sayın.",
      "Önce kuralı dondurun; test cevabını görüp değiştirmeyi ayrı geliştirme turu diye kaydedin."
    ],
    "principle": "Dağılım değişimi genellemeyi zorlayabilir; el ile kural oyunu gerçek LLM eğitimi değildir.",
    "variation": "Renk yerine şekle dayanan kuralı eş testte karşılaştır; desen etiketleriyle erişilebilirliği koru.",
    "sourceId": "ml-data-split",
    "controls": "Sınıf etiketi tanımı, test grubu ve hata sayma yöntemi sabit.",
    "measure": "Karışıklık tablosu ve sınıf bazında doğru/yanlış sayısı.",
    "timing": "30–40 dakika.",
    "minAge": 13,
    "depth": "Önce mekanizmaya dayalı tahmin kur; ölçüm çözünürlüğünü ve alternatif açıklamayı yaz. Tek koşulu değiştir; sonuç çıkmazsa kurulum/kör ölçüm kontrolüne dön."
  },
  {
    "id": "ai-uncertainty",
    "title": "Model ne zaman kararsız kalmalı?",
    "domain": "ai",
    "materials": [
      "cards",
      "paper",
      "pencil"
    ],
    "question": "Yanlış cevap vermekle karar vermemek aynı mı?",
    "steps": [
      "Kurgusal özellikli kartlar ve belirsiz örnekler hazırlayın; kişisel veri kullanmayın.",
      "Kurala göre karar ya da incelemeye gönder seçeneği tanımlayın.",
      "Eşiği değiştirip yanlış kararlar ve ertelenen kararları ayrı sayın."
    ],
    "principle": "Belirsizlik bildirimi doğruluk garantisi değildir; karar kapsamı ile hata oranı birlikte raporlanır.",
    "variation": "Hata maliyetleri farklıysa hangi eşik tercih edilir sorusunu küçük bir modelle tartış.",
    "sourceId": "google-metrics",
    "controls": "Kartlar, sınıf tanımı ve hata maliyeti sabit.",
    "measure": "Karar verilen örnek yüzdesi, hata sayısı ve inceleme sayısı.",
    "timing": "25–40 dakika.",
    "minAge": 13,
    "depth": "Önce mekanizmaya dayalı tahmin kur; ölçüm çözünürlüğünü ve alternatif açıklamayı yaz. Tek koşulu değiştir; sonuç çıkmazsa kurulum/kör ölçüm kontrolüne dön."
  },
  {
    "id": "sensor-hysteresis",
    "title": "Robot eşikte neden titrer?",
    "domain": "robotics",
    "materials": [
      "sensor-kit",
      "ruler",
      "cards"
    ],
    "question": "Gürültülü mesafe ölçümü robot kararını sürekli değiştirir mi?",
    "steps": [
      "Üreticiye uygun pilli eğitim sensörünün hareket alanını kapatıp ölçüm günlüğü alın.",
      "Aynı mesafede tekrar okumayı yalnız ekranda/LED ile izleyin; hareketli kola el yaklaştırmayın.",
      "Tek eşik ile farklı aç/kapa eşikleri kullanmanın karar geçiş sayısını karşılaştırın."
    ],
    "principle": "Histerezis karar geçişlerini azaltabilir ama doğruluk veya engel güvenliği garantisi değildir.",
    "variation": "Yumuşatma ile gecikme arasındaki ödünleşimi ölç; kodsuz kart simülasyonu da mümkündür.",
    "sourceId": "circuits",
    "controls": "Sensör, hedef yüzey, mesafe ve ölçüm aralığı sabit.",
    "measure": "cm, saniye, karar geçiş sayısı.",
    "timing": "30–45 dakika.",
    "minAge": 13,
    "depth": "Önce mekanizmaya dayalı tahmin kur; ölçüm çözünürlüğünü ve alternatif açıklamayı yaz. Tek koşulu değiştir; sonuç çıkmazsa kurulum/kör ölçüm kontrolüne dön."
  },
  {
    "id": "micro-field",
    "title": "Mikroskopta görüş alanı ve örnek seçimi",
    "domain": "microbiology",
    "materials": [
      "prepared-slides",
      "ruler",
      "paper",
      "pencil"
    ],
    "question": "Tek görüş alanı bütün preparatı temsil eder mi?",
    "steps": [
      "Kapalı, etiketli eğitim preparatını öğretmen yerleştirir; kültür yapılmaz.",
      "Aynı kuru objektifle farklı alanlarda görülen yapıları kodlayıp çizin; yağ gereksinimini objektif etiketinden kontrol edin.",
      "Alanların farkını ve örnek seçiminin etkisini tartışın; isim/tür tanısı yalnız şekilden çıkarılmaz."
    ],
    "principle": "Görüş alanı, çözünürlük ve örnek seçimi gözlemi etkiler; daha fazla büyütme her zaman daha fazla ayrıntı değildir.",
    "variation": "Etiketli ölçekle aynı yapının görüş alanı payını karşılaştır; her çocuğa sırayla gözlem rolü ver.",
    "sourceId": "cells",
    "controls": "Preparat, objektif, ışık ve gözlem süresi sabit.",
    "measure": "Alan başına sayım; ölçek yalnız kalibrasyon varsa µm.",
    "timing": "30–40 dakika; sıra ve kayıt istasyonu paralel.",
    "minAge": 13,
    "depth": "Önce mekanizmaya dayalı tahmin kur; ölçüm çözünürlüğünü ve alternatif açıklamayı yaz. Tek koşulu değiştir; sonuç çıkmazsa kurulum/kör ölçüm kontrolüne dön."
  },
  {
    "id": "drama-perspectives",
    "title": "Aynı olaya üç farklı bakış",
    "domain": "drama",
    "materials": [
      "cards",
      "paper",
      "pencil"
    ],
    "question": "Bir sahnede kimin bakışı değişirse çözüm de değişir mi?",
    "steps": [
      "Kurgusal bir arkadaşlık durumunu seçin; gerçek kişileri anlatmak veya oynamak zorunlu değil.",
      "Isınma, kısa canlandırma ve değerlendirme akışıyla aynı durumu üç rol açısından kurun.",
      "Gözlemci alternatif bir davranış önerir; yeniden canlandırın ve gördüğünüz değişimi konuşun."
    ],
    "principle": "Bu yaratıcı bir etkinliktir; kişilik tanısı veya bilimsel etki ölçümü değildir.",
    "variation": "Diyalogsuz sahne ve yazılı gözlem seçeneği ekleyerek katılımı erişilebilir kıl.",
    "sourceId": "research-method",
    "controls": "Aynı kurgusal durum; güvenli mesafe ve gönüllü katılım.",
    "measure": "Söylenen öneriler ve gözlenen davranış notları; başarı puanı verilmez.",
    "timing": "30–40 dakika.",
    "minAge": 9,
    "depth": "Önce mekanizmaya dayalı tahmin kur; ölçüm çözünürlüğünü ve alternatif açıklamayı yaz. Tek koşulu değiştir; sonuç çıkmazsa kurulum/kör ölçüm kontrolüne dön."
  },
  {
    "id": "story-constraints",
    "title": "Bir öyküde yalnız bakış açısını değiştir",
    "domain": "literature",
    "materials": [
      "paper",
      "pencil",
      "cards"
    ],
    "question": "Aynı olay farklı anlatıcıyla nasıl değişir?",
    "steps": [
      "Ortak kurgu için kişi/yer/olay kartlarını belirleyin; gerçek çocuk bilgileri yazılmasın.",
      "Gruplar aynı olayı farklı anlatıcıyla kısa bölümler halinde yazar.",
      "Metinleri gönüllü okuma veya sessiz incelemeyle karşılaştırın; yalnız istenen katkıları tartışın."
    ],
    "principle": "Edebî seçimlerin karşılaştırmasıdır; tek doğru metin veya bilimsel başarı iddiası yok.",
    "variation": "Öyküleri sırayla devredip devamlılık koşullarını koruyarak ortak son üret.",
    "sourceId": "research-method",
    "controls": "Ortak olay ve süre; yalnız anlatıcı değişir.",
    "measure": "Metinler ve kullanılan ipuçları; kişisel fotoğraf/isim kaydı yok.",
    "timing": "30–40 dakika; kapanış için 5–10 dakika ayrılır.",
    "minAge": 9,
    "depth": "Önce mekanizmaya dayalı tahmin kur; ölçüm çözünürlüğünü ve alternatif açıklamayı yaz. Tek koşulu değiştir; sonuç çıkmazsa kurulum/kör ölçüm kontrolüne dön."
  },
  {
    "id": "origami-stiffness",
    "title": "Kat izlerinde yön ve taşıma davranışı",
    "domain": "origami",
    "materials": [
      "paper",
      "ruler",
      "weight",
      "pencil"
    ],
    "question": "Aynı kâğıtta kat izlerinin yönü taşıma davranışını değiştirir mi?",
    "steps": [
      "Aynı boy ve tür kâğıtlarda öğretmenin gösterdiği basit akordeon katlarını kurun.",
      "Eş destek aralığında kat yönlerini karşılaştırıp düşük ve büyük tek yükle sarkmayı ölçün.",
      "Hasarlı kâğıdı tekrar bağımsız örnek saymayın; yeni örnekle tekrarlayın."
    ],
    "principle": "Kat geometrisi rijitliği etkiler; tüm kâğıt türleri için tek şeklin üstünlüğü varsayılmaz.",
    "variation": "Kat genişliğini ayrı seride değiştirip malzeme/yapı etkilerini ayır.",
    "sourceId": "bridge-shape",
    "controls": "Kâğıt türü/boyutu, destek ve düşük yük sabit.",
    "measure": "Sarkma mm, kat sayısı; düşük masa üstü yük.",
    "timing": "30–40 dakika.",
    "minAge": 9,
    "depth": "Önce mekanizmaya dayalı tahmin kur; ölçüm çözünürlüğünü ve alternatif açıklamayı yaz. Tek koşulu değiştir; sonuç çıkmazsa kurulum/kör ölçüm kontrolüne dön."
  },
  {
    "id": "accessible-art",
    "title": "Renk yerine desenle bilgi tasarla",
    "domain": "art",
    "materials": [
      "color-cards",
      "paper",
      "pencil"
    ],
    "question": "Bir poster siyah beyazda da aynı bilgiyi aktarır mı?",
    "steps": [
      "Kurgusal bir bilim etkinliği için aynı içerikle renkli ve desen/etiket destekli iki çizim oluşturun.",
      "Renk bilgisi olmadan çizimdeki görev ve yönleri bulun; kimseye görme testi uygulamayın.",
      "Belirsiz simgeleri yazı/desenle iyileştirin; farklı yorumları not edin."
    ],
    "principle": "Bu bir tasarım araştırmasıdır; görme bozukluğu tanısı veya erişilebilirlik sertifikası değildir.",
    "variation": "Sadece büyüklük, sadece desen ve birlikte kullanım için üç prototip karşılaştır.",
    "sourceId": "engineering-cycle",
    "controls": "Aynı içerik, okuma mesafesi ve bilgi görevi.",
    "measure": "Bulunan/yanlış yorumlanan bilgi ve gözlem notları.",
    "timing": "25–40 dakika.",
    "minAge": 9,
    "depth": "Önce mekanizmaya dayalı tahmin kur; ölçüm çözünürlüğünü ve alternatif açıklamayı yaz. Tek koşulu değiştir; sonuç çıkmazsa kurulum/kör ölçüm kontrolüne dön."
  }
];
