'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const PAGE_TITLES: Record<string, string> = {
  '/study/groups':    'Groups',
  '/study/my-groups': 'My Groups',
  '/study/timer':     'Timer',
  '/study/goals':     'Goals',
  '/study/todo':      'To-do',
  '/student-dashboard': 'Dashboard',
};

export default function MobilePageHeader() {
  const pathname = usePathname();

  // Don't show on the root study page or groups (default landing)
  if (pathname === '/study' || pathname === '/study/groups') return null;

  const title = Object.entries(PAGE_TITLES).find(([key]) =>
    pathname === key || pathname.startsWith(key + '/')
  )?.[1] ?? 'Study';

  return (
    <div className="lg:hidden flex items-center gap-2 px-4 pt-4 pb-1">
      <Link
        href="/study/groups"
        className="flex items-center gap-1.5 text-[#4a3728]/50 hover:text-[#4a3728] transition-colors"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        <span className="text-xs font-semibold">Study</span>
      </Link>
      <span className="text-[#4a3728]/20 text-xs">/</span>
      <span className="text-xs font-bold text-[#4a3728]">{title}</span>
    </div>
  );
}
