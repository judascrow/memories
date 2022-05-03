import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import theme from './theme';
import Navbar from './components/Navbar';
import Home from './components/Home';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route index element={<Home />} />
          <Route path="/posts" index element={<Home />} />
          {/* <Route path="/posts/search" index element={<Home />} /> */}
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
