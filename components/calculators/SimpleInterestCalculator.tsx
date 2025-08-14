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

interface SimpleInterestCalculatorProps {
  onCalculatorSelect?: (calculatorId: string) => void;
}

export default function SimpleInterestCalculator({
  onCalculatorSelect,
}: SimpleInterestCalculatorProps) {
  const [principal, setPrincipal] = useState("");
  const [rate, setRate] = useState("");
  const [tenure, setTenure] = useState("");
  const [durationUnit, setDurationUnit] = useState<"months" | "years">("years");
  const [result, setResult] = useState<any>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!principal || parseFloat(principal) <= 0) {
      newErrors.principal = "Please enter a valid principal amount";
    }
    if (!rate || parseFloat(rate) <= 0 || parseFloat(rate) > 50) {
      newErrors.rate = "Please enter a valid interest rate (0-50%)";
    }

    const maxTenure = durationUnit === "years" ? 50 : 600;
    const tenureLabel = durationUnit === "years" ? "years" : "months";

    if (!tenure || parseFloat(tenure) <= 0 || parseFloat(tenure) > maxTenure) {
      newErrors.tenure = `Please enter a valid time period (1-${maxTenure} ${tenureLabel})`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCalculate = () => {
    if (!validate()) return;

    const principalAmount = parseFloat(principal);
    const interestRate = parseFloat(rate);
    const timePeriod = parseFloat(tenure);

    // Convert time to years for calculation
    const timeInYears =
      durationUnit === "months" ? timePeriod / 12 : timePeriod;

    // Simple Interest Formula: SI = (P × R × T) / 100
    const simpleInterest = (principalAmount * interestRate * timeInYears) / 100;
    const totalAmount = principalAmount + simpleInterest;

    // Generate year-wise data for chart
    const yearlyData = [];
    const years = Math.ceil(timeInYears);

    for (let year = 1; year <= years; year++) {
      const yearlyInterest = (principalAmount * interestRate * year) / 100;
      const yearlyTotal = principalAmount + yearlyInterest;

      yearlyData.push({
        year: `Year ${year}`,
        principal: principalAmount,
        interest: Math.round(yearlyInterest),
        total: Math.round(yearlyTotal),
      });
    }

    // Monthly breakdown if tenure is in months
    const monthlyData = [];
    if (durationUnit === "months") {
      for (let month = 1; month <= timePeriod; month++) {
        const monthlyInterest =
          (principalAmount * interestRate * (month / 12)) / 100;
        const monthlyTotal = principalAmount + monthlyInterest;

        monthlyData.push({
          month: `Month ${month}`,
          interest: Math.round(monthlyInterest),
          total: Math.round(monthlyTotal),
        });
      }
    }

    setResult({
      principalAmount,
      simpleInterest,
      totalAmount,
      interestRate,
      timeInYears,
      yearlyData,
      monthlyData: durationUnit === "months" ? monthlyData : [],
      durationUnit,
    });
  };

  const handleReset = () => {
    setPrincipal("");
    setRate("");
    setTenure("");
    setResult(null);
    setErrors({});
  };

  return (
    <div className="space-y-6">
      <CalculatorCard
        title="Simple Interest Calculator"
        description="Calculate simple interest on investments or loans using the formula SI = (P × R × T) / 100."
        onCalculate={handleCalculate}
        onReset={handleReset}
      >
        <InputField
          label="Principal Amount"
          value={principal}
          onChange={setPrincipal}
          placeholder="Enter principal amount"
          suffix="₹"
          error={errors.principal}
          required
        />

        <InputField
          label="Interest Rate"
          value={rate}
          onChange={setRate}
          placeholder="Enter annual interest rate"
          suffix="% p.a."
          error={errors.rate}
          required
        />

        <Box>
          <DurationToggle
            value={durationUnit}
            onChange={setDurationUnit}
            label="Time Period Unit"
          />
          <InputField
            label="Time Period"
            value={tenure}
            onChange={setTenure}
            placeholder={`Enter time period in ${durationUnit}`}
            suffix={durationUnit}
            error={errors.tenure}
            required
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
            Simple Interest Formula:
          </Box>
          <Box sx={{ fontSize: "0.875rem", color: "text.secondary" }}>
            SI = (Principal × Rate × Time) / 100
          </Box>
          <Box sx={{ fontSize: "0.875rem", color: "text.secondary" }}>
            Total Amount = Principal + Simple Interest
          </Box>
          <Box sx={{ fontSize: "0.875rem", color: "text.secondary", mt: 1 }}>
            Note: Simple interest doesn't compound - interest is calculated only
            on the principal amount.
          </Box>
        </Box>
      </CalculatorCard>

      {result && (
        <>
          <ResultCard
            title="Simple Interest Results"
            results={[
              {
                label: "Total Amount",
                value: formatCurrency(result.totalAmount),
                highlight: true,
              },
              {
                label: "Principal Amount",
                value: formatCurrency(result.principalAmount),
              },
              {
                label: "Simple Interest",
                value: formatCurrency(result.simpleInterest),
                highlight: true,
              },
              {
                label: "Interest Rate",
                value: `${result.interestRate}% p.a.`,
              },
              {
                label: "Time Period",
                value: `${result.timeInYears} years`,
              },
            ]}
            explanation={`Your principal amount of ${formatCurrency(
              result.principalAmount
            )} at ${result.interestRate}% simple interest for ${
              result.timeInYears
            } years will earn ${formatCurrency(
              result.simpleInterest
            )} in interest, making the total amount ${formatCurrency(
              result.totalAmount
            )}.`}
          />

          {result.yearlyData.length > 0 && (
            <ChartCard
              title="Year-wise Growth"
              data={result.yearlyData}
              type="line"
              dataKey="total"
              xAxisKey="year"
              colors={["#1f7a99"]}
            />
          )}

          <ChartCard
            title="Principal vs Interest"
            data={[
              { name: "Principal", value: result.principalAmount },
              { name: "Interest", value: result.simpleInterest },
            ]}
            type="pie"
            dataKey="value"
            colors={["#1f7a99", "#10b981"]}
          />
        </>
      )}

      {onCalculatorSelect && (
        <RelatedCalculators
          currentCalculator="simple-interest"
          onCalculatorSelect={onCalculatorSelect}
        />
      )}
    </div>
  );
}
