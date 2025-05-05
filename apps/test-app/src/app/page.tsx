'use client';

import '@reon-island/ui-core/src/styles/global.css';

import { Button } from '@reon-island/ui-core';

export default function Home() {
  return (
    <main>
      <h1>Welcome to Next.js!</h1>
      <p>Get started by editing [app]/page.tsx</p>
      <Button variant="primary">Hello</Button>
      <Button variant="ghost">Hello</Button>
      <Button variant="text">Hello</Button>
    </main>
  );
}
