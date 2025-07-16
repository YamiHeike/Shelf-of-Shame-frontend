export const reset = (val: string | null) => {
  if (val) {
    val = null;
  }
};

export const toProperCase = (str: string) => {
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};
