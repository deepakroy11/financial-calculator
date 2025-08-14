"use client";

import { useState } from "react";
import { Box } from "@mui/material";
import CalculatorCard from "../ui/CalculatorCard";
import InputField from "../ui/InputField";
import ResultCard from "../ui/ResultCard";
import ChartCard from "../ui/ChartCard";
import RelatedCalculators from "../ui/RelatedCalculators";
import DurationToggle from "../ui/DurationToggle";
import { formatCurrency } from "../../lib/calculators";

interface ROICalculatorProps {
  onCalculatorSelect?: (calculatorId: string) => void;
}

export default function ROICalculator({
  onCalculatorSelect,
}: ROICalculatorProps) {
  const [initialInvestment, setInitialInvestment] = useState("");
  const [finalValue, setFinalValue] = useState("");
  const [additionalCosts, setAdditionalCosts] = useState("");
  const [timePeriod, setTimePeriod] = useState("");
  const [durationUnit, setDurationUnit] = useState<"months" | "years">("years");
  const [result, setResult] = useState<any>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!initialInvestment || parseFloat(initialInvestment) <= 0) {
      newErrors.initialInvestment = "Please enter a valid initial investment";
    }
    if (!finalValue || parseFloat(finalValue) <= 0) {
      newErrors.finalValue = "Please enter a valid final value";
    }

    const maxPeriod = durationUnit === "years" ? 50 : 600;
    const periodLabel = durationUnit === "years" ? "years" : "months";

    if (
      timePeriod &&
      (parseFloat(timePeriod) <= 0 || parseFloat(timePeriod) > maxPeriod)
    ) {
      newErrors.timePeriod = `Please enter a valid time period (1-${maxPeriod} ${periodLabel})`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCalculate = () => {
    if (!validate()) return;

    const initial = parseFloat(initialInvestment);
    const final = parseFloat(finalValue);
    const costs = additionalCosts ? parseFloat(additionalCosts) : 0;
    const period = timePeriod ? parseFloat(timePeriod) : null;

    // Convert time to years for annualized calculations
    const timeInYears =
      period && durationUnit === "months" ? period / 12 : period;

    // Total investment including additional costs
    const totalInvestment = initial + costs;

    // Net profit/loss
    const netProfit = final - totalInvestment;

    // ROI percentage: ((Final Value - Total Investment) / Total Investment) × 100
    const roiPercentage = (netProfit / totalInvestment) * 100;

    // Annualized ROI if time period is provided
    let annualizedROI = null;
    if (timeInYears && timeInYears > 0) {
      // Annualized ROI: ((Final Value / Initial Investment)^(1/years)) - 1
      annualizedROI =
        (Math.pow(final / totalInvestment, 1 / timeInYears) - 1) * 100;
    }

    // Break-even analysis
    const breakEvenValue = totalInvestment;

    // Generate comparison data for different scenarios
    const scenarioData = [
      {
        scenario: "Current Investment",
        investment: totalInvestment,
        returns: final,
        profit: netProfit,
        roi: roiPercentage,
      },
      {
        scenario: "Break-even",
        investment: totalInvestment,
        returns: breakEvenValue,
        profit: 0,
        roi: 0,
      },
    ];

    // If time period is provided, show year-wise projection
    const yearlyData = [];
    if (timeInYears && timeInYears > 1) {
      const annualGrowthRate =
        Math.pow(final / totalInvestment, 1 / timeInYears) - 1;

      for (let year = 1; year <= Math.ceil(timeInYears); year++) {
        const yearValue =
          totalInvestment * Math.pow(1 + annualGrowthRate, year);
        const yearProfit = yearValue - totalInvestment;
        const yearROI = (yearProfit / totalInvestment) * 100;

        yearlyData.push({
          year: `Year ${year}`,
          value: Math.round(yearValue),
          profit: Math.round(yearProfit),
          roi: yearROI.toFixed(2),
        });
      }
    }

    setResult({
      initialInvestment: initial,
      finalValue: final,
      additionalCosts: costs,
      totalInvestment,
      netProfit,
      roiPercentage,
      annualizedROI,
      breakEvenValue,
      timeInYears,
      scenarioData,
      yearlyData,
      durationUnit,
    });
  };

  const handleReset = () => {
    setInitialInvestment("");
    setFinalValue("");
    setAdditionalCosts("");
    setTimePeriod("");
    setResult(null);
    setErrors({});
  };

  return (
    <div className="space-y-6">
      <CalculatorCard
        title="ROI Calculator"
        description="Calculate Return on Investment (ROI) to measure the efficiency and profitability of your investments."
        onCalculate={handleCalculate}
        onReset={handleReset}
      >
        <InputField
          label="Initial Investment"
          value={initialInvestment}
          onChange={setInitialInvestment}
          placeholder="Enter initial investment amount"
          suffix="₹"
          error={errors.initialInvestment}
          required
        />

        <InputField
          label="Final Value"
          value={finalValue}
          onChange={setFinalValue}
          placeholder="Enter final value or current value"
          suffix="₹"
          error={errors.finalValue}
          required
        />

        <InputField
          label="Additional Costs (Optional)"
          value={additionalCosts}
          onChange={setAdditionalCosts}
          placeholder="Enter additional costs (fees, taxes, etc.)"
          suffix="₹"
        />

        <Box>
          <DurationToggle
            value={durationUnit}
            onChange={setDurationUnit}
            label="Time Period Unit (Optional)"
          />
          <InputField
            label="Investment Period (Optional)"
            value={timePeriod}
            onChange={setTimePeriod}
            placeholder={`Enter investment period in ${durationUnit} (for annualized ROI)`}
            suffix={durationUnit}
            error={errors.timePeriod}
          />
        </Box>

        <Box
          sx={{
            p: 2,
            backgroundColor: "info.light",
            borderRadius: 2,
            border: 1,
            borderColor: "info.main",
          }}
        >
          <Box sx={{ mb: 1, fontWeight: 600, color: "text.primary" }}>
            ROI Formula:
          </Box>
          <Box sx={{ fontSize: "0.875rem", color: "text.secondary" }}>
            ROI = ((Final Value - Total Investment) / Total Investment) × 100
          </Box>
          <Box sx={{ fontSize: "0.875rem", color: "text.secondary" }}>
            Annualized ROI = ((Final Value / Initial Investment)^(1/years)) - 1
          </Box>
          <Box sx={{ fontSize: "0.875rem", color: "text.secondary", mt: 1 }}>
            • Positive ROI indicates profit
          </Box>
          <Box sx={{ fontSize: "0.875rem", color: "text.secondary" }}>
            • Negative ROI indicates loss
          </Box>
        </Box>
      </CalculatorCard>

      {result && (
        <>
          <ResultCard
            title="ROI Analysis Results"
            results={[
              {
                label: "Net Profit/Loss",
                value: formatCurrency(result.netProfit),
                highlight: true,
              },
              {
                label: "ROI Percentage",
                value: `${result.roiPercentage.toFixed(2)}%`,
                highlight: true,
              },
              ...(result.annualizedROI !== null
                ? [
                    {
                      label: "Annualized ROI",
                      value: `${result.annualizedROI.toFixed(2)}% p.a.`,
                      highlight: true,
                    },
                  ]
                : []),
              {
                label: "Total Investment",
                value: formatCurrency(result.totalInvestment),
              },
              {
                label: "Final Value",
                value: formatCurrency(result.finalValue),
              },
              {
                label: "Break-even Value",
                value: formatCurrency(result.breakEvenValue),
              },
              ...(result.timeInYears
                ? [
                    {
                      label: "Investment Period",
                      value: `${result.timeInYears} years`,
                    },
                  ]
                : []),
            ]}
            explanation={`Your investment of ${formatCurrency(
              result.totalInvestment
            )} ${result.netProfit >= 0 ? "generated" : "resulted in"} ${
              result.netProfit >= 0 ? "a profit" : "a loss"
            } of ${formatCurrency(
              Math.abs(result.netProfit)
            )}, giving you an ROI of ${result.roiPercentage.toFixed(2)}%.${
              result.annualizedROI !== null
                ? ` The annualized return is ${result.annualizedROI.toFixed(
                    2
                  )}% per annum over ${result.timeInYears} years.`
                : ""
            }`}
          />

          {result.yearlyData.length > 0 && (
            <ChartCard
              title="Year-wise Investment Growth"
              data={result.yearlyData}
              type="line"
              dataKey="value"
              xAxisKey="year"
              colors={["#1f7a99"]}
            />
          )}

          <ChartCard
            title="Investment Breakdown"
            data={[
              { name: "Initial Investment", value: result.initialInvestment },
              { name: "Additional Costs", value: result.additionalCosts },
              {
                name: result.netProfit >= 0 ? "Profit" : "Loss",
                value: Math.abs(result.netProfit),
              },
            ]}
            type="pie"
            dataKey="value"
            colors={[
              "#1f7a99",
              "#f59e0b",
              result.netProfit >= 0 ? "#10b981" : "#ef4444",
            ]}
          />
        </>
      )}

      {onCalculatorSelect && (
        <RelatedCalculators
          currentCalculator="roi"
          onCalculatorSelect={onCalculatorSelect}
        />
      )}
    </div>
  );
}
