import PreviewRenderer from '@/components/builder/PreviewRenderer';

export default function PreviewPage({ params }: { params: { id: string } }) {
  return <PreviewRenderer id={params.id} />;
}
