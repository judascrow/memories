import { ChakraProvider } from '@chakra-ui/react';
import theme from './theme';
import Navbar from './components/Navbar';
import Home from './components/Home';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Navbar />
      <Home />
    </ChakraProvider>
  );
}

export default App;
