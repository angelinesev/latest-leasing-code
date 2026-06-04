import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import * as Icons from 'lucide-react';
import { ProcessDocument, StoreCategory, BusinessStructure } from '../types';

interface DocumentChecklistProps {
  documents: ProcessDocument[];
  category: StoreCategory;
  structure: BusinessStructure;
}

export default function DocumentChecklist({ 
  documents, 
  category,
  structure 
}: DocumentChecklistProps) {
  // Checkbox tick state
  const [checkedDocs, setCheckedDocs] = useState<Record<string, boolean>>({});
  
  // Custom document items added by the user
  const [customDocs, setCustomDocs] = useState<{ id: string; name: string; description: string; audience: string }[]>([]);
  
  // Tab Filter selection state
  const [activeTab, setActiveTab] = useState<'all' | 'registers' | 'municipal' | 'fitout'>('all');

  // Trigger checkbox toggle
  const toggleDocChecked = (id: string) => {
    setCheckedDocs((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Filter core documents depending on: 
  // (1) Store category (e.g., grease trap specs apply only to 'cafe')
  // (2) Business Structure (SEC corporate only vs Individual DTI)
  const baseRelevantDocs = documents.filter((doc) => {
    const isCategoryValid = doc.relevantCategories.includes(category);
    
    let isStructureValid = true;
    if (structure === 'individual' && doc.audience === 'corporate') {
      isStructureValid = false;
    }
    if (structure === 'corporate' && doc.audience === 'individual') {
      isStructureValid = false;
    }

    return isCategoryValid && isStructureValid;
  });

  // Inject user-created custom documents
  const allRelevantDocs = [
    ...baseRelevantDocs.map(d => ({ ...d, isCustom: false })),
    ...customDocs.map(d => ({
      id: d.id,
      name: d.name,
      description: d.description,
      audience: d.audience as 'individual' | 'corporate' | 'both',
      relevantCategories: [category],
      isCustom: true
    }))
  ];

  // Apply Categorified Tab Filters
  const filteredDocs = allRelevantDocs.filter((doc) => {
    if (activeTab === 'all') return true;
    
    if (activeTab === 'registers') {
      // SEC, GIS, BIR Form 2303, Board Secretary Certificate, DTI
      return ['doc_sec_dti', 'doc_bir_2303', 'doc_sec_cert', 'doc_gis'].includes(doc.id) || (doc.isCustom && doc.name.toLowerCase().includes('tax') || doc.name.toLowerCase().includes('legal'));
    }
    
    if (activeTab === 'municipal') {
      // Mayor's Permit, FSIC Fire Safety, Sanitary/Health permits, local Barangay 
      return ['doc_mayor_permit', 'doc_sanitary_permit', 'doc_bfp_fsic'].includes(doc.id) || (doc.isCustom && doc.name.toLowerCase().includes('permit') || doc.name.toLowerCase().includes('lgu'));
    }
    
    if (activeTab === 'fitout') {
      // Contractors insurance CARI, Grease trap, plumbing drawings, layouts
      return ['doc_cari', 'doc_grease_trap_spec'].includes(doc.id) || (doc.isCustom && doc.name.toLowerCase().includes('contract') || doc.name.toLowerCase().includes('fit-out') || doc.name.toLowerCase().includes('construction') || doc.name.toLowerCase().includes('work'));
    }

    return true;
  });

  const checkedCount = allRelevantDocs.filter((doc) => checkedDocs[doc.id]).length;
  const totalCount = allRelevantDocs.length;
  const progressPercentage = totalCount > 0 ? Math.round((checkedCount / totalCount) * 100) : 0;

  // Remove a custom category node
  const handleRemoveCustomDoc = (id: string, e: React.MouseEvent) => {
    e.stopPropagation(); // prevent triggering check state toggle
    setCustomDocs(customDocs.filter(d => d.id !== id));
    
    // Clean checked state
    if (checkedDocs[id]) {
      const copy = { ...checkedDocs };
      delete copy[id];
      setCheckedDocs(copy);
    }
  };

  const getSubTitleText = () => {
    const orgText = structure === 'corporate' ? 'Entities' : 'Proprietors';
    switch (category) {
      case 'cafe': return `Required filings for Cafe concepts inside LGU municipalities.`;
      case 'kiosk': return `Required filings for Mall Foyer Kiosk counters.`;
      case 'fashion': return `Required filings for Retail Boutiques and Outlets.`;
      case 'electronics': return `Required filings for Tech Outlets and Electronics zones.`;
      case 'corp_hq': return `Required filings for Office Headquarters installations.`;
      case 'coworking': return `Required filings for Co-working administrative zones.`;
      case 'medical': return `Required filings for Medical Sterile Labs.`;
      case 'bpo': return `Required filings for BPO Operations Centers / PEZA floors.`;
      default: return `Required filings for standard spaces.`;
    }
  };

  return (
    <div id="document-checklist-panel" className="bg-white border border-slate-150 rounded-3xl p-6 sm:p-8 shadow-xs flex flex-col gap-6 animate-fade-in">
      
      {/* Header Info section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-105 pb-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-600 flex items-center justify-center">
            <Icons.Layers className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-slate-850 font-display">
              Regulatory Compliance Dossier
            </h2>
            <p className="text-xs text-slate-400">
              {getSubTitleText()} Custom adjusted for <strong>{structure === 'corporate' ? 'Corporate Partnership' : 'Sole Proprietor'}</strong> legal frameworks.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1 bg-indigo-50 text-indigo-700 py-1.5 px-3 rounded-xl border border-indigo-100 font-mono text-xs font-bold self-start">
          <span>{totalCount} Total Filings</span>
        </div>
      </div>

      {/* Progress Status Hero visual card bar */}
      <div className="bg-slate-900 text-slate-200 rounded-2.5xl rounded-3xl p-5 border border-slate-950 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden shadow-sm">
        <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none animate-pulse" />

        <div className="flex items-center gap-4 relative z-10">
          <div className={`w-12 h-12 flex items-center justify-center rounded-2xl border ${progressPercentage === 100 ? 'bg-emerald-500/10 border-emerald-400/30 text-emerald-400' : 'bg-white/5 border-white/10 text-indigo-300'}`}>
            {progressPercentage === 100 ? <Icons.Award className="w-6 h-6" /> : <Icons.ClipboardList className="w-5.5 h-5.5" />}
          </div>
          <div>
            <span className="text-[10px] font-mono tracking-widest text-slate-450 text-slate-400 uppercase font-semibold">
              ADMIN VETTING READINESS
            </span>
            <h3 className="text-sm sm:text-base font-bold font-display text-white mt-1">
              {checkedCount} of {totalCount} Filings Ready ({progressPercentage}%)
            </h3>
            <p className="text-[11px] text-slate-400 font-light mt-0.5">
              Select filings below as you compile original notarized folders.
            </p>
          </div>
        </div>

        {/* Bar metric loading track */}
        <div className="w-full md:w-56 flex items-center gap-3.5 relative z-10 flex-shrink-0">
          <div className="flex-grow bg-white/10 h-1.5 rounded-full overflow-hidden">
            <motion.div
              className={`h-full rounded-full ${progressPercentage === 100 ? 'bg-emerald-400' : 'bg-indigo-400'}`}
              initial={{ width: '0%' }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 0.35 }}
            />
          </div>
          <span className="text-sm font-mono font-bold text-white min-w-[36px] text-right">
            {progressPercentage}%
          </span>
        </div>
      </div>

      {/* FILTER TABS */}
      <div className="flex border-b border-slate-100 p-0.5 bg-slate-50 rounded-2xl gap-1">
        {[
          { id: 'all', label: 'All Requirements', icon: Icons.Layers },
          { id: 'registers', label: 'Incorp & Legal', icon: Icons.ShieldCheck },
          { id: 'municipal', label: 'LGU Mayor Permits', icon: Icons.MapPin },
          { id: 'fitout', label: 'Fit-out & Insurance', icon: Icons.Wrench },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex-1 py-2.5 px-3 flex items-center justify-center gap-1.5 hover:bg-white/50 text-[11px] sm:text-xs rounded-xl font-bold transition-all select-none border border-transparent ${
              activeTab === tab.id
                ? 'bg-white text-slate-900 border-slate-100 shadow-xxs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <tab.icon className={`w-3.5 h-3.5 ${activeTab === tab.id ? 'text-indigo-600' : 'text-slate-400'}`} />
            <span className="hidden sm:inline">{tab.label}</span>
            <span className="sm:hidden">{tab.label.split(' ')[0]}</span>
          </button>
        ))}
      </div>

      {/* FILINGS CHECK GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredDocs.length === 0 ? (
          <div className="col-span-2 text-center py-12 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
            <Icons.FolderOpen className="w-10 h-10 text-slate-300 mx-auto mb-2" />
            <h4 className="text-xs font-semibold text-slate-806 text-slate-705">No papers matched this sub-filter</h4>
            <p className="text-[10px] text-slate-400 mt-1">Try clicking different filter tabs or restore settings.</p>
          </div>
        ) : (
          <AnimatePresence mode="popLayout">
            {filteredDocs.map((doc) => {
              const isChecked = checkedDocs[doc.id] || false;
              return (
                <motion.div
                  layout
                  key={doc.id}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.15 }}
                  id={`doc-row-${doc.id}`}
                  onClick={() => toggleDocChecked(doc.id)}
                  className={`flex gap-3.5 items-start p-4 hover:shadow-2xs rounded-2xl border transition-all cursor-pointer select-none relative group ${
                    isChecked
                      ? 'border-emerald-500 bg-emerald-500/5'
                      : 'border-slate-150 bg-white hover:border-slate-250 hover:bg-slate-50/40'
                  }`}
                >
                  {/* Styled Check Indicator */}
                  <div className={`w-4.5 h-4.5 rounded-lg flex items-center justify-center border-2 mt-0.5 transition-all ${
                    isChecked ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-slate-200 bg-white group-hover:border-slate-350'
                  }`}>
                    <Icons.Check className={`w-3 h-3 stroke-[3] transition-transform ${isChecked ? 'scale-100' : 'scale-0'}`} />
                  </div>

                  <div className="flex-grow flex flex-col gap-1 pr-6">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className={`text-xs font-bold leading-snug ${isChecked ? 'text-slate-400 line-through' : 'text-slate-800'}`}>
                        {doc.name}
                      </span>
                      {doc.isCustom && (
                        <span className="text-[8px] bg-indigo-50 text-indigo-600 px-1.5 py-[1px] rounded font-mono font-bold uppercase border border-indigo-100">
                          Custom
                        </span>
                      )}
                    </div>
                    
                    <p className={`text-[11px] leading-relaxed font-light ${isChecked ? 'text-slate-400' : 'text-slate-500'}`}>
                      {doc.description}
                    </p>

                    {/* Metadata tags */}
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      <span className={`text-[8px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                        doc.audience === 'corporate'
                          ? 'bg-purple-50 text-purple-600 border border-purple-105'
                          : doc.audience === 'individual'
                          ? 'bg-amber-50 text-amber-705 text-amber-700 border border-amber-105'
                          : 'bg-slate-100 text-slate-550 text-slate-500 border border-slate-200'
                      }`}>
                        {doc.audience === 'both' ? 'Unified / All Model' : `${doc.audience}`}
                      </span>

                      {category === 'cafe' && doc.id === 'doc_sanitary_permit' && (
                        <span className="text-[8px] font-mono font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100">
                          Sanitary code
                        </span>
                      )}

                      {doc.id === 'doc_cari' && (
                        <span className="text-[8px] font-mono font-semibold text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded border border-rose-100">
                          Fit-out Required
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Remove User Custom items button */}
                  {doc.isCustom && (
                    <button
                      type="button"
                      onClick={(e) => handleRemoveCustomDoc(doc.id, e)}
                      className="absolute right-3 top-3 p-1 rounded-lg text-slate-350 hover:text-rose-500 hover:bg-rose-50 opacity-0 group-hover:opacity-100 transition-all"
                      aria-label="Delete Custom Item"
                    >
                      <Icons.Trash className="w-3.5 h-3.5" />
                    </button>
                  )}

                </motion.div>
              );
            })}
          </AnimatePresence>
        )}
      </div>

    </div>
  );
}
