"use client";

import { useRouter } from "next/navigation";

import Form from "~/components/blocks/form/form";
import Modal from "~/components/ui/modal";

import { UI } from "~/data/ui";

export function FormModalWrapper() {
  const router = useRouter();

  const handleClose = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
    } else {
      router.replace("/");
    }
  };

  return (
    <Modal onClose={handleClose} aria-label={UI.form.modalTitle}>
      <Modal.Header>{UI.form.modalTitle}</Modal.Header>
      <Modal.Body>
        <Form />
      </Modal.Body>
    </Modal>
  );
}
