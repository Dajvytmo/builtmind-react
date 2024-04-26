import { useEffect, useState } from "react";
import axios from "axios";
import { Post, addPost, clearPosts, deletePost, updatePost } from "./actions";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./store";

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
      <div className="container mx-auto px-4">
         <div className="mt-8">
            <h1 className="text-3xl font-semibold mb-4">Posts</h1>
            <ul>
               {posts.map((post: Post) => (
                  <li key={post.id} className="mb-4 border p-4 rounded-lg">
                     <p className="text-gray-800 mb-2"><b>{post.title}</b></p>
                     <p className="text-gray-600">{post.body}</p>
                     <div className="flex mt-2">
                        <button 
                           className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mr-2"
                           onClick={() => handleEdit(post)}
                        >
                           Edit
                        </button>
                        <button 
                           className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                           onClick={() => handleDelete(post.id)}
                        >
                           Delete
                        </button>
                     </div>
                  </li>
               ))}
            </ul>
         </div>
         <div className="mt-8 mb-8 flex flex-wrap justify-between">
            <div className="w-full md:w-1/2 mb-8 md:mb-0">
               <h2 className="text-2xl font-semibold mb-4">Add New Post</h2>
               <form onSubmit={handleFormSubmit} className="w-full max-w-md">
                  <div className="mb-4">
                     <label className="block text-gray-700 text-sm font-bold mb-2">Title</label>
                     <input 
                        type="text" 
                        value={newPostTitle} 
                        onChange={(e) => setNewPostTitle(e.target.value)} 
                        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                     />
                  </div>
                  <div className="mb-6">
                     <label className="block text-gray-700 text-sm font-bold mb-2">Body</label>
                     <textarea 
                        value={newPostBody} 
                        onChange={(e) => setNewPostBody(e.target.value)} 
                        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                     ></textarea>
                  </div>
                  <button 
                     type="submit" 
                     className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                  >
                     Add Post
                  </button>
               </form>
            </div>
            {/* Form for editing a post */}
            {editingPost && (
               <div className="w-full md:w-1/2">
                  <h2 className="text-2xl font-semibold mb-4">Edit Post</h2>
                  <form onSubmit={handleEditSubmit} className="w-full max-w-md">
                     <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Title</label>
                        <input 
                           type="text" 
                           value={editedPostTitle} 
                           onChange={(e) => setEditedPostTitle(e.target.value)} 
                           className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                     </div>
                     <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Body</label>
                        <textarea 
                           value={editedPostBody} 
                           onChange={(e) => setEditedPostBody(e.target.value)} 
                           className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        ></textarea>
                     </div>
                     <button 
                        type="submit" 
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                     >
                        Save Changes
                     </button>
                  </form>
               </div>
            )}
         </div>
      </div>
   )
}

export default MainScreen