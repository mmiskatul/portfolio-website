import Navbar from "@/components/Navbar";
import NeuralNetworkBg from "@/components/NeuralNetworkBg";
import Hero from "@/components/Hero";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import ArchitectureLab from "@/components/ArchitectureLab";
import Projects from "@/components/Projects";
import GithubShowcase from "@/components/GithubShowcase";
import CaseStudies from "@/components/CaseStudies";
import Blog from "@/components/Blog";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-primary-bg overflow-x-hidden flex flex-col">
      {/* Dynamic Canvas Background */}
      <NeuralNetworkBg />

      {/* Navigation Headers */}
      <Navbar />

      {/* Main Sections */}
      <main className="flex-grow">
        {/* Section 1: Hero */}
        <Hero />

        {/* Section 2: Experience */}
        <Experience />

        {/* Section 3: Skills */}
        <Skills />

        {/* Section 6: AI Architecture Lab */}
        <ArchitectureLab />

        {/* Section 4: Featured Projects */}
        <Projects />

        {/* Section 5: GitHub Showcase */}
        <GithubShowcase />

        {/* Section 7: Case Studies */}
        <CaseStudies />

        {/* Section 8: Blog (Engineering Log) */}
        <Blog />

        {/* Section 9: Contact */}
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

