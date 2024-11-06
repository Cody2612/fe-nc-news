import React from 'react'
import { Card, Button } from 'react-bootstrap'

const CommentCard = ({comment_id, author, body, votes, created_at, onDeleteComment, currentUser }) => {

  const isMyOwnComment = currentUser === author;

  const handleDelete = () => {
    onDeleteComment(comment_id);
  }
  
  return (
    <Card className="mb-2">
      <Card.Body>
        <Card.Subtitle className="mb-3 text-muted">
          By {author} on {created_at}
        </Card.Subtitle>
        <Card.Text>{body}</Card.Text>
        <div className="d-flex justify-content-between align-items-center">
          <span>Votes: {votes}</span>
          {isMyOwnComment && (<Button variant="outline-danger" size="sm" onClick={handleDelete}>Delete</Button>)}
        </div>
      </Card.Body>
    </Card>
  )
}

export default CommentCard
