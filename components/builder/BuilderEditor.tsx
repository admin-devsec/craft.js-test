'use client';

import React from 'react';
import { Editor, Frame, Element, useEditor } from '@craftjs/core';
import { Button, Container, Footer, Header, Text } from '@/components/builder/nodes';

function Toolbox() {
  const { connectors } = useEditor();

  const itemClass =
    'cursor-grab rounded border border-slate-300 bg-white px-3 py-2 text-sm font-medium shadow-sm hover:bg-slate-50';

  return (
    <aside className="space-y-3 rounded bg-white p-4 shadow">
      <h2 className="text-lg font-semibold">Toolbox</h2>
      <div className="grid gap-2">
        <button ref={(ref) => { if (ref) connectors.create(ref, <Header />); }} className={itemClass}>Header</button>
        <button ref={(ref) => { if (ref) connectors.create(ref, <Text />); }} className={itemClass}>Text</button>
        <button ref={(ref) => { if (ref) connectors.create(ref, <Button />); }} className={itemClass}>Button</button>
        <button ref={(ref) => { if (ref) connectors.create(ref, <Footer />); }} className={itemClass}>Footer</button>
        <button ref={(ref) => { if (ref) connectors.create(ref, <Element is={Container} canvas padding={20} />); }} className={itemClass}>Container</button>
      </div>
    </aside>
  );
}

function SettingsPanel() {
  const { actions, selected, isEnabled } = useEditor((state, query) => {
    const currentNodeId = query.getEvent('selected').first();
    let selected;

    if (currentNodeId) {
      selected = {
        id: currentNodeId,
        name: state.nodes[currentNodeId].data.name,
        settings: state.nodes[currentNodeId].related && state.nodes[currentNodeId].related.settings
      };
    }

    return {
      selected,
      isEnabled: state.options.enabled
    };
  });

  return (
    <aside className="space-y-3 rounded bg-white p-4 shadow">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Settings</h2>
        <button
          type="button"
          className="rounded bg-blue-600 px-3 py-1 text-sm font-semibold text-white"
          onClick={() => actions.setOptions((options) => (options.enabled = !isEnabled))}
        >
          {isEnabled ? 'Preview' : 'Edit'}
        </button>
      </div>
      {selected ? (
        <>
          <p className="text-sm text-slate-500">Selected: {selected.name}</p>
          {selected.settings && React.createElement(selected.settings)}
        </>
      ) : (
        <p className="text-sm text-slate-500">Select a component to edit its props.</p>
      )}
    </aside>
  );
}

export default function BuilderEditor() {
  return (
    <Editor resolver={{ Container, Header, Footer, Text, Button }}>
      <main className="grid min-h-screen grid-cols-1 gap-4 p-4 lg:grid-cols-[240px_1fr_280px]">
        <Toolbox />
        <section className="rounded bg-white p-4 shadow">
          <h2 className="mb-3 text-lg font-semibold">Canvas</h2>
          <Frame>
            <Element is={Container} canvas background="#f8fafc" padding={24}>
              <Header text="Welcome to Craft.js" />
              <Text text="Drag components from the toolbox into this canvas." />
              <Button text="Primary Action" />
              <Footer text="Builder footer" />
            </Element>
          </Frame>
        </section>
        <SettingsPanel />
      </main>
    </Editor>
  );
}
