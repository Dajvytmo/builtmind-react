import { ADD_POST, CLEAR_POSTS, Post, PostActionTypes } from "./actions";

interface PostsState {
   posts: Post[];
 }
 
 const initialState: PostsState = {
   posts: [],
 };
 
 const postsReducer = (state = initialState, action: PostActionTypes): PostsState => {
   switch (action.type) {
      case ADD_POST:
        return {
          ...state,
          posts: [...state.posts, action.payload],
        };
      case CLEAR_POSTS:
        return {
          ...state,
          posts: [],
        };
      default:
        return state;
    }
 };
 
 export default postsReducer;