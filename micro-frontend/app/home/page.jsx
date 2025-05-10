'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { MapPin, Phone } from 'lucide-react';

export default function RestaurantLanding() {
  const [activeSection, setActiveSection] = useState('about'); // Default to about section
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setIsNavOpen(false);
  };

  return (
    <div className="min-h-screen font-sans">
      {/* Navigation */}
      <header className={`
  fixed top-0 left-0 right-0 z-50
  transition-all duration-300
  ${isScrolled 
    ? 'bg-white/95 backdrop-blur-md py-3 shadow-sm' 
    : 'bg-transparent py-6'
  }
`}>
  <div className="container mx-auto px-5 flex justify-between items-center">
    {/* Logo with precise positioning */}
    <div className="flex items-center space-x-3 ml-5 md:ml-10">
      <img 
        src="/images/logo.png" 
        alt="Élysée Logo" 
        className={`h-9 w-9 object-contain rounded-full transition-all ${
          isScrolled ? 'border-amber-100' : 'border-white/30'
        } border`}
      />
      <span className={`text-2xl font-serif font-medium ${
        isScrolled ? 'text-amber-800' : 'text-white drop-shadow-md'
      }`}>
        Élysée
      </span>
    </div>

    {/* Navigation with pixel-perfect spacing */}
    <nav className="hidden md:flex items-center space-x-8 mr-6">
      <button
        onClick={() => scrollToSection('about')}
        className={`text-[17px] font-medium transition-colors ${
          isScrolled 
            ? 'text-gray-700 hover:text-amber-600' 
            : 'text-white/95 hover:text-white'
        }`}
      >
        About Us
      </button>
      <button
        onClick={() => scrollToSection('reservation')}
        className={`text-[17px] font-medium transition-colors ${
          isScrolled 
            ? 'text-gray-700 hover:text-amber-600' 
            : 'text-white/95 hover:text-white'
        }`}
      >
        Book a Table
      </button>
      <button 
        onClick={() => router.push('/login')}
        className={`px-4 py-1.5 ml-1 rounded-full text-[15px] font-medium transition-all ${
          isScrolled 
            ? 'bg-amber-600 text-white hover:bg-amber-700' 
            : 'bg-white text-amber-800 hover:bg-amber-50'
        }`}
      >
        Login
      </button>
    </nav>

    {/* Mobile menu button */}
    <button 
      className={`md:hidden p-2 mr-4 ${
        isScrolled ? 'text-gray-700' : 'text-white'
      }`}
      onClick={() => setIsNavOpen(!isNavOpen)}
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    </button>
  </div>
</header>

      {/* Hero Section */}
      <section id="home" className="h-screen flex items-center justify-center bg-gray-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/placeholder-food.jpg')] bg-cover bg-center opacity-50"></div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Experience Culinary Excellence</h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">Where tradition meets innovation in every dish</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button 
              onClick={() => scrollToSection('about')}
              className="bg-white text-gray-900 px-6 py-2 rounded-lg"
            >
              About Us
            </button>
            <button 
              onClick={() => scrollToSection('reservation')}
              className="border-2 border-white text-white px-6 py-2 rounded-lg"
            >
              Book a Table
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Our Story</h2>
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-lg mb-6">
              Founded in 2010, Élysée has been serving exquisite cuisine crafted from the finest local ingredients. 
              Our chef brings 20 years of international experience to create unforgettable dining experiences.
            </p>
            <p className="text-lg">
              We believe in sustainable sourcing, supporting local farmers, and creating dishes that tell a story 
              of passion and dedication to culinary arts.
            </p>
          </div>
        </div>
      </section>

      {/* Reservation Section */}
      <section id="reservation" className="py-16 bg-gray-100">
        <div className="container mx-auto px-4 max-w-2xl">
          <h2 className="text-3xl font-bold text-center mb-8">Book a Table</h2>
          <form className="space-y-4 bg-white p-6 rounded-lg shadow">
            <input type="text" placeholder="Full Name" className="w-full p-2 border rounded" />
            <input type="email" placeholder="Email" className="w-full p-2 border rounded" />
            <input type="tel" placeholder="Phone" className="w-full p-2 border rounded" />
            <div className="grid grid-cols-2 gap-4">
              <input type="date" className="p-2 border rounded" />
              <select className="p-2 border rounded">
                <option>17:00</option>
                <option>18:00</option>
                <option>19:00</option>
              </select>
            </div>
            <button type="submit" className="w-full bg-gray-900 text-white p-2 rounded">
              Reserve Now
            </button>
          </form>
        </div>
      </section>

      
      {/* Footer */}
<footer className="bg-gray-950 text-gray-300 py-12">
  <div className="container mx-auto px-4">
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {/* Restaurant Info */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <img src="/images/logo.png" alt="logo" className="h-8 w-8 object-contain rounded-full"/>
          <span className="text-2xl font-bold text-white">Élysée</span>
        </div>
        <p className="text-sm">Where culinary excellence meets unforgettable dining experiences.</p>
        <div className="flex space-x-4">
          <a href="#" className="hover:text-white transition">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
            </svg>
          </a>
          <a href="#" className="hover:text-white transition">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
            </svg>
          </a>
          <a href="#" className="hover:text-white transition">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
            </svg>
          </a>
        </div>
      </div>

      {/* Quick Links */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white">Quick Links</h3>
        <ul className="space-y-2">
          <li><a href="#" className="hover:text-white transition">Home</a></li>
          <li><a href="#about" className="hover:text-white transition">About Us</a></li>
          <li><a href="#reservation" className="hover:text-white transition">Reservations</a></li>
        </ul>
      </div>

      {/* Contact Info */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white">Contact Us</h3>
        <ul className="space-y-2">
          <li className="flex items-start">
            <MapPin className="flex-shrink-0 h-5 w-5 mt-0.5 mr-2" />
            <span>123 Restaurant St, Food City, FC 12345</span>
          </li>
          <li className="flex items-center">
            <Phone className="h-5 w-5 mr-2" />
            <span>(555) 123-4567</span>
          </li>
          <li className="flex items-center">
            <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span>contact@elysee-restaurant.com</span>
          </li>
        </ul>
      </div>

      {/* Hours */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white">Opening Hours</h3>
        <ul className="space-y-2">
          <li className="flex justify-between">
            <span>Monday - Thursday</span>
            <span>11:00 AM - 10:00 PM</span>
          </li>
          <li className="flex justify-between">
            <span>Friday - Saturday</span>
            <span>11:00 AM - 11:00 PM</span>
          </li>
          <li className="flex justify-between">
            <span>Sunday</span>
            <span>10:00 AM - 9:00 PM</span>
          </li>
        </ul>
      </div>
    </div>

    {/* Copyright */}
    <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
      <p>&copy; {new Date().getFullYear()} Élysée Restaurant. All rights reserved.</p>
      <div className="mt-2 flex justify-center space-x-4">
        <a href="#" className="hover:text-white transition">Privacy Policy</a>
        <a href="#" className="hover:text-white transition">Terms of Service</a>
      </div>
    </div>
  </div>
</footer>
</div>
  );
}