import MainTemplate from '@/components/templates/MainTemplate';
import '../styles/globals.css';
import inter from '@/assets/fonts/inter';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <MainTemplate>{children}</MainTemplate>
      </body>
    </html>
  );
}
