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
import { formatCurrency } from "../../lib/calculators";

interface HRACalculatorProps {
  onCalculatorSelect?: (calculatorId: string) => void;
}

export default function HRACalculator({
  onCalculatorSelect,
}: HRACalculatorProps) {
  const [basicSalary, setBasicSalary] = useState("");
  const [hraReceived, setHraReceived] = useState("");
  const [rentPaid, setRentPaid] = useState("");
  const [cityType, setCityType] = useState<"metro" | "non-metro">("metro");
  const [result, setResult] = useState<any>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!basicSalary || parseFloat(basicSalary) <= 0) {
      newErrors.basicSalary = "Please enter a valid basic salary";
    }
    if (!hraReceived || parseFloat(hraReceived) <= 0) {
      newErrors.hraReceived = "Please enter a valid HRA amount";
    }
    if (!rentPaid || parseFloat(rentPaid) <= 0) {
      newErrors.rentPaid = "Please enter a valid rent amount";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCalculate = () => {
    if (!validate()) return;

    const basic = parseFloat(basicSalary);
    const hra = parseFloat(hraReceived);
    const rent = parseFloat(rentPaid);

    // HRA exemption calculation as per IT rules
    const hraPercentage = cityType === "metro" ? 0.5 : 0.4;
    const basicHraLimit = basic * hraPercentage;
    const rentExcess = Math.max(0, rent - basic * 0.1);

    const hraExemption = Math.min(hra, basicHraLimit, rentExcess);
    const taxableHra = hra - hraExemption;

    // Annual calculations
    const annualHraExemption = hraExemption * 12;
    const annualTaxableHra = taxableHra * 12;
    const annualTaxSaving = annualHraExemption * 0.3; // Assuming 30% tax bracket

    setResult({
      monthlyHraExemption: Math.round(hraExemption),
      monthlyTaxableHra: Math.round(taxableHra),
      annualHraExemption: Math.round(annualHraExemption),
      annualTaxSaving: Math.round(annualTaxSaving),
    });
  };

  const handleReset = () => {
    setBasicSalary("");
    setHraReceived("");
    setRentPaid("");
    setCityType("metro");
    setResult(null);
    setErrors({});
  };

  return (
    <div>
      <CalculatorCard
        title="HRA Calculator"
        description="Calculate your House Rent Allowance (HRA) exemption and tax savings as per Indian Income Tax rules."
        onCalculate={handleCalculate}
        onReset={handleReset}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            label="Basic Salary (Monthly)"
            value={basicSalary}
            onChange={setBasicSalary}
            placeholder="Enter basic salary"
            suffix="₹"
            error={errors.basicSalary}
            required
          />
          <InputField
            label="HRA Received (Monthly)"
            value={hraReceived}
            onChange={setHraReceived}
            placeholder="Enter HRA amount"
            suffix="₹"
            error={errors.hraReceived}
            required
          />
        </div>

        <InputField
          label="Rent Paid (Monthly)"
          value={rentPaid}
          onChange={setRentPaid}
          placeholder="Enter monthly rent"
          suffix="₹"
          error={errors.rentPaid}
          required
        />

        <FormControl component="fieldset" className="w-full">
          <FormLabel
            component="legend"
            className="text-gray-700 font-medium mb-2"
          >
            City Type
          </FormLabel>
          <RadioGroup
            value={cityType}
            onChange={(e) =>
              setCityType(e.target.value as "metro" | "non-metro")
            }
            row
          >
            <FormControlLabel
              value="metro"
              control={<Radio />}
              label="Metro City (50% of basic)"
            />
            <FormControlLabel
              value="non-metro"
              control={<Radio />}
              label="Non-Metro City (40% of basic)"
            />
          </RadioGroup>
        </FormControl>
      </CalculatorCard>

      {result && (
        <ResultCard
          title="HRA Exemption Results"
          results={[
            {
              label: "Monthly HRA Exemption",
              value: formatCurrency(result.monthlyHraExemption),
              highlight: true,
            },
            {
              label: "Monthly Taxable HRA",
              value: formatCurrency(result.monthlyTaxableHra),
            },
            {
              label: "Annual HRA Exemption",
              value: formatCurrency(result.annualHraExemption),
            },
            {
              label: "Annual Tax Savings",
              value: formatCurrency(result.annualTaxSaving),
            },
          ]}
          explanation={`Your HRA exemption is calculated as the minimum of: (1) Actual HRA received, (2) ${
            cityType === "metro" ? "50%" : "40%"
          } of basic salary, (3) Rent paid minus 10% of basic salary. You can claim ${formatCurrency(
            result.annualHraExemption
          )} as HRA exemption annually.`}
        />
      )}

      {onCalculatorSelect && (
        <RelatedCalculators
          currentCalculator="hra"
          onCalculatorSelect={onCalculatorSelect}
        />
      )}
    </div>
  );
}
