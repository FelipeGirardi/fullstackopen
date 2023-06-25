import axios from "axios";
const baseUrl = "/api/blogs";

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAllBlogs = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createBlog = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const updateBlogLike = async (id) => {
  const object = await axios.get(`${baseUrl}/${id}`)
  const updatedBlog = { ...object.data, likes: object.data.likes + 1 }
  const response = await axios.put(`${baseUrl}/${id}`, updatedBlog);
  return response.data;
};

const deleteBlog = async (id) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.delete(`${baseUrl}/${id}`, config);
  return response.data;
};

export default { setToken, getAllBlogs, createBlog, updateBlogLike, deleteBlog };
