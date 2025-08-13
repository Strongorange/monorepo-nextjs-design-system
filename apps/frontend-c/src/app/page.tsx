import Image from "next/image";
import styles from "./page.module.css";
import { Button } from "@design-system-test/ui";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Button>Click me!!!!!!!!!!!!</Button>
        <Button variant="secondary">Click me!!!!!!!!!!!!</Button>
        <Button variant="ghost">Click me!!!!!!!!!!!!</Button>
        <Button variant="destructive">Click me!!!!!!!!!!!!</Button>
      </main>
    </div>
  );
}
