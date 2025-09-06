"use client";

import { useState } from "react";
import { Box, Typography } from "@mui/material";
import CalculatorCard from "../ui/CalculatorCard";
import InputField from "../ui/InputField";
import ResultCard from "../ui/ResultCard";
import ChartCard from "../ui/ChartCard";
import RelatedCalculators from "../ui/RelatedCalculators";
import DurationToggle from "../ui/DurationToggle";
import { formatCurrency } from "../../lib/calculators";

interface InflationCalculatorProps {
  onCalculatorSelect?: (calculatorId: string) => void;
}

export default function InflationCalculator({
  onCalculatorSelect,
}: InflationCalculatorProps) {
  const [currentAmount, setCurrentAmount] = useState("");
  const [inflationRate, setInflationRate] = useState("6"); // Default India inflation rate
  const [timePeriod, setTimePeriod] = useState("");
  const [durationUnit, setDurationUnit] = useState<"months" | "years">("years");
  const [result, setResult] = useState<any>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!currentAmount || parseFloat(currentAmount) <= 0) {
      newErrors.currentAmount = "Please enter a valid current amount";
    }
    if (
      !inflationRate ||
      parseFloat(inflationRate) <= 0 ||
      parseFloat(inflationRate) > 50
    ) {
      newErrors.inflationRate = "Please enter a valid inflation rate (0-50%)";
    }

    const maxPeriod = durationUnit === "years" ? 50 : 600;
    const periodLabel = durationUnit === "years" ? "years" : "months";

    if (
      !timePeriod ||
      parseFloat(timePeriod) <= 0 ||
      parseFloat(timePeriod) > maxPeriod
    ) {
      newErrors.timePeriod = `Please enter a valid time period (1-${maxPeriod} ${periodLabel})`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCalculate = () => {
    if (!validate()) return;

    const current = parseFloat(currentAmount);
    const inflation = parseFloat(inflationRate) / 100;
    const period = parseFloat(timePeriod);

    // Convert time to years for calculation
    const timeInYears = durationUnit === "months" ? period / 12 : period;

    // Future value considering inflation: FV = PV × (1 + r)^n
    const futureValue = current * Math.pow(1 + inflation, timeInYears);
    const inflationImpact = futureValue - current;
    const purchasingPowerLoss = (inflationImpact / futureValue) * 100;

    // Calculate how much you need to invest to maintain purchasing power
    const requiredAmount = futureValue;

    // Generate year-wise inflation impact data
    const yearlyData = [];
    const years = Math.ceil(timeInYears);

    for (let year = 1; year <= years; year++) {
      const yearlyFutureValue = current * Math.pow(1 + inflation, year);
      const yearlyImpact = yearlyFutureValue - current;

      yearlyData.push({
        year: `Year ${year}`,
        currentValue: current,
        futureValue: Math.round(yearlyFutureValue),
        inflationImpact: Math.round(yearlyImpact),
      });
    }

    // Calculate equivalent purchasing power
    const equivalentPurchasingPower =
      current / Math.pow(1 + inflation, timeInYears);

    setResult({
      currentAmount: current,
      futureValue,
      inflationImpact,
      purchasingPowerLoss,
      requiredAmount,
      equivalentPurchasingPower,
      inflationRate: parseFloat(inflationRate),
      timeInYears,
      yearlyData,
      durationUnit,
    });
  };

  const handleReset = () => {
    setCurrentAmount("");
    setInflationRate("6");
    setTimePeriod("");
    setResult(null);
    setErrors({});
  };

  return (
    <div className="space-y-6">
      <CalculatorCard
        title="Inflation Calculator"
        description="Calculate the impact of inflation on your money's purchasing power over time."
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
          {/* Left Column - Amount Details */}
          <Box>
            <Typography
              variant="h6"
              sx={{ mb: 2, color: "text.primary", fontWeight: 600 }}
            >
              💰 Amount Details
            </Typography>
            <InputField
              label="Current Amount"
              value={currentAmount}
              onChange={setCurrentAmount}
              placeholder="Enter current amount"
              suffix="₹"
              error={errors.currentAmount}
              required
            />
            <InputField
              label="Expected Inflation Rate"
              value={inflationRate}
              onChange={setInflationRate}
              placeholder="Enter annual inflation rate"
              suffix="% p.a."
              error={errors.inflationRate}
              required
            />
          </Box>

          {/* Right Column - Time Period */}
          <Box>
            <Typography
              variant="h6"
              sx={{ mb: 2, color: "text.primary", fontWeight: 600 }}
            >
              ⏰ Time Period
            </Typography>
            <Box>
              <DurationToggle
                value={durationUnit}
                onChange={setDurationUnit}
                label="Time Period Unit"
              />
              <InputField
                label="Time Period"
                value={timePeriod}
                onChange={setTimePeriod}
                placeholder={`Enter time period in ${durationUnit}`}
                suffix={durationUnit}
                error={errors.timePeriod}
                required
              />
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            p: 2,
            backgroundColor: "warning.light",
            borderRadius: 2,
            border: 1,
            borderColor: "warning.main",
          }}
        >
          <Box sx={{ mb: 1, fontWeight: 600, color: "#000000" }}>
            About Inflation:
          </Box>
          <Box sx={{ fontSize: "0.875rem", color: "#000000" }}>
            • India's average inflation rate: ~6% per annum
          </Box>
          <Box sx={{ fontSize: "0.875rem", color: "#000000" }}>
            • Inflation reduces purchasing power over time
          </Box>
          <Box sx={{ fontSize: "0.875rem", color: "#000000" }}>
            • Investments should beat inflation to grow real wealth
          </Box>
        </Box>
      </CalculatorCard>

      {result && (
        <>
          <ResultCard
            title="Inflation Impact Results"
            results={[
              {
                label: "Future Value (Nominal)",
                value: formatCurrency(result.futureValue),
                highlight: true,
              },
              {
                label: "Current Amount",
                value: formatCurrency(result.currentAmount),
              },
              {
                label: "Inflation Impact",
                value: formatCurrency(result.inflationImpact),
                highlight: true,
              },
              {
                label: "Purchasing Power Loss",
                value: `${result.purchasingPowerLoss.toFixed(2)}%`,
              },
              {
                label: "Equivalent Purchasing Power",
                value: formatCurrency(result.equivalentPurchasingPower),
              },
              {
                label: "Required Amount (Real Value)",
                value: formatCurrency(result.requiredAmount),
              },
            ]}
            explanation={`Due to ${
              result.inflationRate
            }% annual inflation over ${
              result.timeInYears
            } years, ${formatCurrency(
              result.currentAmount
            )} today will have the purchasing power of only ${formatCurrency(
              result.equivalentPurchasingPower
            )} in the future. You'll need ${formatCurrency(
              result.requiredAmount
            )} to maintain the same purchasing power.`}
          />

          <ChartCard
            title="Inflation Impact Over Time"
            data={result.yearlyData}
            type="line"
            dataKey="futureValue"
            xAxisKey="year"
            colors={["#ef4444"]}
          />

          <ChartCard
            title="Current vs Future Value"
            data={[
              { name: "Current Value", value: result.currentAmount },
              { name: "Inflation Impact", value: result.inflationImpact },
            ]}
            type="pie"
            dataKey="value"
            colors={["#1f7a99", "#ef4444"]}
          />
        </>
      )}

      {onCalculatorSelect && (
        <RelatedCalculators
          currentCalculator="inflation"
          onCalculatorSelect={onCalculatorSelect}
        />
      )}
    </div>
  );
}
