import { useState, useEffect, useRef } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    projectType: '',
    message: ''
  });
  
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
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (value: string) => {
    setFormData(prev => ({ ...prev, projectType: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      console.log('Form data to be sent:', formData);
      
      const response = await fetch('http://localhost:3001/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (data.success) {
        toast({
          title: "Formulário enviado com sucesso!",
          description: "Entraremos em contato em breve.",
          variant: "default",
        });
        
        if (formRef.current) {
          formRef.current.reset();
        }
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          projectType: '',
          message: ''
        });
      } else {
        throw new Error(data.message || 'Erro ao enviar formulário');
      }
    } catch (error) {
      toast({
        title: "Erro ao enviar formulário",
        description: "Por favor, tente novamente mais tarde.",
        variant: "destructive",
      });
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <section id="contato" className="section-padding bg-gray-50">
      <div 
        ref={sectionRef} 
        className="container mx-auto px-4 md:px-6 reveal-animation"
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Vamos Impulsionar Seu Projeto?
              </h2>
              <p className="text-lg text-gray-700 mb-8">
                Preencha o formulário para receber uma proposta personalizada para 
                suas necessidades de desenvolvimento. Nossa equipe entrará em contato 
                dentro de 24 horas úteis.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-primary-100 rounded-full p-3 mr-4">
                    <svg className="h-6 w-6 text-primary-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20 10.9696L11.9628 18.5497C10.9782 19.4783 9.64274 20 8.25028 20C6.85782 20 5.52239 19.4783 4.53777 18.5497C3.55315 17.6211 3 16.3616 3 15.0483C3 13.7351 3.55315 12.4756 4.53777 11.547L12.575 3.96687C13.2312 3.34687 14.1188 3 15.05 3C15.9813 3 16.8688 3.34687 17.525 3.96687C18.1812 4.58687 18.55 5.4235 18.55 6.29175C18.55 7.16 18.1812 8.00075 17.525 8.61687L9.47527 16.1866C9.14715 16.4966 8.70333 16.67 8.24265 16.67C7.78197 16.67 7.33815 16.4966 7.01003 16.1866C6.68191 15.8766 6.4975 15.4593 6.4975 15.0267C6.4975 14.594 6.68191 14.1767 7.01003 13.8667L14.4375 6.85013" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">Email</h3>
                    <p className="text-gray-600">eduardocruz@fexol.com.br</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-primary-100 rounded-full p-3 mr-4">
                    <svg className="h-6 w-6 text-primary-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20 10.999H4C2.89543 10.999 2 11.8945 2 12.999V19.999C2 21.1036 2.89543 21.999 4 21.999H20C21.1046 21.999 22 21.1036 22 19.999V12.999C22 11.8945 21.1046 10.999 20 10.999Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M7 11V7C7 5.67392 7.52678 4.40215 8.46447 3.46447C9.40215 2.52678 10.6739 2 12 2C13.3261 2 14.5979 2.52678 15.5355 3.46447C16.4732 4.40215 17 5.67392 17 7V11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">Site</h3>
                    <p className="text-gray-600">fexol.com.br</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-primary-100 rounded-full p-3 mr-4">
                    <svg className="h-6 w-6 text-primary-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22 16.9201V19.9201C22.0011 20.1986 21.9441 20.4743 21.8325 20.7294C21.7209 20.9846 21.5573 21.2137 21.3521 21.402C21.1468 21.5902 20.9046 21.7336 20.6407 21.8228C20.3769 21.912 20.0974 21.9452 19.82 21.9201C16.7428 21.5857 13.787 20.5342 11.19 18.8501C8.77382 17.3148 6.72533 15.2663 5.18999 12.8501C3.49997 10.2413 2.44824 7.27097 2.11999 4.1801C2.095 3.90356 2.12787 3.62486 2.21649 3.36172C2.30512 3.09859 2.44756 2.85679 2.63476 2.65172C2.82196 2.44665 3.0498 2.28281 3.30379 2.17062C3.55777 2.05843 3.83233 2.00036 4.10999 2.0001H7.10999C7.5953 1.99532 8.06579 2.16718 8.43376 2.48363C8.80173 2.80008 9.04207 3.23954 9.10999 3.7201C9.23662 4.68016 9.47144 5.62282 9.80999 6.5301C9.94454 6.88802 9.9736 7.27701 9.89384 7.65098C9.81408 8.02494 9.6288 8.36821 9.35999 8.6401L8.08999 9.9101C9.51355 12.4136 11.5864 14.4865 14.09 15.9101L15.36 14.6401C15.6319 14.3712 15.9751 14.1859 16.3491 14.1062C16.7231 14.0264 17.1121 14.0555 17.47 14.1901C18.3773 14.5286 19.3199 14.7634 20.28 14.8901C20.7658 14.9586 21.2094 15.2033 21.5265 15.5776C21.8437 15.9519 22.0126 16.4297 22 16.9201Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">Horário de Atendimento</h3>
                    <p className="text-gray-600">Segunda a Sexta, 9h às 18h</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="glass-card rounded-xl p-8">
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      Nome completo
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Seu nome"
                      required
                      className="w-full"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email profissional
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="seu@email.com"
                      required
                      className="w-full"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-medium">
                      Telefone
                    </label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="(11) 98765-4321"
                      className="w-full"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="company" className="text-sm font-medium">
                      Empresa
                    </label>
                    <Input
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Nome da sua empresa"
                      className="w-full"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="projectType" className="text-sm font-medium">
                    Tipo de projeto
                  </label>
                  <Select onValueChange={handleSelectChange} value={formData.projectType}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecione o tipo de projeto" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="web">Desenvolvimento Web</SelectItem>
                      <SelectItem value="mobile">Desenvolvimento Mobile</SelectItem>
                      <SelectItem value="fullstack">Full Stack</SelectItem>
                      <SelectItem value="cloud">Cloud & DevOps</SelectItem>
                      <SelectItem value="other">Outro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    Detalhes do projeto
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Descreva brevemente suas necessidades e objetivos"
                    rows={4}
                    className="w-full"
                  />
                </div>
                
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-primary-500 hover:bg-primary-600 text-white py-6 text-base shadow-md hover:shadow-lg button-transition"
                >
                  {isSubmitting ? "Enviando..." : "Solicitar Proposta"}
                </Button>
                
                <p className="text-xs text-gray-500 text-center">
                  Ao enviar este formulário, você concorda com nossa política de privacidade 
                  e termos de uso.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
