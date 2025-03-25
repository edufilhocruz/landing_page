
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const footerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      },
      {
        threshold: 0.1,
      }
    );
    
    if (footerRef.current) {
      observer.observe(footerRef.current);
    }
    
    return () => {
      if (footerRef.current) {
        observer.unobserve(footerRef.current);
      }
    };
  }, []);

  return (
    <footer 
      ref={footerRef} 
      className="bg-gray-900 text-white py-12 reveal-animation"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link to="/">
              <img 
                src="/lovable-uploads/7736affa-0cc0-4754-be47-b30bbc5752ea.png" 
                alt="Fexol Logo" 
                className="h-10 md:h-12 brightness-[2]" 
              />
            </Link>
            <p className="text-gray-300">
              Potencializando o desenvolvimento de software com equipes dedicadas e altamente qualificadas.
            </p>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Links Rápidos</h3>
            <ul className="space-y-2">
              {['Serviços', 'Como Funciona', 'Vantagens', 'FAQ', 'Contato'].map((item) => (
                <li key={item}>
                  <a 
                    href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                    className="text-gray-300 hover:text-primary-400 transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Serviços</h3>
            <ul className="space-y-2">
              {[
                'Desenvolvimento Full Stack', 
                'Desenvolvimento Mobile', 
                'Arquitetura de Software', 
                'Soluções de Dados', 
                'Cloud Computing'
              ].map((item) => (
                <li key={item}>
                  <a 
                    href="#serviços"
                    className="text-gray-300 hover:text-primary-400 transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Links Rápidos</h3>
            <ul className="space-y-2">
              {[
                'Sobre Nós',
                'Blog',
                'Carreiras',
                'Política de Privacidade',
                'Termos de Serviço'
              ].map((item) => (
                <li key={item}>
                  <a 
                    href="#"
                    className="text-gray-300 hover:text-primary-400 transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Fexol. Todos os direitos reservados.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
              Termos de Serviço
            </a>
            <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
              Política de Privacidade
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
