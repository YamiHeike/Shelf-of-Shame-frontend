import { Menu, MenuProps } from "antd";
import { useUserShelfItemContext } from "../../store";
import { useMarkAsReadMutation } from "../../store/shelfApi";
import { Status } from "../../types";

enum MenuKey {
  EDIT = "edit",
  DELETE = "delete",
  COMPLETE = "complete",
}

export const ShelfItemMenu = () => {
  const [markAsRead, result] = useMarkAsReadMutation();
  const { id, status } = useUserShelfItemContext();
  const handleClick: MenuProps["onClick"] = ({ key }) => {
    switch (key) {
      case MenuKey.COMPLETE: {
        markAsRead(id);
      }
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
