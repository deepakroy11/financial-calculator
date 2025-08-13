"use client";

import { useState } from "react";
import CalculatorCard from "../ui/CalculatorCard";
import InputField from "../ui/InputField";
import ResultCard from "../ui/ResultCard";
import { calculateEMI, formatCurrency } from "../../lib/calculators";

export default function EMICalculator() {
  const [principal, setPrincipal] = useState("");
  const [rate, setRate] = useState("");
  const [tenure, setTenure] = useState("");
  const [result, setResult] = useState<any>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!principal || parseFloat(principal) <= 0) {
      newErrors.principal = "Please enter a valid loan amount";
    }
    if (!rate || parseFloat(rate) <= 0 || parseFloat(rate) > 50) {
      newErrors.rate = "Please enter a valid interest rate (0-50%)";
    }
    if (!tenure || parseFloat(tenure) <= 0 || parseFloat(tenure) > 360) {
      newErrors.tenure = "Please enter a valid tenure (1-360 months)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCalculate = () => {
    if (!validate()) return;

    const emiResult = calculateEMI(
      parseFloat(principal),
      parseFloat(rate),
      parseFloat(tenure)
    );

    setResult(emiResult);
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
        title="EMI Calculator"
        description="Calculate your Equated Monthly Installment (EMI) for home loans, personal loans, car loans, and more."
        onCalculate={handleCalculate}
        onReset={handleReset}
      >
        <InputField
          label="Loan Amount"
          value={principal}
          onChange={setPrincipal}
          placeholder="Enter loan amount"
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
          label="Loan Tenure"
          value={tenure}
          onChange={setTenure}
          placeholder="Enter tenure in months"
          suffix="months"
          error={errors.tenure}
          required
        />
      </CalculatorCard>

      {result && (
        <ResultCard
          title="EMI Calculation Results"
          results={[
            {
              label: "Monthly EMI",
              value: formatCurrency(result.emi),
              highlight: true,
            },
            {
              label: "Total Interest Payable",
              value: formatCurrency(result.totalInterest),
            },
            {
              label: "Total Amount Payable",
              value: formatCurrency(result.totalAmount),
            },
          ]}
          explanation={`You will pay ${formatCurrency(
            result.emi
          )} every month for ${tenure} months. The total interest over the loan period will be ${formatCurrency(
            result.totalInterest
          )}.`}
        />
      )}
    </div>
  );
}
