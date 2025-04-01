import { Clock, Heart, MessageSquare, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

// Sample data for featured posts
const featuredPosts = [
  {
    id: '1',
    title: 'The Art of Mindful Writing: Finding Your Voice in a Noisy World',
    excerpt: 'Discover how mindfulness can transform your writing process and help you connect with readers on a deeper level.',
    category: 'Creativity',
    author: {
      name: 'Emma Wilson',
      image: '/placeholder.svg'
    },
    readTime: '5 min read',
    likes: 124,
    comments: 32
  },
  {
    id: '2',
    title: 'Beyond Text: How Multimedia is Reshaping Digital Storytelling',
    excerpt: 'Explore how audio, video, and interactive elements are creating new possibilities for content creators.',
    category: 'Digital Media',
    author: {
      name: 'Marcus Chen',
      image: '/placeholder.svg'
    },
    readTime: '7 min read',
    likes: 98,
    comments: 24
  },
  {
    id: '3',
    title: 'The Psychology of Engagement: Why Some Ideas Spread and Others Don\'t',
    excerpt: 'Understanding the cognitive and emotional factors that determine which content resonates with audiences.',
    category: 'Psychology',
    author: {
      name: 'Sophia Ahmed',
      image: '/placeholder.svg'
    },
    readTime: '6 min read',
    likes: 156,
    comments: 41
  }
];

const FeaturedPostsSection = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-black/80 to-black/50">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6 text-white animate-float-up opacity-0" style={{ animationDelay: '0.3s' }}>
            Discover Thought-Provoking Content
          </h2>
          <p className="text-lg text-white/80 max-w-3xl mx-auto animate-float-up opacity-0" style={{ animationDelay: '0.4s' }}>
            Explore stories, ideas, and perspectives from writers around the world
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredPosts.map((post, index) => (
            <div 
              key={post.id} 
              className="glass-card overflow-hidden rounded-xl animate-float-up opacity-0"
              style={{ animationDelay: `${0.5 + index * 0.1}s` }}
            >
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
                    <Clock className="h-4 w-4 mr-1" /> {post.readTime}
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
                      src={post.author.image} 
                      alt={post.author.name}
                      className="h-10 w-10 rounded-full bg-white/10 mr-3"
                    />
                    <span className="font-medium text-white">
                      {post.author.name}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <span className="flex items-center text-white/60">
                      <Heart className="h-4 w-4 mr-1" /> {post.likes}
                    </span>
                    <span className="flex items-center text-white/60">
                      <MessageSquare className="h-4 w-4 mr-1" /> {post.comments}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link 
            to="/explore" 
            className="px-6 py-3 rounded-full bg-white text-black font-medium inline-flex items-center hover:bg-white/90 transition-colors animate-float-up opacity-0"
            style={{ animationDelay: '0.8s' }}
          >
            Explore All Posts <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedPostsSection;
