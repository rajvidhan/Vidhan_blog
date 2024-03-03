import React, { useState } from "react";
import IconBtn from "./IconBtn";
import { Textarea } from "flowbite-react";
import { useSelector } from "react-redux";

const EditcommentModal = ({ modalData,setEditmodaldata, commentId, onEdit }) => {
  const [CommentText, setCommentText] = useState(modalData.Content);

  return (
    <div className="fixed z-[1000] inset-0 bg-white bg-opacity-10 flex items-center overflow-auto justify-center backdrop-blur-sm font-bold  ">
      <div className="w-11/12 max-w-[350px] rounded-lg bg-richblack-800 border-richblack-400 border p-7">
        <p className="text-white text-xl mb-2">Edit The Comment Here😃</p>

        <Textarea
          rows={6}
          value={CommentText}
          onChange={(e) => setCommentText(e.target.value)}
          className="w-full rounded-lg font-medium mb-3 bg-richblack-500 text-white"
        />

        <div className="flex items-center gap-x-4">
          <IconBtn
            onclick={() => {
              onEdit(commentId, CommentText);
              setEditmodaldata(null);
            }}
            text={modalData?.btn1Text}
          />
          <button
            className="cursor-pointer rounded-md bg-richblack-200 py-[8px] px-[20px] text-richblack-900 font-semibold"
            onClick={modalData?.btn2Handler}
          >
            {modalData?.btn2Text}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditcommentModal;
