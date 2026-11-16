"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import Link from "next/link";

interface Registration {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  gender: string;
  region: string;
  country: string;
  occupation: string;
  company: string;
  agri_interests: string;
  membership_type: string;
  registration_type: string;
  status: string;
  created_at: string;
}

export default function AdminRegistrationsPage() {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [exporting, setExporting] = useState(false);

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const fetchRegistrations = async () => {
    try {
      setLoading(true);
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );

      const { data, error } = await supabase
        .from("members")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setRegistrations(data || []);
    } catch (err) {
      console.error("Error fetching registrations:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleExport = async (format: "csv" | "excel" | "pdf") => {
    try {
      setExporting(true);
      const response = await fetch(
        `/api/registrations/export?format=${format}`
      );

      if (!response.ok) {
        throw new Error("Export failed");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;

      const timestamp = new Date().toISOString().split("T")[0];
      const filename =
        format === "excel"
          ? `udan-registrations-${timestamp}.xlsx`
          : format === "pdf"
          ? `udan-registrations-${timestamp}.pdf`
          : `udan-registrations-${timestamp}.csv`;

      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(link);
    } catch (err) {
      console.error("Export error:", err);
      alert("Failed to export registrations. Please try again.");
    } finally {
      setExporting(false);
    }
  };

  const filteredRegistrations = registrations.filter((reg) => {
    const matchesStatus = filterStatus === "all" || reg.status === filterStatus;
    const matchesSearch =
      searchTerm === "" ||
      reg.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reg.email.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="bg-white font-body min-h-screen">
      {/* Header */}
      <section className="bg-[#131c33] text-white py-8 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center gap-4">
            <div>
              <h1 className="font-heading font-bold text-2xl sm:text-3xl text-white">
                Registrations Management
              </h1>
              <p className="text-gray-300 text-xs sm:text-sm mt-1">
                View and manage all UDAN membership registrations
              </p>
            </div>
            <Link
              href="/"
              className="text-xs font-bold text-[#63b849] hover:underline"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Controls */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex-1 w-full sm:w-auto">
              <input
                type="text"
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#63b849]"
              />
            </div>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#63b849]"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>

          {/* Export Buttons */}
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => handleExport("csv")}
              disabled={exporting || filteredRegistrations.length === 0}
              className="px-4 py-2 bg-[#1377a4] text-white text-xs font-bold rounded-lg hover:bg-[#0d5a8a] disabled:opacity-50 transition"
            >
              📊 Export CSV
            </button>
            <button
              onClick={() => handleExport("excel")}
              disabled={exporting || filteredRegistrations.length === 0}
              className="px-4 py-2 bg-[#63b849] text-white text-xs font-bold rounded-lg hover:bg-[#4f9738] disabled:opacity-50 transition"
            >
              📈 Export Excel
            </button>
            <button
              onClick={() => handleExport("pdf")}
              disabled={exporting || filteredRegistrations.length === 0}
              className="px-4 py-2 bg-[#e5851d] text-white text-xs font-bold rounded-lg hover:bg-[#c6711a] disabled:opacity-50 transition"
            >
              📄 Export PDF
            </button>
            <div className="text-xs text-gray-600 py-2 ml-auto">
              {exporting ? "Exporting..." : ""}
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200">
            <p className="text-xs text-gray-600 font-semibold">Total</p>
            <p className="text-2xl font-bold text-[#1377a4]">
              {registrations.length}
            </p>
          </div>
          <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg p-4 border border-yellow-200">
            <p className="text-xs text-gray-600 font-semibold">Pending</p>
            <p className="text-2xl font-bold text-[#e5851d]">
              {registrations.filter((r) => r.status === "pending").length}
            </p>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 border border-green-200">
            <p className="text-xs text-gray-600 font-semibold">Approved</p>
            <p className="text-2xl font-bold text-[#63b849]">
              {registrations.filter((r) => r.status === "approved").length}
            </p>
          </div>
          <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-lg p-4 border border-red-200">
            <p className="text-xs text-gray-600 font-semibold">Rejected</p>
            <p className="text-2xl font-bold text-red-600">
              {registrations.filter((r) => r.status === "rejected").length}
            </p>
          </div>
        </div>

        {/* Table */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Loading registrations...</p>
          </div>
        ) : filteredRegistrations.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-gray-500">No registrations found</p>
          </div>
        ) : (
          <div className="overflow-x-auto bg-white border border-gray-200 rounded-lg">
            <table className="w-full text-sm">
              <thead className="bg-[#f0f9ed] border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left font-bold text-[#1b2238]">
                    Name
                  </th>
                  <th className="px-4 py-3 text-left font-bold text-[#1b2238]">
                    Email
                  </th>
                  <th className="px-4 py-3 text-left font-bold text-[#1b2238]">
                    Phone
                  </th>
                  <th className="px-4 py-3 text-left font-bold text-[#1b2238]">
                    Country
                  </th>
                  <th className="px-4 py-3 text-left font-bold text-[#1b2238]">
                    Role
                  </th>
                  <th className="px-4 py-3 text-left font-bold text-[#1b2238]">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left font-bold text-[#1b2238]">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredRegistrations.map((reg, idx) => (
                  <tr
                    key={reg.id}
                    className={`border-b border-gray-200 ${
                      idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                    } hover:bg-blue-50 transition`}
                  >
                    <td className="px-4 py-3 font-semibold text-[#1b2238]">
                      {reg.full_name}
                    </td>
                    <td className="px-4 py-3 text-gray-700">{reg.email}</td>
                    <td className="px-4 py-3 text-gray-700">{reg.phone || "-"}</td>
                    <td className="px-4 py-3 text-gray-700">{reg.country}</td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold">
                        {reg.registration_type}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          reg.status === "approved"
                            ? "bg-green-100 text-green-700"
                            : reg.status === "rejected"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {reg.status?.charAt(0).toUpperCase() + reg.status?.slice(1)}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-700">
                      {new Date(reg.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Summary */}
        <div className="mt-6 text-xs text-gray-600 text-right">
          Showing {filteredRegistrations.length} of {registrations.length}{" "}
          registrations
        </div>
      </div>
    </div>
  );
}
