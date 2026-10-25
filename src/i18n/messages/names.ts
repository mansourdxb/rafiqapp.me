// 99 Names pages (/names/, /names/[n]/). Title/search follow the app (asmaAlHusna.*).
import type { Locale } from "../config";

export type NamesMessages = {
  title: string;
  /** Reference of the verse shown under the title (Arabic text of 7:180 for every language). */
  verseRef: string;
  description: string;
  search: string;
  noResults: string;
  meaning: string;
  explanation: string;
  inQuran: string;
  /** Shown when the meaning is in English because the app has no translation in this language. */
  englishNote: string;
  prev: string;
  next: string;
  all: string;
  /** "Name {n} of 99" */
  nth: string;
};

const ar: NamesMessages = {
  title: "أسماء الله الحسنى",
  verseRef: "الأعراف: ١٨٠",
  description: "أسماء الله الحسنى التسعة والتسعون مع معنى كل اسم وشرحه ومواضع وروده في القرآن الكريم.",
  search: "بحث في الأسماء...",
  noResults: "لا توجد نتائج",
  meaning: "المعنى",
  explanation: "الشرح",
  inQuran: "ورد في القرآن",
  englishNote: "",
  prev: "الاسم السابق",
  next: "الاسم التالي",
  all: "كل الأسماء",
  nth: "الاسم {n} من ٩٩",
};

const en: NamesMessages = {
  title: "99 Names of Allah",
  verseRef: "Al-A'raf 7:180",
  description: "The 99 Beautiful Names of Allah (Asma ul-Husna) with the meaning and explanation of each name and where it appears in the Qur'an.",
  search: "Search names...",
  noResults: "No results found",
  meaning: "Meaning",
  explanation: "Explanation",
  inQuran: "In the Qur'an",
  englishNote: "",
  prev: "Previous name",
  next: "Next name",
  all: "All names",
  nth: "Name {n} of 99",
};

const ur: NamesMessages = {
  title: "اللہ کے ۹۹ نام",
  verseRef: "الاعراف ۷:۱۸۰",
  description: "اللہ تعالیٰ کے ننانوے اسمائے حسنیٰ، ہر نام کا معنی، وضاحت اور قرآن مجید میں اس کے مقامات۔",
  search: "نام تلاش کریں...",
  noResults: "کوئی نتائج نہیں ملے",
  meaning: "معنی",
  explanation: "وضاحت",
  inQuran: "قرآن میں",
  englishNote: "معنی اور وضاحت انگریزی میں دکھائی گئی ہے",
  prev: "پچھلا نام",
  next: "اگلا نام",
  all: "تمام نام",
  nth: "۹۹ میں سے نام نمبر {n}",
};

const fa: NamesMessages = {
  title: "نام‌های نیکوی خداوند",
  verseRef: "اعراف ۷:۱۸۰",
  description: "نود و نه نام نیکوی خداوند همراه با معنا و شرح هر نام و جایگاه آن در قرآن کریم.",
  search: "جستجوی نام‌ها...",
  noResults: "نتیجه‌ای یافت نشد",
  meaning: "معنا",
  explanation: "شرح",
  inQuran: "در قرآن",
  englishNote: "معنا و شرح به زبان انگلیسی نمایش داده شده است",
  prev: "نام قبلی",
  next: "نام بعدی",
  all: "همه‌ی نام‌ها",
  nth: "نام {n} از ۹۹",
};

const ru: NamesMessages = {
  title: "99 имён Аллаха",
  verseRef: "Аль-Араф 7:180",
  description: "99 прекрасных имён Аллаха (Асма уль-Хусна) со значением и толкованием каждого имени и местами в Коране, где оно упоминается.",
  search: "Поиск имён...",
  noResults: "Результатов не найдено",
  meaning: "Значение",
  explanation: "Толкование",
  inQuran: "В Коране",
  englishNote: "Значение и толкование приведены на английском языке",
  prev: "Предыдущее имя",
  next: "Следующее имя",
  all: "Все имена",
  nth: "Имя {n} из 99",
};

const ms: NamesMessages = {
  title: "99 Nama Allah",
  verseRef: "Al-A'raf 7:180",
  description: "99 Nama Allah yang indah (Asmaul Husna) dengan makna dan huraian setiap nama serta tempat ia disebut dalam al-Quran.",
  search: "Cari nama...",
  noResults: "Tiada hasil ditemui",
  meaning: "Makna",
  explanation: "Huraian",
  inQuran: "Dalam al-Quran",
  englishNote: "Makna dan huraian dipaparkan dalam bahasa Inggeris",
  prev: "Nama sebelumnya",
  next: "Nama seterusnya",
  all: "Semua nama",
  nth: "Nama ke-{n} daripada 99",
};

const tr: NamesMessages = {
  title: "Esma-ül Hüsna",
  verseRef: "A'râf 7:180",
  description: "Allah'ın 99 güzel ismi (Esma-ül Hüsna); her ismin anlamı, açıklaması ve Kur'an'da geçtiği yerler.",
  search: "İsim ara...",
  noResults: "Sonuç bulunamadı",
  meaning: "Anlamı",
  explanation: "Açıklama",
  inQuran: "Kur'an'da",
  englishNote: "Anlam ve açıklama İngilizce gösterilmektedir",
  prev: "Önceki isim",
  next: "Sonraki isim",
  all: "Tüm isimler",
  nth: "99 isimden {n}.",
};

const id: NamesMessages = {
  title: "99 Nama Allah",
  verseRef: "Al-A'raf 7:180",
  description: "99 Nama Allah yang indah (Asmaul Husna) beserta makna dan penjelasan setiap nama serta letaknya dalam Al-Qur'an.",
  search: "Cari nama...",
  noResults: "Tidak ada hasil",
  meaning: "Makna",
  explanation: "Penjelasan",
  inQuran: "Dalam Al-Qur'an",
  englishNote: "Makna dan penjelasan ditampilkan dalam bahasa Inggris",
  prev: "Nama sebelumnya",
  next: "Nama berikutnya",
  all: "Semua nama",
  nth: "Nama ke-{n} dari 99",
};

const hi: NamesMessages = {
  title: "अल्लाह के 99 नाम",
  verseRef: "अल-आराफ़ 7:180",
  description: "अल्लाह के 99 ख़ूबसूरत नाम (अस्मा-उल-हुस्ना), हर नाम के अर्थ, व्याख्या और क़ुरआन में उसके आने की जगहों के साथ।",
  search: "नाम खोजें...",
  noResults: "कोई परिणाम नहीं मिला",
  meaning: "अर्थ",
  explanation: "व्याख्या",
  inQuran: "क़ुरआन में",
  englishNote: "अर्थ और व्याख्या अंग्रेज़ी में दिखाई गई है",
  prev: "पिछला नाम",
  next: "अगला नाम",
  all: "सभी नाम",
  nth: "99 में से नाम {n}",
};

/** Al-A'raf 7:180 (opening), verbatim from the app's Qur'an data. */
export const NAMES_VERSE = "وَلِلَّهِ ٱلْأَسْمَآءُ ٱلْحُسْنَىٰ فَٱدْعُوهُ بِهَا";

const bn: NamesMessages = {
  title: "আল্লাহর 99টি নাম",
  verseRef: "আল-আরাফ 7:180",
  description: "আল্লাহর 99টি সুন্দর নাম (আসমাউল হুসনা), প্রতিটি নামের অর্থ, ব্যাখ্যা এবং কুরআনে তার উল্লেখের স্থানসহ।",
  search: "নাম খুঁজুন...",
  noResults: "কোনো ফলাফল পাওয়া যায়নি",
  meaning: "অর্থ",
  explanation: "ব্যাখ্যা",
  inQuran: "কুরআনে",
  englishNote: "অর্থ ও ব্যাখ্যা ইংরেজিতে দেখানো হয়েছে",
  prev: "আগের নাম",
  next: "পরের নাম",
  all: "সব নাম",
  nth: "99টির মধ্যে {n} নম্বর নাম",
};

const ha: NamesMessages = {
  title: "Sunayen Allah 99",
  verseRef: "Al-A'raf 7:180",
  description: "Sunayen Allah Kyawawa 99 (Asma'ul Husna) tare da ma'ana da bayanin kowane suna da inda ya zo a cikin Alƙur'ani.",
  search: "Nemi sunaye...",
  noResults: "Babu sakamakon nema",
  meaning: "Ma'ana",
  explanation: "Bayani",
  inQuran: "A cikin Alƙur'ani",
  englishNote: "Ana nuna ma'ana da bayani da Turanci",
  prev: "Sunan da ya gabata",
  next: "Suna na gaba",
  all: "Dukkan sunaye",
  nth: "Suna na {n} cikin 99",
};

const fr: NamesMessages = {
  title: "Les 99 noms d’Allah",
  verseRef: "Al-A‘raf 7:180",
  description: "Les 99 plus beaux noms d’Allah (Asma al-Husna), avec le sens et l’explication de chaque nom et les passages du Coran où il apparaît.",
  search: "Rechercher un nom…",
  noResults: "Aucun résultat",
  meaning: "Sens",
  explanation: "Explication",
  inQuran: "Dans le Coran",
  englishNote: "Le sens et l’explication sont affichés en anglais",
  prev: "Nom précédent",
  next: "Nom suivant",
  all: "Tous les noms",
  nth: "Nom {n} sur 99",
};

export const names: Record<Locale, NamesMessages> = { ar, en, ur, fa, ru, ms, tr, id, hi, bn, ha, fr };
