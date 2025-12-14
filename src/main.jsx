import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx';
import { loadConfig } from './config.jsx';

loadConfig().then(() => {
createRoot(document.getElementById('root')).render(
// O React.StrictMode é um modo especial do React que ajuda a identificar problemas potenciais no seu código durante o modo de desenvolvimento.
//Ele não afeta a aplicação em produção, mas pode causar re-renderizações extras para ajudar a encontrar efeitos colaterais inesperados.
  <StrictMode>
    <App />
  </StrictMode>,
)
});
