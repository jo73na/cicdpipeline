import React, { useState } from 'react';
import { Row, Col, Tooltip } from 'antd';
import { FileText, File, Copy } from 'lucide-react';
import PdfViewerModal from './PdfviewModal';
import { copyToClipboard } from '../../../Utils/CopyText';
 
const InfoRowWithPdf = ({ label, value, color, pdfUrl, isCopyable = false }) => {
  const [showPdf, setShowPdf] = useState(false);
  const [tooltipText, setTooltipText] = useState('Copy to clipboard');
 
  const handleCopy = (text) => {
    copyToClipboard(text);
    setTooltipText('Copied!');
    setTimeout(() => setTooltipText('Copy to clipboard'), 2000);
  };
 
  const handlePdfViewToggle = () => {
    if (!pdfUrl) return;
    setShowPdf(true);
  };
 
  return (
    <Row
      align="center"
      style={{
        marginLeft: '12px',
        marginBottom: '10px',
        paddingLeft: '4px',
        transition: 'all 0.3s ease',
      }}
      className="hover:bg-gray-50 rounded-lg py-1"
    >
      {/* Icon Column */}
      <Col flex="40px">
        <div className="flex  w-8 h-8 rounded-lg bg-indigo-50">
          <FileText size={16} style={{ color: color, strokeWidth: 1.5 }} />
        </div>
      </Col>
 
      {/* Label Column */}
      <Col flex="120px"  style={{ display: 'flex', alignItems: 'flex-start', paddingTop: '0px' }}>
        <span
          style={{
         
            fontSize: '12px',
            fontFamily: 'Poppins',
            color: '#666',
            fontWeight: '500',
           
           
          }}
        >
          {label}:
        </span>
      </Col>
 
      {/* Value and Icons */}
      <Col flex="auto">
        <div className="d-flex ">
          {/* Address/Value */}
          <div
            style={{
              fontSize: '12px',
              fontFamily: 'Poppins',
              color: '#333',
             
             
             
            }}
          >
            {value}
          </div>
 
       
        </div>
      </Col>
 
      {/* Copy Icon */}
      <Col className="d-flex">
 
        {/* PDF Viewer Icon */}
        <div>
            {pdfUrl ? (
              <Tooltip title="View PDF">
                <File
                  style={{
                    color: color,
                    cursor: 'pointer',
                    marginRight:"20px"
                   
 
                  }}
                  size={12}
                  onClick={handlePdfViewToggle}
                />
              </Tooltip>
            ) : (
              <Tooltip title="No PDF to read">
                <File
                  style={{
                    color: '#ccc',
                    marginLeft: '8px',
                    cursor: 'not-allowed',
                  }}
                  size={16}
                />
              </Tooltip>
            )}
          </div>
        {isCopyable && (
          <Tooltip title={tooltipText}>
            <Copy
              size={14}
              style={{
                color: color,
                cursor: 'pointer',
                marginLeft: '8px',
                marginTop:"4px"
              }}
              onClick={() => handleCopy(value)}
            />
          </Tooltip>
        )}
      </Col>
 
      {/* PDF Viewer Modal */}
      {showPdf && (
        <PdfViewerModal pdfUrl={pdfUrl} onClose={() => setShowPdf(false)} />
      )}
    </Row>
  );
};
 
export default InfoRowWithPdf;