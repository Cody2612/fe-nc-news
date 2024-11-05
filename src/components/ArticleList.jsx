import React, { useEffect, useState } from "react"
import { getArticles } from "../api";
import { Col, Row } from "react-bootstrap";
import ArticleCard from './ArticleCard';
import ErrorPage from "./ErrorPage";


export default function ArticleList () {
   const [articleList, setArticleList] = useState([]);
   const [isLoading, setIsLoading] = useState(false);
   const [isError, setIsError] = useState(false);


useEffect(()=>{
setIsLoading(true);
   getArticles()
   .then((articlesData) =>{
    setArticleList(articlesData);
       setIsLoading(false);
    })
    .catch((error)=>{
        setIsLoading(false)
        setIsError(`Error loading articles`)
        console.log("No articles", error);
   });
}, []);

if (isLoading){
    return <p>Loading...</p>;
}

if(isError){
   return <ErrorPage />;
}


return (
    <>
        <h2>Article List</h2>
        <Row md={2} xs={1} lg={3} className="g-3">
            {articleList.map((article) =>(
                <Col key={article.article_id}>
                    <ArticleCard {...article}/>
                </Col>
               ))}
        </Row>
    </>    
   )
}


