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
  FaCar,
  FaUser,
  FaShieldAlt,
  FaCertificate,
  FaChartArea,
  FaBuilding,
  FaMoneyBillWave,
  FaFileInvoiceDollar,
  FaFirstAid,
  FaBriefcase,
  FaPercentage,
  FaArrowUp,
  FaChartBar,
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
import PPFCalculator from "../components/calculators/PPFCalculator";
import HRACalculator from "../components/calculators/HRACalculator";
import CompoundInterestCalculator from "../components/calculators/CompoundInterestCalculator";
import Header from "../components/ui/Header";
import Footer from "../components/ui/Footer";

const categories: CalculatorCategory[] = [
  {
    id: "loans",
    name: "Loans & Mortgages",
    icon: "FaHome",
    calculators: [
      {
        id: "emi",
        name: "EMI Calculator",
        description: "Calculate loan EMI, interest and total payment",
        icon: "FaCalculator",
        category: "loans",
      },
      {
        id: "home-loan",
        name: "Home Loan Calculator",
        description: "Calculate home loan EMI with prepayment options",
        icon: "FaHome",
        category: "loans",
      },
      {
        id: "car-loan",
        name: "Car Loan Calculator",
        description: "Calculate auto loan EMI and total cost",
        icon: "FaCar",
        category: "loans",
      },
      {
        id: "personal-loan",
        name: "Personal Loan Calculator",
        description: "Calculate personal loan EMI and eligibility",
        icon: "FaUser",
        category: "loans",
      },
    ],
  },
  {
    id: "investments",
    name: "Investments & Returns",
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
      {
        id: "ppf",
        name: "PPF Calculator",
        description: "Calculate Public Provident Fund returns",
        icon: "FaShieldAlt",
        category: "investments",
      },
      {
        id: "nsc",
        name: "NSC Calculator",
        description: "Calculate National Savings Certificate returns",
        icon: "FaCertificate",
        category: "investments",
      },
      {
        id: "mutual-fund",
        name: "Mutual Fund Calculator",
        description: "Calculate mutual fund returns and growth",
        icon: "FaChartArea",
        category: "investments",
      },
    ],
  },
  {
    id: "taxes",
    name: "Tax Planning",
    icon: "FaCoins",
    calculators: [
      {
        id: "tax",
        name: "Income Tax Calculator",
        description: "Calculate income tax for old vs new regime",
        icon: "FaCoins",
        category: "taxes",
      },
      {
        id: "hra",
        name: "HRA Calculator",
        description: "Calculate House Rent Allowance exemption",
        icon: "FaBuilding",
        category: "taxes",
      },
      {
        id: "capital-gains",
        name: "Capital Gains Tax",
        description: "Calculate capital gains tax on investments",
        icon: "FaMoneyBillWave",
        category: "taxes",
      },
      {
        id: "tds",
        name: "TDS Calculator",
        description: "Calculate Tax Deducted at Source",
        icon: "FaFileInvoiceDollar",
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
      {
        id: "emergency-fund",
        name: "Emergency Fund Calculator",
        description: "Calculate ideal emergency fund corpus",
        icon: "FaFirstAid",
        category: "savings",
      },
    ],
  },
  {
    id: "business",
    name: "Business & Investment",
    icon: "FaBriefcase",
    calculators: [
      {
        id: "compound-interest",
        name: "Compound Interest",
        description: "Calculate compound interest growth",
        icon: "FaPercentage",
        category: "business",
      },
      {
        id: "simple-interest",
        name: "Simple Interest",
        description: "Calculate simple interest on investments",
        icon: "FaCalculator",
        category: "business",
      },
      {
        id: "inflation",
        name: "Inflation Calculator",
        description: "Calculate impact of inflation on money",
        icon: "FaArrowUp",
        category: "business",
      },
      {
        id: "roi",
        name: "ROI Calculator",
        description: "Calculate Return on Investment",
        icon: "FaChartBar",
        category: "business",
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
  FaCar,
  FaUser,
  FaShieldAlt,
  FaCertificate,
  FaChartArea,
  FaBuilding,
  FaMoneyBillWave,
  FaFileInvoiceDollar,
  FaFirstAid,
  FaBriefcase,
  FaPercentage,
  FaArrowUp,
  FaChartBar,
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
      case "home-loan":
      case "car-loan":
      case "personal-loan":
        return <EMICalculator onCalculatorSelect={setSelectedCalculator} />;
      case "sip":
      case "mutual-fund":
        return <SIPCalculator onCalculatorSelect={setSelectedCalculator} />;
      case "fd":
        return <FDCalculator onCalculatorSelect={setSelectedCalculator} />;
      case "rd":
        return <RDCalculator onCalculatorSelect={setSelectedCalculator} />;
      case "ppf":
        return <PPFCalculator onCalculatorSelect={setSelectedCalculator} />;
      case "tax":
        return <TaxCalculator onCalculatorSelect={setSelectedCalculator} />;
      case "hra":
        return <HRACalculator onCalculatorSelect={setSelectedCalculator} />;
      case "retirement":
        return (
          <RetirementCalculator onCalculatorSelect={setSelectedCalculator} />
        );
      case "credit-card":
        return (
          <CreditCardCalculator onCalculatorSelect={setSelectedCalculator} />
        );
      case "savings-goal":
      case "emergency-fund":
        return (
          <SavingsGoalCalculator onCalculatorSelect={setSelectedCalculator} />
        );
      case "compound-interest":
        return (
          <CompoundInterestCalculator
            onCalculatorSelect={setSelectedCalculator}
          />
        );
      case "simple-interest":
        return (
          <CompoundInterestCalculator
            onCalculatorSelect={setSelectedCalculator}
          />
        );
      default:
        return (
          <div className="text-center py-12">
            <Typography variant="h5" className="text-gray-600 mb-4">
              Calculator Coming Soon!
            </Typography>
            <Typography variant="body1" className="text-gray-500">
              This calculator is under development and will be available soon.
            </Typography>
          </div>
        );
    }
  };

  if (selectedCalculator) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header
          onCategorySelect={(categoryId) => {
            setSelectedCalculator(null);
            setTimeout(() => {
              const element = document.getElementById(categoryId);
              element?.scrollIntoView({ behavior: "smooth" });
            }, 100);
          }}
          onHomeClick={() => setSelectedCalculator(null)}
        />

        <Container maxWidth="lg" className="py-8">
          <Box className="mb-8">
            <button
              onClick={() => setSelectedCalculator(null)}
              className="flex items-center px-6 py-3 bg-white text-blue-600 hover:text-blue-800 font-medium rounded-xl shadow-sm border border-gray-200 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
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
    <div className="min-h-screen bg-gray-50">
      <Header
        onCategorySelect={(categoryId) => {
          const element = document.getElementById(categoryId);
          element?.scrollIntoView({ behavior: "smooth" });
        }}
        onHomeClick={() => setSelectedCalculator(null)}
      />

      <Container maxWidth="lg" className="py-12">
        <Box className="text-center mb-16">
          <Typography
            variant="h2"
            component="h1"
            className="mb-6 font-bold text-gray-800 text-4xl md:text-5xl"
          >
            Financial Calculator Suite
          </Typography>
          <Typography
            variant="h6"
            className="text-gray-600 max-w-6xl mx-auto leading-relaxed"
          >
            Comprehensive financial calculators designed for Indian customers.
            Plan your loans, investments, taxes, and savings goals with
            precision.
          </Typography>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <div className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium shadow-sm">
              20+ Calculators
            </div>
            <div className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium shadow-sm">
              Indian Tax Compliant
            </div>
            <div className="px-4 py-2 bg-orange-600 text-white rounded-lg text-sm font-medium shadow-sm">
              Mobile Optimized
            </div>
          </div>
        </Box>

        {categories.map((category) => {
          const categoryColors = {
            loans: "#2563eb",
            investments: "#059669",
            taxes: "#dc2626",
            savings: "#7c3aed",
            business: "#ea580c",
          };
          const categoryColor =
            categoryColors[category.id as keyof typeof categoryColors] ||
            "#2563eb";

          return (
            <Box key={category.id} className="mb-16" id={category.id}>
              <Box className="flex items-center mb-8">
                <Box
                  className="mr-4 p-3 rounded-xl text-white shadow-sm"
                  sx={{ backgroundColor: categoryColor }}
                >
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
              </Box>

              <Grid container spacing={4}>
                {category.calculators.map((calculator, index) => {
                  const IconComponent = iconMap[calculator.icon];
                  const colors = [
                    "#2563eb",
                    "#059669",
                    "#dc2626",
                    "#7c3aed",
                    "#ea580c",
                    "#0891b2",
                  ];
                  const color = colors[index % colors.length];

                  return (
                    <Grid item xs={12} sm={6} lg={3} key={calculator.id}>
                      <Card
                        className="h-full cursor-pointer calculator-card"
                        onClick={() => setSelectedCalculator(calculator.id)}
                        sx={{
                          minHeight: "200px",
                        }}
                      >
                        <CardContent className="p-6 h-full flex flex-col">
                          <Box className="flex items-center mb-4">
                            <Box
                              className="mr-3 p-3 rounded-xl text-white shadow-sm"
                              sx={{ backgroundColor: color }}
                            >
                              {IconComponent && <IconComponent size={20} />}
                            </Box>
                            <Typography
                              variant="h6"
                              component="h3"
                              className="font-bold text-gray-800 leading-tight"
                            >
                              {calculator.name}
                            </Typography>
                          </Box>

                          <Typography
                            variant="body2"
                            className="text-gray-600 mb-6 leading-relaxed flex-grow"
                          >
                            {calculator.description}
                          </Typography>

                          <div className="flex justify-between items-center mt-auto">
                            <Chip
                              label={category.name.split(" ")[0]}
                              size="small"
                              sx={{
                                backgroundColor: `${categoryColor}20`,
                                color: categoryColor,
                                fontWeight: 500,
                                border: `1px solid ${categoryColor}30`,
                                fontSize: "0.75rem",
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
          );
        })}
      </Container>
      <Footer />
    </div>
  );
}
