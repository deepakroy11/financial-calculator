"use client";

import { useState } from "react";
import CalculatorCard from "../ui/CalculatorCard";
import InputField from "../ui/InputField";
import ResultCard from "../ui/ResultCard";
import ChartCard from "../ui/ChartCard";
import RelatedCalculators from "../ui/RelatedCalculators";
import DurationToggle from "../ui/DurationToggle";
import { calculateAdvancedSIP, formatCurrency } from "../../lib/calculators";
import { Box, Typography, Divider } from "@mui/material";

interface AdvancedSIPCalculatorProps {
  onCalculatorSelect?: (calculatorId: string) => void;
}

export default function AdvancedSIPCalculator({
  onCalculatorSelect,
}: AdvancedSIPCalculatorProps) {
  const [lumpSumAmount, setLumpSumAmount] = useState("");
  const [monthlyAmount, setMonthlyAmount] = useState("");
  const [rate, setRate] = useState("");
  const [tenure, setTenure] = useState("");
  const [stepUpRate, setStepUpRate] = useState("");
  const [durationUnit, setDurationUnit] = useState<"months" | "years">("years");
  const [result, setResult] = useState<any>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!lumpSumAmount || parseFloat(lumpSumAmount) < 0) {
      newErrors.lumpSumAmount =
        "Please enter a valid lumpsum amount (can be 0)";
    }
    if (parseFloat(lumpSumAmount) > 50000000) {
      newErrors.lumpSumAmount = "Lumpsum amount should be less than ₹5 crores";
    }

    if (!monthlyAmount || parseFloat(monthlyAmount) <= 0) {
      newErrors.monthlyAmount = "Please enter a valid monthly SIP amount";
    }
    if (parseFloat(monthlyAmount) > 1000000) {
      newErrors.monthlyAmount = "Monthly SIP should be less than ₹10 lakhs";
    }

    if (!rate || parseFloat(rate) <= 0 || parseFloat(rate) > 50) {
      newErrors.rate = "Please enter a valid expected return (0-50%)";
    }

    const maxTenure = durationUnit === "years" ? 50 : 600;
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

    // At least one investment type should be provided
    if (
      parseFloat(lumpSumAmount || "0") === 0 &&
      parseFloat(monthlyAmount || "0") === 0
    ) {
      newErrors.lumpSumAmount =
        "Please enter either lumpsum amount or monthly SIP amount";
      newErrors.monthlyAmount =
        "Please enter either lumpsum amount or monthly SIP amount";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCalculate = () => {
    if (!validate()) return;

    // Convert tenure to years for calculation
    const tenureInYears =
      durationUnit === "months" ? parseFloat(tenure) / 12 : parseFloat(tenure);

    const advancedResult = calculateAdvancedSIP(
      parseFloat(lumpSumAmount || "0"),
      parseFloat(monthlyAmount || "0"),
      parseFloat(rate),
      tenureInYears,
      stepUpRate ? parseFloat(stepUpRate) : 0
    );

    setResult(advancedResult);
  };

  const handleReset = () => {
    setLumpSumAmount("");
    setMonthlyAmount("");
    setRate("");
    setTenure("");
    setStepUpRate("");
    setResult(null);
    setErrors({});
  };

  const getChartData = () => {
    if (!result) return [];

    return [
      {
        name: "Lumpsum Investment",
        value: result.lumpSumInvestment,
        color: "#14213D",
      },
      {
        name: "SIP Investment",
        value: result.sipInvestment,
        color: "#FCA311",
      },
      {
        name: "Total Returns",
        value: result.totalReturns,
        color: "#00C49F",
      },
    ];
  };

  const getBreakdownData = () => {
    if (!result) return [];

    return [
      {
        name: "Lumpsum Returns",
        value: result.lumpSumReturns,
        color: "#14213D",
      },
      {
        name: "SIP Returns",
        value: result.sipReturns,
        color: "#FCA311",
      },
    ];
  };

  const relatedCalculators = [
    {
      id: "sip",
      name: "SIP Calculator",
      description: "Calculate systematic investment returns",
    },
    {
      id: "lump-sum",
      name: "Lump Sum Calculator",
      description: "Calculate one-time investment returns",
    },
    {
      id: "compound-interest",
      name: "Compound Interest",
      description: "Calculate compound interest growth",
    },
    {
      id: "savings-goal",
      name: "Savings Goal",
      description: "Calculate monthly savings for goals",
    },
  ];

  return (
    <div>
      <CalculatorCard
        title="Advanced SIP with Lumpsum Calculator"
        description="Calculate returns from a combination of one-time lumpsum investment and regular SIP contributions with optional annual step-up."
        onCalculate={handleCalculate}
        onReset={handleReset}
      >
        {/* Two Column Layout */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
            gap: 3,
          }}
        >
          {/* Left Column - Investment Amounts */}
          <Box>
            <Typography
              variant="h6"
              sx={{ mb: 2, color: "text.primary", fontWeight: 600 }}
            >
              💰 Investment Amounts
            </Typography>
            <InputField
              label="Lumpsum Amount (Optional)"
              value={lumpSumAmount}
              onChange={setLumpSumAmount}
              placeholder="Enter initial investment amount"
              suffix="₹"
              error={errors.lumpSumAmount}
              showWordsFor="currency"
            />
            <InputField
              label="Monthly SIP Amount"
              value={monthlyAmount}
              onChange={setMonthlyAmount}
              placeholder="Enter monthly SIP amount"
              suffix="₹"
              error={errors.monthlyAmount}
              required
              showWordsFor="currency"
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
          </Box>

          {/* Right Column - Investment Parameters */}
          <Box>
            <Typography
              variant="h6"
              sx={{ mb: 2, color: "text.primary", fontWeight: 600 }}
            >
              ⚙️ Investment Parameters
            </Typography>
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
            <Box>
              <DurationToggle
                value={durationUnit}
                onChange={setDurationUnit}
                label="Investment Period Unit"
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
          </Box>
        </Box>
      </CalculatorCard>

      {result && (
        <ResultCard
          title={`Advanced SIP Investment Results${
            stepUpRate && parseFloat(stepUpRate) > 0 ? " (with Step-up)" : ""
          }`}
          results={[
            {
              label: "Total Future Value",
              value: formatCurrency(result.totalFutureValue),
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
            {
              label: "Lumpsum Investment",
              value: formatCurrency(result.lumpSumInvestment),
            },
            {
              label: "Lumpsum Future Value",
              value: formatCurrency(result.lumpSumFutureValue),
            },
            {
              label: "SIP Investment",
              value: formatCurrency(result.sipInvestment),
            },
            {
              label: "SIP Future Value",
              value: formatCurrency(result.sipFutureValue),
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
            parseFloat(lumpSumAmount || "0")
          )} as lumpsum and ${formatCurrency(
            parseFloat(monthlyAmount || "0")
          )} monthly${
            stepUpRate && parseFloat(stepUpRate) > 0
              ? ` with ${stepUpRate}% annual increase`
              : ""
          } for ${tenure} ${
            durationUnit === "years" ? "years" : "months"
          } at ${rate}% annual return, your total investment will grow to ${formatCurrency(
            result.totalFutureValue
          )}.`}
        />
      )}

      {result && (
        <>
          <ChartCard
            title="Investment Composition"
            data={getChartData()}
            type="pie"
            dataKey="value"
            colors={["#14213D", "#FCA311", "#00C49F"]}
          />

          <ChartCard
            title="Returns Breakdown"
            data={getBreakdownData()}
            type="pie"
            dataKey="value"
            colors={["#14213D", "#FCA311"]}
          />
        </>
      )}

      {/* Information Box */}
      <Box
        sx={{
          p: 2,
          backgroundColor: "info.light",
          borderRadius: 2,
          border: 1,
          borderColor: "info.main",
          mb: 3,
        }}
      >
        <Box sx={{ mb: 1, fontWeight: 600, color: "#000000" }}>
          About Advanced SIP with Lumpsum:
        </Box>
        <Box sx={{ fontSize: "0.875rem", color: "#000000" }}>
          • Combines the power of lumpsum investment with regular SIP
          contributions
        </Box>
        <Box sx={{ fontSize: "0.875rem", color: "#000000" }}>
          • Lumpsum gets more time to compound, while SIP provides rupee cost
          averaging
        </Box>
        <Box sx={{ fontSize: "0.875rem", color: "#000000" }}>
          • Optional step-up feature allows increasing SIP amount annually
        </Box>
        <Box sx={{ fontSize: "0.875rem", color: "#000000" }}>
          • Ideal for investors with initial capital who want to continue
          investing regularly
        </Box>
      </Box>

      <RelatedCalculators
        currentCalculator="sip"
        onCalculatorSelect={onCalculatorSelect || (() => {})}
      />
    </div>
  );
}
