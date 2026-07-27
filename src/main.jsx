import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Note: StrictMode intentionally omitted — the PixelBlast WebGL background
// (three/postprocessing) isn't StrictMode-safe; the dev-only double-mount
// leaves its canvas stuck at a 1px drawing buffer. Prod never double-mounts.
createRoot(document.getElementById('root')).render(<App />)
