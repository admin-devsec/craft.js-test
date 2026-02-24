'use client';

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */

import React from 'react';
import { useNode } from '@craftjs/core';
import { usePreview } from '@/components/builder/PreviewContext';
import { ColorControl, NumberControl, SelectControl } from './shared';

type WithChildren<T = Record<string, unknown>> = T & { children?: React.ReactNode };

export function Container({ children, background = '#ffffff', padding = 20 }: WithChildren<{ background?: string; padding?: number }>) {
  const { connectors: { connect, drag }, selected } = useNode((state) => ({ selected: state.events.selected }));
  const { isPreview } = usePreview();
  return <div ref={(ref) => { if (ref) connect(drag(ref)); }} style={{ background, padding }} className={`min-h-12 rounded ${isPreview ? '' : `border border-dashed ${selected ? 'border-blue-500' : 'border-slate-300'}`}`}>{children}</div>;
}
function ContainerSettings() {
  const { actions: { setProp }, background, padding } = useNode((node) => ({ background: node.data.props.background, padding: node.data.props.padding }));
  return <div className="space-y-2"><ColorControl label="Background" value={background} onChange={(value) => setProp((props: { background: string }) => (props.background = value))} /><NumberControl label="Padding" value={padding} onChange={(value) => setProp((props: { padding: number }) => (props.padding = value))} /></div>;
}
Container.craft = {
  props: { background: '#ffffff', padding: 20 },
  related: { settings: ContainerSettings },
  rules: {
    canMoveIn: (incomingNodes: any[], self: any, helper: any) => {
      const isTopLevelContainer = helper(self.id).ancestors().length === 0;
      return incomingNodes.every((node) => {
        if (!['Header', 'Footer'].includes(node.data.name)) return true;
        if (!isTopLevelContainer) return false;
        const existing = helper(self.id).childNodes().map((id: string) => helper(id).get()).filter((child: any) => child.data.name === node.data.name);
        return existing.length === 0;
      });
    }
  }
};

export function Text({ text = 'Edit me', fontSize = 18, color = '#0f172a' }: { text?: string; fontSize?: number; color?: string }) {
  const { connectors: { connect, drag }, selected } = useNode((state) => ({ selected: state.events.selected }));
  const { isPreview } = usePreview();
  return <p ref={(ref) => { if (ref) connect(drag(ref)); }} style={{ fontSize, color }} className={`my-1 ${isPreview ? '' : `cursor-move ${selected ? 'outline outline-2 outline-blue-500' : ''}`}`}>{text}</p>;
}
function TextSettings() {
  const { actions: { setProp }, text, fontSize, color } = useNode((node) => ({ text: node.data.props.text, fontSize: node.data.props.fontSize, color: node.data.props.color }));
  return <div className="space-y-2"><input className="w-full rounded border p-2" value={text} onChange={(e) => setProp((props: { text: string }) => (props.text = e.target.value))} /><NumberControl label="Font Size" value={fontSize} onChange={(value) => setProp((props: { fontSize: number }) => (props.fontSize = value))} /><ColorControl label="Color" value={color} onChange={(value) => setProp((props: { color: string }) => (props.color = value))} /></div>;
}
Text.craft = { props: { text: 'Edit me', fontSize: 18, color: '#0f172a' }, related: { settings: TextSettings } };

export function Button({ text = 'Click me', background = '#2563eb', color = '#ffffff' }: { text?: string; background?: string; color?: string }) {
  const { connectors: { connect, drag }, selected } = useNode((state) => ({ selected: state.events.selected }));
  const { isPreview } = usePreview();
  return <button type="button" ref={(ref) => { if (ref) connect(drag(ref)); }} style={{ background, color }} className={`rounded px-4 py-2 font-semibold ${isPreview ? '' : selected ? 'ring-2 ring-blue-500' : ''}`}>{text}</button>;
}
function ButtonSettings() {
  const { actions: { setProp }, text, background, color } = useNode((node) => ({ text: node.data.props.text, background: node.data.props.background, color: node.data.props.color }));
  return <div className="space-y-2"><input className="w-full rounded border p-2" value={text} onChange={(e) => setProp((props: { text: string }) => (props.text = e.target.value))} /><ColorControl label="Background" value={background} onChange={(value) => setProp((props: { background: string }) => (props.background = value))} /><ColorControl label="Text Color" value={color} onChange={(value) => setProp((props: { color: string }) => (props.color = value))} /></div>;
}
Button.craft = { props: { text: 'Click me', background: '#2563eb', color: '#ffffff' }, related: { settings: ButtonSettings } };

export function Brand({ text = 'Acme', logoUrl = '', useImage = false, color = '#111827', fontSize = 24, fontWeight = 700, letterSpacing = 0 }: any) {
  const { connectors: { connect, drag }, selected } = useNode((state) => ({ selected: state.events.selected }));
  const { isPreview } = usePreview();
  return <div ref={(ref) => { if (ref) connect(drag(ref)); }} className={`${isPreview ? '' : selected ? 'ring-2 ring-blue-500' : ''} inline-flex items-center`} style={{ color, fontSize, fontWeight, letterSpacing }}>{useImage && logoUrl ? <img src={logoUrl} alt={text} className="h-10 w-auto" /> : text}</div>;
}
function BrandSettings() {
  const { actions: { setProp }, ...props } = useNode((node) => node.data.props);
  return <div className="space-y-2"><input className="w-full rounded border p-2" value={props.text} onChange={(e) => setProp((p: any) => (p.text = e.target.value))} /><input className="w-full rounded border p-2" placeholder="Logo URL" value={props.logoUrl} onChange={(e) => setProp((p: any) => (p.logoUrl = e.target.value))} /><label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={props.useImage} onChange={(e) => setProp((p: any) => (p.useImage = e.target.checked))} />Use image</label><ColorControl label="Brand Color" value={props.color} onChange={(v) => setProp((p: any) => (p.color = v))} /><NumberControl label="Font Size" value={props.fontSize} onChange={(v) => setProp((p: any) => (p.fontSize = v))} /><NumberControl label="Weight" value={props.fontWeight} onChange={(v) => setProp((p: any) => (p.fontWeight = v))} /><NumberControl label="Letter spacing" value={props.letterSpacing} onChange={(v) => setProp((p: any) => (p.letterSpacing = v))} /></div>;
}
Brand.craft = { props: { text: 'Acme', logoUrl: '', useImage: false, color: '#111827', fontSize: 24, fontWeight: 700, letterSpacing: 0 }, related: { settings: BrandSettings } };

export function Nav({ links = 'Home,Shop,About,Contact', orientation = 'row', gap = 16, color = '#111827' }: any) {
  const { connectors: { connect, drag }, selected } = useNode((state) => ({ selected: state.events.selected }));
  const { isPreview } = usePreview();
  return <nav ref={(ref) => { if (ref) connect(drag(ref)); }} className={`${isPreview ? '' : selected ? 'ring-2 ring-blue-500' : ''} flex`} style={{ flexDirection: orientation, gap, color }}>{links.split(',').map((link: string) => <a key={link.trim()} href="#" className="hover:underline">{link.trim()}</a>)}</nav>;
}
function NavSettings() {
  const { actions: { setProp }, ...props } = useNode((node) => node.data.props);
  return <div className="space-y-2"><input className="w-full rounded border p-2" value={props.links} onChange={(e) => setProp((p: any) => (p.links = e.target.value))} /><SelectControl label="Orientation" value={props.orientation} onChange={(v) => setProp((p: any) => (p.orientation = v))} options={[{ label: 'Horizontal', value: 'row' }, { label: 'Vertical', value: 'column' }]} /><NumberControl label="Gap" value={props.gap} onChange={(v) => setProp((p: any) => (p.gap = v))} /><ColorControl label="Color" value={props.color} onChange={(v) => setProp((p: any) => (p.color = v))} /></div>;
}
Nav.craft = { props: { links: 'Home,Shop,About,Contact', orientation: 'row', gap: 16, color: '#111827' }, related: { settings: NavSettings } };

export function IconButton({ icon = '☰', background = '#e2e8f0', color = '#111827' }: any) {
  const { connectors: { connect, drag } } = useNode();
  return <button type="button" ref={(ref) => { if (ref) connect(drag(ref)); }} style={{ background, color }} className="rounded p-2">{icon}</button>;
}
function IconButtonSettings() {
  const { actions: { setProp }, ...props } = useNode((node) => node.data.props);
  return <div className="space-y-2"><input className="w-full rounded border p-2" value={props.icon} onChange={(e) => setProp((p: any) => (p.icon = e.target.value))} /><ColorControl label="Background" value={props.background} onChange={(v) => setProp((p: any) => (p.background = v))} /><ColorControl label="Color" value={props.color} onChange={(v) => setProp((p: any) => (p.color = v))} /></div>;
}
IconButton.craft = { props: { icon: '☰', background: '#e2e8f0', color: '#111827' }, related: { settings: IconButtonSettings } };

export function SocialLinks({ links = 'twitter:x,github:gh,linkedin:in', gap = 8 }: any) {
  const { connectors: { connect, drag } } = useNode();
  return <div ref={(ref) => { if (ref) connect(drag(ref)); }} className="flex" style={{ gap }}>{links.split(',').map((entry: string) => { const [label, icon] = entry.split(':'); return <a href="#" key={entry} className="rounded border px-2 py-1 text-xs">{icon || label}</a>; })}</div>;
}
function SocialLinksSettings() {
  const { actions: { setProp }, ...props } = useNode((node) => node.data.props);
  return <div className="space-y-2"><input className="w-full rounded border p-2" value={props.links} onChange={(e) => setProp((p: any) => (p.links = e.target.value))} /><NumberControl label="Gap" value={props.gap} onChange={(v) => setProp((p: any) => (p.gap = v))} /></div>;
}
SocialLinks.craft = { props: { links: 'twitter:x,github:gh,linkedin:in', gap: 8 }, related: { settings: SocialLinksSettings } };

export function LinkList({ title = 'Resources', links = 'Docs,Blog,Support' }: any) {
  const { connectors: { connect, drag } } = useNode();
  return <div ref={(ref) => { if (ref) connect(drag(ref)); }}><h4 className="mb-2 font-semibold">{title}</h4><ul className="space-y-1 text-sm">{links.split(',').map((item: string) => <li key={item}><a href="#">{item.trim()}</a></li>)}</ul></div>;
}
function LinkListSettings() {
  const { actions: { setProp }, ...props } = useNode((node) => node.data.props);
  return <div className="space-y-2"><input className="w-full rounded border p-2" value={props.title} onChange={(e) => setProp((p: any) => (p.title = e.target.value))} /><input className="w-full rounded border p-2" value={props.links} onChange={(e) => setProp((p: any) => (p.links = e.target.value))} /></div>;
}
LinkList.craft = { props: { title: 'Resources', links: 'Docs,Blog,Support' }, related: { settings: LinkListSettings } };

export function Divider({ color = '#cbd5e1', thickness = 1 }: any) {
  const { connectors: { connect, drag } } = useNode();
  return <div ref={(ref) => { if (ref) connect(drag(ref)); }} style={{ background: color, height: thickness, width: '100%' }} />;
}
function DividerSettings() {
  const { actions: { setProp }, ...props } = useNode((node) => node.data.props);
  return <div className="space-y-2"><ColorControl label="Color" value={props.color} onChange={(v) => setProp((p: any) => (p.color = v))} /><NumberControl label="Thickness" value={props.thickness} onChange={(v) => setProp((p: any) => (p.thickness = v))} /></div>;
}
Divider.craft = { props: { color: '#cbd5e1', thickness: 1 }, related: { settings: DividerSettings } };

export function Spacer({ size = 12 }: any) {
  const { connectors: { connect, drag } } = useNode();
  return <div ref={(ref) => { if (ref) connect(drag(ref)); }} style={{ height: size, width: size }} />;
}
function SpacerSettings() {
  const { actions: { setProp }, ...props } = useNode((node) => node.data.props);
  return <div className="space-y-2"><NumberControl label="Size" value={props.size} onChange={(v) => setProp((p: any) => (p.size = v))} /></div>;
}
Spacer.craft = { props: { size: 12 }, related: { settings: SpacerSettings } };
