import './index.css';
import { createRoot } from 'react-dom/client';
import { GlobalProviders } from './context/GlobalProviders';
import App from './App';

createRoot(document.getElementById('root')!).render(
  <GlobalProviders>
    <App />
  </GlobalProviders>
);
