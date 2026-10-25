// "Download the app" pop-up shown a few seconds after a visit starts.
import type { Locale } from "../config";

type Promo = { before: string; name: string; after: string; body: string; close: string; later: string };

export const promo: Record<Locale, Promo> = {
  ar: {
    before: "حمّل تطبيق ",
    name: "رفيق المسلم",
    after: " الآن!",
    body: "عِش أجمل لحظات يومك مع القرآن والأذكار والدعاء ومواقيت الصلاة. رفيق المسلم يعينك على الطاعة — حمّله الآن مجانًا وبلا إعلانات.",
    close: "إغلاق",
    later: "ليس الآن",
  },
  en: {
    before: "Get the ",
    name: "Rafiq Al-Muslim",
    after: " app now!",
    body: "Spend the best moments of your day with the Qur'an, adhkar, duas and prayer times. Rafiq Al-Muslim helps you in your worship — download it now, free and without ads.",
    close: "Close",
    later: "Not now",
  },
  ur: {
    before: "ابھی ",
    name: "رفیق المسلم",
    after: " ایپ حاصل کریں!",
    body: "اپنے دن کے بہترین لمحات قرآن، اذکار، دعاؤں اور نماز کے اوقات کے ساتھ گزاریں۔ رفیق المسلم عبادت میں آپ کا مددگار ہے — ابھی مفت اور بغیر اشتہارات کے ڈاؤن لوڈ کریں۔",
    close: "بند کریں",
    later: "ابھی نہیں",
  },
  fa: {
    before: "همین حالا برنامهٔ ",
    name: "رفیق المسلم",
    after: " را دریافت کنید!",
    body: "بهترین لحظه‌های روزتان را با قرآن، اذکار، دعا و اوقات نماز بگذرانید. رفیق المسلم یاور شما در عبادت است — همین حالا رایگان و بدون تبلیغات دانلود کنید.",
    close: "بستن",
    later: "بعداً",
  },
  ru: {
    before: "Скачайте ",
    name: "Рафик Аль-Муслим",
    after: " прямо сейчас!",
    body: "Проводите лучшие моменты дня с Кораном, азкарами, дуа и временем намаза. Рафик Аль-Муслим помогает вам в поклонении — скачайте бесплатно и без рекламы.",
    close: "Закрыть",
    later: "Не сейчас",
  },
  ms: {
    before: "Dapatkan aplikasi ",
    name: "Rafiq Al-Muslim",
    after: " sekarang!",
    body: "Habiskan saat terbaik hari anda bersama Al-Quran, zikir, doa dan waktu solat. Rafiq Al-Muslim membantu ibadah anda — muat turun sekarang, percuma dan tanpa iklan.",
    close: "Tutup",
    later: "Bukan sekarang",
  },
  tr: {
    before: "",
    name: "Rafiq Al-Muslim",
    after: " uygulamasını hemen indirin!",
    body: "Gününüzün en güzel anlarını Kur'an, zikirler, dualar ve namaz vakitleriyle geçirin. Rafiq Al-Muslim ibadetinizde yanınızda — şimdi ücretsiz ve reklamsız indirin.",
    close: "Kapat",
    later: "Şimdi değil",
  },
  id: {
    before: "Unduh aplikasi ",
    name: "Rafiq Al-Muslim",
    after: " sekarang!",
    body: "Habiskan momen terbaik hari Anda bersama Al-Quran, zikir, doa dan jadwal shalat. Rafiq Al-Muslim menemani ibadah Anda — unduh sekarang, gratis dan tanpa iklan.",
    close: "Tutup",
    later: "Nanti saja",
  },
  hi: {
    before: "",
    name: "रफ़ीक़ अल-मुस्लिम",
    after: " ऐप अभी डाउनलोड करें!",
    body: "अपने दिन के सबसे अच्छे पल क़ुरआन, अज़कार, दुआओं और नमाज़ के समय के साथ बिताएँ। रफ़ीक़ अल-मुस्लिम इबादत में आपकी मदद करता है — अभी डाउनलोड करें, मुफ़्त और बिना विज्ञापन।",
    close: "बंद करें",
    later: "अभी नहीं",
  },
  bn: {
    before: "",
    name: "রফিক আল-মুসলিম",
    after: " অ্যাপটি এখনই ডাউনলোড করুন!",
    body: "আপনার দিনের সেরা মুহূর্তগুলো কাটান কুরআন, আজকার, দোয়া ও নামাজের সময়ের সঙ্গে। রফিক আল-মুসলিম ইবাদতে আপনার সহায়ক — এখনই ডাউনলোড করুন, বিনামূল্যে ও বিজ্ঞাপন ছাড়া।",
    close: "বন্ধ করুন",
    later: "এখন নয়",
  },
};
