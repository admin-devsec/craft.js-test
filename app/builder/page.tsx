import dynamic from 'next/dynamic';

const BuilderEditor = dynamic(() => import('@/components/builder/BuilderEditor'), {
  ssr: false
});

export default function BuilderPage() {
  return <BuilderEditor />;
}
