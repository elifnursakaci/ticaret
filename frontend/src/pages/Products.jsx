import React, { useEffect, useState } from "react";
import Filter from "../layout/Filter";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../redux/productSlice";
import ProductCard from "../components/ProductCard";

const Products = () => {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.products);
  const { keyword } = useSelector((state) => state.general);
  const { price, setPrice } = useState({ min: 0, max: 3000 });

  const { rating, setRating } = useState(0);
  const { category, setCategory } = useState("");

  useEffect(() => {
    dispatch(getProducts(keyword, price, rating, category));
  }, [dispatch, keyword, price, rating, category]);

  console.log(keyword, "keyy");

  return (
    <div className="min-h-screen">
      <div className="flex gap-3">
        <Filter
          setPrice={setPrice}
          setRating={setRating}
          setCategory={setCategory}
        />
        <div>
          {loading ? (
            "Loading..."
          ) : (
            <div>
              {products?.products && (
                <div className="flex items-center justify-center gap-5 my-5 flex-wrap">
                  {products?.products?.map((product, i) => (
                    <ProductCard product={product} key={i} />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
