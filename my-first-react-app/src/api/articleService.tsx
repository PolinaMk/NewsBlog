import axios from "axios"
import { ACCESS_KEY, baseUrl } from "../constants"

export interface Article {
    id: number | string,
    featured?: boolean,
    title: string,
    url?: string,
    imageUrl: string,
    newsSite: string,
    summary: string,
    publishedAt?: string,
    launches?: ArticleProvider[],
    events?: ArticleProvider[]
}

export interface ArticleProvider {
    id: number | string,
    provider: string
}

export interface ArticleProps {
    _limit?: number,
    _sort?: string,
    title_contains?: string,
    summary_contains?: string,
    _start?: number,
    publishedAt_gte?: string,
}

export interface ArticleCreateProps {
    imageUrl: File,
    title: string,
    newsSite: string,
    summary: string,
}

export const getArticles = async (props: ArticleProps): Promise<Article[]> => {
    return axios.get(`${baseUrl}/v3/articles/`, {
        headers: {
            "Content-Type": "application/json"
        },
        params: {
            ...props
        }
    }).then(response => response.data)
}

export const getArticleById = async (id: number): Promise<Article> => {
    return axios.get(`${baseUrl}/v3/articles/${id}`, {
        headers: {
            "Content-Type": "application/json"
        },
        params: {
            id
        }
    }).then(response => response.data)
}

export const createArticle = async (props: ArticleCreateProps): Promise<Article> => {
    return axios.post(`${baseUrl}/v3/articles/`, {
        ...props,
        id: 7
    },{
        headers: {
            "Content-Type": "multipart/form-data"
        },
    }).then(response => response.data)
}