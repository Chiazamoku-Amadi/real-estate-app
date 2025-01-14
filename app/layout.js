import "./globals.css";
import Provider from "./Provider";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";
import { outfit } from "./utils/fonts";

export const metadata = {
  title: "Real Estate Application",
  description: "Your One-Stop Platform for Properties",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${outfit}`}>
          <Provider>
            <Toaster />
            <main className="font-outfit">{children}</main>
          </Provider>
        </body>
      </html>
    </ClerkProvider>
  );
}
