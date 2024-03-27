import React from "react";
import Input from "../components/Input";
import Button from "../components/Button";

const ResetPassword = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="w-1/3">
        <h1>Reset Password</h1>
        <Input
          placeholder={"Yeni şifre"}
          onChange={() => {}}
          name={"password"}
          id={"password"} // id özelliği eklenmeli
          type={"password"}
        />
        <Button name={"onayla"} onClick={() => {}} /> {/* name düzeltilmeli */}
      </div>
    </div>
  );
};

export default ResetPassword;
