import Hero from "./Hero";
import Features from "./Features";
import Testimonials from "./Testimonials";
import Footer from "../layout/footer";
import SignUp from "./SignUp";

const LandingPage = () => {
    return (
        <>
            <Hero />
            <Features />  
            <Testimonials />
            <SignUp />
            <Footer />  
        </>
    )
}

export default LandingPage;