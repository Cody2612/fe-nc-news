import React from 'react'
import { Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const ErrorPage = ({message="Oh no. An error!", Home="/"}) => {
  return (
    <Container className='d-flex flex-column mt-5'>
      <div className="justify-content-center align-content-center mx-auto ">
      <h1>{message}</h1>
      <Link to = {Home}>Let's get back Home</Link>
      </div>
    </Container>
  )
}

export default ErrorPage
