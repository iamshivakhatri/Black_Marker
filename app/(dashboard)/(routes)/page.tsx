import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { PenLine } from 'lucide-react';

export default function Home() {

  

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-br from-gray-100 to-black-gray p-4">
      <header className="text-center mt-10">
        <h1 className="text-4xl font-bold text-black-900">Welcome to Black Marker</h1>
        <p className="text-lg text-black-700 mt-2">Create your resume with ease</p>
      </header>

      <main className="flex flex-col items-center mt-16  w-full">
       
        <Link href="/resume" className="group">
          <div className="w-40 h-40 bg-white border-4 border-black-900 rounded-xl flex flex-col items-center justify-center transition-transform transform hover:scale-105 shadow-lg">
            <PenLine size={48} className="text-black-900 mb-2 group-hover:rotate-12 transition-transform" />
            <span className="text-black-900 font-semibold">Create Resume</span>
          </div>
        </Link>

        <section className="mt-20 text-center space-y-4">
          <h2 className="text-3xl font-semibold text-black-900">Why Choose Black Marker?</h2>
          <div className="flex flex-wrap justify-center gap-8">
            <FeatureCard
              icon={<PenLine size={32} className="text-black-900" />}
              title="Easy to Use"
              description="Our intuitive interface makes resume creation a breeze."
            />
            <FeatureCard
              icon={<PenLine size={32} className="text-black-900" />}
              title="Professional Templates"
              description="Choose from a variety of professionally designed templates."
            />
            <FeatureCard
              icon={<PenLine size={32} className="text-black-900" />}
              title="Free to Use"
              description="Create and download your resume for free."
            />
          </div>
        </section>
      </main>
      <footer className="mt-auto  text-center">
        <p className="text-black-700">&copy; 2024 Black Marker. All rights reserved. Developed with Love by Shiva Khatri</p>
      </footer>

      
    </div>
  );
}

interface FeatureCardProps {
  icon: React.ReactNode; // icon can be any React node
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-60 text-center">
      <div className="mb-4">{icon}</div>
      <h3 className="text-lg font-semibold text-black-900">{title}</h3>
      <p className="text-black-700">{description}</p>
    </div>
  );
}
