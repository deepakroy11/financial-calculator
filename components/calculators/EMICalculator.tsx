"use client";

import { useState } from "react";
import CalculatorCard from "../ui/CalculatorCard";
import InputField from "../ui/InputField";
import ResultCard from "../ui/ResultCard";
import ChartCard from "../ui/ChartCard";
import RelatedCalculators from "../ui/RelatedCalculators";
import { calculateEMI, formatCurrency } from "../../lib/calculators";

interface EMICalculatorProps {
  onCalculatorSelect?: (calculatorId: string) => void;
}

export default function EMICalculator({
  onCalculatorSelect,
}: EMICalculatorProps) {
  const [principal, setPrincipal] = useState("");
  const [rate, setRate] = useState("");
  const [tenure, setTenure] = useState("");
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
    if (!tenure || parseFloat(tenure) <= 0 || parseFloat(tenure) > 360) {
      newErrors.tenure = "Please enter a valid tenure (1-360 months)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCalculate = () => {
    if (!validate()) return;

    const emiResult = calculateEMI(
      parseFloat(principal),
      parseFloat(rate),
      parseFloat(tenure)
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
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calculator Input - Left Column */}
        <div className="lg:col-span-1">
          <CalculatorCard
            title="EMI Calculator"
            description="Calculate your Equated Monthly Installment (EMI) for home loans, personal loans, car loans, and more."
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
            />
            <InputField
              label="Interest Rate (Annual)"
              value={rate}
              onChange={setRate}
              placeholder="Enter interest rate"
              suffix="%"
              error={errors.rate}
              required
            />
            <InputField
              label="Loan Tenure"
              value={tenure}
              onChange={setTenure}
              placeholder="Enter tenure in months"
              suffix="months"
              error={errors.tenure}
              required
            />
          </CalculatorCard>
        </div>

        {/* Results and Charts - Right Columns */}
        <div className="lg:col-span-2">
          {result && (
            <div className="space-y-6">
              <ResultCard
                title="EMI Calculation Results"
                results={[
                  {
                    label: "Monthly EMI",
                    value: formatCurrency(result.emi),
                    highlight: true,
                  },
                  {
                    label: "Total Interest Payable",
                    value: formatCurrency(result.totalInterest),
                  },
                  {
                    label: "Total Amount Payable",
                    value: formatCurrency(result.totalAmount),
                  },
                ]}
                explanation={`You will pay ${formatCurrency(
                  result.emi
                )} every month for ${tenure} months. The total interest over the loan period will be ${formatCurrency(
                  result.totalInterest
                )}.`}
              />

              {result.yearlyData && (
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                  <ChartCard
                    title="Principal vs Interest Payment Over Time"
                    data={result.yearlyData}
                    type="bar"
                    dataKey="principal"
                    xAxisKey="year"
                  />

                  <ChartCard
                    title="Loan Breakdown"
                    data={[
                      {
                        name: "Principal Amount",
                        value: result.totalAmount - result.totalInterest,
                      },
                      { name: "Total Interest", value: result.totalInterest },
                    ]}
                    type="pie"
                    dataKey="value"
                    colors={["#0088FE", "#FF8042"]}
                  />
                </div>
              )}
            </div>
          )}

          {!result && (
            <div className="flex items-center justify-center h-64 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-300">
              <div className="text-center">
                <div className="text-gray-400 mb-2">
                  <svg
                    className="w-12 h-12 mx-auto"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <p className="text-gray-500 font-medium">
                  Enter loan details to see results
                </p>
                <p className="text-gray-400 text-sm">
                  Fill in the form and click calculate
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Related Calculators - Full Width */}
      {onCalculatorSelect && (
        <div className="mt-8">
          <RelatedCalculators
            currentCalculator="emi"
            onCalculatorSelect={onCalculatorSelect}
          />
        </div>
      )}
    </div>
  );
}
