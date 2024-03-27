import React, { useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import { useDispatch } from "react-redux";
import { forgotPassword } from "../redux/userSlice";

const ForgotPassword = () => {
  const [email, setEmail] = useState();
  const dispatch = useDispatch();

  const forgotFunc = () => {
    let res = dispatch(forgotPassword(email));
  };
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="w-1/3">
        <h1>Forgot Password</h1>
        <Input
          placeholder={"Mail giriniz"}
          onChange={(e) => setEmail(e.target.value)}
          name={"email"}
          id={"email"} // id özelliği eklenmeli
          type={"text"}
        />
        <Button name={"onayla"} onClick={forgotFunc} />{" "}
        {/* name düzeltilmeli */}
      </div>
    </div>
  );
};

export default ForgotPassword;
