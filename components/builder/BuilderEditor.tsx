'use client';

/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useEffect, useMemo, useState } from 'react';
import { Editor, Frame, Element, useEditor } from '@craftjs/core';
import { Brand, Button, Container, Divider, FlexSlot, Footer, Header, IconButton, LinkList, Nav, SocialLinks, Spacer, Text } from '@/components/craft/nodes';
import { PreviewProvider } from '@/components/builder/PreviewContext';
import { footerPresets, headerPresets } from '@/components/craft/presets/layoutPresets';
import Link from 'next/link';

type Device = 'desktop' | 'tablet' | 'mobile';

const DEVICE_WIDTHS: Record<Device, number> = { desktop: 1200, tablet: 768, mobile: 375 };
const STORAGE_KEY = 'craft-builder-state';
const PREVIEW_ID = 'latest';

function TopBar({ isPreview, setIsPreview, device, setDevice }: { isPreview: boolean; setIsPreview: (value: boolean) => void; device: Device; setDevice: (value: Device) => void }) {
  return <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded bg-white p-3 shadow"><h1 className="text-lg font-semibold">Craft Builder</h1><div className="flex items-center gap-2"><button type="button" className="rounded bg-blue-600 px-3 py-1 text-sm font-semibold text-white" onClick={() => setIsPreview(!isPreview)}>{isPreview ? 'Exit Preview' : 'Preview'}</button><select className="rounded border px-2 py-1 text-sm" value={device} onChange={(e) => setDevice(e.target.value as Device)} disabled={!isPreview}><option value="desktop">Desktop</option><option value="tablet">Tablet</option><option value="mobile">Mobile</option></select><Link href={`/preview/${PREVIEW_ID}`} className="rounded border border-slate-300 px-3 py-1 text-sm font-medium hover:bg-slate-50">Open Share Preview</Link></div></div>;
}

function Toolbox() {
  const { connectors } = useEditor();
  const itemClass = 'cursor-grab rounded border border-slate-300 bg-white px-3 py-2 text-sm font-medium shadow-sm hover:bg-slate-50';
  const baseNodes = [
    { label: 'Header', element: <Header /> }, { label: 'Footer', element: <Footer /> }, { label: 'Container', element: <Element is={Container} canvas padding={20} /> },
    { label: 'Text', element: <Text /> }, { label: 'Button', element: <Button /> }, { label: 'Brand', element: <Brand /> }, { label: 'Nav', element: <Nav /> },
    { label: 'Icon Button', element: <IconButton /> }, { label: 'Social Links', element: <SocialLinks /> }, { label: 'Link List', element: <LinkList /> },
    { label: 'Divider', element: <Divider /> }, { label: 'Spacer', element: <Spacer /> }, { label: 'Flex Slot', element: <Element is={FlexSlot} canvas /> }
  ];

  return (
    <aside className="space-y-3 rounded bg-white p-4 shadow">
      <h2 className="text-lg font-semibold">Toolbox</h2>
      <div className="grid gap-2">{baseNodes.map((item) => <button key={item.label} ref={(ref) => { if (ref) connectors.create(ref, item.element); }} className={itemClass}>{item.label}</button>)}</div>
      <details className="pt-2">
        <summary className="cursor-pointer text-sm font-semibold">Header Presets</summary>
        <div className="mt-2 grid gap-2">{headerPresets.map((preset) => <button key={preset.label} ref={(ref) => { if (ref) connectors.create(ref, preset.element); }} className={itemClass}>{preset.label}</button>)}</div>
      </details>
      <details className="pt-2">
        <summary className="cursor-pointer text-sm font-semibold">Footer Presets</summary>
        <div className="mt-2 grid gap-2">{footerPresets.map((preset) => <button key={preset.label} ref={(ref) => { if (ref) connectors.create(ref, preset.element); }} className={itemClass}>{preset.label}</button>)}</div>
      </details>
    </aside>
  );
}

function SettingsPanel() {
  const { selected, actions } = useEditor((state, query) => {
    const currentNodeId = query.getEvent('selected').first();
    let selected;
    if (currentNodeId) selected = { id: currentNodeId, name: state.nodes[currentNodeId].data.name, settings: state.nodes[currentNodeId].related && state.nodes[currentNodeId].related.settings };
    return { selected };
  });
  return <aside className="space-y-3 rounded bg-white p-4 shadow"><h2 className="text-lg font-semibold">Settings</h2>{selected ? <><p className="text-sm text-slate-500">Selected: {selected.name}</p><button type="button" className="rounded bg-red-600 px-3 py-1 text-sm font-semibold text-white" onClick={() => actions.delete(selected.id)}>Delete Selected</button>{selected.settings && React.createElement(selected.settings)}</> : <p className="text-sm text-slate-500">Select a component to edit its props.</p>}</aside>;
}

function PersistedStateSync({ isPreview }: { isPreview: boolean }) {
  const { query } = useEditor((state) => ({ nodes: state.nodes }));
  useEffect(() => { if (typeof window === 'undefined') return; const serialized = query.serialize(); localStorage.setItem(STORAGE_KEY, serialized); localStorage.setItem(`craft-builder-state:${PREVIEW_ID}`, serialized); }, [isPreview, query]);
  return null;
}

function DeviceSync({ device }: { device: Device }) {
  const { actions } = useEditor();
  useEffect(() => { actions.setOptions((options: any) => { options.device = device; }); }, [actions, device]);
  return null;
}

export default function BuilderEditor() {
  const [isPreview, setIsPreview] = useState(false);
  const [device, setDevice] = useState<Device>('desktop');
  const [initialData, setInitialData] = useState<string | undefined>(undefined);

  useEffect(() => { if (typeof window === 'undefined') return; setInitialData(localStorage.getItem(STORAGE_KEY) || undefined); }, []);

  const canvasWidthClass = useMemo(() => (!isPreview ? 'w-full' : 'mx-auto w-full'), [isPreview]);
  const canvasWidth = isPreview ? DEVICE_WIDTHS[device] : undefined;

  const resolver = { Container, Header, Footer, Text, Button, Brand, Nav, IconButton, SocialLinks, LinkList, Divider, Spacer, FlexSlot };

  return (
    <PreviewProvider isPreview={isPreview}>
      <Editor resolver={resolver} enabled={!isPreview}>
        <DeviceSync device={device} />
        <main className="min-h-screen p-4">
          <TopBar isPreview={isPreview} setIsPreview={setIsPreview} device={device} setDevice={setDevice} />
          <div className={`grid gap-4 ${isPreview ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-[240px_1fr_280px]'}`}>
            {!isPreview && <Toolbox />}
            <section className="rounded bg-white p-4 shadow">
              {!isPreview && <h2 className="mb-3 text-lg font-semibold">Canvas</h2>}
              <div className={`${canvasWidthClass} overflow-auto`}>
                <div className={`${isPreview ? 'mx-auto rounded-xl border border-slate-200 bg-white p-4 shadow-inner' : ''}`} style={canvasWidth ? { width: canvasWidth, maxWidth: '100%' } : undefined}>
                  <Frame data={initialData}>
                    <Element is={Container} canvas background="#f8fafc" padding={24}>
                      <Header />
                      <Text text="Drag components from the toolbox into this canvas." />
                      <Button text="Primary Action" />
                      <Footer />
                    </Element>
                  </Frame>
                </div>
              </div>
              <PersistedStateSync isPreview={isPreview} />
            </section>
            {!isPreview && <SettingsPanel />}
          </div>
        </main>
      </Editor>
    </PreviewProvider>
  );
}
