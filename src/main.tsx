import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
document.getElementById("root")!.innerHTML = "<h1 style='color:red;'>Hello Test</h1>";

createRoot(document.getElementById("root")!).render(<App />);
