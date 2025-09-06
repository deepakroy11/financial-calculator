"use client";

import { useState } from "react";
import CalculatorCard from "../ui/CalculatorCard";
import InputField from "../ui/InputField";
import ResultCard from "../ui/ResultCard";
import RelatedCalculators from "../ui/RelatedCalculators";
import ChartCard from "../ui/ChartCard";
import DurationToggle from "../ui/DurationToggle";
import { calculateLumpSum, formatCurrency } from "../../lib/calculators";
import { Box, Typography } from "@mui/material";

interface LumpSumCalculatorProps {
  onCalculatorSelect?: (calculatorId: string) => void;
}

export default function LumpSumCalculator({
  onCalculatorSelect,
}: LumpSumCalculatorProps) {
  const [principal, setPrincipal] = useState("");
  const [rate, setRate] = useState("");
  const [tenure, setTenure] = useState("");
  const [durationUnit, setDurationUnit] = useState<"months" | "years">("years");
  const [result, setResult] = useState<any>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!principal || parseFloat(principal) <= 0) {
      newErrors.principal = "Please enter a valid investment amount";
    }
    if (parseFloat(principal) > 10000000) {
      newErrors.principal = "Investment amount should be less than ₹1 crore";
    }

    if (!rate || parseFloat(rate) <= 0 || parseFloat(rate) > 50) {
      newErrors.rate = "Please enter a valid return rate (0-50%)";
    }

    const maxTenure = durationUnit === "years" ? 50 : 600; // 50 years or 600 months
    const tenureLabel = durationUnit === "years" ? "years" : "months";

    if (!tenure || parseFloat(tenure) <= 0 || parseFloat(tenure) > maxTenure) {
      newErrors.tenure = `Please enter a valid tenure (1-${maxTenure} ${tenureLabel})`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCalculate = () => {
    if (!validate()) return;

    // Convert tenure to years for calculation
    const tenureInYears =
      durationUnit === "months" ? parseFloat(tenure) / 12 : parseFloat(tenure);

    const lumpSumResult = calculateLumpSum(
      parseFloat(principal),
      parseFloat(rate),
      tenureInYears
    );

    setResult(lumpSumResult);
  };

  const handleReset = () => {
    setPrincipal("");
    setRate("");
    setTenure("");
    setResult(null);
    setErrors({});
  };

  const getChartData = () => {
    if (!result) return [];

    return [
      {
        name: "Principal",
        value: result.principal,
        color: "#14213D",
      },
      {
        name: "Returns",
        value: result.totalReturns,
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
      id: "fd",
      name: "Fixed Deposit",
      description: "Calculate FD maturity amount",
    },
    {
      id: "compound-interest",
      name: "Compound Interest",
      description: "Calculate compound interest growth",
    },
    {
      id: "ppf",
      name: "PPF Calculator",
      description: "Calculate PPF returns",
    },
  ];

  return (
    <Box sx={{ maxWidth: "1200px", mx: "auto" }}>
      <Typography variant="h4" sx={{ mb: 1, fontWeight: 700, color: "text.primary" }}>
        Lump Sum Calculator
      </Typography>
      <Typography variant="body2" sx={{ mb: 3, color: "text.secondary" }}>
        Calculate the future value of your one-time investment with compound interest over time.
      </Typography>
      
      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", lg: "1fr 1fr" }, gap: 3 }}>
        <CalculatorCard
          title="Investment Details"
          onCalculate={handleCalculate}
          onReset={handleReset}
        >
        <InputField
          label="Investment Amount"
          value={principal}
          onChange={setPrincipal}
          placeholder="Enter lump sum amount"
          suffix="₹"
          error={errors.principal}
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
        </CalculatorCard>
        
        <Box>
          {result ? (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <ResultCard
                title="Investment Results"
                results={[
                  {
                    label: "Future Value",
                    value: formatCurrency(result.futureValue),
                    highlight: true,
                  },
                  {
                    label: "Principal Amount",
                    value: formatCurrency(result.principal),
                  },
                  {
                    label: "Total Returns",
                    value: formatCurrency(result.totalReturns),
                  },
                  {
                    label: "Absolute Return",
                    value: `${result.absoluteReturn}%`,
                  },
                  {
                    label: "CAGR",
                    value: `${result.cagr}%`,
                  },
                ]}
              />
              <ChartCard
                title="Investment Breakdown"
                data={getChartData()}
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
                Enter investment details to see results and breakdown
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
      
      <Box sx={{ mt: 3 }}>
        <RelatedCalculators
          currentCalculator="lump-sum"
          onCalculatorSelect={onCalculatorSelect || (() => {})}
        />
      </Box>
    </Box>
  );
}
