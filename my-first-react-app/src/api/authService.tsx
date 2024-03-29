import axios from "axios";
import { baseUrl } from "../constants";
import { Creds } from "../redux/auth/actions";

interface RegisterUserPostData {
    username: string,
    email: string,
    password: string,
}

export interface CustomUserCreate {
    id: number,
    username: string,
    email: string,
}

export interface TokenObtainPair {
    access: string,
    refresh: string
}


export const authService = {
    async registerUser(username: string, email: string, password: string): Promise<any> {
        return axios.post(`${baseUrl}/auth/users/`, {
            username,
            email,
            password,
        }, {
            headers: {
                "Content-Type": "application/json"
            }
        }).then(response => response.data)
    },
    async activateUser(uid: string, token: string,): Promise<any> {
        return axios.post(`${baseUrl}/auth/users/activate/`, {
            uid,
            token
        }, {
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(response => response.data)
        .catch(function (error) {
            console.log(error)
        })

    },
    async login(creds: Creds): Promise<any> {
        return axios.post(`${baseUrl}/auth/jwt/create/`, {
            ...creds
        }, {
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(response => response.data)
        .catch(function (error) {
            console.log(error)
        })

    },
}