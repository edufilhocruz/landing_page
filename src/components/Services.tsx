
import { useEffect, useRef } from 'react';
import { 
  Code, 
  Smartphone, 
  Server, 
  Database, 
  Cloud, 
  ShieldCheck 
} from 'lucide-react';

const services = [
  {
    icon: <Code className="h-8 w-8 text-primary-500" />,
    title: "Desenvolvimento Full Stack",
    description: "Equipes completas com experiência em front-end e back-end para desenvolver aplicações robustas e escaláveis."
  },
  {
    icon: <Smartphone className="h-8 w-8 text-primary-500" />,
    title: "Desenvolvimento Mobile",
    description: "Criação de aplicativos nativos e híbridos para iOS e Android com interfaces intuitivas e alta performance."
  },
  {
    icon: <Server className="h-8 w-8 text-primary-500" />,
    title: "Arquitetura de Software",
    description: "Planejamento e implementação de arquiteturas escaláveis que suportam o crescimento do seu negócio."
  },
  {
    icon: <Database className="h-8 w-8 text-primary-500" />,
    title: "Soluções de Dados",
    description: "Implementação de sistemas de gerenciamento de dados, incluindo Big Data e análise avançada."
  },
  {
    icon: <Cloud className="h-8 w-8 text-primary-500" />,
    title: "Cloud Computing",
    description: "Migração e gerenciamento de aplicações na nuvem para maior flexibilidade e redução de custos."
  },
  {
    icon: <ShieldCheck className="h-8 w-8 text-primary-500" />,
    title: "DevSecOps",
    description: "Integração de segurança em todo o ciclo de desenvolvimento para proteção contínua dos seus sistemas."
  }
];

const Services = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  
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
        rootMargin: "0px 0px -100px 0px"
      }
    );
    
    // Observe section heading
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    // Observe each service card
    itemRefs.current.forEach((item) => {
      if (item) observer.observe(item);
    });
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
      
      itemRefs.current.forEach((item) => {
        if (item) observer.unobserve(item);
      });
    };
  }, []);

  return (
    <section id="serviços" className="section-padding bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div 
          ref={sectionRef} 
          className="text-center max-w-3xl mx-auto mb-16 reveal-animation"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Nossos Serviços de Desenvolvimento
          </h2>
          <p className="text-lg text-gray-700">
            Oferecemos uma gama completa de serviços de desenvolvimento de software 
            para atender às necessidades específicas do seu negócio.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              ref={(el) => (itemRefs.current[index] = el)}
              className="glass-card rounded-xl p-8 transition-transform hover:translate-y-[-5px] reveal-animation"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="bg-primary-50 rounded-lg p-3 w-fit mb-6">
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
