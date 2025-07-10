import { useState } from 'react';
import { cvData } from './data/cv-data';
import AIFullStackTemplate from './AIFullStackTemplate';
import html2canvas from 'html2canvas';
import html2pdf from 'html2pdf.js';

function App() {
  const [isExporting, setIsExporting] = useState(false);

  const handleExportPDF = async () => {
    setIsExporting(true);
    const pagesContainer = document.getElementById('cv-pages-container');
    
    if (!pagesContainer) {
      console.error('CV pages container not found');
      setIsExporting(false);
      return;
    }

    try {
      // Store original styles
      const originalGap = pagesContainer.style.gap;
      const originalDisplay = pagesContainer.style.display;

      // Modify container for export
      pagesContainer.style.gap = '0';
      pagesContainer.style.display = 'block';

      // Hide page numbers
      const pageNumbers = pagesContainer.querySelectorAll('.page-number');
      pageNumbers.forEach(el => {
        if (el instanceof HTMLElement) {
          el.style.display = 'none';
        }
      });

      // Configure PDF options
      const opt = {
        margin: 0,
        filename: 'Yassir_Rzigui_AI_FullStack_CV.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { 
          scale: 4,
          useCORS: true,
        },
        jsPDF: { 
          unit: 'mm',
          format: 'a4',
          orientation: 'portrait',
        },
        pagebreak: { mode: ['css', 'legacy'] }
      };

      // Generate PDF
      await html2pdf().set(opt).from(pagesContainer).save();

      // Restore styles
      pagesContainer.style.gap = originalGap;
      pagesContainer.style.display = originalDisplay;

      // Restore page numbers
      pageNumbers.forEach(el => {
        if (el instanceof HTMLElement) {
          el.style.display = 'block';
        }
      });

    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setIsExporting(false);
    }
  };

  const handleExportImages = async () => {
    setIsExporting(true);
    const pages = document.querySelectorAll('.cv-page');
    
    if (!pages.length) {
      console.error('CV pages not found');
      setIsExporting(false);
      return;
    }

    try {
      for (let i = 0; i < pages.length; i++) {
        const page = pages[i] as HTMLElement;
        
        // Hide page number before capture
        const pageNumber = page.querySelector('.page-number');
        if (pageNumber instanceof HTMLElement) {
          pageNumber.style.display = 'none';
        }

        const canvas = await html2canvas(page, {
          scale: 3,
          useCORS: true,
          scrollX: 0,
          scrollY: -window.scrollY,
          width: page.offsetWidth,
          height: page.offsetHeight,
          backgroundColor: '#FFFFFF',
        });

        // Restore page number
        if (pageNumber instanceof HTMLElement) {
          pageNumber.style.display = 'block';
        }

        const image = canvas.toDataURL('image/png', 1.0);
        const link = document.createElement('a');
        link.download = `Yassir_Rzigui_AI_FullStack_CV_page_${i + 1}.png`;
        link.href = image;
        link.click();

        await new Promise(resolve => setTimeout(resolve, 500));
      }
    } catch (error) {
      console.error('Error generating images:', error);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <AIFullStackTemplate
      data={cvData}
      onExportPDF={handleExportPDF}
      onExportImages={handleExportImages}
      isExporting={isExporting}
    />
  );
}

export default App; 