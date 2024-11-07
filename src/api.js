import axios from "axios";


const api = axios.create({
    baseURL: "https://myfirstapi-vhbe.onrender.com/api"
})  

export const getArticles = (sortBy = "created_at", order = "DESC") => {
    return api.get("/articles", {params: {sort_by: sortBy, order: order},}).then((response)=>{
        return response.data.articles;
    })
}

export const getTopics = () => {
    return api.get("/topics").then((response)=>{
        return response.data.topics;
    })
}

export const getArticlesById = (id) => {
    return api.get(`/articles/${id}`).then((response)=>{
        return response.data.article;
    })
}
export const getArticlesByTopic = (topic_slug) => {
    return api.get(`/articles?topic=${topic_slug}`).then((response)=>{
        return response.data.articles;
    })
}

export const getCommentsByArticleId = (id) => {
    return api.get(`/articles/${id}/comments`).then((response)=>{
        return response.data.comments;
    })
}

export const patchArticleVotes = (id, updatedVote) => {
    return api.patch(`/articles/${id}`, {inc_votes: updatedVote}).then((response)=>{
        return response.data.article;
    })
}

export const postArticleComment = (id, username, body) =>{
    return api.post(`/articles/${id}/comments`, {username, body}).then((response)=>{
        return response.data.comment;
    })
}

export const deleteComment = (comment_id) => {
    return api.delete(`/comments/${comment_id}`).then((response)=>{
        return response.data;
    })
}