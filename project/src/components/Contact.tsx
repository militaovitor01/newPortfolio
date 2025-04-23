import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const ContactSection = styled.section`
  background-color: ${({ theme }) => theme.colors.primary.main};
  padding: ${({ theme }) => `${theme.spacing.xxl} 0`};
`;

const ContactContainer = styled.div`
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

const ContactContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: ${({ theme }) => theme.spacing.xxl};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

const ContactItem = styled(motion.div)`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.md};
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: ${({ theme }) => theme.borderRadius.circle};
  background-color: ${({ theme }) => theme.colors.primary.light};
  color: ${({ theme }) => theme.colors.accent.main};
`;

const ContactText = styled.div`
  flex: 1;
  
  h3 {
    color: ${({ theme }) => theme.colors.accent.main};
    margin-bottom: ${({ theme }) => theme.spacing.xs};
    font-size: 1.2rem;
  }
  
  p {
    color: ${({ theme }) => theme.colors.grey[300]};
    font-size: 1rem;
    line-height: 1.6;
  }
`;

const ContactForm = styled(motion.form)`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`;

const Label = styled.label`
  color: ${({ theme }) => theme.colors.accent.main};
  font-size: 1rem;
`;

const Input = styled.input`
  padding: ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.primary.light};
  border: 1px solid ${({ theme }) => theme.colors.primary.light};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  color: ${({ theme }) => theme.colors.accent.light};
  font-family: 'Inter', sans-serif;
  transition: all ${({ theme }) => theme.transitions.fast};
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.secondary.main};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.secondary.light}25;
  }
`;

const TextArea = styled.textarea`
  padding: ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.primary.light};
  border: 1px solid ${({ theme }) => theme.colors.primary.light};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  color: ${({ theme }) => theme.colors.accent.light};
  font-family: 'Inter', sans-serif;
  resize: vertical;
  min-height: 150px;
  transition: all ${({ theme }) => theme.transitions.fast};
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.secondary.main};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.secondary.light}25;
  }
`;

const SubmitButton = styled(motion.button)`
  background-color: ${({ theme }) => theme.colors.secondary.main};
  color: ${({ theme }) => theme.colors.accent.light};
  font-weight: 600;
  font-size: 1.1rem;
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.xl}`};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};
  align-self: flex-start;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary.dark};
  }
`;

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Here you would typically send the form data to a server
    alert('Message sent successfully!');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

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
    <ContactSection id="contact" ref={ref}>
      <ContactContainer>
        <SectionTitle
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          Contact
        </SectionTitle>
        
        <SectionDescription
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Have a project in mind or want to discuss potential opportunities? 
          Feel free to reach out through the form below or via the provided contact information.
        </SectionDescription>
        
        <ContactContent>
          <ContactInfo as={motion.div}
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <ContactItem variants={itemVariants}>
              <IconWrapper>
                <Mail size={24} />
              </IconWrapper>
              <ContactText>
                <h3>Email</h3>
                <p>contact@sarahdev.com</p>
              </ContactText>
            </ContactItem>
            
            <ContactItem variants={itemVariants}>
              <IconWrapper>
                <Phone size={24} />
              </IconWrapper>
              <ContactText>
                <h3>Phone</h3>
                <p>+1 (555) 123-4567</p>
              </ContactText>
            </ContactItem>
            
            <ContactItem variants={itemVariants}>
              <IconWrapper>
                <MapPin size={24} />
              </IconWrapper>
              <ContactText>
                <h3>Location</h3>
                <p>San Francisco, CA</p>
              </ContactText>
            </ContactItem>
          </ContactInfo>
          
          <ContactForm
            onSubmit={handleSubmit}
            as={motion.form}
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <FormGroup as={motion.div} variants={itemVariants}>
              <Label htmlFor="name">Name</Label>
              <Input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </FormGroup>
            
            <FormGroup as={motion.div} variants={itemVariants}>
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </FormGroup>
            
            <FormGroup as={motion.div} variants={itemVariants}>
              <Label htmlFor="subject">Subject</Label>
              <Input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </FormGroup>
            
            <FormGroup as={motion.div} variants={itemVariants}>
              <Label htmlFor="message">Message</Label>
              <TextArea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
              />
            </FormGroup>
            
            <SubmitButton
              type="submit"
              as={motion.button}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Send Message <Send size={18} />
            </SubmitButton>
          </ContactForm>
        </ContactContent>
      </ContactContainer>
    </ContactSection>
  );
};

export default Contact;