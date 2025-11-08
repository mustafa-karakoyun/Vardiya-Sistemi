import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";

export const metadata = {
  title: "Vardiya App",
  description: "Shift and Schedule Management",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="container mt-4">
          {children}
        </div>
      </body>
    </html>
  );
}
