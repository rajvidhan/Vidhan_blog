import React, { useState } from "react";
import { useSelector } from "react-redux";
import { MdDeleteSweep } from "react-icons/md";
import { LuExternalLink } from "react-icons/lu";
import ConfirmationModal from "./ConfirmationModal";

const CommentCard = ({ comments }) => {
  const { theme } = useSelector((state) => state.theme);
  const [showmore, setShowMore] = useState(false);
  const [confirmationmodalData, setConfirmationModalData] = useState(null);

  let Comments;
  if (showmore) {
    Comments = comments;
  } else {
    Comments = comments.slice(0, 7);
  }

  return (
    <div>
      <div className="my-8 text-richblack-5">
        <div
          className={`hidden lg:flex    rounded-t-lg ${
            theme === "light" ? "bg-[#f5f5f5] text-black" : "bg-richblack-500"
          } `}
        >
          <p className="w-[16%] px-5 py-3">Date</p>
          <p className="w-[16%] px-2 py-3">Comment Content</p>
          <p className="w-[16%] px-2 py-3">Number Of Likes</p>
          <p className="w-[16%] px-2 py-3">Postid</p>
          <p className="w-[16%] px-2 py-3">Userid</p>
          <p className="w-[16%] px-2 py-3">Delete</p>
        </div>

        {Comments.length === 0 ? (
          <div className="items-center flex justify-center mt-10 font-bold text-4xl">
            No Posts Created Yet
          </div>
        ) : (
          Comments.map((comment, index) => (
            <div
              key={index}
              className={`flex lg:flex-row  flex-col  lg:items-center my-3  border ${
                theme === "light"
                  ? "hover:bg-white text-black"
                  : " text-richblack-200 hover:bg-richblack-600"
              }  border-richblack-600 rounded-lg`}
            >
              {/* date section  */}
              <div className="lg:w-[16%]   px-2 lg:py-3 py-1  ">
                <span
                  className={`mr-1 ${
                    theme === "light"
                      ? "text-black font-bold"
                      : "text-richblack-100 font-bold "
                  } lg:hidden`}
                >
                  Date:-
                </span>

                <span>{comment.updatedAt}</span>
              </div>
              {/* content section  */}
              <div className="lg:w-[16%]   px-2 lg:py-3 py-1  ">
                <span
                  className={`mr-1 ${
                    theme === "light"
                      ? "text-black font-bold"
                      : "text-richblack-100 font-bold "
                  } lg:hidden`}
                >
                  Content:-
                </span>

                <span>{comment.content}</span>
              </div>
              {/* likes  */}
              <div className="lg:w-[16%]  px-2 lg:py-3 py-1  ">
                <span
                  className={`mr-1 ${
                    theme === "light"
                      ? "text-black font-bold"
                      : "text-richblack-100 font-bold "
                  } lg:hidden`}
                >
                  Likes:-
                </span>
                <span>{comment.numberOfLikes}</span>
              </div>
              {/* postID  */}
              <div className="lg:w-[16%]  px-2 lg:py-3 py-1  ">
                <span
                  className={` mr-1 ${
                    theme === "light"
                      ? "text-black font-bold"
                      : "text-richblack-100 font-bold "
                  } lg:hidden`}
                >
                  postid:-
                </span>
                <span>{comment.postId}</span>
              </div>
              {/* postID  */}
              <div className="lg:w-[16%]  px-2 lg:py-3 py-1  ">
                <span
                  className={`mr-1 ${
                    theme === "light"
                      ? "text-black font-bold"
                      : "text-richblack-100 font-bold "
                  } lg:hidden`}
                >
                  userid:-
                </span>
                <span>{comment.userId}</span>
              </div>
              {/* delete  */}
              <div className="lg:w-[16%] flex items-center  px-2 lg:py-3 py-1  ">
                <span
                  className={`mr-1 ${
                    theme === "light"
                      ? "text-black font-bold"
                      : "text-richblack-100 font-bold "
                  } lg:hidden`}
                >
                  Delete:-
                </span>
                <div
                  onClick={() =>
                    setConfirmationModalData({
                      text1: "Are you sure ??",
                      text2: "Would you want to delete this comment",
                      btn1Text: "Yes I'm Sure",
                      btn1Handler: () => setConfirmationModalData(null),
                      btn2Text: "No",
                      btn2Handler: () => setConfirmationModalData(null),
                    })
                  }
                  className="lg:flex-1 flex items-center gap-1 cursor-pointer text-red-700 lg:px-2  lg:py-3 py-1  "
                >
                  <MdDeleteSweep />
                  <span>delete</span>
                </div>
              </div>
            </div>
          ))
        )}

        {comments.length > 7 && (
          <div
            onClick={() => setShowMore(!showmore)}
            className={`flex items-center cursor-pointer gap-x-1 justify-center mt-10 ${
              theme === "light" ? "text-yellow-25" : "text-yellow-23"
            } `}
          >
            <h1>Show {showmore ? "Less" : "More"}</h1>
            <LuExternalLink />
          </div>
        )}
      </div>
      {confirmationmodalData && (
        <ConfirmationModal modalData={confirmationmodalData} />
      )}
    </div>
  );
};

export default CommentCard;
