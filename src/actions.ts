export const ADD_POST = 'ADD_POST';

export interface Post {
  userId: string;
  id: string;
  title: string;
  body: string;
}

interface AddPostAction {
  type: typeof ADD_POST;
  payload: Post;
}

export type PostActionTypes = AddPostAction;

export const addPost = (post: Post): PostActionTypes => ({
  type: ADD_POST,
  payload: post,
});