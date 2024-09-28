import styles from "./not-found.module.css";
import Link from "next/link";
import Button from "@/components/ui/Button";

export default async function NotFoundPage() {
  return (
    <>
    <main className={`${styles.main} pagenotfound`}>
      <h1 className={styles.title}>
        404 (Page not found)
      </h1>
      <div className={styles.links}>
        <Button type="a" href='/' text="Home" />
        <Button bgcolor="deep-teal" type="a" href='/insights' text="Blog" />
      </div>
    </main>
    </>
  );
}