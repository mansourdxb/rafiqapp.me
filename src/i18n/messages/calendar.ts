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

const hi: CalendarMsg = {
  title: "हिजरी कैलेंडर",
  description:
    "हिजरी (उम्मुल क़ुरा) कैलेंडर महीने-दर-महीने ग्रेगोरियन तारीख़ों के साथ, रमज़ान, दोनों ईदें, अरफ़ा और आशूरा जैसे इस्लामी मौक़े, और हिजरी–ग्रेगोरियन तारीख़ कन्वर्टर।",
  prevMonth: "पिछला महीना",
  nextMonth: "अगला महीना",
  occasionsMonth: "इस महीने",
  noOccasions: "इस महीने कोई मौक़ा नहीं",
  converter: "तारीख़ कन्वर्टर",
  gToH: "ग्रेगोरियन से हिजरी",
  hToG: "हिजरी से ग्रेगोरियन",
  day: "दिन",
  month: "महीना",
  year: "साल",
  invalid: "यह तारीख़ उम्मुल क़ुरा कैलेंडर में मौजूद नहीं है।",
  note: "उम्मुल क़ुरा कैलेंडर। आपके देश में चाँद दिखने के अनुसार महीने की शुरुआत एक दिन अलग हो सकती है।",
};

const bn: CalendarMsg = {
  title: "হিজরি ক্যালেন্ডার",
  description:
    "হিজরি (উম্মুল কুরা) ক্যালেন্ডার মাসে মাসে ইংরেজি তারিখসহ, রমজান, দুই ঈদ, আরাফা ও আশুরার মতো ইসলামি উপলক্ষ, এবং হিজরি–ইংরেজি তারিখ রূপান্তরকারী।",
  prevMonth: "আগের মাস",
  nextMonth: "পরের মাস",
  occasionsMonth: "এই মাসে",
  noOccasions: "এই মাসে কোনো উপলক্ষ নেই",
  converter: "তারিখ রূপান্তরকারী",
  gToH: "ইংরেজি থেকে হিজরি",
  hToG: "হিজরি থেকে ইংরেজি",
  day: "দিন",
  month: "মাস",
  year: "বছর",
  invalid: "এই তারিখটি উম্মুল কুরা ক্যালেন্ডারে নেই।",
  note: "উম্মুল কুরা ক্যালেন্ডার। আপনার দেশে চাঁদ দেখার ওপর নির্ভর করে মাসের শুরু এক দিন আগে-পরে হতে পারে।",
};

const ha: CalendarMsg = {
  title: "Kalandar Hijira",
  description:
    "Kalandar Hijira (Ummul Ƙura) wata-wata tare da kwanakin Miladiyya, lokutan musamman na Musulunci kamar Ramadan, Idi biyu, Arafa da Ashura, da mai canza kwanan wata tsakanin Hijira da Miladiyya.",
  prevMonth: "Watan da ya gabata",
  nextMonth: "Wata mai zuwa",
  occasionsMonth: "Wannan wata",
  noOccasions: "Babu wani lokaci na musamman a wannan wata",
  converter: "Mai canza kwanan wata",
  gToH: "Daga Miladiyya zuwa Hijira",
  hToG: "Daga Hijira zuwa Miladiyya",
  day: "Rana",
  month: "Wata",
  year: "Shekara",
  invalid: "Wannan kwanan wata babu shi a kalandar Ummul Ƙura.",
  note: "Kalandar Ummul Ƙura. Farkon wata zai iya bambanta da kwana ɗaya gwargwadon ganin wata a ƙasarku.",
};

const fr: CalendarMsg = {
  title: "Calendrier hégirien",
  description:
    "Le calendrier hégirien (Umm al-Qura) mois par mois avec les dates grégoriennes, les occasions islamiques comme le Ramadan, les deux Aïds, Arafat et Achoura, et un convertisseur de dates hégirien–grégorien.",
  prevMonth: "Mois précédent",
  nextMonth: "Mois suivant",
  occasionsMonth: "Ce mois-ci",
  noOccasions: "Aucune occasion ce mois-ci",
  converter: "Convertisseur de dates",
  gToH: "Grégorien vers hégirien",
  hToG: "Hégirien vers grégorien",
  day: "Jour",
  month: "Mois",
  year: "Année",
  invalid: "Cette date n’existe pas dans le calendrier Umm al-Qura.",
  note: "Calendrier Umm al-Qura. Le début d’un mois peut varier d’un jour selon l’observation du croissant dans votre pays.",
};

const zh: CalendarMsg = {
  title: "伊斯兰历",
  description:
    "逐月查看伊斯兰历（乌姆古拉历）及对应的公历日期，包括斋月、两大节日、阿拉法特日和阿舒拉日等伊斯兰节日，还有伊斯兰历与公历的日期换算。",
  prevMonth: "上个月",
  nextMonth: "下个月",
  occasionsMonth: "本月",
  noOccasions: "本月没有节日",
  converter: "日期换算",
  gToH: "公历转伊斯兰历",
  hToG: "伊斯兰历转公历",
  day: "日",
  month: "月",
  year: "年",
  invalid: "乌姆古拉历中没有这一天。",
  note: "乌姆古拉历。根据您所在国家的见月情况，月初可能相差一天。",
};

export const calendarMsg: Record<Locale, CalendarMsg> = { ar, en, ur, fa, ru, ms, tr, id, hi, bn, ha, fr, zh };
