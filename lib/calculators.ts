// Loan EMI Calculator
export const calculateEMI = (
  principal: number,
  rate: number,
  tenure: number
) => {
  const monthlyRate = rate / (12 * 100);
  const emi =
    (principal * monthlyRate * Math.pow(1 + monthlyRate, tenure)) /
    (Math.pow(1 + monthlyRate, tenure) - 1);
  const totalAmount = emi * tenure;
  const totalInterest = totalAmount - principal;

  return {
    emi: Math.round(emi),
    totalAmount: Math.round(totalAmount),
    totalInterest: Math.round(totalInterest),
  };
};

// SIP Calculator
export const calculateSIP = (
  monthlyAmount: number,
  rate: number,
  tenure: number,
  stepUpRate: number = 0
) => {
  const monthlyRate = rate / (12 * 100);
  const months = tenure * 12;

  if (stepUpRate === 0) {
    // Regular SIP without step-up
    const futureValue =
      monthlyAmount *
      (((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) *
        (1 + monthlyRate));
    const totalInvestment = monthlyAmount * months;
    const totalReturns = futureValue - totalInvestment;

    return {
      futureValue: Math.round(futureValue),
      totalInvestment: Math.round(totalInvestment),
      totalReturns: Math.round(totalReturns),
    };
  } else {
    // SIP with annual step-up
    let futureValue = 0;
    let totalInvestment = 0;
    let currentMonthlyAmount = monthlyAmount;

    for (let year = 1; year <= tenure; year++) {
      // Calculate for 12 months of current year
      const monthsInYear = year === tenure ? months % 12 || 12 : 12;
      const remainingMonths = months - (year - 1) * 12;
      const actualMonthsInYear = Math.min(monthsInYear, remainingMonths);

      // Calculate future value for this year's investments
      for (let month = 1; month <= actualMonthsInYear; month++) {
        const monthsToMaturity = months - ((year - 1) * 12 + month - 1);
        futureValue +=
          currentMonthlyAmount * Math.pow(1 + monthlyRate, monthsToMaturity);
        totalInvestment += currentMonthlyAmount;
      }

      // Increase amount for next year
      if (year < tenure) {
        currentMonthlyAmount = currentMonthlyAmount * (1 + stepUpRate / 100);
      }
    }

    const totalReturns = futureValue - totalInvestment;

    return {
      futureValue: Math.round(futureValue),
      totalInvestment: Math.round(totalInvestment),
      totalReturns: Math.round(totalReturns),
      stepUpRate,
    };
  }
};

// Fixed Deposit Calculator
export const calculateFD = (
  principal: number,
  rate: number,
  tenure: number,
  compoundingFreq: number = 4
) => {
  const maturityAmount =
    principal *
    Math.pow(1 + rate / (100 * compoundingFreq), compoundingFreq * tenure);
  const interest = maturityAmount - principal;

  return {
    maturityAmount: Math.round(maturityAmount),
    interest: Math.round(interest),
    principal: Math.round(principal),
  };
};

// Recurring Deposit Calculator
export const calculateRD = (
  monthlyDeposit: number,
  rate: number,
  tenure: number
) => {
  const months = tenure * 12;
  const monthlyRate = rate / (12 * 100);
  const maturityAmount =
    monthlyDeposit *
    (((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) *
      (1 + monthlyRate));
  const totalDeposit = monthlyDeposit * months;
  const interest = maturityAmount - totalDeposit;

  return {
    maturityAmount: Math.round(maturityAmount),
    totalDeposit: Math.round(totalDeposit),
    interest: Math.round(interest),
  };
};

// Income Tax Calculator (Old vs New Regime)
export const calculateIncomeTax = (income: number, regime: "old" | "new") => {
  let tax = 0;
  let standardDeduction = 0;

  if (regime === "old") {
    standardDeduction = 50000;
    const taxableIncome = Math.max(0, income - standardDeduction - 150000); // Basic exemption

    if (taxableIncome <= 250000) tax = 0;
    else if (taxableIncome <= 500000) tax = (taxableIncome - 250000) * 0.05;
    else if (taxableIncome <= 1000000)
      tax = 12500 + (taxableIncome - 500000) * 0.2;
    else tax = 112500 + (taxableIncome - 1000000) * 0.3;
  } else {
    const taxableIncome = Math.max(0, income - 300000); // New regime basic exemption

    if (taxableIncome <= 300000) tax = 0;
    else if (taxableIncome <= 600000) tax = (taxableIncome - 300000) * 0.05;
    else if (taxableIncome <= 900000)
      tax = 15000 + (taxableIncome - 600000) * 0.1;
    else if (taxableIncome <= 1200000)
      tax = 45000 + (taxableIncome - 900000) * 0.15;
    else if (taxableIncome <= 1500000)
      tax = 90000 + (taxableIncome - 1200000) * 0.2;
    else tax = 150000 + (taxableIncome - 1500000) * 0.3;
  }

  // Add cess
  const cess = tax * 0.04;
  const totalTax = tax + cess;

  return {
    tax: Math.round(tax),
    cess: Math.round(cess),
    totalTax: Math.round(totalTax),
    netIncome: Math.round(income - totalTax),
  };
};

// Retirement Calculator
export const calculateRetirement = (
  currentAge: number,
  retirementAge: number,
  monthlyExpenses: number,
  inflation: number,
  expectedReturn: number
) => {
  const yearsToRetirement = retirementAge - currentAge;
  const retirementYears = 25; // Assuming 25 years post retirement

  // Future value of current expenses at retirement
  const futureExpenses =
    monthlyExpenses * Math.pow(1 + inflation / 100, yearsToRetirement);

  // Corpus needed at retirement
  const corpusNeeded =
    (futureExpenses * 12 * retirementYears) / (expectedReturn / 100);

  // Monthly SIP needed
  const monthlyRate = expectedReturn / (12 * 100);
  const months = yearsToRetirement * 12;
  const monthlySIP =
    corpusNeeded /
    (((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) *
      (1 + monthlyRate));

  return {
    corpusNeeded: Math.round(corpusNeeded),
    monthlySIP: Math.round(monthlySIP),
    futureExpenses: Math.round(futureExpenses),
  };
};

// Credit Card Interest Calculator
export const calculateCreditCardInterest = (
  outstandingAmount: number,
  minPayment: number,
  interestRate: number
) => {
  const monthlyRate = interestRate / (12 * 100);
  let balance = outstandingAmount;
  let totalInterest = 0;
  let months = 0;

  while (balance > 0 && months < 360) {
    // Max 30 years to avoid infinite loop
    const interestCharge = balance * monthlyRate;
    totalInterest += interestCharge;
    balance = balance + interestCharge - minPayment;
    months++;

    if (balance < minPayment) {
      balance = 0;
    }
  }

  return {
    totalInterest: Math.round(totalInterest),
    totalAmount: Math.round(outstandingAmount + totalInterest),
    timeToPayoff: months,
  };
};

// Savings Goal Calculator
export const calculateSavingsGoal = (
  targetAmount: number,
  currentSavings: number,
  timeframe: number,
  expectedReturn: number
) => {
  const monthlyRate = expectedReturn / (12 * 100);
  const months = timeframe * 12;

  // Future value of current savings
  const futureValueCurrentSavings =
    currentSavings * Math.pow(1 + monthlyRate, months);

  // Remaining amount needed
  const remainingAmount = targetAmount - futureValueCurrentSavings;

  // Monthly SIP needed
  const monthlySIP =
    remainingAmount > 0
      ? remainingAmount /
        (((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) *
          (1 + monthlyRate))
      : 0;

  return {
    monthlySIP: Math.round(Math.max(0, monthlySIP)),
    futureValueCurrentSavings: Math.round(futureValueCurrentSavings),
    totalInvestment: Math.round(currentSavings + monthlySIP * months),
  };
};

// Lump Sum Calculator
export const calculateLumpSum = (
  principal: number,
  rate: number,
  tenure: number
) => {
  const annualRate = rate / 100;
  const futureValue = principal * Math.pow(1 + annualRate, tenure);
  const totalReturns = futureValue - principal;
  const absoluteReturn = ((futureValue - principal) / principal) * 100;
  const cagr = (Math.pow(futureValue / principal, 1 / tenure) - 1) * 100;

  return {
    futureValue: Math.round(futureValue),
    totalReturns: Math.round(totalReturns),
    absoluteReturn: Math.round(absoluteReturn * 100) / 100,
    cagr: Math.round(cagr * 100) / 100,
    principal: Math.round(principal),
  };
};

// Utility functions
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat("en-IN").format(num);
};
