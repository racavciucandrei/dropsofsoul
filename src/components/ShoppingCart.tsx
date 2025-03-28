
import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  Drawer, 
  DrawerClose, 
  DrawerContent, 
  DrawerFooter, 
  DrawerHeader, 
  DrawerTitle, 
  DrawerTrigger 
} from '@/components/ui/drawer';
import { ShoppingCart as CartIcon, Plus, Minus, X, ArrowRight } from 'lucide-react';
import { useCart } from '@/context/CartProvider';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

export const ShoppingCart = () => {
  const { items, totalItems, totalPrice, updateQuantity, removeItem, clearCart } = useCart();
  
  const handleCheckout = () => {
    toast.success('Checkout functionality would go here!');
    clearCart();
  };
  
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <CartIcon className="h-5 w-5" />
          {totalItems > 0 && (
            <Badge 
              className="absolute -top-2 -right-2 px-1.5 py-0.5 min-w-5 h-5 flex items-center justify-center"
              variant="destructive"
            >
              {totalItems}
            </Badge>
          )}
        </Button>
      </DrawerTrigger>
      <DrawerContent className="max-h-[85vh] overflow-y-auto">
        <DrawerHeader>
          <DrawerTitle>Your Shopping Cart</DrawerTitle>
        </DrawerHeader>
        
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8">
            <CartIcon className="h-16 w-16 text-muted-foreground mb-4" />
            <p className="text-lg font-medium">Your cart is empty</p>
            <p className="text-muted-foreground">Add some items to get started</p>
            <DrawerClose asChild>
              <Button variant="outline" className="mt-4">
                Continue Shopping
              </Button>
            </DrawerClose>
          </div>
        ) : (
          <>
            <div className="px-4">
              {items.map((item) => (
                <div 
                  key={item.product.id} 
                  className="flex items-center gap-4 py-4 border-b last:border-b-0"
                >
                  <div className="w-16 h-16 rounded-md overflow-hidden bg-slate-100">
                    {item.product.images && item.product.images[0] ? (
                      <img 
                        src={item.product.images[0]} 
                        alt={item.product.name} 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <span className="text-muted-foreground text-xs">No image</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <h4 className="font-medium">{item.product.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      ${item.product.price.toFixed(2)} each
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="h-7 w-7"
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    
                    <span className="w-6 text-center">{item.quantity}</span>
                    
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="h-7 w-7"
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                  
                  <div className="text-right w-20 font-medium">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </div>
                  
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-7 w-7"
                    onClick={() => removeItem(item.product.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
            
            <div className="p-4 border-t">
              <div className="flex justify-between py-2">
                <span>Subtotal</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-2 font-medium">
                <span>Total</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
            </div>
            
            <DrawerFooter>
              <Button onClick={handleCheckout} className="w-full">
                Checkout
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <DrawerClose asChild>
                <Button variant="outline">Continue Shopping</Button>
              </DrawerClose>
              <Button variant="ghost" onClick={clearCart} className="text-destructive">
                Clear Cart
              </Button>
            </DrawerFooter>
          </>
        )}
      </DrawerContent>
    </Drawer>
  );
};
