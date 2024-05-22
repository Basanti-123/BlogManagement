import moment from "moment";
import {jwtDecode} from "jwt-decode";
import { getToken } from "./session";


export const isLoggedIn = () => {
    const token = getToken("access_token");
    if (!token) return false;
    const {exp} = jwtDecode(token);
    const now = moment(new Date().valueOf());  //currentTimeStamp
    const expDate = moment.unix(exp);  //expTimeStamp
    if (now> expDate) return false;
    return true;

};


export const validRole = (role) => {
    if (role === "") return true;
    const token = getToken("access_token");
    const {data:user} = jwtDecode(token);
    const isValid = user.roles.includes(role);
    if(!isValid) return false;
    return true;
};

export const createUser = () => {
    const token = getToken("access_token");
    const {data} = jwtDecode(token);
   return localStorage.setItem("currentUser", JSON.stringify(data));
};

export const getUser = ()=>{
    return localStorage.getItem("currentUser");
}
