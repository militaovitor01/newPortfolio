import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Award, ExternalLink } from 'lucide-react';

const CertificatesSection = styled.section`
  background-color: ${({ theme }) => theme.colors.primary.light};
  padding: ${({ theme }) => `${theme.spacing.xxl} 0`};
`;

const CertificatesContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.lg};
`;

const SectionTitle = styled(motion.h2)`
  color: ${({ theme }) => theme.colors.accent.main};
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
    background-color: ${({ theme }) => theme.colors.secondary.main};
  }
`;

const SectionDescription = styled(motion.p)`
  text-align: center;
  max-width: 700px;
  margin: 0 auto ${({ theme }) => theme.spacing.xxl};
  color: ${({ theme }) => theme.colors.grey[300]};
  font-size: 1.1rem;
`;

const CertificatesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: ${({ theme }) => theme.spacing.xl};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const CertificateCard = styled(motion.div)`
  background-color: ${({ theme }) => theme.colors.primary.main};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing.xl};
  box-shadow: ${({ theme }) => theme.shadows.md};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const CertificateIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: ${({ theme }) => theme.borderRadius.circle};
  background-color: ${({ theme }) => theme.colors.secondary.main}20;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.secondary.main};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const CertificateTitle = styled.h3`
  color: ${({ theme }) => theme.colors.accent.main};
  font-size: 1.3rem;
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const CertificateIssuer = styled.p`
  color: ${({ theme }) => theme.colors.secondary.main};
  font-size: 1rem;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const CertificateDate = styled.p`
  color: ${({ theme }) => theme.colors.grey[400]};
  font-size: 0.9rem;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const CertificateDescription = styled.p`
  color: ${({ theme }) => theme.colors.grey[300]};
  font-size: 0.95rem;
  line-height: 1.6;
  flex-grow: 1;
`;

const ViewCertificateLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  color: ${({ theme }) => theme.colors.accent.main};
  font-size: 0.9rem;
  text-decoration: none;
  transition: color ${({ theme }) => theme.transitions.fast};
  
  &:hover {
    color: ${({ theme }) => theme.colors.secondary.main};
  }
`;

const certificates = [
  {
    id: 1,
    title: "AWS Certified Solutions Architect",
    issuer: "Amazon Web Services",
    date: "December 2023",
    description: "Professional certification validating expertise in designing distributed systems and deploying applications on AWS infrastructure.",
    link: "#"
  },
  {
    id: 2,
    title: "Meta Frontend Developer",
    issuer: "Meta (formerly Facebook)",
    date: "October 2023",
    description: "Advanced certification in modern frontend development, including React, responsive design, and performance optimization.",
    link: "#"
  },
  {
    id: 3,
    title: "Google Cloud Professional",
    issuer: "Google",
    date: "August 2023",
    description: "Comprehensive certification covering cloud architecture, security, and deployment of scalable applications.",
    link: "#"
  }
];

const Certificates = () => {
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
    <CertificatesSection id="certificates" ref={ref}>
      <CertificatesContainer>
        <SectionTitle
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          Certificates
        </SectionTitle>
        
        <SectionDescription
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Professional certifications and achievements that demonstrate my expertise and commitment to continuous learning.
        </SectionDescription>
        
        <CertificatesGrid
          as={motion.div}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {certificates.map((certificate) => (
            <CertificateCard
              key={certificate.id}
              variants={itemVariants}
              whileHover={{ y: -5 }}
            >
              <CertificateIcon>
                <Award size={24} />
              </CertificateIcon>
              <CertificateTitle>{certificate.title}</CertificateTitle>
              <CertificateIssuer>{certificate.issuer}</CertificateIssuer>
              <CertificateDate>{certificate.date}</CertificateDate>
              <CertificateDescription>{certificate.description}</CertificateDescription>
              <ViewCertificateLink href={certificate.link} target="_blank" rel="noopener noreferrer">
                View Certificate <ExternalLink size={16} />
              </ViewCertificateLink>
            </CertificateCard>
          ))}
        </CertificatesGrid>
      </CertificatesContainer>
    </CertificatesSection>
  );
};

export default Certificates;