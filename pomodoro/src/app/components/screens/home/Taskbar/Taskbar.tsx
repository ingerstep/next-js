import { FC } from "react";
import styles from "./Taskbar.module.scss";
import { Methodology } from "./Methodology/Methodology";
import { Form } from "./Form/Form";

export const Taskbar: FC = () => {
  return (
    <div className={styles.taskbar}>
      <Methodology />
      <Form/>
    </div>
  );
};
