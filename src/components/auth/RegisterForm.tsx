
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { toast } from "@/components/ui/use-toast";
import { register } from '@/api';

const RegisterForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please ensure both passwords match.",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }
    
    setLoading(true);
    
    try {
      // Register user via API
      const { confirmPassword, ...registerData } = formData;
      await register(registerData);
      
      toast({
        title: "Registration successful!",
        description: "Welcome to Echoed Thoughts. You can now log in.",
        duration: 3000,
      });
      
      navigate('/login');
    } catch (error: any) {
      console.error('Registration error:', error);
      toast({
        title: "Registration failed",
        description: error.response?.data?.message || "There was an error during registration. Please try again.",
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="glass-card p-8 w-full max-w-md">
      <h2 className="text-2xl font-serif font-bold text-white mb-6">Create an account</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-white mb-2">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Your full name"
            className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-white/50"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="email" className="block text-white mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Your email address"
            className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-white/50"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="password" className="block text-white mb-2">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              placeholder="Create a password"
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-white/50"
              value={formData.password}
              onChange={handleChange}
              required
              minLength={8}
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-white"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
          <p className="mt-1 text-sm text-white/50">
            Password must be at least 8 characters long
          </p>
        </div>
        
        <div className="mb-6">
          <label htmlFor="confirmPassword" className="block text-white mb-2">
            Confirm Password
          </label>
          <input
            type={showPassword ? 'text' : 'password'}
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Confirm your password"
            className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-white/50"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>
        
        <button
          type="submit"
          className="w-full px-4 py-3 bg-white text-black font-medium rounded-md hover:bg-white/90 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
          disabled={loading}
        >
          {loading ? 'Creating account...' : 'Sign up'}
        </button>
      </form>
      
      <div className="mt-6 text-center">
        <p className="text-white/70">
          Already have an account?{' '}
          <Link to="/login" className="text-white hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
