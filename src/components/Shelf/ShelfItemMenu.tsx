import { Menu, MenuProps } from "antd";
import { useUserShelfItemContext } from "../../store";
import {
  useDeleteShelfItemMutation,
  useMarkAsReadMutation,
} from "../../store/shelfApi";
import { Status } from "../../types";
import { useNavigate } from "react-router-dom";
import useMessage from "antd/es/message/useMessage";

enum MenuKey {
  EDIT = "edit",
  DELETE = "delete",
  COMPLETE = "complete",
}

export const ShelfItemMenu = () => {
  const [markAsRead] = useMarkAsReadMutation();
  const [deleteShelfItem] = useDeleteShelfItemMutation();
  const { id, status } = useUserShelfItemContext();
  const navigate = useNavigate();
  const [messageApi, contextHolder] = useMessage();

  const handleClick: MenuProps["onClick"] = async ({ key }) => {
    try {
      switch (key) {
        case MenuKey.COMPLETE:
          await markAsRead(id).unwrap();
          messageApi.success("One item less!");
          break;
        case MenuKey.DELETE:
          await deleteShelfItem(id).unwrap();
          break;
        case MenuKey.EDIT:
          navigate(`${id}/edit`);
      }
    } catch (e: any) {
      console.error(e);
      let errorMessage = "";
      if (e.response) {
        errorMessage = e.response?.data.message || errorMessage;
      }
      messageApi.error(errorMessage || "Operation failed. Please try again.");
      return;
    }
  };

  return (
    <>
      {contextHolder}
      <Menu onClick={handleClick}>
        <Menu.Item key={MenuKey.EDIT}>Edit</Menu.Item>
        <Menu.Item key={MenuKey.DELETE}>Delete</Menu.Item>
        {!(status === Status.GLORY) && (
          <Menu.Item key={MenuKey.COMPLETE}>Mark as Completed</Menu.Item>
        )}
      </Menu>
    </>
  );
};
