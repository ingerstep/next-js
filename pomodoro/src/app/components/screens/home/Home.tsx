import { FC } from "react";
import styles from "./Home.module.scss";
import { Layout } from "../../layout/Layout";
import { Taskbar } from "./Taskbar/Taskbar";
import { Dashboard } from "./Dashboard/Dashboard";

export const Home: FC = () => {
  return (
    <Layout>
      <main className={styles.main}>
        <Taskbar/>
        <Dashboard/>
      </main>
    </Layout>
  );
};
