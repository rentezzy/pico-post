import QueryWrapper from "@/components/QueryWrapper";
import { Roboto } from "next/font/google";
import "./globals.css";
const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["cyrillic", "latin"],
});
export const metadata = {
  title: "Pico Post",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <main className="min-h-screen flex flex-col items-center">
          <QueryWrapper>{children}</QueryWrapper>
        </main>
      </body>
    </html>
  );
}
