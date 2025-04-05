
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { X, Mail, Phone, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLight } from '@/context/LightProvider';

const ContactTab = () => {
  const [open, setOpen] = useState(false);
  const { isLightOn } = useLight();
  
  return (
    <>
      {/* Modern vertical side tab */}
      <div 
        className={cn(
          "fixed right-0 top-1/3 transform z-30 cursor-pointer transition-all duration-300",
          open ? "opacity-0 pointer-events-none" : "opacity-100"
        )}
        onClick={() => setOpen(true)}
      >
        <div className={cn(
          "flex flex-col items-center bg-primary text-primary-foreground py-6 px-3 rounded-l-lg shadow-lg",
          "transform transition-transform hover:translate-x-[-5px]"
        )}>
          <span className="font-medium -rotate-90 whitespace-nowrap mb-16">Contact Info</span>
        </div>
      </div>

      {/* Contact Info Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-serif">Contact Information</DialogTitle>
            <button 
              className="absolute right-4 top-4 rounded-sm opacity-70 hover:opacity-100 focus:outline-none"
              onClick={() => setOpen(false)}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </button>
          </DialogHeader>
          
          <div className="space-y-6 mt-4">
            <div className="flex items-start space-x-4">
              <Mail className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <h3 className="font-medium">Email</h3>
                <a href="mailto:office@dropsofsoul.com" className="text-sm hover:underline">
                  office@dropsofsoul.com
                </a>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <Phone className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <h3 className="font-medium">Phone</h3>
                <a href="tel:+436703538025" className="text-sm hover:underline">
                  +43 (0)670 353 8025
                </a>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <MapPin className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <h3 className="font-medium">Address</h3>
                <p className="text-sm">BrigittaPlatz 9</p>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ContactTab;
