"use client";

import { useState } from "react";
import CalculatorCard from "../ui/CalculatorCard";
import InputField from "../ui/InputField";
import ResultCard from "../ui/ResultCard";
import ChartCard from "../ui/ChartCard";
import RelatedCalculators from "../ui/RelatedCalculators";
import DurationToggle from "../ui/DurationToggle";
import { calculateSIP, formatCurrency } from "../../lib/calculators";
import { Box, Typography } from "@mui/material";

interface SIPCalculatorProps {
  onCalculatorSelect?: (calculatorId: string) => void;
}

export default function SIPCalculator({
  onCalculatorSelect,
}: SIPCalculatorProps) {
  const [monthlyAmount, setMonthlyAmount] = useState("");
  const [rate, setRate] = useState("");
  const [tenure, setTenure] = useState("");
  const [stepUpRate, setStepUpRate] = useState("");
  const [durationUnit, setDurationUnit] = useState<"months" | "years">("years");
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
    const maxTenure = durationUnit === "years" ? 50 : 600; // 50 years or 600 months
    const tenureLabel = durationUnit === "years" ? "years" : "months";

    if (!tenure || parseFloat(tenure) <= 0 || parseFloat(tenure) > maxTenure) {
      newErrors.tenure = `Please enter a valid investment period (1-${maxTenure} ${tenureLabel})`;
    }

    // Step-up rate validation (optional field)
    if (
      stepUpRate &&
      (parseFloat(stepUpRate) < 0 || parseFloat(stepUpRate) > 50)
    ) {
      newErrors.stepUpRate = "Step-up rate should be between 0-50%";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCalculate = () => {
    if (!validate()) return;

    // Convert tenure to years for calculation
    const tenureInYears =
      durationUnit === "months" ? parseFloat(tenure) / 12 : parseFloat(tenure);

    const sipResult = calculateSIP(
      parseFloat(monthlyAmount),
      parseFloat(rate),
      tenureInYears,
      stepUpRate ? parseFloat(stepUpRate) : 0
    );

    // Generate year-wise growth data for chart
    const yearlyData = [];
    const monthlyRate = parseFloat(rate) / (12 * 100);
    const monthlyInvestment = parseFloat(monthlyAmount);
    const totalYears = Math.ceil(tenureInYears);

    for (let year = 1; year <= totalYears; year++) {
      const months = year * 12;
      const futureValue =
        monthlyInvestment *
        (((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) *
          (1 + monthlyRate));
      const invested = monthlyInvestment * months;
      const returns = futureValue - invested;

      yearlyData.push({
        year: `Year ${year}`,
        invested: Math.round(invested),
        returns: Math.round(returns),
        total: Math.round(futureValue),
      });
    }

    setResult({ ...sipResult, yearlyData });
  };

  const handleReset = () => {
    setMonthlyAmount("");
    setRate("");
    setTenure("");
    setStepUpRate("");
    setResult(null);
    setErrors({});
  };

  return (
    <Box sx={{ maxWidth: "1200px", mx: "auto" }}>
      <Typography variant="h4" sx={{ mb: 1, fontWeight: 700, color: "text.primary" }}>
        SIP Calculator
      </Typography>
      <Typography variant="body2" sx={{ mb: 3, color: "text.secondary" }}>
        Calculate the future value of your Systematic Investment Plan (SIP) and see how your money grows over time.
      </Typography>
      
      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", lg: "1fr 1fr" }, gap: 3 }}>
        <CalculatorCard
          title="SIP Details"
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
          showWordsFor="currency"
        />
        <InputField
          label="Expected Annual Return"
          value={rate}
          onChange={setRate}
          placeholder="Enter expected return rate"
          suffix="%"
          error={errors.rate}
          required
          showWordsFor="percentage"
        />
        <InputField
          label="Annual Step-up (Optional)"
          value={stepUpRate}
          onChange={setStepUpRate}
          placeholder="Enter annual increase rate (e.g., 10)"
          suffix="%"
          error={errors.stepUpRate}
          showWordsFor="percentage"
        />
        <Box>
          <DurationToggle
            value={durationUnit}
            onChange={setDurationUnit}
            label="Duration Unit"
          />
          <InputField
            label="Investment Period"
            value={tenure}
            onChange={setTenure}
            placeholder={`Enter investment period in ${durationUnit}`}
            suffix={durationUnit}
            error={errors.tenure}
            required
            showWordsFor={durationUnit}
          />
        </Box>
        </CalculatorCard>
        
        <Box>
          {result ? (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <ResultCard
                title="SIP Results"
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
              />
              <ChartCard
                title="Investment Breakdown"
                data={[
                  { name: "Investment", value: result.totalInvestment },
                  { name: "Returns", value: result.totalReturns },
                ]}
                type="pie"
                dataKey="value"
                colors={["#14213D", "#FCA311"]}
              />
            </Box>
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
                Enter SIP details to see investment growth and returns
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
      
      {onCalculatorSelect && (
        <Box sx={{ mt: 3 }}>
          <RelatedCalculators
            currentCalculator="sip"
            onCalculatorSelect={onCalculatorSelect}
          />
        </Box>
      )}
    </Box>
  );
}
