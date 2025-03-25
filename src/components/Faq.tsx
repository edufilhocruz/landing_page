
import { useEffect, useRef } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Como funciona o processo de outsourcing de desenvolvimento?",
    answer: "Nosso processo começa com uma análise detalhada das suas necessidades. Em seguida, montamos uma equipe dedicada com as habilidades específicas para seu projeto. Implementamos metodologias ágeis para garantir entregas contínuas e você tem total visibilidade sobre o progresso através de ferramentas colaborativas."
  },
  {
    question: "Quais tecnologias vocês trabalham?",
    answer: "Trabalhamos com uma ampla gama de tecnologias modernas, incluindo React, Angular, Vue.js, Node.js, Python, Java, .NET, PHP, AWS, Azure, Google Cloud, entre outras. Nossos profissionais são constantemente treinados para se manterem atualizados com as mais recentes tendências e ferramentas."
  },
  {
    question: "Como garantem a qualidade do código desenvolvido?",
    answer: "Implementamos práticas rigorosas de qualidade, incluindo revisões de código, testes automatizados (unitários, integração e E2E), integração contínua e deploy contínuo (CI/CD). Além disso, seguimos padrões de codificação e utilizamos ferramentas de análise estática para manter a qualidade."
  },
  {
    question: "Quanto tempo leva para montar uma equipe dedicada?",
    answer: "Geralmente conseguimos montar uma equipe em 2 a 3 semanas, dependendo do tamanho e das habilidades específicas necessárias. Temos um amplo banco de talentos pré-qualificados que nos permite agilizar este processo."
  },
  {
    question: "É possível escalar a equipe conforme a necessidade do projeto?",
    answer: "Sim, a escalabilidade é um dos principais benefícios do nosso modelo de outsourcing. Podemos aumentar ou reduzir o tamanho da equipe rapidamente conforme as demandas do seu projeto mudam, sem os longos processos de recrutamento ou custos de demissão."
  },
  {
    question: "Como é feita a comunicação com a equipe terceirizada?",
    answer: "Utilizamos ferramentas modernas de comunicação e gerenciamento de projetos como Slack, Microsoft Teams, Jira, entre outras. Realizamos reuniões diárias de stand-up, reuniões semanais de acompanhamento e definimos pontos de contato claros para garantir uma comunicação eficiente."
  }
];

const Faq = () => {
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
    <section id="faq" className="section-padding bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div 
          ref={sectionRef} 
          className="text-center max-w-3xl mx-auto mb-16 reveal-animation"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Perguntas Frequentes
          </h2>
          <p className="text-lg text-gray-700">
            Encontre respostas para as dúvidas mais comuns sobre nossos serviços de outsourcing.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto reveal-animation">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-b border-gray-200">
                <AccordionTrigger className="text-left py-6 text-lg font-medium hover:text-primary-500 transition-colors">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default Faq;
