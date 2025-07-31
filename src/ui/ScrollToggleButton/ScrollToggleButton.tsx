import { useEffect, useState } from "react";
import { UpOutlined, DownOutlined } from "@ant-design/icons";
import styles from "./ScrollToggleButton.module.scss";

export const ScrollToggleBottom = () => {
  const [atTop, setAtTop] = useState(true);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = window.innerHeight;
      const nearBottom = scrollTop + clientHeight >= scrollHeight - 50;
      setAtTop(!nearBottom);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = () => {
    if (atTop) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth",
      });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <button
      onClick={handleClick}
      className={styles.button}
      aria-label={atTop ? "Scroll to bottom" : "Scroll to top"}
      title={atTop ? "Scroll to bottom" : "Scroll to top"}
    >
      {atTop ? <DownOutlined /> : <UpOutlined />}
    </button>
  );
};
