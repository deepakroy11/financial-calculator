"use client";

import { useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
  Chip,
} from "@mui/material";
import {
  FaCalculator,
  FaChartLine,
  FaUniversity,
  FaPiggyBank,
  FaHome,
  FaCreditCard,
  FaCoins,
  FaChartPie,
} from "react-icons/fa";
import { MdSavings, MdAccountBalance } from "react-icons/md";
import { CalculatorCategory } from "../types/calculator";
import EMICalculator from "../components/calculators/EMICalculator";
import SIPCalculator from "../components/calculators/SIPCalculator";
import FDCalculator from "../components/calculators/FDCalculator";
import RDCalculator from "../components/calculators/RDCalculator";
import TaxCalculator from "../components/calculators/TaxCalculator";
import RetirementCalculator from "../components/calculators/RetirementCalculator";
import CreditCardCalculator from "../components/calculators/CreditCardCalculator";
import SavingsGoalCalculator from "../components/calculators/SavingsGoalCalculator";

const categories: CalculatorCategory[] = [
  {
    id: "loans",
    name: "Loans",
    icon: "FaHome",
    calculators: [
      {
        id: "emi",
        name: "EMI Calculator",
        description: "Calculate loan EMI, interest and total payment",
        icon: "FaCalculator",
        category: "loans",
      },
    ],
  },
  {
    id: "investments",
    name: "Investments",
    icon: "FaChartLine",
    calculators: [
      {
        id: "sip",
        name: "SIP Calculator",
        description: "Calculate SIP returns and wealth creation",
        icon: "FaChartLine",
        category: "investments",
      },
      {
        id: "fd",
        name: "Fixed Deposit",
        description: "Calculate FD maturity amount and interest",
        icon: "FaUniversity",
        category: "investments",
      },
      {
        id: "rd",
        name: "Recurring Deposit",
        description: "Calculate RD maturity and returns",
        icon: "MdAccountBalance",
        category: "investments",
      },
    ],
  },
  {
    id: "taxes",
    name: "Taxes",
    icon: "FaCoins",
    calculators: [
      {
        id: "tax",
        name: "Income Tax Calculator",
        description: "Calculate income tax for old vs new regime",
        icon: "FaCoins",
        category: "taxes",
      },
    ],
  },
  {
    id: "savings",
    name: "Savings & Goals",
    icon: "FaPiggyBank",
    calculators: [
      {
        id: "retirement",
        name: "Retirement Planning",
        description: "Plan your retirement corpus and SIP",
        icon: "FaChartPie",
        category: "savings",
      },
      {
        id: "savings-goal",
        name: "Savings Goal",
        description: "Calculate monthly savings for your goals",
        icon: "MdSavings",
        category: "savings",
      },
      {
        id: "credit-card",
        name: "Credit Card Interest",
        description: "Calculate credit card payoff time and interest",
        icon: "FaCreditCard",
        category: "savings",
      },
    ],
  },
];

const iconMap: { [key: string]: any } = {
  FaCalculator,
  FaChartLine,
  FaUniversity,
  FaPiggyBank,
  FaHome,
  FaCreditCard,
  FaCoins,
  FaChartPie,
  MdSavings,
  MdAccountBalance,
};

export default function Home() {
  const [selectedCalculator, setSelectedCalculator] = useState<string | null>(
    null
  );

  const renderCalculator = () => {
    switch (selectedCalculator) {
      case "emi":
        return <EMICalculator />;
      case "sip":
        return <SIPCalculator />;
      case "fd":
        return <FDCalculator />;
      case "rd":
        return <RDCalculator />;
      case "tax":
        return <TaxCalculator />;
      case "retirement":
        return <RetirementCalculator />;
      case "credit-card":
        return <CreditCardCalculator />;
      case "savings-goal":
        return <SavingsGoalCalculator />;
      default:
        return null;
    }
  };

  if (selectedCalculator) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <Container maxWidth="lg" className="py-8">
          <Box className="mb-8">
            <button
              onClick={() => setSelectedCalculator(null)}
              className="flex items-center px-6 py-3 bg-white/80 backdrop-blur-sm text-blue-600 hover:text-blue-800 font-medium rounded-full shadow-lg border border-white/20 transition-all duration-200 hover:shadow-xl hover:-translate-y-1"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back to Calculators
            </button>
          </Box>
          {renderCalculator()}
        </Container>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Container maxWidth="lg" className="py-12">
        <Box className="text-center mb-16 relative">
          <div className="absolute inset-0 flex items-center justify-center opacity-10">
            <div className="w-96 h-96 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full blur-3xl floating-animation"></div>
          </div>
          <div className="relative z-10">
            <Typography
              variant="h2"
              component="h1"
              className="mb-6 font-bold gradient-text text-5xl md:text-6xl"
            >
              Indian Finance Calculator
            </Typography>
            <Typography
              variant="h5"
              className="text-gray-600 max-w-3xl mx-auto leading-relaxed font-light"
            >
              Comprehensive financial calculators designed for Indian customers.
              Plan your loans, investments, taxes, and savings goals with
              precision and ease.
            </Typography>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <div className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full text-sm font-medium shadow-lg">
                8+ Calculators
              </div>
              <div className="px-4 py-2 bg-gradient-to-r from-green-500 to-teal-600 text-white rounded-full text-sm font-medium shadow-lg">
                Indian Tax Compliant
              </div>
              <div className="px-4 py-2 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-full text-sm font-medium shadow-lg">
                Mobile Optimized
              </div>
            </div>
          </div>
        </Box>

        {categories.map((category, categoryIndex) => (
          <Box key={category.id} className="mb-16">
            <Box className="flex items-center mb-8 justify-center">
              <div className="flex items-center bg-white/80 backdrop-blur-sm rounded-full px-6 py-4 shadow-xl border border-white/20">
                <Box className="mr-4 p-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg">
                  {iconMap[category.icon] &&
                    iconMap[category.icon]({ size: 24 })}
                </Box>
                <Typography
                  variant="h4"
                  component="h2"
                  className="font-bold text-gray-800"
                >
                  {category.name}
                </Typography>
              </div>
            </Box>

            <Grid container spacing={4}>
              {category.calculators.map((calculator, index) => {
                const IconComponent = iconMap[calculator.icon];
                const gradients = [
                  "from-blue-500 to-purple-600",
                  "from-green-500 to-teal-600",
                  "from-orange-500 to-red-600",
                  "from-pink-500 to-rose-600",
                  "from-indigo-500 to-blue-600",
                  "from-purple-500 to-indigo-600",
                  "from-teal-500 to-green-600",
                  "from-red-500 to-pink-600",
                ];
                const gradient = gradients[index % gradients.length];

                return (
                  <Grid item xs={12} sm={6} md={4} key={calculator.id}>
                    <Card
                      className="h-full cursor-pointer card-hover bg-white/80 backdrop-blur-sm border-0 shadow-xl"
                      onClick={() => setSelectedCalculator(calculator.id)}
                      sx={{
                        background: "rgba(255, 255, 255, 0.9)",
                        backdropFilter: "blur(10px)",
                        border: "1px solid rgba(255, 255, 255, 0.2)",
                      }}
                    >
                      <CardContent className="p-6 relative overflow-hidden">
                        <div
                          className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${gradient} opacity-10 rounded-full -mr-10 -mt-10`}
                        ></div>

                        <Box className="flex items-center mb-4">
                          <Box
                            className={`mr-4 p-3 rounded-xl bg-gradient-to-r ${gradient} text-white shadow-lg`}
                          >
                            {IconComponent && <IconComponent size={24} />}
                          </Box>
                          <Typography
                            variant="h6"
                            component="h3"
                            className="font-bold text-gray-800"
                          >
                            {calculator.name}
                          </Typography>
                        </Box>

                        <Typography
                          variant="body2"
                          className="text-gray-600 mb-6 leading-relaxed"
                        >
                          {calculator.description}
                        </Typography>

                        <div className="flex justify-between items-center">
                          <Chip
                            label={category.name}
                            size="small"
                            sx={{
                              background: `linear-gradient(135deg, ${
                                gradient.includes("blue")
                                  ? "#3b82f6, #8b5cf6"
                                  : gradient.includes("green")
                                  ? "#10b981, #14b8a6"
                                  : gradient.includes("orange")
                                  ? "#f97316, #ef4444"
                                  : "#ec4899, #f43f5e"
                              })`,
                              color: "white",
                              fontWeight: 500,
                              border: "none",
                            }}
                          />
                          <div className="text-gray-400">
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                              />
                            </svg>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
          </Box>
        ))}
      </Container>
    </div>
  );
}
