export const GUIDE_FORMATS = {
  ilkyar: ['Etkinlik Adı', 'Branş', 'Öğrenci Seviyesi', 'Süre ve Katılımcı Sayısı', 'Etkinlikte Kullanılacak Malzemeler', 'Etkinliğin Amacı', 'Bilimsel Açıklamalar', 'Hazırlık ve Gönüllü Görevleri', 'Etkinliğin Uygulanışı', 'Etkinliğin Çocuklara Anlatımı', 'Keşif Soruları ve Geliştirme Seçenekleri', 'Güvenlik ve Kontrol', 'Kaynakça'],
  research: ['Araştırma Sorusu', 'Hipotez ve Beklenen Gözlem', 'Yaş, Süre ve Malzemeler', 'Değişkenler ve Karşılaştırma', 'Güvenlik ve Kontrol', 'Yöntem ve Tekrarlar', 'Veri Tablosu ve Birimler', 'Analiz, Belirsizlik ve Model Sınırları', 'Sonraki Araştırma', 'Kaynakça'],
};
export function guideOutline(format = 'ilkyar') { return (GUIDE_FORMATS[format] || GUIDE_FORMATS.ilkyar).join(' → '); }
