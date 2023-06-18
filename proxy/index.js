const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// Proxy configuration
const proxyOptions = {
  target: 'https://librivox.org', // Replace with the target URL
  changeOrigin: true, // Changes the origin of the host header to the target URL
  pathRewrite: {
    '^/api/feed/audiobooks': '/api/feed/audiobooks', // Optional: Modify the path if required
  },
  // Add any additional options if required
};

// Create the proxy middleware
const proxy = createProxyMiddleware(proxyOptions);

// Set up a route to proxy requests
app.use('/api/feed/audiobooks', proxy);

// Start the server
app.listen(5000, () => {
  console.log('Proxy server is running on http://localhost:5000');
});
