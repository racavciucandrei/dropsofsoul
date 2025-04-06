
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { X, Mail, Phone, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLight } from '@/context/LightProvider';
import { Separator } from '@/components/ui/separator';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';

const ContactTab = () => {
  const [open, setOpen] = useState(false);
  const { isLightOn } = useLight();
  
  return (
    <>
      {/* Modern vertical side tab */}
      <div 
        className={cn(
          "fixed right-0 top-1/2 transform -translate-y-1/2 z-30 cursor-pointer transition-all duration-300",
          open ? "opacity-0 pointer-events-none" : "opacity-100"
        )}
        onClick={() => setOpen(true)}
      >
        <div className={cn(
          "flex flex-col items-center py-10 px-4 rounded-l-lg shadow-lg",
          "bg-primary/90 backdrop-blur-sm text-primary-foreground",
          "transform transition-transform hover:translate-x-[-5px]"
        )}>
          <span className="font-medium -rotate-90 whitespace-nowrap tracking-wide uppercase text-xs font-serif">Contact Us</span>
        </div>
      </div>

      {/* Contact Info Sheet */}
      <Sheet open={open} onOpenChange={setOpen}>
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
      </Sheet>
    </>
  );
};

export default ContactTab;
