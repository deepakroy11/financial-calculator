// Portfolio data types and interfaces

export interface BaseAsset {
  id: string;
  name: string;
  provider?: string;
  amount: number;
  startDate: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

// Investment Types
export interface Investment extends BaseAsset {
  type:
    | "stocks"
    | "mutual_funds"
    | "fd"
    | "rd"
    | "ppf"
    | "nps"
    | "pf"
    | "bonds"
    | "gold"
    | "crypto";
  currentValue?: number;
  maturityDate?: string;
  interestRate?: number;
  units?: number;
  nav?: number; // Net Asset Value for MF
  symbol?: string; // For stocks
  folio?: string; // Folio number
  returns?: number;
  returnsPercentage?: number;
}

// Insurance Types
export interface Insurance extends BaseAsset {
  type: "life" | "health" | "vehicle" | "home" | "travel" | "term";
  policyNumber: string;
  premium: number;
  premiumFrequency: "monthly" | "quarterly" | "half_yearly" | "yearly";
  coverageAmount: number;
  maturityDate?: string;
  nominee?: string;
  status: "active" | "lapsed" | "matured" | "claimed";
}

// Loan Types
export interface Loan extends BaseAsset {
  type:
    | "home"
    | "personal"
    | "education"
    | "vehicle"
    | "business"
    | "credit_card";
  principalAmount: number;
  outstandingAmount: number;
  interestRate: number;
  emi: number;
  tenure: number; // in months
  startDate: string;
  endDate: string;
  lender: string;
  accountNumber?: string;
  status: "active" | "closed" | "overdue";
}

// Portfolio Summary
export interface PortfolioSummary {
  totalInvestments: number;
  totalInsurance: number;
  totalLoans: number;
  netWorth: number;
  monthlyIncome: number;
  monthlyExpenses: number;
  lastUpdated: string;
}

// Category-wise breakdown
export interface CategoryBreakdown {
  investments: {
    stocks: number;
    mutualFunds: number;
    fixedDeposits: number;
    ppf: number;
    nps: number;
    others: number;
  };
  insurance: {
    life: number;
    health: number;
    vehicle: number;
    others: number;
  };
  loans: {
    home: number;
    personal: number;
    vehicle: number;
    others: number;
  };
}

// Portfolio data structure
export interface Portfolio {
  id: string;
  userId?: string;
  investments: Investment[];
  insurance: Insurance[];
  loans: Loan[];
  summary: PortfolioSummary;
  breakdown: CategoryBreakdown;
  createdAt: string;
  updatedAt: string;
}

// Form data types
export interface InvestmentFormData {
  name: string;
  type: Investment["type"];
  provider: string;
  amount: number;
  startDate: string;
  maturityDate?: string;
  interestRate?: number;
  units?: number;
  nav?: number;
  symbol?: string;
  folio?: string;
  notes?: string;
}

export interface InsuranceFormData {
  name: string;
  type: Insurance["type"];
  provider: string;
  policyNumber: string;
  premium: number;
  premiumFrequency: Insurance["premiumFrequency"];
  coverageAmount: number;
  amount: number; // This will be the same as premium for insurance
  startDate: string;
  maturityDate?: string;
  nominee?: string;
  notes?: string;
}

export interface LoanFormData {
  name: string;
  type: Loan["type"];
  lender: string;
  amount: number;
  principalAmount: number;
  outstandingAmount: number;
  interestRate: number;
  emi: number;
  tenure: number;
  startDate: string;
  accountNumber?: string;
  notes?: string;
}

// Filter and sort options
export interface PortfolioFilters {
  category?: "investments" | "insurance" | "loans";
  type?: string;
  provider?: string;
  dateRange?: {
    start: string;
    end: string;
  };
  amountRange?: {
    min: number;
    max: number;
  };
}

export interface SortOptions {
  field: "name" | "amount" | "startDate" | "returns" | "provider";
  direction: "asc" | "desc";
}
