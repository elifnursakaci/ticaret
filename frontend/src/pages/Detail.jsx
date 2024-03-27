import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProductDetail } from "../redux/productSlice";
import Slider from "react-slick";
import Button from "../components/Button";

const Detail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { loading, product } = useSelector((state) => state.products);
  const [quantity, setQuantity] = useState(1);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  useEffect(() => {
    if (id) {
      dispatch(getProductDetail(id));
    }
  }, [dispatch, id]);

  const addBasket = () => {
    const data = {
      id: product?.product?._id,
      name: product?.product?.name,
      price: product?.product?.price,
      stock: product?.product?.stock,
      image: product?.product?.images?.[0],
      quantity: quantity,
    };
    dispatch(addToCart());
  };

  const increment = () => {
    if (quantity < product?.product?.stock) {
      setQuantity(quantity + 1);
    }
  };

  const decrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  console.log(loading, product, "detaylar");
  return (
    <>
      {loading ? (
        "loading"
      ) : (
        <div className="">
          <div className="flex mt-4 justify-center gap-5">
            {product?.product && (
              <div className="w-[500px]">
                <Slider {...settings}>
                  {product?.product?.images?.map((image, i) => (
                    <img key={i} src={image.url} alt={`image-${i}`} />
                  ))}
                </Slider>
              </div>
            )}
            <div>
              <div className="text-3xl ">{product?.product?.name}</div>
              <div className="text-xl ">{product?.product?.description}</div>
              {product?.product?.stock > 0 ? (
                <div className="text-xl text-green-400">
                  Stok sayısı: {product?.product?.stock}
                </div>
              ) : (
                <div>Ürün stoğu tükendi..</div>
              )}
              <div className="text-xl ">
                Kategori: {product?.product?.category}
                Rating: {product?.product?.rating}
              </div>
              <div className="flex items-center gap-4 text-lg">
                <div onClick={decrement} className="cursor-pointer">
                  -
                </div>
                <div>{quantity}</div>
                <div onClick={increment} className="cursor-pointer">
                  +
                </div>
              </div>
              <Button name={"sepete ekle"} onClick={addBasket} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Detail;
