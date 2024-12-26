import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import UserDetails from '../UserDetails';
import { fetchUsers } from '../../services/api';

jest.mock('../../services/api');

test('should display user details correctly', async () => {
  fetchUsers.mockResolvedValueOnce([
    { id: 1, name: 'User 1', email: 'user1@example.com', username: 'user1', phone: '123-456-7890', website: 'user1.com', address: { street: '123 St', city: 'City', zipcode: '12345', geo: { lat: '40.7128', lng: '74.0060' } }, company: { name: 'Company 1', catchPhrase: 'Innovative', bs: 'Solutions' } },
  ]);

  render(
    <MemoryRouter initialEntries={['/user/1']}>
      <UserDetails />
    </MemoryRouter>
  );

  await waitFor(() => screen.getByText('User 1'));
  
  // Check if user details are rendered
  expect(screen.getByText('User 1')).toBeInTheDocument();
  expect(screen.getByText('Username: user1')).toBeInTheDocument();
  expect(screen.getByText('Phone: 123-456-7890')).toBeInTheDocument();
});
