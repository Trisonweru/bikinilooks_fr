"use client"

import { getToken, logoutUser } from '@/lib/fetcher';
import { redirect } from 'next/navigation';
// pages/form.js
import { FormEvent, useEffect, useState } from 'react';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CurrencyFormat from 'react-currency-format'
import { FacebookShareButton, TwitterShareButton, WhatsappShareButton, FacebookIcon, WhatsappIcon, XIcon, LinkedinShareButton, LinkedinIcon, TelegramShareButton, TelegramIcon } from 'react-share';




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

  const [loading, setLoading] = useState<any>(false)

  const getProducts = async () => {
    setLoading(true)
    const res2 = await fetch('/api/hello');
    const res = await res2.json()

    if (res?.data?.status == 200) {
      setProducts(res?.data?.payload)
      setLoading(true)
    }
  }

  console.log(products)

  const columns: GridColDef[] = [
    { field: 'ID', headerName: 'ID', width: 80 },
    {
      field: 'product_image', headerName: 'IMAGE', width: 150, renderCell: (params) => <div style={{ height: '150px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <img
          src={params?.row?.product_image}
          alt="Product"
          style={{ maxHeight: '100%', maxWidth: '100%', objectFit: "contain" }}
        />
      </div>
    },
    { field: 'product_name', headerName: 'NAME', width: 100 },
    {
      field: 'price', headerName: 'PRICE', width: 100, renderCell: (params: any) => (
        <CurrencyFormat
          value={params.row.price}
          displayType='text'
          className='text-danger'
          prefix='Ksh'
          decimalScale={2}
          thousandSeparator
        />
      )
    },
    { field: 'discount_type', headerName: 'DISCOUNT TYPE', width: 130 },
    { field: 'fixed_discount', headerName: 'FIXED DISCOUNT', width: 140 },
    { field: 'percentage_discount', headerName: '% DISCOUNT', width: 120 },
    {
      field: 'available_stock', headerName: 'STOCK', width: 100, renderCell: (params: any) => (
        <CurrencyFormat
          value={params.row.available_stock}
          displayType='text'
          className='text-danger'
          decimalScale={2}
          thousandSeparator
        />
      )
    },
    {
      field: 'share',
      headerName: 'SHARE',
      width: 230,
      renderCell: (params) => {
        const productUrl = `https://bikinilooks-frontend.vercel.app/product/${params.row.ID}`;
        const productName = params.row.product_name;
        const productImage = params.row.product_image;
        const productPrice = `Ksh ${params.row.price}`;
        const productDescription = params.row.product_description;

        const shareContent = `${productName}\nPrice: ${productPrice}\nDescription: ${productDescription}\n${productUrl}\n${productImage}`;

        return (
          <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', width: '100%', height: "100%" }} className="space-x-2">
            <FacebookShareButton url={productUrl} title={shareContent} >
              <FacebookIcon size={32} round />
            </FacebookShareButton>
            <TwitterShareButton url={productUrl} title={shareContent}>
              <XIcon size={32} round />
            </TwitterShareButton>
            <WhatsappShareButton url={productUrl} title={shareContent}>
              <WhatsappIcon size={32} round />
            </WhatsappShareButton>
            <LinkedinShareButton url={productUrl} title={shareContent} >
              <LinkedinIcon size={32} round />
            </LinkedinShareButton>
            <TelegramShareButton url={productUrl} title={productName} >
              <TelegramIcon size={32} round />
            </TelegramShareButton>
          </div>
        );
      }
    }
  ];

  const getRowHeight = (params: any) => {
    return 150; // Set this to the height of your image
  };

  return (
   <>
   </>

  );
}
