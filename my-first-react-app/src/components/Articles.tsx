import { useCallback, useEffect, useMemo, useState } from "react"
import { Article, getArticles } from "../api/articleService"
import { ArticleCard } from "./ArticleCard"
import { debounce } from "lodash"

const now = new Date();
const year = now.getFullYear();
let month; // нумерация месяцев начинается с 0
if (now.getMonth() < 10) {
    month = '0' + (now.getMonth() + 1)
} else {
    month = now.getMonth() + 1
}
const day = now.getDate();
let currentDay = `${year}-${month}-${day}`;
let currentMonth = `${year}-${month}-${'01'}`;
let currentYear = `${year}-${'01'}-${'01'}`


export const Articles: React.FC = () => {
    const [articles, setArticles] = useState<Article[]>([])
    const [inputValue, setInputValue] = useState('');
    const [selectValue, setSelectValue] = useState('');
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<Error>()
    const [limit, setLimit] = useState(10)
    const [offset, setOffset] = useState(0)
    const [total, setTotal] = useState(0)
    const [next, setNext] = useState('')
    const [currentDate, setCurrentDate] = useState<any>(currentYear)


    const totalPage = useMemo(() => {
        return Math.ceil(total / limit) || 1
    }, [total, limit])

    const currentPage = useMemo(() => {
        return offset / limit + 1
    }, [offset, limit])

    const debouncedHandleSearch = useCallback(debounce(async (limitValue, inputValue, offset, currentDate) => {
        const articlesResp = await getArticles({ limit: limitValue, search: inputValue, offset: offset, updated_at_gte: currentDate})
        setTotal(articlesResp.count)
        setArticles(articlesResp.results)
        setNext(articlesResp.next)
    }, 450), [])

    useEffect(() => {
        const func = async () => {
            setLoading(true)
            try {
                debouncedHandleSearch(limit, inputValue, offset, currentDate)
                setError(undefined)
            } catch (e: unknown) {
                setArticles([])
                setError(e as Error)
            } finally {
                setLoading(false)
            }
        }
        func()
    }, [selectValue, inputValue, offset, limit, currentDate])

    const onPreviousClick = () => {
        offset > 0 && setOffset(offset - limit)
    }

    const onNextClick = () => {
        offset < limit * (totalPage - 1) && setOffset(offset + limit)
        setOffset(offset + limit)
    }

    const onSearchChange = (value: string) => {
        setInputValue(value)
        setOffset(0)
    }

    const onCurrentDay = () => {
        setCurrentDate(currentDay)
    }

    const onCurrentMonth = () => {
        setCurrentDate(currentMonth)
    }

    const onCurrentYear = () => {
        setCurrentDate(currentYear)
    }


    return <div className="article">
        <div className="article__header">
            <h1 className="article__title">Articles</h1>
            {loading && <div className="spinner-border text-secondary" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>}
        </div>

        <div className="article__sort-block">
            <div className="article__search-block mb-3">
                <input type="text" className="article__search-input form-control" placeholder="Search by title" value={inputValue} onChange={(e) => onSearchChange(e.target.value)}/>
            </div>
            <div className="article__sort">
                <div className="article__sort-time">
                    <div className="article__radio-btn">
                        <input type="radio" name="topping" value='day' id="day" onClick={onCurrentDay}/>
                        <label htmlFor="day">Current day</label>
                    </div>

                    <div className="article__radio-btn">
                        <input type="radio" name="topping" value="month" id="month" onClick={onCurrentMonth}/>
                        <label htmlFor="month">Current month</label>
                    </div>

                    <div className="article__radio-btn">
                        <input type="radio" name="topping" value='year' id="year" onClick={onCurrentYear}/>
                        <label htmlFor="year">Current year</label>
                    </div>

                </div>
                {/* <select className="article__sort-order form-select" aria-label="Default select example" value={selectValue} onChange={(e) => setSelectValue(e.target.value)}>
                    <option selected>Sort:</option>
                    <option value="text">Title (A-Z)</option>
                    <option value="data">Title (Z-A)</option>
                </select> */}
            </div>
        </div>

        <div className="article__wrapper">
            {articles.map((article) => {
                return <ArticleCard key={article.id} article={article} />
            })}
        </div>

        <div className="article__pagination">
            <button className="article__pagination-btn" disabled={currentPage === 1} onClick={onPreviousClick}>
                <svg className="article__pagination-arrow" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {currentPage === 1 &&
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M10.7099 5.2924C10.8999 5.4924 10.9999 5.7424 10.9999 6.0024C10.9999 6.2624 10.8999 6.5124 10.7099 6.7124L6.40994 11.0024L19.9999 11.0024C20.5499 11.0024 20.9999 11.4524 20.9999 12.0024C20.9999 12.5524 20.5499 13.0024 19.9999 13.0024L6.40994 13.0024L10.7099 17.2924C11.0999 17.6824 11.0999 18.3224 10.7099 18.7124C10.3199 19.1024 9.67994 19.1024 9.28994 18.7124L3.28994 12.7124C3.19994 12.6224 3.12994 12.5124 3.07994 12.3924C3.05994 12.3424 3.03994 12.3024 3.03994 12.2524C2.98994 12.0924 2.98994 11.9124 3.03994 11.7524C3.03994 11.7024 3.05994 11.6624 3.07994 11.6124C3.12994 11.4924 3.19994 11.3824 3.28994 11.2924L9.28994 5.2924C9.67994 4.9024 10.3199 4.9024 10.7099 5.2924Z" fill-opacity="0.2" />
                    }
                    {currentPage > 1 &&
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M10.7099 5.2924C10.8999 5.4924 10.9999 5.7424 10.9999 6.0024C10.9999 6.2624 10.8999 6.5124 10.7099 6.7124L6.40994 11.0024L19.9999 11.0024C20.5499 11.0024 20.9999 11.4524 20.9999 12.0024C20.9999 12.5524 20.5499 13.0024 19.9999 13.0024L6.40994 13.0024L10.7099 17.2924C11.0999 17.6824 11.0999 18.3224 10.7099 18.7124C10.3199 19.1024 9.67994 19.1024 9.28994 18.7124L3.28994 12.7124C3.19994 12.6224 3.12994 12.5124 3.07994 12.3924C3.05994 12.3424 3.03994 12.3024 3.03994 12.2524C2.98994 12.0924 2.98994 11.9124 3.03994 11.7524C3.03994 11.7024 3.05994 11.6624 3.07994 11.6124C3.12994 11.4924 3.19994 11.3824 3.28994 11.2924L9.28994 5.2924C9.67994 4.9024 10.3199 4.9024 10.7099 5.2924Z"/>
                    }
                </svg>
                Prev
            </button>
            <div>
                <span>Page: {currentPage} of {totalPage}</span>
            </div>
            <div>
                <span>Total: {total}</span>
            </div>

           <select className="article__pagination-select" value={limit} onChange={e => setLimit(+e.target.value) }>
                <option selected>Select ordering</option>
                <option value="2">2</option>
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
            </select>

            <button className="article__pagination-btn" disabled={next === null} onClick={onNextClick} type="button">
                Next
                <svg className="article__pagination-arrow" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {next && <path fill-rule="evenodd" clip-rule="evenodd" d="M13.2901 18.7076C13.1001 18.5076 13.0001 18.2576 13.0001 17.9976C13.0001 17.7376 13.1001 17.4876 13.2901 17.2876L17.5901 12.9976L4.00006 12.9976C3.45006 12.9976 3.00006 12.5476 3.00006 11.9976C3.00006 11.4476 3.45006 10.9976 4.00006 10.9976L17.5901 10.9976L13.2901 6.7076C12.9001 6.3176 12.9001 5.6776 13.2901 5.2876C13.6801 4.8976 14.3201 4.8976 14.7101 5.2876L20.7101 11.2876C20.8001 11.3776 20.8701 11.4876 20.9201 11.6076C20.9401 11.6576 20.9601 11.6976 20.9601 11.7476C21.0101 11.9076 21.0101 12.0876 20.9601 12.2476C20.9601 12.2976 20.9401 12.3376 20.9201 12.3876C20.8701 12.5076 20.8001 12.6176 20.7101 12.7076L14.7101 18.7076C14.3201 19.0976 13.6801 19.0976 13.2901 18.7076Z" />}
                    {next === null && <path fill-rule="evenodd" clip-rule="evenodd" d="M13.2901 18.7076C13.1001 18.5076 13.0001 18.2576 13.0001 17.9976C13.0001 17.7376 13.1001 17.4876 13.2901 17.2876L17.5901 12.9976L4.00006 12.9976C3.45006 12.9976 3.00006 12.5476 3.00006 11.9976C3.00006 11.4476 3.45006 10.9976 4.00006 10.9976L17.5901 10.9976L13.2901 6.7076C12.9001 6.3176 12.9001 5.6776 13.2901 5.2876C13.6801 4.8976 14.3201 4.8976 14.7101 5.2876L20.7101 11.2876C20.8001 11.3776 20.8701 11.4876 20.9201 11.6076C20.9401 11.6576 20.9601 11.6976 20.9601 11.7476C21.0101 11.9076 21.0101 12.0876 20.9601 12.2476C20.9601 12.2976 20.9401 12.3376 20.9201 12.3876C20.8701 12.5076 20.8001 12.6176 20.7101 12.7076L14.7101 18.7076C14.3201 19.0976 13.6801 19.0976 13.2901 18.7076Z" fill-opacity="0.2"/>}
                </svg>
            </button>
        </div>
    </div>
}
