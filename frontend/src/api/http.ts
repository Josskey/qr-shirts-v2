import axios from "axios";

export const http = axios.create({
  baseURL:
    import.meta.env
      .VITE_API_URL,
});

http.interceptors.request.use(
  (config) => {

    const isAdminRequest =
      config.url?.startsWith(
        "/admin"
      );

    if (isAdminRequest) {

      const adminToken =
        localStorage.getItem(
          "adminToken"
        );

      if (adminToken) {

        config.headers.Authorization =
          `Bearer ${adminToken}`;

      }

    }

    return config;

  }
);