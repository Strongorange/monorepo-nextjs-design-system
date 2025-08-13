"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { Button } from "@design-system-test/ui";
import { useTheme } from "next-themes";

export default function Home() {
  const { theme, setTheme } = useTheme();
  const toggle = () => setTheme(theme === "dark" ? "light" : "dark");

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div
          style={{
            display: "flex",
            gap: 8,
            alignItems: "center",
            marginBottom: 12,
          }}
        >
          <span>Theme: {theme}</span>
          <button
            onClick={toggle}
            style={{ padding: 8, border: "1px solid #ccc", borderRadius: 4 }}
          >
            Toggle
          </button>
        </div>
        <Button>Default</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="destructive">Destructive</Button>
      </main>
    </div>
  );
}
