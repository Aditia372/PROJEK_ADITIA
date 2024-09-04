import React, { useEffect, useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { api } from '../utils';

const Contact = () => {
  const [user] = useOutletContext();
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/out");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const contactData = {
      id_user: user.id,
      name: user.fullname,
      subject,
      message,
    };

    api
      .post("/auth/message", contactData)
      .then((res) => {
        alert("Berhasil mengirim pesan!");
        window.location.reload(); // Reload the page after successful submission
      })
      .catch((err) => {
        alert("Gagal mengirim pesan! Please try again.");
      });
  };

  return (
    <div
      className="min-h-screen bg-gray-800 py-6 flex flex-col justify-center sm:py-12"
      style={{
        backgroundImage:
          "url('https://i.pinimg.com/originals/d6/54/c5/d654c586924776df54664116ada9a257.jpg')",
      }}
    >
      <div className="relative py-3 sm:max-w-4xl sm:mx-auto w-[600px]"> {/* Increased container width */}
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-700 to-purple-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative text-white px-8 py-10 bg-indigo-400 shadow-lg sm:rounded-3xl sm:p-14">
          <div className="text-center pb-6">
            <h1 className="text-3xl font-bold">Contact Us!</h1>
            <p className="text-gray-300">
              Fill up the form below to send us a message.
            </p>
          </div>
          <form onSubmit={handleSubmit} className="max-w-lg mx-auto"> {/* Centered form and limited width */}
            <div className="mb-4">
              <label htmlFor="fullname" className="block text-lg font-medium">Full Name</label>
              <input
                type="text"
                id="fullname"
                name="fullname"
                value={user?.fullname || ""}
                disabled
                className="w-full border border-blue-800 px-4 py-2 rounded focus:outline-none focus:border-gray-600 text-gray-700"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-lg font-medium">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={user?.email || ""}
                disabled
                className="w-full border border-blue-800 px-4 py-2 rounded focus:outline-none focus:border-gray-600 text-gray-700"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="subject" className="block text-lg font-medium">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                placeholder="Subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full border border-gray-400 px-4 py-2 rounded focus:outline-none focus:border-indigo-600 text-gray-700"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="message" className="block text-lg font-medium">Message</label>
              <textarea
                id="message"
                name="message"
                placeholder="Type your message here..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full border border-gray-400 px-4 py-2 rounded focus:outline-none focus:border-indigo-600 text-gray-700 h-32"
              />
            </div>
            <div className="flex justify-between">
              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Send ➤
              </button>
              <button
                type="reset"
                onClick={() => {
                  setSubject('');
                  setMessage('');
                }}
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
