// Ramadan imsakiya page strings. Title, column names, Imsak/Iftar come from the app
// (appT: more.imsakiya, alm.imsakiya.*).
import type { Locale } from "../config";

export type ImsakiyaMsg = {
  description: string;
  theme: string;
  themes: { night: string; sunset: string; day: string };
  imsakNote: string;
  daysLeft: string;
  started: string;
};

const en: ImsakiyaMsg = {
  description:
    "Ramadan imsakiya for your city: Imsak, Fajr, Dhuhr, Asr, Maghrib (iftar) and Isha for every day of Ramadan, ready to print.",
  theme: "Colour",
  themes: { night: "Night", sunset: "Sunset", day: "Day" },
  imsakNote: "Imsak is shown 10 minutes before Fajr, as a precaution; fasting begins at Fajr.",
  daysLeft: "Ramadan begins in {{n}} days",
  started: "Ramadan Mubarak",
};

const ar: ImsakiyaMsg = {
  description: "إمساكية رمضان لمدينتك: الإمساك والفجر والظهر والعصر والمغرب (الإفطار) والعشاء لكل أيام رمضان، جاهزة للطباعة.",
  theme: "اللون",
  themes: { night: "الليل", sunset: "الغروب", day: "النهار" },
  imsakNote: "يُعرض الإمساك قبل الفجر بعشر دقائق احتياطًا، ويبدأ الصيام من طلوع الفجر.",
  daysLeft: "يبدأ رمضان بعد {{n}} يومًا",
  started: "رمضان مبارك",
};

const ur: ImsakiyaMsg = {
  description: "آپ کے شہر کے لیے رمضان امساکیہ: رمضان کے ہر دن کے لیے سحری، فجر، ظہر، عصر، مغرب (افطار) اور عشاء، پرنٹ کے لیے تیار۔",
  theme: "رنگ",
  themes: { night: "رات", sunset: "غروب", day: "دن" },
  imsakNote: "احتیاطاً سحری کا اختتام فجر سے 10 منٹ پہلے دکھایا گیا ہے؛ روزہ فجر سے شروع ہوتا ہے۔",
  daysLeft: "رمضان {{n}} دن میں شروع ہو گا",
  started: "رمضان مبارک",
};

const fa: ImsakiyaMsg = {
  description: "امساکیهٔ رمضان برای شهر شما: امساک، صبح، ظهر، عصر، مغرب (افطار) و عشا برای همهٔ روزهای رمضان، آمادهٔ چاپ.",
  theme: "رنگ",
  themes: { night: "شب", sunset: "غروب", day: "روز" },
  imsakNote: "امساک از باب احتیاط ۱۰ دقیقه پیش از اذان صبح نشان داده شده است؛ روزه از اذان صبح آغاز می‌شود.",
  daysLeft: "رمضان {{n}} روز دیگر آغاز می‌شود",
  started: "رمضان مبارک",
};

const ru: ImsakiyaMsg = {
  description:
    "Имсакия Рамадана для вашего города: имсак, фаджр, зухр, аср, магриб (ифтар) и иша на каждый день Рамадана, готовая к печати.",
  theme: "Цвет",
  themes: { night: "Ночь", sunset: "Закат", day: "День" },
  imsakNote: "Имсак указан за 10 минут до фаджра из предосторожности; пост начинается с фаджра.",
  daysLeft: "До Рамадана дней: {{n}}",
  started: "Рамадан мубарак",
};

const ms: ImsakiyaMsg = {
  description:
    "Imsakiah Ramadan untuk bandar anda: Imsak, Subuh, Zohor, Asar, Maghrib (berbuka) dan Isyak bagi setiap hari Ramadan, sedia untuk dicetak.",
  theme: "Warna",
  themes: { night: "Malam", sunset: "Senja", day: "Siang" },
  imsakNote: "Imsak ditunjukkan 10 minit sebelum Subuh sebagai langkah berjaga-jaga; puasa bermula pada waktu Subuh.",
  daysLeft: "Ramadan bermula dalam {{n}} hari",
  started: "Ramadan Mubarak",
};

const tr: ImsakiyaMsg = {
  description:
    "Şehriniz için Ramazan imsakiyesi: Ramazan'ın her günü için imsak, sabah, öğle, ikindi, akşam (iftar) ve yatsı vakitleri, yazdırmaya hazır.",
  theme: "Renk",
  themes: { night: "Gece", sunset: "Gün batımı", day: "Gündüz" },
  imsakNote: "İmsak, ihtiyaten sabah vaktinden 10 dakika önce gösterilir; oruç sabah vaktiyle başlar.",
  daysLeft: "Ramazan'a {{n}} gün kaldı",
  started: "Hayırlı Ramazanlar",
};

const id: ImsakiyaMsg = {
  description:
    "Imsakiah Ramadan untuk kota Anda: Imsak, Subuh, Zuhur, Asar, Magrib (berbuka), dan Isya untuk setiap hari Ramadan, siap dicetak.",
  theme: "Warna",
  themes: { night: "Malam", sunset: "Senja", day: "Siang" },
  imsakNote: "Imsak ditampilkan 10 menit sebelum Subuh sebagai kehati-hatian; puasa dimulai saat Subuh.",
  daysLeft: "Ramadan dimulai {{n}} hari lagi",
  started: "Ramadan Mubarak",
};

const hi: ImsakiyaMsg = {
  description:
    "आपके शहर के लिए रमज़ान इम्साकिया: रमज़ान के हर दिन के लिए इम्साक, फ़ज्र, ज़ुहर, अस्र, मग़रिब (इफ़्तार) और इशा, प्रिंट के लिए तैयार।",
  theme: "रंग",
  themes: { night: "रात", sunset: "सूर्यास्त", day: "दिन" },
  imsakNote: "एहतियात के तौर पर इम्साक फ़ज्र से 10 मिनट पहले दिखाया गया है; रोज़ा फ़ज्र से शुरू होता है।",
  daysLeft: "रमज़ान {{n}} दिन में शुरू होगा",
  started: "रमज़ान मुबारक",
};

const bn: ImsakiyaMsg = {
  description:
    "আপনার শহরের রমজানের ইমসাকিয়া (সেহরি-ইফতারের সময়সূচি): রমজানের প্রতিদিনের ইমসাক, ফজর, জোহর, আসর, মাগরিব (ইফতার) ও এশা, প্রিন্টের জন্য প্রস্তুত।",
  theme: "রং",
  themes: { night: "রাত", sunset: "সূর্যাস্ত", day: "দিন" },
  imsakNote: "সতর্কতার জন্য ইমসাক ফজরের 10 মিনিট আগে দেখানো হয়েছে; রোজা শুরু হয় ফজর থেকে।",
  daysLeft: "রমজান শুরু হতে আর {{n}} দিন",
  started: "রমজান মোবারক",
};

const ha: ImsakiyaMsg = {
  description:
    "Jadawalin Ramadan (imsakiya) na garinku: Imsak, Asuba, Azahar, La'asar, Magariba (buɗa baki) da Isha na kowace rana ta Ramadan, a shirye don bugawa.",
  theme: "Launi",
  themes: { night: "Dare", sunset: "Faɗuwar rana", day: "Rana" },
  imsakNote: "Ana nuna Imsak minti 10 kafin Asuba, don taka-tsantsan; azumi yana farawa ne da Asuba.",
  daysLeft: "Ramadan zai fara nan da kwanaki {{n}}",
  started: "Barka da Ramadan",
};

const fr: ImsakiyaMsg = {
  description:
    "Imsakiya du Ramadan pour votre ville : imsak, Fajr, Dhuhr, Asr, Maghrib (iftar) et Isha pour chaque jour du Ramadan, prête à imprimer.",
  theme: "Couleur",
  themes: { night: "Nuit", sunset: "Coucher du soleil", day: "Jour" },
  imsakNote: "L’imsak est indiqué 10 minutes avant le Fajr, par précaution ; le jeûne commence au Fajr.",
  daysLeft: "Le Ramadan commence dans {{n}} jours",
  started: "Ramadan Moubarak",
};

const zh: ImsakiyaMsg = {
  description:
    "您所在城市的斋月时间表：斋月每天的止斋时间（伊姆萨克）、晨礼、晌礼、晡礼、昏礼（开斋）和宵礼，可直接打印。",
  theme: "颜色",
  themes: { night: "夜晚", sunset: "日落", day: "白天" },
  imsakNote: "为谨慎起见，止斋时间（伊姆萨克）显示为晨礼前 10 分钟；斋戒从晨礼开始。",
  daysLeft: "距斋月还有 {{n}} 天",
  started: "斋月吉庆",
};

export const imsakiyaMsg: Record<Locale, ImsakiyaMsg> = { ar, en, ur, fa, ru, ms, tr, id, hi, bn, ha, fr, zh };
