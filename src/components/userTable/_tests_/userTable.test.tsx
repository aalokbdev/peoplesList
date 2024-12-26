// src/components/__tests__/userTable.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { UserTable } from '../userTable'; // Adjust import if necessary

// Mock data for users
const mockUsers = [
  {
    id: 1,
    name: 'User 1',
    email: 'user1@example.com',
    username: 'user1',
    address: { street: '123 Main St', city: 'City 1', zipcode: '12345' },
    phone: '123-456-7890',
    website: 'user1.com'
  },
  {
    id: 2,
    name: 'User 2',
    email: 'user2@example.com',
    username: 'user2',
    address: { street: '456 Another St', city: 'City 2', zipcode: '67890' },
    phone: '987-654-3210',
    website: 'user2.com'
  }
];

// Test case 1: Should render the table with user data
test('should render the table with user data', () => {
  render(<UserTable users={mockUsers} onRowClick={() => {}} />);

  // Check if the names and emails of the users are displayed in the table
  expect(screen.getByText('User 1')).toBeInTheDocument();
  expect(screen.getByText('user1@example.com')).toBeInTheDocument();
  expect(screen.getByText('User 2')).toBeInTheDocument();
  expect(screen.getByText('user2@example.com')).toBeInTheDocument();
});

// Test case 2: Should trigger onRowClick when a row is clicked
test('should trigger onRowClick when a row is clicked', () => {
  const mockOnRowClick = jest.fn(); // Mock the onRowClick function

  render(<UserTable users={mockUsers} onRowClick={mockOnRowClick} />);

  // Find the row for User 1 and click it
  const userRow = screen.getByText('User 1').closest('tr');
  fireEvent.click(userRow!);

  // Check if the mock function was called with the correct user object
  expect(mockOnRowClick).toHaveBeenCalledWith(mockUsers[0]);
});
