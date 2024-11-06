import React from 'react'
import CommentCard from './CommentCard';


const Comments = ({comments = [], currentUser, onDeleteComment, article_id}) => {

return (
  <>
    <h2>Comments</h2>
    <div>
        {comments.length > 0 ? (comments.map((comment) => (
          <CommentCard 
            key={comment.comment_id}  
            {...comment}
            currentUser={currentUser}
            onDeleteComment={onDeleteComment}
            article_id={article_id}
            />
        ))):(
          <p>No comments</p>
        )}
    </div>    
  </>
);
}


export default Comments
