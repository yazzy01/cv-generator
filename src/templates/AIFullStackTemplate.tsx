import React from 'react';
import { CV } from '../types/cv';
import {
  Box,
  Paper,
  Typography,
  styled,
  Grid,
  ButtonGroup,
  Button,
  CssBaseline,
  ThemeProvider,
  createTheme,
  Divider,
  Chip,
  Avatar,
  LinearProgress
} from '@mui/material';
import { PictureAsPdf, Image, Code, Psychology, Storage, School, Language, Settings, Work } from '@mui/icons-material';
import html2canvas from 'html2canvas';
import html2pdf from 'html2pdf.js';

// AI & Full Stack specialized theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#6200ee', // Deep purple - AI theme
      light: '#985eff',
      dark: '#4a00b0',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#03dac6', // Teal accent - tech feel
      light: '#66fff9',
      dark: '#00a896',
      contrastText: '#000000',
    },
    background: {
      default: '#fafafa',
      paper: '#ffffff',
    },
    text: {
      primary: '#121212',
      secondary: '#505050',
    },
    info: {
      main: '#2196f3', // Blue for coding sections
    },
    success: {
      main: '#4caf50', // Green for skills
    },
    warning: {
      main: '#ff9800', // Orange for certifications
    },
  },
  typography: {
    fontFamily: '"Roboto Mono", "Roboto", monospace, sans-serif',
    h4: {
      fontWeight: 600,
      letterSpacing: '0.02em',
    },
    h5: {
      fontWeight: 500,
      letterSpacing: '0.01em',
    },
    h6: {
      fontWeight: 500,
    },
    subtitle1: {
      fontWeight: 400,
      letterSpacing: '0.01em',
    },
    body1: {
      fontSize: '0.9rem',
      lineHeight: 1.6,
      letterSpacing: '0.01em',
    },
    body2: {
      fontSize: '0.85rem',
      lineHeight: 1.5,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
          fontWeight: 500,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        elevation1: {
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          fontFamily: '"Roboto Mono", monospace',
          fontWeight: 500,
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: 'rgba(0, 0, 0, 0.08)',
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          height: 8,
        },
      },
    },
  },
});

interface AIFullStackTemplateProps {
  data: CV;
  onExportPDF: () => void;
  onExportImages: () => void;
  isExporting: boolean;
}

// Styled components
const Section = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(2.5),
  position: 'relative',
  '&:last-child': {
    marginBottom: 0,
  },
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontWeight: 600,
  fontSize: '1rem',
  marginBottom: theme.spacing(1),
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  fontFamily: '"Roboto Mono", monospace',
  position: 'relative',
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: -6,
    left: 0,
    width: '35px',
    height: '3px',
    backgroundColor: theme.palette.secondary.main,
  },
}));

const AIChip = styled(Chip)(({ theme }) => ({
  margin: theme.spacing(0.5),
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  fontWeight: 500,
  height: '22px',
  fontSize: '0.7rem',
  '& .MuiChip-label': {
    padding: '0 8px',
  },
  '&.MuiChip-outlined': {
    backgroundColor: 'transparent',
    borderColor: theme.palette.primary.main,
    color: theme.palette.primary.main,
  },
}));

const FullStackChip = styled(Chip)(({ theme }) => ({
  margin: theme.spacing(0.5),
  backgroundColor: theme.palette.info.main,
  color: theme.palette.info.contrastText,
  fontWeight: 500,
  height: '22px',
  fontSize: '0.7rem',
  '& .MuiChip-label': {
    padding: '0 8px',
  },
  '&.MuiChip-outlined': {
    backgroundColor: 'transparent',
    borderColor: theme.palette.info.main,
    color: theme.palette.info.main,
  },
}));

const ExperienceCard = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(1.5),
  padding: theme.spacing(1.5),
  borderLeft: `4px solid ${theme.palette.primary.main}`,
  backgroundColor: 'rgba(98, 0, 238, 0.03)',
  borderRadius: '0 8px 8px 0',
  transition: 'all 0.3s ease',
  '&:hover': {
    boxShadow: '0 6px 20px rgba(98, 0, 238, 0.1)',
    backgroundColor: 'rgba(98, 0, 238, 0.05)',
    transform: 'translateX(4px)',
  },
}));

const SkillProgress = styled(LinearProgress)(({ theme, color = 'primary' }) => ({
  height: 6,
  borderRadius: 3,
  marginTop: 3,
  marginBottom: 8,
  backgroundColor: 'rgba(0, 0, 0, 0.08)',
  '& .MuiLinearProgress-bar': {
    backgroundColor: color === 'primary' 
      ? theme.palette.primary.main 
      : color === 'info' 
        ? theme.palette.info.main 
        : theme.palette.secondary.main,
  },
}));

const CodeBlock = styled(Box)(({ theme }) => ({
  fontFamily: '"Roboto Mono", monospace',
  backgroundColor: '#272822',
  color: '#f8f8f2',
  padding: theme.spacing(1.2),
  borderRadius: 6,
  fontSize: '0.65rem',
  lineHeight: 1.4,
  marginBottom: theme.spacing(1),
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundImage: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.02) 50%, transparent 50%)',
    backgroundSize: '100% 6px',
    opacity: 0.2,
    pointerEvents: 'none',
  },
}));

const AIFullStackTemplate: React.FC<AIFullStackTemplateProps> = ({ 
  data, 
  onExportPDF, 
  onExportImages, 
  isExporting 
}) => {
  const getSkillCategory = (category: string) => {
    if (category.toLowerCase().includes('ai') || 
        category.toLowerCase().includes('data')) {
      return 'ai';
    } else if (category.toLowerCase().includes('develop') ||
               category.toLowerCase().includes('backend') ||
               category.toLowerCase().includes('front')) {
      return 'dev';
    }
    return 'other';
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: '100vh',
          background: 'linear-gradient(to bottom, #f8f9fa, #f1f1f1)',
          py: 4,
          px: 2,
          position: 'relative',
        }}
      >
        {/* Controls */}
        <Box
          sx={{
            maxWidth: '210mm',
            mx: 'auto',
            mb: 3,
            display: 'flex',
            justifyContent: 'flex-end',
            gap: 2,
          }}
        >
          <ButtonGroup variant="contained" sx={{ borderRadius: 2, boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
            <Button
              startIcon={<PictureAsPdf />}
              onClick={onExportPDF}
              disabled={isExporting}
              sx={{ background: 'linear-gradient(45deg, #6200ee 30%, #985eff 90%)' }}
            >
              {isExporting ? 'Exporting...' : 'Export PDF'}
            </Button>
            <Button
              startIcon={<Image />}
              onClick={onExportImages}
              disabled={isExporting}
              sx={{ background: 'linear-gradient(45deg, #2196f3 30%, #64b5f6 90%)' }}
            >
              {isExporting ? 'Exporting...' : 'Export Images'}
            </Button>
          </ButtonGroup>
        </Box>

        {/* Pages Container */}
        <Box
          id="cv-pages-container"
          sx={{
            position: 'relative',
            width: '210mm',
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
            maxHeight: '297mm',
            overflow: 'hidden',
          }}
        >
          {/* Page 1 */}
          <Paper
            className="cv-page"
            elevation={1}
            sx={{
              width: '210mm',
              height: '297mm',
              position: 'relative',
              backgroundColor: '#ffffff',
              overflow: 'hidden',
              p: 2.5,
              boxSizing: 'border-box',
            }}
          >
            {/* Header with AI-themed design */}
            <Box sx={{ 
              mb: 2, 
              position: 'relative',
              pb: 1.5,
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: '100%',
                height: '1px',
                background: 'linear-gradient(90deg, #6200ee, transparent)',
              },
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1.5 }}>
                <Avatar
                  sx={{ 
                    width: 80, 
                    height: 80, 
                    background: 'linear-gradient(135deg, #6200ee 0%, #985eff 100%)',
                    fontSize: '2rem',
                    fontWeight: 'bold',
                    border: '3px solid white',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
                  }}
                >
                  {data.personalInfo.fullName.charAt(0)}
                </Avatar>
                <Box>
                  <Typography variant="h4" sx={{ 
                    fontWeight: 700, 
                    color: '#121212',
                    fontFamily: '"Roboto Mono", monospace',
                    fontSize: '1.7rem',
                  }}>
                    {data.personalInfo.fullName}
                  </Typography>
                  <Typography variant="h6" sx={{ 
                    color: theme.palette.primary.main,
                    fontWeight: 500,
                    letterSpacing: '0.01em',
                    fontSize: '1.1rem',
                  }}>
                    {data.personalInfo.title}
                  </Typography>
                </Box>
              </Box>
              
              <Grid container spacing={2}>
                <Grid item xs={12} md={8}>
                  {/* Professional Summary - Coding themed */}
                  <CodeBlock>
                    <Typography sx={{ 
                      fontFamily: 'inherit', 
                      color: '#a6e22e', // Monokai green
                      mb: 0.3,
                      fontSize: '0.65rem',
                    }}>
                      // Professional Summary
                    </Typography>
                    <Typography sx={{ fontFamily: 'inherit', fontSize: '0.65rem', lineHeight: 1.4 }}>
                      <span style={{ color: '#f92672' }}>const</span> <span style={{ color: '#66d9ef' }}>profile</span> = {'{'}
                      <br />
                      &nbsp;&nbsp;<span style={{ color: '#a6e22e' }}>expertise</span>: <span style={{ color: '#e6db74' }}>"{data.professionalSummary.substring(0, 50)}..."</span>,
                      <br />
                      &nbsp;&nbsp;<span style={{ color: '#a6e22e' }}>skills</span>: [<span style={{ color: '#e6db74' }}>"AI", "Full Stack", "Data"</span>],
                      <br />
                      &nbsp;&nbsp;<span style={{ color: '#a6e22e' }}>languages</span>: [<span style={{ color: '#e6db74' }}>"Arabic", "English", "French"</span>]
                      <br />
                      {'}'};
                    </Typography>
                  </CodeBlock>
                </Grid>
                <Grid item xs={12} md={4}>
                  {/* Contact Info */}
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                    <Typography variant="body2" sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: 1,
                      fontFamily: '"Roboto Mono", monospace',
                      fontSize: '0.75rem',
                    }}>
                      <Box sx={{ 
                        width: 20,
                        height: 20,
                        borderRadius: '50%', 
                        bgcolor: 'rgba(98, 0, 238, 0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: theme.palette.primary.main,
                        fontSize: '0.7rem',
                      }}>@</Box>
                      {data.personalInfo.email}
                    </Typography>
                    <Typography variant="body2" sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: 1,
                      fontFamily: '"Roboto Mono", monospace',
                    }}>
                      <Box sx={{ 
                        width: 24, 
                        height: 24, 
                        borderRadius: '50%', 
                        bgcolor: 'rgba(98, 0, 238, 0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: theme.palette.primary.main,
                      }}>#</Box>
                      {data.personalInfo.phone}
                    </Typography>
                    <Typography variant="body2" sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: 1,
                      fontFamily: '"Roboto Mono", monospace',
                    }}>
                      <Box sx={{ 
                        width: 24, 
                        height: 24, 
                        borderRadius: '50%', 
                        bgcolor: 'rgba(98, 0, 238, 0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: theme.palette.primary.main,
                      }}>$</Box>
                      {data.personalInfo.address.city}, {data.personalInfo.address.country}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>

            {/* Two-column layout */}
            <Grid container spacing={1.5}>
              {/* Left column */}
              <Grid item xs={6.5}>
                {/* AI Experience */}
                <Section>
                  <SectionTitle>
                    <Psychology /> AI Experience
                  </SectionTitle>
                  {data.experience.slice(0, 2).map((exp, index) => (
                    <ExperienceCard key={index}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="h6" sx={{ 
                          fontWeight: 600, 
                          color: theme.palette.primary.main,
                          fontSize: '0.95rem'
                        }}>
                          {exp.position}
                        </Typography>
                        <Box sx={{ 
                          bgcolor: 'rgba(98, 0, 238, 0.1)', 
                          px: 1, 
                          py: 0.5, 
                          borderRadius: 4,
                          fontSize: '0.7rem',
                          fontFamily: '"Roboto Mono", monospace',
                          color: theme.palette.primary.main,
                          fontWeight: 500,
                        }}>
                          {exp.startDate} - {exp.endDate}
                        </Box>
                      </Box>
                      <Typography variant="subtitle1" sx={{ mb: 1, fontSize: '0.85rem' }}>
                        <span style={{ fontWeight: 500 }}>{exp.company}</span> | {exp.location}
                      </Typography>
                      <Box sx={{ pl: 0.5 }}>
                        {exp.responsibilities.map((resp, idx) => (
                          <Typography key={idx} variant="body2" sx={{ 
                            display: 'flex', 
                            alignItems: 'flex-start',
                            mb: 0.5,
                            fontSize: '0.8rem',
                            '&:before': {
                              content: '">"',
                              mr: 1,
                              color: theme.palette.primary.main,
                              fontFamily: '"Roboto Mono", monospace',
                              fontWeight: 'bold',
                            }
                          }}>
                            {resp}
                          </Typography>
                        ))}
                      </Box>
                    </ExperienceCard>
                  ))}
                </Section>

                {/* Development Experience */}
                <Section>
                  <SectionTitle>
                    <Code /> Full Stack Development
                  </SectionTitle>
                  <ExperienceCard>
                    <Typography variant="h6" sx={{ 
                      fontWeight: 600, 
                      color: theme.palette.info.main,
                      fontSize: '0.9rem',
                      mb: 1,
                    }}>
                      Backend Development Specialist
                    </Typography>
                    <Box sx={{ pl: 0.5, mb: 1.5 }}>
                      <Typography variant="body2" sx={{ mb: 0.5, display: 'flex', alignItems: 'center', fontSize: '0.75rem' }}>
                        <span style={{ 
                          fontFamily: '"Roboto Mono", monospace', 
                          color: theme.palette.info.main,
                          marginRight: '8px',
                        }}>•</span>
                        API design and development with focus on data processing
                      </Typography>
                      <Typography variant="body2" sx={{ mb: 0.5, display: 'flex', alignItems: 'center', fontSize: '0.75rem' }}>
                        <span style={{ 
                          fontFamily: '"Roboto Mono", monospace', 
                          color: theme.palette.info.main,
                          marginRight: '8px',
                        }}>•</span>
                        Database management for AI training datasets
                      </Typography>
                      <Typography variant="body2" sx={{ mb: 0.5, display: 'flex', alignItems: 'center', fontSize: '0.75rem' }}>
                        <span style={{ 
                          fontFamily: '"Roboto Mono", monospace', 
                          color: theme.palette.info.main,
                          marginRight: '8px',
                        }}>•</span>
                        Integration of ML models with web applications
                      </Typography>
                      <Typography variant="body2" sx={{ mb: 0.5, display: 'flex', alignItems: 'center', fontSize: '0.75rem' }}>
                        <span style={{ 
                          fontFamily: '"Roboto Mono", monospace', 
                          color: theme.palette.info.main,
                          marginRight: '8px',
                        }}>•</span>
                        Quality assurance and testing for AI-driven applications
                      </Typography>
                      <Typography variant="body2" sx={{ mb: 0.5, display: 'flex', alignItems: 'center', fontSize: '0.75rem' }}>
                        <span style={{ 
                          fontFamily: '"Roboto Mono", monospace', 
                          color: theme.palette.info.main,
                          marginRight: '8px',
                        }}>•</span>
                        Implementing security best practices for data handling
                      </Typography>
                    </Box>
                    
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      <FullStackChip label="Python" size="small" />
                      <FullStackChip label="API Development" size="small" />
                      <FullStackChip label="Database Management" size="small" />
                      <FullStackChip label="Quality Assurance" size="small" />
                      <FullStackChip label="Security" size="small" />
                    </Box>
                  </ExperienceCard>
                </Section>
              </Grid>

              {/* Right column */}
              <Grid item xs={5.5}>
                {/* Technical Skills */}
                <Section>
                  <SectionTitle>
                    <Settings /> Technical Skills
                  </SectionTitle>
                  
                  {data.technicalSkills.slice(0, 3).map((skillGroup, index) => {
                    const category = getSkillCategory(skillGroup.category);
                    
                    return (
                      <Box key={index} sx={{ mb: 2 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
                          <Typography variant="subtitle1" sx={{ 
                            fontWeight: 600, 
                            fontSize: '0.8rem',
                            color: category === 'ai' 
                              ? theme.palette.primary.main 
                              : category === 'dev' 
                                ? theme.palette.info.main 
                                : theme.palette.text.primary
                          }}>
                            {skillGroup.category}
                          </Typography>
                          <Box sx={{ 
                            bgcolor: category === 'ai' 
                              ? 'rgba(98, 0, 238, 0.1)' 
                              : category === 'dev' 
                                ? 'rgba(33, 150, 243, 0.1)' 
                                : 'rgba(0, 0, 0, 0.05)', 
                            px: 1, 
                            py: 0.2, 
                            borderRadius: 4,
                            fontSize: '0.6rem',
                            fontFamily: '"Roboto Mono", monospace',
                            color: category === 'ai' 
                              ? theme.palette.primary.main 
                              : category === 'dev' 
                                ? theme.palette.info.main 
                                : theme.palette.text.secondary,
                          }}>
                            {category === 'ai' ? 'AI/ML' : category === 'dev' ? 'Development' : 'General'}
                          </Box>
                        </Box>
                        
                        <SkillProgress 
                          variant="determinate" 
                          value={95} 
                          color={category === 'ai' ? 'primary' : category === 'dev' ? 'info' : 'secondary'}
                        />
                        
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                          {skillGroup.skills.slice(0, 3).map((skill, idx) => (
                            category === 'ai' ? (
                              <AIChip key={idx} label={skill} size="small" />
                            ) : (
                              <FullStackChip key={idx} label={skill} size="small" />
                            )
                          ))}
                        </Box>
                      </Box>
                    );
                  })}
                </Section>

                {/* Languages */}
                <Section>
                  <SectionTitle>
                    <Language /> Languages
                  </SectionTitle>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    {/* Arabic - Special handling with improved styling */}
                    <Box sx={{ mb: 0.5 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                        <Typography sx={{ fontWeight: 600, fontSize: '0.8rem' }}>
                          Arabic
                        </Typography>
                        <Typography sx={{ 
                          fontSize: '0.7rem',
                          color: theme.palette.primary.main,
                          fontWeight: 500
                        }}>
                          Native
                        </Typography>
                      </Box>
                      <SkillProgress variant="determinate" value={100} />
                      <Typography sx={{ 
                        fontSize: '0.7rem',
                        color: theme.palette.text.secondary,
                        fontStyle: 'italic'
                      }}>
                        Maghrebi, Levantine, Gulf, Egyptian dialects
                      </Typography>
                    </Box>
                    
                    {/* French */}
                    <Box sx={{ mb: 0.5 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                        <Typography sx={{ fontWeight: 600, fontSize: '0.85rem' }}>
                          French
                        </Typography>
                        <Typography sx={{ 
                          fontSize: '0.75rem', 
                          color: theme.palette.primary.main,
                          fontWeight: 500
                        }}>
                          Professional
                        </Typography>
                      </Box>
                      <SkillProgress variant="determinate" value={80} />
                    </Box>
                    
                    {/* English */}
                    <Box sx={{ mb: 0.5 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                        <Typography sx={{ fontWeight: 600, fontSize: '0.85rem' }}>
                          English
                        </Typography>
                        <Typography sx={{ 
                          fontSize: '0.75rem', 
                          color: theme.palette.primary.main,
                          fontWeight: 500
                        }}>
                          Professional
                        </Typography>
                      </Box>
                      <SkillProgress variant="determinate" value={80} />
                    </Box>
                  </Box>
                </Section>
                
                {/* Education & Certifications */}
                <Section>
                  <SectionTitle>
                    <School /> Education & Certifications
                  </SectionTitle>
                  
                  {/* Education */}
                  {data.education.slice(0, 1).map((edu, index) => (
                    <Box key={index} sx={{ 
                      mb: 1.5,
                      p: 1.5,
                      borderRadius: '8px',
                      border: '1px solid rgba(98, 0, 238, 0.1)',
                      backgroundColor: 'rgba(98, 0, 238, 0.02)'
                    }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600, fontSize: '0.8rem' }}>
                        {edu.degree} in {edu.field}
                      </Typography>
                      <Typography variant="body2" sx={{ 
                        mb: 0.5, 
                        display: 'flex', 
                        justifyContent: 'space-between',
                        fontSize: '0.7rem'
                      }}>
                        <span>{edu.institution}</span>
                        <span style={{ 
                          color: theme.palette.text.secondary,
                          fontSize: '0.65rem',
                          fontFamily: '"Roboto Mono", monospace',
                        }}>
                          {edu.startDate} - {edu.endDate}
                        </span>
                      </Typography>
                    </Box>
                  ))}
                  
                  {/* Top 2 Certifications */}
                  <Typography variant="subtitle1" sx={{ 
                    fontWeight: 600, 
                    mt: 1,
                    mb: 0.5,
                    fontSize: '0.8rem',
                    color: theme.palette.warning.main,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.5
                  }}>
                    <Work fontSize="small" /> Key Certifications
                  </Typography>
                  
                  {data.certifications.slice(0, 2).map((cert, index) => (
                    <Box key={index} sx={{ 
                      mb: 1,
                      pl: 1,
                      borderLeft: `2px solid ${theme.palette.warning.main}`
                    }}>
                      <Typography variant="subtitle2" sx={{ 
                        fontWeight: 600,
                        fontSize: '0.75rem'
                      }}>
                        {cert.title}
                      </Typography>
                      <Typography variant="body2" sx={{ 
                        color: theme.palette.text.secondary,
                        fontSize: '0.7rem',
                        display: 'flex',
                        justifyContent: 'space-between'
                      }}>
                        <span>{cert.organization}</span>
                        <span style={{ 
                          fontFamily: '"Roboto Mono", monospace',
                          fontSize: '0.65rem'
                        }}>{cert.date}</span>
                      </Typography>
                      {cert.details && cert.details.length > 0 && (
                        <Typography variant="body2" sx={{ 
                          color: theme.palette.text.secondary,
                          fontSize: '0.7rem',
                          mt: 0.3,
                          fontStyle: 'italic'
                        }}>
                          {cert.details[0]}
                        </Typography>
                      )}
                    </Box>
                  ))}
                </Section>
              </Grid>
            </Grid>

            <Typography
              className="page-number"
              sx={{
                position: 'absolute',
                bottom: '8mm',
                right: '8mm',
                fontSize: '8pt',
                color: theme.palette.text.secondary,
                fontFamily: '"Roboto Mono", monospace',
              }}
            >
              &lt;/page_1&gt;
            </Typography>
          </Paper>

          {/* Page 2 */}
          <Paper
            className="cv-page"
            elevation={1}
            sx={{
              width: '210mm',
              height: '297mm',
              position: 'relative',
              backgroundColor: '#ffffff',
              overflow: 'hidden',
              p: 2.5,
              boxSizing: 'border-box',
            }}
          >
            {/* Header for page 2 */}
            <Box sx={{ 
              mb: 2, 
              position: 'relative',
              pb: 1.5,
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: '100%',
                height: '1px',
                background: 'linear-gradient(90deg, #6200ee, transparent)',
              },
            }}>
              <Typography variant="h5" sx={{ 
                fontWeight: 700, 
                color: '#121212',
                fontFamily: '"Roboto Mono", monospace',
                fontSize: '1.2rem',
              }}>
                {data.personalInfo.fullName} - Continued
              </Typography>
            </Box>

            {/* Two-column layout for page 2 */}
            <Grid container spacing={1.5}>
              {/* Left column */}
              <Grid item xs={6.5}>
                {/* More Experience */}
                <Section>
                  <SectionTitle>
                    <Work /> Additional Experience
                  </SectionTitle>
                  {data.experience.slice(2).map((exp, index) => (
                    <ExperienceCard key={index}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="h6" sx={{ 
                          fontWeight: 600, 
                          color: theme.palette.primary.main,
                          fontSize: '0.95rem'
                        }}>
                          {exp.position}
                        </Typography>
                        <Box sx={{ 
                          bgcolor: 'rgba(98, 0, 238, 0.1)', 
                          px: 1, 
                          py: 0.5, 
                          borderRadius: 4,
                          fontSize: '0.7rem',
                          fontFamily: '"Roboto Mono", monospace',
                          color: theme.palette.primary.main,
                          fontWeight: 500,
                        }}>
                          {exp.startDate} - {exp.endDate}
                        </Box>
                      </Box>
                      <Typography variant="subtitle1" sx={{ mb: 1, fontSize: '0.85rem' }}>
                        <span style={{ fontWeight: 500 }}>{exp.company}</span> | {exp.location}
                      </Typography>
                      <Box sx={{ pl: 0.5 }}>
                        {exp.responsibilities.map((resp, idx) => (
                          <Typography key={idx} variant="body2" sx={{ 
                            display: 'flex', 
                            alignItems: 'flex-start',
                            mb: 0.5,
                            fontSize: '0.8rem',
                            '&:before': {
                              content: '">"',
                              mr: 1,
                              color: theme.palette.primary.main,
                              fontFamily: '"Roboto Mono", monospace',
                              fontWeight: 'bold',
                            }
                          }}>
                            {resp}
                          </Typography>
                        ))}
                      </Box>
                    </ExperienceCard>
                  ))}
                </Section>

                {/* Social Media */}
                <Section>
                  <SectionTitle>
                    <Language /> Social Media & Profiles
                  </SectionTitle>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    {data.socialMedia.map((social, index) => (
                      <Box key={index} sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: 1,
                        p: 1,
                        borderRadius: '8px',
                        border: '1px solid rgba(98, 0, 238, 0.1)',
                        backgroundColor: 'rgba(98, 0, 238, 0.02)'
                      }}>
                        <Box sx={{ 
                          width: 30, 
                          height: 30, 
                          borderRadius: '50%', 
                          bgcolor: 'rgba(98, 0, 238, 0.1)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: theme.palette.primary.main,
                          fontWeight: 'bold',
                          fontSize: '0.8rem'
                        }}>
                          {social.platform.charAt(0)}
                        </Box>
                        <Box>
                          <Typography sx={{ fontSize: '0.8rem', fontWeight: 600 }}>
                            {social.platform}
                          </Typography>
                          <Typography sx={{ 
                            fontSize: '0.75rem', 
                            color: theme.palette.primary.main,
                            fontFamily: '"Roboto Mono", monospace',
                          }}>
                            {social.username}
                          </Typography>
                        </Box>
                      </Box>
                    ))}
                  </Box>
                </Section>
              </Grid>

              {/* Right column */}
              <Grid item xs={5.5}>
                {/* Additional Technical Skills */}
                <Section>
                  <SectionTitle>
                    <Settings /> Additional Skills
                  </SectionTitle>
                  
                  {data.technicalSkills.slice(3).map((skillGroup, index) => {
                    const category = getSkillCategory(skillGroup.category);
                    
                    return (
                      <Box key={index} sx={{ mb: 2 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
                          <Typography variant="subtitle1" sx={{ 
                            fontWeight: 600, 
                            fontSize: '0.8rem',
                            color: category === 'ai' 
                              ? theme.palette.primary.main 
                              : category === 'dev' 
                                ? theme.palette.info.main 
                                : theme.palette.text.primary
                          }}>
                            {skillGroup.category}
                          </Typography>
                          <Box sx={{ 
                            bgcolor: category === 'ai' 
                              ? 'rgba(98, 0, 238, 0.1)' 
                              : category === 'dev' 
                                ? 'rgba(33, 150, 243, 0.1)' 
                                : 'rgba(0, 0, 0, 0.05)', 
                            px: 1, 
                            py: 0.2, 
                            borderRadius: 4,
                            fontSize: '0.6rem',
                            fontFamily: '"Roboto Mono", monospace',
                            color: category === 'ai' 
                              ? theme.palette.primary.main 
                              : category === 'dev' 
                                ? theme.palette.info.main 
                                : theme.palette.text.secondary,
                          }}>
                            {category === 'ai' ? 'AI/ML' : category === 'dev' ? 'Development' : 'General'}
                          </Box>
                        </Box>
                        
                        <SkillProgress 
                          variant="determinate" 
                          value={95} 
                          color={category === 'ai' ? 'primary' : category === 'dev' ? 'info' : 'secondary'}
                        />
                        
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                          {skillGroup.skills.map((skill, idx) => (
                            category === 'ai' ? (
                              <AIChip key={idx} label={skill} size="small" />
                            ) : (
                              <FullStackChip key={idx} label={skill} size="small" />
                            )
                          ))}
                        </Box>
                      </Box>
                    );
                  })}
                </Section>
                
                {/* More Certifications */}
                <Section>
                  <SectionTitle>
                    <School /> Additional Certifications
                  </SectionTitle>
                  
                  {data.certifications.slice(2).map((cert, index) => (
                    <Box key={index} sx={{ 
                      mb: 1.5,
                      pl: 1,
                      borderLeft: `2px solid ${theme.palette.warning.main}`
                    }}>
                      <Typography variant="subtitle2" sx={{ 
                        fontWeight: 600,
                        fontSize: '0.75rem'
                      }}>
                        {cert.title}
                      </Typography>
                      <Typography variant="body2" sx={{ 
                        color: theme.palette.text.secondary,
                        fontSize: '0.7rem',
                        display: 'flex',
                        justifyContent: 'space-between'
                      }}>
                        <span>{cert.organization}</span>
                        <span style={{ 
                          fontFamily: '"Roboto Mono", monospace',
                          fontSize: '0.65rem'
                        }}>{cert.date}</span>
                      </Typography>
                      <Box sx={{ mt: 0.5 }}>
                        {cert.details.slice(0, 2).map((detail, idx) => (
                          <Typography key={idx} variant="body2" sx={{ 
                            fontSize: '0.7rem',
                            color: theme.palette.text.secondary,
                            display: 'flex',
                            alignItems: 'center',
                            '&:before': {
                              content: '"•"',
                              mr: 0.5,
                              color: theme.palette.warning.main,
                            }
                          }}>
                            {detail}
                          </Typography>
                        ))}
                      </Box>
                    </Box>
                  ))}
                </Section>
              </Grid>
            </Grid>

            <Typography
              className="page-number"
              sx={{
                position: 'absolute',
                bottom: '8mm',
                right: '8mm',
                fontSize: '8pt',
                color: theme.palette.text.secondary,
                fontFamily: '"Roboto Mono", monospace',
              }}
            >
              &lt;/page_2&gt;
            </Typography>
          </Paper>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default AIFullStackTemplate; 