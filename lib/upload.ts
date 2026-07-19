import * as FileSystem from 'expo-file-system/legacy';
import { decode } from 'base64-arraybuffer';
import { supabase } from './supabase';

export async  function uploadListingImage(localUri: string, ownerId: string): Promise<string>{
    const base64 = await FileSystem.readAsStringAsync(localUri, {
        encoding: FileSystem.EncodingType.Base64
    });
    const fileExt = localUri.split('.').pop() ?? 'jpg';
    const filePath = `${ownerId}/${Date.now()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
    .from('listing-images')
    .upload(filePath, decode(base64), {
        contentType: `image/${fileExt}`,
    });

    if(uploadError) throw uploadError;

    const { data } = supabase.storage.from('listing-images').getPublicUrl(filePath);
    return data.publicUrl;
}