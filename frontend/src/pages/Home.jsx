import React, { useEffect } from "react";
import { getProducts } from "../redux/productSlice";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../components/ProductCard";

const Home = () => {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getProducts());

    console.log("ürünler");
  }, [dispatch]);

  return (
    <>
      {loading ? (
        "Loading..."
      ) : (
        <div>
          {products?.products && (
            <div className="flex items-center justify-center gap-5 my-5 flex-wrap ">
              {products?.products?.map((product, i) => (
                <ProductCard product={product} key={i} />
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Home;
