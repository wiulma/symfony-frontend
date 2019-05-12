
export default {

  data: {
    users: [
      {
          "_id" : "5b1fa555c7e82f668ed6df6e",
          "name" : "admin",
          "surname" : "admin",
          "email" : "admin@example.com",
          "role" : "A",
          "username" : "admin",
          "password" : "admin",
          "createdAt" : "2018-06-12T10:56:51.706Z",
          "token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1MzY5MTAxMzUzMjIsImlzcyI6Imhlcm9hdXRoIiwic3ViIjoiNWIxZmE1NTVjN2U4MmY2NjhlZDZkZjZlIiwiaWF0IjoxNTM2OTEwMTMxfQ.MAv-ja_DhgpFNCAAtbWN1dyHhWaJWFXFMALZJzGgGZo",
          "updatedAt" : "2018-09-14T07:28:51.745Z"
      },
      {
          "_id" : "5b1fa555c7e82f668ed6df6f",
          "name" : "user",
          "surname" : "user",
          "email" : "user@example.com",
          "role" : "U",
          "username" : "user",
          "password" : "user",
          "createdAt" : "2018-06-18T13:11:53.695Z",
          "token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1MzEzMDc5Mzg0NjIsImlzcyI6Imhlcm9hdXRoIiwic3ViIjoiNWIxZmE1NTVjN2U4MmY2NjhlZDZkZjZmIiwiaWF0IjoxNTMxMzA3OTM0fQ.7jj5Px-xVwF73eMK6QkyRW83oB_ixHvntEqdf7WbrM0",
          "updatedAt" : "2018-07-11T11:18:54.864Z"
      }
    ]
  },

  login: function(loginData) {
    const {username, password} = loginData;
    const profile = this.data.users.find(item => {
      return (item.username === username && item.password === password);
    });
    return this.resolve(!!profile, profile);
  },

  auth: function(token) {
    const result = this.data.users.some(item => {
      return item.token === token;
    });
    return result ? Promise.resolve() : Promise.reject();
  },

  resolve: function(result, data) {
    const json = result ? data : undefined;
    return Promise.resolve([{ok: result}, json]);
  }

}
