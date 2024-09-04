// src/pages/UnauthorizedPage.js
import React from 'react';
import { Link } from 'react-router-dom';

export default function UnauthorizedPage() {
  return (
    <section       className="min-h-screen flex justify-center items-center bg-cover bg-center"
    style={{
      backgroundImage:
      "url('https://i.pinimg.com/originals/d6/54/c5/d654c586924776df54664116ada9a257.jpg')",

    }}
    >
      <div className="bg-white bg-opacity-90 rounded-2xl flex max-w-3xl p-8 shadow-lg items-center flex-col text-center">
        <img src="https://i.pinimg.com/564x/11/07/f4/1107f4798a16729e404f28c011f64526.jpg" alt="" className='w-[400px]'/>
        <h2 className="font-bold text-3xl text-[#002D74]">Ups, Kamu Belum Login!</h2>
        <p className="text-sm mt-2 text-[#002D74]">
          Anda perlu login terlebih dahulu untuk mengakses halaman ini.
        </p>
        <div className="mt-6">
          <Link
            to="/login"
            className="bg-[#002D74] text-white py-2 px-4 rounded-xl hover:scale-105 duration-300 hover:bg-[#206ab1] font-medium"
          >
            Kembali ke Halaman Login
          </Link>
        </div>
      </div>
    </section>
  );
}
