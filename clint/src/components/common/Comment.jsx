import moment from "moment";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FaThumbsUp } from "react-icons/fa";
import EditcommentModal from "./EditcommentModal";
import ConfirmationModal from "./ConfirmationModal";
import { DeleteComment } from "../../../services/operations/userDetaillsApi";

const Comment = ({ comment, onLike, onEdit }) => {
  const userId = comment.userId;
  const [userData, setUserData] = useState(null);
  const { theme } = useSelector((state) => state.theme);
  const { currentUser } = useSelector((state) => state.user);
  const [editmodaldata, setEditmodaldata] = useState(null);
  const [confirmationData,setConfirmationData]= useState(null);

  useEffect(() => {
    const fetchuserData = async () => {
      try {
        const res = await fetch(`/api/v1/comment/userdetails/${userId}`);
        if (res.ok) {
          const data = await res.json();
          setUserData(data.data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchuserData();
  }, []);
  

  const handleDelete = async(commentId)=>{
    const res = await DeleteComment({commentId:commentId});
    if(res){
      setConfirmationData(null);
      window.location.reload();
    }
  }

  return (
    <div
      className={`flex p-4 border-b ${
        theme === "dark" && "border-gray-600 text-sm"
      }`}
    >
      <div className="flex-shrink-0 mr-3">
        <img
          className="w-10 h-10 rounded-full bg-gray-200"
          src={userData && userData.image}
        />
      </div>
      <div className="flex-1">
        <div className="flex items-center mb-1">
          <span className="font-bold mr-1 text-xs">
            {userData ? `@${userData.username}` : "anonymous user"}
          </span>
          <span className="text-gray-500 text-xs">
            {moment(comment.createdAt).fromNow()}
          </span>
        </div>
        <p className={`text-gray-500 mb-2`}>{comment.content}</p>
        <div className="flex items-center pt-2 text-xs border-t max-w-fit gap-2">
          <button
            type="button"
            onClick={() => onLike(comment._id)}
            className={` ${
              currentUser && comment.likes.includes(currentUser._id)
                ? "text-blue-500"
                : "text-gray-400"
            } hover:text-blue-500 `}
          >
            <FaThumbsUp className="text-sm " />
          </button>
          <span className="text-gray-400">
            {comment.numberOfLikes > 0 &&
              comment.numberOfLikes +
                " " +
                (comment.numberOfLikes === 1 ? "like" : "likes")}
          </span>

          {/* likes and delete button  */}
          {currentUser.isAdmin || currentUser._id === comment.userId ? (
            <div className="text-sm text-gray-400 flex gap-2">
              <button
                type="button"
                onClick={() =>
                  setEditmodaldata({
                    Content: comment.content,
                    btn1Text: "Save",
                    btn2Text: "Cancle",
                    btn2Handler: () => setEditmodaldata(null),
                  })
                }
              >
                Edit
              </button>
              <button type="button" onClick={()=>setConfirmationData({
                        text1: "Are you sure ??",
                        text2: "Would you want to delete your Comment",
                        btn1Text: "Yes I'm Sure",
                        btn1Handler: () => handleDelete(comment._id),
                        btn2Text: "No",
                        btn2Handler: () => setConfirmationData(null),
              })}>Delete</button>
            </div>
          ) : null}
        </div>
      </div>
      {editmodaldata && (
        <EditcommentModal
          onEdit={onEdit}
          commentId={comment._id}
          setEditmodaldata={setEditmodaldata}
          modalData={editmodaldata}
        />
      )}
      {
        confirmationData && (
          <ConfirmationModal modalData={confirmationData} />
        )
      }
    </div>
  );
};

export default Comment;
