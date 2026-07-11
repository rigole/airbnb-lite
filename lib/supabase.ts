import "react-native-url-polyfill/auto";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { createClient } from "@supabase/supabase-js";
const superBaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const superBaseKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!;

console.log(superBaseUrl);
console.log(superBaseKey);

export const supabase = createClient(superBaseUrl, superBaseKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
