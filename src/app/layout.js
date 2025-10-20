import "./globals.css";

export const metadata = {
  title: "Spooky Store - Halloween Costumes & Masks",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
