import { TimelineStep, TermItem, ProcessDocument } from './types';

export const TIMELINE_STEPS: TimelineStep[] = [
  {
    id: 'inquiry',
    number: 1,
    title: 'Leasing Inquiry',
    shortDesc: 'Submit brand specs and floor requirements',
    iconName: 'Send',
    details: {
      title: 'Leasing Inquiry submission',
      description: 'Lodging your baseline commercial intent detailing trade categorization, floor specifications, and contact info.',
      timelineLabel: 'Day 1 - 2',
      proTip: 'Ensure to use your legal business name matching SEC/DTI files to speed up the vetting queue.',
      actions: [
        'Furnish corporate business name & main contact records',
        'State proposed concept & store/trade category',
        'Specify preferred leasing venue & target floor area size',
        'System triggers record creation and assigns primary leasing officer'
      ]
    }
  },
  {
    id: 'space_review',
    number: 2,
    title: 'Space Availability Review',
    shortDesc: 'Vetting available units and compatibility',
    iconName: 'Search',
    details: {
      title: 'Space unit allocation and mix analysis',
      description: 'The mall management checks vacancy, specific layout suitability, and brand compatibility in the selected corridor.',
      timelineLabel: 'Day 3 - 5',
      proTip: 'Landlords maintain a deliberate tenant mix balance. Being shortlisted indicates your brand adds synergistic value to adjacent tenants.',
      actions: [
        'Cross-match requested space area with active vacant database',
        'Audit surrounding competitors / category saturation ratios',
        'Confirm location suitability within the target property zoning map',
        'Mark unit inventory reservation status: Shortlisted'
      ]
    }
  },
  {
    id: 'requirements',
    number: 3,
    title: 'Submission of Requirements',
    shortDesc: 'Uploading constitutional & municipal paper files',
    iconName: 'FolderUp',
    details: {
      title: 'Compliance directory documentation',
      description: 'Submit verified business proofs. Requirements strictly differ depending on whether you file as an Individual Sole Proprietor or Corporation.',
      timelineLabel: 'Day 6 - 9',
      proTip: 'For corporations, BIR 2303 registration must explicitly cover lease tax brackets for Form 2307 withholding credentials.',
      actions: [
        'Secure valid government-issued photo identification credentials',
        'Compile Mayor\'s Business Permit and Barangay Clearance',
        'Provide SEC Articles of Incorporation accompanied by GIS census records',
        'Submit notarized legal Secretary\'s Certificate and Bir 2303'
      ]
    }
  },
  {
    id: 'loi',
    number: 4,
    title: 'Letter of Intent (LOI)',
    shortDesc: 'Drafting formal proposal and brand deck',
    iconName: 'FileSignature',
    details: {
      title: 'Formal Letter of Intent submission',
      description: 'Submit an illustrative presentation deck of your concept along with proposed lease commencement terms & target opening timelines.',
      timelineLabel: 'Day 10 - 12',
      proTip: 'Include reference photos of operational counters or elegant storefront renders to maximize success.',
      actions: [
        'Declare targeted date for physical door opening & trading',
        'Enclose professional concept photos, menu items, or office layouts',
        'Propose basic rent rates and initial lease term duration',
        'System logs submission & transitions LOI state to Under Evaluation'
      ]
    }
  },
  {
    id: 'evaluation',
    number: 5,
    title: 'Business Evaluation',
    shortDesc: 'Admin review panel assessment (longest period)',
    iconName: 'TrendingUp',
    details: {
      title: 'Committees strategic board evaluation',
      description: 'Mall leadership evaluates tenant financial capability, brand positioning, and market demand density. This stage is known for exhaustive background screening.',
      timelineLabel: 'Day 13 - 18',
      proTip: 'Capital reserve disclosures (cash balance sheets) must comfortably support 6-12 months of overheads.',
      actions: [
        'Submit audited balance sheets detailing capital reserve funds',
        'Verify target demographic fit and adjacent retail sales overlap',
        'Compare requested sector with current tenant mix layout guidelines',
        'Conclude panel review and transition to formal terms proposal'
      ]
    }
  },
  {
    id: 'proposal',
    number: 6,
    title: 'Proposal & Commercial Terms',
    shortDesc: 'Reviewing lease sheet billing schedules',
    iconName: 'Percent',
    details: {
      title: 'Commercial Term Sheet parameters proposal',
      description: 'Receive detailed lease cost breakdown outlining basic rent, CUSA service charges, marketing levies, and required advance security deposits.',
      timelineLabel: 'Day 19 - 21',
      proTip: 'Marketing dues typically support regional promotions and seasonal mall foyer exhibitions.',
      actions: [
        'Review basic monthly rent schedule and annual escalation index percentages',
        'Examine CUSA operational levies and technical utility taps',
        'Calculate mandatory 3-month security guarantee and advance rent reserves',
        'Simulate pro-forma monthly statement total cash requirement'
      ]
    }
  },
  {
    id: 'reservation',
    number: 7,
    title: 'Reservation / Acceptance',
    shortDesc: 'Accepting terms and payment of reservation dues',
    iconName: 'Coins',
    details: {
      title: 'Terms acceptance and deposit reservation',
      description: 'Lock down your selected demised premises. Direct payment coordinates transfer of reservation checks and clears legal space reservation.',
      timelineLabel: 'Day 22 - 24',
      proTip: 'Reservation parameters are non-refundable but credit fully into your advance rental account on lease execution.',
      actions: [
        'Sign the Commercial Lease proposal letter with certified stamp',
        'Authorize reservation ledger item transaction',
        'Allocate funds for advance lease dues and security deposit reserves',
        'Secure formal reservation receipt confirming space is legally held'
      ]
    }
  },
  {
    id: 'contract_prep',
    number: 8,
    title: 'Lease Contract Preparation',
    shortDesc: 'Generating contract agreement and guidelines',
    iconName: 'Scroll',
    details: {
      title: 'Formulating legal covenant and house guidelines',
      description: 'The administration legal department prepares the detailed multi-year Contract of Lease, detailing landlord-tenant covenant codes.',
      timelineLabel: 'Day 25 - 27',
      proTip: 'Download drafts to review fit-out restoration liabilities, compliance rules, and grace periods ahead of signing.',
      actions: [
        'Draft complete landlord Contract of Lease containing all special covenants',
        'Furnish structural house codes, technical blueprints, and guidelines',
        'Provide View Contract interactive review dialog',
        'Generate and download local printable layout compliance PDF'
      ]
    }
  },
  {
    id: 'signing',
    number: 9,
    title: 'Contract Signing',
    shortDesc: 'Signing files and dispatch of copies',
    iconName: 'PenTool',
    details: {
      title: 'Contract notarization and lease execution',
      description: 'Sign documents and issue physical PDCs. The system dispatches digital backup copies directly to registered emails.',
      timelineLabel: 'Day 28 - 30',
      proTip: 'Notarization of documents is done by accredited local public notary figures to ensure statutory execution compliance.',
      actions: [
        'Execute signing with authorized corporate officer signatures',
        'Submit a package of 12 Post-Dated Checks (PDCs) corresponding to Year 1',
        'Confirm transition of lease status to Fully Executed',
        'System auto-generates digital backup PDF and emails contract copy'
      ]
    }
  },
  {
    id: 'fitout_app',
    number: 10,
    title: 'Fit-Out Application',
    shortDesc: 'Submitting engineering architectural plans',
    iconName: 'Cpu',
    details: {
      title: 'Fit-out design directory layout application',
      description: 'Submit specialized blueprints to building engineers, covering mechanical lines, load centers, plumbing slopes, and fire protection drops.',
      timelineLabel: 'Day 31 - 33',
      proTip: 'Maintain standard sprinkler clearance profiles from shelving structures (usually minimum 450mm).',
      actions: [
        'Upload mechanical drawings detailing HVAC systems and exhaust setups',
        'Submit electrical schedules of loads and single-line diagrams',
        'Detail fire protection plans matching building loops',
        'Provide custom floor plans and architectural storefront elevations'
      ]
    }
  },
  {
    id: 'plan_approval',
    number: 11,
    title: 'Plan Approval',
    shortDesc: 'Engineering division vetting and comments',
    iconName: 'BadgeCheck',
    details: {
      title: 'Engineering committee technical clearance',
      description: 'Landlord Engineers audit plan details. When cleared, they authorize mobilization permits. Revisions may be issued for kitchen line layout adjustments.',
      timelineLabel: 'Day 34 - 37',
      proTip: 'Quickly resolve comments on grease trap placement or air exhaust balances to prevent delaying the fit-out timeline.',
      actions: [
        'Admin Engineering receives plan directory and registers review case',
        'Verify single line diagram load matches panelboards tap capacities',
        'Confirm grease trap designs (malls) conform with administrative plumbing lines',
        'Issue formal Fit-out Authorization and mobilizations checklist'
      ]
    }
  },
  {
    id: 'construction',
    number: 12,
    title: 'Construction / Fit-Out Period',
    shortDesc: 'Executing drywall work in graveyard hours',
    iconName: 'Hammer',
    details: {
      title: 'Drywall, utility and sign execution',
      description: 'Active construction is performed behind temporary boardups. Operations are restricted to graveyard hours (9:00 PM - 8:00 AM) to maintain safe common paths.',
      timelineLabel: 'Day 38 - 68',
      proTip: 'Contractors All-Risk Insurance (CARI) must cover the entire physical duration of construction work on site.',
      actions: [
        'Install temporary utility meters and settle utility tapping reserves',
        'Erect drywall boundaries and complete lighting circuit wiring checks',
        'Verify HVAC ducts, insulation wraps, and water line connections',
        'Ensure contractor group adheres strictly to noise curfew regulations'
      ]
    }
  },
  {
    id: 'inspection',
    number: 13,
    title: 'Pre-Opening Inspection',
    shortDesc: 'Conducting engineering & fire safety audits',
    iconName: 'Eye',
    details: {
      title: 'Cross-department building inspections',
      description: 'Before opening, building teams conduct checks: Engineering checks electrical/structural aspects, Safety checks fire safety, and Operations checks administrative parameters.',
      timelineLabel: 'Day 69 - 71',
      proTip: 'BFP inspections verify that smoke alarms trigger and fire extinguishers are within reach.',
      actions: [
        'Secure official municipal Fire Safety Inspection Certificate (FSIC) files',
        'Perform electrical loop tests and inspect plumbing slopes',
        'Audit surrounding board-up cleanup & trade cash register setups',
        'Submit the signed pre-opening checklist for Operations clearance'
      ]
    }
  },
  {
    id: 'turnover',
    number: 14,
    title: 'Store Turnover / Opening Permit',
    shortDesc: 'Receiving Move-In Authorization & clearances',
    iconName: 'Key',
    details: {
      title: 'Operational move-in clearance & permit issuance',
      description: 'With all checklist items approved, the administration issues clearances, move-in permits, and grand opening approvals.',
      timelineLabel: 'Day 72 - 74',
      proTip: 'The Move-In License is required for mall security to allow inbound inventory transport through loading bays.',
      actions: [
        'Authorize removal of dust board-ups from storefront paths',
        'Obtain certified LGU Business permit and display on cash wall',
        'Conduct joint utility meter baseline read checks with administration',
        'Generate and issue the Move-In License and grand opening permit'
      ]
    }
  },
  {
    id: 'opening',
    number: 15,
    title: 'Store Opening',
    shortDesc: 'Tearing down board-ups and launching trade',
    iconName: 'PartyPopper',
    details: {
      title: 'Official Trading Launch',
      description: 'Deploy inventory, conduct soft launches, connect store checkouts, and open the venue for trading!',
      timelineLabel: 'Day 75+',
      proTip: 'Verify that POS billing records tie-ups sync with the landlord ledger to ensure a smooth administrative operational flow from Day 1.',
      actions: [
        'Remove storefront board-ups and transition to full visibility mode',
        'Distribute staff rosters and load sales register banks',
        'Secure live sales synchronization with administrative records',
        'Launch grand opening decorations and welcome active customers'
      ]
    }
  }
];

export const TERMS_DATA: TermItem[] = [
  {
    id: 'term_cusa',
    label: 'CUSA (Common Usage Service Area) Fee',
    value: 'Averages ₱250 to ₱550/sqm monthly in premier malls; averages ₱150 to ₱250/sqm in Grade A office high-rises. Finances general building ventilation, cleaning, security, and amenities maintenance.',
    description: 'A structural recurring premium added to your basic space leases to co-finance shared complex utilities and security parameters.',
    category: 'payment'
  },
  {
    id: 'term_security_dep',
    label: 'Tenancy Security Deposit',
    value: 'Strictly equivalent to 3 to 6 months of basic rent dues. Retained interest-free by the landlord administration throughout the duration of your occupancy.',
    description: 'Mitigates landlord risk against untimely vacancy default, mechanical damages, or outstanding unpaid utility arrears upon lease termination.',
    category: 'payment'
  },
  {
    id: 'term_advance_rent',
    label: 'Advance Rental Credits',
    value: 'Equates to 2 or 3 months of basic rent + CUSA. Applied systematically to credit your core payments on the ultimate final months of the lease period.',
    description: 'Secures primary tenant liquidity commitments and pays for backend administration overheads before turnover.',
    category: 'payment'
  },
  {
    id: 'term_taxation',
    label: 'VAT (12%) & BIR Withholding Tax (5% EWT)',
    value: 'Leases are subject to 12% Value Added Tax. Philippine corporate entities deduct 5% Expanded Withholding Tax (EWT) on rent and provide the BIR Form 2307.',
    description: 'Statutory taxation policies mandated by the Bureau of Internal Revenue governing leased commercial properties in the Philippines.',
    category: 'payment'
  },
  {
    id: 'term_escalation',
    label: 'Annual Escalation Rate',
    value: 'Usually between 5% and 8% for retail layouts; 5% to 10% for corporate office spaces. Applied annually starting from the second year of tenure.',
    description: 'A pre-agreed index reflecting inflation and corporate zone land appreciation throughout your tenancy lifespan.',
    category: 'agreement_terms'
  },
  {
    id: 'term_pdc_rule',
    label: 'Postdated Checks (PDCs) Compliance',
    value: 'Mandatorily requires a batch of 12 distinct physical check files covering basic rents and estimable CUSA charges before physical key turnover.',
    description: 'The standard legal mechanism in the Philippine commercial environment to ensure secure collection cycles and prevent payment disputes.',
    category: 'agreement_terms'
  },
  {
    id: 'term_exclusivity',
    label: 'Retail Exclusivity Clause',
    value: 'Restricts tenants from selling menu items or inventory outside pre-approved categories. Only applies to mall environments (Cafes, Fashion, Electronics).',
    description: 'Maintains ideal product variety and prevents negative competition in the passageways and food corridors.',
    category: 'agreement_terms'
  },
  {
    id: 'term_reinstatement',
    label: 'Bare Shell Restoration Policy',
    value: 'Tenants are legally obligated to restore the space back to its original "bare concrete shell" condition (chipping tiles, capping wires, white walls) upon exit.',
    description: 'Sets standard hand-back rules so the landlord can easily re-let a uniform space to future tenants.',
    category: 'agreement_terms'
  },
  {
    id: 'term_peza_incentives',
    label: 'PEZA Tax Exemption Framework',
    value: 'PEZA-certified buildings offer 0% VAT on leases and local utilities for accredited BPOs or Corporate HQs. Retail and non-PEZA zones pay full 12% VAT.',
    description: 'Local government tax incentives specific to BPOs and export-oriented IT service operations in the Philippines.',
    category: 'agreement_terms'
  }
];

export const DOCUMENTS_DATA: ProcessDocument[] = [
  {
    id: 'doc_sec_dti',
    name: 'SEC or DTI Registration Certificate',
    description: 'DTI Registration for individual sole proprietors, or SEC Incorporation files with Articles of Cooperation for corporate partners.',
    audience: 'both',
    relevantCategories: ['cafe', 'fashion', 'electronics', 'kiosk', 'corp_hq', 'coworking', 'medical', 'bpo']
  },
  {
    id: 'doc_bir_2303',
    name: 'BIR Certificate of Registration (Form 2303)',
    description: 'Standard tax record matching your active TIN, authorized corporate classification, and business tax scopes.',
    audience: 'both',
    relevantCategories: ['cafe', 'fashion', 'electronics', 'kiosk', 'corp_hq', 'coworking', 'medical', 'bpo']
  },
  {
    id: 'doc_mayor_permit',
    name: 'Mayor\'s municipal Business Permit',
    description: 'Operational business permit provided by the host city (e.g., Taguig BGC, Makati, Quezon City) confirming standard safety clearances.',
    audience: 'both',
    relevantCategories: ['cafe', 'fashion', 'electronics', 'kiosk', 'corp_hq', 'coworking', 'medical', 'bpo']
  },
  {
    id: 'doc_sec_cert',
    name: 'Notarized Secretary’s Certificate',
    description: 'Certified board paper specifying the designated corporate executives and legal representatives authorized to sign lease agreements and PDC checks.',
    audience: 'corporate',
    relevantCategories: ['cafe', 'fashion', 'electronics', 'kiosk', 'corp_hq', 'coworking', 'medical', 'bpo']
  },
  {
    id: 'doc_gis',
    name: 'Latest General Information Sheet (GIS)',
    description: 'Annual corporation census filed with the SEC listing active board directors, stock ownership stakes, and current assets.',
    audience: 'corporate',
    relevantCategories: ['cafe', 'fashion', 'electronics', 'kiosk', 'corp_hq', 'coworking', 'medical', 'bpo']
  },
  {
    id: 'doc_sanitary_permit',
    name: 'LGU Sanitary & Health Permit',
    description: 'Clearance certifying hygiene conformity, sterile water outputs, and valid health cards for on-site staff.',
    audience: 'both',
    relevantCategories: ['cafe', 'medical']
  },
  {
    id: 'doc_grease_trap_spec',
    name: 'Grease Trap Mechanical Clearance',
    description: 'Technical blueprints of food-safe grease trap modules confirming compliance with building sewage drains.',
    audience: 'both',
    relevantCategories: ['cafe']
  },
  {
    id: 'doc_cari',
    name: 'Contractors All-Risk Insurance (CARI) Policy',
    description: 'Mandatory third-party insurance protecting workers and building structures from physical mishaps during fit-out operations.',
    audience: 'both',
    relevantCategories: ['cafe', 'fashion', 'electronics', 'corp_hq', 'coworking', 'medical', 'bpo']
  },
  {
    id: 'doc_bfp_fsic',
    name: 'BFP Fire Safety Inspection Clearance (FSIC)',
    description: 'Bureau of Fire Protection clearance certifying smoke detector connectivity, layout sprinklers, and emergency pathways.',
    audience: 'both',
    relevantCategories: ['cafe', 'fashion', 'electronics', 'kiosk', 'corp_hq', 'coworking', 'medical', 'bpo']
  },
  {
    id: 'doc_peza_cert',
    name: 'PEZA Registration Certificate',
    description: 'Required to qualify for VAT exemptions (0% VAT) and custom tax benefits inside Philippine Economic Zone Authority campuses.',
    audience: 'corporate',
    relevantCategories: ['corp_hq', 'bpo']
  }
];
