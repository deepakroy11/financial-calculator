"use client";

import { useState } from "react";
import CalculatorCard from "../ui/CalculatorCard";
import InputField from "../ui/InputField";
import ResultCard from "../ui/ResultCard";
import ChartCard from "../ui/ChartCard";
import RelatedCalculators from "../ui/RelatedCalculators";
import DurationToggle from "../ui/DurationToggle";
import { calculateEMI, formatCurrency } from "../../lib/calculators";
import { Box, Typography } from "@mui/material";

interface EMICalculatorProps {
  onCalculatorSelect?: (calculatorId: string) => void;
}

export default function EMICalculator({
  onCalculatorSelect,
}: EMICalculatorProps) {
  const [principal, setPrincipal] = useState("");
  const [rate, setRate] = useState("");
  const [tenure, setTenure] = useState("");
  const [durationUnit, setDurationUnit] = useState<"months" | "years">("years");
  const [result, setResult] = useState<any>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!principal || parseFloat(principal) <= 0) {
      newErrors.principal = "Please enter a valid loan amount";
    }
    if (!rate || parseFloat(rate) <= 0 || parseFloat(rate) > 50) {
      newErrors.rate = "Please enter a valid interest rate (0-50%)";
    }
    const maxTenure = durationUnit === "years" ? 30 : 360; // 30 years or 360 months
    const tenureLabel = durationUnit === "years" ? "years" : "months";

    if (!tenure || parseFloat(tenure) <= 0 || parseFloat(tenure) > maxTenure) {
      newErrors.tenure = `Please enter a valid tenure (1-${maxTenure} ${tenureLabel})`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCalculate = () => {
    if (!validate()) return;

    // Convert tenure to months for EMI calculation (EMI library expects months)
    const tenureInMonths =
      durationUnit === "years" ? parseFloat(tenure) * 12 : parseFloat(tenure);

    const emiResult = calculateEMI(
      parseFloat(principal),
      parseFloat(rate),
      tenureInMonths
    );

    // Generate year-wise data for chart
    const yearlyData = [];
    let remainingPrincipal = parseFloat(principal);
    const monthlyEmi = emiResult.emi;
    const monthlyRate = parseFloat(rate) / (12 * 100);

    for (let year = 1; year <= Math.ceil(parseFloat(tenure) / 12); year++) {
      let yearlyInterest = 0;
      let yearlyPrincipal = 0;

      for (
        let month = 1;
        month <= 12 && (year - 1) * 12 + month <= parseFloat(tenure);
        month++
      ) {
        const interestPayment = remainingPrincipal * monthlyRate;
        const principalPayment = monthlyEmi - interestPayment;

        yearlyInterest += interestPayment;
        yearlyPrincipal += principalPayment;
        remainingPrincipal -= principalPayment;
      }

      yearlyData.push({
        year: `Year ${year}`,
        principal: Math.round(yearlyPrincipal),
        interest: Math.round(yearlyInterest),
        balance: Math.round(Math.max(0, remainingPrincipal)),
      });
    }

    setResult({ ...emiResult, yearlyData });
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
      <Typography
        variant="h4"
        sx={{ mb: 1, fontWeight: 700, color: "text.primary" }}
      >
        EMI Calculator
      </Typography>
      <Typography variant="body2" sx={{ mb: 3, color: "text.secondary" }}>
        Calculate your Equated Monthly Installment (EMI) for home loans,
        personal loans, car loans, and more.
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", lg: "1fr 1fr" },
          gap: 3,
        }}
      >
        <CalculatorCard
          title="Loan Details"
          onCalculate={handleCalculate}
          onReset={handleReset}
        >
          <InputField
            label="Loan Amount"
            value={principal}
            onChange={setPrincipal}
            placeholder="Enter loan amount"
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
              label="Loan Tenure"
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
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <ResultCard
                title="EMI Results"
                results={[
                  {
                    label: "Monthly EMI",
                    value: formatCurrency(result.emi),
                    highlight: true,
                  },
                  {
                    label: "Total Interest",
                    value: formatCurrency(result.totalInterest),
                  },
                  {
                    label: "Total Amount",
                    value: formatCurrency(result.totalAmount),
                  },
                ]}
              />
              <ChartCard
                title="Loan Breakdown"
                data={[
                  {
                    name: "Principal",
                    value: result.totalAmount - result.totalInterest,
                  },
                  { name: "Interest", value: result.totalInterest },
                ]}
                type="pie"
                dataKey="value"
                colors={["#14213D", "#FCA311"]}
              />
            </Box>
          ) : (
            <Box
              sx={{
                p: 4,
                textAlign: "center",
                backgroundColor: "background.paper",
                borderRadius: 2,
                border: 1,
                borderColor: "divider",
              }}
            >
              <Typography variant="body2" color="text.secondary">
                Enter loan details to calculate EMI and see breakdown
              </Typography>
            </Box>
          )}
        </Box>
      </Box>

      {onCalculatorSelect && (
        <Box sx={{ mt: 3 }}>
          <RelatedCalculators
            currentCalculator="emi"
            onCalculatorSelect={onCalculatorSelect}
          />
        </Box>
      )}
    </Box>
  );
}
