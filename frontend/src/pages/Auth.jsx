import React, { useEffect, useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { login, register } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const [signUp, setSignUp] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuth } = useSelector((state) => state.user);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    avatar: "",
  });
  const [preview, setPreview] = useState(
    "data:image/png;base64,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"
  ); // Başlangıç değeri boş bir dize

  const registerFunc = () => {
    dispatch(register(data));
  };
  const loginFunc = () => {
    dispatch(login(data));
  };

  const handleChange = (e) => {
    if (e.target.name == "avatar") {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setData((prev) => ({ ...prev, avatar: reader.result }));
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
  };

  useEffect(() => {
    if (isAuth) {
      navigate("/");
    }
  }, [isAuth]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-1/3">
        <div className="text-2xl">{signUp ? "Kayıt Ol" : "Giriş Yap"}</div>
        {signUp && (
          <Input
            onChange={handleChange}
            value={data.name}
            type={"text"}
            name={"name"}
            id={"name"}
            placeholder={"Ad"}
          />
        )}
        <Input
          onChange={handleChange}
          value={data.email}
          type={"text"}
          name={"email"}
          id={"email"}
          placeholder={"Email"}
        />
        <Input
          onChange={handleChange}
          value={data.password}
          type="password"
          name="password"
          id="password"
          placeholder={"Şifre"}
        />
        {signUp && (
          <div className="flex items-center gap-2">
            <img className="w-10 h-10 rounded-full" src={preview} />
            <Input
              onChange={handleChange}
              type={"file"}
              name={"avatar"}
              id={"avatar"}
              placeholder={""}
            />
          </div>
        )}
        <div onClick={() => setSignUp(!signUp)}>
          {signUp ? "Giriş Yap" : "Kayıt Ol"}
        </div>
        <Button
          name={signUp ? "Kayıt Ol" : "Giriş Yap"}
          onClick={signUp ? registerFunc : loginFunc}
        />
        <button>haydii</button>
      </div>
    </div>
  );
};

export default Auth;
