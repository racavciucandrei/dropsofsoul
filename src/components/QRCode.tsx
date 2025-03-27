
import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Button } from './ui/button';
import { Download } from 'lucide-react';

interface QRCodeProps {
  url: string;
  size?: number;
  downloadEnabled?: boolean;
  logoUrl?: string;
}

const QRCode = ({ 
  url, 
  size = 200, 
  downloadEnabled = true,
  logoUrl
}: QRCodeProps) => {
  const downloadQRCode = () => {
    const svg = document.getElementById('qr-code-svg');
    if (!svg) return;
    
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      canvas.width = size;
      canvas.height = size;
      ctx?.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL('image/png');
      
      const downloadLink = document.createElement('a');
      downloadLink.download = 'drops-of-soul-qrcode.png';
      downloadLink.href = pngFile;
      downloadLink.click();
    };
    
    img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
  };

  return (
    <div className="flex flex-col items-center p-6 bg-white dark:bg-slate-800 rounded-lg shadow-md">
      <h3 className="text-lg font-medium mb-4">Scan to visit Drops of Soul</h3>
      <div className="bg-white p-4 rounded-lg">
        <QRCodeSVG
          id="qr-code-svg"
          value={url}
          size={size}
          level="H" // High error correction capability
          includeMargin={true}
          imageSettings={logoUrl ? {
            src: logoUrl,
            height: 24,
            width: 24,
            excavate: true,
          } : undefined}
        />
      </div>
      {downloadEnabled && (
        <Button 
          onClick={downloadQRCode} 
          variant="outline" 
          className="mt-4 flex items-center"
        >
          <Download className="mr-2 h-4 w-4" />
          Download QR Code
        </Button>
      )}
      <p className="text-sm text-muted-foreground mt-3 text-center">
        Scan to visit our website
      </p>
    </div>
  );
};

export default QRCode;
