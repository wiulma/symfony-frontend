import * as utils  from '../../utils/Services';
import { API_URL } from '../../utils/Constants';
import {default as storage} from '../../services/StorageFactory';

export function login(formData: FormData): Promise<UserLoginResponseData> {
  const data: LoginData = utils.formDataToJson(formData) as LoginData;
  return fetch(
      `${API_URL}/login`,
      {
        method: 'POST',
        headers: utils.headers,
        body: JSON.stringify(data)
      }
    )
    .then((response) => {
      if (!response.ok) {
        throw Error(response.statusText);
      } else {
        return response.json() as Promise<UserLoginResponseData>
      }
    })
    .then(async (user: UserLoginResponseData) => {
      await storage.save("user", user);
      return await storage.get("user");
    });
}

export async function logout() {
  return await storage.clear();
}