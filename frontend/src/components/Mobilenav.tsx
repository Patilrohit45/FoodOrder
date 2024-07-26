import React from 'react';
import  { Sheet,SheetContent,SheetDescription,SheetTitle,SheetTrigger } from './ui/sheet';
import { Menu } from 'lucide-react';
import { Separator } from '@radix-ui/react-separator';
import { Button } from './ui/button';
 "./ui/sheet";

export default function Mobilenav() {
  return (
    <Sheet>
        <SheetTrigger>
                <Menu className='text-orange-500'/>
        </SheetTrigger>
        <SheetContent className='space-y-3'>
            <SheetTitle>
                <span>Welcome to OrderEats!</span>
            </SheetTitle>
            <Separator/>
            <SheetDescription className='flex'>
                <Button className='flex-1 font-bold bg-orange-500'>Log In</Button>
            </SheetDescription>
        </SheetContent>
    </Sheet>
  )
}
