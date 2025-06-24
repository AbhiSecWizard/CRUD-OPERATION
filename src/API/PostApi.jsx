// Application Programming Interface
import  axios from "axios"

const api = axios.create({
    baseURL :"https://jsonplaceholder.typicode.com" 
})


// get Method api se Data lena 
export const getPost = ()=>{
    return api.get("./posts")
}
// delete
export const deletePost = (id)=>{
    return api.delete(`/posts/${id}`)
}
// add post Into API
export const addPost = (post)=>{
    return api.post("/posts",post)
}
