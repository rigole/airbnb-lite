import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import * as Localization from "expo-localization";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { i18n } from "../lib/i18n";

type LanguageOverride = 'system' | 'en' | 'fr';

type LanguageContextType = {
    locale: 'en' | 'fr';
    override: LanguageOverride;
    setOverride: (value: LanguageOverride) => void;
    t: (key: string, options?: Record<string, any>) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);
const STORAGE_KEY = 'language-override';

function resolveSystemLocale(): 'en'|'fr' {
    const deviceLang = Localization.getLocales()[0]?.languageCode;
    return deviceLang === 'fr' ? 'fr' : 'en';
}

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [override, setOverrideState] = useState<LanguageOverride>('system');
    const [locale, setLocale] = useState<'en' | 'fr'>(resolveSystemLocale());

    useEffect(() =>{
        AsyncStorage.getItem(STORAGE_KEY).then((saved) => {
            if (saved === 'en' || saved === 'fr' || saved === 'system'){
                setOverrideState(saved);
            }
        });
    }, []);

    useEffect(() => {
        const resolved = override === 'system' ? resolveSystemLocale() : override;
        setLocale(resolved);
        i18n.locale = resolved;   
    }, [override]);

    const setOverride = (value: LanguageOverride) => {
        setOverrideState(value);
        AsyncStorage.setItem(STORAGE_KEY, value);
    }

    const t = (key: string, options?: Record<string, any>) => i18n.t(key, options);

    return(
        <LanguageContext.Provider value={{ locale, override, setOverride, t }}>
            {children}
        </LanguageContext.Provider>
    )
}

export function useLanguage(){
    const context = useContext(LanguageContext);
    if(!context){
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}