
const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// JWT Secret
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// Authentication middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });
  
  try {
    const verified = jwt.verify(token, JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).json({ message: 'Invalid token' });
  }
};

// User Routes
app.post('/api/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    // Create new user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
    
    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;
    
    res.status(201).json({ 
      message: 'User registered successfully',
      user: userWithoutPassword 
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find user
    const user = await prisma.user.findUnique({
      where: { email },
    });
    
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }
    
    // Validate password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }
    
    // Create and assign token
    const token = jwt.sign(
      { id: user.id, name: user.name, email: user.email },
      JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;
    
    res.status(200).json({
      message: 'Logged in successfully',
      user: userWithoutPassword,
      token,
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Post Routes
app.post('/api/posts', authenticateToken, async (req, res) => {
  try {
    const { title, content, excerpt, category } = req.body;
    const authorId = req.user.id;
    
    const post = await prisma.post.create({
      data: {
        title,
        content,
        excerpt,
        category,
        author: { connect: { id: authorId } },
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
    
    res.status(201).json(post);
  } catch (error) {
    console.error('Create post error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/api/posts', async (req, res) => {
  try {
    const { category, search } = req.query;
    
    const where = {};
    
    // Add category filter if provided
    if (category && category !== 'All') {
      where.category = category;
    }
    
    // Add search filter if provided
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { content: { contains: search, mode: 'insensitive' } },
        { excerpt: { contains: search, mode: 'insensitive' } },
      ];
    }
    
    const posts = await prisma.post.findMany({
      where,
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        comments: {
          select: {
            id: true,
          },
        },
        likes: {
          select: {
            id: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    
    // Transform posts to include counts
    const transformedPosts = posts.map(post => ({
      ...post,
      commentCount: post.comments.length,
      likeCount: post.likes.length,
      comments: undefined,
      likes: undefined,
    }));
    
    res.status(200).json(transformedPosts);
  } catch (error) {
    console.error('Get posts error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/api/posts/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const post = await prisma.post.findUnique({
      where: { id: Number(id) },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        comments: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
              },
            },
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
        likes: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });
    
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    
    // Transform post to include counts
    const transformedPost = {
      ...post,
      commentCount: post.comments.length,
      likeCount: post.likes.length,
    };
    
    res.status(200).json(transformedPost);
  } catch (error) {
    console.error('Get post error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Comment Routes
app.post('/api/posts/:postId/comments', authenticateToken, async (req, res) => {
  try {
    const { postId } = req.params;
    const { content } = req.body;
    const userId = req.user.id;
    
    const comment = await prisma.comment.create({
      data: {
        content,
        post: { connect: { id: Number(postId) } },
        user: { connect: { id: userId } },
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
    
    res.status(201).json(comment);
  } catch (error) {
    console.error('Create comment error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Like Routes
app.post('/api/posts/:postId/likes', authenticateToken, async (req, res) => {
  try {
    const { postId } = req.params;
    const userId = req.user.id;
    
    // Check if like already exists
    const existingLike = await prisma.like.findFirst({
      where: {
        postId: Number(postId),
        userId,
      },
    });
    
    if (existingLike) {
      // Unlike if already liked
      await prisma.like.delete({
        where: { id: existingLike.id },
      });
      return res.status(200).json({ message: 'Post unliked', liked: false });
    }
    
    // Create like if not already liked
    await prisma.like.create({
      data: {
        post: { connect: { id: Number(postId) } },
        user: { connect: { id: userId } },
      },
    });
    
    res.status(201).json({ message: 'Post liked', liked: true });
  } catch (error) {
    console.error('Like post error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Server startup
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
