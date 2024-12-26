import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';

test('should navigate between user list and user details page', () => {
  render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>
  );

  const userRow = screen.getByText('User 1');  // Assuming there's a user with the name 'User 1'
  fireEvent.click(userRow);

  // After clicking, it should navigate to user details page
  expect(window.location.pathname).toBe('/user/1');
});
