"use client"

import { getToken, logoutUser } from '@/lib/fetcher';
import { redirect } from 'next/navigation';
// pages/form.js
import { FormEvent, useEffect, useState } from 'react';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

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
      console.log('Success:', result);
      alert('Product added successfully!');
    } catch (error) {
      console.error('Error:', error);
      alert('There was a problem with the submission.');
    }
  };


  const [data, setData] = useState<any>([])
  const [dataDiscountTypes, setDiscountTypes] = useState<any>([])


  useEffect(() => {
    getCategories()
    getDiscountTypes()

      const token = getToken()

     if (!token ) {
      logoutUser();
      redirect('/auth/login');
    } else {
      setTkn(token);
    }
  }, []);

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

  return (
    <div className="min-h-screen flex items-center mx-auto px-4 pt-32 pb-10 justify-center bg-gray-100">
      <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Item One" {...a11yProps(0)} />
          <Tab label="Item Two" {...a11yProps(1)} />
          <Tab label="Item Three" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        Item One
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        Item Two
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        Item Three
      </CustomTabPanel>
    </Box>
     
    </div>
  );
}
