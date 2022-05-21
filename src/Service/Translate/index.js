import I18n from "react-native-i18n";

import en from "./en";
import kh from "./kh";
import cn from "./cn";

I18n.fallbacks = true;

I18n.locale = "en";

I18n.translations = {
  en,
  kh,
  cn
};

export default I18n;
