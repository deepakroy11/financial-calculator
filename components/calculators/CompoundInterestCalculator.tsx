"use client";

import { useState } from "react";
import CalculatorCard from "../ui/CalculatorCard";
import InputField from "../ui/InputField";
import ResultCard from "../ui/ResultCard";
import RelatedCalculators from "../ui/RelatedCalculators";
import DurationToggle from "../ui/DurationToggle";
import { formatCurrency } from "../../lib/calculators";
import { Box } from "@mui/material";

interface CompoundInterestCalculatorProps {
  onCalculatorSelect?: (calculatorId: string) => void;
}

export default function CompoundInterestCalculator({
  onCalculatorSelect,
}: CompoundInterestCalculatorProps) {
  const [principal, setPrincipal] = useState("");
  const [rate, setRate] = useState("");
  const [time, setTime] = useState("");
  const [durationUnit, setDurationUnit] = useState<"months" | "years">("years");
  const [compoundFreq, setCompoundFreq] = useState("4");
  const [result, setResult] = useState<any>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!principal || parseFloat(principal) <= 0) {
      newErrors.principal = "Please enter a valid principal amount";
    }
    if (!rate || parseFloat(rate) <= 0 || parseFloat(rate) > 50) {
      newErrors.rate = "Please enter a valid interest rate (0-50%)";
    }
    const maxTime = durationUnit === "years" ? 50 : 600; // 50 years or 600 months
    const timeLabel = durationUnit === "years" ? "years" : "months";

    if (!time || parseFloat(time) <= 0 || parseFloat(time) > maxTime) {
      newErrors.time = `Please enter a valid time period (1-${maxTime} ${timeLabel})`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCalculate = () => {
    if (!validate()) return;

    const p = parseFloat(principal);
    const r = parseFloat(rate) / 100;
    const timeValue = parseFloat(time);
    const n = parseFloat(compoundFreq);

    // Convert time to years for calculation
    const t = durationUnit === "months" ? timeValue / 12 : timeValue;

    const amount = p * Math.pow(1 + r / n, n * t);
    const compoundInterest = amount - p;

    setResult({
      amount: Math.round(amount),
      compoundInterest: Math.round(compoundInterest),
      principal: Math.round(p),
    });
  };

  const handleReset = () => {
    setPrincipal("");
    setRate("");
    setTime("");
    setCompoundFreq("4");
    setResult(null);
    setErrors({});
  };

  return (
    <div>
      <CalculatorCard
        title="Compound Interest Calculator"
        description="Calculate the compound interest and final amount on your investment with different compounding frequencies."
        onCalculate={handleCalculate}
        onReset={handleReset}
      >
        <InputField
          label="Principal Amount"
          value={principal}
          onChange={setPrincipal}
          placeholder="Enter principal amount"
          suffix="₹"
          error={errors.principal}
          required
        />
        <InputField
          label="Annual Interest Rate"
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
            label="Time Period Unit"
          />
          <InputField
            label="Time Period"
            value={time}
            onChange={setTime}
            placeholder={`Enter time period in ${durationUnit}`}
            suffix={durationUnit}
            error={errors.time}
            required
          />
        </Box>
        <InputField
          label="Compounding Frequency"
          value={compoundFreq}
          onChange={setCompoundFreq}
          placeholder="Times per year"
          suffix="times/year"
          required
        />
      </CalculatorCard>

      {result && (
        <ResultCard
          title="Compound Interest Results"
          results={[
            {
              label: "Final Amount",
              value: formatCurrency(result.amount),
              highlight: true,
            },
            {
              label: "Principal Amount",
              value: formatCurrency(result.principal),
            },
            {
              label: "Compound Interest Earned",
              value: formatCurrency(result.compoundInterest),
            },
          ]}
          explanation={`Your investment of ${formatCurrency(
            parseFloat(principal)
          )} at ${rate}% annual interest compounded ${compoundFreq} times per year for ${time} years will grow to ${formatCurrency(
            result.amount
          )}.`}
        />
      )}

      {onCalculatorSelect && (
        <RelatedCalculators
          currentCalculator="compound-interest"
          onCalculatorSelect={onCalculatorSelect}
        />
      )}
    </div>
  );
}
