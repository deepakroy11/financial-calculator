"use client";

import { useState } from "react";
import CalculatorCard from "../ui/CalculatorCard";
import InputField from "../ui/InputField";
import ResultCard from "../ui/ResultCard";
import ChartCard from "../ui/ChartCard";
import RelatedCalculators from "../ui/RelatedCalculators";
import { calculateSIP, formatCurrency } from "../../lib/calculators";

interface SIPCalculatorProps {
  onCalculatorSelect?: (calculatorId: string) => void;
}

export default function SIPCalculator({
  onCalculatorSelect,
}: SIPCalculatorProps) {
  const [monthlyAmount, setMonthlyAmount] = useState("");
  const [rate, setRate] = useState("");
  const [tenure, setTenure] = useState("");
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
    if (!tenure || parseFloat(tenure) <= 0 || parseFloat(tenure) > 50) {
      newErrors.tenure = "Please enter a valid investment period (1-50 years)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCalculate = () => {
    if (!validate()) return;

    const sipResult = calculateSIP(
      parseFloat(monthlyAmount),
      parseFloat(rate),
      parseFloat(tenure)
    );

    // Generate year-wise growth data for chart
    const yearlyData = [];
    const monthlyRate = parseFloat(rate) / (12 * 100);
    const monthlyInvestment = parseFloat(monthlyAmount);

    for (let year = 1; year <= parseFloat(tenure); year++) {
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
        />
        <InputField
          label="Expected Annual Return"
          value={rate}
          onChange={setRate}
          placeholder="Enter expected return rate"
          suffix="%"
          error={errors.rate}
          required
        />
        <InputField
          label="Investment Period"
          value={tenure}
          onChange={setTenure}
          placeholder="Enter investment period"
          suffix="years"
          error={errors.tenure}
          required
        />
      </CalculatorCard>

      {result && (
        <ResultCard
          title="SIP Investment Results"
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
          explanation={`By investing ${formatCurrency(
            parseFloat(monthlyAmount)
          )} monthly for ${tenure} years at ${rate}% annual return, your investment will grow to ${formatCurrency(
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

      {onCalculatorSelect && (
        <RelatedCalculators
          currentCalculator="sip"
          onCalculatorSelect={onCalculatorSelect}
        />
      )}
    </div>
  );
}
