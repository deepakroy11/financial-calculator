"use client";

import { useState } from "react";
import CalculatorCard from "../ui/CalculatorCard";
import InputField from "../ui/InputField";
import ResultCard from "../ui/ResultCard";
import {
  calculateCreditCardInterest,
  formatCurrency,
} from "../../lib/calculators";

export default function CreditCardCalculator() {
  const [outstandingAmount, setOutstandingAmount] = useState("");
  const [minPayment, setMinPayment] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [result, setResult] = useState<any>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!outstandingAmount || parseFloat(outstandingAmount) <= 0) {
      newErrors.outstandingAmount = "Please enter a valid outstanding amount";
    }
    if (!minPayment || parseFloat(minPayment) <= 0) {
      newErrors.minPayment = "Please enter a valid minimum payment amount";
    }
    if (
      !interestRate ||
      parseFloat(interestRate) <= 0 ||
      parseFloat(interestRate) > 50
    ) {
      newErrors.interestRate = "Please enter a valid interest rate (0-50%)";
    }
    if (
      parseFloat(minPayment) <=
      (parseFloat(outstandingAmount) * parseFloat(interestRate)) / (12 * 100)
    ) {
      newErrors.minPayment =
        "Minimum payment should be higher than monthly interest charge";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCalculate = () => {
    if (!validate()) return;

    const ccResult = calculateCreditCardInterest(
      parseFloat(outstandingAmount),
      parseFloat(minPayment),
      parseFloat(interestRate)
    );

    setResult(ccResult);
  };

  const handleReset = () => {
    setOutstandingAmount("");
    setMinPayment("");
    setInterestRate("");
    setResult(null);
    setErrors({});
  };

  return (
    <div>
      <CalculatorCard
        title="Credit Card Interest Calculator"
        description="Calculate how long it will take to pay off your credit card debt and the total interest you'll pay."
        onCalculate={handleCalculate}
        onReset={handleReset}
      >
        <InputField
          label="Outstanding Amount"
          value={outstandingAmount}
          onChange={setOutstandingAmount}
          placeholder="Enter outstanding balance"
          suffix="₹"
          error={errors.outstandingAmount}
          required
        />
        <InputField
          label="Monthly Payment"
          value={minPayment}
          onChange={setMinPayment}
          placeholder="Enter monthly payment amount"
          suffix="₹"
          error={errors.minPayment}
          required
        />
        <InputField
          label="Annual Interest Rate"
          value={interestRate}
          onChange={setInterestRate}
          placeholder="Enter interest rate"
          suffix="%"
          error={errors.interestRate}
          required
        />
      </CalculatorCard>

      {result && (
        <ResultCard
          title="Credit Card Payoff Results"
          results={[
            {
              label: "Time to Pay Off",
              value: `${result.timeToPayoff} months`,
              highlight: true,
            },
            {
              label: "Total Interest Paid",
              value: formatCurrency(result.totalInterest),
            },
            {
              label: "Total Amount Paid",
              value: formatCurrency(result.totalAmount),
            },
          ]}
          explanation={`By paying ${formatCurrency(
            parseFloat(minPayment)
          )} monthly, it will take ${
            result.timeToPayoff
          } months to pay off your debt, and you'll pay ${formatCurrency(
            result.totalInterest
          )} in interest.`}
        />
      )}
    </div>
  );
}
