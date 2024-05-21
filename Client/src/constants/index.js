export const BASE_URL="http://localhost:8800";

const API_VERSION = "/api/v1"

export const URLS = {
    // LOGIN
    LOGIN: API_VERSION + "/users/login",
    REGISTER: API_VERSION + "/users/register",
    GENERATE_FP:API_VERSION + "/users/generate-fp-token",
    VERIFY_FP:API_VERSION + "/users/verify-fp-token",
    BLOGS:API_VERSION +"/blogs",
    PUBLISHEDBLOGS: API_VERSION + "/blogs/publishedOnly",
    GETBYSLUG: API_VERSION + "/blogs/slug",
    USERS:API_VERSION + "/users",
}