'use client';

export default function MotivationalQuote() {
  return (
    <div className="w-full lg:max-w-xl">
      <div className="bg-linear-to-r from-[#f6ede8]/80 to-[#e0d8cf]/60 backdrop-blur-md rounded-xl sm:rounded-2xl p-4 sm:p-5 shadow-lg border border-[#e0d8cf]/50 text-center">
        <p className="text-[#4a3728] font-semibold text-sm sm:text-base italic">
          "Success is the sum of small efforts repeated day in and day out."
        </p>
        <p className="text-[#4a3728]/60 text-xs font-bold mt-1.5">— Robert Collier</p>
      </div>
    </div>
  );
}