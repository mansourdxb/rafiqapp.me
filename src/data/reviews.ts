// Real App Store reviews (App Store Connect customerReviews, fetched 2026-10-24). Add new ones the
// same way — never write reviews by hand.
export type Review = { name: string; rating: number; title: string; body: string; date: string; store: "App Store" | "Google Play" };

export const REVIEWS: Review[] = [
  { name: "Yalsharif", rating: 5, title: "تطبيق ممتاز", body: "جزاكم الله خيرا على المجهود الرائع", date: "2026-05-27", store: "App Store" },
  { name: "nashwa eyad", rating: 5, title: "Good application", body: "Thank you", date: "2026-05-04", store: "App Store" },
];
