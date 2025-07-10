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
  createTheme
} from '@mui/material';
import { PictureAsPdf, Image } from '@mui/icons-material';
import CV_Component from '../components/CV';
import html2canvas from 'html2canvas';
import html2pdf from 'html2pdf.js';

// Premium theme with sophisticated color scheme
const theme = createTheme({
  palette: {
    primary: {
      main: '#2c3e50', // Deep navy blue
      light: '#34495e',
      dark: '#1a252f',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#e74c3c', // Accent red
      light: '#f5b7b1',
      dark: '#c0392b',
      contrastText: '#ffffff',
    },
    background: {
      default: '#f5f5f7',
      paper: '#ffffff',
    },
    text: {
      primary: '#2c3e50',
      secondary: '#7f8c8d',
    },
    info: {
      main: '#3498db', // Blue accent
    },
    success: {
      main: '#2ecc71', // Green accent
    },
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 700,
      letterSpacing: '0.02em',
    },
    h5: {
      fontWeight: 600,
      letterSpacing: '0.02em',
    },
    h6: {
      fontWeight: 500,
      letterSpacing: '0.01em',
    },
    subtitle1: {
      fontWeight: 500,
      letterSpacing: '0.01em',
    },
    subtitle2: {
      fontWeight: 500,
    },
    body1: {
      fontSize: '0.9rem',
      lineHeight: 1.6,
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
          padding: '8px 16px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          fontWeight: 500,
        },
        contained: {
          '&:hover': {
            boxShadow: '0 4px 8px rgba(0,0,0,0.15)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        elevation3: {
          boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          height: '24px',
          borderRadius: 12,
        },
        sizeSmall: {
          height: '20px',
          borderRadius: 10,
        },
      },
    },
  },
});

interface PremiumTemplateProps {
  data: CV;
  onExportPDF: () => void;
  onExportImages: () => void;
  isExporting: boolean;
}

const PremiumTemplate: React.FC<PremiumTemplateProps> = ({ 
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
          background: 'linear-gradient(135deg, #f6f9fc 0%, #e9edf5 100%)',
          py: 4,
          px: 2,
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            right: 0,
            width: '30%',
            height: '100%',
            background: 'linear-gradient(135deg, rgba(44, 62, 80, 0.05) 0%, rgba(44, 62, 80, 0.1) 100%)',
            clipPath: 'polygon(100% 0, 100% 100%, 0 100%)',
            zIndex: 0,
          },
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
            position: 'relative',
            zIndex: 1,
          }}
        >
          <ButtonGroup variant="contained" sx={{ borderRadius: 2, overflow: 'hidden' }}>
            <Button
              startIcon={<PictureAsPdf />}
              onClick={onExportPDF}
              disabled={isExporting}
              sx={{ 
                background: 'linear-gradient(45deg, #2c3e50 30%, #34495e 90%)',
                fontSize: '0.9rem'
              }}
            >
              {isExporting ? 'Exporting...' : 'Export PDF'}
            </Button>
            <Button
              startIcon={<Image />}
              onClick={onExportImages}
              disabled={isExporting}
              sx={{ 
                background: 'linear-gradient(45deg, #3498db 30%, #2980b9 90%)',
                fontSize: '0.9rem'
              }}
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
            height: '598mm',
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
            zIndex: 1,
          }}
        >
          {/* Page 1 */}
          <Paper
            className="cv-page"
            elevation={3}
            sx={{
              width: '210mm',
              height: '297mm',
              position: 'relative',
              backgroundColor: '#ffffff',
              overflow: 'visible',
              borderRadius: '4px',
              display: 'flex',
            }}
          >
            {/* Left Sidebar */}
            <Box
              sx={{
                width: '75mm',
                height: '100%',
                backgroundColor: '#2c3e50',
                color: 'white',
                padding: '12mm 0 10mm 0',
                position: 'relative',
                overflow: 'visible',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                boxSizing: 'border-box',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: 0,
                  right: 0,
                  width: '100%',
                  height: '40%',
                  background: 'linear-gradient(to bottom, rgba(26, 37, 47, 0) 0%, rgba(26, 37, 47, 0.4) 100%)',
                  zIndex: 1,
                },
              }}
            >
              <Box
                sx={{
                  width: '28mm',
                  height: '28mm',
                  borderRadius: '50%',
                  backgroundColor: '#34495e',
                  marginBottom: '6mm',
                  border: '3px solid #3498db',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
                }}
              >
                {/* Placeholder for profile image - can be replaced with actual image later */}
                <Typography variant="h3" sx={{ color: 'white', fontWeight: 'bold' }}>
                  {data.personalInfo.fullName.charAt(0)}
                </Typography>
              </Box>
              <Box sx={{ padding: '0 6mm', width: '100%', boxSizing: 'border-box', zIndex: 2 }}>
                <CV_Component data={data} page={1} section="sidebar" />
              </Box>
            </Box>

            {/* Main Content */}
            <Box
              sx={{
                flex: 1,
                padding: '12mm 12mm 10mm 12mm',
                height: '100%',
                boxSizing: 'border-box',
                position: 'relative',
                overflow: 'visible',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  top: '10mm',
                  right: '5mm',
                  width: '30mm',
                  height: '30mm',
                  background: 'radial-gradient(circle, rgba(52, 152, 219, 0.05) 0%, rgba(52, 152, 219, 0) 70%)',
                  borderRadius: '50%',
                  zIndex: 0,
                },
              }}
            >
              <CV_Component data={data} page={1} section="main" />
            </Box>
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

          {/* Page 2 */}
          <Paper
            className="cv-page"
            elevation={3}
            sx={{
              width: '210mm',
              height: '297mm',
              position: 'relative',
              backgroundColor: '#ffffff',
              overflow: 'visible',
              borderRadius: '4px',
              display: 'flex',
            }}
          >
            {/* Left Sidebar */}
            <Box
              sx={{
                width: '75mm',
                height: '100%',
                backgroundColor: '#2c3e50',
                color: 'white',
                padding: '12mm 0 10mm 0',
                position: 'relative',
                overflow: 'visible',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                boxSizing: 'border-box',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: 0,
                  right: 0,
                  width: '100%',
                  height: '40%',
                  background: 'linear-gradient(to bottom, rgba(26, 37, 47, 0) 0%, rgba(26, 37, 47, 0.4) 100%)',
                  zIndex: 1,
                },
              }}
            >
              <Box sx={{ padding: '0 6mm', width: '100%', boxSizing: 'border-box', zIndex: 2, marginTop: '6mm' }}>
                <CV_Component data={data} page={2} section="sidebar" />
              </Box>
            </Box>

            {/* Main Content */}
            <Box
              sx={{
                flex: 1,
                padding: '8mm 12mm 8mm 12mm',
                height: '100%',
                boxSizing: 'border-box',
                position: 'relative',
                overflow: 'visible',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: '10mm',
                  right: '5mm',
                  width: '40mm',
                  height: '40mm',
                  background: 'radial-gradient(circle, rgba(52, 152, 219, 0.05) 0%, rgba(52, 152, 219, 0) 70%)',
                  borderRadius: '50%',
                  zIndex: 0,
                },
              }}
            >
              <CV_Component data={data} page={2} section="main" />
            </Box>
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
              Page 2
            </Typography>
          </Paper>
        </Box>

        {/* Width Indicator */}
        <Box
          sx={{
            textAlign: 'center',
            mt: 2,
            color: '#666',
            fontSize: '0.75rem',
            display: { xs: 'none', md: 'block' },
          }}
        >
          210mm
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default PremiumTemplate; 