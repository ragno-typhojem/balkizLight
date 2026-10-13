// Original local development proposals, not copied manuals or measured results.
export const EXPERIMENT_BANK = [
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
    "title": "Gıda boyasız kalem ayrıştırma",
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
  }
];
