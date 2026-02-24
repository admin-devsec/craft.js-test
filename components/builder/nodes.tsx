'use client';

import React from 'react';
import { useNode } from '@craftjs/core';

type WithChildren<T = Record<string, unknown>> = T & { children?: React.ReactNode };

export function Container({ children, background = '#ffffff', padding = 20 }: WithChildren<{ background?: string; padding?: number }>) {
  const {
    connectors: { connect, drag },
    selected
  } = useNode((state) => ({
    selected: state.events.selected
  }));

  return (
    <div
      ref={(ref) => { if (ref) connect(drag(ref)); }}
      style={{ background, padding }}
      className={`min-h-12 rounded border border-dashed ${selected ? 'border-blue-500' : 'border-slate-300'}`}
    >
      {children}
    </div>
  );
}

function ContainerSettings() {
  const {
    actions: { setProp },
    background,
    padding
  } = useNode((node) => ({
    background: node.data.props.background,
    padding: node.data.props.padding
  }));

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium">Background</label>
      <input
        className="w-full rounded border p-2"
        value={background}
        onChange={(e) => setProp((props: { background: string }) => (props.background = e.target.value))}
      />
      <label className="block text-sm font-medium">Padding</label>
      <input
        type="number"
        className="w-full rounded border p-2"
        value={padding}
        onChange={(e) => setProp((props: { padding: number }) => (props.padding = Number(e.target.value)))}
      />
    </div>
  );
}

Container.craft = {
  props: {
    background: '#ffffff',
    padding: 20
  },
  related: {
    settings: ContainerSettings
  }
};

export function Text({ text = 'Edit me', fontSize = 18, color = '#0f172a' }: { text?: string; fontSize?: number; color?: string }) {
  const {
    connectors: { connect, drag },
    selected
  } = useNode((state) => ({ selected: state.events.selected }));

  return (
    <p
      ref={(ref) => { if (ref) connect(drag(ref)); }}
      style={{ fontSize, color }}
      className={`my-1 cursor-move ${selected ? 'outline outline-2 outline-blue-500' : ''}`}
    >
      {text}
    </p>
  );
}

function TextSettings() {
  const {
    actions: { setProp },
    text,
    fontSize,
    color
  } = useNode((node) => ({
    text: node.data.props.text,
    fontSize: node.data.props.fontSize,
    color: node.data.props.color
  }));

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium">Text</label>
      <input className="w-full rounded border p-2" value={text} onChange={(e) => setProp((props: { text: string }) => (props.text = e.target.value))} />
      <label className="block text-sm font-medium">Font Size</label>
      <input type="number" className="w-full rounded border p-2" value={fontSize} onChange={(e) => setProp((props: { fontSize: number }) => (props.fontSize = Number(e.target.value)))} />
      <label className="block text-sm font-medium">Color</label>
      <input className="w-full rounded border p-2" value={color} onChange={(e) => setProp((props: { color: string }) => (props.color = e.target.value))} />
    </div>
  );
}

Text.craft = {
  props: {
    text: 'Edit me',
    fontSize: 18,
    color: '#0f172a'
  },
  related: {
    settings: TextSettings
  }
};

export function Button({ text = 'Click me', background = '#2563eb', color = '#ffffff' }: { text?: string; background?: string; color?: string }) {
  const {
    connectors: { connect, drag },
    selected
  } = useNode((state) => ({ selected: state.events.selected }));

  return (
    <button
      type="button"
      ref={(ref) => { if (ref) connect(drag(ref)); }}
      style={{ background, color }}
      className={`rounded px-4 py-2 font-semibold ${selected ? 'ring-2 ring-blue-500' : ''}`}
    >
      {text}
    </button>
  );
}

function ButtonSettings() {
  const {
    actions: { setProp },
    text,
    background,
    color
  } = useNode((node) => ({
    text: node.data.props.text,
    background: node.data.props.background,
    color: node.data.props.color
  }));

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium">Text</label>
      <input className="w-full rounded border p-2" value={text} onChange={(e) => setProp((props: { text: string }) => (props.text = e.target.value))} />
      <label className="block text-sm font-medium">Background</label>
      <input className="w-full rounded border p-2" value={background} onChange={(e) => setProp((props: { background: string }) => (props.background = e.target.value))} />
      <label className="block text-sm font-medium">Text Color</label>
      <input className="w-full rounded border p-2" value={color} onChange={(e) => setProp((props: { color: string }) => (props.color = e.target.value))} />
    </div>
  );
}

Button.craft = {
  props: {
    text: 'Click me',
    background: '#2563eb',
    color: '#ffffff'
  },
  related: {
    settings: ButtonSettings
  }
};

export function Header({ text = 'Header Section' }: { text?: string }) {
  const {
    connectors: { connect, drag },
    selected
  } = useNode((state) => ({ selected: state.events.selected }));

  return (
    <header
      ref={(ref) => { if (ref) connect(drag(ref)); }}
      className={`rounded bg-slate-900 p-4 text-xl font-bold text-white ${selected ? 'ring-2 ring-blue-500' : ''}`}
    >
      {text}
    </header>
  );
}

function HeaderSettings() {
  const {
    actions: { setProp },
    text
  } = useNode((node) => ({ text: node.data.props.text }));

  return <input className="w-full rounded border p-2" value={text} onChange={(e) => setProp((props: { text: string }) => (props.text = e.target.value))} />;
}

Header.craft = {
  props: {
    text: 'Header Section'
  },
  related: {
    settings: HeaderSettings
  }
};

export function Footer({ text = 'Footer Section' }: { text?: string }) {
  const {
    connectors: { connect, drag },
    selected
  } = useNode((state) => ({ selected: state.events.selected }));

  return (
    <footer
      ref={(ref) => { if (ref) connect(drag(ref)); }}
      className={`rounded bg-slate-700 p-4 text-center text-sm text-white ${selected ? 'ring-2 ring-blue-500' : ''}`}
    >
      {text}
    </footer>
  );
}

function FooterSettings() {
  const {
    actions: { setProp },
    text
  } = useNode((node) => ({ text: node.data.props.text }));

  return <input className="w-full rounded border p-2" value={text} onChange={(e) => setProp((props: { text: string }) => (props.text = e.target.value))} />;
}

Footer.craft = {
  props: {
    text: 'Footer Section'
  },
  related: {
    settings: FooterSettings
  }
};
