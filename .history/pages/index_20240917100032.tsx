import Image from "next/image";
import localFont from "next/font/local";
import ClipLoader from "react-spinners/ClipLoader";
import { useState } from "react";


const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const Marquee = ({ comments }: any) => {
  return (
    <div className="marquee text-white font-normal flex">
      {comments?.map((item: any, id: any) => (
        <p key={id}>{item?.comment}</p>
      ))}
      <style jsx>{`
        .marquee {
          width: 100%;
          overflow: hidden;
          white-space: nowrap;
          box-sizing: border-box;
        }
        .marquee p {
          display: flex;
          width: 100%;
          padding-left: 10%;
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

const override: React.CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "#752A78",
};

export default function Home() {
  const [data, setData] = useState<any>(null);
  const [theme, setTheme] = useState<any>(null);
  const [loading, setLoading] = useState<any>(false);
  const [isFormVisible, setFormVisible] = useState<boolean>(false); // Form visibility state
  const [review, setReview] = useState<string>(""); // Review input state
  const [browserId, setBrowserId] = useState<string>(""); // Review input state
  const [success, setSuccess] = React.useState<boolean>(false); // Review input state
  const [comments, setComments] = React.useState<any>(null);
  const [name, setName] = React.useState<any>(null);

  useEffect(() => {
    const browserId = getBrowserId();
    setBrowserId(browserId);
    getComments();
    getProducts();
    getTheme();
  }, []);

  const getProducts = async () => {
    setLoading(true);
    const res2 = await fetch(`/api/products?timestamp=${new Date().getTime()}`);
    const res = await res2?.json();
    console.log("res", res);
    if (res?.data?.status == 200) {
      setData(res?.data?.payload);
      setLoading(false);
    }
  };

  const getTheme = async () => {
    const res2 = await fetch(`/api/theme?timestamp=${new Date().getTime()}`);
    const res = await res2?.json();
    if (res?.data?.status == 200) {
      setTheme(res?.data?.payload?.url);
    }
  };

  const getComments = async () => {
    setComments(null);
    const res2 = await fetch(`/api/comments`);
    const res = await res2?.json();
    console.log("res", res);
    if (res?.data?.status == 200) {
      setComments(res?.data?.payload);
    }
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetcher("/api/comment", {
        browserId: browserId,
        review: review,
        name: name,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();

      setSuccess(true);
      getComments();
      setTimeout(() => {
        setFormVisible(false);
      }, 10000);
      setFormVisible(false);
    } catch (error) {
      alert("There was a problem with the submission.");
    }
  };

  return (
    <main>
      <div className="bg-white min-h-screen pt-24 px-0 shadow-left-right text-black">
        <div className="h-83">
          <div className=" w-full h-full">
            {theme ? (
              <img
                src={theme}
                alt={`Slide ${theme}`}
                className="object-cover h-full w-full"
              />
            ) : (
              <div className="w-full h-80 flex justify-center items-center">
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
          </div>
        </div>

        <div className="bg-[#752A78] shadow-md">
          <p className="mb-0 px-2 font-medium text-white py-2 text-center">
            Testimonials
          </p>
          <Divider color="#3d2a3d" />
          <div className="pt-2 pb-2 flex items-center">
            <Marquee comments={comments} />
          </div>
        </div>

        <div className="mt-8 pb-10">
          <ProductSection slides={data} loading={loading} />
        </div>
        <button
          className="fixed bottom-6 right-6 bg-[#5e1489] text-white p-2 rounded-full shadow-lg flex items-center"
          onClick={() => setFormVisible(true)}
        >
          <FaPen className="mr-2 " /> Leave a Review
        </button>

        {/* Review Form Modal */}
        {isFormVisible && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-md shadow-md w-11/12 max-w-lg">
              <h2 className="text-2xl mb-4">Leave a Review</h2>
              <form onSubmit={handleReviewSubmit}>
                <input
                  className="w-full mb-2 p-2 border border-gray-300 rounded-md"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  required
                />

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
                {success && (
                  <div className="text-green-700">
                    Thank you for your review
                  </div>
                )}
              </form>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
