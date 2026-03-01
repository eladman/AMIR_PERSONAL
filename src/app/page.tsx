import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Topics from "@/components/Topics";
import Format from "@/components/Format";
import Audience from "@/components/Audience";
import Closing from "@/components/Closing";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Topics />
      <Format />
      <Audience />
      <Closing />
      <Footer />
    </main>
  );
}
