// src/pages/UnauthorizedPage.js
import React from 'react';

export default function UnauthorizedPage() {
  return (
    <section       className="min-h-screen flex justify-center items-center bg-cover bg-center"
    style={{
      backgroundImage:
      "url('https://i.pinimg.com/originals/d6/54/c5/d654c586924776df54664116ada9a257.jpg')",

    }}
    >
      <div className="bg-white bg-opacity-90 rounded-2xl flex max-w-3xl p-8 shadow-lg items-center flex-col text-center">
        <img src="https://i.pinimg.com/564x/a7/b3/80/a7b380814594af9221d45316ab8bcdd9.jpg" alt="" className='w-[400px]'/>
        <h2 className="font-bold text-3xl text-[#002D74]">Ups! Kayaknya Kamu salah Alamat</h2>

      </div>
    </section>
  );
}
