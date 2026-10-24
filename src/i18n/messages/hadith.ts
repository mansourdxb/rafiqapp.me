// Hadith section strings. App wording (hadith.*, hadithLib.*, hadithSearch.*) comes from appT();
// these are the site-only strings. Book names: ar/en/ur/fa as in the app's HADITH_BOOKS.
import type { Locale } from "../config";

type BookNames = Record<"bukhari" | "muslim" | "abudawud" | "tirmidhi" | "nasai" | "ibnmajah" | "malik" | "darimi" | "ahmed", string>;

export type HadithMessages = {
  books: BookNames;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  hadiths: string;
  kitabs: string;
  hadithN: string;
  minChars: string;
  searchLoading: string;
  searchHintEn: string;
  noFavorites: string;
  addFavorite: string;
  removeFavorite: string;
  copy: string;
  share: string;
  showMore: string;
  shownOf: string;
  prev: string;
  next: string;
  allBooks: string;
  noTranslation: string;
  shareVia: string;
  bookMeta: string;
  chapterMeta: string;
};

const en: HadithMessages = {
  books: {
    bukhari: "Sahih al-Bukhari",
    muslim: "Sahih Muslim",
    abudawud: "Sunan Abi Dawud",
    tirmidhi: "Jami' at-Tirmidhi",
    nasai: "Sunan an-Nasa'i",
    ibnmajah: "Sunan Ibn Majah",
    malik: "Muwatta Imam Malik",
    darimi: "Sunan ad-Darimi",
    ahmed: "Musnad Ahmad bin Hanbal",
  },
  metaTitle: "Hadith — the nine books",
  metaDescription: "Read Sahih al-Bukhari, Sahih Muslim and the other hadith books in Arabic with English translation, search them and save your favourites.",
  intro: "The nine books of the Sunnah, in Arabic with English translation. The Prophet's words ﷺ are highlighted in green.",
  hadiths: "Hadiths",
  kitabs: "Books",
  hadithN: "Hadith {n}",
  minChars: "Type at least 2 letters to search",
  searchLoading: "Loading the search index…",
  searchHintEn: "Search in Arabic or in the English translation",
  noFavorites: "No favourites yet. Tap the bookmark on any hadith to save it here.",
  addFavorite: "Add to favourites",
  removeFavorite: "Remove from favourites",
  copy: "Copy",
  share: "Share",
  showMore: "Show more",
  shownOf: "{a} of {b}",
  prev: "Previous",
  next: "Next",
  allBooks: "All hadith books",
  noTranslation: "This book has no translation yet — Arabic text only.",
  shareVia: "via the Rafiq Al-Muslim app",
  bookMeta: "Read {book}: {n} hadiths in {k} books, in Arabic with translation.",
  chapterMeta: "{chapter} — {book}: {n} hadiths in Arabic with translation.",
};

const ar: HadithMessages = {
  books: {
    bukhari: "صحيح البخاري",
    muslim: "صحيح مسلم",
    abudawud: "سنن أبي داود",
    tirmidhi: "جامع الترمذي",
    nasai: "سنن النسائي",
    ibnmajah: "سنن ابن ماجه",
    malik: "موطأ مالك",
    darimi: "سنن الدارمي",
    ahmed: "مسند أحمد",
  },
  metaTitle: "الحديث — الكتب التسعة",
  metaDescription: "اقرأ صحيح البخاري وصحيح مسلم وسائر كتب الحديث التسعة، وابحث فيها واحفظ أحاديثك المفضلة.",
  intro: "كتب السنة التسعة كاملة، مع تمييز كلام النبي ﷺ باللون الأخضر.",
  hadiths: "الأحاديث",
  kitabs: "الكتب",
  hadithN: "حديث {n}",
  minChars: "اكتب حرفين على الأقل للبحث",
  searchLoading: "جارٍ تحميل فهرس البحث…",
  searchHintEn: "ابحث بالعربية أو في الترجمة الإنجليزية",
  noFavorites: "لا توجد أحاديث مفضلة بعد. اضغط على علامة الحفظ في أي حديث ليظهر هنا.",
  addFavorite: "أضف إلى المفضلة",
  removeFavorite: "أزل من المفضلة",
  copy: "نسخ",
  share: "مشاركة",
  showMore: "عرض المزيد",
  shownOf: "{a} من {b}",
  prev: "السابق",
  next: "التالي",
  allBooks: "كل كتب الحديث",
  noTranslation: "لا تتوفر ترجمة لهذا الكتاب بعد — النص العربي فقط.",
  shareVia: "بواسطة تطبيق رفيق المسلم",
  bookMeta: "اقرأ {book}: {n} حديثًا في {k} كتابًا.",
  chapterMeta: "{chapter} — {book}: {n} حديثًا.",
};

const ur: HadithMessages = {
  books: {
    bukhari: "صحیح بخاری",
    muslim: "صحیح مسلم",
    abudawud: "سنن ابو داؤد",
    tirmidhi: "جامع ترمذی",
    nasai: "سنن نسائی",
    ibnmajah: "سنن ابن ماجہ",
    malik: "موطا امام مالک",
    darimi: "سنن دارمی",
    ahmed: "مسند احمد",
  },
  metaTitle: "حدیث — نو کتابیں",
  metaDescription: "صحیح بخاری، صحیح مسلم اور حدیث کی دیگر کتابیں عربی متن اور انگریزی ترجمے کے ساتھ پڑھیں، ان میں تلاش کریں اور پسندیدہ احادیث محفوظ کریں۔",
  intro: "سنت کی نو کتابیں، عربی متن اور انگریزی ترجمے کے ساتھ۔ نبی ﷺ کے الفاظ سبز رنگ میں نمایاں ہیں۔",
  hadiths: "احادیث",
  kitabs: "کتب",
  hadithN: "حدیث {n}",
  minChars: "تلاش کے لیے کم از کم 2 حروف لکھیں",
  searchLoading: "تلاش کی فہرست لوڈ ہو رہی ہے…",
  searchHintEn: "عربی میں یا انگریزی ترجمے میں تلاش کریں",
  noFavorites: "ابھی کوئی پسندیدہ حدیث نہیں۔ کسی بھی حدیث پر بُک مارک دبائیں تاکہ وہ یہاں محفوظ ہو جائے۔",
  addFavorite: "پسندیدہ میں شامل کریں",
  removeFavorite: "پسندیدہ سے ہٹائیں",
  copy: "کاپی",
  share: "شیئر",
  showMore: "مزید دکھائیں",
  shownOf: "{b} میں سے {a}",
  prev: "پچھلا",
  next: "اگلا",
  allBooks: "حدیث کی تمام کتابیں",
  noTranslation: "اس کتاب کا ترجمہ ابھی دستیاب نہیں — صرف عربی متن۔",
  shareVia: "رفیق المسلم ایپ کے ذریعے",
  bookMeta: "{book} پڑھیں: {k} کتب میں {n} احادیث، عربی متن اور ترجمے کے ساتھ۔",
  chapterMeta: "{chapter} — {book}: {n} احادیث، عربی متن اور ترجمے کے ساتھ۔",
};

const fa: HadithMessages = {
  books: {
    bukhari: "صحیح بخاری",
    muslim: "صحیح مسلم",
    abudawud: "سنن ابوداوود",
    tirmidhi: "جامع ترمذی",
    nasai: "سنن نسائی",
    ibnmajah: "سنن ابن ماجه",
    malik: "موطأ امام مالک",
    darimi: "سنن دارمی",
    ahmed: "مسند احمد",
  },
  metaTitle: "حدیث — کتاب‌های نُه‌گانه",
  metaDescription: "صحیح بخاری، صحیح مسلم و دیگر کتاب‌های حدیث را با متن عربی و ترجمهٔ انگلیسی بخوانید، در آن‌ها جستجو کنید و احادیث دلخواه را ذخیره کنید.",
  intro: "کتاب‌های نُه‌گانهٔ سنت، با متن عربی و ترجمهٔ انگلیسی. سخنان پیامبر ﷺ با رنگ سبز مشخص شده است.",
  hadiths: "احادیث",
  kitabs: "کتاب‌ها",
  hadithN: "حدیث {n}",
  minChars: "برای جستجو دست‌کم ۲ حرف بنویسید",
  searchLoading: "در حال بارگذاری فهرست جستجو…",
  searchHintEn: "به عربی یا در ترجمهٔ انگلیسی جستجو کنید",
  noFavorites: "هنوز حدیث دلخواهی ندارید. روی نشانک هر حدیث بزنید تا اینجا ذخیره شود.",
  addFavorite: "افزودن به علاقه‌مندی‌ها",
  removeFavorite: "حذف از علاقه‌مندی‌ها",
  copy: "رونوشت",
  share: "اشتراک‌گذاری",
  showMore: "نمایش بیشتر",
  shownOf: "{a} از {b}",
  prev: "قبلی",
  next: "بعدی",
  allBooks: "همهٔ کتاب‌های حدیث",
  noTranslation: "این کتاب هنوز ترجمه ندارد — فقط متن عربی.",
  shareVia: "از طریق برنامهٔ رفیق المسلم",
  bookMeta: "{book} را بخوانید: {n} حدیث در {k} کتاب، با متن عربی و ترجمه.",
  chapterMeta: "{chapter} — {book}: {n} حدیث با متن عربی و ترجمه.",
};

const ru: HadithMessages = {
  books: {
    bukhari: "Сахих аль-Бухари",
    muslim: "Сахих Муслим",
    abudawud: "Сунан Абу Дауда",
    tirmidhi: "Джами ат-Тирмизи",
    nasai: "Сунан ан-Насаи",
    ibnmajah: "Сунан Ибн Маджи",
    malik: "Муватта имама Малика",
    darimi: "Сунан ад-Дарими",
    ahmed: "Муснад Ахмада ибн Ханбаля",
  },
  metaTitle: "Хадисы — девять сборников",
  metaDescription: "Читайте «Сахих аль-Бухари», «Сахих Муслим» и другие сборники хадисов на арабском с английским переводом, ищите по ним и сохраняйте избранное.",
  intro: "Девять сборников Сунны на арабском с английским переводом. Слова Пророка ﷺ выделены зелёным.",
  hadiths: "Хадисы",
  kitabs: "Книги",
  hadithN: "Хадис {n}",
  minChars: "Введите минимум 2 буквы для поиска",
  searchLoading: "Загрузка поискового индекса…",
  searchHintEn: "Ищите на арабском или по английскому переводу",
  noFavorites: "В избранном пока пусто. Нажмите на закладку у любого хадиса, чтобы сохранить его здесь.",
  addFavorite: "Добавить в избранное",
  removeFavorite: "Убрать из избранного",
  copy: "Копировать",
  share: "Поделиться",
  showMore: "Показать ещё",
  shownOf: "{a} из {b}",
  prev: "Предыдущая",
  next: "Следующая",
  allBooks: "Все сборники хадисов",
  noTranslation: "У этого сборника пока нет перевода — только арабский текст.",
  shareVia: "через приложение «Рафик аль-Муслим»",
  bookMeta: "Читайте «{book}»: хадисов — {n}, книг — {k}, на арабском с переводом.",
  chapterMeta: "{chapter} — «{book}»: хадисов — {n}, на арабском с переводом.",
};

const ms: HadithMessages = {
  books: {
    bukhari: "Sahih al-Bukhari",
    muslim: "Sahih Muslim",
    abudawud: "Sunan Abu Daud",
    tirmidhi: "Jami' at-Tirmizi",
    nasai: "Sunan an-Nasa'i",
    ibnmajah: "Sunan Ibnu Majah",
    malik: "Muwatta' Imam Malik",
    darimi: "Sunan ad-Darimi",
    ahmed: "Musnad Ahmad bin Hanbal",
  },
  metaTitle: "Hadis — sembilan kitab",
  metaDescription: "Baca Sahih al-Bukhari, Sahih Muslim dan kitab hadis yang lain dalam bahasa Arab dengan terjemahan Inggeris, cari di dalamnya dan simpan kegemaran anda.",
  intro: "Sembilan kitab Sunnah dalam bahasa Arab dengan terjemahan Inggeris. Sabda Nabi ﷺ ditonjolkan dengan warna hijau.",
  hadiths: "Hadis",
  kitabs: "Kitab",
  hadithN: "Hadis {n}",
  minChars: "Taip sekurang-kurangnya 2 huruf untuk mencari",
  searchLoading: "Memuatkan indeks carian…",
  searchHintEn: "Cari dalam bahasa Arab atau dalam terjemahan Inggeris",
  noFavorites: "Belum ada kegemaran. Ketik penanda pada mana-mana hadis untuk menyimpannya di sini.",
  addFavorite: "Tambah ke kegemaran",
  removeFavorite: "Buang dari kegemaran",
  copy: "Salin",
  share: "Kongsi",
  showMore: "Tunjuk lagi",
  shownOf: "{a} daripada {b}",
  prev: "Sebelumnya",
  next: "Seterusnya",
  allBooks: "Semua kitab hadis",
  noTranslation: "Kitab ini belum mempunyai terjemahan — teks Arab sahaja.",
  shareVia: "melalui aplikasi Rafiq Al-Muslim",
  bookMeta: "Baca {book}: {n} hadis dalam {k} kitab, dalam bahasa Arab dengan terjemahan.",
  chapterMeta: "{chapter} — {book}: {n} hadis dalam bahasa Arab dengan terjemahan.",
};

const tr: HadithMessages = {
  books: {
    bukhari: "Sahîh-i Buhârî",
    muslim: "Sahîh-i Müslim",
    abudawud: "Sünen-i Ebû Dâvûd",
    tirmidhi: "Câmiu't-Tirmizî",
    nasai: "Sünen-i Nesâî",
    ibnmajah: "Sünen-i İbn Mâce",
    malik: "Muvatta-ı İmam Mâlik",
    darimi: "Sünen-i Dârimî",
    ahmed: "Müsned-i Ahmed b. Hanbel",
  },
  metaTitle: "Hadis — dokuz kitap",
  metaDescription: "Sahîh-i Buhârî, Sahîh-i Müslim ve diğer hadis kitaplarını Arapça metin ve İngilizce çeviriyle okuyun, içlerinde arayın ve favorilerinizi kaydedin.",
  intro: "Sünnetin dokuz kitabı, Arapça metin ve İngilizce çeviriyle. Peygamber Efendimiz'in ﷺ sözleri yeşil renkle vurgulanır.",
  hadiths: "Hadis",
  kitabs: "Kitap",
  hadithN: "Hadis {n}",
  minChars: "Aramak için en az 2 harf yazın",
  searchLoading: "Arama dizini yükleniyor…",
  searchHintEn: "Arapça veya İngilizce çeviride arayın",
  noFavorites: "Henüz favori yok. Kaydetmek için herhangi bir hadisteki yer imine dokunun.",
  addFavorite: "Favorilere ekle",
  removeFavorite: "Favorilerden çıkar",
  copy: "Kopyala",
  share: "Paylaş",
  showMore: "Daha fazla göster",
  shownOf: "{a} / {b}",
  prev: "Önceki",
  next: "Sonraki",
  allBooks: "Tüm hadis kitapları",
  noTranslation: "Bu kitabın henüz çevirisi yok — yalnızca Arapça metin.",
  shareVia: "Rafiq Al-Muslim uygulaması aracılığıyla",
  bookMeta: "{book} okuyun: {k} kitapta {n} hadis, Arapça metin ve çeviriyle.",
  chapterMeta: "{chapter} — {book}: {n} hadis, Arapça metin ve çeviriyle.",
};

const id: HadithMessages = {
  books: {
    bukhari: "Shahih al-Bukhari",
    muslim: "Shahih Muslim",
    abudawud: "Sunan Abu Dawud",
    tirmidhi: "Jami' at-Tirmidzi",
    nasai: "Sunan an-Nasa'i",
    ibnmajah: "Sunan Ibnu Majah",
    malik: "Muwaththa' Imam Malik",
    darimi: "Sunan ad-Darimi",
    ahmed: "Musnad Ahmad bin Hanbal",
  },
  metaTitle: "Hadis — sembilan kitab",
  metaDescription: "Baca Shahih al-Bukhari, Shahih Muslim, dan kitab hadis lainnya dalam bahasa Arab dengan terjemahan bahasa Inggris, cari di dalamnya, dan simpan favorit Anda.",
  intro: "Sembilan kitab Sunnah dalam bahasa Arab dengan terjemahan bahasa Inggris. Sabda Nabi ﷺ ditandai dengan warna hijau.",
  hadiths: "Hadis",
  kitabs: "Kitab",
  hadithN: "Hadis {n}",
  minChars: "Ketik minimal 2 huruf untuk mencari",
  searchLoading: "Memuat indeks pencarian…",
  searchHintEn: "Cari dalam bahasa Arab atau dalam terjemahan bahasa Inggris",
  noFavorites: "Belum ada favorit. Ketuk penanda pada hadis mana pun untuk menyimpannya di sini.",
  addFavorite: "Tambahkan ke favorit",
  removeFavorite: "Hapus dari favorit",
  copy: "Salin",
  share: "Bagikan",
  showMore: "Tampilkan lagi",
  shownOf: "{a} dari {b}",
  prev: "Sebelumnya",
  next: "Berikutnya",
  allBooks: "Semua kitab hadis",
  noTranslation: "Kitab ini belum memiliki terjemahan — hanya teks Arab.",
  shareVia: "melalui aplikasi Rafiq Al-Muslim",
  bookMeta: "Baca {book}: {n} hadis dalam {k} kitab, dalam bahasa Arab dengan terjemahan.",
  chapterMeta: "{chapter} — {book}: {n} hadis dalam bahasa Arab dengan terjemahan.",
};

export const hadith: Record<Locale, HadithMessages> = { ar, en, ur, fa, ru, ms, tr, id };

/** "{n} of {b}" → filled in. */
export function fill(s: string, p: Record<string, string | number>) {
  return s.replace(/\{(\w+)\}/g, (m, k) => (k in p ? String(p[k]) : m));
}
