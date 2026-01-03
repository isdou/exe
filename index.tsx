import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import './index.css';

// --- 引入页面组件 ---
import SystemLog from './components/Home';
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
      { index: true, element: <SystemLog onNavigate={() => {}} /> },
      { path: "essays", element: <Essays /> },
      { path: "curation", element: <Curation /> },
      { path: "travel", element: <Travel /> },
      { path: "goodies", element: <Goodies /> },
      { path: "journal", element: <Journal /> },
      { path: "about", element: <Kernel /> },
      { path: "now", element: <Now /> },
    ],
  },
], {
  // 🔥 关键修复：指定基准路径，与 vite.config.ts 的 base 保持一致
  basename: "/exe" 
});

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error("Root element not found");

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);