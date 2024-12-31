import React, { useContext, useEffect, useRef, useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import ViewJobContext from '../../../Providers/ViewJob/index'; // Ensure this context is properly imported
 
function AiForm({ id, resume, job_description, onAnalysisComplete }) {
  const [loading, setLoading] = useState(false);
  const [generatedContent, setGeneratedContent] = useState(null);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);
 
  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
 
  const systemInstruction = `Consider you are a resume validator; Go through entire pdf file and provide complete resume evaluation for the given job description. Important : " Evaluate the candidate for the given job description by making  a strict and high level  screener through   line by line check and analyse it with the job description and provide more accurate result" .Give me the Detailed summay of the resume content , Detailed and key highlights area in  resume evaluation, Detail  summary report. Also mention pros and cons of the applicant with the given job detail.  Not to provide any extra details apart from the asked details.Be precise. This is the official document so provide only requested details`;
 
  const generateContent = async () => {
    setLoading(true);
    setError(null);
 
    try {
      const finalPrompt = `${systemInstruction} ${job_description} ${resume} give me the analysis result`;
      const result = await model.generateContent(finalPrompt);
      const responseText = await result.response.text();
     
      // Format the response for easier parsing
      const formattedContent = {
        rawText: responseText,
        id: id // Include the ID to match with the specific row
      };
 
      setGeneratedContent(formattedContent);
     
      // Callback to parent component with analysis result
      if (onAnalysisComplete) {
        onAnalysisComplete(formattedContent);
      }
    } catch (error) {
      console.error("Error generating content:", error);
      setError('Failed to generate content. Please try again.');
    } finally {
      setLoading(false);
    }
  };
 
  // Trigger analysis automatically when component mounts
  useEffect(() => {
    generateContent();
  }, [resume, job_description]);
 
  return null; // This component doesn't render anything visually
}
 
export default AiForm;