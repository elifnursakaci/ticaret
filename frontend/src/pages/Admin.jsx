import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAdminProducts } from "../redux/productSlice";
import ProductCard from "../components/ProductCard";
import Button from "../components/Button";
import Modal from "../components/Modal";
import { openModal as openModalFunc } from "../redux/generalSlice";
import Input from "../components/Input";

const Admin = () => {
  const dispatch = useDispatch();
  const adminProducts = useSelector((state) => state.products);
  const openModal = useSelector((state) => state.general.openModal);
  const { data, setData } = useState({
    name: "",
    description: "",
    rating: null,
    price: null,
    stock: null,
    category: "",
    images: [],
  });

  useEffect(() => {
    dispatch(getAdminProducts());
  }, [dispatch]);

  const addProduct = () => {
    dispatch(openModalFunc());
  };

  const closeModal = () => {
    // Modal kapatma işlemi için dispatch
    dispatch(closeModalFunc());
  };

  const productHandle = (e) => {
    if (e.target.name === "images") {
      const files = Array.from(e.target.files);
      const imagesArray = [];
      files.forEach((file) => {
        const reader = new FileReader();
        reader.onload = () => {
          if (reader.readyState === 2) {
            imagesArray.push(reader.result);
            setData((prev) => ({ ...prev, images: imagesArray }));
          }
        };
        reader.readAsDataURL(file);
      });
    } else {
      setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
  };

  const content = (
    <div className="my-3">
      <Input
        onChange={productHandle}
        name={"name"}
        id={"name"}
        placeholder={"ürün adı "}
        value={""}
        type={"text"}
      />
      <Input
        onChange={productHandle}
        name={"description"}
        id={"name"}
        placeholder={"ürün açıklaması "}
        type={"text"}
        value={""}
      />
      <Input
        onChange={productHandle}
        name={"price"}
        id={"price"}
        placeholder={"ürün Fiyatı "}
        type={"number"}
        value={""}
      />
      <Input
        onChange={productHandle}
        name={"stock"}
        id={"stock"}
        placeholder={"ürün stoğu "}
        type={"number"}
        value={""}
      />
      <Input
        onChange={productHandle}
        name={"rating"}
        id={"rating"}
        placeholder={"ürün rating "}
        type={"number"}
        value={""}
      />

      <Input
        onChange={productHandle}
        name={"category"}
        id={"category"}
        placeholder={"ürün Kategorisi "}
        type={"text"}
        value={""}
      />
      <Input
        onChange={productHandle}
        name={"images"}
        id={"images"}
        placeholder={"ürün resmi "}
        type={"file"}
      />
    </div>
  );

  return (
    <div className="min-h-screen">
      <Button name="Ürün Ekle" onClick={addProduct} />
      {adminProducts?.products && (
        <div className="flex items-center justify-center gap-5 my-5 flex-wrap">
          {adminProducts?.products?.map((product, i) => (
            <ProductCard edit={true} product={product} key={i} />
          ))}
        </div>
      )}
      {openModal && (
        <Modal
          title={"Ürün Ekle"}
          content={content}
          onClose={closeModal}
          onClick={() => {}}
        />
      )}
    </div>
  );
};

export default Admin;
