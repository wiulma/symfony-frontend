import * as utils from '../../../../utils/Services';
import { API_URL } from '../../../../utils/Constants';

const basePath = `${API_URL}/connections`;

export async function getList(): Promise<ConnectionData[]> {
    return fetch(
            basePath,
            {
                headers: await utils.getAuthHeaders(),
            })
        .then(response => response.json() as Promise<ConnectionData[]>)
}

export async function get(id: number): Promise<any> {
    return fetch (
        `${basePath}/${id}`,
        {
            headers: await utils.getAuthHeaders(),
            method: 'get'
        }
    ).then (response => response.json() as Promise<ConnectionData>)
}

export async function save(formData: FormData): Promise<boolean | FetchError> {
    const data: ConnectionData = utils.formDataToJson(formData) as ConnectionData;

    return fetch(
        `${basePath}${(data.idConnection > 0) ? `/${data.idConnection}` : ''}`,
        {
            method: (data.idConnection > 0) ? 'PUT' : 'POST',
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

export async function testConnection(type: string, connString: string): Promise<any> {
    return fetch(
        `${basePath}/test`,
        {
            headers: await utils.getAuthHeaders(),
            method: 'post',
            body: JSON.stringify({type, connString})
        }
    ).then (async (resp) => {
        if (resp.ok) return true
        else {
            return Promise.reject(await resp.json())
        }
    });
}

export async function getConnectionStructure(idConnection: number): Promise<any> {
    return fetch(
            `${basePath}/${idConnection}/structure`,
            {
                headers: await utils.getAuthHeaders(),
            }
        )
        .then(async (resp: Response) => {
            const json: any = await resp.json();
            if (resp.ok) {
                return json;
            } else {
                return Promise.reject(json);
            }
        });
}

export async function executeQuery(idConnection: number, query: any) {
    return fetch(
        `${basePath}/query`,
        {
            headers: await utils.getAuthHeaders(),
            method: 'post',
            body: JSON.stringify({idConnection, query})
        }
    )
    .then(async (resp: Response) => {
        const json: any = await resp.json();
        if (resp.ok) {
            return json;
        } else {
            return Promise.reject(json.message);
        }
    });

}

function getTablesSchema(data: DatabaseStructure[]) {
    const tables: {[key: string]: TableStructure} = {};
    data.forEach((item) => {
        const { id, tableName, columnName, dataType, nullable, primaryKey, foreignKey,
            joinCondition, primaryTableColumn, primaryTableName } = item
        if (!tables[tableName]) {
            tables[tableName] = {
                tableName,
                columns: [],
                connections: []
            };
        }
        const td = tables[tableName]
        td.columns.push(
            { id, columnName, dataType, nullable, primaryKey, foreignKey }
        );
        if (item.foreignKey === "true") {
            td.connections.push(
                { joinCondition, primaryTableColumn, primaryTableName }
            );
        }
    });
    return tables;
}

export async function doDelete(id: number): Promise<any> {
    return fetch(
        `${basePath}/${id}`,
        {
            headers: await utils.getAuthHeaders(),
            method: 'delete'
        }
    ).then (async (resp) => {
        if (resp.ok) return true
        else {
            return Promise.reject(await resp.json())
        }
    });
}