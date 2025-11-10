import { useState, useEffect } from 'react';
import type { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';

interface Product {
  id: string;
  name: {
    fr: string;
    tn: string;
  };
  description: {
    fr: string;
    tn: string;
  };
  price: number;
  category: string;
  image: string;
  featured?: boolean;
}

const AdminDashboard = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  // Form state
  const [formData, setFormData] = useState({
    nameFr: '',
    nameTn: '',
    descriptionFr: '',
    descriptionTn: '',
    price: '',
    category: 'makroud',
    image: '',
    featured: false
  });

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = () => {
    const savedProducts = localStorage.getItem('products');
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    } else {
      // Load default products from products.ts
      import('../data/products').then((module) => {
        const defaultProducts = module.MOCK_PRODUCTS.map(p => ({
          id: p.slug,
          name: { fr: p.nameKey, tn: p.nameKey },
          description: { fr: p.descriptionKey, tn: p.descriptionKey },
          price: p.price,
          category: p.category,
          image: p.image,
          featured: false
        }));
        setProducts(defaultProducts);
        localStorage.setItem('products', JSON.stringify(defaultProducts));
      });
    }
  };

  const saveProducts = (updatedProducts: Product[]) => {
    localStorage.setItem('products', JSON.stringify(updatedProducts));
    setProducts(updatedProducts);
  };

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    localStorage.removeItem('adminUsername');
    navigate('/admin/login');
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const newProduct: Product = {
      id: editingProduct?.id || `product-${Date.now()}`,
      name: {
        fr: formData.nameFr,
        tn: formData.nameTn
      },
      description: {
        fr: formData.descriptionFr,
        tn: formData.descriptionTn
      },
      price: parseFloat(formData.price),
      category: formData.category,
      image: formData.image,
      featured: formData.featured
    };

    let updatedProducts: Product[];
    if (editingProduct) {
      // Update existing product
      updatedProducts = products.map(p => p.id === editingProduct.id ? newProduct : p);
    } else {
      // Add new product
      updatedProducts = [...products, newProduct];
    }

    saveProducts(updatedProducts);
    resetForm();
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      nameFr: product.name.fr,
      nameTn: product.name.tn,
      descriptionFr: product.description.fr,
      descriptionTn: product.description.tn,
      price: product.price.toString(),
      category: product.category,
      image: product.image,
      featured: product.featured || false
    });
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce produit?')) {
      const updatedProducts = products.filter(p => p.id !== id);
      saveProducts(updatedProducts);
    }
  };

  const resetForm = () => {
    setFormData({
      nameFr: '',
      nameTn: '',
      descriptionFr: '',
      descriptionTn: '',
      price: '',
      category: 'makroud',
      image: '',
      featured: false
    });
    setEditingProduct(null);
    setShowForm(false);
  };

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <div className="admin-header-content">
          <h1>🍰 Admin Dashboard</h1>
          <div className="admin-user-info">
            <span>👤 {localStorage.getItem('adminUsername')}</span>
            <button onClick={handleLogout} className="logout-btn">Déconnexion</button>
          </div>
        </div>
      </header>

      <div className="admin-content">
        <div className="admin-actions">
          <button 
            onClick={() => setShowForm(!showForm)} 
            className="add-product-btn"
          >
            {showForm ? '✖ Annuler' : '➕ Ajouter un produit'}
          </button>
          <div className="product-count">
            Total: <strong>{products.length}</strong> produits
          </div>
        </div>

        {showForm && (
          <div className="product-form-container">
            <h2>{editingProduct ? 'Modifier le produit' : 'Nouveau produit'}</h2>
            <form onSubmit={handleSubmit} className="product-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Nom (Français) *</label>
                  <input
                    type="text"
                    value={formData.nameFr}
                    onChange={(e) => setFormData({...formData, nameFr: e.target.value})}
                    required
                    placeholder="Ex: Makroud"
                  />
                </div>
                <div className="form-group">
                  <label>Nom (Arabe) *</label>
                  <input
                    type="text"
                    value={formData.nameTn}
                    onChange={(e) => setFormData({...formData, nameTn: e.target.value})}
                    required
                    placeholder="Ex: مقروض"
                    dir="rtl"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Description (Français) *</label>
                  <textarea
                    value={formData.descriptionFr}
                    onChange={(e) => setFormData({...formData, descriptionFr: e.target.value})}
                    required
                    rows={3}
                    placeholder="Description en français"
                  />
                </div>
                <div className="form-group">
                  <label>Description (Arabe) *</label>
                  <textarea
                    value={formData.descriptionTn}
                    onChange={(e) => setFormData({...formData, descriptionTn: e.target.value})}
                    required
                    rows={3}
                    placeholder="الوصف بالعربية"
                    dir="rtl"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Prix (TND) *</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                    required
                    placeholder="Ex: 12.50"
                  />
                </div>
                <div className="form-group">
                  <label>Catégorie *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    required
                  >
                    <option value="makroud">Makroud</option>
                    <option value="baklava">Baklava</option>
                    <option value="zlabia">Zlabia</option>
                    <option value="kaak">Kaak</option>
                    <option value="autres">Autres</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Image du produit *</label>
                <div className="image-upload-container">
                  <div className="upload-options">
                    <button
                      type="button"
                      className="upload-tab"
                      onClick={() => document.getElementById('imageFileInput')?.click()}
                    >
                      📁 Télécharger depuis l'appareil
                    </button>
                    <span style={{ margin: '0 10px', color: '#999' }}>ou</span>
                    <input
                      type="text"
                      value={formData.image}
                      onChange={(e) => setFormData({...formData, image: e.target.value})}
                      placeholder="Entrer une URL d'image"
                      style={{ flex: 1 }}
                    />
                  </div>
                  <input
                    id="imageFileInput"
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        // Convert to base64
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setFormData({...formData, image: reader.result as string});
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                  {formData.image && (
                    <div className="image-preview">
                      <img src={formData.image} alt="Preview" onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150?text=Image+Error';
                      }} />
                    </div>
                  )}
                </div>
              </div>

              <div className="form-group checkbox-group">
                <label>
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => setFormData({...formData, featured: e.target.checked})}
                  />
                  Produit vedette
                </label>
              </div>

              <div className="form-actions">
                <button type="submit" className="submit-btn">
                  {editingProduct ? '💾 Mettre à jour' : '➕ Ajouter'}
                </button>
                <button type="button" onClick={resetForm} className="cancel-btn">
                  Annuler
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="products-list">
          <h2>Liste des produits</h2>
          <div className="products-table-container">
            <table className="products-table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Nom</th>
                  <th>Catégorie</th>
                  <th>Prix</th>
                  <th>Vedette</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="no-products">
                      Aucun produit. Ajoutez votre premier produit!
                    </td>
                  </tr>
                ) : (
                  products.map((product) => (
                    <tr key={product.id}>
                      <td>
                        <img src={product.image} alt={product.name.fr} className="product-thumb" />
                      </td>
                      <td>
                        <div className="product-names">
                          <div>{product.name.fr}</div>
                          <div className="product-name-ar">{product.name.tn}</div>
                        </div>
                      </td>
                      <td><span className="category-badge">{product.category}</span></td>
                      <td><strong>{product.price.toFixed(2)} TND</strong></td>
                      <td>{product.featured ? '⭐' : '-'}</td>
                      <td>
                        <div className="action-buttons">
                          <button onClick={() => handleEdit(product)} className="edit-btn" title="Modifier">
                            ✏️
                          </button>
                          <button onClick={() => handleDelete(product.id)} className="delete-btn" title="Supprimer">
                            🗑️
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
