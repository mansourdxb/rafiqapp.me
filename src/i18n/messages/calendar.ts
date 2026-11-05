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

const ps: CalendarMsg = {
  title: "هجري کلیزه",
  description:
    "هجري (ام القری) کلیزه میاشت په میاشت له میلادي نېټو سره، اسلامي مناسبتونه لکه رمضان، دواړه اخترونه، عرفه او عاشورا، او د هجري او میلادي نېټو بدلوونکی.",
  prevMonth: "تېره میاشت",
  nextMonth: "راتلونکې میاشت",
  occasionsMonth: "دا میاشت",
  noOccasions: "په دې میاشت کې کوم مناسبت نشته",
  converter: "د نېټې بدلوونکی",
  gToH: "له میلادي څخه هجري ته",
  hToG: "له هجري څخه میلادي ته",
  day: "ورځ",
  month: "میاشت",
  year: "کال",
  invalid: "دا نېټه د ام القری په کلیزه کې نشته.",
  note: "د ام القری کلیزه. ستاسو په هېواد کې د سپوږمۍ د لیدو له مخې د میاشتې پیل کېدای شي یوه ورځ توپیر ولري.",
};

const pa: CalendarMsg = {
  title: "ਹਿਜਰੀ ਕੈਲੰਡਰ",
  description:
    "ਹਿਜਰੀ (ਉੱਮੁਲ ਕੁਰਾ) ਕੈਲੰਡਰ ਮਹੀਨੇ-ਦਰ-ਮਹੀਨਾ ਈਸਵੀ ਤਾਰੀਖ਼ਾਂ ਸਮੇਤ, ਇਸਲਾਮੀ ਮੌਕੇ ਜਿਵੇਂ ਰਮਜ਼ਾਨ, ਦੋਵੇਂ ਈਦਾਂ, ਅਰਫ਼ਾ ਅਤੇ ਆਸ਼ੂਰਾ, ਅਤੇ ਹਿਜਰੀ–ਈਸਵੀ ਤਾਰੀਖ਼ ਬਦਲਣ ਵਾਲਾ।",
  prevMonth: "ਪਿਛਲਾ ਮਹੀਨਾ",
  nextMonth: "ਅਗਲਾ ਮਹੀਨਾ",
  occasionsMonth: "ਇਸ ਮਹੀਨੇ",
  noOccasions: "ਇਸ ਮਹੀਨੇ ਕੋਈ ਮੌਕਾ ਨਹੀਂ",
  converter: "ਤਾਰੀਖ਼ ਬਦਲੋ",
  gToH: "ਈਸਵੀ ਤੋਂ ਹਿਜਰੀ",
  hToG: "ਹਿਜਰੀ ਤੋਂ ਈਸਵੀ",
  day: "ਦਿਨ",
  month: "ਮਹੀਨਾ",
  year: "ਸਾਲ",
  invalid: "ਇਹ ਤਾਰੀਖ਼ ਉੱਮੁਲ ਕੁਰਾ ਕੈਲੰਡਰ ਵਿੱਚ ਮੌਜੂਦ ਨਹੀਂ ਹੈ।",
  note: "ਉੱਮੁਲ ਕੁਰਾ ਕੈਲੰਡਰ। ਤੁਹਾਡੇ ਦੇਸ਼ ਵਿੱਚ ਚੰਨ ਵੇਖਣ ਦੇ ਹਿਸਾਬ ਨਾਲ ਮਹੀਨੇ ਦੀ ਸ਼ੁਰੂਆਤ ਵਿੱਚ ਇੱਕ ਦਿਨ ਦਾ ਫ਼ਰਕ ਹੋ ਸਕਦਾ ਹੈ।",
};
const pnb: CalendarMsg = {
  title: "ہجری کیلنڈر",
  description:
    "ہجری (ام القریٰ) کیلنڈر مہینے وار عیسوی تریخاں دے نال، اسلامی موقعے جیویں رمضان، دوویں عیداں، عرفہ تے عاشورا، تے ہجری–عیسوی تریخ بدلن والا۔",
  prevMonth: "پچھلا مہینہ",
  nextMonth: "اگلا مہینہ",
  occasionsMonth: "ایس مہینے",
  noOccasions: "ایس مہینے کوئی موقع نہیں",
  converter: "تریخ بدلو",
  gToH: "عیسوی توں ہجری",
  hToG: "ہجری توں عیسوی",
  day: "دن",
  month: "مہینہ",
  year: "سال",
  invalid: "ایہہ تریخ ام القریٰ کیلنڈر وچ موجود نہیں۔",
  note: "ام القریٰ کیلنڈر۔ تہاڈے دیس وچ چن ویکھن دے حساب نال مہینے دا شروع اک دن اگے پچھے ہو سکدا اے۔",
};

const uz: CalendarMsg = {
  title: "Hijriy taqvim",
  description:
    "Hijriy (Ummul-Quro) taqvim oyma-oy, milodiy sanalar bilan; Ramazon, ikki hayit, Arafa va Ashuro kabi islomiy sanalar hamda hijriy va milodiy sanalarni oʻzaro oʻgirish vositasi.",
  prevMonth: "Oldingi oy",
  nextMonth: "Keyingi oy",
  occasionsMonth: "Shu oyda",
  noOccasions: "Bu oyda muhim sanalar yoʻq",
  converter: "Sanani oʻgirish",
  gToH: "Milodiydan hijriyga",
  hToG: "Hijriydan milodiyga",
  day: "Kun",
  month: "Oy",
  year: "Yil",
  invalid: "Bu sana Ummul-Quro taqvimida mavjud emas.",
  note: "Ummul-Quro taqvimi. Oyning boshlanishi mamlakatingizda hilolning koʻrinishiga qarab bir kun farq qilishi mumkin.",
};
const uzCyrl: CalendarMsg = {
  title: "Ҳижрий тақвим",
  description:
    "Ҳижрий (Уммул-Қуро) тақвим ойма-ой, милодий саналар билан; Рамазон, икки ҳайит, Арафа ва Ашуро каби исломий саналар ҳамда ҳижрий ва милодий саналарни ўзаро ўгириш воситаси.",
  prevMonth: "Олдинги ой",
  nextMonth: "Кейинги ой",
  occasionsMonth: "Шу ойда",
  noOccasions: "Бу ойда муҳим саналар йўқ",
  converter: "Санани ўгириш",
  gToH: "Милодийдан ҳижрийга",
  hToG: "Ҳижрийдан милодийга",
  day: "Кун",
  month: "Ой",
  year: "Йил",
  invalid: "Бу сана Уммул-Қуро тақвимида мавжуд эмас.",
  note: "Уммул-Қуро тақвими. Ойнинг бошланиши мамлакатингизда ҳилолнинг кўринишига қараб бир кун фарқ қилиши мумкин.",
};

const so: CalendarMsg = {
  title: "Kalandarka Hijriga",
  description:
    "Kalandarka Hijriga (Umm al-Qura) bil-bil oo leh taariikhaha Miilaadiga, munaasabadaha Islaamka sida Ramadaan, labada Ciid, Carafo iyo Caashuura, iyo beddelaha taariikhda Hijriga iyo Miilaadiga.",
  prevMonth: "Bishii hore",
  nextMonth: "Bisha xigta",
  occasionsMonth: "Bishan",
  noOccasions: "Bishan munaasabad ma leh",
  converter: "Beddelaha taariikhda",
  gToH: "Miilaadi ilaa Hijri",
  hToG: "Hijri ilaa Miilaadi",
  day: "Maalin",
  month: "Bil",
  year: "Sannad",
  invalid: "Taariikhdani kuma jirto kalandarka Umm al-Qura.",
  note: "Kalandarka Umm al-Qura. Bilowga bishu wuxuu ku kala duwanaan karaa hal maalin iyadoo ku xiran muuqashada dayaxa ee dalkaaga.",
};

const sw: CalendarMsg = {
  title: "Kalenda ya Hijria",
  description:
    "Kalenda ya Hijria (Umm al-Qura) mwezi kwa mwezi pamoja na tarehe za Miladia, matukio ya Kiislamu kama Ramadhani, Idi mbili, Arafa na Ashura, na kibadilishaji cha tarehe za Hijria na Miladia.",
  prevMonth: "Mwezi uliopita",
  nextMonth: "Mwezi ujao",
  occasionsMonth: "Mwezi huu",
  noOccasions: "Hakuna matukio mwezi huu",
  converter: "Kibadilishaji cha tarehe",
  gToH: "Miladia kwenda Hijria",
  hToG: "Hijria kwenda Miladia",
  day: "Siku",
  month: "Mwezi",
  year: "Mwaka",
  invalid: "Tarehe hii haipo katika kalenda ya Umm al-Qura.",
  note: "Kalenda ya Umm al-Qura. Mwanzo wa mwezi unaweza kutofautiana kwa siku moja kulingana na kuonekana kwa mwezi katika nchi yako.",
};

const kuArab: CalendarMsg = {
  title: "ڕۆژژمێری کۆچی",
  description:
    "ڕۆژژمێری کۆچی (ئوم ئەلقورا) مانگ بە مانگ لەگەڵ بەروارە زایینییەکان، بۆنە ئیسلامییەکانی وەک ڕەمەزان، هەردوو جەژن، عەرەفە و عاشوورا، و گۆڕەری بەرواری کۆچی و زایینی.",
  prevMonth: "مانگی پێشوو",
  nextMonth: "مانگی داهاتوو",
  occasionsMonth: "ئەم مانگە",
  noOccasions: "لەم مانگەدا هیچ بۆنەیەک نییە",
  converter: "گۆڕەری بەروار",
  gToH: "زایینی بۆ کۆچی",
  hToG: "کۆچی بۆ زایینی",
  day: "ڕۆژ",
  month: "مانگ",
  year: "ساڵ",
  invalid: "ئەم بەروارە لە ڕۆژژمێری ئوم ئەلقورادا نییە.",
  note: "ڕۆژژمێری ئوم ئەلقورا. سەرەتای مانگ لەوانەیە بەپێی بینینی مانگی نوێ لە وڵاتەکەتدا یەک ڕۆژ جیاواز بێت.",
};

const kuLatn: CalendarMsg = {
  title: "Salnameya koçî",
  description:
    "Salnameya koçî (Ummul-Qura) meh bi meh bi dîrokên zayînî, bûyerên îslamî yên wek Remezan, her du Cejn, Erefe û Aşûra, û veguherînera dîroka koçî û zayînî.",
  prevMonth: "Meha berê",
  nextMonth: "Meha bê",
  occasionsMonth: "Vê mehê",
  noOccasions: "Vê mehê tu bûyer tune ne",
  converter: "Veguherînera dîrokê",
  gToH: "Zayînî bo koçî",
  hToG: "Koçî bo zayînî",
  day: "Roj",
  month: "Meh",
  year: "Sal",
  invalid: "Ev dîrok di salnameya Ummul-Qura de tune.",
  note: "Salnameya Ummul-Qura. Destpêka mehê li gorî dîtina hîvê li welatê te dikare rojekê cuda be.",
};

const ml: CalendarMsg = {
  title: "ഹിജ്റ കലണ്ടർ",
  description:
    "ഗ്രിഗോറിയൻ തീയതികളോടു കൂടിയ മാസാടിസ്ഥാനത്തിലുള്ള ഹിജ്റ കലണ്ടർ (ഉമ്മുൽ ഖുറാ), റമദാൻ, രണ്ട് പെരുന്നാളുകൾ, അറഫാ ദിനം, ആശൂറാഅ് തുടങ്ങിയ ഇസ്‌ലാമിക സന്ദർഭങ്ങൾ, ഹിജ്റ–ഗ്രിഗോറിയൻ തീയതി കൺവെർട്ടർ.",
  prevMonth: "മുൻ മാസം",
  nextMonth: "അടുത്ത മാസം",
  occasionsMonth: "ഈ മാസം",
  noOccasions: "ഈ മാസം സന്ദർഭങ്ങളൊന്നുമില്ല",
  converter: "തീയതി കൺവെർട്ടർ",
  gToH: "ഗ്രിഗോറിയനിൽ നിന്ന് ഹിജ്റയിലേക്ക്",
  hToG: "ഹിജ്റയിൽ നിന്ന് ഗ്രിഗോറിയനിലേക്ക്",
  day: "ദിവസം",
  month: "മാസം",
  year: "വർഷം",
  invalid: "ഈ തീയതി ഉമ്മുൽ ഖുറാ കലണ്ടറിലില്ല.",
  note: "ഉമ്മുൽ ഖുറാ കലണ്ടർ. നിങ്ങളുടെ രാജ്യത്തെ ചന്ദ്രദർശനമനുസരിച്ച് മാസാരംഭം ഒരു ദിവസം വ്യത്യാസപ്പെടാം.",
};

const de: CalendarMsg = {
  title: "Hidschri-Kalender",
  description:
    "Der Hidschri-Kalender (Umm al-Qura) Monat für Monat mit gregorianischen Daten, islamischen Anlässen wie Ramadan, den beiden Festen, dem Tag von Arafa und Aschura sowie einem Umrechner zwischen Hidschri- und gregorianischem Datum.",
  prevMonth: "Vorheriger Monat",
  nextMonth: "Nächster Monat",
  occasionsMonth: "Diesen Monat",
  noOccasions: "Keine Anlässe in diesem Monat",
  converter: "Datumsumrechner",
  gToH: "Gregorianisch zu Hidschri",
  hToG: "Hidschri zu Gregorianisch",
  day: "Tag",
  month: "Monat",
  year: "Jahr",
  invalid: "Dieses Datum gibt es im Umm-al-Qura-Kalender nicht.",
  note: "Umm-al-Qura-Kalender. Der Monatsbeginn kann je nach Mondsichtung in deinem Land um einen Tag abweichen.",
};

const es: CalendarMsg = {
  title: "Calendario de la Hégira",
  description:
    "El calendario de la Hégira (Umm al-Qura) mes a mes con las fechas gregorianas, las ocasiones islámicas como Ramadán, los dos Eid, el día de Arafat y Ashura, y un conversor de fechas Hégira–gregoriano.",
  prevMonth: "Mes anterior",
  nextMonth: "Mes siguiente",
  occasionsMonth: "Este mes",
  noOccasions: "No hay ocasiones este mes",
  converter: "Conversor de fechas",
  gToH: "De gregoriano a Hégira",
  hToG: "De Hégira a gregoriano",
  day: "Día",
  month: "Mes",
  year: "Año",
  invalid: "Esta fecha no existe en el calendario Umm al-Qura.",
  note: "Calendario Umm al-Qura. El inicio de un mes puede variar un día según el avistamiento de la luna en tu país.",
};

export const calendarMsg: Record<Locale, CalendarMsg> = { ar, en, ur, fa, ru, ms, tr, id, hi, bn, ha, fr, zh, ps, pa, pnb, uz, "uz-Cyrl": uzCyrl, so, sw, "ku-Arab": kuArab, "ku-Latn": kuLatn, ml, de, es,
"az-Latn": {
  title: "Hicri təqvim",
  description:
    "Hicri (Ümmül-Qura) təqvimi ay-ay miladi tarixlərlə, Ramazan, iki bayram, Ərəfə və Aşura kimi islami günlərlə və Hicri–miladi tarix çeviricisi ilə.",
  prevMonth: "Əvvəlki ay",
  nextMonth: "Növbəti ay",
  occasionsMonth: "Bu ay",
  noOccasions: "Bu ay xüsusi gün yoxdur",
  converter: "Tarix çeviricisi",
  gToH: "Miladidən Hicriyə",
  hToG: "Hicridən miladiyə",
  day: "Gün",
  month: "Ay",
  year: "İl",
  invalid: "Bu tarix Ümmül-Qura təqvimində mövcud deyil.",
  note: "Ümmül-Qura təqvimi. Ayın başlanğıcı ölkənizdə ayın görünməsindən asılı olaraq bir gün fərqli ola bilər.",
},
"om": {
  title: "Dhaha Hijrii",
  description:
    "Dhaha Hijrii (Ummul Quraa) ji'a ji'aan guyyaa Gregoriyaanii wajjin, ayyaanota Islaamaa kan akka Ramadaana, Iidota lamaan, Arafaa fi Aashuuraa'aa, akkasumas jijjiirraa guyyaa Hijrii–Gregoriyaanii.",
  prevMonth: "Ji'a darbe",
  nextMonth: "Ji'a itti aanu",
  occasionsMonth: "Ji'a kana",
  noOccasions: "Ji'a kana keessa ayyaanni hin jiru",
  converter: "Jijjiirraa guyyaa",
  gToH: "Gregoriyaanii gara Hijriitti",
  hToG: "Hijrii gara Gregoriyaaniitti",
  day: "Guyyaa",
  month: "Ji'a",
  year: "Waggaa",
  invalid: "Guyyaan kun dhaha Ummul Quraa keessa hin jiru.",
  note: "Dhaha Ummul Quraa. Jalqabni ji'aa akkuma ji'a mul'achuu biyya keetiin guyyaa tokkoon garaagara ta'uu danda'a.",
},
"am": {
  title: "የሂጅራ ካሌንደር",
  description:
    "የሂጅራ (ኡሙል ቁራ) ካሌንደር ወር በወር ከግሪጎሪያን ቀናት ጋር፣ እንደ ረመዳን፣ ሁለቱ ዒዶች፣ ዐረፋና ዐሹራእ ያሉ እስላማዊ ዝግጅቶች፣ እንዲሁም የሂጅራ–ግሪጎሪያን ቀን መቀየሪያ።",
  prevMonth: "ያለፈው ወር",
  nextMonth: "ቀጣዩ ወር",
  occasionsMonth: "በዚህ ወር",
  noOccasions: "በዚህ ወር ምንም ዝግጅት የለም",
  converter: "የቀን መቀየሪያ",
  gToH: "ከግሪጎሪያን ወደ ሂጅራ",
  hToG: "ከሂጅራ ወደ ግሪጎሪያን",
  day: "ቀን",
  month: "ወር",
  year: "ዓመት",
  invalid: "ይህ ቀን በኡሙል ቁራ ካሌንደር ውስጥ የለም።",
  note: "የኡሙል ቁራ ካሌንደር። በአገርዎ በሚታየው ጨረቃ መሠረት የወር መጀመሪያ በአንድ ቀን ሊለያይ ይችላል።",
},
"kk-Cyrl": {
  title: "Һижри күнтізбе",
  description:
    "Һижри (Умм әл-Құра) күнтізбесі айма-ай григориан күндерімен, Рамазан, екі айт, Арафат және Ашура сияқты исламдық мерекелермен, сондай-ақ һижри мен григориан күндерінің түрлендіргішімен.",
  prevMonth: "Алдыңғы ай",
  nextMonth: "Келесі ай",
  occasionsMonth: "Осы ай",
  noOccasions: "Бұл айда мерекелер жоқ",
  converter: "Күн түрлендіргіші",
  gToH: "Григорианнан һижриге",
  hToG: "Һижридан григорианға",
  day: "Күн",
  month: "Ай",
  year: "Жыл",
  invalid: "Бұл күн Умм әл-Құра күнтізбесінде жоқ.",
  note: "Умм әл-Құра күнтізбесі. Айдың басталуы еліңіздегі жаңа айды бақылауға байланысты бір күнге ерекшеленуі мүмкін.",
},
"ta": {
  title: "ஹிஜ்ரி நாட்காட்டி",
  description:
    "ஹிஜ்ரி (உம்முல் குரா) நாட்காட்டியை மாதம் மாதமாக ஆங்கிலத் தேதிகளுடன் காணுங்கள். ரமலான், இரு பெருநாள்கள், அரஃபா, ஆஷூரா போன்ற இஸ்லாமிய நிகழ்வுகளும், ஹிஜ்ரி–ஆங்கிலத் தேதி மாற்றியும் உள்ளன.",
  prevMonth: "முந்தைய மாதம்",
  nextMonth: "அடுத்த மாதம்",
  occasionsMonth: "இந்த மாதம்",
  noOccasions: "இந்த மாதத்தில் நிகழ்வுகள் இல்லை",
  converter: "தேதி மாற்றி",
  gToH: "ஆங்கிலத் தேதியிலிருந்து ஹிஜ்ரிக்கு",
  hToG: "ஹிஜ்ரியிலிருந்து ஆங்கிலத் தேதிக்கு",
  day: "நாள்",
  month: "மாதம்",
  year: "ஆண்டு",
  invalid: "இந்தத் தேதி உம்முல் குரா நாட்காட்டியில் இல்லை.",
  note: "உம்முல் குரா நாட்காட்டி. உங்கள் நாட்டில் பிறை தென்படுவதைப் பொறுத்து மாதத் தொடக்கம் ஒரு நாள் வேறுபடலாம்.",
},
  "gu": {
  title: "હિજરી કેલેન્ડર",
  description:
    "હિજરી (ઉમ્મુલ કુરા) કેલેન્ડર મહિને-મહિને, અંગ્રેજી તારીખો સાથે; રમઝાન, બંને ઈદ, અરફા અને આશૂરા જેવા ઇસ્લામી પ્રસંગો અને હિજરી–અંગ્રેજી તારીખ કન્વર્ટર.",
  prevMonth: "પાછલો મહિનો",
  nextMonth: "આગળનો મહિનો",
  occasionsMonth: "આ મહિનો",
  noOccasions: "આ મહિને કોઈ પ્રસંગ નથી",
  converter: "તારીખ કન્વર્ટર",
  gToH: "અંગ્રેજીથી હિજરી",
  hToG: "હિજરીથી અંગ્રેજી",
  day: "દિવસ",
  month: "મહિનો",
  year: "વર્ષ",
  invalid: "આ તારીખ ઉમ્મુલ કુરા કેલેન્ડરમાં અસ્તિત્વમાં નથી.",
  note: "ઉમ્મુલ કુરા કેલેન્ડર. તમારા દેશમાં ચાંદ દેખાવા પર આધાર રાખીને મહિનાની શરૂઆત એક દિવસ આગળ-પાછળ હોઈ શકે છે.",
  },
  my: {
  title: "ဟိဂျ်ရီ ပြက္ခဒိန်",
  description:
    "ဟိဂျ်ရီ (အွမ်မုလ်ကုရာ) ပြက္ခဒိန်ကို လအလိုက် ခရစ်ရက်စွဲများနှင့်အတူ၊ ရမဇာန်၊ အိဒ်နှစ်ပွဲ၊ အရဖဟ်နှင့် အာရှူရာကဲ့သို့ အစ္စလာမ်ဆိုင်ရာ အခါသမယများ၊ ဟိဂျ်ရီ–ခရစ် ရက်စွဲ ပြောင်းလဲကိရိယာတို့ဖြင့် ဖော်ပြထားသည်။",
  prevMonth: "ယခင်လ",
  nextMonth: "နောက်လ",
  occasionsMonth: "ဤလ",
  noOccasions: "ဤလတွင် အခါသမယ မရှိပါ",
  converter: "ရက်စွဲ ပြောင်းလဲကိရိယာ",
  gToH: "ခရစ်မှ ဟိဂျ်ရီသို့",
  hToG: "ဟိဂျ်ရီမှ ခရစ်သို့",
  day: "ရက်",
  month: "လ",
  year: "နှစ်",
  invalid: "ဤရက်စွဲသည် အွမ်မုလ်ကုရာ ပြက္ခဒိန်တွင် မရှိပါ။",
  note: "အွမ်မုလ်ကုရာ ပြက္ခဒိန်။ သင့်နိုင်ငံ၏ လမြင်ခြင်းအပေါ် မူတည်၍ လတစ်လ၏ စတင်ရက်သည် တစ်ရက် ကွာခြားနိုင်ပါသည်။",
  },
};
