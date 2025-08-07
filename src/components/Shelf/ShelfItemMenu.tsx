import { Menu } from "antd";
import { useUserShelfItemContext } from "../../store";
import { useMarkAsReadMutation } from "../../store/shelfApi";
import { Status } from "../../types";

export const ShelfItemMenu = () => {
  const [markAsRead, result] = useMarkAsReadMutation();
  const { id, status } = useUserShelfItemContext();
  const handleMarkAsRead = () => {
    markAsRead(id);
  };

  return (
    <Menu>
      <Menu.Item key="edit">Edit</Menu.Item>
      <Menu.Item key="delete">Delete</Menu.Item>
      {!(status === Status.GLORY) && (
        <Menu.Item key="complete" onClick={handleMarkAsRead}>
          Mark as Completed
        </Menu.Item>
      )}
    </Menu>
  );
};
