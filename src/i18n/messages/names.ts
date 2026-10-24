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

/** Al-A'raf 7:180 (opening), verbatim from the app's Qur'an data. */
export const NAMES_VERSE = "وَلِلَّهِ ٱلْأَسْمَآءُ ٱلْحُسْنَىٰ فَٱدْعُوهُ بِهَا";

export const names: Record<Locale, NamesMessages> = { ar, en, ur, fa, ru, ms, tr, id };
