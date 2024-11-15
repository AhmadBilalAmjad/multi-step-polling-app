import Home from './pages/home';
import { ErrorBoundary } from './components/ErrorBoundary';

const App = () => {
  return (
    <div data-testid="app-container" className="min-h-screen bg-gray-100">
      <ErrorBoundary fallback={<div>Error loading poll</div>}>
        <Home />
      </ErrorBoundary>
    </div>
  );
}

export default App;
