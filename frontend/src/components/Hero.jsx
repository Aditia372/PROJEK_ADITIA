import React from "react";
import Produk1 from "../assets/ip.png";
import Produk2 from "../assets/produk-2.png";
import Produk3 from "../assets/produk-3.png";
import { FaWhatsapp } from "react-icons/fa6";
import { UpdateFollower } from "react-mouse-follower";
import { easeInOut, motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";

const fadeUp = (delay) => {
  return {
    hidden: {
      opacity: 0,
      y: 100,
      scale: 0.5,
    },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        delay: delay,
        ease: easeInOut,
      },
    },
    exit: {
      opacity: 0,
      y: 50,
      scale: 0.5,
      transition: {
        duration: 0.5,
        ease: easeInOut,
      },
    },
  };
};

const SamsungData = [
  {
    id: 1,
    image: Produk1,
    title: "Apple Iphone 15 PRO MAX",
    subtitle:
      "iPhone 15 Pro Max adalah smartphone premium dari Apple dengan layar 6,7 inci, chip A17 Pro, kamera triple 48MP dengan zoom optik 5x, dan bodi titanium. Mendukung 5G, memiliki baterai tahan lama, dan menjalankan iOS 17.",
    price: "Rp. 22.249.000",
    modal: "Violet",
    bgColor: "#8b5958",
  },
  {
    id: 1,
    image: Produk2,
    title: "Samsung Galaxy ZFlip",
    subtitle:
      "Samsung Galaxy Z Flip adalah smartphone lipat dengan layar AMOLED 6,7 inci yang dapat dilipat menjadi ukuran yang lebih compact. Ditenagai oleh chip Snapdragon, ponsel ini memiliki kamera ganda 12MP, layar eksternal kecil untuk notifikasi, dan desain yang stylish dan portabel.",
    price: "Rp. 17.499.000",
    modal: "Purple Awesome",
    bgColor: "#8b5958",
  },
  {
    id: 1,
    image: Produk3,
    title: "Samsung Galaxy S22 Ultra",
    subtitle:
      "Samsung Galaxy S22 Ultra adalah smartphone flagship dengan layar AMOLED 6,8 inci beresolusi tinggi dan refresh rate 120Hz. Ditenagai oleh chip Exynos atau Snapdragon, ponsel ini memiliki sistem kamera quad 108MP dengan zoom optik 10x, dukungan S Pen, dan baterai besar dengan pengisian cepat. Desain premium dan fitur-fitur canggih menjadikannya salah satu perangkat terbaik di kelasnya.",
    price: "Rp. 12.500.000",
    modal: "Brown Awesome",
    bgColor: "#8b5958",
  },
];
const Hero = () => {
  const [activeData, setActiveData] = React.useState(SamsungData[0]);

  const handleActiveData = (data) => {
    setActiveData(data);
  };
  return (
    <>
      <section className="bg-brandDark text-white font-valera">
        <div className="container grid grid-cols-2 md:grid-cols-2 min-h-[650px]">
          {/*left side*/}
          <div className="flex flex-col justify-center py-14 md:py-0 xl:max-w-[600px]">
            <div className="space-y-4 text-center md:text-left">
              <AnimatePresence mode="wait">
                <UpdateFollower
                  mouseOptions={{
                    backgroundColor: "white",
                    zIndex: 9999,
                    followSpeed: 0.5,
                    rotate: -720,
                    mixBlendMode: "difference",
                    scale: 10,
                  }}
                >
                  <motion.h1
                    key={activeData.title}
                    variants={fadeUp(0.3)}
                    initial="hidden"
                    animate="show"
                    exit="exit"
                    className="text-3xl lg:text-6xl font-bold font-valera"
                  >
                    {activeData.title}
                  </motion.h1>
                </UpdateFollower>
              </AnimatePresence>
              <AnimatePresence mode="wait">
                <motion.p
                  key={activeData.title}
                  variants={fadeUp(0.3)}
                  initial="hidden"
                  animate="show"
                  exit="exit"
                  className="text-sm leading-loose text-white/80"
                >
                  {activeData.subtitle}
                </motion.p>
              </AnimatePresence>
              <AnimatePresence mode="wait">
                <UpdateFollower
                  mouseOptions={{
                    backgroundColor: activeData.bgCol6,
                    zIndex: 9999,
                    followSpeed: 0.5,
                    rotate: -720,
                    scale: 6,
                    backgroundElement: (
                      <div>
                        <img src={activeData.image} alt="" />
                      </div>
                    ),
                  }}
                >
                </UpdateFollower>
              </AnimatePresence>
              <div className="flex items-center justify-center md:justify-start gap-4 !mt-25">
                <div className="w-20 h-[1px] bg-white"></div>
                <p className="uppercase text-sm">Top Recomendation for you</p>
                <div className="w-20 h-[1px] bg-white"></div>
              </div>
              <div className="grid grid-cols-3 gap-30 !mt-10">
                {SamsungData.map((item) => {
                  return (
                    <div
                      key={item.id}
                      onClick={() => handleActiveData(item)}
                      className="grid grid-cols-2 place-items-center cursor-pointer"
                    >
                      <div>
                        <img src={item.image} alt="" className="w-[400px]" />
                      </div>
                      <div className="space-y-4">
                        <p className="text-sm font-bold">{item.price}</p>
                        <p className="text-xs font-normal text-nowrap">
                          {item.modal}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            {/*right side*/}
            {/*footer*/}
          </div>
          <div className="flex flex-col justify-evenly items-center ml-20">
            <AnimatePresence mode="wait">
              <motion.img
                key={activeData.image}
                initial={{ opacity: 0, scale: 0.9, y: 100 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2, ease: easeInOut }}
                exit={{
                  opacity: 0,
                  scale: 0.9,
                  y: 100,
                  transition: {
                    duration: 0.2,
                  },
                }}
                src={activeData.image}
                alt=""
                className="w-[1000px] md:w-[800px] xl:w-[500px] mx-auto w"
              />
            </AnimatePresence>
          </div>
          <div
            className="text-3xl text-white fixed bottom-10 right-10 
              hover:rotate-[360deg] duration-500 z-[99999] mix-blend-difference"
          >
            <a href=" https://wa.me/088809552158">
              <FaWhatsapp />
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
