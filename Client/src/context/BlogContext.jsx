import { useState, createContext, useContext, useEffect } from "react";
import useBlogs from "../hooks/useBlogs";

const BlogContext = createContext(null);

export const BlogContextProvider = ({children}) => {
    const {error, loading, publishedBlogsOnly, data} = useBlogs();
    const [currentPage, setCurrentPage] = useState(1);
    const[limit, setLimit] = useState(20);
    const[author, setAuthor] = useState("");
    const[title, setTitle] = useState("");

useEffect(()=> {
    publishedBlogsOnly({author, title,page:currentPage, limit});
}, [publishedBlogsOnly, currentPage, limit, author, title]);
    return(
    <BlogContext.Provider 
    value={{
        data,  
        loading, 
        error, 
        currentPage, 
        limit,
        setCurrentPage,
        setAuthor,
        setTitle,
         setLimit,
    }}>
     {children}
    </BlogContext.Provider>
    );
};

export const useBlogContext = () => {
    const context = useContext(BlogContext); 
    if (context === undefined) throw new Error("Blog Context is invalid");
    return context;
}