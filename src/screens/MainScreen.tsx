import { useEffect, useState } from "react";
import axios from "axios";
import { Post, addPost, clearPosts, deletePost, updatePost } from "../actions";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";

const MainScreen = () => {
   const useAppDispatch = useDispatch.withTypes<AppDispatch>()
   const useAppSelector = useSelector.withTypes<RootState>()

   const dispatch = useAppDispatch()
   const posts = useAppSelector((state: RootState) => state.posts);

   const [newPostTitle, setNewPostTitle] = useState("");
   const [newPostBody, setNewPostBody] = useState("");

   const [editingPost, setEditingPost] = useState<Post | null>(null);
   const [editedPostTitle, setEditedPostTitle] = useState("");
   const [editedPostBody, setEditedPostBody] = useState("");

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

   const handleEdit = (post: Post) => {
      // Set the editing Post state to the post being edited
      setEditingPost(post);
      setEditedPostTitle(post.title);
      setEditedPostBody(post.body);
   };
   
   const handleEditSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      // Create a new post object with the edited data
      const updatedPost: Post = {
         ...editingPost!,
         title: editedPostTitle,
         body: editedPostBody
      };
     
      dispatch(updatePost(updatedPost));
      
      // Reset the editing state
      setEditingPost(null);
      setEditedPostTitle("");
      setEditedPostBody("");
   };

   const handleDelete = (postId: string) => {
      dispatch(deletePost(postId));
   };

   return (
      <>
      <div>
         <h3>Posts</h3>
         <ul>
         {posts.map((post: Post) => (
            <li key={post.id}>
               ID: {post.id}, UserID: {post.userId}: <b>{post.title}</b> - {post.body}
               {/* Edit button */}
               <button onClick={() => handleEdit(post)}>Edit</button>
               {/* Delete button */}
               <button onClick={() => handleDelete(post.id)}>Delete</button>
            </li>
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
      {/* Form for editing a post */}
      {editingPost && (
         <div>
            <h3>Edit Post</h3>
            <form onSubmit={handleEditSubmit}>
               <label>Title:</label>
               <input type="text" value={editedPostTitle} onChange={(e) => setEditedPostTitle(e.target.value)} />
               <br />
               <label>Body:</label>
               <textarea value={editedPostBody} onChange={(e) => setEditedPostBody(e.target.value)} />
               <br />
               <button type="submit">Save Changes</button>
            </form>
         </div>
      )}
      </>
   )
}

export default MainScreen