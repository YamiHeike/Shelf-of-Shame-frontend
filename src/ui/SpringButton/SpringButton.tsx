import { motion } from "motion/react";

type SpringButtonProps = {
  children: React.ReactNode;
};

export const SpringButton = ({ children }: SpringButtonProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      transition={{ type: "spring", stiffness: 500 }}
    >
      {children}
    </motion.div>
  );
};
