
import { useRef } from 'react';
import { Button } from "@/components/ui/button";
import ContactFormInput from './ContactFormInput';
import ContactFormSelect from './ContactFormSelect';
import ContactFormTextarea from './ContactFormTextarea';
import { useContactForm } from './useContactForm';

const projectTypeOptions = [
  { value: "web", label: "Desenvolvimento Web" },
  { value: "mobile", label: "Desenvolvimento Mobile" },
  { value: "fullstack", label: "Full Stack" },
  { value: "cloud", label: "Cloud & DevOps" },
  { value: "other", label: "Outro" },
];

const ContactFormContent = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const {
    formData,
    csrfToken,
    isSubmitting,
    handleChange,
    handleSelectChange,
    handleSubmit
  } = useContactForm();

  return (
    <div className="glass-card rounded-xl p-8">
      <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
        {/* Hidden CSRF token field */}
        <input type="hidden" name="_csrf" value={csrfToken} />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ContactFormInput
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Seu nome"
            required
            maxLength={100}
            autoComplete="name"
            label="Nome completo"
          />
          
          <ContactFormInput
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="seu@email.com"
            required
            maxLength={100}
            autoComplete="email"
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
            label="Email profissional"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ContactFormInput
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="(11) 98765-4321"
            maxLength={20}
            autoComplete="tel"
            label="Telefone"
          />
          
          <ContactFormInput
            id="company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            placeholder="Nome da sua empresa"
            maxLength={100}
            autoComplete="organization"
            label="Empresa"
          />
        </div>
        
        <ContactFormSelect
          value={formData.projectType}
          onValueChange={handleSelectChange}
          label="Tipo de projeto"
          options={projectTypeOptions}
        />
        
        <ContactFormTextarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Descreva brevemente suas necessidades e objetivos"
          maxLength={1000}
          label="Detalhes do projeto"
        />
        
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
  );
};

export default ContactFormContent;
