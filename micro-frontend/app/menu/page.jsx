'use client'
import { useEffect, useState } from 'react';
import { ShoppingCart, Minus, Plus, ChevronRight } from 'lucide-react';

export default function RestaurantMenu() {
  const [menuItems, setMenuItems] = useState([]);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  

  useEffect(()=> {
    const fetchMenuItems = async ()=>{
      try{
        const res = await fetch(`http://localhost:5001/api/menu/`);
        const data = await res.json();
        setMenuItems(data);
      } catch(error){
        console.error(error)
      }
    };
    fetchMenuItems()
  }, []);

  const placeOrder = async () => {
    const userId = "662f7e59a15b8e3faebc94a1";
    const totalAmount =  cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const orderData = {
      userId,
      items: cart.map(item => ({
        name: item.name,
        price: item.price,
        quantity: item.quantity
      })),
      totalAmount
    };
    try {
      setIsPlacingOrder(true)
      const res = await fetch("http://localhost:5000/api/user/make-order",
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(orderData)

        })
        const result = await res.json();

        if (res.ok) {
          alert('Order placed successfully!');
          setCart([]);
          setIsCartOpen(false);
        } else{
          alert(`Failed to place order: ${result.message || 'unknown error'}`)
        }
    } catch (error) {
      console.error(error)
      alert('An error occurred while placing the order.');
    }finally {
      setIsPlacingOrder(flase)
    }
  }


  // Add item to cart or increase quantity if already in cart
  const addToCart = (item) => {
    setCart(prevCart => {
      const itemInCart = prevCart.find(cartItem => cartItem.id === item.id);
      
      if (itemInCart) {
        return prevCart.map(cartItem => 
          cartItem.id === item.id 
            ? { ...cartItem, quantity: cartItem.quantity + 1 } 
            : cartItem
        );
      } else {
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
  };

  // Decrease quantity or remove if quantity becomes 0
  const decreaseQuantity = (id) => {
    setCart(prevCart => {
      const updatedCart = prevCart.map(item => 
        item.id === id 
          ? { ...item, quantity: item.quantity - 1 } 
          : item
      ).filter(item => item.quantity > 0);
      return updatedCart;
    });
  };

  // Increase quantity
  const increaseQuantity = (id) => {
    setCart(prevCart => 
      prevCart.map(item => 
        item.id === id 
          ? { ...item, quantity: item.quantity + 1 } 
          : item
      )
    );
  };

  // Calculate total items in cart
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Calculate total price
  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto p-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight">Élysée</h1>
          <button 
            className="relative flex items-center bg-gray-900 text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition-colors"
            onClick={() => setIsCartOpen(!isCartOpen)}
          >
            <ShoppingCart className="mr-2" size={20} />
            <span>Cart</span>
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto py-12 px-6">
        <h2 className="text-4xl font-light mb-12 text-center">Our Signature Dishes</h2>
        
        {/* Menu Items */}
        <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8">
          {menuItems.map((item) => (
            <div key={item.id} className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow group">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/3 h-64 overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
                  />
                </div>
                <div className="md:w-2/3 p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <h3 className="text-xl font-semibold">{item.name}</h3>
                      <div className="text-xl font-light">Rs {item.price.toFixed(2)}</div>
                    </div>
                    <p className="mt-2 text-gray-600">{item.description}</p>
                  </div>
                  <div className="mt-6">
                    <button 
                      onClick={() => addToCart(item)}
                      className="bg-gray-900 text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition-colors flex items-center"
                    >
                      <span>Add to Cart</span>
                      <ChevronRight size={16} className="ml-1" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Cart Sidebar */}
      <div className={`fixed inset-y-0 right-0 max-w-md w-full bg-white shadow-lg transform ${isCartOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out z-50`}>
        <div className="h-full flex flex-col">
          <div className="p-6 border-b">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Your Cart</h2>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            {cart.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingCart size={64} className="mx-auto text-gray-300" />
                <p className="mt-4 text-gray-500">Your cart is empty</p>
              </div>
            ) : (
              <ul className="divide-y">
                {cart.map((item) => (
                  <li key={item.id} className="py-4">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-gray-600">Rs {item.price.toFixed(2)}</p>
                      </div>
                      <div className="flex items-center">
                        <button 
                          onClick={() => decreaseQuantity(item.id)}
                          className="text-gray-500 hover:text-gray-700 p-1"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="mx-2 w-8 text-center">{item.quantity}</span>
                        <button 
                          onClick={() => increaseQuantity(item.id)}
                          className="text-gray-500 hover:text-gray-700 p-1"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="p-6 border-t bg-gray-50">
            <div className="flex justify-between font-semibold text-lg mb-4">
              <span>Total</span>
              <span>Rs {totalPrice.toFixed(2)}</span>
            </div>
            <button 
              onClick={placeOrder}

              className="w-full bg-gray-900 text-white py-3 rounded-lg hover:bg-gray-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              disabled={cart.length === 0 || isPlacingOrder}
            >
              {isPlacingOrder ? 'Placing Order...' : 'Checkout'}
            </button>
          </div>
        </div>
      </div>

      {/* Overlay when cart is open */}
      {isCartOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsCartOpen(false)}
        />
      )}
    </div>
  );
}