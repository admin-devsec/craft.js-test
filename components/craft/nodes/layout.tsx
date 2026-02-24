'use client';

/* eslint-disable @typescript-eslint/no-explicit-any */

import React from 'react';
import { Element, useEditor, useNode } from '@craftjs/core';
import { usePreview } from '@/components/builder/PreviewContext';
import { ColorControl, FLEX_ALIGN, FLEX_JUSTIFY, NodeFrame, NumberControl, SelectControl } from './shared';

const DISALLOWED_INNER = ['Header', 'Footer'];

type SlotProps = { children?: React.ReactNode; justify?: 'start' | 'center' | 'end' | 'between'; align?: 'start' | 'center' | 'end' | 'stretch'; gap?: number; wrap?: boolean; hiddenDesktop?: boolean; hiddenTablet?: boolean; hiddenMobile?: boolean };

export function FlexSlot({ children, justify = 'start', align = 'center', gap = 12, wrap = false, hiddenDesktop = false, hiddenTablet = false, hiddenMobile = false }: SlotProps) {
  const { connectors: { connect, drag }, selected } = useNode((state) => ({ selected: state.events.selected }));
  const { isPreview } = usePreview();
  const { device } = useEditor((state) => ({ device: (state.options as any).device || 'desktop' }));
  const hidden = (device === 'desktop' && hiddenDesktop) || (device === 'tablet' && hiddenTablet) || (device === 'mobile' && hiddenMobile);
  if (hidden) return null;
  return <NodeFrame connectDrag={(ref) => connect(drag(ref))} className={`${isPreview ? '' : `min-h-[30px] rounded border border-dashed ${selected ? 'border-blue-500' : 'border-slate-300'}`} flex-1`} style={{ display: 'flex', justifyContent: FLEX_JUSTIFY[justify], alignItems: FLEX_ALIGN[align], gap, flexWrap: wrap ? 'wrap' : 'nowrap' }}>{children}</NodeFrame>;
}
function SlotSettings() {
  const { actions: { setProp }, justify, align, gap, wrap, hiddenDesktop, hiddenTablet, hiddenMobile } = useNode((node) => node.data.props);
  return <div className="space-y-2"><SelectControl label="Justify" value={justify} onChange={(v) => setProp((p: SlotProps) => (p.justify = v as any))} options={[{ label: 'Start', value: 'start' }, { label: 'Center', value: 'center' }, { label: 'End', value: 'end' }, { label: 'Space Between', value: 'between' }]} /><SelectControl label="Align" value={align} onChange={(v) => setProp((p: SlotProps) => (p.align = v as any))} options={[{ label: 'Start', value: 'start' }, { label: 'Center', value: 'center' }, { label: 'End', value: 'end' }, { label: 'Stretch', value: 'stretch' }]} /><NumberControl label="Gap" value={gap} onChange={(v) => setProp((p: SlotProps) => (p.gap = v))} /><label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={wrap} onChange={(e) => setProp((p: SlotProps) => (p.wrap = e.target.checked))} /> Wrap</label><label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={hiddenDesktop} onChange={(e) => setProp((p: SlotProps) => (p.hiddenDesktop = e.target.checked))} /> Hide on Desktop</label><label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={hiddenTablet} onChange={(e) => setProp((p: SlotProps) => (p.hiddenTablet = e.target.checked))} /> Hide on Tablet</label><label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={hiddenMobile} onChange={(e) => setProp((p: SlotProps) => (p.hiddenMobile = e.target.checked))} /> Hide on Mobile</label></div>;
}
FlexSlot.craft = { props: { justify: 'start', align: 'center', gap: 12, wrap: false, hiddenDesktop: false, hiddenTablet: false, hiddenMobile: false }, related: { settings: SlotSettings }, rules: { canMoveIn: (incomingNodes: any[]) => incomingNodes.every((n) => !DISALLOWED_INNER.includes(n.data.name)) } };

export function Header({ children, background = '#ffffff', textColor = '#0f172a', borderColor = '#e2e8f0', shadow = false, sticky = false, transparent = false, height = 80, paddingX = 20, maxWidth = 1200, desktopLayout = 'row', tabletLayout = 'row', mobileLayout = 'column' }: any) {
  const { connectors: { connect, drag }, selected } = useNode((state) => ({ selected: state.events.selected }));
  const { isPreview } = usePreview();
  const { device } = useEditor((state) => ({ device: (state.options as any).device || 'desktop' }));
  const direction = device === 'desktop' ? desktopLayout : device === 'tablet' ? tabletLayout : mobileLayout;
  return (
    <NodeFrame connectDrag={(ref) => connect(drag(ref))} className={`${isPreview ? '' : selected ? 'ring-2 ring-blue-500' : 'border border-dashed border-slate-300'} ${sticky ? 'sticky top-0 z-20' : ''}`} style={{ background: transparent ? 'transparent' : background, color: textColor, borderBottom: `1px solid ${borderColor}`, boxShadow: shadow ? '0 4px 16px rgba(15,23,42,0.12)' : 'none', minHeight: height }}>
      <div style={{ maxWidth, margin: '0 auto', padding: `0 ${paddingX}px`, minHeight: height, display: 'flex', alignItems: 'center', gap: 12, flexDirection: direction }}>
        {children || <><Element id="header-left" is={FlexSlot} canvas /><Element id="header-center" is={FlexSlot} canvas justify="center" /><Element id="header-right" is={FlexSlot} canvas justify="end" /></>}
      </div>
    </NodeFrame>
  );
}
function HeaderSettings() {
  const { actions: { setProp }, ...props } = useNode((node) => node.data.props);
  return <div className="space-y-2"><ColorControl label="Background" value={props.background} onChange={(v) => setProp((p: any) => (p.background = v))} /><ColorControl label="Text Color" value={props.textColor} onChange={(v) => setProp((p: any) => (p.textColor = v))} /><ColorControl label="Border Color" value={props.borderColor} onChange={(v) => setProp((p: any) => (p.borderColor = v))} /><NumberControl label="Height" value={props.height} onChange={(v) => setProp((p: any) => (p.height = v))} /><NumberControl label="Horizontal Padding" value={props.paddingX} onChange={(v) => setProp((p: any) => (p.paddingX = v))} /><NumberControl label="Max Width" value={props.maxWidth} onChange={(v) => setProp((p: any) => (p.maxWidth = v))} max={1800} /><label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={props.shadow} onChange={(e) => setProp((p: any) => (p.shadow = e.target.checked))} /> Shadow</label><label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={props.sticky} onChange={(e) => setProp((p: any) => (p.sticky = e.target.checked))} /> Sticky</label><label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={props.transparent} onChange={(e) => setProp((p: any) => (p.transparent = e.target.checked))} /> Transparent</label><SelectControl label="Desktop Layout" value={props.desktopLayout} onChange={(v) => setProp((p: any) => (p.desktopLayout = v))} options={[{ label: 'Row', value: 'row' }, { label: 'Column', value: 'column' }]} /><SelectControl label="Tablet Layout" value={props.tabletLayout} onChange={(v) => setProp((p: any) => (p.tabletLayout = v))} options={[{ label: 'Row', value: 'row' }, { label: 'Column', value: 'column' }]} /><SelectControl label="Mobile Layout" value={props.mobileLayout} onChange={(v) => setProp((p: any) => (p.mobileLayout = v))} options={[{ label: 'Row', value: 'row' }, { label: 'Column', value: 'column' }]} /></div>;
}
Header.craft = { props: { background: '#ffffff', textColor: '#0f172a', borderColor: '#e2e8f0', shadow: false, sticky: false, transparent: false, height: 80, paddingX: 20, maxWidth: 1200, desktopLayout: 'row', tabletLayout: 'row', mobileLayout: 'column' }, related: { settings: HeaderSettings } , rules: { canMoveIn: (incomingNodes: any[]) => incomingNodes.every((n) => !DISALLOWED_INNER.includes(n.data.name)) } };

export function Footer({ children, background = '#0f172a', textColor = '#f8fafc', borderColor = '#334155', shadow = false, paddingY = 40, maxWidth = 1200, columnGap = 20, rowGap = 20, divider = true }: any) {
  const { connectors: { connect, drag }, selected } = useNode((state) => ({ selected: state.events.selected }));
  const { isPreview } = usePreview();
  return <NodeFrame connectDrag={(ref) => connect(drag(ref))} className={`${isPreview ? '' : selected ? 'ring-2 ring-blue-500' : 'border border-dashed border-slate-300'}`} style={{ background, color: textColor, borderTop: `1px solid ${borderColor}`, boxShadow: shadow ? '0 -4px 16px rgba(15,23,42,0.18)' : 'none', padding: `${paddingY}px 0` }}><div style={{ maxWidth, margin: '0 auto', padding: '0 20px', display: 'grid', gap: rowGap }}>{children || <><Element id="footer-top" is={FlexSlot} canvas justify="between" /><div style={{ borderTop: divider ? `1px solid ${borderColor}` : 'none', paddingTop: 20, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: columnGap }}><Element id="footer-columns" is={FlexSlot} canvas align="start" wrap gap={columnGap} /></div><div style={{ borderTop: divider ? `1px solid ${borderColor}` : 'none', paddingTop: 16 }}><Element id="footer-bottom" is={FlexSlot} canvas justify="between" /></div></>}</div></NodeFrame>;
}
function FooterSettings() {
  const { actions: { setProp }, ...props } = useNode((node) => node.data.props);
  return <div className="space-y-2"><ColorControl label="Background" value={props.background} onChange={(v) => setProp((p: any) => (p.background = v))} /><ColorControl label="Text Color" value={props.textColor} onChange={(v) => setProp((p: any) => (p.textColor = v))} /><ColorControl label="Border" value={props.borderColor} onChange={(v) => setProp((p: any) => (p.borderColor = v))} /><NumberControl label="Vertical Padding" value={props.paddingY} onChange={(v) => setProp((p: any) => (p.paddingY = v))} /><NumberControl label="Max Width" value={props.maxWidth} onChange={(v) => setProp((p: any) => (p.maxWidth = v))} max={1800} /><NumberControl label="Column Gap" value={props.columnGap} onChange={(v) => setProp((p: any) => (p.columnGap = v))} /><NumberControl label="Row Gap" value={props.rowGap} onChange={(v) => setProp((p: any) => (p.rowGap = v))} /><label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={props.shadow} onChange={(e) => setProp((p: any) => (p.shadow = e.target.checked))} /> Shadow</label><label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={props.divider} onChange={(e) => setProp((p: any) => (p.divider = e.target.checked))} /> Dividers</label></div>;
}
Footer.craft = { props: { background: '#0f172a', textColor: '#f8fafc', borderColor: '#334155', shadow: false, paddingY: 40, maxWidth: 1200, columnGap: 20, rowGap: 20, divider: true }, related: { settings: FooterSettings } , rules: { canMoveIn: (incomingNodes: any[]) => incomingNodes.every((n) => !DISALLOWED_INNER.includes(n.data.name)) } };

