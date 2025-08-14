"use client";

import { useState } from "react";
import CalculatorCard from "../ui/CalculatorCard";
import InputField from "../ui/InputField";
import ResultCard from "../ui/ResultCard";
import RelatedCalculators from "../ui/RelatedCalculators";
import DurationToggle from "../ui/DurationToggle";
import { calculateRD, formatCurrency } from "../../lib/calculators";
import { Box } from "@mui/material";

interface RDCalculatorProps {
  onCalculatorSelect?: (calculatorId: string) => void;
}

export default function RDCalculator({
  onCalculatorSelect,
}: RDCalculatorProps) {
  const [monthlyDeposit, setMonthlyDeposit] = useState("");
  const [rate, setRate] = useState("");
  const [tenure, setTenure] = useState("");
  const [durationUnit, setDurationUnit] = useState<"months" | "years">("years");
  const [result, setResult] = useState<any>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!monthlyDeposit || parseFloat(monthlyDeposit) <= 0) {
      newErrors.monthlyDeposit = "Please enter a valid monthly deposit amount";
    }
    if (!rate || parseFloat(rate) <= 0 || parseFloat(rate) > 20) {
      newErrors.rate = "Please enter a valid interest rate (0-20%)";
    }
    const maxTenure = durationUnit === "years" ? 10 : 120; // 10 years or 120 months
    const tenureLabel = durationUnit === "years" ? "years" : "months";
    const minTenure = durationUnit === "years" ? 0.1 : 1;

    if (
      !tenure ||
      parseFloat(tenure) < minTenure ||
      parseFloat(tenure) > maxTenure
    ) {
      newErrors.tenure = `Please enter a valid tenure (${minTenure}-${maxTenure} ${tenureLabel})`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCalculate = () => {
    if (!validate()) return;

    // Convert tenure to years for calculation
    const tenureInYears =
      durationUnit === "months" ? parseFloat(tenure) / 12 : parseFloat(tenure);

    const rdResult = calculateRD(
      parseFloat(monthlyDeposit),
      parseFloat(rate),
      tenureInYears
    );

    setResult(rdResult);
  };

  const handleReset = () => {
    setMonthlyDeposit("");
    setRate("");
    setTenure("");
    setResult(null);
    setErrors({});
  };

  return (
    <div>
      <CalculatorCard
        title="Recurring Deposit Calculator"
        description="Calculate the maturity amount and interest earned on your Recurring Deposit investment."
        onCalculate={handleCalculate}
        onReset={handleReset}
      >
        <InputField
          label="Monthly Deposit"
          value={monthlyDeposit}
          onChange={setMonthlyDeposit}
          placeholder="Enter monthly deposit amount"
          suffix="₹"
          error={errors.monthlyDeposit}
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
        <Box>
          <DurationToggle
            value={durationUnit}
            onChange={setDurationUnit}
            label="Tenure Unit"
          />
          <InputField
            label="Tenure"
            value={tenure}
            onChange={setTenure}
            placeholder={`Enter tenure in ${durationUnit}`}
            suffix={durationUnit}
            error={errors.tenure}
            required
          />
        </Box>
      </CalculatorCard>

      {result && (
        <ResultCard
          title="Recurring Deposit Results"
          results={[
            {
              label: "Maturity Amount",
              value: formatCurrency(result.maturityAmount),
              highlight: true,
            },
            {
              label: "Total Deposits",
              value: formatCurrency(result.totalDeposit),
            },
            {
              label: "Interest Earned",
              value: formatCurrency(result.interest),
            },
          ]}
          explanation={`By depositing ${formatCurrency(
            parseFloat(monthlyDeposit)
          )} monthly for ${tenure} years at ${rate}% interest, you will receive ${formatCurrency(
            result.maturityAmount
          )} at maturity.`}
        />
      )}

      {onCalculatorSelect && (
        <RelatedCalculators
          currentCalculator="rd"
          onCalculatorSelect={onCalculatorSelect}
        />
      )}
    </div>
  );
}
