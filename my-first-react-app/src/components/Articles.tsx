import { useCallback, useEffect, useMemo, useState } from "react"
import { Article, getArticles } from "../api/articleService"
import { ArticleCard } from "./ArticleCard"
import { debounce } from "lodash"
import { useSelector } from "react-redux";
import { AppStorage } from "../redux/store";
import { Language } from "../redux/language/reducer";
import { useQueryParam, NumberParam, StringParam } from 'use-query-params';

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
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<Error>()
    const [offset, setOffset] = useState(0)
    const [total, setTotal] = useState(0)
    const [next, setNext] = useState('')
    const [currentDateValue, setCurrentDateValue] = useState<any>()

    const { lang } = useSelector((store: AppStorage) => store.language)

    const [limitParam, setLimitParam] = useQueryParam('limit', NumberParam);
    const [searchParam, setSearchParam] = useQueryParam('search', StringParam);
    const [currentDateParam, setCurrentDateParam] = useQueryParam('updated_at_gte', StringParam);

    const localStorage = window.localStorage;

    const totalPage = useMemo(() => {
        return Math.ceil(total / limitParam!) || 1
    }, [total, limitParam!])

    const currentPage = useMemo(() => {
        return offset / limitParam! + 1
    }, [offset, limitParam!])

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
                debouncedHandleSearch(limitParam, searchParam, offset, currentDateParam)

                if (!limitParam) {
                    setLimitParam(10)
                }

                if (currentDateParam === undefined) {
                    setCurrentDateParam('')
                }

                if (!currentDateValue) {
                    setCurrentDateValue('allNews')
                }

                const savedDateLocal = localStorage.getItem("search-date");
                const savedDateLocalValue = localStorage.getItem("date");

                if (!!savedDateLocal && !!savedDateLocalValue) {
                    setCurrentDateValue(savedDateLocal);
                    setCurrentDateParam(savedDateLocalValue)
                }

                setError(undefined)
            } catch (e: unknown) {
                setArticles([])
                setError(e as Error)
            } finally {
                setLoading(false)
            }
        }
        func()
    }, [searchParam, offset, limitParam, currentDateParam, currentDateValue])

    const onPreviousClick = () => {
        offset > 0 && setOffset(offset - limitParam!)
    }

    const onNextClick = () => {
        offset < limitParam! * (totalPage - 1) && setOffset(offset + limitParam!)
        setOffset(offset + limitParam!)
    }

    const onSearchChange = (value: string) => {
        setSearchParam(value)
        setOffset(0)
    }

    const saveDateState = (date, dateValue) => {
        localStorage.setItem("date", date)
        localStorage.setItem("search-date", dateValue);
        setCurrentDateValue(dateValue)
        setCurrentDateParam(date)
        setOffset(0)
    }

    const onCurrentDay = (value: string) => {
        saveDateState(currentDay, value)
    }

    const onCurrentMonth = (value: string) => {
        saveDateState(currentMonth, value)
    }

    const onCurrentYear = (value: string) => {
        saveDateState(currentYear, value)
    }

    const onAllNews = (value: string) => {
        saveDateState('', value)
    }


    return <div className="article">
        <div className="article__header">
            <h1 className="article__title">
                {lang === Language.ENG ? 'Articles' : 'Новости'}
            </h1>
            {loading && <div className="spinner-border text-secondary" role="status">
                <span className="visually-hidden">
                    {lang === Language.ENG ? 'Loading...' : 'Загрузка...'}
                </span>
            </div>}
        </div>

        <div className="article__sort-block">
            <div className="article__search-block mb-3">
                <input type="text" className="article__search-input form-control" placeholder="Search" value={searchParam!} onChange={(e) => onSearchChange(e.target.value)}/>
            </div>
            <div className="article__sort-time">
                <div className='article__radio-btn'>
                    <input type="radio" name="topping" value='day' id="day" onClick={() => onCurrentDay('day')} checked={currentDateValue === 'day'}/>
                    <label htmlFor="day">
                        {lang === Language.ENG ? 'Current day' : 'Сегодня'}
                    </label>
                </div>

                <div className='article__radio-btn'>
                    <input type="radio" name="topping" value="month" id="month" onClick={() => onCurrentMonth('month')} checked={currentDateValue === 'month'}/>
                    <label htmlFor="month">
                        {lang === Language.ENG ? 'Current month' : 'В этом месяце'}
                    </label>
                </div>

                <div className='article__radio-btn'>
                    <input type="radio" name="topping" value='year' id="year" onClick={() => onCurrentYear('year')} checked={currentDateValue === 'year'}/>
                    <label htmlFor="year">
                        {lang === Language.ENG ? 'Current year' : 'В этом году'}
                    </label>
                </div>

                <div className='article__radio-btn'>
                    <input type="radio" name="topping" value='allNews' id="allNews" onClick={() => onAllNews('allNews')} checked={currentDateValue === 'allNews'} />
                    <label htmlFor="allNews">
                        {lang === Language.ENG ? 'All news' : 'Все новости'}
                    </label>
                </div>

            </div>
        </div>

        <div className="article__wrapper">
            {articles.map((article) => {
                return <ArticleCard key={article.id} article={article} />
            })}
            {articles.length === 0 && <p className="article__pagination-number">
                {lang === Language.ENG ? 'There are no such articles' : 'Нет таких статей'}
            </p>}
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
                {lang === Language.ENG ? 'Prev' : 'Назад'}
            </button>
            <div className="article__pagination_page-info">
                <span className="article__pagination-number">
                    {lang === Language.ENG ? 'Page:' : 'Страница:'} {currentPage} {lang === Language.ENG ? 'of' : 'из'} {totalPage}
                </span>
            </div>
            <div className="article__pagination_total-info">
                <span className="article__pagination-number">
                    {lang === Language.ENG ? 'Total:' : 'Всего:'} {total}
                </span>
            </div>

           <select className="article__pagination-select" value={limitParam!} onChange={e => setLimitParam(+e.target.value)}>
                <option selected>
                    {lang === Language.ENG ? 'Select ordering' : 'Кол-во новостей'}
                </option>
                <option value="2">2</option>
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
            </select>

            <button className="article__pagination-btn" disabled={next === null} onClick={onNextClick} type="button">
                {lang === Language.ENG ? 'Next' : 'Вперёд'}
                <svg className="article__pagination-arrow" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {next && <path fill-rule="evenodd" clip-rule="evenodd" d="M13.2901 18.7076C13.1001 18.5076 13.0001 18.2576 13.0001 17.9976C13.0001 17.7376 13.1001 17.4876 13.2901 17.2876L17.5901 12.9976L4.00006 12.9976C3.45006 12.9976 3.00006 12.5476 3.00006 11.9976C3.00006 11.4476 3.45006 10.9976 4.00006 10.9976L17.5901 10.9976L13.2901 6.7076C12.9001 6.3176 12.9001 5.6776 13.2901 5.2876C13.6801 4.8976 14.3201 4.8976 14.7101 5.2876L20.7101 11.2876C20.8001 11.3776 20.8701 11.4876 20.9201 11.6076C20.9401 11.6576 20.9601 11.6976 20.9601 11.7476C21.0101 11.9076 21.0101 12.0876 20.9601 12.2476C20.9601 12.2976 20.9401 12.3376 20.9201 12.3876C20.8701 12.5076 20.8001 12.6176 20.7101 12.7076L14.7101 18.7076C14.3201 19.0976 13.6801 19.0976 13.2901 18.7076Z" />}
                    {next === null && <path fill-rule="evenodd" clip-rule="evenodd" d="M13.2901 18.7076C13.1001 18.5076 13.0001 18.2576 13.0001 17.9976C13.0001 17.7376 13.1001 17.4876 13.2901 17.2876L17.5901 12.9976L4.00006 12.9976C3.45006 12.9976 3.00006 12.5476 3.00006 11.9976C3.00006 11.4476 3.45006 10.9976 4.00006 10.9976L17.5901 10.9976L13.2901 6.7076C12.9001 6.3176 12.9001 5.6776 13.2901 5.2876C13.6801 4.8976 14.3201 4.8976 14.7101 5.2876L20.7101 11.2876C20.8001 11.3776 20.8701 11.4876 20.9201 11.6076C20.9401 11.6576 20.9601 11.6976 20.9601 11.7476C21.0101 11.9076 21.0101 12.0876 20.9601 12.2476C20.9601 12.2976 20.9401 12.3376 20.9201 12.3876C20.8701 12.5076 20.8001 12.6176 20.7101 12.7076L14.7101 18.7076C14.3201 19.0976 13.6801 19.0976 13.2901 18.7076Z" fill-opacity="0.2"/>}
                </svg>
            </button>
        </div>
    </div>
}
