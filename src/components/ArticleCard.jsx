import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const ArticleCard = ({title, topic, article_img_url, author, article_id}) => {
  return (
    <Link to={`/articles/${article_id}`} style={{textDecoration: "none"}}>
        <Card className='h-100'>
            <Card.Img 
                variant="top"
                src={article_img_url}
                alt={title}
                height="200px"
                style={{ objectFit: "cover" }} />
            <Card.Body className="d-flex flex-column"> 
                <Card.Title className='d-flex flex-column align-items-baseline'>
                    <span className="fs1 text-muted small mb-1" > Topic : {topic}</span>
                    <span className="fs1 text-muted small mb-4" > Author : {author}</span>
                    <span className="fs3">{title}</span>

                </Card.Title>
            </Card.Body>
        </Card>
    </Link>
)
}

export default ArticleCard
