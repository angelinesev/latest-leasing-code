import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import * as Icons from 'lucide-react';
import { StoreCategory, BusinessStructure, PropertyType, PhilippineRegion } from '../types';

interface QuickEstimatorProps {
  propertyType: PropertyType;
  category: StoreCategory;
  structure: BusinessStructure;
  region: PhilippineRegion;
  setRegion: (r: PhilippineRegion) => void;
  specificPlace: string;
  setSpecificPlace: (p: string) => void;
}

export const REGION_DETAILS = {
  bgc: { 
    id: 'bgc',
    name: 'BGC, Taguig City',
    fullName: 'Bonifacio Global City CBD', 
    multiplier: 1.25, 
    baseRental: 1800, 
    cusa: 450, 
    desc: 'BGC premium corporate zone. Managed with global standards, dual-power grids.' 
  },
  makati: { 
    id: 'makati',
    name: 'Makati CBD', 
    fullName: 'Makati Central Business District',
    multiplier: 1.15, 
    baseRental: 1550, 
    cusa: 380, 
    desc: 'Traditional primary capital hub. Dense corporate clusters & high regulatory inspections.' 
  },
  ortigas: { 
    id: 'ortigas',
    name: 'Ortigas CBD', 
    fullName: 'Ortigas Center (Pasig/Mandaluyong)',
    multiplier: 1.00, 
    baseRental: 1200, 
    cusa: 280, 
    desc: 'Active commercial crossway. Balanced tax assessments & central key accessibility.' 
  },
  cebu: { 
    id: 'cebu',
    name: 'Cebu IT Park', 
    fullName: 'Cebu IT Park, Lahug',
    multiplier: 0.85, 
    baseRental: 950, 
    cusa: 220, 
    desc: 'Visayas major technological anchor. Streamlined PEZA incentives for export operations.' 
  },
  davao: { 
    id: 'davao',
    name: 'Davao CBD', 
    fullName: 'Davao City Business District',
    multiplier: 0.70, 
    baseRental: 750, 
    cusa: 160, 
    desc: 'Southern Philippines core growth point. Lower cost base and municipal permit ranges.' 
  },
};

export default function QuickEstimator({ 
  propertyType, 
  category, 
  structure,
  region,
  setRegion,
  specificPlace,
  setSpecificPlace
}: QuickEstimatorProps) {
  // Local sliding parameter states
  const [spaceArea, setSpaceArea] = useState(30); 
  const [ratePerSqm, setRatePerSqm] = useState(1500); 
  const [cusaPerSqm, setCusaPerSqm] = useState(350); 
  const [secDepositMonths, setSecDepositMonths] = useState(3); 
  const [advanceMonths, setAdvanceMonths] = useState(3); 
  const [fitoutBondPerSqm, setFitoutBondPerSqm] = useState(500);
  
  // Custom PEZA tax-incentive toggle for corporate offices
  const [isPezaRegistered, setIsPezaRegistered] = useState(false);
  
  // Active copy states
  const [copiedText, setCopiedText] = useState(false);

  // Automatically adjust default space parameters when Category or Region changes to match PH standards
  useEffect(() => {
    setIsPezaRegistered(false); // Reset PEZA when changing categories
    
    // Base rentals customized by Category first
    let baseRate = 1200;
    let baseCusa = 255;
    let baseSpace = 30;
    let baseFitout = 500;

    if (category === 'cafe') {
      baseSpace = 45;
      baseRate = 1600;
      baseCusa = 350;
      baseFitout = 750;
    } else if (category === 'fashion') {
      baseSpace = 70;
      baseRate = 1200;
      baseCusa = 260;
      baseFitout = 500;
    } else if (category === 'electronics') {
      baseSpace = 120;
      baseRate = 1400;
      baseCusa = 280;
      baseFitout = 600;
    } else if (category === 'kiosk') {
      baseSpace = 12;
      baseRate = 2000;
      baseCusa = 450;
      baseFitout = 300;
    } else if (category === 'corp_hq') {
      baseSpace = 250;
      baseRate = 1000;
      baseCusa = 180;
      baseFitout = 400;
    } else if (category === 'coworking') {
      baseSpace = 400;
      baseRate = 800;
      baseCusa = 160;
      baseFitout = 450;
    } else if (category === 'medical') {
      baseSpace = 150;
      baseRate = 1100;
      baseCusa = 200;
      baseFitout = 550;
    } else if (category === 'bpo') {
      baseSpace = 800;
      baseRate = 750;
      baseCusa = 140;
      baseFitout = 500;
    }

    // Multiply standard rates by local region factor
    const rData = REGION_DETAILS[region] || REGION_DETAILS.ortigas;
    const factor = rData.multiplier;
    const adjustedRate = Math.round(baseRate * factor);
    const adjustedCusa = Math.round(baseCusa * (0.8 + (factor - 1) * 0.5)); // CUSA scales less aggressively than basic rent

    setSpaceArea(baseSpace);
    setRatePerSqm(adjustedRate);
    setCusaPerSqm(adjustedCusa);
    setFitoutBondPerSqm(baseFitout);
  }, [category, region]);

  const getSliderLimits = () => {
    switch (category) {
      case 'kiosk':
        return { min: 2, max: 40, step: 1, labelMin: '2 sqm', labelMax: '40 sqm' };
      case 'cafe':
      case 'fashion':
      case 'electronics':
        return { min: 10, max: 400, step: 5, labelMin: '10 sqm', labelMax: '400 sqm' };
      case 'medical':
        return { min: 20, max: 600, step: 10, labelMin: '20 sqm', labelMax: '600 sqm' };
      case 'corp_hq':
      case 'coworking':
        return { min: 50, max: 2000, step: 25, labelMin: '50 sqm', labelMax: '2,000 sqm' };
      case 'bpo':
        return { min: 100, max: 4000, step: 50, labelMin: '100 sqm', labelMax: '4,000 sqm' };
      default:
        return { min: 10, max: 800, step: 5, labelMin: '10 sqm', labelMax: '800 sqm' };
    }
  };

  const limits = getSliderLimits();

  // Financial Standard Calculations
  const basicMonthlyRent = spaceArea * ratePerSqm;
  const monthlyCUSA = spaceArea * cusaPerSqm;
  const combinedFee = basicMonthlyRent + monthlyCUSA;

  // PH Taxes: Rent + CUSA are subject to 12% VAT, except if PEZA accredited office space exports services
  const vatRate = (propertyType === 'office' && isPezaRegistered) ? 0 : 0.12;
  const vatAmount = combinedFee * vatRate;

  // EWT Withholding is calculated as 5% of Rent ONLY (CUSA is generally exempt from lease withholding unless bundled, BIR standard is 5% of Rent basic)
  const hasWithholdingTax = structure === 'corporate';
  const ewtWithholding = hasWithholdingTax ? basicMonthlyRent * 0.05 : 0;

  const tenantMonthlyOutflow = combinedFee + vatAmount - ewtWithholding;

  // Upfront Outlays at Contract Signing
  const securityDepositAmount = basicMonthlyRent * secDepositMonths; // Typically based on Basic Rent only
  const advanceRentalAmount = combinedFee * advanceMonths;
  const constructionBond = spaceArea * fitoutBondPerSqm;

  // Total Initial Cash Required (less generic 1 month basic rent reservation credit)
  const reservationCredit = basicMonthlyRent * 0.5; // typical reservation deposit credited back
  const totalLeaseInitialOutlay = (securityDepositAmount + advanceRentalAmount + constructionBond) - reservationCredit;

  // Format Category Label helper
  const getCategoryLabel = (cat: StoreCategory) => {
    switch (cat) {
      case 'cafe': return 'Cafe / Dining Spot';
      case 'fashion': return 'Apparel Retail';
      case 'electronics': return 'Tech Product Shop';
      case 'kiosk': return 'Foyer Island Kiosk';
      case 'corp_hq': return 'Corporate HQ';
      case 'coworking': return 'Co-working Office';
      case 'medical': return 'Clinics / Labs Care';
      case 'bpo': return 'BPO Operations Centre';
      default: return cat;
    }
  };

  // Currency helper
  const formatPHP = (val: number) => {
    return new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP',
      maximumFractionDigits: 0,
    }).format(val);
  };

  const handleCopyToClipboard = () => {
    const textToCopy = `--- PH Tenancy Financial Summary ---
Location: ${specificPlace || 'Parklinks Mall'}
Space: ${spaceArea} sqm @ ₱${ratePerSqm}/sqm + ₱${cusaPerSqm}/sqm CUSA
Basic Monthly Rent: ${formatPHP(basicMonthlyRent)}
CUSA: ${formatPHP(monthlyCUSA)}
BIR 12% VAT: ${formatPHP(vatAmount)}
BIR 5% EWT Withholding: ${hasWithholdingTax ? formatPHP(ewtWithholding) : '₱0 (Sole Proprietor)'}
Net Monthly Outflow: ${formatPHP(tenantMonthlyOutflow)}

Upfront Outlay at Contract Signing:
- Security Deposit (${secDepositMonths} mos basic): ${formatPHP(securityDepositAmount)}
- Advance Rental (${advanceMonths} mos gross): ${formatPHP(advanceRentalAmount)}
- Contractor Fit-out Construction Bond: ${formatPHP(constructionBond)}
- Holding Reservation Credit Adjustment: -${formatPHP(reservationCredit)}
TOTAL ACQUISITION SIGNING CAPITAL: ${formatPHP(totalLeaseInitialOutlay)}
----------------------------------
Generated via acquisitions Navigator - Virtual Studios PH`;

    navigator.clipboard.writeText(textToCopy);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch w-full animate-fade-in">
      
      {/* LEFT COLUMN: INTERACTIVE LEASE MODIFIERS */}
      <div className="lg:col-span-7 bg-white border border-slate-150 rounded-3xl p-6 sm:p-8 flex flex-col gap-6 shadow-xs">
        
        {/* Step Head */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
              <Icons.SlidersHorizontal className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 font-display">
                Simulate Tenancy Costs
              </h3>
              <p className="text-xs text-slate-400">
                Adjust area, specific leasing venue, CUSA ratios, and security guarantees.
              </p>
            </div>
          </div>

          <button
            onClick={handleCopyToClipboard}
            className="text-xs font-semibold text-slate-505 text-slate-500 hover:text-slate-800 flex items-center gap-1.5 transition-colors bg-slate-50 hover:bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200/60"
          >
            {copiedText ? (
              <>
                <Icons.Check className="w-3.5 h-3.5 text-emerald-500" />
                <span className="text-emerald-600">Copied Standard Specs!</span>
              </>
            ) : (
              <>
                <Icons.Copy className="w-3.5 h-3.5 text-blue-500" />
                <span>Copy Summary Text</span>
              </>
            )}
          </button>
        </div>

        {/* SPECIFIC LEASING LOCATION INPUT */}
        <div className="flex flex-col gap-3">
          <span className="text-[10px] font-mono font-bold tracking-widest text-slate-400 uppercase flex items-center gap-1.5">
            <Icons.MapPin className="w-3.5 h-3.5 text-emerald-500" /> Specific Location / Demised Premises
          </span>
          
          <div className="relative">
            <input
              type="text"
              value={specificPlace}
              onChange={(e) => setSpecificPlace(e.target.value)}
              className="w-full bg-slate-50 text-slate-800 border border-slate-200 py-3 px-4 pl-10 rounded-2xl text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all font-sans"
              placeholder="e.g. Parklinks Mall"
            />
            <Icons.Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          </div>

          <div className="bg-slate-50 p-3.5 rounded-xl text-[10px] text-slate-400 font-light leading-relaxed border border-slate-150/50 mt-1">
            <strong>Customised location active:</strong> Core rental parameters, local permit checklists and design review timelines adapt specifically to <strong className="text-emerald-700 font-semibold">{specificPlace || 'Parklinks Mall'}</strong>.
          </div>
        </div>

        {/* SECTORS SPECIFIC SLIDERS */}
        <div className="flex flex-col gap-5 mt-2">
          
          {/* Slider 1: Area */}
          <div className="bg-slate-50/20 hover:bg-slate-50/50 p-4 rounded-2xl border border-slate-150 transition-colors flex flex-col gap-2.5">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <Icons.Maximize2 className="w-4 h-4" />
                </div>
                <span className="text-xs font-semibold text-slate-750 text-slate-705">
                  Target Usable Space Area Size
                </span>
              </div>
              <span className="font-mono bg-emerald-100 text-emerald-700 px-2.5 py-0.5 rounded-lg font-bold text-xs border border-emerald-250 border-emerald-200">
                {spaceArea} SQM
              </span>
            </div>
            <input
              type="range"
              min={limits.min}
              max={limits.max}
              step={limits.step}
              value={spaceArea}
              onChange={(e) => setSpaceArea(Number(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer h-1.5 bg-slate-100 rounded-lg my-1 focus:outline-none"
            />
            <div className="flex justify-between text-[9px] text-slate-400 font-mono">
              <span>{limits.labelMin} Min</span>
              <span>Average Setup: {getCategoryLabel(category)}</span>
              <span>{limits.labelMax} Max</span>
            </div>
          </div>

          {/* Slider 2: Basic Rent */}
          <div className="bg-slate-50/20 hover:bg-slate-50/50 p-4 rounded-2xl border border-slate-150 transition-colors flex flex-col gap-2.5">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Icons.PhilippinePeso className="w-4 h-4" />
                </div>
                <span className="text-xs font-semibold text-slate-750 text-slate-705">
                  Basic Monthly Rental Rate (per sqm)
                </span>
              </div>
              <span className="font-mono bg-blue-100 text-blue-700 px-2.5 py-0.5 rounded-lg font-bold text-xs border border-blue-200">
                {formatPHP(ratePerSqm)} / sqm
              </span>
            </div>
            <input
              type="range"
              min="300"
              max="4000"
              step="50"
              value={ratePerSqm}
              onChange={(e) => setRatePerSqm(Number(e.target.value))}
              className="w-full accent-blue-500 cursor-pointer h-1.5 bg-slate-100 rounded-lg my-1 focus:outline-none"
            />
            <div className="flex justify-between text-[9px] text-slate-400 font-mono">
              <span>₱300/sqm (Provincial)</span>
              <span>Standard Base for CBD Zone</span>
              <span>₱4,000/sqm (Prime Fort Skyline)</span>
            </div>
          </div>

          {/* Slider 3: CUSA */}
          <div className="bg-slate-50/20 hover:bg-slate-50/50 p-4 rounded-2xl border border-slate-150 transition-colors flex flex-col gap-2.5">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                  <Icons.Activity className="w-4 h-4" />
                </div>
                <span className="text-xs font-semibold text-slate-750 text-slate-705">
                  Common Usage Area Service (CUSA)
                </span>
              </div>
              <span className="font-mono bg-indigo-100 text-indigo-700 px-2.5 py-0.5 rounded-lg font-bold text-xs border border-indigo-200">
                {formatPHP(cusaPerSqm)} / sqm
              </span>
            </div>
            <input
              type="range"
              min="80"
              max="700"
              step="10"
              value={cusaPerSqm}
              onChange={(e) => setCusaPerSqm(Number(e.target.value))}
              className="w-full accent-indigo-550 accent-indigo-505 cursor-pointer h-1.5 bg-slate-100 rounded-lg my-1 focus:outline-none"
            />
            <div className="flex justify-between text-[9px] text-slate-400 font-mono">
              <span>₱80/sqm (Local Offices)</span>
              <span>₱250 - ₱400 (Commercial Highrise)</span>
              <span>₱700/sqm (High density Premium Malls)</span>
            </div>
          </div>

          {/* Selectors grid for months */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            <div className="bg-slate-50/30 p-3 rounded-2xl border border-slate-150">
              <label className="text-[10px] font-mono font-bold text-slate-400 tracking-wider block mb-1.5 uppercase">
                Tenancy Security Months
              </label>
              <select
                value={secDepositMonths}
                onChange={(e) => setSecDepositMonths(Number(e.target.value))}
                className="w-full text-xs bg-white border border-slate-200 py-1.5 px-2.5 rounded-xl font-mono font-bold text-slate-800 focus:outline-none focus:ring-1 focus:ring-emerald-500 cursor-pointer"
              >
                <option value="2">2 Months (Local standard)</option>
                <option value="3">3 Months (General standard)</option>
                <option value="4">4 Months (Corporate scale)</option>
                <option value="6">6 Months (Premium Mall rules)</option>
              </select>
            </div>

            <div className="bg-slate-50/30 p-3 rounded-2xl border border-slate-150">
              <label className="text-[10px] font-mono font-bold text-slate-400 tracking-wider block mb-1.5 uppercase">
                Advance rentals Months
              </label>
              <select
                value={advanceMonths}
                onChange={(e) => setAdvanceMonths(Number(e.target.value))}
                className="w-full text-xs bg-white border border-slate-200 py-1.5 px-2.5 rounded-xl font-mono font-bold text-slate-800 focus:outline-none focus:ring-1 focus:ring-emerald-500 cursor-pointer"
              >
                <option value="1">1 Month Advance</option>
                <option value="2">2 Months (Typical)</option>
                <option value="3">3 Months (Pre-Launch standard)</option>
              </select>
            </div>

            <div className="bg-slate-50/30 p-3 rounded-2xl border border-slate-150">
              <label className="text-[10px] font-mono font-bold text-slate-400 tracking-wider block mb-1.5 uppercase">
                Fit-out Bond Rate
              </label>
              <select
                value={fitoutBondPerSqm}
                onChange={(e) => setFitoutBondPerSqm(Number(e.target.value))}
                className="w-full text-xs bg-white border border-slate-200 py-1.5 px-2.5 rounded-xl font-mono font-bold text-slate-800 focus:outline-none focus:ring-1 focus:ring-emerald-500 cursor-pointer"
              >
                <option value="200">₱200/sqm (Mall Carts)</option>
                <option value="400">₱400/sqm (Office Base)</option>
                <option value="500">₱500/sqm (Corporate HQ)</option>
                <option value="750">₱750/sqm (Dining F&B Standard)</option>
                <option value="1000">₱1,000/sqm (Premium mall rules)</option>
              </select>
            </div>

          </div>

          {/* PEZA Tax Exemption Switch (For Office properties only) */}
          {propertyType === 'office' && (
            <div className="bg-gradient-to-r from-blue-50/60 to-indigo-50/60 p-4.5 rounded-2xl border border-blue-150 flex items-center justify-between gap-4 mt-1 transition-all">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-xs">
                  <Icons.CheckSquare className="w-4.5 h-4.5" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-slate-800 block">PEZA Export VAT Exemption (0% VAT)</span>
                    <span className="text-[8px] bg-blue-600 text-white px-1 py-[1px] rounded font-mono font-bold tracking-wider uppercase">BIR ACCREDITED</span>
                  </div>
                  <span className="text-[10px] text-slate-400 block font-light leading-relaxed mt-0.5">
                    Toggle if company is a PEZA export IT-BPO. Slashes 12% output VAT on rent + utilities legally.
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsPezaRegistered(!isPezaRegistered)}
                className={`w-12 h-6.5 rounded-full p-1 transition-color relative flex items-center duration-300 ${
                  isPezaRegistered ? 'bg-blue-600' : 'bg-slate-200'
                }`}
              >
                <motion.div 
                  layout 
                  className={`w-4.5 h-4.5 rounded-full bg-white shadow-sm absolute ${
                    isPezaRegistered ? 'right-1' : 'left-1'
                  }`} 
                />
              </button>
            </div>
          )}

        </div>

      </div>

      {/* RIGHT COLUMN: THE MAJESTIC STATEMENT OF ACCOUNTS (SOA) BILLING SLIP */}
      <div className="lg:col-span-5 flex flex-col h-full self-stretch justify-between">
        
        {/* Receipt Container */}
        <div id="realty-soa-slip" className="bg-slate-900 border border-slate-950 text-slate-100 rounded-3xl p-6 shadow-xl flex flex-col gap-5 relative overflow-hidden flex-grow select-none font-sans">
          
          {/* Subtle thermal print aesthetics */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-500 via-emerald-400 to-indigo-500 z-20" />
          <div className="absolute bottom-0 left-0 right-0 h-4 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-slate-950 via-slate-900 to-transparent opacity-80" />
          
          {/* Diagonal Stamp effect */}
          <div className="absolute top-1/2 right-4 -translate-y-1/2 rotate-[22deg] font-mono text-[22px] font-extrabold text-emerald-400/5 select-none pointer-events-none tracking-widest border-4 border-dashed border-emerald-400/5 px-4 py-1">
            ESTIMATE ONLY
          </div>

          {/* SLIP HEADER */}
          <div className="text-center pb-4 border-b border-dashed border-slate-800">
            <h4 className="text-[10px] font-mono tracking-widest text-slate-400 font-bold uppercase">
              PHILIPPINE REALTORS ESTIMATES
            </h4>
            <h2 className="text-sm font-bold text-slate-150 tracking-tight mt-1 truncate">
              PRE-TENANCY AGREEMENT SOA
            </h2>
            <div className="flex items-center justify-center gap-2 text-[9px] text-slate-500 font-mono mt-2">
              <span>ID: SOA-PH-967D</span>
              <span>&middot;</span>
              <span>DATE: {new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })}</span>
            </div>
          </div>

          {/* ITEM COST FLOW */}
          <div className="flex flex-col gap-3 font-mono text-[11px] text-slate-350">
            
            {/* Sector details row */}
            <div className="flex justify-between items-baseline pb-1 select-none border-b border-slate-800/50">
              <span className="text-slate-400 font-sans font-medium text-xs">A. LEASE METRICS REFERENCE</span>
              <span className="text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded text-[10px] uppercase font-sans">
                {getCategoryLabel(category)}
              </span>
            </div>

            <div className="flex justify-between items-baseline">
              <span className="text-slate-400">Total Demised Area:</span>
              <span className="text-slate-100 font-bold font-sans">{spaceArea} sqm</span>
            </div>
            
            <div className="flex justify-between items-baseline">
              <span className="text-slate-400">Basic Rental Rate:</span>
              <span className="text-slate-100 font-sans">{formatPHP(ratePerSqm)} / sqm</span>
            </div>

            <div className="flex justify-between items-baseline">
              <span className="text-slate-400">Joint CUSA Surcharges:</span>
              <span className="text-slate-100 font-sans">{formatPHP(cusaPerSqm)} / sqm</span>
            </div>

            <div className="flex justify-between items-baseline">
              <span className="text-slate-400">Specific Location Venue:</span>
              <span className="text-slate-150 text-slate-100 font-sans font-bold">{specificPlace || 'Parklinks Mall'}</span>
            </div>

            {/* B. Monthly recurring dues */}
            <div className="flex justify-between items-baseline pb-1 mt-3 select-none border-b border-slate-800/50">
              <span className="text-slate-400 font-sans font-medium text-xs">B. RECURRING ESTIMATED OUTFLOWS</span>
              <span className="text-slate-500 text-[10px]">Monthly Billing</span>
            </div>

            <div className="flex justify-between items-baseline text-slate-300">
              <span>Basic Demised Rent / Month:</span>
              <span className="text-slate-100 font-bold font-sans">{formatPHP(basicMonthlyRent)}</span>
            </div>

            <div className="flex justify-between items-baseline text-slate-300">
              <span>Total CUSA Utility Levy / Month:</span>
              <span className="text-slate-100 font-sans">{formatPHP(monthlyCUSA)}</span>
            </div>

            <div className="flex justify-between items-baseline text-slate-300">
              <span>BIR Value Added Tax (12% VAT):</span>
              <span className={`font-sans ${isPezaRegistered ? 'text-blue-400' : 'text-slate-100'}`}>
                {isPezaRegistered ? 'EXEMPT (0% PEZA)' : formatPHP(vatAmount)}
              </span>
            </div>

            <div className="flex justify-between items-baseline text-slate-300">
              <span>BIR Withholding Tax (5% EWT Deduction):</span>
              <span className={`font-sans font-semibold ${hasWithholdingTax ? 'text-emerald-400' : 'text-slate-500'}`}>
                {hasWithholdingTax ? `-${formatPHP(ewtWithholding)}` : '₱0 (Sole Proprietor)'}
              </span>
            </div>

            {/* NET MONTHLY BILLING TACTILE DISPLAY */}
            <div className="bg-slate-950 p-4 rounded-xl border border-dashed border-slate-800 flex items-center justify-between mt-1 text-slate-200">
              <div>
                <span className="font-sans font-bold text-xs text-white block">Net Monthly Bill (Outflow)</span>
                <span className="text-[9px] text-slate-500 font-sans block mt-0.5">Includes Rent, CUSA, VAT, EWT withholding</span>
              </div>
              <span className="font-sans text-base sm:text-lg font-bold text-emerald-400 tracking-tight">
                {formatPHP(tenantMonthlyOutflow)}
              </span>
            </div>

            {/* C. UPFRONT DOWNMENT DUES */}
            <div className="flex justify-between items-baseline pb-1 mt-3 select-none border-b border-slate-800/50">
              <span className="text-slate-400 font-sans font-medium text-xs">C. UPFRONT OUTLAY AT CONTRACT SIGNING</span>
              <span className="text-slate-500 text-[10px]">One-Time Dues</span>
            </div>

            <div className="flex justify-between items-baseline text-slate-300">
              <span>Lease Security Deposit ({secDepositMonths} Mos basic):</span>
              <span className="font-sans text-slate-100">{formatPHP(securityDepositAmount)}</span>
            </div>

            <div className="flex justify-between items-baseline text-slate-300">
              <span>Lease Advance Rental ({advanceMonths} Mos gross):</span>
              <span className="font-sans text-slate-100">{formatPHP(advanceRentalAmount)}</span>
            </div>

            <div className="flex justify-between items-baseline text-slate-300">
              <span>Refundable Construction Fit-out Bond:</span>
              <span className="font-sans text-slate-100">{formatPHP(constructionBond)}</span>
            </div>

            <div className="flex justify-between items-baseline text-slate-300 text-[10px]">
              <span className="italic text-slate-400">Holding Reservation Deposit Credit:</span>
              <span className="font-sans text-emerald-500">-{formatPHP(reservationCredit)}</span>
            </div>

          </div>

          {/* DASHED SEPARATOR */}
          <div className="border-t border-dashed border-slate-800 my-2 select-none" />

          {/* TOTAL OUTLAY CASH ACCORDION */}
          <div className="bg-gradient-to-tr from-emerald-950 to-slate-950 rounded-2xl p-4.5 border border-emerald-900 flex justify-between items-center shadow-inner text-white select-none">
            <div className="flex flex-col">
              <span className="text-[9px] font-mono tracking-widest font-bold text-emerald-400 uppercase leading-none block">
                TOTAL CONTRACT SIGNING CAPITAL
              </span>
              <span className="text-xs font-semibold font-display mt-1.5 text-slate-300 block">
                Required Upfront Guarantee
              </span>
            </div>
            
            <span className="text-lg sm:text-xl font-bold font-sans text-emerald-300 tracking-tight block">
              {formatPHP(totalLeaseInitialOutlay)}
            </span>
          </div>

        </div>

        {/* Tactical Advice banner below slip */}
        <div className="mt-4 bg-amber-50 border border-amber-205 border-amber-200/60 p-4 rounded-2xl flex gap-3 text-slate-700">
          <Icons.HelpCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div className="flex flex-col gap-0.5 text-xs">
            <span className="font-bold text-amber-900">Tenant Accounting Insider:</span>
            <p className="text-[11px] text-amber-800 font-light leading-relaxed">
              Ensure you prepare BIR <strong>Form 2307</strong> to deduct 5% withholding taxes from landlord basic rent payments, or admins will charge penalties at the fiscal end review.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
}
