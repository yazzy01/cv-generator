import React from 'react';
import { CV } from '../types/cv';
import {
  Box,
  Paper,
  Typography,
  useTheme,
  styled,
  Grid,
  ButtonGroup,
  Button,
  CssBaseline,
  ThemeProvider,
  createTheme,
  Divider,
  Chip,
  Avatar
} from '@mui/material';
import { PictureAsPdf, Image } from '@mui/icons-material';
import html2canvas from 'html2canvas';
import html2pdf from 'html2pdf.js';

// Modern clean theme with light color scheme
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Clean blue
      light: '#42a5f5',
      dark: '#1565c0',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#f50057', // Bright pink accent
      light: '#ff4081',
      dark: '#c51162',
      contrastText: '#ffffff',
    },
    background: {
      default: '#f8f9fa',
      paper: '#ffffff',
    },
    text: {
      primary: '#212121',
      secondary: '#757575',
    },
  },
  typography: {
    fontFamily: '"Open Sans", "Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
      letterSpacing: '0.01em',
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 500,
    },
    subtitle1: {
      fontWeight: 400,
    },
    body1: {
      fontSize: '0.9rem',
      lineHeight: 1.6,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 4,
          fontWeight: 500,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        elevation1: {
          boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 4,
        },
      },
    },
  },
});

interface ModernTemplateProps {
  data: CV;
  onExportPDF: () => void;
  onExportImages: () => void;
  isExporting: boolean;
}

// Styled components for the Modern template
const Section = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  '&:last-child': {
    marginBottom: 0,
  },
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontWeight: 600,
  fontSize: '1.1rem',
  marginBottom: theme.spacing(1.5),
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  position: 'relative',
  paddingBottom: theme.spacing(0.5),
  borderBottom: `2px solid ${theme.palette.primary.light}`,
}));

const ExperienceBox = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(2.5),
  padding: theme.spacing(2),
  backgroundColor: '#f8f9fa',
  borderRadius: 4,
  border: '1px solid #e0e0e0',
  '&:hover': {
    boxShadow: '0 3px 6px rgba(0,0,0,0.1)',
    borderColor: theme.palette.primary.light,
  },
}));

const SkillChip = styled(Chip)(({ theme }) => ({
  margin: theme.spacing(0.5),
  backgroundColor: theme.palette.primary.light,
  color: 'white',
  fontWeight: 500,
}));

const ModernTemplate: React.FC<ModernTemplateProps> = ({ 
  data, 
  onExportPDF, 
  onExportImages, 
  isExporting 
}) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: '100vh',
          background: '#f8f9fa',
          py: 4,
          px: 2,
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
          <ButtonGroup variant="contained" sx={{ borderRadius: 2 }}>
            <Button
              startIcon={<PictureAsPdf />}
              onClick={onExportPDF}
              disabled={isExporting}
            >
              {isExporting ? 'Exporting...' : 'Export PDF'}
            </Button>
            <Button
              startIcon={<Image />}
              onClick={onExportImages}
              disabled={isExporting}
              color="secondary"
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
            height: '297mm',
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Single Page CV */}
          <Paper
            className="cv-page"
            elevation={1}
            sx={{
              width: '210mm',
              height: '297mm',
              position: 'relative',
              backgroundColor: '#ffffff',
              overflow: 'hidden',
              p: 4,
            }}
          >
            {/* Header */}
            <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 3 }}>
              <Avatar
                sx={{ 
                  width: 100, 
                  height: 100, 
                  bgcolor: theme.palette.primary.main,
                  fontSize: '2.5rem',
                  fontWeight: 'bold'
                }}
              >
                {data.personalInfo.fullName.charAt(0)}
              </Avatar>
              <Box>
                <Typography variant="h4" sx={{ color: theme.palette.primary.dark }}>
                  {data.personalInfo.fullName}
                </Typography>
                <Typography variant="h6" sx={{ color: theme.palette.text.secondary }}>
                  {data.personalInfo.title}
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mt: 1 }}>
                  <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    {data.personalInfo.email}
                  </Typography>
                  <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    {data.personalInfo.phone}
                  </Typography>
                  <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    {data.personalInfo.address.city}, {data.personalInfo.address.country}
                  </Typography>
                </Box>
              </Box>
            </Box>

            <Divider sx={{ mb: 3 }} />

            {/* Two-column layout */}
            <Grid container spacing={3}>
              {/* Left column */}
              <Grid item xs={7}>
                {/* Professional Summary */}
                <Section>
                  <SectionTitle>Professional Summary</SectionTitle>
                  <Typography variant="body1">
                    {data.professionalSummary}
                  </Typography>
                </Section>

                {/* Experience */}
                <Section>
                  <SectionTitle>Professional Experience</SectionTitle>
                  {data.experience.slice(0, 3).map((exp, index) => (
                    <ExperienceBox key={index}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="h6" sx={{ color: theme.palette.primary.main, fontWeight: 600 }}>
                          {exp.position}
                        </Typography>
                        <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                          {exp.startDate} - {exp.endDate}
                        </Typography>
                      </Box>
                      <Typography variant="subtitle1" sx={{ mb: 1 }}>
                        {exp.company} | {exp.location}
                      </Typography>
                      <Box>
                        {exp.responsibilities.slice(0, 2).map((resp, idx) => (
                          <Typography key={idx} variant="body2" sx={{ 
                            display: 'flex', 
                            alignItems: 'flex-start',
                            mb: 0.5,
                            '&:before': {
                              content: '"•"',
                              mr: 1,
                              color: theme.palette.primary.main,
                            }
                          }}>
                            {resp}
                          </Typography>
                        ))}
                      </Box>
                    </ExperienceBox>
                  ))}
                </Section>
              </Grid>

              {/* Right column */}
              <Grid item xs={5}>
                {/* Skills */}
                <Section>
                  <SectionTitle>Technical Skills</SectionTitle>
                  {data.technicalSkills.slice(0, 4).map((skillGroup, index) => (
                    <Box key={index} sx={{ mb: 2 }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 0.5 }}>
                        {skillGroup.category}
                      </Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {skillGroup.skills.map((skill, idx) => (
                          <SkillChip key={idx} label={skill} size="small" />
                        ))}
                      </Box>
                    </Box>
                  ))}
                </Section>

                {/* Education */}
                <Section>
                  <SectionTitle>Education</SectionTitle>
                  {data.education.map((edu, index) => (
                    <Box key={index} sx={{ mb: 2 }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                        {edu.degree} in {edu.field}
                      </Typography>
                      <Typography variant="body2" sx={{ mb: 0.5 }}>
                        {edu.institution}
                      </Typography>
                      <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                        {edu.startDate} - {edu.endDate} | {edu.location}
                      </Typography>
                    </Box>
                  ))}
                </Section>

                {/* Languages */}
                <Section>
                  <SectionTitle>Languages</SectionTitle>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    {data.languages.map((language, index) => {
                      const match = language.match(/^(.+?)\s*(?:\((.+?)\))?$/);
                      const lang = match ? match[1] : language;
                      const level = match && match[2] ? match[2] : '';
                      
                      return (
                        <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                          <Typography variant="body2">{lang}</Typography>
                          <Typography variant="body2" sx={{ color: theme.palette.primary.main }}>
                            {level}
                          </Typography>
                        </Box>
                      );
                    })}
                  </Box>
                </Section>

                {/* Certifications - Just top 2 */}
                <Section>
                  <SectionTitle>Certifications</SectionTitle>
                  {data.certifications.slice(0, 2).map((cert, index) => (
                    <Box key={index} sx={{ mb: 1.5 }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                        {cert.title}
                      </Typography>
                      <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                        {cert.organization} • {cert.date}
                      </Typography>
                    </Box>
                  ))}
                </Section>
              </Grid>
            </Grid>

            <Typography
              className="page-number"
              sx={{
                position: 'absolute',
                bottom: '5mm',
                right: '5mm',
                fontSize: '8pt',
                color: '#999',
              }}
            >
              Page 1
            </Typography>
          </Paper>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default ModernTemplate; 