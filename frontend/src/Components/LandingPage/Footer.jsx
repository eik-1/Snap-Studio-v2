import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer className="mt-12 bg-white border-t-[1px] text-black py-8 w-full">
      <div className="mt-20 md:mt-32 container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 flex flex-col items-center md:block md:mb-0">
          <h1 className="text-xl text-gray-700 font-bold">SnapStudio</h1>
          <p className="text-sm text-gray-400">Your AI-powered image Studio.</p>
        </div>

        <div className="flex flex-col md:flex-row items-center md:space-x-6 text-sm">
          <Link to="/terms" className="text-gray-500 hover:text-black transition-colors duration-300">
            Terms & Conditions
          </Link>
          <Link to="/privacy" className="text-gray-500 hover:text-black transition-colors duration-300">
            Privacy Policy
          </Link>
          <a href="/contact" className="text-gray-500 hover:text-black transition-colors duration-300">
          <a href="mailto:email@example.com">Contact us - help@snapstudio.me</a>
          </a>
        </div>

        <div className="flex space-x-4 mt-4 md:mt-0">
         
    
          <a
            href="https://x.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-black transition-colors duration-300"
        
          >
             <svg
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="25"
          fill="currentColor"
          viewBox="0 0 25 25"
          className='h-full w-full'
        >
          <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865l8.875 11.633Z" />
        </svg>
          </a>
        </div>
      </div>

      <div className="mt-8 text-center text-gray-400 text-xs">
        © {new Date().getFullYear()} SnapStudio. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
