
'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';


export default function Tienda() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const router = useRouter();

  // Cargar productos y categorías desde la API
  useEffect(() => {
    async function fetchData() {
      const prodRes = await fetch('/api/productos');
      const productos = await prodRes.json();
      setAllProducts(productos);

      const catRes = await fetch('/api/categorias');
      const catData = await catRes.json();
      if (catData.success) {
        setCategories(catData.categorias.map(c => ({ id: c.id, nombre: c.nombre })));
      }
      setFilteredProducts(productos);

      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    calculateTotal();
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    const filterBySearch = allProducts.filter(product =>
      product.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const filterByCategory = selectedCategories.length === 0
      ? filterBySearch
      : filterBySearch.filter(product =>
          selectedCategories.includes(product.categoria_id)
        );

    setFilteredProducts(filterByCategory);
  }, [selectedCategories, searchTerm, allProducts]);

  const handleCategoryChange = (categoryId) => {
    setSelectedCategories(prevSelected =>
      prevSelected.includes(categoryId)
        ? prevSelected.filter(cat => cat !== categoryId)
        : [...prevSelected, categoryId]
    );
  };

  const addToCart = (product) => {
    setCart(prevCart => {
      const existingProduct = prevCart.find(item => item.id === product.id);
      if (existingProduct) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const updateQuantity = (productId, newQuantity) => {
    setCart(prevCart => {
      if (newQuantity <= 0) {
        return prevCart.filter(item => item.id !== productId);
      }
      return prevCart.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      );
    });
  };

  const calculateTotal = () => {
    const newTotal = cart.reduce((sum, item) => sum + (item.precio * item.quantity), 0);
    setTotal(newTotal);
  };

  const formatPrice = (price) => {
    return price.toLocaleString('es-CL', { 
      style: 'currency', 
      currency: 'CLP',
      maximumFractionDigits: 0 
    });
  };

  return (
    <div className="store-container">
      <div className="account-button-container">
        <Link href="/cuenta" className="account-button">
          Mi Cuenta
        </Link>
      </div>

      <div style={{ width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: 30 }}>
          <img src="/logo.svg" alt="Logo Tienda" style={{ width: 70, marginBottom: 10 }} />
          <h1 className="title">Tienda Online</h1>
          <p style={{ color: '#888', fontSize: '1.1em', margin: 0 }}>¡Explora y compra los mejores productos!</p>
        </div>
        <div className="product-cart-container">
          <div className="sidebar">
            <div className="category-box">
              <h2>Categorías</h2>
              <ul>
                {categories.map(category => (
                  <li key={category.id} className={category.nombre.toLowerCase()}>
                    <label>
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(category.id)}
                        onChange={() => handleCategoryChange(category.id)}
                      />
                      {category.nombre}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="main-content">
            <div className="search-bar">
              <input
                type="text"
                placeholder="Buscar productos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button>🔍</button>
            </div>
            <div className="products-grid">
              {filteredProducts.length > 0 ? (
                filteredProducts.map(product => {
                  const cat = categories.find(c => c.id === product.categoria_id);
                  const catClass = cat ? cat.nombre.toLowerCase() : '';
                  return (
                    <div key={product.id} className={`product-card ${catClass}`}>
                      <div className="product-image">
                        <div className="placeholder-image"></div>
                      </div>
                      <h3 className="product-name">{product.nombre}</h3>
                      <p className="product-price">{formatPrice(product.precio)}</p>
                      <div className="quantity-control">
                        <button onClick={() => updateQuantity(product.id, (cart.find(item => item.id === product.id)?.quantity || 0) - 1)}>-</button>
                        <input
                          type="number"
                          min="0"
                          max={product.stock || 99}
                          value={
                            cart.find(item => item.id === product.id)?.quantity === undefined
                              ? ''
                              : cart.find(item => item.id === product.id)?.quantity
                          }
                          onChange={e => {
                            const value = e.target.value;
                            if (value === "") {
                              updateQuantity(product.id, 0);
                              return;
                            }
                            let val = parseInt(value, 10);
                            if (isNaN(val)) val = 0;
                            if (val < 0) val = 0;
                            if (product.stock && val > product.stock) val = product.stock;
                            updateQuantity(product.id, val);
                          }}
                          style={{ width: 45, textAlign: 'center' }}
                          onWheel={e => e.target.blur()}
                        />
                        <button
                          onClick={() => {
                            const item = cart.find(item => item.id === product.id);
                            if (!item) {
                              addToCart(product);
                            } else {
                              updateQuantity(product.id, item.quantity + 1);
                            }
                          }}
                          disabled={product.stock && (cart.find(item => item.id === product.id)?.quantity || 0) >= product.stock}
                        >
                          +
                        </button>
                      </div>
                      <div className="stock-info" style={{ fontSize: '0.9em', color: '#888', marginTop: 4 }}>
                        Stock: {product.stock !== undefined ? product.stock : 'N/D'}
                      </div>
                    </div>
                  );
                })
              ) : (
                <p className="no-products">No se encontraron productos.</p>
              )}
            </div>
          </div>
          <div className="cart-summary">
            <h2>Pedido</h2>
            <ul id="cart-items">
              {cart.map(item => (
                <li key={item.id}>
                  {item.quantity} x {item.nombre} <span>{formatPrice(item.precio * item.quantity)}</span>
                </li>
              ))}
            </ul>
            <div className="cart-total">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>
            <div className="estimated-time">
              <span>retiro estimado</span>
              <span>25:60 32/13/0000</span>
            </div>
            <div className="cart-buttons">
              <Link href="/pedido" className="realizar">Ver Carrito</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
