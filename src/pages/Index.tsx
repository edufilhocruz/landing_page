
import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Testimonials from '@/components/Testimonials';
import Faq from '@/components/Faq';
import ContactForm from '@/components/ContactForm';
import Footer from '@/components/Footer';
import { setupScrollAnimation, setupSmoothScroll } from '@/lib/scrollAnimation';

const Index = () => {
  useEffect(() => {
    // Setup scroll animations and smooth scrolling
    const cleanupScrollAnimation = setupScrollAnimation();
    setupSmoothScroll();
    
    // Change page title
    document.title = "Fexol - Outsourcing de Desenvolvimento";
    
    return () => {
      // Cleanup scroll animation observers when component unmounts
      if (cleanupScrollAnimation) cleanupScrollAnimation();
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <Services />
        <Testimonials />
        <Faq />
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
