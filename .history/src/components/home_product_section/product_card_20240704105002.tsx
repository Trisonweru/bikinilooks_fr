import React from "react";

function ServiceCard({ image, title, subTitle }: any) {
  return (
    <div
      className="bg-cover bg-center w-full relative h-[250px] flex justify-center"
      style={{
        backgroundImage: `url(${image})`,
        width: "100%",
        height: "250px",
        objectFit: "cover",
      }}
    >
      <div className="absolute inset-0 bg-transparent opacity-50 w-full h-[250px]"></div>

      <div>
        <div className="inset-0 flex mb-40 items-center justify-center italic absolute text-3xl max-w-6xl md:max-w-3xl mr-auto ml-auto text-center text-white font-extrabold">
          <p className="" style={{ textShadow: "1px 1px 2px #BB4C48;" }}>
            {" "}
            {subTitle}
          </p>
        </div>
        <div className="inset-0 flex items-center justify-center uppercase absolute text-7xl md:max-w-6xl mr-auto ml-auto text-center text-[#BB4C48] font-extrabold ">
          <p className="" style={{ textShadow: "1px 1px 2px #fff;" }}>
            {title}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ServiceCard;
