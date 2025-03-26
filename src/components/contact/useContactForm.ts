
import { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import DOMPurify from "dompurify";

interface FormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  projectType: string;
  message: string;
}

export const useContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const [formData, setFormData] = useState<FormData>({
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
  
  return {
    formData,
    csrfToken,
    isSubmitting,
    handleChange,
    handleSelectChange,
    handleSubmit
  };
};
