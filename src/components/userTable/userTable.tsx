import React from 'react';  
import { Table } from "@radix-ui/themes";

interface User {
  id: number;
  name: string;
  email: string;
  username: string;
  address: any;
  street: string;
  city: string;
  zipcode: string;
  phone: string;
  website: string;
}

interface UserTableProps {
  users: User[];
  onRowClick: (user: User) => void;
}

const UserTable: React.FC<UserTableProps> = ({ users, onRowClick }) => {
  return (
    <Table.Root variant="surface" className="table-auto w-full">
    <Table.Header>
      <Table.Row>
        <Table.ColumnHeaderCell className="w-[150px]">Full Name</Table.ColumnHeaderCell>
        <Table.ColumnHeaderCell className="w-[120px]">Username</Table.ColumnHeaderCell>
        <Table.ColumnHeaderCell className="w-[200px]">Email</Table.ColumnHeaderCell>
        <Table.ColumnHeaderCell className="w-[150px]">Street</Table.ColumnHeaderCell>
        <Table.ColumnHeaderCell className="w-[150px]">City</Table.ColumnHeaderCell>
        <Table.ColumnHeaderCell className="w-[100px]">Zipcode</Table.ColumnHeaderCell>
        <Table.ColumnHeaderCell className="w-[150px]">Phone</Table.ColumnHeaderCell>
        <Table.ColumnHeaderCell className="w-[150px]">Website</Table.ColumnHeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
      {users.map((user) => (
        <Table.Row key={user.id} onClick={() => onRowClick(user)} className="cursor-pointer hover:bg-gray-100">
          <Table.Cell className="w-[150px]">{user.name}</Table.Cell>
          <Table.Cell className="w-[120px]">{user.username}</Table.Cell>
          <Table.Cell className="w-[200px]">{user.email}</Table.Cell>
          <Table.Cell className="w-[150px]">{user?.address?.street}</Table.Cell>
          <Table.Cell className="w-[150px]">{user?.address?.city}</Table.Cell>
          <Table.Cell className="w-[100px]">{user?.address?.zipcode}</Table.Cell>
          <Table.Cell className="w-[150px]">{user.phone}</Table.Cell>
          <Table.Cell className="w-[150px]">
            <a href={`http://${user.website}`} className="text-blue-500 underline">
              {user.website}
            </a>
          </Table.Cell>
        </Table.Row>
      ))}
    </Table.Body>
  </Table.Root>

    

    
  );
};

export default UserTable;