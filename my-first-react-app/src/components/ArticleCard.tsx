import { Link } from "react-router-dom"
import { Article } from "../api/articleService"

interface ArticleCardProps {
    article: Article
}

export const ArticleCard: React.FC<ArticleCardProps>  = ({article}) => {

    return <Link className="article__card" to={`/articles/${article.id}`}>
            <div className="article__image-block">
                <img src={article.image_url} className="article__image" alt="..."/>
            </div>
            <div className="article__card-body">
                <p className="article__card-time">{article.published_at}</p>
                <h5 className="article__card-title">{article.title}</h5>
            </div>
    </Link>
}