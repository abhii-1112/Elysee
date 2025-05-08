
'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { MapPin, Phone } from 'lucide-react';

export default function RestaurantLanding() {
  const [activeSection, setActiveSection] = useState('home');
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
      <header className={`fixed w-full z-50 transition-all ${isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}`}>
  <div className="container mx-auto px-4 flex justify-between items-center flex-wrap max-w-screen-xl">
    <span className={`text-2xl font-bold ${isScrolled ? 'text-gray-900' : 'text-white'}`}>Élysée</span>

    <div className="hidden md:flex items-center space-x-6 ml-auto">
      {['home', 'menu', 'reservation'].map((item) => (
        <button
          key={item}
          onClick={() => scrollToSection(item)}
          className={`capitalize ${activeSection === item ? 'font-medium' : ''} ${isScrolled ? 'text-gray-900' : 'text-white'}`}
        >
          {item}
        </button>
      ))}
      <button 
        onClick={() => router.push('/login')}
        className={`px-4 py-2 rounded-lg ${isScrolled ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}
      >
        Login / Register
      </button>
    </div>

    <div className="md:hidden flex items-center ml-auto">
      <button 
        onClick={() => router.push('/login')}
        className="bg-white text-gray-900 px-4 py-2 rounded-lg mr-2"
      >
        Login / Register
      </button>
      <button 
        onClick={() => setIsNavOpen(!isNavOpen)}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${isScrolled ? 'text-gray-900' : 'text-white'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </div>
  </div>
</header>


      {/* Mobile Navigation */}
      {isNavOpen && (
        <div className="fixed inset-0 bg-gray-900 z-40 pt-16">
          <div className="flex flex-col items-center space-y-6 p-6">
            {['home', 'menu', 'reservation'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className="text-white text-xl capitalize"
              >
                {item}
              </button>
            ))}
            <button 
              onClick={() => {
                router.push('/login');
                setIsNavOpen(false);
              }}
              className="bg-white text-gray-900 px-6 py-2 rounded-lg"
            >
              Login / Register
            </button>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section id="home" className="h-screen flex items-center justify-center bg-gray-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/placeholder-food.jpg')] bg-cover bg-center opacity-50"></div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Experience Culinary Excellence</h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">Where tradition meets innovation in every dish</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button 
              onClick={() => scrollToSection('menu')}
              className="bg-white text-gray-900 px-6 py-2 rounded-lg"
            >
              View Menu
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

      {/* Menu Section */}
      <section id="menu" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Our Signature Dishes</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[{ name: "Truffle Risotto", price: "$28" }, { name: "Chilean Sea Bass", price: "$42" }, { name: "Wagyu Beef", price: "$65" }].map((dish, index) => (
              <div key={index} className="border rounded-lg p-4">
                <h3 className="text-xl font-semibold">{dish.name}</h3>
                <p className="text-gray-600">{dish.price}</p>
              </div>
            ))}
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

      {/* Contact Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Contact Us</h2>
          <div className="max-w-md mx-auto space-y-4">
            <div className="flex items-center">
              <MapPin className="mr-2" />
              <span>123 Restaurant St, Food City</span>
            </div>
            <div className="flex items-center">
              <Phone className="mr-2" />
              <span>(555) 123-4567</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-950 text-gray-400 py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; {new Date().getFullYear()} Élysée Restaurant</p>
        </div>
      </footer>
    </div>
  );
}
