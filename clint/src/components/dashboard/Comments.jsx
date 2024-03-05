import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { apiConnector } from "../../../services/apiConnector";
import { userEndpoints } from "../../../services/apis";
import CommentCard from "../../components/common/CommentCard";

const Comments = () => {
  const [comments, setComments] = useState(null);
  const { token } = useSelector((state) => state.user);
  const { ALL_COMMENT } = userEndpoints;
const {theme} = useSelector((state)=>state.theme)
  useEffect(() => {
    const fetchComments = async () => {
      const res = await apiConnector("GET", ALL_COMMENT, null);
      if (res.data.success) {
        setComments(res.data.data);
      }
    };
    fetchComments();
  }, [token]);

  return (
    <div
      className={` ${
        theme === "light" ? "bg-[#fff]" : "bg-richblack-800"
      } lg:w-full rounded-lg  m-5`}
    >
      <div className="flex flex-col m-4 ">
        <h1
          className={`text-4xl ${
            theme === "light" ? "text-black" : "text-white"
          } `}
        >
         Comments😊:-
        </h1>
        {
            comments && <CommentCard comments={comments} />
        }

        
      </div>
    </div>
  );
};

export default Comments;
