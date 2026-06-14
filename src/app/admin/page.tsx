'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { db, Booking, Service, ServiceCategory, GalleryItem, Promotion, NotificationRecord } from '@/lib/db';
import { ShieldAlert, LogOut, Calendar, Tag, Image, Bell, Settings, Plus, Edit2, Trash2, CheckCircle, XCircle, ToggleLeft, ToggleRight, Sparkles } from 'lucide-react';
import Navbar from '@/components/site/Navbar';
import Footer from '@/components/site/Footer';

export default function AdminDashboard() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  // Tab control
  const [activeTab, setActiveTab] = useState<'bookings' | 'services' | 'gallery' | 'promos' | 'notifications'>('bookings');

  // Database states
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [categories, setCategories] = useState<ServiceCategory[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [notifications, setNotifications] = useState<NotificationRecord[]>([]);

  // CRUD Form States - Services
  const [showServiceForm, setShowServiceForm] = useState<boolean>(false);
  const [editingServiceId, setEditingServiceId] = useState<string | null>(null);
  const [serviceName, setServiceName] = useState<string>('');
  const [serviceDesc, setServiceDesc] = useState<string>('');
  const [serviceCatId, setServiceCatId] = useState<string>('');
  const [serviceFemalePrice, setServiceFemalePrice] = useState<number>(300);
  const [serviceMalePrice, setServiceMalePrice] = useState<string>(''); // empty means NULL
  const [serviceDuration, setServiceDuration] = useState<number>(45);
  const [serviceIsPopular, setServiceIsPopular] = useState<boolean>(false);

  // CRUD Form States - Gallery
  const [showGalleryForm, setShowGalleryForm] = useState<boolean>(false);
  const [galleryTitle, setGalleryTitle] = useState<string>('');
  const [galleryCategory, setGalleryCategory] = useState<string>('Nails');
  const [galleryDesc, setGalleryDesc] = useState<string>('');
  const [galleryImage, setGalleryImage] = useState<string>(''); // Base64
  const [galleryImageName, setGalleryImageName] = useState<string>('');

  // CRUD Form States - Promotions
  const [promoText, setPromoText] = useState<string>('');
  const [promoTitle, setPromoTitle] = useState<string>('');
  const [promoActive, setPromoActive] = useState<boolean>(true);

  // Load Admin Data
  useEffect(() => {
    if (isLoggedIn) {
      setBookings(db.getBookings().sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()));
      setServices(db.getServices());
      setCategories(db.getCategories());
      setGallery(db.getGallery());
      setPromotions(db.getPromotions());
      setNotifications(db.getNotifications().sort((a, b) => new Date(b.send_time).getTime() - new Date(a.send_time).getTime()));

      // Seed promo editor
      const activePromo = db.getPromotions()[0];
      if (activePromo) {
        setPromoTitle(activePromo.title);
        setPromoText(activePromo.banner_text);
        setPromoActive(activePromo.is_active);
      }
    }
  }, [isLoggedIn]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple mock authorization
    if (email === 'chantel@amorenails.co.za' || email.includes('admin')) {
      setIsLoggedIn(true);
    } else {
      alert('Unauthorized access. Only Salon Admins are permitted.');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setEmail('');
    setPassword('');
  };

  // --- BOOKING CONTROLS ---
  const handleUpdateBookingStatus = (id: string, status: Booking['status']) => {
    db.updateBookingStatus(id, status);
    setBookings(db.getBookings().sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()));
  };

  // --- SERVICES CRUD ---
  const handleSaveService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!serviceName || !serviceCatId) return;

    const malePriceVal = serviceMalePrice.trim() !== '' ? Number(serviceMalePrice) : undefined;

    const payload = {
      category_id: serviceCatId,
      name: serviceName,
      description: serviceDesc,
      price_female: Number(serviceFemalePrice),
      price_male: malePriceVal,
      duration_minutes: Number(serviceDuration),
      is_popular: serviceIsPopular,
      image_url: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800&q=80' // default
    };

    if (editingServiceId) {
      db.updateService(editingServiceId, payload);
    } else {
      db.createService(payload);
    }

    // Reset forms & refresh lists
    setServices(db.getServices());
    setShowServiceForm(false);
    setEditingServiceId(null);
    setServiceName('');
    setServiceDesc('');
    setServiceFemalePrice(300);
    setServiceMalePrice('');
    setServiceDuration(45);
    setServiceIsPopular(false);
  };

  const handleEditServiceClick = (srv: Service) => {
    setEditingServiceId(srv.id);
    setServiceName(srv.name);
    setServiceDesc(srv.description);
    setServiceCatId(srv.category_id);
    setServiceFemalePrice(srv.price_female);
    setServiceMalePrice(srv.price_male ? String(srv.price_male) : '');
    setServiceDuration(srv.duration_minutes);
    setServiceIsPopular(srv.is_popular);
    setShowServiceForm(true);
  };

  const handleDeleteService = (id: string) => {
    if (confirm('Are you sure you want to delete this service? This action is permanent.')) {
      db.deleteService(id);
      setServices(db.getServices());
    }
  };

  // --- GALLERY CRUD ---
  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setGalleryImageName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setGalleryImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveGalleryItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!galleryTitle || !galleryImage) return;

    db.addGalleryItem({
      category: galleryCategory,
      title: galleryTitle,
      description: galleryDesc,
      image_url: galleryImage
    });

    setGallery(db.getGallery());
    setShowGalleryForm(false);
    setGalleryTitle('');
    setGalleryDesc('');
    setGalleryImage('');
    setGalleryImageName('');
  };

  const handleDeleteGalleryItem = (id: string) => {
    if (confirm('Are you sure you want to remove this lookbook item?')) {
      db.deleteGalleryItem(id);
      setGallery(db.getGallery());
    }
  };

  // --- PROMOTIONS CMS ---
  const handleSavePromotion = (e: React.FormEvent) => {
    e.preventDefault();
    const activePromo = promotions[0];
    if (activePromo) {
      db.updatePromotion(activePromo.id, {
        title: promoTitle,
        banner_text: promoText,
        is_active: promoActive
      });
      setPromotions(db.getPromotions());
      alert('Promotion banner updated successfully! The home page header is refreshed.');
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-amore-cream">
      {/* We reuse the global Navbar for the portal */}
      <Navbar />

      <main className="flex-1 mx-auto max-w-7xl w-full px-4 py-12 sm:px-6 lg:px-8">
        {!isLoggedIn ? (
          /* Login Card */
          <div className="max-w-md mx-auto bg-white border border-amore-gold-light/20 p-8 rounded-xl shadow-lg space-y-6 my-12">
            <div className="text-center space-y-2">
              <div className="mx-auto bg-amore-gold/10 p-3 rounded-full w-12 h-12 flex items-center justify-center text-amore-gold">
                <ShieldAlert className="h-6 w-6" />
              </div>
              <h1 className="font-serif text-2xl font-bold text-amore-charcoal">Admin Control Panel</h1>
              <p className="text-xs text-amore-charcoal/60 font-light leading-relaxed">
                Log in with your administrator email account (e.g. chantel@amorenails.co.za) to open the CMS catalog manager, bookings calendar, and notification logs.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[11px] uppercase tracking-wider text-amore-charcoal/60 font-semibold">
                  Admin Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="chantel@amorenails.co.za"
                  className="amore-input text-xs"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] uppercase tracking-wider text-amore-charcoal/60 font-semibold">
                  Secure Password
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="amore-input text-xs"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 text-xs font-bold uppercase tracking-wider bg-amore-charcoal hover:bg-amore-gold text-amore-cream hover:text-white rounded-md transition-all focus:outline-none"
              >
                Sign In As Admin
              </button>
            </form>
          </div>
        ) : (
          /* Admin Dashboard Layout */
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* Top Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white border p-6 rounded-xl shadow-sm">
              <div className="space-y-1">
                <p className="text-[10px] uppercase tracking-widest text-amore-gold font-bold">Lounge Management</p>
                <h1 className="font-serif text-2xl text-amore-charcoal">
                  Salon Admin: <span className="font-semibold">{email}</span>
                </h1>
                <p className="text-xs text-amore-charcoal/50 font-light">System Role: Master Administrator</p>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 text-xs font-semibold px-4 py-2 border hover:border-red-400 text-amore-charcoal/70 hover:text-red-500 rounded transition-all focus:outline-none"
              >
                <LogOut className="h-4 w-4" /> Log Out
              </button>
            </div>

            {/* Admin Tabs Selector */}
            <div className="flex flex-wrap gap-2 border-b border-amore-border pb-3">
              {[
                { id: 'bookings', label: 'Bookings Calendar', icon: Calendar },
                { id: 'services', label: 'CMS: Service Catalog', icon: Tag },
                { id: 'gallery', label: 'CMS: Lookbook Gallery', icon: Image },
                { id: 'promos', label: 'CMS: Promo Banner', icon: Settings },
                { id: 'notifications', label: 'n8n: Notification Log', icon: Bell }
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider rounded-md transition-all focus:outline-none ${
                      isActive
                        ? 'bg-amore-charcoal text-white shadow-sm'
                        : 'text-amore-charcoal/75 hover:bg-amore-cream/30 hover:text-amore-charcoal'
                    }`}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* TAB CONTENT: BOOKINGS */}
            {activeTab === 'bookings' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b pb-2">
                  <h2 className="font-serif text-xl font-bold text-amore-charcoal">Appointments Scheduler</h2>
                  <span className="text-xs text-amore-charcoal/50 font-light">{bookings.length} reservations found</span>
                </div>

                <div className="bg-white border rounded-xl overflow-hidden shadow-sm divide-y divide-amore-border/30">
                  {bookings.length === 0 ? (
                    <p className="p-8 text-center text-xs text-amore-charcoal/50 font-light">No bookings registered in the system.</p>
                  ) : (
                    bookings.map((b) => (
                      <div key={b.id} className="p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-xs">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-amore-charcoal text-sm">{b.client_name}</span>
                            <span
                              className={`text-[9px] uppercase tracking-wider px-2 py-0.5 rounded font-bold ${
                                b.status === 'confirmed' || b.status === 'completed'
                                  ? 'bg-green-100 text-green-700'
                                  : b.status === 'pending'
                                  ? 'bg-yellow-100 text-yellow-700'
                                  : 'bg-red-100 text-red-700'
                              }`}
                            >
                              {b.status}
                            </span>
                          </div>
                          <p className="text-[10px] text-amore-charcoal/50 font-light">
                            {b.client_email} • {b.client_phone}
                          </p>
                          <p className="font-semibold text-amore-gold mt-1">
                            {b.booking_date} at {b.booking_time} • {b.services.map(s => s.name).join(', ')}
                          </p>
                          {b.notes && (
                            <p className="text-[10px] text-amore-charcoal/65 bg-amore-cream/20 px-2 py-1 rounded italic mt-1 max-w-md border border-amore-border/30">
                              Notes: "{b.notes}"
                            </p>
                          )}
                        </div>

                        {/* Status update buttons */}
                        <div className="flex gap-1.5">
                          {b.status === 'pending' && (
                            <button
                              onClick={() => handleUpdateBookingStatus(b.id, 'confirmed')}
                              className="px-3 py-1.5 bg-[#25D366] hover:bg-[#1ebd59] text-white font-semibold rounded text-[10px] uppercase tracking-wider focus:outline-none"
                            >
                              Approve
                            </button>
                          )}
                          {b.status !== 'completed' && b.status !== 'cancelled' && (
                            <>
                              <button
                                onClick={() => handleUpdateBookingStatus(b.id, 'completed')}
                                className="px-3 py-1.5 border border-green-500 text-green-600 hover:bg-green-50 font-semibold rounded text-[10px] uppercase tracking-wider focus:outline-none"
                              >
                                Complete
                              </button>
                              <button
                                onClick={() => handleUpdateBookingStatus(b.id, 'cancelled')}
                                className="px-3 py-1.5 border border-red-500 text-red-600 hover:bg-red-50 font-semibold rounded text-[10px] uppercase tracking-wider focus:outline-none"
                              >
                                Cancel
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* TAB CONTENT: SERVICES CRUD */}
            {activeTab === 'services' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center border-b pb-2">
                  <h2 className="font-serif text-xl font-bold text-amore-charcoal">Services & Menu CMS</h2>
                  <button
                    onClick={() => {
                      setEditingServiceId(null);
                      setServiceName('');
                      setServiceDesc('');
                      setServiceCatId(categories[0]?.id || '');
                      setServiceFemalePrice(300);
                      setServiceMalePrice('');
                      setServiceDuration(45);
                      setServiceIsPopular(false);
                      setShowServiceForm(!showServiceForm);
                    }}
                    className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold uppercase tracking-wider bg-amore-charcoal hover:bg-amore-gold text-amore-cream hover:text-white rounded focus:outline-none"
                  >
                    <Plus className="h-3.5 w-3.5" /> Add New Service
                  </button>
                </div>

                {/* Service Create/Edit Form */}
                {showServiceForm && (
                  <form onSubmit={handleSaveService} className="bg-white border border-amore-gold-light/25 p-6 rounded-xl shadow-md space-y-4 max-w-2xl animate-in slide-in-from-top duration-300">
                    <h3 className="font-serif text-base font-bold text-amore-charcoal border-b pb-1">
                      {editingServiceId ? 'Edit Service' : 'Create New Beauty Service'}
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                      <div className="space-y-1">
                        <label className="text-[10px] uppercase tracking-wider text-amore-charcoal/60 font-semibold">Service Name</label>
                        <input
                          type="text"
                          required
                          value={serviceName}
                          onChange={(e) => setServiceName(e.target.value)}
                          placeholder="e.g. Signature Gel Overlay"
                          className="amore-input text-xs"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] uppercase tracking-wider text-amore-charcoal/60 font-semibold">Category</label>
                        <select
                          value={serviceCatId}
                          onChange={(e) => setServiceCatId(e.target.value)}
                          className="amore-input text-xs"
                        >
                          {categories.map(c => (
                            <option key={c.id} value={c.id}>{c.name}</option>
                          ))}
                        </select>
                      </div>
                      <div className="space-y-1 sm:col-span-2">
                        <label className="text-[10px] uppercase tracking-wider text-amore-charcoal/60 font-semibold">Description</label>
                        <textarea
                          required
                          value={serviceDesc}
                          onChange={(e) => setServiceDesc(e.target.value)}
                          placeholder="Detailed treatment description for catalog listings..."
                          rows={3}
                          className="amore-input text-xs"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] uppercase tracking-wider text-amore-charcoal/60 font-semibold">Female Price (Hers)</label>
                        <input
                          type="number"
                          required
                          value={serviceFemalePrice}
                          onChange={(e) => setServiceFemalePrice(Number(e.target.value))}
                          className="amore-input text-xs"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] uppercase tracking-wider text-amore-charcoal/60 font-semibold">Male Price (His - Optional)</label>
                        <input
                          type="number"
                          value={serviceMalePrice}
                          onChange={(e) => setServiceMalePrice(e.target.value)}
                          placeholder="Leave empty if not offered to males"
                          className="amore-input text-xs"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] uppercase tracking-wider text-amore-charcoal/60 font-semibold">Duration (Minutes)</label>
                        <input
                          type="number"
                          required
                          value={serviceDuration}
                          onChange={(e) => setServiceDuration(Number(e.target.value))}
                          className="amore-input text-xs"
                        />
                      </div>
                      <div className="flex items-center gap-2 pt-6">
                        <input
                          type="checkbox"
                          id="popular-srv"
                          checked={serviceIsPopular}
                          onChange={(e) => setServiceIsPopular(e.target.checked)}
                          className="accent-amore-gold h-4 w-4"
                        />
                        <label htmlFor="popular-srv" className="font-semibold cursor-pointer">Mark as Popular Bestseller</label>
                      </div>
                    </div>
                    <div className="flex justify-end gap-2 pt-4 border-t">
                      <button
                        type="button"
                        onClick={() => setShowServiceForm(false)}
                        className="px-4 py-2 border rounded font-semibold text-amore-charcoal/70 hover:bg-amore-cream/30 focus:outline-none"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2.5 bg-amore-charcoal text-amore-cream hover:bg-amore-gold rounded font-bold uppercase tracking-wider focus:outline-none"
                      >
                        Save Service
                      </button>
                    </div>
                  </form>
                )}

                {/* Services List Table */}
                <div className="bg-white border rounded-xl overflow-hidden shadow-sm divide-y divide-amore-border/30">
                  {services.map((srv) => {
                    const cat = categories.find(c => c.id === srv.category_id);
                    return (
                      <div key={srv.id} className="p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs">
                        <div className="space-y-1">
                          <h3 className="font-bold text-amore-charcoal text-sm">{srv.name}</h3>
                          <p className="text-[10px] text-amore-gold font-bold uppercase tracking-wider">
                            Category: {cat?.name} • Duration: {srv.duration_minutes} mins
                          </p>
                          <p className="text-xs text-amore-charcoal/60 font-light leading-relaxed max-w-lg">
                            {srv.description}
                          </p>
                        </div>
                        <div className="flex items-center gap-6">
                          <div className="text-right shrink-0">
                            <span className="font-serif font-bold text-amore-gold text-base block">R{srv.price_female}</span>
                            {srv.price_male && <span className="text-[10px] text-amore-charcoal/50 block">His: R{srv.price_male}</span>}
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleEditServiceClick(srv)}
                              className="p-1.5 border hover:border-amore-gold text-amore-charcoal/60 hover:text-amore-gold rounded focus:outline-none"
                            >
                              <Edit2 className="h-4.5 w-4.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteService(srv.id)}
                              className="p-1.5 border hover:border-red-400 text-amore-charcoal/60 hover:text-red-500 rounded focus:outline-none"
                            >
                              <Trash2 className="h-4.5 w-4.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* TAB CONTENT: GALLERY CMS */}
            {activeTab === 'gallery' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center border-b pb-2">
                  <h2 className="font-serif text-xl font-bold text-amore-charcoal">Lookbook Gallery CMS</h2>
                  <button
                    onClick={() => {
                      setGalleryTitle('');
                      setGalleryDesc('');
                      setGalleryImage('');
                      setGalleryImageName('');
                      setShowGalleryForm(!showGalleryForm);
                    }}
                    className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold uppercase tracking-wider bg-amore-charcoal hover:bg-amore-gold text-amore-cream hover:text-white rounded focus:outline-none"
                  >
                    <Plus className="h-3.5 w-3.5" /> Add Look Photo
                  </button>
                </div>

                {/* Gallery Form */}
                {showGalleryForm && (
                  <form onSubmit={handleSaveGalleryItem} className="bg-white border border-amore-gold-light/25 p-6 rounded-xl shadow-md space-y-4 max-w-md animate-in slide-in-from-top duration-300">
                    <h3 className="font-serif text-base font-bold text-amore-charcoal border-b pb-1">
                      Upload Lookbook Photo
                    </h3>
                    <div className="space-y-3 text-xs">
                      <div className="space-y-1">
                        <label className="text-[10px] uppercase tracking-wider text-amore-charcoal/60 font-semibold">Look Title</label>
                        <input
                          type="text"
                          required
                          value={galleryTitle}
                          onChange={(e) => setGalleryTitle(e.target.value)}
                          placeholder="e.g. Lavender Gel Overlay"
                          className="amore-input text-xs"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] uppercase tracking-wider text-amore-charcoal/60 font-semibold">Category Tab</label>
                        <select
                          value={galleryCategory}
                          onChange={(e) => setGalleryCategory(e.target.value)}
                          className="amore-input text-xs"
                        >
                          <option value="Nails">Nails</option>
                          <option value="Lashes">Lashes</option>
                          <option value="Brows">Brows</option>
                        </select>
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] uppercase tracking-wider text-amore-charcoal/60 font-semibold">Description</label>
                        <textarea
                          required
                          value={galleryDesc}
                          onChange={(e) => setGalleryDesc(e.target.value)}
                          placeholder="Style details..."
                          rows={2}
                          className="amore-input text-xs"
                        />
                      </div>
                      <div className="space-y-1 pt-2">
                        <label className="text-[10px] uppercase tracking-wider text-amore-charcoal/60 font-semibold block">Select File</label>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageFileChange}
                          className="text-xs"
                        />
                        {galleryImageName && <p className="text-[10px] text-amore-gold font-bold">Selected: {galleryImageName}</p>}
                      </div>
                    </div>
                    <div className="flex justify-end gap-2 pt-4 border-t">
                      <button
                        type="button"
                        onClick={() => setShowGalleryForm(false)}
                        className="px-4 py-2 border rounded font-semibold text-amore-charcoal/70 hover:bg-amore-cream/30 focus:outline-none"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2.5 bg-amore-charcoal text-amore-cream hover:bg-amore-gold rounded font-bold uppercase tracking-wider focus:outline-none"
                      >
                        Save Photo
                      </button>
                    </div>
                  </form>
                )}

                {/* Gallery List Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {gallery.map((item) => (
                    <div key={item.id} className="bg-white border rounded-xl overflow-hidden shadow-sm flex flex-col justify-between group">
                      <div className="relative aspect-square">
                        <img src={item.image_url} alt={item.title} className="object-cover w-full h-full" />
                        <button
                          onClick={() => handleDeleteGalleryItem(item.id)}
                          className="absolute top-2.5 right-2.5 p-1.5 bg-red-100 hover:bg-red-500 text-red-700 hover:text-white rounded-full transition-colors focus:outline-none"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="p-4 space-y-1">
                        <span className="text-[9px] uppercase tracking-wider text-amore-gold font-bold">{item.category}</span>
                        <h4 className="font-serif font-bold text-amore-charcoal text-sm">{item.title}</h4>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB CONTENT: PROMO BANNER */}
            {activeTab === 'promos' && (
              <div className="space-y-6">
                <div className="border-b pb-2">
                  <h2 className="font-serif text-xl font-bold text-amore-charcoal">Promotion Banner CMS</h2>
                </div>

                <form onSubmit={handleSavePromotion} className="bg-white border border-amore-gold-light/25 p-6 rounded-xl shadow-sm max-w-xl space-y-4 text-xs">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-wider text-amore-charcoal/60 font-semibold">Promo Title</label>
                    <input
                      type="text"
                      required
                      value={promoTitle}
                      onChange={(e) => setPromoTitle(e.target.value)}
                      className="amore-input text-xs"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-wider text-amore-charcoal/60 font-semibold">Banner Text</label>
                    <textarea
                      required
                      value={promoText}
                      onChange={(e) => setPromoText(e.target.value)}
                      rows={2}
                      className="amore-input text-xs"
                    />
                  </div>
                  
                  <div className="flex items-center gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setPromoActive(!promoActive)}
                      className="text-amore-charcoal hover:text-amore-gold transition-colors focus:outline-none"
                    >
                      {promoActive ? (
                        <ToggleRight className="h-8 w-8 text-amore-gold fill-current" />
                      ) : (
                        <ToggleLeft className="h-8 w-8 text-amore-charcoal/30 fill-current" />
                      )}
                    </button>
                    <span className="font-semibold text-amore-charcoal">
                      {promoActive ? 'Banner Active (visible on home page)' : 'Banner Suspended'}
                    </span>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 text-xs font-bold uppercase tracking-wider bg-amore-charcoal hover:bg-amore-gold text-amore-cream hover:text-white rounded-md transition-all focus:outline-none"
                  >
                    Save Promotion Settings
                  </button>
                </form>
              </div>
            )}

            {/* TAB CONTENT: NOTIFICATION AUDIT */}
            {activeTab === 'notifications' && (
              <div className="space-y-4">
                <div className="border-b pb-2">
                  <h2 className="font-serif text-xl font-bold text-amore-charcoal">n8n Automation Log Audit</h2>
                </div>

                <div className="bg-white border rounded-xl overflow-hidden shadow-sm divide-y divide-amore-border/30">
                  {notifications.length === 0 ? (
                    <p className="p-8 text-center text-xs text-amore-charcoal/50 font-light">No notifications triggered yet. Make a booking to test the triggers.</p>
                  ) : (
                    notifications.map((n) => (
                      <div key={n.id} className="p-4 flex justify-between items-start gap-4 text-xs font-light text-amore-charcoal/80">
                        <div className="space-y-1 flex-1">
                          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider">
                            <span className="text-amore-gold">Recipient: {n.client_name} ({n.client_phone})</span>
                            <span className="text-amore-charcoal/40">•</span>
                            <span>Trigger: {n.trigger_type}</span>
                          </div>
                          <p className="text-xs text-amore-charcoal leading-relaxed bg-amore-cream/10 p-2.5 rounded border border-amore-border/30 max-w-xl font-mono text-[11px]">
                            {n.message_content}
                          </p>
                        </div>
                        <div className="text-right shrink-0 space-y-1">
                          <span
                            className={`text-[9px] uppercase tracking-wider px-2 py-0.5 rounded font-bold ${
                              n.status === 'sent'
                                ? 'bg-green-100 text-green-700'
                                : 'bg-yellow-100 text-yellow-700'
                            }`}
                          >
                            {n.status}
                          </span>
                          <p className="text-[10px] text-amore-charcoal/40 font-light mt-1">
                            {new Date(n.send_time).toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Floating support buttons and footer */}
      <Footer />
    </div>
  );
}
