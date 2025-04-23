import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowDown } from 'lucide-react';

const HeroSection = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  position: relative;
  background-color: ${({ theme }) => theme.colors.primary.main};
  overflow: hidden;
  padding-top: 70px;
`;

const HeroContainer = styled.div`
  display: flex;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.lg};
  justify-content: space-between;
  align-items: center;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    flex-direction: column;
    justify-content: center;
    text-align: center;
    gap: ${({ theme }) => theme.spacing.xxl};
  }
`;

const HeroContent = styled.div`
  flex: 1;
  max-width: 600px;
  z-index: 1;
`;

const StyledHeading = styled(motion.h1)`
  color: ${({ theme }) => theme.colors.accent.main};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  font-size: 4rem;
  line-height: 1.1;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    font-size: 3.5rem;
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 2.75rem;
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 2.25rem;
  }
`;

const SubHeading = styled(motion.p)`
  color: ${({ theme }) => theme.colors.grey[300]};
  font-size: 1.5rem;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 1.25rem;
  }
`;

const CTAButton = styled(motion.button)`
  background-color: ${({ theme }) => theme.colors.secondary.main};
  color: ${({ theme }) => theme.colors.accent.light};
  font-weight: 600;
  font-size: 1.1rem;
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.xl}`};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  cursor: pointer;
  overflow: hidden;
  position: relative;
  transition: all ${({ theme }) => theme.transitions.normal};
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary.dark};
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.md};
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const ProfileImage = styled(motion.div)`
  flex: 1;
  max-width: 400px;
  aspect-ratio: 1;
  border-radius: ${({ theme }) => theme.borderRadius.circle};
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.primary.light};
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: ${({ theme }) => theme.colors.accent.main};
    border-radius: 50%;
    transform: scale(0.7);
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    max-width: 300px;
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    max-width: 250px;
  }
`;

const ScrollIndicator = styled(motion.div)`
  position: absolute;
  bottom: ${({ theme }) => theme.spacing.xl};
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${({ theme }) => theme.colors.accent.light};
  font-size: 0.9rem;
  
  svg {
    margin-top: ${({ theme }) => theme.spacing.sm};
    animation: bounce 2s infinite;
  }
  
  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(-10px);
    }
    60% {
      transform: translateY(-5px);
    }
  }
`;

const Hero = () => {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  return (
    <HeroSection id="home" ref={ref}>
      <HeroContainer>
        <HeroContent as={motion.div}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <StyledHeading variants={itemVariants}>
            Hi, I'm Sarah<br />
            I'm a Web Developer
          </StyledHeading>
          <SubHeading variants={itemVariants}>
            I craft beautiful, functional websites and applications with attention to detail and user experience.
          </SubHeading>
          <CTAButton
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
          >
            View My Work
          </CTAButton>
        </HeroContent>
        
        <ProfileImage
          as={motion.div}
          variants={imageVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        />
      </HeroContainer>
      
      <ScrollIndicator
        as={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <span>Scroll Down</span>
        <ArrowDown size={24} />
      </ScrollIndicator>
    </HeroSection>
  );
};

export default Hero;