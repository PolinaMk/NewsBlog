import axios from "axios"
import { baseUrl } from "../constants"

export interface Article {
    id: number | string,
    title: string,
    url?: string,
    image_url: string,
    news_site: string,
    summary: string,
    published_at?: string,
    updated_at?: string,
    featured?: boolean,
    launches?: LauncheProvider[],
    events?: EventProvider[]
}

export interface LauncheProvider {
    launch_id: number | string,
    provider: string
}

export interface EventProvider {
    event_id: number | string,
    provider: string
}

export interface ArticleProps {
    limit?: number,
    search?: string,
    offset?: number,
    updated_at_gte?: string,
}

export interface getArticlesProps {
    count: number
    next: string,
    previous: string,
    results: Article[]
}

export interface ArticleCreateProps {
    image_url: File,
    title: string,
    news_site: string,
    summary: string,
}

export const getArticles = async (props: ArticleProps): Promise<getArticlesProps> => {
    return axios.get(`${baseUrl}/v4/articles/`, {
        headers: {
            "Content-Type": "application/json"
        },
        params: {
            ...props
        }
    }).then(response => response.data)
}

export const getArticleById = async (id: number): Promise<Article> => {
    return axios.get(`${baseUrl}/v4/articles/${id}`, {
        headers: {
            "Content-Type": "application/json"
        },
        params: {
            id
        }
    }).then(response => response.data)
}

export const createArticle = async (props: ArticleCreateProps): Promise<any> => {
    return axios.post(`${baseUrl}/v4/articles/`, {
        ...props,
        id: 7
    },{
        headers: {
            "Content-Type": "multipart/form-data"
        },
    })
    .then(response => response.data)
    .catch(function (error) {
        if (error.response) {
            if (error.response.status === 405) {
                alert("Sorry we have problems with API")
            }
        } else if (error.request) {
            console.log(error.request);
        } else {
            console.log('Error', error.message);
        }
        console.log(error.config);
    })
}