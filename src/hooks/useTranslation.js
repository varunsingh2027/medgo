import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations/translations';

export const useTranslation = () => {
  const { currentLanguage } = useLanguage();
  
  const t = (key) => {
    return translations[currentLanguage]?.[key] || translations['English'][key] || key;
  };
  
  return { t, currentLanguage };
};
