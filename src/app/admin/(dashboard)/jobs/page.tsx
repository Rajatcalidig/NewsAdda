import { prisma } from '@/lib/prisma';
import JobsManager from '@/components/admin/JobsManager';

export const dynamic = 'force-dynamic';

export default async function JobsPage() {
  const jobs = await prisma.jobApplication.findMany({
    orderBy: { appliedDate: 'desc' }
  });

  return <JobsManager initialJobs={jobs as any} />;
}
