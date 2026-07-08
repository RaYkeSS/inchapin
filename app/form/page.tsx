import type { Metadata } from "next";

import Form from "~/components/blocks/form/form";

import { UI } from "~/data/ui";

import styles from "./form.module.scss";

export const metadata: Metadata = {
  title: "Заявка на звонок",
  description: "Оставьте заявку — мы свяжемся с вами в ближайшее время.",
};

export default function FormPage() {
  return (
    <section className={styles.page}>
      <h1 className={styles.title}>{UI.form.modalTitle}</h1>
      <div className={styles.formWrap}>
        <Form />
      </div>
    </section>
  );
}
