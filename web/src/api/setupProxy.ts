import * as Express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

const app = Express();

app.use(
  '/api',
  createProxyMiddleware({
    target: 'http://localhost:8081',
    changeOrigin: true,
  })
);

app.listen(3000);
