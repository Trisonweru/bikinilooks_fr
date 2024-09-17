import Image from "next/image";
import localFont from "next/font/local";

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

  const [data, setData] = React.useState<any>(null);
  const [theme, setTheme] = React.useState<any>(null);
  const [loading, setLoading] = React.useState<any>(false);
  const [isFormVisible, setFormVisible] = React.useState<boolean>(false); // Form visibility state
  const [review, setReview] = React.useState<string>(""); // Review input state
  const [browserId, setBrowserId] = React.useState<string>(""); // Review input state
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
    <div
      className={`${geistSans.variable} ${geistMono.variable} grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]`}
    >
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="https://nextjs.org/icons/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li className="mb-2">
            Get started by editing{" "}
            <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
              pages/index.tsx
            </code>
            .
          </li>
          <li>Save and see your changes instantly.</li>
        </ol>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="https://nextjs.org/icons/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Deploy now
          </a>
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read our docs
          </a>
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
