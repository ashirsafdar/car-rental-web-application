import React from "react";
import { Link } from "react-router-dom";
import Footer from "../components/footer";
import { assets } from "../assets/data";

const Contact = () => {
  return (
    <>
<section className="contact-page">
  <div className="relative h-[calc(100svh-70px)] w-full overflow-hidden bg-black">
    <video
      className="absolute inset-0 h-full w-full object-cover brightness-50"
      src={assets.cardrift}
      muted
      autoPlay
      loop
      playsInline
      preload="auto"
      aria-label="Luxury car promotional video"
    />

    {/* Content */}


    {/* Content goes here */}

          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
            <div className="text-center text-white">
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                Drive with confidence
              </h1>
              <p className="mt-3 text-sm text-gray-200 sm:text-base">
                Premium cars, trusted service, and flexible rentals for every journey.
              </p>

              <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
                <Link
                  to="/listing"
                  className="rounded-full bg-sky-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-sky-400"
                >
                  Explore Cars
                </Link>

                <Link
                  to="/contact"
                  className="rounded-full border border-white/80 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col items-center px-4 py-16 text-sm sm:px-6 lg:px-8">
        <form className="flex w-full max-w-[700px] flex-col items-center text-sm">
          <p className="pb-2 text-lg font-medium text-sky-400">Contact Us</p>
          <h1 className="pb-4 text-4xl font-semibold text-slate-700">Get in touch with us</h1>
          <p className="pb-10 text-center text-sm text-gray-500">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            <br />
            Lorem Ipsum has been the industry's standard dummy text.
          </p>

          <div className="flex w-full flex-col items-center gap-8 md:flex-row">
            <div className="w-full">
              <label className="text-black/70" htmlFor="name">
                Your Name
              </label>
              <input
                id="name"
                className="mt-2 h-12 w-full rounded border border-gray-500/30 p-2 outline-none transition focus:border-indigo-300"
                type="text"
                required
              />
            </div>
            <div className="w-full">
              <label className="text-black/70" htmlFor="email">
                Your Email
              </label>
              <input
                id="email"
                className="mt-2 h-12 w-full rounded border border-gray-500/30 p-2 outline-none transition focus:border-indigo-300"
                type="email"
                required
              />
            </div>
          </div>

          <div className="mt-6 w-full">
            <label className="text-black/70" htmlFor="message">
              Message
            </label>
            <textarea
              id="message"
              className="mt-2 h-40 w-full resize-none rounded border border-gray-500/30 p-2 outline-none transition focus:border-indigo-300"
              required
            />
          </div>

          <button
            type="submit"
            className="mt-5 h-12 w-56 rounded bg-sky-400 px-4 text-white transition active:scale-95"
          >
            Send Message
          </button>
        </form>
      </section>

      <Footer />
    </>
  );
};

export default Contact;
