"use client";

import { useState } from "react";
import CalculatorCard from "../ui/CalculatorCard";
import InputField from "../ui/InputField";
import ResultCard from "../ui/ResultCard";
import ChartCard from "../ui/ChartCard";
import RelatedCalculators from "../ui/RelatedCalculators";
import DurationToggle from "../ui/DurationToggle";
import { calculateSIP, formatCurrency } from "../../lib/calculators";
import { Box } from "@mui/material";

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

      {result && (
        <ResultCard
          title={`SIP Investment Results${
            stepUpRate && parseFloat(stepUpRate) > 0 ? " (with Step-up)" : ""
          }`}
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
            ...(stepUpRate && parseFloat(stepUpRate) > 0
              ? [
                  {
                    label: "Annual Step-up Rate",
                    value: `${stepUpRate}%`,
                  },
                ]
              : []),
          ]}
          explanation={`By investing ${formatCurrency(
            parseFloat(monthlyAmount)
          )} monthly${
            stepUpRate && parseFloat(stepUpRate) > 0
              ? ` with ${stepUpRate}% annual increase`
              : ""
          } for ${tenure} ${
            durationUnit === "years" ? "years" : "months"
          } at ${rate}% annual return, your investment will grow to ${formatCurrency(
            result.futureValue
          )}.`}
        />
      )}

      {result && result.yearlyData && (
        <>
          <ChartCard
            title="SIP Growth Over Time"
            data={result.yearlyData}
            type="line"
            dataKey="total"
            xAxisKey="year"
          />

          <ChartCard
            title="Investment vs Returns"
            data={[
              { name: "Total Investment", value: result.totalInvestment },
              { name: "Total Returns", value: result.totalReturns },
            ]}
            type="pie"
            dataKey="value"
            colors={["#00C49F", "#FFBB28"]}
          />
        </>
      )}

      {/* Step-up Information */}
      <Box
        sx={{
          p: 2,
          backgroundColor: "info.light",
          borderRadius: 2,
          border: 1,
          borderColor: "info.main",
          mb: 3,
          mt: 3,
        }}
      >
        <Box sx={{ mb: 1, fontWeight: 600, color: "#000000" }}>
          About Step-up SIP:
        </Box>
        <Box sx={{ fontSize: "0.875rem", color: "#000000" }}>
          • Step-up SIP allows you to increase your investment amount annually
        </Box>
        <Box sx={{ fontSize: "0.875rem", color: "#000000" }}>
          • Helps counter inflation and increase wealth creation over time
        </Box>
        <Box sx={{ fontSize: "0.875rem", color: "#000000" }}>
          • Example: ₹5,000 monthly with 10% step-up becomes ₹5,500 in year 2
        </Box>
      </Box>

      {onCalculatorSelect && (
        <RelatedCalculators
          currentCalculator="sip"
          onCalculatorSelect={onCalculatorSelect}
        />
      )}
    </div>
  );
}
