import Hero from "./Hero";
import Features from "./Features";
import Testimonials from "./Testimonials";
import Footer from "../layout/footer";
import SignUp from "./SignUp";
import NavBar from "../layout/navbar";

const LandingPage = () => {
  return (
    <>
      <NavBar />
      <Hero />
      <Features />
      <Testimonials />
      <SignUp />
      <Footer />
    </>
  );
};

export default LandingPage;
