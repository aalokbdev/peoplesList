// App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserList from './pages/PeoplesList/PeoplesList';
import UserDetails from './pages/UserDetail/userDetail';
import { Theme } from '@radix-ui/themes';;

const App: React.FC = () => (
  <Theme>
  <Router>
    <Routes>
      <Route path="/" element={<UserList />} />
      <Route path="/user/:id" element={<UserDetails />} />
    </Routes>
  </Router>
  </Theme>
);

export default App;
