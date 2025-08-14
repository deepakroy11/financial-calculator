"use client";

import { useState } from "react";
import {
  Box,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import CalculatorCard from "../ui/CalculatorCard";
import InputField from "../ui/InputField";
import ResultCard from "../ui/ResultCard";
import RelatedCalculators from "../ui/RelatedCalculators";
import { formatCurrency } from "../../lib/calculators";

interface CapitalGainsCalculatorProps {
  onCalculatorSelect?: (calculatorId: string) => void;
}

export default function CapitalGainsCalculator({
  onCalculatorSelect,
}: CapitalGainsCalculatorProps) {
  const [assetType, setAssetType] = useState<"equity" | "property">("equity");
  const [purchasePrice, setPurchasePrice] = useState("");
  const [salePrice, setSalePrice] = useState("");
  const [holdingPeriod, setHoldingPeriod] = useState("");
  const [indexation, setIndexation] = useState("");
  const [result, setResult] = useState<any>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!purchasePrice || parseFloat(purchasePrice) <= 0) {
      newErrors.purchasePrice = "Please enter a valid purchase price";
    }
    if (!salePrice || parseFloat(salePrice) <= 0) {
      newErrors.salePrice = "Please enter a valid sale price";
    }
    if (!holdingPeriod || parseFloat(holdingPeriod) <= 0) {
      newErrors.holdingPeriod = "Please enter a valid holding period";
    }
    if (
      assetType === "property" &&
      (!indexation || parseFloat(indexation) <= 0)
    ) {
      newErrors.indexation = "Please enter indexation factor for property";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCalculate = () => {
    if (!validate()) return;

    const purchase = parseFloat(purchasePrice);
    const sale = parseFloat(salePrice);
    const holding = parseFloat(holdingPeriod);
    const indexFactor = indexation ? parseFloat(indexation) : 1;

    let capitalGain = sale - purchase;
    let taxableGain = capitalGain;
    let taxRate = 0;
    let taxAmount = 0;
    let isLongTerm = false;

    if (assetType === "equity") {
      // Equity: Long term > 1 year, Short term <= 1 year
      isLongTerm = holding > 1;

      if (isLongTerm) {
        // LTCG on equity: 10% above ₹1 lakh
        const exemptionLimit = 100000;
        taxableGain = Math.max(0, capitalGain - exemptionLimit);
        taxRate = 10;
      } else {
        // STCG on equity: 15%
        taxRate = 15;
      }
    } else {
      // Property: Long term > 2 years, Short term <= 2 years
      isLongTerm = holding > 2;

      if (isLongTerm) {
        // LTCG on property: 20% with indexation
        const indexedCost = purchase * indexFactor;
        taxableGain = sale - indexedCost;
        taxRate = 20;
      } else {
        // STCG on property: As per income tax slab
        taxRate = 30; // Assuming highest slab
      }
    }

    taxAmount = (taxableGain * taxRate) / 100;
    const netGain = capitalGain - taxAmount;

    setResult({
      capitalGain,
      taxableGain,
      taxRate,
      taxAmount,
      netGain,
      isLongTerm,
      assetType,
      purchase,
      sale,
      holding,
    });
  };

  const handleReset = () => {
    setPurchasePrice("");
    setSalePrice("");
    setHoldingPeriod("");
    setIndexation("");
    setResult(null);
    setErrors({});
  };

  return (
    <div className="space-y-6">
      <CalculatorCard
        title="Capital Gains Tax Calculator"
        description="Calculate capital gains tax on equity and property investments based on holding period."
        onCalculate={handleCalculate}
        onReset={handleReset}
      >
        <Box>
          <Typography
            variant="body2"
            sx={{ mb: 1, color: "text.secondary", fontWeight: 500 }}
          >
            Asset Type
          </Typography>
          <ToggleButtonGroup
            value={assetType}
            exclusive
            onChange={(_, value) => value && setAssetType(value)}
            size="small"
            sx={{
              "& .MuiToggleButton-root": {
                px: 3,
                py: 1,
                borderRadius: 2,
                textTransform: "none",
                fontWeight: 500,
                "&.Mui-selected": {
                  backgroundColor: "primary.main",
                  color: "primary.contrastText",
                  "&:hover": {
                    backgroundColor: "primary.dark",
                  },
                },
              },
            }}
          >
            <ToggleButton value="equity">Equity/Mutual Funds</ToggleButton>
            <ToggleButton value="property">Property/Real Estate</ToggleButton>
          </ToggleButtonGroup>
        </Box>

        <InputField
          label="Purchase Price"
          value={purchasePrice}
          onChange={setPurchasePrice}
          placeholder="Enter purchase price"
          suffix="₹"
          error={errors.purchasePrice}
          required
        />

        <InputField
          label="Sale Price"
          value={salePrice}
          onChange={setSalePrice}
          placeholder="Enter sale price"
          suffix="₹"
          error={errors.salePrice}
          required
        />

        <InputField
          label="Holding Period"
          value={holdingPeriod}
          onChange={setHoldingPeriod}
          placeholder="Enter holding period"
          suffix="years"
          error={errors.holdingPeriod}
          required
        />

        {assetType === "property" && (
          <InputField
            label="Indexation Factor"
            value={indexation}
            onChange={setIndexation}
            placeholder="Enter indexation factor (e.g., 1.5)"
            error={errors.indexation}
            required
          />
        )}

        <Box
          sx={{
            p: 2,
            backgroundColor: "warning.light",
            borderRadius: 2,
            border: 1,
            borderColor: "warning.main",
          }}
        >
          <Box sx={{ mb: 1, fontWeight: 600, color: "text.primary" }}>
            Tax Rules:
          </Box>
          <Box sx={{ fontSize: "0.875rem", color: "text.secondary" }}>
            • Equity: Long-term (&gt;1 year) - 10% above ₹1L, Short-term - 15%
          </Box>
          <Box sx={{ fontSize: "0.875rem", color: "text.secondary" }}>
            • Property: Long-term (&gt;2 years) - 20% with indexation,
            Short-term - 30%
          </Box>
        </Box>
      </CalculatorCard>

      {result && (
        <>
          <ResultCard
            title="Capital Gains Tax Results"
            results={[
              {
                label: "Capital Gain",
                value: formatCurrency(result.capitalGain),
              },
              {
                label: "Taxable Gain",
                value: formatCurrency(result.taxableGain),
              },
              {
                label: "Tax Rate",
                value: `${result.taxRate}%`,
              },
              {
                label: "Tax Amount",
                value: formatCurrency(result.taxAmount),
                highlight: true,
              },
              {
                label: "Net Gain (After Tax)",
                value: formatCurrency(result.netGain),
                highlight: true,
              },
              {
                label: "Gain Type",
                value: result.isLongTerm ? "Long Term" : "Short Term",
              },
            ]}
            explanation={`Your ${result.assetType} investment held for ${
              result.holding
            } years qualifies as ${
              result.isLongTerm ? "long-term" : "short-term"
            } capital gain. After paying ${formatCurrency(
              result.taxAmount
            )} in taxes at ${
              result.taxRate
            }% rate, your net gain is ${formatCurrency(result.netGain)}.`}
          />
        </>
      )}

      {onCalculatorSelect && (
        <RelatedCalculators
          currentCalculator="capital-gains"
          onCalculatorSelect={onCalculatorSelect}
        />
      )}
    </div>
  );
}
