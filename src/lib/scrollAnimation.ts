
export const setupScrollAnimation = () => {
  // Only run in browser environment
  if (typeof window === 'undefined') return;
  
  const animationElements = document.querySelectorAll('.reveal-animation');
  
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
      rootMargin: "0px 0px -50px 0px"
    }
  );
  
  animationElements.forEach((el) => observer.observe(el));
  
  return () => {
    animationElements.forEach((el) => observer.unobserve(el));
  };
};

// Function to handle smooth scrolling for anchor links
export const setupSmoothScroll = () => {
  // Only run in browser environment
  if (typeof window === 'undefined') return;
  
  const links = document.querySelectorAll('a[href^="#"]');
  
  links.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const href = this.getAttribute('href') as string;
      if (href === '#') return;
      
      const targetElement = document.querySelector(href);
      if (!targetElement) return;
      
      window.scrollTo({
        top: targetElement.getBoundingClientRect().top + window.scrollY - 80, // Adjusting for navbar height
        behavior: 'smooth'
      });
    });
  });
};
