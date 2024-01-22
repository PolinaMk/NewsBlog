import React from 'react';
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form"
import { useNavigate } from 'react-router';
import { useSelector } from "react-redux";
import { AppStorage } from "../redux/store";
import { Language } from "../redux/language/reducer";
import { createArticle } from '../api/articleService';


interface IForm {
    image_url: File;
    url: string;
    title: string;
    news_site: string,
    summary: string,
}

const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject
})

export const ArticleCreate: React.FC = () => {
    const [image, setImage] = useState();
    const [file, setFile] = useState<File>();
    const [disabled, setDisabled] = useState(false)
    const { lang } = useSelector((store: AppStorage) => store.language)

    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors, touchedFields }
    } = useForm<IForm>({
        shouldUnregister: false
    })

    const onFileChange = (e) => {
        const file = e.target.files[0];
        setFile(file)
        toBase64(file).then((image: any) => {
            setImage(image)
        })
    }

    const onSubmit: SubmitHandler<IForm> = (data) => {
        try {
            createArticle({ ...data, image_url: file! })
            //alert(`Article: ${data.title} - has been added`)
            navigate('/articles')
        } catch (e: any) {
            alert(e?.message)
        }
    }

    return <div className='createArticle'>
        <h2 className="createArticle__title article__title">
            {lang === Language.ENG ? 'Create new article' : 'Добавить новость'}
        </h2>

        <form className="createArticle__form needs-validation" onSubmit={handleSubmit(onSubmit)}>

            <div className="createArticle__field createArticle__field-file">
                <label className="createArticle__field-title form-label">
                    {lang === Language.ENG ? 'Image' : 'Фотография'}
                </label>
                {touchedFields.image_url && errors.image_url && <div className="form-text text-danger">Please add image</div>}
                <input className={`article__search-input createArticle__file-select form-control ${touchedFields.image_url && errors.image_url ? 'createArticle__search-input_red' : ''}`} type="file" accept=".ipeg,.jpg,.png" onChange={onFileChange} />
                <div className="createArticle__field-file_btn">
                    {lang === Language.ENG ? 'Select the file' : 'Выберите фото'}
                </div>
                {image && <div className='createArticle__img-wrapper'><img className="createArticle__img" src={image} alt="" /></div>}
            </div>

            <div className="createArticle__field">
                <label className="createArticle__field-title form-label"><p>
                    {lang === Language.ENG ? 'Title' : 'Заголовок'}
                    <span className='createArticle__field-required'>*</span></p>
                    {touchedFields.title && errors.title && <div className="createArticle__required">
                    <svg className='createArticle__required-svg' width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14.2664 12.6954L8.93933 2.80266C8.56175 2.10126 7.5559 2.10126 7.17801 2.80266L1.85122 12.6954C1.76924 12.8477 1.72814 13.0186 1.73193 13.1915C1.73572 13.3644 1.78427 13.5334 1.87285 13.6819C1.96143 13.8304 2.087 13.9535 2.23731 14.039C2.38763 14.1245 2.55754 14.1696 2.73048 14.1698H13.3856C13.5587 14.1698 13.7288 14.125 13.8793 14.0396C14.0298 13.9542 14.1556 13.8312 14.2444 13.6826C14.3332 13.534 14.3819 13.3649 14.3857 13.1919C14.3896 13.0189 14.3485 12.8478 14.2664 12.6954ZM8.05883 12.6382C7.93519 12.6382 7.81432 12.6016 7.71152 12.5329C7.60872 12.4642 7.52859 12.3666 7.48128 12.2523C7.43396 12.1381 7.42158 12.0124 7.4457 11.8911C7.46982 11.7699 7.52936 11.6585 7.61679 11.5711C7.70421 11.4836 7.8156 11.4241 7.93687 11.4C8.05813 11.3759 8.18383 11.3882 8.29805 11.4356C8.41228 11.4829 8.50992 11.563 8.57861 11.6658C8.6473 11.7686 8.68396 11.8895 8.68396 12.0131C8.68396 12.0952 8.66779 12.1765 8.63638 12.2523C8.60496 12.3282 8.55891 12.3971 8.50086 12.4551C8.44281 12.5132 8.3739 12.5592 8.29805 12.5907C8.22221 12.6221 8.14092 12.6382 8.05883 12.6382ZM8.73772 6.35094L8.55831 10.1643C8.55831 10.2969 8.50562 10.4241 8.41183 10.5179C8.31804 10.6117 8.19084 10.6644 8.0582 10.6644C7.92556 10.6644 7.79836 10.6117 7.70457 10.5179C7.61078 10.4241 7.55809 10.2969 7.55809 10.1643L7.37868 6.3525C7.37465 6.26141 7.38899 6.17045 7.42087 6.08502C7.45274 5.9996 7.50148 5.92147 7.56419 5.85529C7.62691 5.78911 7.7023 5.73623 7.78588 5.6998C7.86947 5.66338 7.95953 5.64416 8.0507 5.64328H8.05726C8.14906 5.64323 8.2399 5.66178 8.32433 5.69781C8.40876 5.73384 8.48501 5.7866 8.54848 5.85291C8.61196 5.91922 8.66134 5.9977 8.69365 6.08362C8.72596 6.16954 8.74053 6.26111 8.73647 6.35281L8.73772 6.35094Z" />
                    </svg>
                    {lang === Language.ENG ? 'required' : 'обязательно'} </div>}
                </label>
                <input {...register("title", { required: true })} className={`article__search-input form-control ${touchedFields.title && errors.title ? 'createArticle__search-input_red' : ''}`} placeholder='Add title'/>
            </div>

            <div className="createArticle__field">
                <label className="createArticle__field-title form-label"><p>
                    {lang === Language.ENG ? 'News url' : 'Ссылка на новость'}
                    <span className='createArticle__field-required'>*</span></p>
                    <div className='createArticle__required-wrapper'>
                        {touchedFields.url && errors.url && <div className="createArticle__required">
                            <svg className='createArticle__required-svg' width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M14.2664 12.6954L8.93933 2.80266C8.56175 2.10126 7.5559 2.10126 7.17801 2.80266L1.85122 12.6954C1.76924 12.8477 1.72814 13.0186 1.73193 13.1915C1.73572 13.3644 1.78427 13.5334 1.87285 13.6819C1.96143 13.8304 2.087 13.9535 2.23731 14.039C2.38763 14.1245 2.55754 14.1696 2.73048 14.1698H13.3856C13.5587 14.1698 13.7288 14.125 13.8793 14.0396C14.0298 13.9542 14.1556 13.8312 14.2444 13.6826C14.3332 13.534 14.3819 13.3649 14.3857 13.1919C14.3896 13.0189 14.3485 12.8478 14.2664 12.6954ZM8.05883 12.6382C7.93519 12.6382 7.81432 12.6016 7.71152 12.5329C7.60872 12.4642 7.52859 12.3666 7.48128 12.2523C7.43396 12.1381 7.42158 12.0124 7.4457 11.8911C7.46982 11.7699 7.52936 11.6585 7.61679 11.5711C7.70421 11.4836 7.8156 11.4241 7.93687 11.4C8.05813 11.3759 8.18383 11.3882 8.29805 11.4356C8.41228 11.4829 8.50992 11.563 8.57861 11.6658C8.6473 11.7686 8.68396 11.8895 8.68396 12.0131C8.68396 12.0952 8.66779 12.1765 8.63638 12.2523C8.60496 12.3282 8.55891 12.3971 8.50086 12.4551C8.44281 12.5132 8.3739 12.5592 8.29805 12.5907C8.22221 12.6221 8.14092 12.6382 8.05883 12.6382ZM8.73772 6.35094L8.55831 10.1643C8.55831 10.2969 8.50562 10.4241 8.41183 10.5179C8.31804 10.6117 8.19084 10.6644 8.0582 10.6644C7.92556 10.6644 7.79836 10.6117 7.70457 10.5179C7.61078 10.4241 7.55809 10.2969 7.55809 10.1643L7.37868 6.3525C7.37465 6.26141 7.38899 6.17045 7.42087 6.08502C7.45274 5.9996 7.50148 5.92147 7.56419 5.85529C7.62691 5.78911 7.7023 5.73623 7.78588 5.6998C7.86947 5.66338 7.95953 5.64416 8.0507 5.64328H8.05726C8.14906 5.64323 8.2399 5.66178 8.32433 5.69781C8.40876 5.73384 8.48501 5.7866 8.54848 5.85291C8.61196 5.91922 8.66134 5.9977 8.69365 6.08362C8.72596 6.16954 8.74053 6.26111 8.73647 6.35281L8.73772 6.35094Z" />
                            </svg>
                            {lang === Language.ENG ? 'required' : 'обязательно'}
                        </div>}
                        {touchedFields.url && errors.url && <div className="createArticle__relevant">
                            <svg className="createArticle__relevant-svg" xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="512" height="512"><path d="M12,0A12,12,0,1,0,24,12,12.013,12.013,0,0,0,12,0Zm8.647,7H17.426a19.676,19.676,0,0,0-2.821-4.644A10.031,10.031,0,0,1,20.647,7ZM16.5,12a10.211,10.211,0,0,1-.476,3H7.976A10.211,10.211,0,0,1,7.5,12a10.211,10.211,0,0,1,.476-3h8.048A10.211,10.211,0,0,1,16.5,12ZM8.778,17h6.444A19.614,19.614,0,0,1,12,21.588,19.57,19.57,0,0,1,8.778,17Zm0-10A19.614,19.614,0,0,1,12,2.412,19.57,19.57,0,0,1,15.222,7ZM9.4,2.356A19.676,19.676,0,0,0,6.574,7H3.353A10.031,10.031,0,0,1,9.4,2.356ZM2.461,9H5.9a12.016,12.016,0,0,0-.4,3,12.016,12.016,0,0,0,.4,3H2.461a9.992,9.992,0,0,1,0-6Zm.892,8H6.574A19.676,19.676,0,0,0,9.4,21.644,10.031,10.031,0,0,1,3.353,17Zm11.252,4.644A19.676,19.676,0,0,0,17.426,17h3.221A10.031,10.031,0,0,1,14.605,21.644ZM21.539,15H18.1a12.016,12.016,0,0,0,.4-3,12.016,12.016,0,0,0-.4-3h3.437a9.992,9.992,0,0,1,0,6Z"/></svg>
                            {lang === Language.ENG ? 'please add relevant url' : 'укажите правильную ссылку'}
                        </div>}
                    </div>
                </label>
                <input {...register("url", { required: true, pattern: {
                    value: /(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})(\.[a-zA-Z0-9]{2,})?/,
                    message: "Please add the correct url"
                }})} className={`article__search-input form-control ${touchedFields.url && errors.url ? 'createArticle__search-input_red' : ''}`} placeholder='Add news url'/>
            </div>

            <div className="createArticle__field">
                <label className="createArticle__field-title form-label"><p>
                    {lang === Language.ENG ? 'News topic' : 'Тема новости'}
                    <span className='createArticle__field-required'>*</span></p>
                    {touchedFields.news_site && errors.news_site && <div className="createArticle__required">
                    <svg className='createArticle__required-svg' width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14.2664 12.6954L8.93933 2.80266C8.56175 2.10126 7.5559 2.10126 7.17801 2.80266L1.85122 12.6954C1.76924 12.8477 1.72814 13.0186 1.73193 13.1915C1.73572 13.3644 1.78427 13.5334 1.87285 13.6819C1.96143 13.8304 2.087 13.9535 2.23731 14.039C2.38763 14.1245 2.55754 14.1696 2.73048 14.1698H13.3856C13.5587 14.1698 13.7288 14.125 13.8793 14.0396C14.0298 13.9542 14.1556 13.8312 14.2444 13.6826C14.3332 13.534 14.3819 13.3649 14.3857 13.1919C14.3896 13.0189 14.3485 12.8478 14.2664 12.6954ZM8.05883 12.6382C7.93519 12.6382 7.81432 12.6016 7.71152 12.5329C7.60872 12.4642 7.52859 12.3666 7.48128 12.2523C7.43396 12.1381 7.42158 12.0124 7.4457 11.8911C7.46982 11.7699 7.52936 11.6585 7.61679 11.5711C7.70421 11.4836 7.8156 11.4241 7.93687 11.4C8.05813 11.3759 8.18383 11.3882 8.29805 11.4356C8.41228 11.4829 8.50992 11.563 8.57861 11.6658C8.6473 11.7686 8.68396 11.8895 8.68396 12.0131C8.68396 12.0952 8.66779 12.1765 8.63638 12.2523C8.60496 12.3282 8.55891 12.3971 8.50086 12.4551C8.44281 12.5132 8.3739 12.5592 8.29805 12.5907C8.22221 12.6221 8.14092 12.6382 8.05883 12.6382ZM8.73772 6.35094L8.55831 10.1643C8.55831 10.2969 8.50562 10.4241 8.41183 10.5179C8.31804 10.6117 8.19084 10.6644 8.0582 10.6644C7.92556 10.6644 7.79836 10.6117 7.70457 10.5179C7.61078 10.4241 7.55809 10.2969 7.55809 10.1643L7.37868 6.3525C7.37465 6.26141 7.38899 6.17045 7.42087 6.08502C7.45274 5.9996 7.50148 5.92147 7.56419 5.85529C7.62691 5.78911 7.7023 5.73623 7.78588 5.6998C7.86947 5.66338 7.95953 5.64416 8.0507 5.64328H8.05726C8.14906 5.64323 8.2399 5.66178 8.32433 5.69781C8.40876 5.73384 8.48501 5.7866 8.54848 5.85291C8.61196 5.91922 8.66134 5.9977 8.69365 6.08362C8.72596 6.16954 8.74053 6.26111 8.73647 6.35281L8.73772 6.35094Z" />
                    </svg>
                    {lang === Language.ENG ? 'required' : 'обязательно'}</div>}
                </label>
                <input {...register("news_site", { required: true })} className={`article__search-input form-control ${touchedFields.news_site && errors.news_site ? 'createArticle__search-input_red' : ''}`} placeholder='Add news topic'/>
            </div>

            <div className="createArticle__field">
                <label className="createArticle__field-title form-label"><p>
                    {lang === Language.ENG ? 'Summary' : 'Основной текст'}
                    <span className='createArticle__field-required'>*</span></p>
                    {touchedFields.summary && errors.summary && <div className="createArticle__required">
                    <svg className='createArticle__required-svg' width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14.2664 12.6954L8.93933 2.80266C8.56175 2.10126 7.5559 2.10126 7.17801 2.80266L1.85122 12.6954C1.76924 12.8477 1.72814 13.0186 1.73193 13.1915C1.73572 13.3644 1.78427 13.5334 1.87285 13.6819C1.96143 13.8304 2.087 13.9535 2.23731 14.039C2.38763 14.1245 2.55754 14.1696 2.73048 14.1698H13.3856C13.5587 14.1698 13.7288 14.125 13.8793 14.0396C14.0298 13.9542 14.1556 13.8312 14.2444 13.6826C14.3332 13.534 14.3819 13.3649 14.3857 13.1919C14.3896 13.0189 14.3485 12.8478 14.2664 12.6954ZM8.05883 12.6382C7.93519 12.6382 7.81432 12.6016 7.71152 12.5329C7.60872 12.4642 7.52859 12.3666 7.48128 12.2523C7.43396 12.1381 7.42158 12.0124 7.4457 11.8911C7.46982 11.7699 7.52936 11.6585 7.61679 11.5711C7.70421 11.4836 7.8156 11.4241 7.93687 11.4C8.05813 11.3759 8.18383 11.3882 8.29805 11.4356C8.41228 11.4829 8.50992 11.563 8.57861 11.6658C8.6473 11.7686 8.68396 11.8895 8.68396 12.0131C8.68396 12.0952 8.66779 12.1765 8.63638 12.2523C8.60496 12.3282 8.55891 12.3971 8.50086 12.4551C8.44281 12.5132 8.3739 12.5592 8.29805 12.5907C8.22221 12.6221 8.14092 12.6382 8.05883 12.6382ZM8.73772 6.35094L8.55831 10.1643C8.55831 10.2969 8.50562 10.4241 8.41183 10.5179C8.31804 10.6117 8.19084 10.6644 8.0582 10.6644C7.92556 10.6644 7.79836 10.6117 7.70457 10.5179C7.61078 10.4241 7.55809 10.2969 7.55809 10.1643L7.37868 6.3525C7.37465 6.26141 7.38899 6.17045 7.42087 6.08502C7.45274 5.9996 7.50148 5.92147 7.56419 5.85529C7.62691 5.78911 7.7023 5.73623 7.78588 5.6998C7.86947 5.66338 7.95953 5.64416 8.0507 5.64328H8.05726C8.14906 5.64323 8.2399 5.66178 8.32433 5.69781C8.40876 5.73384 8.48501 5.7866 8.54848 5.85291C8.61196 5.91922 8.66134 5.9977 8.69365 6.08362C8.72596 6.16954 8.74053 6.26111 8.73647 6.35281L8.73772 6.35094Z" />
                    </svg>
                    {lang === Language.ENG ? 'required' : 'обязательно'}</div>}
                </label>
                <textarea {...register("summary", { required: true })} className={`article__search-input form-control ${touchedFields.summary && errors.summary ? 'createArticle__search-input_red' : ''}`} placeholder='Add summary'/>
            </div>

            <button type="submit" className="createArticle__btn">
                {lang === Language.ENG ? 'Create article' : 'Добавить новость'}
            </button>
        </form>

    </div>
}