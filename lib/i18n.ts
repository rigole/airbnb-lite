import { I18n } from "i18n-js";
import en from '../locales/en';
import fr from '../locales/fr';

export const i18n = new I18n({ en, fr });
i18n.enableFallback = true;
i18n.defaultLocale = 'en';