
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
import { ArrowRight } from "lucide-react";
import DOMPurify from "dompurify";

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
  
  // Token for CSRF protection
  const [csrfToken, setCsrfToken] = useState('');
  
  useEffect(() => {
    // Generate a simple CSRF token when component mounts
    // In a production app, this should come from the server
    const token = Math.random().toString(36).substring(2, 15);
    setCsrfToken(token);
    localStorage.setItem('csrfToken', token);
    
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
  
  // Client-side form validation
  const validateForm = () => {
    const errors = [];
    
    if (!formData.name.trim()) errors.push('Nome é obrigatório');
    if (!formData.email.trim()) errors.push('Email é obrigatório');
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      errors.push('Email inválido');
    }
    
    if (errors.length > 0) {
      toast({
        title: "Erro de validação",
        description: errors.join('. '),
        variant: "destructive",
      });
      return false;
    }
    
    return true;
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    // Sanitize input before storing it
    const sanitizedValue = DOMPurify.sanitize(value);
    setFormData(prev => ({ ...prev, [name]: sanitizedValue }));
  };
  
  const handleSelectChange = (value: string) => {
    // Sanitize select input
    const sanitizedValue = DOMPurify.sanitize(value);
    setFormData(prev => ({ ...prev, projectType: sanitizedValue }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form before submission
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      console.log('Form data to be sent:', formData);
      
      const response = await fetch('http://localhost:3001/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': csrfToken, // Add CSRF token to header
        },
        body: JSON.stringify(formData),
        credentials: 'same-origin' // Include cookies for additional security
      });
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      
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
            
            <div className="glass-card rounded-xl p-8">
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                {/* Hidden CSRF token field */}
                <input type="hidden" name="_csrf" value={csrfToken} />
                
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
                      maxLength={100} // Limit input length
                      autoComplete="name" // Improve autofill security
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
                      maxLength={100}
                      autoComplete="email"
                      pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" // HTML5 validation
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
                      maxLength={20}
                      autoComplete="tel"
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
                      maxLength={100}
                      autoComplete="organization"
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
                    maxLength={1000} // Limit textarea length
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
