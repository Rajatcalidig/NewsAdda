import { prisma } from '@/lib/prisma';
import ResumeManager from '@/components/admin/ResumeManager';

export const dynamic = 'force-dynamic';

export default async function ResumePage() {
  const [resumeSetting, updatedSetting] = await Promise.all([
    prisma.setting.findUnique({ where: { key: 'resumeBase64' } }),
    prisma.setting.findUnique({ where: { key: 'resumeUpdatedAt' } }),
  ]);

  const hasResume = !!resumeSetting?.value;
  const resumeBase64 = resumeSetting?.value || null;
  const updatedAt = updatedSetting?.value || null;

  return (
    <ResumeManager
      hasResume={hasResume}
      resumeBase64={resumeBase64}
      updatedAt={updatedAt}
    />
  );
}
