"use client";

import DiasporaForm from "@/components/DiasporaForm";

export default function AccountPage() {
  return (
    <div className="bg-white font-body min-h-[100vh]">
      <section className="bg-[#131c33] text-white py-12 sm:py-16 px-4 sm:px-6 relative overflow-hidden">
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <h1 className="font-heading font-bold text-2xl sm:text-4xl text-white tracking-tight mb-2">
            UDAN Diaspora Application Form
          </h1>
          <p className="text-gray-300 text-xs sm:text-sm max-w-xl mx-auto">
            Complete all 9 sections to apply to the Uganda Diaspora Agribusiness Network
          </p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        <DiasporaForm />
      </div>
    </div>
  );
}
