export default function Loading() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <svg width="60" height="60" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="animate-spin">
            <circle cx="32" cy="32" r="30" stroke="#E6F4F2" strokeWidth="4" />
            <path d="M18 33c0-8 6.5-15 14.5-15S47 25 47 33" stroke="#22A39A" strokeWidth="4" strokeLinecap="round" className="animate-pulse"/>
            <path d="M18 33c0 8 6.5 15 14.5 15S47 41 47 33" stroke="#0A3C5F" strokeWidth="4" strokeLinecap="round" className="animate-pulse"/>
          </svg>
        </div>
        <div className="text-[#0A3C5F] font-medium">Loading GRACE...</div>
      </div>
    </div>
  );
}
