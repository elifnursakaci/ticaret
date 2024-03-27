import React from "react";
import { AiOutlineClose } from "react-icons/ais";
import { useDispatch } from "react-redux";
import { openModalFunc } from "../redux/generalSlice";
import Button from "./Button";

const Modal = ({ title, content, onClick }) => {
  const dispatch = useDispatch();
  return (
    <div className=" fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center">
      <div className="w-[500px] bg-white border p-4 rounded-md">
        <div className="flex items-center justify-between">
          <div className="text-2xl">{title}</div>
          <div onClick={() => dispatch(openModalFunc())}>
            <AiOutlineClose />
          </div>
        </div>
        {content}
        <Button name={"ürün ekle"} onClick={onClick} />
      </div>
    </div>
  );
};

export default Modal;
