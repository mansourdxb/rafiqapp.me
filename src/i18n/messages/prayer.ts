// Prayer-times page strings. Prayer names, method names, madhab and countdown labels come from the
// app (appT: prayer.*, prayerSettings.*, alm.prayer.*, alm.mid.*).
import type { Locale } from "../config";

export type PrayerMsg = {
  title: string;
  description: string;
  useLocation: string;
  locating: string;
  searchPlaceholder: string;
  searching: string;
  noResults: string;
  searchError: string;
  locError: string;
  defaultNotice: string;
  settings: string;
  auto: string;
  timeFormat: string;
  h12: string;
  h24: string;
  highLat: string;
  tzNote: string;
  monthly: string;
  print: string;
  prevMonth: string;
  nextMonth: string;
  thisMonth: string;
  date: string;
  location: string;
  makkah: string;
};

const en: PrayerMsg = {
  title: "Prayer times",
  description:
    "Today's prayer times for your city — Fajr, sunrise, Dhuhr, Asr, Maghrib and Isha — with a live countdown to the next prayer and a printable monthly timetable.",
  useLocation: "Use my location",
  locating: "Locating…",
  searchPlaceholder: "Search for a city",
  searching: "Searching…",
  noResults: "No places found",
  searchError: "Search isn't available right now. Please try again.",
  locError: "Couldn't get your location — search for your city. To allow it on iPhone: Settings → Privacy & Security → Location Services → your browser → While Using.",
  defaultNotice: "Showing the times for Makkah. Use your location or search for your city.",
  settings: "Settings",
  auto: "Automatic — {{method}}",
  timeFormat: "Time format",
  h12: "12-hour",
  h24: "24-hour",
  highLat: "Above 48° latitude, Fajr and Isha use the twilight-angle rule automatically.",
  tzNote: "Times are in {{city}} local time ({{tz}}).",
  monthly: "Monthly timetable",
  print: "Print",
  prevMonth: "Previous month",
  nextMonth: "Next month",
  thisMonth: "This month",
  date: "Date",
  location: "Location",
  makkah: "Makkah",
};

const ar: PrayerMsg = {
  title: "مواقيت الصلاة",
  description:
    "مواقيت الصلاة اليوم لمدينتك — الفجر والشروق والظهر والعصر والمغرب والعشاء — مع عدّ تنازلي مباشر للصلاة القادمة وجدول شهري قابل للطباعة.",
  useLocation: "استخدم موقعي",
  locating: "جارٍ تحديد الموقع…",
  searchPlaceholder: "ابحث عن مدينة",
  searching: "جارٍ البحث…",
  noResults: "لم يتم العثور على أماكن",
  searchError: "البحث غير متاح الآن. حاول مرة أخرى.",
  locError: "تعذّر تحديد موقعك — ابحث عن مدينتك. للسماح به على iPhone: الإعدادات ← الخصوصية والأمن ← خدمات الموقع ← المتصفح ← أثناء الاستخدام.",
  defaultNotice: "تُعرض مواقيت مكة المكرمة. استخدم موقعك أو ابحث عن مدينتك.",
  settings: "الإعدادات",
  auto: "تلقائي — {{method}}",
  timeFormat: "تنسيق الوقت",
  h12: "١٢ ساعة",
  h24: "٢٤ ساعة",
  highLat: "فوق خط العرض ٤٨° تُحسب أوقات الفجر والعشاء تلقائيًا بقاعدة زاوية الشفق.",
  tzNote: "المواقيت بالتوقيت المحلي لـ{{city}} ({{tz}}).",
  monthly: "الجدول الشهري",
  print: "طباعة",
  prevMonth: "الشهر السابق",
  nextMonth: "الشهر التالي",
  thisMonth: "هذا الشهر",
  date: "التاريخ",
  location: "الموقع",
  makkah: "مكة المكرمة",
};

const ur: PrayerMsg = {
  title: "اوقاتِ نماز",
  description:
    "آپ کے شہر کے آج کے اوقاتِ نماز — فجر، طلوعِ آفتاب، ظہر، عصر، مغرب اور عشاء — اگلی نماز تک براہِ راست الٹی گنتی اور قابلِ پرنٹ ماہانہ نظام الاوقات کے ساتھ۔",
  useLocation: "میرا مقام استعمال کریں",
  locating: "مقام معلوم کیا جا رہا ہے…",
  searchPlaceholder: "شہر تلاش کریں",
  searching: "تلاش جاری ہے…",
  noResults: "کوئی جگہ نہیں ملی",
  searchError: "تلاش ابھی دستیاب نہیں۔ دوبارہ کوشش کریں۔",
  locError: "آپ کا مقام معلوم نہیں ہو سکا — اپنا شہر تلاش کریں۔ iPhone پر اجازت کے لیے: Settings ← Privacy & Security ← Location Services ← براؤزر ← While Using۔",
  defaultNotice: "مکہ مکرمہ کے اوقات دکھائے جا رہے ہیں۔ اپنا مقام استعمال کریں یا اپنا شہر تلاش کریں۔",
  settings: "ترتیبات",
  auto: "خودکار — {{method}}",
  timeFormat: "وقت کا انداز",
  h12: "12 گھنٹے",
  h24: "24 گھنٹے",
  highLat: "48° عرض بلد سے اوپر فجر اور عشاء کے لیے خودکار طور پر زاویۂ شفق کا اصول استعمال ہوتا ہے۔",
  tzNote: "اوقات {{city}} کے مقامی وقت ({{tz}}) کے مطابق ہیں۔",
  monthly: "ماہانہ نظام الاوقات",
  print: "پرنٹ کریں",
  prevMonth: "پچھلا مہینہ",
  nextMonth: "اگلا مہینہ",
  thisMonth: "اس مہینے",
  date: "تاریخ",
  location: "مقام",
  makkah: "مکہ مکرمہ",
};

const fa: PrayerMsg = {
  title: "اوقات شرعی",
  description:
    "اوقات نماز امروز برای شهر شما — صبح، طلوع، ظهر، عصر، مغرب و عشا — با شمارش معکوس زنده تا نماز بعدی و جدول ماهانهٔ قابل چاپ.",
  useLocation: "استفاده از موقعیت من",
  locating: "در حال یافتن موقعیت…",
  searchPlaceholder: "جستجوی شهر",
  searching: "در حال جستجو…",
  noResults: "مکانی پیدا نشد",
  searchError: "جستجو اکنون در دسترس نیست. دوباره تلاش کنید.",
  locError: "موقعیت شما پیدا نشد — شهر خود را جستجو کنید. برای اجازه در iPhone: تنظیمات ← حریم خصوصی و امنیت ← خدمات موقعیت مکانی ← مرورگر ← هنگام استفاده.",
  defaultNotice: "اوقات مکهٔ مکرمه نمایش داده می‌شود. از موقعیت خود استفاده کنید یا شهرتان را جستجو کنید.",
  settings: "تنظیمات",
  auto: "خودکار — {{method}}",
  timeFormat: "قالب زمان",
  h12: "۱۲ ساعته",
  h24: "۲۴ ساعته",
  highLat: "بالاتر از عرض ۴۸ درجه، صبح و عشا به‌طور خودکار با قاعدهٔ زاویهٔ شفق محاسبه می‌شوند.",
  tzNote: "اوقات به وقت محلی {{city}} ({{tz}}) است.",
  monthly: "جدول ماهانه",
  print: "چاپ",
  prevMonth: "ماه قبل",
  nextMonth: "ماه بعد",
  thisMonth: "این ماه",
  date: "تاریخ",
  location: "موقعیت",
  makkah: "مکهٔ مکرمه",
};

const ru: PrayerMsg = {
  title: "Время намаза",
  description:
    "Время намаза на сегодня для вашего города — фаджр, восход, зухр, аср, магриб и иша — с живым отсчётом до следующего намаза и месячным расписанием для печати.",
  useLocation: "Моё местоположение",
  locating: "Определяем местоположение…",
  searchPlaceholder: "Найти город",
  searching: "Поиск…",
  noResults: "Ничего не найдено",
  searchError: "Поиск сейчас недоступен. Попробуйте ещё раз.",
  locError: "Не удалось определить местоположение — найдите свой город. Как разрешить на iPhone: Настройки → Конфиденциальность и безопасность → Службы геолокации → ваш браузер → При использовании.",
  defaultNotice: "Показано время для Мекки. Определите своё местоположение или найдите свой город.",
  settings: "Настройки",
  auto: "Автоматически — {{method}}",
  timeFormat: "Формат времени",
  h12: "12 часов",
  h24: "24 часа",
  highLat: "Выше 48° широты фаджр и иша автоматически рассчитываются по правилу угла сумерек.",
  tzNote: "Время указано по местному времени города {{city}} ({{tz}}).",
  monthly: "Расписание на месяц",
  print: "Печать",
  prevMonth: "Предыдущий месяц",
  nextMonth: "Следующий месяц",
  thisMonth: "Этот месяц",
  date: "Дата",
  location: "Местоположение",
  makkah: "Мекка",
};

const ms: PrayerMsg = {
  title: "Waktu solat",
  description:
    "Waktu solat hari ini untuk bandar anda — Subuh, Syuruk, Zohor, Asar, Maghrib dan Isyak — dengan kiraan detik langsung ke solat seterusnya dan jadual bulanan yang boleh dicetak.",
  useLocation: "Guna lokasi saya",
  locating: "Mencari lokasi…",
  searchPlaceholder: "Cari bandar",
  searching: "Mencari…",
  noResults: "Tiada tempat ditemui",
  searchError: "Carian tidak tersedia sekarang. Sila cuba lagi.",
  locError: "Lokasi anda tidak dapat dikesan — cari bandar anda. Untuk membenarkannya di iPhone: Tetapan → Privasi & Keselamatan → Perkhidmatan Lokasi → pelayar anda → Semasa Digunakan.",
  defaultNotice: "Menunjukkan waktu untuk Makkah. Guna lokasi anda atau cari bandar anda.",
  settings: "Tetapan",
  auto: "Automatik — {{method}}",
  timeFormat: "Format masa",
  h12: "12 jam",
  h24: "24 jam",
  highLat: "Melebihi latitud 48°, Subuh dan Isyak menggunakan kaedah sudut senja secara automatik.",
  tzNote: "Waktu mengikut waktu tempatan {{city}} ({{tz}}).",
  monthly: "Jadual bulanan",
  print: "Cetak",
  prevMonth: "Bulan sebelumnya",
  nextMonth: "Bulan berikutnya",
  thisMonth: "Bulan ini",
  date: "Tarikh",
  location: "Lokasi",
  makkah: "Makkah",
};

const tr: PrayerMsg = {
  title: "Namaz vakitleri",
  description:
    "Şehriniz için bugünün namaz vakitleri — imsak, güneş, öğle, ikindi, akşam ve yatsı — bir sonraki namaza canlı geri sayım ve yazdırılabilir aylık takvimle.",
  useLocation: "Konumumu kullan",
  locating: "Konum bulunuyor…",
  searchPlaceholder: "Şehir ara",
  searching: "Aranıyor…",
  noResults: "Yer bulunamadı",
  searchError: "Arama şu anda kullanılamıyor. Lütfen tekrar deneyin.",
  locError: "Konumunuz alınamadı — şehrinizi arayın. iPhone'da izin vermek için: Ayarlar → Gizlilik ve Güvenlik → Konum Servisleri → tarayıcınız → Uygulamayı Kullanırken.",
  defaultNotice: "Mekke'nin vakitleri gösteriliyor. Konumunuzu kullanın veya şehrinizi arayın.",
  settings: "Ayarlar",
  auto: "Otomatik — {{method}}",
  timeFormat: "Saat biçimi",
  h12: "12 saat",
  h24: "24 saat",
  highLat: "48° enlemin üzerinde sabah ve yatsı vakitleri otomatik olarak alacakaranlık açısı kuralıyla hesaplanır.",
  tzNote: "Vakitler {{city}} yerel saatine ({{tz}}) göredir.",
  monthly: "Aylık vakitler",
  print: "Yazdır",
  prevMonth: "Önceki ay",
  nextMonth: "Sonraki ay",
  thisMonth: "Bu ay",
  date: "Tarih",
  location: "Konum",
  makkah: "Mekke",
};

const id: PrayerMsg = {
  title: "Jadwal salat",
  description:
    "Jadwal salat hari ini untuk kota Anda — Subuh, terbit, Zuhur, Asar, Magrib, dan Isya — dengan hitung mundur langsung ke salat berikutnya dan jadwal bulanan yang bisa dicetak.",
  useLocation: "Gunakan lokasi saya",
  locating: "Mencari lokasi…",
  searchPlaceholder: "Cari kota",
  searching: "Mencari…",
  noResults: "Tempat tidak ditemukan",
  searchError: "Pencarian sedang tidak tersedia. Silakan coba lagi.",
  locError: "Lokasi Anda tidak dapat ditemukan — cari kota Anda. Untuk mengizinkan di iPhone: Pengaturan → Privasi & Keamanan → Layanan Lokasi → peramban Anda → Saat Digunakan.",
  defaultNotice: "Menampilkan jadwal untuk Makkah. Gunakan lokasi Anda atau cari kota Anda.",
  settings: "Pengaturan",
  auto: "Otomatis — {{method}}",
  timeFormat: "Format waktu",
  h12: "12 jam",
  h24: "24 jam",
  highLat: "Di atas lintang 48°, Subuh dan Isya otomatis memakai aturan sudut senja.",
  tzNote: "Waktu sesuai waktu setempat {{city}} ({{tz}}).",
  monthly: "Jadwal bulanan",
  print: "Cetak",
  prevMonth: "Bulan sebelumnya",
  nextMonth: "Bulan berikutnya",
  thisMonth: "Bulan ini",
  date: "Tanggal",
  location: "Lokasi",
  makkah: "Makkah",
};

const hi: PrayerMsg = {
  title: "नमाज़ के समय",
  description:
    "आपके शहर के आज के नमाज़ के समय — फ़ज्र, सूर्योदय, ज़ुहर, अस्र, मग़रिब और इशा — अगली नमाज़ तक लाइव उलटी गिनती और प्रिंट करने लायक़ मासिक समय-सारणी के साथ।",
  useLocation: "मेरी लोकेशन इस्तेमाल करें",
  locating: "लोकेशन पता की जा रही है…",
  searchPlaceholder: "शहर खोजें",
  searching: "खोजा जा रहा है…",
  noResults: "कोई जगह नहीं मिली",
  searchError: "खोज अभी उपलब्ध नहीं है। कृपया दोबारा कोशिश करें।",
  locError: "आपकी लोकेशन नहीं मिल सकी — अपना शहर खोजें। iPhone पर अनुमति देने के लिए: Settings → Privacy & Security → Location Services → आपका ब्राउज़र → While Using।",
  defaultNotice: "मक्का के समय दिखाए जा रहे हैं। अपनी लोकेशन इस्तेमाल करें या अपना शहर खोजें।",
  settings: "सेटिंग्स",
  auto: "स्वचालित — {{method}}",
  timeFormat: "समय का फ़ॉर्मेट",
  h12: "12-घंटे",
  h24: "24-घंटे",
  highLat: "48° अक्षांश से ऊपर फ़ज्र और इशा के लिए अपने-आप संध्या-कोण (ट्वाइलाइट एंगल) का नियम इस्तेमाल होता है।",
  tzNote: "समय {{city}} के स्थानीय समय ({{tz}}) के अनुसार हैं।",
  monthly: "मासिक समय-सारणी",
  print: "प्रिंट करें",
  prevMonth: "पिछला महीना",
  nextMonth: "अगला महीना",
  thisMonth: "इस महीने",
  date: "तारीख़",
  location: "लोकेशन",
  makkah: "मक्का",
};

const bn: PrayerMsg = {
  title: "নামাজের সময়",
  description:
    "আপনার শহরের আজকের নামাজের সময় — ফজর, সূর্যোদয়, জোহর, আসর, মাগরিব ও এশা — পরবর্তী নামাজ পর্যন্ত লাইভ কাউন্টডাউন এবং প্রিন্ট করার উপযোগী মাসিক সময়সূচিসহ।",
  useLocation: "আমার লোকেশন ব্যবহার করুন",
  locating: "লোকেশন খোঁজা হচ্ছে…",
  searchPlaceholder: "শহর খুঁজুন",
  searching: "খোঁজা হচ্ছে…",
  noResults: "কোনো জায়গা পাওয়া যায়নি",
  searchError: "অনুসন্ধান এখন পাওয়া যাচ্ছে না। অনুগ্রহ করে আবার চেষ্টা করুন।",
  locError: "আপনার লোকেশন পাওয়া যায়নি — আপনার শহর খুঁজুন। iPhone-এ অনুমতি দিতে: Settings → Privacy & Security → Location Services → আপনার ব্রাউজার → While Using।",
  defaultNotice: "মক্কার সময় দেখানো হচ্ছে। আপনার লোকেশন ব্যবহার করুন বা আপনার শহর খুঁজুন।",
  settings: "সেটিংস",
  auto: "স্বয়ংক্রিয় — {{method}}",
  timeFormat: "সময়ের ফরম্যাট",
  h12: "12-ঘণ্টা",
  h24: "24-ঘণ্টা",
  highLat: "48° অক্ষাংশের ওপরে ফজর ও এশার জন্য স্বয়ংক্রিয়ভাবে গোধূলি-কোণের নিয়ম ব্যবহার করা হয়।",
  tzNote: "সময়গুলো {{city}}-এর স্থানীয় সময় ({{tz}}) অনুযায়ী।",
  monthly: "মাসিক সময়সূচি",
  print: "প্রিন্ট করুন",
  prevMonth: "আগের মাস",
  nextMonth: "পরের মাস",
  thisMonth: "এই মাস",
  date: "তারিখ",
  location: "লোকেশন",
  makkah: "মক্কা",
};

const ha: PrayerMsg = {
  title: "Lokutan sallah",
  description:
    "Lokutan sallah na yau a garinku — Asuba, fitowar rana, Azahar, La'asar, Magariba da Isha — tare da ƙirgar lokaci kai tsaye zuwa sallah mai zuwa da jadawalin wata da za a iya bugawa.",
  useLocation: "Yi amfani da wurina",
  locating: "Ana gano wurinka…",
  searchPlaceholder: "Nemi gari",
  searching: "Ana nema…",
  noResults: "Ba a sami wani wuri ba",
  searchError: "Nema ba ya aiki a yanzu. Don Allah sake gwadawa.",
  locError: "Ba a iya samun wurinka ba — nemi garinku. Don ba da izini a iPhone: Settings → Privacy & Security → Location Services → mai binciken intanet ɗinka → While Using.",
  defaultNotice: "Ana nuna lokutan Makka. Yi amfani da wurinka ko ka nemi garinku.",
  settings: "Saituna",
  auto: "Ta atomatik — {{method}}",
  timeFormat: "Tsarin lokaci",
  h12: "Awa 12",
  h24: "Awa 24",
  highLat: "Sama da layin latitude 48°, Asuba da Isha suna amfani da ƙa'idar kusurwar magariba ta atomatik.",
  tzNote: "Lokutan suna bisa agogon {{city}} ({{tz}}).",
  monthly: "Jadawalin wata",
  print: "Buga",
  prevMonth: "Watan da ya gabata",
  nextMonth: "Wata mai zuwa",
  thisMonth: "Wannan wata",
  date: "Kwanan wata",
  location: "Wuri",
  makkah: "Makka",
};

const fr: PrayerMsg = {
  title: "Horaires de prière",
  description:
    "Les horaires de prière du jour pour votre ville — Fajr, lever du soleil, Dhuhr, Asr, Maghrib et Isha — avec un compte à rebours jusqu’à la prochaine prière et un calendrier mensuel à imprimer.",
  useLocation: "Utiliser ma position",
  locating: "Localisation…",
  searchPlaceholder: "Rechercher une ville",
  searching: "Recherche…",
  noResults: "Aucun lieu trouvé",
  searchError: "La recherche n’est pas disponible pour le moment. Veuillez réessayer.",
  locError: "Impossible d’obtenir votre position — recherchez votre ville. Pour l’autoriser sur iPhone : Réglages → Confidentialité et sécurité → Service de localisation → votre navigateur → Lorsque l’app est active.",
  defaultNotice: "Horaires affichés pour La Mecque. Utilisez votre position ou recherchez votre ville.",
  settings: "Réglages",
  auto: "Automatique — {{method}}",
  timeFormat: "Format de l’heure",
  h12: "12 heures",
  h24: "24 heures",
  highLat: "Au-delà de 48° de latitude, le Fajr et l’Isha suivent automatiquement la règle de l’angle du crépuscule.",
  tzNote: "Heures locales de {{city}} ({{tz}}).",
  monthly: "Calendrier mensuel",
  print: "Imprimer",
  prevMonth: "Mois précédent",
  nextMonth: "Mois suivant",
  thisMonth: "Ce mois-ci",
  date: "Date",
  location: "Lieu",
  makkah: "La Mecque",
};

export const prayerMsg: Record<Locale, PrayerMsg> = { ar, en, ur, fa, ru, ms, tr, id, hi, bn, ha, fr };
