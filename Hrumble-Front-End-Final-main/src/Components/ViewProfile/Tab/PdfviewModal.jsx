// import {useState} from 'react';
// import {Button} from 'antd';
// import { Document, Page } from 'react-pdf';

// const PdfViewerModal = ({ pdfUrl, onClose }) => {
//     const [numPages, setNumPages] = useState(null);
//     const [pageNumber, setPageNumber] = useState(1);
  
//     const onDocumentLoadSuccess = ({ numPages }) => {
//       setNumPages(numPages);
//     };
  
//     return (
//       <div className="pdf-modal">
//         <div className="pdf-modal-content">
//           <Button onClick={onClose} className="close-btn">
//             Close
//           </Button>
//           <Document
//             file={pdfUrl}
//             onLoadSuccess={onDocumentLoadSuccess}
//             options={{ workerSrc: `pdf.worker.min.js` }}
//           >
//             <Page pageNumber={pageNumber} />
//           </Document>
//           {/* <div className="pdf-modal-footer">
//             <p>Page {pageNumber} of {numPages}</p>
//             <Button 
//               onClick={() => setPageNumber(pageNumber - 1)} 
//               disabled={pageNumber <= 1}
//             >
//               Previous
//             </Button>
//             <Button 
//               onClick={() => setPageNumber(pageNumber + 1)} 
//               disabled={pageNumber >= numPages}
//             >
//               Next
//             </Button>
//           </div> */}
//         </div>
//       </div>
//     );
//   };
//   export default PdfViewerModal
  

// PdfViewerModal.js
import { useState } from 'react';
import { Document, Page } from 'react-pdf';
import { X } from 'lucide-react';
import { Button } from 'antd';

const PdfViewerModal = ({ pdfUrl, onClose, onError }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    onError(null);
  };

  const onDocumentLoadError = (error) => {
    let errorMessage = 'Failed to load PDF';
    
    if (error.message?.includes('404')) {
      errorMessage = 'PDF file not found';
    } else if (error.message?.includes('network')) {
      errorMessage = 'Network error while loading PDF';
    } else if (!pdfUrl) {
      errorMessage = 'No PDF URL provided';
    }
    
    onError(errorMessage);
    onClose();
  };

  return (
    <div 
      className="pdf-modal fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      style={{
        backdropFilter: 'blur(4px)'
      }}
    >
      <div className="pdf-modal-content bg-white rounded-lg p-4 relative max-w-4xl w-full max-h-[90vh] overflow-auto">
        <Button
          type="text"
          icon={<X size={20} />}
          onClick={onClose}
          className="absolute right-2 top-2 hover:bg-gray-100 rounded-full"
          style={{
            width: '32px',
            height: '32px',
            padding: '4px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: 'none',
            zIndex: 10
          }}
        />
        
        <Document
          file={pdfUrl}
          onLoadSuccess={onDocumentLoadSuccess}
          onLoadError={onDocumentLoadError}
          loading={
            <div className="flex items-center justify-center py-8">
              <span className="text-gray-500">Loading PDF...</span>
            </div>
          }
        >
          <Page 
            pageNumber={pageNumber} 
            className="mt-4"
            renderTextLayer={false}
            renderAnnotationLayer={false}
          />
        </Document>
      </div>
    </div>
  );
};


export default PdfViewerModal;