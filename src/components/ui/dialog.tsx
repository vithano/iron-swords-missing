import { Transition } from "@headlessui/react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { clsx } from "clsx";
import React, { Fragment, useState } from "react";
import { Button } from "./button";
interface ButtonProps {
    text: string | React.ReactNode;
    shouldClose: boolean;
    onClick: () => void;
}
interface DialogProps {
    children: React.ReactNode;
    title: string;
    description: string;
    primaryButton: ButtonProps;
    secondaryButton?: ButtonProps;
}

const Dialog = (props: DialogProps) => {
  let [isOpen, setIsOpen] = useState(false);

  return (
    <DialogPrimitive.Root open={isOpen} onOpenChange={setIsOpen}>
      <DialogPrimitive.Trigger asChild>
        {props.children}
      </DialogPrimitive.Trigger>
      <DialogPrimitive.Portal forceMount>
        <Transition.Root show={isOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <DialogPrimitive.Overlay
              forceMount
              className="fixed inset-0 z-20 bg-black/50"
            />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <DialogPrimitive.Content
              forceMount
              className={clsx(
                "fixed z-50",
                "w-[95vw] max-w-md rounded-lg p-4 md:w-full",
                "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
                "bg-white dark:bg-gray-800",
                "focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75"
              )}
            >
              <DialogPrimitive.Title dir="rtl" className="text-sm font-medium text-gray-900 dark:text-gray-100">
                {props.title}
              </DialogPrimitive.Title>
              <DialogPrimitive.Description dir="rtl" className="mt-2 text-sm font-normal text-gray-700 dark:text-gray-400">
                {props.description}
              </DialogPrimitive.Description>
              <div className={`mt-4 flex ${props.secondaryButton? 'justify-between' : 'justify-end'}`}>
                {props.primaryButton.shouldClose ? <DialogPrimitive.Close
                onClick={props.primaryButton.onClick}
                  className={clsx(
                    "text-white text-primary-foreground h-10 px-4 py-2 inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground"
                  )}
                >
                  {props.primaryButton.text}
                </DialogPrimitive.Close> : <Button onClick={props.primaryButton.onClick} variant="outline">
                  {props.primaryButton.text}
                </Button>}
              {props.secondaryButton ? props.secondaryButton.shouldClose ? <DialogPrimitive.Close
                onClick={props.secondaryButton.onClick}
                  className={clsx(
                    "text-white text-primary-foreground h-10 px-4 py-2 inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground"
                  )}
                >
                    {props.secondaryButton?.text}
                </DialogPrimitive.Close> : <Button onClick={props.secondaryButton.onClick} variant="secondary">
                    {props.secondaryButton.text}
                </Button> : null}
              </div>
              <DialogPrimitive.Close
                className={clsx(
                  "absolute end-auto top-3.5 right-3.5 inline-flex items-center justify-center rounded-full p-1",
                  "focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75"
                )}
              >
                <span className="h-4 w-4 text-gray-500 hover:text-gray-700 dark:text-gray-500 dark:hover:text-gray-400" >X</span>
              </DialogPrimitive.Close>
            </DialogPrimitive.Content>
          </Transition.Child>
        </Transition.Root>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
};

export { Dialog };