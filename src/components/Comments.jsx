import React, { useEffect, useState } from 'react'
import { getCommentsByArticleId } from '../api';
import ErrorPage from './ErrorPage';
import SingleComment from './SingleComment';


const Comments = ({article_id}) => {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);


useEffect(()=>{
  setIsLoading(true);
   getCommentsByArticleId(article_id)
   .then((commentsData) =>{
    setComments(commentsData);
       setIsLoading(false);
    })
    .catch((error)=>{
        setIsLoading(false)
        setIsError(`Error loading comments`)
        console.log("No comments", error);
   });
}, [article_id]);

if (isLoading){
    return <p>Loading...</p>;
}

if(isError){
   return <ErrorPage />;
}


return (
  <>
    <h2>Comments</h2>
    <div>
        {comments.length > 0 ? (comments.map((comment) => (
          <SingleComment key={comment.comment_id}  {...comment}/>
        ))):(
          <p>No comments</p>
        )}
    </div>    
  </>
);
}


export default Comments
