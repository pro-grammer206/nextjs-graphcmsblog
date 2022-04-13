import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const Nav = () => {
  return (
    <AnimatePresence>
      <motion.nav initial={{ y: -500 }} animate={{ y: 0 }} exit={{ y: -3000 }}>
        <section>
          <p>My Works</p>
        </section>
        <section>
          <Link href="/">
            <a>Home</a>
          </Link>
          <Link href="/about">
            <a>About</a>
          </Link>
        </section>
      </motion.nav>
    </AnimatePresence>
  );
};

export default Nav;
