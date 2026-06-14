'use client';

import { useState } from 'react';
import { MessageSquare, X, ExternalLink } from 'lucide-react';

interface WhatsAppButtonProps {
  branchSlug?: string;
}

export default function WhatsAppButton({ branchSlug }: WhatsAppButtonProps) {
  const [showDropdown, setShowDropdown] = useState(false);

  const branches = [
    { name: 'The Colosseum', phone: '076 659 8811', whatsapp: '27766598811' },
    { name: 'Century Village', phone: '076 936 8190', whatsapp: '27769368190' },
    { name: 'Brackenfell', phone: '072 468 4241', whatsapp: '27724684241' },
    { name: 'Bothasig Square', phone: '060 669 5785', whatsapp: '27606695785' },
    { name: 'Pinelands', phone: '072 748 1021', whatsapp: '27727481021' },
    { name: 'N1 Value Centre', phone: '082 904 8642', whatsapp: '27829048642' },
  ];

  // If we are on a specific branch page, we find that branch
  const activeBranch = branchSlug
    ? branches.find((b) => b.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') === branchSlug || b.whatsapp.includes(branchSlug))
    : null;

  const handleWhatsAppRedirect = (whatsappNum: string, branchName: string) => {
    const message = encodeURIComponent(`Hi Amore Nails & Beauty Lounge (${branchName}), I'd like to ask about your services/bookings...`);
    window.open(`https://wa.me/${whatsappNum}?text=${message}`, '_blank');
    setShowDropdown(false);
  };

  if (activeBranch) {
    return (
      <button
        onClick={() => handleWhatsAppRedirect(activeBranch.whatsapp, activeBranch.name)}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2 bg-[#25D366] text-white px-5 py-3 rounded-full shadow-lg hover:bg-[#1ebd59] transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2"
        aria-label={`Chat with Amore Nails ${activeBranch.name} on WhatsApp`}
      >
        {/* Simple inline SVG for WhatsApp */}
        <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
          <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 0 0 1.333 4.982L2 22l5.202-1.362a9.927 9.927 0 0 0 4.808 1.237h.005c5.507 0 9.99-4.478 9.99-9.986 0-2.67-1.037-5.18-2.92-7.062A9.92 9.92 0 0 0 12.012 2zm5.856 14.152c-.247.696-1.432 1.357-1.964 1.44-.482.075-.997.127-3.13-.75-2.73-1.12-4.46-3.888-4.597-4.072-.137-.184-1.112-1.48-1.112-2.825 0-1.344.706-2.003.955-2.268.248-.266.549-.332.732-.332.183 0 .365.002.525.01.166.007.388-.063.607.462.227.543.778 1.895.846 2.03.069.136.114.294.023.478-.09.184-.137.3-.274.462-.137.162-.288.363-.411.488-.137.137-.282.287-.12.565.162.278.718 1.18 1.54 1.91 1.057.94 1.948 1.23 2.223 1.368.275.137.435.114.595-.068.16-.182.687-.796.87-1.07.183-.272.366-.227.617-.136.252.09 1.597.753 1.872.89.275.136.458.204.526.319.069.115.069.664-.178 1.36z" />
        </svg>
        <span className="text-sm font-semibold tracking-wide">WhatsApp Us</span>
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {/* Dropdown Card */}
      {showDropdown && (
        <div className="mb-3 w-72 amore-glass rounded-xl shadow-2xl p-4 border border-amore-gold-light/30 animate-in fade-in slide-in-from-bottom-5 duration-200">
          <div className="flex items-center justify-between border-b border-amore-border pb-2 mb-2">
            <span className="font-serif text-sm font-bold text-amore-charcoal">
              WhatsApp Support
            </span>
            <button
              onClick={() => setShowDropdown(false)}
              className="p-1 hover:bg-amore-border rounded-full transition-colors text-amore-charcoal/50 hover:text-amore-charcoal"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <p className="text-[11px] text-amore-charcoal/70 mb-3 leading-normal">
            Choose a branch to chat directly with our team on WhatsApp:
          </p>
          <div className="space-y-1.5 max-h-48 overflow-y-auto">
            {branches.map((b) => (
              <button
                key={b.name}
                onClick={() => handleWhatsAppRedirect(b.whatsapp, b.name)}
                className="w-full flex items-center justify-between text-left px-3 py-2 text-xs text-amore-charcoal hover:bg-amore-gold/10 rounded-md transition-colors border border-transparent hover:border-amore-gold-light/20"
              >
                <span>{b.name}</span>
                <span className="text-[10px] text-amore-charcoal/50 flex items-center gap-1">
                  Chat Now <ExternalLink className="h-2.5 w-2.5" />
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Floating Toggle Button */}
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="flex items-center justify-center h-14 w-14 rounded-full bg-[#25D366] text-white shadow-xl hover:bg-[#1ebd59] transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2"
        aria-label="Open WhatsApp Support branch selector"
      >
        {showDropdown ? (
          <X className="h-6 w-6" />
        ) : (
          <svg className="h-7 w-7 fill-current" viewBox="0 0 24 24">
            <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 0 0 1.333 4.982L2 22l5.202-1.362a9.927 9.927 0 0 0 4.808 1.237h.005c5.507 0 9.99-4.478 9.99-9.986 0-2.67-1.037-5.18-2.92-7.062A9.92 9.92 0 0 0 12.012 2zm5.856 14.152c-.247.696-1.432 1.357-1.964 1.44-.482.075-.997.127-3.13-.75-2.73-1.12-4.46-3.888-4.597-4.072-.137-.184-1.112-1.48-1.112-2.825 0-1.344.706-2.003.955-2.268.248-.266.549-.332.732-.332.183 0 .365.002.525.01.166.007.388-.063.607.462.227.543.778 1.895.846 2.03.069.136.114.294.023.478-.09.184-.137.3-.274.462-.137.162-.288.363-.411.488-.137.137-.282.287-.12.565.162.278.718 1.18 1.54 1.91 1.057.94 1.948 1.23 2.223 1.368.275.137.435.114.595-.068.16-.182.687-.796.87-1.07.183-.272.366-.227.617-.136.252.09 1.597.753 1.872.89.275.136.458.204.526.319.069.115.069.664-.178 1.36z" />
          </svg>
        )}
      </button>
    </div>
  );
}
