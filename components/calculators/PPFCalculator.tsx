"use client";

import { useState } from "react";
import CalculatorCard from "../ui/CalculatorCard";
import InputField from "../ui/InputField";
import ResultCard from "../ui/ResultCard";
import ChartCard from "../ui/ChartCard";
import RelatedCalculators from "../ui/RelatedCalculators";
import { formatCurrency } from "../../lib/calculators";

interface PPFCalculatorProps {
  onCalculatorSelect?: (calculatorId: string) => void;
}

export default function PPFCalculator({
  onCalculatorSelect,
}: PPFCalculatorProps) {
  const [yearlyInvestment, setYearlyInvestment] = useState("");
  const [currentAge, setCurrentAge] = useState("");
  const [result, setResult] = useState<any>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (
      !yearlyInvestment ||
      parseFloat(yearlyInvestment) <= 0 ||
      parseFloat(yearlyInvestment) > 150000
    ) {
      newErrors.yearlyInvestment =
        "Please enter a valid yearly investment (max ₹1.5 lakh)";
    }
    if (
      !currentAge ||
      parseFloat(currentAge) <= 0 ||
      parseFloat(currentAge) > 100
    ) {
      newErrors.currentAge = "Please enter a valid age (1-100)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCalculate = () => {
    if (!validate()) return;

    const annualInvestment = parseFloat(yearlyInvestment);
    const ppfRate = 7.1; // Current PPF rate
    const tenure = 15; // PPF lock-in period

    // Calculate PPF maturity using compound interest formula
    let maturityAmount = 0;
    for (let year = 1; year <= tenure; year++) {
      maturityAmount +=
        annualInvestment * Math.pow(1 + ppfRate / 100, tenure - year + 1);
    }

    const totalInvestment = annualInvestment * tenure;
    const totalInterest = maturityAmount - totalInvestment;

    // Tax benefit calculation (80C)
    const annualTaxSaving = annualInvestment * 0.3; // Assuming 30% tax bracket
    const totalTaxSaving = annualTaxSaving * tenure;

    setResult({
      maturityAmount: Math.round(maturityAmount),
      totalInvestment: Math.round(totalInvestment),
      totalInterest: Math.round(totalInterest),
      totalTaxSaving: Math.round(totalTaxSaving),
    });
  };

  const handleReset = () => {
    setYearlyInvestment("");
    setCurrentAge("");
    setResult(null);
    setErrors({});
  };

  return (
    <div>
      <CalculatorCard
        title="PPF Calculator"
        description="Calculate your Public Provident Fund (PPF) maturity amount, interest earned, and tax benefits over 15 years."
        onCalculate={handleCalculate}
        onReset={handleReset}
      >
        <InputField
          label="Yearly Investment"
          value={yearlyInvestment}
          onChange={setYearlyInvestment}
          placeholder="Enter yearly PPF investment"
          suffix="₹"
          error={errors.yearlyInvestment}
          required
        />
        <InputField
          label="Current Age"
          value={currentAge}
          onChange={setCurrentAge}
          placeholder="Enter your current age"
          suffix="years"
          error={errors.currentAge}
          required
        />
      </CalculatorCard>

      {result && (
        <ResultCard
          title="PPF Investment Results"
          results={[
            {
              label: "Maturity Amount (15 years)",
              value: formatCurrency(result.maturityAmount),
              highlight: true,
            },
            {
              label: "Total Investment",
              value: formatCurrency(result.totalInvestment),
            },
            {
              label: "Interest Earned",
              value: formatCurrency(result.totalInterest),
            },
            {
              label: "Total Tax Savings (80C)",
              value: formatCurrency(result.totalTaxSaving),
            },
          ]}
          explanation={`By investing ${formatCurrency(
            parseFloat(yearlyInvestment)
          )} annually in PPF for 15 years at 7.1% interest, you'll receive ${formatCurrency(
            result.maturityAmount
          )} at maturity. PPF offers triple tax benefits - deduction, tax-free growth, and tax-free withdrawal.`}
        />
      )}

      {result && (
        <ChartCard
          title="PPF Growth Breakdown"
          data={[
            { name: "Total Investment", value: result.totalInvestment },
            { name: "Interest Earned", value: result.totalInterest },
            { name: "Tax Savings", value: result.totalTaxSaving },
          ]}
          type="pie"
          dataKey="value"
          colors={["#0088FE", "#00C49F", "#FFBB28"]}
        />
      )}

      {onCalculatorSelect && (
        <RelatedCalculators
          currentCalculator="ppf"
          onCalculatorSelect={onCalculatorSelect}
        />
      )}
    </div>
  );
}
