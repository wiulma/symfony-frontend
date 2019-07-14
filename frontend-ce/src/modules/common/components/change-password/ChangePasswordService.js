import userAuthService from '../../../common/services/UserAuthService'

export default {

    changePassword(id, data) {
        return fetch(`${API_URL}/api/users/${id}/security`,
            {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userAuthService.auth.token}`
                },
                body: JSON.stringify(data)
            })
        .then(response => Promise.all([response, response.json()]))
        .then (([result, data]) => {
            if (result.ok) {
                return true
            } else {
                throw new Error(data.error)
            }
        })

    }
}