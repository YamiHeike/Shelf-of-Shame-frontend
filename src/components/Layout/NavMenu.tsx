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
      style={{
        padding: 8,
        fontWeight: 200,
        height: 65,
        opacity: 0.9,
        top: 0,
        left: 0,
        width: "100%",
      }}
    >
      {/* Custom logo item outside the items array */}

      <NavLink
        to={routes.HOME.path}
        style={{
          textDecoration: "none",
          cursor: "pointer",
        }}
      >
        <RadarChartOutlined
          onClick={handleLogoClick}
          rotate={45}
          style={{ fontSize: 44, padding: 2, color: "#BF2633" }}
        />
      </NavLink>

      {/* Regular menu items */}
      {items.map((item) => (
        <Menu.Item key={item.key}>
          <NavLink to={item.key}>{item.label}</NavLink>
        </Menu.Item>
      ))}
    </Menu>
  );
};
