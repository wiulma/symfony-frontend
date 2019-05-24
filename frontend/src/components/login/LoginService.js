import CONST from '../../config';

import * as utils  from '../../utils/Services';

import storage from '../../services/StorageFactory';

export function login(formData) {
  const data = utils.formDataToJson(formData);
  return fetch(
      `${CONST.API_URL}/login`,
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
        return response.json()
      }
    })
    .then(async (user) => {
      await storage.save("user", user);
      return await storage.get("user");
    });
}

export async function logout() {
  return await storage.clear();
}