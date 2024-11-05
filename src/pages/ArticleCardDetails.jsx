import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getArticlesById } from '../api';
import ErrorPage from '../components/ErrorPage';
import { Card, Button } from 'react-bootstrap';

const ArticleCardDetails = () => {
  const {article_id} = useParams();
  const [article, setArticle] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(null);
  
  useEffect(()=>{
    setIsLoading(true);
    getArticlesById(article_id)
    .then((articleData)=>{
      setArticle(articleData);
      setIsLoading(false);
    })
    .catch((error)=>{
      setIsLoading(false)
      setIsError(`Error loading article`)
      console.log("No article", error);
 });
}, [article_id])
  
if (isLoading){
    return <p>Loading...</p>;
}

if(isError){
   return <ErrorPage />;
}
  
  return (
    <div className="border-2">
      <h2>{article.title}</h2>
      <Card>
        <Card.Img variant="top" src={article.article_img_url} alt={article.title} />
        <Card.Body>
          <Card.Title>{article.title}</Card.Title>
          <Card.Subtitle className="mb-4 text-muted">By {article.author}</Card.Subtitle>
          <p>{article.body}</p>
          <div className="d-flex flex-column">
            <span className="mb-2">Votes: {article.votes}</span>
            <div>
              <Button variant="success" className="me-2">Vote Up</Button>
              <Button variant="danger">Vote Down</Button>
            </div>
          </div>
        </Card.Body>
      </Card> 
      <Card >
        <Card.Body>
          <div>
            previous comments
          </div>
        </Card.Body>

        <Card.Footer className="py-3 border-0" style={{backgroundColor: "#f8f9fa"}}>
          <div className="d-flex flex-start w-100">
            
            <div className="form-outline w-100">
              <textarea className="form-control" id="textAreaExample" rows="4"
                style={{background: "#fff"}}></textarea>
              <label className="form-label" htmlFor="textAreaExample">Message</label>
            </div>
          </div>
          <div className="float-end mt-2 pt-1">
            <Button variant="outline-primary" size="sm" className="me-2">Add comment</Button>
            <Button variant="outline-danger" size="sm">Cancel</Button>
          </div>
        </Card.Footer>
      </Card>

      
      {/* <Card className="my-5">
        <Card.Body>
          <Card.Title>{article.title}</Card.Title>
          <Card.Subtitle className="mb-4 text-muted">By {article.author}</Card.Subtitle>
          <p>{article.body}</p>
          <div className="d-flex flex-column">
            <span className="mb-2">Votes: {article.votes}</span>
            <div>
              <Button variant="success" className="me-2">Vote Up</Button>
              <Button variant="danger">Vote Down</Button>
            </div>
          </div>
        </Card.Body>
      </Card> */}
      
       
     

    </div>
  )
}

export default ArticleCardDetails
