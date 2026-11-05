// Qibla page strings. Labels shared with the app (tabs, distance, from-north, calibration, sun/moon
// hints, compass letters) come from appT("alm.qibla.*").
import type { Locale } from "../config";

export type QiblaMsg = {
  title: string;
  description: string;
  tabShadow: string;
  startCompass: string;
  compassOn: string;
  noSensor: string;
  denied: string;
  desktopHint: string;
  facing: string;
  azimuth: string;
  altitude: string;
  qiblaBearing: string;
  shadowIntro: string;
  shadowToward: string;
  shadowTowardHint: string;
  shadowAway: string;
  shadowAwayHint: string;
  shadowNone: string;
  shadowPassed: string;
  kaabaFact: string;
  mapNote: string;
  calibrate: string;
  noPlace: string;
};

const en: QiblaMsg = {
  title: "Qibla direction",
  description:
    "Find the Qibla from wherever you are: the bearing from north, the distance to the Kaaba, a live compass on your phone, the sun and moon, shadows and a map.",
  tabShadow: "Shadow",
  startCompass: "Start live compass",
  compassOn: "Live compass on — turn until the arrow points up",
  noSensor: "No compass sensor was found on this device. Use the angle from north shown on the dial.",
  denied: "Motion and orientation access was denied. You can allow it in your browser settings.",
  desktopHint: "North is at the top of the dial. Open this page on your phone to use the live compass.",
  facing: "You are facing the Qibla",
  azimuth: "Direction",
  altitude: "Height above horizon",
  qiblaBearing: "Qibla",
  shadowIntro:
    "Stand a stick or pen upright on level ground in the sun. At the times below its shadow lines up exactly with the Qibla.",
  shadowToward: "Shadow points to the Qibla",
  shadowTowardHint: "Face along the shadow, from the stick toward its tip.",
  shadowAway: "Sun is in the Qibla direction",
  shadowAwayHint: "Face the sun — the shadow points behind you, away from the Qibla.",
  shadowNone: "The sun doesn't line up with the Qibla today at this location. Use the compass or the map.",
  shadowPassed: "passed",
  kaabaFact:
    "Twice a year — around 27–28 May at 12:18 and 15–16 July at 12:27 Makkah time — the sun stands directly above the Kaaba, and wherever it is daytime every shadow points away from the Qibla.",
  mapNote: "The line is the great circle — the shortest path to the Kaaba.",
  calibrate: "Calibrate",
  noPlace: "Your location isn't set yet. Use your location or search for your city.",
};

const ar: QiblaMsg = {
  title: "اتجاه القبلة",
  description:
    "اعرف اتجاه القبلة من أي مكان: الزاوية من الشمال، والمسافة إلى الكعبة، وبوصلة مباشرة على هاتفك، وبالشمس والقمر، وبالظل، وعلى الخريطة.",
  tabShadow: "الظل",
  startCompass: "تشغيل البوصلة المباشرة",
  compassOn: "البوصلة تعمل — استدر حتى يشير السهم إلى الأعلى",
  noSensor: "لم يُعثر على مستشعر بوصلة في هذا الجهاز. استخدم الزاوية من الشمال الظاهرة على القرص.",
  denied: "رُفض الوصول إلى الحركة والاتجاه. يمكنك السماح به من إعدادات المتصفح.",
  desktopHint: "الشمال في أعلى القرص. افتح هذه الصفحة على هاتفك لاستخدام البوصلة المباشرة.",
  facing: "أنت متجه إلى القبلة",
  azimuth: "الاتجاه",
  altitude: "الارتفاع عن الأفق",
  qiblaBearing: "القبلة",
  shadowIntro: "اغرس عصًا أو قلمًا قائمًا على أرض مستوية في الشمس. في الأوقات التالية يكون ظلّه على خط القبلة تمامًا.",
  shadowToward: "الظل يشير إلى القبلة",
  shadowTowardHint: "اتجه مع الظل، من العصا نحو طرف الظل.",
  shadowAway: "الشمس في اتجاه القبلة",
  shadowAwayHint: "استقبل الشمس — يكون الظل خلفك في عكس اتجاه القبلة.",
  shadowNone: "لا تتطابق الشمس مع اتجاه القبلة اليوم في هذا الموقع. استخدم البوصلة أو الخريطة.",
  shadowPassed: "مضى",
  kaabaFact:
    "مرتين في السنة — نحو ٢٧–٢٨ مايو الساعة ١٢:١٨ و١٥–١٦ يوليو الساعة ١٢:٢٧ بتوقيت مكة — تتعامد الشمس على الكعبة، فيشير كل ظلّ حيث يكون النهار إلى عكس اتجاه القبلة.",
  mapNote: "الخط هو الدائرة العظمى — أقصر طريق إلى الكعبة.",
  calibrate: "معايرة",
  noPlace: "لم يُحدَّد موقعك بعد. استخدم موقعك أو ابحث عن مدينتك.",
};

const ur: QiblaMsg = {
  title: "سمتِ قبلہ",
  description:
    "کہیں سے بھی قبلہ معلوم کریں: شمال سے زاویہ، کعبہ تک فاصلہ، فون پر براہِ راست قطب نما، سورج اور چاند، سایہ اور نقشہ۔",
  tabShadow: "سایہ",
  startCompass: "براہِ راست قطب نما شروع کریں",
  compassOn: "قطب نما چل رہا ہے — اتنا گھومیں کہ تیر اوپر کی طرف ہو",
  noSensor: "اس ڈیوائس میں قطب نما کا سینسر نہیں ملا۔ ڈائل پر دکھایا گیا شمال سے زاویہ استعمال کریں۔",
  denied: "حرکت اور سمت تک رسائی مسترد ہو گئی۔ آپ براؤزر کی ترتیبات میں اجازت دے سکتے ہیں۔",
  desktopHint: "ڈائل کے اوپر شمال ہے۔ براہِ راست قطب نما کے لیے یہ صفحہ اپنے فون پر کھولیں۔",
  facing: "آپ کا رخ قبلہ کی طرف ہے",
  azimuth: "سمت",
  altitude: "افق سے بلندی",
  qiblaBearing: "قبلہ",
  shadowIntro: "دھوپ میں ہموار زمین پر ایک چھڑی یا قلم سیدھا کھڑا کریں۔ نیچے دیے گئے اوقات میں اس کا سایہ بالکل قبلہ کی سیدھ میں ہوتا ہے۔",
  shadowToward: "سایہ قبلہ کی طرف ہے",
  shadowTowardHint: "سائے کی سیدھ میں، چھڑی سے سائے کے سرے کی طرف رخ کریں۔",
  shadowAway: "سورج قبلہ کی سمت میں ہے",
  shadowAwayHint: "سورج کی طرف رخ کریں — سایہ آپ کے پیچھے، قبلہ کی مخالف سمت میں ہو گا۔",
  shadowNone: "آج اس مقام پر سورج قبلہ کی سیدھ میں نہیں آتا۔ قطب نما یا نقشہ استعمال کریں۔",
  shadowPassed: "گزر گیا",
  kaabaFact:
    "سال میں دو بار — تقریباً 27–28 مئی کو 12:18 اور 15–16 جولائی کو 12:27 مکہ کے وقت — سورج عین کعبہ کے اوپر ہوتا ہے، اور جہاں دن ہو وہاں ہر سایہ قبلہ کی مخالف سمت میں ہوتا ہے۔",
  mapNote: "یہ لکیر دائرۂ عظیم ہے — کعبہ تک مختصر ترین راستہ۔",
  calibrate: "کیلیبریٹ",
  noPlace: "آپ کا مقام ابھی طے نہیں ہوا۔ اپنا مقام استعمال کریں یا اپنا شہر تلاش کریں۔",
};

const fa: QiblaMsg = {
  title: "جهت قبله",
  description:
    "قبله را از هر جا پیدا کنید: زاویه از شمال، فاصله تا کعبه، قطب‌نمای زنده روی گوشی، خورشید و ماه، سایه و نقشه.",
  tabShadow: "سایه",
  startCompass: "روشن کردن قطب‌نمای زنده",
  compassOn: "قطب‌نما روشن است — بچرخید تا پیکان رو به بالا باشد",
  noSensor: "حسگر قطب‌نما در این دستگاه پیدا نشد. از زاویهٔ شمال که روی صفحه نشان داده شده استفاده کنید.",
  denied: "دسترسی به حرکت و جهت رد شد. می‌توانید آن را در تنظیمات مرورگر مجاز کنید.",
  desktopHint: "شمال در بالای صفحهٔ قطب‌نماست. برای قطب‌نمای زنده این صفحه را روی گوشی باز کنید.",
  facing: "رو به قبله هستید",
  azimuth: "جهت",
  altitude: "ارتفاع از افق",
  qiblaBearing: "قبله",
  shadowIntro: "یک چوب یا خودکار را روی زمین هموار زیر آفتاب عمود کنید. در زمان‌های زیر سایهٔ آن دقیقاً در راستای قبله است.",
  shadowToward: "سایه به سمت قبله است",
  shadowTowardHint: "در امتداد سایه، از چوب به سمت نوک سایه بایستید.",
  shadowAway: "خورشید در جهت قبله است",
  shadowAwayHint: "رو به خورشید بایستید — سایه پشت سر شما و خلاف جهت قبله است.",
  shadowNone: "امروز در این مکان خورشید در راستای قبله قرار نمی‌گیرد. از قطب‌نما یا نقشه استفاده کنید.",
  shadowPassed: "گذشت",
  kaabaFact:
    "سالی دو بار — حدود ۲۷–۲۸ مه ساعت ۱۲:۱۸ و ۱۵–۱۶ ژوئیه ساعت ۱۲:۲۷ به وقت مکه — خورشید درست بالای کعبه است و هر جا روز باشد، همهٔ سایه‌ها خلاف جهت قبله‌اند.",
  mapNote: "این خط دایرهٔ عظیمه است — کوتاه‌ترین مسیر تا کعبه.",
  calibrate: "کالیبره",
  noPlace: "موقعیت شما هنوز تعیین نشده است. از موقعیت خود استفاده کنید یا شهرتان را جستجو کنید.",
};

const ru: QiblaMsg = {
  title: "Направление киблы",
  description:
    "Найдите киблу где угодно: угол от севера, расстояние до Каабы, живой компас на телефоне, по солнцу и луне, по тени и на карте.",
  tabShadow: "Тень",
  startCompass: "Включить компас",
  compassOn: "Компас включён — поворачивайтесь, пока стрелка не укажет вверх",
  noSensor: "На этом устройстве нет датчика компаса. Используйте угол от севера, показанный на циферблате.",
  denied: "Доступ к датчикам движения и ориентации запрещён. Его можно разрешить в настройках браузера.",
  desktopHint: "Север — вверху циферблата. Откройте страницу на телефоне, чтобы пользоваться живым компасом.",
  facing: "Вы смотрите на киблу",
  azimuth: "Направление",
  altitude: "Высота над горизонтом",
  qiblaBearing: "Кибла",
  shadowIntro:
    "Поставьте палку или ручку вертикально на ровную поверхность на солнце. В указанное ниже время её тень точно совпадает с направлением киблы.",
  shadowToward: "Тень указывает на киблу",
  shadowTowardHint: "Встаньте вдоль тени — от палки к концу тени.",
  shadowAway: "Солнце в направлении киблы",
  shadowAwayHint: "Повернитесь к солнцу — тень будет позади вас, в сторону, противоположную кибле.",
  shadowNone: "Сегодня в этом месте солнце не совпадает с направлением киблы. Используйте компас или карту.",
  shadowPassed: "прошло",
  kaabaFact:
    "Дважды в год — около 27–28 мая в 12:18 и 15–16 июля в 12:27 по мекканскому времени — солнце стоит прямо над Каабой, и везде, где день, тени указывают в сторону, противоположную кибле.",
  mapNote: "Линия — дуга большого круга, кратчайший путь к Каабе.",
  calibrate: "Калибровка",
  noPlace: "Местоположение ещё не задано. Определите своё местоположение или найдите свой город.",
};

const ms: QiblaMsg = {
  title: "Arah kiblat",
  description:
    "Cari arah kiblat dari mana-mana: sudut dari utara, jarak ke Kaabah, kompas langsung di telefon, matahari dan bulan, bayang-bayang dan peta.",
  tabShadow: "Bayang",
  startCompass: "Mulakan kompas langsung",
  compassOn: "Kompas aktif — pusing sehingga anak panah menghala ke atas",
  noSensor: "Tiada sensor kompas pada peranti ini. Gunakan sudut dari utara yang ditunjukkan pada dail.",
  denied: "Akses gerakan dan orientasi ditolak. Anda boleh membenarkannya dalam tetapan pelayar.",
  desktopHint: "Utara berada di atas dail. Buka halaman ini di telefon untuk menggunakan kompas langsung.",
  facing: "Anda menghadap kiblat",
  azimuth: "Arah",
  altitude: "Ketinggian dari ufuk",
  qiblaBearing: "Kiblat",
  shadowIntro: "Pacakkan sebatang kayu atau pen tegak di atas tanah rata di bawah matahari. Pada waktu di bawah, bayangnya selari tepat dengan arah kiblat.",
  shadowToward: "Bayang menghala ke kiblat",
  shadowTowardHint: "Hadap mengikut bayang, dari kayu ke hujung bayang.",
  shadowAway: "Matahari di arah kiblat",
  shadowAwayHint: "Hadap matahari — bayang berada di belakang anda, bertentangan dengan kiblat.",
  shadowNone: "Hari ini matahari tidak sejajar dengan arah kiblat di lokasi ini. Gunakan kompas atau peta.",
  shadowPassed: "berlalu",
  kaabaFact:
    "Dua kali setahun — sekitar 27–28 Mei pukul 12:18 dan 15–16 Julai pukul 12:27 waktu Makkah — matahari berada tepat di atas Kaabah, dan di mana sahaja siang, setiap bayang menghala bertentangan dengan kiblat.",
  mapNote: "Garisan ini ialah bulatan besar — laluan terpendek ke Kaabah.",
  calibrate: "Kalibrasi",
  noPlace: "Lokasi anda belum ditetapkan. Guna lokasi anda atau cari bandar anda.",
};

const tr: QiblaMsg = {
  title: "Kıble yönü",
  description:
    "Kıbleyi her yerden bulun: kuzeyden açı, Kâbe'ye uzaklık, telefonunuzda canlı pusula, güneş ve ay, gölge ve harita.",
  tabShadow: "Gölge",
  startCompass: "Canlı pusulayı başlat",
  compassOn: "Pusula açık — ok yukarıyı gösterene kadar dönün",
  noSensor: "Bu cihazda pusula sensörü bulunamadı. Kadranda gösterilen kuzeyden açıyı kullanın.",
  denied: "Hareket ve yön erişimi reddedildi. Tarayıcı ayarlarından izin verebilirsiniz.",
  desktopHint: "Kadranın üstü kuzeydir. Canlı pusula için bu sayfayı telefonunuzda açın.",
  facing: "Kıbleye dönüksünüz",
  azimuth: "Yön",
  altitude: "Ufuktan yükseklik",
  qiblaBearing: "Kıble",
  shadowIntro: "Güneşte düz bir zemine bir çubuk veya kalem dik koyun. Aşağıdaki saatlerde gölgesi tam olarak kıble doğrultusundadır.",
  shadowToward: "Gölge kıbleyi gösteriyor",
  shadowTowardHint: "Gölge boyunca, çubuktan gölgenin ucuna doğru dönün.",
  shadowAway: "Güneş kıble yönünde",
  shadowAwayHint: "Güneşe dönün — gölge arkanızda, kıblenin ters yönündedir.",
  shadowNone: "Bugün bu konumda güneş kıble doğrultusuna gelmiyor. Pusulayı veya haritayı kullanın.",
  shadowPassed: "geçti",
  kaabaFact:
    "Yılda iki kez — Mekke saatiyle yaklaşık 27–28 Mayıs 12:18 ve 15–16 Temmuz 12:27'de — güneş tam Kâbe'nin üzerindedir ve gündüz olan her yerde gölgeler kıblenin tersini gösterir.",
  mapNote: "Çizgi büyük çemberdir — Kâbe'ye en kısa yol.",
  calibrate: "Kalibre et",
  noPlace: "Konumunuz henüz belirlenmedi. Konumunuzu kullanın veya şehrinizi arayın.",
};

const id: QiblaMsg = {
  title: "Arah kiblat",
  description:
    "Temukan arah kiblat dari mana saja: sudut dari utara, jarak ke Ka'bah, kompas langsung di ponsel, matahari dan bulan, bayangan, dan peta.",
  tabShadow: "Bayangan",
  startCompass: "Mulai kompas langsung",
  compassOn: "Kompas aktif — putar badan sampai panah menunjuk ke atas",
  noSensor: "Sensor kompas tidak ditemukan di perangkat ini. Gunakan sudut dari utara yang tertera pada piringan.",
  denied: "Akses gerakan dan orientasi ditolak. Anda bisa mengizinkannya di pengaturan peramban.",
  desktopHint: "Utara ada di bagian atas piringan. Buka halaman ini di ponsel untuk memakai kompas langsung.",
  facing: "Anda menghadap kiblat",
  azimuth: "Arah",
  altitude: "Ketinggian dari ufuk",
  qiblaBearing: "Kiblat",
  shadowIntro: "Tegakkan tongkat atau pena di tanah datar di bawah sinar matahari. Pada waktu di bawah ini, bayangannya tepat searah kiblat.",
  shadowToward: "Bayangan menunjuk ke kiblat",
  shadowTowardHint: "Menghadaplah searah bayangan, dari tongkat ke ujung bayangan.",
  shadowAway: "Matahari di arah kiblat",
  shadowAwayHint: "Menghadaplah ke matahari — bayangan ada di belakang Anda, berlawanan dengan kiblat.",
  shadowNone: "Hari ini matahari tidak sejajar dengan arah kiblat di lokasi ini. Gunakan kompas atau peta.",
  shadowPassed: "lewat",
  kaabaFact:
    "Dua kali setahun — sekitar 27–28 Mei pukul 12.18 dan 15–16 Juli pukul 12.27 waktu Makkah — matahari tepat di atas Ka'bah, dan di mana pun sedang siang, setiap bayangan menunjuk berlawanan dengan kiblat.",
  mapNote: "Garis ini adalah lingkaran besar — jalur terpendek ke Ka'bah.",
  calibrate: "Kalibrasi",
  noPlace: "Lokasi Anda belum diatur. Gunakan lokasi Anda atau cari kota Anda.",
};

const hi: QiblaMsg = {
  title: "क़िबले की दिशा",
  description:
    "आप जहाँ भी हों, क़िबला पता करें: उत्तर से कोण, काबा से दूरी, आपके फ़ोन पर लाइव कम्पास, सूरज और चाँद, परछाईं और नक़्शा।",
  tabShadow: "परछाईं",
  startCompass: "लाइव कम्पास शुरू करें",
  compassOn: "लाइव कम्पास चालू है — तब तक घूमें जब तक तीर ऊपर की ओर न हो जाए",
  noSensor: "इस डिवाइस में कम्पास सेंसर नहीं मिला। डायल पर दिखाया गया उत्तर से कोण इस्तेमाल करें।",
  denied: "मोशन और ओरिएंटेशन की अनुमति नहीं दी गई। आप इसे अपने ब्राउज़र की सेटिंग्स में चालू कर सकते हैं।",
  desktopHint: "डायल के ऊपर उत्तर है। लाइव कम्पास इस्तेमाल करने के लिए यह पेज अपने फ़ोन पर खोलें।",
  facing: "आपका रुख़ क़िबले की ओर है",
  azimuth: "दिशा",
  altitude: "क्षितिज से ऊँचाई",
  qiblaBearing: "क़िबला",
  shadowIntro:
    "धूप में समतल ज़मीन पर एक छड़ी या पेन सीधा खड़ा करें। नीचे दिए गए समय पर उसकी परछाईं ठीक क़िबले की सीध में होती है।",
  shadowToward: "परछाईं क़िबले की ओर है",
  shadowTowardHint: "परछाईं की सीध में, छड़ी से परछाईं के सिरे की ओर मुँह करें।",
  shadowAway: "सूरज क़िबले की दिशा में है",
  shadowAwayHint: "सूरज की ओर मुँह करें — परछाईं आपके पीछे, क़िबले से उलटी ओर होगी।",
  shadowNone: "आज इस जगह पर सूरज क़िबले की सीध में नहीं आता। कम्पास या नक़्शा इस्तेमाल करें।",
  shadowPassed: "बीत गया",
  kaabaFact:
    "साल में दो बार — लगभग 27–28 मई को 12:18 और 15–16 जुलाई को 12:27 मक्का के समय पर — सूरज ठीक काबा के ऊपर होता है, और जहाँ भी दिन हो, हर परछाईं क़िबले से उलटी ओर होती है।",
  mapNote: "यह रेखा ग्रेट सर्किल है — काबा तक का सबसे छोटा रास्ता।",
  calibrate: "कैलिब्रेट करें",
  noPlace: "आपकी लोकेशन अभी सेट नहीं है। अपनी लोकेशन इस्तेमाल करें या अपना शहर खोजें।",
};

const bn: QiblaMsg = {
  title: "কিবলার দিক",
  description:
    "আপনি যেখানেই থাকুন, কিবলা খুঁজে নিন: উত্তর থেকে কোণ, কাবা পর্যন্ত দূরত্ব, আপনার ফোনে লাইভ কম্পাস, সূর্য ও চাঁদ, ছায়া এবং মানচিত্র।",
  tabShadow: "ছায়া",
  startCompass: "লাইভ কম্পাস চালু করুন",
  compassOn: "লাইভ কম্পাস চালু আছে — তীরটি ওপরের দিকে না আসা পর্যন্ত ঘুরুন",
  noSensor: "এই ডিভাইসে কম্পাস সেন্সর পাওয়া যায়নি। ডায়ালে দেখানো উত্তর থেকে কোণটি ব্যবহার করুন।",
  denied: "মোশন ও ওরিয়েন্টেশনের অনুমতি দেওয়া হয়নি। আপনার ব্রাউজারের সেটিংস থেকে এটি চালু করতে পারেন।",
  desktopHint: "ডায়ালের ওপরের দিক উত্তর। লাইভ কম্পাস ব্যবহার করতে এই পৃষ্ঠাটি আপনার ফোনে খুলুন।",
  facing: "আপনি কিবলামুখী আছেন",
  azimuth: "দিক",
  altitude: "দিগন্ত থেকে উচ্চতা",
  qiblaBearing: "কিবলা",
  shadowIntro:
    "রোদে সমতল মাটিতে একটি লাঠি বা কলম সোজা করে দাঁড় করান। নিচে দেওয়া সময়ে এর ছায়া ঠিক কিবলার সরলরেখায় পড়ে।",
  shadowToward: "ছায়া কিবলার দিকে",
  shadowTowardHint: "ছায়ার সরলরেখা ধরে লাঠি থেকে ছায়ার মাথার দিকে মুখ করুন।",
  shadowAway: "সূর্য কিবলার দিকে",
  shadowAwayHint: "সূর্যের দিকে মুখ করুন — ছায়া থাকবে আপনার পেছনে, কিবলার উল্টো দিকে।",
  shadowNone: "আজ এই জায়গায় সূর্য কিবলার সরলরেখায় আসে না। কম্পাস বা মানচিত্র ব্যবহার করুন।",
  shadowPassed: "পেরিয়ে গেছে",
  kaabaFact:
    "বছরে দুবার — মোটামুটি 27–28 মে মক্কার সময় 12:18-এ এবং 15–16 জুলাই 12:27-এ — সূর্য ঠিক কাবার ওপরে থাকে, আর যেখানে তখন দিন, সেখানে সব ছায়া কিবলার উল্টো দিকে পড়ে।",
  mapNote: "এই রেখাটি গ্রেট সার্কেল — কাবা পর্যন্ত সবচেয়ে ছোট পথ।",
  calibrate: "ক্যালিব্রেট করুন",
  noPlace: "আপনার লোকেশন এখনো সেট করা হয়নি। আপনার লোকেশন ব্যবহার করুন বা আপনার শহর খুঁজুন।",
};

const ha: QiblaMsg = {
  title: "Inda alƙibla take",
  description:
    "Gano alƙibla daga duk inda kake: kusurwa daga arewa, nisa zuwa Ka'aba, kamfas kai tsaye a wayarka, rana da wata, inuwa da taswira.",
  tabShadow: "Inuwa",
  startCompass: "Fara kamfas kai tsaye",
  compassOn: "Kamfas kai tsaye yana aiki — juya har sai kibiyar ta nuna sama",
  noSensor: "Ba a sami na'urar kamfas a wannan na'ura ba. Yi amfani da kusurwa daga arewa da aka nuna a kan fuskar kamfas.",
  denied: "An hana izinin motsi da fuskanta. Za ka iya ba da izini a saitunan mai binciken intanet ɗinka.",
  desktopHint: "Arewa tana sama a fuskar kamfas. Buɗe wannan shafi a wayarka don amfani da kamfas kai tsaye.",
  facing: "Kana fuskantar alƙibla",
  azimuth: "Alƙibla (hanya)",
  altitude: "Tsayi sama da sararin sama",
  qiblaBearing: "Alƙibla",
  shadowIntro:
    "Kafa sanda ko alƙalami a tsaye a ƙasa mai daidai a cikin rana. A lokutan da ke ƙasa inuwarsa za ta daidaita daidai da alƙibla.",
  shadowToward: "Inuwa tana nuna alƙibla",
  shadowTowardHint: "Fuskanci hanyar inuwar, daga sandar zuwa ƙarshenta.",
  shadowAway: "Rana tana a wajen alƙibla",
  shadowAwayHint: "Fuskanci rana — inuwar tana nuna bayanka, nesa da alƙibla.",
  shadowNone: "Rana ba ta daidaita da alƙibla a yau a wannan wuri ba. Yi amfani da kamfas ko taswira.",
  shadowPassed: "ya wuce",
  kaabaFact:
    "Sau biyu a shekara — kusan 27–28 ga Mayu da ƙarfe 12:18 da 15–16 ga Yuli da ƙarfe 12:27 agogon Makka — rana tana tsayawa daidai sama da Ka'aba, kuma a duk inda ake rana kowace inuwa tana nuna nesa da alƙibla.",
  mapNote: "Layin shi ne babban da'ira — mafi gajeriyar hanya zuwa Ka'aba.",
  calibrate: "Daidaita",
  noPlace: "Ba a saita wurinka ba tukuna. Yi amfani da wurinka ko ka nemi garinku.",
};

const fr: QiblaMsg = {
  title: "Direction de la qibla",
  description:
    "Trouvez la qibla où que vous soyez : l’angle par rapport au nord, la distance jusqu’à la Kaaba, une boussole en direct sur votre téléphone, le soleil et la lune, les ombres et une carte.",
  tabShadow: "Ombre",
  startCompass: "Lancer la boussole en direct",
  compassOn: "Boussole en direct activée — tournez jusqu’à ce que la flèche pointe vers le haut",
  noSensor: "Aucun capteur de boussole n’a été trouvé sur cet appareil. Utilisez l’angle par rapport au nord indiqué sur le cadran.",
  denied: "L’accès au mouvement et à l’orientation a été refusé. Vous pouvez l’autoriser dans les réglages de votre navigateur.",
  desktopHint: "Le nord est en haut du cadran. Ouvrez cette page sur votre téléphone pour utiliser la boussole en direct.",
  facing: "Vous êtes face à la qibla",
  azimuth: "Direction",
  altitude: "Hauteur au-dessus de l’horizon",
  qiblaBearing: "Qibla",
  shadowIntro:
    "Plantez un bâton ou un stylo bien droit sur un sol plat, au soleil. Aux heures ci-dessous, son ombre s’aligne exactement sur la qibla.",
  shadowToward: "L’ombre indique la qibla",
  shadowTowardHint: "Placez-vous dans l’axe de l’ombre, du bâton vers sa pointe.",
  shadowAway: "Le soleil est dans la direction de la qibla",
  shadowAwayHint: "Faites face au soleil — l’ombre pointe derrière vous, à l’opposé de la qibla.",
  shadowNone: "Aujourd’hui, le soleil ne s’aligne pas sur la qibla à cet endroit. Utilisez la boussole ou la carte.",
  shadowPassed: "passé",
  kaabaFact:
    "Deux fois par an — vers les 27 et 28 mai à 12 h 18 et les 15 et 16 juillet à 12 h 27, heure de La Mecque — le soleil se trouve juste au-dessus de la Kaaba, et partout où il fait jour, chaque ombre pointe à l’opposé de la qibla.",
  mapNote: "La ligne suit le grand cercle — le chemin le plus court vers la Kaaba.",
  calibrate: "Calibrer",
  noPlace: "Votre position n’est pas encore définie. Utilisez votre position ou recherchez votre ville.",
};

const zh: QiblaMsg = {
  title: "朝向（基卜拉）",
  description:
    "无论身在何处都能找到朝向：相对正北的方位角、到克尔白的距离、手机上的实时指南针、太阳和月亮、影子以及地图。",
  tabShadow: "影子",
  startCompass: "启动实时指南针",
  compassOn: "实时指南针已开启——转动身体，直到箭头指向正上方",
  noSensor: "此设备上没有找到指南针传感器。请参照表盘上显示的相对正北的角度。",
  denied: "运动与方向权限被拒绝。您可以在浏览器设置中允许。",
  desktopHint: "表盘上方为正北。在手机上打开此页面即可使用实时指南针。",
  facing: "您正面向朝向",
  azimuth: "方位",
  altitude: "地平线以上高度",
  qiblaBearing: "朝向",
  shadowIntro:
    "在阳光下的平地上竖直立一根木棍或一支笔。在下面的时间，它的影子会正好与朝向对齐。",
  shadowToward: "影子指向朝向",
  shadowTowardHint: "顺着影子的方向站立，从木棍朝向影子的尖端。",
  shadowAway: "太阳位于朝向的方向",
  shadowAwayHint: "面向太阳——影子在您身后，背离朝向。",
  shadowNone: "今天在此地太阳不会与朝向对齐。请使用指南针或地图。",
  shadowPassed: "已过",
  kaabaFact:
    "每年有两次——约 5 月 27–28 日麦加时间 12:18 和 7 月 15–16 日麦加时间 12:27——太阳正好位于克尔白上空，凡是白天的地方，所有影子都背离朝向。",
  mapNote: "这条线是大圆航线——通往克尔白的最短路径。",
  calibrate: "校准",
  noPlace: "尚未设置您的位置。请使用您的位置或搜索您的城市。",
};

const ps: QiblaMsg = {
  title: "د قبلې لوری",
  description:
    "هر چېرې چې یاست قبله ومومئ: له شمال څخه زاویه، کعبې ته واټن، ستاسو په تلیفون کې ژوندۍ قطب‌نما، لمر او سپوږمۍ، سیوری او نقشه.",
  tabShadow: "سیوری",
  startCompass: "ژوندۍ قطب‌نما پیل کړئ",
  compassOn: "ژوندۍ قطب‌نما روانه ده — تر هغه وګرځئ چې غشی پورته وښيي",
  noSensor: "په دې وسیله کې د قطب‌نما سېنسر ونه موندل شو. په ډایل کې له شمال څخه ښودل شوې زاویه وکاروئ.",
  denied: "حرکت او لوري ته لاسرسی رد شو. تاسو کولای شئ د خپل براوزر په تنظیماتو کې اجازه ورکړئ.",
  desktopHint: "شمال د ډایل په سر کې دی. د ژوندۍ قطب‌نما د کارولو لپاره دا پاڼه په خپل تلیفون کې پرانیزئ.",
  facing: "ستاسو مخ قبلې ته دی",
  azimuth: "لوری",
  altitude: "له افق څخه لوړوالی",
  qiblaBearing: "قبله",
  shadowIntro:
    "یوه لښته یا قلم په لمر کې پر هوارې ځمکې نېغ ودروئ. په لاندې وختونو کې یې سیوری په بشپړ ډول د قبلې په لوري برابرېږي.",
  shadowToward: "سیوری قبلې ته اشاره کوي",
  shadowTowardHint: "د سیوري په لوري، له لښتې د سیوري سر ته مخ کړئ.",
  shadowAway: "لمر د قبلې په لوري کې دی",
  shadowAwayHint: "لمر ته مخ کړئ — سیوری ستاسو شاته، له قبلې څخه بل لوري ته وي.",
  shadowNone: "نن په دې ځای کې لمر د قبلې له لوري سره نه برابرېږي. قطب‌نما یا نقشه وکاروئ.",
  shadowPassed: "تېر شو",
  kaabaFact:
    "په کال کې دوه ځله — د مکې په وخت شاوخوا د مې په 27–28 نېټو 12:18 بجې او د جولای په 15–16 نېټو 12:27 بجې — لمر په سمه توګه د کعبې له پاسه وي، او هر چېرې چې ورځ وي، هر سیوری له قبلې څخه بل لوري ته وي.",
  mapNote: "دا کرښه لویه دایره ده — کعبې ته تر ټولو لنډه لار.",
  calibrate: "برابرول",
  noPlace: "ستاسو ځای لا نه دی ټاکل شوی. خپل ځای وکاروئ یا خپل ښار ولټوئ.",
};

const pa: QiblaMsg = {
  title: "ਕਿਬਲੇ ਦੀ ਦਿਸ਼ਾ",
  description:
    "ਜਿੱਥੇ ਵੀ ਹੋਵੋ ਕਿਬਲਾ ਲੱਭੋ: ਉੱਤਰ ਤੋਂ ਕੋਣ, ਕਾਬੇ ਤੱਕ ਦੂਰੀ, ਤੁਹਾਡੇ ਫ਼ੋਨ 'ਤੇ ਲਾਈਵ ਕੰਪਾਸ, ਸੂਰਜ ਅਤੇ ਚੰਨ, ਪਰਛਾਵੇਂ ਅਤੇ ਨਕਸ਼ਾ।",
  tabShadow: "ਪਰਛਾਵਾਂ",
  startCompass: "ਲਾਈਵ ਕੰਪਾਸ ਚਲਾਓ",
  compassOn: "ਲਾਈਵ ਕੰਪਾਸ ਚੱਲ ਰਿਹਾ ਹੈ — ਘੁੰਮੋ ਜਦੋਂ ਤੱਕ ਤੀਰ ਉੱਪਰ ਵੱਲ ਨਾ ਹੋ ਜਾਵੇ",
  noSensor: "ਇਸ ਡਿਵਾਈਸ ਵਿੱਚ ਕੰਪਾਸ ਸੈਂਸਰ ਨਹੀਂ ਮਿਲਿਆ। ਡਾਇਲ 'ਤੇ ਵਿਖਾਇਆ ਉੱਤਰ ਤੋਂ ਕੋਣ ਵਰਤੋ।",
  denied: "ਹਰਕਤ ਅਤੇ ਰੁਖ਼ ਤੱਕ ਪਹੁੰਚ ਦੀ ਇਜਾਜ਼ਤ ਨਹੀਂ ਦਿੱਤੀ ਗਈ। ਤੁਸੀਂ ਆਪਣੇ ਬ੍ਰਾਊਜ਼ਰ ਦੀਆਂ ਸੈਟਿੰਗਾਂ ਵਿੱਚ ਇਜਾਜ਼ਤ ਦੇ ਸਕਦੇ ਹੋ।",
  desktopHint: "ਡਾਇਲ ਦੇ ਉੱਪਰ ਉੱਤਰ ਹੈ। ਲਾਈਵ ਕੰਪਾਸ ਵਰਤਣ ਲਈ ਇਹ ਪੰਨਾ ਆਪਣੇ ਫ਼ੋਨ 'ਤੇ ਖੋਲ੍ਹੋ।",
  facing: "ਤੁਹਾਡਾ ਮੂੰਹ ਕਿਬਲੇ ਵੱਲ ਹੈ",
  azimuth: "ਦਿਸ਼ਾ",
  altitude: "ਦਿਸਹੱਦੇ ਤੋਂ ਉਚਾਈ",
  qiblaBearing: "ਕਿਬਲਾ",
  shadowIntro:
    "ਧੁੱਪ ਵਿੱਚ ਪੱਧਰੀ ਜ਼ਮੀਨ 'ਤੇ ਇੱਕ ਸੋਟੀ ਜਾਂ ਕਲਮ ਸਿੱਧੀ ਖੜ੍ਹੀ ਕਰੋ। ਹੇਠਾਂ ਦਿੱਤੇ ਸਮਿਆਂ 'ਤੇ ਉਸ ਦਾ ਪਰਛਾਵਾਂ ਬਿਲਕੁਲ ਕਿਬਲੇ ਦੀ ਸੇਧ ਵਿੱਚ ਹੁੰਦਾ ਹੈ।",
  shadowToward: "ਪਰਛਾਵਾਂ ਕਿਬਲੇ ਵੱਲ ਹੈ",
  shadowTowardHint: "ਪਰਛਾਵੇਂ ਦੀ ਸੇਧ ਵਿੱਚ ਮੂੰਹ ਕਰੋ, ਸੋਟੀ ਤੋਂ ਉਸ ਦੇ ਸਿਰੇ ਵੱਲ।",
  shadowAway: "ਸੂਰਜ ਕਿਬਲੇ ਦੀ ਦਿਸ਼ਾ ਵਿੱਚ ਹੈ",
  shadowAwayHint: "ਸੂਰਜ ਵੱਲ ਮੂੰਹ ਕਰੋ — ਪਰਛਾਵਾਂ ਤੁਹਾਡੇ ਪਿੱਛੇ, ਕਿਬਲੇ ਤੋਂ ਉਲਟ ਪਾਸੇ ਹੁੰਦਾ ਹੈ।",
  shadowNone: "ਅੱਜ ਇਸ ਥਾਂ 'ਤੇ ਸੂਰਜ ਕਿਬਲੇ ਦੀ ਸੇਧ ਵਿੱਚ ਨਹੀਂ ਆਉਂਦਾ। ਕੰਪਾਸ ਜਾਂ ਨਕਸ਼ਾ ਵਰਤੋ।",
  shadowPassed: "ਲੰਘ ਗਿਆ",
  kaabaFact:
    "ਸਾਲ ਵਿੱਚ ਦੋ ਵਾਰ — ਮੱਕੇ ਦੇ ਸਮੇਂ ਮੁਤਾਬਕ ਲਗਭਗ 27–28 ਮਈ ਨੂੰ 12:18 ਅਤੇ 15–16 ਜੁਲਾਈ ਨੂੰ 12:27 'ਤੇ — ਸੂਰਜ ਐਨ ਕਾਬੇ ਦੇ ਉੱਪਰ ਹੁੰਦਾ ਹੈ, ਅਤੇ ਜਿੱਥੇ ਵੀ ਦਿਨ ਹੋਵੇ ਉੱਥੇ ਹਰ ਪਰਛਾਵਾਂ ਕਿਬਲੇ ਤੋਂ ਉਲਟ ਪਾਸੇ ਹੁੰਦਾ ਹੈ।",
  mapNote: "ਇਹ ਲਕੀਰ ਵੱਡਾ ਚੱਕਰ ਹੈ — ਕਾਬੇ ਤੱਕ ਸਭ ਤੋਂ ਛੋਟਾ ਰਾਹ।",
  calibrate: "ਠੀਕ ਕਰੋ",
  noPlace: "ਤੁਹਾਡਾ ਟਿਕਾਣਾ ਹਾਲੇ ਤੈਅ ਨਹੀਂ ਹੋਇਆ। ਆਪਣਾ ਟਿਕਾਣਾ ਵਰਤੋ ਜਾਂ ਆਪਣਾ ਸ਼ਹਿਰ ਖੋਜੋ।",
};
const pnb: QiblaMsg = {
  title: "قبلے دی سمت",
  description:
    "جتھے وی ہووو قبلہ لبھو: اُتّر توں زاویہ، کعبے تک فاصلہ، تہاڈے فون اُتے لائیو قطب نما، سورج تے چن، پرچھاویں تے نقشہ۔",
  tabShadow: "پرچھاواں",
  startCompass: "لائیو قطب نما چلاؤ",
  compassOn: "لائیو قطب نما چل رہیا اے — گھمّو جدوں تیک تیر اُتے ول نہ ہو جائے",
  noSensor: "ایس ڈیوائس وچ قطب نما سینسر نہیں ملیا۔ ڈائل اُتے دسیا گیا اُتّر توں زاویہ ورتو۔",
  denied: "حرکت تے رُخ تک رسائی دی اجازت نہیں دتی گئی۔ تسیں براؤزر دیاں سیٹنگاں وچ ایہہ اجازت دے سکدے او۔",
  desktopHint: "ڈائل دے اُتے اُتّر اے۔ لائیو قطب نما ورتن لئی ایہہ صفحہ اپنے فون اُتے کھولو۔",
  facing: "تہاڈا منہ قبلے ول اے",
  azimuth: "سمت",
  altitude: "اُفق توں اُچائی",
  qiblaBearing: "قبلہ",
  shadowIntro:
    "دھپ وچ پدھری زمین اُتے اک سوٹی یا قلم سدھا کھڑا کرو۔ ہیٹھاں دتے ویلیاں اُتے اوہدا پرچھاواں بالکل قبلے دی سیدھ وچ ہوندا اے۔",
  shadowToward: "پرچھاواں قبلے ول اے",
  shadowTowardHint: "پرچھاویں دی سیدھ وچ منہ کرو، سوٹی توں اوہدے سرے ول۔",
  shadowAway: "سورج قبلے دی سمت وچ اے",
  shadowAwayHint: "سورج ول منہ کرو — پرچھاواں تہاڈے پچھے، قبلے توں اُلٹ پاسے ہوندا اے۔",
  shadowNone: "اج ایس تھاں اُتے سورج قبلے دی سیدھ وچ نہیں آندا۔ قطب نما یا نقشہ ورتو۔",
  shadowPassed: "لنگھ گیا",
  kaabaFact:
    "سال وچ دو واری — مکے دے ویلے موجب لگ بھگ 27–28 مئی نوں 12:18 تے 15–16 جولائی نوں 12:27 اُتے — سورج عین کعبے دے اُتے ہوندا اے، تے جتھے وی دن ہووے اوتھے ہر پرچھاواں قبلے توں اُلٹ پاسے ہوندا اے۔",
  mapNote: "ایہہ لکیر وڈا دائرہ اے — کعبے تک سب توں چھوٹا راہ۔",
  calibrate: "درست کرو",
  noPlace: "تہاڈی تھاں حالے مقرر نہیں ہوئی۔ اپنی تھاں ورتو یا اپنا شہر کھوجو۔",
};
const uz: QiblaMsg = {
  title: "Qibla yoʻnalishi",
  description:
    "Qayerda boʻlmang, qiblani toping: shimoldan burchak, Kaʼbagacha masofa, telefoningizda jonli kompas, quyosh va oy, soyalar hamda xarita.",
  tabShadow: "Soya",
  startCompass: "Jonli kompasni yoqish",
  compassOn: "Jonli kompas yoqilgan — strelka yuqoriga qaragunicha buriling",
  noSensor: "Bu qurilmada kompas sensori topilmadi. Siferblatda koʻrsatilgan shimoldan burchakdan foydalaning.",
  denied: "Harakat va yoʻnalish maʼlumotlariga ruxsat berilmadi. Uni brauzeringiz sozlamalarida yoqishingiz mumkin.",
  desktopHint: "Siferblatning yuqorisi — shimol. Jonli kompasdan foydalanish uchun bu sahifani telefoningizda oching.",
  facing: "Siz qiblaga yuzlangansiz",
  azimuth: "Yoʻnalish",
  altitude: "Ufqdan balandlik",
  qiblaBearing: "Qibla",
  shadowIntro:
    "Quyosh tushib turgan tekis yerga tayoq yoki ruchkani tik qoʻying. Quyidagi vaqtlarda uning soyasi aynan qibla yoʻnalishiga toʻgʻri keladi.",
  shadowToward: "Soya qiblani koʻrsatadi",
  shadowTowardHint: "Soya boʻylab, tayoqdan soyaning uchiga qarab yuzlaning.",
  shadowAway: "Quyosh qibla tomonda",
  shadowAwayHint: "Quyoshga yuzlaning — soya ortingizga, qiblaga teskari tomonga tushadi.",
  shadowNone: "Bugun bu joyda quyosh qibla yoʻnalishiga toʻgʻri kelmaydi. Kompas yoki xaritadan foydalaning.",
  shadowPassed: "oʻtdi",
  kaabaFact:
    "Yiliga ikki marta — Makka vaqti bilan taxminan 27–28 may kunlari soat 12:18 da va 15–16 iyul kunlari soat 12:27 da — quyosh roppa-rosa Kaʼba ustida turadi va kunduz boʻlgan har bir joyda barcha soyalar qiblaga teskari tomonga tushadi.",
  mapNote: "Bu chiziq katta aylana — Kaʼbagacha eng qisqa yoʻl.",
  calibrate: "Sozlash",
  noPlace: "Joylashuvingiz hali belgilanmagan. Joylashuvingizdan foydalaning yoki shahringizni qidiring.",
};
const uzCyrl: QiblaMsg = {
  title: "Қибла йўналиши",
  description:
    "Қаерда бўлманг, қиблани топинг: шимолдан бурчак, Каъбагача масофа, телефонингизда жонли компас, қуёш ва ой, соялар ҳамда харита.",
  tabShadow: "Соя",
  startCompass: "Жонли компасни ёқиш",
  compassOn: "Жонли компас ёқилган — стрелка юқорига қарагунича бурилинг",
  noSensor: "Бу қурилмада компас сенсори топилмади. Циферблатда кўрсатилган шимолдан бурчакдан фойдаланинг.",
  denied: "Ҳаракат ва йўналиш маълумотларига рухсат берилмади. Уни браузерингиз созламаларида ёқишингиз мумкин.",
  desktopHint: "Циферблатнинг юқориси — шимол. Жонли компасдан фойдаланиш учун бу саҳифани телефонингизда очинг.",
  facing: "Сиз қиблага юзлангансиз",
  azimuth: "Йўналиш",
  altitude: "Уфқдан баландлик",
  qiblaBearing: "Қибла",
  shadowIntro:
    "Қуёш тушиб турган текис ерга таёқ ёки ручкани тик қўйинг. Қуйидаги вақтларда унинг сояси айнан қибла йўналишига тўғри келади.",
  shadowToward: "Соя қиблани кўрсатади",
  shadowTowardHint: "Соя бўйлаб, таёқдан соянинг учига қараб юзланинг.",
  shadowAway: "Қуёш қибла томонда",
  shadowAwayHint: "Қуёшга юзланинг — соя ортингизга, қиблага тескари томонга тушади.",
  shadowNone: "Бугун бу жойда қуёш қибла йўналишига тўғри келмайди. Компас ёки харитадан фойдаланинг.",
  shadowPassed: "ўтди",
  kaabaFact:
    "Йилига икки марта — Макка вақти билан тахминан 27–28 май кунлари соат 12:18 да ва 15–16 июл кунлари соат 12:27 да — қуёш роппа-роса Каъба устида туради ва кундуз бўлган ҳар бир жойда барча соялар қиблага тескари томонга тушади.",
  mapNote: "Бу чизиқ катта айлана — Каъбагача энг қисқа йўл.",
  calibrate: "Созлаш",
  noPlace: "Жойлашувингиз ҳали белгиланмаган. Жойлашувингиздан фойдаланинг ёки шаҳрингизни қидиринг.",
};

const so: QiblaMsg = {
  title: "Jihada Qiblada",
  description:
    "Ka hel Qiblada meel kasta oo aad joogto: xagalka laga bilaabo waqooyi, masaafada ilaa Kacbada, jiheeye toos ah oo taleefankaaga ku jira, qorraxda iyo dayaxa, hooska iyo khariidad.",
  tabShadow: "Hooska",
  startCompass: "Daar jiheeyaha tooska ah",
  compassOn: "Jiheeyaha tooska ahi waa shidan yahay — wareeg ilaa fallaartu kor u jeedsato",
  noSensor: "Qalabkan laguma helin dareeme jiheeye. Isticmaal xagalka laga bilaabo waqooyi ee ka muuqda wajiga.",
  denied: "Gelitaanka dhaqdhaqaaqa iyo jihaynta waa la diiday. Waxaad ku oggolaan kartaa dejinta browser-kaaga.",
  desktopHint: "Waqooyi waxay ku taal xagga sare ee wajiga. Boggan ku fur taleefankaaga si aad u isticmaasho jiheeyaha tooska ah.",
  facing: "Waxaad u jeeddaa Qiblada",
  azimuth: "Jihada",
  altitude: "Joogga ka sarreeya jiidka cirka",
  qiblaBearing: "Qiblada",
  shadowIntro:
    "Ul ama qalin si toos ah ugu taag dhul siman oo qorraxdu ku dhacayso. Waqtiyada hoose hooskiisu si sax ah ayuu ula siman yahay Qiblada.",
  shadowToward: "Hooska wuxuu u jeedaa Qiblada",
  shadowTowardHint: "U jeeso dhinaca hooska, adigoo ka bilaabaya ulda ilaa caarada hooska.",
  shadowAway: "Qorraxdu waxay ku jirtaa jihada Qiblada",
  shadowAwayHint: "U jeeso qorraxda — hooskuna wuxuu u jeedaa gadaashaada, kana fog Qiblada.",
  shadowNone: "Maanta goobtan qorraxdu lama siman Qiblada. Isticmaal jiheeyaha ama khariidadda.",
  shadowPassed: "waa dhaafay",
  kaabaFact:
    "Laba jeer sannadkii — qiyaastii 27–28 May saacadda 12:18 iyo 15–16 Luulyo saacadda 12:27 waqtiga Makka — qorraxdu waxay si toos ah uga korraysaa Kacbada, meel kasta oo maalin ahna hooska oo dhan wuxuu u jeedaa dhinaca ka soo horjeeda Qiblada.",
  mapNote: "Xariiqdu waa goobada weyn — jidka ugu gaaban ee Kacbada loo maro.",
  calibrate: "Hagaaji",
  noPlace: "Goobtaada weli lama dejin. Isticmaal goobtaada ama raadi magaaladaada.",
};

const sw: QiblaMsg = {
  title: "Mwelekeo wa Kibla",
  description:
    "Pata Kibla popote ulipo: pembe kutoka kaskazini, umbali hadi Al-Kaaba, dira hai kwenye simu yako, jua na mwezi, vivuli na ramani.",
  tabShadow: "Kivuli",
  startCompass: "Washa dira hai",
  compassOn: "Dira hai imewashwa — geuka hadi mshale uelekee juu",
  noSensor: "Hakuna kihisi cha dira kilichopatikana kwenye kifaa hiki. Tumia pembe kutoka kaskazini inayoonyeshwa kwenye uso wa dira.",
  denied: "Ruhusa ya mwendo na mwelekeo imekataliwa. Unaweza kuiruhusu katika mipangilio ya kivinjari chako.",
  desktopHint: "Kaskazini iko juu ya uso wa dira. Fungua ukurasa huu kwenye simu yako ili kutumia dira hai.",
  facing: "Unaelekea Kibla",
  azimuth: "Mwelekeo",
  altitude: "Kimo juu ya upeo wa macho",
  qiblaBearing: "Kibla",
  shadowIntro:
    "Simamisha fimbo au kalamu wima juu ya ardhi tambarare kwenye jua. Katika nyakati zilizo hapa chini kivuli chake hulingana sawasawa na Kibla.",
  shadowToward: "Kivuli kinaelekea Kibla",
  shadowTowardHint: "Elekea upande wa kivuli, kutoka kwenye fimbo hadi ncha ya kivuli.",
  shadowAway: "Jua liko upande wa Kibla",
  shadowAwayHint: "Elekea jua — kivuli kinaelekea nyuma yako, mbali na Kibla.",
  shadowNone: "Leo jua halilingani na Kibla mahali hapa. Tumia dira au ramani.",
  shadowPassed: "umepita",
  kaabaFact:
    "Mara mbili kwa mwaka — takriban tarehe 27–28 Mei saa 12:18 na 15–16 Julai saa 12:27 kwa saa za Makka — jua husimama moja kwa moja juu ya Al-Kaaba, na popote palipo mchana kila kivuli huelekea upande ulio kinyume na Kibla.",
  mapNote: "Mstari huu ni duara kuu — njia fupi zaidi kuelekea Al-Kaaba.",
  calibrate: "Rekebisha",
  noPlace: "Mahali ulipo bado hapajawekwa. Tumia mahali ulipo au tafuta mji wako.",
};

const kuArab: QiblaMsg = {
  title: "ئاراستەی قیبلە",
  description:
    "لە هەر شوێنێک بیت قیبلە بدۆزەرەوە: گۆشە لە باکوورەوە، دووری لە کەعبەوە، قیبلەنمای ڕاستەوخۆ لە مۆبایلەکەتدا، خۆر و مانگ، سێبەر و نەخشە.",
  tabShadow: "سێبەر",
  startCompass: "دەستپێکردنی قیبلەنمای ڕاستەوخۆ",
  compassOn: "قیبلەنمای ڕاستەوخۆ چالاکە — بسووڕێوە تا تیرەکە بەرەو سەرەوە ئاماژە بکات",
  noSensor: "لەم ئامێرەدا هەستەوەری قیبلەنما نەدۆزرایەوە. ئەو گۆشەیە بەکاربهێنە کە لە باکوورەوە لەسەر ڕووکارەکە پیشان دراوە.",
  denied: "دەستگەیشتن بە جووڵە و ئاراستە ڕەت کرایەوە. دەتوانیت لە ڕێکخستنەکانی وێبگەڕەکەتدا ڕێگە بدەیت.",
  desktopHint: "باکوور لە سەرەوەی ڕووکارەکەیە. ئەم لاپەڕەیە لە مۆبایلەکەتدا بکەرەوە بۆ بەکارهێنانی قیبلەنمای ڕاستەوخۆ.",
  facing: "ڕووت لە قیبلەیە",
  azimuth: "ئاراستە",
  altitude: "بەرزی لە ئاسۆوە",
  qiblaBearing: "قیبلە",
  shadowIntro:
    "دارێک یان قەڵەمێک بە ستوونی لەسەر زەوییەکی تەخت لەبەر خۆردا ڕابگرە. لەم کاتانەی خوارەوەدا سێبەرەکەی ڕێک لەگەڵ ئاراستەی قیبلە یەک دەگرێتەوە.",
  shadowToward: "سێبەر ئاماژە بە قیبلە دەکات",
  shadowTowardHint: "ڕوو لە ئاراستەی سێبەرەکە بکە، لە دارەکەوە بۆ سەری سێبەرەکە.",
  shadowAway: "خۆر لە ئاراستەی قیبلەدایە",
  shadowAwayHint: "ڕوو لە خۆر بکە — سێبەرەکە دەکەوێتە پشتتەوە، بە پێچەوانەی قیبلە.",
  shadowNone: "ئەمڕۆ لەم شوێنەدا خۆر لەگەڵ ئاراستەی قیبلە یەک ناگرێتەوە. قیبلەنما یان نەخشە بەکاربهێنە.",
  shadowPassed: "تێپەڕی",
  kaabaFact:
    "ساڵانە دوو جار — نزیکەی 27–28ی ئایار کاتژمێر 12:18 و 15–16ی تەمموز کاتژمێر 12:27 بە کاتی مەککە — خۆر ڕێک دەکەوێتە سەرووی کەعبەوە، و لە هەر شوێنێک ڕۆژ بێت، هەموو سێبەرێک بە پێچەوانەی قیبلەوەیە.",
  mapNote: "ئەم هێڵە بازنەی گەورەیە — کورتترین ڕێگا بۆ کەعبە.",
  calibrate: "ڕێکخستن",
  noPlace: "شوێنەکەت هێشتا دیاری نەکراوە. شوێنەکەت بەکاربهێنە یان بەدوای شارەکەتدا بگەڕێ.",
};

const kuLatn: QiblaMsg = {
  title: "Rêya Qibleyê",
  description:
    "Qibleyê li ku derê bî jî bibîne: goşeya ji bakur ve, dûrahiya heta Kabeyê, pûsleyeke zindî li ser telefona te, roj û heyv, sî û nexşe.",
  tabShadow: "Sî",
  startCompass: "Pûsleya zindî vêxe",
  compassOn: "Pûsleya zindî vêxistî ye — bizivire heta ku tîr ber bi jor ve be",
  noSensor: "Li ser vê amûrê hestyarê pûsleyê nehat dîtin. Goşeya ji bakur ve ya li ser rûkarê bi kar bîne.",
  denied: "Destûra tevger û arastekirinê hat redkirin. Tu dikarî di mîhengên geroka xwe de destûrê bidî.",
  desktopHint: "Bakur li jorê rûkarê ye. Vê rûpelê li ser telefona xwe veke da ku pûsleya zindî bi kar bînî.",
  facing: "Tu ber bi Qibleyê ve yî",
  azimuth: "Alî",
  altitude: "Bilindahiya ji asoyê",
  qiblaBearing: "Qible",
  shadowIntro:
    "Darek an qelemekê rast li ser erdeke rast a ku roj lê dide raweste. Di demên jêrîn de sîya wê tam li ser rêya Qibleyê ye.",
  shadowToward: "Sî ber bi Qibleyê ve ye",
  shadowTowardHint: "Ber bi aliyê sîyê ve bizivire, ji darê heta serê sîyê.",
  shadowAway: "Roj li aliyê Qibleyê ye",
  shadowAwayHint: "Ber bi rojê ve bizivire — sî li pişt te ye, dûrî Qibleyê.",
  shadowNone: "Îro li vî cihî roj bi Qibleyê re li hev nayê. Pûsle an nexşeyê bi kar bîne.",
  shadowPassed: "derbas bû",
  kaabaFact:
    "Salê du caran — nêzîkî 27–28ê Gulanê saet 12:18 û 15–16ê Tîrmehê saet 12:27 bi dema Mekkeyê — roj rasterast li ser Kabeyê ye, û li her derê ku roj e hemû sî berevajî Qibleyê ne.",
  mapNote: "Xet xeleka mezin e — rêya herî kurt a ber bi Kabeyê ve.",
  calibrate: "Rast bike",
  noPlace: "Cihê te hêj nehatiye diyarkirin. Cihê xwe bi kar bîne an li bajarê xwe bigere.",
};

const ml: QiblaMsg = {
  title: "ഖിബ്‌ലയുടെ ദിശ",
  description:
    "നിങ്ങൾ എവിടെയായിരുന്നാലും ഖിബ്‌ല കണ്ടെത്തുക: വടക്കുനിന്നുള്ള കോൺ, കഅ്ബയിലേക്കുള്ള ദൂരം, ഫോണിലെ തത്സമയ കോമ്പസ്, സൂര്യനും ചന്ദ്രനും, നിഴൽ, മാപ്പ്.",
  tabShadow: "നിഴൽ",
  startCompass: "തത്സമയ കോമ്പസ് ആരംഭിക്കുക",
  compassOn: "തത്സമയ കോമ്പസ് ഓണാണ് — അമ്പടയാളം മുകളിലേക്ക് ചൂണ്ടുന്നതുവരെ തിരിയുക",
  noSensor: "ഈ ഉപകരണത്തിൽ കോമ്പസ് സെൻസർ കണ്ടെത്തിയില്ല. ഡയലിൽ കാണിച്ചിരിക്കുന്ന വടക്കുനിന്നുള്ള കോൺ ഉപയോഗിക്കുക.",
  denied: "ചലനത്തിനും ദിശയ്ക്കുമുള്ള അനുമതി നിരസിച്ചു. ബ്രൗസർ ക്രമീകരണങ്ങളിൽ നിങ്ങൾക്ക് ഇത് അനുവദിക്കാം.",
  desktopHint: "ഡയലിന്റെ മുകൾഭാഗത്താണ് വടക്ക്. തത്സമയ കോമ്പസ് ഉപയോഗിക്കാൻ ഈ പേജ് ഫോണിൽ തുറക്കുക.",
  facing: "നിങ്ങൾ ഖിബ്‌ലയ്ക്ക് അഭിമുഖമാണ്",
  azimuth: "ദിശ",
  altitude: "ചക്രവാളത്തിന് മുകളിലുള്ള ഉയരം",
  qiblaBearing: "ഖിബ്‌ല",
  shadowIntro:
    "സൂര്യപ്രകാശം വീഴുന്ന നിരപ്പായ പ്രതലത്തിൽ ഒരു വടിയോ പേനയോ നേരെ നിർത്തുക. താഴെ കൊടുത്ത സമയങ്ങളിൽ അതിന്റെ നിഴൽ ഖിബ്‌ലയുമായി കൃത്യമായി ഒത്തുവരും.",
  shadowToward: "നിഴൽ ഖിബ്‌ലയിലേക്ക് ചൂണ്ടുന്നു",
  shadowTowardHint: "വടിയിൽ നിന്ന് നിഴലിന്റെ അറ്റത്തേക്കുള്ള ദിശയിൽ നിഴലിന് അഭിമുഖമായി നിൽക്കുക.",
  shadowAway: "സൂര്യൻ ഖിബ്‌ലയുടെ ദിശയിലാണ്",
  shadowAwayHint: "സൂര്യന് അഭിമുഖമായി നിൽക്കുക — നിഴൽ നിങ്ങളുടെ പിന്നിലേക്ക്, ഖിബ്‌ലയിൽ നിന്ന് അകലേക്ക് ചൂണ്ടും.",
  shadowNone: "ഇന്ന് ഈ സ്ഥലത്ത് സൂര്യൻ ഖിബ്‌ലയുമായി ഒത്തുവരുന്നില്ല. കോമ്പസോ മാപ്പോ ഉപയോഗിക്കുക.",
  shadowPassed: "കഴിഞ്ഞു",
  kaabaFact:
    "വർഷത്തിൽ രണ്ടുതവണ — ഏകദേശം മെയ് 27–28-ന് മക്ക സമയം 12:18-നും ജൂലൈ 15–16-ന് 12:27-നും — സൂര്യൻ കഅ്ബയ്ക്ക് നേരെ മുകളിലെത്തുന്നു, പകലുള്ള എല്ലായിടത്തും ഓരോ നിഴലും ഖിബ്‌ലയുടെ എതിർദിശയിലേക്ക് ചൂണ്ടുന്നു.",
  mapNote: "ഈ വര ഗ്രേറ്റ് സർക്കിൾ ആണ് — കഅ്ബയിലേക്കുള്ള ഏറ്റവും ചെറിയ പാത.",
  calibrate: "കാലിബ്രേറ്റ് ചെയ്യുക",
  noPlace: "നിങ്ങളുടെ സ്ഥലം ഇതുവരെ നിശ്ചയിച്ചിട്ടില്ല. നിങ്ങളുടെ ലൊക്കേഷൻ ഉപയോഗിക്കുക അല്ലെങ്കിൽ നഗരം തിരയുക.",
};

const de: QiblaMsg = {
  title: "Qibla-Richtung",
  description:
    "Finde die Qibla, wo immer du bist: die Richtung ab Norden, die Entfernung zur Kaaba, ein Live-Kompass auf deinem Handy, Sonne und Mond, Schatten und eine Karte.",
  tabShadow: "Schatten",
  startCompass: "Live-Kompass starten",
  compassOn: "Live-Kompass an – dreh dich, bis der Pfeil nach oben zeigt",
  noSensor: "Auf diesem Gerät wurde kein Kompasssensor gefunden. Nutze den Winkel ab Norden, der auf der Skala angezeigt wird.",
  denied: "Der Zugriff auf Bewegung und Ausrichtung wurde verweigert. Du kannst ihn in deinen Browsereinstellungen erlauben.",
  desktopHint: "Norden ist oben auf der Skala. Öffne diese Seite auf deinem Handy, um den Live-Kompass zu nutzen.",
  facing: "Du bist zur Qibla ausgerichtet",
  azimuth: "Richtung",
  altitude: "Höhe über dem Horizont",
  qiblaBearing: "Qibla",
  shadowIntro:
    "Stelle einen Stab oder Stift senkrecht auf ebenen Boden in die Sonne. Zu den unten angegebenen Zeiten zeigt sein Schatten genau in Richtung Qibla.",
  shadowToward: "Der Schatten zeigt zur Qibla",
  shadowTowardHint: "Richte dich entlang des Schattens aus, vom Stab zu seiner Spitze.",
  shadowAway: "Die Sonne steht in Richtung Qibla",
  shadowAwayHint: "Wende dich der Sonne zu – der Schatten zeigt hinter dich, von der Qibla weg.",
  shadowNone: "Heute steht die Sonne an diesem Ort nicht in einer Linie mit der Qibla. Nutze den Kompass oder die Karte.",
  shadowPassed: "vorbei",
  kaabaFact:
    "Zweimal im Jahr – etwa am 27.–28. Mai um 12:18 Uhr und am 15.–16. Juli um 12:27 Uhr Mekka-Zeit – steht die Sonne genau über der Kaaba, und überall, wo es Tag ist, zeigt jeder Schatten von der Qibla weg.",
  mapNote: "Die Linie ist der Großkreis – der kürzeste Weg zur Kaaba.",
  calibrate: "Kalibrieren",
  noPlace: "Dein Standort ist noch nicht festgelegt. Verwende deinen Standort oder suche nach deiner Stadt.",
};

const es: QiblaMsg = {
  title: "Dirección de la alquibla",
  description:
    "Encuentra la alquibla dondequiera que estés: el rumbo desde el norte, la distancia a la Kaaba, una brújula en vivo en tu teléfono, el sol y la luna, las sombras y un mapa.",
  tabShadow: "Sombra",
  startCompass: "Iniciar la brújula en vivo",
  compassOn: "Brújula en vivo activada — gira hasta que la flecha apunte hacia arriba",
  noSensor: "No se encontró ningún sensor de brújula en este dispositivo. Usa el ángulo desde el norte que se muestra en la esfera.",
  denied: "Se denegó el acceso al movimiento y la orientación. Puedes permitirlo en los ajustes de tu navegador.",
  desktopHint: "El norte está en la parte superior de la esfera. Abre esta página en tu teléfono para usar la brújula en vivo.",
  facing: "Estás orientado hacia la alquibla",
  azimuth: "Dirección",
  altitude: "Altura sobre el horizonte",
  qiblaBearing: "Alquibla",
  shadowIntro:
    "Coloca un palo o un bolígrafo en posición vertical sobre un suelo plano al sol. En las horas indicadas abajo, su sombra se alinea exactamente con la alquibla.",
  shadowToward: "La sombra apunta hacia la alquibla",
  shadowTowardHint: "Colócate a lo largo de la sombra, mirando desde el palo hacia su punta.",
  shadowAway: "El sol está en la dirección de la alquibla",
  shadowAwayHint: "Mira hacia el sol — la sombra apunta detrás de ti, en sentido contrario a la alquibla.",
  shadowNone: "Hoy el sol no se alinea con la alquibla en este lugar. Usa la brújula o el mapa.",
  shadowPassed: "ya pasó",
  kaabaFact:
    "Dos veces al año — hacia el 27–28 de mayo a las 12:18 y el 15–16 de julio a las 12:27, hora de La Meca — el sol se sitúa justo encima de la Kaaba, y allí donde sea de día todas las sombras apuntan en sentido contrario a la alquibla.",
  mapNote: "La línea es el círculo máximo — el camino más corto hasta la Kaaba.",
  calibrate: "Calibrar",
  noPlace: "Tu ubicación aún no está definida. Usa tu ubicación o busca tu ciudad.",
};

export const qiblaMsg: Record<Locale, QiblaMsg> = { ar, en, ur, fa, ru, ms, tr, id, hi, bn, ha, fr, zh, ps, pa, pnb, uz, "uz-Cyrl": uzCyrl, so, sw, "ku-Arab": kuArab, "ku-Latn": kuLatn, ml, de, es,
"az-Latn": {
  title: "Qiblə istiqaməti",
  description:
    "Harada olursunuzsa olun, qibləni tapın: şimaldan bucaq, Kəbəyə qədər məsafə, telefonunuzda canlı kompas, Günəş və Ay, kölgə və xəritə.",
  tabShadow: "Kölgə",
  startCompass: "Canlı kompası işə sal",
  compassOn: "Canlı kompas işləyir — ox yuxarını göstərənə qədər dönün",
  noSensor: "Bu cihazda kompas sensoru tapılmadı. Şkalada göstərilən şimaldan bucaqdan istifadə edin.",
  denied: "Hərəkət və istiqamət sensorlarına giriş rədd edildi. Brauzer parametrlərində icazə verə bilərsiniz.",
  desktopHint: "Şimal şkalanın yuxarısındadır. Canlı kompasdan istifadə etmək üçün bu səhifəni telefonunuzda açın.",
  facing: "Qibləyə üz tutmusunuz",
  azimuth: "İstiqamət",
  altitude: "Üfüqdən hündürlük",
  qiblaBearing: "Qiblə",
  shadowIntro:
    "Düz yerdə, günəşin altında çubuq və ya qələmi şaquli qoyun. Aşağıdakı vaxtlarda kölgəsi dəqiq qibləyə istiqamətlənir.",
  shadowToward: "Kölgə qibləni göstərir",
  shadowTowardHint: "Kölgə boyunca, çubuqdan onun ucuna doğru üz tutun.",
  shadowAway: "Günəş qiblə istiqamətindədir",
  shadowAwayHint: "Günəşə üz tutun — kölgə arxanızı, qibləyə əks tərəfi göstərir.",
  shadowNone: "Bu gün bu məkanda Günəş qibləylə eyni xəttdə deyil. Kompasdan və ya xəritədən istifadə edin.",
  shadowPassed: "keçib",
  kaabaFact:
    "İldə iki dəfə — təxminən may ayının 27–28-də saat 12:18-də və iyul ayının 15–16-da saat 12:27-də (Məkkə vaxtı ilə) Günəş birbaşa Kəbənin üstündə olur və gündüz olan hər yerdə bütün kölgələr qibləyə əks tərəfi göstərir.",
  mapNote: "Xətt böyük çevrədir — Kəbəyə ən qısa yoldur.",
  calibrate: "Kalibrə et",
  noPlace: "Məkanınız hələ təyin olunmayıb. Məkanınızdan istifadə edin və ya şəhərinizi axtarın.",
},
"om": {
  title: "Kallattii Qiblaa",
  description:
    "Qiblaa bakka jirtu hundaa irraa argadhu: kallattii kaaba irraa, fageenya Ka'abaatti, kompaasii kallattii ifaa bilbila kee irratti, aduu fi ji'a, gaaddidduu fi kaartaa.",
  tabShadow: "Gaaddidduu",
  startCompass: "Kompaasii kallattii jalqabi",
  compassOn: "Kompaasiin kallattii hojii irra jira — hanga xiyyi gara olitti kaa'amutti garagali",
  noSensor: "Meeshaa kana irratti sensarri kompaasii hin argamne. Fakkii kompaasii irratti kallattii kaaba irraa agarsiifame fayyadami.",
  denied: "Eeyyamni sosocho'umsaa fi kallattii dhorkameera. Qindaa'ina brawuzara kee keessatti eeyyamuu dandeessa.",
  desktopHint: "Kaabni fakkii kompaasii irratti gubbaa jira. Kompaasii kallattii fayyadamuuf fuula kana bilbila kee irratti bani.",
  facing: "Qiblaatti garagalteetta",
  azimuth: "Kallattii",
  altitude: "Ol-ka'iinsa sararaa irraa",
  qiblaBearing: "Qiblaa",
  shadowIntro:
    "Lafa walqixa irratti aduu keessatti soogidda yookaan qalama dhaabi. Yeroowwan gadii keessatti gaaddiduun isaa sirriitti Qiblaa wajjin walitti aanti.",
  shadowToward: "Gaaddiduun Qiblaa mullata",
  shadowTowardHint: "Gaaddidduu hordofii garagali, soogidda irraa gara fiixee isaatti.",
  shadowAway: "Aduun kallattii Qiblaa keessa jira",
  shadowAwayHint: "Aduu garagali — gaaddiduun duubatti kee, Qiblaa irraa fagaatee mullata.",
  shadowNone: "Har'a bakka kanatti aduun Qiblaa wajjin hin walitti dhufu. Kompaasii yookaan kaartaa fayyadami.",
  shadowPassed: "darbeera",
  kaabaFact:
    "Waggaa keessatti altokko lama — gara Caamsaa 27–28 sa'a 12:18 fi Adoolessa 15–16 sa'a 12:27 yeroo Makkaatiin — aduun Ka'abaa gubbaa kallattiidhaan dhaabata, bakka guyyaa ta'e hundatti gaaddiduun hundi Qiblaa irraa fagaatee mullata.",
  mapNote: "Sararri kun marsaa guddaa (great circle) dha — karaa Ka'abaatti gabaabaa.",
  calibrate: "Sirreessi",
  noPlace: "Bakki kee ammaaf hin qindaa'ne. Bakka kee fayyadami yookaan magaalaa kee barbaadi.",
},
"am": {
  title: "የቂብላ አቅጣጫ",
  description:
    "ከሚገኙበት ቦታ ሆነው ቂብላን ይፈልጉ፦ ከሰሜን የሚለካ አቅጣጫ፣ እስከ ካዕባ ያለው ርቀት፣ በስልክዎ ላይ የቀጥታ ኮምፓስ፣ ፀሐይና ጨረቃ፣ ጥላና ካርታ።",
  tabShadow: "ጥላ",
  startCompass: "የቀጥታ ኮምፓስ ጀምር",
  compassOn: "የቀጥታ ኮምፓስ በርቷል — ቀስቱ ወደ ላይ እስኪያመለክት ድረስ ይዙሩ",
  noSensor: "በዚህ መሣሪያ ላይ የኮምፓስ ዳሳሽ አልተገኘም። በመደወያው ላይ የሚታየውን ከሰሜን የሚለካ አንግል ይጠቀሙ።",
  denied: "የእንቅስቃሴና የአቅጣጫ ፈቃድ ተከልክሏል። በአሳሽዎ ቅንብሮች ውስጥ መፍቀድ ይችላሉ።",
  desktopHint: "ሰሜን በመደወያው አናት ላይ ነው። የቀጥታ ኮምፓሱን ለመጠቀም ይህን ገጽ በስልክዎ ላይ ይክፈቱ።",
  facing: "ወደ ቂብላ ዞረዋል",
  azimuth: "አቅጣጫ",
  altitude: "ከአድማስ በላይ ያለ ከፍታ",
  qiblaBearing: "ቂብላ",
  shadowIntro:
    "ዱላ ወይም እስክሪብቶ በፀሐይ ውስጥ በደለል መሬት ላይ ቀጥ አድርገው ይትከሉ። ከታች በተዘረዘሩት ሰዓታት ጥላው ከቂብላ ጋር በትክክል ይሰለፋል።",
  shadowToward: "ጥላው ወደ ቂብላ ያመለክታል",
  shadowTowardHint: "ከዱላው ወደ ጫፉ በሚሄደው የጥላ አቅጣጫ ይዙሩ።",
  shadowAway: "ፀሐይ በቂብላ አቅጣጫ ላይ ናት",
  shadowAwayHint: "ፀሐይን ፊት ለፊት ያድርጉ — ጥላው ከቂብላ ርቆ ወደ ጀርባዎ ያመለክታል።",
  shadowNone: "ዛሬ በዚህ አካባቢ ፀሐይ ከቂብላ ጋር አትሰለፍም። ኮምፓሱን ወይም ካርታውን ይጠቀሙ።",
  shadowPassed: "አልፏል",
  kaabaFact:
    "በዓመት ሁለት ጊዜ — ሜይ 27–28 አካባቢ በ12:18 እና ጁላይ 15–16 በ12:27 በመካ ሰዓት — ፀሐይ በካዕባ ላይ በቀጥታ ትገኛለች፤ ቀን በሆነበት ሁሉ ማንኛውም ጥላ ከቂብላ ርቆ ያመለክታል።",
  mapNote: "መስመሩ ታላቁ ክብ ነው — ወደ ካዕባ የሚወስደው አጭሩ መንገድ።",
  calibrate: "አስተካክል",
  noPlace: "አካባቢዎ እስካሁን አልተቀመጠም። አካባቢዎን ይጠቀሙ ወይም ከተማዎን ይፈልጉ።",
},
"kk-Cyrl": {
  title: "Құбыла бағыты",
  description:
    "Қайда болсаңыз да құбыланы табыңыз: солтүстіктен бұрыш, Қағбаға дейінгі қашықтық, телефондағы тікелей компас, күн мен ай, көлеңкелер және карта.",
  tabShadow: "Көлеңке",
  startCompass: "Тікелей компасты қосу",
  compassOn: "Тікелей компас қосулы — көрсеткі жоғары қарағанша бұрылыңыз",
  noSensor: "Бұл құрылғыда компас сенсоры табылмады. Циферблатта көрсетілген солтүстіктен бұрышты пайдаланыңыз.",
  denied: "Қозғалыс пен бағдарға қолжетімділік рұқсат етілмеді. Оны браузер баптауларында рұқсат етуге болады.",
  desktopHint: "Циферблаттың жоғарғы жағында солтүстік орналасқан. Тікелей компасты пайдалану үшін бұл бетті телефонда ашыңыз.",
  facing: "Сіз құбылаға қарап тұрсыз",
  azimuth: "Бағыты",
  altitude: "Көкжиектен биіктігі",
  qiblaBearing: "Құбыла",
  shadowIntro:
    "Күн сәулесінде тегіс жерге таяқты немесе қаламды тік қойыңыз. Төмендегі уақыттарда оның көлеңкесі құбыла бағытымен дәл сәйкес келеді.",
  shadowToward: "Көлеңке құбылаға қарайды",
  shadowTowardHint: "Көлеңке бойымен, таяқтан оның ұшына қарай бұрылыңыз.",
  shadowAway: "Күн құбыла бағытында тұр",
  shadowAwayHint: "Күнге қарай бұрылыңыз — көлеңке артыңызда, құбыладан қарсы жаққа түседі.",
  shadowNone: "Бүгін бұл жерде күн құбыламен бір сызыққа келмейді. Компасты немесе картаны пайдаланыңыз.",
  shadowPassed: "өтті",
  kaabaFact:
    "Жылына екі рет — шамамен 27–28 мамырда Мекке уақытымен 12:18-де және 15–16 шілдеде 12:27-де — күн Қағбаның дәл төбесінде тұрады, ал күндіз болатын барлық жерде әрбір көлеңке құбыладан қарсы жаққа түседі.",
  mapNote: "Сызық — үлкен шеңбер, яғни Қағбаға баратын ең қысқа жол.",
  calibrate: "Калибрлеу",
  noPlace: "Орналасқан жеріңіз әлі орнатылмаған. Орналасқан жеріңізді пайдаланыңыз немесе қаланы іздеңіз.",
},
"ta": {
  title: "கிப்லா திசை",
  description:
    "நீங்கள் எங்கிருந்தாலும் கிப்லாவைக் கண்டறியுங்கள்: வடக்கிலிருந்து கிப்லா கோணம், கஅபாவுக்கான தூரம், தொலைபேசியில் நேரலைத் திசைகாட்டி, சூரியன், சந்திரன், நிழல்கள் மற்றும் வரைபடம்.",
  tabShadow: "நிழல்",
  startCompass: "நேரலைத் திசைகாட்டியைத் தொடங்கு",
  compassOn: "நேரலைத் திசைகாட்டி இயங்குகிறது — அம்பு மேல்நோக்கிக் காட்டும் வரை திரும்புங்கள்",
  noSensor: "இந்தச் சாதனத்தில் திசைகாட்டி உணரி கிடைக்கவில்லை. வட்டத்தில் காட்டப்படும் வடக்கிலிருந்தான கோணத்தைப் பயன்படுத்துங்கள்.",
  denied: "இயக்கம் மற்றும் திசை அணுகல் மறுக்கப்பட்டது. உங்கள் உலாவி அமைப்புகளில் அனுமதிக்கலாம்.",
  desktopHint: "வட்டத்தின் மேல்பகுதி வடக்கு. நேரலைத் திசைகாட்டியைப் பயன்படுத்த இந்தப் பக்கத்தை உங்கள் தொலைபேசியில் திறவுங்கள்.",
  facing: "நீங்கள் கிப்லாவை நோக்கி இருக்கிறீர்கள்",
  azimuth: "திசை",
  altitude: "அடிவானத்துக்கு மேல் உயரம்",
  qiblaBearing: "கிப்லா",
  shadowIntro:
    "வெயிலில் சமமான தரையில் ஒரு குச்சியை அல்லது பேனாவை நேராக நிறுத்துங்கள். கீழே உள்ள நேரங்களில் அதன் நிழல் கிப்லாவுடன் சரியாகப் பொருந்தும்.",
  shadowToward: "நிழல் கிப்லாவைக் காட்டுகிறது",
  shadowTowardHint: "குச்சியிலிருந்து அதன் நுனி நோக்கி, நிழல் செல்லும் திசையில் முகம் திருப்புங்கள்.",
  shadowAway: "சூரியன் கிப்லா திசையில் உள்ளது",
  shadowAwayHint: "சூரியனை நோக்குங்கள் — நிழல் உங்கள் பின்புறம், கிப்லாவுக்கு எதிர்த்திசையில் விழும்.",
  shadowNone: "இன்று இந்த இடத்தில் சூரியன் கிப்லாவுடன் ஒரே திசையில் அமையவில்லை. திசைகாட்டி அல்லது வரைபடத்தைப் பயன்படுத்துங்கள்.",
  shadowPassed: "கடந்தது",
  kaabaFact:
    "ஆண்டுக்கு இருமுறை — மே 27–28 அன்று மக்கா நேரம் 12:18 மணிக்கும், ஜூலை 15–16 அன்று 12:27 மணிக்கும் — சூரியன் கஅபாவுக்கு நேர் மேலே இருக்கும்; பகலாக இருக்கும் இடங்களிலெல்லாம் ஒவ்வொரு நிழலும் கிப்லாவுக்கு எதிர்த்திசையில் விழும்.",
  mapNote: "இந்தக் கோடு பெருவட்டப் பாதை — கஅபாவுக்கான மிகக் குறுகிய வழி.",
  calibrate: "அளவீடு செய்",
  noPlace: "உங்கள் இருப்பிடம் இன்னும் அமைக்கப்படவில்லை. உங்கள் இருப்பிடத்தைப் பயன்படுத்தவும் அல்லது நகரத்தைத் தேடவும்.",
},
  "gu": {
  title: "કિબલાની દિશા",
  description:
    "તમે જ્યાં પણ હો ત્યાંથી કિબલા શોધો: ઉત્તરથી ખૂણો, કાબા સુધીનું અંતર, તમારા ફોન પર લાઇવ હોકાયંત્ર, સૂર્ય અને ચંદ્ર, પડછાયા અને નકશો.",
  tabShadow: "પડછાયો",
  startCompass: "લાઇવ હોકાયંત્ર શરૂ કરો",
  compassOn: "લાઇવ હોકાયંત્ર ચાલુ — તીર ઉપર તરફ ન આવે ત્યાં સુધી ફરો",
  noSensor: "આ ડિવાઇસ પર હોકાયંત્રનું સેન્સર મળ્યું નથી. ડાયલ પર દર્શાવેલ ઉત્તરથીનો ખૂણો વાપરો.",
  denied: "મોશન અને ઓરિએન્ટેશનની ઍક્સેસ નકારવામાં આવી. તમે તેને તમારા બ્રાઉઝરના સેટિંગ્સમાં મંજૂર કરી શકો છો.",
  desktopHint: "ડાયલની ટોચ પર ઉત્તર છે. લાઇવ હોકાયંત્ર વાપરવા માટે આ પેજ તમારા ફોન પર ખોલો.",
  facing: "તમે કિબલા તરફ મોં રાખ્યું છે",
  azimuth: "દિશા",
  altitude: "ક્ષિતિજથી ઊંચાઈ",
  qiblaBearing: "કિબલા",
  shadowIntro:
    "તડકામાં સપાટ જમીન પર લાકડી અથવા પેનને સીધી ઊભી રાખો. નીચેના સમયે તેનો પડછાયો બરાબર કિબલાની દિશામાં પડે છે.",
  shadowToward: "પડછાયો કિબલા તરફ છે",
  shadowTowardHint: "પડછાયાની દિશામાં, લાકડીથી તેના છેડા તરફ મોં રાખો.",
  shadowAway: "સૂર્ય કિબલાની દિશામાં છે",
  shadowAwayHint: "સૂર્ય તરફ મોં રાખો — પડછાયો તમારી પાછળ, કિબલાની વિરુદ્ધ દિશામાં છે.",
  shadowNone: "આજે આ સ્થળે સૂર્ય કિબલા સાથે એક રેખામાં આવતો નથી. હોકાયંત્ર અથવા નકશો વાપરો.",
  shadowPassed: "વીતી ગયો",
  kaabaFact:
    "વર્ષમાં બે વાર — લગભગ 27–28 મે એ 12:18 વાગ્યે અને 15–16 જુલાઈએ 12:27 વાગ્યે (મક્કાના સમય મુજબ) — સૂર્ય બરાબર કાબાની ઉપર હોય છે, અને જ્યાં દિવસ હોય ત્યાં દરેક પડછાયો કિબલાની વિરુદ્ધ દિશામાં પડે છે.",
  mapNote: "આ રેખા મહાવૃત્ત છે — કાબા સુધીનો સૌથી ટૂંકો માર્ગ.",
  calibrate: "કેલિબ્રેટ કરો",
  noPlace: "તમારું સ્થાન હજુ નક્કી થયું નથી. તમારું સ્થાન વાપરો અથવા તમારું શહેર શોધો.",
  },
  my: {
  title: "ကိဗ်လာ ဦးတည်ရာ",
  description:
    "သင်ရှိရာနေရာမှ ကိဗ်လာကို ရှာပါ — မြောက်အရပ်မှ ထောင့်အတိုင်းအတာ၊ ကအ်ဗဟ်သို့ အကွာအဝေး၊ သင့်ဖုန်းပေါ်ရှိ တိုက်ရိုက်သံလိုက်အိမ်မြှောင်၊ နေနှင့်လ၊ အရိပ်များနှင့် မြေပုံတို့ပါဝင်သည်။",
  tabShadow: "အရိပ်",
  startCompass: "တိုက်ရိုက်သံလိုက်အိမ်မြှောင် စတင်ရန်",
  compassOn: "တိုက်ရိုက်သံလိုက်အိမ်မြှောင် ဖွင့်ထားသည် — မြှားသည် အပေါ်သို့ ညွှန်သည်အထိ လှည့်ပါ",
  noSensor: "ဤစက်ပစ္စည်းတွင် သံလိုက်အိမ်မြှောင် အာရုံခံကိရိယာ မတွေ့ပါ။ ဒိုင်ခွက်ပေါ်တွင် ပြထားသော မြောက်အရပ်မှ ထောင့်ကို အသုံးပြုပါ။",
  denied: "လှုပ်ရှားမှုနှင့် ဦးတည်ရာ အသုံးပြုခွင့်ကို ပယ်ချခံရသည်။ သင်၏ ဘရောက်ဇာ ဆက်တင်များတွင် ခွင့်ပြုနိုင်ပါသည်။",
  desktopHint: "မြောက်အရပ်သည် ဒိုင်ခွက်၏ အပေါ်ဘက်တွင် ရှိသည်။ တိုက်ရိုက်သံလိုက်အိမ်မြှောင်ကို အသုံးပြုရန် ဤစာမျက်နှာကို သင့်ဖုန်းတွင် ဖွင့်ပါ။",
  facing: "သင်သည် ကိဗ်လာဘက်သို့ မျက်နှာမူနေသည်",
  azimuth: "ဦးတည်ရာ",
  altitude: "မိုးကုပ်စက်ဝိုင်းအထက် အမြင့်",
  qiblaBearing: "ကိဗ်လာ",
  shadowIntro:
    "နေရောင်အောက်၌ ညီညာသောမြေပြင်ပေါ်တွင် တုတ်တစ်ချောင်း သို့မဟုတ် ဘောပင်တစ်ချောင်းကို ဒေါင်လိုက်စိုက်ထားပါ။ အောက်ပါအချိန်များတွင် ၎င်း၏အရိပ်သည် ကိဗ်လာနှင့် တိတိကျကျ တန်းညီသည်။",
  shadowToward: "အရိပ်သည် ကိဗ်လာကို ညွှန်သည်",
  shadowTowardHint: "တုတ်မှ ထိပ်ဖက်သို့ အရိပ်အတိုင်း မျက်နှာမူပါ။",
  shadowAway: "နေသည် ကိဗ်လာဦးတည်ရာတွင် ရှိသည်",
  shadowAwayHint: "နေဘက်သို့ မျက်နှာမူပါ — အရိပ်သည် သင့်နောက်ဘက်၊ ကိဗ်လာနှင့် ဆန့်ကျင်ဘက်သို့ ညွှန်သည်။",
  shadowNone: "ယနေ့ ဤတည်နေရာတွင် နေသည် ကိဗ်လာနှင့် တန်းမညီပါ။ သံလိုက်အိမ်မြှောင် သို့မဟုတ် မြေပုံကို အသုံးပြုပါ။",
  shadowPassed: "ကျော်လွန်ပြီး",
  kaabaFact:
    "တစ်နှစ်လျှင် နှစ်ကြိမ် — မေလ 27–28 ရက်ခန့် မက္ကာအချိန် 12:18 နှင့် ဇူလိုင်လ 15–16 ရက်ခန့် မက္ကာအချိန် 12:27 — နေသည် ကအ်ဗဟ်၏ တည့်တည့်အပေါ်တွင် ရှိပြီး နေ့အချိန်ဖြစ်သည့် နေရာတိုင်းတွင် အရိပ်အားလုံးသည် ကိဗ်လာနှင့် ဆန့်ကျင်ဘက်သို့ ညွှန်သည်။",
  mapNote: "ထိုမျဉ်းသည် စက်ဝိုင်းကြီးလမ်းကြောင်း ဖြစ်သည် — ကအ်ဗဟ်သို့ အတိုဆုံးလမ်းကြောင်း။",
  calibrate: "ချိန်ညှိရန်",
  noPlace: "သင်၏ တည်နေရာကို မသတ်မှတ်ရသေးပါ။ သင်၏ တည်နေရာကို အသုံးပြုပါ သို့မဟုတ် သင့်မြို့ကို ရှာဖွေပါ။",
  },
};
