import { FC, PropsWithChildren } from "react";
import { Header } from "./header/Header";
import styles from "./Layout.module.scss";

export const Layout: FC<PropsWithChildren<unknown>> = ({ children }) => {
  return (
    <div className={styles.layout}>
      <Header />
      <main className={styles.content}>{children}</main>
    </div>
  );
};
