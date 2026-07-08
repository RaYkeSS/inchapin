import type { Dispatch, ReactNode, SetStateAction } from "react";

export interface ModalContextType {
  onClose: () => void;
  closing: boolean;
  setClosing: Dispatch<SetStateAction<boolean>>;
  startClose: () => void;
}

export interface ModalProps {
  children: ReactNode;
  onClose: () => void;
  closing?: boolean;
  ariaLabel?: string;
}

export interface ModalHeaderProps {
  children: ReactNode;
}

export interface ModalBodyProps {
  children: ReactNode;
}
