// 'use client'
// import { useState, useEffect, useRef } from 'react';
// import { ArrowRight, Clock, MapPin, Phone, Instagram, Facebook, Twitter, ChevronDown } from 'lucide-react';

// export default function RestaurantLanding() {
//   const [activeSection, setActiveSection] = useState('home');
//   const [isNavOpen, setIsNavOpen] = useState(false);
//   const [isScrolled, setIsScrolled] = useState(false);
//   const parallaxRef = useRef(null);
  
//   // Handle scroll effects
//   useEffect(() => {
//     const handleScroll = () => {
//       const scrollPosition = window.scrollY;
//       setIsScrolled(scrollPosition > 50);
      
//       // Basic parallax effect for hero section
//       if (parallaxRef.current) {
//         parallaxRef.current.style.transform = `translateY(${scrollPosition * 0.4}px)`;
//       }
      
//       // Determine active section based on scroll position
//       const sections = ['home', 'about', 'specialties', 'reservation', 'contact'];
//       for (const section of sections.reverse()) {
//         const element = document.getElementById(section);
//         if (element && window.scrollY >= element.offsetTop - 200) {
//           setActiveSection(section);
//           break;
//         }
//       }
//     };
    
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);
  
//   // Simulate page load effect
//   const [isLoaded, setIsLoaded] = useState(false);
//   useEffect(() => {
//     setIsLoaded(true);
//   }, []);
  
//   // Reservation form state
//   const [reservation, setReservation] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     date: '',
//     time: '',
//     guests: '2'
//   });
  
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setReservation(prev => ({ ...prev, [name]: value }));
//   };
  
//   const handleReservationSubmit = (e) => {
//     e.preventDefault();
//     // In a real application, this would send the reservation data to a server
//     alert('Reservation submitted! We will contact you shortly to confirm.');
//     setReservation({
//       name: '',
//       email: '',
//       phone: '',
//       date: '',
//       time: '',
//       guests: '2'
//     });
//   };
  
//   // Scroll to section
//   const scrollToSection = (sectionId) => {
//     const section = document.getElementById(sectionId);
//     if (section) {
//       window.scrollTo({
//         top: section.offsetTop - 100,
//         behavior: 'smooth'
//       });
//     }
//     setIsNavOpen(false);
//   };
  
//   // Gallery images
//   const galleryImages = [
//     '/api/placeholder/600/600',
//     '/api/placeholder/600/600',
//     '/api/placeholder/600/600',
//     '/api/placeholder/600/600',
//     '/api/placeholder/600/600',
//     '/api/placeholder/600/600'
//   ];
  
//   return (
//     <div className={`min-h-screen font-sans ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-1000`}>
//       {/* Navigation */}
//       <header className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-6'}`}>
//         <div className="container mx-auto px-6">
//           <div className="flex justify-between items-center">
//             <div className="flex items-center">
//               <span className={`text-2xl font-bold ${isScrolled ? 'text-gray-900' : 'text-white'}`}>Élysée</span>
//             </div>
            
//             {/* Desktop Navigation */}
//             <nav className="hidden md:flex items-center space-x-8">
//               {['home', 'about', 'specialties', 'reservation', 'contact'].map((item) => (
//                 <button
//                   key={item}
//                   onClick={() => scrollToSection(item)}
//                   className={`${activeSection === item 
//                     ? (isScrolled ? 'text-gray-900 font-medium' : 'text-white font-medium') 
//                     : (isScrolled ? 'text-gray-600' : 'text-gray-200')
//                   } hover:text-gray-900 transition-colors capitalize`}
//                 >
//                   {item}
//                 </button>
//               ))}
//               <button 
//                 onClick={() => scrollToSection('reservation')}
//                 className={`${isScrolled 
//                   ? 'bg-gray-900 text-white' 
//                   : 'bg-white text-gray-900'} 
//                   px-6 py-2 rounded-lg hover:bg-opacity-90 transition-all`}
//               >
//                 Book a Table
//               </button>
//             </nav>
            
//             {/* Mobile menu button */}
//             <button 
//               className="md:hidden"
//               onClick={() => setIsNavOpen(!isNavOpen)}
//             >
//               <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${isScrolled ? 'text-gray-900' : 'text-white'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
//               </svg>
//             </button>
//           </div>
//         </div>
//       </header>
      
//       {/* Mobile Navigation */}
//       <div className={`fixed inset-0 bg-gray-900 bg-opacity-95 z-40 transform transition-transform duration-300 ${isNavOpen ? 'translate-x-0' : 'translate-x-full'}`}>
//         <div className="flex justify-end p-6">
//           <button onClick={() => setIsNavOpen(false)}>
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//             </svg>
//           </button>
//         </div>
//         <div className="flex flex-col items-center justify-center h-full">
//           {['home', 'about', 'specialties', 'reservation', 'contact'].map((item) => (
//             <button
//               key={item}
//               onClick={() => scrollToSection(item)}
//               className="text-white text-2xl my-4 hover:text-gray-300 transition-colors capitalize"
//             >
//               {item}
//             </button>
//           ))}
//           <button 
//             onClick={() => {
//               scrollToSection('reservation');
//               setIsNavOpen(false);
//             }}
//             className="mt-8 bg-white text-gray-900 px-8 py-3 rounded-lg hover:bg-opacity-90 transition-all"
//           >
//             Book a Table
//           </button>
//         </div>
//       </div>
      
//       {/* Hero Section */}
//       <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
//         <div 
//           ref={parallaxRef} 
//           className="absolute inset-0 z-0"
//           style={{
//             backgroundImage: `url('/api/placeholder/1920/1080')`,
//             backgroundSize: 'cover',
//             backgroundPosition: 'center',
//             filter: 'brightness(0.5)'
//           }}
//         />
        
//         <div className="relative z-10 text-center text-white px-6">
//           <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
//             Experience Culinary <br />
//             <span className="text-yellow-400">Excellence</span>
//           </h1>
//           <p className="text-xl md:text-2xl font-light mb-10 max-w-2xl mx-auto">
//             Where tradition meets innovation in every carefully crafted dish
//           </p>
//           <div className="flex flex-col sm:flex-row justify-center gap-4">
//             <button 
//               onClick={() => scrollToSection('specialties')}
//               className="bg-white text-gray-900 px-8 py-3 rounded-lg hover:bg-opacity-90 transition-all flex items-center justify-center"
//             >
//               View Our Menu
//               <ArrowRight size={16} className="ml-2" />
//             </button>
//             <button 
//               onClick={() => scrollToSection('reservation')}
//               className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg hover:bg-white hover:bg-opacity-10 transition-all"
//             >
//               Book a Table
//             </button>
//           </div>
//         </div>
        
//         <div className="absolute bottom-10 left-0 right-0 flex justify-center">
//           <button 
//             onClick={() => scrollToSection('about')}
//             className="animate-bounce p-2 bg-white bg-opacity-20 rounded-full"
//           >
//             <ChevronDown size={24} className="text-white" />
//           </button>
//         </div>
//       </section>
      
//       {/* About Section */}
//       <section id="about" className="py-24 bg-white">
//         <div className="container mx-auto px-6">
//           <div className="grid md:grid-cols-2 gap-12 items-center">
//             <div>
//               <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Story</h2>
//               <p className="text-gray-600 mb-6 leading-relaxed">
//                 Founded in 2010, Élysée has established itself as a bastion of culinary excellence in the heart of the city. 
//                 Our philosophy is simple: use the finest seasonal ingredients, prepare them with respect, and serve them with passion.
//               </p>
//               <p className="text-gray-600 mb-8 leading-relaxed">
//                 Chef Jean-Pierre Dubois, with his decades of experience in Michelin-starred kitchens across Europe, leads 
//                 our team of talented chefs in creating dishes that celebrate both tradition and innovation. Each plate 
//                 tells a story of cultural heritage, technical precision, and artistic expression.
//               </p>
//               <div className="grid grid-cols-3 gap-6 mb-8">
//                 <div className="text-center">
//                   <div className="text-3xl font-bold text-gray-900">15</div>
//                   <div className="text-sm text-gray-500">Years of Excellence</div>
//                 </div>
//                 <div className="text-center">
//                   <div className="text-3xl font-bold text-gray-900">3</div>
//                   <div className="text-sm text-gray-500">Michelin Stars</div>
//                 </div>
//                 <div className="text-center">
//                   <div className="text-3xl font-bold text-gray-900">25K+</div>
//                   <div className="text-sm text-gray-500">Happy Customers</div>
//                 </div>
//               </div>
//             </div>
//             <div className="grid grid-cols-2 gap-4 h-full">
//               <div className="space-y-4">
//                 <div className="h-64 bg-gray-200 rounded-lg overflow-hidden">
//                   <img src="/api/placeholder/600/600" alt="Restaurant interior" className="w-full h-full object-cover" />
//                 </div>
//                 <div className="h-40 bg-gray-200 rounded-lg overflow-hidden">
//                   <img src="/api/placeholder/600/400" alt="Chef cooking" className="w-full h-full object-cover" />
//                 </div>
//               </div>
//               <div className="space-y-4 pt-12">
//                 <div className="h-40 bg-gray-200 rounded-lg overflow-hidden">
//                   <img src="/api/placeholder/600/400" alt="Signature dish" className="w-full h-full object-cover" />
//                 </div>
//                 <div className="h-64 bg-gray-200 rounded-lg overflow-hidden">
//                   <img src="/api/placeholder/600/600" alt="Dining experience" className="w-full h-full object-cover" />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
      
//       {/* Specialties Section */}
//       <section id="specialties" className="py-24 bg-gray-50">
//         <div className="container mx-auto px-6">
//           <div className="text-center mb-16">
//             <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Signature Dishes</h2>
//             <p className="text-gray-600 max-w-2xl mx-auto">
//               Crafted with passion and precision, our signature dishes represent the pinnacle of our culinary philosophy.
//               Each recipe tells a story through carefully selected ingredients and meticulous preparation.
//             </p>
//           </div>
          
//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {[
//               {
//                 name: "Truffle Infused Risotto",
//                 description: "Creamy arborio rice with shaved black truffle and aged parmesan",
//                 image: "/api/placeholder/600/400"
//               },
//               {
//                 name: "Pan Seared Chilean Sea Bass",
//                 description: "Sustainably sourced sea bass with saffron beurre blanc",
//                 image: "/api/placeholder/600/400"
//               },
//               {
//                 name: "Wagyu Beef Tenderloin",
//                 description: "A5 Japanese Wagyu with potato fondant and red wine reduction",
//                 image: "/api/placeholder/600/400"
//               },
//               {
//                 name: "Roasted Beet & Burrata Salad",
//                 description: "Heirloom beets, creamy burrata, and aged balsamic glaze",
//                 image: "/api/placeholder/600/400"
//               },
//               {
//                 name: "Chocolate Dome Dessert",
//                 description: "Dark chocolate sphere with molten center and raspberry coulis",
//                 image: "/api/placeholder/600/400"
//               },
//               {
//                 name: "Seasonal Tasting Menu",
//                 description: "A curated journey through our chef's seasonal inspirations",
//                 image: "/api/placeholder/600/400"
//               }
//             ].map((dish, index) => (
//               <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow">
//                 <div className="h-56 overflow-hidden">
//                   <img src={dish.image} alt={dish.name} className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" />
//                 </div>
//                 <div className="p-6">
//                   <h3 className="text-xl font-semibold mb-2">{dish.name}</h3>
//                   <p className="text-gray-600">{dish.description}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
          
//           <div className="text-center mt-16">
//             <button 
//               className="bg-gray-900 text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition-colors"
//               onClick={() => window.location.href = '/menu'}
//             >
//               View Full Menu
//             </button>
//           </div>
//         </div>
//       </section>
      
//       {/* Parallax Section */}
//       <section className="relative h-80 bg-fixed bg-center bg-cover flex items-center justify-center" style={{ backgroundImage: 'url(/api/placeholder/1920/600)' }}>
//         <div className="absolute inset-0 bg-black bg-opacity-60"></div>
//         <div className="relative z-10 text-center text-white">
//           <h2 className="text-3xl md:text-4xl font-bold mb-4">"Cuisine is the art of instantly transforming ingredients into joy."</h2>
//           <p className="text-xl italic">— Chef Jean-Pierre Dubois</p>
//         </div>
//       </section>
      
//       {/* Reservation Section */}
//       <section id="reservation" className="py-24 bg-white">
//         <div className="container mx-auto px-6">
//           <div className="grid md:grid-cols-2 gap-12">
//             <div>
//               <h2 className="text-3xl md:text-4xl font-bold mb-6">Book Your Table</h2>
//               <p className="text-gray-600 mb-8">
//                 Reserve your table online and enjoy a seamless dining experience. 
//                 For special events or large parties, please contact us directly.
//               </p>
              
//               <form onSubmit={handleReservationSubmit} className="space-y-6">
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//                   <div>
//                     <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
//                     <input
//                       type="text"
//                       id="name"
//                       name="name"
//                       value={reservation.name}
//                       onChange={handleInputChange}
//                       required
//                       className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
//                       placeholder="John Doe"
//                     />
//                   </div>
//                   <div>
//                     <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
//                     <input
//                       type="email"
//                       id="email"
//                       name="email"
//                       value={reservation.email}
//                       onChange={handleInputChange}
//                       required
//                       className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
//                       placeholder="john@example.com"
//                     />
//                   </div>
//                 </div>
                
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//                   <div>
//                     <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
//                     <input
//                       type="tel"
//                       id="phone"
//                       name="phone"
//                       value={reservation.phone}
//                       onChange={handleInputChange}
//                       required
//                       className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
//                       placeholder="+1 (555) 000-0000"
//                     />
//                   </div>
//                   <div>
//                     <label htmlFor="guests" className="block text-sm font-medium text-gray-700 mb-1">Number of Guests</label>
//                     <select
//                       id="guests"
//                       name="guests"
//                       value={reservation.guests}
//                       onChange={handleInputChange}
//                       required
//                       className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
//                     >
//                       {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
//                         <option key={num} value={num}>{num} {num === 1 ? 'Guest' : 'Guests'}</option>
//                       ))}
//                       <option value="9+">9+ Guests</option>
//                     </select>
//                   </div>
//                 </div>
                
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//                   <div>
//                     <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">Date</label>
//                     <input
//                       type="date"
//                       id="date"
//                       name="date"
//                       value={reservation.date}
//                       onChange={handleInputChange}
//                       required
//                       className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
//                     />
//                   </div>
//                   <div>
//                     <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">Time</label>
//                     <select
//                       id="time"
//                       name="time"
//                       value={reservation.time}
//                       onChange={handleInputChange}
//                       required
//                       className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
//                     >
//                       <option value="">Select a time</option>
//                       {['17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30'].map(time => (
//                         <option key={time} value={time}>{time}</option>
//                       ))}
//                     </select>
//                   </div>
//                 </div>
                
//                 <div>
//                   <button 
//                     type="submit"
//                     className="w-full bg-gray-900 text-white font-medium py-3 rounded-lg hover:bg-gray-800 transition-colors"
//                   >
//                     Reserve Now
//                   </button>
//                 </div>
//               </form>
//             </div>
            
//             <div className="flex items-center justify-center">
//               <div className="w-full max-w-md p-8 bg-gray-900 rounded-lg text-white">
//                 <h3 className="text-2xl font-bold mb-6">Opening Hours</h3>
                
//                 <div className="space-y-4">
//                   <div className="flex justify-between items-center">
//                     <span>Monday - Thursday</span>
//                     <span>17:00 - 22:00</span>
//                   </div>
//                   <div className="flex justify-between items-center">
//                     <span>Friday - Saturday</span>
//                     <span>17:00 - 23:00</span>
//                   </div>
//                   <div className="flex justify-between items-center">
//                     <span>Sunday</span>
//                     <span>17:00 - 22:00</span>
//                   </div>
//                 </div>
                
//                 <div className="mt-8 pt-8 border-t border-gray-700">
//                   <h3 className="text-xl font-bold mb-4">Contact Information</h3>
                  
//                   <div className="space-y-4">
//                     <div className="flex items-center">
//                       <MapPin size={18} className="mr-3" />
//                       <span>123 Gastronomy Avenue, Culinary District, City</span>
//                     </div>
//                     <div className="flex items-center">
//                       <Phone size={18} className="mr-3" />
//                       <span>+1 (555) 123-4567</span>
//                     </div>
//                     <div className="flex items-center">
//                       <Clock size={18} className="mr-3" />
//                       <span>Reservations recommended</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
      
//       {/* Gallery Section */}
//       <section className="py-24 bg-gray-50">
//         <div className="container mx-auto px-6">
//           <div className="text-center mb-16">
//             <h2 className="text-3xl md:text-4xl font-bold mb-6">Gallery</h2>
//             <p className="text-gray-600 max-w-2xl mx-auto">
//               A glimpse into our culinary creations and dining atmosphere
//             </p>
//           </div>
          
//           <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
//             {galleryImages.map((image, index) => (
//               <div key={index} className="aspect-square rounded-lg overflow-hidden">
//                 <img 
//                   src={image} 
//                   alt={`Gallery image ${index + 1}`} 
//                   className="w-full h-full object-cover transition-transform duration-300 hover:scale-105 cursor-pointer" 
//                 />
//               </div>
//             ))}
//           </div>
          
//           <div className="text-center mt-12">
//             <button className="text-gray-900 font-medium hover:text-gray-700 transition-colors inline-flex items-center">
//               View All Photos
//               <ArrowRight size={16} className="ml-2" />
//             </button>
//           </div>
//         </div>
//       </section>
      
//       {/* Testimonials */}
//       <section className="py-24 bg-white">
//         <div className="container mx-auto px-6">
//           <div className="text-center mb-16">
//             <h2 className="text-3xl md:text-4xl font-bold mb-6">What Our Guests Say</h2>
//             <p className="text-gray-600 max-w-2xl mx-auto">
//               The opinions of our valued guests inspire us to continually elevate our culinary craft
//             </p>
//           </div>
          
//           <div className="grid md:grid-cols-3 gap-8">
//             {[
//               {
//                 name: "Emma Thompson",
//                 role: "Food Critic",
//                 quote: "An extraordinary dining experience that balances innovation with respect for tradition. Each dish tells a story of passion and precision."
//               },
//               {
//                 name: "Michael Chen",
//                 role: "Regular Guest",
//                 quote: "Élysée has become our special occasion destination. The attentive service and consistently excellent cuisine make every visit memorable."
//               },
//               {
//                 name: "Sophia Rodriguez",
//                 role: "Travel Blogger",
//                 quote: "In my culinary journey across 30 countries, Élysée stands among the finest restaurants I've experienced. A must-visit for any food enthusiast."
//               }
//             ].map((testimonial, index) => (
//               <div key={index} className="bg-gray-50 p-8 rounded-lg">
//                 <div className="flex items-center mb-4">
//                   {[1, 2, 3, 4, 5].map((star) => (
//                     <svg key={star} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
//                       <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                     </svg>
//                   ))}
//                 </div>
//                 <p className="text-gray-600 italic mb-6">"{testimonial.quote}"</p>
//                 <div className="flex items-center">
//                   <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
//                   <div>
//                     <h4 className="font-medium">{testimonial.name}</h4>
//                     <p className="text-sm text-gray-500">{testimonial.role}</p>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>
      
//       {/* Contact Section */}
//       <section id="contact" className="py-24 bg-gray-900 text-white">
//         <div className="container mx-auto px-6">
//           <div className="grid md:grid-cols-2 gap-12 items-center">
//             <div>
//               <h2 className="text-3xl md:text-4xl font-bold mb-6">Get in Touch</h2>
//               <p className="text-gray-300 mb-8">
//                 Have questions or special requests? Our team is here to assist you.
//                 Feel free to reach out through any of the channels below.
//               </p>
              
//               <div className="space-y-6">
//                 <div className="flex items-start">
//                   <MapPin size={24} className="mr-4 text-yellow-400" />
//                   <div>
//                     <h3 className="font-medium mb-1">Address</h3>
//                     <p className="text-gray-300">123 Gastronomy Avenue, Culinary District, City</p>
//                   </div>
//                 </div>
                
//                 <div className="flex items-start">
//                   <Phone size={24} className="mr-4 text-yellow-400" />
//                   <div>
//                     <h3 className="font-medium mb-1">Phone</h3>
//                     <p className="text-gray-300">+1 (555) 123-4567</p>
//                   </div>
//                 </div>
                
//                 <div className="flex items-start">
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-4 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//                   </svg>
//                   <div>
//                     <h3 className="font-medium mb-1">Email</h3>
//                     <p className="text-gray-300">info@elyseerestaurant.com</p>
//                   </div>
//                 </div>
//               </div>
              
//               <div className="mt-8">
//                 <h3 className="font-medium mb-4">Follow Us</h3>
//                 <div className="flex space-x-4">
//                   <a href="#" className="text-gray-300 hover:text-white transition-colors">
//                     <Instagram size={24} />
//                   </a>
//                   <a href="#" className="text-gray-300 hover:text-white transition-colors">
//                     <Facebook size={24} />
//                   </a>
//                   <a href="#" className="text-gray-300 hover:text-white transition-colors">
//                     <Twitter size={24} />
//                   </a>
//                 </div>
//               </div>
//             </div>
            
//             <div className="bg-gray-800 p-8 rounded-lg">
//               <h3 className="text-xl font-bold mb-6">Send Us a Message</h3>
//               <form className="space-y-4">
//                 <div>
//                   <label htmlFor="contact-name" className="block text-sm font-medium text-gray-300 mb-1">Name</label>
//                   <input
//                     type="text"
//                     id="contact-name"
//                     className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
//                     placeholder="Your name"
//                   />
//                 </div>
//                 <div>
//                   <label htmlFor="contact-email" className="block text-sm font-medium text-gray-300 mb-1">Email</label>
//                   <input
//                     type="email"
//                     id="contact-email"
//                     className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
//                     placeholder="your@email.com"
//                   />
//                 </div>
//                 <div>
//                   <label htmlFor="contact-message" className="block text-sm font-medium text-gray-300 mb-1">Message</label>
//                   <textarea
//                     id="contact-message"
//                     rows="4"
//                     className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
//                     placeholder="Your message..."
//                   ></textarea>
//                 </div>
//                 <button
//                   type="submit"
//                   className="w-full bg-yellow-400 text-gray-900 font-medium py-3 rounded-lg hover:bg-yellow-500 transition-colors"
//                 >
//                   Send Message
//                 </button>
//               </form>
//             </div>
//           </div>
//         </div>
//       </section>
      
//       {/* Footer */}
//       <footer className="bg-gray-950 text-gray-400 py-12">
//         <div className="container mx-auto px-6">
//           <div className="grid md:grid-cols-4 gap-8">
//             <div>
//               <h3 className="text-white text-lg font-bold mb-4">Élysée</h3>
//               <p className="mb-4">Where culinary artistry meets unforgettable experiences.</p>
//               <div className="flex space-x-4">
//                 <a href="#" className="hover:text-white transition-colors">
//                   <Instagram size={20} />
//                 </a>
//                 <a href="#" className="hover:text-white transition-colors">
//                   <Facebook size={20} />
//                 </a>
//                 <a href="#" className="hover:text-white transition-colors">
//                   <Twitter size={20} />
//                 </a>
//               </div>
//             </div>
            
//             <div>
//               <h4 className="text-white font-medium mb-4">Quick Links</h4>
//               <ul className="space-y-2">
//                 {['home', 'about', 'specialties', 'reservation', 'contact'].map((item) => (
//                   <li key={item}>
//                     <button 
//                       onClick={() => scrollToSection(item)}
//                       className="capitalize hover:text-white transition-colors"
//                     >
//                       {item}
//                     </button>
//                   </li>
//                 ))}
//               </ul>
//             </div>
            
//             <div>
//               <h4 className="text-white font-medium mb-4">Opening Hours</h4>
//               <ul className="space-y-2">
//                 <li>Monday - Thursday: 5PM - 10PM</li>
//                 <li>Friday - Saturday: 5PM - 11PM</li>
//                 <li>Sunday: 5PM - 10PM</li>
//               </ul>
//             </div>
            
//             <div>
//               <h4 className="text-white font-medium mb-4">Contact</h4>
//               <ul className="space-y-2">
//                 <li className="flex items-start">
//                   <MapPin size={16} className="mr-2 mt-1" />
//                   <span>123 Gastronomy Avenue, City</span>
//                 </li>
//                 <li className="flex items-start">
//                   <Phone size={16} className="mr-2 mt-1" />
//                   <span>+1 (555) 123-4567</span>
//                 </li>
//                 <li className="flex items-start">
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//                   </svg>
//                   <span>info@elyseerestaurant.com</span>
//                 </li>
//               </ul>
//             </div>
//           </div>
          
//           <div className="border-t border-gray-800 mt-12 pt-8 text-center">
//             <p>&copy; {new Date().getFullYear()} Élysée Restaurant. All rights reserved.</p>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// }
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
