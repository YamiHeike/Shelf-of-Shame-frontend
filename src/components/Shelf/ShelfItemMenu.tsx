import { Menu, MenuProps } from "antd";
import { useUserShelfItemContext } from "../../store";
import {
  useDeleteShelfItemMutation,
  useMarkAsReadMutation,
} from "../../store/shelfApi";
import { Status } from "../../types";

enum MenuKey {
  EDIT = "edit",
  DELETE = "delete",
  COMPLETE = "complete",
}

export const ShelfItemMenu = () => {
  const [markAsRead] = useMarkAsReadMutation();
  const [deleteShelfItem] = useDeleteShelfItemMutation();
  const { id, status } = useUserShelfItemContext();
  const handleClick: MenuProps["onClick"] = ({ key }) => {
    switch (key) {
      case MenuKey.COMPLETE:
        markAsRead(id);
        break;
      case MenuKey.DELETE:
        deleteShelfItem(id);
        break;
    }
  };

  return (
    <Menu onClick={handleClick}>
      <Menu.Item key={MenuKey.EDIT}>Edit</Menu.Item>
      <Menu.Item key={MenuKey.DELETE}>Delete</Menu.Item>
      {!(status === Status.GLORY) && (
        <Menu.Item key={MenuKey.COMPLETE}>Mark as Completed</Menu.Item>
      )}
    </Menu>
  );
};
