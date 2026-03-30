import { useEffect, useState } from 'react';
import { ArrowRight, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const slides = [
  {
    src: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1920&q=80',
    alt: 'Cargo containers at a global shipping port',
  },
  {
    src: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1920&q=80',
    alt: 'Business team coordinating international trade operations',
  },
  {
    src: 'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1920&q=80',
    alt: 'Global network visualization over a world map',
  },
];

const HeroSection = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <header className="relative border-b border-slate-800 text-white overflow-hidden">
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <img
            key={slide.src}
            src={slide.src}
            alt={slide.alt}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
              activeSlide === index ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}
        <div className="absolute inset-0 bg-slate-950/65"></div>
      </div>

      <div className="relative z-10 py-24 md:py-32 px-6 md:px-10 text-center">
        <div className="max-w-6xl mx-auto">
          <Zap className="text-blue-400 mx-auto mb-4 animate-bounce" size={40} />
          <h1 className="text-4xl md:text-6xl font-black mb-6 uppercase tracking-tighter leading-tight">
            <span className="text-blue-400">Abdullah</span> Ventures <br /> Digital Trade Hub
          </h1>
          <p className="text-base md:text-xl text-slate-200 max-w-3xl mx-auto mb-10 italic font-light">
            Global Logistics and Sourcing Experts. Digitalizing the supply chain between South
            Korea, Philippines, and Bangladesh. Managed from Bangsar, Kuala Lumpur.
          </p>
          <Link
            to="/dashboard"
            className="inline-flex bg-blue-600 text-white px-8 md:px-10 py-4 rounded-lg font-bold text-base md:text-lg hover:scale-105 transition-all items-center gap-2 shadow-2xl"
          >
            Live Partner Portal <ArrowRight size={20} />
          </Link>

          <div className="mt-10 flex items-center justify-center gap-3">
            {slides.map((_, index) => (
              <button
                key={`slide-${index}`}
                type="button"
                aria-label={`Go to slide ${index + 1}`}
                onClick={() => setActiveSlide(index)}
                className={`h-2.5 rounded-full transition-all ${
                  activeSlide === index
                    ? 'w-10 bg-blue-400'
                    : 'w-2.5 bg-white/60 hover:bg-white/90'
                }`}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeroSection;
