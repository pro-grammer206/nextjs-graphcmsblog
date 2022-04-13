import "../styles/globals.css";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

function MyApp({ Component, pageProps }) {
  const [show, setShow] = useState(true);
  return (
    <>
      <div style={{ display: "flex", gap: "1rem", margin: "1rem" }}>
        <Image
          src="/ham.svg"
          width={32}
          height={32}
          onClick={() => setShow(!show)}
        />

        <AnimatePresence>{show && <Nav />}</AnimatePresence>
      </div>
      <Component
        {...pageProps}
        onClick={() => {
          if (show) setShow(false);
        }}
      />
      <Footer />
    </>
  );
}

export default MyApp;
