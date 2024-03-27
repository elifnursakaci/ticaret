import React from "react";

const Filter = (setPrice, setRating, setCategory) => {
  const categoryList = ["çanta", "ayakkabı", "pantolon"];

  const ratingList = [1, 2, 3];

  return (
    <div className="w-[200px] mt-3 p-1">
      <div>Filtreleme</div>
      <div className="flex items-center gap-2">
        <input
          onChange={(e) =>
            setPrice((prev) => ({ ...prev, min: e.target.value }))
          }
          className="border w-16 p-1 outline-none my-2"
          type="number"
          placeholder="min"
        />
        <input
          onChange={(e) =>
            setPrice((prev) => ({ ...prev, max: e.target.value }))
          }
          className="border w-16 p-1 outline-none"
          type="number"
          placeholder="max"
        />
        <div>
          <div className="my-2 cursor-pointer">Kategori</div>
          {categoryList.map((category, i) => {
            return (
              <div
                onClick={() => setCategory(category)}
                className="text-sm"
                key={i}
              >
                {category}
              </div>
            );
          })}
          <hr />
          <div className="my-2 cursor-pointer">Puanlama</div>
          {ratingList.map((rating, i) => {
            return (
              <div
                onClick={() => setRating(rating)}
                className="text-sm"
                key={i}
              >
                {rating}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Filter;
