import { useCallback, useState } from "react";
import instance from "../utils/api";
import { URLS } from "../constants";

const useBlogs = () => {
    const [data, setData] = useState({});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const list = async ({page, limit}) => {
        try{
            setLoading(true);
            const {data} = await instance.get(
                `${URLS.BLOGS}?page= ${page}&limit=${limit}`
            );

            setData(data.data);
            return data.data;
        } catch (e) {
            const err = e.response ? e.response.data.msg : "Something went wrong";
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const publishedBlogsOnly =  useCallback(
        async ({author, title, page, limit}) => {
        try{
            setLoading(true);
            const {data} = await instance.get(
                `${URLS.PUBLISHEDBLOGS}?author=${author}&title=${title}&page= ${page}&limit=${limit}`
            );

            setData(data.data);
            return data.data;
        } catch (e) {
            const err = e.response ? e.response.data.msg : "Something went wrong";
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    
    const getBySlug = useCallback(async (slug) => {
        
            try{
                setLoading(true);
                const {data} = await instance.get
                    (`${URLS.GETBYSLUG}/${slug}`);
                  //  console.log({data})
                return data.data;

            } catch (e) {
                const err = e.response ? e.response.data.msg : "Something went wrong";
                setError(err);
                throw err;
            } finally {
                setLoading(false);
            }
        
        }, []);
   
  
       

    const create = () => {};
    const getById = (id) => {};
    const remove = (id) => {};
    const update = (id, payload) => {};

    return {list, publishedBlogsOnly, getBySlug, data, error, loading};

  
}
export default useBlogs;