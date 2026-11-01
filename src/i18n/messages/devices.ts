// Home section "in your car and on your wrist": the watch and car platforms the app runs on.
// The heading is the site name followed by `title` (shown highlighted).
import type { Locale } from "../config";

export type Platform = "appleWatch" | "wearOs" | "huaweiWatch" | "carPlay" | "androidAuto";

export type Devices = {
  title: string;
  sub: string;
  wrist: string;
  car: string;
  names: Record<Platform, string>;
  text: Record<Platform, string>;
};

const NAMES: Record<Platform, string> = {
  appleWatch: "Apple Watch",
  wearOs: "Wear OS",
  huaweiWatch: "HUAWEI WATCH",
  carPlay: "Apple CarPlay",
  androidAuto: "Android Auto",
};

export const devices: Record<Locale, Devices> = {
  en: {
    title: "in your car and on your wrist",
    sub: "Prayer times, the Qur'an and adhkar go with you — on your smartwatch and on your car's screen.",
    wrist: "On your wrist",
    car: "In your car",
    names: NAMES,
    text: {
      appleWatch: "Prayer times with a countdown, tasbeeh and Qibla — synced with your iPhone.",
      wearOs: "Prayer times, Qibla, tasbeeh and adhkar on your smartwatch.",
      huaweiWatch: "Prayer times, tasbeeh, adhkar, Qibla and the ayah of the day.",
      carPlay: "Listen to the Qur'an and adhkar and see prayer times on your car's screen.",
      androidAuto: "Qur'an recitation, adhkar, tasbeeh and prayer times while you drive.",
    },
  },
  ar: {
    title: "في سيارتك وعلى معصمك",
    sub: "مواقيت الصلاة والقرآن والأذكار ترافقك أينما كنت — على ساعتك الذكية وعلى شاشة سيارتك.",
    wrist: "على معصمك",
    car: "في سيارتك",
    names: NAMES,
    text: {
      appleWatch: "مواقيت الصلاة مع العد التنازلي، والسبحة والقبلة — متزامنة مع جهاز iPhone.",
      wearOs: "مواقيت الصلاة والقبلة والسبحة والأذكار على ساعتك الذكية.",
      huaweiWatch: "مواقيت الصلاة والسبحة والأذكار والقبلة وآية اليوم.",
      carPlay: "استمع إلى القرآن والأذكار، وتابع مواقيت الصلاة على شاشة سيارتك.",
      androidAuto: "تلاوة القرآن والأذكار والسبحة ومواقيت الصلاة أثناء القيادة.",
    },
  },
  ur: {
    title: "آپ کی گاڑی میں اور کلائی پر",
    sub: "نماز کے اوقات، قرآن اور اذکار ہر جگہ آپ کے ساتھ — اسمارٹ واچ پر بھی اور گاڑی کی اسکرین پر بھی۔",
    wrist: "آپ کی کلائی پر",
    car: "آپ کی گاڑی میں",
    names: NAMES,
    text: {
      appleWatch: "نماز کے اوقات اور الٹی گنتی، تسبیح اور قبلہ — آپ کے iPhone کے ساتھ ہم آہنگ۔",
      wearOs: "نماز کے اوقات، قبلہ، تسبیح اور اذکار آپ کی اسمارٹ واچ پر۔",
      huaweiWatch: "نماز کے اوقات، تسبیح، اذکار، قبلہ اور آج کی آیت۔",
      carPlay: "گاڑی کی اسکرین پر قرآن اور اذکار سنیں اور نماز کے اوقات دیکھیں۔",
      androidAuto: "ڈرائیونگ کے دوران تلاوتِ قرآن، اذکار، تسبیح اور نماز کے اوقات۔",
    },
  },
  fa: {
    title: "در خودرو و روی مچ دست شما",
    sub: "اوقات نماز، قرآن و اذکار همه‌جا همراه شماست — روی ساعت هوشمند و صفحهٔ خودرو.",
    wrist: "روی مچ دست",
    car: "در خودرو",
    names: NAMES,
    text: {
      appleWatch: "اوقات نماز با شمارش معکوس، تسبیح و قبله — همگام با iPhone شما.",
      wearOs: "اوقات نماز، قبله، تسبیح و اذکار روی ساعت هوشمند شما.",
      huaweiWatch: "اوقات نماز، تسبیح، اذکار، قبله و آیهٔ روز.",
      carPlay: "قرآن و اذکار را بشنوید و اوقات نماز را روی صفحهٔ خودرو ببینید.",
      androidAuto: "تلاوت قرآن، اذکار، تسبیح و اوقات نماز هنگام رانندگی.",
    },
  },
  ru: {
    title: "в вашей машине и на запястье",
    sub: "Время намаза, Коран и азкары всегда с вами — на смарт-часах и на экране автомобиля.",
    wrist: "На запястье",
    car: "В машине",
    names: NAMES,
    text: {
      appleWatch: "Время намаза с обратным отсчётом, тасбих и кибла — синхронно с iPhone.",
      wearOs: "Время намаза, кибла, тасбих и азкары на ваших смарт-часах.",
      huaweiWatch: "Время намаза, тасбих, азкары, кибла и аят дня.",
      carPlay: "Слушайте Коран и азкары и смотрите время намаза на экране автомобиля.",
      androidAuto: "Чтение Корана, азкары, тасбих и время намаза в дороге.",
    },
  },
  ms: {
    title: "di dalam kereta dan di pergelangan tangan anda",
    sub: "Waktu solat, al-Quran dan zikir sentiasa bersama anda — pada jam tangan pintar dan skrin kereta anda.",
    wrist: "Di pergelangan tangan",
    car: "Di dalam kereta",
    names: NAMES,
    text: {
      appleWatch: "Waktu solat dengan kiraan detik, tasbih dan kiblat — diselaraskan dengan iPhone anda.",
      wearOs: "Waktu solat, kiblat, tasbih dan zikir pada jam tangan pintar anda.",
      huaweiWatch: "Waktu solat, tasbih, zikir, kiblat dan ayat hari ini.",
      carPlay: "Dengar al-Quran dan zikir serta lihat waktu solat pada skrin kereta anda.",
      androidAuto: "Bacaan al-Quran, zikir, tasbih dan waktu solat semasa memandu.",
    },
  },
  tr: {
    title: "arabanızda ve bileğinizde",
    sub: "Namaz vakitleri, Kur'an ve zikirler her yerde yanınızda — akıllı saatinizde ve araç ekranınızda.",
    wrist: "Bileğinizde",
    car: "Arabanızda",
    names: NAMES,
    text: {
      appleWatch: "Geri sayımlı namaz vakitleri, tesbih ve kıble — iPhone'unuzla senkronize.",
      wearOs: "Akıllı saatinizde namaz vakitleri, kıble, tesbih ve zikirler.",
      huaweiWatch: "Namaz vakitleri, tesbih, zikirler, kıble ve günün ayeti.",
      carPlay: "Araç ekranınızda Kur'an ve zikir dinleyin, namaz vakitlerini görün.",
      androidAuto: "Sürüş sırasında Kur'an tilaveti, zikirler, tesbih ve namaz vakitleri.",
    },
  },
  id: {
    title: "di mobil dan di pergelangan tangan Anda",
    sub: "Waktu salat, Al-Qur'an, dan zikir selalu menemani Anda — di jam tangan pintar dan layar mobil.",
    wrist: "Di pergelangan tangan",
    car: "Di mobil",
    names: NAMES,
    text: {
      appleWatch: "Waktu salat dengan hitung mundur, tasbih, dan kiblat — tersinkron dengan iPhone Anda.",
      wearOs: "Waktu salat, kiblat, tasbih, dan zikir di jam tangan pintar Anda.",
      huaweiWatch: "Waktu salat, tasbih, zikir, kiblat, dan ayat hari ini.",
      carPlay: "Dengarkan Al-Qur'an dan zikir serta lihat waktu salat di layar mobil Anda.",
      androidAuto: "Tilawah Al-Qur'an, zikir, tasbih, dan waktu salat saat berkendara.",
    },
  },
  hi: {
    title: "आपकी कार में और आपकी कलाई पर",
    sub: "नमाज़ के समय, क़ुरआन और अज़कार हर जगह आपके साथ — स्मार्टवॉच पर भी और कार की स्क्रीन पर भी।",
    wrist: "आपकी कलाई पर",
    car: "आपकी कार में",
    names: NAMES,
    text: {
      appleWatch: "उलटी गिनती के साथ नमाज़ के समय, तस्बीह और क़िबला — आपके iPhone के साथ सिंक।",
      wearOs: "आपकी स्मार्टवॉच पर नमाज़ के समय, क़िबला, तस्बीह और अज़कार।",
      huaweiWatch: "नमाज़ के समय, तस्बीह, अज़कार, क़िबला और आज की आयत।",
      carPlay: "कार की स्क्रीन पर क़ुरआन और अज़कार सुनें और नमाज़ के समय देखें।",
      androidAuto: "गाड़ी चलाते समय क़ुरआन की तिलावत, अज़कार, तस्बीह और नमाज़ के समय।",
    },
  },
  bn: {
    title: "আপনার গাড়িতে ও কবজিতে",
    sub: "নামাজের সময়, কুরআন ও জিকির সব জায়গায় আপনার সঙ্গে — স্মার্টওয়াচে এবং গাড়ির স্ক্রিনে।",
    wrist: "আপনার কবজিতে",
    car: "আপনার গাড়িতে",
    names: NAMES,
    text: {
      appleWatch: "কাউন্টডাউনসহ নামাজের সময়, তাসবিহ ও কিবলা — আপনার iPhone-এর সঙ্গে সিঙ্ক।",
      wearOs: "আপনার স্মার্টওয়াচে নামাজের সময়, কিবলা, তাসবিহ ও জিকির।",
      huaweiWatch: "নামাজের সময়, তাসবিহ, জিকির, কিবলা ও আজকের আয়াত।",
      carPlay: "গাড়ির স্ক্রিনে কুরআন ও জিকির শুনুন, নামাজের সময় দেখুন।",
      androidAuto: "গাড়ি চালানোর সময় কুরআন তিলাওয়াত, জিকির, তাসবিহ ও নামাজের সময়।",
    },
  },
  ha: {
    title: "a cikin motarka da kuma a wuyan hannunka",
    sub: "Lokutan sallah, Alƙur'ani da zikiri suna tare da kai ko'ina — a agogon zamani da allon motarka.",
    wrist: "A wuyan hannunka",
    car: "A cikin motarka",
    names: NAMES,
    text: {
      appleWatch: "Lokutan sallah tare da ƙirgar lokaci, tasbihi da alƙibla — tare da iPhone ɗinka.",
      wearOs: "Lokutan sallah, alƙibla, tasbihi da zikiri a agogon zamaninka.",
      huaweiWatch: "Lokutan sallah, tasbihi, zikiri, alƙibla da ayar yau.",
      carPlay: "Saurari Alƙur'ani da zikiri, ka ga lokutan sallah a allon motarka.",
      androidAuto: "Karatun Alƙur'ani, zikiri, tasbihi da lokutan sallah yayin tuƙi.",
    },
  },
  fr: {
    title: "dans votre voiture et à votre poignet",
    sub: "Horaires de prière, Coran et adhkar vous accompagnent partout — sur votre montre connectée et l'écran de votre voiture.",
    wrist: "À votre poignet",
    car: "Dans votre voiture",
    names: NAMES,
    text: {
      appleWatch: "Horaires de prière avec compte à rebours, tasbih et qibla — synchronisés avec votre iPhone.",
      wearOs: "Horaires de prière, qibla, tasbih et adhkar sur votre montre connectée.",
      huaweiWatch: "Horaires de prière, tasbih, adhkar, qibla et le verset du jour.",
      carPlay: "Écoutez le Coran et les adhkar et consultez les horaires de prière sur l'écran de votre voiture.",
      androidAuto: "Récitation du Coran, adhkar, tasbih et horaires de prière pendant que vous conduisez.",
    },
  },
  zh: {
    title: "在您的车上，也在您的手腕上",
    sub: "礼拜时间、《古兰经》和记念词随时相伴——在智能手表上，也在汽车屏幕上。",
    wrist: "在您的手腕上",
    car: "在您的车上",
    names: { ...NAMES, huaweiWatch: "华为手表" },
    text: {
      appleWatch: "礼拜时间与倒计时、赞念和朝向——与您的 iPhone 同步。",
      wearOs: "在智能手表上查看礼拜时间、朝向、赞念和记念词。",
      huaweiWatch: "礼拜时间、赞念、记念词、朝向和每日经文。",
      carPlay: "在汽车屏幕上收听《古兰经》和记念词，查看礼拜时间。",
      androidAuto: "驾车时收听《古兰经》诵读和记念词，还可赞念并查看礼拜时间。",
    },
  },
  ps: {
    title: "ستاسو په موټر کې او ستاسو په لاس",
    sub: "د لمانځه وختونه، قرآن او اذکار تل له تاسو سره دي — ستاسو په هوښیار لاسي ساعت او د موټر په پرده.",
    wrist: "ستاسو په لاس",
    car: "ستاسو په موټر کې",
    names: NAMES,
    text: {
      appleWatch: "د لمانځه وختونه له شاتنۍ شمېرنې سره، تسبیح او قبله — ستاسو له iPhone سره همغږي.",
      wearOs: "د لمانځه وختونه، قبله، تسبیح او اذکار ستاسو په هوښیار ساعت.",
      huaweiWatch: "د لمانځه وختونه، تسبیح، اذکار، قبله او د ورځې آیت.",
      carPlay: "قرآن او اذکار واورئ او د لمانځه وختونه د خپل موټر په پرده وګورئ.",
      androidAuto: "د قرآن تلاوت، اذکار، تسبیح او د لمانځه وختونه د موټر چلولو پر مهال.",
    },
  },
  pa: {
    title: "ਤੁਹਾਡੀ ਕਾਰ ਵਿੱਚ ਅਤੇ ਤੁਹਾਡੇ ਗੁੱਟ 'ਤੇ",
    sub: "ਨਮਾਜ਼ ਦੇ ਸਮੇਂ, ਕੁਰਆਨ ਅਤੇ ਅਜ਼ਕਾਰ ਤੁਹਾਡੇ ਨਾਲ ਰਹਿੰਦੇ ਹਨ — ਤੁਹਾਡੀ ਸਮਾਰਟਵਾਚ 'ਤੇ ਅਤੇ ਤੁਹਾਡੀ ਕਾਰ ਦੀ ਸਕਰੀਨ 'ਤੇ।",
    wrist: "ਤੁਹਾਡੇ ਗੁੱਟ 'ਤੇ",
    car: "ਤੁਹਾਡੀ ਕਾਰ ਵਿੱਚ",
    names: NAMES,
    text: {
      appleWatch: "ਉਲਟੀ ਗਿਣਤੀ ਨਾਲ ਨਮਾਜ਼ ਦੇ ਸਮੇਂ, ਤਸਬੀਹ ਅਤੇ ਕਿਬਲਾ — ਤੁਹਾਡੇ iPhone ਨਾਲ ਸਿੰਕ।",
      wearOs: "ਤੁਹਾਡੀ ਸਮਾਰਟਵਾਚ 'ਤੇ ਨਮਾਜ਼ ਦੇ ਸਮੇਂ, ਕਿਬਲਾ, ਤਸਬੀਹ ਅਤੇ ਅਜ਼ਕਾਰ।",
      huaweiWatch: "ਨਮਾਜ਼ ਦੇ ਸਮੇਂ, ਤਸਬੀਹ, ਅਜ਼ਕਾਰ, ਕਿਬਲਾ ਅਤੇ ਅੱਜ ਦੀ ਆਇਤ।",
      carPlay: "ਕੁਰਆਨ ਅਤੇ ਅਜ਼ਕਾਰ ਸੁਣੋ ਅਤੇ ਆਪਣੀ ਕਾਰ ਦੀ ਸਕਰੀਨ 'ਤੇ ਨਮਾਜ਼ ਦੇ ਸਮੇਂ ਵੇਖੋ।",
      androidAuto: "ਗੱਡੀ ਚਲਾਉਂਦੇ ਹੋਏ ਕੁਰਆਨ ਦੀ ਤਿਲਾਵਤ, ਅਜ਼ਕਾਰ, ਤਸਬੀਹ ਅਤੇ ਨਮਾਜ਼ ਦੇ ਸਮੇਂ।",
    },
  },
  pnb: {
    title: "تہاڈی گڈی وچ تے تہاڈے گٹ اُتے",
    sub: "نماز دے ویلے، قرآن تے اذکار تہاڈے نال رہندے نیں — تہاڈی سمارٹ واچ تے تہاڈی گڈی دی سکرین اُتے۔",
    wrist: "تہاڈے گٹ اُتے",
    car: "تہاڈی گڈی وچ",
    names: NAMES,
    text: {
      appleWatch: "الٹی گنتی دے نال نماز دے ویلے، تسبیح تے قبلہ — تہاڈے iPhone نال ہم آہنگ۔",
      wearOs: "نماز دے ویلے، قبلہ، تسبیح تے اذکار تہاڈی سمارٹ واچ اُتے۔",
      huaweiWatch: "نماز دے ویلے، تسبیح، اذکار، قبلہ تے اج دی آیت۔",
      carPlay: "قرآن تے اذکار سݨو تے نماز دے ویلے اپنی گڈی دی سکرین اُتے ویکھو۔",
      androidAuto: "گڈی چلاندیاں قرآن دی تلاوت، اذکار، تسبیح تے نماز دے ویلے۔",
    },
  },
  uz: {
    title: "avtomobilingizda va bilagingizda",
    sub: "Namoz vaqtlari, Qurʼon va zikrlar siz bilan birga — aqlli soatingizda va avtomobilingiz ekranida.",
    wrist: "Bilagingizda",
    car: "Avtomobilingizda",
    names: NAMES,
    text: {
      appleWatch: "Teskari sanoq bilan namoz vaqtlari, tasbeh va qibla — iPhone bilan sinxronlangan.",
      wearOs: "Aqlli soatingizda namoz vaqtlari, qibla, tasbeh va zikrlar.",
      huaweiWatch: "Namoz vaqtlari, tasbeh, zikrlar, qibla va kun oyati.",
      carPlay: "Avtomobilingiz ekranida Qurʼon va zikrlarni tinglang, namoz vaqtlarini koʻring.",
      androidAuto: "Haydash paytida Qurʼon tilovati, zikrlar, tasbeh va namoz vaqtlari.",
    },
  },
  "uz-Cyrl": {
    title: "автомобилингизда ва билагингизда",
    sub: "Намоз вақтлари, Қуръон ва зикрлар сиз билан бирга — ақлли соатингизда ва автомобилингиз экранида.",
    wrist: "Билагингизда",
    car: "Автомобилингизда",
    names: NAMES,
    text: {
      appleWatch: "Тескари саноқ билан намоз вақтлари, тасбеҳ ва қибла — iPhone билан синхронланган.",
      wearOs: "Ақлли соатингизда намоз вақтлари, қибла, тасбеҳ ва зикрлар.",
      huaweiWatch: "Намоз вақтлари, тасбеҳ, зикрлар, қибла ва кун ояти.",
      carPlay: "Автомобилингиз экранида Қуръон ва зикрларни тингланг, намоз вақтларини кўринг.",
      androidAuto: "Ҳайдаш пайтида Қуръон тиловати, зикрлар, тасбеҳ ва намоз вақтлари.",
    },
  },
  so: {
    title: "baabuurkaaga iyo curcurkaaga",
    sub: "Waqtiyada salaadda, Qur’aanka iyo adkaarta way kula socdaan — saacaddaada casriga ah iyo shaashadda baabuurkaaga.",
    wrist: "Curcurkaaga",
    car: "Baabuurkaaga",
    names: NAMES,
    text: {
      appleWatch: "Waqtiyada salaadda oo leh tirin-dhimis, tasbiix iyo Qiblada — oo la jaanqaadaya iPhone-kaaga.",
      wearOs: "Waqtiyada salaadda, Qiblada, tasbiixda iyo adkaarta saacaddaada casriga ah.",
      huaweiWatch: "Waqtiyada salaadda, tasbiixda, adkaarta, Qiblada iyo aayadda maalinta.",
      carPlay: "Dhegayso Qur’aanka iyo adkaarta oo ku arag waqtiyada salaadda shaashadda baabuurkaaga.",
      androidAuto: "Tilaawada Qur’aanka, adkaarta, tasbiixda iyo waqtiyada salaadda inta aad wadid.",
    },
  },
};
