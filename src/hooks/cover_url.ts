import { useEffect, useState } from "react";
import { fetchCoverUrl } from "../utils";

export const useCoverUrl = (isbn: string, large: boolean) => {
  const [coverUrl, setCoverUrl] = useState<string | null>(null);
  useEffect(() => {
    let active = true;
    fetchCoverUrl(isbn, large).then((url) => {
      if (active) setCoverUrl(url);
    });
    return () => {
      active = false;
    };
  }, [isbn]);
  return coverUrl;
};
