
import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { setupScrollAnimation, setupSmoothScroll } from '@/lib/scrollAnimation';

const AboutPage = () => {
  useEffect(() => {
    // Setup scroll animations and smooth scrolling
    const cleanupScrollAnimation = setupScrollAnimation();
    setupSmoothScroll();
    
    // Change page title
    document.title = "Sobre Nós | Fexol";
    
    return () => {
      // Cleanup scroll animation observers when component unmounts
      if (cleanupScrollAnimation) cleanupScrollAnimation();
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-8">Sobre a Fexol</h1>
          <p className="text-lg mb-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget ultricies ultrices, nunc nisl aliquet nunc, vitae aliquam nisl nunc sit amet nunc.
          </p>
          <p className="text-lg mb-6">
            Praesent euismod, nisl eget ultricies ultrices, nunc nisl aliquet nunc, vitae aliquam nisl nunc sit amet nunc.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;
