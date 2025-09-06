"use client";

import { useState } from "react";
import CalculatorCard from "../ui/CalculatorCard";
import InputField from "../ui/InputField";
import ResultCard from "../ui/ResultCard";
import RelatedCalculators from "../ui/RelatedCalculators";
import ChartCard from "../ui/ChartCard";
import DurationToggle from "../ui/DurationToggle";
import { calculateLumpSum, formatCurrency } from "../../lib/calculators";
import { Box } from "@mui/material";

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
    if (!result) return null;

    return {
      labels: ["Principal", "Returns"],
      datasets: [
        {
          data: [result.principal, result.totalReturns],
          backgroundColor: ["#14213D", "#FCA311"],
          borderColor: ["#14213D", "#FCA311"],
          borderWidth: 2,
        },
      ],
    };
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
    <div>
      <CalculatorCard
        title="Lump Sum Calculator"
        description="Calculate the future value of your one-time investment with compound interest over time."
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

      {result && (
        <ResultCard
          title="Lump Sum Investment Results"
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
      )}

      {result && (
        <ChartCard
          title="Investment Breakdown"
          chartData={getChartData()}
          chartType="doughnut"
        />
      )}

      <RelatedCalculators
        calculators={relatedCalculators}
        onCalculatorSelect={onCalculatorSelect}
      />
    </div>
  );
}
