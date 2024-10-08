"use client";

import { redirect } from "next/navigation";
// pages/form.js
import { FormEvent, useEffect, useState } from "react";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CurrencyFormat from "react-currency-format";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookIcon,
  WhatsappIcon,
  XIcon,
  LinkedinShareButton,
  LinkedinIcon,
  TelegramShareButton,
  TelegramIcon,
} from "react-share";
import { ImSpinner2 } from "react-icons/im";
import fetcher from "../../lib/fetcher";
import getToken from "../../lib/getToken";
import logoutUser from "../../lib/logoutUser";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function Form() {
  const [value, setValue] = useState(0);

  const handleChange2 = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const [formData, setFormData] = useState({
    productName: "",
    productCategory: "",
    productDescription: "",
    price: "",
    availableStock: "",
    discount: "",
    discountType: "",
    image: null,
  });

  const handleChange = (e: any) => {
    const { name, value, files } = e.target;

    if (files && files[0]) {
      const file = files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        // When the file is loaded, set the base64 string in formData
        setFormData({
          ...formData,
          [name]: reader.result, // reader.result contains the base64 string
        });
      };

      reader.readAsDataURL(file); // Read file as base64 string
    } else {
      // Handle non-file input changes
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const [tkn, setTkn] = useState<any>(null);
  useEffect(() => {
    getProducts();
    getCategories();
    getDiscountTypes();
    getOrders();

    const token = getToken();

    if (!token) {
      logoutUser();
      redirect("/auth/login");
    } else {
      setTkn(token);
    }
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Create a JavaScript object with the form data
    const data = {
      productName: formData.productName,
      productCategory: formData.productCategory,
      productDescription: formData.productDescription,
      price: formData.price,
      availableStock: formData.availableStock,
      discount: formData.discount,
      discountType: formData.discountType,
      image: formData.image, // Assuming this is already a base64 or URL string
      token: tkn,
    };

    try {
      // Send the data as JSON
      const response = await fetch("/api/addProduct", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Set content type to JSON
        },
        body: JSON.stringify(data), // Convert data to JSON format
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      getProducts(); // Fetch updated products after the submission
      alert("Product added successfully!");
    } catch (error) {
      console.error("Error:", error);
      alert("There was a problem with the submission.");
    }
  };

  const handleSubmit2 = async (e: FormEvent) => {
    e.preventDefault();

    const data = new FormData();
    data.append("image", formData.image as unknown as File);
    data.append("token", tkn);

    try {
      const response = await fetch("/api/addThemeImage", {
        method: "POST",
        body: data,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      alert("Product added successfully!");
    } catch (error) {
      console.error("Error:", error);
      alert("There was a problem with the submission.");
    }
  };

  const handleSubmit3 = async (e: FormEvent) => {
    e.preventDefault();

    const res = await fetcher("/api/addCategory", {
      productName: formData.productName,
      token: tkn,
    });
    if (res?.data?.status == 200) {
      getCategories();
      alert("Category added successfully!");
    }
  };
  const [data, setData] = useState<any>([]);
  const [dataDiscountTypes, setDiscountTypes] = useState<any>([]);
  const [products, setProducts] = useState<any>([]);
  const [orders, setOrders] = useState<any>([]);

  const getCategories = async () => {
    const res2 = await fetch(
      `/api/categories?timestamp=${new Date().getTime()}`
    );
    const res = await res2.json();

    if (res?.data?.status == 200) {
      setData(res?.data?.payload);
    }
  };
  const getDiscountTypes = async () => {
    const res2 = await fetch(`/api/discount`);
    const res = await res2.json();

    if (res?.data?.status == 200) {
      setDiscountTypes(res?.data?.payload);
    }
  };

  const [loading, setLoading] = useState<any>(false); //comments

  const getProducts = async () => {
    setLoading(true);
    const res2 = await fetch(`/api/products?timestamp=${new Date().getTime()}`);
    const res = await res2.json();

    if (res?.data?.status == 200) {
      setProducts(res?.data?.payload);
      setLoading(false);
    }
  };

  const getOrders = async () => {
    setLoading(true);
    const res2 = await fetch(`/api/orders?timestamp=${new Date().getTime()}`);
    const res = await res2.json();

    if (res?.data?.status == 200) {
      setOrders(res?.data?.payload);
      setLoading(false);
    }
  };

  const handleDelete = async (id: any) => {
    const res = await fetcher("/api/delete", {
      id: id,
      token: tkn,
    });
    if (res?.data?.status == 200) {
      getCategories();
      alert("Category added successfully!");
    }
  };

  const columns: GridColDef[] = [
    { field: "ID", headerName: "ID", width: 80 },
    {
      field: "product_image",
      headerName: "IMAGE",
      width: 150,
      renderCell: (params) => (
        <div
          style={{
            height: "150px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src={params?.row?.product_image || params?.row?.image}
            alt="Product"
            style={{
              maxHeight: "100%",
              maxWidth: "100%",
              objectFit: "contain",
            }}
          />
        </div>
      ),
    },
    { field: "product_name", headerName: "NAME", width: 100 },
    {
      field: "price",
      headerName: "PRICE",
      width: 100,
      renderCell: (params: any) => (
        <CurrencyFormat
          value={params.row.price}
          displayType="text"
          className="text-danger"
          prefix="Ksh"
          decimalScale={2}
          thousandSeparator
        />
      ),
    },
    { field: "discount_type", headerName: "DISCOUNT TYPE", width: 130 },
    { field: "fixed_discount", headerName: "FIXED DISCOUNT", width: 140 },
    { field: "percentage_discount", headerName: "% DISCOUNT", width: 120 },
    {
      field: "available_stock",
      headerName: "STOCK",
      width: 100,
      renderCell: (params: any) => (
        <CurrencyFormat
          value={params.row.available_stock}
          displayType="text"
          className="text-danger"
          decimalScale={2}
          thousandSeparator
        />
      ),
    },
    {
      field: "share",
      headerName: "SHARE",
      width: 230,
      renderCell: (params: {
        row: {
          ID: any;
          product_name: any;
          product_image: any;
          price: any;
          product_description: any;
        };
      }) => {
        const productUrl = `https://www.bikinilooks.com/product/${params?.row?.ID}`;
        const productName = params.row.product_name;
        const productImage = params.row.product_image;
        const productPrice = `Ksh ${params.row.price}`;
        const productDescription = params.row.product_description;

        const shareContent = `${productName}\nPrice: ${productPrice}\nDescription: ${productDescription}`;

        return (
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              width: "100%",
              height: "100%",
            }}
            className="space-x-2"
          >
            <FacebookShareButton url={productImage} title={shareContent}>
              <FacebookIcon size={32} round />
            </FacebookShareButton>
            <TwitterShareButton url={productUrl} title={shareContent}>
              <XIcon size={32} round />
            </TwitterShareButton>
            <WhatsappShareButton url={productUrl} title={shareContent}>
              <WhatsappIcon size={32} round />
            </WhatsappShareButton>
            <LinkedinShareButton url={productUrl} title={shareContent}>
              <LinkedinIcon size={32} round />
            </LinkedinShareButton>
            <TelegramShareButton url={productUrl} title={productName}>
              <TelegramIcon size={32} round />
            </TelegramShareButton>
          </div>
        );
      },
    },
    {
      field: "delete",
      headerName: "DELETE",
      width: 100,
      renderCell: (params) => (
        <button
          onClick={() => handleDelete(params?.row?.ID)}
          style={{ color: "red", cursor: "pointer" }}
        >
          Delete
        </button>
      ),
    },
  ];

  const ordersColumn: GridColDef[] = [
    {
      field: "product_image",
      headerName: "IMAGE",
      width: 200,
      renderCell: (params) => (
        <div
          style={{
            height: "150px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src={params?.row?.image}
            alt="Product"
            style={{
              maxHeight: "100%",
              maxWidth: "100%",
              objectFit: "contain",
            }}
          />
        </div>
      ),
    },
    { field: "title", headerName: "NAME", width: 150 },
    {
      field: "totalPrice",
      headerName: "PRICE",
      width: 150,
      renderCell: (params: any) => (
        <CurrencyFormat
          value={params.row.totalPrice}
          displayType="text"
          className="text-danger"
          prefix="Ksh"
          decimalScale={2}
          thousandSeparator
        />
      ),
    },
    { field: "quantity", headerName: "QUANTITY", width: 130 },
  ];
  const getRowHeight = (params: any) => {
    return 150; // Set this to the height of your image
  };

  return (
    <>
      <Box sx={{ width: "100%", paddingTop: "120px", color: "#000" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange2}
            aria-label="basic tabs example"
          >
            <Tab
              className="text-[#752A78] "
              label="Products"
              {...a11yProps(0)}
            />
            <Tab
              className="text-[#752A78] "
              label="Add Product"
              {...a11yProps(1)}
            />
            <Tab
              className="text-[#752A78] "
              label="Product Category"
              {...a11yProps(2)}
            />
            <Tab
              className="text-[#752A78] "
              label="Theme Image"
              {...a11yProps(3)}
            />
            <Tab className="text-[#752A78] " label="Orders" {...a11yProps(4)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          {!loading ? (
            <div className="min-h-screen flex flex-col px-4 py-4 pb-10 justify-start bg-gray-100">
              {products?.map((item: any, index: any) => (
                <Accordion key={index}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                  >
                    <span className="font-semibold">{item?.category}</span>
                  </AccordionSummary>
                  <AccordionDetails>
                    <DataGrid
                      rows={item?.data}
                      columns={columns}
                      getRowId={(row) => row?.ID}
                      autoHeight
                      getRowHeight={getRowHeight}
                    />
                  </AccordionDetails>
                </Accordion>
              ))}
            </div>
          ) : (
            <div className="min-h-screen flex flex-col px-4 py-4 pb-10 justify-center items-center bg-gray-100">
              <ImSpinner2 className="animate-spin" />
            </div>
          )}
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <div className="min-h-screen flex items-center mx-auto px-4 py-4 pb-10 justify-center bg-gray-100 text-black">
            <form
              onSubmit={handleSubmit}
              className="bg-white p-6 rounded-lg shadow-md w-full max-w-2xl text-gray-700"
            >
              <h2 className="text-2xl font-bold mb-6">Product Form</h2>
              <div className="flex flex-wrap -mx-3 mb-4 space-y-6">
                <div className="w-full md:w-1/2 px-3 mb-5 md:mb-0">
                  <label
                    htmlFor="productName"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    Product Names
                  </label>
                  <input
                    type="text"
                    id="productName"
                    name="productName"
                    value={formData.productName}
                    onChange={handleChange}
                    className="border border-gray-300 p-2 w-full rounded-lg "
                  />
                </div>
                <div className="w-full md:w-1/2 px-3 mb-4 md:mb-0">
                  <label
                    htmlFor="productCategory"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    Product Category
                  </label>
                  <select
                    id="productCategory"
                    name="productCategory"
                    value={formData.productCategory}
                    onChange={handleChange}
                    className="border border-gray-300 p-2 w-full rounded-lg"
                  >
                    <option value="">Select a category</option>
                    {data?.map((item: any, index: number) => (
                      <option key={index} value={item?.name}>
                        {item?.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="w-full md:w-1/2 px-3 mb-4 md:mb-0">
                  <label
                    htmlFor="productDescription"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    Product Description
                  </label>
                  <input
                    type="text"
                    id="productDescription"
                    name="productDescription"
                    value={formData.productDescription}
                    onChange={handleChange}
                    className="border border-gray-300 p-2 w-full rounded-lg"
                  />
                </div>
                <div className="w-full md:w-1/2 px-3 mb-4 md:mb-0">
                  <label
                    htmlFor="price"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    Price
                  </label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    className="border border-gray-300 p-2 w-full rounded-lg"
                  />
                </div>
                <div className="w-full md:w-1/2 px-3 mb-4 md:mb-0">
                  <label
                    htmlFor="availableStock"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    Available Stock
                  </label>
                  <input
                    type="number"
                    id="availableStock"
                    name="availableStock"
                    value={formData.availableStock}
                    onChange={handleChange}
                    className="border border-gray-300 p-2 w-full rounded-lg"
                  />
                </div>
                <div className="w-full md:w-1/2 px-3 mb-4 md:mb-0">
                  <label
                    htmlFor="discount"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    Discount
                  </label>
                  <input
                    type="number"
                    id="discount"
                    name="discount"
                    value={formData.discount}
                    onChange={handleChange}
                    className="border border-gray-300 p-2 w-full rounded-lg"
                  />
                </div>
                <div className="w-full md:w-1/2 px-3 mb-4 md:mb-0">
                  <label
                    htmlFor="discountType"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    Discount Type
                  </label>
                  <select
                    id="discountType"
                    name="discountType"
                    value={formData.discountType}
                    onChange={handleChange}
                    className="border border-gray-300 p-2 w-full rounded-lg"
                  >
                    <option value="">Select a discount type</option>
                    {dataDiscountTypes?.map((item: any, index: number) => (
                      <option key={index} value={item?.name}>
                        {item?.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="w-full px-3">
                  <label
                    htmlFor="image"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    Product Image
                  </label>
                  <input
                    type="file"
                    id="image"
                    name="image"
                    onChange={handleChange}
                    className="border border-gray-300 p-2 w-full rounded-lg"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="bg-[#752A78] text-white px-4 mt-4 py-2 rounded-lg hover:bg-[#5b1e5d]"
              >
                Submit
              </button>
            </form>
          </div>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <div className="min-h-screen flex items-start mx-auto px-4 pt-32 pb-10 justify-center bg-gray-100">
            <form
              onSubmit={handleSubmit3}
              className="bg-white p-6 rounded-lg shadow-md w-full max-w-2xl"
            >
              <h2 className="text-2xl font-bold mb-6">Product Category</h2>
              <div className="w-full md:w-1/2 px-3 mb-5 md:mb-0">
                <label
                  htmlFor="productName"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Category Name
                </label>
                <input
                  type="text"
                  id="productName"
                  name="productName"
                  value={formData.productName}
                  onChange={handleChange}
                  className="border border-gray-300 p-2 w-full rounded-lg"
                />
              </div>
              <button
                type="submit"
                className="bg-[#752A78] text-white px-4 mt-4 py-2 rounded-lg hover:bg-[#5b1e5d]"
              >
                Submit
              </button>
            </form>
          </div>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={3}>
          <div className="min-h-screen flex items-start mx-auto px-4 pt-32 pb-10 justify-center bg-gray-100">
            <form
              onSubmit={handleSubmit2}
              className="bg-white p-6 rounded-lg shadow-md w-full max-w-2xl"
            >
              <h2 className="text-2xl font-bold mb-6">Theme Image</h2>
              <div className="flex flex-wrap -mx-3 mb-4 space-y-6">
                <div className="w-full px-3">
                  <label
                    htmlFor="image"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    Theme Image
                  </label>
                  <input
                    type="file"
                    id="image"
                    name="image"
                    onChange={handleChange}
                    className="border border-gray-300 p-2 w-full rounded-lg"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="bg-[#752A78] text-white px-4 mt-4 py-2 rounded-lg hover:bg-[#5b1e5d]"
              >
                Submit
              </button>
            </form>
          </div>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={4}>
          {!loading ? (
            <div className="min-h-screen flex flex-col px-4 py-4 pb-10 justify-start bg-gray-100">
              {orders?.map((item: any, index: any) => (
                <Accordion key={index}>
                  <AccordionSummary
                    expandIcon={
                      <div>
                        <ExpandMoreIcon />
                      </div>
                    }
                    aria-controls="panel1-content"
                    id="panel1-header"
                  >
                    <div className="space-x-3 font-semibold">
                      <span className="font-semibold">{item?.id}</span>{" "}
                      <span className="text-[#752A78]">
                        Amount: (
                        <CurrencyFormat
                          value={item?.amount}
                          displayType="text"
                          className="text-danger"
                          prefix="Ksh"
                          decimalScale={2}
                          thousandSeparator
                        />
                        )
                      </span>
                      <span
                        className={
                          item?.status === "COMPLETE"
                            ? "font-semibold text-green-500"
                            : item?.status === "PENDING" ||
                              item?.status === "pending"
                            ? "font-semibold text-indigo-900"
                            : item?.status === "PROCESSING"
                            ? "font-semibold text-orange-400"
                            : item?.status === "FAILED"
                            ? "font-semibold text-red-900"
                            : "font-semibold"
                        }
                      >
                        {item?.status}
                      </span>
                      <span className="text-xs text-gray-500">
                        {new Date(item?.UpdatedAt).toLocaleString()}
                      </span>
                    </div>
                  </AccordionSummary>
                  <AccordionDetails>
                    <DataGrid
                      rows={item?.cart_items ?? []}
                      columns={ordersColumn}
                      getRowId={(row) => row?.id}
                      autoHeight
                      getRowHeight={getRowHeight}
                    />
                  </AccordionDetails>
                </Accordion>
              ))}
            </div>
          ) : (
            <div className="min-h-screen flex flex-col px-4 py-4 pb-10 justify-center items-center bg-gray-100">
              <ImSpinner2 className="animate-spin" />
            </div>
          )}
        </CustomTabPanel>
      </Box>
    </>
  );
}
