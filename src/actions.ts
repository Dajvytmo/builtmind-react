export interface Post {
  userId: string;
  id: string;
  title: string;
  body: string;
}

export const ADD_POST = 'ADD_POST';
export const CLEAR_POSTS = 'CLEAR_POSTS';
export const UPDATE_POST = 'UPDATE_POST';
export const DELETE_POST = 'DELETE_POST'

interface AddPostAction {
  type: typeof ADD_POST;
  payload: Post;
}

interface ClearPostsAction {
  type: typeof CLEAR_POSTS;
}

interface UpdatePostAction {
  type: typeof UPDATE_POST;
  payload: Post;
}

interface DeletePostAction {
  type: typeof DELETE_POST;
  payload: string; // Post ID
}

export type PostActionTypes = AddPostAction | ClearPostsAction | UpdatePostAction | DeletePostAction;

export const addPost = (post: Post): AddPostAction => ({
  type: ADD_POST,
  payload: post,
});

export const clearPosts = (): ClearPostsAction => ({
  type: CLEAR_POSTS,
});

export const updatePost = (post: Post): UpdatePostAction => ({
  type: UPDATE_POST,
  payload: post,
});

export const deletePost = (postId: string): DeletePostAction => ({
  type: DELETE_POST,
  payload: postId,
});