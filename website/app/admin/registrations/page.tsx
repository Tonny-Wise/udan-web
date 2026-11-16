"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
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
  [key: string]: any; // Include all diaspora form fields
}

export default function AdminRegistrationsPage() {
  const router = useRouter();
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [exporting, setExporting] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedRegistration, setSelectedRegistration] = useState<Registration | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Check if user has admin token cookie
    const checkAuth = () => {
      const cookies = document.cookie.split(";");
      const hasAdminToken = cookies.some((c) => c.trim().startsWith("admin_token="));
      
      if (!hasAdminToken) {
        router.push("/admin");
        return;
      }
      
      setIsAuthenticated(true);
      fetchRegistrations();
    };

    checkAuth();
  }, [router]);

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

  const handleLogout = () => {
    // Clear admin token cookie
    document.cookie = "admin_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    router.push("/admin");
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

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500">Redirecting to login...</p>
      </div>
    );
  }

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
            <div className="flex gap-3 items-center">
              <button
                onClick={handleLogout}
                className="text-xs font-bold text-red-400 hover:text-red-300 transition"
              >
                Logout
              </button>
              <Link
                href="/"
                className="text-xs font-bold text-[#63b849] hover:underline"
              >
                ← Home
              </Link>
            </div>
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
                  <th className="px-4 py-3 text-left font-bold text-[#1b2238]">
                    Action
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
                    <td className="px-4 py-3">
                      <button
                        onClick={() => {
                          setSelectedRegistration(reg);
                          setShowModal(true);
                        }}
                        className="px-3 py-1 bg-[#1377a4] text-white text-xs font-bold rounded hover:bg-[#0d5a8a] transition"
                      >
                        View Details
                      </button>
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

      {/* Detail Modal */}
      {showModal && selectedRegistration && (
        <DetailsModal 
          registration={selectedRegistration} 
          onClose={() => {
            setShowModal(false);
            setSelectedRegistration(null);
          }} 
        />
      )}
    </div>
  );
}

// Details Modal Component
function DetailsModal({ registration, onClose }: { registration: Registration; onClose: () => void }) {
  const [activeTab, setActiveTab] = useState("A");

  const formatValue = (value: any) => {
    if (value === null || value === undefined) return "-";
    if (typeof value === "boolean") return value ? "Yes" : "No";
    if (Array.isArray(value)) return value.join(", ");
    return String(value);
  };

  const renderField = (label: string, value: any) => (
    <div className="border-b border-gray-200 py-2">
      <p className="text-xs font-semibold text-gray-700">{label}</p>
      <p className="text-sm text-gray-900 mt-1">{formatValue(value)}</p>
    </div>
  );

  const renderFileLink = (url: string, label: string) => {
    if (!url) return null;
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:underline text-sm break-all"
      >
        {label}
      </a>
    );
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-[#131c33] text-white px-6 py-4 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold">{registration.full_name}</h2>
            <p className="text-sm text-gray-300">{registration.email}</p>
          </div>
          <button
            onClick={onClose}
            className="text-2xl text-gray-300 hover:text-white"
          >
            ×
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto">
          {/* Tab Navigation */}
          <div className="bg-gray-100 border-b border-gray-200 sticky top-0 z-10">
            <div className="flex overflow-x-auto">
              {["A", "B", "C", "D", "E", "F", "G", "H", "I", "Files"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 text-sm font-semibold whitespace-nowrap ${
                    activeTab === tab
                      ? "bg-[#63b849] text-white border-b-2 border-[#63b849]"
                      : "text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Section {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-6 space-y-4">
            {/* Section A: Personal Information */}
            {activeTab === "A" && (
              <div>
                <h3 className="text-lg font-bold text-[#131c33] mb-4">
                  A. Personal Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {renderField("Full Name", registration.full_name)}
                  {renderField("Surname", registration.surname)}
                  {renderField("Email", registration.email)}
                  {renderField("Phone", registration.phone)}
                  {renderField("Date of Birth", registration.date_of_birth)}
                  {renderField("Gender", registration.gender)}
                  {renderField("Address", registration.address)}
                  {renderField("Country", registration.country)}
                  {renderField("Home District", registration.home_district)}
                  {renderField("Diaspora Association", registration.diaspora_association)}
                  {renderField("In Diaspora Network", registration.diaspora_network)}
                  {renderField("Diaspora Network Name", registration.diaspora_network_name)}
                  {renderField("In Agribusiness Network", registration.agribusiness_network)}
                  {renderField("Agribusiness Network Name", registration.agribusiness_network_name)}
                </div>
              </div>
            )}

            {/* Section B: Education */}
            {activeTab === "B" && (
              <div>
                <h3 className="text-lg font-bold text-[#131c33] mb-4">
                  B. Education and Training
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {renderField("Education Level", registration.education_level)}
                  {renderField("Agriculture Training", registration.agriculture_training)}
                </div>
              </div>
            )}

            {/* Section C: Expertise */}
            {activeTab === "C" && (
              <div>
                <h3 className="text-lg font-bold text-[#131c33] mb-4">
                  C. Area of Expertise
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {renderField("Crop Production", registration.expertise_crop)}
                  {renderField("Livestock", registration.expertise_livestock)}
                  {renderField("Aquaculture", registration.expertise_aquaculture)}
                  {renderField("Horticulture", registration.expertise_horticulture)}
                  {renderField("Forestry", registration.expertise_forestry)}
                  {renderField("Services", registration.expertise_services)}
                  {renderField("Services Specify", registration.expertise_services_specify)}
                  {renderField("Other", registration.expertise_other)}
                  {renderField("Other Specify", registration.expertise_other_specify)}
                  {renderField("Crop Commodity", registration.crop_commodity)}
                </div>
              </div>
            )}

            {/* Section D: Business Description */}
            {activeTab === "D" && (
              <div>
                <h3 className="text-lg font-bold text-[#131c33] mb-4">
                  D. Business Description
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {renderField("Has Business", registration.has_business)}
                  {renderField("Business Name", registration.business_name)}
                  {renderField("Business Registration", registration.business_registration)}
                  {renderField("Business Location", registration.business_location_type)}
                  {renderField("Crop Production", registration.enterprise_type_crop)}
                  {renderField("Livestock", registration.enterprise_type_livestock)}
                  {renderField("Fish Farming", registration.enterprise_type_fish)}
                  {renderField("Forestry", registration.enterprise_type_forestry)}
                  {renderField("Technology", registration.enterprise_type_tech)}
                  {renderField("Other", registration.enterprise_type_other)}
                  {renderField("Other Specify", registration.enterprise_type_other_specify)}
                  {renderField("Value Chain - Production", registration.value_chain_production)}
                  {renderField("Value Chain - Aggregation", registration.value_chain_aggregation)}
                  {renderField("Value Chain - Processing", registration.value_chain_processing)}
                  {renderField("Value Chain - Distribution", registration.value_chain_distribution)}
                  {renderField("Value Chain - Inputs", registration.value_chain_inputs)}
                  {renderField("Value Chain - Services", registration.value_chain_services)}
                  {renderField("Value Chain - Services Specify", registration.value_chain_services_specify)}
                  {renderField("Owner/CEO", registration.role_owner)}
                  {renderField("Financier", registration.role_financier)}
                  {renderField("Permanent Employee", registration.role_permanent)}
                  {renderField("Temporary Employee", registration.role_temporary)}
                  {renderField("Cooperative Member", registration.role_cooperative)}
                  {renderField("Other Role", registration.role_other)}
                  {renderField("Other Role Specify", registration.role_other_specify)}
                  {renderField("Years Experience", registration.years_experience)}
                  {renderField("Permanent Employees", registration.employees_permanent)}
                  {renderField("Temporary Employees", registration.employees_temporary)}
                </div>
              </div>
            )}

            {/* Section E: Business Model */}
            {activeTab === "E" && (
              <div>
                <h3 className="text-lg font-bold text-[#131c33] mb-4">
                  E. Business and Operating Model
                </h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-xs font-semibold text-gray-700">Business Description</p>
                    <p className="text-sm text-gray-900 mt-1">{formatValue(registration.business_description)}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-700">Target Customers</p>
                    <p className="text-sm text-gray-900 mt-1">{formatValue(registration.target_customers)}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-700">Major Suppliers</p>
                    <p className="text-sm text-gray-900 mt-1">{formatValue(registration.major_suppliers)}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-700">Partners</p>
                    <p className="text-sm text-gray-900 mt-1">{formatValue(registration.partners)}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-700">Target Market</p>
                    <p className="text-sm text-gray-900 mt-1">{formatValue(registration.target_market)}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Section F: Strategy */}
            {activeTab === "F" && (
              <div>
                <h3 className="text-lg font-bold text-[#131c33] mb-4">
                  F. Strategy and Future Plans
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {renderField("Has Business Plan", registration.has_business_plan)}
                  <div>
                    <p className="text-xs font-semibold text-gray-700">Growth Plans</p>
                    <p className="text-sm text-gray-900 mt-1">{formatValue(registration.growth_plans)}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Section G: Interests */}
            {activeTab === "G" && (
              <div>
                <h3 className="text-lg font-bold text-[#131c33] mb-4">
                  G. Motivating Areas of Interest
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {renderField("Join Network", registration.join_network)}
                  <div>
                    <p className="text-xs font-semibold text-gray-700">Network Expectations</p>
                    <p className="text-sm text-gray-900 mt-1">{formatValue(registration.network_expectations)}</p>
                  </div>
                  {renderField("Willing to Invest", registration.willing_invest)}
                  {renderField("Invest - Crop", registration.invest_subsector_crop)}
                  {renderField("Invest - Livestock", registration.invest_subsector_livestock)}
                  {renderField("Invest - Fish", registration.invest_subsector_fish)}
                  {renderField("Invest - Forestry", registration.invest_subsector_forestry)}
                  {renderField("Invest - Technology", registration.invest_subsector_tech)}
                  {renderField("Interest in Collaboration", registration.interest_collaboration)}
                  {renderField("Collab - Suppliers", registration.collab_suppliers)}
                  {renderField("Collab - Customers", registration.collab_customers)}
                  {renderField("Collab - Youth Monitoring", registration.collab_youth_monitoring)}
                  {renderField("Collab - Community Investment", registration.collab_community_investment)}
                  {renderField("Collab - Mentorship", registration.collab_mentorship)}
                  {renderField("Willing to Mentor", registration.willing_mentor)}
                  {renderField("Mentor Subsector", registration.mentor_subsector)}
                </div>
              </div>
            )}

            {/* Section H: Mentorship */}
            {activeTab === "H" && (
              <div>
                <h3 className="text-lg font-bold text-[#131c33] mb-4">
                  H. Mentorship
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {renderField("Mentor - Crop Production", registration.mentor_engagement_crop)}
                  {renderField("Mentor - Processing", registration.mentor_engagement_processing)}
                  {renderField("Mentor - Management", registration.mentor_engagement_management)}
                  {renderField("Mentor - Market", registration.mentor_engagement_market)}
                  {renderField("Mentor - Staff", registration.mentor_engagement_staff)}
                  {renderField("Mentor - Technology", registration.mentor_engagement_tech)}
                  {renderField("Past Mentorship", registration.past_mentorship)}
                  {renderField("Mentorship Hours", registration.mentorship_hours)}
                  {renderField("Mentorship Frequency", registration.mentorship_frequency)}
                </div>
              </div>
            )}

            {/* Section I: Files & Links */}
            {activeTab === "I" && (
              <div>
                <h3 className="text-lg font-bold text-[#131c33] mb-4">
                  I. Useful Links
                </h3>
                <div className="grid grid-cols-1 gap-4">
                  {renderField("Website URL", registration.website_url)}
                  <div>
                    <p className="text-xs font-semibold text-gray-700">Useful Links</p>
                    <p className="text-sm text-gray-900 mt-1">{formatValue(registration.useful_links)}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Files Section */}
            {activeTab === "Files" && (
              <div>
                <h3 className="text-lg font-bold text-[#131c33] mb-4">
                  Uploaded Documents
                </h3>
                <div className="space-y-4">
                  {/* Business Plan File */}
                  <div className="border border-gray-300 rounded-lg p-4">
                    <p className="text-sm font-semibold text-gray-700 mb-2">Business Plan File</p>
                    {registration.business_plan_file ? (
                      renderFileLink(registration.business_plan_file, "📄 Download Business Plan")
                    ) : (
                      <p className="text-sm text-gray-500">-</p>
                    )}
                  </div>

                  {/* Other Documents */}
                  <div className="border border-gray-300 rounded-lg p-4">
                    <p className="text-sm font-semibold text-gray-700 mb-2">Other Documents</p>
                    {registration.other_documents ? (
                      <div className="space-y-2">
                        {(() => {
                          try {
                            const docs = typeof registration.other_documents === "string"
                              ? JSON.parse(registration.other_documents)
                              : Array.isArray(registration.other_documents)
                              ? registration.other_documents
                              : [];
                            return docs.length > 0 ? (
                              docs.map((doc: any, idx: number) => (
                                <div key={idx}>
                                  {typeof doc === "string" ? (
                                    renderFileLink(doc, `📎 Document ${idx + 1}`)
                                  ) : (
                                    <div>
                                      {renderFileLink(doc.url, `📎 ${doc.name || "Document " + (idx + 1)}`)}
                                      {doc.size && <p className="text-xs text-gray-500 ml-4">Size: {(doc.size / 1024).toFixed(2)} KB</p>}
                                    </div>
                                  )}
                                </div>
                              ))
                            ) : (
                              <p className="text-sm text-gray-500">No documents uploaded</p>
                            );
                          } catch {
                            return <p className="text-sm text-gray-500">{registration.other_documents}</p>;
                          }
                        })()}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-500">-</p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-gray-100 border-t border-gray-200 px-6 py-4 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg font-semibold hover:bg-gray-400 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
