import { jsPDF } from 'jspdf';
import { TopicItem } from '../data/mbbsData';

export function generateTopicPdf(topic: TopicItem) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 14;
  const contentWidth = pageWidth - margin * 2;
  let cursorY = 16;

  function checkPageBreak(requiredHeight: number) {
    if (cursorY + requiredHeight > pageHeight - margin) {
      doc.addPage();
      cursorY = margin;
      drawPageBorder();
    }
  }

  function drawPageBorder() {
    doc.setDrawColor(200, 200, 210);
    doc.setLineWidth(0.3);
    doc.rect(margin - 4, margin - 4, contentWidth + 8, pageHeight - margin * 2 + 8);
    
    // Tiny header
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(120, 120, 130);
    doc.text('VK MBBS Question Bank — Ultimate Topper Edition (10-Mark University Blueprint)', margin, margin - 1);
  }

  drawPageBorder();

  // Header Banner
  doc.setFillColor(124, 58, 237); // Purple
  doc.roundedRect(margin, cursorY, contentWidth, 22, 2, 2, 'F');
  
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(255, 255, 255);
  doc.text(topic.subject.toUpperCase() + ' — 10-MARK GOLD STANDARD ESSAY', margin + 4, cursorY + 8);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(230, 220, 255);
  doc.text(`Frequency: ${topic.frequency}  |  Marks: 10 Marks  |  Target Time: 18 Minutes`, margin + 4, cursorY + 16);

  cursorY += 28;

  // Title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(20, 20, 30);
  const titleLines = doc.splitTextToSize(topic.title, contentWidth);
  doc.text(titleLines, margin, cursorY);
  cursorY += titleLines.length * 6 + 4;

  const a10 = topic.answers.mark10;

  // Helper for Section Headings
  function addSectionHeading(num: number, title: string) {
    checkPageBreak(12);
    doc.setFillColor(240, 235, 255);
    doc.setDrawColor(124, 58, 237);
    doc.roundedRect(margin, cursorY, contentWidth, 7, 1, 1, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(100, 40, 200);
    doc.text(`${num}. ${title.toUpperCase()}`, margin + 3, cursorY + 5);
    cursorY += 10;
  }

  // 1. Definition
  addSectionHeading(1, 'Definition & Consensus Criteria');
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(40, 40, 50);
  const defLines = doc.splitTextToSize(a10.introAndDefinition, contentWidth);
  checkPageBreak(defLines.length * 5);
  doc.text(defLines, margin, cursorY);
  cursorY += defLines.length * 5 + 4;

  // 2. Classification / Anatomy
  addSectionHeading(2, 'Classification / Anatomical Subdivisions');
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(40, 40, 50);
  for (const item of a10.classificationOrAnatomy) {
    const itemLines = doc.splitTextToSize(`• ${item}`, contentWidth - 4);
    checkPageBreak(itemLines.length * 4.5);
    doc.text(itemLines, margin + 2, cursorY);
    cursorY += itemLines.length * 4.5 + 1;
  }
  cursorY += 3;

  // 3. Pathophysiology
  addSectionHeading(3, 'Step-by-Step Pathophysiological Cascade');
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(40, 40, 50);
  a10.pathophysiologySteps.forEach((step, idx) => {
    const stepLines = doc.splitTextToSize(`${idx + 1}. ${step}`, contentWidth - 4);
    checkPageBreak(stepLines.length * 4.5);
    doc.text(stepLines, margin + 2, cursorY);
    cursorY += stepLines.length * 4.5 + 1;
  });
  cursorY += 3;

  // 4. Clinical Features
  addSectionHeading(4, 'Cardinal Clinical Features & Signs');
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(40, 40, 50);
  for (const item of a10.clinicalManifestations) {
    const cfLines = doc.splitTextToSize(`• ${item}`, contentWidth - 4);
    checkPageBreak(cfLines.length * 4.5);
    doc.text(cfLines, margin + 2, cursorY);
    cursorY += cfLines.length * 4.5 + 1;
  }
  cursorY += 3;

  // 5. Diagnostic Workup
  addSectionHeading(5, 'Diagnostic Workup (Gold Standard & Labs)');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(180, 83, 9); // Amber
  const gsLines = doc.splitTextToSize(`★ Gold Standard: ${a10.diagnosticWorkup.goldStandard}`, contentWidth - 4);
  checkPageBreak(gsLines.length * 4.5);
  doc.text(gsLines, margin + 2, cursorY);
  cursorY += gsLines.length * 4.5 + 2;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(50, 50, 60);
  const labText = `Essential Labs: ${a10.diagnosticWorkup.routineLabs.join('; ')}`;
  const labLines = doc.splitTextToSize(labText, contentWidth - 4);
  checkPageBreak(labLines.length * 4.5);
  doc.text(labLines, margin + 2, cursorY);
  cursorY += labLines.length * 4.5 + 2;

  const imgText = `Imaging Modalities: ${a10.diagnosticWorkup.imaging.join('; ')}`;
  const imgLines = doc.splitTextToSize(imgText, contentWidth - 4);
  checkPageBreak(imgLines.length * 4.5);
  doc.text(imgLines, margin + 2, cursorY);
  cursorY += imgLines.length * 4.5 + 4;

  // 6. Comprehensive Management
  addSectionHeading(6, 'Comprehensive Management Protocol');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(200, 30, 30);
  doc.text(`Emergency Resuscitation:`, margin + 2, cursorY);
  cursorY += 4.5;
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(40, 40, 50);
  const emLines = doc.splitTextToSize(a10.comprehensiveManagement.emergency, contentWidth - 4);
  checkPageBreak(emLines.length * 4.5);
  doc.text(emLines, margin + 2, cursorY);
  cursorY += emLines.length * 4.5 + 2;

  doc.setFont('helvetica', 'bold');
  doc.setTextColor(30, 60, 180);
  doc.text(`Medical Pharmacotherapy:`, margin + 2, cursorY);
  cursorY += 4.5;
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(40, 40, 50);
  for (const med of a10.comprehensiveManagement.medicalTherapy) {
    const medLines = doc.splitTextToSize(`- ${med}`, contentWidth - 4);
    checkPageBreak(medLines.length * 4);
    doc.text(medLines, margin + 2, cursorY);
    cursorY += medLines.length * 4 + 1;
  }
  cursorY += 2;

  doc.setFont('helvetica', 'bold');
  doc.setTextColor(16, 120, 70);
  doc.text(`Surgical / Definitive Procedure:`, margin + 2, cursorY);
  cursorY += 4.5;
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(40, 40, 50);
  for (const surg of a10.comprehensiveManagement.surgicalOrDefinitive) {
    const surgLines = doc.splitTextToSize(`- ${surg}`, contentWidth - 4);
    checkPageBreak(surgLines.length * 4);
    doc.text(surgLines, margin + 2, cursorY);
    cursorY += surgLines.length * 4 + 1;
  }
  cursorY += 4;

  // 7. Exam Flowchart
  addSectionHeading(7, 'Exam Flowchart (Examiner Standard)');
  doc.setFillColor(245, 245, 250);
  doc.setDrawColor(180, 180, 200);
  const fcLines = doc.splitTextToSize(a10.topperFlowchart, contentWidth - 8);
  const boxHeight = fcLines.length * 4.5 + 6;
  checkPageBreak(boxHeight);
  doc.roundedRect(margin, cursorY, contentWidth, boxHeight, 1, 1, 'FD');
  doc.setFont('courier', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(80, 30, 140);
  doc.text(fcLines, margin + 4, cursorY + 5);
  cursorY += boxHeight + 4;

  // 8. Diagram Checklist
  addSectionHeading(8, 'Mandatory Diagrams & Labeling Checklist');
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(40, 40, 50);
  for (const diag of a10.diagramChecklist) {
    const dLines = doc.splitTextToSize(`[✓] ${diag}`, contentWidth - 4);
    checkPageBreak(dLines.length * 4);
    doc.text(dLines, margin + 2, cursorY);
    cursorY += dLines.length * 4 + 1;
  }
  cursorY += 4;

  // Mnemonic box
  checkPageBreak(25);
  doc.setFillColor(254, 243, 199); // Amber light
  doc.setDrawColor(245, 158, 11);
  doc.roundedRect(margin, cursorY, contentWidth, 20, 2, 2, 'FD');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(180, 83, 9);
  doc.text(`★ High-Yield Mnemonic: ${topic.answers.mnemonic.title}`, margin + 3, cursorY + 5);
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(60, 40, 20);
  const mSummary = topic.answers.mnemonic.letters.map((l) => `${l.letter}: ${l.description}`).join(' | ');
  const mLines = doc.splitTextToSize(mSummary, contentWidth - 6);
  doc.text(mLines, margin + 3, cursorY + 10);
  doc.text(`Rule: ${topic.answers.mnemonic.explanation}`, margin + 3, cursorY + 16);

  // Clean filename
  const cleanName = topic.title.replace(/[^a-zA-Z0-9]/g, '_').substring(0, 30);
  doc.save(`${cleanName}_10_Mark_Answer.pdf`);
}
