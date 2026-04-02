'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV = [
  {
    label: 'Home',
    href: '/home',
    internal: false,
    icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
  },
  {
    label: 'Network',
    href: '#',
    internal: false,
    icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z',
  },
  {
    label: 'Message',
    href: '#',
    internal: false,
    icon: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z',
  },
  {
    label: 'Jobs',
    href: '#',
    internal: false,
    icon: 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
  },
  {
    label: 'Study',
    href: '/study',
    internal: true,
    icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
  },
];

export default function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className="lg:hidden fixed bottom-0 left-0 right-0 z-50"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <div className="bg-[#f7f3ee]/95 backdrop-blur-xl border-t border-[#e0d4c0]">
        <div className="flex items-stretch h-16">
          {NAV.map((item) => {
            // Study tab is active if we're anywhere in /study
            const isActive = item.internal && (
              pathname === item.href || pathname.startsWith(item.href + '/')
            );
            const isDummy = !item.internal;

            const inner = (
              <>
                {isActive && (
                  <span className="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-0.5 rounded-full bg-[#4a3728]" />
                )}
                <div className={`relative p-1.5 rounded-lg transition-all duration-200 ${isActive ? 'bg-[#e8ddd4]' : ''}`}>
                  <svg
                    className={`w-5 h-5 transition-colors ${isActive ? 'text-[#4a3728]' : isDummy ? 'text-[#4a3728]/25' : 'text-[#9d8876]'}`}
                    fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                  </svg>
                </div>
                <span className={`text-[9px] tracking-wide transition-colors ${isActive ? 'font-bold text-[#4a3728]' : isDummy ? 'font-medium text-[#4a3728]/25' : 'font-semibold text-[#9d8876]'}`}>
                  {item.label}
                </span>
              </>
            );

            if (isDummy) {
              return (
                <button
                  key={item.label}
                  disabled
                  className="flex-1 flex flex-col items-center justify-center gap-0.5 relative cursor-not-allowed"
                >
                  {inner}
                </button>
              );
            }

            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex-1 flex flex-col items-center justify-center gap-0.5 relative transition-all duration-200"
              >
                {inner}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
