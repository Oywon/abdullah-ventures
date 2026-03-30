import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import App from './App';

vi.mock('@clerk/react', () => ({
  Show: ({ children }) => <>{children}</>,
  SignInButton: ({ children }) => <>{children}</>,
  SignUpButton: ({ children }) => <>{children}</>,
  UserButton: () => <div>User</div>,
  useAuth: () => ({ isLoaded: true, userId: null }),
  useUser: () => ({ user: null }),
  useSignIn: () => ({ isLoaded: true, signIn: { create: vi.fn() }, setActive: vi.fn() }),
  useSignUp: () => ({ isLoaded: true, signUp: { create: vi.fn() }, setActive: vi.fn() }),
}));

vi.mock(
  'react-router-dom',
  () => {
    return {
      BrowserRouter: ({ children }) => <>{children}</>,
      Routes: ({ children }) => <>{children}</>,
      Route: ({ path, element }) => (path === '/' ? element : null),
      useLocation: () => ({ pathname: '/', state: null }),
      useNavigate: () => vi.fn(),
      Link: ({ children, to, ...props }) => (
        <a href={to} {...props}>
          {children}
        </a>
      ),
      NavLink: ({ children, to, ...props }) => (
        <a href={to} {...props}>
          {children}
        </a>
      ),
    };
  },
  { virtual: true }
);

test('renders the home hero heading', () => {
  render(<App />);
  const sectionHeading = screen.getByRole('heading', { name: /abdullah ventures digital trade hub/i });
  expect(sectionHeading).toBeInTheDocument();
});
