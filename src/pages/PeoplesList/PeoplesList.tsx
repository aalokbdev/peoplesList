import React, { useState, useEffect } from 'react';
import { fetchUsers } from '../../services/api';
import UserTable from '../../components/userTable/userTable';
import Pagination from '../../components/pagination/pagination';
import { useNavigate } from 'react-router-dom';

interface User {
  id: number;
  name: string;
  email: string;
}

const USERS_PER_PAGE = 5;
const BLOCK_TIME = 10000; // 10 seconds in milliseconds

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [error, setError] = useState<string>('');
  const [blockedUntil, setBlockedUntil] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadUsers = async () => {
      const retryCount = parseInt(sessionStorage.getItem('retryCount') || '0', 10);
      const blockTime = parseInt(sessionStorage.getItem('blockTime') || '0', 10);
      const currentTime = Date.now();

      if (retryCount >= 3 && blockTime > currentTime) {
        const remainingTime = blockTime - currentTime;
        setBlockedUntil(blockTime);
        setError(`You can try again in ${Math.ceil(remainingTime / 1000)} seconds.`);
        return;
      }
      setError('');
     

      try {
        const data = await fetchUsers();
        setUsers(data);
        sessionStorage.setItem('retryCount', '0');
        sessionStorage.removeItem('blockTime');
        setBlockedUntil(null);
      } catch (err: any) {
        const newRetryCount = retryCount + 1;
        sessionStorage.setItem('retryCount', newRetryCount.toString());

        if (newRetryCount >= 3) {
          const blockTime = Date.now() + BLOCK_TIME;
          sessionStorage.setItem('blockTime', blockTime.toString());
          setBlockedUntil(blockTime);
          setError('Unable to fetch users after 3 attempts. Please try again in 10 seconds.');
        } else {
          setError('Failed to fetch users. Please refresh the page to try again.');
        }
      } 
    };

    loadUsers();
  }, []);

  useEffect(() => {
    if (blockedUntil) {
      const timer = setInterval(() => {
        const currentTime = Date.now();
        const remainingTime = blockedUntil - currentTime;

        if (remainingTime <= 0) {
          sessionStorage.setItem('retryCount', '0');
          sessionStorage.removeItem('blockTime');
          setBlockedUntil(null);
          setError('You can refresh the page to get the user list now.');
          clearInterval(timer);
        } else {
          setError(`You can try again in ${Math.ceil(remainingTime / 1000)} seconds.`);
        }
      }, 1000);

      return () => clearInterval(timer); // Cleanup on unmount
    }
  }, [blockedUntil]);

  const startIndex = (currentPage - 1) * USERS_PER_PAGE;
  const currentUsers = users.slice(startIndex, startIndex + USERS_PER_PAGE);

  return (
    <>
      {error ? (
        <div className="flex flex-col items-center py-10">
          <div className="text-red-500 font-bold">{error}</div>
        </div>
      ) : (
        <>
          <UserTable users={currentUsers} onRowClick={(user) => navigate(`/user/${user.id}`)} />
          <div className="flex justify-center items-center py-10">
            <Pagination
              currentPage={currentPage}
              totalPages={Math.ceil(users.length / USERS_PER_PAGE)}
              onPageChange={setCurrentPage}
            />
          </div>
        </>
      )}
    </>
  );
};

export default UserList;
