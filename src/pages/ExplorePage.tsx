
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Clock, Heart, MessageSquare } from 'lucide-react';
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { getPosts } from '@/api';

// Filter categories
const categories = [
  'All',
  'Creativity',
  'Psychology',
  'Digital Media',
  'Philosophy',
  'Technology'
];

const ExplorePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const params: { category?: string; search?: string } = {};
        
        if (selectedCategory !== 'All') {
          params.category = selectedCategory;
        }
        
        if (searchQuery) {
          params.search = searchQuery;
        }
        
        const response = await getPosts(params);
        setPosts(response.data);
        setError(null);
      } catch (err: any) {
        console.error('Error fetching posts:', err);
        setError(err.message || 'Failed to load posts');
      } finally {
        setLoading(false);
      }
    };
    
    // Debounce search
    const timer = setTimeout(() => {
      fetchPosts();
    }, 500);
    
    return () => clearTimeout(timer);
  }, [searchQuery, selectedCategory]);
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  };
  
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <main className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-screen-xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">Explore Thoughts</h1>
            <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
              Discover thought-provoking content from writers around the world
            </p>
            
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 max-w-2xl mx-auto">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search posts..."
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-white/50"
                  value={searchQuery}
                  onChange={handleSearch}
                />
              </div>
              
              <div className="relative w-full md:w-auto">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 h-5 w-5" />
                <select
                  className="w-full md:w-auto pl-10 pr-8 py-3 appearance-none bg-white/10 border border-white/20 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-white/50"
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                >
                  {categories.map(category => (
                    <option key={category} value={category} className="bg-gray-900">
                      {category}
                    </option>
                  ))}
                </select>
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <svg className="h-4 w-4 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          
          {loading ? (
            <div className="text-center py-12">
              <p className="text-white/70">Loading posts...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-white/70">Error: {error}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.length > 0 ? (
                posts.map(post => (
                  <div key={post.id} className="glass-card overflow-hidden rounded-xl">
                    <div className="aspect-w-16 aspect-h-9 bg-white/5">
                      <img
                        src="/placeholder.svg"
                        alt={post.title}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    
                    <div className="p-6">
                      <div className="flex items-center mb-4">
                        <span className="px-3 py-1 text-xs font-medium rounded-full bg-white/10 text-white/90">
                          {post.category}
                        </span>
                        <span className="ml-3 flex items-center text-sm text-white/60">
                          <Clock className="h-4 w-4 mr-1" /> {post.readTime || '5 min read'}
                        </span>
                      </div>
                      
                      <Link to={`/post/${post.id}`}>
                        <h3 className="text-xl font-serif font-bold mb-3 text-white hover:text-white/80 transition-colors">
                          {post.title}
                        </h3>
                      </Link>
                      
                      <p className="text-white/70 mb-6">
                        {post.excerpt}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <img 
                            src={post.author?.image || "/placeholder.svg"} 
                            alt={post.author?.name}
                            className="h-10 w-10 rounded-full bg-white/10 mr-3"
                          />
                          <span className="font-medium text-white">
                            {post.author?.name}
                          </span>
                        </div>
                        
                        <div className="flex items-center space-x-4">
                          <span className="flex items-center text-white/60">
                            <Heart className="h-4 w-4 mr-1" /> {post.likeCount || 0}
                          </span>
                          <span className="flex items-center text-white/60">
                            <MessageSquare className="h-4 w-4 mr-1" /> {post.commentCount || 0}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-16">
                  <h3 className="text-xl font-serif font-bold mb-2 text-white">No matching posts found</h3>
                  <p className="text-white/70">
                    Try adjusting your search or filter criteria
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ExplorePage;
