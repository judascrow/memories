import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import theme from './theme';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Auth from './components/Auth/Auth';
import PostDetails from './components/PostDetails/PostDetails';

function App() {
  const user = JSON.parse(localStorage.getItem('profile'));

  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route index element={<Navigate to="/posts" />} />
          <Route path="/posts" index element={<Home />} />
          {/* <Route path="/posts/search" index element={<Home />} /> */}
          <Route path="/posts/:id" index element={<PostDetails />} />
          <Route
            path="/auth"
            index
            element={!user ? <Auth /> : <Navigate to="/posts" />}
          />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
