import { Radio, Typography } from "antd";
import { useUserShelfItemContext } from "../../store";
import { Status } from "../../types";

import styles from "./EditItem.module.scss";

const { Text } = Typography;

type StatusSelectorProps = {
  statusRef: React.RefObject<Status>;
};

export const StatusSelector = ({ statusRef }: StatusSelectorProps) => {
  const { status } = useUserShelfItemContext();
  return (
    <>
      <Text>Status:</Text>
      <Radio.Group
        onChange={(e) => (statusRef.current = e.target.value)}
        defaultValue={status}
        className={styles.statusGroup}
      >
        <Radio.Button value={Status.SHAME}>Shame</Radio.Button>
        <Radio.Button value={Status.GLORY}>Glory</Radio.Button>
        <Radio.Button value={Status.READING}>Reading</Radio.Button>
      </Radio.Group>
    </>
  );
};
