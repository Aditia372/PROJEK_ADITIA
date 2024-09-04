import React from 'react';

const About = () => {
    return (
        <div className="relative min-h-screen flex justify-center items-center bg-cover bg-center"
            style={{
                backgroundImage:
                    "url('https://i.pinimg.com/originals/d6/54/c5/d654c586924776df54664116ada9a257.jpg')",
            }}
        >
            <div className="absolute inset-0 bg-blue-800 opacity-50"></div> {/* Overlay */}
            <div className="relative sm:w-1/2 p-5">
                <div className="image object-center text-center">
                    <img src="https://i.imgur.com/WbQnbas.png" alt="Galaxy Phone" className="mx-auto" />
                </div>
            </div>
            <div className="relative sm:w-1/2 p-4">
                <div className="text text-justify">
                    <span className="text-gray-300 border-b-2 border-indigo-400 uppercase">Tentang Kami</span>
                    <h2 className="my-4 font-bold text-3xl sm:text-4xl text-gray-100">
                        Tentang <span className="text-indigo-400">Galaxy Phone</span>
                    </h2>
                    <p className="text-gray-200">
                        Selamat datang di Galaxy Phone, tujuan utama Anda untuk smartphone terbaru dan terbaik. Di Galaxy Phone, kami berdedikasi untuk menawarkan berbagai perangkat mutakhir dari merek-merek terkemuka, memastikan Anda menemukan ponsel yang sempurna untuk memenuhi kebutuhan Anda. Tujuan kami adalah memberikan layanan pelanggan yang luar biasa dan pengalaman belanja yang lancar, memudahkan Anda untuk tetap terhubung dengan teknologi terbaik yang tersedia.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default About;
