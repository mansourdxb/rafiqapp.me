// Hijri calendar page strings. Month names, occasion names and "upcoming"/"today" come from the
// app (appT: hijri.*, countdown.*, calendar.*, alm.occasions.*, fasting.whiteDays).
import type { Locale } from "../config";

export type CalendarMsg = {
  title: string;
  description: string;
  prevMonth: string;
  nextMonth: string;
  occasionsMonth: string;
  noOccasions: string;
  converter: string;
  gToH: string;
  hToG: string;
  day: string;
  month: string;
  year: string;
  invalid: string;
  note: string;
};

const en: CalendarMsg = {
  title: "Hijri calendar",
  description:
    "The Hijri (Umm al-Qura) calendar month by month with Gregorian dates, Islamic occasions such as Ramadan, the two Eids, Arafah and Ashura, and a Hijri–Gregorian date converter.",
  prevMonth: "Previous month",
  nextMonth: "Next month",
  occasionsMonth: "This month",
  noOccasions: "No occasions this month",
  converter: "Date converter",
  gToH: "Gregorian to Hijri",
  hToG: "Hijri to Gregorian",
  day: "Day",
  month: "Month",
  year: "Year",
  invalid: "This date doesn't exist in the Umm al-Qura calendar.",
  note: "Umm al-Qura calendar. The start of a month can differ by a day depending on the moon sighting in your country.",
};

const ar: CalendarMsg = {
  title: "التقويم الهجري",
  description:
    "التقويم الهجري (أم القرى) شهرًا بشهر مع التاريخ الميلادي، والمناسبات الإسلامية كرمضان والعيدين وعرفة وعاشوراء، ومحوّل للتاريخ بين الهجري والميلادي.",
  prevMonth: "الشهر السابق",
  nextMonth: "الشهر التالي",
  occasionsMonth: "هذا الشهر",
  noOccasions: "لا توجد مناسبات هذا الشهر",
  converter: "تحويل التاريخ",
  gToH: "من الميلادي إلى الهجري",
  hToG: "من الهجري إلى الميلادي",
  day: "اليوم",
  month: "الشهر",
  year: "السنة",
  invalid: "هذا التاريخ غير موجود في تقويم أم القرى.",
  note: "تقويم أم القرى. قد تختلف بداية الشهر يومًا حسب رؤية الهلال في بلدك.",
};

const ur: CalendarMsg = {
  title: "ہجری کیلنڈر",
  description:
    "ہجری (ام القریٰ) کیلنڈر مہینہ بہ مہینہ عیسوی تاریخوں کے ساتھ، رمضان، عیدین، عرفہ اور عاشورا جیسے اسلامی مواقع، اور ہجری–عیسوی تاریخ کنورٹر۔",
  prevMonth: "پچھلا مہینہ",
  nextMonth: "اگلا مہینہ",
  occasionsMonth: "اس مہینے",
  noOccasions: "اس مہینے کوئی موقع نہیں",
  converter: "تاریخ کنورٹر",
  gToH: "عیسوی سے ہجری",
  hToG: "ہجری سے عیسوی",
  day: "دن",
  month: "مہینہ",
  year: "سال",
  invalid: "یہ تاریخ ام القریٰ کیلنڈر میں موجود نہیں۔",
  note: "ام القریٰ کیلنڈر۔ آپ کے ملک میں رویتِ ہلال کے مطابق مہینے کا آغاز ایک دن مختلف ہو سکتا ہے۔",
};

const fa: CalendarMsg = {
  title: "تقویم هجری قمری",
  description:
    "تقویم هجری قمری (ام‌القری) ماه به ماه همراه با تاریخ میلادی، مناسبت‌های اسلامی مانند رمضان، عیدین، عرفه و عاشورا، و مبدل تاریخ هجری و میلادی.",
  prevMonth: "ماه قبل",
  nextMonth: "ماه بعد",
  occasionsMonth: "این ماه",
  noOccasions: "این ماه مناسبتی نیست",
  converter: "تبدیل تاریخ",
  gToH: "میلادی به هجری",
  hToG: "هجری به میلادی",
  day: "روز",
  month: "ماه",
  year: "سال",
  invalid: "این تاریخ در تقویم ام‌القری وجود ندارد.",
  note: "تقویم ام‌القری. آغاز ماه ممکن است بسته به رؤیت هلال در کشور شما یک روز تفاوت داشته باشد.",
};

const ru: CalendarMsg = {
  title: "Календарь хиджры",
  description:
    "Календарь хиджры (Умм аль-Кура) по месяцам с григорианскими датами, исламские события — Рамадан, два праздника, день Арафа, Ашура — и конвертер дат хиджры и григорианского календаря.",
  prevMonth: "Предыдущий месяц",
  nextMonth: "Следующий месяц",
  occasionsMonth: "В этом месяце",
  noOccasions: "В этом месяце нет событий",
  converter: "Конвертер дат",
  gToH: "Григорианский → хиджра",
  hToG: "Хиджра → григорианский",
  day: "День",
  month: "Месяц",
  year: "Год",
  invalid: "Такой даты нет в календаре Умм аль-Кура.",
  note: "Календарь Умм аль-Кура. Начало месяца может отличаться на день в зависимости от наблюдения луны в вашей стране.",
};

const ms: CalendarMsg = {
  title: "Kalendar Hijrah",
  description:
    "Kalendar Hijrah (Umm al-Qura) bulan demi bulan dengan tarikh Masihi, hari-hari kebesaran Islam seperti Ramadan, dua Hari Raya, Arafah dan Asyura, serta penukar tarikh Hijrah–Masihi.",
  prevMonth: "Bulan sebelumnya",
  nextMonth: "Bulan berikutnya",
  occasionsMonth: "Bulan ini",
  noOccasions: "Tiada hari kebesaran bulan ini",
  converter: "Penukar tarikh",
  gToH: "Masihi ke Hijrah",
  hToG: "Hijrah ke Masihi",
  day: "Hari",
  month: "Bulan",
  year: "Tahun",
  invalid: "Tarikh ini tidak wujud dalam kalendar Umm al-Qura.",
  note: "Kalendar Umm al-Qura. Permulaan bulan boleh berbeza sehari mengikut rukyah hilal di negara anda.",
};

const tr: CalendarMsg = {
  title: "Hicri takvim",
  description:
    "Miladi tarihlerle ay ay Hicri (Ümmül Kura) takvim, Ramazan, iki bayram, Arefe ve Aşure gibi dinî günler ve Hicri–Miladi tarih çevirici.",
  prevMonth: "Önceki ay",
  nextMonth: "Sonraki ay",
  occasionsMonth: "Bu ay",
  noOccasions: "Bu ay dinî gün yok",
  converter: "Tarih çevirici",
  gToH: "Miladiden Hicriye",
  hToG: "Hicriden Miladiye",
  day: "Gün",
  month: "Ay",
  year: "Yıl",
  invalid: "Bu tarih Ümmül Kura takviminde yok.",
  note: "Ümmül Kura takvimi. Ayın başlangıcı, ülkenizdeki hilal gözlemine göre bir gün farklı olabilir.",
};

const id: CalendarMsg = {
  title: "Kalender Hijriah",
  description:
    "Kalender Hijriah (Umm al-Qura) bulan demi bulan dengan tanggal Masehi, hari besar Islam seperti Ramadan, dua hari raya, Arafah dan Asyura, serta pengonversi tanggal Hijriah–Masehi.",
  prevMonth: "Bulan sebelumnya",
  nextMonth: "Bulan berikutnya",
  occasionsMonth: "Bulan ini",
  noOccasions: "Tidak ada hari besar bulan ini",
  converter: "Konversi tanggal",
  gToH: "Masehi ke Hijriah",
  hToG: "Hijriah ke Masehi",
  day: "Hari",
  month: "Bulan",
  year: "Tahun",
  invalid: "Tanggal ini tidak ada dalam kalender Umm al-Qura.",
  note: "Kalender Umm al-Qura. Awal bulan bisa berbeda satu hari tergantung rukyat hilal di negara Anda.",
};

export const calendarMsg: Record<Locale, CalendarMsg> = { ar, en, ur, fa, ru, ms, tr, id };
