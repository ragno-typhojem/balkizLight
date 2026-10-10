# BALKIZ Light 2.2 · Kaynak ve geliştirme notları

10 Ekim 2026. Amaç: etkinliklere yeni keşif soruları, bilimsel derinlik, ölçüm ve uygulanabilir varyasyonlar kazandırmak. Geri bildirim ve puanlama yalnızca kullanıcı istediğinde üretilir.

## Kapsam

- Paylaşılan Drive arşivinde hedef alt klasörlerde listelenen 172 dosyadan 131 kılavuz/ek metni alındı: 122 DOCX, 7 PDF ve 2 Google Docs.
- İlkyar Tanıtımı klasörü ve Edebiyat Kitapları alt klasörü dışarıda bırakıldı. Ayrıca 41 hedef dışı dosya (görsel, ses/video, sunum, materyal listesi ve tanıtım/genel bilgilendirme gibi dosyalar) kaynak araştırmasına alınmadı.
- 125 belgede metin kullanılabildi; 6 görsel ağırlıklı/seyrek metinli ekten bilimsel bilgi çıkarılmadı. Graf ve origami PDF’lerinden örnek sayfalar görsel olarak incelendi; bütün şekiller, gömülü formüller veya her sayfanın yerleşimi doğrulanmadı.
- Orijinal belgeler, yazarların e-postaları ve tam metinler uygulamaya veya Vercel paketine eklenmez. Katalog kısa hazırlık bilgileri, özgün geliştirme fikirleri ve asıl belge bağlantılarını içerir.
- 80 başvuru kaynağı: 74 referans, 5 simülasyon ve önceki sürümden korunan 1 kurum bağlantısı. Yeni araştırmaya tanıtım belgesi alınmadı.
- Önceki 12 kaynak korunur; 68 yeni kaynak eklenmiştir. Her kaynağın not tarihi ayrı saklanır.

## Etkinlik geliştirmeye eklenen destek

| Alan | Kılavuz/ek |
| --- | ---: |
| Göremediğimiz Canavarlar | 3 |
| VR | 1 |
| Fizik / Fen | 18 |
| Denge Deneyi | 1 |
| Müzik | 1 |
| Yapay Zeka Etkinliği | 2 |
| 2. Gece deneyleri | 11 |
| İlkokullara Etkinlik | 1 |
| Resim | 1 |
| Astronomi | 1 |
| Kimya | 1 |
| Origami | 4 |
| Yaratıcı Drama | 1 |
| Robot | 1 |
| Geleceğe Mektuplar | 1 |
| Masa Deneyleri | 15 |
| 3. Koridor Deneyleri | 24 |
| 1. Dış Deneyler | 19 |
| 0. Atölyeler | 16 |
| Matematik | 6 |
| Edebiyat | 3 |

Kütüphanede 31 düzenlenebilir taslak bulunur. Altı yeni ileri düzey çalışma: sarkaçtan yerçekimi tahmini, Malus yasası, asit kuvveti/derişim simülasyonu, Euler/Hamilton rotaları, sınıflandırma hata tablosu ve akış süresi araştırması. İleri düzey; daha fazla model, hesap, veri, grafik ve belirsizlik desteğidir.

Kılavuzdaki başlık ve hedef yeni bir plan için bağlam sağlar. Bilimsel açıklamalar ayrı referanslardan seçilir. Böylece çarpışma için momentum/enerji, polarizasyon için model koşulları, mikroskop için büyütme/çözünürlük, kimya için pH/derişim/redoks ve astronomi için ölçek/yıldız yaşamı kullanılabilir. Geliştirme fikirleri editoryal önerilerdir; orijinal kılavuzun aynısı veya kurumca onaylanmış program değildir.

## Kapasite ve erişim

Kaynak taraması ve hazır taslaklar cihazda çalışır; ayrı arama, embedding veya model çağrısı yoktur. Her yanıtta bütün katalog gönderilmez. Normal modda en fazla dört bilimsel not için 2400 karakter; kısa/yoğun modda üç not için 1600 karakter; en fazla bir kılavuz için 1100 karakter ayrılır. Notların varsayımları ve risk uyarıları korunur. Dosyalar da yalnızca seçilen alıntılarıyla bu eşleştirmeye katkı verir.

Groq’un 10 Ekim 2026 tarihli [resmî limit tablosu](https://console.groq.com/docs/rate-limits) GPT-OSS 20B/120B ücretsiz planında model başına 30 RPM, 1000 RPD, 8000 TPM ve 200000 TPD gösteriyordu. [Desteklenen modeller](https://console.groq.com/docs/models) kontrol edildi. Hesap sınırları değişebilir; sayılar eşzamanlı kullanıcı garantisi değildir. Mevcut yüzde 85 pay ve ortak Redis seçeneği korunur.

Uygulama kullanılırken canlı internet araştırması yapılmaz. Araştırma bu sürüm hazırlanırken yapıldı; kütüphanedeki notlar sabittir. IUPAC ve RSC’nin bazı sayfaları tam sayfa erişimini engelledi; ilgili resmi arama indeksleri ve erişilebilen aynı konudaki referanslar kullanıldı. Dış sayfalar ve Drive belgeleri ileride taşınabilir veya izin gerektirebilir. Taranmış belgeler için otomatik OCR eklenmedi.

## Bilimsel başvuru seçkisi

| Kaynak | Kurum | Tür | Not tarihi |
| --- | --- | --- | --- |
| [Mevsimler nasıl oluşur?](https://spaceplace.nasa.gov/seasons/en/) | NASA | Referans | 2026-10-05 |
| [Ay’ın evreleri](https://science.nasa.gov/moon/moon-phases/) | NASA | Referans | 2026-10-05 |
| [Sirke ve karbonat tepkimesi](https://www.acs.org/middleschoolchemistry/lessonplans/chapter6/lesson2.html) | American Chemical Society | Referans | 2026-10-05 |
| [Bilimde ölçüm ve SI birimleri](https://www.nist.gov/pml/owm/metric-si/si-units) | NIST | Referans | 2026-10-05 |
| [Makine öğrenmesi nedir?](https://developers.google.com/machine-learning/intro-to-ml/what-is-ml) | Google Developers | Referans | 2026-10-05 |
| [Kâğıt kromatografisi](https://www.acs.org/education/whatischemistry/adventures-in-chemistry/experiments/chromatography.html) | American Chemical Society | Referans | 2026-10-05 |
| [Kâğıt köprülerde biçim ve yük](https://www.sciencebuddies.org/stem-activities/build-best-bridge) | Science Buddies | Referans | 2026-10-05 |
| [Denge noktası ve ağırlık dağılımı](https://annex.exploratorium.edu/xref/exhibits/center_of_gravity.html) | Exploratorium | Referans | 2026-10-05 |
| [Takımyıldızları ve gece göğü](https://spaceplace.nasa.gov/constellations/en/) | NASA | Referans | 2026-10-05 |
| [Komutlar, programlama ve hata ayıklama](https://www.csunplugged.org/en/topics/kidbots/) | CS Unplugged · University of Canterbury | Referans | 2026-10-05 |
| [İLKYAR resmi tanıtımı](https://ilkyar.org.tr/tanitim/) | İLKYAR | Kurum | 2026-10-05 |
| [Mikroorganizmalar hakkında temel bilgiler](https://www.amnh.org/explore/microbe-facts) | American Museum of Natural History | Referans | 2026-10-05 |
| [Akış jetinde çevre havanın sürüklenmesi](https://openstax.org/books/college-physics-2e/pages/12-2-bernoullis-equation) | OpenStax · Rice University | Referans | 2026-10-10 |
| [Güneşin enerjisi ve füzyon](https://science.nasa.gov/sun/facts/) | NASA Science | Referans | 2026-10-10 |
| [Işık yılı bir uzaklık birimidir](https://science.nasa.gov/exoplanets/what-is-a-light-year/) | NASA Science | Referans | 2026-10-10 |
| [Yıldız görüntülerinde kırınım çizgileri](https://science.nasa.gov/asset/webb/webbs-diffraction-spikes/) | NASA Science · James Webb Space Telescope | Referans | 2026-10-10 |
| [Yıldızların oluşumu ve yaşamı](https://science.nasa.gov/universe/stars/) | NASA Science | Referans | 2026-10-10 |
| [Karanlık madde ve karanlık enerji](https://science.nasa.gov/universe/dark-matter-dark-energy/) | NASA Science | Referans | 2026-10-10 |
| [Özel görelilik ve zaman genişlemesi](https://openstax.org/books/university-physics-volume-3/pages/5-3-time-dilation) | OpenStax · Rice University | Referans | 2026-10-10 |
| [Sınıflandırma: doğruluk ve hata türleri](https://developers.google.com/machine-learning/crash-course/classification/accuracy-precision-recall) | Google Developers · Machine Learning Crash Course | Referans | 2026-10-10 |
| [Etki–tepki ve farklı cisimler](https://openstax.org/books/university-physics-volume-1/pages/5-5-newtons-third-law) | OpenStax · Rice University | Referans | 2026-10-10 |
| [Tepe taklak topaçta sürtünme ve dönüş](https://www.demos.smu.ca/demos/mechanics/185-how-does-a-tippe-top-work) | Saint Mary’s University · Physics Demonstrations | Referans | 2026-10-10 |
| [pH: tanım ve etkinlik](https://goldbook.iupac.org/terms/view/P04524) | IUPAC · Gold Book | Referans | 2026-10-10 |
| [Asit kuvveti, derişim ve denge](https://openstax.org/books/chemistry-2e/pages/14-3-relative-strengths-of-acids-and-bases) | OpenStax · Rice University | Referans | 2026-10-10 |
| [Çökelme, asit–baz ve yükseltgenme](https://openstax.org/books/chemistry-2e/pages/4-2-classifying-chemical-reactions) | OpenStax · Rice University | Referans | 2026-10-10 |
| [Çözünürlük çarpımı ve çökelme](https://openstax.org/books/chemistry-2e/pages/15-1-precipitation-and-dissolution) | OpenStax · Rice University | Referans | 2026-10-10 |
| [Sakkaroz: sofra şekerinin formülü](https://webbook.nist.gov/cgi/cbook.cgi?ID=C57501) | NIST · Chemistry WebBook | Referans | 2026-10-10 |
| [C vitamini ve iyotla gözlem](https://edu.rsc.org/feature/what-is-vitamin-c-and-how-can-we-test-for-it/3007552.article) | Royal Society of Chemistry | Referans | 2026-10-10 |
| [Tepkime hızı ve kontrollü değişkenler](https://openstax.org/books/chemistry-2e/pages/12-1-chemical-reaction-rates) | OpenStax · Rice University | Referans | 2026-10-10 |
| [Çözelti, karışabilirlik ve çözünme](https://openstax.org/books/chemistry-2e/pages/11-1-the-dissolution-process) | OpenStax · Rice University | Referans | 2026-10-10 |
| [Kurşun: çocuklarda maruziyet riski](https://www.who.int/news-room/fact-sheets/detail/lead-poisoning-and-health) | World Health Organization | Referans | 2026-10-10 |
| [Okul kimyası: risk değerlendirmesi](https://www.acs.org/education/policies/middle-and-high-school-chemistry.html) | American Chemical Society | Referans | 2026-10-10 |
| [Kuru buz: kap ve havalandırma](https://www.cdc.gov/mmwr/preview/mmwrhtml/su6101a1.htm) | Centers for Disease Control and Prevention | Referans | 2026-10-10 |
| [Lazer ve çocuklarda göz güvenliği](https://www.fda.gov/consumers/consumer-updates/laser-toys-how-keep-kids-safe) | U.S. Food and Drug Administration | Referans | 2026-10-10 |
| [Newton yasaları ve etki–tepki](https://openstax.org/books/university-physics-volume-1/pages/5-3-newtons-second-law) | OpenStax · Rice University | Referans | 2026-10-10 |
| [Enerji dönüşümü ve kayıplar](https://openstax.org/books/university-physics-volume-1/pages/8-3-conservation-of-energy) | OpenStax · Rice University | Referans | 2026-10-10 |
| [Momentum ve sistem sınırı](https://openstax.org/books/university-physics-volume-1/pages/9-3-conservation-of-linear-momentum) | OpenStax · Rice University | Referans | 2026-10-10 |
| [Esnek ve esnek olmayan çarpışmalar](https://openstax.org/books/university-physics-volume-1/pages/9-4-types-of-collisions) | OpenStax · Rice University | Referans | 2026-10-10 |
| [Açısal momentum ve dış tork](https://openstax.org/books/university-physics-volume-1/pages/11-3-conservation-of-angular-momentum) | OpenStax · Rice University | Referans | 2026-10-10 |
| [Jiroskop ve presesyon](https://openstax.org/books/university-physics-volume-1/pages/11-4-precession-of-a-gyroscope) | OpenStax · Rice University | Referans | 2026-10-10 |
| [Tek yönlü spinner: asimetri ve tork](https://www.clarkson.edu/rattleback-top) | Clarkson University | Referans | 2026-10-10 |
| [Denge: net kuvvet ve net tork](https://openstax.org/books/university-physics-volume-1/pages/12-1-conditions-for-static-equilibrium) | OpenStax · Rice University | Referans | 2026-10-10 |
| [Basınç, atmosfer ve vakum](https://openstax.org/books/university-physics-volume-1/pages/14-1-fluids-density-and-pressure) | OpenStax · Rice University | Referans | 2026-10-10 |
| [Kaldırma kuvveti ve Arşimet ilkesi](https://openstax.org/books/university-physics-volume-1/pages/14-4-archimedes-principle-and-buoyancy) | OpenStax · Rice University | Referans | 2026-10-10 |
| [Bernoulli: varsayımlar ve akış](https://openstax.org/books/university-physics-volume-1/pages/14-6-bernoullis-equation) | OpenStax · Rice University | Referans | 2026-10-10 |
| [Viskozite ve akışa direnç](https://openstax.org/books/university-physics-volume-1/pages/14-7-viscosity-and-turbulence) | OpenStax · Rice University | Referans | 2026-10-10 |
| [Yüzey gerilimi ve kılcallık](https://openstax.org/books/college-physics-2e/pages/11-8-cohesion-and-adhesion-in-liquids-surface-tension-and-capillary-action) | OpenStax · Rice University | Referans | 2026-10-10 |
| [Sarkaç: periyot ve küçük açı yaklaşımı](https://openstax.org/books/university-physics-volume-1/pages/15-4-pendulums) | OpenStax · Rice University | Referans | 2026-10-10 |
| [Zorlanmış titreşim ve rezonans](https://openstax.org/books/university-physics-volume-1/pages/15-6-forced-oscillations) | OpenStax · Rice University | Referans | 2026-10-10 |
| [Sesin yayılması, ortam ve frekans](https://openstax.org/books/university-physics-volume-1/pages/17-2-speed-of-sound) | OpenStax · Rice University | Referans | 2026-10-10 |
| [Ses şiddeti ve desibel](https://openstax.org/books/university-physics-volume-1/pages/17-3-sound-intensity) | OpenStax · Rice University | Referans | 2026-10-10 |
| [Isı makineleri ve enerji kaynağı](https://openstax.org/books/university-physics-volume-2/pages/4-2-heat-engines) | OpenStax · Rice University | Referans | 2026-10-10 |
| [Elektrik yükü ve kutuplanma](https://openstax.org/books/university-physics-volume-2/pages/5-1-electric-charge) | OpenStax · Rice University | Referans | 2026-10-10 |
| [Sığa ve depolanan elektrik enerjisi](https://openstax.org/books/university-physics-volume-2/pages/8-1-capacitors-and-capacitance) | OpenStax · Rice University | Referans | 2026-10-10 |
| [Akım, gerilim ve devre](https://openstax.org/books/university-physics-volume-2/pages/9-1-electrical-current) | OpenStax · Rice University | Referans | 2026-10-10 |
| [Akım taşıyan iletkene manyetik kuvvet](https://openstax.org/books/university-physics-volume-2/pages/11-4-magnetic-force-on-a-current-carrying-conductor) | OpenStax · Rice University | Referans | 2026-10-10 |
| [Faraday yasası ve indüksiyon](https://openstax.org/books/university-physics-volume-2/pages/13-1-faradays-law) | OpenStax · Rice University | Referans | 2026-10-10 |
| [Crookes radyometresi: seyrek gazın rolü](https://pirt.asu.edu/node/5971) | Arizona State University · PIRT | Referans | 2026-10-10 |
| [Yansıma yasası ve açıların ölçümü](https://openstax.org/books/university-physics-volume-3/pages/1-2-the-law-of-reflection) | OpenStax · Rice University | Referans | 2026-10-10 |
| [Kırılma: Snell yasası](https://openstax.org/books/university-physics-volume-3/pages/1-3-refraction) | OpenStax · Rice University | Referans | 2026-10-10 |
| [Tam iç yansıma ve fiber optik](https://openstax.org/books/university-physics-volume-3/pages/1-4-total-internal-reflection) | OpenStax · Rice University | Referans | 2026-10-10 |
| [Polarizasyon ve Malus yasası](https://openstax.org/books/university-physics-volume-3/pages/1-7-polarization) | OpenStax · Rice University | Referans | 2026-10-10 |
| [Çukur aynalar: gerçek ve sanal görüntü](https://openstax.org/books/university-physics-volume-3/pages/2-2-spherical-mirrors) | OpenStax · Rice University | Referans | 2026-10-10 |
| [İnce mercek, odak ve büyütme](https://openstax.org/books/university-physics-volume-3/pages/2-4-thin-lenses) | OpenStax · Rice University | Referans | 2026-10-10 |
| [Hücreleri incelemek ve mikroskop](https://openstax.org/books/biology-2e/pages/4-1-studying-cells) | OpenStax · Rice University | Referans | 2026-10-10 |
| [Mikroskopta immersiyon: objektif etiketi](https://www.microscope.healthcare.nikon.com/guides/ei/en/page/oil.html) | Nikon · Eclipse Ei Online Guide | Referans | 2026-10-10 |
| [Fotosentez: ışık, madde ve enerji](https://openstax.org/books/biology-2e/pages/8-1-overview-of-photosynthesis) | OpenStax · Rice University | Referans | 2026-10-10 |
| [Taş, mineral ve kayaç ayrımı](https://www.usgs.gov/faqs/what-difference-between-a-rock-and-a-mineral) | U.S. Geological Survey | Referans | 2026-10-10 |
| [Kara delikler ve olay ufku](https://science.nasa.gov/universe/black-holes/) | NASA Science | Referans | 2026-10-10 |
| [Güneş sistemi: cisimler ve ölçek](https://science.nasa.gov/solar-system/) | NASA Science | Referans | 2026-10-10 |
| [Graf, Euler yolu ve Hamilton yolu](https://discrete.openmathbooks.org/dmoi4/sec_gt-paths.html) | Oscar Levin · University of Northern Colorado | Referans | 2026-10-10 |
| [Aritmetik diziler ve sonlu toplam](https://discrete.openmathbooks.org/dmoi4/sec_seq-growth.html) | Oscar Levin · University of Northern Colorado | Referans | 2026-10-10 |
| [Çember: yarıçap, çap ve çevre](https://openstax.org/books/prealgebra-2e/pages/9-5-solve-geometry-applications-circles-and-irregular-figures) | OpenStax · Rice University | Referans | 2026-10-10 |
| [Üretken yapay zekâ: doğrulama ve risk](https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf) | NIST · AI Risk Management Framework | Referans | 2026-10-10 |
| [Bloklarla programlama ve yaratıcı öğrenme](https://scratch.mit.edu/about) | Scratch Foundation | Referans | 2026-10-10 |
| [Sanal sarkaç laboratuvarı](https://phet.colorado.edu/en/simulations/pendulum-lab) | PhET · University of Colorado Boulder | Simülasyon | 2026-10-10 |
| [Işık ve kırılma simülasyonu](https://phet.colorado.edu/en/simulations/bending-light) | PhET · University of Colorado Boulder | Simülasyon | 2026-10-10 |
| [Sanal doğru akım devreleri](https://phet.colorado.edu/en/simulations/circuit-construction-kit-dc) | PhET · University of Colorado Boulder | Simülasyon | 2026-10-10 |
| [Asit–baz çözeltileri simülasyonu](https://phet.colorado.edu/en/simulations/acid-base-solutions) | PhET · University of Colorado Boulder | Simülasyon | 2026-10-10 |
| [Dalga girişimi simülasyonu](https://phet.colorado.edu/en/simulations/wave-interference) | PhET · University of Colorado Boulder | Simülasyon | 2026-10-10 |

## Kılavuz ve ek dizini

Bu bağlantılar paylaşılan arşivdeki belgelerin aslına gider. Bilimsel iddianın kaynağı olarak kılavuzu otomatik onaylamaz.

| Kılavuz / ek | Alan | Kapsam |
| --- | --- | --- |
| [Göremediğimiz Canavarlar.docx](https://docs.google.com/document/d/1rRGQTmsxLJVCNRSZPEbgGa1NTqSkTPWw/edit) | microbiology | Kısa geliştirme bağlamı |
| [Sanal Gerçeklik.docx](https://docs.google.com/document/d/1TaQrdS8WgzmH1A9FS7s2xLyfpes9lIZi/edit) | vr | Kısa geliştirme bağlamı |
| [Fizik/Fen Etkinliklerinin Genel Uygulanışı](https://docs.google.com/document/d/1cLZlJOD2hG9hDTXCbZqAUakyINB0_Y7C/edit) | physics | Kısa geliştirme bağlamı; video/simülasyon önerilir |
| [Denge Deneyi Kılavuzu.docx](https://docs.google.com/document/d/1v0nPh_yCiSFMy46lg9wUh-60qQsMu36f/edit) | balance | Kısa geliştirme bağlamı |
| [Müzik.docx](https://docs.google.com/document/d/1Nz0zGw50QpdKJRG5LQz7p8QpUJJypONX/edit) | music | Kısa geliştirme bağlamı; video/simülasyon önerilir |
| [Yapay Zeka.docx](https://docs.google.com/document/d/1LIVte46Kq_uag8MPuYqNxDCOavBKJpk5/edit) | ai | Kısa geliştirme bağlamı; video/simülasyon önerilir |
| [Gece Deneyleri Lise Akışı](https://docs.google.com/document/d/17S19NqQjN7g-VI3NSs_JJto-5oWKgAIm/edit) | night | Kısa geliştirme bağlamı; video/simülasyon önerilir |
| [İlkokullara Etkinlik.docx](https://docs.google.com/document/d/1g3Hjg5AB3PF59V1_K6lRKAvN4alt8HJb/edit) | primary | Kısa geliştirme bağlamı |
| [Boyanın Hareketleri Deneyi.docx](https://docs.google.com/document/d/1qz7u7AkmASm23MZ-bi52AQPfYtBSGBJS/edit) | art | Kısa geliştirme bağlamı |
| [ASTRONOMİ ETKİNLİĞİ ANLATIMI...docx](https://docs.google.com/document/d/1CasFymPB5DjoVMVL2bHG9tXKYRmzeIiy/edit) | astronomy | Kısa geliştirme bağlamı |
| [Kimya.docx](https://docs.google.com/document/d/11km6IMXvb4kErVtr7PTVU8lZ5QHiiPm3/edit) | chemistry | Kısa geliştirme bağlamı; video/simülasyon önerilir |
| [Origami.docx](https://docs.google.com/document/d/19So77YxWNOU8QaJaUjoB5xi-dt-vzxrx/edit) | origami | Kısa geliştirme bağlamı |
| [Etkinlik_ArkadaşlıkDeğerlerim.docx](https://docs.google.com/document/d/1mnaMie-q2vOk8c3rIX8Lhj0O_ha4abH1/edit) | drama | Kısa geliştirme bağlamı; video/simülasyon önerilir |
| [Robot](https://docs.google.com/document/d/1fW71S1aUXBzSeeDYOkNiqKoGys40DMxA/edit) | robotics | Kısa geliştirme bağlamı |
| [Geleceğe Mektuplar.docx](https://docs.google.com/document/d/1X_USC1Lo8cA1GnWV72yTIpLWTQSxHxaC/edit) | letters | Kısa geliştirme bağlamı |
| [3a-Devridaim Makinesi](https://docs.google.com/document/d/14_up_YqCg3ZPiftTEiwlA7meBTDpzxch/edit) | table | Kısa geliştirme bağlamı |
| [1i-Plazma Küresi](https://docs.google.com/document/d/1gx_FEQp_xWTwZl-FiTg-JD-t0RujRDGY/edit) | table | Kısa geliştirme bağlamı; video/simülasyon önerilir |
| [1h-Sihirbazlıklar](https://docs.google.com/document/d/1lIEZ4k6NpIEAkejnAhWrTfaIh9kDiKFR/edit) | table | Kısa geliştirme bağlamı |
| [1j-Fiber Optik Fırça](https://docs.google.com/document/d/1TKjukBOy9WDGOX6c-RcY0yHuy6BRUFwE/edit) | table | Kısa geliştirme bağlamı |
| [3c-Sterling Engine](https://docs.google.com/document/d/1c2elH7Ra0cZjD-O4e8BJKkRcfwieRMBL/edit) | table | Kısa geliştirme bağlamı |
| [2b-Windbag](https://docs.google.com/document/d/1K7OIh2uAk24ul4xy98XMpg0VxoNifI0f/edit) | table | Kısa geliştirme bağlamı |
| [1e-Tek Yönlü Spinner](https://docs.google.com/document/d/16G1ECcd9p_qRnp7fLo6xQgAsVB3ho5tz/edit) | table | Kısa geliştirme bağlamı |
| [1d-Manyetik Levitron](https://docs.google.com/document/d/1Ax8YGze9F7fz4-04cjRtI0r0sfm4FYCA/edit) | table | Kısa geliştirme bağlamı |
| [1c-Su İçen Leylek](https://docs.google.com/document/d/1wiAWINJR3alMsC25DpVhDfWbFssFU0kl/edit) | table | Kısa geliştirme bağlamı |
| [1b-Müzik Kutusu](https://docs.google.com/document/d/1j-B_nYFPFrb2qmT69ns-MmR5IicaRO9V/edit) | table | Kısa geliştirme bağlamı |
| [1a-Elastik Yarım Top](https://docs.google.com/document/d/18NjEpijTQENQ6f5d49oUPLIyxJgPc4jG/edit) | table | Kısa geliştirme bağlamı |
| [3b-Wimshurst Cihazı](https://docs.google.com/document/d/1zQcI4dp34KZN-WkDU1-iQ-VH57r0RhSN/edit) | table | Kısa geliştirme bağlamı; video/simülasyon önerilir |
| [2a-Kompresör Deneyleri](https://docs.google.com/document/d/1W91QSfEcmuEigKbBw_cyRPFHsUAuoF_B/edit) | table | Kısa geliştirme bağlamı; video/simülasyon önerilir |
| [1g-Viskozite Şelalesi](https://docs.google.com/document/d/15SDVKoLzP4d620JfRMlrtlIuomVj__8_/edit) | table | Kısa geliştirme bağlamı |
| [1f-Titreşim Pervanesi](https://docs.google.com/document/d/17lAv7CWbu7m13ZmtLFaQd79DiwVYVcXU/edit) | table | Kısa geliştirme bağlamı |
| [12-Radyometre.docx](https://docs.google.com/document/d/1hZz1uF7tixQx5gRpOi6XId5EUBXzxtsu/edit) | physics | Kısa geliştirme bağlamı |
| [11-Jiroskop.docx](https://docs.google.com/document/d/1AgvBhBzSIeq0n3AEvgkeV6ysnmFSO9Dp/edit) | physics | Kısa geliştirme bağlamı |
| [10-Elektrik Motoru.docx](https://docs.google.com/document/d/115babnuuJ_p_BS0pv8lN8zhd5KyocZgf/edit) | physics | Kısa geliştirme bağlamı |
| [9-Windbag.docx](https://docs.google.com/document/d/1Azbgx90I6UzUJLOZyP5QFwbAY7n_pzo9/edit) | physics | Kısa geliştirme bağlamı |
| [6-Ufo Topu](https://docs.google.com/document/d/1ljKZ1wdycT9FCsKI-X3Z2glmcUdFl2dc/edit) | physics | Kısa geliştirme bağlamı |
| [2-El Feneri](https://docs.google.com/document/d/1l3CZO6aWD0TN5AxCXaeV2tg7yQx0fGqG/edit) | physics | Kısa geliştirme bağlamı |
| [1-Newton Beşiği](https://docs.google.com/document/d/1Y2uuJdkdNqQTyegQcb-6SGEGA45txo-a/edit) | physics | Kısa geliştirme bağlamı |
| [13-Polarizasyon.docx](https://docs.google.com/document/d/1DpDW-SyVRIoB3wlCi7F5sEZ7x1xrN9xB/edit) | physics | Kısa geliştirme bağlamı |
| [8-Maglev Treni.docx](https://docs.google.com/document/d/1kDpqbndyeXHnVAKEt0uJX4Wh58C-YhfE/edit) | physics | Kısa geliştirme bağlamı |
| [7-Tesla Bobini](https://docs.google.com/document/d/1Xj6KeHdUULbcwdWkHJQ_aS1MR_nlucVe/edit) | physics | Kısa geliştirme bağlamı; video/simülasyon önerilir |
| [5-Manyetik İvmelendirme](https://docs.google.com/document/d/11m2JEjxWxkdzrefl6nmPu-G8AeSxC_lp/edit) | physics | Kısa geliştirme bağlamı; video/simülasyon önerilir |
| [4-Japon Treni](https://docs.google.com/document/d/1za_1Jdn0I7vWZxudpIDwFl4n_AG2bLkV/edit) | physics | Kısa geliştirme bağlamı |
| [3-Çubuk Mıknatıs](https://docs.google.com/document/d/1oppWE4jYJnzzm75OuQziWh7OFd_MX_5G/edit) | physics | Kısa geliştirme bağlamı |
| [15c-Karabiber-Sabun Deneyi.docx](https://docs.google.com/document/d/1tqJ4_NSHEK70NkYK8-x39vHXm_CkKU3q/edit) | physics | Kısa geliştirme bağlamı |
| [15b-Aeorojel Granül.docx](https://docs.google.com/document/d/1IHut6gH_RyjP_Ps1hGrj26VxeARZ0FNm/edit) | physics | Kısa geliştirme bağlamı |
| [15a-Yapay Kar.docx](https://docs.google.com/document/d/1Z-3rQETdYq7GR4ZYhLQ3WyVI-anrg0EW/edit) | physics | Kısa geliştirme bağlamı |
| [14-Vakum.docx](https://docs.google.com/document/d/1vSMJoHPLfghO9LmZzPE69DVhWzh1Toq5/edit) | physics | Kısa geliştirme bağlamı |
| [EMO Pet.docx](https://docs.google.com/document/d/1MA22DjGrz52N1SZQnlHdKWnqQo9LPdov/edit) | ai | Kısa geliştirme bağlamı; video/simülasyon önerilir |
| [Taşlar ve Özellikleri.docx](https://docs.google.com/document/d/1S0hlOi0g6e9yAvqOO9HyqrvFnlH4nAuO/edit) | corridor | Kısa geliştirme bağlamı; video/simülasyon önerilir |
| [Dönen Para Kutusu.docx](https://docs.google.com/document/d/1oBY8BSpRjDBcX-wkG0ZhkcjVona_eaLQ/edit) | corridor | Kısa geliştirme bağlamı |
| [Flow Ring.docx](https://docs.google.com/document/d/1ZP1RqRIDwPt6mEZFmLRXUSTZcnh5-u7X/edit) | corridor | Kısa geliştirme bağlamı |
| [Dalgalanan Spiral Disk.docx](https://docs.google.com/document/d/1YsetyH0q17N9XmdHLybGEHPiLR_PSMbm/edit) | corridor | Kısa geliştirme bağlamı |
| [Sihirli Taşlar.docx](https://docs.google.com/document/d/1Qq0hD5ahTVtcMUnJeViSHBI7TMM859uV/edit) | corridor | Kısa geliştirme bağlamı |
| [Ebonit ve Cam Çubuk Seti](https://docs.google.com/document/d/1TjoOGlvsHBTVuMhkSrVe8Jz2c_ksfEtk/edit) | corridor | Kısa geliştirme bağlamı |
| [Sinema Makinesi (Zoetrope)](https://docs.google.com/document/d/1Z7JQ1g_Q91Y-4i2GqmWGr3i7wjZ7XNK0/edit) | corridor | Kısa geliştirme bağlamı |
| [Sanal Görüntü (Mirage)](https://docs.google.com/document/d/1Zgq5mICx3VlkqkdqYLC_HCEEMhb--8Jj/edit) | corridor | Kısa geliştirme bağlamı |
| [Elektrik Değneği.docx](https://docs.google.com/document/d/1nkVmFY-W25LWj7JDdE4C2qw1uCjHZEnF/edit) | corridor | Kısa geliştirme bağlamı |
| [Yüz Maskesi (Pin Art).docx](https://docs.google.com/document/d/1FyduqOKrznV2twl0_4f2Ph5w3FCOaWwP/edit) | corridor | Kısa geliştirme bağlamı |
| [Tepe Taklak Dönen Topaç.docx](https://docs.google.com/document/d/1wuATcItiU7ZenxlNInieAhDN06bGxlyg/edit) | corridor | Kısa geliştirme bağlamı |
| [Su Yağ Çarkı.docx](https://docs.google.com/document/d/1X6U6uThJlqHQHOBjotxIAmzW4z-jk8NF/edit) | corridor | Kısa geliştirme bağlamı |
| [Para Kutusu.docx](https://docs.google.com/document/d/1B2q_okCvt1unwZa8w0-wFsFz7KppqOOR/edit) | corridor | Kısa geliştirme bağlamı |
| [Mıknatıslı Yoyo.docx](https://docs.google.com/document/d/16tMN9x6fQwhL4m3PYmHz9ZM435-YkyFN/edit) | corridor | Kısa geliştirme bağlamı |
| [Gök Gürültüsü Tüpü.docx](https://docs.google.com/document/d/1aRdNoy9OwD1KbZq-DPa1riqLkSe4O4i3/edit) | corridor | Kısa geliştirme bağlamı |
| [Fiber Optik.docx](https://docs.google.com/document/d/16NeSlr_uQRLZmZLf39jL4omKnjw_v1cc/edit) | corridor | Kısa geliştirme bağlamı |
| [Fırıl Fırıl Denge.docx](https://docs.google.com/document/d/1MocrjouGyja69K3HtoYoWb3Zt38ydzL2/edit) | corridor | Kısa geliştirme bağlamı |
| [Euler Disk.docx](https://docs.google.com/document/d/1T4qp2fbYrUFol00u4oViAcc0B0UeISkQ/edit) | corridor | Kısa geliştirme bağlamı |
| [Elastik Yarım Top.docx](https://docs.google.com/document/d/1lMghNpDJFghgAjDWcnGyajo1bp8tPMAv/edit) | corridor | Kısa geliştirme bağlamı |
| [Denge Kuşu.docx](https://docs.google.com/document/d/1fm-9g0BYbRC47RUeDT3EixUuSim1MuVW/edit) | corridor | Kısa geliştirme bağlamı |
| [Çakmak Taşı.docx](https://docs.google.com/document/d/1mhFYisynMPoNN4l_Ymttgrr0J1yBSPCj/edit) | corridor | Kısa geliştirme bağlamı; video/simülasyon önerilir |
| [Boncuk Deneyi.docx](https://docs.google.com/document/d/1kQ58r3iUimk7Y5R4lG4to_5uoxzGvevV/edit) | corridor | Kısa geliştirme bağlamı |
| [Bardak Deneyi.docx](https://docs.google.com/document/d/1Xi23AOXQmQN-MCWkvIFKdP1Ta2sujHLD/edit) | corridor | Kısa geliştirme bağlamı |
| [Adalet Kupası.docx](https://docs.google.com/document/d/1QzEhUfSo3xtCmXkMQzKVC6ku-MaBZz1k/edit) | corridor | Kısa geliştirme bağlamı |
| [3-Wimshurst Cihazı](https://docs.google.com/document/d/1cbq-Q1dgtz87YF_DzixO19S1UxtuZqe5/edit) | night | Kısa geliştirme bağlamı; video/simülasyon önerilir |
| [8-Selüloz Kağıdı](https://docs.google.com/document/d/1v2ItZrk3h02spjJoe4FWriXly2C8HzLK/edit) | night | Kısa geliştirme bağlamı; video/simülasyon önerilir |
| [7-Sis Davulu](https://docs.google.com/document/d/1f0776XQP0rszrVqdtfksqQhLqqqagkV0/edit) | night | Kısa geliştirme bağlamı |
| [6-Su Kutusu](https://docs.google.com/document/d/1wiJT3WjfutAP-bMuDH4JLUEM1vutIdH_/edit) | night | Kısa geliştirme bağlamı; video/simülasyon önerilir |
| [5-Mercekler](https://docs.google.com/document/d/1tqoALOr8eG9Gn-bXdFQixOAOYc5EXczE/edit) | night | Kısa geliştirme bağlamı; video/simülasyon önerilir |
| [4-Aynalar](https://docs.google.com/document/d/1aWtWyL3PCJA4hEzm_cYb8YFxl1Qn1Bs4/edit) | night | Kısa geliştirme bağlamı; video/simülasyon önerilir |
| [2-Sese Duyarlı Plazma Küresi](https://docs.google.com/document/d/1iYG-pQMjDonfUaP-FcUtMPkf3h0gKvOG/edit) | night | Kısa geliştirme bağlamı; video/simülasyon önerilir |
| [1-Plazma Küresi](https://docs.google.com/document/d/1XMt_LxQmeXRcwDG1sUTMXW4scSnYCIY7/edit) | night | Kısa geliştirme bağlamı; video/simülasyon önerilir |
| [Gece Deneyleri Sunucu Anlatımı (toplu)](https://docs.google.com/document/d/1XI7MHt-Obm6yf5CmEDp3Aa7h9PLHfh1R/edit) | night | Kısa geliştirme bağlamı; video/simülasyon önerilir |
| [Gece Deneyleri Uygulanış Kılavuzu](https://docs.google.com/document/d/1LQFdOO3Kas2Ilkil85MYmkzSS0QtG_LW/edit) | night | Kısa geliştirme bağlamı; video/simülasyon önerilir |
| [Kurmalı Kuş.docx](https://docs.google.com/document/d/1zz1f0CNXJytLx_GVAumPQ-ix7E9IrYC3/edit) | outdoor | Kısa geliştirme bağlamı |
| [11-Su Roketi.docx](https://docs.google.com/document/d/1zTZ3bkTrORmEqIgXcQm-X0t5x7DAMLlT/edit) | outdoor | Kısa geliştirme bağlamı; video/simülasyon önerilir |
| [8-Süzülen İp Deneyi.docx](https://docs.google.com/document/d/1JyNwrYFgx3bsv576hYA64_EkH-rs1GbE/edit) | outdoor | Kısa geliştirme bağlamı |
| [4-Birbirine Bağlı Toplar.docx](https://docs.google.com/document/d/13zdJ0XzqhyiMgoF1cW1paIdECa8XbS7V/edit) | outdoor | Kısa geliştirme bağlamı |
| [3-Magdeburg Küreleri.docx](https://docs.google.com/document/d/10UGy0Uf89ZOaNdWliqoODlK25ojiGTNJ/edit) | outdoor | Kısa geliştirme bağlamı |
| [10-Karabaş.docx](https://docs.google.com/document/d/1yVQFrhyCmPcO1UhJi61-VzvHLGUgfer3/edit) | outdoor | Kısa geliştirme bağlamı |
| [9d-Fildişi Macunu.docx](https://docs.google.com/document/d/1eYExePtKdnsUwn-_QLjwRXsXDFmdY2wF/edit) | outdoor | Kısa geliştirme bağlamı; video/simülasyon önerilir |
| [9c-Sis Deneyi.docx](https://docs.google.com/document/d/1_LtzBxxX9VqJvUgWbMhRErSH779_FTaA/edit) | outdoor | Kısa geliştirme bağlamı; video/simülasyon önerilir |
| [9a-Renkli Alev Deneyi.docx](https://docs.google.com/document/d/1_RO8qQpY84gUxCMRrIoPRicnoOw0s8d0/edit) | outdoor | Kısa geliştirme bağlamı; video/simülasyon önerilir |
| [7-Sis Davulu.docx](https://docs.google.com/document/d/11FAOhTT-Rh4Resx6k9hY17KzeCfEMXtG/edit) | outdoor | Kısa geliştirme bağlamı |
| [6-Hava Roketi.docx](https://docs.google.com/document/d/1EHposLYzDHb-oSXwP7P36nfUVz6KRpit/edit) | outdoor | Kısa geliştirme bağlamı; video/simülasyon önerilir |
| [5-Kral Tacı.docx](https://docs.google.com/document/d/1ZLeKUgW9AGntMEd303PrRyMk3SJCCNh0/edit) | outdoor | Kısa geliştirme bağlamı |
| [2-Tornado Deneyi.docx](https://docs.google.com/document/d/1BjQ6crOr3frLl00hDKD9btWL3QDz422U/edit) | outdoor | Kısa geliştirme bağlamı |
| [1b-Fıskiye Deneyi.docx](https://docs.google.com/document/d/1iHoBMd_8eDvmSmXikcHX95A6Q8FTNbJT/edit) | outdoor | Kısa geliştirme bağlamı |
| [1a-Hava Basıncı Deneyi.docx](https://docs.google.com/document/d/1MQ7Z_bEpV3rbzcGQ9rde8N5bZxkHRz3j/edit) | outdoor | Kısa geliştirme bağlamı |
| [9b-Renkli Duman](https://docs.google.com/document/d/11fVmXf5fYImUn3pNXOk_69EujY6shEIb/edit) | outdoor | Kısa geliştirme bağlamı; video/simülasyon önerilir |
| [Dış Deneyleri Uygulanış Kılavuzu.docx](https://docs.google.com/document/d/1aUawzFpbpvJy8q1WTLdkDznJiPDF_HV_/edit) | outdoor | Kısa geliştirme bağlamı; video/simülasyon önerilir |
| [Dış Deneyler Sunucu Anlatımı (toplu).docx](https://docs.google.com/document/d/1Y8n7rcCVsMMmhimtUkPXLogr21UKBm_1/edit) | outdoor | Kısa geliştirme bağlamı; video/simülasyon önerilir |
| [Su Roketi Kurulum](https://docs.google.com/document/d/1wN0B8zW2AGRIwc-mYsaoDHCBtQfZJ4Txm6NH2e9q6SM/edit) | outdoor | Kısa geliştirme bağlamı; video/simülasyon önerilir |
| [Sınıfımızın Yazarları.docx](https://docs.google.com/document/d/17RbrmCiRel6mGSoGRIfA85BvaLQxDSs5/edit) | workshops | Kısa geliştirme bağlamı |
| [Hikaye Küpleri.docx](https://docs.google.com/document/d/1lM3yPF-3OYe1FdaAGDKtTNldEdhmbqGb/edit) | workshops | Kısa geliştirme bağlamı |
| [Kitapların Dünyası](https://drive.google.com/file/d/1yajFAr1HQpQbKr8fxZGxJIn-c-5MQEuW/view) | workshops | Kısa geliştirme bağlamı |
| [Ne Görüyorsan Yaz Hadi](https://drive.google.com/file/d/1go6WPc_FB8awwQR4l6vgLsFuowBDwqG6/view) | workshops | Kısa geliştirme bağlamı |
| [Küçük Prens - Tiyatro.docx](https://docs.google.com/document/d/1wyOAWBDioLHRvuCqEKI2BcuLztx2EEuE/edit) | workshops | Kısa geliştirme bağlamı |
| [Meslek.docx](https://docs.google.com/document/d/1-kUUiehPZD9yqO6Zylb5uETjuZEhKD_M/edit) | workshops | Kısa geliştirme bağlamı |
| [Örnek Aktiviteler.docx](https://docs.google.com/document/d/1mSNikREk1Mq5IJOPd36ASAM7qp9mH50K/edit) | workshops | Kısa geliştirme bağlamı |
| [Ziraat.docx](https://docs.google.com/document/d/1ba_S1hIfxZQZSTJavescL0MRVNoHcU-C/edit) | workshops | Kısa geliştirme bağlamı |
| [Kılavuz.docx](https://docs.google.com/document/d/1gQE9-9SGKdDmI0Y-DirCBeBJafj49pcf/edit) | workshops | Kısa geliştirme bağlamı |
| [Graflar.docx](https://docs.google.com/document/d/11vlvY4zV-jRPrTHHvOqKxNf75OFz_oy5/edit) | math | Kısa geliştirme bağlamı |
| [Mesleklerde Matematik](https://docs.google.com/document/d/1V7hZ4k1fyCV4m6OnqljlY_Xrrqx_Ar9J/edit) | math | Kısa geliştirme bağlamı |
| [Gauss Toplam Formülü](https://docs.google.com/document/d/16pTYY3f6ZoUGHmwyFSyFwnqEttPr6Tbz/edit) | math | Kısa geliştirme bağlamı |
| [GRAF TASARIM.pdf](https://drive.google.com/file/d/17SnoALXR7YBO27ctQ4s1IPBxkNxHryE_/view) | math | Görsel ek |
| [EK-7.docx](https://docs.google.com/document/d/15GEymnF4mjCtvsZGqIe3g-a5rpqeJ5pQ/edit) | math | Görsel ek |
| [EK-3](https://drive.google.com/file/d/1uwXEoMdNpwUil0VHTTK3IvoFnwZYdA69/view) | math | Görsel ek |
| [Turna Kuşu Yapımı](https://docs.google.com/document/d/1-SayPPwBX2xb1SL0U-xUXLsQ41jILe3q/edit) | origami | Kısa geliştirme bağlamı |
| [Origami Pogo Yayınları.pdf](https://drive.google.com/file/d/1QAXDMM0gKf2xirR7YzRssndBERoBpGob/view) | origami | Görsel ek |
| [Origami Dergisi Çerezlik Yayınları](https://drive.google.com/file/d/1ct8ycRkDLjJXHvOVVYbLt_YsY8i30HIq/view) | origami | Kısa geliştirme bağlamı |
| [Benim Hikayem Senin Hikayen.docx](https://docs.google.com/document/d/1vk4eeH6CptV8NhgDaqu5qlvr0WlYPTWj/edit) | literature | Kısa geliştirme bağlamı |
| [Hikayeyi Tamamlayalım](https://docs.google.com/document/d/1FMqcYdrziktFn8vzdkT7bkYYAUuc36TV/edit) | literature | Kısa geliştirme bağlamı |
| [Sınıfımızın Hikayesi.docx](https://docs.google.com/document/d/1BwWQ30SPaa8Gk2fc_ZlSU94gB_jssSd2/edit) | literature | Kısa geliştirme bağlamı |
| [Mikrobiyoloji.docx](https://docs.google.com/document/d/1l5SO36qKIahHPsywCl1k5kOCLfNuBupp/edit) | microbiology | Kısa geliştirme bağlamı |
| [Biyoloji.docx](https://docs.google.com/document/d/1hk646nXExN1HzR3HrmApLZV7-h5p6f-B/edit) | microbiology | Kısa geliştirme bağlamı |
| [Yüzlük Tablo Boş](https://docs.google.com/document/d/1xiEfl_QZZ0zzsxb-aXa0VZZVgSP5MWQhvZ3hC_1hIIU/edit) | workshops | Görsel ek |
| [EK-1.pdf](https://drive.google.com/file/d/1ZnpDZYEE-PWdrHfDS-BDSfxSZICnTzUS/view) | workshops | Görsel ek |
| [Kodlu Yüzlük Oyunu.docx](https://docs.google.com/document/d/1fhBTwyzcXNSRdStGQgruztoGf8tq6NNR/edit) | workshops | Kısa geliştirme bağlamı |
| [Yapı Oluşturma.docx](https://docs.google.com/document/d/1k9eKcE5c-L5pUufu0B5IHoOIB6Tja1iB/edit) | workshops | Kısa geliştirme bağlamı |
| [Tangram.docx](https://docs.google.com/document/d/1TF7OZfq9Cio9SgkBfgWbwh9jOZEXrzEt/edit) | workshops | Kısa geliştirme bağlamı |
| [Katamino Oyunu.docx](https://docs.google.com/document/d/1F9aNpUmW5xGnQ2PgLfni1E8ufqeTRGS5/edit) | workshops | Kısa geliştirme bağlamı |
| [Çarpım Oyunu.docx](https://docs.google.com/document/d/1-UMm6sQ28MMDE6ahs0cGAFChxws_AIOr/edit) | workshops | Kısa geliştirme bağlamı |

## Teslim sınırı

Bu sürümde otomatik test, tarayıcı/cihaz testi ve canlı Vercel/Groq denemesi çalıştırılmadı; kullanıcıya bırakıldı. Build yalnızca dağıtım dosyalarını hazırlar. Paket yayınlanmış değildir. Kaynak notları bilimsel doğruluk veya deney güvenliği garantisi değildir.
