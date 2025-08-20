import { Select, SelectProps } from "antd";
import { useLibraryData } from "../../hooks";

type GenreSelectorProps = {
  onChangeGenres: (values: any) => void;
  value?: string[] | undefined;
} & SelectProps;

export const GenreSelector = ({
  onChangeGenres,
  value,
  ...rest
}: GenreSelectorProps) => {
  const { genres } = useLibraryData();
  const genreOptions = genres.list.map((genre) => ({
    value: genre.name,
    label: genre.name,
  }));

  return (
    <Select
      mode="multiple"
      placeholder="Genres"
      options={genreOptions}
      allowClear
      value={value}
      onChange={onChangeGenres}
      {...rest}
    />
  );
};
