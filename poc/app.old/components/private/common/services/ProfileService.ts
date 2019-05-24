import * as utils from '../../../../utils/Services';
import { API_URL } from '../../../../utils/Constants';

const basePath = `${API_URL}/profile`;

export async function setProfile(formData: FormData): Promise<any> {

    const user: UserProfilePostData = utils.formDataToJson(formData) as UserProfilePostData;

    const {idUser, username, password, oldPassword, role} = user;
    return fetch(        
        `${basePath}/${idUser}`,
        {
            headers: await utils.getAuthHeaders(),
            method: 'POST',
            body: JSON.stringify({username, password, oldPassword, role})
        })

        .then(async (resp: Response) => {
            if (resp.ok) {
                return true;
            } else {
                return Promise.reject(await resp.json());
            }
        });

}