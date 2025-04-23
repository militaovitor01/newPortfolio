import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Menu, X } from 'lucide-react';

const NavContainer = styled.nav<{ scrolled: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.xl}`};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  transition: all ${({ theme }) => theme.transitions.normal};
  background-color: ${({ scrolled, theme }) => 
    scrolled ? theme.colors.primary.main : 'transparent'};
  box-shadow: ${({ scrolled, theme }) => 
    scrolled ? theme.shadows.sm : 'none'};
`;

const Logo = styled.div`
  font-family: 'Playfair Display', serif;
  font-size: 1.5rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.accent.main};
`;

const NavLinks = styled.div<{ isOpen: boolean }>`
  display: flex;
  gap: ${({ theme }) => theme.spacing.xl};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    position: fixed;
    top: 0;
    right: 0;
    height: 100vh;
    width: 70%;
    max-width: 300px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: ${({ theme }) => theme.colors.primary.main};
    transform: ${({ isOpen }) => isOpen ? 'translateX(0)' : 'translateX(100%)'};
    transition: transform ${({ theme }) => theme.transitions.normal};
    box-shadow: ${({ theme }) => theme.shadows.lg};
  }
`;

const NavLink = styled.a`
  color: ${({ theme }) => theme.colors.accent.light};
  font-weight: 500;
  position: relative;
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  
  &:after {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    bottom: 0;
    left: 0;
    background-color: ${({ theme }) => theme.colors.secondary.main};
    transition: width ${({ theme }) => theme.transitions.normal};
  }
  
  &:hover:after {
    width: 100%;
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.accent.main};
  cursor: pointer;
  z-index: 1001;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: block;
  }
`;

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <NavContainer scrolled={scrolled}>
      <Logo>Portfolio</Logo>
      
      <MobileMenuButton onClick={toggleMenu}>
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </MobileMenuButton>
      
      <NavLinks isOpen={isOpen}>
        <NavLink href="#home" onClick={closeMenu}>Home</NavLink>
        <NavLink href="#about" onClick={closeMenu}>About</NavLink>
        <NavLink href="#certificates" onClick={closeMenu}>Certificates</NavLink>
        <NavLink href="#portfolio" onClick={closeMenu}>Projects</NavLink>
        <NavLink href="#contact" onClick={closeMenu}>Contact</NavLink>
      </NavLinks>
    </NavContainer>
  );
};

export default Navbar;