import React, { useRef } from 'react';
import { Button, Box } from '@mui/material';
import { GetApp as DownloadIcon } from '@mui/icons-material';
// @ts-ignore
import html2pdf from 'html2pdf.js';
import CV from './CV';
import cvData from '../data/cv-data.json';

const CVWrapper: React.FC = () => {
  const targetRef = useRef<HTMLDivElement>(null);

  const handleDownload = () => {
    if (targetRef.current) {
      const opt = {
        margin: 10,
        filename: 'my-cv.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      };

      html2pdf().set(opt).from(targetRef.current).save();
    }
  };

  return (
    <Box sx={{ maxWidth: '210mm', margin: '0 auto', padding: '2rem' }}>
      <Box mb={2} display="flex" justifyContent="center">
        <Button
          variant="contained"
          color="primary"
          startIcon={<DownloadIcon />}
          onClick={handleDownload}
          size="large"
        >
          Download PDF
        </Button>
      </Box>
      <div ref={targetRef}>
        <CV data={cvData} />
      </div>
    </Box>
  );
};

export default CVWrapper; 