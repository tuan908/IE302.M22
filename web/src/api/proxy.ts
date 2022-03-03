import { createProxyMiddleware } from 'http-proxy-middleware';
import { Application } from 'express';

function ProxyMiddleware(app: Application) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:8080',
      changeOrigin: true,
    })
  );
}

export default ProxyMiddleware;
