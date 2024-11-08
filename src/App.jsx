import { useState } from 'react'
import { Container } from 'react-bootstrap'
import { Routes, Route } from 'react-router-dom'
import Navigation from './components/Navigation'
import Articles from '../src/pages/Articles'
import Topics from '../src/pages/Topics'
import Logout from'../src/pages/Logout'
import Login from'../src/pages/Login'
import ArticleCardDetails from './pages/ArticleCardDetails'
import TopicArticle from './components/TopicArticle'
import ErrorPage from './components/ErrorPage'


function App() {

  return (
    <>
      <Navigation />
      <Container className='mb-4'>
      <Routes>
        <Route path ="/" element = {<Articles />}/>
        <Route path ="/articles/:article_id" element = {<ArticleCardDetails />}/>
        <Route path ="/topics" element = {<Topics />}/>
        <Route path ="/topics/:topic_slug" element = {<TopicArticle />}/>
        <Route path="/logout" element = {<Logout />} />
        <Route path="/login" element = {<Login />} />
        <Route path="*" element = {<ErrorPage message="Oh no. Page doesn't exist!" />} />
      </Routes>
    </Container>
    </>
  )
}

export default App
