import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';

import './App.css';
import MainLayout from './layout/MainLayout';
import HomePage from './pages/HomePage';
import AboutUsPage from './pages/AboutUsPage';
import ContactPage from './pages/ContactPage';
import ProductPage from './pages/ProductPage';
import ItemPage, { itemLoader } from './pages/ItemPage';
import CommentsPage, { CommentsLoader } from './pages/CommentsPage';

const App = () => {
  const commentadding = async (newcomment) => {
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/comments-add`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(newcomment),
    });
    return;
  };

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/about" element={<AboutUsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/products/:id" element={<ItemPage />} loader={itemLoader} />
        <Route path="/comments" element={<CommentsPage addcomment={commentadding} />} loader={CommentsLoader} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;
