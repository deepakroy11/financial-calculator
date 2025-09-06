// Portfolio data service for managing portfolio data
import {
  Portfolio,
  Investment,
  Insurance,
  Loan,
  PortfolioSummary,
  CategoryBreakdown,
} from "../types/portfolio";

const PORTFOLIO_STORAGE_KEY = "finly_portfolio_data";

export class PortfolioService {
  // Get portfolio data from localStorage
  static getPortfolio(): Portfolio | null {
    try {
      const data = localStorage.getItem(PORTFOLIO_STORAGE_KEY);
      if (!data) return null;
      return JSON.parse(data);
    } catch (error) {
      console.error("Error loading portfolio data:", error);
      return null;
    }
  }

  // Save portfolio data to localStorage
  static savePortfolio(portfolio: Portfolio): void {
    try {
      portfolio.updatedAt = new Date().toISOString();
      localStorage.setItem(PORTFOLIO_STORAGE_KEY, JSON.stringify(portfolio));
    } catch (error) {
      console.error("Error saving portfolio data:", error);
    }
  }

  // Create new empty portfolio
  static createEmptyPortfolio(): Portfolio {
    const now = new Date().toISOString();
    return {
      id: `portfolio_${Date.now()}`,
      investments: [],
      insurance: [],
      loans: [],
      summary: {
        totalInvestments: 0,
        totalInsurance: 0,
        totalLoans: 0,
        netWorth: 0,
        monthlyIncome: 0,
        monthlyExpenses: 0,
        lastUpdated: now,
      },
      breakdown: {
        investments: {
          stocks: 0,
          mutualFunds: 0,
          fixedDeposits: 0,
          ppf: 0,
          nps: 0,
          others: 0,
        },
        insurance: {
          life: 0,
          health: 0,
          vehicle: 0,
          others: 0,
        },
        loans: {
          home: 0,
          personal: 0,
          vehicle: 0,
          others: 0,
        },
      },
      createdAt: now,
      updatedAt: now,
    };
  }

  // Calculate portfolio summary
  static calculateSummary(portfolio: Portfolio): PortfolioSummary {
    const totalInvestments = portfolio.investments.reduce(
      (sum, inv) => sum + (inv.currentValue || inv.amount),
      0
    );
    const totalInsurance = portfolio.insurance.reduce(
      (sum, ins) => sum + ins.coverageAmount,
      0
    );
    const totalLoans = portfolio.loans.reduce(
      (sum, loan) => sum + loan.outstandingAmount,
      0
    );

    return {
      totalInvestments,
      totalInsurance,
      totalLoans,
      netWorth: totalInvestments - totalLoans,
      monthlyIncome: portfolio.summary.monthlyIncome || 0,
      monthlyExpenses: portfolio.summary.monthlyExpenses || 0,
      lastUpdated: new Date().toISOString(),
    };
  }

  // Calculate category breakdown
  static calculateBreakdown(portfolio: Portfolio): CategoryBreakdown {
    const breakdown: CategoryBreakdown = {
      investments: {
        stocks: 0,
        mutualFunds: 0,
        fixedDeposits: 0,
        ppf: 0,
        nps: 0,
        others: 0,
      },
      insurance: {
        life: 0,
        health: 0,
        vehicle: 0,
        others: 0,
      },
      loans: {
        home: 0,
        personal: 0,
        vehicle: 0,
        others: 0,
      },
    };

    // Calculate investment breakdown
    portfolio.investments.forEach((inv) => {
      const value = inv.currentValue || inv.amount;
      switch (inv.type) {
        case "stocks":
          breakdown.investments.stocks += value;
          break;
        case "mutual_funds":
          breakdown.investments.mutualFunds += value;
          break;
        case "fd":
        case "rd":
          breakdown.investments.fixedDeposits += value;
          break;
        case "ppf":
          breakdown.investments.ppf += value;
          break;
        case "nps":
        case "pf":
          breakdown.investments.nps += value;
          break;
        default:
          breakdown.investments.others += value;
      }
    });

    // Calculate insurance breakdown
    portfolio.insurance.forEach((ins) => {
      switch (ins.type) {
        case "life":
        case "term":
          breakdown.insurance.life += ins.coverageAmount;
          break;
        case "health":
          breakdown.insurance.health += ins.coverageAmount;
          break;
        case "vehicle":
          breakdown.insurance.vehicle += ins.coverageAmount;
          break;
        default:
          breakdown.insurance.others += ins.coverageAmount;
      }
    });

    // Calculate loan breakdown
    portfolio.loans.forEach((loan) => {
      switch (loan.type) {
        case "home":
          breakdown.loans.home += loan.outstandingAmount;
          break;
        case "personal":
          breakdown.loans.personal += loan.outstandingAmount;
          break;
        case "vehicle":
          breakdown.loans.vehicle += loan.outstandingAmount;
          break;
        default:
          breakdown.loans.others += loan.outstandingAmount;
      }
    });

    return breakdown;
  }

  // Add investment
  static addInvestment(
    investment: Omit<Investment, "id" | "createdAt" | "updatedAt">
  ): void {
    const portfolio = this.getPortfolio() || this.createEmptyPortfolio();
    const now = new Date().toISOString();

    const newInvestment: Investment = {
      ...investment,
      id: `inv_${Date.now()}`,
      createdAt: now,
      updatedAt: now,
    };

    portfolio.investments.push(newInvestment);
    portfolio.summary = this.calculateSummary(portfolio);
    portfolio.breakdown = this.calculateBreakdown(portfolio);

    this.savePortfolio(portfolio);
  }

  // Add insurance
  static addInsurance(
    insurance: Omit<Insurance, "id" | "createdAt" | "updatedAt" | "status">
  ): void {
    const portfolio = this.getPortfolio() || this.createEmptyPortfolio();
    const now = new Date().toISOString();

    const newInsurance: Insurance = {
      ...insurance,
      id: `ins_${Date.now()}`,
      status: "active",
      createdAt: now,
      updatedAt: now,
    };

    portfolio.insurance.push(newInsurance);
    portfolio.summary = this.calculateSummary(portfolio);
    portfolio.breakdown = this.calculateBreakdown(portfolio);

    this.savePortfolio(portfolio);
  }

  // Add loan
  static addLoan(
    loan: Omit<Loan, "id" | "createdAt" | "updatedAt" | "status" | "endDate">
  ): void {
    const portfolio = this.getPortfolio() || this.createEmptyPortfolio();
    const now = new Date().toISOString();

    // Calculate end date based on tenure
    const startDate = new Date(loan.startDate);
    const endDate = new Date(startDate);
    endDate.setMonth(endDate.getMonth() + loan.tenure);

    const newLoan: Loan = {
      ...loan,
      id: `loan_${Date.now()}`,
      status: "active",
      endDate: endDate.toISOString().split("T")[0],
      createdAt: now,
      updatedAt: now,
    };

    portfolio.loans.push(newLoan);
    portfolio.summary = this.calculateSummary(portfolio);
    portfolio.breakdown = this.calculateBreakdown(portfolio);

    this.savePortfolio(portfolio);
  }

  // Update investment
  static updateInvestment(id: string, updates: Partial<Investment>): void {
    const portfolio = this.getPortfolio();
    if (!portfolio) return;

    const index = portfolio.investments.findIndex((inv) => inv.id === id);
    if (index === -1) return;

    portfolio.investments[index] = {
      ...portfolio.investments[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    portfolio.summary = this.calculateSummary(portfolio);
    portfolio.breakdown = this.calculateBreakdown(portfolio);

    this.savePortfolio(portfolio);
  }

  // Delete investment
  static deleteInvestment(id: string): void {
    const portfolio = this.getPortfolio();
    if (!portfolio) return;

    portfolio.investments = portfolio.investments.filter(
      (inv) => inv.id !== id
    );
    portfolio.summary = this.calculateSummary(portfolio);
    portfolio.breakdown = this.calculateBreakdown(portfolio);

    this.savePortfolio(portfolio);
  }

  // Similar methods for insurance and loans
  static deleteInsurance(id: string): void {
    const portfolio = this.getPortfolio();
    if (!portfolio) return;

    portfolio.insurance = portfolio.insurance.filter((ins) => ins.id !== id);
    portfolio.summary = this.calculateSummary(portfolio);
    portfolio.breakdown = this.calculateBreakdown(portfolio);

    this.savePortfolio(portfolio);
  }

  static deleteLoan(id: string): void {
    const portfolio = this.getPortfolio();
    if (!portfolio) return;

    portfolio.loans = portfolio.loans.filter((loan) => loan.id !== id);
    portfolio.summary = this.calculateSummary(portfolio);
    portfolio.breakdown = this.calculateBreakdown(portfolio);

    this.savePortfolio(portfolio);
  }

  // Get sample data for demo
  static getSamplePortfolio(): Portfolio {
    const now = new Date().toISOString();
    return {
      id: "sample_portfolio",
      investments: [
        {
          id: "inv_1",
          name: "HDFC Top 100 Fund",
          type: "mutual_funds",
          provider: "HDFC Mutual Fund",
          amount: 50000,
          currentValue: 65000,
          startDate: "2023-01-15",
          units: 850,
          nav: 76.47,
          folio: "HDFC123456",
          returns: 15000,
          returnsPercentage: 30,
          createdAt: now,
          updatedAt: now,
        },
        {
          id: "inv_2",
          name: "SBI Fixed Deposit",
          type: "fd",
          provider: "State Bank of India",
          amount: 100000,
          currentValue: 107500,
          startDate: "2023-06-01",
          maturityDate: "2024-06-01",
          interestRate: 7.5,
          createdAt: now,
          updatedAt: now,
        },
      ],
      insurance: [
        {
          id: "ins_1",
          name: "HDFC Life Click 2 Protect Plus",
          type: "term",
          provider: "HDFC Life",
          amount: 12000,
          policyNumber: "HDFC789012",
          premium: 12000,
          premiumFrequency: "yearly",
          coverageAmount: 5000000,
          startDate: "2022-01-01",
          maturityDate: "2043-12-31",
          nominee: "Spouse",
          status: "active",
          createdAt: now,
          updatedAt: now,
        },
      ],
      loans: [
        {
          id: "loan_1",
          name: "Home Loan - Dream Home",
          type: "home",
          lender: "HDFC Bank",
          amount: 2500000,
          principalAmount: 2500000,
          outstandingAmount: 2100000,
          interestRate: 8.5,
          emi: 25000,
          tenure: 240,
          startDate: "2022-01-01",
          endDate: "2042-01-01",
          accountNumber: "HL123456789",
          status: "active",
          createdAt: now,
          updatedAt: now,
        },
      ],
      summary: {
        totalInvestments: 172500,
        totalInsurance: 5000000,
        totalLoans: 2100000,
        netWorth: -1927500,
        monthlyIncome: 75000,
        monthlyExpenses: 45000,
        lastUpdated: now,
      },
      breakdown: {
        investments: {
          stocks: 0,
          mutualFunds: 65000,
          fixedDeposits: 107500,
          ppf: 0,
          nps: 0,
          others: 0,
        },
        insurance: {
          life: 5000000,
          health: 0,
          vehicle: 0,
          others: 0,
        },
        loans: {
          home: 2100000,
          personal: 0,
          vehicle: 0,
          others: 0,
        },
      },
      createdAt: now,
      updatedAt: now,
    };
  }
}
