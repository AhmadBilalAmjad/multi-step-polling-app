import { render, screen } from '@testing-library/react';
import App from '../App';
import { renderWithProvider } from './home/index.test';

describe('App Component', () => {
  test('renders without crashing', () => {
    renderWithProvider(<App />);
    expect(screen.getByTestId('app-container')).toBeInTheDocument();
  });
});
