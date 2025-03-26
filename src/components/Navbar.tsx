
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Menu, X, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  // Change navbar style on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled 
          ? "bg-white/90 backdrop-blur-md shadow-sm py-3" 
          : "bg-transparent py-5"
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link to="/" className="relative z-50">
            <img 
              src="/lovable-uploads/7736affa-0cc0-4754-be47-b30bbc5752ea.png" 
              alt="Fexol Logo" 
              className="h-10 md:h-12" 
            />
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {["Serviços", "Como Funciona", "Vantagens", "FAQ", "Growth Sales"].map((item) => (
              <a 
                key={item}
                href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                className="text-sm font-medium transition-colors hover:text-primary-500"
              >
                {item}
              </a>
            ))}
            <Button 
              asChild
              className="bg-primary-500 hover:bg-primary-600 button-transition"
            >
              <a href="#contato">
                Entre em Contato
                <ChevronRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </nav>
          
          {/* Mobile Menu Button */}
          <button
            className="md:hidden relative z-50"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
          >
            {isOpen ? (
              <X className="h-6 w-6 text-foreground" />
            ) : (
              <Menu className="h-6 w-6 text-foreground" />
            )}
          </button>
          
          {/* Mobile Navigation */}
          {isOpen && (
            <div className="fixed inset-0 bg-white z-40 md:hidden animate-fade-in">
              <div className="flex flex-col items-center justify-center h-full space-y-8">
                {["Serviços", "Como Funciona", "Vantagens", "FAQ", "Growth Sales"].map((item, i) => (
                  <a 
                    key={item}
                    href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                    className="text-lg font-medium transition-colors hover:text-primary-500"
                    onClick={() => setIsOpen(false)}
                    style={{ animationDelay: `${i * 100}ms` }}
                  >
                    {item}
                  </a>
                ))}
                <Button 
                  asChild
                  className="bg-primary-500 hover:bg-primary-600 button-transition mt-4"
                  style={{ animationDelay: '400ms' }}
                  onClick={() => setIsOpen(false)}
                >
                  <a href="#contato">
                    Entre em Contato
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
