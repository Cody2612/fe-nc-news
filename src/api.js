import axios from "axios";


const api = axios.create({
    baseURL: "https://myfirstapi-vhbe.onrender.com/api"
})  

const getArticles = () => {
    return api.get("/articles").then((response)=>{
        return response.data.articles;
    })
}

const getTopics = () => {
    return api.get("/topics").then((response)=>{
        return response.data.topics;
    })
}

const getArticlesById = (id) => {
    return api.get(`/articles/${id}`).then((response)=>{
        return response.data.article;
    })
}

export { getArticles, getTopics, getArticlesById };