import Link from "next/link";

import Logo from "~/components/icons/logo/logo";
import Phone from "~/components/icons/phone";
import { BurgerMenu } from "~/components/ui/burger-menu";
import { Button } from "~/components/ui/button";

import { CONTACTS } from "~/data/contacts";
import { UI } from "~/data/ui";

import { HeaderSelect } from "./header-select";
import styles from "./header.module.scss";

export function Header() {
  return (
    <header className={styles.header}>
      <div className={`${styles.headerCnt} container`}>
        <div className={styles.headerBlock}>
          <div className={styles.headerBlockBlockMb}>
            <BurgerMenu>{UI.menu.burgerLabel}</BurgerMenu>
            <Button
              as="a"
              href={CONTACTS.phoneLink}
              variant="secondary"
              size="md"
              className={styles.headerPhoneMob}
              aria-label="Phone"
            >
              <Phone />
            </Button>
          </div>

          <HeaderSelect className={styles.headerSelect} />
        </div>
        <Link href="/" className={styles.logoLink} aria-label="Logo">
          <Logo className={styles.logo} />
        </Link>
        <div className={styles.headerBlock}>
          <Button
            as="a"
            href={CONTACTS.phoneLink}
            variant="link"
            size="md"
            className={styles.headerPhonePC}
          >
            {CONTACTS.phoneFormatted}
          </Button>
          <Button
            as={Link}
            href="/form"
            variant="secondary"
            size="md"
            className={styles.headerFormBtn}
          >
            {UI.header.ctaButton}
          </Button>
        </div>
      </div>
    </header>
  );
}
