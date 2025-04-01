
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ParticleBackground from "@/components/three/ParticleBackground";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <main className="pt-24 pb-16 px-4">
        <ParticleBackground />
        <div className="container mx-auto max-w-4xl relative z-10">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-8 text-center">About Echoed Thoughts</h1>
          
          <div className="glass-card p-8 md:p-12 mb-12">
            <h2 className="text-2xl font-serif font-bold mb-4">Our Mission</h2>
            <p className="text-white/80 mb-6">
              Echoed Thoughts was created with a simple yet powerful mission: to provide a platform where ideas can resonate and stories can matter. We believe in the power of thoughtful expression and the impact it can have on individuals and communities.
            </p>
            <p className="text-white/80">
              In a world of fleeting content and diminishing attention spans, we've built a space that values depth, nuance, and meaningful engagement. We're committed to fostering a community of thinkers, writers, and readers who value the exchange of ideas and perspectives.
            </p>
          </div>
          
          <div className="glass-card p-8 md:p-12 mb-12">
            <h2 className="text-2xl font-serif font-bold mb-4">Our Platform</h2>
            <p className="text-white/80 mb-6">
              Echoed Thoughts goes beyond traditional blogging by embracing the full spectrum of multimedia expression. Our platform supports rich text, audio, and video content, allowing creators to choose the medium that best conveys their ideas.
            </p>
            <p className="text-white/80">
              We've built powerful yet intuitive tools that make it easy to create and share content, while our engagement features foster meaningful discussions and connections between creators and their audiences.
            </p>
          </div>
          
          <div className="glass-card p-8 md:p-12">
            <h2 className="text-2xl font-serif font-bold mb-4">Join Our Community</h2>
            <p className="text-white/80 mb-6">
              Whether you're a writer looking to share your perspective, a creator exploring new mediums for expression, or a reader seeking thought-provoking content, Echoed Thoughts is the place for you.
            </p>
            <p className="text-white/80 mb-8">
              Join thousands of others who have found their home in our community, where thoughts echo through minds and ideas find their resonance.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a 
                href="/register" 
                className="px-8 py-3 rounded-full bg-white text-black font-medium hover:bg-white/90 transition-colors w-full sm:w-auto text-center"
              >
                Join Us Today
              </a>
              <a 
                href="/explore" 
                className="px-8 py-3 rounded-full bg-transparent border border-white/50 text-white font-medium hover:bg-white/10 transition-colors w-full sm:w-auto text-center"
              >
                Explore Content
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;
