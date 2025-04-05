
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Send, X, MessageSquare } from 'lucide-react';
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
      {/* Modern side tab */}
      <div 
        className={cn(
          "fixed right-0 top-2/3 transform -translate-y-1/2 z-30 cursor-pointer transition-all duration-300",
          open ? "opacity-0 pointer-events-none" : "opacity-100"
        )}
        onClick={() => setOpen(true)}
      >
        <div className={cn(
          "flex items-center gap-2 bg-primary text-primary-foreground py-3 px-5 rounded-l-lg shadow-lg",
          "transform transition-transform hover:translate-x-[-5px]"
        )}>
          <MessageSquare className="h-5 w-5" />
          <span className="font-medium">Contact</span>
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
