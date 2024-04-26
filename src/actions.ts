export interface Post {
  userId: string;
  id: string;
  title: string;
  body: string;
}

// Define action types as string constants
export const ADD_POST = 'ADD_POST';
export const CLEAR_POSTS = 'CLEAR_POSTS';

// Define action interfaces
interface AddPostAction {
  type: typeof ADD_POST;
  payload: Post;
}

interface ClearPostsAction {
  type: typeof CLEAR_POSTS;
}

// Define a union type of all action types
export type PostActionTypes = AddPostAction | ClearPostsAction;

// Define action creators
export const addPost = (post: Post): AddPostAction => ({
  type: ADD_POST,
  payload: post,
});

export const clearPosts = (): ClearPostsAction => ({
  type: CLEAR_POSTS,
});