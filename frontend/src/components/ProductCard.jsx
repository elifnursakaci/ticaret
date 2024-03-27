import React from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";

const ProductCard = ({ product, edit }) => {
  const navigate = useNavigate();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div
      onClick={() => navigate(`/product/${product?._id}`)}
      className="w-[250px] bg-gray-200 "
    >
      <Slider {...settings}>
        {product?.images?.map((image, i) => (
          <img key={i} src={image.url}></img>
        ))}
      </Slider>
      <div className="text-2xl px-3">{product?.name}</div>
      <div className="text-xl px-3">$ {product?.price}</div>
      {edit && (
        <div className="absolute top-1 right-1 flex gap-3 items-center">
          <AiFillEdit />
          <AiFillDelete />
        </div>
      )}
    </div>
  );
};

export default ProductCard;
