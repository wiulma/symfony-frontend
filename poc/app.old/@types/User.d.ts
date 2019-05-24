declare type UserData = {
    idUser: number,
    name?: string,
    surname?: string,
    email?: string,
    role?: string,
    username?: string,
    password?: string
}


declare type LoginData = {
    username: string,
    password: string
}

declare type UserLoginResponseData = {
    idUser: number,
    name?: string,
    surname?: string,
    email?: string,
    role?: string,
    username?: string,
    token: string
}

declare interface UserProfileData {
    username: string,
    password: string,
    token: string
}

declare type UserDetailRouteParams = {
    userid: string;
}

declare type UserProfileDataState = {
    title: string;
    loading: boolean;  
    userData: UserData;
    passwordType: string
} 

declare type UserProfilePostData = {
    idUser: string;
    username: string;
    role : string;
    oldPassword: string;
    password: string;
}
