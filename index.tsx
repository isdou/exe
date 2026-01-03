import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import App from './App';
import './index.css';

import Home from './components/Home';
import Essays from './components/Essays';
import Curation from './components/Curation';
import Travel from './components/Travel';
import Goodies from './components/Goodies';
import Journal from './components/Journal';
import Kernel from './components/About';
import Now from './components/Now';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, 
    children: [
      { index: true, element: <Home /> },
      { path: "essays", element: <Essays /> },
      { path: "curation", element: <Curation /> },
      { path: "travel", element: <Travel /> },
      { path: "goodies", element: <Goodies /> },
      { path: "journal", element: <Journal /> },
      { path: "about", element: <Kernel /> },
      { path: "now", element: <Now /> },
      // 捕获所有未匹配路径，重定向到首页，防止 404 报错
      { path: "*", element: <Navigate to="/" replace /> }
    ],
  },
], {
  // 自动适配部署路径
  basename: import.meta.env.BASE_URL 
});

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}