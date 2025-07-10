import React from 'react';
import { CV as CVType } from '../types/cv';
import {
  Box,
  Typography,
  Grid,
  Chip,
  Link,
  useTheme,
  styled,
  Divider,
  LinearProgress
} from '@mui/material';
import {
  Email,
  Phone,
  LocationOn,
  LinkedIn,
  Facebook,
  Flag,
  Person,
  Description,
  School,
  Language,
  Star,
  Verified,
  Work
} from '@mui/icons-material';

const Section = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(2.5),
  position: 'relative',
  width: '100%',
  '&:last-child': {
    marginBottom: 0,
  },
}));

const SectionTitle = styled(Typography)<{ color?: 'primary' | 'light' }>(({ theme, color = 'primary' }) => ({
  color: color === 'light' ? '#ffffff' : theme.palette.primary.main,
  fontWeight: 600,
  fontSize: '1rem',
  marginBottom: theme.spacing(2),
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  '& .MuiSvgIcon-root': {
    fontSize: '1.2rem',
  },
  position: 'relative',
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: -8,
    left: 0,
    width: '40px',
    height: '3px',
    backgroundColor: color === 'light' ? '#3498db' : theme.palette.primary.main,
    borderRadius: '2px',
  },
}));

const SidebarSectionTitle = styled(Typography)(({ theme }) => ({
  color: '#ffffff',
  fontWeight: 600,
  fontSize: '0.9rem',
  marginBottom: theme.spacing(1.5),
  textTransform: 'uppercase',
  letterSpacing: '1px',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  width: '100%',
  paddingRight: '6mm',
  '& .MuiSvgIcon-root': {
    fontSize: '1rem',
  },
}));

const ContactInfo = styled(Box)<{ color?: 'primary' | 'light' }>(({ theme, color = 'primary' }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(0.8),
  fontSize: '0.8rem',
  marginBottom: theme.spacing(1),
  width: '100%',
  paddingRight: '6mm',
  '& .MuiSvgIcon-root': {
    fontSize: '1rem',
    flexShrink: 0,
    color: color === 'light' ? '#3498db' : theme.palette.primary.main,
  },
}));

const SkillChip = styled(Chip)<{ customVariant?: 'default' | 'outlined' | 'light' }>(
  ({ theme, customVariant = 'default' }) => ({
  minHeight: '24px',
  height: 'auto',
  fontSize: '0.65rem',
  borderRadius: '12px',
  margin: '3px 3px 3px 0',
  fontWeight: 500,
  '& .MuiChip-label': {
    padding: '0 8px',
    overflow: 'visible',
    textOverflow: 'clip', 
    whiteSpace: 'normal',
    display: 'block',
    lineHeight: 1.2,
  },
  ...(customVariant === 'default' && {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.primary.contrastText,
  }),
  ...(customVariant === 'outlined' && {
    backgroundColor: 'transparent',
    border: `1px solid ${theme.palette.primary.main}`,
    color: theme.palette.primary.main,
  }),
  ...(customVariant === 'light' && {
    backgroundColor: 'rgba(52, 152, 219, 0.8)',
    color: '#ffffff',
  }),
}));

const ProgressBar = styled(LinearProgress)(({ theme }) => ({
  height: 6,
  borderRadius: 3,
  marginTop: 4,
  marginBottom: 8,
  backgroundColor: 'rgba(255, 255, 255, 0.2)',
  '& .MuiLinearProgress-bar': {
    backgroundColor: '#3498db',
  },
}));

interface CVProps {
  data: CVType;
  page: 1 | 2;
  section: 'sidebar' | 'main';
}

const CV: React.FC<CVProps> = ({ data, page, section }) => {
  const theme = useTheme();

  // Sidebar content for page 1
  const renderSidebarPage1 = () => (
    <>
      {/* Contact Info */}
      <Section>
        <SidebarSectionTitle>
          <Person fontSize="small" /> Contact
        </SidebarSectionTitle>
        <Box sx={{ width: '100%', paddingRight: '4mm' }}>
          <ContactInfo color="light">
            <Email fontSize="small" />
            <Typography sx={{ color: '#ffffff', fontSize: '0.8rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1 }}>
              {data.personalInfo.email}
            </Typography>
          </ContactInfo>
          <ContactInfo color="light">
            <Phone fontSize="small" />
            <Typography sx={{ color: '#ffffff', fontSize: '0.8rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {data.personalInfo.phone}
            </Typography>
          </ContactInfo>
          <ContactInfo color="light">
            <LocationOn fontSize="small" />
            <Typography sx={{ color: '#ffffff', fontSize: '0.8rem', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {data.personalInfo.address.street}, {data.personalInfo.address.city}
            </Typography>
          </ContactInfo>
          <ContactInfo color="light">
            <Flag fontSize="small" />
            <Typography sx={{ color: '#ffffff', fontSize: '0.8rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {data.personalInfo.nationality}
            </Typography>
          </ContactInfo>
        </Box>
      </Section>

      {/* Languages */}
      <Section>
        <SidebarSectionTitle>
          <Language fontSize="small" /> Languages
        </SidebarSectionTitle>
        <Box sx={{ mb: 2, width: '100%', paddingRight: '4mm' }}>
          {/* Arabic - Special handling */}
          <Box sx={{ mb: 1.5 }}>
            <Typography 
              sx={{ 
                color: '#ffffff', 
                fontSize: '0.75rem', 
                fontWeight: 500,
                mb: 0.2
              }}
            >
              Arabic
            </Typography>
            <Typography 
              sx={{ 
                color: '#3498db', 
                fontSize: '0.65rem',
                mb: 0.5,
                lineHeight: 1.3,
                display: 'block',
                width: '100%',
                whiteSpace: 'normal',
                overflow: 'visible'
              }}
            >
              Native - Maghrebi, Levantine, Gulf, Egyptian, Saudi, UAE, Lebanese dialects
            </Typography>
            <ProgressBar variant="determinate" value={100} />
          </Box>

          {/* French */}
          <Box sx={{ mb: 1.5 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography sx={{ color: '#ffffff', fontSize: '0.75rem', fontWeight: 500 }}>
                French
              </Typography>
              <Typography sx={{ color: '#3498db', fontSize: '0.65rem', textAlign: 'right' }}>
                Professional
              </Typography>
            </Box>
            <ProgressBar variant="determinate" value={80} />
          </Box>

          {/* English */}
          <Box sx={{ mb: 1.5 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography sx={{ color: '#ffffff', fontSize: '0.75rem', fontWeight: 500 }}>
                English
              </Typography>
              <Typography sx={{ color: '#3498db', fontSize: '0.65rem', textAlign: 'right' }}>
                Professional
              </Typography>
            </Box>
            <ProgressBar variant="determinate" value={80} />
          </Box>
        </Box>
      </Section>

      {/* Social Media */}
      <Section>
        <SidebarSectionTitle>
          <Star fontSize="small" /> Social Media
        </SidebarSectionTitle>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, width: '100%', paddingRight: '4mm' }}>
          {data.socialMedia.map((social, index) => (
            <Box
              key={index}
              sx={{ 
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                color: '#ffffff',
                fontSize: '0.75rem',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {social.platform === 'LinkedIn' ? (
                <LinkedIn sx={{ fontSize: '0.9rem', flexShrink: 0 }} />
              ) : (
                <Facebook sx={{ fontSize: '0.9rem', flexShrink: 0 }} />
              )}
              <Typography sx={{ fontSize: '0.75rem', color: '#ffffff', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {social.username}
              </Typography>
            </Box>
          ))}
        </Box>
      </Section>
    </>
  );

  // Sidebar content for page 2
  const renderSidebarPage2 = () => (
    <>
      {/* Technical Skills */}
      <Section>
        <SidebarSectionTitle>
          <Star fontSize="small" /> Technical Skills
        </SidebarSectionTitle>
        <Box sx={{ mb: 1.5, width: '100%', paddingRight: '6mm' }}>
          {data.technicalSkills.slice(0, 3).map((skillGroup, index) => (
            <Box key={index} sx={{ mb: 1.5 }}>
              <Typography sx={{ color: '#ffffff', fontSize: '0.72rem', fontWeight: 600, mb: 0.8, overflow: 'visible', whiteSpace: 'normal' }}>
                {skillGroup.category}
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.3 }}>
                {skillGroup.skills.map((skill, idx) => (
                  <SkillChip 
                    key={idx} 
                    label={skill} 
                    customVariant="light" 
                    size="small"
                    sx={{
                      maxWidth: '100%',
                      height: 'auto',
                      margin: '1px 2px 1px 0',
                      '& .MuiChip-label': {
                        whiteSpace: 'normal',
                        overflow: 'visible',
                        textOverflow: 'clip',
                        lineHeight: 1.2,
                        padding: '2px 5px',
                        display: 'block',
                      },
                    }}
                  />
                ))}
              </Box>
            </Box>
          ))}
        </Box>
      </Section>
    </>
  );

  // Main content for page 1
  const renderMainPage1 = () => (
    <>
      {/* Header */}
      <Section>
        <Typography 
          variant="h4" 
          sx={{ 
            color: theme.palette.primary.main,
            fontWeight: 700,
            fontSize: '1.4rem',
            mb: 0.3,
            letterSpacing: '0.02em',
          }}
        >
          {data.personalInfo.fullName}
        </Typography>
        <Typography 
          variant="subtitle1" 
          sx={{ 
            color: theme.palette.text.secondary,
            fontSize: '0.9rem',
            mb: 0.8,
            fontWeight: 500,
          }}
        >
          {data.personalInfo.title}
        </Typography>
        <Divider sx={{ mb: 1.5, borderColor: 'rgba(0, 0, 0, 0.1)' }} />
      </Section>

      {/* Professional Summary */}
      <Section>
        <SectionTitle>
          <Description fontSize="small" /> Professional Summary
        </SectionTitle>
        <Typography sx={{ 
          fontSize: '0.75rem', 
          lineHeight: 1.5, 
          color: theme.palette.text.primary,
          textAlign: 'justify'
        }}>
          {data.professionalSummary}
        </Typography>
      </Section>

      {/* Experience */}
      <Section>
        <SectionTitle>
          <Work fontSize="small" /> Professional Experience
        </SectionTitle>
        {data.experience.map((exp, index) => (
          <Box key={index} sx={{ mb: index !== data.experience.length - 1 ? 1.5 : 0 }}>
            <Grid container spacing={1}>
              <Grid item xs={7.5}>
                <Typography sx={{ fontWeight: 600, fontSize: '0.85rem', color: theme.palette.primary.main }}>
                  {exp.position}
                </Typography>
                <Typography sx={{ fontSize: '0.75rem', color: theme.palette.text.primary, mb: 0.3 }}>
                  {exp.company}
                </Typography>
              </Grid>
              <Grid item xs={4.5} sx={{ textAlign: 'right' }}>
                <Typography sx={{ 
                  fontSize: '0.65rem', 
                  color: theme.palette.text.secondary, 
                  fontWeight: 500,
                  display: 'inline-block',
                  bgcolor: 'rgba(44, 62, 80, 0.05)',
                  padding: '2px 5px',
                  borderRadius: '4px',
                }}>
                  {exp.startDate} - {exp.endDate}
                </Typography>
                <Typography sx={{ fontSize: '0.65rem', color: theme.palette.text.secondary, mt: 0.3 }}>
                  {exp.location}
                </Typography>
              </Grid>
            </Grid>
            <Box sx={{ mt: 0.5 }}>
              {exp.responsibilities.map((resp, idx) => (
                <Typography key={idx} sx={{ 
                  fontSize: '0.7rem', 
                  mb: 0.3,
                  pl: 1.5,
                  position: 'relative',
                  color: theme.palette.text.primary,
                  '&::before': {
                    content: '"•"',
                    position: 'absolute',
                    left: 0.3,
                    color: theme.palette.primary.main,
                    fontWeight: 'bold',
                  }
                }}>
                  {resp}
                </Typography>
              ))}
            </Box>
          </Box>
        ))}
      </Section>
    </>
  );

  // Main content for page 2
  const renderMainPage2 = () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Technical Skills */}
      <Section sx={{ mb: 2 }}>
        <SectionTitle 
          sx={{ 
            fontSize: '1rem', 
            marginBottom: 1.5,
            '&::after': {
              bottom: -6,
              height: '2px',
            }
          }}
        >
          <Star fontSize="small" /> Technical Skills
        </SectionTitle>
        <Grid container spacing={1} sx={{ mb: 1.5 }}>
          {data.technicalSkills.slice(3, 6).map((skillGroup, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <Typography sx={{ fontWeight: 600, fontSize: '0.8rem', mb: 0.2, color: theme.palette.primary.main }}>
                {skillGroup.category}
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.3 }}>
                {skillGroup.skills.map((skill, idx) => (
                  <SkillChip 
                    key={idx} 
                    label={skill} 
                    customVariant="default" 
                    size="small"
                    sx={{
                      maxWidth: '100%',
                      height: 'auto',
                      margin: '1px 2px 1px 0',
                      '& .MuiChip-label': {
                        whiteSpace: 'normal',
                        overflow: 'visible',
                        textOverflow: 'clip',
                        lineHeight: 1.2,
                        padding: '2px 5px',
                        display: 'block',
                        fontSize: '0.7rem',
                      },
                    }}
                  />
                ))}
              </Box>
            </Grid>
          ))}
        </Grid>
      </Section>

      {/* Hardware Section */}
      <Section sx={{ mb: 2 }}>
        <Typography 
          sx={{ 
            fontWeight: 600, 
            fontSize: '0.8rem', 
            mb: 0.2, 
            color: theme.palette.primary.main,
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <Work fontSize="small" /> Hardware
        </Typography>
        <Box sx={{ mb: 1.5 }}>
          {data.technicalSkills.slice(6, 7).map((skillGroup, index) => (
            <Box key={index}>
              {skillGroup.skills.map((skill, idx) => (
                <Typography 
                  key={idx} 
                  sx={{ 
                    fontSize: '0.75rem',
                    backgroundColor: theme.palette.primary.light,
                    color: theme.palette.primary.contrastText,
                    borderRadius: '8px',
                    p: 0.8,
                    display: 'inline-block',
                    maxWidth: '100%',
                    whiteSpace: 'normal'
                  }}
                >
                  {skill}
                </Typography>
              ))}
            </Box>
          ))}
        </Box>
      </Section>

      {/* Education */}
      <Section sx={{ mb: 2 }}>
        <SectionTitle
          sx={{ 
            fontSize: '1rem', 
            marginBottom: 1.2,
            '&::after': {
              bottom: -5,
              height: '2px',
            }
          }}
        >
          <School fontSize="small" /> Education
        </SectionTitle>
        {data.education.map((edu, index) => (
          <Box key={index} sx={{ 
            mb: index !== data.education.length - 1 ? 0.3 : 0, 
            py: 0.6,
            px: 0.8, 
            bgcolor: 'rgba(44, 62, 80, 0.03)', 
            borderRadius: '4px',
            display: 'flex',
            flexDirection: 'column',
          }}>
            <Grid container spacing={0.5}>
              <Grid item xs={7.5}>
                <Typography sx={{ fontWeight: 600, fontSize: '0.8rem', color: theme.palette.primary.main }}>
                  {edu.degree} in {edu.field}
                </Typography>
                <Typography sx={{ fontSize: '0.75rem', color: theme.palette.text.primary }}>
                  {edu.institution}
                </Typography>
              </Grid>
              <Grid item xs={4.5} sx={{ textAlign: 'right' }}>
                <Typography sx={{ 
                  fontSize: '0.7rem', 
                  color: theme.palette.text.secondary, 
                  fontWeight: 500,
                  display: 'inline-block',
                  bgcolor: 'rgba(44, 62, 80, 0.05)',
                  padding: '1px 4px',
                  borderRadius: '3px',
                }}>
                  {edu.startDate} - {edu.endDate}
                </Typography>
                <Typography sx={{ fontSize: '0.7rem', color: theme.palette.text.secondary, mt: 0.1 }}>
                  {edu.location}
                </Typography>
              </Grid>
            </Grid>
          </Box>
        ))}
      </Section>

      {/* Certifications */}
      <Section sx={{ mb: 0 }}>
        <SectionTitle
          sx={{ 
            fontSize: '1rem', 
            marginBottom: 1.5,
            '&::after': {
              bottom: -6,
              height: '2px',
            }
          }}
        >
          <Verified fontSize="small" /> Certifications
        </SectionTitle>
        <Grid container spacing={1}>
          {data.certifications.slice(0, 6).map((cert, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <Box sx={{ mb: 0.5, py: 0.6, px: 0.8, bgcolor: 'rgba(44, 62, 80, 0.03)', borderRadius: '4px', height: '100%' }}>
                <Typography sx={{ fontWeight: 600, fontSize: '0.75rem', color: theme.palette.primary.main }}>
                  {cert.title}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mt: 0.2 }}>
                  <Typography sx={{ fontSize: '0.7rem', color: theme.palette.primary.main, fontWeight: 500, overflow: 'visible', maxWidth: '60%' }}>
                    {cert.organization}
                  </Typography>
                  <Typography sx={{ 
                    fontSize: '0.7rem', 
                    color: theme.palette.text.secondary,
                    bgcolor: 'rgba(44, 62, 80, 0.05)',
                    padding: '1px 4px',
                    borderRadius: '3px',
                    marginLeft: 1,
                    flexShrink: 0,
                  }}>
                    {cert.date}
                  </Typography>
                </Box>
                {cert.details && cert.details.length > 0 && index < 5 && (
                  <Typography sx={{ 
                    fontSize: '0.7rem',
                    mt: 0.2,
                    pl: 1.5,
                    position: 'relative',
                    color: theme.palette.text.primary,
                    '&::before': {
                      content: '"•"',
                      position: 'absolute',
                      left: 0.2,
                      color: theme.palette.primary.main,
                      fontWeight: 'bold',
                    }
                  }}>
                    {cert.details[0]}
                  </Typography>
                )}
              </Box>
            </Grid>
          ))}
        </Grid>
      </Section>
    </Box>
  );

  // Render the appropriate section based on page and section props
  if (section === 'sidebar') {
    return page === 1 ? renderSidebarPage1() : renderSidebarPage2();
  } else {
    return page === 1 ? renderMainPage1() : renderMainPage2();
  }
};

export default CV; 