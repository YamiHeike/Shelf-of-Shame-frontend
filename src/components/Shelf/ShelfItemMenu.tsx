import { Menu } from "antd";

export const ShelfItemMenu = () => {
  return (
    <Menu>
      <Menu.Item key="edit">Edit</Menu.Item>
      <Menu.Item key="delete">Delete</Menu.Item>
      <Menu.Item key="complete">Mark as Completed</Menu.Item>
    </Menu>
  );
};
