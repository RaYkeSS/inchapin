import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";

import { UI } from "~/data/ui";

import styles from "./not-found.module.scss";

export default function NotFound() {
  return (
    <div className={styles.errorBlock}>
      <div className={styles.code}>{UI.notFound.code}</div>
      <Text as="h2" size="description" color="accent" className={styles.title}>
        {UI.notFound.title}
      </Text>
      <p className={styles.text}>{UI.notFound.description}</p>
      <Button
        as="a"
        href="/"
        variant="primary"
        size="xl"
        className={styles.button}
      >
        {UI.notFound.button}
      </Button>
    </div>
  );
}
