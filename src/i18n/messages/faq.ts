// FAQ page copy. The page title is the app's own (alm.faq.title, in src/generated/faq-<lang>.json).
import type { Locale } from "../config";

export type Faq = {
  subtitle: string;
  metaDescription: string;
  searchPlaceholder: string;
  noResults: string;
  count: string; // {n}
  expandAll: string;
  collapseAll: string;
};

export const faq: Record<Locale, Faq> = {
  en: {
    subtitle: "Step-by-step answers to the questions people ask most about the Rafiq Al-Muslim app.",
    metaDescription: "Answers about the Rafiq Al-Muslim app: Qibla accuracy, prayer time calculation, athan notifications, offline Qur'an audio, language, dark mode and more.",
    searchPlaceholder: "Search the questions…",
    noResults: "No questions match your search.",
    count: "{n} questions",
    expandAll: "Expand all",
    collapseAll: "Collapse all",
  },
  ar: {
    subtitle: "إجابات خطوة بخطوة عن أكثر ما يُسأل عنه في تطبيق رفيق المسلم.",
    metaDescription: "إجابات عن تطبيق رفيق المسلم: دقة القبلة، طريقة حساب المواقيت، تنبيهات الأذان، صوت القرآن دون اتصال، اللغة، الوضع الليلي وغير ذلك.",
    searchPlaceholder: "ابحث في الأسئلة…",
    noResults: "لا توجد أسئلة مطابقة لبحثك.",
    count: "{n} سؤالًا",
    expandAll: "فتح الكل",
    collapseAll: "طي الكل",
  },
  ur: {
    subtitle: "رفیق المسلم ایپ کے بارے میں سب سے زیادہ پوچھے جانے والے سوالات کے مرحلہ وار جوابات۔",
    metaDescription: "رفیق المسلم ایپ کے بارے میں جوابات: قبلہ کی درستی، اوقاتِ نماز کا حساب، اذان کی اطلاعات، آف لائن قرآن آڈیو، زبان، ڈارک موڈ اور مزید۔",
    searchPlaceholder: "سوالات میں تلاش کریں…",
    noResults: "آپ کی تلاش سے کوئی سوال نہیں ملا۔",
    count: "{n} سوالات",
    expandAll: "سب کھولیں",
    collapseAll: "سب بند کریں",
  },
  fa: {
    subtitle: "پاسخ‌های گام‌به‌گام به پرتکرارترین پرسش‌ها درباره‌ی برنامه‌ی رفیق المسلم.",
    metaDescription: "پاسخ‌هایی درباره‌ی برنامه‌ی رفیق المسلم: دقت قبله، روش محاسبه‌ی اوقات، اعلان اذان، صوت قرآن آفلاین، زبان، حالت تاریک و موارد دیگر.",
    searchPlaceholder: "جستجو در پرسش‌ها…",
    noResults: "پرسشی مطابق جستجوی شما یافت نشد.",
    count: "{n} پرسش",
    expandAll: "باز کردن همه",
    collapseAll: "بستن همه",
  },
  ru: {
    subtitle: "Пошаговые ответы на самые частые вопросы о приложении Rafiq Al-Muslim.",
    metaDescription: "Ответы о приложении Rafiq Al-Muslim: точность киблы, расчёт времени намаза, уведомления азана, Коран офлайн, язык, тёмная тема и другое.",
    searchPlaceholder: "Поиск по вопросам…",
    noResults: "По вашему запросу вопросов не найдено.",
    count: "Вопросов: {n}",
    expandAll: "Развернуть все",
    collapseAll: "Свернуть все",
  },
  ms: {
    subtitle: "Jawapan langkah demi langkah bagi soalan yang paling kerap ditanya tentang aplikasi Rafiq Al-Muslim.",
    metaDescription: "Jawapan tentang aplikasi Rafiq Al-Muslim: ketepatan kiblat, kiraan waktu solat, notifikasi azan, audio al-Quran luar talian, bahasa, mod gelap dan lain-lain.",
    searchPlaceholder: "Cari soalan…",
    noResults: "Tiada soalan yang sepadan dengan carian anda.",
    count: "{n} soalan",
    expandAll: "Buka semua",
    collapseAll: "Tutup semua",
  },
  tr: {
    subtitle: "Rafiq Al-Muslim uygulaması hakkında en çok sorulan sorulara adım adım cevaplar.",
    metaDescription: "Rafiq Al-Muslim uygulaması hakkında cevaplar: kıble doğruluğu, namaz vakti hesaplama, ezan bildirimleri, çevrimdışı Kur'an sesi, dil, karanlık mod ve daha fazlası.",
    searchPlaceholder: "Sorularda ara…",
    noResults: "Aramanızla eşleşen soru bulunamadı.",
    count: "{n} soru",
    expandAll: "Tümünü aç",
    collapseAll: "Tümünü kapat",
  },
  id: {
    subtitle: "Jawaban langkah demi langkah untuk pertanyaan yang paling sering diajukan tentang aplikasi Rafiq Al-Muslim.",
    metaDescription: "Jawaban seputar aplikasi Rafiq Al-Muslim: akurasi kiblat, perhitungan waktu salat, notifikasi azan, audio Al-Qur'an offline, bahasa, mode gelap, dan lainnya.",
    searchPlaceholder: "Cari pertanyaan…",
    noResults: "Tidak ada pertanyaan yang cocok dengan pencarian Anda.",
    count: "{n} pertanyaan",
    expandAll: "Buka semua",
    collapseAll: "Tutup semua",
  },
  hi: {
    subtitle: "रफ़ीक़ अल-मुस्लिम ऐप के बारे में सबसे ज़्यादा पूछे जाने वाले सवालों के क़दम-दर-क़दम जवाब।",
    metaDescription: "रफ़ीक़ अल-मुस्लिम ऐप के बारे में जवाब: क़िबला की सटीकता, नमाज़ के समय की गणना, अज़ान के नोटिफ़िकेशन, ऑफ़लाइन क़ुरआन ऑडियो, भाषा, डार्क मोड और बहुत कुछ।",
    searchPlaceholder: "सवालों में खोजें…",
    noResults: "आपकी खोज से कोई सवाल मेल नहीं खाता।",
    count: "{n} सवाल",
    expandAll: "सब खोलें",
    collapseAll: "सब बंद करें",
  },
  bn: {
    subtitle: "রফিক আল-মুসলিম অ্যাপ সম্পর্কে সবচেয়ে বেশি জিজ্ঞাসিত প্রশ্নের ধাপে ধাপে উত্তর।",
    metaDescription: "রফিক আল-মুসলিম অ্যাপ সম্পর্কে উত্তর: কিবলার নির্ভুলতা, নামাজের সময়ের হিসাব, আজানের নোটিফিকেশন, অফলাইন কুরআন অডিও, ভাষা, ডার্ক মোড এবং আরও অনেক কিছু।",
    searchPlaceholder: "প্রশ্নে খুঁজুন…",
    noResults: "আপনার অনুসন্ধানের সঙ্গে কোনো প্রশ্ন মেলেনি।",
    count: "{n}টি প্রশ্ন",
    expandAll: "সব খুলুন",
    collapseAll: "সব বন্ধ করুন",
  },
  ha: {
    subtitle: "Amsoshi mataki-mataki ga tambayoyin da mutane suka fi yi game da manhajar Rafiq Al-Muslim.",
    metaDescription: "Amsoshi game da manhajar Rafiq Al-Muslim: daidaiton alƙibla, lissafin lokutan sallah, sanarwar kiran sallah, sautin Alƙur'ani ba tare da intanet ba, harshe, yanayin duhu da sauransu.",
    searchPlaceholder: "Nemi a cikin tambayoyin…",
    noResults: "Babu tambayar da ta dace da abin da kuka nema.",
    count: "Tambayoyi {n}",
    expandAll: "Buɗe duka",
    collapseAll: "Rufe duka",
  },
};
