import React, { useEffect, useState } from 'react'
import { getTopics } from '../api';
import ErrorPage from './ErrorPage';
import { Card, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const TopicList = () => {
  const[ topics, setTopics] = useState([]);
  const[ isLoading, setIsLoading] = useState(true);
  const[ isError, setIsError] = useState(false);
  

  useEffect(()=>{
    getTopics()
    .then((topicsData)=>{
      setTopics(topicsData);
      setIsLoading(false);
    })
    .catch((error)=>{
      setIsLoading(false)
      setIsError(true);
      console.log("No topics !", error);
    })
  }, []);

  if (isLoading){
    return <p>Loading...</p>;
}

if(isError){
   return <ErrorPage />;
}

  return (
    <>
    <Row md={2} xs={1} lg={3} className="g-3 ">
        {topics.map((topic) =>(
              <Col key={topic.slug}>
                <Link to={`${topic.slug}`} style={{textDecoration: "none"}}> 
                    <Card className='h-100'>
                      <Card.Body className="d-flex justify-content-center align-content-center">
                        <Card.Title className='d-flex flex-column align-items-baseline fs-2'>{topic.slug}</Card.Title>
                      </Card.Body>
                    
                    </Card>
                </Link>
            </Col>
           ))}
    </Row>
</>    
  )
}

export default TopicList
