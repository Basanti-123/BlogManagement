import instance from "../utils/api";
import { URLS } from "../constants";


 const create = (payload) =>{
    return instance.post(URLS.BLOGS, payload, {
        headers:{
           access_token: localStorage.getItem("access_token"),
           "Content-Type":"multipart/form-data",
        },
        },);
};

const list = (limit, page) =>{
return instance.get(`${URLS.BLOGS}?limit=${limit}&page=${page}`, {
 headers: {
    access_token: localStorage.getItem("access_token"),

 },
});

};

const changeStatus =(id)=>{
    return instance.patch(URLS.BLOGS + `/status/${id}`, {
        headers:{
           access_token: localStorage.getItem("access_token"),
        },
})
};


const getById =(id) =>{
   return instance.get(URLS.BLOGS + `/${id}`, {
       headers:{
          access_token: localStorage.getItem("access_token"),
       }
       },)
};

const update =(id, payload)=>{
    return instance.put(URLS.BLOGS + `/${id}`, payload, {
        headers:{
           access_token: localStorage.getItem("access_token"),
        },
})
};


const remove =(id)=>{
    return instance.delete(URLS.BLOGS + `/${id}`, {
        headers:{
           access_token: localStorage.getItem("access_token"),
        },
})
};



const BlogServices = {
    changeStatus,
    create,
    getById,
    list,
    remove,
    update
}

export default BlogServices