import React from 'react'
import { Card, Button } from 'react-bootstrap'

const CommentCard = ({author, body, votes, created_at}) => {
  return (
    <Card className="mb-2">
      <Card.Body>
        <Card.Subtitle className="mb-3 text-muted">
          By {author} on {created_at}
        </Card.Subtitle>
        <Card.Text>{body}</Card.Text>
        <div className="d-flex justify-content-between align-items-center">
          <span>Votes: {votes}</span>
          <Button variant="outline-danger" size="sm">Delete</Button>
        </div>
      </Card.Body>
    </Card>
  )
}

export default CommentCard
