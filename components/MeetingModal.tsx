'use client';

import { ReactNode } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogDescription,
} from './ui/dialog';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import Image from 'next/image';

interface MeetingModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  className?: string;
  children?: ReactNode;
  handleClick?: () => void;
  buttonText?: string;
  instantMeeting?: boolean;
  image?: string;
  buttonClassName?: string;
  buttonIcon?: string;
  description?: string;
  disabled?: boolean; // ✅ NEW PROP
}

const MeetingModal = ({
  isOpen,
  onClose,
  title,
  className,
  children,
  handleClick,
  buttonText,
  image,
  buttonClassName,
  buttonIcon,
  description,
  disabled = false, // ✅ default to false
}: MeetingModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="flex w-full max-w-[520px] flex-col gap-6 border-none bg-dark-1 px-6 py-9 text-white">
        <DialogHeader>
          <DialogTitle className={cn('text-3xl font-bold', className)}>
            {title}
          </DialogTitle>
          {description && (
            <DialogDescription className="text-base text-white/70">
              {description}
            </DialogDescription>
          )}
        </DialogHeader>

        {image && (
          <div className="flex justify-center">
            <Image src={image} alt="checked" width={72} height={72} />
          </div>
        )}

        {children}

        <Button
          className={cn(
            'bg-blue-1 focus-visible:ring-0 focus-visible:ring-offset-0',
            buttonClassName
          )}
          onClick={handleClick}
          disabled={disabled} // ✅ APPLY DISABLED PROP
        >
          {buttonIcon && (
            <Image
              src={buttonIcon}
              alt="button icon"
              width={13}
              height={13}
              className="mr-2"
            />
          )}
          {buttonText || 'Schedule Meeting'}
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default MeetingModal;
