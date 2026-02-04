import Image from 'next/image';
import React from 'react';

const GroupHeader = () => {
  return (
    <div className="relative overflow-hidden">
      <section className="max-w-7xl mx-auto bg-gradient-to-br from-[#f6ede8] via-[#e0d8cf] to-[#f6ede8] shadow-lg">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-center justify-between px-6 py-6  relative">
          {/* Floating accents */}
          <div className="absolute top-12 left-6 sm:left-12 w-24 h-24 bg-[#8b7355]/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-12 right-6 sm:right-20 w-32 h-32 bg-[#6b5847]/15 rounded-full blur-3xl animate-pulse delay-150" />

          {/* Left – Text + Search + Stats */}
          <div className="flex flex-col gap-4 max-w-xl z-10">
            <div className="space-y-3">
              <div className="inline-block bg-gradient-to-r from-[#8b7355]/20 to-[#6b5847]/20 px-3 py-1 rounded-full backdrop-blur-sm">
                <span className="text-[#4a3728] font-semibold text-xs">🎓 Discover & Learn Together</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#4a3728] leading-tight">
                Find Your <br />
                <span className="bg-gradient-to-r from-[#6b5847] to-[#8b7355] bg-clip-text text-transparent">
                  Study Group
                </span>
              </h1>

              <p className="text-sm sm:text-base text-[#6b5847] font-medium">
                Connect with passionate learners, collaborate, and reach your academic goals together.
              </p>
            </div>

            {/* Search + Button */}
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                placeholder="Search study groups by topic, university, subject..."
                className="flex-1 px-4 py-2.5 rounded-full bg-white/80 backdrop-blur-sm text-[#4a3728] border-2 border-[#e0d8cf] focus:border-[#8b7355] focus:ring-2 focus:ring-[#8b7355]/30 outline-none transition-all placeholder:text-[#6b5847]/60 shadow-sm text-sm"
              />
              <button className="bg-gradient-to-r from-[#8b7355] to-[#6b5847] hover:from-[#6b5847] hover:to-[#4a3728] text-[#f6ede8] px-6 py-2.5 rounded-full font-bold shadow-lg hover:shadow-xl transition-all hover:scale-105 whitespace-nowrap text-sm mt-2 sm:mt-0">
                Explore Groups
              </button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap sm:flex-nowrap gap-5 text-center mt-4">
              <div>
                <div className="text-xl sm:text-2xl font-bold text-[#4a3728]">500+</div>
                <div className="text-xs text-[#6b5847]">Active Groups</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold text-[#4a3728]">10K+</div>
                <div className="text-xs text-[#6b5847]">Members</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold text-[#4a3728]">50+</div>
                <div className="text-xs text-[#6b5847]">Subjects</div>
              </div>
            </div>
          </div>

          {/* Right – Video / Thumbnail Card */}
          <div className="relative w-full lg:w-1/2 max-w-lg z-10 mt-8 lg:mt-0">
            <div className="relative bg-gradient-to-br from-[#4a3728] to-[#6b5847] p-2 rounded-3xl shadow-2xl">
              <div className="bg-[#2a1f18] rounded-2xl overflow-hidden aspect-video group relative cursor-pointer">
                <Image
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80"
                  alt="Study group"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#4a3728]/80 via-[#4a3728]/30 to-transparent" />

                {/* Play button on hover */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button className="bg-white/90 hover:bg-white text-[#4a3728] w-16 h-16 rounded-full flex items-center justify-center shadow-xl transform group-hover:scale-110 transition-transform">
                    <svg className="w-7 h-7 ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </button>
                </div>

                {/* Bottom overlay text */}
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h3 className="text-white font-bold text-lg">How to Use Study Groups</h3>
                  <p className="text-white/80 text-sm">2-minute guide</p>
                </div>
              </div>
            </div>

            {/* Small live badge */}
            <div className="absolute -bottom-4 -right-4 bg-white/90 backdrop-blur-sm px-5 py-3 rounded-xl shadow-xl border border-[#e0d8cf] flex items-center gap-3 text-sm">
              <div className="relative">
                <div className="w-3.5 h-3.5 bg-green-500 rounded-full animate-pulse" />
              </div>
              <div>
                <span className="font-bold text-[#4a3728]">250+</span>{' '}
                <span className="text-[#6b5847]">Studying Now</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GroupHeader;
