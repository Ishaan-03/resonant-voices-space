
import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Heart, MessageSquare, Share2, Clock, Calendar, ChevronLeft } from 'lucide-react';
import { toast } from "@/components/ui/use-toast";
import { getPost, addComment, toggleLike } from '@/api';
import { format } from 'date-fns';

const PostPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [comment, setComment] = useState('');
  const [commentLoading, setCommentLoading] = useState(false);
  const [likeLoading, setLikeLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  
  useEffect(() => {
    // Get current user
    const userString = localStorage.getItem('user');
    if (userString) {
      setCurrentUser(JSON.parse(userString));
    }
    
    // Fetch post data
    const fetchPost = async () => {
      if (!id) return;
      
      try {
        const response = await getPost(Number(id));
        setPost(response.data);
      } catch (err: any) {
        console.error('Error fetching post:', err);
        setError(err.message || 'Failed to load post');
        toast({
          title: "Error",
          description: "Failed to load post. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchPost();
  }, [id]);
  
  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!comment.trim()) {
      return;
    }
    
    // Check if user is logged in
    if (!localStorage.getItem('token')) {
      toast({
        title: "Authentication required",
        description: "Please log in to add a comment",
        variant: "destructive",
      });
      navigate('/login');
      return;
    }
    
    setCommentLoading(true);
    
    try {
      await addComment(Number(id), comment);
      
      // Reload post to get updated comments
      const response = await getPost(Number(id));
      setPost(response.data);
      
      // Clear comment input
      setComment('');
      
      toast({
        title: "Comment added",
        description: "Your comment has been added successfully",
      });
    } catch (error: any) {
      console.error('Add comment error:', error);
      toast({
        title: "Failed to add comment",
        description: error.response?.data?.message || "An error occurred",
        variant: "destructive",
      });
    } finally {
      setCommentLoading(false);
    }
  };
  
  const handleToggleLike = async () => {
    // Check if user is logged in
    if (!localStorage.getItem('token')) {
      toast({
        title: "Authentication required",
        description: "Please log in to like posts",
        variant: "destructive",
      });
      navigate('/login');
      return;
    }
    
    setLikeLoading(true);
    
    try {
      const response = await toggleLike(Number(id));
      
      // Reload post to get updated likes
      const updatedPost = await getPost(Number(id));
      setPost(updatedPost.data);
      
      toast({
        title: response.data.liked ? "Post liked" : "Post unliked",
        description: response.data.liked 
          ? "You have liked this post" 
          : "You have unliked this post",
      });
    } catch (error: any) {
      console.error('Toggle like error:', error);
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to update like status",
        variant: "destructive",
      });
    } finally {
      setLikeLoading(false);
    }
  };
  
  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white">
        <Header />
        <main className="pt-24 pb-16 px-4">
          <div className="container mx-auto max-w-screen-xl">
            <div className="text-center py-12">
              <p className="text-white/70">Loading post...</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  if (error || !post) {
    return (
      <div className="min-h-screen bg-black text-white">
        <Header />
        <main className="pt-24 pb-16 px-4">
          <div className="container mx-auto max-w-screen-xl">
            <div className="text-center py-12">
              <h2 className="text-2xl font-serif font-bold mb-4">Post Not Found</h2>
              <p className="text-white/70 mb-8">The post you're looking for doesn't exist or has been removed.</p>
              <Button onClick={() => navigate('/explore')}>
                <ChevronLeft className="mr-2 h-4 w-4" /> Back to Explore
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <main className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-screen-xl">
          <div className="max-w-3xl mx-auto">
            <Link 
              to="/explore" 
              className="inline-flex items-center text-white/70 hover:text-white mb-6"
            >
              <ChevronLeft className="mr-2 h-4 w-4" /> Back to Explore
            </Link>
            
            <article className="glass-card overflow-hidden rounded-xl mb-8">
              <div className="aspect-w-16 aspect-h-9 bg-white/5">
                <img
                  src="/placeholder.svg"
                  alt={post.title}
                  className="object-cover w-full h-full"
                />
              </div>
              
              <div className="p-6 md:p-8">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className="px-3 py-1 text-xs font-medium rounded-full bg-white/10 text-white/90">
                    {post.category}
                  </span>
                  <span className="flex items-center text-sm text-white/60">
                    <Clock className="h-4 w-4 mr-1" /> 5 min read
                  </span>
                  <span className="flex items-center text-sm text-white/60">
                    <Calendar className="h-4 w-4 mr-1" /> 
                    {format(new Date(post.createdAt), 'MMM d, yyyy')}
                  </span>
                </div>
                
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-serif font-bold mb-4">
                  {post.title}
                </h1>
                
                <div className="flex items-center mb-8">
                  <img 
                    src={post.author?.image || "/placeholder.svg"} 
                    alt={post.author?.name}
                    className="h-10 w-10 rounded-full bg-white/10 mr-3"
                  />
                  <div>
                    <p className="font-medium text-white">
                      {post.author?.name}
                    </p>
                    <p className="text-sm text-white/60">
                      Author
                    </p>
                  </div>
                </div>
                
                <div className="prose prose-invert max-w-none mb-8">
                  {post.content.split('\n').map((paragraph, index) => (
                    <p key={index} className="mb-4">
                      {paragraph}
                    </p>
                  ))}
                </div>
                
                <div className="flex items-center justify-between border-t border-white/10 pt-6">
                  <div className="flex items-center space-x-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleToggleLike}
                      disabled={likeLoading}
                      className="flex items-center"
                    >
                      <Heart className={`h-5 w-5 mr-1 ${
                        post.likes?.some(like => like.user?.id === currentUser?.id)
                          ? 'fill-white'
                          : ''
                      }`} />
                      {post.likeCount || 0}
                    </Button>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => document.getElementById('comments-section')?.scrollIntoView({ behavior: 'smooth' })}
                      className="flex items-center"
                    >
                      <MessageSquare className="h-5 w-5 mr-1" /> {post.commentCount || 0}
                    </Button>
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      navigator.clipboard.writeText(window.location.href);
                      toast({
                        title: "Link copied",
                        description: "Post link copied to clipboard",
                      });
                    }}
                    className="flex items-center"
                  >
                    <Share2 className="h-5 w-5 mr-1" /> Share
                  </Button>
                </div>
              </div>
            </article>
            
            <div id="comments-section" className="glass-card rounded-xl p-6 md:p-8">
              <h2 className="text-xl font-serif font-bold mb-6">
                Comments ({post.commentCount || 0})
              </h2>
              
              <form onSubmit={handleAddComment} className="mb-8">
                <div className="mb-4">
                  <textarea
                    placeholder="Add a comment..."
                    rows={3}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-white/50"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    required
                  />
                </div>
                
                <div className="flex justify-end">
                  <Button
                    type="submit"
                    disabled={commentLoading || !comment.trim()}
                  >
                    {commentLoading ? 'Posting...' : 'Post Comment'}
                  </Button>
                </div>
              </form>
              
              {post.comments && post.comments.length > 0 ? (
                <div className="space-y-6">
                  {post.comments.map((comment) => (
                    <div key={comment.id} className="border-b border-white/10 pb-6 last:border-0 last:pb-0">
                      <div className="flex items-center mb-3">
                        <img 
                          src={comment.user?.image || "/placeholder.svg"} 
                          alt={comment.user?.name}
                          className="h-8 w-8 rounded-full bg-white/10 mr-3"
                        />
                        <div>
                          <p className="font-medium text-white">
                            {comment.user?.name}
                          </p>
                          <p className="text-xs text-white/60">
                            {format(new Date(comment.createdAt), 'MMM d, yyyy • h:mm a')}
                          </p>
                        </div>
                      </div>
                      
                      <p className="text-white/80">
                        {comment.content}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6">
                  <p className="text-white/60">No comments yet. Be the first to share your thoughts!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PostPage;
