import { FC } from "react";
import styles from "./Dashboard.module.scss";
import { HeaderDash } from "./HeaderDash/HeaderDash";
import { DashContent } from "./DashContent/DashContent";

export const Dashboard: FC = () => {
  return (
    <div className={styles.dashboard}>
      <HeaderDash />
      <DashContent/>
    </div>
  );
};
