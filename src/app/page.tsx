import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Ticker from "@/components/Ticker";
import MethodSection from "@/components/MethodSection";
import About from "@/components/About";
import Topics from "@/components/Topics";
import Format from "@/components/Format";
import Audience from "@/components/Audience";
import Testimonials from "@/components/Testimonials";
import Closing from "@/components/Closing";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Ticker />
      <MethodSection />
      <Audience />
      <Topics />
      <About />
      {/* <Timeline /> */}
      <Format />
      <Testimonials />
      <Closing />
      <Footer />
    </main>
  );
}
