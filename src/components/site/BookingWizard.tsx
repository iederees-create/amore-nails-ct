'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { db, Branch, ServiceCategory, Service, ServiceAddon, Staff, Booking, IntakeQuestion } from '@/lib/db';
import { Check, Calendar as CalendarIcon, Clock, User, Sparkles, MapPin, ArrowRight, ArrowLeft, Upload, FileText, CheckCircle, CreditCard, Gift, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function BookingWizard() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // 1. Data States
  const [branches, setBranches] = useState<Branch[]>([]);
  const [categories, setCategories] = useState<ServiceCategory[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [allAddons, setAllAddons] = useState<ServiceAddon[]>([]);
  const [staffList, setStaffList] = useState<Staff[]>([]);

  // 2. Wizard Flow State
  const [step, setStep] = useState<number>(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  // 3. User Selection States
  const [selectedBranchId, setSelectedBranchId] = useState<string>('');
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('');
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [selectedStaffId, setSelectedStaffId] = useState<string>('any'); // 'any' or staff ID
  const [bookingDate, setBookingDate] = useState<string>('');
  const [bookingTime, setBookingTime] = useState<string>('');
  const [genderPricing, setGenderPricing] = useState<'female' | 'male'>('female');

  // Intake responses state: Record<questionId, answerString>
  const [intakeResponses, setIntakeResponses] = useState<Record<string, string>>({});
  const [inspirationImage, setInspirationImage] = useState<string>(''); // Base64 data URL
  const [inspirationFileName, setInspirationFileName] = useState<string>('');

  // Client Info States
  const [clientName, setClientName] = useState<string>('');
  const [clientEmail, setClientEmail] = useState<string>('');
  const [clientPhone, setClientPhone] = useState<string>('');
  const [clientNotes, setClientNotes] = useState<string>('');
  const [policyConsent, setPolicyConsent] = useState<boolean>(false);
  const [useLoyaltyPoints, setUseLoyaltyPoints] = useState<boolean>(false);

  // Completed Booking Response
  const [createdBooking, setCreatedBooking] = useState<Booking | null>(null);

  // 4. Initial Parameter Seeding
  useEffect(() => {
    setBranches(db.getBranches());
    setCategories(db.getCategories());
    setServices(db.getServices());
    setAllAddons(db.getAddons());

    // Check query params for pre-seeding (e.g. from gallery or services selection)
    const branchParam = searchParams.get('branch');
    const serviceParam = searchParams.get('service');
    const servicesParam = searchParams.get('services');
    const genderParam = searchParams.get('gender');

    if (genderParam === 'male') {
      setGenderPricing('male');
    }

    if (branchParam) {
      setSelectedBranchId(branchParam);
    }
    
    if (serviceParam) {
      const s = db.getServices().find(srv => srv.id === serviceParam);
      if (s) {
        setSelectedCategoryId(s.category_id);
        setSelectedServices([s.id]);
        setStep(4); // Skip to addons
      }
    } else if (servicesParam) {
      const ids = servicesParam.split(',');
      setSelectedServices(ids);
      const firstSrv = db.getServices().find(srv => srv.id === ids[0]);
      if (firstSrv) {
        setSelectedCategoryId(firstSrv.category_id);
      }
      setStep(4); // Skip to addons
    }
  }, [searchParams]);

  // Load staff when branch changes
  useEffect(() => {
    if (selectedBranchId) {
      setStaffList(db.getStaffByBranch(selectedBranchId));
    } else {
      setStaffList([]);
    }
  }, [selectedBranchId]);

  // Active Category Details
  const activeCategory = categories.find(c => c.id === selectedCategoryId);
  const activeBranch = branches.find(b => b.id === selectedBranchId);
  const activeStaff = staffList.find(t => t.id === selectedStaffId);

  // Service list filtered by selected category & gender availability
  const availableServices = services.filter(
    s => s.category_id === selectedCategoryId && (genderPricing === 'female' || s.price_male !== undefined)
  );

  // Addons filtered by selected services
  const availableAddons = allAddons.filter(a => selectedServices.includes(a.service_id));

  // Determine intake form type based on category slug
  const getIntakeFormType = (): 'nails' | 'waxing' | 'lashes_brows' | 'massage' => {
    if (!activeCategory) return 'nails';
    if (activeCategory.slug === 'nails') return 'nails';
    if (activeCategory.slug === 'waxing') return 'waxing';
    if (activeCategory.slug === 'eyelashes-brows') return 'lashes_brows';
    if (activeCategory.slug === 'massage') return 'massage';
    return 'nails';
  };

  // Get intake questions for current category
  const intakeQuestions = db.getIntakeQuestions(getIntakeFormType());

  // Date limit helpers (allow booking up to 30 days in advance starting tomorrow)
  const getMinDate = () => {
    const today = new Date();
    today.setDate(today.getDate() + 1);
    return today.toISOString().split('T')[0];
  };

  const getMaxDate = () => {
    const today = new Date();
    today.setDate(today.getDate() + 30);
    return today.toISOString().split('T')[0];
  };

  // Simulated Time Slots (9:00 AM to 5:00 PM)
  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
    '15:00', '15:30', '16:00', '16:30', '17:00'
  ];

  // Loyalty point calculations
  const loyaltyPointsEarned = Math.floor(
    selectedServices.reduce((acc, id) => {
      const s = services.find(srv => srv.id === id);
      if (!s) return acc;
      return acc + (genderPricing === 'male' && s.price_male ? s.price_male : s.price_female);
    }, 0) / 10
  );

  const clientLoyaltyBalance = clientEmail ? db.getClientLoyaltyPoints(clientEmail) : 0;
  const loyaltyPointsToUse = useLoyaltyPoints ? Math.min(clientLoyaltyBalance, 100) : 0; // limit 100 points per booking
  const loyaltyDiscount = loyaltyPointsToUse; // 1 point = R1 discount

  // Price calculations
  const rawSubtotal = selectedServices.reduce((acc, id) => {
    const s = services.find(srv => srv.id === id);
    if (!s) return acc;
    return acc + (genderPricing === 'male' && s.price_male ? s.price_male : s.price_female);
  }, 0) + selectedAddons.reduce((acc, id) => {
    const a = allAddons.find(ad => ad.id === id);
    return acc + (a ? a.price : 0);
  }, 0);

  const subtotal = Math.max(0, rawSubtotal - loyaltyDiscount);
  const depositAmount = rawSubtotal >= 450 ? Math.round(subtotal * 0.5) : 0; // Require 50% deposit for services R450+

  // Handle Inspiration Image Upload (Base64)
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setInspirationFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setInspirationImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Navigation validation
  const canGoNext = () => {
    if (step === 1) return selectedBranchId !== '';
    if (step === 2) return selectedCategoryId !== '';
    if (step === 3) return selectedServices.length > 0;
    // Step 4 (addons) is optional, always next
    if (step === 4) return true;
    if (step === 5) return selectedStaffId !== '';
    if (step === 6) return bookingDate !== '' && bookingTime !== '';
    if (step === 7) {
      // Validate required intake questions
      return intakeQuestions.every(q => {
        if (!q.is_required) return true;
        if (q.question_type === 'checkbox') return intakeResponses[q.id] === 'true' || intakeResponses[q.id] === 'I consent';
        return intakeResponses[q.id] && intakeResponses[q.id].trim() !== '';
      });
    }
    // Step 8 (inspiration) is optional
    if (step === 8) return true;
    if (step === 9) {
      return (
        clientName.trim() !== '' &&
        clientEmail.trim() !== '' &&
        clientPhone.trim() !== '' &&
        policyConsent
      );
    }
    return true;
  };

  const handleNext = () => {
    if (canGoNext()) {
      setCompletedSteps(prev => [...prev, step]);
      setStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(prev => prev - 1);
    }
  };

  // Confirm booking
  const handleConfirmBooking = () => {
    if (!canGoNext()) return;

    const bookingServicesData = selectedServices.map(id => {
      const s = services.find(srv => srv.id === id)!;
      return {
        id: s.id,
        name: s.name,
        price: genderPricing === 'male' && s.price_male ? s.price_male : s.price_female,
        duration: s.duration_minutes,
        gender_pricing: genderPricing
      };
    });

    const bookingAddonsData = selectedAddons.map(id => {
      const a = allAddons.find(ad => ad.id === id)!;
      return {
        id: a.id,
        name: a.name,
        price: a.price
      };
    });

    // Create the booking record
    const bookingData: Omit<Booking, 'id' | 'created_at' | 'status'> = {
      client_id: 'client-temp', // Link as registered later
      client_name: clientName,
      client_email: clientEmail,
      client_phone: clientPhone,
      branch_id: selectedBranchId,
      staff_id: selectedStaffId,
      booking_date: bookingDate,
      booking_time: bookingTime,
      total_price: subtotal,
      deposit_paid: depositAmount,
      loyalty_points_earned: loyaltyPointsEarned,
      loyalty_points_used: loyaltyPointsToUse,
      notes: clientNotes,
      services: bookingServicesData,
      addons: bookingAddonsData
    };

    const newBooking = db.createBooking(bookingData);

    // Save Intake Responses Linked to the Booking
    const responsesPayload = Object.entries(intakeResponses).map(([qId, ans]) => {
      const q = intakeQuestions.find(qst => qst.id === qId)!;
      return {
        question_id: qId,
        question_text: q.question_text,
        response_text: ans,
        inspiration_image_url: q.question_type === 'file' ? inspirationImage : undefined
      };
    });

    db.saveIntakeResponses(newBooking.id, responsesPayload);

    // If there is an inspiration image uploaded in step 8, we store it too
    if (inspirationImage) {
      const fileQuestion = intakeQuestions.find(q => q.question_type === 'file');
      if (fileQuestion) {
        db.saveIntakeResponses(newBooking.id, [{
          question_id: fileQuestion.id,
          question_text: fileQuestion.question_text,
          response_text: inspirationFileName,
          inspiration_image_url: inspirationImage
        }]);
      }
    }

    setCreatedBooking(newBooking);
    setStep(11); // Move to completion step

    // Confetti explosion
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  // Branch Preparation Instructions
  const getPrepInstructions = () => {
    const formType = getIntakeFormType();
    if (formType === 'nails') {
      return [
        'Please arrive with bare nails unless you booked a Soak-off addon.',
        'Drink plenty of water before foot scrubs and pedicure hydration.',
        'Avoid applying heavy oils or lotions on hands/feet 2 hours before session.'
      ];
    }
    if (formType === 'waxing') {
      return [
        'Ensure hair is at least 5mm long (about a grain of rice) for best grip.',
        'Wear loose, comfortable clothing to avoid friction post-wax.',
        'Avoid tanning, hot baths, or heavy exercise 24 hours prior.'
      ];
    }
    if (formType === 'lashes_brows') {
      return [
        'Arrive with completely clean eyes and zero mascara/makeup.',
        'Remove contact lenses before your lash application starts.',
        'Avoid caffeine 3 hours before to prevent fluttering eyelids.'
      ];
    }
    return [
      'Eat a light meal rather than a heavy one before a full massage.',
      'Inform the therapist instantly if the pressure is too light or firm.',
      'Wear comfortable clothing that is easy to slip on and off.'
    ];
  };

  // Branch Aftercare Instructions
  const getAftercareInstructions = () => {
    const formType = getIntakeFormType();
    if (formType === 'nails') {
      return [
        'Apply cuticle oil daily to extend the life of your gel overlay.',
        'Wear gloves when washing dishes or handling household chemicals.',
        'Never peel, file, or pick off gel or acrylic product yourself.'
      ];
    }
    if (formType === 'waxing') {
      return [
        'Avoid hot tubs, saunas, steam rooms, and tanning for 24-48 hours.',
        'Apply tea tree oil or soothing aloe vera lotion if minor redness occurs.',
        'Gently exfoliate the skin 3 days after waxing to prevent ingrown hairs.'
      ];
    }
    if (formType === 'lashes_brows') {
      return [
        'Keep lashes completely dry for the first 24 hours post-session.',
        'Avoid oil-based cleansers, eye makeup, and face creams.',
        'Brush them gently every morning with a clean lash spoolie.'
      ];
    }
    return [
      'Drink plenty of water to help flush out released metabolic waste.',
      'Take a warm shower or bath to continue relaxing sore muscle beds.',
      'Avoid intense strenuous workouts for the remainder of the day.'
    ];
  };

  return (
    <div className="mx-auto max-w-3xl bg-white border border-amore-gold-light/25 rounded-xl shadow-lg overflow-hidden my-12">
      {/* Progress Header */}
      {step < 11 && (
        <div className="bg-amore-charcoal text-amore-cream px-6 py-4 flex justify-between items-center border-b border-amore-gold-light/20">
          <div>
            <span className="text-[10px] uppercase tracking-widest text-amore-gold-light font-bold">
              Step {step} of 10
            </span>
            <h2 className="font-serif text-lg font-medium text-white">
              {step === 1 && 'Choose Branch Location'}
              {step === 2 && 'Select Category'}
              {step === 3 && 'Choose Treatments'}
              {step === 4 && 'Enhance with Add-ons'}
              {step === 5 && 'Select Beauty Therapist'}
              {step === 6 && 'Schedule Date & Time'}
              {step === 7 && 'Pre-Appointment Intake Form'}
              {step === 8 && 'Inspiration Lookbook'}
              {step === 9 && 'Complete Booking Information'}
              {step === 10 && 'Review & Secure Booking'}
            </h2>
          </div>
          <div className="h-2 w-24 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-amore-gold transition-all duration-300"
              style={{ width: `${step * 10}%` }}
            ></div>
          </div>
        </div>
      )}

      {/* Wizard Body */}
      <div className="p-6 sm:p-8 min-h-[400px]">
        {/* STEP 1: CHOOSE BRANCH */}
        {step === 1 && (
          <div className="space-y-4">
            <p className="text-xs text-amore-charcoal/60 font-light mb-6">
              Please select the salon location where you would like to book your treatment:
            </p>
            <div className="grid grid-cols-1 gap-3">
              {branches.map((b) => (
                <button
                  key={b.id}
                  onClick={() => setSelectedBranchId(b.id)}
                  className={`w-full text-left p-4 rounded-lg border transition-all flex items-start justify-between ${
                    selectedBranchId === b.id
                      ? 'border-amore-gold bg-amore-blush/10 ring-1 ring-amore-gold'
                      : 'border-amore-border hover:border-amore-gold-light/40 bg-white'
                  }`}
                >
                  <div className="space-y-1">
                    <p className="font-serif text-sm font-bold text-amore-charcoal">{b.name}</p>
                    <p className="text-[11px] text-amore-charcoal/60 leading-normal flex items-start gap-1 font-light">
                      <MapPin className="h-3 w-3 text-amore-gold shrink-0 mt-0.5" />
                      <span>{b.address}</span>
                    </p>
                  </div>
                  {selectedBranchId === b.id && (
                    <div className="bg-amore-gold text-white p-1 rounded-full shrink-0">
                      <Check className="h-3 w-3" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 2: CHOOSE CATEGORY */}
        {step === 2 && (
          <div className="space-y-4">
            <p className="text-xs text-amore-charcoal/60 font-light mb-6">
              Select a service category to discover our treatments:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {categories.map((c) => (
                <button
                  key={c.id}
                  onClick={() => {
                    setSelectedCategoryId(c.id);
                    setSelectedServices([]); // reset selected services when category changes
                  }}
                  className={`text-left p-5 rounded-xl border transition-all flex flex-col justify-between h-36 ${
                    selectedCategoryId === c.id
                      ? 'border-amore-gold bg-amore-blush/20 ring-1 ring-amore-gold'
                      : 'border-amore-border hover:border-amore-gold-light/40 bg-white'
                  }`}
                >
                  <div className="space-y-1">
                    <h3 className="font-serif text-base font-bold text-amore-charcoal">{c.name}</h3>
                    <p className="text-[11px] text-amore-charcoal/65 leading-normal font-light line-clamp-2">
                      {c.description}
                    </p>
                  </div>
                  {selectedCategoryId === c.id && (
                    <span className="self-end bg-amore-gold text-white text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                      Selected
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 3: CHOOSE SERVICES */}
        {step === 3 && (
          <div className="space-y-4">
            <div className="flex justify-between items-center border-b border-amore-border pb-3 mb-4">
              <p className="text-xs text-amore-charcoal/60 font-light">
                Select one or more services from <span className="font-semibold">{activeCategory?.name}</span>:
              </p>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setGenderPricing('female');
                    setSelectedServices([]);
                  }}
                  className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded transition-all ${
                    genderPricing === 'female' ? 'bg-amore-charcoal text-white' : 'bg-amore-cream border text-amore-charcoal/70'
                  }`}
                >
                  Hers
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setGenderPricing('male');
                    setSelectedServices([]);
                  }}
                  className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded transition-all ${
                    genderPricing === 'male' ? 'bg-amore-charcoal text-white' : 'bg-amore-cream border text-amore-charcoal/70'
                  }`}
                >
                  His Pricing
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 max-h-[350px] overflow-y-auto pr-1">
              {availableServices.map((s) => {
                const isSelected = selectedServices.includes(s.id);
                const price = genderPricing === 'male' && s.price_male ? s.price_male : s.price_female;

                return (
                  <button
                    key={s.id}
                    onClick={() => {
                      if (isSelected) {
                        setSelectedServices(prev => prev.filter(id => id !== s.id));
                      } else {
                        setSelectedServices(prev => [...prev, s.id]);
                      }
                    }}
                    className={`w-full text-left p-4 rounded-lg border transition-all flex items-center justify-between ${
                      isSelected
                        ? 'border-amore-gold bg-amore-blush/10 ring-1 ring-amore-gold'
                        : 'border-amore-border hover:border-amore-gold-light/40 bg-white'
                    }`}
                  >
                    <div className="space-y-1 pr-4">
                      <div className="flex items-center gap-2">
                        <span className="font-serif text-sm font-bold text-amore-charcoal">{s.name}</span>
                        {s.is_popular && (
                          <span className="bg-amore-gold/15 text-amore-gold text-[8px] uppercase tracking-wider px-1.5 py-0.5 rounded font-bold">
                            Best
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-amore-charcoal/60 leading-normal font-light line-clamp-1">
                        {s.description}
                      </p>
                      <p className="text-[10px] text-amore-charcoal/40 flex items-center gap-1 font-light">
                        <Clock className="h-3 w-3" /> {s.duration_minutes} Mins
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="font-serif text-sm font-bold text-amore-gold block">R{price}</span>
                      {isSelected && <span className="text-[9px] uppercase tracking-wider text-amore-gold font-bold">Added</span>}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 4: CHOOSE ADD-ONS */}
        {step === 4 && (
          <div className="space-y-4">
            <p className="text-xs text-amore-charcoal/60 font-light mb-6">
              Would you like to add any service enhancements or removals to your booking? (Optional)
            </p>

            {availableAddons.length === 0 ? (
              <div className="text-center py-12 bg-amore-cream/10 border border-dashed rounded-lg">
                <p className="text-xs font-light text-amore-charcoal/50">
                  No add-ons available for the selected services. Feel free to skip to the next step.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {availableAddons.map((addon) => {
                  const isChecked = selectedAddons.includes(addon.id);
                  return (
                    <button
                      key={addon.id}
                      onClick={() => {
                        if (isChecked) {
                          setSelectedAddons(prev => prev.filter(id => id !== addon.id));
                        } else {
                          setSelectedAddons(prev => [...prev, addon.id]);
                        }
                      }}
                      className={`w-full text-left p-3.5 rounded-lg border transition-all flex items-center justify-between ${
                        isChecked
                          ? 'border-amore-gold bg-amore-blush/10 ring-1 ring-amore-gold'
                          : 'border-amore-border hover:border-amore-gold-light/40 bg-white'
                      }`}
                    >
                      <div className="space-y-1 pr-4">
                        <span className="text-xs font-bold text-amore-charcoal">{addon.name}</span>
                        <p className="text-[10px] text-amore-charcoal/50 leading-normal font-light">
                          {addon.description} • +{addon.duration_minutes} mins duration
                        </p>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="text-xs font-bold text-amore-gold block">+R{addon.price}</span>
                        {isChecked && <span className="text-[9px] uppercase tracking-wider text-amore-gold font-bold">Selected</span>}
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* STEP 5: CHOOSE STAFF */}
        {step === 5 && (
          <div className="space-y-4">
            <p className="text-xs text-amore-charcoal/60 font-light mb-6">
              Select your preferred beauty therapist or choose "Any Available" for maximum scheduling slots:
            </p>
            <div className="grid grid-cols-1 gap-3">
              {/* Any Available Option */}
              <button
                onClick={() => setSelectedStaffId('any')}
                className={`w-full text-left p-4 rounded-lg border transition-all flex items-center justify-between ${
                  selectedStaffId === 'any'
                    ? 'border-amore-gold bg-amore-blush/10 ring-1 ring-amore-gold'
                    : 'border-amore-border hover:border-amore-gold-light/40 bg-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="bg-amore-gold/10 p-2.5 rounded-full text-amore-gold shrink-0">
                    <User className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-serif text-sm font-bold text-amore-charcoal">Any Available Therapist</h3>
                    <p className="text-[10px] text-amore-charcoal/50 leading-normal font-light">
                      Locks in the fastest slots. Best for tight schedules.
                    </p>
                  </div>
                </div>
                {selectedStaffId === 'any' && (
                  <div className="bg-amore-gold text-white p-1 rounded-full shrink-0">
                    <Check className="h-3 w-3" />
                  </div>
                )}
              </button>

              {/* Seeded Therapists */}
              {staffList.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setSelectedStaffId(t.id)}
                  className={`w-full text-left p-4 rounded-lg border transition-all flex items-center justify-between ${
                    selectedStaffId === t.id
                      ? 'border-amore-gold bg-amore-blush/10 ring-1 ring-amore-gold'
                      : 'border-amore-border hover:border-amore-gold-light/40 bg-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={t.image_url}
                      alt={t.name}
                      className="h-12 w-12 rounded-full object-cover border border-amore-gold-light/30 shrink-0"
                    />
                    <div>
                      <h3 className="font-serif text-sm font-bold text-amore-charcoal">{t.name}</h3>
                      <p className="text-[10px] text-amore-gold font-medium uppercase tracking-wider">{t.title}</p>
                      <p className="text-[10px] text-amore-charcoal/50 leading-normal font-light line-clamp-1">
                        {t.bio}
                      </p>
                    </div>
                  </div>
                  {selectedStaffId === t.id && (
                    <div className="bg-amore-gold text-white p-1 rounded-full shrink-0">
                      <Check className="h-3 w-3" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 6: DATE & TIME */}
        {step === 6 && (
          <div className="space-y-6">
            <p className="text-xs text-amore-charcoal/60 font-light">
              Choose your preferred date and time slot:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Date Input */}
              <div className="space-y-2">
                <label className="text-[11px] uppercase tracking-wider text-amore-charcoal/60 font-semibold flex items-center gap-1.5">
                  <CalendarIcon className="h-3.5 w-3.5 text-amore-gold" /> Select Date
                </label>
                <input
                  type="date"
                  min={getMinDate()}
                  max={getMaxDate()}
                  value={bookingDate}
                  onChange={(e) => setBookingDate(e.target.value)}
                  className="amore-input text-xs"
                />
              </div>

              {/* Time Slots Selector */}
              <div className="space-y-2">
                <label className="text-[11px] uppercase tracking-wider text-amore-charcoal/60 font-semibold flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 text-amore-gold" /> Select Time
                </label>
                {bookingDate ? (
                  <div className="grid grid-cols-3 gap-2 max-h-48 overflow-y-auto pr-1 border border-amore-border p-2 rounded bg-amore-cream/15">
                    {timeSlots.map((time) => (
                      <button
                        key={time}
                        onClick={() => setBookingTime(time)}
                        className={`py-2 text-[11px] font-semibold rounded text-center border transition-all ${
                          bookingTime === time
                            ? 'bg-amore-charcoal text-white border-amore-charcoal shadow-sm'
                            : 'bg-white border-amore-border text-amore-charcoal/80 hover:border-amore-gold-light/60 hover:text-amore-gold'
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 text-center border border-dashed rounded-lg text-xs font-light text-amore-charcoal/40 bg-amore-cream/5">
                    Please select a date first to view available time slots.
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* STEP 7: INTAKE FORM */}
        {step === 7 && (
          <div className="space-y-6">
            <div className="bg-amore-blush/40 border border-amore-blush-border/30 p-4 rounded-lg">
              <h3 className="font-serif text-sm font-bold text-amore-charcoal flex items-center gap-1.5">
                <FileText className="h-4 w-4 text-amore-gold" />
                Service-Specific Intake Profile
              </h3>
              <p className="text-[10px] text-amore-charcoal/70 leading-normal font-light mt-1">
                In compliance with beauty safety regulations and the POPI Act, please complete the questions below. Your answers are stored securely and reviewed only by your therapist.
              </p>
            </div>

            <div className="space-y-5 max-h-[380px] overflow-y-auto pr-1">
              {intakeQuestions.map((q) => {
                const isRequired = q.is_required;
                const value = intakeResponses[q.id] || '';

                return (
                  <div key={q.id} className="space-y-2">
                    <label className="block text-xs font-semibold text-amore-charcoal">
                      {q.question_text}{' '}
                      {isRequired && <span className="text-red-500 font-bold">*</span>}
                    </label>

                    {/* TEXT input */}
                    {q.question_type === 'text' && (
                      <input
                        type="text"
                        value={value}
                        onChange={(e) => setIntakeResponses(prev => ({ ...prev, [q.id]: e.target.value }))}
                        placeholder="Write your answer..."
                        className="amore-input text-xs"
                      />
                    )}

                    {/* TEXTAREA input */}
                    {q.question_type === 'textarea' && (
                      <textarea
                        value={value}
                        onChange={(e) => setIntakeResponses(prev => ({ ...prev, [q.id]: e.target.value }))}
                        placeholder="Detail here (allergies, skin conditions, muscle pains, etc.)..."
                        rows={3}
                        className="amore-input text-xs"
                      />
                    )}

                    {/* SELECT dropdown */}
                    {q.question_type === 'select' && q.options && (
                      <select
                        value={value}
                        onChange={(e) => setIntakeResponses(prev => ({ ...prev, [q.id]: e.target.value }))}
                        className="amore-input text-xs"
                      >
                        <option value="">-- Choose Option --</option>
                        {q.options.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    )}

                    {/* RADIO buttons */}
                    {q.question_type === 'radio' && q.options && (
                      <div className="flex flex-col sm:flex-row gap-4 bg-amore-cream/20 p-3 rounded border border-amore-border/40">
                        {q.options.map((opt) => (
                          <label key={opt} className="flex items-center gap-2 text-xs font-medium cursor-pointer">
                            <input
                              type="radio"
                              name={q.id}
                              value={opt}
                              checked={value === opt}
                              onChange={(e) => setIntakeResponses(prev => ({ ...prev, [q.id]: e.target.value }))}
                              className="accent-amore-gold h-4 w-4"
                            />
                            {opt}
                          </label>
                        ))}
                      </div>
                    )}

                    {/* CHECKBOX consent */}
                    {q.question_type === 'checkbox' && (
                      <div className="flex items-start gap-2 bg-amore-cream/30 p-3 rounded border border-amore-border/40 mt-2">
                        <input
                          type="checkbox"
                          id={q.id}
                          checked={value === 'true' || value === 'I consent'}
                          onChange={(e) =>
                            setIntakeResponses(prev => ({
                              ...prev,
                              [q.id]: e.target.checked ? 'I consent' : ''
                            }))
                          }
                          className="accent-amore-gold h-4 w-4 shrink-0 mt-0.5"
                        />
                        <label htmlFor={q.id} className="text-[11px] font-medium text-amore-charcoal leading-normal cursor-pointer select-none">
                          I acknowledge and give consent to Amore Nails & Beauty Lounge to perform this beauty treatment.
                        </label>
                      </div>
                    )}

                    {/* FILE input */}
                    {q.question_type === 'file' && (
                      <div className="mt-1 flex items-center justify-center border-2 border-amore-gold-light/20 border-dashed rounded-lg px-6 py-4 bg-amore-cream/10 hover:bg-amore-cream/20 transition-all">
                        <div className="space-y-1 text-center">
                          <Upload className="mx-auto h-8 w-8 text-amore-gold-light" />
                          <div className="flex text-xs text-amore-charcoal/60">
                            <label className="relative cursor-pointer bg-white rounded-md font-semibold text-amore-gold hover:text-amore-charcoal focus-within:outline-none">
                              <span>Upload reference photo</span>
                              <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="sr-only"
                              />
                            </label>
                          </div>
                          <p className="text-[10px] text-amore-charcoal/40 font-light">PNG, JPG, GIF up to 5MB</p>
                          {inspirationFileName && (
                            <p className="text-[10px] text-amore-gold font-bold">Selected: {inspirationFileName}</p>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 8: INTAKE FILE UPLOAD (Extra Lookbook step if not in Form questions) */}
        {step === 8 && (
          <div className="space-y-4">
            <p className="text-xs text-amore-charcoal/60 font-light mb-6">
              Do you have a specific nail/lash design or inspiration image you would like to upload for your therapist? (Optional)
            </p>
            <div className="flex flex-col items-center justify-center border-2 border-amore-gold-light/20 border-dashed rounded-xl px-8 py-10 bg-amore-cream/5 hover:bg-amore-cream/10 transition-all">
              <Upload className="h-10 w-10 text-amore-gold mb-3" />
              <label className="cursor-pointer bg-amore-charcoal hover:bg-amore-gold text-amore-cream hover:text-white px-4 py-2 rounded text-xs font-bold uppercase tracking-wider transition-all focus:outline-none">
                Choose Inspiration Image
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="sr-only"
                />
              </label>
              <p className="text-[10px] text-amore-charcoal/40 mt-2">
                Accepted: JPG, JPEG, PNG. Maximum 5MB size.
              </p>
              {inspirationFileName && (
                <div className="mt-4 p-3 bg-amore-blush/30 rounded border flex items-center gap-2 text-xs text-amore-charcoal">
                  <CheckCircle className="h-4 w-4 text-[#25D366]" />
                  <span>Uploaded: <span className="font-semibold text-amore-gold">{inspirationFileName}</span></span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* STEP 9: BOOKING INFO */}
        {step === 9 && (
          <div className="space-y-4">
            <p className="text-xs text-amore-charcoal/60 font-light mb-6">
              Please enter your contact details to complete the booking schedule. If you are a member, we will check your loyalty balance:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[11px] uppercase tracking-wider text-amore-charcoal/60 font-semibold">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="e.g. Sarah Jenkins"
                  className="amore-input text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] uppercase tracking-wider text-amore-charcoal/60 font-semibold">
                  WhatsApp Cell Phone
                </label>
                <input
                  type="tel"
                  required
                  value={clientPhone}
                  onChange={(e) => setClientPhone(e.target.value)}
                  placeholder="e.g. 076 123 4567"
                  className="amore-input text-xs"
                />
              </div>

              <div className="space-y-1 sm:col-span-2">
                <label className="text-[11px] uppercase tracking-wider text-amore-charcoal/60 font-semibold">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={clientEmail}
                  onChange={(e) => setClientEmail(e.target.value)}
                  placeholder="e.g. sarah@example.co.za"
                  className="amore-input text-xs"
                />
              </div>

              {/* Loyalty adjustment check if email is typed */}
              {clientEmail.trim() !== '' && clientLoyaltyBalance > 0 && (
                <div className="sm:col-span-2 bg-amore-blush/20 border border-amore-gold-light/20 p-4 rounded-lg flex items-center justify-between mt-2">
                  <div className="space-y-0.5">
                    <p className="text-xs font-bold text-amore-charcoal flex items-center gap-1">
                      <Gift className="h-4 w-4 text-amore-gold" />
                      Amore Loyalty Club Detected!
                    </p>
                    <p className="text-[10px] text-amore-charcoal/60 font-light">
                      You have an active balance of <span className="font-semibold">{clientLoyaltyBalance} loyalty points</span> (R{clientLoyaltyBalance} value).
                    </p>
                  </div>
                  <label className="flex items-center gap-2 text-xs font-semibold cursor-pointer">
                    <input
                      type="checkbox"
                      checked={useLoyaltyPoints}
                      onChange={(e) => setUseLoyaltyPoints(e.target.checked)}
                      className="accent-amore-gold h-4 w-4"
                    />
                    Redeem Points
                  </label>
                </div>
              )}

              <div className="space-y-1 sm:col-span-2">
                <label className="text-[11px] uppercase tracking-wider text-amore-charcoal/60 font-semibold">
                  Special Notes / Requests
                </label>
                <textarea
                  value={clientNotes}
                  onChange={(e) => setClientNotes(e.target.value)}
                  placeholder="e.g. Sensitive to strong monomers, soak-off is from another salon, etc..."
                  rows={2}
                  className="amore-input text-xs"
                />
              </div>

              {/* Legal Consents checkboxes */}
              <div className="sm:col-span-2 bg-amore-cream/35 border border-amore-border/30 p-4 rounded-lg space-y-3 mt-2">
                <div className="flex items-start gap-2">
                  <input
                    type="checkbox"
                    id="consent-po"
                    required
                    checked={policyConsent}
                    onChange={(e) => setPolicyConsent(e.target.checked)}
                    className="accent-amore-gold h-4 w-4 shrink-0 mt-0.5"
                  />
                  <label htmlFor="consent-po" className="text-[10px] text-amore-charcoal/80 leading-normal cursor-pointer select-none">
                    I agree to the <span className="font-semibold text-amore-gold">POPIA Privacy Notice</span>, the <span className="font-semibold text-amore-gold">24-hour Cancellation Fee (50%)</span>, and the <span className="font-semibold text-amore-gold">Deposit Policies</span>. I consent to secure intake storage.
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 10: REVIEW & SECURE */}
        {step === 10 && (
          <div className="space-y-6">
            <p className="text-xs text-amore-charcoal/60 font-light">
              Please review your booking details before confirmation:
            </p>

            <div className="border border-amore-gold-light/20 rounded-xl overflow-hidden shadow-sm bg-amore-cream/10">
              {/* Branch/Time detail header */}
              <div className="bg-amore-charcoal text-white p-4 flex justify-between items-center text-xs">
                <div>
                  <p className="font-semibold">{activeBranch?.name}</p>
                  <p className="text-[10px] text-white/60 font-light">{activeBranch?.address}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">{bookingDate}</p>
                  <p className="text-[10px] text-amore-gold-light font-bold">At {bookingTime}</p>
                </div>
              </div>

              {/* Services Breakdown */}
              <div className="p-4 space-y-3">
                <p className="text-[10px] uppercase tracking-wider text-amore-charcoal/50 font-bold border-b pb-1">
                  Selected Treatments
                </p>
                {selectedServices.map((id) => {
                  const s = services.find((srv) => srv.id === id)!;
                  const price = genderPricing === 'male' && s.price_male ? s.price_male : s.price_female;
                  return (
                    <div key={s.id} className="flex justify-between items-center text-xs">
                      <div>
                        <span className="font-semibold">{s.name}</span>
                        <span className="text-[10px] text-amore-charcoal/50 block font-light">
                          {s.duration_minutes} mins • {genderPricing === 'male' ? 'His pricing' : 'Hers pricing'}
                        </span>
                      </div>
                      <span className="font-serif text-amore-charcoal font-bold">R{price}</span>
                    </div>
                  );
                })}

                {/* Addons if any */}
                {selectedAddons.length > 0 && (
                  <>
                    <p className="text-[10px] uppercase tracking-wider text-amore-charcoal/50 font-bold border-b pb-1 pt-2">
                      Treatment Addons
                    </p>
                    {selectedAddons.map((id) => {
                      const a = allAddons.find((ad) => ad.id === id)!;
                      return (
                        <div key={a.id} className="flex justify-between items-center text-xs">
                          <span className="font-medium">{a.name}</span>
                          <span className="font-serif text-amore-charcoal font-bold">+R{a.price}</span>
                        </div>
                      );
                    })}
                  </>
                )}

                {/* Staff Selection */}
                <div className="flex justify-between items-center text-xs border-t pt-3 mt-3">
                  <span className="text-amore-charcoal/60 font-light">Beauty Therapist:</span>
                  <span className="font-semibold text-amore-charcoal">
                    {selectedStaffId === 'any' ? 'Any Available Specialist' : activeStaff?.name}
                  </span>
                </div>

                {/* Loyalty Point Deductions */}
                {loyaltyDiscount > 0 && (
                  <div className="flex justify-between items-center text-xs text-red-600 font-semibold">
                    <span>Amore Loyalty Reward Discount:</span>
                    <span>-R{loyaltyDiscount}</span>
                  </div>
                )}

                {/* Total Price & Deposit Requirement */}
                <div className="border-t border-amore-gold-light/20 pt-3 flex flex-col gap-1 items-end">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-amore-charcoal/60 font-light">Total Price:</span>
                    <span className="font-serif text-xl font-bold text-amore-gold">R{subtotal}</span>
                  </div>
                  {depositAmount > 0 ? (
                    <div className="text-[10px] text-[#A16207] bg-amore-gold/10 px-2.5 py-1 rounded font-semibold border border-amore-gold-light/20 mt-1">
                      R{depositAmount} (50% Deposit) Paid Securely Online / EFT
                    </div>
                  ) : (
                    <span className="text-[9px] text-amore-charcoal/40 font-light italic">
                      Zero deposit required. Pay at salon.
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Deposit Secure Notification */}
            {depositAmount > 0 && (
              <div className="bg-amore-blush/20 border border-amore-gold-light/20 p-4 rounded-xl flex items-center gap-3">
                <CreditCard className="h-5 w-5 text-amore-gold shrink-0" />
                <p className="text-[11px] text-amore-charcoal/70 leading-normal font-light">
                  <span className="font-bold">Secured booking activated:</span> High-value services require a 50% deposit to avoid therapist no-shows. An automated confirmation ticket will be logged instantly.
                </p>
              </div>
            )}
          </div>
        )}

        {/* STEP 11: CONFIRMATION SUCCESS SCREEN */}
        {step === 11 && createdBooking && (
          <div className="space-y-6 text-center py-6 animate-in fade-in duration-300">
            <div className="mx-auto bg-[#25D366]/10 text-[#25D366] p-4 rounded-full w-16 h-16 flex items-center justify-center shadow-inner">
              <CheckCircle className="h-10 w-10" />
            </div>

            <div className="space-y-2">
              <h2 className="font-serif text-2xl sm:text-3xl text-amore-charcoal">
                Booking <span className="italic font-light text-amore-gold">Successfully Confirmed!</span>
              </h2>
              <p className="text-xs text-amore-charcoal/50 font-light">
                Appointment Reference: <span className="font-bold text-amore-charcoal">{createdBooking.id}</span>
              </p>
              <p className="text-xs text-amore-charcoal/70 max-w-md mx-auto font-light leading-relaxed">
                Thank you, <span className="font-semibold">{createdBooking.client_name}</span>. Your slot is locked. An instant confirmation ticket has been dispatched to <span className="font-medium text-amore-gold">{createdBooking.client_phone}</span> via WhatsApp.
              </p>
            </div>

            {/* Preparation & Aftercare Accordion Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left pt-6 border-t border-amore-border/30">
              {/* Preparation Panel */}
              <div className="bg-amore-cream/30 border border-amore-border/40 p-4 rounded-xl space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-amore-gold flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5" /> Service Prep Advice
                </h3>
                <ul className="space-y-1.5 text-[11px] font-light text-amore-charcoal/70 list-disc pl-4 leading-normal">
                  {getPrepInstructions().map((inst, i) => (
                    <li key={i}>{inst}</li>
                  ))}
                </ul>
              </div>

              {/* Aftercare Panel */}
              <div className="bg-amore-blush/30 border border-amore-blush-border/20 p-4 rounded-xl space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-amore-gold flex items-center gap-1.5">
                  <Heart className="h-3.5 w-3.5" /> Treatment Aftercare
                </h3>
                <ul className="space-y-1.5 text-[11px] font-light text-amore-charcoal/70 list-disc pl-4 leading-normal">
                  {getAftercareInstructions().map((inst, i) => (
                    <li key={i}>{inst}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Quick Actions Links */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6 border-t border-amore-border/30 mt-6">
              <Link
                href="/portal"
                className="w-full sm:w-auto px-6 py-2.5 text-xs font-bold uppercase tracking-wider bg-amore-charcoal hover:bg-amore-gold text-amore-cream hover:text-white rounded transition-all focus:outline-none"
              >
                Go to Client Portal
              </Link>
              <Link
                href="/"
                className="w-full sm:w-auto px-6 py-2.5 text-xs font-bold uppercase tracking-wider border text-amore-charcoal rounded hover:bg-amore-cream/30 transition-all focus:outline-none"
              >
                Return Home
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Wizard Footer Controls */}
      {step < 11 && (
        <div className="bg-amore-cream/35 border-t border-amore-border/30 px-6 py-4 flex justify-between items-center">
          <button
            type="button"
            onClick={handleBack}
            disabled={step === 1}
            className={`flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded transition-all focus:outline-none ${
              step === 1
                ? 'text-amore-charcoal/20 cursor-not-allowed'
                : 'text-amore-charcoal/70 hover:text-amore-charcoal'
            }`}
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back
          </button>

          {step < 10 ? (
            <button
              type="button"
              onClick={handleNext}
              disabled={!canGoNext()}
              className={`flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider px-6 py-2.5 rounded transition-all focus:outline-none ${
                canGoNext()
                  ? 'bg-amore-charcoal hover:bg-amore-gold text-amore-cream hover:text-white shadow-sm'
                  : 'bg-amore-charcoal/20 text-amore-cream/60 cursor-not-allowed'
              }`}
            >
              Continue <ArrowRight className="h-3.5 w-3.5" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleConfirmBooking}
              disabled={!canGoNext()}
              className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider px-8 py-3 bg-[#25D366] hover:bg-[#1ebd59] text-white shadow-lg rounded transition-all focus:outline-none"
            >
              Confirm Appointment
            </button>
          )}
        </div>
      )}
    </div>
  );
}
