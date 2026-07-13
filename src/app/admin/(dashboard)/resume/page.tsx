import { UploadCloud, FileUp, CheckCircle2 } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import { saveResumeAction } from '../../crud-actions';

export default async function ResumePage() {
  const setting = await prisma.setting.findUnique({ where: { key: 'resumeBase64' } });
  const hasResume = !!setting?.value;
  const resumeBase64 = setting?.value;

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto w-full">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Resume Management</h2>
          <p className="text-neutral-500 font-mono text-xs mt-1">Update your master resume file</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Upload Section */}
        <form action={saveResumeAction} encType="multipart/form-data" className="border border-neutral-800 rounded-sm bg-neutral-950/50 p-8 flex flex-col items-center justify-center text-center">
          <div className="w-20 h-20 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-500 mb-6">
            <UploadCloud size={32} />
          </div>
          
          <h3 className="text-white font-bold text-lg mb-2">Upload New PDF</h3>
          <p className="text-neutral-500 text-sm mb-6 max-w-xs">
            Select your updated resume PDF.
          </p>
          
          <input 
            type="file" 
            name="resumeFile" 
            id="resumeFile"
            accept="application/pdf"
            required
            className="mb-4 text-xs font-mono file:mr-4 file:py-2 file:px-4 file:rounded-sm file:border-0 file:text-xs file:font-bold file:bg-orange-500/10 file:text-orange-500 hover:file:bg-orange-500/20 text-neutral-300"
          />

          <button type="submit" className="bg-orange-500 hover:bg-orange-400 text-neutral-950 font-mono font-bold text-sm px-6 py-3 rounded-sm transition-colors cursor-pointer flex items-center gap-2 w-full justify-center mt-2">
            <FileUp size={18} /> Upload Resume
          </button>
          <p className="text-neutral-600 font-mono text-[10px] mt-4 uppercase tracking-widest">
            Only .PDF files accepted. Max 5MB.
          </p>
        </form>

        {/* Current Resume Info */}
        <div className="flex flex-col gap-6">
          <div className="border border-neutral-800 rounded-sm bg-neutral-900/50 p-6 relative overflow-hidden h-full flex flex-col">
            <div className="absolute top-0 right-0 p-6 opacity-10 pointer-events-none">
               <CheckCircle2 size={120} />
            </div>
            
            <h4 className="text-neutral-400 font-mono text-xs uppercase tracking-wider mb-6">Current Active Resume</h4>
            
            <div className="flex flex-col gap-4 relative z-10 flex-1">
              {hasResume ? (
                <>
                  <div>
                    <p className="text-neutral-500 text-xs mb-1">Status</p>
                    <p className="text-green-500 font-bold font-mono text-sm bg-green-500/10 inline-block px-2 py-1 rounded-sm border border-green-500/20">Active / Base64 Encoded</p>
                  </div>
                  
                  <div>
                    <p className="text-neutral-500 text-xs mb-1">Vercel Compatibility</p>
                    <p className="text-white font-mono text-sm">✅ Yes (Database Stored)</p>
                  </div>
                </>
              ) : (
                <div className="flex items-center justify-center h-full text-neutral-500 font-mono text-sm italic">
                  No resume uploaded yet.
                </div>
              )}
            </div>

            {hasResume && (
              <div className="mt-8 pt-6 border-t border-neutral-800 flex gap-4 relative z-10">
                <a href={resumeBase64} download="Rajat_Resume.pdf" className="flex-1 bg-neutral-800 hover:bg-neutral-700 text-white font-mono font-bold text-sm px-4 py-3 rounded-sm transition-colors text-center cursor-pointer block">
                  Download
                </a>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
