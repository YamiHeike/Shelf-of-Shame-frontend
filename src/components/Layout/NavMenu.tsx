import { Menu } from "antd";
import { routes } from "../../routes";
import { NavLink } from "react-router-dom";
import { RadarChartOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { RotatingLogo } from "../ui/RotatingLogo";
import { useAuth } from "../Auth";

export const NavMenu = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();

  let items = [];

  if (isAuthenticated) {
    items = [
      {
        key: routes.SHELF.path,
        label: routes.SHELF.label,
      },
    ];
  } else {
    items = [
      {
        key: routes.LOGIN.path,
        label: routes.LOGIN.label,
      },
      {
        key: routes.SIGNUP.path,
        label: routes.SIGNUP.label,
      },
    ];
  }

  items = [
    {
      key: routes.HOME.path,
      label: routes.HOME.label,
    },
    ...items,
  ];

  const handleLogoClick = () => {
    navigate(routes.HOME.path);
  };

  const handleLogout = () => {
    navigate(routes.HOME.path);
    logout();
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
        borderBottom: "1px solid #ddd",
      }}
    >
      <NavLink
        to={routes.HOME.path}
        style={{
          textDecoration: "none",
          cursor: "pointer",
        }}
      >
        <RotatingLogo
          Icon={RadarChartOutlined}
          onClick={handleLogoClick}
          rotate={45}
          style={{ fontSize: 44, padding: 2, color: "#BF2633" }}
        />
      </NavLink>
      {items.map((item) => (
        <Menu.Item key={item.key}>
          <NavLink
            to={item.key}
            style={({ isActive }) => ({
              color: isActive ? "#BF2633" : "inherit",
            })}
          >
            {item.label}
          </NavLink>
        </Menu.Item>
      ))}
      {isAuthenticated && (
        <Menu.Item key="logout" style={{ marginLeft: "auto" }}>
          <a onClick={handleLogout}>Log out</a>
        </Menu.Item>
      )}
    </Menu>
  );
};
