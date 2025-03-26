
import { ArrowRight } from "lucide-react";

const ContactFormHeader = () => {
  return (
    <div>
      <h2 className="text-3xl md:text-4xl font-bold mb-6">
        Vamos Impulsionar Seu Projeto?
      </h2>
      <div className="prose prose-lg max-w-none mb-8">
        <p className="text-gray-700">
          Transforme sua ideia em realidade com nossa equipe especializada. Receba um orçamento personalizado e comece a desenvolver seu projeto em tempo recorde.
        </p>
        <ul className="space-y-2 mt-6">
          <li className="flex items-start">
            <ArrowRight className="h-6 w-6 text-primary-500 mr-2 flex-shrink-0 mt-0.5" />
            <span>Resposta em até 24 horas úteis</span>
          </li>
          <li className="flex items-start">
            <ArrowRight className="h-6 w-6 text-primary-500 mr-2 flex-shrink-0 mt-0.5" />
            <span>Orçamento detalhado e sem compromisso</span>
          </li>
          <li className="flex items-start">
            <ArrowRight className="h-6 w-6 text-primary-500 mr-2 flex-shrink-0 mt-0.5" />
            <span>Planos flexíveis adaptados às suas necessidades</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ContactFormHeader;
