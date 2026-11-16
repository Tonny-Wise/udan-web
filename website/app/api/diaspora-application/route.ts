import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: NextRequest) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const body = await req.json();
    const {
      sectionA,
      sectionB,
      sectionC,
      sectionD,
      sectionE,
      sectionF,
      sectionG,
      sectionHI,
      businessPlanUrl,
      otherDocumentsUrl,
    } = body;

    // Validate required fields
    if (!sectionA?.email || !sectionA?.fullName) {
      return NextResponse.json(
        { error: "Name and email are required" },
        { status: 400 }
      );
    }

    // Insert into members table
    const { error: dbError } = await supabase.from("members").insert({
      // Section A
      full_name: sectionA.fullName,
      surname: sectionA.surname,
      date_of_birth: sectionA.dateOfBirth || null,
      gender: sectionA.gender || null,
      address: sectionA.address || null,
      email: sectionA.email,
      phone: sectionA.phone,
      country: sectionA.country,
      home_district: sectionA.homeDistrict || null,
      diaspora_association: sectionA.diasporaAssociation || null,
      diaspora_network: sectionA.diasporaNetwork === "yes",
      diaspora_network_name: sectionA.diasporaNetworkName || null,
      agribusiness_network: sectionA.agribusinessNetwork === "yes",
      agribusiness_network_name: sectionA.agribusinessNetworkName || null,
      // Section B
      education_level: sectionB.educationLevel || null,
      agriculture_training: sectionB.agricultureTraining || null,
      // Section C
      expertise_crop: sectionC.expertiseCrop,
      expertise_livestock: sectionC.expertiseLivestock,
      expertise_aquaculture: sectionC.expertiseAquaculture,
      expertise_horticulture: sectionC.expertiseHorticulture,
      expertise_forestry: sectionC.expertiseForestry,
      expertise_services: sectionC.expertiseServices,
      expertise_services_specify: sectionC.expertiseServicesSpecify || null,
      expertise_other: sectionC.expertiseOther,
      expertise_other_specify: sectionC.expertiseOtherSpecify || null,
      crop_commodity: sectionC.cropCommodity || null,
      // Section D
      has_business: sectionD.hasBusiness === "yes",
      business_name: sectionD.businessName || null,
      business_registration: sectionD.businessRegistration || null,
      business_location_type: sectionD.businessLocationType || null,
      enterprise_type_crop: sectionD.enterpriseTypeCrop,
      enterprise_type_livestock: sectionD.enterpriseTypeLivestock,
      enterprise_type_fish: sectionD.enterpriseTypeFish,
      enterprise_type_forestry: sectionD.enterpriseTypeForestry,
      enterprise_type_tech: sectionD.enterpriseTypeTech,
      enterprise_type_other: sectionD.enterpriseTypeOther,
      enterprise_type_other_specify: sectionD.enterpriseTypeOtherSpecify || null,
      value_chain_production: sectionD.valueChainProduction,
      value_chain_aggregation: sectionD.valueChainAggregation,
      value_chain_processing: sectionD.valueChainProcessing,
      value_chain_distribution: sectionD.valueChainDistribution,
      value_chain_inputs: sectionD.valueChainInputs,
      value_chain_services: sectionD.valueChainServices,
      value_chain_services_specify: sectionD.valueChainServicesSpecify || null,
      role_owner: sectionD.roleOwner,
      role_financier: sectionD.roleFinancier,
      role_permanent: sectionD.rolePermanent,
      role_temporary: sectionD.roleTemporary,
      role_cooperative: sectionD.roleCooperative,
      role_other: sectionD.roleOther,
      role_other_specify: sectionD.roleOtherSpecify || null,
      years_experience: sectionD.yearsExperience || null,
      employees_permanent: sectionD.employeesPermanent
        ? parseInt(sectionD.employeesPermanent)
        : null,
      employees_temporary: sectionD.employeesTemporary
        ? parseInt(sectionD.employeesTemporary)
        : null,
      // Section E
      business_description: sectionE.businessDescription || null,
      target_customers: sectionE.targetCustomers || null,
      major_suppliers: sectionE.majorSuppliers || null,
      partners: sectionE.partners || null,
      target_market: sectionE.targetMarket || null,
      // Section F
      has_business_plan: sectionF.hasBusinessPlan === "yes",
      growth_plans: sectionF.growthPlans || null,
      // Section G
      join_network: sectionG.joinNetwork === "yes",
      network_expectations: sectionG.networkExpectations || null,
      willing_invest: sectionG.willingInvest === "yes",
      invest_subsector_crop: sectionG.investSubsectorCrop,
      invest_subsector_livestock: sectionG.investSubsectorLivestock,
      invest_subsector_fish: sectionG.investSubsectorFish,
      invest_subsector_forestry: sectionG.investSubsectorForestry,
      invest_subsector_tech: sectionG.investSubsectorTech,
      interest_collaboration: sectionG.interestCollaboration === "yes",
      collab_suppliers: sectionG.collabSuppliers,
      collab_customers: sectionG.collabCustomers,
      collab_youth_monitoring: sectionG.collabYouthMonitoring,
      collab_community_investment: sectionG.collabCommunityInvestment,
      collab_mentorship: sectionG.collabMentorship,
      willing_mentor: sectionG.willingMentor === "yes",
      mentor_subsector: sectionG.mentorSubsector || null,
      mentor_engagement_crop: sectionG.mentorEngagementCrop,
      mentor_engagement_processing: sectionG.mentorEngagementProcessing,
      mentor_engagement_management: sectionG.mentorEngagementManagement,
      mentor_engagement_market: sectionG.mentorEngagementMarket,
      mentor_engagement_staff: sectionG.mentorEngagementStaff,
      mentor_engagement_tech: sectionG.mentorEngagementTech,
      past_mentorship: sectionG.pastMentorship === "yes",
      mentorship_hours: sectionG.mentorshipHours || null,
      mentorship_frequency: sectionG.mentorshipFrequency || null,
      // Section H-I
      business_plan_file: businessPlanUrl || null,
      other_documents: otherDocumentsUrl || null,
      useful_links: sectionHI.usefulLinks || null,
      website_url: sectionHI.websiteUrl || null,
      // Metadata
      form_progress: 100,
      form_saved_at: new Date().toISOString(),
      status: "submitted",
    });

    if (dbError) {
      console.error("Database error:", dbError);
      return NextResponse.json(
        { error: "Failed to save application. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Diaspora application API error:", err);
    return NextResponse.json(
      { error: "Failed to submit application. Please try again." },
      { status: 500 }
    );
  }
}
