import { Menu } from "antd";
import { routes } from "../../routes";
import { NavLink } from "react-router-dom";
import { RadarChartOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

export const NavMenu = () => {
  const navigate = useNavigate();

  const items = Object.values(routes).map((route) => ({
    key: route.path,
    label: route.label,
  }));

  const handleLogoClick = () => {
    navigate(routes.HOME.path);
  };

  return (
    <Menu
      mode="horizontal"
      selectedKeys={[]}
      style={{ padding: 8, fontWeight: 200, height: 65, opacity: 0.9 }}
    >
      <RadarChartOutlined
        onClick={handleLogoClick}
        rotate={45}
        style={{ fontSize: 44, padding: 2, color: "#1677ff" }}
      />
      {items.map((item) => (
        <Menu.Item key={item.key}>
          <NavLink
            to={item.key}
            style={({ isActive }) => ({
              color: isActive ? "#1677ff" : "inherit",
            })}
          >
            {item.label}
          </NavLink>
        </Menu.Item>
      ))}
    </Menu>
  );
};
