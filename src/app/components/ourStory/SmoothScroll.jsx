'use client';
import { useEffect } from 'react';
import { useTheme } from './ThemeContext';

export default function SmoothScroll() {
  const { colors } = useTheme();
  
  useEffect(() => {
    // Function to handle smooth scrolling between sections
    const handleSmoothScroll = () => {
      const sections = document.querySelectorAll('section[data-section]');
      
      // Add intersection observer to each section
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            // Add active class when section is in view
            if (entry.isIntersecting) {
              entry.target.classList.add('section-active');
              
              // Add a subtle animation to elements within the section
              const animatableElements = entry.target.querySelectorAll('.motion-safe');
              animatableElements.forEach((el, index) => {
                el.style.transitionDelay = `${index * 0.1}s`;
                el.classList.add('animate-in');
              });
            } else {
              entry.target.classList.remove('section-active');
            }
          });
        },
        { threshold: 0.2 } // Trigger when 20% of the section is visible
      );
      
      sections.forEach((section) => {
        // Add styles to each section
        section.style.transition = 'transform 0.5s ease-out, opacity 0.5s ease-out';
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        
        // Add the section-active class styles
        const style = document.createElement('style');
        style.innerHTML = `
          .section-active {
            opacity: 1 !important;
            transform: translateY(0) !important;
          }
          
          .motion-safe {
            opacity: 0;
            transform: translateY(15px);
            transition: opacity 0.5s ease-out, transform 0.5s ease-out;
          }
          
          .animate-in {
            opacity: 1;
            transform: translateY(0);
          }
        `;
        document.head.appendChild(style);
        
        // Observe the section
        observer.observe(section);
      });
      
      // Handle anchor link clicks for smooth scrolling
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
          e.preventDefault();
          
          const targetId = this.getAttribute('href').substring(1);
          const targetElement = document.querySelector(`section[data-section="${targetId}"]`);
          
          if (targetElement) {
            window.scrollTo({
              top: targetElement.offsetTop - 100,
              behavior: 'smooth'
            });
          }
        });
      });
    };
    
    // Initialize smooth scrolling
    handleSmoothScroll();
    
    // Cleanup
    return () => {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.removeEventListener('click', () => {});
      });
    };
  }, [colors]);
  
  return null;
}
