import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap');

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    font-family: 'Inter', sans-serif;
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    line-height: 1.5;
    overflow-x: hidden;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'Playfair Display', serif;
    font-weight: 600;
    line-height: 1.2;
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }

  h1 {
    font-size: 3.5rem;
    
    @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
      font-size: 2.5rem;
    }
  }

  h2 {
    font-size: 2.5rem;
    
    @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
      font-size: 2rem;
    }
  }

  p {
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  button {
    font-family: 'Inter', sans-serif;
    cursor: pointer;
  }

  section {
    padding: ${({ theme }) => theme.spacing.xxl} 0;
  }

  .container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 ${({ theme }) => theme.spacing.lg};
  }
`;

export default GlobalStyles;