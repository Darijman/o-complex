import type { Metadata } from 'next';
import { Teachers } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import { ConfigProvider } from 'antd';
import { theme } from '@/antdConfig';
import { Header } from '@/ui/header/Header';
import '@ant-design/v5-patch-for-react-19';
import './globals.css';

const teachers = Teachers({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'O-Complex',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={teachers.className}>
        <ConfigProvider theme={theme}>
          <ThemeProvider attribute='data-theme' defaultTheme='system' enableSystem>
            <Header />
            <main style={{ paddingTop: '100px' }}>{children}</main>
          </ThemeProvider>
        </ConfigProvider>
      </body>
    </html>
  );
}
