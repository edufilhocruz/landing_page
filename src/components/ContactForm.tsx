
import { useRef } from 'react';
import ContactFormHeader from './contact/ContactFormHeader';
import ContactFormContent from './contact/ContactFormContent';

const ContactForm = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  return (
    <section id="contato" className="section-padding bg-gray-50">
      <div 
        ref={sectionRef} 
        className="container mx-auto px-4 md:px-6 reveal-animation"
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <ContactFormHeader />
            <ContactFormContent />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
