
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Clock, Heart, MessageSquare } from 'lucide-react';
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

// Sample data for posts
const posts = [
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
  },
  {
    id: '4',
    title: 'The Future of Content Creation: AI and Human Collaboration',
    excerpt: 'How artificial intelligence is transforming the way we create and consume content, and what it means for creators.',
    category: 'Technology',
    author: {
      name: 'Daniel Park',
      image: '/placeholder.svg'
    },
    readTime: '8 min read',
    likes: 87,
    comments: 19
  },
  {
    id: '5',
    title: 'Finding Purpose Through Creative Expression',
    excerpt: 'Exploring how creative pursuits can help us discover meaning and purpose in our lives.',
    category: 'Philosophy',
    author: {
      name: 'Olivia Chen',
      image: '/placeholder.svg'
    },
    readTime: '4 min read',
    likes: 112,
    comments: 28
  },
  {
    id: '6',
    title: 'The Science of Memory: How We Remember and Why We Forget',
    excerpt: 'A deep dive into the fascinating mechanisms behind human memory and its implications for learning and creativity.',
    category: 'Psychology',
    author: {
      name: 'Michael Rodriguez',
      image: '/placeholder.svg'
    },
    readTime: '9 min read',
    likes: 143,
    comments: 36
  }
];

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
  
  // Filter posts based on search query and category
  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });
  
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
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="relative w-full md:w-auto">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 h-5 w-5" />
                <select
                  className="w-full md:w-auto pl-10 pr-8 py-3 appearance-none bg-white/10 border border-white/20 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-white/50"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
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
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.length > 0 ? (
              filteredPosts.map(post => (
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
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ExplorePage;
