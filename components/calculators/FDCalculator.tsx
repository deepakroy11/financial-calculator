"use client";

import { useState } from "react";
import CalculatorCard from "../ui/CalculatorCard";
import InputField from "../ui/InputField";
import ResultCard from "../ui/ResultCard";
import RelatedCalculators from "../ui/RelatedCalculators";
import DurationToggle from "../ui/DurationToggle";
import { calculateFD, formatCurrency } from "../../lib/calculators";
import { Box, Typography } from "@mui/material";

interface FDCalculatorProps {
  onCalculatorSelect?: (calculatorId: string) => void;
}

export default function FDCalculator({
  onCalculatorSelect,
}: FDCalculatorProps) {
  const [principal, setPrincipal] = useState("");
  const [rate, setRate] = useState("");
  const [tenure, setTenure] = useState("");
  const [durationUnit, setDurationUnit] = useState<"months" | "years">("years");
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

    const fdResult = calculateFD(
      parseFloat(principal),
      parseFloat(rate),
      tenureInYears
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
    <Box sx={{ maxWidth: "1200px", mx: "auto" }}>
      <Typography variant="h4" sx={{ mb: 1, fontWeight: 700, color: "text.primary" }}>
        Fixed Deposit Calculator
      </Typography>
      <Typography variant="body2" sx={{ mb: 3, color: "text.secondary" }}>
        Calculate the maturity amount and interest earned on your Fixed Deposit investment.
      </Typography>
      
      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", lg: "1fr 1fr" }, gap: 3 }}>
        <CalculatorCard
          title="FD Details"
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
          showWordsFor="currency"
        />
        <InputField
          label="Interest Rate (Annual)"
          value={rate}
          onChange={setRate}
          placeholder="Enter interest rate"
          suffix="%"
          error={errors.rate}
          required
          showWordsFor="percentage"
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
            showWordsFor={durationUnit}
          />
        </Box>
        </CalculatorCard>
        
        <Box>
          {result ? (
            <ResultCard
              title="FD Results"
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
            />
          ) : (
            <Box sx={{ 
              p: 4, 
              textAlign: "center", 
              backgroundColor: "background.paper",
              borderRadius: 2,
              border: 1,
              borderColor: "divider"
            }}>
              <Typography variant="body2" color="text.secondary">
                Enter FD details to calculate maturity amount
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
      
      {onCalculatorSelect && (
        <Box sx={{ mt: 3 }}>
          <RelatedCalculators
            currentCalculator="fd"
            onCalculatorSelect={onCalculatorSelect}
          />
        </Box>
      )}
    </Box>
  );
}
