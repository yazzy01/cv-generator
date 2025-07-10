# CV Templates

This folder contains reusable CV templates for the CV Generator application.

## Available Templates

1. **PremiumTemplate** - A sophisticated two-page template with a dark sidebar and elegant styling.
   - Features a premium dark navy blue color scheme
   - Two-page layout with a sidebar for contact info and skills
   - Elegant typography and visual styling
   - Includes progress bars for language skills
   - Suitable for detailed professional resumes

2. **ModernTemplate** - A clean, modern single-page template with a minimalist design.
   - Features a light blue color scheme with a clean layout
   - Single-page condensed format
   - Avatar header with a modern two-column layout
   - Hoverable experience sections
   - Suitable for concise professional summaries

3. **AIFullStackTemplate** - A specialized template for AI and Full Stack developers.
   - Features a tech-oriented deep purple and teal color scheme
   - Code-block styled professional summary with syntax highlighting
   - Different colored chips for AI vs development skills
   - Interactive experience cards with hover effects
   - Monospace font accents for a developer-focused aesthetic
   - Progress bars for skills with AI/Development category detection

## How to Use

Each template is a React component that accepts the following props:

```typescript
interface TemplateProps {
  data: CV;                // CV data structure
  onExportPDF: () => void; // Function to export the CV as PDF
  onExportImages: () => void; // Function to export the CV as images
  isExporting: boolean;    // Flag indicating if export is in progress
}
```

### Example Usage

```tsx
import React, { useState } from 'react';
import AIFullStackTemplate from './templates/AIFullStackTemplate';
import { cvData } from './data/cv-data';

function App() {
  const [isExporting, setIsExporting] = useState(false);

  const handleExportPDF = () => {
    setIsExporting(true);
    // PDF export logic here
    setIsExporting(false);
  };

  const handleExportImages = () => {
    setIsExporting(true);
    // Image export logic here
    setIsExporting(false);
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
```

## Customizing Templates

To create a new template, copy one of the existing templates and modify it to suit your needs. Make sure to maintain the same prop interface for compatibility.

Key areas to customize:
- Theme colors and typography
- Layout structure
- Section styling
- Visual elements (icons, dividers, etc.)
- For tech-focused templates, consider adding code-styled elements 