"use client";

import { useRouter } from "next/router";
// import ServiceCard from "@/pages/components/home_product_section/product_card";
import React, { CSSProperties, useEffect } from "react";
import ClipLoader from "react-spinners/ClipLoader";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "#752A78",
};

function NewArrivals() {
  const router = useRouter();
  const { id } = router.query;

  const [data, setData] = React.useState<any>(null);

  useEffect(() => {
    getProduct(id);
  }, [id]);

  const [loading, setLoading] = React.useState<any>(false);

  const getProduct = async (ids: any) => {
    setLoading(true);
    const res2 = await fetch(`/api/category`, {
      method: "POST", // Use POST or PUT depending on your API
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer `, // Replace with your actual token if needed
      },
      body: JSON.stringify({
        category: ids,
      }),
    });
    const res = await res2?.json();

    if (res?.data?.status == 200) {
      setData(res?.data?.payload);
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 pt-32 pb-10 bg-white min-h-screen">
      <div className="relative bg-white px-4 w-fit mx-auto mb-10">
        <h2 className="text-lg font-semibold text-[#752A78] uppercase text-center border-2 border-gray-300 px-4 py-2">
          {router?.pathname?.split("/")[1].split("_").join(" ")}
        </h2>
      </div>

      {!loading ? (
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
        <div className="w-full flex justify-center items-center ">
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

      {!loading && data?.length == 0 && (
        <div className="w-full flex justify-center items-center text-[#752A78] font-light text-sm">
          No products available
        </div>
      )}
    </div>
  );
}

export default NewArrivals;
