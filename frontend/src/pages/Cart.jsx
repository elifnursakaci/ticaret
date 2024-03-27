import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../redux/cartSlice";

const Cart = () => {
  const { carts } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  console.log(carts, "cartssss");

  const deleteItem = (id) => {
    dispatch(removeFromCart(id));
  }; // Fonksiyonun kapatma süslü parantezi düzeltildi.

  return (
    <div className="h-screen">
      {carts?.length > 0 ? (
        <div>
          {carts?.map((cart, i) => (
            <div
              className="flex items-center justify-center border-b mb-2"
              key={i}
            >
              <img className="w-3" src={cart?.image?.url} alt="" />
              <div>{cart?.name}</div>
              <div> $ {cart?.price}</div>
              <div
                onClick={() => deleteItem(cart?.id)}
                className="flex items-center justify-center rounded-md bg-red-500 text-white"
              >
                {" "}
                Sil
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>Sepetinizde ürün bulunmamaktadır..</div>
      )}
    </div>
  );
};

export default Cart;
