'use client';

import * as React from 'react';
import '@/lib/env';
import ProductSection from '@/components/home_product_section/home_product_section';
import { useAppCtx } from '@/context/AppContext';
import { useEffect } from 'react';
import { ImSpinner2 } from 'react-icons/im';
import { FaPen } from 'react-icons/fa';
import { getBrowserId } from '@/components/brid/brid';
import { Divider } from '@mui/material';


const Marquee = ({text}:any) => {
  return (
    <div className="marquee text-white">
      <p>{text}</p>
      <style jsx>{`
        .marquee {
          width: 100%;
          overflow: hidden;
          white-space: nowrap;
          box-sizing: border-box;
        }
        .marquee p {
          display: inline-block;
          padding-left: 100%;
          animation: marquee 15s linear infinite;
        }
        @keyframes marquee {
          0% {
            transform: translate(0, 0);
          }
          100% {
            transform: translate(-100%, 0);
          }
        }
      `}</style>
    </div>
  );
};

// Floating button and review form implementation
export default function HomePage() {
  const { addPathname } = useAppCtx();
  const [data, setData] = React.useState<any>(null);
  const [theme, setTheme] = React.useState<any>(null);
  const [loading, setLoading] = React.useState<any>(false);
  const [isFormVisible, setFormVisible] = React.useState<boolean>(false); // Form visibility state
  const [review, setReview] = React.useState<string>(''); // Review input state
  const [browserId, setBrowserId] = React.useState<string>(''); // Review input state
  const [success, setSuccess] = React.useState<boolean>(false); // Review input state
  const [comments, setComments] = React.useState<any>(null);


  useEffect(() => {
    const browserId = getBrowserId();
    setBrowserId(browserId)
    getComment()
    // You can send this ID to your server or use it as needed
  }, []);

  useEffect(() => {
    addPathname("/");
    if (data == null) {
      getProducts();
    }
    if (theme == null) {
      getTheme();
    }
  }, []);

  const getProducts = async () => {
    setLoading(true);
    const res2 = await fetch('/api/hello');
    const res = await res2?.json();
    if (res?.data?.status == 200) {
      setData(res?.data?.payload);
      setLoading(false);
    }
  };

  const getTheme = async () => {
    const res2 = await fetch('/api/theme');
    const res = await res2?.json();
    if (res?.data?.status == 200) {
      setTheme(res?.data?.payload?.url);
    }
  };

  const handleReviewSubmit = async(e: React.FormEvent) => {
    e.preventDefault();

    const data = new FormData();
    data.append('browserId',browserId );
    data.append('comment', review);
    data.append('token', "");

    try {
      const response = await fetch('/api/comment', {
        method: 'POST',
        body: data,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      

      setSuccess(true)
      getComment()
      setTimeout(()=>{
        setFormVisible(false);
      },10000)
      setFormVisible(false);
    } catch (error) {
      console.error('Error:', error);
      alert('There was a problem with the submission.');
    }
  };

    const getComment = async () => {
    const res2 = await fetch('/api/getComment');
    const res = await res2?.json();
    if (res?.data?.status == 200) {
      setComments(res?.data?.payload)
    }
  };


  return (
    <main>
      <section className='bg-white min-h-screen pt-24 px-0 shadow-left-right'>
        <div className="h-80">
          <div className=" w-full h-full">
            {theme ? (
              <img src={theme} alt={`Slide ${theme}`} className="object-cover h-full w-full" />
            ) : (
              <div className='w-full h-80 flex justify-center items-center'>
                <ImSpinner2 className='animate-spin' />
              </div>
            )}
          </div>
        </div> 
        {/* 752A78 */}
        <div className='bg-[#752A78]  shadow-md'>
          <p className='mb-0 px-2 font-semibold text-white '>Customer feedback </p>
          <Divider color='#3d2a3d'/>
          <div>
             {comments?.map((commentObj:any, index:any) => (
              <Marquee key={index} text={commentObj?.comment} />))}
          </div>
        </div>
       
        <div className='mt-8 pb-10'>
          <ProductSection slides={data} loading={loading} />
        </div>
        {/* Floating Review Button */}
        <button
          className="fixed bottom-6 right-6 bg-blue-600 text-white p-2 rounded-full shadow-lg flex items-center"
          onClick={() => setFormVisible(true)}
        >
          <FaPen className="mr-2" /> Leave a Review
        </button>

        {/* Review Form Modal */}
        {isFormVisible && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-md shadow-md w-11/12 max-w-lg">
              <h2 className="text-2xl mb-4">Leave a Review</h2>
              <form onSubmit={handleReviewSubmit}>
                <textarea
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  rows={4}
                  placeholder="Write your review here..."
                  required
                />
                <div className="flex justify-end mt-4">
                  <button
                    type="button"
                    className="bg-gray-500 text-white px-4 py-2 rounded-md mr-2"
                    onClick={() => setFormVisible(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-[#752A78] text-white px-4 py-2 rounded-md"
                  >
                    Submit
                  </button>
                </div>
                {success&&<div className='text-green-700'>Thank you for your review</div>}
              </form>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
