// Real store reviews, copied word for word: App Store Connect customerReviews and the public Google Play
// listing (fetched 2026-10-24). Only add reviews that exist — never write or edit one by hand.
export type Review = { name: string; rating: number; title?: string; body: string; date: string; store: "App Store" | "Google Play" };

export const REVIEWS: Review[] = [
  {
    name: "Abdullah Qalander",
    rating: 5,
    body: "تطبيق رائع ومتعوب عليه جدا، فيه معظم الحاجات اللي متوزعة في تطبيقات مختلفة كلهم في مكان واحد، جزاكم الله خيرًا، وتقبل منا ومنكم صالح الأعمال",
    date: "2026-04-15",
    store: "Google Play",
  },
  {
    name: "reda m",
    rating: 5,
    body: "ما شاء الله ربنا يجزى خير كل من ساهم فى هذا العمل برنامج بسيط وبه كم من المعلومات الدينية رهيب شكرا لجميع فريق العمل وربنا يجعله فى ميزان حسناتكم",
    date: "2026-04-24",
    store: "Google Play",
  },
  {
    name: "Mahmoud Ak",
    rating: 5,
    body: "ممتاز انصح الجميع تنزيله جزاكم الله خير الجزاء شكرا جزيلا على التحديث الجديد بوركت اياديكم",
    date: "2026-08-19",
    store: "Google Play",
  },
  { name: "Yalsharif", rating: 5, title: "تطبيق ممتاز", body: "جزاكم الله خيرا على المجهود الرائع", date: "2026-05-27", store: "App Store" },
  { name: "مستخدم Google", rating: 5, body: "تطبيق جميل خالي من الاعلانات وسهل التصفح جزاكم الله خير", date: "2026-04-24", store: "Google Play" },
  { name: "رباب موصلي", rating: 5, body: "ممتاز جزاك الله خيراً عنا", date: "2026-07-26", store: "Google Play" },
];
