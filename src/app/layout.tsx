import type { Metadata } from "next";
import "./globals.css";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { Roboto } from "next/font/google";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../theme/theme";
import isLoggedIn from "@/features/login/utils/isLoggedIn";
import { CookiesProvider } from "next-client-cookies/server";
import { SnackbarProvider } from "@/components/snackbar/SnackbarProvider";
import { HeaderProvider } from "./headerProvider";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "Retro Media",
  description: "Trade in retro media",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const loggedIn = await isLoggedIn();

  return (
    <html lang="en">
      <body className={roboto.variable}>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <CookiesProvider>
              <SnackbarProvider>
                <HeaderProvider isLoggedInOnLoad={loggedIn}>
                  {children}
                </HeaderProvider>
              </SnackbarProvider>
            </CookiesProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
