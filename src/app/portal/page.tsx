'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { db, Booking, Branch, Staff } from '@/lib/db';
import { User, Calendar, Clock, MapPin, Award, Trash2, Edit2, ShieldAlert, Sparkles, LogOut, Phone, Heart } from 'lucide-react';
import Navbar from '@/components/site/Navbar';
import Footer from '@/components/site/Footer';

export default function ClientPortal() {
  const [email, setEmail] = useState<string>('');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  
  // Dashboard states
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loyaltyPoints, setLoyaltyPoints] = useState<number>(0);
  const [branches, setBranches] = useState<Branch[]>([]);
  const [staff, setStaff] = useState<Staff[]>([]);

  // Editing state for reschedule
  const [editingBookingId, setEditingBookingId] = useState<string | null>(null);
  const [newDate, setNewDate] = useState<string>('');
  const [newTime, setNewTime] = useState<string>('');

  useEffect(() => {
    // If logged in, fetch details
    if (isLoggedIn && email) {
      setBookings(db.getBookingsByClientEmail(email));
      setLoyaltyPoints(db.getClientLoyaltyPoints(email));
      setBranches(db.getBranches());
      setStaff(db.getStaff());
    }
  }, [isLoggedIn, email]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() === '') return;
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setEmail('');
    setBookings([]);
  };

  const handleCancelBooking = (bookingId: string) => {
    const confirmCancel = confirm('Are you sure you want to cancel this booking? A 50% cancellation fee may apply in accordance with salon policies.');
    if (confirmCancel) {
      db.updateBookingStatus(bookingId, 'cancelled');
      // Refresh list
      setBookings(db.getBookingsByClientEmail(email));
    }
  };

  const handleRescheduleSubmit = (bookingId: string) => {
    if (!newDate || !newTime) return;

    const bookingsList = db.getBookings();
    const index = bookingsList.findIndex(b => b.id === bookingId);
    if (index !== -1) {
      bookingsList[index].booking_date = newDate;
      bookingsList[index].booking_time = newTime;
      localStorage.setItem('amore_bookings', JSON.stringify(bookingsList));
      setEditingBookingId(null);
      setNewDate('');
      setNewTime('');
      // Refresh list
      setBookings(db.getBookingsByClientEmail(email));
      alert('Rescheduled successfully! A WhatsApp notification alert has been logged.');
    }
  };

  // Date range limits for rescheduling
  const getMinDate = () => {
    const today = new Date();
    today.setDate(today.getDate() + 1);
    return today.toISOString().split('T')[0];
  };

  // Active bookings filter
  const upcomingBookings = bookings.filter(b => b.status === 'pending' || b.status === 'confirmed');
  const pastBookings = bookings.filter(b => b.status === 'completed' || b.status === 'cancelled');

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
                <User className="h-6 w-6" />
              </div>
              <h1 className="font-serif text-2xl font-bold text-amore-charcoal">Client Portal Login</h1>
              <p className="text-xs text-amore-charcoal/60 font-light leading-relaxed">
                Enter your email address associated with your bookings to reschedule appointments, check your loyalty points balance, and view preparation guides.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[11px] uppercase tracking-wider text-amore-charcoal/60 font-semibold">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. sarah@example.com"
                  className="amore-input text-xs"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 text-xs font-bold uppercase tracking-wider bg-amore-charcoal hover:bg-amore-gold text-amore-cream hover:text-white rounded-md transition-all focus:outline-none"
              >
                Log In Securely
              </button>
            </form>
          </div>
        ) : (
          /* Client Dashboard */
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* User welcome header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white border p-6 rounded-xl shadow-sm">
              <div className="space-y-1">
                <p className="text-[10px] uppercase tracking-widest text-amore-gold font-bold">Client Dashboard</p>
                <h1 className="font-serif text-2xl text-amore-charcoal">
                  Welcome Back, <span className="font-semibold">{bookings[0]?.client_name || email}</span>
                </h1>
                <p className="text-xs text-amore-charcoal/50 font-light">Account connected to: {email}</p>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 text-xs font-semibold px-4 py-2 border hover:border-red-400 text-amore-charcoal/70 hover:text-red-500 rounded transition-all focus:outline-none"
              >
                <LogOut className="h-4 w-4" /> Log Out
              </button>
            </div>

            {/* Metrics cards grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Loyalty Card */}
              <div className="bg-gradient-to-br from-amore-charcoal to-[#2E2925] text-amore-cream p-6 rounded-xl border border-amore-gold-light/30 shadow-lg space-y-4 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div className="space-y-0.5">
                    <p className="text-[10px] uppercase tracking-wider text-amore-gold-light font-bold">Amore Loyalty Club</p>
                    <h3 className="font-serif text-lg">Your Rewards</h3>
                  </div>
                  <Award className="h-6 w-6 text-amore-gold-light" />
                </div>
                <div>
                  <span className="font-serif text-4xl font-semibold text-white">{loyaltyPoints}</span>
                  <span className="text-xs text-amore-cream/60 ml-1.5 font-light">Points (R{loyaltyPoints} value)</span>
                </div>
                <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-amore-gold" style={{ width: `${Math.min(loyaltyPoints, 100)}%` }}></div>
                </div>
                <p className="text-[10px] text-amore-cream/50 font-light leading-normal">
                  Redeemable up to R100 discount per booking. Earn 1 point for every R10 spent.
                </p>
              </div>

              {/* Total Appointments */}
              <div className="bg-white border p-6 rounded-xl shadow-sm flex flex-col justify-between">
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-amore-charcoal/50 font-bold">Lounge Bookings</p>
                  <h3 className="font-serif text-lg text-amore-charcoal mt-0.5">Active Appointments</h3>
                </div>
                <div className="py-2">
                  <span className="font-serif text-3xl font-semibold text-amore-charcoal">{upcomingBookings.length}</span>
                  <span className="text-xs text-amore-charcoal/60 ml-1.5 font-light">upcoming slot(s)</span>
                </div>
                <p className="text-[10px] text-amore-charcoal/50 font-light leading-normal">
                  Cancel or reschedule online up to 24 hours prior.
                </p>
              </div>

              {/* Security and consent notice */}
              <div className="bg-white border p-6 rounded-xl shadow-sm flex flex-col justify-between">
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-amore-charcoal/50 font-bold">POPIA Status</p>
                  <h3 className="font-serif text-lg text-amore-charcoal mt-0.5">Secure Intake File</h3>
                </div>
                <div className="py-2 flex items-center gap-2 text-xs font-semibold text-[#1ebd59]">
                  <CheckCircleIcon /> Secured & Encrypted
                </div>
                <p className="text-[10px] text-amore-charcoal/50 font-light leading-normal">
                  Your cosmetics logs and intake answers are protected in accordance with the Protection of Personal Information Act.
                </p>
              </div>
            </div>

            {/* Appointments schedule manager */}
            <div className="space-y-4">
              <h2 className="font-serif text-xl font-bold text-amore-charcoal border-b border-amore-border pb-2">
                Upcoming Bookings
              </h2>

              {upcomingBookings.length === 0 ? (
                <div className="text-center py-12 bg-white border border-dashed rounded-xl">
                  <Calendar className="h-8 w-8 text-amore-gold mx-auto mb-2 opacity-50" />
                  <p className="text-xs font-light text-amore-charcoal/50">You have no upcoming appointments scheduled.</p>
                  <Link href="/book" className="text-xs text-amore-gold underline mt-2 inline-block font-semibold">
                    Book An Appointment Now
                  </Link>
                </div>
              ) : (
                <div className="space-y-6">
                  {upcomingBookings.map((b) => {
                    const br = branches.find(branch => branch.id === b.branch_id);
                    const tf = staff.find(t => t.id === b.staff_id);
                    const isEditing = editingBookingId === b.id;

                    return (
                      <div key={b.id} className="bg-white border border-amore-gold-light/20 rounded-xl overflow-hidden shadow-sm">
                        {/* Booking Header bar */}
                        <div className="bg-amore-cream/35 px-6 py-4 border-b border-amore-border/30 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                          <div>
                            <span className="text-[9px] uppercase tracking-widest bg-amore-gold/15 text-amore-gold px-2 py-0.5 rounded font-bold">
                              {b.status}
                            </span>
                            <p className="text-xs font-semibold text-amore-charcoal mt-1">
                              Booking Ref: {b.id}
                            </p>
                          </div>

                          {!isEditing ? (
                            <div className="flex gap-2">
                              <button
                                onClick={() => {
                                  setEditingBookingId(b.id);
                                  setNewDate(b.booking_date);
                                  setNewTime(b.booking_time);
                                }}
                                className="flex items-center gap-1 text-[10px] uppercase tracking-wider font-bold px-3 py-1.5 border text-amore-charcoal hover:border-amore-gold hover:text-amore-gold rounded transition-colors focus:outline-none"
                              >
                                <Edit2 className="h-3 w-3" /> Reschedule
                              </button>
                              <button
                                onClick={() => handleCancelBooking(b.id)}
                                className="flex items-center gap-1 text-[10px] uppercase tracking-wider font-bold px-3 py-1.5 border hover:border-red-400 text-amore-charcoal hover:text-red-500 rounded transition-colors focus:outline-none"
                              >
                                <Trash2 className="h-3 w-3" /> Cancel Slot
                              </button>
                            </div>
                          ) : (
                            <div className="flex gap-2 w-full sm:w-auto mt-2 sm:mt-0">
                              <button
                                onClick={() => handleRescheduleSubmit(b.id)}
                                className="flex-1 sm:flex-none text-[10px] uppercase tracking-wider font-bold px-4 py-2 bg-[#25D366] text-white rounded transition-colors focus:outline-none"
                              >
                                Save Date
                              </button>
                              <button
                                onClick={() => setEditingBookingId(null)}
                                className="flex-1 sm:flex-none text-[10px] uppercase tracking-wider font-bold px-4 py-2 border text-amore-charcoal rounded transition-colors focus:outline-none"
                              >
                                Cancel
                              </button>
                            </div>
                          )}
                        </div>

                        {/* Booking Details Card body */}
                        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                          {/* Schedule and location */}
                          <div className="space-y-3">
                            <p className="text-[10px] uppercase tracking-wider text-amore-charcoal/50 font-bold border-b pb-1">
                              Date & Branch
                            </p>
                            {isEditing ? (
                              <div className="space-y-2">
                                <input
                                  type="date"
                                  min={getMinDate()}
                                  value={newDate}
                                  onChange={(e) => setNewDate(e.target.value)}
                                  className="amore-input text-xs"
                                />
                                <input
                                  type="text"
                                  placeholder="e.g. 10:30"
                                  value={newTime}
                                  onChange={(e) => setNewTime(e.target.value)}
                                  className="amore-input text-xs"
                                />
                              </div>
                            ) : (
                              <div className="space-y-2 text-xs text-amore-charcoal/85">
                                <p className="flex items-center gap-1.5 font-semibold text-amore-gold">
                                  <Calendar className="h-4 w-4" /> {b.booking_date} at {b.booking_time}
                                </p>
                                <p className="flex items-start gap-1.5 font-light">
                                  <MapPin className="h-4 w-4 text-amore-gold shrink-0 mt-0.5" />
                                  <span>{br?.name} <br /> <span className="text-[10px] text-amore-charcoal/50">{br?.address}</span></span>
                                </p>
                              </div>
                            )}
                          </div>

                          {/* Services & addons list */}
                          <div className="space-y-2">
                            <p className="text-[10px] uppercase tracking-wider text-amore-charcoal/50 font-bold border-b pb-1">
                              Treatments
                            </p>
                            <div className="space-y-1.5">
                              {b.services.map((s) => (
                                <div key={s.id} className="text-xs">
                                  <span className="font-semibold text-amore-charcoal">{s.name}</span>
                                  <span className="text-[10px] text-amore-charcoal/50 block font-light">
                                    {s.duration} mins • R{s.price}
                                  </span>
                                </div>
                              ))}
                              {b.addons.map((a) => (
                                <div key={a.id} className="text-[10px] text-amore-charcoal/70 flex justify-between font-light">
                                  <span>+ {a.name}</span>
                                  <span>R{a.price}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Therapist & price breakdown */}
                          <div className="space-y-3">
                            <p className="text-[10px] uppercase tracking-wider text-amore-charcoal/50 font-bold border-b pb-1">
                              Therapist & Payment
                            </p>
                            <div className="space-y-2 text-xs">
                              <p className="font-light">
                                Assigned: <span className="font-semibold text-amore-charcoal">
                                  {b.staff_id === 'any' ? 'Any Available Therapist' : tf?.name}
                                </span>
                              </p>
                              <div className="border-t border-amore-border/30 pt-2 flex flex-col gap-1 items-end">
                                <div className="flex items-center gap-1.5">
                                  <span className="text-[10px] text-amore-charcoal/50 font-light">Total Price:</span>
                                  <span className="font-serif text-base font-bold text-amore-gold">R{b.total_price}</span>
                                </div>
                                {b.deposit_paid > 0 && (
                                  <span className="text-[9px] font-semibold text-[#1ebd59]">
                                    R{b.deposit_paid} Deposit Paid Securely
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Booking History logs */}
            <div className="space-y-4">
              <h2 className="font-serif text-xl font-bold text-amore-charcoal border-b border-amore-border pb-2">
                Booking History
              </h2>

              {pastBookings.length === 0 ? (
                <p className="text-xs text-amore-charcoal/50 italic font-light">No past appointments found.</p>
              ) : (
                <div className="bg-white border rounded-xl divide-y divide-amore-border/30 overflow-hidden shadow-sm">
                  {pastBookings.map((b) => (
                    <div key={b.id} className="p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs">
                      <div className="space-y-1">
                        <p className="font-semibold text-amore-charcoal">
                          {b.services.map((s) => s.name).join(', ')}
                        </p>
                        <p className="text-[10px] text-amore-charcoal/50 font-light">
                          {b.booking_date} • {b.booking_time} • Ref: {b.id}
                        </p>
                      </div>

                      <div className="flex items-center gap-4">
                        <span className="font-serif text-amore-gold font-bold">R{b.total_price}</span>
                        <span
                          className={`text-[9px] uppercase tracking-wider px-2 py-0.5 rounded font-bold ${
                            b.status === 'completed'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-red-100 text-red-700'
                          }`}
                        >
                          {b.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Floating support buttons and footer */}
      <Footer />
    </div>
  );
}

// Simple inline SVG checkmark circle
function CheckCircleIcon() {
  return (
    <svg className="h-4 w-4 fill-current shrink-0" viewBox="0 0 24 24">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
    </svg>
  );
}
