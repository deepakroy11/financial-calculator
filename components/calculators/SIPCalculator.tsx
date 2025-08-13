"use client";

import { useState } from "react";
import CalculatorCard from "../ui/CalculatorCard";
import InputField from "../ui/InputField";
import ResultCard from "../ui/ResultCard";
import { calculateSIP, formatCurrency } from "../../lib/calculators";

export default function SIPCalculator() {
  const [monthlyAmount, setMonthlyAmount] = useState("");
  const [rate, setRate] = useState("");
  const [tenure, setTenure] = useState("");
  const [result, setResult] = useState<any>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!monthlyAmount || parseFloat(monthlyAmount) <= 0) {
      newErrors.monthlyAmount =
        "Please enter a valid monthly investment amount";
    }
    if (!rate || parseFloat(rate) <= 0 || parseFloat(rate) > 50) {
      newErrors.rate = "Please enter a valid expected return (0-50%)";
    }
    if (!tenure || parseFloat(tenure) <= 0 || parseFloat(tenure) > 50) {
      newErrors.tenure = "Please enter a valid investment period (1-50 years)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCalculate = () => {
    if (!validate()) return;

    const sipResult = calculateSIP(
      parseFloat(monthlyAmount),
      parseFloat(rate),
      parseFloat(tenure)
    );

    setResult(sipResult);
  };

  const handleReset = () => {
    setMonthlyAmount("");
    setRate("");
    setTenure("");
    setResult(null);
    setErrors({});
  };

  return (
    <div>
      <CalculatorCard
        title="SIP Calculator"
        description="Calculate the future value of your Systematic Investment Plan (SIP) and see how your money grows over time."
        onCalculate={handleCalculate}
        onReset={handleReset}
      >
        <InputField
          label="Monthly Investment"
          value={monthlyAmount}
          onChange={setMonthlyAmount}
          placeholder="Enter monthly SIP amount"
          suffix="₹"
          error={errors.monthlyAmount}
          required
        />
        <InputField
          label="Expected Annual Return"
          value={rate}
          onChange={setRate}
          placeholder="Enter expected return rate"
          suffix="%"
          error={errors.rate}
          required
        />
        <InputField
          label="Investment Period"
          value={tenure}
          onChange={setTenure}
          placeholder="Enter investment period"
          suffix="years"
          error={errors.tenure}
          required
        />
      </CalculatorCard>

      {result && (
        <ResultCard
          title="SIP Investment Results"
          results={[
            {
              label: "Future Value",
              value: formatCurrency(result.futureValue),
              highlight: true,
            },
            {
              label: "Total Investment",
              value: formatCurrency(result.totalInvestment),
            },
            {
              label: "Total Returns",
              value: formatCurrency(result.totalReturns),
            },
          ]}
          explanation={`By investing ${formatCurrency(
            parseFloat(monthlyAmount)
          )} monthly for ${tenure} years at ${rate}% annual return, your investment will grow to ${formatCurrency(
            result.futureValue
          )}.`}
        />
      )}
    </div>
  );
}
