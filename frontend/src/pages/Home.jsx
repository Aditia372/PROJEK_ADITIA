import React, { useState } from "react";
import { UpdateFollower } from "react-mouse-follower";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Category from "../components/Category";
import Category2 from "../components/Category2";

const videoData = {
  Samsung:
    "https://www.youtube.com/embed/BgSs31ToxdU?modestbranding=1&showinfo=0&controls=0&rel=0",
  Oppo: "https://www.youtube.com/embed/og5MEXpozAg?modestbranding=1&showinfo=0&controls=0&rel=0",
  Infinix:
    "https://www.youtube.com/embed/AlT5-NvdeZY?modestbranding=1&showinfo=0&controls=0&rel=0",
  Vivo: "https://www.youtube.com/embed/Cu-SUC-vIT4?modestbranding=1&showinfo=0&controls=0&rel=0",
  Apple:
    "https://www.youtube.com/embed/XHTrLYShBRQ?modestbranding=1&showinfo=0&controls=0&rel=0",
  Xiaomi:
    "https://www.youtube.com/embed/hrY2Ol5Rzmo?modestbranding=1&showinfo=0&controls=0&rel=0",
};

const Home = () => {
  const [selectedBrand, setSelectedBrand] = useState("Samsung"); // Set Samsung as default
  const [isVideoPlaying, setIsVideoPlaying] = useState(true); // Set to true to start with video

  const handleClick = (brand) => {
    setSelectedBrand(brand);
    setIsVideoPlaying(true);
  };

  return (
    <>
      <div className="bg-black text-white min-h-screen">
        <main className="overflow-x-hidden">
          <UpdateFollower
            mouseOptions={{
              backgroundColor: "white",
              zIndex: 999,
              followSpeed: 1.5,
            }}
          >
            <Hero />
          </UpdateFollower>
        </main>
        <hr className="mt-10 mb-5" />
        <div className="text-6xl font-semibold mb-6 text-white text-center font-oleo">
          ~ Top Brand Choices ~
        </div>
        <hr />
        <Category />
        <Category2 />
        <div className="mt-10">
          <div className="mb-4">
            <hr/>
            <h2 className="text-5xl font-bold text-center pb-8 font-dm-serif mt-8">~ Mobile Advertises ~</h2>
            <div className="flex space-x-4 overflow-x-auto items-center justify-center border-2 gap-6 mb-14 text-xl  font-dm-serif">
              {Object.keys(videoData).map((brand) => (
                <button
                  key={brand}
                  onClick={() => handleClick(brand)}
                  className={`p-2 rounded flex-shrink-0 ${
                    brand === selectedBrand
                      ? "bg-black-700 text-green-500" 
                      : "bg-black-500 text-white"
                  } hover:bg-white-700 hover:text-green-500`}
                >
                  {brand}
                </button>
              ))}
            </div>
          </div>

<div className="mt-4 flex justify-center">
  <div className="relative" style={{ maxWidth: '1200px', width: '80%', paddingBottom: '5%' }}>
    {isVideoPlaying && (
      <div className="relative" style={{ paddingTop: '56.25%' }}>
        <iframe
          width="100%"
          height="100%"
          src={videoData[selectedBrand]}
          title={`Video Iklan ${selectedBrand}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute top-0 left-0"
          style={{ border: 'none' }} // Tambahkan style untuk menghilangkan border
        ></iframe>
      </div>
    )}
  </div>
</div>
        </div>
      </div>
    </>
  );
};

export default Home;
