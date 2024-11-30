import { useState, useContext } from 'react';
import JobContext from '../../../Providers/JobProvider/index';
import { GoogleGenerativeAI } from '@google/generative-ai';
import {  Upload, Send, Download } from 'lucide-react';
import jsPDF from 'jspdf';
 
function AiForm() {
  const {jobSingle} = useContext(JobContext);
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [pdfText, setPdfText] = useState('');
  const [fileName, setFileName] = useState('');
  console.log(jobSingle);
 
const systemInstruction = `Consider you are a resume validator; I need a complete resume evaluation for the given job description.
 
Give the resumes a score of 100 by categorizing by below metrics.
 
Category Weightage
 
Skills Match 40
 
Experience Match 20
 
Responsibilities 20
 
Certifications 5
 
Keyword Match 15
 
Detailed scoring breakdown results in a table view
 
Avoid Recommendations for Improvement instead add the summary of the report generated `
 
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file || !file.type.includes('pdf')) {
      setError('Please upload a valid PDF file');
      return;
    }
 
    setFileName(file.name);
    setLoading(true);
    setError('');
 
    try {
      // In a real implementation, you would process the PDF here
      // For now, we'll simulate PDF text extraction
      setPdfText(`Content from ${file.name}`);
    } catch (err) {
      console.error('Error:', err);
      setError('Error processing PDF file');
    } finally {
      setLoading(false);
    }
  };
 
  const generateContent = async () => {
    if (!systemInstruction.trim() || !prompt.trim()) {
      setError('Please enter both system instructions and prompt');
      return;
    }
 
    if (!pdfText) {
      setError('Please upload a PDF file first');
      return;
    }
 
    setError('');
    setLoading(true);
    setResponse('');
 
    try {
      const genAI = new GoogleGenerativeAI(import.meta.env.VITE_API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      // Combine system instruction, PDF content, and user prompt
      const fullPrompt = `
        System Instruction: ${systemInstruction}
        Document Content: ${pdfText}
        User Query: ${prompt}
        Please provide the response in a bulleted format with clear sections.
      `;
 
      const result = await model.generateContent(fullPrompt);
      const response = await result.response;
     
      // Format the response into sections
      const formattedResponse = formatResponse(response.text());
      setResponse(formattedResponse);
    } catch (err) {
      console.error('Error:', err);
      setError('Error generating content. Please check your API key and try again.');
    } finally {
      setLoading(false);
    }
  };
 
  const formatResponse = (text) => {
    // This is a simple formatting example - adjust based on your needs
    const sections = text.split('\n\n');
    return sections.map(section => {
      if (section.startsWith('•')) return section;
      if (section.startsWith('-')) return section.replace(/^-/g, '•');
      return '• ' + section;
    }).join('\n\n');
  };
 
  const exportToPDF = () => {
    if (!response) {
      setError('No response to export');
      return;
    }
 
    // Create a new jsPDF instance
    const doc = new jsPDF();
 
    // Set up PDF styling
    doc.setFontSize(12);
   
    // Add title
    doc.setFontSize(16);
    doc.text('Gemini AI PDF Analysis', 20, 20);
   
    // Add file name
    doc.setFontSize(10);
    doc.text(`Source File: ${fileName}`, 20, 30);
   
    // Add system instruction
    // doc.setFontSize(12);
    // doc.text('System Instruction:', 20, 40);
    // doc.setFontSize(10);
    // doc.text(systemInstruction, 20, 47);
   
    // Add prompt
    doc.setFontSize(12);
    doc.text('Query:', 20, 60);
    doc.setFontSize(10);
    doc.text(prompt, 20, 67);
   
    // Add response
    doc.setFontSize(12);
    doc.text('Analysis Results:', 20, 80);
   
    // Wrap and add response text
    const splitText = doc.splitTextToSize(response, 170);
    doc.setFontSize(10);
    doc.text(splitText, 20, 90);
 
    // Save the PDF
    doc.save(`Gemini_AI_Analysis_${new Date().toISOString().slice(0,10)}.pdf`);
  };
 
  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Gemini AI PDF Analyzer
          </h1>
          <p className="mt-2 text-gray-600">
            Upload a PDF and get AI-generated insights based on your instructions
          </p>
        </div>
 
        <div className="bg-white rounded-lg shadow-lg p-6 space-y-6">
          {/* PDF Upload Section */}
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileUpload}
              className="hidden"
              id="pdf-upload"
            />
            <label
              htmlFor="pdf-upload"
              className="cursor-pointer flex flex-col items-center"
            >
              <Upload className="h-12 w-12 text-gray-400" />
              <span className="mt-2 text-sm text-gray-600">
                {fileName || "Upload PDF file"}
              </span>
            </label>
          </div>
 
          {/* System Instruction Input */}
          {/* <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              System Instructions
            </label>
            <textarea
              value={systemInstruction}
              onChange={(e) => setSystemInstruction(e.target.value)}
              placeholder="Enter system instructions (e.g., 'Analyze the document and extract key points')"
              className="w-full h-24 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div> */}
 
          {/* User Prompt Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Query
            </label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Enter your specific question about the document"
              className="w-full h-24 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
 
          {/* Generate Button */}
          <button
            onClick={generateContent}
            disabled={loading || !prompt.trim() || !systemInstruction.trim()}
            className="w-full flex items-center justify-center py-2 px-4 rounded-md text-white font-medium bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200"
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Processing...
              </>
            ) : (
              <>
                <Send className="mr-2 h-5 w-5" />
                Analyze Document
              </>
            )}
          </button>
 
          {/* Error Message */}
          {error && (
            <div className="p-4 bg-red-50 rounded-md">
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}
 
          {/* Response Section */}
          {response && (
  <div className="mt-8">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-lg font-medium text-gray-900">
        Analysis Results
      </h2>
      <button
        onClick={exportToPDF}
        className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
      >
        <Download className="mr-2 h-5 w-5" />
        Export to PDF
      </button>
    </div>
    <div className="bg-gray-50 rounded-lg p-6">
      <ul className="list-disc list-inside text-gray-700">
        {response.split('\n\n').map((section, index) => (
          <li key={index} className="mb-2">
            {section}
          </li>
        ))}
      </ul>
    </div>
  </div>
)}
 
        </div>
      </div>
    </div>
  );
}
 
export default AiForm;