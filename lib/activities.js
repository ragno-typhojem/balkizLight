// Workshop headings supplied by the user. Labels describe categories, not official lesson plans.
export const ACTIVITY_AREAS = [
  { id: 'chemistry', label: 'Kimya' },
  { id: 'physics', label: 'Fizik / Fen' },
  { id: 'literature', label: 'Edebiyat' },
  { id: 'letters', label: 'Geleceğe Mektuplar' },
  { id: 'primary', label: 'İlkokullara Etkinlik' },
  { id: 'astronomy', label: 'Astronomi' },
  { id: 'drama', label: 'Yaratıcı Drama' },
  { id: 'table', label: 'Masa Deneyleri' },
  { id: 'math', label: 'Matematik' },
  { id: 'music', label: 'Müzik' },
  { id: 'corridor', label: '3. Koridor Deneyleri' },
  { id: 'vr', label: 'VR' },
  { id: 'ai', label: 'Yapay Zeka Etkinliği' },
  { id: 'workshops', label: '0. Atölyeler' },
  { id: 'outdoor', label: '1. Dış Deneyler' },
  { id: 'balance', label: 'Denge Deneyi' },
  { id: 'art', label: 'Resim' },
  { id: 'night', label: '2. Gece deneyleri' },
  { id: 'robotics', label: 'Robot' },
  { id: 'origami', label: 'Origami' },
  { id: 'ilkyar', label: 'İlkyar Tanıtımı' },
  { id: 'microbiology', label: 'Göremediğimiz Canavarlar' },
];

export const DOMAIN_IDS = ['general', 'science', ...ACTIVITY_AREAS.map(area => area.id)];
export const SCIENTIFIC_DOMAINS = new Set(['science', 'chemistry', 'physics', 'astronomy', 'table', 'math', 'corridor', 'vr', 'ai', 'outdoor', 'balance', 'night', 'robotics', 'origami', 'microbiology', 'ilkyar']);
export const activityLabel = id => ACTIVITY_AREAS.find(area => area.id === id)?.label || (id === 'science' ? 'Fen bilimleri' : 'Birlikte seçelim');
