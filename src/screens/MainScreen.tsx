import { useEffect, useState } from "react";
import axios from "axios";
import { Post, addPost, clearPosts } from "../actions";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";

const MainScreen = () => {
   const useAppDispatch = useDispatch.withTypes<AppDispatch>()
   const useAppSelector = useSelector.withTypes<RootState>()

   const dispatch = useAppDispatch()
   const posts = useAppSelector((state: RootState) => state.posts);
   
   const [newPostTitle, setNewPostTitle] = useState("");
   const [newPostBody, setNewPostBody] = useState("");

   useEffect(() => {
      axios.get(`https://jsonplaceholder.typicode.com/posts`)
         .then(response => {
            // Clear existing posts before adding new ones
            dispatch(clearPosts());
            response.data.forEach((post: Post) => {
               dispatch(addPost(post));
            });
         })
         .catch(error => {
            console.error("Error fetching posts:", error);
         });
   }, [dispatch]);

   const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      // Simulate a POST request by dispatching an action to add the new post
      const newPost: Post = {
         userId: '11', 
         id: (posts.length + 1).toString(),
         title: newPostTitle,
         body: newPostBody
      };
      
      dispatch(addPost(newPost));

      // Reset the form fields
      setNewPostTitle("");
      setNewPostBody("");
   };


   return (
      <>
      <div>
         <h3>Posts</h3>
         <ul>
         {posts.map((post: Post) => (
            <li>ID: {post.id}, UserID: {post.userId}: <b>{post.title}</b> - {post.body}</li>
         ))}
         </ul>
      </div>
      <div>
         <h3>Add New Post</h3>
         <form onSubmit={handleFormSubmit}>
            <label>Title:</label>
            <input type="text" value={newPostTitle} onChange={(e) => setNewPostTitle(e.target.value)} />
            <br />
            <label>Body:</label>
            <textarea value={newPostBody} onChange={(e) => setNewPostBody(e.target.value)} />
            <br />
            <button type="submit">Add Post</button>
         </form>
      </div>
      </>
   )
}

export default MainScreen