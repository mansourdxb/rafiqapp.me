// 99 Names pages (/names/, /names/[n]/). Title/search follow the app (asmaAlHusna.*).
import type { Locale } from "../config";

export type NamesMessages = {
  title: string;
  /** Reference of the verse shown under the title (Arabic text of 7:180 for every language). */
  verseRef: string;
  description: string;
  search: string;
  noResults: string;
  meaning: string;
  explanation: string;
  inQuran: string;
  /** Shown when the meaning is in English because the app has no translation in this language. */
  englishNote: string;
  prev: string;
  next: string;
  all: string;
  /** "Name {n} of 99" */
  nth: string;
};

const ar: NamesMessages = {
  title: "أسماء الله الحسنى",
  verseRef: "الأعراف: ١٨٠",
  description: "أسماء الله الحسنى التسعة والتسعون مع معنى كل اسم وشرحه ومواضع وروده في القرآن الكريم.",
  search: "بحث في الأسماء...",
  noResults: "لا توجد نتائج",
  meaning: "المعنى",
  explanation: "الشرح",
  inQuran: "ورد في القرآن",
  englishNote: "",
  prev: "الاسم السابق",
  next: "الاسم التالي",
  all: "كل الأسماء",
  nth: "الاسم {n} من ٩٩",
};

const en: NamesMessages = {
  title: "99 Names of Allah",
  verseRef: "Al-A'raf 7:180",
  description: "The 99 Beautiful Names of Allah (Asma ul-Husna) with the meaning and explanation of each name and where it appears in the Qur'an.",
  search: "Search names...",
  noResults: "No results found",
  meaning: "Meaning",
  explanation: "Explanation",
  inQuran: "In the Qur'an",
  englishNote: "",
  prev: "Previous name",
  next: "Next name",
  all: "All names",
  nth: "Name {n} of 99",
};

const ur: NamesMessages = {
  title: "اللہ کے ۹۹ نام",
  verseRef: "الاعراف ۷:۱۸۰",
  description: "اللہ تعالیٰ کے ننانوے اسمائے حسنیٰ، ہر نام کا معنی، وضاحت اور قرآن مجید میں اس کے مقامات۔",
  search: "نام تلاش کریں...",
  noResults: "کوئی نتائج نہیں ملے",
  meaning: "معنی",
  explanation: "وضاحت",
  inQuran: "قرآن میں",
  englishNote: "معنی اور وضاحت انگریزی میں دکھائی گئی ہے",
  prev: "پچھلا نام",
  next: "اگلا نام",
  all: "تمام نام",
  nth: "۹۹ میں سے نام نمبر {n}",
};

const fa: NamesMessages = {
  title: "نام‌های نیکوی خداوند",
  verseRef: "اعراف ۷:۱۸۰",
  description: "نود و نه نام نیکوی خداوند همراه با معنا و شرح هر نام و جایگاه آن در قرآن کریم.",
  search: "جستجوی نام‌ها...",
  noResults: "نتیجه‌ای یافت نشد",
  meaning: "معنا",
  explanation: "شرح",
  inQuran: "در قرآن",
  englishNote: "معنا و شرح به زبان انگلیسی نمایش داده شده است",
  prev: "نام قبلی",
  next: "نام بعدی",
  all: "همه‌ی نام‌ها",
  nth: "نام {n} از ۹۹",
};

const ru: NamesMessages = {
  title: "99 имён Аллаха",
  verseRef: "Аль-Араф 7:180",
  description: "99 прекрасных имён Аллаха (Асма уль-Хусна) со значением и толкованием каждого имени и местами в Коране, где оно упоминается.",
  search: "Поиск имён...",
  noResults: "Результатов не найдено",
  meaning: "Значение",
  explanation: "Толкование",
  inQuran: "В Коране",
  englishNote: "Значение и толкование приведены на английском языке",
  prev: "Предыдущее имя",
  next: "Следующее имя",
  all: "Все имена",
  nth: "Имя {n} из 99",
};

const ms: NamesMessages = {
  title: "99 Nama Allah",
  verseRef: "Al-A'raf 7:180",
  description: "99 Nama Allah yang indah (Asmaul Husna) dengan makna dan huraian setiap nama serta tempat ia disebut dalam al-Quran.",
  search: "Cari nama...",
  noResults: "Tiada hasil ditemui",
  meaning: "Makna",
  explanation: "Huraian",
  inQuran: "Dalam al-Quran",
  englishNote: "Makna dan huraian dipaparkan dalam bahasa Inggeris",
  prev: "Nama sebelumnya",
  next: "Nama seterusnya",
  all: "Semua nama",
  nth: "Nama ke-{n} daripada 99",
};

const tr: NamesMessages = {
  title: "Esma-ül Hüsna",
  verseRef: "A'râf 7:180",
  description: "Allah'ın 99 güzel ismi (Esma-ül Hüsna); her ismin anlamı, açıklaması ve Kur'an'da geçtiği yerler.",
  search: "İsim ara...",
  noResults: "Sonuç bulunamadı",
  meaning: "Anlamı",
  explanation: "Açıklama",
  inQuran: "Kur'an'da",
  englishNote: "Anlam ve açıklama İngilizce gösterilmektedir",
  prev: "Önceki isim",
  next: "Sonraki isim",
  all: "Tüm isimler",
  nth: "99 isimden {n}.",
};

const id: NamesMessages = {
  title: "99 Nama Allah",
  verseRef: "Al-A'raf 7:180",
  description: "99 Nama Allah yang indah (Asmaul Husna) beserta makna dan penjelasan setiap nama serta letaknya dalam Al-Qur'an.",
  search: "Cari nama...",
  noResults: "Tidak ada hasil",
  meaning: "Makna",
  explanation: "Penjelasan",
  inQuran: "Dalam Al-Qur'an",
  englishNote: "Makna dan penjelasan ditampilkan dalam bahasa Inggris",
  prev: "Nama sebelumnya",
  next: "Nama berikutnya",
  all: "Semua nama",
  nth: "Nama ke-{n} dari 99",
};

const hi: NamesMessages = {
  title: "अल्लाह के 99 नाम",
  verseRef: "अल-आराफ़ 7:180",
  description: "अल्लाह के 99 ख़ूबसूरत नाम (अस्मा-उल-हुस्ना), हर नाम के अर्थ, व्याख्या और क़ुरआन में उसके आने की जगहों के साथ।",
  search: "नाम खोजें...",
  noResults: "कोई परिणाम नहीं मिला",
  meaning: "अर्थ",
  explanation: "व्याख्या",
  inQuran: "क़ुरआन में",
  englishNote: "अर्थ और व्याख्या अंग्रेज़ी में दिखाई गई है",
  prev: "पिछला नाम",
  next: "अगला नाम",
  all: "सभी नाम",
  nth: "99 में से नाम {n}",
};

/** Al-A'raf 7:180 (opening), verbatim from the app's Qur'an data. */
export const NAMES_VERSE = "وَلِلَّهِ ٱلْأَسْمَآءُ ٱلْحُسْنَىٰ فَٱدْعُوهُ بِهَا";

const bn: NamesMessages = {
  title: "আল্লাহর 99টি নাম",
  verseRef: "আল-আরাফ 7:180",
  description: "আল্লাহর 99টি সুন্দর নাম (আসমাউল হুসনা), প্রতিটি নামের অর্থ, ব্যাখ্যা এবং কুরআনে তার উল্লেখের স্থানসহ।",
  search: "নাম খুঁজুন...",
  noResults: "কোনো ফলাফল পাওয়া যায়নি",
  meaning: "অর্থ",
  explanation: "ব্যাখ্যা",
  inQuran: "কুরআনে",
  englishNote: "অর্থ ও ব্যাখ্যা ইংরেজিতে দেখানো হয়েছে",
  prev: "আগের নাম",
  next: "পরের নাম",
  all: "সব নাম",
  nth: "99টির মধ্যে {n} নম্বর নাম",
};

const ha: NamesMessages = {
  title: "Sunayen Allah 99",
  verseRef: "Al-A'raf 7:180",
  description: "Sunayen Allah Kyawawa 99 (Asma'ul Husna) tare da ma'ana da bayanin kowane suna da inda ya zo a cikin Alƙur'ani.",
  search: "Nemi sunaye...",
  noResults: "Babu sakamakon nema",
  meaning: "Ma'ana",
  explanation: "Bayani",
  inQuran: "A cikin Alƙur'ani",
  englishNote: "Ana nuna ma'ana da bayani da Turanci",
  prev: "Sunan da ya gabata",
  next: "Suna na gaba",
  all: "Dukkan sunaye",
  nth: "Suna na {n} cikin 99",
};

const fr: NamesMessages = {
  title: "Les 99 noms d’Allah",
  verseRef: "Al-A‘raf 7:180",
  description: "Les 99 plus beaux noms d’Allah (Asma al-Husna), avec le sens et l’explication de chaque nom et les passages du Coran où il apparaît.",
  search: "Rechercher un nom…",
  noResults: "Aucun résultat",
  meaning: "Sens",
  explanation: "Explication",
  inQuran: "Dans le Coran",
  englishNote: "Le sens et l’explication sont affichés en anglais",
  prev: "Nom précédent",
  next: "Nom suivant",
  all: "Tous les noms",
  nth: "Nom {n} sur 99",
};

const zh: NamesMessages = {
  title: "真主的九十九个美名",
  verseRef: "高处章 7:180",
  description: "真主的九十九个美名（阿斯玛·侯斯纳），附每个尊名的含义、解释及其在《古兰经》中出现的位置。",
  search: "搜索尊名…",
  noResults: "没有结果",
  meaning: "含义",
  explanation: "解释",
  inQuran: "在《古兰经》中",
  englishNote: "含义和解释以英文显示",
  prev: "上一个尊名",
  next: "下一个尊名",
  all: "全部尊名",
  nth: "第 {n} 个尊名（共 99 个）",
};

const ps: NamesMessages = {
  title: "د الله ښکلي نومونه",
  verseRef: "الأعراف ٧:١٨٠",
  description: "د الله تعالی نهه نوي ښکلي نومونه (اسماء الحسنی)، د هر نوم له مانا او تشریح سره او دا چې په قرآن کریم کې چېرته راغلی.",
  search: "په نومونو کې لټون...",
  noResults: "هېڅ پایله ونه موندل شوه",
  meaning: "مانا",
  explanation: "تشریح",
  inQuran: "په قرآن کې",
  englishNote: "مانا او تشریح په انګلیسي ژبه ښودل شوې ده",
  prev: "مخکینی نوم",
  next: "بل نوم",
  all: "ټول نومونه",
  nth: "نوم {n} له ٩٩ څخه",
};

const pa: NamesMessages = {
  title: "ਅੱਲਾਹ ਦੇ 99 ਨਾਂ",
  verseRef: "ਅਲ-ਆਰਾਫ਼ 7:180",
  description: "ਅੱਲਾਹ ਦੇ 99 ਸੋਹਣੇ ਨਾਂ (ਅਸਮਾਉਲ ਹੁਸਨਾ), ਹਰ ਨਾਂ ਦੇ ਅਰਥ ਅਤੇ ਵਿਆਖਿਆ ਨਾਲ ਅਤੇ ਇਹ ਕਿ ਉਹ ਕੁਰਆਨ ਵਿੱਚ ਕਿੱਥੇ ਆਇਆ ਹੈ।",
  search: "ਨਾਂ ਖੋਜੋ...",
  noResults: "ਕੋਈ ਨਤੀਜਾ ਨਹੀਂ ਮਿਲਿਆ",
  meaning: "ਅਰਥ",
  explanation: "ਵਿਆਖਿਆ",
  inQuran: "ਕੁਰਆਨ ਵਿੱਚ",
  englishNote: "ਅਰਥ ਅਤੇ ਵਿਆਖਿਆ ਅੰਗਰੇਜ਼ੀ ਵਿੱਚ ਵਿਖਾਏ ਗਏ ਹਨ",
  prev: "ਪਿਛਲਾ ਨਾਂ",
  next: "ਅਗਲਾ ਨਾਂ",
  all: "ਸਾਰੇ ਨਾਂ",
  nth: "99 ਵਿੱਚੋਂ ਨਾਂ {n}",
};
const pnb: NamesMessages = {
  title: "اللہ دے ٩٩ ناں",
  verseRef: "الاعراف ٧:١٨٠",
  description: "اللہ تعالیٰ دے ننانوے سوہݨے ناں (اسماء الحسنیٰ)، ہر ناں دے مطلب تے وضاحت دے نال، تے ایہہ کہ قرآن مجید وچ اوہ کتھے آیا اے۔",
  search: "ناں کھوجو...",
  noResults: "کھوج دا کوئی نتیجہ نہیں",
  meaning: "مطلب",
  explanation: "وضاحت",
  inQuran: "قرآن وچ",
  englishNote: "مطلب تے وضاحت انگریزی وچ وکھائے گئے نیں",
  prev: "پچھلا ناں",
  next: "اگلا ناں",
  all: "سارے ناں",
  nth: "٩٩ وچوں ناں {n}",
};

const uz: NamesMessages = {
  title: "Allohning 99 ismi",
  verseRef: "Aʼrof 7:180",
  description: "Allohning 99 goʻzal ismi (Asmoul husno): har bir ismning maʼnosi va izohi hamda u Qurʼonda qayerda kelgani.",
  search: "Ismlarni qidirish...",
  noResults: "Hech narsa topilmadi",
  meaning: "Maʼnosi",
  explanation: "Izoh",
  inQuran: "Qurʼonda",
  englishNote: "Maʼnosi va izohi ingliz tilida koʻrsatilgan",
  prev: "Oldingi ism",
  next: "Keyingi ism",
  all: "Barcha ismlar",
  nth: "99 ismdan {n}-ism",
};
const uzCyrl: NamesMessages = {
  title: "Аллоҳнинг 99 исми",
  verseRef: "Аъроф 7:180",
  description: "Аллоҳнинг 99 гўзал исми (Асмоул ҳусно): ҳар бир исмнинг маъноси ва изоҳи ҳамда у Қуръонда қаерда келгани.",
  search: "Исмларни қидириш...",
  noResults: "Ҳеч нарса топилмади",
  meaning: "Маъноси",
  explanation: "Изоҳ",
  inQuran: "Қуръонда",
  englishNote: "Маъноси ва изоҳи инглиз тилида кўрсатилган",
  prev: "Олдинги исм",
  next: "Кейинги исм",
  all: "Барча исмлар",
  nth: "99 исмдан {n}-исм",
};

const so: NamesMessages = {
  title: "99-ka Magac ee Allaah",
  verseRef: "Al-Acraaf 7:180",
  description: "99-ka Magac ee Wanaagsan ee Allaah (Asmaa’ul Xusnaa) oo leh macnaha iyo sharraxaadda magac kasta iyo meesha uu Qur’aanka kaga yimid.",
  search: "Raadi magacyada...",
  noResults: "Natiijo lama helin",
  meaning: "Macnaha",
  explanation: "Sharraxaad",
  inQuran: "Qur’aanka dhexdiisa",
  englishNote: "Macnaha iyo sharraxaadda waxaa lagu muujiyay Ingiriisi",
  prev: "Magacii hore",
  next: "Magaca xiga",
  all: "Dhammaan magacyada",
  nth: "Magaca {n} ee 99",
};

const sw: NamesMessages = {
  title: "Majina 99 ya Mwenyezi Mungu",
  verseRef: "Al-A'raf 7:180",
  description: "Majina 99 Mazuri ya Mwenyezi Mungu (Asmaul Husna) pamoja na maana na maelezo ya kila jina na mahali linapotajwa katika Qur'ani.",
  search: "Tafuta majina...",
  noResults: "Hakuna matokeo yaliyopatikana",
  meaning: "Maana",
  explanation: "Maelezo",
  inQuran: "Katika Qur'ani",
  englishNote: "Maana na maelezo yanaonyeshwa kwa Kiingereza",
  prev: "Jina lililotangulia",
  next: "Jina linalofuata",
  all: "Majina yote",
  nth: "Jina la {n} kati ya 99",
};

const kuArab: NamesMessages = {
  title: "ناوە جوانەکانی خوا",
  verseRef: "ئەعراف 7:180",
  description: "نەوەد و نۆ ناوە جوانەکەی خوا (ئەسمائولحوسنا)، لەگەڵ مانا و ڕوونکردنەوەی هەر ناوێک و ئەو شوێنەی لە قورئاندا هاتووە.",
  search: "گەڕان لە ناوەکاندا...",
  noResults: "هیچ ئەنجامێک نەدۆزرایەوە",
  meaning: "مانا",
  explanation: "ڕوونکردنەوە",
  inQuran: "لە قورئاندا",
  englishNote: "مانا و ڕوونکردنەوە بە ئینگلیزی پیشان دەدرێن",
  prev: "ناوی پێشوو",
  next: "ناوی دواتر",
  all: "هەموو ناوەکان",
  nth: "ناوی {n} لە 99",
};

const kuLatn: NamesMessages = {
  title: "99 Navên Xwedê",
  verseRef: "El-E’raf 7:180",
  description: "99 Navên Xwedê yên Bedew (Esmaul-Husna) bi wate û şirovekirina her navî û cihê ku di Qur'anê de hatiye.",
  search: "Li navan bigere...",
  noResults: "Tu encam nehatin dîtin",
  meaning: "Wate",
  explanation: "Şirove",
  inQuran: "Di Qur'anê de",
  englishNote: "Wate û şirove bi îngilîzî tên nîşandan",
  prev: "Navê berê",
  next: "Navê pêş",
  all: "Hemû nav",
  nth: "Nav {n} ji 99",
};

const ml: NamesMessages = {
  title: "അല്ലാഹുവിന്റെ 99 നാമങ്ങൾ",
  verseRef: "അൽ-അഅ്റാഫ് 7:180",
  description: "അല്ലാഹുവിന്റെ 99 അത്യുത്തമ നാമങ്ങൾ (അസ്മാഉൽ ഹുസ്ന), ഓരോ നാമത്തിന്റെയും അർത്ഥവും വിശദീകരണവും ഖുർആനിൽ അത് വന്ന സ്ഥലവും സഹിതം.",
  search: "നാമങ്ങൾ തിരയുക...",
  noResults: "ഫലങ്ങളൊന്നുമില്ല",
  meaning: "അർത്ഥം",
  explanation: "വിശദീകരണം",
  inQuran: "ഖുർആനിൽ",
  englishNote: "അർത്ഥവും വിശദീകരണവും ഇംഗ്ലീഷിലാണ് കാണിച്ചിരിക്കുന്നത്",
  prev: "മുമ്പത്തെ നാമം",
  next: "അടുത്ത നാമം",
  all: "എല്ലാ നാമങ്ങളും",
  nth: "99-ൽ {n}-ാമത്തെ നാമം",
};

const de: NamesMessages = {
  title: "Die 99 Namen Allahs",
  verseRef: "Al-A‘raf 7:180",
  description: "Die 99 schönsten Namen Allahs (Asma ul-Husna) mit der Bedeutung und Erklärung jedes Namens und der Stelle, an der er im Koran vorkommt.",
  search: "Namen suchen …",
  noResults: "Keine Ergebnisse gefunden",
  meaning: "Bedeutung",
  explanation: "Erklärung",
  inQuran: "Im Koran",
  englishNote: "Bedeutung und Erklärung werden auf Englisch angezeigt",
  prev: "Vorheriger Name",
  next: "Nächster Name",
  all: "Alle Namen",
  nth: "Name {n} von 99",
};

const es: NamesMessages = {
  title: "Los 99 nombres de Dios",
  verseRef: "Al-A’raf 7:180",
  description: "Los 99 bellos nombres de Dios (Asma ul-Husna) con el significado y la explicación de cada nombre y dónde aparece en el Corán.",
  search: "Buscar nombres...",
  noResults: "No se encontraron resultados",
  meaning: "Significado",
  explanation: "Explicación",
  inQuran: "En el Corán",
  englishNote: "El significado y la explicación se muestran en inglés",
  prev: "Nombre anterior",
  next: "Nombre siguiente",
  all: "Todos los nombres",
  nth: "Nombre {n} de 99",
};

export const names: Record<Locale, NamesMessages> = { ar, en, ur, fa, ru, ms, tr, id, hi, bn, ha, fr, zh, ps, pa, pnb, uz, "uz-Cyrl": uzCyrl, so, sw, "ku-Arab": kuArab, "ku-Latn": kuLatn, ml, de, es,
"az-Latn": {
  title: "Allahın 99 adı",
  verseRef: "Əl-Əraf 7:180",
  description: "Allahın 99 gözəl adı (Əsmaül-Hüsna) — hər adın mənası, izahı və Quranda keçdiyi yerlər.",
  search: "Adlarda axtar...",
  noResults: "Nəticə tapılmadı",
  meaning: "Mənası",
  explanation: "İzahı",
  inQuran: "Quranda",
  englishNote: "",
  prev: "Əvvəlki ad",
  next: "Növbəti ad",
  all: "Bütün adlar",
  nth: "Ad {n} / 99",
},
"om": {
  title: "Maqaalee Allaah 99",
  verseRef: "Al-A'raaf 7:180",
  description: "Maqaalee Allaah miidhagoo 99 (Asmaa'ul Husnaa) hiikkaa fi ibsa maqaa tokkoon tokkoo fi iddoo Qur'aana keessatti itti argamu wajjin.",
  search: "Maqaalee barbaadi...",
  noResults: "Wanti argame hin jiru",
  meaning: "Hiikkaa",
  explanation: "Ibsa",
  inQuran: "Qur'aana keessatti",
  englishNote: "Hiikkaa fi ibsi Ingiliffaan agarsiifama",
  prev: "Maqaa duraa",
  next: "Maqaa itti aanu",
  all: "Maqaalee hunda",
  nth: "Maqaa {n} kan 99 keessaa",
},
"am": {
  title: "99ኙ የአላህ ስሞች",
  verseRef: "አል-አዕራፍ 7:180",
  description: "99ኙ የአላህ ውብ ስሞች (አስማኡል ሑስና) ከእያንዳንዱ ስም ትርጉምና ማብራሪያ እንዲሁም በቁርኣን ውስጥ ከሚገኝበት ስፍራ ጋር።",
  search: "ስሞችን ፈልግ...",
  noResults: "ምንም ውጤት አልተገኘም",
  meaning: "ትርጉም",
  explanation: "ማብራሪያ",
  inQuran: "በቁርኣን ውስጥ",
  englishNote: "ትርጉሙና ማብራሪያው በእንግሊዝኛ ነው የሚታዩት",
  prev: "ያለፈው ስም",
  next: "ቀጣዩ ስም",
  all: "ሁሉም ስሞች",
  nth: "ስም {n} ከ99",
},
"kk-Cyrl": {
  title: "Аллаһтың 99 есімі",
  verseRef: "Ағраф 7:180",
  description: "Аллаһтың 99 көркем есімі (Әсмәул-хұсна): әр есімнің мағынасы, түсініктемесі және Құранда кездесетін жерлері.",
  search: "Есімдерден іздеу...",
  noResults: "Ештеңе табылмады",
  meaning: "Мағынасы",
  explanation: "Түсініктеме",
  inQuran: "Құранда",
  englishNote: "Мағынасы мен түсініктемесі ағылшын тілінде көрсетілген",
  prev: "Алдыңғы есім",
  next: "Келесі есім",
  all: "Барлық есімдер",
  nth: "99 есімнің {n}-і",
},
"ta": {
  title: "அல்லாஹ்வின் 99 திருப்பெயர்கள்",
  verseRef: "அல்-அஃராஃப் 7:180",
  description: "அல்லாஹ்வின் 99 அழகிய திருப்பெயர்கள் (அஸ்மாவுல் ஹுஸ்னா) — ஒவ்வொரு பெயரின் பொருள், விளக்கம் மற்றும் திருக்குர்ஆனில் அது இடம்பெறும் இடங்களுடன்.",
  search: "பெயர்களைத் தேடு...",
  noResults: "முடிவுகள் எதுவும் இல்லை",
  meaning: "பொருள்",
  explanation: "விளக்கம்",
  inQuran: "திருக்குர்ஆனில்",
  englishNote: "பொருளும் விளக்கமும் ஆங்கிலத்தில் காட்டப்படுகின்றன",
  prev: "முந்தைய பெயர்",
  next: "அடுத்த பெயர்",
  all: "அனைத்துப் பெயர்கள்",
  nth: "99 இல் பெயர் {n}",
},
  "gu": {
  title: "અલ્લાહના 99 નામ",
  verseRef: "અલ-અઅરાફ 7:180",
  description: "અલ્લાહના 99 સુંદર નામો (અસ્માઉલ હુસ્ના) — દરેક નામનો અર્થ, સમજૂતી અને કુરઆનમાં તે ક્યાં આવ્યું છે તેની સાથે.",
  search: "નામોમાં શોધો...",
  noResults: "કોઈ પરિણામ મળ્યું નથી",
  meaning: "અર્થ",
  explanation: "સમજૂતી",
  inQuran: "કુરઆનમાં",
  englishNote: "અર્થ અને સમજૂતી અંગ્રેજીમાં બતાવવામાં આવ્યા છે",
  prev: "પાછલું નામ",
  next: "આગળનું નામ",
  all: "બધા નામો",
  nth: "99 માંથી નામ {n}",
  },
  my: {
  title: "အလ္လာဟ်၏ နာမတော် 99 ပါး",
  verseRef: "အလ်အအ်ရာဖ် 7:180",
  description: "အလ္လာဟ်၏ ချီးမြှင့်ထိုက်သော နာမတော် 99 ပါး (အသ်မာအုလ်ဟုဆ်နာ) ကို နာမတော်တစ်ပါးချင်း၏ အဓိပ္ပာယ်၊ ရှင်းလင်းချက်နှင့် ကုရ်အာန်တွင် ပါရှိသည့်နေရာတို့နှင့်အတူ ဖော်ပြထားသည်။",
  search: "နာမတော်များ ရှာရန်...",
  noResults: "ရှာဖွေမှု ရလဒ် မရှိပါ",
  meaning: "အဓိပ္ပာယ်",
  explanation: "ရှင်းလင်းချက်",
  inQuran: "ကုရ်အာန်တွင်",
  englishNote: "",
  prev: "ယခင် နာမတော်",
  next: "နောက် နာမတော်",
  all: "နာမတော်အားလုံး",
  nth: "နာမတော် 99 ပါးအနက် {n} ပါးမြောက်",
  },
};
