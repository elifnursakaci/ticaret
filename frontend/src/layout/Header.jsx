import React, { useState } from "react";
import { SlBasket } from "react-icons/sl";
import "../index.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getKeyword } from "../redux/generalSlice";
import Input from "../components/Input";
import Button from "../components/Button";

const Header = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [keyword, setKeyword] = useState("");
  const { cart } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const menuItems = [
    {
      name: "Profile",
      url: "/profile",
    },
    {
      name: "Admin",
      url: "/admin",
    },
    {
      name: "Çıkış",
      url: "/auth",
    },
  ];

  const keywordFunc = () => {
    dispatch(getKeyword(keyword));
    navigate("/products");
  };

  return (
    <div className="bg-gray-200 h-16 px-2 flex items-center justify-between">
      <div className="text-3xl">e.com</div>

      <div className="flex items-center gap-5">
        <div className="flex items-center">
          <input
            onChange={(e) => setKeyword(e.target.value)}
            className="p-2 outline-none bg-white"
            type="text"
            placeholder="Arama yap"
          />
          <div onClick={keywordFunc} className="p-2 ml-1 cursor-pointer">
            Ara
          </div>
        </div>

        <div className="relative">
          <img
            onClick={() => setOpenMenu(!openMenu)}
            className="w-8 h-8 cursor-pointer"
            src={
              cart.length > 0
                ? "shopping-cart-filled-icon"
                : "shopping-cart-empty-icon"
            }
            alt="cart-icon"
          />
          {cart.length > 0 && (
            <div className="absolute -top-2 -right-2 w-5 h-5 bg-red-400 rounded-full flex items-center justify-center">
              {cart.length}
            </div>
          )}
        </div>

        {openMenu && (
          <div className="absolute w-[200px] bg-white right-0 mt-3">
            {menuItems.map((item, i) => (
              <div
                onClick={() => navigate(item.url)}
                className="px-2 py-1 hover:bg-gray-100 cursor-pointer"
                key={i}
              >
                {item.name}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
