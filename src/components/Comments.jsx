import React from 'react'
import CommentCard from './CommentCard';


const Comments = ({comments}) => {

return (
  <>
    <h2>Comments</h2>
    <div>
        {comments.length > 0 ? (comments.map((comment) => (
          <CommentCard key={comment.comment_id}  {...comment}/>
        ))):(
          <p>No comments</p>
        )}
    </div>    
  </>
);
}


export default Comments
