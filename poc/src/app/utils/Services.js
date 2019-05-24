import { default as storage } from '../services/StorageFactory';

export function formDataToJson(formData) {
    const obj = {};
    formData.forEach((value, key) => {
        obj[key] = value;
    });
    return obj;
}

export const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
}

export async function getAuthHeaders() {
    const up = await storage.get("user")
    const res= {
        'Authorization': `Bearer ${up.token}`,
        ...this.headers
    };
    return res;
}
