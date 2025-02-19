import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LoginPage } from "../pages";
import { useAuth } from "../components/Auth";
import { Route, Routes, MemoryRouter } from "react-router-dom";
import { request, setAuthToken } from "../utils";
import { vi } from "vitest";
import { AxiosRequestHeaders, AxiosResponse } from "axios";

beforeAll(() => {
  global.matchMedia = vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    addListener: vi.fn(),
    removeListener: vi.fn(),
  }));
});

vi.mock("../components/Auth", async () => {
  const actual = await vi.importActual<typeof import("../components/Auth")>(
    "../components/Auth"
  );
  return {
    ...actual,
    useAuth: vi.fn(),
  };
});

vi.mock("../utils", () => ({
  request: vi.fn(),
  setAuthToken: vi.fn(),
}));

describe("LoginPage component", () => {
  it("should log in the user and redirect to the homepage", async () => {
    const token = "fake-token";
    const username = "testuser";
    const password = "pass1234";
    const email = "test@example.com";

    const mockedResponse: AxiosResponse = {
      data: { token, email, username },
      status: 200,
      statusText: "OK",
      headers: {},
      config: {
        url: "http://localhost:8080",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        } as AxiosRequestHeaders,
      },
    };

    vi.mocked(request).mockResolvedValueOnce(mockedResponse);

    const mockLogin = vi.fn();
    vi.mocked(useAuth).mockImplementation(() => ({
      login: mockLogin,
      logout: vi.fn(),
      user: null,
      isAuthenticated: false,
    }));

    render(
      <MemoryRouter initialEntries={["/login"]}>
        <Routes>
          <Route path="/" element={<div>Homepage</div>} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </MemoryRouter>
    );

    await userEvent.type(screen.getByPlaceholderText("Email"), email);
    await userEvent.type(screen.getByPlaceholderText("Password"), password);
    await userEvent.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => {
      expect(request).toHaveBeenCalledWith(
        "POST",
        "http://localhost:8080/login",
        { email, password }
      );
    });

    expect(mockLogin).toHaveBeenCalledWith({ token, email, username });
    await waitFor(() => {
      expect(screen.getByText("Homepage")).toBeInTheDocument();
    });

    expect(setAuthToken).toHaveBeenCalledWith(token);
  });
});
