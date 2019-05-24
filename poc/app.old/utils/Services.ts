import { default as storage } from '../services/StorageFactory';

export function formDataToJson(formData: FormData) {
    const obj: any = {};
    formData.forEach((value: string, key: string) => {
        obj[key] = value;
    });
    return obj;
}

export const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
}

export async function getAuthHeaders(): Promise<Headers> {
    const up: UserLoginResponseData = await storage.get("user")
    const res: any = {
        'Authorization': `Bearer ${up.token}`,
        ...this.headers
    };
    return res;
}
