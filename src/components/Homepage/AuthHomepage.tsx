import { useState, useEffect } from "react";
import { request } from "../../utils";
import { type AxiosResponse } from "axios";
import { useAuth } from "../Auth";
import Title from "antd/es/typography/Title";

export const AuthHomepage = () => {
  const [data, setData] = useState<string[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const res: AxiosResponse<string[]> = await request(
        "GET",
        "http://localhost:8080/message",
        {}
      );
      setData(res.data);
    } catch (e) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error</p>
      ) : (
        data &&
        data.length > 0 && (
          <div>
            {user && <Title>Hello, {user.username}!</Title>}
            <ul>
              {data.map((itm, idx) => (
                <li key={idx}>{itm}</li>
              ))}
            </ul>
          </div>
        )
      )}
    </div>
  );
};
