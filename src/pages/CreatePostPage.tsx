
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { createPost } from '@/api';

// Categories
const categories = [
  'Creativity',
  'Psychology',
  'Digital Media',
  'Philosophy',
  'Technology'
];

const CreatePostPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: 'Creativity'
  });
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    if (!token) {
      toast({
        title: "Authentication required",
        description: "Please log in to create a post",
        variant: "destructive",
      });
      navigate('/login');
    }
  }, [navigate]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.content || !formData.excerpt) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    
    setLoading(true);
    
    try {
      await createPost(formData);
      
      toast({
        title: "Post created!",
        description: "Your post has been published successfully",
        duration: 3000,
      });
      
      navigate('/dashboard');
    } catch (error: any) {
      console.error('Create post error:', error);
      toast({
        title: "Failed to create post",
        description: error.response?.data?.message || "An error occurred while creating your post",
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <main className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-screen-xl">
          <div className="max-w-2xl mx-auto glass-card p-8 rounded-xl">
            <h1 className="text-3xl font-serif font-bold mb-6">Create New Post</h1>
            
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="title" className="block text-white mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  placeholder="Enter post title"
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-white/50"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="excerpt" className="block text-white mb-2">
                  Excerpt/Summary *
                </label>
                <textarea
                  id="excerpt"
                  name="excerpt"
                  placeholder="Write a brief summary of your post"
                  rows={2}
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-white/50"
                  value={formData.excerpt}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="content" className="block text-white mb-2">
                  Content *
                </label>
                <textarea
                  id="content"
                  name="content"
                  placeholder="Write your post content here"
                  rows={10}
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-white/50"
                  value={formData.content}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="category" className="block text-white mb-2">
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-white/50"
                  value={formData.category}
                  onChange={handleChange}
                >
                  {categories.map(category => (
                    <option key={category} value={category} className="bg-gray-900">
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="flex justify-end space-x-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate('/dashboard')}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={loading}
                >
                  {loading ? 'Publishing...' : 'Publish Post'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CreatePostPage;
