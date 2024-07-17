import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#fff] text-gray-500 p-8">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* ABOUT US */}
        <div>
          <h2 className="text-lg font-bold mb-4">ABOUT US</h2>
          <p>
            Wina Online is your pocket-friendly online shop for original designer perfumes & colognes.
          </p>
        </div>

        {/* FOLLOW US */}
        <div>
          <h2 className="text-lg font-bold mb-4">FOLLOW US</h2>
          {/* Add your social media icons or links here */}
        </div>

        {/* CONTACT INFO */}
        <div>
          <h2 className="text-lg font-bold mb-4 ">CONTACT INFO</h2>
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
            info@winaonline.co.ke
          </p>
          <p className="mt-2">
            <strong>WORKING DAYS/HOURS:</strong> <br />
            Monday-Saturday: 9.00 a.m to 6.00 p.m <br />
            Sundays we are closed
          </p>
        </div>
      </div>

      {/* USEFUL LINKS */}
      <div className="mt-8 border-t border-gray-600 pt-8">
        <h2 className="text-lg font-bold mb-4">USEFUL LINKS</h2>
        <ul className="space-y-2">
          <li><a href="#" className="hover:underline">About us</a></li>
          <li><a href="#" className="hover:underline">Our Blog</a></li>
          <li><a href="#" className="hover:underline">Return Policy</a></li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
