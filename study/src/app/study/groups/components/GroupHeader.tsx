'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../lib/redux/hooks';
import { setBrowseSearchQuery as setSearchQuery, selectBrowseSearchQuery as selectSearchQuery } from '../../../../lib/redux/features/groups/groupsSlice';
import FilterModal from '../../../components/study/sidebar/FilterModal';

const GroupHeader = () => {
  const dispatch       = useAppDispatch();
  const searchQuery    = useAppSelector(selectSearchQuery);
  const [filterOpen, setFilterOpen] = useState(false);

  return (
    <>
      {/* ── Mobile header — compact ────────────────────────── */}
      <div className="lg:hidden pt-2 pb-4 px-1">

        {/* Title row */}
        <div className="mb-3">
          <div className="inline-flex items-center gap-1.5 bg-[#8b7355]/15 px-3 py-1 rounded-full mb-2">
            <span className="text-base">🎓</span>
            <span className="text-[#4a3728] font-bold text-[11px]">Discover & Learn Together</span>
          </div>
          <h1 className="text-2xl font-extrabold text-[#4a3728] leading-tight">
            Find Your{' '}
            <span className="bg-gradient-to-r from-[#6b5847] via-[#8b7355] to-[#6b5847] bg-clip-text text-transparent">
              Study Group
            </span>
          </h1>
        </div>

        {/* Search + Filter icon */}
        <div className="flex gap-2 mb-3">
          <div className="flex-1 relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => dispatch(setSearchQuery(e.target.value))}
              placeholder="Search groups..."
              className="w-full pl-4 pr-10 py-2.5 rounded-xl bg-white/80 text-[#4a3728] border border-white/60 focus:border-[#8b7355] focus:bg-white outline-none text-sm font-medium shadow-sm placeholder:text-[#6b5847]/50"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8b7355]/60">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          {/* Filter icon button */}
          <button
            onClick={() => setFilterOpen(true)}
            className="w-11 h-11 flex-shrink-0 flex items-center justify-center bg-[#4a3728] text-white rounded-xl shadow-sm hover:bg-[#6b5847] active:scale-95 transition-all"
            aria-label="Filter groups"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z" />
            </svg>
          </button>
        </div>

        {/* Stats row — compact */}
        <div className="flex gap-2 mb-3">
          {[
            { value: '500+', label: 'Groups' },
            { value: '10K+', label: 'Members' },
            { value: '50+',  label: 'Subjects' },
          ].map((stat) => (
            <div key={stat.label} className="flex-1 bg-white/60 rounded-xl px-3 py-2 text-center border border-white/60 shadow-sm">
              <div className="text-lg font-extrabold text-[#4a3728]">{stat.value}</div>
              <div className="text-[10px] text-[#6b5847] font-semibold">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Video card — full width on mobile, below search */}
        <div className="relative rounded-2xl overflow-hidden shadow-lg border border-white/40 aspect-video bg-[#2a1f18]">
          <Image
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80"
            alt="Study group collaboration"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          {/* Play button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-white/90 w-12 h-12 rounded-full flex items-center justify-center shadow-xl">
              <svg className="w-5 h-5 text-[#4a3728] ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-3">
            <h3 className="text-white font-bold text-sm">How to Use Study Groups</h3>
            <div className="flex items-center gap-1.5 mt-0.5">
              <div className="w-1.5 h-1.5 bg-red-400 rounded-full animate-pulse" />
              <p className="text-white/80 text-xs">2-minute guide</p>
            </div>
          </div>
          {/* Live badge */}
          <div className="absolute top-2 right-2 bg-white/85 backdrop-blur-sm px-2.5 py-1 rounded-lg shadow flex items-center gap-1.5">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-xs font-bold text-[#4a3728]">250+ Now</span>
          </div>
        </div>
      </div>

      {/* ── Desktop header — original full layout ─────────── */}
      <div className="hidden lg:block relative overflow-hidden py-4 sm:py-6 lg:py-8">
        <section className="max-w-7xl mx-auto relative">
          <div className="backdrop-blur-2xl bg-white/40 border-2 border-white/60 rounded-3xl shadow-xs overflow-hidden">
            <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 items-center justify-between px-6 sm:px-8 lg:px-10 py-6 sm:py-8 lg:py-10 relative">

              <div className="absolute top-8 left-12 w-20 h-20 bg-gradient-to-br from-[#8b7355]/20 to-[#6b5847]/20 rounded-full blur-2xl animate-pulse" />
              <div className="absolute bottom-16 right-16 w-28 h-28 bg-gradient-to-tl from-[#6b5847]/15 to-[#8b7355]/15 rounded-full blur-2xl animate-pulse delay-300" />

              {/* Left */}
              <div className="flex flex-col gap-4 max-w-xl z-10 w-full lg:w-1/2">
                <div className="space-y-3">
                  <div className="inline-flex items-center gap-2 backdrop-blur-xl bg-gradient-to-r from-[#8b7355]/20 to-[#6b5847]/20 px-4 py-2 rounded-full border border-white/40 shadow-lg">
                    <span className="text-2xl">🎓</span>
                    <span className="text-[#4a3728] font-bold text-xs sm:text-sm">Discover & Learn Together</span>
                  </div>
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#4a3728] leading-tight">
                    Find Your{' '}
                    <span className="block sm:inline bg-gradient-to-r from-[#6b5847] via-[#8b7355] to-[#6b5847] bg-clip-text text-transparent">
                      Study Group
                    </span>
                  </h1>
                  <p className="text-sm sm:text-base text-[#6b5847] font-medium leading-relaxed">
                    Connect with passionate learners, collaborate on projects, and reach your academic goals together.
                  </p>
                </div>

                {/* Search + filter */}
                <div className="flex gap-3">
                  <div className="flex-1 relative group">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => dispatch(setSearchQuery(e.target.value))}
                      placeholder="Search by topic, university, subject..."
                      className="w-full px-5 py-3.5 rounded-2xl backdrop-blur-xl bg-white/70 text-[#4a3728] border-2 border-white/60 focus:border-[#8b7355] focus:bg-white/90 outline-none transition-all placeholder:text-[#6b5847]/60 shadow-lg hover:shadow-xl text-sm font-medium"
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8b7355] opacity-50 group-focus-within:opacity-100 transition-opacity">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                  </div>
                  <button
                    onClick={() => setFilterOpen(true)}
                    className="flex items-center gap-2 backdrop-blur-xl bg-white/70 hover:bg-white border-2 border-white/60 hover:border-[#8b7355] px-4 py-3.5 rounded-2xl font-semibold text-[#4a3728] shadow-lg hover:shadow-xl transition-all text-sm"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z" />
                    </svg>
                    Filter
                  </button>
                </div>

                {/* Stats */}
                <div className="flex flex-wrap gap-3 mt-2">
                  {[
                    { value: '500+', label: 'Active Groups' },
                    { value: '10K+', label: 'Members' },
                    { value: '50+',  label: 'Subjects' },
                  ].map((stat, index) => (
                    <div key={index} className="backdrop-blur-xl bg-white/50 px-5 py-3 rounded-xl border border-white/60 shadow-lg hover:shadow-xl transition-all hover:scale-105 cursor-pointer">
                      <div className="text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-[#4a3728] to-[#8b7355] bg-clip-text text-transparent">{stat.value}</div>
                      <div className="text-xs sm:text-sm text-[#6b5847] font-semibold whitespace-nowrap">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right — video card */}
              <div className="relative w-full lg:w-1/2 max-w-lg z-10">
                <div className="absolute -inset-4 bg-gradient-to-r from-[#8b7355]/20 to-[#6b5847]/20 rounded-3xl blur-2xl" />
                <div className="relative backdrop-blur-2xl bg-gradient-to-br from-[#4a3728]/90 to-[#6b5847]/90 p-3 rounded-3xl shadow-2xl border-2 border-white/20">
                  <div className="bg-gradient-to-br from-[#2a1f18] to-[#1a140f] rounded-2xl overflow-hidden aspect-video group relative cursor-pointer">
                    <Image
                      src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80"
                      alt="Study group collaboration"
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <div className="backdrop-blur-xl bg-white/95 hover:bg-white text-[#4a3728] w-20 h-20 rounded-full flex items-center justify-center shadow-2xl transform group-hover:scale-110 transition-all border-4 border-white/50">
                        <svg className="w-8 h-8 ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                      </div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-6 backdrop-blur-sm bg-gradient-to-t from-black/60 to-transparent">
                      <h3 className="text-white font-bold text-lg mb-1">How to Use Study Groups</h3>
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
                        <p className="text-white/90 text-sm font-medium">2-minute guide</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-4 -right-4 backdrop-blur-2xl bg-white/80 px-6 py-4 rounded-2xl shadow-2xl border-2 border-white/60 flex items-center gap-3">
                  <div className="relative">
                    <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse" />
                    <div className="absolute inset-0 w-4 h-4 bg-green-500 rounded-full animate-ping opacity-75" />
                  </div>
                  <div className="text-sm">
                    <span className="font-extrabold text-[#4a3728] text-lg">250+</span>{' '}
                    <span className="text-[#6b5847] font-semibold">Studying Now</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <FilterModal isOpen={filterOpen} onClose={() => setFilterOpen(false)} />
    </>
  );
};

export default GroupHeader;
