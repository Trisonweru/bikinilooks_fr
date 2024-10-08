"use client";

import axios from "axios";
import React, { CSSProperties, useEffect } from "react";
import ServiceCard from "../../components/home_product_section/product_card";
import { useAppCtx } from "../context/AppContext";

import ClipLoader from "react-spinners/ClipLoader";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "#752A78",
};

function NewArrivals() {
  const { addPathname } = useAppCtx();

  useEffect(() => {
    addPathname("/new-arrivals");
  }, []);

  const [data, setData] = React.useState<any>(null);

  useEffect(() => {
    if (data == null) {
      getProduct();
    }
  }, []);

  const getProduct = async () => {
    const res = await axios.post(
      `/api/category?timestamp=${new Date().getTime()}`,
      { category: 2 }
    );

    if (res?.data?.data?.status == 200) {
      setData(res?.data?.data?.payload);
    }
  };

  return (
    <div className="container mx-auto px-4 pt-32 pb-10 bg-white min-h-screen">
      <div className="relative bg-white px-4 w-fit mx-auto mb-10">
        <h2 className="text-lg font-semibold text-[#752A78] uppercase text-center border-2 border-gray-300 px-4 py-2">
          New Arrivals
        </h2>
      </div>

      {data ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {data?.map((card: any) => (
            <ServiceCard
              key={card.ID}
              image={card.product_image}
              category={card.product_category}
              title={card.product_name}
              price={card.price}
              id={card.ID}
            />
          ))}
        </div>
      ) : (
        <div className="w-full flex justify-center items-center">
          <ClipLoader
            color={"#752A78"}
            loading={true}
            cssOverride={override}
            size={100}
            aria-label="Loading Spinner"
            data-testid="loader"
          />{" "}
        </div>
      )}

      {data?.length == 0 && (
        <div className="text-[#752A78] font-light text-sm flex justify-center">
          No available products
        </div>
      )}
    </div>
  );
}

export default NewArrivals;
