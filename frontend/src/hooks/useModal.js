import { useState } from "react";

// Usage: const [isOpen, open, close] = useModal();
export default function useModal(initial = false) {
  const [isOpen, setIsOpen] = useState(initial);
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  return [isOpen, open, close];
}
