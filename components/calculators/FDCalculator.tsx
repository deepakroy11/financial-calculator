"use client";

import { useState } from "react";
import CalculatorCard from "../ui/CalculatorCard";
import InputField from "../ui/InputField";
import ResultCard from "../ui/ResultCard";
import { calculateFD, formatCurrency } from "../../lib/calculators";

export default function FDCalculator() {
  const [principal, setPrincipal] = useState("");
  const [rate, setRate] = useState("");
  const [tenure, setTenure] = useState("");
  const [result, setResult] = useState<any>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!principal || parseFloat(principal) <= 0) {
      newErrors.principal = "Please enter a valid deposit amount";
    }
    if (!rate || parseFloat(rate) <= 0 || parseFloat(rate) > 20) {
      newErrors.rate = "Please enter a valid interest rate (0-20%)";
    }
    if (!tenure || parseFloat(tenure) <= 0 || parseFloat(tenure) > 10) {
      newErrors.tenure = "Please enter a valid tenure (0.1-10 years)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCalculate = () => {
    if (!validate()) return;

    const fdResult = calculateFD(
      parseFloat(principal),
      parseFloat(rate),
      parseFloat(tenure)
    );

    setResult(fdResult);
  };

  const handleReset = () => {
    setPrincipal("");
    setRate("");
    setTenure("");
    setResult(null);
    setErrors({});
  };

  return (
    <div>
      <CalculatorCard
        title="Fixed Deposit Calculator"
        description="Calculate the maturity amount and interest earned on your Fixed Deposit investment."
        onCalculate={handleCalculate}
        onReset={handleReset}
      >
        <InputField
          label="Principal Amount"
          value={principal}
          onChange={setPrincipal}
          placeholder="Enter deposit amount"
          suffix="₹"
          error={errors.principal}
          required
        />
        <InputField
          label="Interest Rate (Annual)"
          value={rate}
          onChange={setRate}
          placeholder="Enter interest rate"
          suffix="%"
          error={errors.rate}
          required
        />
        <InputField
          label="Tenure"
          value={tenure}
          onChange={setTenure}
          placeholder="Enter tenure in years"
          suffix="years"
          error={errors.tenure}
          required
        />
      </CalculatorCard>

      {result && (
        <ResultCard
          title="Fixed Deposit Results"
          results={[
            {
              label: "Maturity Amount",
              value: formatCurrency(result.maturityAmount),
              highlight: true,
            },
            {
              label: "Principal Amount",
              value: formatCurrency(result.principal),
            },
            {
              label: "Interest Earned",
              value: formatCurrency(result.interest),
            },
          ]}
          explanation={`Your FD of ${formatCurrency(
            parseFloat(principal)
          )} at ${rate}% for ${tenure} years will mature to ${formatCurrency(
            result.maturityAmount
          )}, earning ${formatCurrency(result.interest)} in interest.`}
        />
      )}
    </div>
  );
}
