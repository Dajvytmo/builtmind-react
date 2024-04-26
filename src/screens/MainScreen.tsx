import { useEffect, useState } from "react";
import axios from "axios";

const MainScreen = () => {
   
   type Post = {
      userId: string
      id: string
      title: string
      body: string
    };

   const [posts, setPosts] = useState<[] | Post[]>([]);

    useEffect(() => {
      axios.get(`https://jsonplaceholder.typicode.com/posts`)
      .then(response => {
        setPosts(response.data)
      })
   }, []);


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
      </>
   )
}

export default MainScreen