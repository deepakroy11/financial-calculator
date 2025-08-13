"use client";

import { useState } from "react";
import CalculatorCard from "../ui/CalculatorCard";
import InputField from "../ui/InputField";
import ResultCard from "../ui/ResultCard";
import RelatedCalculators from "../ui/RelatedCalculators";
import { calculateRetirement, formatCurrency } from "../../lib/calculators";

interface RetirementCalculatorProps {
  onCalculatorSelect?: (calculatorId: string) => void;
}

export default function RetirementCalculator({
  onCalculatorSelect,
}: RetirementCalculatorProps) {
  const [currentAge, setCurrentAge] = useState("");
  const [retirementAge, setRetirementAge] = useState("");
  const [monthlyExpenses, setMonthlyExpenses] = useState("");
  const [inflation, setInflation] = useState("");
  const [expectedReturn, setExpectedReturn] = useState("");
  const [result, setResult] = useState<any>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (
      !currentAge ||
      parseFloat(currentAge) <= 0 ||
      parseFloat(currentAge) > 100
    ) {
      newErrors.currentAge = "Please enter a valid current age (1-100)";
    }
    if (
      !retirementAge ||
      parseFloat(retirementAge) <= parseFloat(currentAge) ||
      parseFloat(retirementAge) > 100
    ) {
      newErrors.retirementAge =
        "Retirement age must be greater than current age and less than 100";
    }
    if (!monthlyExpenses || parseFloat(monthlyExpenses) <= 0) {
      newErrors.monthlyExpenses = "Please enter valid monthly expenses";
    }
    if (
      !inflation ||
      parseFloat(inflation) <= 0 ||
      parseFloat(inflation) > 20
    ) {
      newErrors.inflation = "Please enter a valid inflation rate (0-20%)";
    }
    if (
      !expectedReturn ||
      parseFloat(expectedReturn) <= 0 ||
      parseFloat(expectedReturn) > 30
    ) {
      newErrors.expectedReturn = "Please enter a valid expected return (0-30%)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCalculate = () => {
    if (!validate()) return;

    const retirementResult = calculateRetirement(
      parseFloat(currentAge),
      parseFloat(retirementAge),
      parseFloat(monthlyExpenses),
      parseFloat(inflation),
      parseFloat(expectedReturn)
    );

    setResult(retirementResult);
  };

  const handleReset = () => {
    setCurrentAge("");
    setRetirementAge("");
    setMonthlyExpenses("");
    setInflation("");
    setExpectedReturn("");
    setResult(null);
    setErrors({});
  };

  return (
    <div>
      <CalculatorCard
        title="Retirement Planning Calculator"
        description="Plan your retirement corpus and calculate the monthly SIP needed to achieve your retirement goals."
        onCalculate={handleCalculate}
        onReset={handleReset}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            label="Current Age"
            value={currentAge}
            onChange={setCurrentAge}
            placeholder="Enter your current age"
            suffix="years"
            error={errors.currentAge}
            required
          />
          <InputField
            label="Retirement Age"
            value={retirementAge}
            onChange={setRetirementAge}
            placeholder="Enter retirement age"
            suffix="years"
            error={errors.retirementAge}
            required
          />
        </div>

        <InputField
          label="Current Monthly Expenses"
          value={monthlyExpenses}
          onChange={setMonthlyExpenses}
          placeholder="Enter current monthly expenses"
          suffix="₹"
          error={errors.monthlyExpenses}
          required
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            label="Expected Inflation Rate"
            value={inflation}
            onChange={setInflation}
            placeholder="Enter inflation rate"
            suffix="%"
            error={errors.inflation}
            required
          />
          <InputField
            label="Expected Return on Investment"
            value={expectedReturn}
            onChange={setExpectedReturn}
            placeholder="Enter expected return"
            suffix="%"
            error={errors.expectedReturn}
            required
          />
        </div>
      </CalculatorCard>

      {result && (
        <ResultCard
          title="Retirement Planning Results"
          results={[
            {
              label: "Required Retirement Corpus",
              value: formatCurrency(result.corpusNeeded),
              highlight: true,
            },
            {
              label: "Monthly SIP Required",
              value: formatCurrency(result.monthlySIP),
              highlight: true,
            },
            {
              label: "Future Monthly Expenses",
              value: formatCurrency(result.futureExpenses),
            },
          ]}
          explanation={`To maintain your current lifestyle in retirement, you need a corpus of ${formatCurrency(
            result.corpusNeeded
          )}. Start investing ${formatCurrency(
            result.monthlySIP
          )} monthly to achieve this goal.`}
        />
      )}

      {onCalculatorSelect && (
        <RelatedCalculators
          currentCalculator="retirement"
          onCalculatorSelect={onCalculatorSelect}
        />
      )}
    </div>
  );
}
