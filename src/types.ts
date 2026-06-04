export type PropertyType = 'mall' | 'office';
export type PhilippineRegion = 'bgc' | 'makati' | 'ortigas' | 'cebu' | 'davao';
export type StoreCategory = 
  | 'cafe' 
  | 'fashion' 
  | 'electronics' 
  | 'kiosk'
  | 'corp_hq' 
  | 'coworking' 
  | 'medical' 
  | 'bpo';
export type BusinessStructure = 'individual' | 'corporate';

export interface MilestoneDetail {
  title: string;
  description: string;
  actions: string[];
  timelineLabel: string; // e.g., "Day 1 - Day 3"
  proTip?: string;
  checklistCategoryKeys?: string[]; // categories relevant (e.g., 'fbc', 'retail', etc.)
}

export interface TimelineStep {
  id: string;
  number: number;
  title: string;
  shortDesc: string;
  iconName: string; // Dynamic icon name from lucide-react
  details: MilestoneDetail;
}

export interface TermItem {
  id: string;
  label: string;
  value: string;
  description: string;
  category: 'payment' | 'agreement_terms';
}

export interface ProcessDocument {
  id: string;
  name: string;
  description: string;
  audience: 'individual' | 'corporate' | 'both';
  relevantCategories: StoreCategory[]; // e.g. ['fbc', 'retail', 'kiosk']
}
