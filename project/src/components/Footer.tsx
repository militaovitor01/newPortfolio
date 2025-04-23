import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Instagram } from 'lucide-react';

const FooterSection = styled.footer`
  background-color: ${({ theme }) => theme.colors.primary.dark};
  padding: ${({ theme }) => `${theme.spacing.xl} 0`};
`;

const FooterContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.lg};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const SocialLink = styled(motion.a)`
  color: ${({ theme }) => theme.colors.accent.main};
  transition: color ${({ theme }) => theme.transitions.fast};
  
  &:hover {
    color: ${({ theme }) => theme.colors.secondary.main};
  }
`;

const FooterNav = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.xl};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: column;
    align-items: center;
    gap: ${({ theme }) => theme.spacing.md};
  }
`;

const FooterLink = styled.a`
  color: ${({ theme }) => theme.colors.grey[300]};
  transition: color ${({ theme }) => theme.transitions.fast};
  
  &:hover {
    color: ${({ theme }) => theme.colors.accent.main};
  }
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${({ theme }) => theme.colors.primary.light};
  margin: ${({ theme }) => `${theme.spacing.md} 0`};
`;

const Copyright = styled.p`
  color: ${({ theme }) => theme.colors.grey[500]};
  text-align: center;
  font-size: 0.9rem;
`;

const Logo = styled.div`
  font-family: 'Playfair Display', serif;
  font-size: 1.5rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.accent.main};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const Footer = () => {
  return (
    <FooterSection>
      <FooterContainer>
        <Logo>Portfolio</Logo>
        
        <SocialLinks>
          <SocialLink 
            href="https://github.com" 
            target="_blank" 
            rel="noopener noreferrer"
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.9 }}
          >
            <Github size={24} />
          </SocialLink>
          
          <SocialLink 
            href="https://linkedin.com" 
            target="_blank" 
            rel="noopener noreferrer"
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.9 }}
          >
            <Linkedin size={24} />
          </SocialLink>
          
          <SocialLink 
            href="https://twitter.com" 
            target="_blank" 
            rel="noopener noreferrer"
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.9 }}
          >
            <Twitter size={24} />
          </SocialLink>
          
          <SocialLink 
            href="https://instagram.com" 
            target="_blank" 
            rel="noopener noreferrer"
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.9 }}
          >
            <Instagram size={24} />
          </SocialLink>
        </SocialLinks>
        
        <FooterNav>
          <FooterLink href="#home">Home</FooterLink>
          <FooterLink href="#about">About</FooterLink>
          <FooterLink href="#certificates">Certificates</FooterLink>
          <FooterLink href="#portfolio">Projects</FooterLink>
          <FooterLink href="#contact">Contact</FooterLink>
        </FooterNav>
        
        <Divider />
        
        <Copyright>
          © {new Date().getFullYear()} Sarah's Portfolio. All rights reserved.
        </Copyright>
      </FooterContainer>
    </FooterSection>
  );
};

export default Footer;