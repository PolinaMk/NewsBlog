import React from 'react';
import { useEffect, useState } from "react";
import { createArticle } from "../api/articleService";
import { useForm, SubmitHandler } from "react-hook-form"
import ImageUploading from 'react-images-uploading';
import { divide } from "lodash";


interface IForm {
    image_url: File;
    text: string;
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

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors, touchedFields }
    } = useForm<IForm>({
        defaultValues: {
            title: 'New Title',
        },
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
            alert(`Article: ${data.title} - has been added`)
        } catch (e: any) {
            alert(e?.message)
        }
    }

    return <div>
        <h1>Create new article</h1>
        <form className="needs-validation" onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
                <label className="form-label">Image *</label>
                <input className="form-control" type="file" accept=".ipeg,.jpg,.png" onChange={onFileChange} />
                {image && <div className='input__img-wrapper'><img className="input__img" src={image} alt="" /></div>}
                {touchedFields.text && errors.text && <div className="form-text text-danger">Please add image</div>}
            </div>
            <div className="mb-3">
                <label className="form-label">Title *</label>
                <input {...register("title", { required: true })} className="form-control" />
                {touchedFields.title && errors.title && <div className="form-text text-danger">Please fill out this field</div>}
            </div>
            <div className="mb-3">
                <label className="form-label">Text *</label>
                <input {...register("text", { required: true })} className="form-control" />
                {touchedFields.text && errors.text && <div className="form-text text-danger">Please fill out this field</div>}
            </div>
            <div className="mb-3">
                <label className="form-label">Lesson number *</label>
                <input {...register("news_site", { required: true })} className="form-control" />
                {touchedFields.news_site && errors.news_site && <div className="form-text text-danger">Please fill out this field</div>}
            </div>
            <div className="mb-3">
                <label className="form-label">Description *</label>
                <textarea {...register("summary", { required: true })} className="form-control" />
                {touchedFields.summary && errors.summary && <div className="form-text text-danger">Please fill out this field</div>}
            </div>
            <button type="submit" className="btn btn-primary">Create article</button>
        </form>
    </div>
}