import { useState, useEffect } from 'react';
import type { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';
import {
  createProduct,
  updateProductById,
  deleteProductById,
  subscribeAllProducts,
  uploadProductImage,
  slugify,
} from '../services/productsService';
import type { FirestoreProduct, Category } from '../services/productsService';

const AdminDashboard = () => {
  const [products, setProducts] = useState<FirestoreProduct[]>([]);
  const [loadingProducts, setLoadingProducts] = useState<boolean>(true);
  const [editingProduct, setEditingProduct] = useState<FirestoreProduct | null>(null);
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  // Form state
  const [formData, setFormData] = useState({
    nameFr: '',
    nameTn: '',
    descriptionFr: '',
    descriptionTn: '',
    price: '',
  category: 'honeyed' as Category,
    image: '',
    featured: false
  });

  useEffect(() => {
    // Subscribe to all products (including inactive for admin visibility)
    setLoadingProducts(true);
    const unsub = subscribeAllProducts((items) => {
      setProducts(items);
      setLoadingProducts(false);
    });
    return () => {
      unsub();
    };
  }, []);

  // Firestore handles persistence; no local saveProducts needed now.

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    localStorage.removeItem('adminUsername');
    navigate('/admin/login');
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const payload: Omit<FirestoreProduct, 'id' | 'active'> = {
      slug: slugify(formData.nameFr || `produit-${Date.now()}`),
      category: formData.category as Category,
      price: parseFloat(formData.price),
      image: formData.image,
      name_fr: formData.nameFr,
      name_tn: formData.nameTn,
      desc_fr: formData.descriptionFr,
      desc_tn: formData.descriptionTn,
      featured: formData.featured,
    };
    try {
      if (editingProduct?.id) {
        await updateProductById(editingProduct.id, payload);
      } else {
        await createProduct(payload);
      }
      resetForm();
    } catch (err) {
      alert('Erreur lors de l\'enregistrement du produit');
    }
  };

  const handleEdit = (product: FirestoreProduct) => {
    setEditingProduct(product);
    setFormData({
      nameFr: product.name_fr,
      nameTn: product.name_tn,
      descriptionFr: product.desc_fr,
      descriptionTn: product.desc_tn,
      price: product.price.toString(),
      category: product.category as Category,
      image: product.image,
      featured: product.featured || false
    });
    setShowForm(true);
  };

  const handleDelete = async (id?: string) => {
    if (!id) return;
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce produit? Cette action est définitive.')) return;
    try {
      await deleteProductById(id);
    } catch (err) {
      alert('Erreur lors de la suppression du produit');
    }
  };

  const resetForm = () => {
    setFormData({
      nameFr: '',
      nameTn: '',
      descriptionFr: '',
      descriptionTn: '',
      price: '',
  category: 'honeyed' as Category,
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
                    onChange={(e) => setFormData({...formData, category: e.target.value as Category})}
                    required
                  >
                    <option value="honeyed">Honeyed</option>
                    <option value="dry">Dry</option>
                    <option value="seasonal">Seasonal</option>
                    <option value="other">Other</option>
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
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        try {
                          const url = await uploadProductImage(file);
                          setFormData({...formData, image: url});
                        } catch (err) {
                          alert('Erreur lors du téléversement de l\'image');
                        }
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
          {loadingProducts && (
            <div className="loading-indicator">Chargement des produits...</div>
          )}
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
                {!loadingProducts && products.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="no-products">
                      Aucun produit. Ajoutez votre premier produit!
                    </td>
                  </tr>
                ) : (
                  products.map((product) => (
                    <tr key={product.id}>
                      <td>
                        <img src={product.image} alt={product.name_fr} className="product-thumb" />
                      </td>
                      <td>
                        <div className="product-names">
                          <div>{product.name_fr}</div>
                          <div className="product-name-ar">{product.name_tn}</div>
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
