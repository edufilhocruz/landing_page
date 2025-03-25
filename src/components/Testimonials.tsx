
import { useEffect, useRef } from 'react';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselPrevious, 
  CarouselNext 
} from '@/components/ui/carousel';
import { Star } from 'lucide-react';

const testimonials = [
  {
    quote: "A parceria com a Fexol transformou completamente o ritmo de desenvolvimento do nosso produto. Conseguimos lançar novas funcionalidades muito mais rapidamente.",
    author: "Roberto Silva",
    role: "CTO, TechVentures",
    rating: 5
  },
  {
    quote: "As equipes da Fexol se integraram perfeitamente ao nosso time interno. A comunicação é excelente e a qualidade do código entregue supera nossas expectativas.",
    author: "Carla Mendes",
    role: "Diretora de Produto, InnovateBR",
    rating: 5
  },
  {
    quote: "Conseguimos reduzir os custos de desenvolvimento em 30% e ainda melhoramos a qualidade do produto final. A decisão de contratar a Fexol foi um divisor de águas para nós.",
    author: "Marcelo Alves",
    role: "CEO, StartupMasters",
    rating: 5
  },
  {
    quote: "O conhecimento técnico das equipes da Fexol nos permitiu implementar tecnologias avançadas que não tínhamos capacidade interna para desenvolver.",
    author: "Amanda Souza",
    role: "Head de Tecnologia, DataSolutions",
    rating: 5
  }
];

const Testimonials = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
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
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);
  
  return (
    <section className="section-padding bg-primary-50">
      <div className="container mx-auto px-4 md:px-6">
        <div 
          ref={sectionRef} 
          className="text-center max-w-3xl mx-auto mb-16 reveal-animation"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            O Que Nossos Clientes Dizem
          </h2>
          <p className="text-lg text-gray-700">
            Conheça as experiências de empresas que transformaram seus processos 
            de desenvolvimento com nossas soluções de outsourcing.
          </p>
        </div>
        
        <Carousel
          className="w-full max-w-5xl mx-auto reveal-animation"
          opts={{
            align: "start",
            loop: true,
          }}
        >
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/2 pl-4">
                <div className="glass-card rounded-xl p-8 h-full flex flex-col">
                  <div className="flex mb-4">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <blockquote className="text-gray-700 flex-grow italic mb-6">
                    "{testimonial.quote}"
                  </blockquote>
                  <div>
                    <p className="font-semibold">{testimonial.author}</p>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-center mt-8 gap-2">
            <CarouselPrevious className="relative static transform-none rounded-full bg-primary-500 text-white hover:bg-primary-600" />
            <CarouselNext className="relative static transform-none rounded-full bg-primary-500 text-white hover:bg-primary-600" />
          </div>
        </Carousel>
      </div>
    </section>
  );
};

export default Testimonials;
