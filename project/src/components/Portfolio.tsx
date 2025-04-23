import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ExternalLink, Code, X } from 'lucide-react';

const PortfolioSection = styled.section`
  background-color: ${({ theme }) => theme.colors.secondary.main};
  padding: ${({ theme }) => `${theme.spacing.xxl} 0`};
`;

const PortfolioContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.lg};
`;

const SectionTitle = styled(motion.h2)`
  color: ${({ theme }) => theme.colors.primary.main};
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  font-size: 3rem;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -${({ theme }) => theme.spacing.sm};
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 3px;
    background-color: ${({ theme }) => theme.colors.primary.main};
  }
`;

const SectionDescription = styled(motion.p)`
  text-align: center;
  max-width: 700px;
  margin: 0 auto ${({ theme }) => theme.spacing.xxl};
  color: ${({ theme }) => theme.colors.primary.dark};
  font-size: 1.1rem;
`;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.spacing.xl};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const ProjectCard = styled(motion.div)`
  background-color: ${({ theme }) => theme.colors.primary.main};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.md};
  transition: transform ${({ theme }) => theme.transitions.normal};
  cursor: pointer;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const ProjectImage = styled.div`
  height: 200px;
  background-color: ${({ theme }) => theme.colors.primary.dark};
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background: linear-gradient(45deg, 
      ${({ theme }) => theme.colors.primary.dark} 25%, 
      ${({ theme }) => theme.colors.primary.main} 25%, 
      ${({ theme }) => theme.colors.primary.main} 50%, 
      ${({ theme }) => theme.colors.primary.dark} 50%, 
      ${({ theme }) => theme.colors.primary.dark} 75%, 
      ${({ theme }) => theme.colors.primary.main} 75%, 
      ${({ theme }) => theme.colors.primary.main} 100%
    );
    background-size: 20px 20px;
    border: 2px solid ${({ theme }) => theme.colors.secondary.main};
  }
`;

const ProjectInfo = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.colors.accent.light};
`;

const ProjectTitle = styled.h3`
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.accent.main};
  font-size: 1.3rem;
`;

const ProjectDescription = styled.p`
  margin-bottom: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.grey[300]};
  font-size: 0.95rem;
`;

const ProjectTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.xs};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const ProjectTag = styled.span`
  background-color: ${({ theme }) => theme.colors.primary.light};
  color: ${({ theme }) => theme.colors.accent.light};
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: 0.8rem;
`;

const ProjectLinks = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
`;

const ProjectLink = styled.a`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  color: ${({ theme }) => theme.colors.accent.main};
  font-size: 0.9rem;
  transition: color ${({ theme }) => theme.transitions.fast};
  
  &:hover {
    color: ${({ theme }) => theme.colors.secondary.main};
  }
`;

const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: ${({ theme }) => theme.spacing.lg};
`;

const ModalContent = styled(motion.div)`
  background-color: ${({ theme }) => theme.colors.primary.main};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  width: 100%;
  max-width: 900px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  padding: ${({ theme }) => theme.spacing.xl};
`;

const CloseButton = styled.button`
  position: absolute;
  top: ${({ theme }) => theme.spacing.md};
  right: ${({ theme }) => theme.spacing.md};
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.accent.main};
  cursor: pointer;
  z-index: 1;
`;

const projects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "A fully responsive e-commerce platform with product filtering, cart functionality, and payment integration.",
    tags: ["React", "Node.js", "MongoDB", "Stripe"],
    codeLink: "#",
    demoLink: "#",
  },
  {
    id: 2,
    title: "Dashboard UI",
    description: "An interactive admin dashboard with data visualization, user management, and real-time updates.",
    tags: ["React", "TypeScript", "Chart.js", "Firebase"],
    codeLink: "#",
    demoLink: "#",
  },
  {
    id: 3,
    title: "Blog Platform",
    description: "A modern blog platform with markdown support, commenting system, and user authentication.",
    tags: ["Next.js", "GraphQL", "PostgreSQL", "AWS"],
    codeLink: "#",
    demoLink: "#",
  }
];

interface ProjectModalProps {
  project: typeof projects[0] | null;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <ModalOverlay
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <ModalContent
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <CloseButton onClick={onClose}>
          <X size={24} />
        </CloseButton>
        
        <ProjectTitle>{project.title}</ProjectTitle>
        
        <ProjectImage style={{ height: '300px', marginBottom: '20px' }} />
        
        <ProjectDescription>
          {project.description}<br /><br />
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. 
          Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus 
          rhoncus ut eleifend nibh porttitor. Ut in nulla enim. Phasellus molestie magna 
          non est bibendum non venenatis nisl tempor. Suspendisse dictum feugiat nisl ut dapibus.
        </ProjectDescription>
        
        <ProjectTags>
          {project.tags.map((tag, index) => (
            <ProjectTag key={index}>{tag}</ProjectTag>
          ))}
        </ProjectTags>
        
        <ProjectLinks>
          <ProjectLink href={project.demoLink} target="_blank" rel="noopener noreferrer">
            <ExternalLink size={16} /> Live Demo
          </ProjectLink>
          <ProjectLink href={project.codeLink} target="_blank" rel="noopener noreferrer">
            <Code size={16} /> View Code
          </ProjectLink>
        </ProjectLinks>
      </ModalContent>
    </ModalOverlay>
  );
};

const Portfolio = () => {
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <PortfolioSection id="portfolio" ref={ref}>
      <PortfolioContainer>
        <SectionTitle
          as={motion.h2}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          Portfolio
        </SectionTitle>
        
        <SectionDescription
          as={motion.p}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Here are some of my recent projects. Each project is built with attention to detail, 
          focusing on both functionality and user experience.
        </SectionDescription>
        
        <ProjectsGrid as={motion.div}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              variants={itemVariants}
              onClick={() => setSelectedProject(project)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <ProjectImage />
              <ProjectInfo>
                <ProjectTitle>{project.title}</ProjectTitle>
                <ProjectDescription>{project.description}</ProjectDescription>
                <ProjectTags>
                  {project.tags.map((tag, index) => (
                    <ProjectTag key={index}>{tag}</ProjectTag>
                  ))}
                </ProjectTags>
                <ProjectLinks>
                  <ProjectLink href={project.demoLink} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                    <ExternalLink size={16} /> Live Demo
                  </ProjectLink>
                  <ProjectLink href={project.codeLink} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                    <Code size={16} /> View Code
                  </ProjectLink>
                </ProjectLinks>
              </ProjectInfo>
            </ProjectCard>
          ))}
        </ProjectsGrid>
      </PortfolioContainer>
      
      {selectedProject && (
        <ProjectModal 
          project={selectedProject} 
          onClose={() => setSelectedProject(null)} 
        />
      )}
    </PortfolioSection>
  );
};

export default Portfolio;