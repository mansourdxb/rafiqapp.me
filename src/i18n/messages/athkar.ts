// Adhkar pages (/athkar/, /athkar/[id]/). Wording follows the app (alm.azkar.*, hisn.*) where it has it.
import type { Locale } from "../config";

export type AthkarMessages = {
  title: string;
  subtitle: string;
  description: string;
  daily: string;
  hisn: string;
  hisnSub: string;
  tasbih: string;
  tasbihSub: string;
  search: string;
  noResults: string;
  /** "{count} dhikr" */
  count: string;
  /** "Read {done} of {total}" */
  readCount: string;
  tashkeel: string;
  fontSize: string;
  showDalil: string;
  hideDalil: string;
  repeat: string;
  times: string;
  tapToCount: string;
  listen: string;
  stop: string;
  copy: string;
  copied: string;
  share: string;
  reset: string;
  done: string;
  allDone: string;
  allDoneSub: string;
  restart: string;
  back: string;
  readerDescription: string;
  /** Featured categories, as the app names them (alm.azkar.cat.*). */
  cats: { morning: string; evening: string; afterPrayer: string; sleep: string; wake: string };
};

const ar: AthkarMessages = {
  title: "الأذكار",
  subtitle: "أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ",
  description: "أذكار الصباح والمساء وأذكار بعد الصلاة والنوم والاستيقاظ وجميع أبواب حصن المسلم، مع عدّاد للتكرار والاستماع.",
  daily: "الأذكار اليومية",
  hisn: "حصن المسلم",
  hisnSub: "أذكار من صحيح السنة النبوية",
  tasbih: "السبحة",
  tasbihSub: "سبّح واحفظ عدد تسبيحاتك",
  search: "البحث في حصن المسلم...",
  noResults: "لا توجد نتائج",
  count: "{count} ذكر",
  readCount: "تم قراءة {done} من {total}",
  tashkeel: "التشكيل",
  fontSize: "حجم الخط",
  showDalil: "إظهار الدليل",
  hideDalil: "إخفاء الدليل",
  repeat: "التكرار",
  times: "مرة",
  tapToCount: "اضغط للعد",
  listen: "استماع",
  stop: "إيقاف",
  copy: "نسخ",
  copied: "تم النسخ",
  share: "مشاركة",
  reset: "تصفير",
  done: "تم",
  allDone: "أتممت الأذكار، تقبّل الله منك",
  allDoneSub: "يُحفظ تقدّمك لليوم على هذا الجهاز",
  restart: "البدء من جديد",
  back: "الأذكار",
  readerDescription: "{title} — النص كاملًا بالتشكيل مع عدّاد التكرار والاستماع.",
  cats: { morning: "أذكار الصباح", evening: "أذكار المساء", afterPrayer: "أذكار بعد الصلاة", sleep: "أذكار النوم", wake: "أذكار الاستيقاظ" },
};

const en: AthkarMessages = {
  title: "Adhkar",
  subtitle: "Verily, in the remembrance of Allah do hearts find rest",
  description: "Morning and evening adhkar, after-prayer, sleep and waking adhkar and every chapter of Hisn Al-Muslim — with a repeat counter, audio and translation.",
  daily: "Daily Athkar",
  hisn: "Hisn Al-Muslim",
  hisnSub: "Adhkar from the authentic Prophetic Sunnah",
  tasbih: "Tasbih",
  tasbihSub: "Glorify Allah and keep your count",
  search: "Search Hisn Al-Muslim...",
  noResults: "No results found",
  count: "{count} dhikr",
  readCount: "Read {done} of {total}",
  tashkeel: "Diacritics",
  fontSize: "Font size",
  showDalil: "Show evidence",
  hideDalil: "Hide evidence",
  repeat: "Repeat",
  times: "times",
  tapToCount: "Tap to count",
  listen: "Listen",
  stop: "Stop",
  copy: "Copy",
  copied: "Copied",
  share: "Share",
  reset: "Reset",
  done: "Done",
  allDone: "You have completed these adhkar — may Allah accept from you",
  allDoneSub: "Today's progress is saved on this device",
  restart: "Start again",
  back: "Adhkar",
  readerDescription: "{title} — the full Arabic text with translation, a repeat counter and audio.",
  cats: { morning: "Morning Azkar", evening: "Evening Azkar", afterPrayer: "After-Prayer Azkar", sleep: "Sleep Azkar", wake: "Waking Azkar" },
};

const ur: AthkarMessages = {
  title: "اذکار",
  subtitle: "بے شک اللہ کے ذکر سے دلوں کو اطمینان نصیب ہوتا ہے",
  description: "صبح و شام کے اذکار، نماز کے بعد، سونے اور بیدار ہونے کے اذکار اور حصن المسلم کے تمام ابواب — تکرار کاؤنٹر، آڈیو اور ترجمے کے ساتھ۔",
  daily: "روزانہ کے اذکار",
  hisn: "حصن المسلم",
  hisnSub: "نبی کریم ﷺ کی صحیح سنت سے اذکار",
  tasbih: "تسبیح",
  tasbihSub: "اللہ کی تسبیح کریں اور اپنی گنتی محفوظ رکھیں",
  search: "حصن المسلم میں تلاش...",
  noResults: "کوئی نتائج نہیں ملے",
  count: "{count} ذکر",
  readCount: "{total} میں سے {done} پڑھے",
  tashkeel: "اعراب",
  fontSize: "فونٹ سائز",
  showDalil: "دلیل دکھائیں",
  hideDalil: "دلیل چھپائیں",
  repeat: "تکرار",
  times: "بار",
  tapToCount: "گننے کے لیے ٹچ کریں",
  listen: "سنیں",
  stop: "روکیں",
  copy: "کاپی کریں",
  copied: "کاپی ہو گیا",
  share: "شیئر کریں",
  reset: "ری سیٹ",
  done: "مکمل",
  allDone: "آپ نے یہ اذکار مکمل کر لیے — اللہ قبول فرمائے",
  allDoneSub: "آج کی پیش رفت اسی ڈیوائس پر محفوظ ہے",
  restart: "دوبارہ شروع کریں",
  back: "اذکار",
  readerDescription: "{title} — مکمل عربی متن، ترجمہ، تکرار کاؤنٹر اور آڈیو کے ساتھ۔",
  cats: { morning: "صبح کے اذکار", evening: "شام کے اذکار", afterPrayer: "نماز کے بعد کے اذکار", sleep: "سونے کے اذکار", wake: "بیدار ہونے کے اذکار" },
};

const fa: AthkarMessages = {
  title: "اذکار",
  subtitle: "آگاه باشید، تنها با یاد خدا دل‌ها آرام می‌گیرد",
  description: "اذکار صبح و شام، اذکار بعد از نماز، خواب و بیداری و همه‌ی ابواب حصن المسلم — همراه با شمارنده‌ی تکرار، صوت و ترجمه.",
  daily: "اذکار روزانه",
  hisn: "حصن المسلم",
  hisnSub: "اذکاری از سنت صحیح نبوی",
  tasbih: "تسبیح",
  tasbihSub: "خدا را تسبیح بگویید و شمار آن را نگه دارید",
  search: "جستجو در حصن المسلم...",
  noResults: "نتیجه‌ای یافت نشد",
  count: "{count} ذکر",
  readCount: "{done} از {total} خوانده شد",
  tashkeel: "اعراب",
  fontSize: "اندازه فونت",
  showDalil: "نمایش دلیل",
  hideDalil: "پنهان کردن دلیل",
  repeat: "تکرار",
  times: "بار",
  tapToCount: "برای شمارش لمس کنید",
  listen: "شنیدن",
  stop: "توقف",
  copy: "کپی",
  copied: "کپی شد",
  share: "اشتراک‌گذاری",
  reset: "بازنشانی",
  done: "تکمیل شد",
  allDone: "این اذکار را به پایان رساندید — خداوند از شما بپذیرد",
  allDoneSub: "پیشرفت امروز روی همین دستگاه ذخیره می‌شود",
  restart: "شروع دوباره",
  back: "اذکار",
  readerDescription: "{title} — متن کامل عربی همراه با ترجمه، شمارنده‌ی تکرار و صوت.",
  cats: { morning: "اذکار صبح", evening: "اذکار شام", afterPrayer: "اذکار بعد از نماز", sleep: "اذکار خواب", wake: "اذکار بیداری" },
};

const ru: AthkarMessages = {
  title: "Азкары",
  subtitle: "Поистине, сердца находят покой в поминании Аллаха",
  description: "Утренние и вечерние азкары, азкары после намаза, перед сном и при пробуждении и все главы «Крепости мусульманина» — со счётчиком повторов, аудио и переводом.",
  daily: "Ежедневные азкары",
  hisn: "Крепость мусульманина",
  hisnSub: "Азкары из достоверной Сунны Пророка",
  tasbih: "Тасбих",
  tasbihSub: "Прославляйте Аллаха и ведите счёт",
  search: "Поиск в Хисн Аль-Муслим...",
  noResults: "Результатов не найдено",
  count: "Зикров: {count}",
  readCount: "Прочитано {done} из {total}",
  tashkeel: "Огласовки",
  fontSize: "Размер шрифта",
  showDalil: "Показать довод",
  hideDalil: "Скрыть довод",
  repeat: "Повтор",
  times: "раз",
  tapToCount: "Нажмите для счёта",
  listen: "Слушать",
  stop: "Стоп",
  copy: "Копировать",
  copied: "Скопировано",
  share: "Поделиться",
  reset: "Сбросить",
  done: "Завершено",
  allDone: "Вы завершили эти азкары — да примет Аллах от вас",
  allDoneSub: "Прогресс за сегодня сохранён на этом устройстве",
  restart: "Начать заново",
  back: "Азкары",
  readerDescription: "{title} — полный арабский текст с переводом, счётчиком повторов и аудио.",
  cats: { morning: "Утренние азкары", evening: "Вечерние азкары", afterPrayer: "Азкары после намаза", sleep: "Азкары перед сном", wake: "Азкары при пробуждении" },
};

const ms: AthkarMessages = {
  title: "Zikir",
  subtitle: "Sesungguhnya dengan mengingati Allah, tenang tenteramlah hati",
  description: "Zikir pagi dan petang, zikir selepas solat, sebelum tidur dan bangun tidur serta semua bab Hisnul Muslim — dengan pengira ulangan, audio dan terjemahan.",
  daily: "Zikir Harian",
  hisn: "Hisnul Muslim",
  hisnSub: "Zikir daripada Sunnah Nabi yang sahih",
  tasbih: "Tasbih",
  tasbihSub: "Bertasbihlah dan simpan kiraan anda",
  search: "Cari Hisn Al-Muslim...",
  noResults: "Tiada hasil ditemui",
  count: "{count} zikir",
  readCount: "Baca {done} daripada {total}",
  tashkeel: "Baris",
  fontSize: "Saiz fon",
  showDalil: "Tunjukkan dalil",
  hideDalil: "Sembunyikan dalil",
  repeat: "Ulang",
  times: "kali",
  tapToCount: "Ketik untuk mengira",
  listen: "Dengar",
  stop: "Henti",
  copy: "Salin",
  copied: "Disalin",
  share: "Kongsi",
  reset: "Set Semula",
  done: "Selesai",
  allDone: "Anda telah menyelesaikan zikir ini — semoga Allah menerimanya",
  allDoneSub: "Kemajuan hari ini disimpan pada peranti ini",
  restart: "Mula semula",
  back: "Zikir",
  readerDescription: "{title} — teks Arab penuh dengan terjemahan, pengira ulangan dan audio.",
  cats: { morning: "Zikir Pagi", evening: "Zikir Petang", afterPrayer: "Zikir Selepas Solat", sleep: "Zikir Tidur", wake: "Zikir Bangun Tidur" },
};

const tr: AthkarMessages = {
  title: "Zikirler",
  subtitle: "Kalpler ancak Allah'ı anmakla huzur bulur",
  description: "Sabah ve akşam zikirleri, namaz sonrası, uyku ve uyanma zikirleri ile Hısnu'l Müslim'in tüm bölümleri — tekrar sayacı, ses ve tercümeyle.",
  daily: "Günlük Zikirler",
  hisn: "Hısnu'l Müslim",
  hisnSub: "Sahih Peygamber Sünnetinden zikirler",
  tasbih: "Tesbih",
  tasbihSub: "Allah'ı tesbih edin, sayınızı tutun",
  search: "Hisn-ül Müslim'de ara...",
  noResults: "Sonuç bulunamadı",
  count: "{count} zikir",
  readCount: "{total} içinden {done} okundu",
  tashkeel: "Hareke",
  fontSize: "Yazı boyutu",
  showDalil: "Delili göster",
  hideDalil: "Delili gizle",
  repeat: "Tekrar",
  times: "kez",
  tapToCount: "Saymak için dokunun",
  listen: "Dinle",
  stop: "Durdur",
  copy: "Kopyala",
  copied: "Kopyalandı",
  share: "Paylaş",
  reset: "Sıfırla",
  done: "Tamamlandı",
  allDone: "Bu zikirleri tamamladınız — Allah kabul etsin",
  allDoneSub: "Bugünkü ilerlemeniz bu cihazda kaydedilir",
  restart: "Yeniden başla",
  back: "Zikirler",
  readerDescription: "{title} — tam Arapça metin, tercüme, tekrar sayacı ve sesle.",
  cats: { morning: "Sabah Zikirleri", evening: "Akşam Zikirleri", afterPrayer: "Namaz Sonrası Zikirleri", sleep: "Uyku Zikirleri", wake: "Uyanma Zikirleri" },
};

const id: AthkarMessages = {
  title: "Dzikir",
  subtitle: "Ingatlah, hanya dengan mengingat Allah hati menjadi tenteram",
  description: "Dzikir pagi dan petang, dzikir setelah shalat, sebelum tidur dan bangun tidur serta semua bab Hisnul Muslim — dengan penghitung ulangan, audio, dan terjemahan.",
  daily: "Dzikir Harian",
  hisn: "Hisnul Muslim",
  hisnSub: "Dzikir dari Sunnah Nabi yang sahih",
  tasbih: "Tasbih",
  tasbihSub: "Bertasbihlah dan simpan hitungan Anda",
  search: "Cari Hishnul Muslim...",
  noResults: "Tidak ada hasil",
  count: "{count} zikir",
  readCount: "Baca {done} dari {total}",
  tashkeel: "Harakat",
  fontSize: "Ukuran font",
  showDalil: "Tampilkan dalil",
  hideDalil: "Sembunyikan dalil",
  repeat: "Ulangi",
  times: "kali",
  tapToCount: "Ketuk untuk menghitung",
  listen: "Dengarkan",
  stop: "Berhenti",
  copy: "Salin",
  copied: "Disalin",
  share: "Bagikan",
  reset: "Atur Ulang",
  done: "Selesai",
  allDone: "Anda telah menyelesaikan dzikir ini — semoga Allah menerimanya",
  allDoneSub: "Kemajuan hari ini tersimpan di perangkat ini",
  restart: "Mulai lagi",
  back: "Dzikir",
  readerDescription: "{title} — teks Arab lengkap dengan terjemahan, penghitung ulangan, dan audio.",
  cats: { morning: "Dzikir Pagi", evening: "Dzikir Petang", afterPrayer: "Dzikir Setelah Shalat", sleep: "Dzikir Sebelum Tidur", wake: "Dzikir Bangun Tidur" },
};

export const athkar: Record<Locale, AthkarMessages> = { ar, en, ur, fa, ru, ms, tr, id };

export const fill = (s: string, p: Record<string, string | number>) =>
  s.replace(/\{(\w+)\}/g, (_, k: string) => String(p[k] ?? ""));

/** The strings the (client) reader needs; the page passes only these. */
export const READER_LABELS = [
  "readCount", "tashkeel", "fontSize", "showDalil", "hideDalil", "repeat", "times", "tapToCount", "listen", "stop",
  "copy", "copied", "share", "reset", "done", "allDone", "allDoneSub", "restart", "back",
] as const satisfies readonly (keyof AthkarMessages)[];
export type ReaderLabels = Pick<AthkarMessages, (typeof READER_LABELS)[number]>;
