import Navbar from '@/components/site/Navbar';
import Footer from '@/components/site/Footer';
import WhatsAppButton from '@/components/site/WhatsAppButton';

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-amore-cream">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
