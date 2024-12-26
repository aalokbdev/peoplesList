import { fetchUsers } from '../api';

jest.mock('../api');

test('should fetch users successfully', async () => {
  const mockUsers = [{ id: 1, name: 'User 1', email: 'user1@example.com' }];
  fetchUsers.mockResolvedValueOnce(mockUsers);

  const result = await fetchUsers();
  expect(result).toEqual(mockUsers);
});

test('should handle fetch failure', async () => {
  fetchUsers.mockRejectedValueOnce(new Error('Failed to fetch users'));

  await expect(fetchUsers()).rejects.toThrow('Failed to fetch users');
});
