"use client";

import { useState } from "react";
import { Box } from "@mui/material";
import CalculatorCard from "../ui/CalculatorCard";
import InputField from "../ui/InputField";
import ResultCard from "../ui/ResultCard";
import ChartCard from "../ui/ChartCard";
import RelatedCalculators from "../ui/RelatedCalculators";
import DurationToggle from "../ui/DurationToggle";
import { formatCurrency } from "../../lib/calculators";

interface NSCCalculatorProps {
  onCalculatorSelect?: (calculatorId: string) => void;
}

export default function NSCCalculator({
  onCalculatorSelect,
}: NSCCalculatorProps) {
  const [principal, setPrincipal] = useState("");
  const [tenure, setTenure] = useState("5"); // NSC has fixed 5-year tenure
  const [result, setResult] = useState<any>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // NSC interest rate is fixed at 6.8% per annum (as of 2024)
  const nscRate = 6.8;

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!principal || parseFloat(principal) <= 0) {
      newErrors.principal = "Please enter a valid investment amount";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCalculate = () => {
    if (!validate()) return;

    const principalAmount = parseFloat(principal);
    const rate = nscRate / 100;
    const years = 5; // Fixed tenure for NSC

    // NSC uses compound interest
    const maturityAmount = principalAmount * Math.pow(1 + rate, years);
    const totalInterest = maturityAmount - principalAmount;

    // Generate year-wise growth data
    const yearlyData = [];
    for (let year = 1; year <= years; year++) {
      const amount = principalAmount * Math.pow(1 + rate, year);
      const interest = amount - principalAmount;

      yearlyData.push({
        year: `Year ${year}`,
        amount: Math.round(amount),
        interest: Math.round(interest),
      });
    }

    setResult({
      maturityAmount,
      totalInterest,
      principalAmount,
      yearlyData,
      effectiveRate: nscRate,
    });
  };

  const handleReset = () => {
    setPrincipal("");
    setResult(null);
    setErrors({});
  };

  return (
    <div className="space-y-6">
      <CalculatorCard
        title="NSC Calculator"
        description="Calculate National Savings Certificate returns with fixed 6.8% interest rate and 5-year tenure."
        onCalculate={handleCalculate}
        onReset={handleReset}
      >
        <InputField
          label="Investment Amount"
          value={principal}
          onChange={setPrincipal}
          placeholder="Enter NSC investment amount"
          suffix="₹"
          error={errors.principal}
          required
        />

        <Box
          sx={{
            p: 2,
            backgroundColor: "info.light",
            borderRadius: 2,
            border: 1,
            borderColor: "info.main",
          }}
        >
          <Box sx={{ mb: 1, fontWeight: 600, color: "text.primary" }}>
            NSC Details:
          </Box>
          <Box sx={{ fontSize: "0.875rem", color: "text.secondary" }}>
            • Fixed Interest Rate: {nscRate}% per annum
          </Box>
          <Box sx={{ fontSize: "0.875rem", color: "text.secondary" }}>
            • Fixed Tenure: 5 years
          </Box>
          <Box sx={{ fontSize: "0.875rem", color: "text.secondary" }}>
            • Tax benefits under Section 80C
          </Box>
          <Box sx={{ fontSize: "0.875rem", color: "text.secondary" }}>
            • Interest is taxable but reinvested
          </Box>
        </Box>
      </CalculatorCard>

      {result && (
        <>
          <ResultCard
            title="NSC Investment Results"
            results={[
              {
                label: "Maturity Amount",
                value: formatCurrency(result.maturityAmount),
                highlight: true,
              },
              {
                label: "Principal Amount",
                value: formatCurrency(result.principalAmount),
              },
              {
                label: "Total Interest",
                value: formatCurrency(result.totalInterest),
              },
              {
                label: "Effective Rate",
                value: `${result.effectiveRate}% p.a.`,
              },
            ]}
            explanation={`Your NSC investment of ${formatCurrency(
              result.principalAmount
            )} will grow to ${formatCurrency(
              result.maturityAmount
            )} over 5 years, earning ${formatCurrency(
              result.totalInterest
            )} in interest at ${nscRate}% per annum.`}
          />

          <ChartCard
            title="Year-wise Growth"
            data={result.yearlyData}
            type="bar"
            dataKey="amount"
            xAxisKey="year"
            colors={["#1f7a99"]}
          />

          <ChartCard
            title="Principal vs Interest"
            data={[
              { name: "Principal", value: result.principalAmount },
              { name: "Interest", value: result.totalInterest },
            ]}
            type="pie"
            dataKey="value"
            colors={["#1f7a99", "#10b981"]}
          />
        </>
      )}

      {onCalculatorSelect && (
        <RelatedCalculators
          currentCalculator="nsc"
          onCalculatorSelect={onCalculatorSelect}
        />
      )}
    </div>
  );
}
