'use client';

import React, { useEffect, useState } from 'react';
import { Editor, Element, Frame } from '@craftjs/core';
import { Button, Container, Footer, Header, Text } from '@/components/builder/nodes';
import { PreviewProvider } from '@/components/builder/PreviewContext';

export default function PreviewRenderer({ id }: { id: string }) {
  const [data, setData] = useState<string | null>(null);

  useEffect(() => {
    const keyed = localStorage.getItem(`craft-builder-state:${id}`);
    const fallback = localStorage.getItem('craft-builder-state');
    setData(keyed || fallback);
  }, [id]);

  return (
    <PreviewProvider isPreview>
      <Editor resolver={{ Container, Header, Footer, Text, Button }} enabled={false}>
        <main className="mx-auto min-h-screen max-w-5xl p-4">
          <section className="rounded bg-white p-4 shadow">
            {data ? (
              <Frame data={data} />
            ) : (
              <Frame>
                <Element is={Container} canvas background="#f8fafc" padding={24}>
                  <Header text="No saved preview found" />
                  <Text text="Open /builder and make changes to generate preview data." />
                </Element>
              </Frame>
            )}
          </section>
        </main>
      </Editor>
    </PreviewProvider>
  );
}
