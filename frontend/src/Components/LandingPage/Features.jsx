import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { FaUserTie, FaImage, FaPaintBrush, FaTshirt } from "react-icons/fa";

const navItems = [
  { id: "headshot", icon: <FaUserTie />, label: "Headshots" },        // professional look
  { id: "images", icon: <FaImage />, label: "Images" },               // image generation
  { id: "styles", icon: <FaPaintBrush />, label: "Image Styles" },    // styling tool
  { id: "fashion", icon: <FaTshirt />, label: "Fashion Try on" },          // fashion try-on
];

const contentBoxes = [
  {
    id: "headshot",
    title: "Studio-Quality AI Headshots",
    subtitle: "Create professional headshots effortlessly with AI.",
    details: "Perfect for LinkedIn, portfolios, resumes, and more.",
  },
  {
    id: "images",
    title: "High-Quality AI Image Generation",
    subtitle: "Turn your vision into reality with stunning AI-generated visuals.",
    details: "Upload, prompt, and let SnapStudio generate the magic.",
  },
  {
    id: "styles",
    title: "Apply Unique Styles to Your Images",
    subtitle: "Transform photos with curated styles and aesthetic presets.",
    details: "From cinematic to fantasy — match any vibe or brand.",
  },
  {
    id: "fashion",
    title: "AI-Powered Fashion Try-On",
    subtitle: "See how outfits look on you — perfect for personal use or Shopify stores.",
details: "Boost your conversions with lifelike AI try-on technology.",

  },
];


export default function FullPageScrollLayout() {
  const sectionRefs = useRef({});
  const [activeSection, setActiveSection] = useState(null);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    Object.values(sectionRefs.current).forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => {
      Object.values(sectionRefs.current).forEach((section) => {
        if (section) observer.unobserve(section);
      });
    };
  }, []);

  return (
    <div className="flex flex-col md:flex-row h-max max-w-6xl mx-auto mt-32 lg:pt-12 md:gap-12  ">
      {/* Sticky Sidebar */}
      <aside className="hidden md:flex   sticky top-32  h-full bg-white  p-4 flex-col gap-6">
        
        {navItems.map(({ id, icon, label }) => (
          <a
            key={id}
            href={`#${id}`}
            className={`flex items-center gap-2 text-sm font-medium transition-colors duration-200 ${
              activeSection === id ? "text-sky-500 font-semibold" : "text-gray-600"
            }`}
          >
            {icon}
            {label}
          </a>
        ))}
      </aside>
    


      {/* Main Page Scrolls - One Scrollbar */}
      <div className="flex-1  space-y-20">
        {contentBoxes.map(({ id, title, subtitle, details }) => (
            <>
          <motion.section
            key={id}
            id={id}
            ref={(el) => (sectionRefs.current[id] = el)}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, amount: 0.5 }}
            className="bg-sky-50/50 shadow-lg shadow-gray-100 border-8 border-white p-8 rounded-2xl min-h-96  md:min-h-80 flex flex-col gap-10 md:flex-row items-center "
          >
            <div className="flex-1 md:pr-8   order-2 md:order-1">
            <h2 className="text-xl md:text-2xl font-semibold mb-4">{title}</h2>
            <p className="text-gray-700 text-md mb-4">{subtitle}</p>
            <p className="text-gray-500 text-sm">{details}</p>
            </div>
              <div className="relative w-full md:w-3/5 order-1 md:order-2 rounded-xl">
                        <video
                            alt="app running"
                            className="h-full w-full object-fill rounded-xl"
                            autoPlay
                            muted
                            loop
                            playsInline
                          

                        >
                            <source
                                src={`https://res.cloudinary.com/doac8yyie/video/upload/v1745303725/snapstudio-custom_wfckdq.mp4`}
                                type="video/mp4"
                            />
                            Your browser does not support the video tag.
                        </video>
                    </div>
          </motion.section>
          
                  
                    </>
        ))}
      </div>

    </div>
  );
}
