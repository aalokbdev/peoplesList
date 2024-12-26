import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import UserList from '../PeoplesList';
import { fetchUsers } from '../../services/api';

jest.mock('../../services/api');  // Mock the API call

test('should display users and handle pagination', async () => {
  fetchUsers.mockResolvedValueOnce([
    { id: 1, name: 'User 1', email: 'user1@example.com' },
    { id: 2, name: 'User 2', email: 'user2@example.com' },
  ]);

  render(
    <MemoryRouter>
      <UserList />
    </MemoryRouter>
  );

  await waitFor(() => screen.getByText('User 1'));  // Wait for the users to load

  // Check if the user list is rendered
  expect(screen.getByText('User 1')).toBeInTheDocument();
  expect(screen.getByText('User 2')).toBeInTheDocument();

  // Simulate pagination
  const nextButton = screen.getByText('Next');
  fireEvent.click(nextButton);

  // Verify if pagination logic works
  expect(screen.getByText('Page 2')).toBeInTheDocument();
});

test('should show error message after failed API calls', async () => {
  fetchUsers.mockRejectedValueOnce(new Error('Failed to fetch users'));

  render(
    <MemoryRouter>
      <UserList />
    </MemoryRouter>
  );

  await waitFor(() => screen.getByText('Failed to fetch users. Please refresh the page to try again.'));
  expect(screen.getByText('Failed to fetch users. Please refresh the page to try again.')).toBeInTheDocument();
});
