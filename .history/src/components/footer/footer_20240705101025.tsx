import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#fff] text-gray-500 p-8">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* ABOUT US */}
        <div>
           <div className='border-b mb-2'>
              <h2 className="text-lg font-bold mb-4">ABOUT US</h2>
           </div>
          <p>
            Wina Online is your pocket-friendly online shop for original designer perfumes & colognes.
          </p>
        </div>

        {/* FOLLOW US */}
        <div>
          <div className='border-b mb-2'>
            <h2 className="text-lg font-bold mb-4">USEFUL LINKS</h2>
          </div>
          <ul className="space-y-2">
            <li><a href="#" className="hover:underline text-[#752A78]">About us</a></li>
            <li><a href="#" className="hover:underline text-[#752A78]">Return Policy</a></li>
          </ul>
        </div>

        {/* CONTACT INFO */}
        <div>
          <div className='border-b mb-2'>
            <h2 className="text-lg font-bold mb-4 ">CONTACT INFO</h2>
          </div>
          <p>
            Cianda House-1st Floor-Suite 101, <br />
            Koinange Street
          </p>
          <p className="mt-2">
            <strong>PHONE:</strong> <br />
            +254 711 766 277
          </p>
          <p className="mt-2">
            <strong>EMAIL:</strong> <br />
            info@bikinilooks
          </p>
          <p className="mt-2">
            <strong>WORKING DAYS/HOURS:</strong> <br />
            Monday-Saturday: 9.00 a.m to 6.00 p.m <br />
            Sundays we are closed
          </p>
        </div>
      </div>

      {/* USEFUL LINKS */}
      <div className="mt-8 border-t border-gray-600 pt-8 flex space-x-5">
       <div className="hover:cursor-pointer flex justify-center items-center rounded-full hover:border">
          <svg
            viewBox="0 -0.5 25 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 font-extrabold text-[#752A78]"
          >
            <path
              d="M11.75 19C11.75 19.4142 12.0858 19.75 12.5 19.75C12.9142 19.75 13.25 19.4142 13.25 19H11.75ZM13.25 11C13.25 10.5858 12.9142 10.25 12.5 10.25C12.0858 10.25 11.75 10.5858 11.75 11H13.25ZM15.5 5.75C15.9142 5.75 16.25 5.41421 16.25 5C16.25 4.58579 15.9142 4.25 15.5 4.25V5.75ZM12.5 8H11.75H12.5ZM11.75 11C11.75 11.4142 12.0858 11.75 12.5 11.75C12.9142 11.75 13.25 11.4142 13.25 11H11.75ZM12.5 10.25C12.0858 10.25 11.75 10.5858 11.75 11C11.75 11.4142 12.0858 11.75 12.5 11.75V10.25ZM14.5 11.75C14.9142 11.75 15.25 11.4142 15.25 11C15.25 10.5858 14.9142 10.25 14.5 10.25V11.75ZM12.5 11.75C12.9142 11.75 13.25 11.4142 13.25 11C13.25 10.5858 12.9142 10.25 12.5 10.25V11.75ZM10.5 10.25C10.0858 10.25 9.75 10.5858 9.75 11C9.75 11.4142 10.0858 11.75 10.5 11.75V10.25ZM13.25 19V11H11.75V19H13.25ZM15.5 4.25C13.4289 4.25 11.75 5.92893 11.75 8H13.25C13.25 6.75736 14.2574 5.75 15.5 5.75V4.25ZM11.75 8V11H13.25V8H11.75ZM12.5 11.75H14.5V10.25H12.5V11.75ZM12.5 10.25H10.5V11.75H12.5V10.25Z"
              fill="#000"
            />
          </svg>
        </div>
        <div className="hover:cursor-pointer flex justify-center items-center rounded-full hover:border">
          <svg
            fill="#000"
            viewBox="0 0 256 256"
            id="Flat"
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 font-extrabold text-[#752A78]"
          >
            <path d="M243.69531,70.46924A3.99949,3.99949,0,0,0,240,68l-32.79834-.00049a44.09747,44.09747,0,0,0-38.64307-23.99609A44.31838,44.31838,0,0,0,124,87.99951l-.00977,11.1709c-44.07861-9.38477-80.78418-45.62207-81.16308-46a4.00074,4.00074,0,0,0-6.7627,2.11426c-8.5205,46.86181,5.47461,78.11865,18.71534,96.08789a103.47267,103.47267,0,0,0,27.40136,25.87207C66.4668,197.58936,38.88574,208.14551,38.5957,208.25488a3.99983,3.99983,0,0,0-1.92382,5.96387c.26464.39746,2.78417,3.98145,9.53906,7.35889C54.73438,225.83936,66.10254,228,80,228c68.94678,0,126.47021-53.45166,131.624-121.96729l31.2041-31.2041A3.99939,3.99939,0,0,0,243.69531,70.46924Zm-38.78613,30.96484a4.00173,4.00173,0,0,0-1.16357,2.57422C199.60205,169.05029,145.24609,220,80,220c-17.8457,0-27.62695-3.88721-32.50391-6.8667,10.374-4.82812,31.45508-16.34863,43.832-34.91455a3.99941,3.99941,0,0,0-1.53906-5.79639c-.15136-.07568-15.293-7.77832-28.56885-25.79541-16.65429-22.602-22.84765-50.36084-18.4497-82.60156,12.792,11.31055,45.86767,37.46973,84.55761,43.91992a4,4,0,0,0,4.65821-3.94189L132,88.00635v-.00391a36.31979,36.31979,0,0,1,36.459-36,36.07711,36.07711,0,0,1,32.54688,21.59863,4.00012,4.00012,0,0,0,3.66553,2.39844L230.34326,76Z" />
          </svg>
        </div>
        <div className="hover:cursor-pointer flex justify-center items-center rounded-full hover:border text-[#752A78]" >
          <svg
            viewBox="0 -0.5 25 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 font-bold text-[#752A78]"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M15.5 5H9.5C7.29086 5 5.5 6.79086 5.5 9V15C5.5 17.2091 7.29086 19 9.5 19H15.5C17.7091 19 19.5 17.2091 19.5 15V9C19.5 6.79086 17.7091 5 15.5 5Z"
              stroke="#000"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M12.5 15C10.8431 15 9.5 13.6569 9.5 12C9.5 10.3431 10.8431 9 12.5 9C14.1569 9 15.5 10.3431 15.5 12C15.5 12.7956 15.1839 13.5587 14.6213 14.1213C14.0587 14.6839 13.2956 15 12.5 15Z"
              stroke="#000"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <rect
              x="15.5"
              y="9"
              width="2"
              height="2"
              rx="1"
              transform="rotate(-90 15.5 9)"
              fill="#000"
            />
            <rect
              x="16"
              y="8.5"
              width="1"
              height="1"
              rx="0.5"
              transform="rotate(-90 16 8.5)"
              stroke="#000"
              stroke-linecap="round"
            />
          </svg>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
