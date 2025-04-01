
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { toast } from "@/components/ui/use-toast";
import { login } from '@/api';

const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
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
    setLoading(true);
    
    try {
      const response = await login(formData);
      
      // Store auth token and user data
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      
      toast({
        title: "Logged in successfully!",
        description: "Welcome back to Echoed Thoughts.",
        duration: 3000,
      });
      
      navigate('/dashboard');
    } catch (error: any) {
      console.error('Login error:', error);
      toast({
        title: "Login failed",
        description: error.response?.data?.message || "Invalid email or password. Please try again.",
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="glass-card p-8 w-full max-w-md">
      <h2 className="text-2xl font-serif font-bold text-white mb-6">Log in to your account</h2>
      
      <form onSubmit={handleSubmit}>
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
        
        <div className="mb-6">
          <label htmlFor="password" className="block text-white mb-2">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              placeholder="Your password"
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-white/50"
              value={formData.password}
              onChange={handleChange}
              required
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
          <div className="mt-2 text-right">
            <Link to="/forgot-password" className="text-sm text-white/70 hover:text-white">
              Forgot your password?
            </Link>
          </div>
        </div>
        
        <button
          type="submit"
          className="w-full px-4 py-3 bg-white text-black font-medium rounded-md hover:bg-white/90 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Log in'}
        </button>
      </form>
      
      <div className="mt-6 text-center">
        <p className="text-white/70">
          Don't have an account?{' '}
          <Link to="/register" className="text-white hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
