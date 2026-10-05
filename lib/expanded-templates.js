import { activityLabel } from './activities.js?v=2.1.0';
import { SOURCES } from './knowledge.js?v=2.1.0';

// Original starting plans grouped by the user's folder headings, not imported lesson files.
const DRAFTS = [
  {
    id: 'color-lab', domain: 'chemistry', title: 'Bir rengin içindeki renkler',
    summary: 'Su ve filtre kâğıdıyla bir renk karışımının izini sürün.',
    goal: 'Gözlenen renkleri kaydetmek ve bir karışımı tek bir maddeyle karıştırmamak.',
    materials: 'Kahve filtresi, yeşil gıda boyası, su, geniş plastik kap, pamuklu çubuk, masa örtüsü ve kalem.',
    flow: [[5, 'Bir yeşil noktanın yalnızca tek renkten oluşup oluşmadığına dair tahminleri alın.'], [10, 'Gönüllü filtreye küçük bir boya noktası koysun. Kâğıdın alt ucu suya değsin, boya noktası başlangıçta su seviyesinin üstünde kalsın.'], [10, 'Su kâğıtta ilerlerken oluşan renkleri çizin; farklı grupların gözlemlerini karşılaştırın.'], [5, 'Tahmin ile gözlemi yan yana yazın. Kullanılan boya ayrışmadıysa bunu da sonuç olarak kaydedin.']],
    questions: ['Her grupta aynı renkler göründü mü?', 'Bir renk görmemiz, içinde tek madde olduğu anlamına gelir mi?'],
    evaluation: 'Her grup bir tahmin, bir gözlem ve yeniden denemek istediği bir koşul yazsın.',
    notes: 'Kâğıt kromatografisinde karışımdaki bileşenler su ve kâğıtla farklı etkileşimleri nedeniyle farklı ilerleyebilir. Her yeşil boya aynı bileşime sahip değildir; belirli renklerin çıkacağını garanti etmeyin.',
    safety: 'Gıda boyası etkinlik sırasında yenmez veya içilmez. Göze sürmeyin, dökülen suyu hemen silin; alkol ve başka çözücü eklemeyin. Hazırlığı gönüllü yapsın, boya leke bırakabilir.',
    alternative: 'Her çocuğa ayrı düzenek yerine tek gönüllü gösterimi yapın; gruplar gözlem kâğıdını paylaşsın.', sourceIds: ['acs-colors'],
  },
  {
    id: 'paper-bridge', domain: 'physics', title: 'Kâğıttan köprü mühendisleri',
    summary: 'Aynı kâğıtla farklı biçimler kurun, taşıdığı yükü karşılaştırın.',
    goal: 'Bir tasarımı karşılaştırırken tek bir değişkeni değiştirmek ve ölçülebilir gözlem yapmak.',
    materials: 'Eş boyutta kâğıtlar, iki kitap, cetvel ve aynı tür büyük, hafif tahta bloklar.',
    flow: [[5, 'Kitapları masada sabit bir aralıkla yerleştirin. Hangi kâğıt biçiminin daha çok yük taşıyacağını tahmin edin.'], [10, 'Düz, ortadan katlı ve akordeon biçimli kâğıtlarla üç köprü hazırlayın; kâğıt türü ve kitap aralığı aynı kalsın.'], [15, 'Blokları köprünün ortasına birer birer koyun. Belirgin eğilmede durun; blok sayısını ve biçimi not edin. Her tasarımı iki kez deneyin.'], [10, 'Sonuçları karşılaştırın, farklılıkları tartışın ve bir tasarımı gözleminize göre iyileştirin.']],
    questions: ['Hangi koşulları aynı tuttuk?', 'Aynı biçimde tekrar denediğimizde sonuç neden değişebilir?'],
    evaluation: 'Grup, seçtiği biçimi kendi ölçümüne dayanarak açıklasın.',
    notes: 'Kâğıdın biçimi eğilmeye karşı davranışını etkiler. Sonuç malzeme, katlama ve destek aralığına bağlıdır; bir biçimin her koşulda en iyi olduğunu söylemeyin.',
    safety: 'Düzenek masanın üzerinde ve alçakta olsun. Ağır ağırlık, madeni para veya küçük yutulabilir parça kullanmayın. Köprüyü beden ağırlığıyla denemeyin.',
    alternative: 'Blok yoksa eş boyutta büyük silgilerle tek ortak düzenek kurun.', sourceIds: ['bridge-shape'],
  },
  {
    id: 'shared-story', domain: 'literature', title: 'Bir cümleden ortak hikâye',
    summary: 'Çocukların fikirlerinden başlangıcı, gelişmesi ve sonu olan bir hikâye kurun.',
    goal: 'Bir anlatıyı birlikte geliştirmek, başka birinin fikrini dinlemek ve neden-sonuç ilişkisi kurmak.',
    materials: 'Kâğıt, kalem ve gönüllünün çizdiği yer, nesne ve karakter kartları.',
    flow: [[5, '“Bir sabah okul bahçesinde küçük bir kutu bulduk…” cümlesiyle başlayın.'], [10, 'Her grup bir yer ve bir nesne seçsin. Karakterin ne istediğini ve karşılaştığı engeli belirlesin.'], [15, 'Sırayla birer cümle ekleyerek hikâyeyi yazın veya çizin. Önceki cümleyle bağlantı kurmaya çalışın.'], [10, 'İsteyen gruplar paylaşsın; diğerleri hikâyenin bir güçlü yanını ve merak ettikleri bir şeyi söylesin.']],
    questions: ['Karakterin kararı sonu nasıl değiştirdi?', 'Başka bir son yazsak hangi olay değişirdi?'],
    evaluation: 'Çocuklar başlangıç, sorun ve çözümü üç kareye yerleştirsin.',
    notes: 'Hikâyeler kurmacadır; tek doğru son veya “en iyi” hikâye seçmeyin. Gerçek kişilere ilişkin iddiaları kurmaca ayrıntılardan ayırın.',
    safety: 'Kişisel bir olayı anlatmak veya sesli okumak zorunlu olmasın. Alay, gerçek bir çocuğu hedef alan karakter ve korkutucu ayrıntıları sınırlandırın.',
    alternative: 'Yazı yerine üç resim ve sözlü anlatım kullanın; gönüllü yazman olabilir.',
  },
  {
    id: 'future-letter', domain: 'letters', title: 'Gelecekteki bana bir mektup',
    summary: 'Merak, küçük hedefler ve iyi dilekler için kişisel bir zaman kapsülü.',
    goal: 'Bir öğrenme isteğini ifade etmek ve ulaşılabilir bir ilk adım belirlemek.',
    materials: 'Kâğıt, kalem, zarf veya katlanmış kâğıt.',
    flow: [[5, 'Mektubun çocuğa ait olduğunu ve paylaşmanın isteğe bağlı olduğunu açıklayın.'], [10, '“Şimdi merak ettiğim…”, “Denemek istediğim…”, “Kendime söylemek istediğim…” başlangıçlarından seçin.'], [10, 'Bir mektup veya resim hazırlayın. İsteyen çocuk hayali bir gelecek karakterine yazabilir.'], [5, 'Bir küçük ilk adımı belirleyin. Çocuk mektubunu kapatıp yanında götürsün; açmak istediği tarihi kendisi seçsin.']],
    questions: ['Hedefin için bugün atabileceğin küçük adım ne?', 'İlgi alanların değişirse mektubuna ne eklemek istersin?'],
    evaluation: 'Paylaşmak isteyenler yalnızca seçtikleri bir öğrenme hedefini söylesin.',
    notes: 'Bu bir düşünme ve yazma etkinliğidir; gelecek tahmini veya başarı garantisi değildir. Sistem otomatik mektup saklama ya da ileride gönderim yapmaz.',
    safety: 'Adres, telefon, aileye ait özel bilgi veya zorlayıcı kişisel anı istemeyin. Mektupları toplamayın, fotoğraflamayın veya yapay zekâya yüklemeyin.',
    alternative: 'Henüz yazamayan çocuk üç resim çizsin; isterse gönüllü onun söylediği kısa cümleyi eklesin.',
  },
  {
    id: 'curiosity-box', domain: 'primary', title: 'Merak kutusu: bul, eşleştir, anlat', age: '6–8',
    summary: 'Büyük şekil ve renk kartlarıyla gözlem ve anlatım oyunu.',
    goal: 'Nesneleri gözlenebilir özelliklere göre gruplamak ve seçim nedenini anlatmak.',
    materials: 'Büyük renkli şekil kartları, güvenli sınıf nesneleri ve boş kutu.',
    flow: [[5, 'Kutudan çıkan büyük bir kartı birlikte tanımlayın: renk, şekil ve boyut.'], [10, 'Gruplar kartları kendi seçtikleri bir özelliğe göre eşleştirsin.'], [10, 'Bir kartı farklı bir gruba taşıyıp yeni kural önerin; birden fazla geçerli kural olabileceğini konuşun.'], [5, 'Her çocuk ister konuşarak ister işaret ederek bir eşleştirme nedenini anlatsın.']],
    questions: ['Bu ikisini hangi özellikleri için bir araya koydun?', 'Aynı kartı başka nasıl gruplarız?'],
    evaluation: 'Gönüllü, çocuğun bir gözlenen özelliği ifade edip edemediğine baksın; hız yarışı yapmayın.',
    notes: 'Sınıflandırma seçilen kurala bağlıdır. Sadece renge dayanan görevler yerine şekil ve desen seçenekleri de sunun.',
    safety: 'Küçük parça, keskin nesne ve yiyecek kullanmayın. Nesneleri ağza götürmeyin. İsteyen çocuk kutuya dokunmadan kartı görebilsin.',
    alternative: 'Kartları doğrudan kâğıda çizin; kutu ve ayrı malzeme gerekmez.',
  },
  {
    id: 'season-model', domain: 'astronomy', title: 'Mevsimlerin sırrı',
    summary: 'Eksen eğikliğini bir küre ve LED ışıkla modelleyin.',
    goal: 'Mevsimleri Dünya ekseninin eğikliği ve ışığın geliş açısıyla ilişkilendirmek.',
    materials: 'Dünya küresi veya ekvatoru çizilmiş büyük top, LED fener ve kâğıt.',
    flow: [[5, '“Mevsimler neden değişir?” sorusuna gelen fikirleri kaydedin.'], [10, 'LED ışığı sabit tutun. Gönüllü küreyi hafif eğik eksenle tutsun; kuzey ve güney yarımküreyi gösterin.'], [15, 'Küreyi ışığın çevresinde karşı konumlara taşıyın; eksenin yönünü odadaki aynı duvarı gösterecek şekilde koruyun. Hangi yarımkürenin ışığa eğildiğini karşılaştırın.'], [10, 'İki konumu çizin. Işığın geliş açısı ve gündüz süresinin rolünü tartışın.']],
    questions: ['Bir yarımküre ışığa eğilirken diğeri nasıl duruyor?', 'Bu model gerçek uzaklıkları gösteriyor mu?'],
    evaluation: 'Gruplar “Mevsimleri yalnızca uzaklıkla açıklamayız, çünkü…” cümlesini tamamlasın.',
    notes: 'Mevsimlerin temel nedeni Dünya ekseninin eğikliğidir. Yıl boyunca gündüz süresi ve Güneş ışığının geliş açısı değişir. Model ölçekli değildir; feneri yaklaştırarak mevsim açıklaması yapmayın.',
    safety: 'Güneş’e bakmayın; lazer ve sıcak lamba kullanmayın. Feneri gözlere doğrultmayın, topa sivri çubuk takmayın.',
    alternative: 'Bir gönüllü ortak model göstersin; gruplar iki konumu kâğıda çizsin.', sourceIds: ['nasa-seasons'],
  },
  {
    id: 'magic-object', domain: 'drama', title: 'Sihirli nesne, ortak hikâye',
    summary: 'Bir karton kutuyu hayal gücüyle farklı nesnelere dönüştürün.',
    goal: 'Bir fikri beden, söz veya çizimle ifade etmek ve ortak bir sahne oluşturmak.',
    materials: 'Küçük ve hafif karton kutu, boş kâğıt ve kalem.',
    flow: [[5, 'Kutunun oyunda hayali bir nesne olabileceğini gösterin; ilk örnek bir uzay aracı olsun.'], [10, 'İsteyenler kutuyu başka bir nesne gibi tanıtsın. Dokunmadan anlatma ve çizme seçeneklerini sunun.'], [15, 'Gruplar seçtikleri nesneyle başlangıç, bir sorun ve çözüm içeren kısa sahne hazırlasın.'], [10, 'İsteyen gruplar sahneyi paylaşsın. Seyirciler gördükleri bir iş birliği davranışını söylesin.']],
    questions: ['Bir arkadaşının fikrini sahneye nasıl ekledin?', 'Nesnenin ne olduğunu başka nasıl anlatabilirdin?'],
    evaluation: 'Her grup bir ortak kararını ve birbirine nasıl alan açtığını anlatsın.',
    notes: 'Dramada ortaya çıkanlar kurmacadır. Tek doğru rol yoktur; oyuncu, anlatıcı, çizer ve gözlemci rolleri eşdeğerdir.',
    safety: 'Sahneye çıkma, beden teması ve göz kapatma zorunlu olmasın. Koşma, tırmanma, korkutma veya bir çocuğu taklit ederek hedef alma olmasın.',
    alternative: 'Sahne yerine masada üç resimlik bir hikâye hazırlayın.',
  },
  {
    id: 'table-shadow', domain: 'table', title: 'Masa başında gölge laboratuvarı',
    summary: 'Işık, nesne ve ekranın konumunu değiştirerek gölgeyi gözleyin.',
    goal: 'Bir düzenekte tek bir koşulu değiştirip gölge üzerindeki etkisini kaydetmek.',
    materials: 'LED fener, büyük opak karton şekil, beyaz kâğıt ekran ve cetvel.',
    flow: [[5, 'Işık, karton ve ekranı masada sırayla hizalayın; gölgeyi bulun.'], [10, 'Işık ve ekran sabitken kartonu iki işaretli konuma taşıyın; gölge sınırlarını çizin.'], [10, 'İlk düzeneğe dönün. Bu kez karton ve ekran sabitken ışığın konumunu değiştirin; gözlemleri ayrı kaydedin.'], [5, 'Değiştirdiğiniz koşulu ve gördüğünüz farkı bir cümleyle açıklayın.']],
    questions: ['Hangi iki şeyi sabit tuttuk?', 'Birden fazla şeyi aynı anda değiştirirsek sonucu nasıl yorumlarız?'],
    evaluation: 'Her grup iki gözlem ve bu gözlemlerin ait olduğu konumları çizsin.',
    notes: 'Opak nesne ışığın bir kısmını engeller ve arkasındaki ekranda gölge oluşur. Gölgenin boyutu ve keskinliği düzeneğe bağlıdır; ölçmeden sayısal oran veya her durumda aynı sonuç iddia etmeyin.',
    safety: 'Yalnızca LED fener kullanın; göze ışık tutmayın. Odayı yürümeyi zorlaştıracak kadar karartmayın. Kablo ve keskin karton kenarlarını hazırlıkta kontrol edin.',
    alternative: 'Fener yoksa önceden çizilmiş iki düzenek üzerinden tahmin yapın; bunu gerçek gözlem olarak kaydetmeyin.',
  },
  {
    id: 'math-choices', domain: 'math', title: 'Bir problemi üç yoldan çöz',
    summary: 'Seçenekleri çizerek, tabloyla ve kartlarla saymayı keşfedin.',
    goal: 'Bir problemin tüm seçeneklerini tekrar saymadan sistemli olarak göstermek.',
    materials: 'Üç farklı tişört ve iki farklı şapka çizilmiş büyük kartlar, kâğıt ve kalem.',
    flow: [[5, '“Bir tişört ve bir şapka seçersek kaç farklı seçim yaparız?” sorusunu sorun.'], [10, 'Gruplar kartları eşleştirip her farklı çifti bir kez göstersin.'], [10, 'Aynı seçenekleri bir grup çizimle, bir grup tabloyla, bir grup listeyle kaydetsin.'], [10, 'Üç yöntemi karşılaştırın. Yeni bir şapka ekleyip seçenekleri yeniden sayın.']],
    questions: ['Bir seçeneği iki kez saymadığımızı nasıl anlarız?', 'Yeni bir şapka eklemek kaç yeni çift oluşturdu?'],
    evaluation: 'Her çocuk seçtiği yöntemle bir tişörtün tüm şapka eşleşmelerini göstersin.',
    notes: 'Her tişört her şapkayla eşleşebiliyorsa 3 × 2 = 6 farklı çift vardır. Kısıt eklenirse aynı çarpımı doğrudan kullanmayın; önce hangi eşleşmelerin izinli olduğunu açıklayın.',
    safety: 'Küçük parçalar ve hız yarışı kullanmayın. Renk tek ayırt edici olmasın; desen veya isim ekleyin.',
    alternative: 'Kart yerine iki sütun çizip seçenekleri çizgilerle birleştirin.',
  },
  {
    id: 'rhythm-orchestra', domain: 'music', title: 'Sınıfın ritim orkestrası', age: '6–8',
    summary: 'Sessiz vuruşlarla tekrar eden bir ritmi birlikte kurun.',
    goal: 'Bir ritim örüntüsünü takip etmek, sırayla üretmek ve ortak bir tempoda çalışmak.',
    materials: 'Vuruş ve bekleme işaretleri çizilmiş sekiz büyük kart; başka araç gerekmez.',
    flow: [[5, 'Gönüllü yumuşak iki vuruş ve bir bekleme örneği göstersin; isteyenler eliyle işaret etsin.'], [10, 'Sekiz kartlık bir örüntü kurun. Vuruş kartında hafif alkış, beklemede sessizlik olsun.'], [10, 'Gruplar bir kartı değiştirerek yeni örüntü oluştursun; diğerleri takip etsin.'], [5, 'Aynı örüntüyü daha yavaş yapın; birlikte kalmayı hangi işaretlerin kolaylaştırdığını konuşun.']],
    questions: ['Bekleme de ritmin bir parçası olabilir mi?', 'Daha hızlı çalmak ile daha yüksek ses çıkarmak aynı mı?'],
    evaluation: 'Grup sekiz kartlık diziyi iki kez aynı sırayla takip etmeyi denesin; hata olduğunda yeniden başlayabilir.',
    notes: 'Tempo vuruşların ilerleme hızına, ses yüksekliği ise duyulan sesin şiddetine ilişkindir. Etkinlikte belirli bir müzik yeteneği veya tek doğru besteyi değerlendirmeyin.',
    safety: 'Sesi düşük tutun; kulağa yakın vurmayın ve masalara sert darbeler yapmayın. Ses hassasiyeti olanlar sessiz işaret veya kart düzenleme rolünü seçebilsin.',
    alternative: 'Alkış yerine kâğıda kalemle sıradaki işareti gösterin; sessiz orkestra kurun.',
  },
  {
    id: 'corridor-measure', domain: 'corridor', title: 'Koridorda ölçüm dedektifleri',
    summary: 'Güvenli bir koridor bölümünde tahminleri ortak birimlerle karşılaştırın.',
    goal: 'Standart birim kullanmanın farklı ölçümleri karşılaştırmayı kolaylaştırdığını görmek.',
    materials: 'Metre veya şerit metre, izin verilen zeminde kâğıt işaretler, kâğıt ve kalem.',
    flow: [[5, 'Gönüllü geçişi kapatmayan kısa bir ölçüm bölümü seçsin. Çocuklar uzunluğunu tahmin etsin.'], [10, 'Aynı bölümün uzunluğunu bir metrelik işaretin tekrarıyla ölçün; tam olmayan kısmı ayrıca kaydedin.'], [10, 'Kısa ve uzun iki farklı kâğıt ölçü şeridiyle yeniden ölçün. Neden farklı sayılar çıktığını tartışın.'], [5, 'Tahminleri ölçümle karşılaştırın ve her sonuçta kullanılan birimi yazın.']],
    questions: ['Aynı yer için neden farklı sayılar bulduk?', 'Sonuçta yalnızca sayı yazmak yeterli mi?'],
    evaluation: 'Grup bir sonucu sayı ve birimi birlikte kullanarak anlatsın.',
    notes: 'SI uzunluk birimi metredir. Farklı uzunluktaki ölçü araçları farklı sayım sonuçları verir; sayıları birimlerinden bağımsız karşılaştırmayın.',
    safety: 'Çıkışları, merdivenleri ve geçişi açık bırakın. Koşma veya yere uzanma olmasın; şerit metreyi gönüllü kullansın. Beden ölçüsü ve isim kaydetmeyin.',
    alternative: 'Aynı etkinliği sınıfta bir masa kenarında yapın.', sourceIds: ['nist-si'],
  },
  {
    id: 'vr-perspective', domain: 'vr', title: 'Sanal gezide bakış açısı',
    summary: 'Varsa uygun VR ekipmanı, yoksa tek bir manzara görseliyle gözlem yapın.',
    goal: 'Görülen ayrıntıyı yorumdan ayırmak ve bakış açısının gözlemi etkilediğini tartışmak.',
    materials: 'Önceden indirilmiş ve kullanım izni uygun bir manzara görseli; isteğe bağlı mevcut, yaşa uygun VR cihazı.',
    flow: [[5, 'Görselin gerçek çekim, çizim veya bilgisayarla oluşturulmuş içerik olup olmadığını açıklayın.'], [10, 'Aynı manzaranın farklı bölümlerine bakın. Gördüğünüz nesneleri kaydedin; yorumları ayrı sütuna yazın.'], [10, 'Gruplar bir ayrıntıyı tarif etsin; diğerleri görselde bulmaya çalışsın. VR kullanılıyorsa öğretmenin uygun gördüğü kısa sıralar ve düz ekran alternatifi olsun.'], [10, 'Görselin dışında neyi bilemeyeceğimizi ve doğrulamak için hangi ek bilgiye ihtiyaç duyduğumuzu konuşun.']],
    questions: ['Bu ayrıntıyı gördük mü, tahmin mi ettik?', 'Bu görüntü bütün ortamı gösteriyor mu?'],
    evaluation: 'Her çocuk bir gözlem ve yalnızca görselden doğrulanamayacak bir yorum ayırsın.',
    notes: 'Sanal ortam bir temsildir; bir görsel tek başına yer, tarih veya olay hakkında doğruluk kanıtı değildir. Bu taslak uygulamaya bir VR oynatıcı eklemez.',
    safety: 'Üreticinin yaş ve kullanım sınırlarına uyun; uygun ekipman yoksa gözlük kullanmayın. Oturarak, gözetim altında uygulayın; rahatsızlıkta bırakın. Kamera kaydı, çocuk hesabı ve ücretli servis gerekmez.',
    alternative: 'Basılı bir manzara çizimiyle bütünüyle çevrimdışı uygulayın; katılım için gözlük şart değildir.',
  },
  {
    id: 'ai-fact-check', domain: 'ai', title: 'Yapay zekâ her şeyi bilir mi?',
    summary: 'Bilgi, tahmin ve kaynaktan kontrolü birbirinden ayıran kart oyunu.',
    goal: 'Akıcı bir cevabın doğru olmak zorunda olmadığını ve iddianın kaynaktan kontrol edilebileceğini görmek.',
    materials: 'Üç iddia kartı, önceden hazırlanmış NASA Ay evreleri notu, kâğıt ve kalem.',
    flow: [[5, 'İddiaların tartışma için hazırlandığını, gerçek bir yapay zekâ deneyi olmadığını açıklayın.'], [10, '“Ay kendi ışığını üretir”, “Ay Güneş ışığını yansıtır”, “Ay evreleri Dünya’nın gölgesidir” kartlarını gösterin. Önce karar vermek yerine hangi kaynağa bakılacağını sorun.'], [15, 'NASA notuyla karşılaştırın: ilk ve üçüncü ifade yanlış, ikinci doğru. Yanlışları düzeltin; kaynak olmadan emin konuşmanın sorununu tartışın.'], [10, 'Gruplar “iddia → kaynak → karşılaştırma → düzeltme” adımlarını bir kontrol kartına yazsın.']],
    questions: ['Cevabın uzun olması doğruluğunu kanıtlar mı?', 'Bilmediğimiz bir iddia için ne yapabiliriz?'],
    evaluation: 'Çocuk bir iddiayı düzeltirken hangi kaynağı kullandığını söylesin.',
    notes: 'Üretken modeller öğrenilen örüntülerden içerik üretir; çıktılar bağımsız kontrol gerektirir. Ay’ın ışığı yansıttığı Güneş ışığıdır; normal evreler Dünya’nın gölgesinden oluşmaz. Kartlar bu bilgileri öğretmek içindir, tüm yapay zekâ başarısını ölçmez.',
    safety: 'Gerçek çocuk bilgisi, fotoğrafı veya kişisel soru kullanmayın. Hatalı kartların doğrusunu kapanışta açıkça söyleyin; sınıfta gerçek kişi hakkında yanlış iddia üretmeyin.',
    alternative: 'Canlı yapay zekâ çağrısı yapmadan basılı iddia ve kaynak kartları kullanın.', sourceIds: ['google-ml', 'nasa-moon'],
  },
  {
    id: 'four-stations', domain: 'workshops', title: 'Dört istasyonlu keşif atölyesi',
    summary: 'Çizim, örüntü, hikâye ve kâğıt tasarımı için dönüşümlü mini atölyeler.',
    goal: 'Farklı ifade yollarını deneyimlemek, görev paylaşmak ve bir ürünü anlatmak.',
    materials: 'Kâğıt, kalem, büyük desen kartları ve dört istasyonun yazılı görev kartı.',
    team: '20 katılımcıyı dört beş kişilik gruba ayırın. Bir gönüllü zamanı ve geçişleri yönetsin, diğeri dolaşarak yardım etsin. Öğretmen sınıf düzenini ve ek destek ihtiyacını belirlesin.',
    flow: [[5, 'Dört görev kartını tanıtın: gözlem çizimi, tekrar eden desen, üç karelik hikâye ve katlanmış kâğıt tasarımı.'], [38, 'Her istasyonda sekiz dakika çalışın; üç geçiş için ikişer dakika ayırın. Gruplar sırayla tüm istasyonları ziyaret etsin. Kartlarda başlangıç örneği ve kolaylaştırılmış seçenek olsun.'], [7, 'Her grup bir ürününü ve yapmak istediği bir iyileştirmeyi paylaşsın.']],
    questions: ['Hangi görevde arkadaşının fikri sana yardımcı oldu?', 'Daha çok zamanın olsa neyi değiştirirdin?'],
    evaluation: 'Her grup dört görevden birer ürün veya süreç notu oluştursun; ürünleri birbirleriyle yarıştırmayın.',
    notes: 'Bu bir istasyon yönetimi taslağıdır. Süreyi katılımcı sayısına ve destek ihtiyacına göre yeniden düzenleyin; karmaşık deneyleri gözetimsiz istasyona eklemeyin.',
    safety: 'Geçiş yönünü ve açık yolları önceden belirleyin; koşma, kesici araç ve sıcak malzeme kullanmayın. Dolaşmak istemeyenler aynı masada değişen görev kartlarıyla katılsın.',
    alternative: 'Dört masa yerine aynı masada sırayla dört görev uygulayın.',
  },
  {
    id: 'outdoor-shadows', domain: 'outdoor', title: 'Gölge dedektifleri',
    summary: 'Sabit bir nesnenin gölgesini iki farklı zamanda kaydedin.',
    goal: 'Bir açık alan gözlemini zaman ve koşullarıyla birlikte kaydetmek.',
    materials: 'Sabit duran güvenli bir nesne, kâğıt, kalem, cetvel ve saat.',
    flow: [[5, 'Gönüllü okulun izinli, düz ve gölgeli dinlenme alanına yakın bir bölümünü seçsin. Sabit nesnenin gölgesini bulun.'], [10, 'Gölgenin sınırını ve uzunluğunu kâğıda kaydedin; saat, bulut durumu ve nesnenin yerini yazın.'], [10, 'Gölgenin ne yönde değişebileceğine dair tahmin çizin; aradaki sürede gözlem ile tahminin farkını konuşun.'], [10, 'Aynı nesneyi yeniden ölçün, saati yazın ve iki kaydı karşılaştırın. Fark görünmüyorsa bunu da dürüstçe not edin.']],
    questions: ['Nesne yer değiştirirse karşılaştırmamız etkilenir mi?', 'Bulutlu havada hangi gözlemi yapamayabiliriz?'],
    evaluation: 'Grup iki zaman kaydını karşılaştırıp gözlediği değişimi veya değişim göremediğini ifade etsin.',
    notes: 'Gölge yönü ve uzunluğu ışığın geliş yönüyle ilişkilidir. Bu kısa gözlemde fark belirgin olmayabilir. Yerdeki çizim ölçekli değilse hassas ölçüm iddiası yapmayın.',
    safety: 'Güneş’e doğrudan bakmayın; büyüteç ve lazer kullanmayın. Sınırlar, hava koşulları ve yetişkin gözetimi öğretmen tarafından önceden onaylansın; trafik ve su kenarından uzak kalın.',
    alternative: 'Hava uygun değilse masada LED fener ve kartonla iki ışık konumunu karşılaştırın.',
  },
  {
    id: 'find-balance', domain: 'balance', title: 'Denge noktasını bul',
    summary: 'Hafif bir cetvelin hangi destek noktasında dengede kaldığını araştırın.',
    goal: 'Geometrik orta ile denge noktasının her nesnede aynı olmak zorunda olmadığını görmek.',
    materials: 'Hafif, küt kenarlı plastik cetvel, kâğıt ve kalem.',
    flow: [[5, 'Cetvelin ortasını tahmin edin. Cetvelin masaya yakın tutulacağını gösterin.'], [10, 'Cetveli yatay biçimde tek parmakla alttan destekleyin; gönüllü düşmesini engellesin. Dengeye yaklaşan destek konumunu bulun.'], [10, 'Destek yerini sağa ve sola az miktarda değiştirip gözleyin. Gruplar buldukları noktayı cetvel çiziminde işaretlesin.'], [5, 'Sonuçları karşılaştırın; bir ucu daha ağır bir nesnede noktanın neden değişebileceğini çizerek tartışın.']],
    questions: ['Destek noktasını değiştirince ne oldu?', 'Her nesnenin denge noktası mutlaka tam ortasında mıdır?'],
    evaluation: 'Çocuk çiziminde destek noktasını ve gözlediği hareketi göstersin.',
    notes: 'Düzgün kütle dağılımlı bir cetvelin denge noktası ortasına yakın olabilir. Kütle dağılımı farklı nesnelerde denge noktası geometrik ortayla aynı olmak zorunda değildir. Bu tek boyutlu basit düzenek her cismin dengesini açıklamaz.',
    safety: 'Masaya yakın çalışın; keskin metal cetvel, ağır ek yük ve sivri çubuk kullanmayın. İnsanların dengesiyle deney, sandalyeye çıkma veya beden üzerinden yarış yapmayın.',
    alternative: 'Tek cetveli gönüllü göstersin; herkes sonuçları kendi çiziminde işaretlesin.', sourceIds: ['exploratorium-balance'],
  },
  {
    id: 'three-drawings', domain: 'art', title: 'Bir fikrin üç resmi',
    summary: 'Gözlem, hayal ve farklı bakış açısıyla aynı fikri üç kez çizin.',
    goal: 'Gözlenen ayrıntı ile yaratıcı yorumu ayırmak ve farklı ifade yollarını denemek.',
    materials: 'Kâğıt, renkli veya kurşun kalem ve büyük, güvenli bir sınıf nesnesi.',
    flow: [[5, 'Bir kitabı veya kutuyu birlikte inceleyin; gördüğünüz ayrıntıları söyleyin.'], [10, 'İlk karede yalnızca gördüğünüz özellikleri çizin.'], [10, 'İkinci karede nesneyi hayali bir amaçla dönüştürün; üçüncü karede başka bir açıdan gösterin.'], [10, 'İsteyenler iki gözlem ayrıntısını ve bir yaratıcı seçimini anlatsın.']],
    questions: ['Hangi ayrıntı nesnede gerçekten vardı?', 'Hayal ettiğin değişiklik resmin anlamını nasıl etkiledi?'],
    evaluation: 'Her çocuk kendi tercih ettiği çizimden bir ayrıntıyı açıklasın; gerçekçilik veya güzellik sıralaması yapmayın.',
    notes: 'Yaratıcı yorumun tek doğru cevabı yoktur. Bilimsel gözlem amacıyla kullanılan bir çizimin hangi ayrıntıları değiştirdiğini ayrıca belirtin.',
    safety: 'Malzemeleri paylaşırken alan bırakın; boya veya kalemleri ağza götürmeyin. Çocuğun çizimini izin almadan sergilemeyin veya fotoğraflamayın.',
    alternative: 'Renkli kalem olmadan çizgi, desen ve farklı taramalarla çalışın.',
  },
  {
    id: 'night-sky-notebook', domain: 'night', title: 'Gece göğü gözlem defteri',
    summary: 'İzinli bir akşam gözlemi veya basılı gökyüzü haritasıyla desenleri keşfedin.',
    goal: 'Görülen gökyüzü desenini kaydetmek ve haritayla karşılaştırırken belirsizliği belirtmek.',
    materials: 'Kâğıt, kalem, düşük parlaklıklı LED fener ve önceden seçilmiş gökyüzü haritası.',
    team: 'Öğretmen gözlem yerini, saatini, gözetmen sayısını ve izinleri önceden belirlesin. Çocuklar tek başına dolaşmasın; tek grup olarak gözlem yapın. Koşullar uygun değilse içerideki seçenekle başlayın.',
    flow: [[5, 'Sınırları ve dönüş işaretini açıklayın. Haritanın hangi yer ve dönem için hazırlandığını belirtin.'], [10, 'Gözle seçilen birkaç ışık noktasının düzenini çizin; emin olmadığınız noktayı “belirsiz” olarak işaretleyin.'], [15, 'Çizimleri haritayla karşılaştırın. Gökyüzündeki görünür desenle bu noktalar arasında çizdiğimiz hayali çizgileri ayırın.'], [10, 'Saat, bulut ve aydınlatma koşullarını kaydedin. Görülemeyen bir şeyi görmüş gibi tamamlamayın.']],
    questions: ['Haritadaki her yıldızı neden görememiş olabiliriz?', 'Çizdiğimiz çizgiler uzayda gerçek bağlantılar mı?'],
    evaluation: 'Her grup bir gözlem ve bir belirsizlik notu oluştursun.',
    notes: 'Görülebilen takımyıldızlar konuma ve yılın zamanına bağlıdır. Görünür desenler yıldızların aynı uzaklıkta olduğunu göstermez. Noktaları yalnızca parlaklığına göre kesin yıldız veya gezegen diye adlandırmayın.',
    safety: 'İzinsiz gece gezisi yapmayın. Araç yolu, su ve engebeli zeminden uzak durun; yetişkin gözetimi ve uygun hava şartı zorunludur. Lazer kullanmayın; feneri gözlere tutmayın.',
    alternative: 'Gündüz sınıfta basılı yıldız haritası kullanın. Bu çalışmayı gerçek gece gözlemi olarak kaydetmeyin.', sourceIds: ['nasa-stars'],
  },
  {
    id: 'paper-robot', domain: 'robotics', title: 'Kâğıt robotla komut yaz',
    summary: 'Bir masa ızgarasında komut sırası yazın, hatayı bulup düzeltin.',
    goal: 'Açık komutlar oluşturmak, bir komut dizisini çalıştırmak ve hatayı düzelterek yeniden denemek.',
    materials: 'Kâğıda çizilmiş 4 × 4 ızgara, yönü belli büyük robot kartı ve komut kartları.',
    flow: [[5, 'Robotun baktığı yönü gösterin. Komutlar: “bir kare ileri”, “yerinde sağa dön”, “yerinde sola dön”. Dönmenin kare değiştirmediğini örnekleyin.'], [10, 'Bir başlangıç ve hedef seçin. Gruplar robotu elle oynatmadan önce komut dizisini yazsın.'], [15, 'Bir çocuk yalnızca yazılmış komutları uygulasın. Hedefe varılmadıysa ilk farklılaşan adımı bulun, komutu düzeltin ve başlangıçtan tekrar deneyin.'], [10, 'Yazan, uygulayan ve kontrol eden rollerini değiştirerek yeni bir hedef deneyin.']],
    questions: ['Robotun “sağı” kimin baktığı yöne göre?', 'Hedefe varamamak bize hangi komutu kontrol etmemizi söyledi?'],
    evaluation: 'Her grup bir komut dizisini ve yaptığı bir düzeltmeyi göstersin.',
    notes: 'Komutların sırası ve açık tanımı önemlidir. Bu bir programlama benzetmesidir; fiziksel robot, sensör veya yapay zekâ eğitimi çalıştırmaz. Birden fazla doğru rota olabilir.',
    safety: 'Masa üzerindeki büyük kartlarla çalışın; koşma veya çocuğu engeller arasında gözleri kapalı yürütme olmasın. Elektrik devresi ve pil gerekmez.',
    alternative: 'Tek kâğıtta robotun konumunu kalemle işaretleyin; ayrı kart hazırlamayın.', sourceIds: ['kidbots'],
  },
  {
    id: 'origami-symmetry', domain: 'origami', title: 'Katla, aç, simetriyi keşfet', age: '6–8',
    summary: 'Kare bir kâğıtta üst üste gelen parçaları ve kat izlerini inceleyin.',
    goal: 'Bir şeklin parçalarını karşılaştırmak ve simetri eksenini katlama yoluyla araştırmak.',
    materials: 'Önceden hazırlanmış büyük kare kâğıtlar ve kalem.',
    flow: [[5, 'Karenin kenarlarını ve köşelerini birlikte gösterin.'], [10, 'Karşı kenarları hizalayarak ortadan katlayın, sonra açın. İki parçanın üst üste gelip gelmediğini gözleyin.'], [10, 'Başka bir kâğıtta karşı köşeleri hizalayarak çapraz katlayın. Kat izlerini çizip karşılaştırın.'], [5, 'Köşeyi rastgele içe kıvırın; her kat izinin simetri ekseni olmadığını bu örnekle tartışın.']],
    questions: ['Hangi katlamada iki yarı üst üste geldi?', 'Her kat izi için aynı şeyi söyleyebilir miyiz?'],
    evaluation: 'Çocuk bir kare üzerinde denediği simetri eksenini ve kontrol yöntemini göstersin.',
    notes: 'Karede orta çizgiler ve köşegenler simetri eksenleridir. Kâğıdın kare olmaması veya kenarların hizalanmaması gözlemi etkiler. Her origami katı simetri ekseni değildir.',
    safety: 'Kesimi gönüllü önceden yapsın; makas ve küçük kâğıt parçaları gerekmez. Katlamada zorlananlara büyük kâğıt veya çizerek katılım seçeneği sunun.',
    alternative: 'Bir büyük kare üzerinde gönüllü gösterim yapsın; çocuklar kat izlerini çizsin.',
  },
  {
    id: 'ilkyar-intro', domain: 'ilkyar', title: 'İLKYAR’ı birlikte tanıyalım',
    summary: 'Gönüllülük, merak ve birlikte öğrenme üzerine kısa bir tanışma.',
    goal: 'İLKYAR’ın eğitim çalışmalarını resmi tanıtım bilgisiyle tanımak ve etkinliklerden beklentileri ifade etmek.',
    materials: 'Resmi tanıtım sayfasından hazırlanmış kısa not, kâğıt, kalem ve günün etkinlik başlıkları.',
    flow: [[5, 'Gönüllüler yalnızca isimlerini ve hangi etkinliği hazırladıklarını paylaşarak kendilerini tanıtsın.'], [10, 'Resmi tanıtım notuyla İLKYAR’ın 1998’de kurulmuş olduğunu ve köy okulları ile yatılı bölge okullarına yönelik gönüllü eğitim çalışmalarını anlatın.'], [10, 'Etkinlik başlıklarını gösterin. Çocuklar merak ettikleri bir konuyu çizerek veya isimsiz bir kartla seçsin.'], [5, 'Birlikte çalışma kurallarını belirleyin: soru sorabiliriz, sıra paylaşırız, istemediğimiz etkinlikte alternatif rol seçebiliriz.']],
    questions: ['Bu günlerde hangi soruna cevap aramak istersin?', 'Bir arkadaşının katılmasını kolaylaştırmak için ne yapabiliriz?'],
    evaluation: 'Grubun seçtiği üç merak sorusunu isimsiz olarak etkinlik panosuna ekleyin.',
    notes: 'Kurumsal bilgide resmi İLKYAR tanıtımını esas alın. Güncel proje sayıları, etki sonuçları ve program tarihlerini doğrulamadan söylemeyin. Bu başlangıç taslağı İLKYAR tarafından onaylanmış resmi bir program değildir.',
    safety: 'Çocuklardan bağış, iletişim bilgisi veya kamuya açık fotoğraf istemeyin. Paylaşmak ve konuşmak zorunlu olmasın; okulun katılım ve gizlilik kurallarına uyun.',
    alternative: 'Resmi tanıtım notunu önceden indirip bağlantı olmadan okuyun.', sourceIds: ['ilkyar-official'],
  },
  {
    id: 'invisible-world', domain: 'microbiology', title: 'Göremediğimiz dünya: temas modeli',
    summary: 'Canlı örnek kullanmadan mikroskobik dünyayı ve bir modelin sınırlarını konuşun.',
    goal: 'Mikroorganizmaların hepsinin zararlı olmadığını öğrenmek ve bir temas modelini gerçek kanıttan ayırmak.',
    materials: 'Büyük nesne kartları, renkli büyük yapışkan kâğıtlar ve kalem.',
    flow: [[5, 'Başlığın mecazi olduğunu söyleyin: küçük canlılar “canavar” değildir. Mikroskobun ne işe yaradığını konuşun.'], [10, 'Masa, kalem ve el çizimleri olan kartları yerleştirin. Bir temas oku çizildiğinde gönüllü hedef karta renkli bir kâğıt eklesin.'], [15, 'Gruplar farklı temas sıraları için çizim hazırlasın. İşaretlerin yalnızca model kuralını izlediğini, gerçek mikroorganizma sayısı olmadığını açıklayın.'], [10, 'Mikroorganizmaların yararlı, nötr veya hastalıkla ilişkili olabileceğini konuşun; modelin göstermediği şeyleri listeleyin.']],
    questions: ['Kâğıt işareti gerçek bir mikrop bulduğumuz anlamına gelir mi?', 'Bu modelden birinin hasta olup olmadığını anlayabilir miyiz?'],
    evaluation: 'Her grup modelin anlattığı bir ilişkiyi ve kanıtlayamadığı bir iddiayı yazsın.',
    notes: 'Mikroorganizmalar çıplak gözle görülemeyecek kadar küçük olabilir; bakteriler, arkeler ve mikroskobik ökaryotlar örneklerdir. Hepsi zararlı değildir. Bu çizim gerçek bulaşma olasılığını, hastalık durumunu veya bir yüzeyin temizliğini ölçmez.',
    safety: 'Vücut veya yüzey örneği toplamayın, kültür yetiştirmeyin, yiyecek küfü ve kimyasal dezenfektanla deney yapmayın. İşaretleri gerçek ellere değil kartlara koyun; çocukları “kirli” diye etiketlemeyin.',
    alternative: 'Yapışkan kâğıt yerine çizimlerde aynı renkli işareti kullanın.', sourceIds: ['amnh-microbes'],
  },
];

function makeDraft(draft) {
  const age = draft.age || '9–12';
  const duration = draft.flow.reduce((total, [minutes]) => total + minutes, 0);
  let elapsed = 0;
  const flow = draft.flow.map(([minutes, text], index) => {
    const start = elapsed; elapsed += minutes;
    return `${index + 1}. **${start}–${elapsed} dakika:** ${text}`;
  }).join('\n');
  const refs = SOURCES.filter(source => draft.sourceIds?.includes(source.id));
  return {
    id: draft.id, title: draft.title, domain: draft.domain, age, duration,
    summary: draft.summary, materials: draft.materials, sourceIds: refs.map(source => source.id),
    content: `## ${draft.title}
**Başlangıç taslağı · ${activityLabel(draft.domain)} · ${age} yaş · ${duration} dakika · 20 katılımcı**

### Öğrenme hedefi
${draft.goal}

### Malzemeler ve hazırlık
${draft.materials}

### Gönüllü görevleri
${draft.team || 'İki gönüllüyle dört beş kişilik grup kurun. Biri yönerge ve zamanı takip etsin, diğeri gruplara destek olsun. Çocuklar anlatan, çizen ve kontrol eden rolleri dönüşümlü seçsin; paylaşmak istemeyenlere gözlemci rolü sunun.'}

### Akış
${flow}

### Birlikte düşünelim
${draft.questions.map(question => `- ${question}`).join('\n')}

### Değerlendirme
${draft.evaluation}

### Dayanak ve taslağın sınırı
${draft.notes}
${refs.length ? `\nBaşvuru: ${refs.map(source => `[${source.publisher} · ${source.title}](${source.url})`).join(', ')}.\n` : ''}
### Güvenlik ve katılım
${draft.safety} Uygulamadan önce öğretmen yaş, mekân ve gözetim koşullarını değerlendirsin.

### Daha az malzemeyle
${draft.alternative}

*Başlıklardan yola çıkılarak hazırlanmış düzenlenebilir bir öneridir. Gerçek uygulama koşullarına göre gönüllü ve öğretmen tarafından uyarlanmalıdır.*`,
  };
}

export const EXPANDED_TEMPLATES = DRAFTS.map(makeDraft);
