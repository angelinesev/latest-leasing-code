import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import * as Icons from 'lucide-react';
import { TimelineStep, StoreCategory } from '../types';

interface TimelineProps {
  steps: TimelineStep[];
  activeStepIndex: number;
  setActiveStepIndex: (index: number) => void;
  category: StoreCategory;
}

export default function Timeline({
  steps,
  activeStepIndex,
  setActiveStepIndex,
  category,
}: TimelineProps) {
  const activeStep = steps[activeStepIndex];
  const activeDetails = activeStep.details;

  // --- REUSABLE STATE FOR THE 15 INTERACTIVE STAGES ---
  
  // Stage 1: Inquiry
  const [inquiryBizName, setInquiryBizName] = useState('Angeline Ventures Inc.');
  const [inquiryEmail, setInquiryEmail] = useState('angeline@virtualstudios.ph');
  const [inquiryArea, setInquiryArea] = useState(45);
  const [inquirySubmitted, setInquirySubmitted] = useState(false);
  const [inquiryRes, setInquiryRes] = useState<{ id: string; officer: string } | null>(null);

  // Stage 2: Space Availability Review
  const [spaceStatus, setSpaceStatus] = useState<'Under Review' | 'Shortlisted' | 'Not Available'>('Shortlisted');
  const [selectedUnit, setSelectedUnit] = useState('Unit 102-G, Ground Floor Corridor (45 sqm)');

  // Stage 3: Documents Submission
  const [docChecklist, setDocChecklist] = useState<Record<string, boolean>>({
    ids: true,
    address: true,
    financial: false,
    sec: false,
    articles: false,
    mayor: false,
    bir2303: false,
    auditedF: false
  });
  const [uploadedFiles, setUploadedFiles] = useState<string[]>(['Valid_ID_Angeline.pdf', 'Proof_Of_Address_Manila.pdf']);

  // Stage 4: LOI Form
  const [loiTargetDate, setLoiTargetDate] = useState('2026-09-01');
  const [loiConceptName, setLoiConceptName] = useState('Artisanal Brew Cafe');
  const [loiSubmitted, setLoiSubmitted] = useState(false);
  const [loiStatus, setLoiStatus] = useState<'Submitted' | 'Under Evaluation' | 'Approved'>('Under Evaluation');
  const [loiBrandDeckName, setLoiBrandDeckName] = useState('visual_brand_deck_v2.pdf');

  // Stage 5: Business Evaluation
  const [evaluationScores, setEvaluationScores] = useState({
    financial: 85,
    brandFit: 90,
    competitionOverlap: 75,
    demandDensity: 88
  });
  const [evalLog, setEvalLog] = useState<string[]>([
    'Evaluation panel registered client brand assets.',
    'System scanned adjacent cafeteria overlap coefficient - Minimal overload.',
  ]);

  // Stage 6: Commercial Terms (UI breakdown sheet matching user's specific request)
  const [baseRentRate, setBaseRentRate] = useState(1100); // PHP per sqm
  const [cusaRate, setCusaRate] = useState(220); // PHP per sqm
  const [marketingRate, setMarketingRate] = useState(55); // PHP per sqm
  const [escalationRate, setEscalationRate] = useState(7); // % annual escalation
  const [fitoutWeeks, setFitoutWeeks] = useState(4); // Free fit-out period in weeks

  // Stage 7: Reservation & Acceptance
  const [reservationPaid, setReservationPaid] = useState(false);
  const [paidDate, setPaidDate] = useState('');

  // Stage 8: Lease Contract Preparation & View Draft / E-Sign triggers
  const [showDraftModal, setShowDraftModal] = useState(false);
  const [showESignModal, setShowESignModal] = useState(false);
  const [contractSigned, setContractSigned] = useState(false);
  
  // Signature Drawing Block
  const [signatureText, setSignatureText] = useState('ANGELINE REY');
  const [sigType, setSigType] = useState<'type' | 'draw'>('type');
  const [signatureAdopted, setSignatureAdopted] = useState(false);

  // Stage 9: Contract Execution Status
  const [signingStatus, setSigningStatus] = useState<'For Signature' | 'Partially Signed' | 'Fully Executed'>('For Signature');
  const [autogenPdf, setAutogenPdf] = useState(true);
  const [autoEmail, setAutoEmail] = useState(true);

  // Stage 10: Fit-out Engineering upload status files
  const [engineeringFiles, setEngineeringFiles] = useState<Record<string, string>>({
    storeDesign: 'Store_Design_Draft_v3.pdf',
    architecturalPlans: 'Architectural_Floor_Layout_Locked.pdf',
    mechanicalPlans: '',
    electricalPlans: '',
    fireProtectionPlans: ''
  });

  // Stage 11: Plan Approval Reviews
  const [planReviewStatus, setPlanReviewStatus] = useState<'Pending Review' | 'Revision Required' | 'Approved'>('Pending Review');
  const [engineerRemarks, setEngineerRemarks] = useState('Electrical load calculations require backup generator tap breaker specify.');

  // Stage 12: Construction Period days timeline
  const [constructionDay, setConstructionDay] = useState(1); // Day 1 to Day 45
  
  // Stage 13: Pre-Opening Department check status lists
  const [inspectionChecked, setInspectionChecked] = useState<Record<string, boolean>>({
    engineering: false,
    safety: false,
    operations: false
  });

  // Stage 14: Store Turnover Permit
  const [permitUnlocked, setPermitUnlocked] = useState(false);
  const [showPermitModal, setShowPermitModal] = useState(false);

  // Stage 15: Store Opening
  const [openingCeremonyActive, setOpeningCeremonyActive] = useState(false);
  const [openingDignitaryLog, setOpeningDignitaryLog] = useState<string[]>([
    'Ribbon cut scheduled for 10:00 AM.',
    'Tenant relations team approved entry gates opening.'
  ]);

  // --- GENERAL COMPONENT STATE ---
  const [completedSubSteps, setCompletedSubSteps] = useState<Record<string, boolean>>({});

  const handleToggleSubStep = (stepId: string, idx: number) => {
    const key = `${stepId}_${idx}`;
    setCompletedSubSteps(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // Render icons dynamically
  const renderIcon = (iconName: string, className: string) => {
    const IconComponent = (Icons as any)[iconName];
    if (IconComponent) {
      return <IconComponent className={className} />;
    }
    return <Icons.HelpCircle className={className} />;
  };

  // Custom simulation actions
  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setInquirySubmitted(true);
    setInquiryRes({
      id: `LQR-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      officer: 'Ms. Clara Gutierrez (Assistant Leasing Manager)'
    });
    // Auto mark matching checklists item
    setCompletedSubSteps(prev => ({
      ...prev,
      ['inquiry_0']: true,
      ['inquiry_1']: true,
      ['inquiry_2']: true,
      ['inquiry_3']: true,
    }));
  };

  const handleSimulateRequirementsUpload = () => {
    setDocChecklist({
      ids: true,
      address: true,
      financial: true,
      sec: true,
      articles: true,
      mayor: true,
      bir2303: true,
      auditedF: true
    });
    setUploadedFiles([
      'Valid_ID_Angeline.pdf', 
      'Proof_Of_Address_Manila.pdf',
      'SEC_Incorporation_2018.pdf',
      'Articles_Of_Incorporation.pdf',
      'Mayor_Business_Permit_2026.pdf',
      'BIR_Form_2303.pdf',
      'Audited_Income_Statement.pdf'
    ]);
  };

  const handleLoiSubmit = () => {
    setLoiSubmitted(true);
    setLoiStatus('Submitted');
    setTimeout(() => {
      setLoiStatus('Approved');
    }, 2500);
  };

  // Stage 6 calculation formulas
  const basicRentSum = inquiryArea * baseRentRate;
  const cusaSum = inquiryArea * cusaRate;
  const marketingSum = inquiryArea * marketingRate;
  const grossMonthlyOutlay = basicRentSum + cusaSum + marketingSum;

  const handleAcceptReservation = () => {
    setReservationPaid(true);
    setPaidDate(new Date().toLocaleDateString());
    // Auto advance active actions
    setCompletedSubSteps(prev => ({
      ...prev,
      ['reservation_0']: true,
      ['reservation_1']: true,
      ['reservation_2']: true,
      ['reservation_3']: true,
    }));
  };

  const handleAdoptAndEsign = () => {
    setSignatureAdopted(true);
    setContractSigned(true);
    setSigningStatus('Fully Executed');
    setShowESignModal(false);
  };

  return (
    <div id="lifecycle-system" className="flex flex-col gap-8 w-full font-sans text-slate-800 antialiased">
      
      {/* 15 STEPS CHRONOLOGICAL TRACK BAR */}
      <div className="bg-white border border-slate-150 rounded-3xl p-5 shadow-xxs overflow-hidden select-none">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-slate-100 pb-4 mb-4">
          <div>
            <span className="text-[10px] font-mono font-bold tracking-widest text-indigo-500 uppercase flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" /> 15-Stage Licensing, Compliance & Fit-out Lifecycle
            </span>
            <h2 className="text-sm font-bold text-slate-800 mt-1">Tenant Acquisition Stages</h2>
          </div>
          <span className="text-[10px] font-mono bg-slate-100 text-slate-600 font-bold px-3 py-1 rounded-full border border-slate-200">
            Active: Stage {activeStep.number} of 15 • {activeStep.title}
          </span>
        </div>

        {/* Dynamic horizontal scrolling track or list indicators */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 pt-1 scrollbar-thin scrollbar-thumb-slate-200">
          {steps.map((step, idx) => {
            const isActive = idx === activeStepIndex;
            const isPassed = idx < activeStepIndex;
            
            return (
              <button
                key={step.id}
                onClick={() => setActiveStepIndex(idx)}
                className={`flex-shrink-0 flex items-center gap-2 py-2 px-3.5 rounded-xl border-2 text-left transition-all ${
                  isActive
                    ? 'border-indigo-600 bg-indigo-50/10 shadow-xs ring-2 ring-indigo-500/15'
                    : isPassed
                    ? 'border-emerald-300 bg-emerald-50/20 hover:border-emerald-400'
                    : 'border-slate-150 bg-white hover:border-slate-250'
                } cursor-pointer`}
              >
                <div className={`w-5.5 h-5.5 rounded-lg flex items-center justify-center text-[10px] font-mono font-bold border ${
                  isActive 
                    ? 'bg-indigo-600 border-indigo-600 text-white' 
                    : isPassed
                    ? 'bg-emerald-500 border-emerald-500 text-white' 
                    : 'bg-slate-50 border-slate-200 text-slate-500'
                }`}>
                  {isPassed ? <Icons.Check className="w-3.5 h-3.5 stroke-[2.5]" /> : step.number}
                </div>
                <div>
                  <span className={`text-[11.5px] font-bold block whitespace-nowrap leading-none ${isActive ? 'text-indigo-900' : 'text-slate-600'}`}>
                    {step.title}
                  </span>
                  <span className="text-[8.5px] text-slate-400 block mt-0.5 leading-none">{step.details.timelineLabel}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* STAGE MAIN INTERACTIVE DESK - GRID PANEL */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch w-full">
        
        {/* Left Side: Standard Advisory Information Card */}
        <div className="lg:col-span-5 bg-slate-900 text-slate-100 rounded-3xl p-6 sm:p-7 flex flex-col justify-between relative overflow-hidden self-stretch shadow-md">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-5">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-indigo-500/15 text-indigo-400 flex items-center justify-center font-mono text-xs font-bold border border-indigo-500/20">
                0{activeStep.number}
              </span>
              <div>
                <span className="text-[9px] font-mono tracking-widest text-slate-400 uppercase font-bold block leading-none">
                  ACQUISITIONS PROTOCOL
                </span>
                <span className="text-[10px] font-semibold text-emerald-400 mt-1 block">
                  TIMEFRAME: {activeStep.details.timelineLabel}
                </span>
              </div>
            </div>

            <div>
              <h1 className="text-base sm:text-lg font-bold font-display text-white border-b border-slate-800/80 pb-3 leading-snug">
                {activeStep.title}
              </h1>
              <p className="text-xs text-slate-300 leading-relaxed font-light mt-3">
                {activeStep.details.description}
              </p>
            </div>

            {/* ADVISORY STRATEGY PRO TIP CARD */}
            {activeStep.details.proTip && (
              <div className="bg-indigo-950/40 border border-indigo-900/40 rounded-2xl p-4 flex gap-3 text-slate-205 select-none relative">
                <Icons.Sparkles className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div className="flex flex-col gap-1">
                  <span className="text-[9px] font-mono tracking-wider font-semibold text-indigo-300 uppercase block">
                    PHILIPPINES REALTY STRATEGY
                  </span>
                  <p className="text-[11px] text-slate-300 leading-relaxed font-light">
                    {activeStep.details.proTip}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* CHRONOLOGICAL SUBTASKS PROGRESS AND CONTROLS */}
          <div className="relative z-10 mt-8 space-y-4 border-t border-slate-800/80 pt-5">
            <span className="text-[9px] font-mono tracking-wider text-slate-400 uppercase font-bold block">
              ADVISORY MILESTONES REVIEW
            </span>
            <div className="space-y-2.5 max-h-[180px] overflow-y-auto pr-1">
              {activeStep.details.actions.map((act, idx) => {
                const subKey = `${activeStep.id}_${idx}`;
                const checked = completedSubSteps[subKey] || false;
                return (
                  <div 
                    key={idx}
                    onClick={() => handleToggleSubStep(activeStep.id, idx)}
                    className={`flex items-start gap-2.5 p-2.5 rounded-lg border text-left cursor-pointer transition-colors ${
                      checked 
                        ? 'bg-emerald-950/20 border-emerald-900/30 text-emerald-300' 
                        : 'bg-slate-800/30 border-slate-800 text-slate-350 hover:bg-slate-800/65'
                    }`}
                  >
                    <div className={`w-4 h-4 rounded-md border flex items-center justify-center shrink-0 mt-0.5 ${
                      checked ? 'bg-emerald-500 border-emerald-500 text-slate-950' : 'border-slate-600'
                    }`}>
                      {checked && <Icons.Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                    <span className="text-[11px] leading-snug font-sans">{act}</span>
                  </div>
                );
              })}
            </div>

            <div className="flex justify-between items-center pt-3 border-t border-slate-800/50">
              <button
                disabled={activeStepIndex === 0}
                onClick={() => setActiveStepIndex(activeStepIndex - 1)}
                className="flex items-center gap-1.5 px-3 py-1.5 border border-slate-800 bg-slate-900/40 text-[11px] font-bold text-slate-400 hover:text-white rounded-lg disabled:opacity-40 transition-colors"
              >
                <Icons.ArrowLeft className="w-3 h-3" /> Prev Step
              </button>
              <button
                disabled={activeStepIndex === steps.length - 1}
                onClick={() => setActiveStepIndex(activeStepIndex + 1)}
                className="flex items-center gap-1.5 px-3.5 py-1.5 bg-indigo-650 hover:bg-indigo-700 text-white text-[11px] font-bold rounded-lg disabled:opacity-40 transition-colors"
              >
                Next Step <Icons.ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Side: Fully Interactive Stage-Specific Action Tool / Form System */}
        <div className="lg:col-span-7 bg-white border border-slate-150 rounded-3xl p-6 sm:p-7 flex flex-col justify-between self-stretch shadow-xxs">
          
          <div className="space-y-6 flex-grow flex flex-col justify-between">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <span className="text-[10px] font-mono font-bold tracking-wider text-slate-400 uppercase flex items-center gap-1.5">
                <Icons.Sliders className="w-4 h-4 text-emerald-500 animate-pulse" /> Sandbox Simulation Station
              </span>
              <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-emerald-50 border border-emerald-100 text-emerald-700 font-bold uppercase">
                Interactive Block Ready
              </span>
            </div>

            {/* STAGE-SPECIFIC INTERACTIVE RENDERS */}
            <div className="flex-grow py-3 min-h-[300px]">
              
              {/* STAGE 1: LEASING INQUIRY FORM */}
              {activeStep.id === 'inquiry' && (
                <div className="space-y-4">
                  <div className="bg-slate-50 border border-slate-150 p-4 rounded-xl text-xs text-slate-500">
                    Introduce corporate parameters to lodge a formal tenancy query for your chosen premises.
                  </div>
                  <form onSubmit={handleInquirySubmit} className="space-y-3.5">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Company / Trade Name</label>
                        <input
                          type="text"
                          value={inquiryBizName}
                          onChange={(e) => setInquiryBizName(e.target.value)}
                          className="w-full bg-white border border-slate-200 px-3 py-2 text-xs font-semibold rounded-lg focus:ring-1 focus:ring-indigo-500 outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Inquirer Email Address</label>
                        <input
                          type="email"
                          value={inquiryEmail}
                          onChange={(e) => setInquiryEmail(e.target.value)}
                          className="w-full bg-white border border-slate-200 px-3 py-2 text-xs font-semibold rounded-lg focus:ring-1 focus:ring-indigo-500 outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Preferred Rent Floor Area (sqm)</label>
                        <input
                          type="number"
                          value={inquiryArea}
                          onChange={(e) => setInquiryArea(Number(e.target.value))}
                          className="w-full bg-white border border-slate-200 px-3 py-2 text-xs font-semibold rounded-lg focus:ring-1 focus:ring-indigo-500 outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Preferred Location Venue</label>
                        <input
                          type="text"
                          disabled
                          value={selectedUnit.split(', ')[0] || 'Parklinks Corridor 102'}
                          className="w-full bg-slate-50 border border-slate-150 px-3 py-2 text-xs font-mono font-bold text-slate-500 rounded-lg outline-none"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold p-3 rounded-xl text-xs transition-all flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <Icons.Send className="w-3.5 h-3.5" /> Submit Leasing Inquiry
                    </button>
                  </form>

                  {inquirySubmitted && inquiryRes && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-emerald-50 border border-emerald-200 text-emerald-805 p-4 rounded-2xl flex gap-3.5 items-start mt-4"
                    >
                      <Icons.BadgeCheck className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                      <div className="text-xs">
                        <strong className="text-emerald-900 block font-bold">✓ Reference Record Created Successfully</strong>
                        <p className="text-emerald-700 mt-1 leading-relaxed">
                          Your query is assigned to <strong className="font-semibold text-emerald-800">{inquiryRes.officer}</strong>. Submission Ref ID: <strong className="font-mono">{inquiryRes.id}</strong>.
                        </p>
                      </div>
                    </motion.div>
                  )}
                </div>
              )}

              {/* STAGE 2: SPACE AVAILABILITY REVIEW */}
              {activeStep.id === 'space_review' && (
                <div className="space-y-4">
                  <div className="bg-slate-50 border border-slate-150 p-4 rounded-xl text-xs text-slate-500">
                    Review specific vacant units shortlisted on our commercial spatial allocation map matching your {inquiryArea} sqm inquiry.
                  </div>

                  <div className="space-y-2.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase block">Shortlisted Mall Inventory Units</label>
                    
                    {[
                      { id: 'Unit 102-G, Ground Floor Corridor (45 sqm)', loc: 'Ground floor near main anchor store atrium', occupancy: 'Vacant', rating: '98% compatibility' },
                      { id: 'Unit 315-B, Level 3 Food Hall (30 sqm)', loc: 'High foot-fall food pavilion segment', occupancy: 'Vacant', rating: '85% compatibility' }
                    ].map((unit) => (
                      <div 
                        key={unit.id}
                        onClick={() => setSelectedUnit(unit.id)}
                        className={`p-3.5 rounded-xl border flex justify-between items-center transition-all cursor-pointer ${
                          selectedUnit === unit.id 
                            ? 'border-indigo-500 bg-indigo-50/10 shadow-xxs' 
                            : 'border-slate-150 hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-2.5 h-2.5 rounded-full ${selectedUnit === unit.id ? 'bg-indigo-500 animate-pulse' : 'bg-slate-350'}`} />
                          <div className="text-xs">
                            <span className="font-bold text-slate-800 block">{unit.id}</span>
                            <span className="text-[10px] text-slate-400 block mt-0.5">{unit.loc}</span>
                          </div>
                        </div>
                        <span className="text-[9px] font-mono font-bold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded border border-emerald-100">
                          {unit.rating}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-slate-100 pt-4 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-600">Simulate Landlord Feedback status:</span>
                    <div className="flex gap-2">
                      {(['Under Review', 'Shortlisted', 'Not Available'] as const).map((status) => (
                        <button
                          key={status}
                          onClick={() => setSpaceStatus(status)}
                          className={`px-3 py-1.5 text-[10px] font-mono font-bold rounded-lg border transition-all cursor-pointer ${
                            spaceStatus === status 
                              ? 'bg-slate-900 border-slate-950 text-white' 
                              : 'bg-white border-slate-150 hover:bg-slate-50 text-slate-500'
                          }`}
                        >
                          {status}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="bg-slate-50/50 p-3.5 border border-slate-150 rounded-xl flex items-center gap-3 text-xs text-slate-500">
                    <Icons.Info className="w-5 h-5 text-indigo-500 shrink-0" />
                    <span>Selected inventory allocation synchronized: <strong className="text-indigo-700 font-semibold">{selectedUnit}</strong> is active.</span>
                  </div>
                </div>
              )}

              {/* STAGE 3: REQUIREMENT COMPLIANCE BOARD */}
              {activeStep.id === 'requirements' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-slate-700">Digital Document Handover Hub</span>
                    <button 
                      onClick={handleSimulateRequirementsUpload}
                      className="text-[10px] font-mono text-indigo-500 hover:text-indigo-600 font-bold flex items-center gap-1 uppercase"
                    >
                      <Icons.RefreshCw className="w-3 h-3 animate-spin" /> Batch Upload & Complete Verification
                    </button>
                  </div>

                  {/* Checklist indicators by sector entity */}
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="p-3 bg-slate-50 border border-slate-150 rounded-xl space-y-2">
                      <strong className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Individual Documents</strong>
                      <div className="flex items-center gap-2">
                        <input 
                          type="checkbox" 
                          checked={docChecklist.ids}
                          onChange={(e) => setDocChecklist(prev => ({ ...prev, ids: e.target.checked }))}
                        />
                        <span>Government Valid IDs</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <input 
                          type="checkbox" 
                          checked={docChecklist.address}
                          onChange={(e) => setDocChecklist(prev => ({ ...prev, address: e.target.checked }))}
                        />
                        <span>Official Address Proof</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <input 
                          type="checkbox" 
                          checked={docChecklist.financial}
                          onChange={(e) => setDocChecklist(prev => ({ ...prev, financial: e.target.checked }))}
                        />
                        <span>Inquirer Bank Assets statement</span>
                      </div>
                    </div>

                    <div className="p-3 bg-slate-50 border border-slate-150 rounded-xl space-y-2">
                      <strong className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">SEC Corporation Covenants</strong>
                      <div className="flex items-center gap-2">
                        <input 
                          type="checkbox" 
                          checked={docChecklist.sec}
                          onChange={(e) => setDocChecklist(prev => ({ ...prev, sec: e.target.checked }))}
                        />
                        <span>SEC Registration Form</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <input 
                          type="checkbox" 
                          checked={docChecklist.articles}
                          onChange={(e) => setDocChecklist(prev => ({ ...prev, articles: e.target.checked }))}
                        />
                        <span>Articles of Incorporation</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <input 
                          type="checkbox" 
                          checked={docChecklist.mayor}
                          onChange={(e) => setDocChecklist(prev => ({ ...prev, mayor: e.target.checked }))}
                        />
                        <span>LGU Mayor's Business Permit</span>
                      </div>
                    </div>
                  </div>

                  {/* Upload logs tracking */}
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-bold text-slate-400 uppercase block tracking-wider">Uploaded Compliance Files Registry</span>
                    <div className="border border-slate-200 bg-white p-3.5 rounded-xl space-y-2 text-xs">
                      {uploadedFiles.length === 0 ? (
                        <div className="text-slate-400 italic py-2 text-center">No uploaded documents compiled yet. Select quick pre-verify button above.</div>
                      ) : (
                        <div className="grid grid-cols-2 gap-2 font-mono text-[10.5px]">
                          {uploadedFiles.map((file) => (
                            <div key={file} className="flex items-center justify-between p-2 bg-slate-50/50 border border-slate-150 rounded-lg">
                              <span className="text-slate-650 truncate max-w-[150px]">{file}</span>
                              <Icons.CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* STAGE 4: LETTER OF INTENT (LOI) */}
              {activeStep.id === 'loi' && (
                <div className="space-y-4">
                  <div className="bg-slate-50 p-4 border border-slate-150 rounded-xl text-xs text-slate-500">
                    Prepare the specific presentation details summarizing brand values & physical trading layouts.
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Target Opening/Launch Date</label>
                      <input
                        type="date"
                        value={loiTargetDate}
                        onChange={(e) => setLoiTargetDate(e.target.value)}
                        className="w-full bg-white border border-slate-200 px-3 py-2 text-xs font-semibold rounded-lg focus:ring-1 focus:ring-indigo-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Proposed Visual Concept Name</label>
                      <input
                        type="text"
                        value={loiConceptName}
                        onChange={(e) => setLoiConceptName(e.target.value)}
                        className="w-full bg-white border border-slate-200 px-3 py-2 text-xs font-semibold rounded-lg focus:ring-1 focus:ring-indigo-500 outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Interactive Brand Presentation deck</label>
                    <div className="border-2 border-dashed border-slate-200 hover:border-indigo-400 p-5 rounded-2xl text-center cursor-pointer transition-colors">
                      <Icons.FileText className="w-7 h-7 text-indigo-500 mx-auto mb-2" />
                      <span className="text-xs font-semibold block text-slate-700">{loiBrandDeckName}</span>
                      <span className="text-[10px] text-slate-400 mt-1 block">Click to upload alternative concept layout renders</span>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={handleLoiSubmit}
                      className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 px-4 rounded-xl text-xs transition-colors cursor-pointer"
                    >
                      Dispatch LOI Proposal Deck to Vetting Panel
                    </button>
                    <div className="flex items-center gap-1 px-4.5 bg-slate-100 rounded-xl border border-slate-200 font-mono text-[11px] font-extrabold select-none">
                      STATUS: <span className={loiStatus === 'Approved' ? 'text-emerald-500' : 'text-amber-500'}>{loiStatus}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* STAGE 5: BUSINESS EVALUATION PANEL */}
              {activeStep.id === 'evaluation' && (
                <div className="space-y-4">
                  <div className="bg-slate-50 border border-slate-150 p-4 rounded-xl text-xs text-slate-500">
                    Mall Administration evaluates commercial density profiles for newly submitted concept proposals. Financial credentials are under exhaustive trace.
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { key: 'financial', label: 'Financial Reserve capacity', val: evaluationScores.financial, color: 'bg-emerald-500' },
                      { key: 'brandFit', label: 'Brand Synergy Index', val: evaluationScores.brandFit, color: 'bg-indigo-500' },
                      { key: 'competitionOverlap', label: 'Category Competitor buffer', val: evaluationScores.competitionOverlap, color: 'bg-blue-500' },
                      { key: 'demandDensity', label: 'Target Demographic demand', val: evaluationScores.demandDensity, color: 'bg-amber-500' },
                    ].map((m) => (
                      <div key={m.key} className="bg-slate-50 p-3.5 border border-slate-150/50 rounded-xl space-y-1.5">
                        <div className="flex justify-between items-baseline text-xs">
                          <span className="font-semibold text-slate-700">{m.label}</span>
                          <span className="font-mono font-bold text-slate-800">{m.val}%</span>
                        </div>
                        <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${m.val}%` }}
                            transition={{ duration: 1 }}
                            className={`h-full ${m.color}`} 
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase block tracking-wider">Evaluation Board Audit Activity Trajectory</span>
                    <div className="bg-slate-900 text-slate-300 font-mono text-[10px] p-3 rounded-xl space-y-1.5 h-[100px] overflow-y-auto">
                      {evalLog.map((log, i) => (
                        <div key={i} className="flex gap-2">
                          <span className="text-slate-500">▶</span>
                          <span>{log}</span>
                        </div>
                      ))}
                      <div className="flex gap-2 text-emerald-400">
                        <span className="text-emerald-500">✔</span>
                        <span>[Panel Concluded] - Strategic evaluation check completed.</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* STAGE 6: THE CORE LEASING COST SHEET INVOICE BREAKDOWN */}
              {activeStep.id === 'proposal' && (
                <div className="space-y-4">
                  <div className="bg-slate-50 border border-slate-150 p-4 rounded-xl text-xs text-slate-500">
                    Propose specific, editable parameter multipliers to simulate monthly commercial term statement sheets.
                  </div>

                  {/* COST SHEET LAYOUT SLIDERS */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-50 p-3 rounded-lg border border-slate-150/70 space-y-2">
                      <div className="flex justify-between items-center text-[10px] uppercase font-bold text-slate-400">
                        <span>Base Rent Rate</span>
                        <span className="font-mono text-slate-905 text-slate-800">₱{baseRentRate}/sqm</span>
                      </div>
                      <input 
                        type="range" 
                        min="500" 
                        max="2500" 
                        step="50"
                        value={baseRentRate}
                        onChange={(e) => setBaseRentRate(Number(e.target.value))}
                        className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                      />
                    </div>

                    <div className="bg-slate-50 p-3 rounded-lg border border-slate-150/70 space-y-2">
                      <div className="flex justify-between items-center text-[10px] uppercase font-bold text-slate-400">
                        <span>CUSA Maintenance</span>
                        <span className="font-mono text-slate-905 text-slate-800">₱{cusaRate}/sqm</span>
                      </div>
                      <input 
                        type="range" 
                        min="100" 
                        max="600" 
                        step="20"
                        value={cusaRate}
                        onChange={(e) => setCusaRate(Number(e.target.value))}
                        className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                      />
                    </div>
                  </div>

                  {/* USER REQUEST SPECIFIC - HIGH FIDELITY INVOICE BLOCK SCREEN */}
                  <div className="bg-slate-950 text-emerald-400 rounded-2xl p-5 border border-slate-900 font-mono space-y-3.5 shadow-md">
                    <div className="flex justify-between items-center border-b border-slate-850 pb-2.5">
                      <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Pro-Forma Monthly Rent Statement</span>
                      <span className="text-[9px] text-slate-500">MALL ACCORD PK-092</span>
                    </div>

                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between">
                        <span className="text-slate-350">Base Demised Rent Area ({inquiryArea} sqm):</span>
                        <span className="text-slate-100">₱ {basicRentSum.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-350">CUSA Levies Service Level:</span>
                        <span className="text-slate-100">₱ {cusaSum.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                      </div>
                      <div className="flex justify-between border-b border-dashed border-slate-800 pb-2">
                        <span className="text-slate-350">Common Promo/Marketing Dues:</span>
                        <span className="text-slate-100">₱ {marketingSum.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                      </div>
                      <div className="flex justify-between items-baseline pt-2">
                        <span className="font-bold text-white text-sm uppercase">Gross Monthly Lease:</span>
                        <span className="text-base text-emerald-400 font-bold">₱ {grossMonthlyOutlay.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                      </div>
                    </div>
                  </div>

                  {/* Additional stats parameters */}
                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div className="p-3 bg-slate-50 border border-slate-150 rounded-xl">
                      <span className="text-[9px] font-bold text-slate-400 uppercase block tracking-wider">Fit-out Grace Duration</span>
                      <strong className="text-slate-800 font-bold block mt-1">{fitoutWeeks} Weeks Rent-Free Work Time</strong>
                    </div>
                    <div className="p-3 bg-slate-50 border border-slate-150 rounded-xl">
                      <span className="text-[9px] font-bold text-slate-400 uppercase block tracking-wider">Annual Escalation Index</span>
                      <strong className="text-slate-800 font-bold block mt-1">{escalationRate}% escalation from Year 2</strong>
                    </div>
                  </div>
                </div>
              )}

              {/* STAGE 7: RESERVATION / ACCEPTANCE PAYMENT */}
              {activeStep.id === 'reservation' && (
                <div className="space-y-4">
                  <div className="bg-slate-50 border border-slate-150 p-4 rounded-xl text-xs text-slate-500">
                    Settle security guarantee allocations block (typically refundable deposits equivalent to 3 months basis rent) to officially hold the chosen zone.
                  </div>

                  <div className="border border-slate-200 bg-white p-4 rounded-2xl text-xs space-y-3 font-sans">
                    <div className="flex justify-between font-bold border-b border-slate-100 pb-2 text-slate-800 text-[13px]">
                      <span>Acquisitions Guarantee Ledger</span>
                      <span className="text-[10px] font-mono font-normal">Account: Philippine Savings Bank</span>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-slate-550 text-slate-500">Holding Reservation Fee:</span>
                        <span className="font-mono">₱ 15,000.00</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-550 text-slate-500">Refundable Sec-Deposit (3 months):</span>
                        <span className="font-mono">₱ {(basicRentSum * 3).toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                      </div>
                      <div className="flex justify-between border-b border-slate-150 pb-2">
                        <span className="text-slate-550 text-slate-500">Advance Rental Reserve (2 months):</span>
                        <span className="font-mono">₱ {(basicRentSum * 2).toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                      </div>
                      <div className="flex justify-between text-slate-800 font-bold font-sans text-sm pt-1">
                        <span>Total Settle Dues:</span>
                        <span className="text-slate-900">₱ {(15000 + basicRentSum * 5).toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handleAcceptReservation}
                    disabled={reservationPaid}
                    className="w-full bg-indigo-650 hover:bg-indigo-700 disabled:bg-emerald-600 font-bold text-white p-3 rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    {reservationPaid ? (
                      <>
                        <Icons.Check className="w-4 h-4" /> Paid & Confirmed on {paidDate}
                      </>
                    ) : (
                      <>
                        <Icons.Coins className="w-4 h-4" /> Accept Terms & Settle Reservation Dues
                      </>
                    )}
                  </button>
                </div>
              )}

              {/* STAGE 8: LEASE CONTRACT PREPARATION */}
              {activeStep.id === 'contract_prep' && (
                <div className="space-y-4">
                  <div className="bg-slate-50 border border-slate-150 p-4 rounded-xl text-xs text-slate-500">
                    The administration legal panel has compiled a comprehensive multiyear contract draft. Choose an execution mechanism.
                  </div>

                  <div className="grid grid-cols-2 gap-3.5">
                    <button
                      onClick={() => setShowDraftModal(true)}
                      className="bg-slate-950 hover:bg-slate-900 border border-slate-900/40 text-white font-bold p-4 rounded-2xl text-xs flex flex-col items-center justify-center gap-2 cursor-pointer transition-transform hover:scale-[1.01]"
                    >
                      <Icons.Eye className="w-6 h-6 text-indigo-400" />
                      <span>✅ View Draft Contract</span>
                    </button>
                    
                    <button
                      onClick={() => {
                        const blob = new Blob([`--- COMPREHENSIVE CONTRACT OF COMMERCIAL LEASE ---\nLandlord: Virtual Studios Lands Co.\nTenant: ${inquiryBizName}\nLocation: ${selectedUnit}\nArea Size: ${inquiryArea} sqm\nMonthly dues: ₱${grossMonthlyOutlay.toLocaleString()}\nTerm duration: 3 Years`], { type: 'text/plain' });
                        const link = document.createElement('a');
                        link.href = URL.createObjectURL(blob);
                        link.download = `Lease_Agreement_Draft_${inquiryBizName.replace(/\s+/g, '_')}.txt`;
                        link.click();
                      }}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold p-4 rounded-2xl text-xs flex flex-col items-center justify-center gap-2 cursor-pointer transition-transform hover:scale-[1.01]"
                    >
                      <Icons.FileDown className="w-6 h-6 text-white" />
                      <span>✅ Download PDF Contract</span>
                    </button>
                  </div>

                  <button
                    onClick={() => setShowESignModal(true)}
                    className="w-full bg-emerald-500 hover:bg-emerald-600 border border-emerald-500 text-slate-950 font-bold p-3.5 rounded-2xl text-xs flex items-center justify-center gap-2 cursor-pointer transition-colors mt-2"
                  >
                    <Icons.PenTool className="w-4 h-4 stroke-[2.5]" />
                    <span>✅ Execute Digital E-Sign Agreement</span>
                  </button>

                  {contractSigned && (
                    <motion.div 
                      initial={{ opacity: 0 }} 
                      animate={{ opacity: 1 }} 
                      className="bg-emerald-50 border border-emerald-200 text-emerald-805 p-3 rounded-xl flex items-center gap-2.5 text-xs text-emerald-800"
                    >
                      <Icons.CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
                      <span>Lease execution signatures bound. Lease legally locked!</span>
                    </motion.div>
                  )}
                </div>
              )}

              {/* STAGE 9: CONTRACT SIGNING CHRONICLE */}
              {activeStep.id === 'signing' && (
                <div className="space-y-4">
                  <div className="bg-slate-50 border border-slate-150 p-4 rounded-xl text-xs text-slate-500">
                    Signing execution trajectory logs and automated cloud copy transmission checks.
                  </div>

                  <div className="border border-slate-205 bg-white p-4 rounded-2xl text-xs space-y-3.5">
                    <div className="flex justify-between items-baseline border-b border-slate-100 pb-2">
                      <strong className="text-slate-800">Signing Audit Pipeline Trails</strong>
                      <span className="text-[10px] font-mono text-indigo-500 font-bold">{signingStatus}</span>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between items-center bg-slate-50 p-2.5 rounded-lg border border-slate-150/55">
                        <div className="flex items-center gap-2">
                          <div className={`w-2.5 h-2.5 rounded-full ${contractSigned ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                          <span>Tenant Representative ({signatureText})</span>
                        </div>
                        <span className="font-mono text-[10px] font-bold text-slate-500">{contractSigned ? 'SIGNED' : 'PENDING'}</span>
                      </div>

                      <div className="flex justify-between items-center bg-slate-50 p-2.5 rounded-lg border border-slate-150/55">
                        <div className="flex items-center gap-2">
                          <div className={`w-2.5 h-2.5 rounded-full ${contractSigned ? 'bg-emerald-500' : 'bg-slate-300'}`} />
                          <span>Administration Witness Notary</span>
                        </div>
                        <span className="font-mono text-[10px] font-bold text-slate-500">{contractSigned ? 'EXECUTED' : 'PENDING'}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-150 space-y-3.5">
                    <strong className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Dispatch System Configurations</strong>
                    
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2.5">
                        <Icons.CheckSquare className="w-4 h-4 text-indigo-500" />
                        <span>Automatically generate static PDF secure files.</span>
                      </div>
                      <input 
                        type="checkbox" 
                        checked={autogenPdf}
                        onChange={(e) => setAutogenPdf(e.target.checked)}
                        className="cursor-pointer"
                      />
                    </div>

                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2.5">
                        <Icons.Mail className="w-4 h-4 text-indigo-500" />
                        <span>Send complete signed carbon copy to {inquiryEmail}.</span>
                      </div>
                      <input 
                        type="checkbox" 
                        checked={autoEmail}
                        onChange={(e) => setAutoEmail(e.target.checked)}
                        className="cursor-pointer"
                      />
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setContractSigned(true);
                      setSigningStatus('Fully Executed');
                      // set sub checklists
                      setCompletedSubSteps(prev => ({
                        ...prev,
                        ['signing_0']: true,
                        ['signing_1']: true,
                        ['signing_2']: true,
                        ['signing_3']: true,
                      }));
                    }}
                    className="w-full bg-indigo-650 hover:bg-indigo-700 text-white font-bold p-3 rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Icons.CheckCircle className="w-4 h-4" /> Simulate Perfect Execution
                  </button>
                </div>
              )}

              {/* STAGE 10: FIT-OUT APPLICATION PLAN FILES SUBMISSION */}
              {activeStep.id === 'fitout_app' && (
                <div className="space-y-4">
                  <div className="bg-slate-50 border border-slate-150 p-4 rounded-xl text-xs text-slate-500">
                    Submit complete blueprint technical plans for architectural and electrical review.
                  </div>

                  <div className="space-y-2 text-xs">
                    {[
                      { key: 'storeDesign', label: 'Store Facade / Identity Perspective', placeholder: 'facade_elevation_final.pdf' },
                      { key: 'architecturalPlans', label: 'Architectural Partition Floor Specs', placeholder: 'floor_layouts_civil_102.pdf' },
                      { key: 'mechanicalPlans', label: 'Mechanical HVAC / Vent Airflow layout', placeholder: 'ac_duct_layout.pdf' },
                      { key: 'electricalPlans', label: 'Electrical schedule of loads Single-Line', placeholder: 'electrical_computations.pdf' },
                      { key: 'fireProtectionPlans', label: 'Fire protection sprinkler loop paths', placeholder: 'bfp_sprinkler_diagram.pdf' }
                    ].map((plan) => (
                      <div key={plan.key} className="flex justify-between items-center p-3 bg-slate-50/50 border border-slate-150 rounded-xl">
                        <div className="flex flex-col">
                          <span className="font-bold text-slate-800">{plan.label}</span>
                          <span className="text-[10px] text-slate-400 font-mono mt-0.5">
                            {engineeringFiles[plan.key] || 'Empty - Click to compile plan file'}
                          </span>
                        </div>

                        <button
                          onClick={() => {
                            setEngineeringFiles(prev => ({
                              ...prev,
                              [plan.key]: plan.placeholder
                            }));
                          }}
                          className={`text-[10px] font-mono font-bold px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
                            engineeringFiles[plan.key]
                              ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                              : 'bg-white border-slate-200 text-indigo-600 hover:bg-indigo-50/20'
                          }`}
                        >
                          {engineeringFiles[plan.key] ? '✓ Uploaded' : 'Simulate Upload'}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* STAGE 11: PLAN APPROVAL COMMENTS BY ENGINEERING TEAM */}
              {activeStep.id === 'plan_approval' && (
                <div className="space-y-4">
                  <div className="bg-slate-50 border border-slate-150 p-4 rounded-xl text-xs text-slate-500">
                    Admin Engineering reviews plan applications. Direct changes requested are logged below.
                  </div>

                  <div className="bg-white border border-slate-200 rounded-2xl p-4 space-y-3.5 text-xs text-slate-700">
                    <div className="flex justify-between items-baseline border-b border-slate-100 pb-2">
                      <strong className="text-slate-800">Engineering Review status</strong>
                      <span className={`text-[10px] font-mono font-bold uppercase ${
                        planReviewStatus === 'Approved' ? 'text-emerald-500' : 'text-amber-500'
                      }`}>{planReviewStatus}</span>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Administrator Vetting Feedback Comments</label>
                      <textarea
                        value={engineerRemarks}
                        onChange={(e) => setEngineerRemarks(e.target.value)}
                        className="w-full h-20 bg-slate-50 border border-slate-150 rounded-lg p-2.5 font-mono text-xs focus:ring-1 focus:ring-indigo-500 outline-none"
                      />
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setPlanReviewStatus('Approved');
                        setEngineerRemarks('All plans successfully approved. Fit-out mobilization authorization issued.');
                        setCompletedSubSteps(prev => ({
                          ...prev,
                          ['plan_approval_0']: true,
                          ['plan_approval_1']: true,
                          ['plan_approval_2']: true,
                          ['plan_approval_3']: true,
                        }));
                      }}
                      className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold p-3 rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Icons.BadgeCheck className="w-4 h-4" /> Approve Submitted Plans
                    </button>
                    <button
                      onClick={() => setPlanReviewStatus('Revision Required')}
                      className="bg-white border border-slate-250 text-slate-600 hover:bg-slate-50 font-bold px-4 rounded-xl text-xs transition-colors cursor-pointer"
                    >
                      Issue Revision Comment
                    </button>
                  </div>
                </div>
              )}

              {/* STAGE 12: CONSTRUCTION FIT-OUT TRACKER */}
              {activeStep.id === 'construction' && (
                <div className="space-y-4">
                  <div className="bg-slate-50 border border-slate-150 p-4 rounded-xl text-xs text-slate-500">
                    Track the progress of drywall assembly, cabling, safety and construction over your {fitoutWeeks * 7} day window.
                  </div>

                  <div className="bg-slate-900 text-white border border-slate-950 p-5 rounded-2xl space-y-4 font-mono text-xs relative overflow-hidden shadow-sm">
                    <div className="absolute top-0 right-0 p-3 text-[9px] font-bold bg-indigo-900 border border-indigo-805 text-indigo-400 uppercase rounded">
                      Graveyard Shifts Active (9PM - 8AM)
                    </div>

                    <div className="flex justify-between items-baseline border-b border-slate-800 pb-2.5">
                      <span>Physical Progress Board</span>
                      <span className="text-emerald-400 font-bold">Day {constructionDay} of {fitoutWeeks * 7}</span>
                    </div>

                    {/* Progress sliders */}
                    <div className="space-y-2">
                      <span className="text-[10px] text-slate-400 uppercase">Interactive Day Slider Range</span>
                      <input
                        type="range"
                        min="1"
                        max={fitoutWeeks * 7}
                        value={constructionDay}
                        onChange={(e) => setConstructionDay(Number(e.target.value))}
                        className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                      />
                    </div>

                    {/* Checkbox tasks corresponding to slider range */}
                    <div className="space-y-2 text-[11px] text-slate-300">
                      <div className="flex gap-2 items-center">
                        <Icons.CheckCircle className={`w-4 h-4 shrink-0 ${constructionDay >= 1 ? 'text-emerald-400 animate-pulse' : 'text-slate-700'}`} />
                        <span>Day 1: Mobilization & board-up barriers setup</span>
                      </div>
                      <div className="flex gap-2 items-center">
                        <Icons.CheckCircle className={`w-4 h-4 shrink-0 ${constructionDay >= 15 ? 'text-emerald-400 animate-pulse' : 'text-slate-700'}`} />
                        <span>Day 15: Utility wire pulling & drywall partition completion</span>
                      </div>
                      <div className="flex gap-2 items-center">
                        <Icons.CheckCircle className={`w-4 h-4 shrink-0 ${constructionDay >= 30 ? 'text-emerald-400 animate-pulse' : 'text-slate-700'}`} />
                        <span>Day 30: Sprinkler inspections & light fitting tests</span>
                      </div>
                      <div className="flex gap-2 items-center">
                        <Icons.CheckCircle className={`w-4 h-4 shrink-0 ${constructionDay >= 45 ? 'text-emerald-400 animate-pulse' : 'text-slate-700'}`} />
                        <span>Day 45 (End): Completion, cleanup & final touchups</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* STAGE 13: PRE-OPENING DEPARTMENT ALIGNMENT INSPECTION */}
              {activeStep.id === 'inspection' && (
                <div className="space-y-4">
                  <div className="bg-slate-50 border border-slate-150 p-4 rounded-xl text-xs text-slate-500">
                    Conduct specialized, checklist-based pre-opening inspections. Every division must issue clearance before trading.
                  </div>

                  <div className="space-y-3">
                    {[
                      { key: 'engineering', dept: 'Engineering Directorate', check: 'Hydrostatic pressure leaks check, grease trap connections, main utility balance' },
                      { key: 'safety', dept: 'Safety & BFP Officials', check: 'Fire extinguishement positions, smoke alarms loop connection, emergency signage illumination' },
                      { key: 'operations', dept: 'Operations & POS Integration', check: 'POS telemetry cash checkout telemetry loop tests, employee records clearance' }
                    ].map((dept) => (
                      <div 
                        key={dept.key}
                        onClick={() => setInspectionChecked(prev => ({ ...prev, [dept.key]: !prev[dept.key] }))}
                        className={`p-3.5 rounded-xl border flex justify-between items-center transition-all cursor-pointer ${
                          inspectionChecked[dept.key]
                            ? 'border-emerald-500 bg-emerald-50/10'
                            : 'border-slate-150 hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-5 h-5 rounded-lg border flex items-center justify-center shrink-0 ${
                            inspectionChecked[dept.key] ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-slate-350 bg-white'
                          }`}>
                            {inspectionChecked[dept.key] && <Icons.Check className="w-3.5 h-3.5 stroke-[3]" />}
                          </div>
                          <div className="text-xs">
                            <strong className="text-slate-800 block">{dept.dept}</strong>
                            <p className="text-[10px] text-slate-400 leading-tight mt-0.5">{dept.check}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-150 text-[11px] text-slate-500 text-center select-none font-medium">
                    Inspection Target Completion Ratio: {
                      Object.values(inspectionChecked).filter(Boolean).length
                    } of 3 Departments.
                  </div>
                </div>
              )}

              {/* STAGE 14: BARANGAY TURNOVER & MOVE-IN PERMIT */}
              {activeStep.id === 'turnover' && (
                <div className="space-y-4">
                  <div className="bg-slate-50 border border-slate-150 p-4 rounded-xl text-xs text-slate-500">
                    With all inspections approved, the administration generates the official, gold-stamped Move-In authorization permit.
                  </div>

                  <div className="p-5 border-2 border-dashed border-slate-200 rounded-3xl text-center space-y-4">
                    <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto border border-indigo-150 shadow-inner">
                      <Icons.Key className="w-6 h-6 animate-pulse" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-800">Administrative Turnover Clearances</h4>
                      <p className="text-[11.5px] text-slate-400 leading-relaxed max-w-sm mx-auto mt-0.5">
                        Issuing official Grand Opening Authority triggers final dust barriers removal permissions.
                      </p>
                    </div>

                    <div className="flex gap-2 justify-center">
                      <button
                        onClick={() => {
                          setPermitUnlocked(true);
                          setShowPermitModal(true);
                          setCompletedSubSteps(prev => ({
                            ...prev,
                            ['turnover_0']: true,
                            ['turnover_1']: true,
                            ['turnover_2']: true,
                            ['turnover_3']: true,
                          }));
                        }}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-4 py-2 text-xs rounded-xl flex items-center gap-1 cursor-pointer transition-colors"
                      >
                        <Icons.Award className="w-4 h-4 text-emerald-300" />
                        <span>Generate & View Official Opening Permit</span>
                      </button>
                      
                      {permitUnlocked && (
                        <button
                          onClick={() => setShowPermitModal(true)}
                          className="bg-slate-900 hover:bg-slate-950 border border-slate-900 text-white font-bold px-3 py-2 text-xs rounded-xl transition-all cursor-pointer"
                        >
                          View Permit
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* STAGE 15: BRAND OPENING DAY */}
              {activeStep.id === 'opening' && (
                <div className="space-y-4">
                  <div className="bg-slate-900 text-white border border-slate-950 p-5 rounded-3xl relative overflow-hidden text-center space-y-3 shadow-md">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />
                    
                    <div className="text-3xl relative z-10 animate-bounce">🎉</div>
                    <div className="relative z-10">
                      <h3 className="text-sm font-bold text-white tracking-wide uppercase font-mono text-emerald-400">Open for Business!</h3>
                      <p className="text-xs text-slate-300 leading-relaxed font-light mt-1 max-w-sm mx-auto">
                        Dust board-ups dismantled. Real-time POS checkout sync live. Welcome active customers to <strong className="text-white font-semibold font-sans">{inquiryBizName}</strong>!
                      </p>
                    </div>

                    <button
                      onClick={() => setOpeningCeremonyActive(prev => !prev)}
                      className="relative z-10 bg-emerald-500 hover:bg-emerald-600 text-slate-955 text-slate-950 font-bold px-5 py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5 mx-auto cursor-pointer"
                    >
                      <Icons.PartyPopper className="w-4 h-4 animate-spin" />
                      <span>{openingCeremonyActive ? 'Dampen Confetti' : 'Activate Celebration Confetti'}</span>
                    </button>
                  </div>

                  <div className="space-y-1.5">
                    <strong className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Trading System Active Trails Log</strong>
                    <div className="bg-slate-50 border border-slate-150 p-3 rounded-2xl space-y-1.5 h-[80px] overflow-y-auto font-mono text-[10px] text-slate-500">
                      {openingDignitaryLog.map((log, idx) => (
                        <div key={idx} className="flex gap-1.5">
                          <span>•</span>
                          <span>{log}</span>
                        </div>
                      ))}
                      <div className="text-emerald-600 font-semibold">• Live transactions recording started at local clock.</div>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>

          <div className="border-t border-slate-100 pt-4 mt-6 flex justify-between items-center text-[11px] text-slate-400">
            <span className="flex items-center gap-1">
              <Icons.ShieldAlert className="w-3.5 h-3.5 text-indigo-500" /> Sandboxed Advisory Verification Engine
            </span>
            <span>Virtual Studios PH Realtors v3.4</span>
          </div>

        </div>
      </div>

      {/* --- OVERLAY MODALS AND SIMULATORS --- */}

      {/* MODAL 1: VIEW CONTRACT AGREEMENT COVENANT TEXT */}
      <AnimatePresence>
        {showDraftModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 font-sans text-slate-800">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl shadow-xl border border-slate-200 max-w-2xl w-full flex flex-col overflow-hidden max-h-[85vh]"
            >
              <div className="bg-slate-950 text-white p-5 flex justify-between items-center shrink-0">
                <div>
                  <h3 className="text-xs font-mono tracking-widest text-indigo-400 uppercase font-bold">Draft Document Preview</h3>
                  <span className="text-sm font-semibold text-white font-display block mt-1">CONTRACT OF COMMERCIAL LEASE</span>
                </div>
                <button 
                  onClick={() => setShowDraftModal(false)}
                  className="bg-slate-800 hover:bg-slate-700 text-white p-2 rounded-xl transition-colors cursor-pointer"
                >
                  <Icons.X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-6 overflow-y-auto space-y-5 text-xs text-slate-700 leading-relaxed font-sans max-h-[450px]">
                <div className="text-center font-bold text-slate-900 uppercase space-y-1">
                  <div>CONTRACT OF LEASE</div>
                  <div className="text-[10px] font-mono font-normal">SEC NO. PL-2026-967D88</div>
                </div>

                <div className="space-y-3">
                  <p>
                    <strong>KNOW ALL MEN BY THESE PRESENTS:</strong>
                  </p>
                  <p>
                    This Contract of Commercial Lease, executed in Metro Manila, Philippines by and between <strong>VIRTUAL STUDIOS REALTY CORPORATION</strong>, represented herein by its Administrative Panel (hereinafter referred to as the "LESSOR"), and <strong>{inquiryBizName}</strong> (hereinafter referred to as the "LESSEE").
                  </p>
                  <p>
                    <strong>RESOLVED COVENANT COMPLIANCE TERMS:</strong>
                  </p>
                  <ol className="list-decimal pl-5 space-y-2">
                    <li>
                      <strong>Demised Premises:</strong> The Lessor hereby leases unto the Lessee is specifically situated at <strong>{selectedUnit}</strong> consisting of exactly <strong>{inquiryArea} sqm</strong>.
                    </li>
                    <li>
                      <strong>Lease payments:</strong> The basic monthly rent is calculated based at ₱{baseRentRate}/sqm totaling exactly <strong>₱{(inquiryArea*baseRentRate).toLocaleString()}</strong> basic rent dues, exclusive of the standard 12% Value Added Tax (VAT) and subject to 5% expanded withholding tax Form 2307.
                    </li>
                    <li>
                      <strong>CUSA Fees:</strong> Common usages area fees of ₱{cusaRate}/sqm shall be contributed monthly by the Lessee.
                    </li>
                    <li>
                      <strong>RestorationBare Shell restaurations:</strong> Upon termination or exit, lessee binds legally to restore premises bare concrete condition ( bare shell condition ).
                    </li>
                  </ol>
                </div>

                <div className="border-t border-slate-200 pt-4 flex justify-between items-center text-[10px] text-slate-400">
                  <span>MD5 Hash: FE9A66701C9D66BD</span>
                  <span>Draft Review Version 3</span>
                </div>
              </div>

              <div className="bg-slate-50 border-t border-slate-150 p-4.5 flex justify-end gap-2.5 shrink-0">
                <button 
                  onClick={() => {
                    setShowDraftModal(false);
                    setShowESignModal(true);
                  }}
                  className="bg-emerald-500 hover:bg-emerald-600 font-bold px-4 py-2 rounded-xl text-xs text-slate-950 transition-colors cursor-pointer"
                >
                  Proceed to Sign Agreement
                </button>
                <button 
                  onClick={() => setShowDraftModal(false)}
                  className="bg-white border border-slate-250 text-slate-600 font-bold px-4 py-2 rounded-xl text-xs hover:bg-slate-50 transition-all cursor-pointer"
                >
                  Close Draft
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL 2: DIGITAL E-SIGN PAD OVERLAY */}
      <AnimatePresence>
        {showESignModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 font-sans text-slate-800">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl shadow-xl border border-slate-200 max-w-md w-full overflow-hidden"
            >
              <div className="bg-slate-950 text-white p-5 flex justify-between items-center shrink-0 pb-3">
                <div>
                  <h3 className="text-xs font-mono tracking-widest text-indigo-400 uppercase font-bold">DocuSign Advisory Integration</h3>
                  <span className="text-sm font-semibold text-white block mt-0.5">Adopt hand-written signature</span>
                </div>
                <button 
                  onClick={() => setShowESignModal(false)}
                  className="bg-slate-800 hover:bg-slate-700 text-white p-2 rounded-xl transition-colors cursor-pointer"
                >
                  <Icons.X className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="p-5 space-y-4 text-xs font-sans">
                <div className="flex bg-slate-100 p-1 rounded-xl">
                  <button 
                    onClick={() => setSigType('type')}
                    className={`flex-1 py-1.5 rounded-lg text-[11px] font-bold transition-all ${
                      sigType === 'type' ? 'bg-white text-slate-900 shadow-xxs' : 'text-slate-500'
                    }`}
                  >
                    Cursive Keyboard Type
                  </button>
                  <button 
                    onClick={() => setSigType('draw')}
                    className={`flex-1 py-1.5 rounded-lg text-[11px] font-bold transition-all ${
                      sigType === 'draw' ? 'bg-white text-slate-900 shadow-xxs' : 'text-slate-500'
                    }`}
                  >
                    Draw Signature Cursor
                  </button>
                </div>

                {sigType === 'type' ? (
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold text-slate-400 uppercase">Input Representing Legal Name</label>
                    <input 
                      type="text" 
                      value={signatureText} 
                      onChange={(e) => setSignatureText(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 p-2.5 text-xs font-semibold rounded-lg focus:ring-1 focus:ring-indigo-500 outline-none"
                    />
                    <div className="border border-slate-200 bg-slate-50 p-6 rounded-xl flex items-center justify-center min-h-[100px] select-none text-center">
                      <span className="font-serif text-3xl font-light italic text-indigo-650 text-indigo-600 tracking-wider">
                        {signatureText || 'Enter Name'}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Signature Pad Arena</span>
                    <div className="border-2 border-dashed border-slate-300 bg-slate-50 rounded-xl h-28 flex flex-col items-center justify-center text-center select-none cursor-crosshair">
                      <Icons.PenTool className="w-6 h-6 text-slate-450 text-slate-400 mb-1" />
                      <span className="text-[10px] text-slate-450">Draw with cursor...</span>
                      <div className="w-full text-indigo-500 font-serif text-2xl italic select-none pointer-events-none mt-1">
                        {signatureText}
                      </div>
                    </div>
                  </div>
                )}

                <div className="bg-slate-50 p-3 rounded-lg border border-slate-150 text-[10px] text-slate-400 font-light leading-relaxed">
                  By clicking Adopt & Sign, you authorize that this serves as your legally binding witness signature endorsing the Philippine commercial contract.
                </div>
              </div>

              <div className="p-4 border-t border-slate-100 flex justify-end gap-2.5">
                <button 
                  onClick={handleAdoptAndEsign}
                  disabled={!signatureText.trim()}
                  className="bg-emerald-500 hover:bg-emerald-600 disabled:opacity-40 font-bold px-4.5 py-2.5 rounded-xl text-xs text-slate-950 cursor-pointer"
                >
                  Adopt and Sign Agreement
                </button>
                <button 
                  onClick={() => setShowESignModal(false)}
                  className="bg-white border border-slate-200 text-slate-600 font-bold px-3 py-2 rounded-xl text-xs transition-colors cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL 3: GOLD STAMPED OFFICIAL OPENING PERMIT EXHIBIT */}
      <AnimatePresence>
        {showPermitModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 font-sans text-slate-800">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-amber-50/10 hover:bg-amber-50/20 border-4 border-double border-amber-400 text-slate-900 rounded-3xl p-8 max-w-lg w-full relative shadow-2xl bg-amber-50 overflow-hidden"
            >
              <div className="absolute -top-16 -right-16 w-32 h-32 bg-amber-400/20 rounded-full blur-2xl" />
              <div className="absolute -bottom-16 -left-16 w-32 h-32 bg-indigo-500/20 rounded-full blur-2xl" />

              {/* Close button */}
              <button 
                onClick={() => setShowPermitModal(false)}
                className="absolute top-4 right-4 bg-amber-100 hover:bg-amber-200 text-amber-900 p-1.5 rounded-lg border border-amber-300 transition-colors cursor-pointer"
              >
                <Icons.X className="w-4 h-4" />
              </button>

              <div className="border border-amber-300 p-6 rounded-2xl relative text-center space-y-6 font-serif">
                {/* Ribbon badge stamp */}
                <div className="mx-auto w-16 h-16 bg-amber-400 border-2 border-white rounded-full flex items-center justify-center text-white font-mono text-[10px] font-extrabold shadow-md transform rotate-12 rotate-[-8deg] shrink-0">
                  ★ SEAL ★
                </div>

                <div className="space-y-1 select-none">
                  <h1 className="text-xl font-extrabold tracking-widest uppercase text-amber-950">
                    OPENING & OCCUPANCY PERMIT
                  </h1>
                  <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-amber-800 block">
                    PHILIPPINES PUBLIC COMPLIANCE CERTIFICATE
                  </span>
                </div>

                <p className="text-xs font-sans leading-relaxed text-amber-900 font-light max-w-sm mx-auto">
                  This certifies that <strong>{inquiryBizName}</strong> has fully settled all required advances, completed pre-opening inspections, and is legally clearance-authorized for business trading at <strong>{selectedUnit}</strong>.
                </p>

                <div className="grid grid-cols-2 gap-4 text-[10px] font-sans border-t border-b border-amber-250 py-3 text-amber-955 text-amber-950">
                  <div>
                    <span className="block text-[9px] uppercase text-amber-700">Property Location Flag</span>
                    <strong>Parklinks Mall Compound</strong>
                  </div>
                  <div>
                    <span className="block text-[9px] uppercase text-amber-700">Licensing Authorization</span>
                    <strong className="font-mono">NAV-PERMIT-2026-99</strong>
                  </div>
                </div>

                <div className="font-sans text-[10px] text-amber-700 font-light select-none">
                  Issued on: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} • Virtual Studios Realtors Group
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
