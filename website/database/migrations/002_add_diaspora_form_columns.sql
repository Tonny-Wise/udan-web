-- Add diaspora form columns to members table
-- Section A: Personal Information
ALTER TABLE members ADD COLUMN IF NOT EXISTS surname VARCHAR(255);
ALTER TABLE members ADD COLUMN IF NOT EXISTS date_of_birth DATE;
ALTER TABLE members ADD COLUMN IF NOT EXISTS gender VARCHAR(50);
ALTER TABLE members ADD COLUMN IF NOT EXISTS address TEXT;
ALTER TABLE members ADD COLUMN IF NOT EXISTS home_district VARCHAR(255);
ALTER TABLE members ADD COLUMN IF NOT EXISTS diaspora_association VARCHAR(255);
ALTER TABLE members ADD COLUMN IF NOT EXISTS diaspora_network BOOLEAN DEFAULT false;
ALTER TABLE members ADD COLUMN IF NOT EXISTS diaspora_network_name VARCHAR(255);
ALTER TABLE members ADD COLUMN IF NOT EXISTS agribusiness_network BOOLEAN DEFAULT false;
ALTER TABLE members ADD COLUMN IF NOT EXISTS agribusiness_network_name VARCHAR(255);

-- Section B: Education and Training
ALTER TABLE members ADD COLUMN IF NOT EXISTS education_level VARCHAR(255);
ALTER TABLE members ADD COLUMN IF NOT EXISTS agriculture_training TEXT;

-- Section C: Expertise
ALTER TABLE members ADD COLUMN IF NOT EXISTS expertise_crop BOOLEAN DEFAULT false;
ALTER TABLE members ADD COLUMN IF NOT EXISTS expertise_livestock BOOLEAN DEFAULT false;
ALTER TABLE members ADD COLUMN IF NOT EXISTS expertise_aquaculture BOOLEAN DEFAULT false;
ALTER TABLE members ADD COLUMN IF NOT EXISTS expertise_horticulture BOOLEAN DEFAULT false;
ALTER TABLE members ADD COLUMN IF NOT EXISTS expertise_forestry BOOLEAN DEFAULT false;
ALTER TABLE members ADD COLUMN IF NOT EXISTS expertise_services BOOLEAN DEFAULT false;
ALTER TABLE members ADD COLUMN IF NOT EXISTS expertise_services_specify VARCHAR(255);
ALTER TABLE members ADD COLUMN IF NOT EXISTS expertise_other BOOLEAN DEFAULT false;
ALTER TABLE members ADD COLUMN IF NOT EXISTS expertise_other_specify VARCHAR(255);
ALTER TABLE members ADD COLUMN IF NOT EXISTS crop_commodity VARCHAR(255);

-- Section D: Business Description
ALTER TABLE members ADD COLUMN IF NOT EXISTS has_business BOOLEAN DEFAULT false;
ALTER TABLE members ADD COLUMN IF NOT EXISTS business_name VARCHAR(255);
ALTER TABLE members ADD COLUMN IF NOT EXISTS business_registration VARCHAR(255);
ALTER TABLE members ADD COLUMN IF NOT EXISTS business_location_type VARCHAR(50);
ALTER TABLE members ADD COLUMN IF NOT EXISTS enterprise_type_crop BOOLEAN DEFAULT false;
ALTER TABLE members ADD COLUMN IF NOT EXISTS enterprise_type_livestock BOOLEAN DEFAULT false;
ALTER TABLE members ADD COLUMN IF NOT EXISTS enterprise_type_fish BOOLEAN DEFAULT false;
ALTER TABLE members ADD COLUMN IF NOT EXISTS enterprise_type_forestry BOOLEAN DEFAULT false;
ALTER TABLE members ADD COLUMN IF NOT EXISTS enterprise_type_tech BOOLEAN DEFAULT false;
ALTER TABLE members ADD COLUMN IF NOT EXISTS enterprise_type_other BOOLEAN DEFAULT false;
ALTER TABLE members ADD COLUMN IF NOT EXISTS enterprise_type_other_specify VARCHAR(255);
ALTER TABLE members ADD COLUMN IF NOT EXISTS value_chain_production BOOLEAN DEFAULT false;
ALTER TABLE members ADD COLUMN IF NOT EXISTS value_chain_aggregation BOOLEAN DEFAULT false;
ALTER TABLE members ADD COLUMN IF NOT EXISTS value_chain_processing BOOLEAN DEFAULT false;
ALTER TABLE members ADD COLUMN IF NOT EXISTS value_chain_distribution BOOLEAN DEFAULT false;
ALTER TABLE members ADD COLUMN IF NOT EXISTS value_chain_inputs BOOLEAN DEFAULT false;
ALTER TABLE members ADD COLUMN IF NOT EXISTS value_chain_services BOOLEAN DEFAULT false;
ALTER TABLE members ADD COLUMN IF NOT EXISTS value_chain_services_specify VARCHAR(255);
ALTER TABLE members ADD COLUMN IF NOT EXISTS role_owner BOOLEAN DEFAULT false;
ALTER TABLE members ADD COLUMN IF NOT EXISTS role_financier BOOLEAN DEFAULT false;
ALTER TABLE members ADD COLUMN IF NOT EXISTS role_permanent BOOLEAN DEFAULT false;
ALTER TABLE members ADD COLUMN IF NOT EXISTS role_temporary BOOLEAN DEFAULT false;
ALTER TABLE members ADD COLUMN IF NOT EXISTS role_cooperative BOOLEAN DEFAULT false;
ALTER TABLE members ADD COLUMN IF NOT EXISTS role_other BOOLEAN DEFAULT false;
ALTER TABLE members ADD COLUMN IF NOT EXISTS role_other_specify VARCHAR(255);
ALTER TABLE members ADD COLUMN IF NOT EXISTS years_experience VARCHAR(50);
ALTER TABLE members ADD COLUMN IF NOT EXISTS employees_permanent INTEGER;
ALTER TABLE members ADD COLUMN IF NOT EXISTS employees_temporary INTEGER;

-- Section E: Business and Operating Model
ALTER TABLE members ADD COLUMN IF NOT EXISTS business_description TEXT;
ALTER TABLE members ADD COLUMN IF NOT EXISTS target_customers TEXT;
ALTER TABLE members ADD COLUMN IF NOT EXISTS major_suppliers TEXT;
ALTER TABLE members ADD COLUMN IF NOT EXISTS partners TEXT;
ALTER TABLE members ADD COLUMN IF NOT EXISTS target_market TEXT;

-- Section F: Strategy and Future Plans
ALTER TABLE members ADD COLUMN IF NOT EXISTS has_business_plan BOOLEAN DEFAULT false;
ALTER TABLE members ADD COLUMN IF NOT EXISTS growth_plans TEXT;

-- Section G: Motivating Areas of Interest
ALTER TABLE members ADD COLUMN IF NOT EXISTS join_network BOOLEAN DEFAULT false;
ALTER TABLE members ADD COLUMN IF NOT EXISTS network_expectations TEXT;
ALTER TABLE members ADD COLUMN IF NOT EXISTS willing_invest BOOLEAN DEFAULT false;
ALTER TABLE members ADD COLUMN IF NOT EXISTS invest_subsector_crop BOOLEAN DEFAULT false;
ALTER TABLE members ADD COLUMN IF NOT EXISTS invest_subsector_livestock BOOLEAN DEFAULT false;
ALTER TABLE members ADD COLUMN IF NOT EXISTS invest_subsector_fish BOOLEAN DEFAULT false;
ALTER TABLE members ADD COLUMN IF NOT EXISTS invest_subsector_forestry BOOLEAN DEFAULT false;
ALTER TABLE members ADD COLUMN IF NOT EXISTS invest_subsector_tech BOOLEAN DEFAULT false;
ALTER TABLE members ADD COLUMN IF NOT EXISTS interest_collaboration BOOLEAN DEFAULT false;
ALTER TABLE members ADD COLUMN IF NOT EXISTS collab_suppliers BOOLEAN DEFAULT false;
ALTER TABLE members ADD COLUMN IF NOT EXISTS collab_customers BOOLEAN DEFAULT false;
ALTER TABLE members ADD COLUMN IF NOT EXISTS collab_youth_monitoring BOOLEAN DEFAULT false;
ALTER TABLE members ADD COLUMN IF NOT EXISTS collab_community_investment BOOLEAN DEFAULT false;
ALTER TABLE members ADD COLUMN IF NOT EXISTS collab_mentorship BOOLEAN DEFAULT false;
ALTER TABLE members ADD COLUMN IF NOT EXISTS willing_mentor BOOLEAN DEFAULT false;
ALTER TABLE members ADD COLUMN IF NOT EXISTS mentor_subsector VARCHAR(255);
ALTER TABLE members ADD COLUMN IF NOT EXISTS mentor_engagement_crop BOOLEAN DEFAULT false;
ALTER TABLE members ADD COLUMN IF NOT EXISTS mentor_engagement_processing BOOLEAN DEFAULT false;
ALTER TABLE members ADD COLUMN IF NOT EXISTS mentor_engagement_management BOOLEAN DEFAULT false;
ALTER TABLE members ADD COLUMN IF NOT EXISTS mentor_engagement_market BOOLEAN DEFAULT false;
ALTER TABLE members ADD COLUMN IF NOT EXISTS mentor_engagement_staff BOOLEAN DEFAULT false;
ALTER TABLE members ADD COLUMN IF NOT EXISTS mentor_engagement_tech BOOLEAN DEFAULT false;
ALTER TABLE members ADD COLUMN IF NOT EXISTS past_mentorship BOOLEAN DEFAULT false;
ALTER TABLE members ADD COLUMN IF NOT EXISTS mentorship_hours VARCHAR(50);
ALTER TABLE members ADD COLUMN IF NOT EXISTS mentorship_frequency VARCHAR(50);

-- Section H-I: Files and Links
ALTER TABLE members ADD COLUMN IF NOT EXISTS business_plan_file VARCHAR(255);
ALTER TABLE members ADD COLUMN IF NOT EXISTS other_documents VARCHAR(255);
ALTER TABLE members ADD COLUMN IF NOT EXISTS useful_links TEXT;
ALTER TABLE members ADD COLUMN IF NOT EXISTS website_url VARCHAR(255);

-- Metadata
ALTER TABLE members ADD COLUMN IF NOT EXISTS form_progress INTEGER DEFAULT 0;
ALTER TABLE members ADD COLUMN IF NOT EXISTS form_saved_at TIMESTAMP;

-- Create storage bucket for diaspora forms
-- Note: This would typically be done via Supabase dashboard
-- INSERT INTO storage.buckets (id, name, public)
-- VALUES ('diaspora-forms', 'diaspora-forms', true)
-- ON CONFLICT (id) DO NOTHING;
