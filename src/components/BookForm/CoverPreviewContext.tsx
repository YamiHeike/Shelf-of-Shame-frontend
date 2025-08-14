import { createContext, useContext, useState } from "react";
import { HttpState } from "../../types/HttpState";
import { fetchCoverUrl } from "../../utils";
import { useMessageContext } from "../../store/MessageContext";

type CoverPreviewContextType = {
  coverLoading: boolean;
  coverError: boolean;
  coverData: string | null;
  getPreview: (isbn: string) => void;
  resetPreview: () => void;
};

const CoverPreviewContext = createContext<CoverPreviewContextType | undefined>(
  undefined
);

type CoverPreviewContextProviderProps = {
  children: React.ReactNode;
};

export const CoverPreviewContextProvider = ({
  children,
}: CoverPreviewContextProviderProps) => {
  const defaultValues: HttpState<string> = {
    loading: false,
    error: false,
    data: null,
  };
  const [coverUrl, setCoverUrl] = useState<HttpState<string>>(defaultValues);
  const messageApi = useMessageContext();

  const {
    loading: coverLoading,
    error: coverError,
    data: coverData,
  } = coverUrl;

  const getPreview = async (isbn: string) => {
    if (!isbn || isbn.length !== 10) {
      if (messageApi) {
        messageApi.warning("Enter a ISBN-10 first");
      }
      return;
    }
    setCoverUrl({
      loading: true,
      data: null,
      error: false,
    });
    const url = await fetchCoverUrl(isbn);
    if (url) {
      setCoverUrl({
        loading: false,
        data: url,
        error: false,
      });
    } else {
      setCoverUrl({
        loading: false,
        data: null,
        error: true,
      });
    }
  };

  const resetPreview = () => {
    setCoverUrl(defaultValues);
  };

  return (
    <CoverPreviewContext.Provider
      value={{
        coverLoading,
        coverError,
        coverData,
        getPreview,
        resetPreview,
      }}
    >
      {children}
    </CoverPreviewContext.Provider>
  );
};

export const useCoverPreviewContext = () => {
  const context = useContext(CoverPreviewContext);
  if (!context) {
    throw new Error(
      "useCoverPreviewContext preview can be used only within a CoverPreviewContextProvider with valid CoverPreviewContextType value"
    );
  }
  return context;
};
