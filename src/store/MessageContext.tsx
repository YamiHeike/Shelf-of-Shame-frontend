import { MessageInstance } from "antd/es/message/interface";
import useMessage from "antd/es/message/useMessage";
import { createContext, useContext } from "react";

const MessageContext = createContext<MessageInstance | undefined>(undefined);

type MessageContextProviderProps = {
  children: React.ReactNode;
};

export const MessageContextProvider = ({
  children,
}: MessageContextProviderProps) => {
  const [messageApi, contextHolder] = useMessage();
  return (
    <>
      {contextHolder}
      <MessageContext.Provider value={messageApi}>
        {children}
      </MessageContext.Provider>
    </>
  );
};

export const useMessageContext = () => {
  const ctx = useContext(MessageContext);
  if (!ctx) {
    throw new Error(
      "useMessageContext can only be used within a MessageContextProvider with valid MessageInstance value"
    );
  }
  return ctx;
};
