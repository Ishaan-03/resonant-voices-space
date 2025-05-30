
import { Link } from 'react-router-dom';
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import RegisterForm from "@/components/auth/RegisterForm";
import ParticleBackground from "@/components/three/ParticleBackground";

const RegisterPage = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <main className="pt-20 pb-16 px-4">
        <ParticleBackground />
        <div className="container mx-auto max-w-screen-xl relative z-10">
          <div className="flex flex-col items-center justify-center min-h-[70vh]">
            <div className="w-full max-w-md">
              <RegisterForm />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RegisterPage;
