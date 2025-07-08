import Hero from "@/components/sections/home/Hero";
import Footer from "@/components/ui/Footer";
import Navbar from "@/components/ui/Navbar";
import { Fragment } from "react";

export default function Home() {
  return (
    <Fragment>
      <Navbar />
      <Hero />
      <Footer />
    </Fragment>
  );
}
