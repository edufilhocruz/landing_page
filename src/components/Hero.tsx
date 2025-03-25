
import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowDownCircle } from 'lucide-react';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        }
      },
      {
        threshold: 0.1,
      }
    );
    
    if (heroRef.current) {
      observer.observe(heroRef.current);
    }
    
    return () => {
      if (heroRef.current) {
        observer.unobserve(heroRef.current);
      }
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-primary-50 to-accent-50 opacity-60"></div>
      
      {/* Subtle geometric shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-primary-100 opacity-40 mix-blend-multiply"></div>
        <div className="absolute top-1/3 -left-20 w-60 h-60 rounded-full bg-accent-100 opacity-60 mix-blend-multiply"></div>
      </div>
      
      <div 
        ref={heroRef} 
        className="container mx-auto px-4 md:px-6 relative z-10 reveal-animation"
      >
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight text-gray-900">
            Potencialize seus Projetos com Equipes de <span className="text-primary-500">Desenvolvimento</span> Exclusivas
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-700">
            Soluções personalizadas de outsourcing para impulsionar sua transformação digital.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
            <Button 
              size="lg" 
              className="bg-primary-500 hover:bg-primary-600 text-white px-8 py-6 text-lg shadow-md hover:shadow-lg button-transition"
              asChild
            >
              <a href="#contato">
                Solicite uma Proposta
              </a>
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              className="border-primary-500 text-primary-500 hover:bg-primary-50 px-8 py-6 text-lg button-transition"
              asChild
            >
              <a href="#como-funciona">
                Como Funciona
              </a>
            </Button>
          </div>
          
          <div className="pt-12 animate-bounce">
            <a 
              href="#serviços" 
              className="inline-flex items-center justify-center text-primary-500 hover:text-primary-600"
              aria-label="Saiba mais"
            >
              <ArrowDownCircle className="h-10 w-10" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
