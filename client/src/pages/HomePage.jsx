import Navbar from '../components/Navbar/Navbar';
import Hero from '../components/Hero';
import Banner from '../components/Banner';
import Pricing from '../components/Pricing';
import ContactCard from '../components/Contact/ContactCard';
import Features from '../components/Features/Features';
import Testimonial from '../components/Testimonial';
import Footer from '../components/Footer';


const HomePage = () => {
    return (
        <>
        <div className="dark:bg-slate-900 dark:text-white">
            <div className="fixed left-0 right-0 top-0 z-50 ">
              <Navbar />
            </div>
            <div className='mt-12 md:mt-0'>
              <Hero />
              <Banner />
              <Features />
              <Pricing />
              <ContactCard />
              <Testimonial />
              <Footer />
              </div>
            </div>
        </>
      );
}

export default HomePage