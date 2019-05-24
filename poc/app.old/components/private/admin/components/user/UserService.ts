import * as utils from '../../../../../utils/Services';
import { API_URL } from '../../../../../utils/Constants';

const basePath = `${API_URL}/users`;

export async function getList(): Promise<UserData[]> {
    return fetch(basePath, { headers: await utils.getAuthHeaders() })
        .then(response => response.json() as Promise<UserData[]>)
}

export async function doDelete(id: number): Promise<any> {
    return fetch(
        `${basePath}/${id}`,
        {
            headers: await utils.getAuthHeaders(),
            method: 'delete'
        }).then(async (resp: Response) => {
            if (resp.ok) {
                return true;
            } else {
                return Promise.reject(await resp.json());
            }
        });
}

export async function get(id: number): Promise<UserData> {
    return fetch(`${basePath}/${id}`, { headers: await utils.getAuthHeaders()})
        .then(response => response.json() as Promise<UserData>)  
}

export async function save(formData: FormData): Promise<boolean | FetchError> {
    const data: UserData = utils.formDataToJson(formData) as UserData;

    return fetch(
        `${basePath}${(data.idUser > 0) ? `/${data.idUser}` : ''}`,
        {
            method: (data.idUser > 0) ? 'PUT' : 'POST',
            headers: await utils.getAuthHeaders(),
            body: JSON.stringify(data)
        })
        .then(async (resp: Response) => {
            if (resp.ok) {
                return true;
            } else {
                return Promise.reject(await resp.json());
            }
        });
}
