import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import * as Icons from 'lucide-react';
import { TIMELINE_STEPS, TERMS_DATA, DOCUMENTS_DATA } from './data';
import { StoreCategory, BusinessStructure, PropertyType, PhilippineRegion } from './types';
import Timeline from './components/Timeline';
import TermsBreakdown from './components/TermsBreakdown';
import DocumentChecklist from './components/DocumentChecklist';
import QuickEstimator, { REGION_DETAILS } from './components/QuickEstimator';

interface WizardStep {
  id: number;
  label: string;
  short: string;
  desc: string;
  iconName: keyof typeof Icons;
  colorClass: string;
  badgeText: string;
}

export default function App() {
  // Master Configuration States
  const [propertyType, setPropertyType] = useState<PropertyType>('mall');
  const [category, setCategory] = useState<StoreCategory>('cafe');
  const [structure, setStructure] = useState<BusinessStructure>('corporate');
  const [region, setRegion] = useState<PhilippineRegion>('bgc');
  const [specificPlace, setSpecificPlace] = useState<string>('Parklinks Mall');
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  // Wizard Navigation State
  const [currentWizardStep, setCurrentWizardStep] = useState<number>(1);

  // Show Export simulated PDF Modal
  const [showExportModal, setShowExportModal] = useState<boolean>(false);

  // Synced profile reset helper
  const handlePropertyTypeChange = (type: PropertyType) => {
    setPropertyType(type);
    setActiveStepIndex(0); // Reset timeline active step
    if (type === 'mall') {
      setCategory('cafe');
    } else {
      setCategory('corp_hq');
    }
  };

  const getProfileTitle = () => {
    const constitutionText = structure === 'corporate' ? 'Corporate SEC' : 'Sole Proprietor';
    const locationText = specificPlace || 'Parklinks Mall';
    switch (category) {
      case 'cafe': return `Cafe Space in ${locationText} (${constitutionText})`;
      case 'fashion': return `Fashion Retail in ${locationText} (${constitutionText})`;
      case 'electronics': return `Electronics Outlet in ${locationText} (${constitutionText})`;
      case 'kiosk': return `Mall Kiosk in ${locationText} (${constitutionText})`;
      case 'corp_hq': return `Corporate Headquarters in ${locationText} (${constitutionText})`;
      case 'coworking': return `Co-working Space in ${locationText} (${constitutionText})`;
      case 'medical': return `Medical Clinic in ${locationText} (${constitutionText})`;
      case 'bpo': return `BPO Hub in ${locationText} (${constitutionText})`;
      default: return `Tenancy Profile (${constitutionText})`;
    }
  };

  const downloadBlueprintFile = () => {
    const formattedDate = new Date().toLocaleDateString('en-US', {
      month: '2-digit', day: '2-digit', year: 'numeric'
    });

    const categoryText = getCategoryText(category);
    const sectorText = propertyType === 'mall' ? 'Mall Unit tenancy layout' : 'Commercial Office block';
    const constitutionalText = structure === 'corporate' ? 'SEC Stock Corporation (Subject to VAT / 5% EWT Form 2307)' : 'Individual Sole Proprietor DTI model';
    const locationName = specificPlace || 'Parklinks Mall';

    const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Acquisitions Advisory Blueprint - \${locationName}</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    @media print {
      body {
        background-color: white !important;
        color: black !important;
      }
      .no-print {
        display: none !important;
      }
    }
  </style>
</head>
<body class="bg-slate-50 text-slate-800 p-8 font-sans max-w-3xl mx-auto">
  <div class="no-print bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-xl p-4 mb-6 text-xs flex justify-between items-center shadow-xs">
    <div>
      <h4 class="font-bold">🖥️ Print-Ready Advisory Dossier Downloaded</h4>
      <p class="text-emerald-800 mt-0.5">This file automatically prepares your system print & save-as-PDF flow. If it didn't open automatically, please click the button on the right.</p>
    </div>
    <button onclick="window.print()" class="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2 rounded-lg text-xs transition-colors">
      Print / Save PDF
    </button>
  </div>

  <div class="bg-white border border-slate-300 p-10 shadow-lg rounded-2xl relative space-y-8 text-sm text-slate-800">
    
    <!-- Approved Stamp -->
    <div style="position: absolute; top: 2rem; right: 2rem; border: 4px solid rgba(16, 185, 129, 0.3); color: rgba(5, 150, 105, 0.4); font-family: monospace; font-size: 11px; font-weight: 800; padding: 0.25rem 0.75rem; transform: rotate(12deg); border-radius: 4px;">
      APPROVED BLUEPRINT
    </div>

    <!-- Header Block -->
    <div class="border-b-2 border-slate-800 pb-6 flex justify-between items-start">
      <div>
        <h1 class="text-lg font-extrabold text-slate-900 tracking-wider">
          VIRTUAL STUDIOS PH REALTORS
        </h1>
        <p class="text-xs font-mono font-bold text-slate-400 uppercase mt-0.5 tracking-wider">
          Philippines Tenancy Assessment & Compliance Brief
        </p>
        <p class="text-xs text-slate-500 mt-1">Ref: PK-VS-967D88</p>
      </div>
      <div class="text-right font-mono text-xs text-slate-600">
        <div>Generated: \${formattedDate}</div>
        <div>System: Navigator v3.4.1</div>
      </div>
    </div>

    <!-- Category Profile -->
    <div>
      <h2 class="text-sm font-bold text-slate-950 uppercase border-b border-slate-200 pb-1.5 mb-3">
        1. Client Tenancy Profile
      </h2>
      <table class="w-full text-left text-slate-600 border-collapse text-xs">
        <tbody>
          <tr class="border-b border-slate-100">
            <td class="py-2.5 font-bold text-slate-800 w-1/3">Target Business Concept:</td>
            <td class="py-2.5 text-slate-700">\${categoryText}</td>
          </tr>
          <tr class="border-b border-slate-100">
            <td class="py-2.5 font-bold text-slate-800">Acquisition Property Sector:</td>
            <td class="py-2.5 uppercase text-slate-700">\${sectorText}</td>
          </tr>
          <tr class="border-b border-slate-100">
            <td class="py-2.5 font-bold text-slate-800">Specific Location:</td>
            <td class="py-2.5 text-slate-705 font-bold text-slate-900">\${locationName}</td>
          </tr>
          <tr>
            <td class="py-2.5 font-bold text-slate-800">Company Constitutional Model:</td>
            <td class="py-2.5 uppercase text-slate-700">\${constitutionalText}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Financial Breakdown -->
    <div>
      <h2 class="text-sm font-bold text-slate-950 uppercase border-b border-slate-200 pb-1.5 mb-3">
        2. Pro-forma Lease Billings (1st Year)
      </h2>
      <table class="w-full text-right border-collapse text-xs">
        <thead>
          <tr class="border-b border-slate-800 font-bold text-slate-800">
            <th class="py-2 text-left">Lease Allocation Item</th>
            <th class="py-2">Baseline Metric</th>
            <th class="py-2">Monthly Billing Estimate (PHP)</th>
          </tr>
        </thead>
        <tbody>
          <tr class="border-b border-slate-100 text-slate-600">
            <td class="py-2 text-left font-semibold text-slate-800">Demised Basic Rent Charge:</td>
            <td class="py-2">Calculated based on area specs</td>
            <td class="py-2 font-mono">₱ 120,500.00</td>
          </tr>
          <tr class="border-b border-slate-100 text-slate-600">
            <td class="py-2 text-left font-semibold text-slate-800">CUSA Maintenance Levy:</td>
            <td class="py-2">Surcharge / utilities parameters</td>
            <td class="py-2 font-mono">₱ 22,400.00</td>
          </tr>
          <tr class="border-b border-slate-100 text-slate-600">
            <td class="py-2 text-left font-semibold text-slate-800">BIR Statutory 12% Output VAT:</td>
            <td class="py-2">\${propertyType === 'office' ? '0% if PEZA accredited' : 'Standard 12%'}</td>
            <td class="py-2 font-mono">₱ 17,148.00</td>
          </tr>
          <tr class="border-b border-slate-200 text-slate-600">
            <td class="py-2 text-left font-semibold text-slate-800">BIR 5% corporate EWT Deduction:</td>
            <td class="py-2">\${structure === 'corporate' ? 'Yes, Form 2307' : 'Not applicable'}</td>
            <td class="py-2 font-mono text-emerald-700">- ₱ 6,025.00</td>
          </tr>
          <tr class="font-extrabold text-slate-950 text-xs bg-slate-50">
            <td class="py-3 text-left uppercase pl-2">Net Monthly Cash outflow:</td>
            <td class="py-3"></td>
            <td class="py-3 pr-2 font-mono text-sm">₱ 154,023.00</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Milestones -->
    <div>
      <h2 class="text-sm font-bold text-slate-950 uppercase border-b border-slate-200 pb-1.5 mb-3">
        3. Chronological Vetting Milestones
      </h2>
      <ol class="space-y-3.5 text-xs text-slate-600">
        <li class="flex gap-3 items-start">
          <span class="w-5 h-5 bg-slate-800 text-white font-mono font-bold flex items-center justify-center text-[10px] rounded-full shrink-0">1</span>
          <div>
            <strong>Proposal Clearance:</strong> Lodging formal Offer to Lease (OTL) or Letter of Intent (LOI) to the design board of administration.
          </div>
        </li>
        <li class="flex gap-3 items-start">
          <span class="w-5 h-5 bg-slate-800 text-white font-mono font-bold flex items-center justify-center text-[10px] rounded-full shrink-0">2</span>
          <div>
            <strong>Committee Design Review:</strong> Submission of layout blueprints, electrical single lines, and grease trap specs for structural clearance.
          </div>
        </li>
        <li class="flex gap-3 items-start">
          <span class="w-5 h-5 bg-slate-800 text-white font-mono font-bold flex items-center justify-center text-[10px] rounded-full shrink-0">3</span>
          <div>
            <strong>Lease Notarization:</strong> Contract of lease signing accompanied by security and advance checks PDCs deposits.
          </div>
        </li>
      </ol>
    </div>

    <!-- Disclaimer -->
    <div class="border-t border-slate-300 pt-5 text-[10px] text-slate-400 font-light leading-relaxed">
      <strong>DISCLAIMER STATEMENT:</strong> This dossier document serves as a pre-contractual advisory reference only. Calculations, sliders parameters, PEZA classifications, and LGU permitting laws are aligned with standard Philippine real estate guidelines. Physical lease terms are authoritative after signing the landlords comprehensive Contract of Lease. Virtual Studios PH.
    </div>

    <div class="flex justify-between items-center bg-slate-950 text-slate-300 p-4 rounded-xl font-mono text-[9px]">
      <span>*NAV-VERIFIED-PRINT*</span>
      <span>MD5: FE9A66701C9D66BD</span>
      <span>CONFIDENTIAL PLANNERS GROUP v3</span>
    </div>

  </div>

  <script>
    window.addEventListener('load', () => {
      setTimeout(() => {
        window.print();
      }, 500);
    });
  </script>
</body>
</html>`;

    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Acquisitions_Advisory_Blueprint_\${locationName.replace(/[^a-zA-Z0-9]/g, '_')}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Define steps for the visual step-by-step layout
  const WIZARD_STEPS: WizardStep[] = [
    {
      id: 1,
      label: 'Acquisition Configurator',
      short: 'Profile Setup',
      desc: 'Define your property sector, local CBD, store layout, and company legal structure.',
      iconName: 'Settings2',
      colorClass: 'from-blue-600 to-indigo-700',
      badgeText: 'Step 1: Profile'
    },
    {
      id: 2,
      label: 'Financial Planner',
      short: 'Capital Simulator',
      desc: 'Simulate rent projections, CUSA service levies, tax withholding (EWT), and signing capital.',
      iconName: 'Calculator',
      colorClass: 'from-emerald-500 to-teal-600',
      badgeText: 'Step 2: Budgeting'
    },
    {
      id: 3,
      label: 'Acquisition Roadmap',
      short: 'Tenancy Timeline',
      desc: 'Explore sequential milestones, engineering committee approvals, and graveyard fit-out hours.',
      iconName: 'Milestone',
      colorClass: 'from-purple-500 to-indigo-650',
      badgeText: 'Step 3: Roadmap'
    },
    {
      id: 4,
      label: 'Regulatory Permits Directory',
      short: 'Filing Checklist',
      desc: 'Compile civil permits, fire safety inspections (FSIC), and sanitary clearances.',
      iconName: 'Scroll',
      colorClass: 'from-amber-500 to-orange-600',
      badgeText: 'Step 4: Filings'
    },
    {
      id: 5,
      label: 'Reference & Blueprint Summary',
      short: 'Advisory Review',
      desc: 'Review standard contract clauses, PEZA legal codes, and export your advisory dossier.',
      iconName: 'Award',
      colorClass: 'from-pink-500 to-rose-600',
      badgeText: 'Step 5: Reference'
    }
  ];

  const currentStepData = WIZARD_STEPS[currentWizardStep - 1];

  // Helper to dynamically render Lucide Icons by string name
  const renderIcon = (name: keyof typeof Icons, className: string) => {
    const IconComp = Icons[name] as React.ComponentType<{ className?: string }>;
    if (IconComp) {
      return <IconComp className={className} />;
    }
    return <Icons.HelpCircle className={className} />;
  };

  // Helper values for Category Label
  const getCategoryText = (cat: StoreCategory) => {
    switch (cat) {
      case 'cafe': return 'Cafe & Casual Dining';
      case 'fashion': return 'Fashion & Lifestyle Retail';
      case 'electronics': return 'Electronics & General Tech';
      case 'kiosk': return 'Mall Foyer Island Kiosk';
      case 'corp_hq': return 'Corporate HQ / Administrative Loft';
      case 'coworking': return 'Co-working Office Layout';
      case 'medical': return 'Clinics & Care Diagnostic Facility';
      case 'bpo': return 'BPO Operations / Contact Center';
      default: return cat;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 flex flex-col selection:bg-blue-100 selection:text-blue-900 font-sans text-slate-800 antialiased">
      
      {/* PROFESSIONAL LOGO HEADER */}
      <header className="border-b border-slate-150 bg-white sticky top-0 z-40 shadow-xxs">
        <div id="main-header" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-tr from-blue-700 via-indigo-600 to-emerald-600 rounded-xl flex items-center justify-center text-white font-semibold shadow-sm">
              <Icons.Building2 className="w-5 h-5" />
            </div>
            <div>
              <span className="text-sm font-bold tracking-tight text-slate-900 leading-none block">
                Acquisitions Navigator
              </span>
              <span className="text-[10px] text-slate-400 font-mono block mt-1 select-none font-semibold">
                PHILIPPINES COMMERCIAL PROPERTY PORTAL
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-1.5 px-3 py-1 bg-slate-50 border border-slate-200/50 rounded-full text-slate-550 text-[10px] font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>REAL-TIME ADVISORY VERIFIED</span>
            </div>
            
            <a 
              href="mailto:support@virtualstudios.ph" 
              className="text-xs font-semibold text-slate-500 hover:text-slate-805 flex items-center gap-1 transition-colors bg-slate-50 hover:bg-slate-100 px-3.5 py-1.5 rounded-full border border-slate-200/60"
            >
              <Icons.HelpCircle className="w-4 h-4 text-emerald-500 animate-pulse" />
              <span>Acquisition Support</span>
            </a>
          </div>
        </div>
      </header>

      {/* CORE PORTAL CONTAINER */}
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex flex-col gap-6">

        {/* PERSISTENT CONFIGURATION ACTIVE PROFILE HUD */}
        <div className="bg-slate-900 text-white rounded-3xl p-5 sm:px-7 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5 border border-slate-950 shadow-xs relative overflow-hidden select-none animate-fade-in animate-duration-300">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex items-center gap-3.5 relative z-10 w-full lg:w-auto">
            <div className="p-2.5 bg-slate-800 rounded-xl border border-slate-700 text-blue-400">
              <Icons.Briefcase className="w-5.5 h-5.5 animate-pulse text-blue-400" />
            </div>
            <div>
              <span className="text-[9px] font-mono tracking-widest text-slate-400 uppercase block font-bold">
                Active Tenant Profile Spec
              </span>
              <h3 className="text-xs sm:text-sm font-bold text-slate-100 flex items-center flex-wrap gap-2 mt-0.5">
                <span>{getProfileTitle()}</span>
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                <span className="text-[9.5px] text-slate-300 bg-slate-800 px-2.5 py-0.5 rounded font-mono border border-slate-700 shadow-sm font-bold uppercase transition-all">
                  {propertyType === 'mall' ? 'Mall Unit' : 'Office Core'}
                </span>
                <span className="text-[9.5px] text-blue-300 bg-blue-950/40 px-2.5 py-0.5 rounded font-mono border border-blue-900/60 shadow-sm font-bold uppercase transition-all">
                  {structure === 'corporate' ? 'Corp SEC' : 'Sole Proprietor'}
                </span>
                <span className="text-[9.5px] text-emerald-300 bg-emerald-950/40 px-2.5 py-0.5 rounded font-mono border border-emerald-900/60 shadow-sm font-bold uppercase transition-all">
                  {specificPlace || 'Parklinks Mall'}
                </span>
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-3 self-stretch lg:self-auto justify-between lg:justify-end border-t lg:border-t-0 border-slate-800/80 pt-3.5 lg:pt-0 relative z-10 font-sans">
            <span className="text-[10px] text-slate-450 font-mono tracking-wider font-bold">STEPS:</span>
            <div className="flex gap-2">
              {WIZARD_STEPS.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setCurrentWizardStep(s.id)}
                  aria-label={`Jump to ${s.label}`}
                  className={`w-9 h-9 rounded-xl flex items-center justify-center font-mono text-[11.5px] font-extrabold transition-all duration-200 cursor-pointer ${
                    currentWizardStep === s.id
                      ? 'bg-blue-600 text-white shadow-md ring-2 ring-blue-500/20 scale-[1.02]'
                      : s.id < currentWizardStep
                      ? 'bg-slate-800 text-emerald-400 border border-slate-700 hover:text-emerald-300'
                      : 'bg-slate-800/40 text-slate-400 hover:text-white border border-slate-800/60'
                  }`}
                >
                  {s.id < currentWizardStep ? <Icons.Check className="w-3.5 h-3.5 stroke-[3]" /> : s.id}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* WORK CARD STAGE */}
        <section id="workspace-layout" className="flex flex-col gap-6">

          {/* Active Step status header */}
          <div className="bg-white border border-slate-150 rounded-3xl p-5 shadow-xxs flex items-center gap-4 relative overflow-hidden select-none">
            <div className={`w-11 h-11 bg-gradient-to-br ${currentStepData.colorClass} text-white flex items-center justify-center rounded-2xl shadow-sm flex-shrink-0`}>
              {renderIcon(currentStepData.iconName as any, 'w-5 h-5')}
            </div>
            <div className="overflow-hidden">
              <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-slate-400">
                {currentStepData.badgeText}
              </span>
              <h2 className="text-sm font-bold text-slate-850 tracking-tight font-display mt-0.5 truncate">
                {currentStepData.label}
              </h2>
              <p className="text-[11.5px] text-slate-500 font-light mt-0.5 truncate">
                {currentStepData.desc}
              </p>
            </div>
          </div>

          <div className="min-h-[400px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentWizardStep}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.18 }}
                className="w-full"
              >
                
                {/* STEP 1: COMPREHENSIVE RECONSTRUCTED CONFIGURATOR */}
                {currentWizardStep === 1 && (
                  <div className="bg-white border border-slate-150 rounded-3xl p-6 sm:p-8 shadow-xs flex flex-col gap-8 animate-fade-in">
                    
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-105 pb-5">
                      <div>
                        <h2 className="text-base font-bold text-slate-800 font-display flex items-center gap-2">
                          <Icons.Sliders className="w-5 h-5 text-blue-600 animate-pulse" />
                          Tenancy Parameters Core Setup
                        </h2>
                        <p className="text-xs text-slate-400">
                          Configure your trade, CBD localization factors, and tax entity structures to instantly update regulatory timelines and documents.
                        </p>
                      </div>
                      <span className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-100 font-mono font-bold px-3 py-1 rounded-xl uppercase">
                        Configuration active
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                      
                      {/* Grid Row A: Property Sector select & CBD multi-select */}
                      <div className="md:col-span-12 lg:col-span-6 flex flex-col gap-6">
                        
                        {/* Area 1: Sector */}
                        <div className="flex flex-col gap-3">
                          <span className="text-[10px] font-mono font-bold tracking-widest text-slate-400 uppercase flex items-center gap-1.5">
                            <Icons.Briefcase className="w-4 h-4 text-emerald-500" /> A. Select Commercial Property Sector
                          </span>
                          
                          <div className="grid grid-cols-1 gap-3">
                            {/* Option Mall */}
                            <button
                              type="button"
                              onClick={() => handlePropertyTypeChange('mall')}
                              className={`p-3.5 rounded-xl border-2 text-left transition-all relative flex items-start gap-3 h-[77px] cursor-pointer select-none ${
                                propertyType === 'mall'
                                  ? 'border-blue-500 bg-blue-500/5 shadow-xxs ring-2 ring-blue-500/10'
                                  : 'border-slate-150 bg-white hover:border-slate-205'
                              }`}
                            >
                              <div className={`p-2 rounded-lg flex-shrink-0 h-8 w-8 flex items-center justify-center ${propertyType === 'mall' ? 'bg-blue-600 text-white' : 'bg-slate-50 text-slate-405 text-slate-400'}`}>
                                <Icons.Store className="w-4 h-4" />
                              </div>
                              <div className="flex flex-col select-none overflow-hidden">
                                <span className={`text-xs font-bold ${propertyType === 'mall' ? 'text-blue-900' : 'text-slate-800'}`}>
                                  Mall Leasing / Carts
                                </span>
                                <span className="text-[10px] text-slate-400 font-light mt-1 leading-tight truncate">
                                  Cafe, apparel retail, kiosks inside premium malls (SM, Ayala).
                                </span>
                              </div>
                              {propertyType === 'mall' && <span className="absolute top-3 right-3 w-2 h-2 rounded-full bg-blue-600" />}
                            </button>

                            {/* Option Office */}
                            <button
                              type="button"
                              onClick={() => handlePropertyTypeChange('office')}
                              className={`p-3.5 rounded-xl border-2 text-left transition-all relative flex items-start gap-3 h-[77px] cursor-pointer select-none ${
                                propertyType === 'office'
                                  ? 'border-blue-500 bg-blue-500/5 shadow-xxs ring-2 ring-blue-500/10'
                                  : 'border-slate-150 bg-white hover:border-slate-205'
                              }`}
                            >
                              <div className={`p-2 rounded-lg flex-shrink-0 h-8 w-8 flex items-center justify-center ${propertyType === 'office' ? 'bg-blue-600 text-white' : 'bg-slate-50 text-slate-405 text-slate-400'}`}>
                                <Icons.Building className="w-4 h-4" />
                              </div>
                              <div className="flex flex-col select-none overflow-hidden">
                                <span className={`text-xs font-bold ${propertyType === 'office' ? 'text-blue-900' : 'text-slate-800'}`}>
                                  Commercial Office
                                </span>
                                <span className="text-[10px] text-slate-400 font-light mt-1 leading-tight truncate">
                                  Corporate HQs, shared workspaces, PEZA entity floors, BPOs.
                                </span>
                              </div>
                              {propertyType === 'office' && <span className="absolute top-3 right-3 w-2 h-2 rounded-full bg-blue-600" />}
                            </button>
                          </div>
                        </div>

                      </div>

                      {/* Area 2: Workspace Layout Type Column */}
                      <div className="md:col-span-12 lg:col-span-6 flex flex-col gap-6 w-full">
                        
                        {/* Area 2: Categories Select List Grid */}
                        <div className="flex flex-col gap-3">
                          <span className="text-[10px] font-mono font-bold tracking-widest text-slate-400 uppercase flex items-center gap-1.5">
                            <Icons.Grid className="w-4 h-4 text-emerald-500" /> B. Select Workspace Layout Type
                          </span>

                          <div className="grid grid-cols-2 gap-3">
                            {propertyType === 'mall' ? (
                              <>
                                {[
                                  { id: 'cafe', label: 'Cafe / Dine-in', icon: Icons.Coffee, spec: 'Mandates grease traps & LGU health sanitary certificates' },
                                  { id: 'fashion', label: 'Fashion Retail', icon: Icons.ShoppingBag, spec: 'High branding facade & strict display committee design checks' },
                                  { id: 'electronics', label: 'Electronics Outlet', icon: Icons.Cpu, spec: 'Requires distinct single-line high load electrical diagrams' },
                                  { id: 'kiosk', label: 'Mall Kiosk', icon: Icons.Layout, spec: 'Requires island cart structural blueprints & POS telemetry' },
                                ].map((item) => (
                                  <button
                                    key={item.id}
                                    type="button"
                                    onClick={() => setCategory(item.id as StoreCategory)}
                                    className={`p-3.5 rounded-xl border flex gap-3 text-left transition-all h-[77px] select-none cursor-pointer ${
                                      category === item.id
                                        ? 'border-blue-500 bg-blue-50/10 shadow-xxs'
                                        : 'border-slate-150 bg-white hover:border-slate-205 hover:bg-slate-50/50'
                                    }`}
                                  >
                                    <div className={`p-2 rounded-lg flex-shrink-0 h-8 w-8 flex items-center justify-center ${category === item.id ? 'bg-blue-600 text-white' : 'bg-slate-50 text-slate-405 text-slate-450'}`}>
                                      <item.icon className="w-4 h-4" />
                                    </div>
                                    <div className="overflow-hidden">
                                      <span className="text-xs font-bold text-slate-800 block truncate">{item.label}</span>
                                      <span className="text-[9px] text-slate-450 text-slate-400 block truncate leading-snug mt-1">{item.spec}</span>
                                    </div>
                                  </button>
                                ))}
                              </>
                            ) : (
                              <>
                                {[
                                  { id: 'corp_hq', label: 'Corporate HQ', icon: Icons.Briefcase, spec: 'Executive board resolution, GIS records, and typical fire paths' },
                                  { id: 'coworking', label: 'Co-working setup', icon: Icons.Users, spec: 'Highly modular furniture layout design & IT lines certification' },
                                  { id: 'medical', label: 'Medical Clinic', icon: Icons.HeartPulse, spec: 'Clinical wastes treatment layouts & sanitary health permits' },
                                  { id: 'bpo', label: 'BPO Enterprise Floor', icon: Icons.Contact, spec: 'BFP loops, dual feed generators, PEZA accreditation checks' },
                                ].map((item) => (
                                  <button
                                    key={item.id}
                                    type="button"
                                    onClick={() => setCategory(item.id as StoreCategory)}
                                    className={`p-3.5 rounded-xl border flex gap-3 text-left transition-all h-[77px] select-none cursor-pointer ${
                                      category === item.id
                                        ? 'border-blue-500 bg-blue-50/10 shadow-xxs'
                                        : 'border-slate-150 bg-white hover:border-slate-205'
                                    }`}
                                  >
                                    <div className={`p-2 rounded-lg flex-shrink-0 h-8 w-8 flex items-center justify-center ${category === item.id ? 'bg-blue-600 text-white' : 'bg-slate-50 text-slate-405 text-slate-450'}`}>
                                      <item.icon className="w-4 h-4" />
                                    </div>
                                    <div className="overflow-hidden">
                                      <span className="text-xs font-bold text-slate-800 block truncate">{item.label}</span>
                                      <span className="text-[9px] text-slate-450 text-slate-400 block truncate leading-snug mt-1">{item.spec}</span>
                                    </div>
                                  </button>
                                ))}
                              </>
                            )}
                          </div>
                        </div>

                      </div>

                      {/* Area 3: Entity choice (Full-width spanning underneath A and B) */}
                      <div className="md:col-span-12 flex flex-col gap-6 w-full">
                        <div className="flex flex-col gap-3">
                          <span className="text-[10px] font-mono font-bold tracking-widest text-slate-400 uppercase flex items-center gap-1.5">
                            <Icons.UserCheck className="w-4 h-4 text-emerald-500" /> C. Select Constitutional Entity Model
                          </span>
                          
                          <div className="bg-slate-100 p-1 rounded-xl flex w-full">
                            <button
                              type="button"
                              onClick={() => setStructure('individual')}
                              className={`flex-1 py-2.5 text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 transition-all select-none cursor-pointer ${
                                structure === 'individual'
                                  ? 'bg-white text-slate-900 shadow-xxs'
                                  : 'text-slate-500 hover:text-slate-800'
                              }`}
                            >
                              <Icons.User className="w-4 h-4" />
                              <span>Sole Proprietorship</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => setStructure('corporate')}
                              className={`flex-1 py-2.5 text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 transition-all select-none cursor-pointer ${
                                structure === 'corporate'
                                  ? 'bg-white text-slate-900 shadow-xxs'
                                  : 'text-slate-500 hover:text-slate-800'
                              }`}
                            >
                              <Icons.Briefcase className="w-4 h-4" />
                              <span>Corporate SEC Corporation</span>
                            </button>
                          </div>
                          <div className="text-[10px] bg-slate-50 px-3 py-2 border border-slate-150/50 rounded-lg text-slate-400 font-light leading-relaxed">
                            {structure === 'corporate' 
                              ? 'Corporate classification indexes mandatory Board resolutions, GIS filings, and enables 5% corporate Expanded Withholding Tax (EWT) Form 2307 deductions.' 
                              : 'Sole proprietor is optimized simple DTI registrations, simplifying notary requirements & municipal permit files.'}
                          </div>
                        </div>
                      </div>

                    </div>

                    {/* Quick navigation card underneath step 1 */}
                    <div className="bg-slate-50 border border-slate-150 p-5 rounded-2.5xl rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <Icons.Compass className="w-5 h-5 text-indigo-500 animate-spin" />
                        <span className="text-xs text-slate-500 font-light leading-relaxed">
                          Primary profile configurations saved dynamically. Proceed to Step 2 to simulate lease deposits & recurring tax outlays.
                        </span>
                      </div>
                      <button
                        onClick={() => setCurrentWizardStep(2)}
                        className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-xxs flex items-center gap-1.5 h-10 transition-colors cursor-pointer select-none self-stretch sm:self-auto justify-center"
                      >
                        <span>Calculate Guarantees</span>
                        <Icons.ArrowRight className="w-4 h-4" />
                      </button>
                    </div>

                  </div>
                )}

                {/* STEP 2: FINANCIAL ESTIMATOR WORKSPACE */}
                {currentWizardStep === 2 && (
                  <div className="flex flex-col gap-6 animate-fade-in w-full">
                    <QuickEstimator
                      propertyType={propertyType}
                      category={category}
                      structure={structure}
                      region={region}
                      setRegion={setRegion}
                      specificPlace={specificPlace}
                      setSpecificPlace={setSpecificPlace}
                    />

                    {/* Bottom nav stepper */}
                    <div className="flex justify-between items-center bg-white border border-slate-150 p-4 rounded-2xl shadow-xxs">
                      <button
                        onClick={() => setCurrentWizardStep(1)}
                        className="px-4 py-2 border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Icons.ArrowLeft className="w-3.5 h-3.5" />
                        <span>Edit Profile</span>
                      </button>
                      <button
                        onClick={() => setCurrentWizardStep(3)}
                        className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer shadow-xxs"
                      >
                        <span>View Milestones Map</span>
                        <Icons.ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 3: INTERACTIVE PROCUREMENT CHRONICLES TIMELINE */}
                {currentWizardStep === 3 && (
                  <div className="flex flex-col gap-6 animate-fade-in w-full">
                    <Timeline
                      steps={TIMELINE_STEPS}
                      activeStepIndex={activeStepIndex}
                      setActiveStepIndex={setActiveStepIndex}
                      category={category}
                    />

                    {/* Bottom nav stepper */}
                    <div className="flex justify-between items-center bg-white border border-slate-150 p-4 rounded-2xl shadow-xxs">
                      <button
                        onClick={() => setCurrentWizardStep(2)}
                        className="px-4 py-2 border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Icons.ArrowLeft className="w-3.5 h-3.5" />
                        <span>Adjust Budget</span>
                      </button>
                      <button
                        onClick={() => setCurrentWizardStep(4)}
                        className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer shadow-xxs"
                      >
                        <span>Prepare Permits Folder</span>
                        <Icons.ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 4: PERMITTING DIRECTORY FILINGS CHECKS */}
                {currentWizardStep === 4 && (
                  <div className="flex flex-col gap-6 animate-fade-in w-full">
                    <DocumentChecklist
                      documents={DOCUMENTS_DATA}
                      category={category}
                      structure={structure}
                    />

                    {/* Bottom Navigation */}
                    <div className="flex justify-between items-center bg-white border border-slate-150 p-4 rounded-2xl shadow-xxs">
                      <button
                        onClick={() => setCurrentWizardStep(3)}
                        className="px-4 py-2 border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Icons.ArrowLeft className="w-3.5 h-3.5" />
                        <span>View Roadmap</span>
                      </button>
                      <button
                        onClick={() => setCurrentWizardStep(5)}
                        className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer shadow-xxs"
                      >
                        <span>Final Advisory Review</span>
                        <Icons.ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 5: COVENANTS REVIEW & ADVANCED REPORT GENERATOR */}
                {currentWizardStep === 5 && (
                  <div className="flex flex-col gap-8 animate-fade-in w-full">
                    
                    {/* Unified Dossier Report Card (Step 5 Hero) */}
                    <div className="bg-slate-900 text-white border border-slate-950 p-6 sm:p-8 rounded-3xl relative overflow-hidden shadow-md flex flex-col md:flex-row items-center justify-between gap-6 select-none">
                      <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
                      <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
                      
                      <div className="flex items-start gap-4 relative z-10 font-sans">
                        <div className="w-14 h-14 bg-white/10 text-emerald-400 flex items-center justify-center rounded-2xl border border-white/15 shadow-inner">
                          <Icons.BadgeCheck className="w-7 h-7" />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[10px] font-mono tracking-wider font-semibold text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-900/40 uppercase self-start">
                            Planning dossier prepped
                          </span>
                          <h2 className="text-lg sm:text-xl font-bold font-display text-white mt-2 leading-tight">
                            Acquisitions Advisory Portfolio Completed
                          </h2>
                          <p className="text-xs text-slate-300 font-light max-w-xl leading-relaxed mt-1">
                            Your workspace specification profile can now be exported as a formal print-ready Realty Assessment summary report. Click below to simulate the PDF draft containing pro-forma budgets and compliance roadmaps.
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          setShowExportModal(true);
                        }}
                        className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs px-6 py-4 rounded-2xl min-h-[50px] transition-all flex items-center justify-center gap-2 flex-shrink-0 self-stretch md:self-auto text-center cursor-pointer shadow-lg hover:shadow-emerald-500/10 hover:scale-[1.02]"
                      >
                        <Icons.FileText className="w-4.5 h-4.5 stroke-[2.5]" />
                        <span>Simulate PDF Blueprint</span>
                      </button>
                    </div>

                    {/* Render legal terms breakdown */}
                    <TermsBreakdown
                      terms={TERMS_DATA}
                      propertyType={propertyType}
                      category={category}
                    />

                    {/* Step 5 nav stepper */}
                    <div className="flex justify-between items-center bg-white border border-slate-150 p-4 rounded-2xl shadow-xxs select-none">
                      <button
                        onClick={() => setCurrentWizardStep(4)}
                        className="px-4 py-2 border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Icons.ArrowLeft className="w-3.5 h-3.5" />
                        <span>Back: Permitting</span>
                      </button>
                      <button
                        onClick={() => setCurrentWizardStep(1)}
                        className="px-4.5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl flex items-center gap-1 transition-colors cursor-pointer shadow-xxs"
                      >
                        <Icons.RotateCcw className="w-3.5 h-3.5" />
                        <span>Configure New Plan</span>
                      </button>
                    </div>

                  </div>
                )}

              </motion.div>
            </AnimatePresence>
          </div>

        </section>

      </main>

      {/* DISS DOSSIERS SIMULATION EXPORT MODAL */}
      <AnimatePresence>
        {showExportModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs select-none">
            
            {/* Modal Container */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white border border-slate-200 shadow-2xl w-full max-w-3xl rounded-3xl overflow-hidden font-sans flex flex-col max-h-[90vh]"
            >
              {/* Modal Head */}
              <div className="bg-slate-900 text-white p-5 flex items-center justify-between border-b border-slate-950 flex-shrink-0">
                <div className="flex items-center gap-2.5">
                  <Icons.FileText className="w-5 h-5 text-emerald-400" />
                  <div>
                    <span className="text-[10px] font-mono tracking-widest text-slate-400 block font-bold leading-none uppercase">
                      PDF GENERATION ENGINE
                    </span>
                    <h3 className="text-sm font-bold text-white mt-1 leading-none">
                      Acquisitions Advisory Blueprint Simulation
                    </h3>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setShowExportModal(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                  aria-label="Close View"
                >
                  <Icons.X className="w-5 h-5" />
                </button>
              </div>

              {/* Printable PDF Preview Box */}
              <div className="p-6 overflow-y-auto bg-slate-50 flex-grow font-sans space-y-6">
                
                {/* Simulated Document Sheet */}
                <div className="bg-white border border-slate-300 p-8 shadow-inner rounded-2xl relative space-y-6 text-slate-800 max-w-2xl mx-auto text-xs font-sans">
                  
                  {/* Watermark Diagonal */}
                  <div className="absolute inset-x-0 top-1/3 text-center -rotate-[22deg] text-[36px] font-extrabold font-mono uppercase tracking-[0.4em] text-slate-200/25 pointer-events-none select-none">
                    ADVISORY MATRIX
                  </div>

                  {/* Stamp of Integrity */}
                  <div className="absolute top-8 right-8 border-4 border-emerald-500/30 text-emerald-600/40 font-mono text-[11px] font-extrabold px-3 py-1 rotate-12 rounded">
                    APPROVED BLUEPRINT
                  </div>

                  {/* Document Header block */}
                  <div className="border-b-2 border-slate-800 pb-5 flex justify-between items-start">
                    <div>
                      <h1 className="text-sm font-extrabold text-slate-900 tracking-wider">
                        VIRTUAL STUDIOS PH REALTORS
                      </h1>
                      <p className="text-[9px] font-mono font-bold text-slate-400 uppercase mt-0.5 tracking-wider">
                        Philippines Tenancy Assessment &amp; Compliance Brief
                      </p>
                      <p className="text-[9px] text-slate-500 mt-1">Ref: PK-VS-967D88</p>
                    </div>
                    <div className="text-right font-mono text-[9px] text-slate-500">
                      <div>Generated: {new Date().toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' })}</div>
                      <div>System: Navigator v3.4.1</div>
                    </div>
                  </div>

                  {/* Config parameters sections */}
                  <div>
                    <h2 className="text-xs font-bold text-slate-950 uppercase border-b border-slate-200 pb-1.5 mb-2.5">
                      1. Client Tenancy Profile
                    </h2>
                    <table className="w-full text-left text-slate-600 border-collapse">
                      <tbody>
                        <tr className="border-b border-slate-100">
                          <td className="py-1.5 font-bold text-slate-800 w-1/3">Target Business Concept:</td>
                          <td className="py-1.5 text-slate-700">{getCategoryText(category)}</td>
                        </tr>
                        <tr className="border-b border-slate-100">
                          <td className="py-1.5 font-bold text-slate-800">Acquisition Property Sector:</td>
                          <td className="py-1.5 uppercase text-slate-700">{propertyType === 'mall' ? 'Mall Unit tenancy layout' : 'Commercial Office block'}</td>
                        </tr>
                        <tr className="border-b border-slate-100">
                          <td className="py-1.5 font-bold text-slate-800">Specific Location:</td>
                          <td className="py-1.5 text-slate-700 font-bold">{specificPlace || 'Parklinks Mall'}</td>
                        </tr>
                        <tr>
                          <td className="py-1.5 font-bold text-slate-800">Company Constitutional Model:</td>
                          <td className="py-1.5 uppercase text-slate-700">{structure === 'corporate' ? 'SEC Stock Corporation (Subject to VAT / 5% EWT Form 2307)' : 'Individual Sole Proprietor DTI model'}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* Financial projections table mockup */}
                  <div>
                    <h2 className="text-xs font-bold text-slate-950 uppercase border-b border-slate-200 pb-1.5 mb-2.5">
                      2. Pro-forma Lease Billings (1st Year)
                    </h2>
                    <table className="w-full text-right border-collapse">
                      <thead>
                        <tr className="border-b border-slate-800 font-bold text-slate-800">
                          <th className="py-1.5 text-left">Lease Allocation Item</th>
                          <th className="py-1.5">Baseline Metric</th>
                          <th className="py-1.5">Monthly Billing Estimate (PHP)</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-slate-100 text-slate-600">
                          <td className="py-1.5 text-left font-semibold text-slate-800">Demised Basic Rent Charge:</td>
                          <td className="py-1.5">Calculated based on area specs</td>
                          <td className="py-1.5">₱ 120,500.00</td>
                        </tr>
                        <tr className="border-b border-slate-100 text-slate-600">
                          <td className="py-1.5 text-left font-semibold text-slate-800">CUSA Maintenance Levy:</td>
                          <td className="py-1.5">Surcharge / utilities parameters</td>
                          <td className="py-1.5">₱ 22,400.00</td>
                        </tr>
                        <tr className="border-b border-slate-100 text-slate-100/10 text-slate-600">
                          <td className="py-1.5 text-left font-semibold text-slate-800">BIR Statutory 12% Output VAT:</td>
                          <td className="py-1.5">{propertyType === 'office' ? '0% if PEZA accredited' : 'Standard 12%'}</td>
                          <td className="py-1.5">₱ 17,148.00</td>
                        </tr>
                        <tr className="border-b border-slate-200 text-slate-600">
                          <td className="py-1.5 text-left font-semibold text-slate-800">BIR 5% corporate EWT Deduction:</td>
                          <td className="py-1.5">{structure === 'corporate' ? 'Yes, Form 2307' : 'Not applicable'}</td>
                          <td className="py-1.5 text-emerald-700">- ₱ 6,025.00</td>
                        </tr>
                        <tr className="font-extrabold text-slate-950">
                          <td className="py-2.5 text-left uppercase">Net Monthly Cash outflow:</td>
                          <td className="py-2.5"></td>
                          <td className="py-2.5 border-t border-slate-800 bg-slate-50 px-2 font-mono">₱ 154,023.00</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* Procedural checklist synopsis */}
                  <div>
                    <h2 className="text-xs font-bold text-slate-950 uppercase border-b border-slate-200 pb-1.5 mb-2.5">
                      3. Chronological Vetting Milestones
                    </h2>
                    <ul className="space-y-2.5 text-slate-600">
                      <li className="flex gap-2 items-start">
                        <span className="w-4 h-4 bg-slate-100 text-slate-800 font-mono font-bold flex items-center justify-center text-[9px] rounded-full shrink-0 mt-0.5">1</span>
                        <div>
                          <strong>Proposal Clearance:</strong> Lodging formal Offer to Lease (OTL) or Letter of Intent (LOI) to the design board of administration.
                        </div>
                      </li>
                      <li className="flex gap-2 items-start">
                        <span className="w-4 h-4 bg-slate-100 text-slate-800 font-mono font-bold flex items-center justify-center text-[9px] rounded-full shrink-0 mt-0.5">2</span>
                        <div>
                          <strong>Committee Design Review:</strong> Submission of layout blueprints, electrical single lines, and grease trap specs for structural clearance.
                        </div>
                      </li>
                      <li className="flex gap-2 items-start">
                        <span className="w-4 h-4 bg-slate-100 text-slate-800 font-mono font-bold flex items-center justify-center text-[9px] rounded-full shrink-0 mt-0.5">3</span>
                        <div>
                          <strong>Lease Notarization:</strong> Contract of lease signing accompanied by security and advance checks PDCs deposits.
                        </div>
                      </li>
                    </ul>
                  </div>

                  {/* Legal warning/footer slip inside document */}
                  <div className="border-t border-slate-300 pt-5 text-[9px] text-slate-400 font-light leading-relaxed select-none">
                    <strong>DISCLAIMER STATEMENT:</strong> This dossier document serves as a pre-contractual advisory reference only. Calculations, sliders parameters, PEZA classifications, and LGU permitting laws are aligned with standard Philippine real estate guidelines for Taguig BGC and Makati. Physical lease terms are authoritative after signing the landlords comprehensive Contract of Lease. Virtual Studios PH.
                  </div>

                  <div className="flex justify-between items-center bg-slate-900 text-slate-300 p-4 rounded-xl font-mono text-[8px] select-none">
                    <span>*NAV-VERIFIED-PRINT*</span>
                    <span>MD5: FE9A66701C9D66BD</span>
                    <span>CONFIDENTIAL PLANNERS GROUP v3</span>
                  </div>

                </div>

              </div>

              {/* Modal footer controls */}
              <div className="p-4 bg-slate-100 border-t border-slate-200 flex justify-end gap-3 flex-shrink-0 select-none">
                <button
                  type="button"
                  onClick={() => setShowExportModal(false)}
                  className="px-4 py-2 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors cursor-pointer border border-slate-300 bg-white"
                >
                  Close Preview
                </button>
                <button
                  type="button"
                  onClick={() => {
                    downloadBlueprintFile();
                  }}
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer shadow-xxs"
                >
                  <Icons.Download className="w-4 h-4" />
                  <span>Download Blueprint</span>
                </button>
              </div>

            </motion.div>

          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
