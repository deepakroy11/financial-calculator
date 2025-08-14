"use client";

import { useState } from "react";
import CalculatorCard from "../ui/CalculatorCard";
import InputField from "../ui/InputField";
import ResultCard from "../ui/ResultCard";
import RelatedCalculators from "../ui/RelatedCalculators";
import DurationToggle from "../ui/DurationToggle";
import { calculateSavingsGoal, formatCurrency } from "../../lib/calculators";
import { Box } from "@mui/material";

interface SavingsGoalCalculatorProps {
  onCalculatorSelect?: (calculatorId: string) => void;
}

export default function SavingsGoalCalculator({
  onCalculatorSelect,
}: SavingsGoalCalculatorProps) {
  const [targetAmount, setTargetAmount] = useState("");
  const [currentSavings, setCurrentSavings] = useState("");
  const [timeframe, setTimeframe] = useState("");
  const [durationUnit, setDurationUnit] = useState<"months" | "years">("years");
  const [expectedReturn, setExpectedReturn] = useState("");
  const [result, setResult] = useState<any>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!targetAmount || parseFloat(targetAmount) <= 0) {
      newErrors.targetAmount = "Please enter a valid target amount";
    }
    if (!currentSavings || parseFloat(currentSavings) < 0) {
      newErrors.currentSavings = "Please enter current savings (can be 0)";
    }
    const maxTimeframe = durationUnit === "years" ? 50 : 600; // 50 years or 600 months
    const timeframeLabel = durationUnit === "years" ? "years" : "months";

    if (
      !timeframe ||
      parseFloat(timeframe) <= 0 ||
      parseFloat(timeframe) > maxTimeframe
    ) {
      newErrors.timeframe = `Please enter a valid timeframe (1-${maxTimeframe} ${timeframeLabel})`;
    }
    if (
      !expectedReturn ||
      parseFloat(expectedReturn) <= 0 ||
      parseFloat(expectedReturn) > 30
    ) {
      newErrors.expectedReturn = "Please enter a valid expected return (0-30%)";
    }
    if (parseFloat(currentSavings) >= parseFloat(targetAmount)) {
      newErrors.targetAmount =
        "Target amount should be greater than current savings";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCalculate = () => {
    if (!validate()) return;

    // Convert timeframe to years for calculation
    const timeframeInYears =
      durationUnit === "months"
        ? parseFloat(timeframe) / 12
        : parseFloat(timeframe);

    const goalResult = calculateSavingsGoal(
      parseFloat(targetAmount),
      parseFloat(currentSavings),
      timeframeInYears,
      parseFloat(expectedReturn)
    );

    setResult(goalResult);
  };

  const handleReset = () => {
    setTargetAmount("");
    setCurrentSavings("");
    setTimeframe("");
    setExpectedReturn("");
    setResult(null);
    setErrors({});
  };

  return (
    <div>
      <CalculatorCard
        title="Savings Goal Calculator"
        description="Calculate how much you need to save monthly to reach your financial goals within a specific timeframe."
        onCalculate={handleCalculate}
        onReset={handleReset}
      >
        <InputField
          label="Target Amount"
          value={targetAmount}
          onChange={setTargetAmount}
          placeholder="Enter your savings goal"
          suffix="₹"
          error={errors.targetAmount}
          required
        />
        <InputField
          label="Current Savings"
          value={currentSavings}
          onChange={setCurrentSavings}
          placeholder="Enter current savings amount"
          suffix="₹"
          error={errors.currentSavings}
          required
        />
        <Box>
          <DurationToggle
            value={durationUnit}
            onChange={setDurationUnit}
            label="Timeframe Unit"
          />
          <InputField
            label="Time to Goal"
            value={timeframe}
            onChange={setTimeframe}
            placeholder={`Enter timeframe in ${durationUnit}`}
            suffix={durationUnit}
            error={errors.timeframe}
            required
          />
        </Box>
        <InputField
          label="Expected Annual Return"
          value={expectedReturn}
          onChange={setExpectedReturn}
          placeholder="Enter expected return"
          suffix="%"
          error={errors.expectedReturn}
          required
        />
      </CalculatorCard>

      {result && (
        <ResultCard
          title="Savings Goal Results"
          results={[
            {
              label: "Monthly SIP Required",
              value: formatCurrency(result.monthlySIP),
              highlight: true,
            },
            {
              label: "Future Value of Current Savings",
              value: formatCurrency(result.futureValueCurrentSavings),
            },
            {
              label: "Total Investment Required",
              value: formatCurrency(result.totalInvestment),
            },
          ]}
          explanation={`To reach your goal of ${formatCurrency(
            parseFloat(targetAmount)
          )} in ${timeframe} years, you need to invest ${formatCurrency(
            result.monthlySIP
          )} monthly at ${expectedReturn}% annual return.`}
        />
      )}

      {onCalculatorSelect && (
        <RelatedCalculators
          currentCalculator="savings-goal"
          onCalculatorSelect={onCalculatorSelect}
        />
      )}
    </div>
  );
}
