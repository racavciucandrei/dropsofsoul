import React, { useState, useEffect } from 'react';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"
import { ShoppingCart as ShoppingCartIcon, Trash } from 'lucide-react';
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { useCart } from '@/context/CartProvider';

const ShoppingCart = () => {
  const { cartItems, removeItem, clearCart } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [subtotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState(0);
  const shippingCost = 5;

  useEffect(() => {
    // Calculate subtotal whenever cartItems change
    const newSubtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setSubtotal(newSubtotal);
  }, [cartItems]);

  useEffect(() => {
    // Calculate total whenever subtotal changes
    setTotal(subtotal + shippingCost);
  }, [subtotal]);

  const handleRemove = (itemId: number) => {
    removeItem(itemId);
  };

  const handleClearCart = () => {
    clearCart();
    setIsOpen(false);
  };

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline" className="relative">
          <ShoppingCartIcon className="h-5 w-5" />
          <span className="sr-only">Shopping Cart</span>
          {cartItems.length > 0 && (
            <Badge className="absolute -top-2 -right-2 rounded-full px-2 py-0.5 text-xs">
              {cartItems.length}
            </Badge>
          )}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Shopping Cart</DrawerTitle>
          <DrawerDescription>
            {cartItems.length > 0 ? 'Review your items and proceed to checkout.' : 'Your cart is empty.'}
          </DrawerDescription>
        </DrawerHeader>
        <div className="flex flex-col space-y-4">
          {cartItems.length > 0 ? (
            <ScrollArea className="h-[400px] px-4">
              <div className="divide-y divide-border">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex py-4 relative">
                    <div className="mr-4">
                      <img
                        src={item.images[0]}
                        alt={item.name}
                        className="h-16 w-16 rounded object-cover"
                      />
                    </div>
                    <div className="flex-grow">
                      <div className="font-medium">{item.name}</div>
                      <div className="text-sm text-muted-foreground">Quantity: {item.quantity}</div>
                      <div className="font-medium">${(item.price * item.quantity).toFixed(2)}</div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2 hover:bg-secondary rounded-full"
                      onClick={() => handleRemove(item.id)}
                    >
                      <Trash className="h-4 w-4" />
                      <span className="sr-only">Remove item</span>
                    </Button>
                  </div>
                ))}
              </div>
            </ScrollArea>
          ) : (
            <div className="p-4 text-center text-muted-foreground">
              Your cart is empty.
            </div>
          )}
        </div>
        {cartItems.length > 0 && (
          <>
            <Separator />
            <div className="px-4 py-2">
              <div className="flex justify-between">
                <div className="text-sm font-medium">Subtotal</div>
                <div className="font-medium">${(subtotal).toFixed(2)}</div>
              </div>
              <div className="flex justify-between mt-2">
                <div className="text-sm font-medium">Shipping</div>
                <div className="font-medium">${shippingCost.toFixed(2)}</div>
              </div>
              <div className="flex justify-between mt-2">
                <div className="text-sm font-bold">Total</div>
                <div className="font-bold">${(total).toFixed(2)}</div>
              </div>
            </div>
          </>
        )}
        <DrawerFooter>
          {cartItems.length > 0 ? (
            <div className="w-full flex justify-between">
              <Button variant="destructive" onClick={handleClearCart}>Clear Cart</Button>
              <Button>Checkout</Button>
            </div>
          ) : (
            <DrawerClose asChild>
              <Button variant="outline" className="w-full">Close</Button>
            </DrawerClose>
          )}
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default ShoppingCart;
