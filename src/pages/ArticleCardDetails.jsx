import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { deleteComment, getArticlesById, getCommentsByArticleId, patchArticleVotes } from '../api';
import ErrorPage from '../components/ErrorPage';
import { Card, Button } from 'react-bootstrap';
import Comments from '../components/Comments';
import AddComment from '../components/AddComment';

const ArticleCardDetails = () => {
  const {article_id} = useParams();
  const [article, setArticle] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [updatedVote, setUpdatedVote] = useState(0);
  const [comments, setComments] = useState([]);
  const [currentUser, setCurrentUser] = useState("cooljmessy")
  
  useEffect(()=>{
    setIsLoading(true);
    Promise.all([getArticlesById(article_id), getCommentsByArticleId(article_id)])
    .then(([articleData, commentsData])=>{
      setArticle(articleData);
      setComments(commentsData);
      setIsLoading(false);
    })
    .catch((error)=>{
      setIsLoading(false)
      setIsError(true);
 });
}, [article_id])

const handleUpdatedVote = (updatedVote) => {
  setArticle((currArticle) =>({
    ...currArticle, votes: currArticle.votes + updatedVote,
  }));
  setUpdatedVote((currentVote) => currentVote + updatedVote);

  patchArticleVotes(article_id, updatedVote)
  .catch((error) => {
    console.log("Voting isn't possible, try again later", error);

  setArticle((currArticle) =>({
      ...currArticle, votes: currArticle.votes - updatedVote,
  }));
  setUpdatedVote((currentVote) => currentVote - updatedVote)
  });
}

const handleAddComment = (newComment) =>{
  setComments((currentComments)=> [newComment, ...currentComments]);
}

const handleDeleteComment = (comment_id) => {
  deleteComment(comment_id)
  .then(()=>{
    setComments((currentComments) => currentComments.filter(comment => comment.comment_id !== comment_id))
  })
  .catch((error)=>{
    setIsError(true);
    return <ErrorPage message="Not possible to delete comment" />;
  })
}
  
if (isLoading){
    return <p>Loading...</p>;
}

if(isError){
   return <ErrorPage message="No article" />;
}
  
  return (
    <div>
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
            <Button 
                variant="success" 
                className="me-2 align-items-center"
                onClick={()=> handleUpdatedVote(1)}
                disabled={updatedVote === 1}
              >
              <svg  xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-hand-thumbs-up me-1" viewBox="0 0 16 16">
                <path d="M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 0 0 .254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2 2 0 0 0-.138-.362 1.9 1.9 0 0 0 .234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a10 10 0 0 0-.443.05 9.4 9.4 0 0 0-.062-4.509A1.38 1.38 0 0 0 9.125.111zM11.5 14.721H8c-.51 0-.863-.069-1.14-.164-.281-.097-.506-.228-.776-.393l-.04-.024c-.555-.339-1.198-.731-2.49-.868-.333-.036-.554-.29-.554-.55V8.72c0-.254.226-.543.62-.65 1.095-.3 1.977-.996 2.614-1.708.635-.71 1.064-1.475 1.238-1.978.243-.7.407-1.768.482-2.85.025-.362.36-.594.667-.518l.262.066c.16.04.258.143.288.255a8.34 8.34 0 0 1-.145 4.725.5.5 0 0 0 .595.644l.003-.001.014-.003.058-.014a9 9 0 0 1 1.036-.157c.663-.06 1.457-.054 2.11.164.175.058.45.3.57.65.107.308.087.67-.266 1.022l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.414-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.047.047.109.177.005.488a2.2 2.2 0 0 1-.505.805l-.353.353.353.354c.006.005.041.05.041.17a.9.9 0 0 1-.121.416c-.165.288-.503.56-1.066.56z"/>
              </svg>
              <span >Like</span>
              </Button>
              <Button 
                variant="danger"
                className="me-2 align-items-center"
                onClick={()=> handleUpdatedVote(-1)}
                disabled={updatedVote === -1}
              >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-hand-thumbs-down me-1" viewBox="0 0 16 16">
                <path d="M8.864 15.674c-.956.24-1.843-.484-1.908-1.42-.072-1.05-.23-2.015-.428-2.59-.125-.36-.479-1.012-1.04-1.638-.557-.624-1.282-1.179-2.131-1.41C2.685 8.432 2 7.85 2 7V3c0-.845.682-1.464 1.448-1.546 1.07-.113 1.564-.415 2.068-.723l.048-.029c.272-.166.578-.349.97-.484C6.931.08 7.395 0 8 0h3.5c.937 0 1.599.478 1.934 1.064.164.287.254.607.254.913 0 .152-.023.312-.077.464.201.262.38.577.488.9.11.33.172.762.004 1.15.069.13.12.268.159.403.077.27.113.567.113.856s-.036.586-.113.856c-.035.12-.08.244-.138.363.394.571.418 1.2.234 1.733-.206.592-.682 1.1-1.2 1.272-.847.283-1.803.276-2.516.211a10 10 0 0 1-.443-.05 9.36 9.36 0 0 1-.062 4.51c-.138.508-.55.848-1.012.964zM11.5 1H8c-.51 0-.863.068-1.14.163-.281.097-.506.229-.776.393l-.04.025c-.555.338-1.198.73-2.49.868-.333.035-.554.29-.554.55V7c0 .255.226.543.62.65 1.095.3 1.977.997 2.614 1.709.635.71 1.064 1.475 1.238 1.977.243.7.407 1.768.482 2.85.025.362.36.595.667.518l.262-.065c.16-.04.258-.144.288-.255a8.34 8.34 0 0 0-.145-4.726.5.5 0 0 1 .595-.643h.003l.014.004.058.013a9 9 0 0 0 1.036.157c.663.06 1.457.054 2.11-.163.175-.059.45-.301.57-.651.107-.308.087-.67-.266-1.021L12.793 7l.353-.354c.043-.042.105-.14.154-.315.048-.167.075-.37.075-.581s-.027-.414-.075-.581c-.05-.174-.111-.273-.154-.315l-.353-.354.353-.354c.047-.047.109-.176.005-.488a2.2 2.2 0 0 0-.505-.804l-.353-.354.353-.354c.006-.005.041-.05.041-.17a.9.9 0 0 0-.121-.415C12.4 1.272 12.063 1 11.5 1"/>
              </svg>
              <span >Dislike</span>
              </Button>
            </div>
          </div>
        </Card.Body>
        <Card.Footer>
        <h4>Post a comment</h4>
        <AddComment article_id={article_id} onNewComment={handleAddComment} />
      </Card.Footer>
      </Card> 

      <Card >
        <Card.Body>
            <Comments comments={comments} article_id={article_id} currentUser={currentUser} onDeleteComment={handleDeleteComment}  />
        </Card.Body>
      </Card>
    </div>
  )
}

export default ArticleCardDetails
