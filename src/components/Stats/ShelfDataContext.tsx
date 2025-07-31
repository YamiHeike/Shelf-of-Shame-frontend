import { UserShelfItemRecord } from "../../types";
import { GenresState } from "../../store/genresSlice";
import { createContext, useContext } from "react";
import { useGetShelfQuery } from "../../store/shelfApi";
import { useLibraryData } from "../../hooks";

type ShelfDataContextType = {
  data: UserShelfItemRecord[] | undefined;
  loading: boolean;
  errored: boolean;
  genres: GenresState;
};

type ShelfDataContextProviderProps = {
  children: React.ReactNode;
};

const ShelfDataContext = createContext<ShelfDataContextType | undefined>(
  undefined
);

export const ShelfDataContextProvider = ({
  children,
}: ShelfDataContextProviderProps) => {
  const { data, error, isLoading } = useGetShelfQuery();
  const { genres } = useLibraryData();

  const loading = isLoading || genres.loading;
  const errored = !!error || !!genres.error;

  const ctxValues: ShelfDataContextType = {
    data,
    loading,
    errored,
    genres,
  };

  return (
    <ShelfDataContext.Provider value={ctxValues}>
      {children}
    </ShelfDataContext.Provider>
  );
};

export const useShelfDataContext = () => {
  const ctx = useContext(ShelfDataContext);
  if (!ctx) {
    throw new Error(
      "useShelfDataContext can be used only inside ShelfDataContextProvider with a valid ShelfDataContextType value"
    );
  }
  return ctx;
};
