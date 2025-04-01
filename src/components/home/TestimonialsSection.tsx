
import { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

// Sample testimonials data
const testimonials = [
  {
    id: '1',
    content: 'Echoed Thoughts has transformed how I share my ideas. The multimedia capabilities let me express concepts in ways that text alone never could.',
    author: 'David Chen',
    role: 'Tech Writer',
    image: '/placeholder.svg'
  },
  {
    id: '2',
    content: 'I\'ve found a community of thinkers who challenge and inspire me. The discussions around my posts have completely transformed my perspective.',
    author: 'Sarah Johnson',
    role: 'Philosophy Podcaster',
    image: '/placeholder.svg'
  },
  {
    id: '3',
    content: 'The analytics tools have helped me understand what resonates with my audience, allowing me to grow my following consistently month over month.',
    author: 'Michael Rodriguez',
    role: 'Content Creator',
    image: '/placeholder.svg'
  }
];

const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  
  const handlePrev = () => {
    setActiveIndex(prev => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };
  
  const handleNext = () => {
    setActiveIndex(prev => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };
  
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-black/50 to-black/80">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6 text-white animate-float-up opacity-0" style={{ animationDelay: '0.3s' }}>
            What Our Community Says
          </h2>
          <p className="text-lg text-white/80 max-w-3xl mx-auto animate-float-up opacity-0" style={{ animationDelay: '0.4s' }}>
            Join thousands of writers and readers who have found their home on Echoed Thoughts
          </p>
        </div>
        
        <div className="relative max-w-4xl mx-auto animate-float-up opacity-0" style={{ animationDelay: '0.5s' }}>
          <div 
            ref={testimonialsRef}
            className="glass-card p-10 md:p-16 text-center relative"
          >
            <div className="absolute top-10 left-1/2 transform -translate-x-1/2 text-white/20">
              <Quote className="h-24 w-24" />
            </div>
            
            {testimonials.map((testimonial, index) => (
              <div 
                key={testimonial.id}
                className={`testimonial transition-opacity duration-500 ${
                  index === activeIndex ? 'opacity-100' : 'opacity-0 absolute inset-0'
                }`}
              >
                <blockquote className="text-xl md:text-2xl font-serif text-white mb-8 relative z-10">
                  "{testimonial.content}"
                </blockquote>
                
                <div className="flex items-center justify-center">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.author}
                    className="h-12 w-12 rounded-full bg-white/10 mr-4"
                  />
                  <div className="text-left">
                    <div className="font-medium text-white">
                      {testimonial.author}
                    </div>
                    <div className="text-sm text-white/60">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-1/2">
            <button 
              onClick={handlePrev}
              className="h-12 w-12 rounded-full bg-white/10 text-white hover:bg-white/20 flex items-center justify-center transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
          </div>
          
          <div className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-1/2">
            <button 
              onClick={handleNext}
              className="h-12 w-12 rounded-full bg-white/10 text-white hover:bg-white/20 flex items-center justify-center transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
