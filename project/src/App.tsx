import React from 'react';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from './styles/GlobalStyles';
import { theme } from './styles/Theme';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Certificates from './components/Certificates';
import Portfolio from './components/Portfolio';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Navbar />
      <Hero />
      <Certificates />
      <Portfolio />
      <Contact />
      <Footer />
    </ThemeProvider>
  );
}

export default App;