import CareerApplyPage from '@/components/features/careers/CareerApplyPage';
import { OPEN_ROLES, OPEN_APPLICATION_SLUG } from '@/components/features/careers/roles';

export const dynamicParams = false;

export function generateStaticParams() {
  return [...OPEN_ROLES.map((r) => ({ slug: r.slug })), { slug: OPEN_APPLICATION_SLUG }];
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <CareerApplyPage slug={slug} />;
}
