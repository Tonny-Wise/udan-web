"use client";

import { useState, useEffect, useCallback } from "react";

interface OtherDocument {
  file: File;
  name: string;
}

interface UdanFormData {
  sectionA: {
    fullName: string;
    surname: string;
    dateOfBirth: string;
    gender: string;
    address: string;
    email: string;
    phone: string;
    country: string;
    homeDistrict: string;
    diasporaAssociation: string;
    diasporaNetwork: string;
    diasporaNetworkName: string;
    agribusinessNetwork: string;
    agribusinessNetworkName: string;
  };
  sectionB: {
    educationLevel: string;
    agricultureTraining: string;
  };
  sectionC: {
    expertiseCrop: boolean;
    expertiseLivestock: boolean;
    expertiseAquaculture: boolean;
    expertiseHorticulture: boolean;
    expertiseForestry: boolean;
    expertiseServices: boolean;
    expertiseServicesSpecify: string;
    expertiseOther: boolean;
    expertiseOtherSpecify: string;
    cropCommodity: string;
  };
  sectionD: {
    hasBusiness: string;
    businessName: string;
    businessRegistration: string;
    businessLocationType: string;
    enterpriseTypeCrop: boolean;
    enterpriseTypeLivestock: boolean;
    enterpriseTypeFish: boolean;
    enterpriseTypeForestry: boolean;
    enterpriseTypeTech: boolean;
    enterpriseTypeOther: boolean;
    enterpriseTypeOtherSpecify: string;
    valueChainProduction: boolean;
    valueChainAggregation: boolean;
    valueChainProcessing: boolean;
    valueChainDistribution: boolean;
    valueChainInputs: boolean;
    valueChainServices: boolean;
    valueChainServicesSpecify: string;
    roleOwner: boolean;
    roleFinancier: boolean;
    rolePermanent: boolean;
    roleTemporary: boolean;
    roleCooperative: boolean;
    roleOther: boolean;
    roleOtherSpecify: string;
    yearsExperience: string;
    employeesPermanent: string;
    employeesTemporary: string;
  };
  sectionE: {
    businessDescription: string;
    targetCustomers: string;
    majorSuppliers: string;
    partners: string;
    targetMarket: string;
  };
  sectionF: {
    hasBusinessPlan: string;
    growthPlans: string;
  };
  sectionG: {
    joinNetwork: string;
    networkExpectations: string;
    willingInvest: string;
    investSubsectorCrop: boolean;
    investSubsectorLivestock: boolean;
    investSubsectorFish: boolean;
    investSubsectorForestry: boolean;
    investSubsectorTech: boolean;
    interestCollaboration: string;
    collabSuppliers: boolean;
    collabCustomers: boolean;
    collabYouthMonitoring: boolean;
    collabCommunityInvestment: boolean;
    collabMentorship: boolean;
    willingMentor: string;
    mentorSubsector: string;
    mentorEngagementCrop: boolean;
    mentorEngagementProcessing: boolean;
    mentorEngagementManagement: boolean;
    mentorEngagementMarket: boolean;
    mentorEngagementStaff: boolean;
    mentorEngagementTech: boolean;
    pastMentorship: string;
    mentorshipHours: string;
    mentorshipFrequency: string;
  };
  sectionHI: {
    businessPlanFile: File | null;
    businessPlanFileName: string;
    otherDocuments: OtherDocument[];
    usefulLinks: string;
    websiteUrl: string;
  };
}

const initialFormData: UdanFormData = {
  sectionA: {
    fullName: "",
    surname: "",
    dateOfBirth: "",
    gender: "",
    address: "",
    email: "",
    phone: "",
    country: "",
    homeDistrict: "",
    diasporaAssociation: "",
    diasporaNetwork: "",
    diasporaNetworkName: "",
    agribusinessNetwork: "",
    agribusinessNetworkName: "",
  },
  sectionB: { educationLevel: "", agricultureTraining: "" },
  sectionC: {
    expertiseCrop: false,
    expertiseLivestock: false,
    expertiseAquaculture: false,
    expertiseHorticulture: false,
    expertiseForestry: false,
    expertiseServices: false,
    expertiseServicesSpecify: "",
    expertiseOther: false,
    expertiseOtherSpecify: "",
    cropCommodity: "",
  },
  sectionD: {
    hasBusiness: "",
    businessName: "",
    businessRegistration: "",
    businessLocationType: "",
    enterpriseTypeCrop: false,
    enterpriseTypeLivestock: false,
    enterpriseTypeFish: false,
    enterpriseTypeForestry: false,
    enterpriseTypeTech: false,
    enterpriseTypeOther: false,
    enterpriseTypeOtherSpecify: "",
    valueChainProduction: false,
    valueChainAggregation: false,
    valueChainProcessing: false,
    valueChainDistribution: false,
    valueChainInputs: false,
    valueChainServices: false,
    valueChainServicesSpecify: "",
    roleOwner: false,
    roleFinancier: false,
    rolePermanent: false,
    roleTemporary: false,
    roleCooperative: false,
    roleOther: false,
    roleOtherSpecify: "",
    yearsExperience: "",
    employeesPermanent: "",
    employeesTemporary: "",
  },
  sectionE: {
    businessDescription: "",
    targetCustomers: "",
    majorSuppliers: "",
    partners: "",
    targetMarket: "",
  },
  sectionF: { hasBusinessPlan: "", growthPlans: "" },
  sectionG: {
    joinNetwork: "",
    networkExpectations: "",
    willingInvest: "",
    investSubsectorCrop: false,
    investSubsectorLivestock: false,
    investSubsectorFish: false,
    investSubsectorForestry: false,
    investSubsectorTech: false,
    interestCollaboration: "",
    collabSuppliers: false,
    collabCustomers: false,
    collabYouthMonitoring: false,
    collabCommunityInvestment: false,
    collabMentorship: false,
    willingMentor: "",
    mentorSubsector: "",
    mentorEngagementCrop: false,
    mentorEngagementProcessing: false,
    mentorEngagementManagement: false,
    mentorEngagementMarket: false,
    mentorEngagementStaff: false,
    mentorEngagementTech: false,
    pastMentorship: "",
    mentorshipHours: "",
    mentorshipFrequency: "",
  },
  sectionHI: {
    businessPlanFile: null,
    businessPlanFileName: "",
    otherDocuments: [],
    usefulLinks: "",
    websiteUrl: "",
  },
};

export default function DiasporaForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<UdanFormData>(initialFormData);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [submitMessage, setSubmitMessage] = useState("");
  const [saveStatus, setSaveStatus] = useState<"idle" | "saved">("idle");
  const [hasAutoLoaded, setHasAutoLoaded] = useState(false);

  const steps = [
    "Personal Information",
    "Education",
    "Expertise",
    "Business Description",
    "Business Model",
    "Strategy & Plans",
    "Interests",
    "Mentorship",
    "Files & Links",
  ];

  useEffect(() => {
    if (hasAutoLoaded) return;
    // Use constant storage key independent of email to ensure reliable data recovery
    const storageKey = "udan_diaspora_form_draft";
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setFormData(parsed);
      } catch (e) {
        console.error("Failed to load form data:", e);
      }
    }
    setHasAutoLoaded(true);
  }, [hasAutoLoaded]);

  const saveToLocalStorage = useCallback((data: UdanFormData) => {
    // Use constant storage key independent of email to ensure reliable data recovery
    const storageKey = "udan_diaspora_form_draft";
    localStorage.setItem(storageKey, JSON.stringify(data));
  }, []);

  const updateFormData = useCallback((updates: Partial<UdanFormData>) => {
    const newData = { ...formData, ...updates };
    setFormData(newData);
    saveToLocalStorage(newData);
  }, [formData, saveToLocalStorage]);

  const validateSection = (step: number): boolean => {
    switch (step) {
      case 0:
        return !!(
          formData.sectionA.fullName &&
          formData.sectionA.surname &&
          formData.sectionA.email &&
          formData.sectionA.phone &&
          formData.sectionA.country
        );
      case 1:
        return !!formData.sectionB.educationLevel;
      case 2:
        const hasExpertise =
          formData.sectionC.expertiseCrop ||
          formData.sectionC.expertiseLivestock ||
          formData.sectionC.expertiseAquaculture ||
          formData.sectionC.expertiseHorticulture ||
          formData.sectionC.expertiseForestry ||
          formData.sectionC.expertiseServices ||
          formData.sectionC.expertiseOther;
        return hasExpertise;
      case 3:
        return formData.sectionD.hasBusiness !== "" && (formData.sectionD.hasBusiness === "no" || formData.sectionD.yearsExperience !== "");
      case 4:
        return !!(formData.sectionE.businessDescription && formData.sectionE.targetCustomers);
      case 5:
        return formData.sectionF.hasBusinessPlan !== "";
      case 6:
        return formData.sectionG.joinNetwork !== "";
      case 7:
        return formData.sectionG.willingMentor !== "";
      case 8:
        return true;
      default:
        return true;
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const handleNext = () => {
    if (validateSection(currentStep)) {
      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1);
        setSubmitMessage("");
      }
    } else {
      setSubmitMessage("Please complete all required fields (*) in this section");
    }
  };

  const handleSaveContinueLater = () => {
    saveToLocalStorage(formData);
    setSaveStatus("saved");
    // Clear the saved notification after 3 seconds
    setTimeout(() => setSaveStatus("idle"), 3000);
  };

  const uploadFile = async (file: File, type: string, email: string): Promise<string | null> => {
    const formDataUpload = new FormData();
    formDataUpload.append("file", file);
    formDataUpload.append("type", type);
    formDataUpload.append("email", email);

    try {
      const res = await fetch("/api/upload-diaspora-file", {
        method: "POST",
        body: formDataUpload,
      });
      const data = await res.json();
      return data.filePath || null;
    } catch (err) {
      console.error("File upload error:", err);
      return null;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateSection(currentStep)) {
      setSubmitMessage("Please complete all required fields");
      return;
    }

    setSubmitStatus("loading");
    setSubmitMessage("");

    try {
      let businessPlanUrl = "";
      const otherDocumentsUrls: string[] = [];

      if (formData.sectionHI.businessPlanFile) {
        const uploadRes = await uploadFile(
          formData.sectionHI.businessPlanFile,
          "business_plan",
          formData.sectionA.email
        );
        if (uploadRes) businessPlanUrl = uploadRes;
      }

      // Upload all other documents
      for (const doc of formData.sectionHI.otherDocuments) {
        const uploadRes = await uploadFile(
          doc.file,
          "other_documents",
          formData.sectionA.email
        );
        if (uploadRes) otherDocumentsUrls.push(uploadRes);
      }

      const res = await fetch("/api/diaspora-application", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          businessPlanUrl,
          otherDocumentsUrls,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSubmitStatus("success");
        localStorage.removeItem("udan_diaspora_form_draft");
        setFormData(initialFormData);
        setCurrentStep(0);
      } else {
        setSubmitStatus("error");
        setSubmitMessage(data.error || "Failed to submit application");
      }
    } catch (err) {
      console.error("Submission error:", err);
      setSubmitStatus("error");
      setSubmitMessage("An error occurred while submitting the application");
    }
  };

  const Checkbox = ({
    label,
    checked,
    onChange,
  }: {
    label: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
  }) => (
    <label className="flex items-center gap-2.5 cursor-pointer select-none">
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="sr-only" />
      <span
        aria-hidden="true"
        className={`w-4 h-4 rounded border-2 flex items-center justify-center shrink-0 transition-all ${
          checked ? "border-[#63b849] bg-[#63b849]" : "border-gray-300 bg-white"
        }`}
      >
        {checked && <span className="text-white text-xs">✓</span>}
      </span>
      <span className="text-sm text-[#1b2238]">{label}</span>
    </label>
  );

  return (
    <div>
      {submitStatus === "success" && (
        <div className="bg-gradient-to-br from-[#f0f9ed] to-[#e8f5e1] rounded-2xl p-8 sm:p-12 border border-[#63b849]/40 text-center">
          <div className="w-16 h-16 rounded-full bg-[#63b849] text-white flex items-center justify-center mx-auto mb-6 text-3xl font-bold">
            ✓
          </div>
          <h2 className="font-heading font-bold text-2xl sm:text-3xl text-[#1b2238] mb-3">Congratulations!</h2>
          <p className="text-sm text-gray-700 max-w-md mx-auto mb-2 font-semibold">
            You are now a member of UDAN
          </p>
          <p className="text-sm text-gray-700 max-w-md mx-auto mb-2">
            Welcome to the Uganda Diaspora Agribusiness Network.
          </p>
          <p className="text-xs text-gray-600 mb-8">
            A confirmation email has been sent to{" "}
            <span className="font-bold text-[#1b2238]">{formData.sectionA.email}</span>. You now have access to the UDAN B2B platform, regional chapter resources, and member-exclusive opportunities.
          </p>
          <button
            onClick={() => {
              setFormData(initialFormData);
              setCurrentStep(0);
              setSubmitStatus("idle");
            }}
            className="inline-flex items-center justify-center px-6 py-2.5 bg-[#63b849] text-white text-xs font-bold rounded-full hover:bg-[#558c3d] transition-colors"
          >
            Start New Application
          </button>
        </div>
      )}

      {submitStatus !== "success" && (
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-sm">
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-heading font-bold text-lg text-[#1b2238]">{steps[currentStep]}</h2>
              <span className="text-xs font-semibold text-gray-600">
                Step {currentStep + 1} of {steps.length}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-[#63b849] h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              />
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {currentStep === 0 && (
              <div className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    required
                    placeholder="Full Name"
                    value={formData.sectionA.fullName}
                    onChange={(e) => updateFormData({ sectionA: { ...formData.sectionA, fullName: e.target.value } })}
                    className="px-3 py-2 border border-gray-300 rounded-lg text-xs focus:border-[#63b849] outline-none"
                  />
                  <input
                    type="text"
                    required
                    placeholder="Surname *"
                    value={formData.sectionA.surname}
                    onChange={(e) => updateFormData({ sectionA: { ...formData.sectionA, surname: e.target.value } })}
                    className="px-3 py-2 border border-gray-300 rounded-lg text-xs focus:border-[#63b849] outline-none"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="date"
                    placeholder="Date of Birth"
                    value={formData.sectionA.dateOfBirth}
                    onChange={(e) =>
                      updateFormData({ sectionA: { ...formData.sectionA, dateOfBirth: e.target.value } })
                    }
                    className="px-3 py-2 border border-gray-300 rounded-lg text-xs focus:border-[#63b849] outline-none"
                  />
                  <select
                    value={formData.sectionA.gender}
                    onChange={(e) => updateFormData({ sectionA: { ...formData.sectionA, gender: e.target.value } })}
                    className="px-3 py-2 border border-gray-300 rounded-lg text-xs focus:border-[#63b849] outline-none"
                  >
                    <option value="">Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <input
                  type="text"
                  placeholder="Address"
                  value={formData.sectionA.address}
                  onChange={(e) => updateFormData({ sectionA: { ...formData.sectionA, address: e.target.value } })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs focus:border-[#63b849] outline-none"
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="email"
                    required
                    placeholder="Email *"
                    value={formData.sectionA.email}
                    onChange={(e) => updateFormData({ sectionA: { ...formData.sectionA, email: e.target.value } })}
                    className="px-3 py-2 border border-gray-300 rounded-lg text-xs focus:border-[#63b849] outline-none"
                  />
                  <input
                    type="tel"
                    required
                    placeholder="Telephone *"
                    value={formData.sectionA.phone}
                    onChange={(e) => updateFormData({ sectionA: { ...formData.sectionA, phone: e.target.value } })}
                    className="px-3 py-2 border border-gray-300 rounded-lg text-xs focus:border-[#63b849] outline-none"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    required
                    placeholder="Country of Residence *"
                    value={formData.sectionA.country}
                    onChange={(e) =>
                      updateFormData({ sectionA: { ...formData.sectionA, country: e.target.value } })
                    }
                    className="px-3 py-2 border border-gray-300 rounded-lg text-xs focus:border-[#63b849] outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Home District in Uganda"
                    value={formData.sectionA.homeDistrict}
                    onChange={(e) =>
                      updateFormData({ sectionA: { ...formData.sectionA, homeDistrict: e.target.value } })
                    }
                    className="px-3 py-2 border border-gray-300 rounded-lg text-xs focus:border-[#63b849] outline-none"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Diaspora Association/Group (if any)"
                  value={formData.sectionA.diasporaAssociation}
                  onChange={(e) =>
                    updateFormData({ sectionA: { ...formData.sectionA, diasporaAssociation: e.target.value } })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs focus:border-[#63b849] outline-none"
                />
                <div className="bg-gray-50 p-4 rounded-lg">
                  <label className="block text-xs font-bold text-[#1b2238] uppercase mb-2">
                    Diaspora network?
                  </label>
                  <div className="flex gap-4">
                    {["yes", "no"].map((val) => (
                      <label key={val} className="flex items-center gap-2">
                        <input
                          type="radio"
                          value={val}
                          checked={formData.sectionA.diasporaNetwork === val}
                          onChange={(e) =>
                            updateFormData({
                              sectionA: { ...formData.sectionA, diasporaNetwork: e.target.value },
                            })
                          }
                          className="sr-only"
                        />
                        <span
                          className={`w-4 h-4 rounded-full border-2 ${
                            formData.sectionA.diasporaNetwork === val
                              ? "border-[#63b849] bg-[#63b849]"
                              : "border-gray-300"
                          }`}
                        />
                        <span className="text-xs text-[#1b2238]">{val === "yes" ? "Yes" : "No"}</span>
                      </label>
                    ))}
                  </div>
                  {formData.sectionA.diasporaNetwork === "yes" && (
                    <input
                      type="text"
                      placeholder="Network name"
                      value={formData.sectionA.diasporaNetworkName}
                      onChange={(e) =>
                        updateFormData({
                          sectionA: { ...formData.sectionA, diasporaNetworkName: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs focus:border-[#63b849] outline-none mt-2"
                    />
                  )}
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <label className="block text-xs font-bold text-[#1b2238] uppercase mb-2">
                    Agribusiness network?
                  </label>
                  <div className="flex gap-4">
                    {["yes", "no"].map((val) => (
                      <label key={val} className="flex items-center gap-2">
                        <input
                          type="radio"
                          value={val}
                          checked={formData.sectionA.agribusinessNetwork === val}
                          onChange={(e) =>
                            updateFormData({
                              sectionA: { ...formData.sectionA, agribusinessNetwork: e.target.value },
                            })
                          }
                          className="sr-only"
                        />
                        <span
                          className={`w-4 h-4 rounded-full border-2 ${
                            formData.sectionA.agribusinessNetwork === val
                              ? "border-[#63b849] bg-[#63b849]"
                              : "border-gray-300"
                          }`}
                        />
                        <span className="text-xs text-[#1b2238]">{val === "yes" ? "Yes" : "No"}</span>
                      </label>
                    ))}
                  </div>
                  {formData.sectionA.agribusinessNetwork === "yes" && (
                    <input
                      type="text"
                      placeholder="Network name"
                      value={formData.sectionA.agribusinessNetworkName}
                      onChange={(e) =>
                        updateFormData({
                          sectionA: { ...formData.sectionA, agribusinessNetworkName: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs focus:border-[#63b849] outline-none mt-2"
                    />
                  )}
                </div>
              </div>
            )}

            {currentStep === 1 && (
              <div className="space-y-4">
                <select
                  required
                  value={formData.sectionB.educationLevel}
                  onChange={(e) =>
                    updateFormData({ sectionB: { ...formData.sectionB, educationLevel: e.target.value } })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs focus:border-[#63b849] outline-none"
                >
                  <option value="">Education Level *</option>
                  <option value="Primary">Primary</option>
                  <option value="Secondary">Secondary</option>
                  <option value="Vocational">Vocational/Technical</option>
                  <option value="Diploma">Diploma</option>
                  <option value="Degree">Degree</option>
                  <option value="Masters">Masters</option>
                  <option value="PhD">PhD</option>
                </select>
                <textarea
                  placeholder="Training in Agriculture (last 5 years)"
                  value={formData.sectionB.agricultureTraining}
                  onChange={(e) =>
                    updateFormData({ sectionB: { ...formData.sectionB, agricultureTraining: e.target.value } })
                  }
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs focus:border-[#63b849] outline-none"
                />
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-4">
                <div className="space-y-3">
                  <Checkbox
                    label="Crop production"
                    checked={formData.sectionC.expertiseCrop}
                    onChange={(checked) =>
                      updateFormData({ sectionC: { ...formData.sectionC, expertiseCrop: checked } })
                    }
                  />
                  <Checkbox
                    label="Livestock"
                    checked={formData.sectionC.expertiseLivestock}
                    onChange={(checked) =>
                      updateFormData({ sectionC: { ...formData.sectionC, expertiseLivestock: checked } })
                    }
                  />
                  <Checkbox
                    label="Aquaculture"
                    checked={formData.sectionC.expertiseAquaculture}
                    onChange={(checked) =>
                      updateFormData({ sectionC: { ...formData.sectionC, expertiseAquaculture: checked } })
                    }
                  />
                  <Checkbox
                    label="Horticulture"
                    checked={formData.sectionC.expertiseHorticulture}
                    onChange={(checked) =>
                      updateFormData({ sectionC: { ...formData.sectionC, expertiseHorticulture: checked } })
                    }
                  />
                  <Checkbox
                    label="Forestry"
                    checked={formData.sectionC.expertiseForestry}
                    onChange={(checked) =>
                      updateFormData({ sectionC: { ...formData.sectionC, expertiseForestry: checked } })
                    }
                  />
                  <Checkbox
                    label="Services"
                    checked={formData.sectionC.expertiseServices}
                    onChange={(checked) =>
                      updateFormData({ sectionC: { ...formData.sectionC, expertiseServices: checked } })
                    }
                  />
                  {formData.sectionC.expertiseServices && (
                    <input
                      type="text"
                      placeholder="Specify services"
                      value={formData.sectionC.expertiseServicesSpecify}
                      onChange={(e) =>
                        updateFormData({
                          sectionC: { ...formData.sectionC, expertiseServicesSpecify: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs focus:border-[#63b849] outline-none ml-6"
                    />
                  )}
                  <Checkbox
                    label="Other"
                    checked={formData.sectionC.expertiseOther}
                    onChange={(checked) =>
                      updateFormData({ sectionC: { ...formData.sectionC, expertiseOther: checked } })
                    }
                  />
                  {formData.sectionC.expertiseOther && (
                    <input
                      type="text"
                      placeholder="Specify other"
                      value={formData.sectionC.expertiseOtherSpecify}
                      onChange={(e) =>
                        updateFormData({
                          sectionC: { ...formData.sectionC, expertiseOtherSpecify: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs focus:border-[#63b849] outline-none ml-6"
                    />
                  )}
                </div>
                {formData.sectionC.expertiseCrop && (
                  <input
                    type="text"
                    placeholder="Crop commodity (e.g., Coffee, Maize)"
                    value={formData.sectionC.cropCommodity}
                    onChange={(e) =>
                      updateFormData({ sectionC: { ...formData.sectionC, cropCommodity: e.target.value } })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs focus:border-[#63b849] outline-none"
                  />
                )}
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <label className="block text-xs font-bold mb-2">Have agribusiness in Uganda? *</label>
                  <div className="flex gap-4">
                    {["yes", "no"].map((val) => (
                      <label key={val} className="flex items-center gap-2">
                        <input
                          type="radio"
                          value={val}
                          checked={formData.sectionD.hasBusiness === val}
                          onChange={(e) =>
                            updateFormData({ sectionD: { ...formData.sectionD, hasBusiness: e.target.value } })
                          }
                          className="sr-only"
                        />
                        <span
                          className={`w-4 h-4 rounded-full border-2 ${
                            formData.sectionD.hasBusiness === val
                              ? "border-[#63b849] bg-[#63b849]"
                              : "border-gray-300"
                          }`}
                        />
                        <span className="text-xs">{val === "yes" ? "Yes" : "No"}</span>
                      </label>
                    ))}
                  </div>
                </div>
                {formData.sectionD.hasBusiness === "yes" && (
                  <>
                    <input
                      type="text"
                      placeholder="Business name"
                      value={formData.sectionD.businessName}
                      onChange={(e) =>
                        updateFormData({
                          sectionD: { ...formData.sectionD, businessName: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs focus:border-[#63b849] outline-none"
                    />
                    <input
                      type="text"
                      placeholder="Business registration number"
                      value={formData.sectionD.businessRegistration}
                      onChange={(e) =>
                        updateFormData({
                          sectionD: { ...formData.sectionD, businessRegistration: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs focus:border-[#63b849] outline-none"
                    />
                    <div>
                      <label className="block text-xs font-bold mb-2">Business location</label>
                      <div className="flex gap-4">
                        {["Town", "District"].map((loc) => (
                          <label key={loc} className="flex items-center gap-2">
                            <input
                              type="radio"
                              value={loc}
                              checked={formData.sectionD.businessLocationType === loc}
                              onChange={(e) =>
                                updateFormData({
                                  sectionD: { ...formData.sectionD, businessLocationType: e.target.value },
                                })
                              }
                              className="sr-only"
                            />
                            <span
                              className={`w-4 h-4 rounded-full border-2 ${
                                formData.sectionD.businessLocationType === loc
                                  ? "border-[#63b849] bg-[#63b849]"
                                  : "border-gray-300"
                              }`}
                            />
                            <span className="text-xs">{loc}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-bold block mb-2">Enterprise type</label>
                      <div className="space-y-2">
                        <Checkbox
                          label="Crop production"
                          checked={formData.sectionD.enterpriseTypeCrop}
                          onChange={(c) =>
                            updateFormData({ sectionD: { ...formData.sectionD, enterpriseTypeCrop: c } })
                          }
                        />
                        <Checkbox
                          label="Livestock"
                          checked={formData.sectionD.enterpriseTypeLivestock}
                          onChange={(c) =>
                            updateFormData({ sectionD: { ...formData.sectionD, enterpriseTypeLivestock: c } })
                          }
                        />
                        <Checkbox
                          label="Fish farming"
                          checked={formData.sectionD.enterpriseTypeFish}
                          onChange={(c) =>
                            updateFormData({ sectionD: { ...formData.sectionD, enterpriseTypeFish: c } })
                          }
                        />
                        <Checkbox
                          label="Forestry"
                          checked={formData.sectionD.enterpriseTypeForestry}
                          onChange={(c) =>
                            updateFormData({ sectionD: { ...formData.sectionD, enterpriseTypeForestry: c } })
                          }
                        />
                        <Checkbox
                          label="Agritech"
                          checked={formData.sectionD.enterpriseTypeTech}
                          onChange={(c) =>
                            updateFormData({ sectionD: { ...formData.sectionD, enterpriseTypeTech: c } })
                          }
                        />
                        <Checkbox
                          label="Other"
                          checked={formData.sectionD.enterpriseTypeOther}
                          onChange={(c) =>
                            updateFormData({ sectionD: { ...formData.sectionD, enterpriseTypeOther: c } })
                          }
                        />
                        {formData.sectionD.enterpriseTypeOther && (
                          <input
                            type="text"
                            placeholder="Specify"
                            value={formData.sectionD.enterpriseTypeOtherSpecify}
                            onChange={(e) =>
                              updateFormData({
                                sectionD: { ...formData.sectionD, enterpriseTypeOtherSpecify: e.target.value },
                              })
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs focus:border-[#63b849] outline-none ml-6"
                          />
                        )}
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-bold block mb-2">Value chain position</label>
                      <div className="space-y-2">
                        <Checkbox
                          label="Production"
                          checked={formData.sectionD.valueChainProduction}
                          onChange={(c) =>
                            updateFormData({ sectionD: { ...formData.sectionD, valueChainProduction: c } })
                          }
                        />
                        <Checkbox
                          label="Aggregation"
                          checked={formData.sectionD.valueChainAggregation}
                          onChange={(c) =>
                            updateFormData({ sectionD: { ...formData.sectionD, valueChainAggregation: c } })
                          }
                        />
                        <Checkbox
                          label="Processing"
                          checked={formData.sectionD.valueChainProcessing}
                          onChange={(c) =>
                            updateFormData({ sectionD: { ...formData.sectionD, valueChainProcessing: c } })
                          }
                        />
                        <Checkbox
                          label="Distribution"
                          checked={formData.sectionD.valueChainDistribution}
                          onChange={(c) =>
                            updateFormData({ sectionD: { ...formData.sectionD, valueChainDistribution: c } })
                          }
                        />
                        <Checkbox
                          label="Inputs"
                          checked={formData.sectionD.valueChainInputs}
                          onChange={(c) =>
                            updateFormData({ sectionD: { ...formData.sectionD, valueChainInputs: c } })
                          }
                        />
                        <Checkbox
                          label="Services"
                          checked={formData.sectionD.valueChainServices}
                          onChange={(c) =>
                            updateFormData({ sectionD: { ...formData.sectionD, valueChainServices: c } })
                          }
                        />
                        {formData.sectionD.valueChainServices && (
                          <input
                            type="text"
                            placeholder="Specify"
                            value={formData.sectionD.valueChainServicesSpecify}
                            onChange={(e) =>
                              updateFormData({
                                sectionD: { ...formData.sectionD, valueChainServicesSpecify: e.target.value },
                              })
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs focus:border-[#63b849] outline-none ml-6"
                          />
                        )}
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-bold block mb-2">Your role</label>
                      <div className="space-y-2">
                        <Checkbox
                          label="Owner/CEO"
                          checked={formData.sectionD.roleOwner}
                          onChange={(c) =>
                            updateFormData({ sectionD: { ...formData.sectionD, roleOwner: c } })
                          }
                        />
                        <Checkbox
                          label="Financier"
                          checked={formData.sectionD.roleFinancier}
                          onChange={(c) =>
                            updateFormData({ sectionD: { ...formData.sectionD, roleFinancier: c } })
                          }
                        />
                        <Checkbox
                          label="Permanent employee"
                          checked={formData.sectionD.rolePermanent}
                          onChange={(c) =>
                            updateFormData({ sectionD: { ...formData.sectionD, rolePermanent: c } })
                          }
                        />
                        <Checkbox
                          label="Temporary employee"
                          checked={formData.sectionD.roleTemporary}
                          onChange={(c) =>
                            updateFormData({ sectionD: { ...formData.sectionD, roleTemporary: c } })
                          }
                        />
                        <Checkbox
                          label="Cooperative member"
                          checked={formData.sectionD.roleCooperative}
                          onChange={(c) =>
                            updateFormData({ sectionD: { ...formData.sectionD, roleCooperative: c } })
                          }
                        />
                        <Checkbox
                          label="Other"
                          checked={formData.sectionD.roleOther}
                          onChange={(c) =>
                            updateFormData({ sectionD: { ...formData.sectionD, roleOther: c } })
                          }
                        />
                        {formData.sectionD.roleOther && (
                          <input
                            type="text"
                            placeholder="Specify"
                            value={formData.sectionD.roleOtherSpecify}
                            onChange={(e) =>
                              updateFormData({
                                sectionD: { ...formData.sectionD, roleOtherSpecify: e.target.value },
                              })
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs focus:border-[#63b849] outline-none ml-6"
                          />
                        )}
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      <select
                        value={formData.sectionD.yearsExperience}
                        onChange={(e) =>
                          updateFormData({
                            sectionD: { ...formData.sectionD, yearsExperience: e.target.value },
                          })
                        }
                        className="px-3 py-2 border border-gray-300 rounded-lg text-xs focus:border-[#63b849] outline-none"
                      >
                        <option value="">Years exp.</option>
                        <option value="1-2">1–2</option>
                        <option value="3-5">3–5</option>
                        <option value="5-10">5–10</option>
                        <option value="10+">10+</option>
                      </select>
                      <input
                        type="number"
                        placeholder="Permanent emp."
                        min="0"
                        value={formData.sectionD.employeesPermanent}
                        onChange={(e) =>
                          updateFormData({
                            sectionD: { ...formData.sectionD, employeesPermanent: e.target.value },
                          })
                        }
                        className="px-3 py-2 border border-gray-300 rounded-lg text-xs focus:border-[#63b849] outline-none"
                      />
                      <input
                        type="number"
                        placeholder="Temp emp."
                        min="0"
                        value={formData.sectionD.employeesTemporary}
                        onChange={(e) =>
                          updateFormData({
                            sectionD: { ...formData.sectionD, employeesTemporary: e.target.value },
                          })
                        }
                        className="px-3 py-2 border border-gray-300 rounded-lg text-xs focus:border-[#63b849] outline-none"
                      />
                    </div>
                  </>
                )}
              </div>
            )}

            {currentStep === 4 && (
              <div className="space-y-4">
                <textarea
                  required
                  placeholder="Business description *"
                  value={formData.sectionE.businessDescription}
                  onChange={(e) =>
                    updateFormData({
                      sectionE: { ...formData.sectionE, businessDescription: e.target.value },
                    })
                  }
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs focus:border-[#63b849] outline-none"
                />
                <textarea
                  required
                  placeholder="Target customers *"
                  value={formData.sectionE.targetCustomers}
                  onChange={(e) =>
                    updateFormData({
                      sectionE: { ...formData.sectionE, targetCustomers: e.target.value },
                    })
                  }
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs focus:border-[#63b849] outline-none"
                />
                <textarea
                  placeholder="Major suppliers"
                  value={formData.sectionE.majorSuppliers}
                  onChange={(e) =>
                    updateFormData({
                      sectionE: { ...formData.sectionE, majorSuppliers: e.target.value },
                    })
                  }
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs focus:border-[#63b849] outline-none"
                />
                <textarea
                  placeholder="Partners"
                  value={formData.sectionE.partners}
                  onChange={(e) =>
                    updateFormData({
                      sectionE: { ...formData.sectionE, partners: e.target.value },
                    })
                  }
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs focus:border-[#63b849] outline-none"
                />
                <textarea
                  placeholder="Target market"
                  value={formData.sectionE.targetMarket}
                  onChange={(e) =>
                    updateFormData({
                      sectionE: { ...formData.sectionE, targetMarket: e.target.value },
                    })
                  }
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs focus:border-[#63b849] outline-none"
                />
              </div>
            )}

            {currentStep === 5 && (
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <label className="block text-xs font-bold mb-2">Business plan? *</label>
                  <div className="flex gap-4">
                    {["yes", "no"].map((val) => (
                      <label key={val} className="flex items-center gap-2">
                        <input
                          type="radio"
                          value={val}
                          checked={formData.sectionF.hasBusinessPlan === val}
                          onChange={(e) =>
                            updateFormData({
                              sectionF: { ...formData.sectionF, hasBusinessPlan: e.target.value },
                            })
                          }
                          className="sr-only"
                        />
                        <span
                          className={`w-4 h-4 rounded-full border-2 ${
                            formData.sectionF.hasBusinessPlan === val
                              ? "border-[#63b849] bg-[#63b849]"
                              : "border-gray-300"
                          }`}
                        />
                        <span className="text-xs">{val === "yes" ? "Yes" : "No"}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <textarea
                  required
                  placeholder="Growth plans (next 3 years) *"
                  value={formData.sectionF.growthPlans}
                  onChange={(e) =>
                    updateFormData({
                      sectionF: { ...formData.sectionF, growthPlans: e.target.value },
                    })
                  }
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs focus:border-[#63b849] outline-none"
                />
              </div>
            )}

            {currentStep === 6 && (
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <label className="block text-xs font-bold mb-2">Join UDAN network? *</label>
                  <div className="flex gap-4 mb-2">
                    {["yes", "no"].map((val) => (
                      <label key={val} className="flex items-center gap-2">
                        <input
                          type="radio"
                          value={val}
                          checked={formData.sectionG.joinNetwork === val}
                          onChange={(e) =>
                            updateFormData({
                              sectionG: { ...formData.sectionG, joinNetwork: e.target.value },
                            })
                          }
                          className="sr-only"
                        />
                        <span
                          className={`w-4 h-4 rounded-full border-2 ${
                            formData.sectionG.joinNetwork === val
                              ? "border-[#63b849] bg-[#63b849]"
                              : "border-gray-300"
                          }`}
                        />
                        <span className="text-xs">{val === "yes" ? "Yes" : "No"}</span>
                      </label>
                    ))}
                  </div>
                  {formData.sectionG.joinNetwork && (
                    <textarea
                      placeholder={
                        formData.sectionG.joinNetwork === "yes" ? "Your expectations" : "Why not interested"
                      }
                      value={formData.sectionG.networkExpectations}
                      onChange={(e) =>
                        updateFormData({
                          sectionG: { ...formData.sectionG, networkExpectations: e.target.value },
                        })
                      }
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs focus:border-[#63b849] outline-none mt-2"
                    />
                  )}
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <label className="block text-xs font-bold mb-2">Willing to invest?</label>
                  <div className="flex gap-4 mb-2">
                    {["yes", "no"].map((val) => (
                      <label key={val} className="flex items-center gap-2">
                        <input
                          type="radio"
                          value={val}
                          checked={formData.sectionG.willingInvest === val}
                          onChange={(e) =>
                            updateFormData({
                              sectionG: { ...formData.sectionG, willingInvest: e.target.value },
                            })
                          }
                          className="sr-only"
                        />
                        <span
                          className={`w-4 h-4 rounded-full border-2 ${
                            formData.sectionG.willingInvest === val
                              ? "border-[#63b849] bg-[#63b849]"
                              : "border-gray-300"
                          }`}
                        />
                        <span className="text-xs">{val === "yes" ? "Yes" : "No"}</span>
                      </label>
                    ))}
                  </div>
                  {formData.sectionG.willingInvest === "yes" && (
                    <div className="space-y-2 mt-2">
                      <Checkbox
                        label="Crop"
                        checked={formData.sectionG.investSubsectorCrop}
                        onChange={(c) =>
                          updateFormData({
                            sectionG: { ...formData.sectionG, investSubsectorCrop: c },
                          })
                        }
                      />
                      <Checkbox
                        label="Livestock"
                        checked={formData.sectionG.investSubsectorLivestock}
                        onChange={(c) =>
                          updateFormData({
                            sectionG: { ...formData.sectionG, investSubsectorLivestock: c },
                          })
                        }
                      />
                      <Checkbox
                        label="Fish"
                        checked={formData.sectionG.investSubsectorFish}
                        onChange={(c) =>
                          updateFormData({
                            sectionG: { ...formData.sectionG, investSubsectorFish: c },
                          })
                        }
                      />
                      <Checkbox
                        label="Forestry"
                        checked={formData.sectionG.investSubsectorForestry}
                        onChange={(c) =>
                          updateFormData({
                            sectionG: { ...formData.sectionG, investSubsectorForestry: c },
                          })
                        }
                      />
                      <Checkbox
                        label="Agritech"
                        checked={formData.sectionG.investSubsectorTech}
                        onChange={(c) =>
                          updateFormData({
                            sectionG: { ...formData.sectionG, investSubsectorTech: c },
                          })
                        }
                      />
                    </div>
                  )}
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <label className="block text-xs font-bold mb-2">Collaboration interest?</label>
                  <div className="flex gap-4 mb-2">
                    {["yes", "no"].map((val) => (
                      <label key={val} className="flex items-center gap-2">
                        <input
                          type="radio"
                          value={val}
                          checked={formData.sectionG.interestCollaboration === val}
                          onChange={(e) =>
                            updateFormData({
                              sectionG: { ...formData.sectionG, interestCollaboration: e.target.value },
                            })
                          }
                          className="sr-only"
                        />
                        <span
                          className={`w-4 h-4 rounded-full border-2 ${
                            formData.sectionG.interestCollaboration === val
                              ? "border-[#63b849] bg-[#63b849]"
                              : "border-gray-300"
                          }`}
                        />
                        <span className="text-xs">{val === "yes" ? "Yes" : "No"}</span>
                      </label>
                    ))}
                  </div>
                  {formData.sectionG.interestCollaboration === "yes" && (
                    <div className="space-y-2 mt-2">
                      <Checkbox
                        label="Supplier access"
                        checked={formData.sectionG.collabSuppliers}
                        onChange={(c) =>
                          updateFormData({
                            sectionG: { ...formData.sectionG, collabSuppliers: c },
                          })
                        }
                      />
                      <Checkbox
                        label="Customer identification"
                        checked={formData.sectionG.collabCustomers}
                        onChange={(c) =>
                          updateFormData({
                            sectionG: { ...formData.sectionG, collabCustomers: c },
                          })
                        }
                      />
                      <Checkbox
                        label="Youth monitoring support"
                        checked={formData.sectionG.collabYouthMonitoring}
                        onChange={(c) =>
                          updateFormData({
                            sectionG: { ...formData.sectionG, collabYouthMonitoring: c },
                          })
                        }
                      />
                      <Checkbox
                        label="Community investment"
                        checked={formData.sectionG.collabCommunityInvestment}
                        onChange={(c) =>
                          updateFormData({
                            sectionG: { ...formData.sectionG, collabCommunityInvestment: c },
                          })
                        }
                      />
                      <Checkbox
                        label="Mentorship"
                        checked={formData.sectionG.collabMentorship}
                        onChange={(c) =>
                          updateFormData({
                            sectionG: { ...formData.sectionG, collabMentorship: c },
                          })
                        }
                      />
                    </div>
                  )}
                </div>
              </div>
            )}

            {currentStep === 7 && (
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <label className="block text-xs font-bold mb-2">Willing to mentor? *</label>
                  <div className="flex gap-4">
                    {["yes", "no"].map((val) => (
                      <label key={val} className="flex items-center gap-2">
                        <input
                          type="radio"
                          value={val}
                          checked={formData.sectionG.willingMentor === val}
                          onChange={(e) =>
                            updateFormData({
                              sectionG: { ...formData.sectionG, willingMentor: e.target.value },
                            })
                          }
                          className="sr-only"
                        />
                        <span
                          className={`w-4 h-4 rounded-full border-2 ${
                            formData.sectionG.willingMentor === val
                              ? "border-[#63b849] bg-[#63b849]"
                              : "border-gray-300"
                          }`}
                        />
                        <span className="text-xs">{val === "yes" ? "Yes" : "No"}</span>
                      </label>
                    ))}
                  </div>
                </div>
                {formData.sectionG.willingMentor === "yes" && (
                  <>
                    <select
                      value={formData.sectionG.mentorSubsector}
                      onChange={(e) =>
                        updateFormData({
                          sectionG: { ...formData.sectionG, mentorSubsector: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs focus:border-[#63b849] outline-none"
                    >
                      <option value="">Subsector</option>
                      <option value="Crop">Crop</option>
                      <option value="Livestock">Livestock</option>
                      <option value="Fish">Fish</option>
                      <option value="Forestry">Forestry</option>
                      <option value="Agritech">Agritech</option>
                    </select>
                    <div>
                      <label className="text-xs font-bold block mb-2">Areas of engagement</label>
                      <div className="space-y-2">
                        <Checkbox
                          label="Crop prod."
                          checked={formData.sectionG.mentorEngagementCrop}
                          onChange={(c) =>
                            updateFormData({
                              sectionG: { ...formData.sectionG, mentorEngagementCrop: c },
                            })
                          }
                        />
                        <Checkbox
                          label="Processing"
                          checked={formData.sectionG.mentorEngagementProcessing}
                          onChange={(c) =>
                            updateFormData({
                              sectionG: { ...formData.sectionG, mentorEngagementProcessing: c },
                            })
                          }
                        />
                        <Checkbox
                          label="Management"
                          checked={formData.sectionG.mentorEngagementManagement}
                          onChange={(c) =>
                            updateFormData({
                              sectionG: { ...formData.sectionG, mentorEngagementManagement: c },
                            })
                          }
                        />
                        <Checkbox
                          label="Market access"
                          checked={formData.sectionG.mentorEngagementMarket}
                          onChange={(c) =>
                            updateFormData({
                              sectionG: { ...formData.sectionG, mentorEngagementMarket: c },
                            })
                          }
                        />
                        <Checkbox
                          label="Staff mgmt"
                          checked={formData.sectionG.mentorEngagementStaff}
                          onChange={(c) =>
                            updateFormData({
                              sectionG: { ...formData.sectionG, mentorEngagementStaff: c },
                            })
                          }
                        />
                        <Checkbox
                          label="Tech"
                          checked={formData.sectionG.mentorEngagementTech}
                          onChange={(c) =>
                            updateFormData({
                              sectionG: { ...formData.sectionG, mentorEngagementTech: c },
                            })
                          }
                        />
                      </div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <label className="block text-xs font-bold mb-2">Past mentorship?</label>
                      <div className="flex gap-4">
                        {["yes", "no"].map((val) => (
                          <label key={val} className="flex items-center gap-2">
                            <input
                              type="radio"
                              value={val}
                              checked={formData.sectionG.pastMentorship === val}
                              onChange={(e) =>
                                updateFormData({
                                  sectionG: { ...formData.sectionG, pastMentorship: e.target.value },
                                })
                              }
                              className="sr-only"
                            />
                            <span
                              className={`w-4 h-4 rounded-full border-2 ${
                                formData.sectionG.pastMentorship === val
                                  ? "border-[#63b849] bg-[#63b849]"
                                  : "border-gray-300"
                              }`}
                            />
                            <span className="text-xs">{val === "yes" ? "Yes" : "No"}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                    <select
                      value={formData.sectionG.mentorshipFrequency}
                      onChange={(e) =>
                        updateFormData({
                          sectionG: { ...formData.sectionG, mentorshipFrequency: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs focus:border-[#63b849] outline-none"
                    >
                      <option value="">Engagement type</option>
                      <option value="in-person">In-person</option>
                      <option value="online">Online</option>
                      <option value="both">Both</option>
                    </select>
                    <select
                      value={formData.sectionG.mentorshipHours}
                      onChange={(e) =>
                        updateFormData({
                          sectionG: { ...formData.sectionG, mentorshipHours: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs focus:border-[#63b849] outline-none"
                    >
                      <option value="">Hours/month</option>
                      <option value="1-2">1–2</option>
                      <option value="3-4">3–4</option>
                      <option value="5-6">5–6</option>
                      <option value="7+">7+</option>
                    </select>
                  </>
                )}
              </div>
            )}

            {currentStep === 8 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold mb-1">Business Plan (PDF/Word)</label>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        updateFormData({
                          sectionHI: {
                            ...formData.sectionHI,
                            businessPlanFile: file,
                            businessPlanFileName: file.name,
                          },
                        });
                      }
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs focus:border-[#63b849] outline-none"
                  />
                  {formData.sectionHI.businessPlanFileName && (
                    <p className="text-xs text-gray-600 mt-1">📎 {formData.sectionHI.businessPlanFileName}</p>
                  )}
                </div>
                <div>
                  <label className="block text-xs font-bold mb-1">Other Documents (Multiple)</label>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx,.xls,.xlsx"
                    multiple
                    onChange={(e) => {
                      const files = e.target.files;
                      if (files) {
                        const newDocs = Array.from(files).map((file) => ({
                          file,
                          name: file.name,
                        }));
                        updateFormData({
                          sectionHI: {
                            ...formData.sectionHI,
                            otherDocuments: [...formData.sectionHI.otherDocuments, ...newDocs],
                          },
                        });
                        // Reset input
                        e.target.value = "";
                      }
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs focus:border-[#63b849] outline-none"
                  />
                  <p className="text-xs text-gray-500 mt-1">You can select multiple files at once</p>
                  {formData.sectionHI.otherDocuments.length > 0 && (
                    <div className="mt-2 space-y-1">
                      {formData.sectionHI.otherDocuments.map((doc, idx) => (
                        <div key={idx} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                          <span className="text-xs text-gray-600">📎 {doc.name}</span>
                          <button
                            type="button"
                            onClick={() => {
                              updateFormData({
                                sectionHI: {
                                  ...formData.sectionHI,
                                  otherDocuments: formData.sectionHI.otherDocuments.filter((_, i) => i !== idx),
                                },
                              });
                            }}
                            className="text-xs text-red-600 hover:text-red-800 font-semibold"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <input
                  type="url"
                  placeholder="Website URL"
                  value={formData.sectionHI.websiteUrl}
                  onChange={(e) =>
                    updateFormData({
                      sectionHI: { ...formData.sectionHI, websiteUrl: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs focus:border-[#63b849] outline-none"
                />
                <textarea
                  placeholder="Useful links (one per line)"
                  value={formData.sectionHI.usefulLinks}
                  onChange={(e) =>
                    updateFormData({
                      sectionHI: { ...formData.sectionHI, usefulLinks: e.target.value },
                    })
                  }
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs focus:border-[#63b849] outline-none"
                />
              </div>
            )}

            <div className="flex gap-3 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={handlePrevious}
                disabled={currentStep === 0}
                className="flex-1 px-4 py-2 border border-gray-300 text-[#1b2238] text-xs font-bold rounded-full hover:bg-gray-50 disabled:opacity-50"
              >
                Previous
              </button>
              <button
                type="button"
                onClick={handleSaveContinueLater}
                className="flex-1 px-4 py-2 border border-[#63b849] text-[#63b849] text-xs font-bold rounded-full hover:bg-[#f0f9ed]"
              >
                {saveStatus === "saved" ? "✓ Saved" : "Save & Continue Later"}
              </button>
              {currentStep === steps.length - 1 ? (
                <button
                  type="submit"
                  disabled={submitStatus === "loading"}
                  className="flex-1 px-4 py-2 bg-[#63b849] text-white text-xs font-bold rounded-full hover:bg-[#558c3d] disabled:opacity-50"
                >
                  {submitStatus === "loading" ? "Submitting..." : "Submit"}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleNext}
                  className="flex-1 px-4 py-2 bg-[#63b849] text-white text-xs font-bold rounded-full hover:bg-[#558c3d]"
                >
                  Next
                </button>
              )}
            </div>

            {submitMessage && (
              <div
                className={`p-3 rounded-lg text-xs font-semibold ${
                  submitStatus === "error"
                    ? "bg-red-50 text-red-700 border border-red-200"
                    : "bg-blue-50 text-blue-700 border border-blue-200"
                }`}
              >
                {submitMessage}
              </div>
            )}
          </form>
        </div>
      )}
    </div>
  );
}
