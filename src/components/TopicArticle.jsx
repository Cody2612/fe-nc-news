import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getArticlesByTopic } from '../api';
import { Card, Col, Row } from 'react-bootstrap';
import ErrorPage from '../components/ErrorPage';

const TopicArticle= () => {
  const {topic_slug} = useParams();
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  
  useEffect(()=>{
    getArticlesByTopic(topic_slug)
    .then((articlesData) =>{
        setArticles(articlesData);
          setIsLoading(false);
    })
    .catch((error)=>{
      setIsLoading(false)
      setIsError(`Error loading articles`)
      console.log("No articles", error);
    });
  }, [topic_slug]);

  if (isLoading){
    return <p>Loading...</p>;
  }

  if(isError){
  return <ErrorPage/>;
  }
  
  return (
    <>
        <h2>Topic: Article List</h2>
        <Row md={2} xs={1} lg={3} className="g-3">
            {articles.map((article) =>(
                <Col key={article.article_id}>
                    <Link to={`/articles/${article.article_id}`} style={{textDecoration: "none"}}>
                      <Card className='h-100'>
                          <Card.Img 
                              variant="top"
                              src={article.article_img_url}
                              alt={article.title}
                              height="200px"
                              style={{ objectFit: "cover" }} />
                          <Card.Body className="d-flex flex-column"> 
                              <Card.Title className='d-flex flex-column align-items-baseline'>
                                  <span className="fs1 text-muted small mb-1" > Topic : {article.topic}</span>
                                  <span className="fs1 text-muted small mb-4" > Author : {article.author}</span>
                                  <span className="fs3">{article.title}</span>

                              </Card.Title>
                          </Card.Body>
                      </Card>
                  </Link>
                </Col>
               ))}
        </Row>
    </>   
  )
}

export default TopicArticle
