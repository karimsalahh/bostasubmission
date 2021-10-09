import { initReactI18next } from "react-i18next";

//defining different states and their translations
const translationAr = {
  TICKET_CREATED: "تم إنشاء التذكرة",
  PACKAGE_RECEIVED: "تم استلام الشحنة",
  NOT_YET_SHIPPED: "لم يتم شحنه بعد",
  OUT_FOR_DELIVERY: "خارج للتوصيل",
  DELIVERED: " تم التوصيل",
  DELIVERED_TO_SENDER: " تم الأسترجاع",
  IN_TRANSIT: "جاري النقل",
  RECEIVED_DELIVERY_LOCATION: "تلقى موقع التسليم",
};

//setting up the translation options
export default function init(i18n) {
  i18n.use(initReactI18next).init({
    resources: {
      ar: { translation: translationAr },
    },
    lng: "ar",
    fallbackLng: "en",
    interpolation: { escapeValue: false },
  });
}
