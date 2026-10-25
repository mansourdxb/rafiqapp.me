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

export const qiblaMsg: Record<Locale, QiblaMsg> = { ar, en, ur, fa, ru, ms, tr, id, hi, bn, ha, fr };
