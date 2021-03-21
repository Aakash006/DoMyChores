const { createProxyMiddleware } = require('http-proxy-middleware');
require('dotenv').config();

module.exports = (app) => {
    app.use(
        '/api',
        createProxyMiddleware({
            target: process.env.API_ENDPOINT_URL,
            changeOrigin: true
        })
    );
}