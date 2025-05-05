import { ReactNode } from 'react';

import '@reon-island/ui-core/src/styles/global.css';

export const metadata = {
  title: 'My App',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
