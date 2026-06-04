import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import * as Icons from 'lucide-react';
import { TermItem, PropertyType, StoreCategory } from '../types';

interface TermsBreakdownProps {
  terms: TermItem[];
  propertyType: PropertyType;
  category: StoreCategory;
}

export default function TermsBreakdown({ terms, propertyType, category }: TermsBreakdownProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedTermId, setExpandedTermId] = useState<string | null>(null);

  // Filter terms by search input and PropertyType applicability
  const filteredTerms = terms.filter((term) => {
    // Hide PEZA incentives for malls
    if (term.id === 'term_peza_incentives' && propertyType === 'mall') {
      return false;
    }
    // Hide Menu/Product exclusivity for offices
    if (term.id === 'term_exclusivity' && propertyType === 'office') {
      return false;
    }

    return (
      term.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
      term.value.toLowerCase().includes(searchTerm.toLowerCase()) ||
      term.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const paymentTermsList = filteredTerms.filter((t) => t.category === 'payment');
  const agreementTermsList = filteredTerms.filter((t) => t.category === 'agreement_terms');

  const toggleExpand = (id: string) => {
    setExpandedTermId(expandedTermId === id ? null : id);
  };

  const renderTermCard = (term: TermItem) => {
    const isActive = expandedTermId === term.id;

    return (
      <div
        key={term.id}
        id={`term-card-${term.id}`}
        className={`border rounded-2xl p-5 bg-white transition-all cursor-pointer select-none ${
          isActive
            ? 'border-blue-500 shadow-sm ring-1 ring-blue-500/10'
            : 'border-slate-150 hover:border-slate-200 hover:shadow-xs'
        }`}
        onClick={() => toggleExpand(term.id)}
      >
        <div className="flex justify-between items-start gap-4">
          <div className="flex flex-col gap-1">
            <h3 className="text-xs font-semibold text-slate-800 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-505 bg-blue-500" />
              {term.label}
            </h3>
            <span className="text-[9px] font-mono text-slate-400">
              REFERENCE STATUTE: {term.id.toUpperCase()}
            </span>
          </div>
          <button
            aria-label="Toggle Details"
            className={`p-1 rounded-lg hover:bg-slate-50 text-slate-400 transition-transform ${
              isActive ? 'transform rotate-180 text-blue-600' : ''
            }`}
          >
            <Icons.ChevronDown className="w-4 h-4" />
          </button>
        </div>

        {/* Content Preview */}
        <div className="mt-3.5">
          <p className="text-xs text-slate-600 font-medium leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
            {term.value}
          </p>
        </div>

        {/* Expanded Explanation */}
        <AnimatePresence initial={false}>
          {isActive && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="pt-3.5 mt-3 border-t border-slate-100 flex gap-2.5 items-start text-xs text-slate-500 leading-relaxed bg-blue-50/15 px-3 py-2.5 rounded-xl">
                <Icons.Info className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-blue-900 block mb-0.5">
                    {propertyType === 'office' ? 'Corporate Standard Intent' : 'Mall Standard Intent'}
                  </span>
                  {term.description}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <div id="terms-breakdown-panel" className="bg-white border border-slate-150 rounded-3xl p-6 sm:p-8 shadow-sm">
      {/* Search & Header panel */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-100 pb-5 mb-6">
        <div>
          <h2 className="text-base font-semibold text-slate-800 font-display flex items-center gap-2">
            <Icons.BookOpen className="w-5 h-5 text-indigo-750 text-indigo-600" />
            Statutory Tenancy Lease Terms &amp; Clauses
          </h2>
          <p className="text-xs text-slate-400">
            Review the legal codifications and payments standards governing {propertyType === 'office' ? 'office properties' : 'mall leases'} in the PH.
          </p>
        </div>

        {/* Search Field */}
        <div className="relative w-full sm:w-64">
          <Icons.Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search lease regulations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-1.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white placeholder-slate-400"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none"
            >
              <Icons.X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Empty State */}
      {filteredTerms.length === 0 && (
        <div className="text-center py-12 bg-slate-50 rounded-2xl border border-slate-100">
          <Icons.FileSpreadsheet className="w-10 h-10 text-slate-300 mx-auto mb-3" />
          <h3 className="text-xs font-semibold text-slate-705 text-slate-700">No clauses match your search</h3>
          <p className="text-[11px] text-slate-400 mt-1">Try typing another contractual keyword.</p>
          <button
            onClick={() => setSearchTerm('')}
            className="mt-4 px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-xs"
          >
            Clear Filter
          </button>
        </div>
      )}

      {/* Structured Terms Grids */}
      {filteredTerms.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Column A: Payments & Capital Elements */}
          {paymentTermsList.length > 0 && (
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2 pb-1.5 border-b border-slate-100">
                <div className="p-1 px-2.5 rounded-lg bg-indigo-50 text-indigo-650 text-[9px] font-mono font-bold uppercase tracking-wider">
                  PAYMENTS &amp; SETTLEMENTS
                </div>
                <span className="text-[11px] font-medium text-slate-500">
                  Rental Commitments &amp; Outlays
                </span>
              </div>
              <div className="grid grid-cols-1 gap-4">
                {paymentTermsList.map(renderTermCard)}
              </div>
            </div>
          )}

          {/* Column B: Legal Clauses & Tenure Rules */}
          {agreementTermsList.length > 0 && (
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2 pb-1.5 border-b border-slate-100">
                <div className="p-1 px-2.5 rounded-lg bg-rose-50 text-rose-650 text-[9px] font-mono font-bold uppercase tracking-wider">
                  {propertyType === 'office' ? 'OFFICE COMPLIANCE LAWS' : 'MALL COMPLIANCE LAWS'}
                </div>
                <span className="text-[11px] font-medium text-slate-500">
                  Category Boundaries &amp; Fit-out Guidelines
                </span>
              </div>
              <div className="grid grid-cols-1 gap-4">
                {agreementTermsList.map(renderTermCard)}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
