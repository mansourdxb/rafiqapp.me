// Home page <title>, <h1> and (where the site description is too long or too general) the meta description.
// Each language names the app in its own script, as in common.ts, and its main sections in its own words.
import type { Locale } from "../config";

export type Seo = { title: string; h1: string; description?: string };

export const seo: Record<Locale, Seo> = {
  ar: {
    title: "رفيق المسلم — تطبيق القرآن الكريم ومواقيت الصلاة والأذكار",
    h1: "رفيق المسلم: القرآن الكريم ومواقيت الصلاة والأذكار في تطبيق واحد",
    description: "تطبيق رفيق المسلم المجاني: القرآن الكريم بمصحف المدينة، وكتب الحديث التسعة، وأذكار الصباح والمساء، ومواقيت الصلاة مع الأذان، والقبلة والسبحة.",
  },
  en: {
    title: "Rafiq Al Muslim — Quran, Prayer Times & Adhkar App",
    h1: "Rafiq Al Muslim: the Qur'an, prayer times and adhkar in one app",
    description: "Free Muslim app: read the Qur'an in the Madinah Mushaf, the nine hadith books, morning and evening adhkar, prayer times with the athan, Qibla and tasbeeh.",
  },
  ur: { title: "رفیق المسلم — قرآن، نماز کے اوقات اور اذکار", h1: "رفیق المسلم: قرآنِ کریم، نماز کے اوقات اور اذکار ایک ایپ میں" },
  fa: { title: "رفیق المسلم — قرآن، اوقات نماز و اذکار", h1: "رفیق المسلم: قرآن کریم، اوقات نماز و اذکار در یک برنامه" },
  ru: { title: "Рафик Аль-Муслим — Коран, время намаза и азкары", h1: "Рафик Аль-Муслим: Коран, время намаза и азкары в одном приложении" },
  ms: { title: "Rafiq Al Muslim — Al-Quran, Waktu Solat & Zikir", h1: "Rafiq Al Muslim: Al-Quran, waktu solat dan zikir dalam satu aplikasi" },
  tr: { title: "Rafiq Al Muslim — Kur'an, Namaz Vakitleri ve Zikirler", h1: "Rafiq Al Muslim: Kur'an-ı Kerim, namaz vakitleri ve zikirler tek uygulamada" },
  id: { title: "Rafiq Al Muslim — Al-Quran, Jadwal Shalat & Zikir", h1: "Rafiq Al Muslim: Al-Quran, jadwal shalat, dan zikir dalam satu aplikasi" },
  hi: { title: "रफ़ीक़ अल-मुस्लिम — क़ुरआन, नमाज़ के समय और अज़कार", h1: "रफ़ीक़ अल-मुस्लिम: क़ुरआन, नमाज़ के समय और अज़कार एक ही ऐप में" },
  bn: { title: "রফিক আল-মুসলিম — কুরআন, নামাজের সময় ও আজকার", h1: "রফিক আল-মুসলিম: কুরআন, নামাজের সময় ও আজকার এক অ্যাপে" },
  ha: { title: "Rafiq Al Muslim — Alƙur'ani, Lokutan Sallah da Azkar", h1: "Rafiq Al Muslim: Alƙur'ani Mai Girma, lokutan sallah da azkar" },
  fr: {
    title: "Rafiq Al Muslim — Coran, horaires de prière et adhkar",
    h1: "Rafiq Al Muslim : le Coran, les horaires de prière et les adhkar dans une seule application",
    description: "Lisez le Saint Coran dans le Mushaf de Médine, les neuf recueils de hadiths, les adhkar du matin et du soir, les horaires de prière et la qibla — gratuitement.",
  },
  zh: { title: "Rafiq Al Muslim — 古兰经、礼拜时间和记念词", h1: "Rafiq Al Muslim：古兰经、礼拜时间和记念词，尽在一个应用" },
  ps: { title: "رفیق المسلم — قرآن، د لمانځه وختونه او اذکار", h1: "رفیق المسلم: قرآن کریم، د لمانځه وختونه او اذکار" },
  pa: { title: "ਰਫ਼ੀਕ ਅਲ-ਮੁਸਲਿਮ — ਕੁਰਆਨ, ਨਮਾਜ਼ ਦੇ ਸਮੇਂ ਅਤੇ ਅਜ਼ਕਾਰ", h1: "ਰਫ਼ੀਕ ਅਲ-ਮੁਸਲਿਮ: ਕੁਰਆਨ ਮਜੀਦ, ਨਮਾਜ਼ ਦੇ ਸਮੇਂ ਅਤੇ ਅਜ਼ਕਾਰ" },
  pnb: { title: "رفیق المسلم — قرآن، نماز دے ویلے تے اذکار", h1: "رفیق المسلم: قرآن مجید، نماز دے ویلے تے اذکار" },
  uz: { title: "Rafiq Al Muslim — Qurʼon, namoz vaqtlari va zikrlar", h1: "Rafiq Al Muslim: Qurʼon, namoz vaqtlari va zikrlar bitta ilovada" },
  "uz-Cyrl": { title: "Рафиқ Ал-Муслим — Қуръон, намоз вақтлари ва зикрлар", h1: "Рафиқ Ал-Муслим: Қуръон, намоз вақтлари ва зикрлар битта иловада" },
  so: {
    title: "Rafiq Al Muslim — Qur’aanka, Waqtiyada Salaadda iyo Adkaarta",
    h1: "Rafiq Al Muslim: Qur’aanka Kariimka ah, waqtiyada salaadda iyo adkaarta",
    description: "Ku akhri Qur’aanka Kariimka ah Mushafka Madiina, sagaalka kitaab ee xadiiska, adkaarta subaxa iyo galabta, waqtiyada salaadda iyo Qiblada — bilaash.",
  },
  sw: { title: "Rafiq Al Muslim — Qur'ani, Nyakati za Sala na Adhkari", h1: "Rafiq Al Muslim: Qur'ani Tukufu, nyakati za Sala na adhkari" },
  "ku-Arab": { title: "رفیق المسلم — قورئان، کاتەکانی نوێژ و زیکرەکان", h1: "رفیق المسلم: قورئانی پیرۆز، کاتەکانی نوێژ و زیکرەکان" },
  "ku-Latn": { title: "Rafiq Al Muslim — Qur'an, demên nimêjê û zikir", h1: "Rafiq Al Muslim: Qur'ana Pîroz, demên nimêjê û zikir" },
  ml: { title: "Rafiq Al Muslim — ഖുർആൻ, നമസ്കാര സമയങ്ങൾ, അദ്കാർ", h1: "Rafiq Al Muslim: വിശുദ്ധ ഖുർആൻ, നമസ്കാര സമയങ്ങൾ, അദ്കാർ" },
  de: { title: "Rafiq Al Muslim — Koran, Gebetszeiten & Adhkar", h1: "Rafiq Al Muslim: Koran, Gebetszeiten und Adhkar in einer App" },
  es: {
    title: "Rafiq Al Muslim — Corán, horarios de oración y adhkar",
    h1: "Rafiq Al Muslim: el Corán, los horarios de oración y los adhkar en una sola app",
    description: "Lee el Sagrado Corán en el Mushaf de Medina, los nueve libros de hadiz, los adhkar de la mañana y de la tarde, los horarios de oración y la alquibla — gratis.",
  },
  "az-Latn": { title: "Rafiq Al Muslim — Quran, namaz vaxtları və zikrlər", h1: "Rafiq Al Muslim: Quran, namaz vaxtları və zikrlər bir tətbiqdə" },
  om: {
    title: "Rafiq Al Muslim — Qur'aana, Yeroo Salaataa fi Zikrii",
    h1: "Rafiq Al Muslim: Qur'aana Qulqulluu, yeroo salaataa fi zikrii",
    description: "Qur'aana Qulqulluu Mushafa Madiinaa keessatti dubbisi, kitaabota hadiisaa sagal, zikrii ganamaa fi galgalaa, yeroo salaataa fi Qiblaa — bilisaan.",
  },
  am: { title: "Rafiq Al Muslim — ቁርኣን፣ የሶላት ወቅቶች፣ ዚክሮች", h1: "Rafiq Al Muslim — ቅዱስ ቁርኣን፣ የሶላት ወቅቶች፣ ዚክሮች" },
  "kk-Cyrl": { title: "Rafiq Al Muslim — Құран, намаз уақыттары және зікірлер", h1: "Rafiq Al Muslim: Құран Кәрім, намаз уақыттары және зікірлер" },
  ta: { title: "Rafiq Al Muslim — குர்ஆன், தொழுகை நேரங்கள், அத்கார்", h1: "Rafiq Al Muslim: திருக்குர்ஆன், தொழுகை நேரங்கள், அத்கார்" },
  gu: { title: "Rafiq Al Muslim — કુરઆન, નમાઝના સમય અને અઝકાર", h1: "Rafiq Al Muslim: પવિત્ર કુરઆન, નમાઝના સમય અને અઝકાર" },
  my: { title: "Rafiq Al Muslim — ကုရ်အာန်၊ နမာဇ်ချိန်များနှင့် အဇ်ကာရ်", h1: "Rafiq Al Muslim — ကုရ်အာန်မြတ်၊ နမာဇ်ချိန်များနှင့် အဇ်ကာရ်" },
};
