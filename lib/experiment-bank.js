import { ENRICHED_EXPERIMENTS } from './enriched-experiments.js';
// Original local development proposals, not copied manuals or measured results.
export const EXPERIMENT_BANK = [
  ...ENRICHED_EXPERIMENTS,
  {
    "id": "dissolve",
    "title": "Şeker nereye gidiyor?",
    "domain": "chemistry",
    "materials": [
      "sugar",
      "water",
      "cups",
      "timer"
    ],
    "question": "Aynı sıcaklıktaki suya eklenen eşit şeker örneklerinin kaybolmasını nasıl izleriz?",
    "steps": [
      "Eşit su ve şeker miktarlarıyla iki kap hazırlayın.",
      "Birini aynı ritimde karıştırın, diğerini sabit bırakın; görünen taneciklerin değişimini kaydedin.",
      "Gözlem süresini ve karıştırma koşulunu tekrar ederek karşılaştırın."
    ],
    "principle": "Çözünmede şeker molekülleri dağılır; görünmemesi yok olduğu anlamına gelmez.",
    "variation": "Karıştırma etkisini görünür taneciklerin kaybolma süresiyle karşılaştır.",
    "sourceId": "acs-dissolve-sugar",
    "minAge": 9
  },
  {
    "id": "salt-sugar",
    "title": "Tuz mu şeker mi daha farklı çözünüyor?",
    "domain": "chemistry",
    "materials": [
      "salt",
      "sugar",
      "water",
      "cups",
      "timer"
    ],
    "question": "Aynı deney koşullarında iki bilinen maddeyi gözlemle ayırt edebilir miyiz?",
    "steps": [
      "Aynı kütlede etiketli tuz ve şeker örneklerini ayırın.",
      "Aynı hacim/sıcaklıkta su kullanıp aynı biçimde karıştırın.",
      "Çözünme davranışını ve kalan katıları kaydedin; maddeleri tatmayın."
    ],
    "principle": "Çözünürlük ve çözünme hızı farklı kavramlardır; tek gözlem kesin kimlik kanıtı değildir.",
    "variation": "Tekrar sayısını artırıp gözlem tutarlılığını karşılaştır.",
    "sourceId": "acs-dissolve-identify",
    "minAge": 9
  },
  {
    "id": "particle",
    "title": "Şeker tanecik boyutu araştırması",
    "domain": "chemistry",
    "materials": [
      "sugar",
      "water",
      "cups",
      "timer"
    ],
    "question": "Tanecik boyutu görünen çözünme süresini etkiler mi?",
    "steps": [
      "Aynı maddeden ince ve iri tanecikli, eşit kütleli şeker örnekleri seçin.",
      "Su miktarı, sıcaklığı ve karıştırma ritmini sabit tutun.",
      "Taneciklerin gözden kaybolma süresini tekrar ölçün."
    ],
    "principle": "Bu bir hız araştırmasıdır; daha hızlı çözünme daha yüksek denge çözünürlüğü anlamına gelmez.",
    "variation": "İnce/iri örneklerin sürelerini nokta grafiğinde karşılaştır.",
    "sourceId": "acs-dissolve-sugar",
    "minAge": 9
  },
  {
    "id": "visc",
    "title": "Gliserin ve suyun akış süresi",
    "domain": "chemistry",
    "materials": [
      "glycerol",
      "water",
      "cups",
      "timer"
    ],
    "question": "İki sıvı aynı geometride aynı sürede akar mı?",
    "steps": [
      "Öğretmen eşit hacimde etiketli gliserin ve su örnekleri hazırlar.",
      "Aynı kap geometrisi ve aynı başlangıç eğimiyle akış süresini ölçün.",
      "Her sıvıyı aynı sıcaklıkta birkaç kez gözlemleyin."
    ],
    "principle": "Viskozite akışa karşı iç dirençtir; yoğunlukla aynı özellik değildir.",
    "variation": "Kap eğimini değiştirirken sıvı ve sıcaklığı sabit tut.",
    "sourceId": "viscosity",
    "minAge": 9
  },
  {
    "id": "layers",
    "title": "Karışabilirlik ile yoğunluk aynı mı?",
    "domain": "chemistry",
    "materials": [
      "oil",
      "water",
      "cups"
    ],
    "question": "İki sıvının tabakalaşması hangi farklı özelliklerle ilgilidir?",
    "steps": [
      "Öğretmen aynı kapta su ve bitkisel yağı ayrı gözlem örneği olarak hazırlasın.",
      "Hafifçe hareket ettirilen ve sabit duran örneklerin görüntüsünü karşılaştırın.",
      "Bekledikten sonra tabaka sayısını ve değişimini çizin."
    ],
    "principle": "Karışabilirlik etkileşimlerle, tabaka sırası yoğunlukla ilişkilidir; yağ-su sınırı hücre zarı değildir.",
    "variation": "Hareket ettirme süresini tek değişken olarak karşılaştır.",
    "sourceId": "solutions",
    "minAge": 9
  },
  {
    "id": "surface",
    "title": "Yüzeydeki damla ve sabun etkisi",
    "domain": "chemistry",
    "materials": [
      "water",
      "soap",
      "dropper",
      "foil",
      "cups"
    ],
    "question": "Aynı yüzeyde su damlasının yayılması sabun temasıyla değişir mi?",
    "steps": [
      "Öğretmen temiz ve düz folyo yüzeylerini kırılmayan kapların üzerinde hazırlasın; keskin kenarları katlasın.",
      "Damlalıkla aynı büyüklükte su damlalarını oluşturun; birinde küçük etiketli sabun teması yapıp diğerini karşılaştırma olarak koruyun.",
      "Damla şekli ve yayılmasını çizimle kaydedin; temiz yüzeylerle tekrarlayın."
    ],
    "principle": "Yüzey gerilimi farkı yüzey hareketine katkıda bulunabilir; bu mikropların öldüğünü göstermez.",
    "variation": "Sabun temasını tek değişken tut; yüzey, damla büyüklüğü ve sıcaklığı aynı tut.",
    "sourceId": "surface-tension",
    "minAge": 9
  },
  {
    "id": "chrom",
    "title": "Su bazlı kalemlerde renk ayrımı",
    "domain": "chemistry",
    "materials": [
      "marker",
      "filter",
      "water",
      "cups",
      "pencil"
    ],
    "question": "Siyah yıkanabilir kalem tek bir renk bileşeni mi içerir?",
    "steps": [
      "Beyaz filtreye kurşun kalemle başlangıç çizgisi ve küçük bir kalem noktası koyun.",
      "Filtrenin alt ucunu suda tutun; mürekkep noktası su seviyesinin üzerinde kalsın.",
      "Su ilerlemesini ve ayrılan renk bantlarını kaydedin."
    ],
    "principle": "Kâğıt kromatografisi karışım bileşenlerini farklı ilerleme davranışlarıyla ayırabilir; kalem içeriği sonucu etkiler.",
    "variation": "Farklı su bazlı kalemleri aynı kâğıt ve su koşulunda karşılaştır.",
    "sourceId": "acs-paper-chrom",
    "minAge": 9
  },
  {
    "id": "wick",
    "title": "Hangi malzeme suyu daha uzağa taşır?",
    "domain": "chemistry",
    "materials": [
      "filter",
      "cloth",
      "water",
      "cups",
      "ruler"
    ],
    "question": "Kâğıt ve kumaşta suyun ilerleme mesafesi farklı mı?",
    "steps": [
      "Eşit genişlikte kâğıt/kumaş şeritler hazırlayın.",
      "Alt uçlarını aynı derinlikte suya yerleştirin.",
      "Eşit zaman aralıklarında ıslanma sınırını işaretleyin."
    ],
    "principle": "Kılcallık yüzey gerilimi, yapışma ve malzeme yapısıyla ilişkilidir; boya zorunlu değildir.",
    "variation": "Şerit genişliğini sabit tutup malzeme türünü değiştir.",
    "sourceId": "surface-tension",
    "minAge": 9
  },
  {
    "id": "oobleck",
    "title": "Nişasta süspansiyonu nasıl akar?",
    "domain": "chemistry",
    "materials": [
      "starch",
      "water",
      "cups"
    ],
    "question": "Aynı süspansiyon yavaş ve hızlı hareketlere aynı tepkiyi verir mi?",
    "steps": [
      "Öğretmen ön denemede mısır nişastası-su süspansiyonunu hazırlar.",
      "Kör uçlu bir araçla yavaş ve hızlı hareketi karşılaştırın; sıçratmayın.",
      "Farkı gözlem olarak yazın, maddeyi katı/sıvı diye tek kelimeye zorlamayın."
    ],
    "principle": "Yoğun nişasta süspansiyonu deformasyon hızına bağlı, Newton tipi olmayan davranış gösterebilir.",
    "variation": "Uygulama hızını değiştirip gözlem tekrarlanabilirliğini incele.",
    "sourceId": "mit-oobleck",
    "minAge": 9
  },
  {
    "id": "alg-gel",
    "title": "Boyasız aljinat ağları",
    "domain": "chemistry",
    "materials": [
      "gel-kit",
      "alginate",
      "calcium",
      "dropper",
      "cups",
      "goggles"
    ],
    "question": "Aynı polimer çözeltisinden farklı biçimde jel yapı elde edebilir miyiz?",
    "steps": [
      "Öğretmen ürün yönergesi ve kurumsal kaynakla uyumlu, etiketli çözeltileri önceden hazırlar.",
      "Öğretmen gözetiminde damla ve kısa akış biçimlerini karşılaştırın.",
      "Jel biçimini ve bekleme sonrası değişimi çizerek kaydedin."
    ],
    "principle": "Kalsiyum iyonları aljinat zincirleri arasında ağ oluşumuna katkıda bulunur; gıda boyası gerekli değildir.",
    "variation": "Aynı hazır çözeltilerde damla/akış geometrisini karşılaştır.",
    "sourceId": "cmu-alginate",
    "minAge": 13
  },
  {
    "id": "pend",
    "title": "Sarkaç uzunluğu araştırması",
    "domain": "physics",
    "materials": [
      "string",
      "weight",
      "ruler",
      "timer"
    ],
    "question": "İp uzunluğu küçük açılı salınım süresini etkiler mi?",
    "steps": [
      "Büyük yumuşak bir ağırlık ve ipi yetişkin sabitlesin.",
      "Küçük başlangıç açısında birden çok salınımı birlikte zamanlayın.",
      "Uzunluğu değiştirip açıyı ve ağırlığı sabit tutarak tekrar edin."
    ],
    "principle": "Küçük açı modelinde periyot uzunlukla ilişkilidir; sürtünme ve zamanlama hatası vardır.",
    "variation": "Toplam salınım süresinden bir salınım süresini hesapla.",
    "sourceId": "pendulum",
    "minAge": 9
  },
  {
    "id": "ramp",
    "title": "Eğim değişince hareket",
    "domain": "physics",
    "materials": [
      "toy-car",
      "cardboard",
      "ruler",
      "timer"
    ],
    "question": "Başlangıç yüksekliği hareket süresini nasıl etkiler?",
    "steps": [
      "Yere yakın sabit bir rampa ve bitiş çizgisi hazırlayın.",
      "Arabayı itmeden aynı noktadan bırakın.",
      "Yüksekliği değiştirip yüzeyi ve ölçüm mesafesini sabit tutun."
    ],
    "principle": "Net kuvvet ve enerji dönüşümü hareketi etkiler; gerçek yüzeylerde kayıplar vardır.",
    "variation": "Her yükseklikte birkaç ölçüm yapıp saçılmayı göster.",
    "sourceId": "energy",
    "minAge": 9
  },
  {
    "id": "friction",
    "title": "Aynı rampada iki yüzey",
    "domain": "physics",
    "materials": [
      "toy-car",
      "cardboard",
      "cloth",
      "ruler"
    ],
    "question": "Yüzey türü hareket mesafesini etkiler mi?",
    "steps": [
      "Rampanın yüksekliğini ve başlangıç noktasını sabitleyin.",
      "Son yüzeyi karton/kumaşla değiştirip arabayı itmeden bırakın.",
      "Durma mesafesini ve tekrarlar arasındaki farkı kaydedin."
    ],
    "principle": "Sürtünme mekanik enerjinin başka biçimlere aktarılmasına katkıda bulunur.",
    "variation": "Yüzey değişimini ve ölçüm mesafesini ayrı kontrol et.",
    "sourceId": "energy",
    "minAge": 9
  },
  {
    "id": "float",
    "title": "Folyo tekne biçimi",
    "domain": "physics",
    "materials": [
      "foil",
      "water",
      "cups",
      "weight"
    ],
    "question": "Aynı folyo parçasının biçimi yüzmeye etkili mi?",
    "steps": [
      "Aynı büyüklükte folyo parçalarını farklı tekne biçimlerine katlayın.",
      "Suya yavaşça yerleştirip başlangıç durumunu gözlemleyin.",
      "Öğretmenin yönettiği büyük yumuşak yüklerle karşılaştırın."
    ],
    "principle": "Yüzme toplam kütle, yer değiştirilen hacim ve akışkan yoğunluğuyla ilişkilidir.",
    "variation": "Aynı folyo miktarıyla daha geniş ve daha dar gövdeyi karşılaştır.",
    "sourceId": "buoyancy",
    "minAge": 9
  },
  {
    "id": "balance",
    "title": "Destek noktası ve denge",
    "domain": "balance",
    "materials": [
      "ruler",
      "weight",
      "cardboard"
    ],
    "question": "Destek noktası değişirse denge konumu da değişir mi?",
    "steps": [
      "Cetveli masaya yakın, güvenli bir destek üstünde dengeleyin.",
      "Büyük yumuşak yükü bir konumda sabitleyin.",
      "Destek konumunu değiştirerek denge yerini ölçün."
    ],
    "principle": "Statik dengede net kuvvet ve net tork sıfırdır; destek ve yük konumu önemlidir.",
    "variation": "Yük yerini tek değişken olarak karşılaştır.",
    "sourceId": "equilibrium",
    "minAge": 9
  },
  {
    "id": "shadow",
    "title": "LED ile gölge boyu",
    "domain": "physics",
    "materials": [
      "led",
      "cardboard",
      "ruler"
    ],
    "question": "Işık-nesne uzaklığı gölgeyi nasıl değiştirir?",
    "steps": [
      "LED, karton nesne ve perdeyi masada sabitleyin.",
      "Nesne/perdeyi sabit tutup LED konumunu değiştirin.",
      "Gölge uzunluğunu ve ışık uzaklığını kaydedin."
    ],
    "principle": "Gölge geometrisi ışık yollarıyla modellenir; kaynak sonlu büyüklükte olabilir.",
    "variation": "Gölge sınırının keskinliğini ayrıca gözlemle.",
    "sourceId": "reflection",
    "minAge": 9
  },
  {
    "id": "reflect",
    "title": "Yansımada hangi açı eşit?",
    "domain": "night",
    "materials": [
      "led",
      "mirror",
      "protractor",
      "paper"
    ],
    "question": "Geliş açısı ile yansıma açısını hangi referansa göre ölçeriz?",
    "steps": [
      "Öğretmen kırılmayan aynayı ve ışık yolunu güvenli şekilde sabitlesin.",
      "Yüzeye dik normal çizgisini işaretleyin.",
      "Farklı geliş yönlerini normale göre ölçüp yansıma yönüyle karşılaştırın."
    ],
    "principle": "İdeal düzgün yansımada açılar yüzeyden değil normalden ölçülür ve eşittir.",
    "variation": "Yüzeyden ölçülen açıyla normalden ölçülen açıyı karşılaştır.",
    "sourceId": "reflection",
    "minAge": 9
  },
  {
    "id": "heli",
    "title": "Kâğıt helikopterin kanatları",
    "domain": "outdoor",
    "materials": [
      "paper",
      "scissors",
      "ruler",
      "timer"
    ],
    "question": "Kanat boyu düşüş davranışını değiştirir mi?",
    "steps": [
      "NASA şablonunu öğretmenle kâğıda aktarın ve karşıt yönde katlayın.",
      "Yere yakın aynı yükseklikten bırakıp süreyi/görüntüyü gözlemleyin; yüksek yere çıkmayın.",
      "Yalnız kanat boyunu değiştirerek karşılaştırın."
    ],
    "principle": "Tasarımın hava ile etkileşimi düşüşü etkiler; bu Mars helikopterinin ölçekli dinamik kopyası değildir.",
    "variation": "Her tasarımı aynı bırakma koşuluyla tekrar ölç.",
    "sourceId": "nasa-paper-heli",
    "minAge": 9
  },
  {
    "id": "moon-local",
    "title": "Ay evresi gözlem açısı",
    "domain": "astronomy",
    "materials": [
      "led",
      "ball",
      "paper"
    ],
    "question": "Aydınlanan yüzey ile gördüğümüz yüzey aynı şey mi?",
    "steps": [
      "LED konumunu sabit tutun ve büyük topu aydınlatın.",
      "Gözlem açısını değiştirerek görünen aydınlık kısmı çizin.",
      "Topun değişimiyle bakış açısının değişimini ayırın."
    ],
    "principle": "Ay evreleri aydınlanan kısmın bakış geometrisiyle ilişkilidir; Dünya gölgesi açıklaması değildir.",
    "variation": "Gözlemci/top konumunu değiştirip ışığı sabit tut.",
    "sourceId": "nasa-moon",
    "minAge": 9
  },
  {
    "id": "scale",
    "title": "Işık yılıyla uzaklık ölçeği",
    "domain": "astronomy",
    "materials": [
      "paper",
      "ruler",
      "pencil"
    ],
    "question": "Çok büyük uzaklıkları kâğıtta hangi ölçekle karşılaştırabiliriz?",
    "steps": [
      "Bir kâğıt uzunluğunu seçilmiş uzaklığa eşleyen ölçek belirleyin.",
      "Aynı ölçekle ikinci bir uzaklığı işaretleyin.",
      "Birim ve yuvarlamayı açıkça yazarak sonucu kontrol edin."
    ],
    "principle": "Işık yılı zaman değil uzaklık birimidir; ölçek gerçek boyut değildir.",
    "variation": "İki farklı ölçekle aynı oranı koruyup korumadığını denetle.",
    "sourceId": "nasa-lightyear",
    "minAge": 9
  },
  {
    "id": "chance",
    "title": "Kart çekiminde olasılık",
    "domain": "math",
    "materials": [
      "cards",
      "pencil"
    ],
    "question": "Az sayıda çekim beklenen oranı tam verir mi?",
    "steps": [
      "Kart grubunda tür sayılarını açıkça belirleyin.",
      "Her çekimden sonra kartı geri koyup karıştırın.",
      "Sıklık tablosunu örnek sayısı arttıkça karşılaştırın."
    ],
    "principle": "Küçük örneklem oranı değişken olabilir; beklenen olasılık her kısa seride tam oluşmaz.",
    "variation": "İki eşit büyüklükte serinin farklılığını incele.",
    "sourceId": "statistics-measurement",
    "minAge": 9
  },
  {
    "id": "measure",
    "title": "Aynı uzunluğu kim nasıl ölçer?",
    "domain": "math",
    "materials": [
      "ruler",
      "paper",
      "pencil"
    ],
    "question": "Bir nesneyi tekrar ölçünce neden farklı sonuç yazabiliriz?",
    "steps": [
      "Aynı kâğıt uzunluğunu aynı cetvelle ölçün.",
      "Sıfır noktası ve bakış konumunu açıkça belirleyip ölçümü tekrarlayın.",
      "Birim ve cetvel çözünürlüğüyle uyumlu kayıt tutun."
    ],
    "principle": "Cihaz çözünürlüğü ile ölçümün tüm belirsizliği aynı değildir.",
    "variation": "Gözlemci değişimini ve araç değişimini ayrı incele.",
    "sourceId": "uncertainty-instrument",
    "minAge": 9
  },
  {
    "id": "classify",
    "title": "Kartlarla sınıflandırma ve yeni örnek",
    "domain": "ai",
    "materials": [
      "cards",
      "pencil"
    ],
    "question": "Örnekleri ezberleyen kural yeni kartta başarılı olur mu?",
    "steps": [
      "Kişisel veri içermeyen şekil kartlarını iki gruba ayırın.",
      "Bir gruptan sınıflandırma kuralı oluşturun.",
      "Kuralı görülmemiş kartlarda değişiklik yapmadan deneyin."
    ],
    "principle": "Eğitim başarısı genelleme garantisi değildir; örneklerin temsil gücü önemlidir.",
    "variation": "Önce görülmeyen örnekleri kullanarak hataları say.",
    "sourceId": "ml-overfitting",
    "minAge": 9
  },
  {
    "id": "metrics",
    "title": "Hata tablosu aynı başarı mı?",
    "domain": "ai",
    "materials": [
      "cards",
      "pencil"
    ],
    "question": "Aynı doğruluk farklı hata türlerini gizleyebilir mi?",
    "steps": [
      "Etiketli kartlar için iki farklı karar kuralı belirleyin.",
      "Doğru/yanlış kararları ve iki hata türünü ayrı kaydedin.",
      "Aynı örneklerde toplam doğrulukla hata dağılımını karşılaştırın."
    ],
    "principle": "Dengesiz sınıflarda tek doğruluk oranı yanıltıcı olabilir; hata türleri ayrıca incelenir.",
    "variation": "Sınıf oranını değiştirip kuralı sabit tut.",
    "sourceId": "google-metrics",
    "minAge": 13
  },
  {
    "id": "evap-area",
    "title": "Buharlaşmada yüzey alanı ve kütle kaybı",
    "domain": "chemistry",
    "materials": [
      "water",
      "cups",
      "scale",
      "timer"
    ],
    "question": "Açık yüzey alanı aynı suyun kütle kaybını etkiler mi?",
    "steps": [
      "Farklı genişlikte kaplara aynı kütlede su koy; başlangıç kütlelerini ölç.",
      "Kapları aynı ortamda tut, ısıtıcı kullanma; aynı zamanlarda tekrar tart.",
      "Boş kap kütlesini ayırıp su kaybını grafiğe geçir; gözlemi gerekirse günlere yay."
    ],
    "principle": "Buharlaşmada su gaz hâline geçer; hız yüzey ve ortam koşullarına bağlıdır.",
    "variation": "Hava hareketini sabit tut; yalnız açık yüzey alanını değiştir.",
    "sourceId": "acs-evaporation",
    "minAge": 9,
    "controls": "Sıcaklık, hava akımı, başlangıç su kütlesi ve ölçüm aralığı sabit.",
    "measure": "Su kütlesi (g), geçen süre (dk/saat).",
    "timing": "Ders içinde kurulum; ölçüm birkaç saat veya gün sürebilir."
  },
  {
    "id": "cold-cup",
    "title": "Soğuk kabın dışındaki su nereden geliyor?",
    "domain": "chemistry",
    "materials": [
      "water",
      "ice",
      "cups",
      "cloth",
      "timer"
    ],
    "question": "Soğuk ve oda sıcaklığındaki kabın dış yüzeyi aynı mı?",
    "steps": [
      "İki eş kap hazırlayın: biri soğuk, diğeri oda sıcaklığında suyla; dışlarını kurulayın.",
      "Aynı nemli ortamda dış yüzeyleri zamanla gözlemleyin.",
      "Damla oluşumunu kaydedin; kap sızıntısını ayrıca kontrol edin."
    ],
    "principle": "Yoğuşma, havadaki su buharının sıvıya dönüşmesidir; dıştaki damla içeriden sızmak zorunda değildir.",
    "variation": "Ortam nemi düşükse sonuç çıkmayabilir; yokluğu da veri olarak kaydet.",
    "sourceId": "acs-condensation",
    "minAge": 6,
    "controls": "Kap türü, konum ve gözlem süresi aynı.",
    "measure": "Damla var/yok veya kaplanan yüzey kategorisi.",
    "timing": "Nem ve ortam sıcaklığına bağlı; başarı süresi garanti edilmez."
  },
  {
    "id": "ice-insulation",
    "title": "Hangi kılıf buzu daha uzun korur?",
    "domain": "chemistry",
    "materials": [
      "ice",
      "cups",
      "cloth",
      "paper",
      "timer",
      "scale"
    ],
    "question": "Aynı buz örneklerinde kılıf türü erimeyi değiştirir mi?",
    "steps": [
      "Eşit kütlede buzları eş kaplara yerleştir; bir kabı kumaşla, birini kâğıtla sar.",
      "Bütün kapları aynı gölgeli zeminde tut; ısıtıcı kullanma.",
      "Aynı aralıklarla eriyen suyu ve kalan buzu kaydet; çıplak kabı karşılaştırma yap."
    ],
    "principle": "Erime enerji aktarımıyla ilişkilidir; kılıfın etkisi kalınlık ve malzemeye bağlıdır.",
    "variation": "Kılıf türünü sabit tutup kat sayısını karşılaştır.",
    "sourceId": "acs-melting",
    "minAge": 6,
    "controls": "Buzun başlangıç kütlesi, kap ve yer aynı.",
    "measure": "Kalan buz kütlesi (g) veya erime gözlemi.",
    "timing": "Kurulum kısa; erime ortam koşullarına bağlı."
  },
  {
    "id": "density-volume",
    "title": "Aynı hacim her zaman aynı kütle mi?",
    "domain": "chemistry",
    "materials": [
      "water",
      "sugar",
      "cups",
      "scale",
      "measure-cup"
    ],
    "question": "Su ve öğretmenin hazırladığı şeker çözeltisinin eşit hacimleri aynı kütlede mi?",
    "steps": [
      "Öğretmen etiketli şeker çözeltisi ve suyu aynı sıcaklıkta hazırlasın.",
      "Boş kap kütlesini ölç; iki sıvıdan aynı hacimleri ayrı tart.",
      "Sıvı kütlesini kap kütlesinden ayır; yoğunluğu kütle/hacim olarak hesapla."
    ],
    "principle": "Yoğunluk kütlenin hacme oranıdır; sayısal değer ölçüm koşullarıyla birlikte verilir.",
    "variation": "Hacmi değiştirip kütle-hacim doğrusunun eğimini incele.",
    "sourceId": "acs-volume-density",
    "minAge": 13,
    "controls": "Sıcaklık, hacim okuması ve kap tartım yöntemi aynı.",
    "measure": "Kütle (g), hacim (mL), yoğunluk (g/mL).",
    "timing": "Ders içinde ölçüm ve tekrar."
  },
  {
    "id": "separation",
    "title": "Süzgeç neyi ayırır, neyi ayıramaz?",
    "domain": "chemistry",
    "materials": [
      "water",
      "beans",
      "salt",
      "cups",
      "sieve"
    ],
    "question": "Çözünmüş tuz ve büyük taneler aynı yöntemle ayrılır mı?",
    "steps": [
      "Öğretmen suda çözünmüş sofra tuzu ile büyük kuru fasulye tanelerini ayrı örnekler olarak hazırlar.",
      "Her örneği aynı temiz süzgeçten ayrı geçir; görünen katıları kaydet.",
      "Görünmeyen tuzun giderildiği sonucunu çıkarma; deney suyunu içme."
    ],
    "principle": "Mekanik süzme tane boyutuna bağlıdır; çözünmüş maddeyi bu süzgeçle gidermek beklenmez.",
    "variation": "Farklı süzgeç gözlerini yalnız büyük katılarla karşılaştır.",
    "sourceId": "solutions",
    "minAge": 9,
    "controls": "Süzgeç türü ve örnek hacmi aynı; örnekler etiketli.",
    "measure": "Tutulan katı sayısı ve görünür gözlem.",
    "timing": "Ders içinde; su arıtma veya içilebilirlik testi değildir."
  },
  {
    "id": "emulsion",
    "title": "Yağ-su karışımındaki damlalar ne kadar kalır?",
    "domain": "chemistry",
    "materials": [
      "oil",
      "water",
      "soap",
      "cups",
      "timer"
    ],
    "question": "Sabun eklenen ve eklenmeyen yağ-su örnekleri zamanla aynı görünür mü?",
    "steps": [
      "Öğretmen eş kaplarda aynı miktarda su ve yağ hazırlasın; bir örneğe etiketli sabun eklesin.",
      "Her ikisini aynı ritimde hafifçe hareket ettir; sıçratma.",
      "Aynı aralıklarla damla ve tabaka görünümünü çiz; başka temizlik ürünü ekleme."
    ],
    "principle": "Yüzey etkin maddeler dağılmış damlaların davranışını değiştirebilir; emülsiyon tek fazlı çözeltiyle aynı değildir.",
    "variation": "Hareket süresini sabit tutup görünümün zamana bağlılığını araştır.",
    "sourceId": "solutions",
    "minAge": 9,
    "controls": "Yağ/su miktarı, kap ve hareket ritmi aynı.",
    "measure": "Tabaka sayısı, damla görünümü ve süre (dk).",
    "timing": "Ders içinde; ürün ve ortam sonucu etkiler."
  },
  {
    "id": "sugar-temp",
    "title": "Şekerin çözünme süresi ve sıcaklık",
    "domain": "chemistry",
    "materials": [
      "water",
      "sugar",
      "cups",
      "thermometer",
      "timer"
    ],
    "question": "Ölçülen su sıcaklığı şekerin görünür çözünme süresini etkiler mi?",
    "steps": [
      "Öğretmen oda sıcaklığında ve dokunmaya uygun ılık su hazırlayıp sıcaklıkları ölçsün; kaynar su kullanma.",
      "Aynı şeker kütlesi ve tane boyutunu aynı hacimde suya ekle; eş biçimde karıştır.",
      "Görünen taneciklerin kaybolma sürelerini tekrar ölç."
    ],
    "principle": "Çözünme hızı ve denge çözünürlüğü farklıdır; bu yöntem yalnız görünür çözünme süresini araştırır.",
    "variation": "Sıcaklığı ölçüm boyunca kaydedip soğumanın etkisini tartış.",
    "sourceId": "acs-dissolve-temperature",
    "minAge": 9,
    "controls": "Şeker türü/kütlesi, su hacmi ve karıştırma aynı.",
    "measure": "Sıcaklık (°C) ve süre (s).",
    "timing": "Öğretmen ılık suyu hazırlar; süre ön denemeyle belirlenir."
  },
  {
    "id": "mass-solution",
    "title": "Şeker çözününce kütle değişir mi?",
    "domain": "chemistry",
    "materials": [
      "water",
      "sugar",
      "cups",
      "scale",
      "spoon"
    ],
    "question": "Madde kaybetmeden hazırlanan çözeltinin toplam kütlesi nasıl karşılaştırılır?",
    "steps": [
      "Kap, su, şeker ve karıştırma aracını işlemden önce birlikte tart.",
      "Şekeri suya aktar; sıçrama ve araçta kalan maddeyi takip et.",
      "Aynı parçaları tekrar birlikte tart; farkı cihaz çözünürlüğüyle karşılaştır."
    ],
    "principle": "Çözünme maddeyi yok etmez; dökülme ve buharlaşma ölçülen sistem kütlesini değiştirebilir.",
    "variation": "Hangi parçaların sistem sınırına dahil olduğunu şemayla açıkla.",
    "sourceId": "acs-dissolve-sugar",
    "minAge": 9,
    "controls": "Tartılan parçalar ve ölçüm düzeni aynı.",
    "measure": "Toplam kütle (g) ve fark (g).",
    "timing": "Ders içinde; ölçüm çözünürlüğü küçük farkları sınırlayabilir."
  },
  {
    "id": "fold-bridge",
    "title": "Kâğıt köprüde biçim mi malzeme mi?",
    "domain": "physics",
    "materials": [
      "paper",
      "cups",
      "weight",
      "ruler"
    ],
    "question": "Aynı miktar kâğıdın katlanma biçimi taşıdığı yükü etkiler mi?",
    "steps": [
      "Aynı kâğıttan düz ve katlı köprüler kur; destek aralığını eşitle.",
      "Yere yakın düzende eş oyun hamuru parçalarını aynı yere yavaşça ekle.",
      "Belirlediğiniz ilk belirgin eğilme ölçütüne kadar yük sayısını kaydet; ağır yük kullanma."
    ],
    "principle": "Geometri eğilme davranışını etkiler; tek deneme bütün köprü türleri için sonuç vermez.",
    "variation": "Başarı ölçütünü yük/kâğıt kütlesi oranına dönüştür.",
    "sourceId": "bridge-shape",
    "minAge": 6,
    "controls": "Kâğıt türü/miktarı, destek aralığı ve yük konumu aynı.",
    "measure": "Yük parçası sayısı; varsa kütle (g).",
    "timing": "Ders içinde düşük yükle ön deneme."
  },
  {
    "id": "rolling",
    "title": "Yuvarlanan cisimlerde kütle dağılımı",
    "domain": "physics",
    "materials": [
      "cups",
      "weight",
      "cardboard",
      "ruler",
      "timer"
    ],
    "question": "Aynı dış şeklin içindeki yük dağılımı yuvarlanma süresini etkiler mi?",
    "steps": [
      "Öğretmen eş kapların içine eş toplam oyun hamuru kütlesini farklı dağılımla güvenle sabitlesin.",
      "Alçak rampada aynı başlangıç çizgisinden itmeden bırak.",
      "Aynı yolu geçme süresini tekrar ölç; kayma varsa ayrı kaydet."
    ],
    "principle": "Dönme eylemsizliği kütle dağılımına bağlıdır; yuvarlanma ile kaymayı ayırmak gerekir.",
    "variation": "Rampa açısını sabit tutup dağılım etkisini tekrar ölç.",
    "sourceId": "angular-momentum",
    "minAge": 13,
    "controls": "Toplam kütle, dış boyut ve rampa aynı; kaplar açılmaz.",
    "measure": "Yol (cm), süre (s), kayma var/yok.",
    "timing": "Öğretmen alçak rampayı ve yük sabitlemesini kontrol eder."
  },
  {
    "id": "lever",
    "title": "Kaldıraçta kol uzunluğu araştırması",
    "domain": "balance",
    "materials": [
      "ruler",
      "weight",
      "dowel",
      "cards"
    ],
    "question": "Aynı yük farklı uzaklıklarda nasıl dengelenir?",
    "steps": [
      "Öğretmen cetveli yere yakın, yuvarlanmayan destek üzerinde hazırlasın.",
      "Aynı oyun hamuru yüklerini iki tarafa yerleştirip denge uzaklıklarını ölç.",
      "Kuvvet etkisi ile destekten uzaklığı birlikte tabloya yaz."
    ],
    "principle": "Denge hem net kuvvet hem net torkla ilgilidir; uzaklık destek noktasına göre ölçülür.",
    "variation": "İki eş yük yerine bilinen farklı yüklerle tork modelini karşılaştır.",
    "sourceId": "equilibrium",
    "minAge": 9,
    "controls": "Cetvel, destek ve yük konumlarının ölçüm yöntemi aynı.",
    "measure": "Uzaklık (cm), yük kütlesi veya eş parça sayısı.",
    "timing": "Düşük yük; el ve yüz destek altında tutulmaz."
  },
  {
    "id": "static-paper",
    "title": "Dokunmadan hareket eden kâğıtlar",
    "domain": "physics",
    "materials": [
      "comb",
      "cloth",
      "paper",
      "ruler"
    ],
    "question": "Sürtülen plastik tarak küçük kâğıtlara hangi uzaklıkta etki eder?",
    "steps": [
      "Yetişkin küçük kâğıtları açık bir tepsiye ayırsın.",
      "Kuru plastik tarağı kumaşa aynı sayıda sürtüp kâğıda dokundurmadan yaklaştır.",
      "Sürtülmemiş tarakla karşılaştır; hareket başlayan uzaklığı tekrar ölç."
    ],
    "principle": "Yüklü cisim yüksüz kâğıtta kutuplanma oluşturabilir; çekilme aynı yükü kanıtlamaz.",
    "variation": "Ortam nemini kaydet; uzaklık sonuçlarını yalnız bu koşula bağla.",
    "sourceId": "static-charge",
    "minAge": 9,
    "controls": "Kâğıt boyutu, tarak, kumaş ve sürtme sayısı aynı.",
    "measure": "Uzaklık (cm), hareket var/yok.",
    "timing": "Şebeke, yüksek gerilim cihazı veya elektronik devre yok."
  },
  {
    "id": "ruler-sound",
    "title": "Titreşen cetvelin sesi neden değişir?",
    "domain": "music",
    "materials": [
      "ruler",
      "cardboard"
    ],
    "question": "Cetvelin serbest uzunluğu titreşim ve sesi nasıl değiştirir?",
    "steps": [
      "Öğretmen kırılmayan cetveli sağlam masada güvenle tutsun; serbest kısmı işaretle.",
      "Küçük genlikle titreştir; uzunluğu tek tek değiştir.",
      "Sesin kalın/ince algısını ve titreşim görüntüsünü karşılaştır; kulak yanına yaklaştırma."
    ],
    "principle": "Frekans ile genlik ayrı büyüklüklerdir; ses algısı tek başına frekans ölçümü değildir.",
    "variation": "Varsa mevcut cihaz kaydını görselleştir; uygulama olmadan nitel karşılaştırma da yapılabilir.",
    "sourceId": "sound-speed",
    "minAge": 9,
    "controls": "Cetvel türü ve başlangıç genliği yaklaşık aynı.",
    "measure": "Serbest uzunluk (cm), kalın/ince ses kategorisi.",
    "timing": "Cetvel çok bükülmez; kırılma ve göz hizası kontrolü."
  },
  {
    "id": "periscope",
    "title": "İki aynayla görüş yolunu tasarla",
    "domain": "night",
    "materials": [
      "mirror",
      "cardboard",
      "protractor",
      "tape"
    ],
    "question": "İki aynanın açıları gözlem doğrultusunu nasıl değiştirir?",
    "steps": [
      "Kırılmaya dayanıklı aynaları öğretmen karton kutuya sabitlesin.",
      "Bir işaret kartını dolaylı görmeye çalışıp ayna açılarını çiz.",
      "Yüzey normallerini ekle; görüş yolunun çizimle uyumunu kontrol et."
    ],
    "principle": "Düz aynada geliş ve yansıma açısı yüzey normaline göre eşittir.",
    "variation": "Aynaları tek tek değiştirerek hangi görüş yollarının kapanacağını tahmin et.",
    "sourceId": "reflection",
    "minAge": 9,
    "controls": "Hedef ve gözlem konumu aynı; aynalar güvenle sabit.",
    "measure": "Açı (°) ve görünür/görünmez durumu.",
    "timing": "Güneş, lazer veya güçlü ışığa bakılmaz."
  },
  {
    "id": "cooling",
    "title": "Hangi kap kılıfı ısı aktarımını azaltır?",
    "domain": "physics",
    "materials": [
      "water",
      "cups",
      "cloth",
      "paper",
      "thermometer",
      "timer"
    ],
    "question": "Aynı başlangıç sıcaklığındaki ılık sular farklı kılıflarda nasıl soğur?",
    "steps": [
      "Öğretmen eş kaplara dokunmaya uygun ılık su hazırlayıp ilk sıcaklığı ölçsün.",
      "Bir kabı kâğıt, birini kumaşla sar; birini kılıfsız bırak.",
      "Aynı aralıklarla sıcaklıkları ölç; alev ve ısıtıcı kullanma."
    ],
    "principle": "Isı aktarımı ortamla sıcaklık farkına bağlıdır; yalıtım enerji üretmez.",
    "variation": "Sıcaklık-zaman eğrilerini karşılaştırıp ortam sıcaklığını da kaydet.",
    "sourceId": "acs-melting",
    "minAge": 9,
    "controls": "Su miktarı, kap ve başlangıç sıcaklığı aynı.",
    "measure": "Sıcaklık (°C), süre (dk).",
    "timing": "Sıcak suyu yalnız öğretmen hazırlar; ön deneme gerekir."
  },
  {
    "id": "elastic",
    "title": "Esnek şeritte yük ve uzama",
    "domain": "physics",
    "materials": [
      "elastic",
      "weight",
      "ruler",
      "cards"
    ],
    "question": "Küçük yüklerde uzama yük miktarıyla orantılı mı?",
    "steps": [
      "Öğretmen lateks içermeyen eğitim şeridini alçak düzende güvenle sabitlesin.",
      "Küçük eş yükleri yavaşça ekle; her seferinde uzunluğu ölç.",
      "Yükleri aynı sırayla çıkar; geri dönüşü karşılaştır; şeridi fırlatıcı yapma."
    ],
    "principle": "Bazı esnek malzemelerde ilişki belirli aralıkta yaklaşık doğrusal olabilir; elastik şerit ideal yay sayılmaz.",
    "variation": "Yükleme/boşaltma grafiğinde aynı yükteki uzunluk farkını araştır.",
    "sourceId": "energy",
    "minAge": 13,
    "controls": "Şerit ve bekleme süresi aynı; çok küçük yük.",
    "measure": "Yük parçası sayısı ve uzama (cm).",
    "timing": "Kopma ön denemesi ve göz hizasından uzak düzenek."
  },
  {
    "id": "planet-scale",
    "title": "Gezegenler ne kadar uzak?",
    "domain": "astronomy",
    "materials": [
      "cards",
      "ruler",
      "string"
    ],
    "question": "Çap ve uzaklık için aynı ölçek kullanılınca sınıf modeli nasıl görünür?",
    "steps": [
      "NASA başvurusundan uzaklık ve çap değerlerini öğretmen seçip kaynak/tarih yazsın.",
      "Önce yalnız uzaklıkları seçili ölçeğe çevirip kartları yerleştir.",
      "Çapları da aynı ölçeğe çevir; görülebilirlik sorununu ayrı tartış."
    ],
    "principle": "Gezegen çapı ve yörünge uzaklığı farklı ölçülerdir; iki ölçek kullanılıyorsa açıkça belirtilir.",
    "variation": "Alan sınırlıysa uzaklık ölçeğini yeniden hesapla; gerçek değerleri uydurma.",
    "sourceId": "nasa-solar",
    "minAge": 9,
    "controls": "Bütün uzaklıklar aynı birim ve aynı ölçekle çevrilir.",
    "measure": "Model uzaklığı (cm/m), ölçek oranı.",
    "timing": "Dış mekânda trafik ve alan izni kontrol edilir."
  },
  {
    "id": "day-night",
    "title": "Dünya dönerken aydınlık bölge",
    "domain": "astronomy",
    "materials": [
      "ball",
      "led",
      "marker"
    ],
    "question": "Sabit ışık kaynağına göre Dünya modeli dönerken işaretli nokta nasıl aydınlanır?",
    "steps": [
      "Büyük topa bir gözlem noktası işaretle; LED ışığını sabit tut.",
      "Topu kendi ekseni etrafında çevirip noktanın aydınlık durumunu kaydet.",
      "Bu hareketi ışık çevresinde dolanmayla karıştırmadan çiz."
    ],
    "principle": "Gece-gündüz Dünya dönmesiyle ilişkilidir; Ay evreleriyle aynı gözlem değildir.",
    "variation": "İki farklı enlemdeki işaretleri aynı dönme boyunca karşılaştır.",
    "sourceId": "nasa-seasons",
    "minAge": 6,
    "controls": "Işık ve gözlem doğrultusu aynı.",
    "measure": "Dönme konumu ve aydınlık/karanlık kategorisi.",
    "timing": "LED göze tutulmaz; model gerçek boyut ölçeğinde değildir."
  },
  {
    "id": "tilted-light",
    "title": "Eksen eğikliğiyle ışığın yayılması",
    "domain": "astronomy",
    "materials": [
      "ball",
      "led",
      "paper",
      "protractor"
    ],
    "question": "Aynı ışık eğik ve dik yüzeyde aynı alanı mı kaplar?",
    "steps": [
      "LED ile kâğıttaki aydınlık bölgeyi güvenli mesafeden işaretle.",
      "Mesafeyi sabit tutup kâğıt açısını değiştir; sınırları çiz.",
      "Top modelinde iki yarımküreyi karşılaştır; lambayla ısı ölçümü yaptığını iddia etme."
    ],
    "principle": "Geliş açısı enerjinin yüzeye dağılımını etkiler; mevsimleri yalnız uzaklıkla açıklamak yanlıştır.",
    "variation": "Yüzey açısı ile aydınlatılan alanın yaklaşık ilişkisini araştır.",
    "sourceId": "nasa-seasons",
    "minAge": 9,
    "controls": "LED, mesafe ve ortam aydınlığı aynı.",
    "measure": "Açı (°), yaklaşık alan (cm²).",
    "timing": "Güneşe doğrudan bakma veya ışık odaklama yok."
  },
  {
    "id": "transit-model",
    "title": "Bir gezegen yıldız ışığını ne kadar örter?",
    "domain": "astronomy",
    "materials": [
      "paper",
      "cards",
      "ruler"
    ],
    "question": "Farklı model gezegen diskleri aynı yıldız diskini ne oranda örter?",
    "steps": [
      "Kâğıda bir yıldız diski ve farklı büyüklükte gezegen diskleri çiz.",
      "Gezegen diskini yıldızın önünden geçirirken örtülen alanı kareli çizimle tahmin et.",
      "Göreli örtülen alanı konuma göre çiz; bunu gerçek teleskop ölçümü sayma."
    ],
    "principle": "Geçişte yıldız ışığının bir bölümü örtülür; basit alan modeli yıldızın her yerini eş parlak kabul eder.",
    "variation": "Yörünge doğrultusu değişince geçişin görünmeyebileceğini modelle.",
    "sourceId": "nasa-transit",
    "minAge": 13,
    "controls": "Yıldız diski, hareket çizgisi ve çizim ölçeği aynı.",
    "measure": "Örtülen alan oranı (%) ve model konumu.",
    "timing": "Teleskop veya Güneş gözlemi yapılmaz."
  },
  {
    "id": "random-cards",
    "title": "Olasılık tahmini kaç tekrarla değişir?",
    "domain": "math",
    "materials": [
      "cards",
      "pencil"
    ],
    "question": "Bilinen karışımda rastgele çekiliş oranı tekrar sayısıyla nasıl değişir?",
    "steps": [
      "İki sembolden bilinen sayıda kart hazırlayıp karıştır.",
      "Bakmadan bir kart seç; kaydettikten sonra geri koyup karıştır.",
      "Her on çekilişte sembol oranını hesapla; rastgele dalgalanmayı kaydet."
    ],
    "principle": "Sonlu örneklemde gözlenen oran teorik orandan sapabilir; tekrar sayısı kesin eşitliği garanti etmez.",
    "variation": "Kartı geri koymadan yapılan örneklemenin soruyu nasıl değiştirdiğini karşılaştır.",
    "sourceId": "statistics-design",
    "minAge": 9,
    "controls": "Kart karışımı ve yerine koyma yöntemi sabit.",
    "measure": "Çekiliş sayısı, sembol sıklığı ve oran (%).",
    "timing": "Kişisel veri ve kumar/bahis yok."
  },
  {
    "id": "sample-bias",
    "title": "Örnekleme yöntemi sonucu değiştirir mi?",
    "domain": "math",
    "materials": [
      "cards",
      "pencil"
    ],
    "question": "Üstten seçilen kartlarla karışık desteden çekilen kartlar aynı dağılımı verir mi?",
    "steps": [
      "Bilinen sembol dağılımını kartlara yaz; benzer kartları bir bölümde topla.",
      "Aynı sayıda kartı önce üstten, sonra karıştırılmış desteden seç.",
      "Her yöntemde oranları kaydet; toplam deste dağılımıyla karşılaştır."
    ],
    "principle": "Seçim yöntemi örneklem yanlılığı oluşturabilir; büyük örneklem yanlı seçimi otomatik düzeltmez.",
    "variation": "Birden çok karıştırma tekrarındaki sapmayı karşılaştır.",
    "sourceId": "statistics-design",
    "minAge": 13,
    "controls": "Deste içeriği ve örneklem büyüklüğü aynı.",
    "measure": "Kategori sıklığı ve oran (%).",
    "timing": "İnsanları veya çocukları sınıflandırma yok."
  },
  {
    "id": "euler-map",
    "title": "Bir rota bütün yolları bir kez geçebilir mi?",
    "domain": "math",
    "materials": [
      "paper",
      "pencil",
      "cards"
    ],
    "question": "Çizdiğimiz yol ağında her kenarı yalnız bir kez geçen rota var mı?",
    "steps": [
      "Düğümler ve kenarlardan oluşan bağlı, yönsüz küçük bir ağ çiz.",
      "Her düğümün kenar sayısını say; bir rota dene.",
      "Tek dereceli düğüm sayısıyla rota durumunu karşılaştır; düğüm ve kenarı ayrı işaretle."
    ],
    "principle": "Euler rotası kenarları, Hamilton rotası düğümleri esas alır; bağlılık varsayımı önemlidir.",
    "variation": "Ağa bir kenar ekleyince hangi koşulun değiştiğini araştır.",
    "sourceId": "math-graphs",
    "minAge": 9,
    "controls": "Ağın yönsüz olması ve bağlılık açıkça belirtilir.",
    "measure": "Düğüm derecesi, kullanılan kenar sayısı.",
    "timing": "Kâğıt üzerinde; gerçek trafik yönlendirmesi değildir."
  },
  {
    "id": "circle-ratio",
    "title": "Çevre/çap oranını ölçerek araştır",
    "domain": "math",
    "materials": [
      "cups",
      "string",
      "ruler",
      "paper"
    ],
    "question": "Farklı çemberlerde ölçülen çevre/çap oranları ne kadar tutarlı?",
    "steps": [
      "Farklı kap ağızlarının çapını cetvelle, çevresini esnemeyen iple ölç.",
      "Her ölçümü birkaç kez yapıp aynı birimde yaz.",
      "Çevre/çap oranını hesapla; saçılmayı araç ve yönteme göre tartış."
    ],
    "principle": "Çemberde çevre/çap oranı π ile ilişkilidir; ölçüm tam matematiksel değer vermez.",
    "variation": "Ölçüm tekrarını artır; ip esnemesinin sonuç yönünü düşün.",
    "sourceId": "circle",
    "minAge": 9,
    "controls": "Çap ve çevre aynı çemberde, aynı birimde ölçülür.",
    "measure": "Çap/çevre (cm), boyutsuz oran.",
    "timing": "Kaplar kırılmayan türden olmalı."
  },
  {
    "id": "fold-pattern",
    "title": "Katlama sayısı ve bölge örüntüsü",
    "domain": "origami",
    "materials": [
      "paper",
      "pencil"
    ],
    "question": "Belirli katlama kuralıyla oluşan bölge sayısı nasıl değişir?",
    "steps": [
      "Her turda bütün kâğıdı aynı yönde ikiye katla; ön denemeyle az tur seç.",
      "Her aşamada açıp izlenen bölge sayılarını çiz.",
      "Örüntüyü yalnız bu katlama kuralı için tahmin et; başka yönlere genelleme."
    ],
    "principle": "Örüntü kurala bağlıdır; bir örnek sayısal iddianın genel ispatı değildir.",
    "variation": "Katlama yönünü değiştirip eski kuralın hangi koşulda bozulduğunu araştır.",
    "sourceId": "math-sequences",
    "minAge": 6,
    "controls": "Kâğıt ve katlama kuralı sabit.",
    "measure": "Katlama turu ve sayılan bölge sayısı.",
    "timing": "Kâğıt kalınlaşınca zorlamayı bırak; kesici araç yok."
  },
  {
    "id": "measurement-order",
    "title": "Ölçüm sırası ve sürüklenme",
    "domain": "math",
    "materials": [
      "ruler",
      "paper",
      "pencil",
      "cards"
    ],
    "question": "Grupların ölçüm sırası kaydedilen değerleri etkiliyor olabilir mi?",
    "steps": [
      "Aynı çizgi uzunluğunu farklı turlarda aynı araçla ölç.",
      "Tur sırasını kart çekerek değiştir; değerleri anonim grup koduyla yaz.",
      "Sıra ile sapmayı karşılaştır; araç çözünürlüğünden küçük farkı kesin sayma."
    ],
    "principle": "Rastgele sıra bazı sistematik etkileri azaltabilir; bütün hata kaynaklarını yok etmez.",
    "variation": "Aynı kişinin tekrarlarıyla farklı grupların ölçümlerini ayrı incele.",
    "sourceId": "uncertainty-repeat",
    "minAge": 13,
    "controls": "Hedef çizgi ve ölçü aracı aynı.",
    "measure": "Uzunluk (mm/cm), tur numarası.",
    "timing": "Kişisel başarı puanı veya çocuk ismi tutulmaz."
  },
  {
    "id": "leakage",
    "title": "Test kartları eğitimde görünürse ne olur?",
    "domain": "ai",
    "materials": [
      "cards",
      "pencil"
    ],
    "question": "Aynı örnekleri eğitim ve testte kullanmak başarı izlenimini değiştirir mi?",
    "steps": [
      "Kurgusal geometrik şekil kartlarını eğitim ve ayrı test grubuna ayır.",
      "Yalnız eğitim grubundan bir sınıflandırma kuralı geliştir.",
      "Ayrı kartlarda dene; aynı eğitim kartlarıyla çıkan başarıyı ayrı göster."
    ],
    "principle": "Test verisini eğitimde kullanmak bağımsız değerlendirmeyi bozar; bu etkinlik kural modeli simülasyonudur.",
    "variation": "Sembollerin görünüşünü değiştirerek dağılım değişimini araştır.",
    "sourceId": "ml-data-split",
    "minAge": 13,
    "controls": "Test kartları kural kurulurken görülmez.",
    "measure": "Doğru/yanlış sayısı ve test doğruluğu (%).",
    "timing": "Çocuk verisi, yüz fotoğrafı veya hesap açılması yok."
  },
  {
    "id": "overfit-cards",
    "title": "Kural neden yeni kartlarda bozulur?",
    "domain": "ai",
    "materials": [
      "cards",
      "pencil"
    ],
    "question": "Her eğitim kartını ezberleyen kural yeni örneklere genellenir mi?",
    "steps": [
      "Öğretmen kurgusal şekil kartları ve gizli yeni örnekler hazırlar.",
      "Bir grup her eğitim kartına özel kural, diğeri ortak özellik kuralı kursun.",
      "Yeni kartlarda hata türlerini karşılaştır; öğrenilmiş model çalıştırıldığını iddia etme."
    ],
    "principle": "Aşırı uyum eğitim örneklerinde iyi sonuç verirken yeni veride zayıf olabilir.",
    "variation": "Yeni test setinde kuralı değiştirmeden tekrar değerlendir.",
    "sourceId": "ml-overfitting",
    "minAge": 13,
    "controls": "İki grup aynı eğitim ve gizli test örneklerini kullanır.",
    "measure": "Eğitim/test hata sayıları.",
    "timing": "Kurgusal veriler ve kişisel olmayan şekiller."
  },
  {
    "id": "threshold",
    "title": "Bir eşik değişince hatalar nasıl değişir?",
    "domain": "ai",
    "materials": [
      "cards",
      "pencil",
      "ruler"
    ],
    "question": "Aynı kurgusal puanlarda karar eşiği yanlış pozitif/negatif sayılarını nasıl değiştirir?",
    "steps": [
      "Öğretmen kurgusal puan ve doğru sınıf içeren kartlar hazırlasın.",
      "Farklı eşiklerle pozitif kararları işaretle.",
      "Her eşikte hata tablosu çıkar; doğruluğu tek başarı ölçütü sayma."
    ],
    "principle": "Karar eşiği precision ve recall dengesini etkileyebilir; uygulama hedefi önemlidir.",
    "variation": "Hata türlerine farklı kurgusal maliyetler verip kararları tartış.",
    "sourceId": "google-metrics",
    "minAge": 13,
    "controls": "Kart puanları ve doğru sınıflar aynı.",
    "measure": "Eşik, TP/FP/FN/TN adetleri.",
    "timing": "Tıbbi tanı, çocuk profili veya gerçek kişi kararı verilmez."
  },
  {
    "id": "model-evidence",
    "title": "Akıcı yanıt mı, kaynaklı iddia mı?",
    "domain": "ai",
    "materials": [
      "cards",
      "paper",
      "pencil"
    ],
    "question": "Bir yanıtın düzgün yazılması doğruluğunu göstermek için yeterli mi?",
    "steps": [
      "Öğretmen kurgusal iki kısa yanıt ve doğrulanabilir başvuru parçaları hazırlasın.",
      "İddiaları tek tek eşleştir; desteklenen, desteklenmeyen ve belirsiz olarak işaretle.",
      "Kanıt bulamamak ile iddianın yanlışlığını ayrı yorumla."
    ],
    "principle": "Üretken modelin akıcılığı doğruluk kanıtı değildir; kaynak iddiayı doğrudan desteklemelidir.",
    "variation": "İddiayı hangi yeni gözlem veya kaynakla sınayabileceğini tasarla.",
    "sourceId": "nist-genai",
    "minAge": 9,
    "controls": "Aynı iddialar aynı başvuru parçalarıyla karşılaştırılır.",
    "measure": "Destek durumunun kategori sayısı.",
    "timing": "Canlı model çağrısı yok; yazılmış örneklerle çalışılır."
  },
  {
    "id": "potato-water",
    "title": "Patatesin kütlesi suda nasıl değişir?",
    "domain": "microbiology",
    "materials": [
      "potato",
      "water",
      "salt",
      "cups",
      "scale"
    ],
    "question": "Eş patates örneklerinin su ve etiketli tuzlu suda kütle değişimi aynı mı?",
    "steps": [
      "Patates parçalarını öğretmen eş boyutlarda kesip başlangıç kütlelerini ölçsün.",
      "Su ve öğretmenin hazırladığı etiketli tuzlu suya aynı süre yerleştir.",
      "Yüzey suyunu aynı şekilde uzaklaştırıp yeniden tart; deney parçalarını yeme."
    ],
    "principle": "Ozmoz, seçici geçirgen zar boyunca su hareketiyle ilişkilidir; net yön koşullara bağlıdır.",
    "variation": "Yüzey kurutma yönteminin ölçümü nasıl etkilediğini kontrol et.",
    "sourceId": "biology-osmosis",
    "minAge": 13,
    "controls": "Parça boyutu, bekleme süresi ve tartma/kurutma yöntemi aynı.",
    "measure": "Başlangıç/son kütle (g), yüzde değişim (%).",
    "timing": "Ön deneme gerekir; görünür fark saatler alabilir, ders süresine sığması garanti değil."
  },
  {
    "id": "seed-water",
    "title": "Tohumda su ve çimlenme gözlemi",
    "domain": "microbiology",
    "materials": [
      "seeds",
      "cotton",
      "water",
      "cups",
      "ruler"
    ],
    "question": "Aynı tohum türünde nem koşulu çimlenme gözlemini nasıl etkiler?",
    "steps": [
      "Öğretmen temiz tohumları eş gruplara ve aynı kaplara ayırsın.",
      "Bir grubu uygun nemde, diğerini kuru karşılaştırma olarak tut; ışık/sıcaklık aynı olsun.",
      "Günlük çimlenen sayıyı ve kök uzunluğunu kaydet; küf varsa öğretmen kapalı olarak uzaklaştırsın."
    ],
    "principle": "Çimlenme ve fotosentez farklı süreçlerdir; tohum gereksinimleri tür ve koşula bağlıdır.",
    "variation": "Tohum sayısını artırıp tek örnekle yorum yapmanın sınırını incele.",
    "sourceId": "photosynthesis",
    "minAge": 9,
    "controls": "Tohum türü/sayısı, ışık ve sıcaklık aynı.",
    "measure": "Çimlenen adet, kök uzunluğu (mm), gün.",
    "timing": "Günlere yayılan gözlem; mikroorganizma kültürü yapılmaz."
  },
  {
    "id": "root-direction",
    "title": "Kök hangi yöne büyür?",
    "domain": "microbiology",
    "materials": [
      "seeds",
      "cotton",
      "water",
      "cups",
      "ruler",
      "cards"
    ],
    "question": "Çimlenmiş tohumun yönü değişince kök doğrultusu nasıl gelişir?",
    "steps": [
      "Öğretmen temiz, görünür köklü örnekleri önceden hazırlasın.",
      "Bir grubun yönünü kontrollü değiştir; diğerini aynı yönde koru.",
      "Sonraki günlerde kök doğrultusunu çiz; ışık ve nemi aynı tut."
    ],
    "principle": "Bitkiler yerçekimi gibi uyaranlara büyüme tepkisi verebilir; kökün kıvrılması anlık hareket değildir.",
    "variation": "Kökün eski ve yeni kısımlarını ayrı işaretleyerek zamanı araştır.",
    "sourceId": "biology-tropism",
    "minAge": 9,
    "controls": "Bitki türü, nem ve ışık aynı; yalnız yön değişir.",
    "measure": "Büyüme yönü (çizim/°) ve geçen gün.",
    "timing": "Öğretmen temiz örnek hazırlar; küflü örnekler açılmaz."
  },
  {
    "id": "cell-scale",
    "title": "Hücre resminde büyütme ile ayrıntı",
    "domain": "microbiology",
    "materials": [
      "cards",
      "ruler",
      "paper"
    ],
    "question": "Aynı görüntüyü büyütmek gerçekten yeni ayrıntı ekler mi?",
    "steps": [
      "Öğretmen güvenilir bir hücre görüntüsünü iki baskı büyüklüğünde ve ölçek bilgisiyle hazırlar.",
      "Görünen aynı yapıları işaretleyip baskı boyutlarını ölç.",
      "Görüntüyü büyütmeyle cihazın çözünürlüğünü ayrı tartış; tür tanısı yapma."
    ],
    "principle": "Büyütme ile çözünürlük farklıdır; resmin büyümesi bulunmayan ayrıntıyı ortaya çıkarmaz.",
    "variation": "Varsa hazır eğitim preparatı görüntüsüyle baskı modelinin sınırlarını karşılaştır.",
    "sourceId": "cells",
    "minAge": 9,
    "controls": "İki baskı aynı özgün görüntüden ve aynı ayrıntıdan üretilir.",
    "measure": "Baskı boyutu (cm), ayırt edilen yapı kategorisi.",
    "timing": "Canlı numune ve bilinmeyen kültür yok."
  },
  {
    "id": "robot-loop",
    "title": "Robot yolu: tekrar mı tek tek komut mu?",
    "domain": "robotics",
    "materials": [
      "cards",
      "paper",
      "pencil"
    ],
    "question": "Bir rota döngüyle yazıldığında komut sayısı nasıl değişir?",
    "steps": [
      "Kâğıda kareli bir rota çizip başlangıç ve hedefi işaretle.",
      "İlk çözümde bütün adımları tek tek, ikincide tekrar bloklarıyla yaz.",
      "Bir kartı robot kabul ederek komutları simüle et; hedef ve komut sayısını karşılaştır."
    ],
    "principle": "Döngü tekrarlanan komutları ifade eder; daha kısa program her koşulda daha hızlı veya doğru demek değildir.",
    "variation": "Rotaya bir engel ekleyip eski döngünün hangi varsayımını bozduğunu araştır.",
    "sourceId": "scratch",
    "minAge": 6,
    "controls": "Başlangıç, hedef ve hareket kuralları aynı.",
    "measure": "Komut sayısı, adım sayısı, hedefe ulaşma durumu.",
    "timing": "Fiziksel robot veya elektronik bağlantı gerekmez."
  },
  {
    "id": "robot-sensor",
    "title": "Sensör hatasıyla karar veren robot",
    "domain": "robotics",
    "materials": [
      "cards",
      "paper",
      "pencil"
    ],
    "question": "Kurgusal sensör ölçümü gürültülüyse aynı karar kuralı nasıl davranır?",
    "steps": [
      "Öğretmen kurgusal uzaklık kartları ve karar eşiği hazırlasın.",
      "Her kartta robotun dur/ilerle kararını elle uygula.",
      "Tek ölçüm ve üç ölçümlük özetle kararları karşılaştır; sonuçları simülasyon diye etiketle."
    ],
    "principle": "Sensör girdisi ve kural programı makine öğrenmesiyle aynı değildir; ölçüm hatası kararları etkileyebilir.",
    "variation": "Güvenli hata durumunda durma kuralı ekleyip maliyeti karşılaştır.",
    "sourceId": "scratch",
    "minAge": 13,
    "controls": "Sensör kartları, eşik ve başarı ölçütü açık.",
    "measure": "Kurgusal uzaklık (cm), karar ve hata sayısı.",
    "timing": "Gerçek robot çalıştırılmaz; kişiye çarpan düzenek yok."
  },
  {
    "id": "electrolyte-series",
    "title": "İyonlu çözeltilerde iletkenlik–derişim ilişkisi",
    "domain": "chemistry",
    "materials": [
      "citrate",
      "magnesium-sulfate",
      "water",
      "conductivity-meter",
      "thermometer",
      "measure-cup"
    ],
    "question": "Aynı nominal derişimde farklı iyonlu maddeler aynı iletkenlik eğrisini verir mi?",
    "steps": [
      "Öğretmen ürün kimliği/SDS ve okul protokolüyle etiketli çözelti serisini hazırlar; derişimleri kayıt altına alır.",
      "Kalibre edilmiş pilli EC ölçerle aynı sıcaklık ve prob koşulunda ölç; her seride su başvurusu ve tekrar kullan.",
      "İletkenliği nominal derişime karşı çiz; maddeler ve kalibrasyon belirsizliği arasında karşılaştırma yap."
    ],
    "principle": "Çözeltide hareketli iyonlar iletime katkı verir; iyon türü, miktarı ve sıcaklık sonucu etkiler. Aynı iletkenlik aynı kimyasal bileşim demek değildir.",
    "variation": "İletkenlik eğrilerinin doğrusal kaldığı aralığı sınayıp TDS dönüşüm katsayısının varsayımını araştır.",
    "sourceId": "electrolytes",
    "minAge": 13,
    "controls": "Sıcaklık, prob geometrisi, kalibrasyon ve hazırlama yöntemi aynı.",
    "measure": "EC (µS/cm), kayıtlı derişim ve sıcaklık (°C).",
    "timing": "Öğretmen çözeltileri önceden hazırlar; ürün derişimi burada uydurulmaz.",
    "depth": "κ–c eğrisinin eğimi ve artıklarını değerlendir. Farklı tuzlarda tek evrensel katsayı bekleme; araç çözünürlüğü, sıcaklık telafisi ve seyrelti hazırlama hatasını ayrı yaz.",
    "difficulty": "advanced"
  },
  {
    "id": "vitamin-calibration",
    "title": "C vitamini analizinde kalibrasyon ve numune etkisi",
    "domain": "chemistry",
    "materials": [
      "ascorbic",
      "vitamin-c-kit",
      "measure-cup",
      "dropper",
      "goggles"
    ],
    "question": "Aynı eğitim setiyle standart ve farklı numunelerde elde edilen cevap kalibrasyonla tutarlı mı?",
    "steps": [
      "Öğretmen eğitim setinin uygun okul yönergesiyle etiketli askorbik asit standartlarını ve kör örneği hazırlasın.",
      "Aynı set/protokolle standart cevaplarını ve numuneleri tekrar ölç; reaktif kimliği ve son nokta ölçütünü kaydet.",
      "Numune cevabını kalibrasyon aralığı içinde değerlendir; renk/bulanıklık ve diğer indirgen maddelerin etkisini tartış."
    ],
    "principle": "Askorbik asit iyotla yükseltgenme–indirgenme tepkimesinde rol alabilir. Numunede gözlenen cevap yalnız C vitaminine özgü olmayabilir.",
    "variation": "Kalibrasyon aralığını ve numune matrisi etkisini ayır; elde edilen sonucun beslenme/tıbbi tanı olmadığını açıkla.",
    "sourceId": "rsc-vitc-calibration",
    "minAge": 13,
    "controls": "Set reaktifleri, numune hacmi ve tanımlı son nokta koşulu aynı.",
    "measure": "Setin tanımladığı damla/hacim cevabı ve standart miktarı; ölçülmemiş mg değeri yazılmaz.",
    "timing": "Yalnız öğretmenin onaylı set yönergesi; okul hazırlığı ve göz koruması gerekir.",
    "depth": "Standart eğri, kör düzeltmesi ve tekrarlı belirsizlik kullan. Antiseptik iyodu eğitim reaktifiyle eşitleme; kaynakta olmayan derişim veya doz tarif etme.",
    "difficulty": "advanced"
  },
  {
    "id": "acetate-curve",
    "title": "Kapalı sodyum asetat paketinde sıcaklık eğrisi",
    "domain": "chemistry",
    "materials": [
      "acetate-pack",
      "thermometer",
      "timer",
      "cloth"
    ],
    "question": "Kapalı ısı paketinin sıcaklık eğrisinde ısı açığa çıkışı ve kayıp nasıl ayrılır?",
    "steps": [
      "Üretici yönergesini öğretmen kontrol etsin; sağlam paketin dış sıcaklığını ve oda sıcaklığını kaydet.",
      "Paketi açmadan yönergesine göre etkinleştir; aynı konumda eş zaman aralıklarıyla dış sıcaklığı ölç.",
      "Eş ürünlerde kılıflı/kılıfsız durumları ayrı tekrarlarla karşılaştır; ambalajı kesme veya yeniden çözelti hazırlama."
    ],
    "principle": "Sodyum asetat paketinde çekirdeklenme ve kristallenme ısı açığa çıkarabilir; bu suyun donmasıyla aynı kimyasal sistem değildir.",
    "variation": "Eğrinin yükselme ve soğuma bölümlerini ayır; yüzey sıcaklığının içerideki sıcaklıkla aynı olmadığını modelle.",
    "sourceId": "rsc-heatpack",
    "minAge": 13,
    "controls": "Paket türü, başlangıç koşulu, sensör yeri ve örnekleme aralığı aynı.",
    "measure": "Dış sıcaklık (°C), ortam sıcaklığı (°C), süre (s).",
    "timing": "Etkinleşme üretici ürününe bağlı; bütün kristal deneylerine süre genellenmez.",
    "depth": "Paketin toplam ısı çıktısını yalnız yüzey eğrisinden kesin hesaplama. Sensör gecikmesi, ortam kaybı ve faz değişimi birlikte değerlendirilir.",
    "difficulty": "advanced"
  },
  {
    "id": "alginate-response",
    "title": "Aljinat ağında koşul ve mekanik cevap",
    "domain": "chemistry",
    "materials": [
      "gel-kit",
      "measure-cup",
      "ruler",
      "scale",
      "goggles"
    ],
    "question": "Etiketli eğitim setinde jel oluşturma koşulu aynı boyuttaki numunenin şekil cevabını değiştirir mi?",
    "steps": [
      "Öğretmen set yönergesi/SDS ile aynı geometride numuneleri farklı kayıtlı temas sürelerinde hazırlasın; boya gerekmiyor.",
      "Aynı küçük yük ve bekleme süresinde numune boyut değişimini ölç; sınırları ön denemeyle belirle.",
      "Cevabı temas süresine karşı karşılaştır; yük kaldırılınca geri dönüşü ayrıca kaydet."
    ],
    "principle": "Aljinat zincirleri arasında kalsiyum aracılı ağ oluşabilir; hazırlama ve geometri mekanik cevabı etkiler. Bu basit ölçüm profesyonel reometreyle eşdeğer değildir.",
    "variation": "Yalnız tek koşulu değiştirerek tarama yap; ileri aşamada iki koşullu tasarım için öğretmen protokolü geliştir.",
    "sourceId": "alginate-rheology",
    "minAge": 13,
    "controls": "Geometri, ürün derişimi, ölçüm yükü, bekleme ve sıcaklık aynı.",
    "measure": "Boyut değişimi (mm), yük (g), temas süresi (s/dk).",
    "timing": "Set hazırlığı öğretmen tarafından; jel yenmez ve bilinmeyen karışım miktarı verilmez.",
    "depth": "Boyutsuz bağıl deformasyonu hesapla. Numunenin kuruması, yük geçmişi ve geri dönüşsüz değişimi ayır; ölçümden tek bir Young modülü uydurma.",
    "difficulty": "advanced"
  },
  {
    "id": "gel-flow",
    "title": "Biyopolimerlerde akış ölçümü ve model seçimi",
    "domain": "chemistry",
    "materials": [
      "gelatin",
      "agar",
      "glycerol",
      "water",
      "cups",
      "thermometer",
      "timer"
    ],
    "question": "Ürün yönergesiyle hazırlanmış biyopolimer örneklerinde tek bir akış süresi tüm davranışı açıklar mı?",
    "steps": [
      "Öğretmen etiketli ürünlerle göz/cilt ve ısı riski değerlendirilmiş örnekleri önceden hazırlasın.",
      "Aynı düşük riskli kap geometrisinde akış veya şekil değiştirme gözlemini aynı sıcaklıkta yap.",
      "Farklı başlangıç hareketlerine verilen cevabı kaydet; akan ve jel hâlindeki örneğe aynı ölçüm modeli dayatma."
    ],
    "principle": "Akış süresi cihaz ve koşula bağlıdır; yoğunluk, viskozite ve jel elastikliği aynı özellikler değildir.",
    "variation": "Sıcaklık ya da yükleme hızını ayrı araştırma olarak seç; numune hazırlama geçmişini kaydet.",
    "sourceId": "alginate-rheology",
    "minAge": 13,
    "controls": "Numune geçmişi, kap geometrisi ve seçilen sıcaklık aynı.",
    "measure": "Süre (s), şekil değişimi (mm), sıcaklık (°C).",
    "timing": "Hazırlık ve gerekirse kontrollü ısıtma yalnız öğretmende; hazır numune incelemesi.",
    "depth": "Bu karşılaştırma alginat reoloji kaynağından geliştirilmiş bir taslaktır; jelatin/agar için sayısal davranış veya başarı garantisi değildir. Profesyonel viskozite değeri için kalibrasyon/model gerekir.",
    "difficulty": "advanced"
  },
  {
    "id": "malus-model",
    "title": "Polarizasyon ölçümünde Malus modeli ve ofset",
    "domain": "physics",
    "materials": [
      "polarizers",
      "led",
      "light-meter",
      "protractor",
      "cardboard"
    ],
    "question": "İki doğrusal filtre arasındaki açı ile göreli ışık sinyali ideal modele ne kadar uyuyor?",
    "steps": [
      "LED, filtre ve pilli sensörü öğretmen sabitlesin; karanlık ofseti ve doygunluğu kontrol et.",
      "Bir filtre sabitken diğerini farklı kayıtlı açılara döndür; her açıda tekrarlı sensör değeri al.",
      "Ofseti ayırıp göreli sinyali cos²θ ile karşılaştır; ham sensör değerini mutlak optik güç sayma."
    ],
    "principle": "İdeal doğrusal polarizasyon karşılaştırmasında Malus ilişkisi I ∝ cos²θ biçimindedir; gerçek filtre ve sensör ideal değildir.",
    "variation": "Model artıklarında açı hatası ile arka plan ışığını ayır; döndürme yönünü değiştirerek tekrar yap.",
    "sourceId": "polarization",
    "minAge": 13,
    "controls": "LED gücü, sensör uzaklığı, ortam ışığı ve sabit filtre yönü aynı.",
    "measure": "Açı (°), sensör sinyali/lux ve boyutsuz normalizasyon.",
    "timing": "Güneş, lazer ve yüksek güçlü ışık yok; mevcut sensör yoksa nitel model.",
    "depth": "I(θ)=A cos²(θ−θ₀)+B modeli üzerinde A, θ₀ ve B rollerini tartış. Telefon sensörü spektral yanıtı ve otomatik ayarları belirsizlik getirir.",
    "difficulty": "advanced"
  },
  {
    "id": "grating-spectrum",
    "title": "LED spektrumunda geometriyle dalga boyu tahmini",
    "domain": "physics",
    "materials": [
      "grating",
      "spectrometer-kit",
      "led",
      "ruler",
      "protractor"
    ],
    "question": "Etiketli ızgarayla görülen farklı LED bantları için geometri aynı dalga boyu tahminini verir mi?",
    "steps": [
      "Öğretmen düşük güçlü LED ve eğitim spektrometre setini üretici yönergesine göre sabitlesin; ızgara çizgi sıklığını kaydet.",
      "Merkez yönü ve seçilen birinci mertebe bandın açısını/geometrisini aynı düzende ölç.",
      "Izgara aralığı ve açıdan dalga boyu tahmin et; bant genişliği ve ölçüm belirsizliğini ayrıca yaz."
    ],
    "principle": "Uygun ızgara geometrisinde maksimumlar d sinθ=mλ ilişkisiyle modellenebilir. LED çoğunlukla tek, sonsuz dar dalga boyu yaymaz.",
    "variation": "Sağ/sol mertebe tahminlerini karşılaştır; ölçeğin kaymasını ve merkez doğrultusu hatasını araştır.",
    "sourceId": "diffraction-grating",
    "minAge": 13,
    "controls": "Izgara, LED konumu, mertebe ve ölçüm düzlemi aynı.",
    "measure": "Açı (°), çizgi aralığı (m), dalga boyu tahmini (nm).",
    "timing": "Güneş veya lazer gözlemi yok; geometriyi öğretmen önceden kontrol eder.",
    "depth": "Çizgi/mm bilgisini önce d için metreye çevir. Küçük açı yaklaşımı yerine tam trigonometrik bağıntıyı kontrol et; spektrum rengi tek başına kesin λ ölçümü değildir.",
    "difficulty": "advanced"
  },
  {
    "id": "air-resonance",
    "title": "Hava sütununda sınır koşulu ve rezonans",
    "domain": "music",
    "materials": [
      "air-column",
      "computer",
      "ruler",
      "thermometer"
    ],
    "question": "Açık ve bir ucu kapalı aynı hava sütununda düşük sesli uyarı hangi modları öne çıkarır?",
    "steps": [
      "Öğretmen kör kenarlı eğitim tüpünü sabitlesin; yalnız rahat konuşma düzeyinde ses kullan.",
      "Mevcut cihazda yerel ses/spektrum aracı varsa farklı düşük sesli frekanslarda göreli cevabı gözle; yoksa kayıtlı eğitim verisi kullan.",
      "Açık/açık ve açık/kapalı sınır durumlarını aynı uzunlukta karşılaştır; genlik tepesini tek başına kesin özfrekans sayma."
    ],
    "principle": "İdeal hava sütunu modları sınır koşuluna bağlıdır; uç düzeltmesi ve ortam sıcaklığı gerçek ölçümü etkiler.",
    "variation": "Uzunluğu değiştirerek 1/L ölçeklemesini sınayıp tek bir moddan ses hızını kesinleştirmeme nedenini tartış.",
    "sourceId": "air-modes",
    "minAge": 13,
    "controls": "Uzunluk, uyarı düzeyi, mikrofon yeri ve ortam koşulu aynı.",
    "measure": "Uzunluk (m), frekans (Hz), göreli genlik ve sıcaklık (°C).",
    "timing": "BALKIZ ses kaydetmez; mevcut yerel araç veya örnek eğitim verisi kullanılır.",
    "depth": "Açık/açık için fₙ≈nv/(2L), açık/kapalı için tek n değerlerinde fₙ≈nv/(4L). Gerçek uç koşulları ve uç düzeltmesi sapma oluşturur.",
    "difficulty": "advanced"
  },
  {
    "id": "regression-selection",
    "title": "Doğrusal model seçimi ve örnekleme stratejisi",
    "domain": "math",
    "materials": [
      "computer",
      "cards",
      "pencil"
    ],
    "question": "Aynı ölçüm sayısıyla uçları mı yoksa dar bir aralığı mı örneklemek model eğimini daha iyi belirler?",
    "steps": [
      "Öğretmen kurgusal veya mevcut anonim fizik verisini, birimleri ve üretim koşuluyla hazırlasın.",
      "Eş büyüklükte iki alt örneklem oluştur: biri aralığı yaygın kapsasın, diğeri dar bölgede yoğunlaşsın.",
      "Doğrusal uyum ve artıklarını yerel araç/PhET ile karşılaştır; gerçek ölçüm yapılmış gibi sayılar uydurma."
    ],
    "principle": "Model sonucu seçilen örnekleme aralığına bağlıdır; düşük artıklar aralık dışındaki doğruluğu garanti etmez.",
    "variation": "Yeni bir kontrol aralığında iki modeli kıyasla; ölçüm belirsizliğini veri yayılımından ayır.",
    "sourceId": "statistics-regression",
    "minAge": 13,
    "controls": "Veri üretim koşulu, örnek sayısı ve uyum yöntemi aynı.",
    "measure": "Bağımsız/bağımlı değişkenin birimleri, eğim ve artıklar.",
    "timing": "API/ücretli servis olmadan mevcut yerel araç veya eğitim simülasyonu.",
    "depth": "Eğim/intercept birimlerini açık yaz; gerçek doğrusal olmayan fizik varsa uyum katsayısını bilimsel yasa diye sunma.",
    "difficulty": "advanced"
  },
  {
    "id": "ai-ablation",
    "title": "Sınıflandırmada özellik çıkarma deneyi",
    "domain": "ai",
    "materials": [
      "computer",
      "cards"
    ],
    "question": "Bir özelliği kaldırınca bağımsız testte hangi hata türleri değişiyor?",
    "steps": [
      "Kişisel olmayan kurgusal şekil/veri özellikleriyle eğitim ve bağımsız test kümelerini öğretmen hazırlasın.",
      "Aynı kural/model ve veri ayrımında yalnız bir özelliği çıkararak iki sürümü karşılaştır; örnek veriyle elle de uygulanabilir.",
      "Hata tablosu ve sınıf bazlı sonuçları kaydet; test kümesine bakarak modeli ayarlama."
    ],
    "principle": "Özellik seçimi ve bağımsız test ayrımı genelleme değerlendirmesini etkiler; bu etkinlikte gerçek model eğitimi yapıldıysa kullanılan araç/sürüm belirtilir.",
    "variation": "Gürültülü bir özellik ekleyip yanlış güven oluşumunu ölç; tahmin, gözlem ve yorumu ayrı yaz.",
    "sourceId": "ml-data-split",
    "minAge": 13,
    "controls": "Veri ayrımı, model/kural, eğitim yöntemi ve değerlendirme ölçütü aynı.",
    "measure": "TP/FP/FN/TN, doğruluk/recall ve sınıf sayıları.",
    "timing": "BALKIZ burada model eğitmez; yerel araç veya elle veri modeli kullanılabilir.",
    "depth": "Ablasyon bir kontrollü karşılaştırmadır. Tek koşuldan bütün veri dağılımları için sonuç çıkarma; birden fazla sabit ayrım/tekrar kullan.",
    "difficulty": "advanced"
  }
];
