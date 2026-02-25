import { Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from 'antd';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import FloatingTools from './components/Layout/FloatingTools';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import SolutionsPage from './pages/SolutionsPage';
import CasesPage from './pages/CasesPage';
import ResourcesPage from './pages/ResourcesPage';
import AboutPage from './pages/AboutPage';
import { routes } from './config/routes';
import './App.css';

const { Content } = Layout;

function App() {
  return (
    <Layout className="app-layout">
      <Header />
      <Content className="app-content">
        <Routes>
          <Route path={routes.home} element={<HomePage />} />
          <Route path={routes.products} element={<ProductsPage />} />
          <Route path={routes.solutions} element={<SolutionsPage />} />
          <Route path={routes.cases} element={<CasesPage />} />
          <Route path={routes.resources} element={<ResourcesPage />} />
          <Route path={routes.about} element={<AboutPage />} />
          <Route path="*" element={<Navigate to={routes.home} replace />} />
        </Routes>
      </Content>
      <Footer />
      <FloatingTools />
    </Layout>
  );
}

export default App;
