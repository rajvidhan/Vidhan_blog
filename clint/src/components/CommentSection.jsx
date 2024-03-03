import { Button, Textarea } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Form, Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { CreateComment } from "../../services/operations/userDetaillsApi";
import Comment from "./common/Comment";
const CommentSection = ({ postId }) => {
  const { currentUser } = useSelector((state) => state.user);
  const { token } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

 

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (comment.length > 200) {
      return;
    }
    try {
      const result = await CreateComment(
        { content: comment, postId: postId, userId: currentUser._id },
        token
      );
      if (result) {
        setComment("");
        setComments([result, ...comments]);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchComment = async () => {
      try {
        const res = await fetch(`/api/v1/comment/allcomments/${postId}`);

        if (res.ok) {
          const data = await res.json();
          setComments(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchComment();
  }, [postId]);

  const navigate = useNavigate();

  const handleLikes = async (commentId) => {
    try {
      if (currentUser) {
        const res = await fetch(`/api/v1/comment/likeComment/${commentId}`, {
          method: "PUT",
        });

        if (res.ok) {
          const data = await res.json();
          console.log("hello bhai data is ", data.updatedComment, commentId);

          setComments(
            comments.map((comment) =>
              comment._id === commentId
                ? {
                    ...comment,
                    likes: data.updatedComment.likes,
                    numberOfLikes: data.updatedComment.likes.length,
                  }
                : comment
            )
          );
        } else {
          navigate("/login");
          return;
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto w-full p-3 ">
      {currentUser ? (
        <div className="flex items-center gap-1 my-5 text-gray-500 text-sm">
          <p>Signed in as:</p>
          <img
            className="h-7 w-7 object-cover rounded-full"
            src={currentUser.image}
          />
          <Link
            className="text-xs text-[#87CEFA] hover:underline"
            to={"/dashboard?tab=profile"}
          >
            @{currentUser.username}
          </Link>
        </div>
      ) : (
        <>
          <div className="text-sm flex gap-1 text-teal-500 my-5">
            You must be login to comment.
            <Link className="text-blue-500 hover:underline" to={"/login"}>
              Login
            </Link>
          </div>
        </>
      )}
      {currentUser && (
        <form
          onSubmit={handleSubmit}
          className="border border-teal-500 rounded-md p-3"
        >
          <Textarea
            placeholder="Add a comment..."
            rows={"3"}
            maxLength={"200"}
            onChange={(e) => setComment(e.target.value)}
            value={comment}
          />
          <div className="flex justify-between items-center mt-5">
            <p className="text-gray-500 text-xs">
              <span
                className={`${theme === "light" ? "text-black" : "text-white"}`}
              >
                {200 - comment.length}{" "}
              </span>
              characters remaining
            </p>
            {comment && (
              <Button outline gradientDuoTone="purpleToPink" type="submit">
                Post
              </Button>
            )}
          </div>
        </form>
      )}
      {comments?.length === 0 ? (
        <p className="text-sm my-5">No Comments Yet</p>
      ) : (
        <>
          <div className="text-sm my-5 flex items-center gap-1">
            <p>Comments</p>
            <div className="border border-gray-400 py-1 px-2 rounded-sm">
              <p>{comments.length}</p>
            </div>
          </div>
          {comments.map((comment, index) => (
            <Comment key={index} comment={comment} onLike={handleLikes} />
          ))}
        </>
      )}
    </div>
  );
};

export default CommentSection;
