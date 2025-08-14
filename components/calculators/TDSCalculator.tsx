"use client";

import { useState } from "react";
import { Box, MenuItem, TextField } from "@mui/material";
import CalculatorCard from "../ui/CalculatorCard";
import InputField from "../ui/InputField";
import ResultCard from "../ui/ResultCard";
import RelatedCalculators from "../ui/RelatedCalculators";
import { formatCurrency } from "../../lib/calculators";

interface TDSCalculatorProps {
  onCalculatorSelect?: (calculatorId: string) => void;
}

const tdsRates = {
  salary: { rate: 0, threshold: 0, description: "Salary (As per tax slab)" },
  interest: {
    rate: 10,
    threshold: 40000,
    description: "Interest on Securities",
  },
  dividend: { rate: 10, threshold: 5000, description: "Dividend" },
  rent: { rate: 10, threshold: 240000, description: "Rent" },
  professional: {
    rate: 10,
    threshold: 30000,
    description: "Professional/Technical Services",
  },
  contractor: { rate: 1, threshold: 30000, description: "Contractor" },
  commission: {
    rate: 5,
    threshold: 15000,
    description: "Commission/Brokerage",
  },
  lottery: { rate: 30, threshold: 10000, description: "Lottery/Gambling" },
};

export default function TDSCalculator({
  onCalculatorSelect,
}: TDSCalculatorProps) {
  const [incomeType, setIncomeType] =
    useState<keyof typeof tdsRates>("interest");
  const [amount, setAmount] = useState("");
  const [panAvailable, setPanAvailable] = useState("yes");
  const [result, setResult] = useState<any>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!amount || parseFloat(amount) <= 0) {
      newErrors.amount = "Please enter a valid amount";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCalculate = () => {
    if (!validate()) return;

    const incomeAmount = parseFloat(amount);
    const tdsInfo = tdsRates[incomeType];
    let tdsRate = tdsInfo.rate;
    let tdsAmount = 0;
    let netAmount = incomeAmount;

    // Check if amount exceeds threshold
    if (incomeAmount > tdsInfo.threshold) {
      // If PAN not available, TDS rate is higher (20% or double the normal rate)
      if (panAvailable === "no") {
        tdsRate = incomeType === "lottery" ? 30 : Math.max(20, tdsRate * 2);
      }

      tdsAmount = (incomeAmount * tdsRate) / 100;
      netAmount = incomeAmount - tdsAmount;
    }

    setResult({
      incomeAmount,
      tdsRate,
      tdsAmount,
      netAmount,
      threshold: tdsInfo.threshold,
      incomeType: tdsInfo.description,
      panAvailable: panAvailable === "yes",
      taxable: incomeAmount > tdsInfo.threshold,
    });
  };

  const handleReset = () => {
    setAmount("");
    setResult(null);
    setErrors({});
  };

  return (
    <div className="space-y-6">
      <CalculatorCard
        title="TDS Calculator"
        description="Calculate Tax Deducted at Source (TDS) on various types of income as per Indian tax laws."
        onCalculate={handleCalculate}
        onReset={handleReset}
      >
        <Box>
          <TextField
            fullWidth
            select
            label="Income Type"
            value={incomeType}
            onChange={(e) =>
              setIncomeType(e.target.value as keyof typeof tdsRates)
            }
            variant="outlined"
            sx={{ mb: 2 }}
          >
            {Object.entries(tdsRates).map(([key, value]) => (
              <MenuItem key={key} value={key}>
                {value.description} - {value.rate}% (Threshold: ₹
                {value.threshold.toLocaleString()})
              </MenuItem>
            ))}
          </TextField>
        </Box>

        <InputField
          label="Income Amount"
          value={amount}
          onChange={setAmount}
          placeholder="Enter income amount"
          suffix="₹"
          error={errors.amount}
          required
        />

        <Box>
          <TextField
            fullWidth
            select
            label="PAN Available"
            value={panAvailable}
            onChange={(e) => setPanAvailable(e.target.value)}
            variant="outlined"
          >
            <MenuItem value="yes">Yes - PAN Available</MenuItem>
            <MenuItem value="no">No - PAN Not Available (Higher TDS)</MenuItem>
          </TextField>
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
            Current Selection:
          </Box>
          <Box sx={{ fontSize: "0.875rem", color: "text.secondary" }}>
            • Income Type: {tdsRates[incomeType].description}
          </Box>
          <Box sx={{ fontSize: "0.875rem", color: "text.secondary" }}>
            • TDS Rate: {tdsRates[incomeType].rate}%
          </Box>
          <Box sx={{ fontSize: "0.875rem", color: "text.secondary" }}>
            • Threshold: ₹{tdsRates[incomeType].threshold.toLocaleString()}
          </Box>
          <Box sx={{ fontSize: "0.875rem", color: "text.secondary" }}>
            • TDS applicable only if amount exceeds threshold
          </Box>
        </Box>
      </CalculatorCard>

      {result && (
        <>
          <ResultCard
            title="TDS Calculation Results"
            results={[
              {
                label: "Gross Income",
                value: formatCurrency(result.incomeAmount),
              },
              {
                label: "TDS Rate Applied",
                value: `${result.tdsRate}%`,
              },
              {
                label: "TDS Amount",
                value: formatCurrency(result.tdsAmount),
                highlight: true,
              },
              {
                label: "Net Amount Received",
                value: formatCurrency(result.netAmount),
                highlight: true,
              },
              {
                label: "Threshold Limit",
                value: formatCurrency(result.threshold),
              },
              {
                label: "TDS Applicable",
                value: result.taxable ? "Yes" : "No",
              },
            ]}
            explanation={`${
              result.taxable
                ? `TDS of ${formatCurrency(result.tdsAmount)} (${
                    result.tdsRate
                  }%) will be deducted from your ${result.incomeType.toLowerCase()} income of ${formatCurrency(
                    result.incomeAmount
                  )}. You will receive ${formatCurrency(
                    result.netAmount
                  )} after TDS deduction.`
                : `No TDS is applicable as your ${result.incomeType.toLowerCase()} income of ${formatCurrency(
                    result.incomeAmount
                  )} is below the threshold limit of ${formatCurrency(
                    result.threshold
                  )}.`
            } ${
              !result.panAvailable
                ? "Higher TDS rate applied due to unavailability of PAN."
                : ""
            }`}
          />
        </>
      )}

      {onCalculatorSelect && (
        <RelatedCalculators
          currentCalculator="tds"
          onCalculatorSelect={onCalculatorSelect}
        />
      )}
    </div>
  );
}
