// Tasbih page (/tasbeeh/). Wording follows the app's السبحة (counter.*) where it has it.
import type { Locale } from "../config";

export type TasbeehMessages = {
  title: string;
  subtitle: string;
  description: string;
  choose: string;
  builtIn: string;
  mine: string;
  add: string;
  addTitle: string;
  textPlaceholder: string;
  target: string;
  save: string;
  cancel: string;
  remove: string;
  reset: string;
  tapHint: string;
  /** "of {target}" */
  ofTarget: string;
  completed: string;
  completedSub: string;
  today: string;
  allTime: string;
  thisDhikr: string;
  fadl: string;
  sound: string;
  vibrate: string;
};

const ar: TasbeehMessages = {
  title: "السبحة",
  subtitle: "سبّح الله واحفظ عدد تسبيحاتك، ويُحفظ العدد على جهازك",
  description: "سبحة إلكترونية: اختر ذكرًا أو أضف ذكرك، وحدّد العدد المستهدف، واضغط أو استخدم مفتاح المسافة للعد.",
  choose: "اختر الذكر",
  builtIn: "أذكار السبحة",
  mine: "أذكاري",
  add: "إضافة ذكر",
  addTitle: "ذكر جديد",
  textPlaceholder: "اكتب الذكر",
  target: "العدد المستهدف",
  save: "حفظ",
  cancel: "إلغاء",
  remove: "حذف الذكر",
  reset: "تصفير",
  tapHint: "اضغط على السبحة أو مفتاح المسافة للعد",
  ofTarget: "من {target}",
  completed: "أتممت العدد",
  completedSub: "تقبّل الله منك، واصل التسبيح إن شئت",
  today: "اليوم",
  allTime: "الإجمالي",
  thisDhikr: "هذا الذكر",
  fadl: "فضل الذكر",
  sound: "الصوت",
  vibrate: "الاهتزاز",
};

const en: TasbeehMessages = {
  title: "Tasbih",
  subtitle: "Glorify Allah and keep your count — it stays saved on your device",
  description: "An electronic tasbih: pick a dhikr or add your own, set a target, then tap or press the space bar to count.",
  choose: "Choose a dhikr",
  builtIn: "Tasbih adhkar",
  mine: "My adhkar",
  add: "Add a dhikr",
  addTitle: "New dhikr",
  textPlaceholder: "Write your dhikr",
  target: "Target",
  save: "Save",
  cancel: "Cancel",
  remove: "Delete Dhikr",
  reset: "Reset",
  tapHint: "Tap the beads or press the space bar to count",
  ofTarget: "of {target}",
  completed: "Target reached",
  completedSub: "May Allah accept it from you — keep going if you wish",
  today: "Today",
  allTime: "All time",
  thisDhikr: "This dhikr",
  fadl: "Virtue of this dhikr",
  sound: "Sound",
  vibrate: "Vibration",
};

const ur: TasbeehMessages = {
  title: "تسبیح",
  subtitle: "اللہ کی تسبیح کریں اور اپنی گنتی محفوظ رکھیں — یہ آپ کی ڈیوائس پر محفوظ رہتی ہے",
  description: "الیکٹرانک تسبیح: کوئی ذکر منتخب کریں یا اپنا ذکر شامل کریں، ہدف مقرر کریں اور گننے کے لیے ٹچ کریں یا اسپیس بار دبائیں۔",
  choose: "ذکر منتخب کریں",
  builtIn: "تسبیح کے اذکار",
  mine: "میرے اذکار",
  add: "ذکر شامل کریں",
  addTitle: "نیا ذکر",
  textPlaceholder: "اپنا ذکر لکھیں",
  target: "ہدف",
  save: "محفوظ کریں",
  cancel: "منسوخ",
  remove: "ذکر حذف کریں",
  reset: "ری سیٹ",
  tapHint: "گننے کے لیے تسبیح کو ٹچ کریں یا اسپیس بار دبائیں",
  ofTarget: "{target} میں سے",
  completed: "ہدف مکمل ہو گیا",
  completedSub: "اللہ قبول فرمائے — چاہیں تو جاری رکھیں",
  today: "آج",
  allTime: "کل تعداد",
  thisDhikr: "یہ ذکر",
  fadl: "اس ذکر کی فضیلت",
  sound: "آواز",
  vibrate: "وائبریشن",
};

const fa: TasbeehMessages = {
  title: "تسبیح",
  subtitle: "خدا را تسبیح بگویید و شمار آن را نگه دارید — روی دستگاه شما ذخیره می‌شود",
  description: "تسبیح الکترونیکی: ذکری را انتخاب کنید یا ذکر خود را بیفزایید، تعداد هدف را تعیین کنید و برای شمارش لمس کنید یا کلید فاصله را بزنید.",
  choose: "انتخاب ذکر",
  builtIn: "اذکار تسبیح",
  mine: "اذکار من",
  add: "افزودن ذکر",
  addTitle: "ذکر جدید",
  textPlaceholder: "ذکر خود را بنویسید",
  target: "تعداد هدف",
  save: "ذخیره",
  cancel: "لغو",
  remove: "حذف ذکر",
  reset: "بازنشانی",
  tapHint: "برای شمارش، تسبیح را لمس کنید یا کلید فاصله را بزنید",
  ofTarget: "از {target}",
  completed: "به تعداد هدف رسیدید",
  completedSub: "خداوند از شما بپذیرد — اگر می‌خواهید ادامه دهید",
  today: "امروز",
  allTime: "مجموع",
  thisDhikr: "این ذکر",
  fadl: "فضیلت این ذکر",
  sound: "صدا",
  vibrate: "لرزش",
};

const ru: TasbeehMessages = {
  title: "Тасбих",
  subtitle: "Прославляйте Аллаха и ведите счёт — он сохраняется на вашем устройстве",
  description: "Электронные чётки: выберите зикр или добавьте свой, задайте цель и нажимайте или используйте пробел для счёта.",
  choose: "Выберите зикр",
  builtIn: "Зикры для тасбиха",
  mine: "Мои зикры",
  add: "Добавить зикр",
  addTitle: "Новый зикр",
  textPlaceholder: "Напишите свой зикр",
  target: "Цель",
  save: "Сохранить",
  cancel: "Отмена",
  remove: "Удалить зикр",
  reset: "Сбросить",
  tapHint: "Нажмите на чётки или пробел для счёта",
  ofTarget: "из {target}",
  completed: "Цель достигнута",
  completedSub: "Да примет Аллах от вас — продолжайте, если хотите",
  today: "Сегодня",
  allTime: "Всего",
  thisDhikr: "Этот зикр",
  fadl: "Достоинство этого зикра",
  sound: "Звук",
  vibrate: "Вибрация",
};

const ms: TasbeehMessages = {
  title: "Tasbih",
  subtitle: "Bertasbihlah dan simpan kiraan anda — ia disimpan pada peranti anda",
  description: "Tasbih elektronik: pilih zikir atau tambah zikir anda sendiri, tetapkan sasaran, kemudian ketik atau tekan kekunci ruang untuk mengira.",
  choose: "Pilih zikir",
  builtIn: "Zikir tasbih",
  mine: "Zikir saya",
  add: "Tambah zikir",
  addTitle: "Zikir baharu",
  textPlaceholder: "Tulis zikir anda",
  target: "Sasaran",
  save: "Simpan",
  cancel: "Batal",
  remove: "Padam Zikir",
  reset: "Set Semula",
  tapHint: "Ketik tasbih atau tekan kekunci ruang untuk mengira",
  ofTarget: "daripada {target}",
  completed: "Sasaran tercapai",
  completedSub: "Semoga Allah menerimanya — teruskan jika anda mahu",
  today: "Hari ini",
  allTime: "Keseluruhan",
  thisDhikr: "Zikir ini",
  fadl: "Kelebihan zikir ini",
  sound: "Bunyi",
  vibrate: "Getaran",
};

const tr: TasbeehMessages = {
  title: "Tesbih",
  subtitle: "Allah'ı tesbih edin, sayınızı tutun — cihazınızda kayıtlı kalır",
  description: "Elektronik tesbih: bir zikir seçin veya kendi zikrinizi ekleyin, hedef belirleyin, saymak için dokunun ya da boşluk tuşuna basın.",
  choose: "Zikir seçin",
  builtIn: "Tesbih zikirleri",
  mine: "Zikirlerim",
  add: "Zikir ekle",
  addTitle: "Yeni zikir",
  textPlaceholder: "Zikrinizi yazın",
  target: "Hedef",
  save: "Kaydet",
  cancel: "İptal",
  remove: "Zikri Sil",
  reset: "Sıfırla",
  tapHint: "Saymak için tesbihe dokunun veya boşluk tuşuna basın",
  ofTarget: "/ {target}",
  completed: "Hedefe ulaşıldı",
  completedSub: "Allah kabul etsin — isterseniz devam edin",
  today: "Bugün",
  allTime: "Toplam",
  thisDhikr: "Bu zikir",
  fadl: "Bu zikrin fazileti",
  sound: "Ses",
  vibrate: "Titreşim",
};

const id: TasbeehMessages = {
  title: "Tasbih",
  subtitle: "Bertasbihlah dan simpan hitungan Anda — tersimpan di perangkat Anda",
  description: "Tasbih elektronik: pilih zikir atau tambahkan zikir Anda sendiri, tentukan target, lalu ketuk atau tekan spasi untuk menghitung.",
  choose: "Pilih zikir",
  builtIn: "Zikir tasbih",
  mine: "Zikir saya",
  add: "Tambah zikir",
  addTitle: "Zikir baru",
  textPlaceholder: "Tulis zikir Anda",
  target: "Target",
  save: "Simpan",
  cancel: "Batal",
  remove: "Hapus Zikir",
  reset: "Atur Ulang",
  tapHint: "Ketuk tasbih atau tekan spasi untuk menghitung",
  ofTarget: "dari {target}",
  completed: "Target tercapai",
  completedSub: "Semoga Allah menerimanya — lanjutkan jika Anda mau",
  today: "Hari ini",
  allTime: "Total",
  thisDhikr: "Zikir ini",
  fadl: "Keutamaan zikir ini",
  sound: "Suara",
  vibrate: "Getaran",
};

const hi: TasbeehMessages = {
  title: "तस्बीह",
  subtitle: "अल्लाह की तस्बीह करें और अपनी गिनती रखें — यह आपके डिवाइस पर सेव रहती है",
  description: "इलेक्ट्रॉनिक तस्बीह: कोई ज़िक्र चुनें या अपना ज़िक्र जोड़ें, लक्ष्य तय करें, फिर गिनने के लिए टैप करें या स्पेस बार दबाएँ।",
  choose: "ज़िक्र चुनें",
  builtIn: "तस्बीह के अज़कार",
  mine: "मेरे अज़कार",
  add: "ज़िक्र जोड़ें",
  addTitle: "नया ज़िक्र",
  textPlaceholder: "अपना ज़िक्र लिखें",
  target: "लक्ष्य",
  save: "सेव करें",
  cancel: "रद्द करें",
  remove: "ज़िक्र हटाएँ",
  reset: "रीसेट करें",
  tapHint: "गिनने के लिए तस्बीह के दानों पर टैप करें या स्पेस बार दबाएँ",
  ofTarget: "{target} में से",
  completed: "लक्ष्य पूरा हो गया",
  completedSub: "अल्लाह इसे आपसे क़ुबूल फ़रमाए — चाहें तो जारी रखें",
  today: "आज",
  allTime: "कुल",
  thisDhikr: "यह ज़िक्र",
  fadl: "इस ज़िक्र की फ़ज़ीलत",
  sound: "आवाज़",
  vibrate: "वाइब्रेशन",
};

const bn: TasbeehMessages = {
  title: "তাসবিহ",
  subtitle: "আল্লাহর তাসবিহ পড়ুন এবং গণনা রাখুন — এটি আপনার ডিভাইসেই সংরক্ষিত থাকে",
  description: "ইলেকট্রনিক তাসবিহ: একটি জিকির বেছে নিন বা নিজের জিকির যোগ করুন, লক্ষ্য ঠিক করুন, তারপর গণনা করতে চাপুন বা স্পেস বার চাপুন।",
  choose: "জিকির বেছে নিন",
  builtIn: "তাসবিহের জিকির",
  mine: "আমার জিকির",
  add: "জিকির যোগ করুন",
  addTitle: "নতুন জিকির",
  textPlaceholder: "আপনার জিকির লিখুন",
  target: "লক্ষ্য",
  save: "সংরক্ষণ করুন",
  cancel: "বাতিল",
  remove: "জিকির মুছুন",
  reset: "রিসেট করুন",
  tapHint: "গণনা করতে তাসবিহের দানায় চাপুন বা স্পেস বার চাপুন",
  ofTarget: "{target}-এর মধ্যে",
  completed: "লক্ষ্য পূর্ণ হয়েছে",
  completedSub: "আল্লাহ আপনার কাছ থেকে কবুল করুন — চাইলে চালিয়ে যান",
  today: "আজ",
  allTime: "মোট",
  thisDhikr: "এই জিকির",
  fadl: "এই জিকিরের ফজিলত",
  sound: "শব্দ",
  vibrate: "ভাইব্রেশন",
};

export const tasbeeh: Record<Locale, TasbeehMessages> = { ar, en, ur, fa, ru, ms, tr, id, hi, bn };
