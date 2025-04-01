
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { 
  PlusCircle, 
  FileText, 
  Heart, 
  MessageSquare, 
  LogOut 
} from 'lucide-react';
import { toast } from "@/components/ui/use-toast";
import { getPosts } from '@/api';

const DashboardPage = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    
    if (!storedUser || !token) {
      toast({
        title: "Authentication required",
        description: "Please log in to access the dashboard",
        variant: "destructive",
      });
      navigate('/login');
      return;
    }
    
    setUser(JSON.parse(storedUser));
    
    // Fetch user posts
    const fetchPosts = async () => {
      try {
        const response = await getPosts();
        // Filter to only show the current user's posts
        const userPosts = response.data.filter(post => 
          post.author?.id === JSON.parse(storedUser).id
        );
        setPosts(userPosts);
      } catch (error) {
        console.error('Error fetching posts:', error);
        toast({
          title: "Failed to load posts",
          description: "An error occurred while loading your posts",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchPosts();
  }, [navigate]);
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
    navigate('/');
  };
  
  const handleCreatePost = () => {
    navigate('/create-post');
  };
  
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <main className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-screen-xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
            <div>
              <h1 className="text-3xl md:text-4xl font-serif font-bold mb-2">Dashboard</h1>
              <p className="text-white/70">
                Welcome back, {user?.name || 'Writer'}
              </p>
            </div>
            
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Button 
                onClick={handleCreatePost}
                className="flex items-center gap-2"
              >
                <PlusCircle className="h-4 w-4" />
                Create Post
              </Button>
              
              <Button 
                variant="outline" 
                onClick={handleLogout}
                className="flex items-center gap-2"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
          
          <div className="bg-white/5 rounded-xl p-6 mb-8">
            <h2 className="text-xl font-serif font-bold mb-4">Your Posts</h2>
            
            {loading ? (
              <p className="text-white/70">Loading your posts...</p>
            ) : posts.length > 0 ? (
              <div className="divide-y divide-white/10">
                {posts.map(post => (
                  <div key={post.id} className="py-4 first:pt-0 last:pb-0">
                    <div className="flex flex-col md:flex-row md:items-center justify-between">
                      <div>
                        <h3 className="text-lg font-medium mb-1">{post.title}</h3>
                        <p className="text-white/70 text-sm mb-2">{post.excerpt.substring(0, 100)}...</p>
                        <div className="flex items-center text-sm text-white/50 space-x-4">
                          <span className="flex items-center">
                            <FileText className="h-4 w-4 mr-1" />
                            {post.category}
                          </span>
                          <span className="flex items-center">
                            <Heart className="h-4 w-4 mr-1" />
                            {post.likeCount || 0} likes
                          </span>
                          <span className="flex items-center">
                            <MessageSquare className="h-4 w-4 mr-1" />
                            {post.commentCount || 0} comments
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex space-x-2 mt-3 md:mt-0">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => navigate(`/edit-post/${post.id}`)}
                        >
                          Edit
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => navigate(`/post/${post.id}`)}
                        >
                          View
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-white/70 mb-4">You haven't created any posts yet</p>
                <Button onClick={handleCreatePost}>Create Your First Post</Button>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DashboardPage;
