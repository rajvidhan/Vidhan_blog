

const BASE_URL ="http://localhost:3000/api/v1"


export const userEndpoints = {
  UPDATE_PROFILE:BASE_URL +"/profile/update-profile",
  DELETE_USER_ACCOUNT:BASE_URL +"/profile/delete-profile",
  CREATE_POST : BASE_URL +"/post/create-post",
  UPLOAD_IMAGE:BASE_URL +"/post/upload-image",
  ALL_POST:BASE_URL + "/post/getAllPosts",
  DELETE_POST:BASE_URL + "/post/deletePost",
  FETCH_PREV_POST_DATA : BASE_URL + "/post/fetchpredata",
  UPDATE_POST : BASE_URL + "/post/updatePost",
  FETCH_USER_DETAILS : BASE_URL + "/profile/getUsers",
  DELETE_USER_DETAILS : BASE_URL + "/profile/deleteUser",
  CREATE_COMMENT:BASE_URL + "/comment/create-comment" ,
  EDIT_COMMENT:BASE_URL+ "/comment/edit-comment",
  DELETE_COMMENT:BASE_URL+"/comment/delete-comment",
  ALL_COMMENT:BASE_URL+"/comment/All-comments",
}