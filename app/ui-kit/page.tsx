"use client";

import { useState } from "react";

import { Button } from "~/components/ui/button";
import { Dropdown } from "~/components/ui/dropdown";
import { Input } from "~/components/ui/input";
import { Select } from "~/components/ui/select";
import { Text } from "~/components/ui/text";

const options = [
  { value: "a", label: "Вариант А" },
  { value: "b", label: "Вариант Б" },
  { value: "c", label: "Вариант В" },
];

export default function UiKitPage() {
  const [sel, setSel] = useState<{ value: string; label: string } | null>(null);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
        padding: "2rem",
      }}
    >
      <section>
        <h2>Button</h2>
        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <Button variant="primary" size="md">
            Primary md
          </Button>
          <Button variant="secondary" size="md">
            Secondary md
          </Button>
          <Button variant="primary" size="xl">
            Primary xs
          </Button>
          <Button variant="secondary" size="xl">
            Secondary xs
          </Button>
        </div>
      </section>

      <section>
        <h2>Text</h2>
        <Text size="tagline">Tagline (xl=26px, sm=13px)</Text>
        <br />
        <Text size="caption">Caption line</Text>
        <br />
        <Text size="paragraph">Paragraph text sample.</Text>
        <br />
        <Text size="description">Description text.</Text>
        <br />
        <Text color="accent">Accent color</Text>
        <br />
        <Text color="muted">Muted color</Text>
      </section>

      <section>
        <h2>Dropdown</h2>
        <Dropdown
          trigger={({ toggle }) => (
            <button onClick={toggle}>Открыть меню</button>
          )}
        >
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            style={{ display: "block", padding: "0.25rem" }}
          >
            Пункт 1
          </a>
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            style={{ display: "block", padding: "0.25rem" }}
          >
            Пункт 2
          </a>
        </Dropdown>
      </section>

      <section style={{ maxWidth: "20rem" }}>
        <h2>Select</h2>
        <Select
          options={options}
          value={sel}
          onChange={(v) => setSel(v as { value: string; label: string } | null)}
          placeholder="Выберите…"
        />
      </section>

      <section style={{ maxWidth: "20rem" }}>
        <h2>Input</h2>
        <Input label="Ваше имя" id="name" />
      </section>
    </div>
  );
}
