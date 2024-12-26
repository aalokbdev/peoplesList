import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchUsers } from '../../services/api';

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  username: string;
  website: string;
  address: any;
  company: any;
}

const UserDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<User | null>(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const users = await fetchUsers();
        setData(users.find((u) => u.id === Number(id)));
      } catch (err: any) {
        console.error(err.message);
      }
    };
    loadUser();
  }, [id]);

  if (!data) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
    <h1 className="text-4xl font-bold text-gray-800 mb-6">{data.name}</h1>
    <p className="text-lg text-gray-600 mb-2">
      <span className="font-semibold text-gray-700">Username:</span> {data.username}
    </p>
    <p className="text-lg text-gray-600 mb-2">
      <span className="font-semibold text-gray-700">Email:</span> {data.email}
    </p>
    <p className="text-lg text-gray-600 mb-2">
      <span className="font-semibold text-gray-700">Phone:</span> {data.phone}
    </p>
    <p className="text-lg text-gray-600 mb-4">
      <span className="font-semibold text-gray-700">Website:</span>{' '}
      <a href={`http://${data.website}`} className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">
        {data.website}
      </a>
    </p>
    <div className="mb-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Address</h2>
      <p className="text-gray-600">
        {data.address.street}, {data.address.suite}, {data.address.city}, {data.address.zipcode}
      </p>
      <p className="text-sm text-gray-500">
        Latitude: {data.address.geo.lat}, Longitude: {data.address.geo.lng}
      </p>
    </div>
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Company</h2>
      <p className="text-gray-600">
        <span className="font-semibold text-gray-700">Name:</span> {data.company.name}
      </p>
      <p className="text-gray-600">
        <span className="font-semibold text-gray-700">CatchPhrase:</span> {data.company.catchPhrase}
      </p>
      <p className="text-gray-600">
        <span className="font-semibold text-gray-700">BS:</span> {data.company.bs}
      </p>
    </div>
  </div>
  );
};

export default UserDetails;