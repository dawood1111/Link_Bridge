import HeroSection from "../Component/LandingPage/HeroSection";
import Header from "../Component/LandingPage/Header";
import SolutionSection from "../Component/LandingPage/SolutionSection";
import HowitworkSection from "../Component/LandingPage/HowItsWorkSection"; 
import Footer from "../Component/LandingPage/Footer";   

function LandingPage(){

    return(
        <div className="min-h-screen bg-[#F97316] font-[Poppins,sans-serif]">
      <Header/>
      
       
      <HeroSection/>

      <SolutionSection/>
      <HowitworkSection/>
      <Footer/>
      

        </div>        
    )
}
export default LandingPage;
