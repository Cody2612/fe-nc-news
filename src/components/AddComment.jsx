import React, { useState } from 'react'
import { Card, Button} from 'react-bootstrap'
import { postArticleComment } from '../api';

const AddComment = ({article_id, onNewComment}) => {
  const [body, setBody] = useState("");
  const [submit, setSubmit] = useState(false);

  const handleSubmit = (event) =>{
    event.preventDefault();
    setSubmit(true);
    const username = "cooljmessy";

    postArticleComment(article_id, username, body)
    .then((newComment)=>{
      onNewComment(newComment);
      setBody("");
      setSubmit(false);
    }).catch((error)=>{
      console.log("No comment has been posted, try again later", error);
      setSubmit(false);
    })
  }

  return (
    
    <Card.Body className="py-3 border-0" style={{backgroundColor: "#f8f9fa"}}>
      <form onSubmit={handleSubmit}>
          <div className="d-flex flex-start w-100">
            
            <div className="form-outline w-100">
              <textarea className="form-control" id="textAreaExample" rows="4" 
                style={{background: "#fff"}}
                required 
                value={body} 
                onChange={(event)=> setBody(event.target.value)}></textarea>
              <label className="form-label" htmlFor="textAreaExample">Message</label>
            </div>
          </div>
          <div className="float-end mt-2 pt-1">
            <Button 
              variant="outline-primary" 
              size="sm" 
              className="me-2"
              type="submit"
              disabled={submit}
            >
              Add comment
            </Button>
            <Button 
              variant="outline-danger" 
              size="sm"
              onClick={() => setBody('')}
              disabled={submit}
            >
              Cancel
            </Button>
          </div>
      </form>
    </Card.Body>
  )
}

export default AddComment
