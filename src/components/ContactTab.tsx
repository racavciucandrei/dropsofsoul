
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Send, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLight } from '@/context/LightProvider';

const ContactTab = () => {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const { isLightOn } = useLight();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, you would send this data to your backend
    toast({
      title: "Message sent!",
      description: "We'll get back to you as soon as possible.",
    });
    
    setOpen(false);
  };

  return (
    <>
      {/* Contact tab that appears at the side of screen */}
      <div 
        className={cn(
          "fixed right-0 top-2/3 transform -translate-y-1/2 z-30 cursor-pointer transition-all duration-300 hover:-translate-x-2",
          open ? "opacity-0 pointer-events-none" : "opacity-100"
        )}
        onClick={() => setOpen(true)}
      >
        <div className={cn(
          "relative flex items-center -rotate-90 origin-right",
          "bg-secondary border-t border-l border-r border-primary/30 rounded-t-lg shadow-lg",
          "py-2 px-6 transform -translate-x-[calc(100%-32px)]",
          isLightOn ? "text-primary" : "text-primary-foreground company-name"
        )}>
          <span className="font-serif font-bold tracking-wider">Contact Us</span>
          <div className={cn(
            "absolute top-0 bottom-0 -right-6 w-6 bg-secondary skew-x-[20deg] border-t border-r border-primary/30",
            "shadow-lg"
          )}></div>
          <div className={cn(
            "absolute top-0 bottom-0 -left-6 w-6 bg-secondary -skew-x-[20deg] border-t border-l border-primary/30",
            "shadow-lg"
          )}></div>
        </div>
      </div>

      {/* Contact Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-serif">Send us a message</DialogTitle>
            <DialogDescription>
              Drop us a line and we'll get back to you soon.
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">Name</label>
              <Input id="name" placeholder="Your name" required />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">Email</label>
              <Input id="email" type="email" placeholder="Your email address" required />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium">Message</label>
              <Textarea id="message" placeholder="How can we help you?" rows={4} required />
            </div>
            
            <div className="flex justify-end gap-2 pt-4">
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                <X className="mr-2 h-4 w-4" />
                Cancel
              </Button>
              <Button type="submit">
                <Send className="mr-2 h-4 w-4" />
                Send Message
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ContactTab;
