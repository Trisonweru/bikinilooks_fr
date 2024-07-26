"use client"

import { getToken, logoutUser } from '@/lib/fetcher';
import { redirect } from 'next/navigation';
// pages/form.js
import { FormEvent, useEffect, useState } from 'react';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


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
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function Form() {
  const [value, setValue] = useState(0);

  const handleChange2 = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const [formData, setFormData] = useState({
    productName: '',
    productCategory: '',
    productDescription: '',
    price: '',
    availableStock: '',
    discount: '',
    discountType: '',
    image: null,
  });

  const handleChange = (e: any) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };


  const [tkn, setTkn] = useState<any>(null)
  useEffect(() => {
    getProducts()
    getCategories()
    getDiscountTypes()

    const token = getToken()

    if (!token) {
      logoutUser();
      redirect('/auth/login');
    } else {
      setTkn(token);
    }
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const data = new FormData();
    data.append('productName', formData.productName);
    data.append('productCategory', formData.productCategory);
    data.append('productDescription', formData.productDescription);
    data.append('price', formData.price);
    data.append('availableStock', formData.availableStock);
    data.append('discount', formData.discount);
    data.append('discountType', formData.discountType);
    data.append('image', formData.image as unknown as File);
    data.append('token', tkn);



    try {
      const response = await fetch('/api/addProduct', {
        method: 'POST',
        body: data,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      alert('Product added successfully!');
    } catch (error) {
      console.error('Error:', error);
      alert('There was a problem with the submission.');
    }
  };

  const handleSubmit2 = async (e: FormEvent) => {
    e.preventDefault();

    const data = new FormData();
    data.append('image', formData.image as unknown as File);
    data.append('token', tkn);



    try {
      const response = await fetch('/api/addThemeImage', {
        method: 'POST',
        body: data,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      alert('Product added successfully!');
    } catch (error) {
      console.error('Error:', error);
      alert('There was a problem with the submission.');
    }
  };

  const handleSubmit3 = async (e: FormEvent) => {
    e.preventDefault();
    const data = new FormData();
    data.append('productName', formData.productName);
    data.append('token', tkn);



    try {
      const response = await fetch('/api/addCategory', {
        method: 'POST',
        body: data,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      alert('Product added successfully!');
    } catch (error) {
      console.error('Error:', error);
      alert('There was a problem with the submission.');
    }
  };
  const [data, setData] = useState<any>([])
  const [dataDiscountTypes, setDiscountTypes] = useState<any>([])
  const [products, setProducts] = useState<any>([])

  const getCategories = async () => {
    const res2 = await fetch('/api/categories');
    const res = await res2.json()

    if (res?.data?.status == 200) {
      setData(res?.data?.payload)
    }
  }
  const getDiscountTypes = async () => {
    const res2 = await fetch('/api/discount');
    const res = await res2.json()

    if (res?.data?.status == 200) {
      setDiscountTypes(res?.data?.payload)
    }
  }

  const getProducts = async () => {
    const res2 = await fetch('/api/products');
    const res = await res2.json()

    if (res?.data?.status == 200) {
      setProducts(res?.data?.payload)
    }
  }

  console.log("products", products)

  const rows: GridRowsProp = [
    { id: 1, col1: 'Hello', col2: 'World' },
    { id: 2, col1: 'DataGridPro', col2: 'is Awesome' },
    { id: 3, col1: 'MUI', col2: 'is Amazing' },
  ];

  const columns: GridColDef[] = [
    { field: 'col1', headerName: 'Column 1', width: 150 },
    { field: 'col2', headerName: 'Column 2', width: 150 },
  ];

  return (
    <Box sx={{ width: '100%', paddingTop: "120px" }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange2} aria-label="basic tabs example">
          <Tab className='text-[#752A78] ' label="Products" {...a11yProps(0)} />
          <Tab className='text-[#752A78] ' label="Add Product" {...a11yProps(1)} />
          <Tab className='text-[#752A78] ' label="Product Category" {...a11yProps(2)} />
          <Tab className='text-[#752A78] ' label="Theme Image" {...a11yProps(3)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <div className="min-h-screen flex items-start mx-auto px-4 py-4 pb-10 justify-center bg-gray-100">
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              Accordion 1
            </AccordionSummary>
            <AccordionDetails>
                       <DataGrid rows={rows} columns={columns} />

            </AccordionDetails>
          </Accordion>
        </div>

      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <div className="min-h-screen flex items-center mx-auto px-4 py-4 pb-10 justify-center bg-gray-100">
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full max-w-2xl">
            <h2 className="text-2xl font-bold mb-6">Product Form</h2>
            <div className="flex flex-wrap -mx-3 mb-4 space-y-6">
              <div className="w-full md:w-1/2 px-3 mb-5 md:mb-0">
                <label htmlFor="productName" className="block text-gray-700 font-bold mb-2">Product Name</label>
                <input
                  type="text"
                  id="productName"
                  name="productName"
                  value={formData.productName}
                  onChange={handleChange}
                  className="border border-gray-300 p-2 w-full rounded-lg"
                />
              </div>
              <div className="w-full md:w-1/2 px-3 mb-4 md:mb-0">
                <label htmlFor="productCategory" className="block text-gray-700 font-bold mb-2">Product Category</label>
                <select
                  id="productCategory"
                  name="productCategory"
                  value={formData.productCategory}
                  onChange={handleChange}
                  className="border border-gray-300 p-2 w-full rounded-lg"
                >
                  <option value="">Select a category</option>
                  {data?.map((item: any, index: number) => <option key={index} value={item?.name}>{item?.name}</option>)}
                </select>
              </div>
              <div className="w-full md:w-1/2 px-3 mb-4 md:mb-0">
                <label htmlFor="productDescription" className="block text-gray-700 font-bold mb-2">Product Description</label>
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
                <label htmlFor="price" className="block text-gray-700 font-bold mb-2">Price</label>
                <input
                  type="text"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="border border-gray-300 p-2 w-full rounded-lg"
                />
              </div>
              <div className="w-full md:w-1/2 px-3 mb-4 md:mb-0">
                <label htmlFor="availableStock" className="block text-gray-700 font-bold mb-2">Available Stock</label>
                <input
                  type="text"
                  id="availableStock"
                  name="availableStock"
                  value={formData.availableStock}
                  onChange={handleChange}
                  className="border border-gray-300 p-2 w-full rounded-lg"
                />
              </div>
              <div className="w-full md:w-1/2 px-3 mb-4 md:mb-0">
                <label htmlFor="discount" className="block text-gray-700 font-bold mb-2">Discount</label>
                <input
                  type="text"
                  id="discount"
                  name="discount"
                  value={formData.discount}
                  onChange={handleChange}
                  className="border border-gray-300 p-2 w-full rounded-lg"
                />
              </div>
              <div className="w-full md:w-1/2 px-3 mb-4 md:mb-0">
                <label htmlFor="discountType" className="block text-gray-700 font-bold mb-2">Discount Type</label>
                <select
                  id="discountType"
                  name="discountType"
                  value={formData.discountType}
                  onChange={handleChange}
                  className="border border-gray-300 p-2 w-full rounded-lg"
                >
                  <option value="">Select a discount type</option>
                  {dataDiscountTypes?.map((item: any, index: number) => <option key={index} value={item?.name}>{item?.name}</option>)}
                </select>
              </div>
              <div className="w-full px-3">
                <label htmlFor="image" className="block text-gray-700 font-bold mb-2">Product Image</label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  onChange={handleChange}
                  className="border border-gray-300 p-2 w-full rounded-lg"
                />
              </div>
            </div>
            <button type="submit" className="bg-[#752A78] text-white px-4 mt-4 py-2 rounded-lg hover:bg-[#5b1e5d]">
              Submit
            </button>
          </form>

        </div>

      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <div className="min-h-screen flex items-start mx-auto px-4 pt-32 pb-10 justify-center bg-gray-100">
          <form onSubmit={handleSubmit3} className="bg-white p-6 rounded-lg shadow-md w-full max-w-2xl">
            <h2 className="text-2xl font-bold mb-6">Product Category</h2>
            <div className="w-full md:w-1/2 px-3 mb-5 md:mb-0">
              <label htmlFor="productName" className="block text-gray-700 font-bold mb-2">Category Name</label>
              <input
                type="text"
                id="productName"
                name="productName"
                value={formData.productName}
                onChange={handleChange}
                className="border border-gray-300 p-2 w-full rounded-lg"
              />
            </div>
            <button type="submit" className="bg-[#752A78] text-white px-4 mt-4 py-2 rounded-lg hover:bg-[#5b1e5d]">
              Submit
            </button>
          </form>
        </div>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        <div className="min-h-screen flex items-start mx-auto px-4 pt-32 pb-10 justify-center bg-gray-100">
          <form onSubmit={handleSubmit2} className="bg-white p-6 rounded-lg shadow-md w-full max-w-2xl">
            <h2 className="text-2xl font-bold mb-6">Theme Image</h2>
            <div className="flex flex-wrap -mx-3 mb-4 space-y-6">
              <div className="w-full px-3">
                <label htmlFor="image" className="block text-gray-700 font-bold mb-2">Theme Image</label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  onChange={handleChange}
                  className="border border-gray-300 p-2 w-full rounded-lg"
                />
              </div>
            </div>
            <button type="submit" className="bg-[#752A78] text-white px-4 mt-4 py-2 rounded-lg hover:bg-[#5b1e5d]">
              Submit
            </button>
          </form>
        </div>
      </CustomTabPanel>
    </Box>

  );
}
