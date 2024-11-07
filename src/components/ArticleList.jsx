import React, { useEffect, useState } from "react"
import { getArticles } from "../api";
import { Button, Col, Form, Row } from "react-bootstrap";
import ArticleCard from './ArticleCard';
import ErrorPage from "./ErrorPage";


export default function ArticleList () {
   const [articleList, setArticleList] = useState([]);
   const [isLoading, setIsLoading] = useState(false);
   const [isError, setIsError] = useState(false);
   const [sortBy, setSortBy] = useState("created_at");
   const [order, setOrder] = useState("DESC");


useEffect(()=>{
setIsLoading(true);
   getArticles(sortBy, order)
   .then((articlesData) =>{
    setArticleList(articlesData);
       setIsLoading(false);
    })
    .catch((error)=>{
        setIsLoading(false)
        setIsError(`Error loading articles`)
        console.log("No articles", error);
   });
}, [sortBy, order]);

const toggleOrder = () =>{
    setOrder((currentOrder)=>(currentOrder === "ASC" ? "DESC" : "ASC"));
};

if (isLoading){
    return <p>Loading...</p>;
}

if(isError){
   return <ErrorPage />;
}


return (
    <>
        <h2>Article List</h2>
        <Row md={2} xs ={1} className="g-2">
        <div className="d-flex flex  align-items-baseline mb-4" > 
            <p className="me-2">Sort article by:</p>
            <Form.Select
                aria-label="Sort articles by"
                value={sortBy}
                onChange={(event) => setSortBy(event.target.value)}
                style={{ width: '150px', marginRight: '10px' }}
            >
                <option value="author">Author</option>
                <option value="title">Title</option>
                <option value="topic">Topic</option>
                <option value="created_at">Date</option>
                <option value="votes">Votes</option>
                <option value="comment_count">Comment Count</option>
            </Form.Select>
            <p className="me-2">Order:</p>
            <Button variant="secondary" onClick={toggleOrder}>
                 {order === 'ASC' ? 'Ascending' : 'Descending'}
            </Button>
        </div>        
        </Row>
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


