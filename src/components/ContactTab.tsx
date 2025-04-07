
import React, { useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Mail, Phone, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLight } from '@/context/LightProvider';
import { Separator } from '@/components/ui/separator';

const ContactTab = () => {
  const [open, setOpen] = useState(false);
  const { isLightOn } = useLight();
  
  return (
    <>
      {/* Ultra thin vertical side tab */}
      <div 
        className={cn(
          "fixed right-0 top-1/2 transform -translate-y-1/2 z-30 cursor-pointer transition-all duration-300",
          open ? "opacity-0 pointer-events-none" : "opacity-100"
        )}
        onClick={() => setOpen(true)}
      >
        <div className={cn(
          "flex flex-col items-center py-10 px-0 rounded-l-sm shadow-md", // Ultra-thin tab with minimal width and height
          "bg-primary/90 backdrop-blur-sm text-primary-foreground",
          "transform transition-transform hover:translate-x-[-2px]",
          "sm:py-12" // Slightly taller on larger screens
        )}>
          <span className="font-medium -rotate-90 whitespace-nowrap tracking-wide text-[8px] sm:text-[9px] font-serif">Contact</span>
        </div>
      </div>

      {/* Contact Info Sheet */}
      <SheetContent className="max-w-sm border-l-0 border-t border-b bg-background/95 backdrop-blur-sm">
        <SheetHeader className="mb-6">
          <SheetTitle className="text-2xl font-serif">Get in Touch</SheetTitle>
        </SheetHeader>
        
        <div className="space-y-8">
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="bg-primary/10 p-2 rounded-full">
                <Mail className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium text-sm uppercase tracking-wide text-foreground/70">Email</h3>
                <a href="mailto:office@dropsofsoul.com" className="text-foreground hover:text-primary transition-colors">
                  office@dropsofsoul.com
                </a>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="bg-primary/10 p-2 rounded-full">
                <Phone className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium text-sm uppercase tracking-wide text-foreground/70">Phone</h3>
                <a href="tel:+436703538025" className="text-foreground hover:text-primary transition-colors">
                  +43 (0)670 353 8025
                </a>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="bg-primary/10 p-2 rounded-full">
                <MapPin className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium text-sm uppercase tracking-wide text-foreground/70">Address</h3>
                <p className="text-foreground">BrigittaPlatz 9</p>
              </div>
            </div>
          </div>
          
          <Separator />
          
          <div className="text-center text-sm text-muted-foreground">
            <p>We'll be happy to help you with any questions.</p>
          </div>
        </div>
      </SheetContent>
    </>
  );
};

export default ContactTab;
