import Home from '@/pages/Home/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { router } from './RouterApp';
import App from '../App';

export default function RoutesApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={router.home} element={<Home />} />
        <Route path={router.calculator} element={<App />} />
      </Routes>
    </BrowserRouter>
  );
}
