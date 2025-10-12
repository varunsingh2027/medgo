const notFound = (req, res, next) => {
  const error = new Error(`Route ${req.originalUrl} not found`);
  res.status(404).json({
    success: false,
    message: error.message,
    availableRoutes: {
      auth: '/api/auth',
      products: '/api/products',
      categories: '/api/categories',
      contact: '/api/contact',
      manufacturers: '/api/manufacturers',
      quotes: '/api/quotes',
      news: '/api/news',
      users: '/api/users',
      health: '/api/health'
    }
  });
};

export default notFound;
