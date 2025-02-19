import { http } from "msw";
import { type AuthCredentials, type UserDto } from "../../components/Auth";

export const handlers = [
  http.post<AuthCredentials, UserDto>(
    "http://localhost:8080/login",
    async ({ request }) => {
      return new Response(
        JSON.stringify({
          data: {
            token: "fake-token",
            username: "testuser",
          },
        })
      );
    }
  ),
];
