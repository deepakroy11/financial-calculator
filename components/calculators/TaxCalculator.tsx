"use client";

import { useState } from "react";
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import CalculatorCard from "../ui/CalculatorCard";
import InputField from "../ui/InputField";
import ResultCard from "../ui/ResultCard";
import RelatedCalculators from "../ui/RelatedCalculators";
import { calculateIncomeTax, formatCurrency } from "../../lib/calculators";

interface TaxCalculatorProps {
  onCalculatorSelect?: (calculatorId: string) => void;
}

export default function TaxCalculator({
  onCalculatorSelect,
}: TaxCalculatorProps) {
  const [income, setIncome] = useState("");
  const [regime, setRegime] = useState<"old" | "new">("new");
  const [result, setResult] = useState<any>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!income || parseFloat(income) <= 0) {
      newErrors.income = "Please enter a valid annual income";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCalculate = () => {
    if (!validate()) return;

    const taxResult = calculateIncomeTax(parseFloat(income), regime);

    setResult(taxResult);
  };

  const handleReset = () => {
    setIncome("");
    setRegime("new");
    setResult(null);
    setErrors({});
  };

  return (
    <div>
      <CalculatorCard
        title="Income Tax Calculator"
        description="Calculate your income tax liability under the old and new tax regime for FY 2024-25."
        onCalculate={handleCalculate}
        onReset={handleReset}
      >
        <InputField
          label="Annual Income"
          value={income}
          onChange={setIncome}
          placeholder="Enter your annual income"
          suffix="₹"
          error={errors.income}
          required
        />

        <FormControl component="fieldset" className="w-full">
          <FormLabel
            component="legend"
            className="text-gray-700 font-medium mb-2"
          >
            Tax Regime
          </FormLabel>
          <RadioGroup
            value={regime}
            onChange={(e) => setRegime(e.target.value as "old" | "new")}
            row
          >
            <FormControlLabel
              value="new"
              control={<Radio />}
              label="New Tax Regime"
            />
            <FormControlLabel
              value="old"
              control={<Radio />}
              label="Old Tax Regime"
            />
          </RadioGroup>
        </FormControl>
      </CalculatorCard>

      {result && (
        <ResultCard
          title={`Income Tax Calculation (${
            regime === "new" ? "New" : "Old"
          } Regime)`}
          results={[
            {
              label: "Income Tax",
              value: formatCurrency(result.tax),
            },
            {
              label: "Health & Education Cess (4%)",
              value: formatCurrency(result.cess),
            },
            {
              label: "Total Tax Liability",
              value: formatCurrency(result.totalTax),
              highlight: true,
            },
            {
              label: "Net Income (After Tax)",
              value: formatCurrency(result.netIncome),
            },
          ]}
          explanation={`Under the ${
            regime === "new" ? "new" : "old"
          } tax regime, your total tax liability is ${formatCurrency(
            result.totalTax
          )} on an annual income of ${formatCurrency(parseFloat(income))}.`}
        />
      )}

      {onCalculatorSelect && (
        <RelatedCalculators
          currentCalculator="tax"
          onCalculatorSelect={onCalculatorSelect}
        />
      )}
    </div>
  );
}
