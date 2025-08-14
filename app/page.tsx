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
  Button,
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
import NSCCalculator from "../components/calculators/NSCCalculator";
import CapitalGainsCalculator from "../components/calculators/CapitalGainsCalculator";
import TDSCalculator from "../components/calculators/TDSCalculator";
import SimpleInterestCalculator from "../components/calculators/SimpleInterestCalculator";
import InflationCalculator from "../components/calculators/InflationCalculator";
import ROICalculator from "../components/calculators/ROICalculator";
import Header from "../components/ui/Header";
import Footer from "../components/ui/Footer";
import PWAInstallPrompt from "../components/ui/PWAInstallPrompt";

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
          <SimpleInterestCalculator
            onCalculatorSelect={setSelectedCalculator}
          />
        );
      case "nsc":
        return <NSCCalculator onCalculatorSelect={setSelectedCalculator} />;
      case "capital-gains":
        return (
          <CapitalGainsCalculator onCalculatorSelect={setSelectedCalculator} />
        );
      case "tds":
        return <TDSCalculator onCalculatorSelect={setSelectedCalculator} />;
      case "inflation":
        return (
          <InflationCalculator onCalculatorSelect={setSelectedCalculator} />
        );
      case "roi":
        return <ROICalculator onCalculatorSelect={setSelectedCalculator} />;
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
      <Box sx={{ minHeight: "100vh", backgroundColor: "background.default" }}>
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

        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Box sx={{ mb: 4 }}>
            <Button
              onClick={() => setSelectedCalculator(null)}
              variant="outlined"
              startIcon={
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
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              }
              sx={{
                px: 3,
                py: 1.5,
                borderRadius: 3,
                fontWeight: 500,
                transition: "all 0.2s ease-in-out",
                "&:hover": {
                  transform: "translateY(-1px)",
                },
              }}
            >
              Back to Calculators
            </Button>
          </Box>
          {renderCalculator()}
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "background.default" }}>
      <Header
        onCategorySelect={(categoryId) => {
          const element = document.getElementById(categoryId);
          element?.scrollIntoView({ behavior: "smooth" });
        }}
        onHomeClick={() => setSelectedCalculator(null)}
      />

      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Box sx={{ textAlign: "center", mb: 8 }}>
          <Typography
            variant="h2"
            component="h1"
            sx={{
              mb: 3,
              fontWeight: 700,
              color: "text.primary",
              fontSize: { xs: "2.5rem", md: "3.5rem" },
            }}
          >
            Financial Calculator Suite
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: "text.secondary",
              maxWidth: "800px",
              mx: "auto",
              lineHeight: 1.6,
              mb: 2,
            }}
          >
            Comprehensive financial calculators designed for Indian customers.
            Plan your loans, investments, taxes, and savings goals with
            precision.
          </Typography>
          <Box
            sx={{
              mt: 4,
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: 2,
            }}
          >
            <Chip
              label="20+ Calculators"
              sx={{
                backgroundColor: "#1f7a99",
                color: "white",
                fontWeight: 500,
                px: 2,
                py: 1,
              }}
            />
            <Chip
              label="Indian Tax Compliant"
              sx={{
                backgroundColor: "#10b981",
                color: "white",
                fontWeight: 500,
                px: 2,
                py: 1,
              }}
            />
            <Chip
              label="Mobile Optimized"
              sx={{
                backgroundColor: "#f59e0b",
                color: "white",
                fontWeight: 500,
                px: 2,
                py: 1,
              }}
            />
          </Box>
        </Box>

        {categories.map((category) => {
          const categoryColors = {
            loans: "#1f7a99",
            investments: "#10b981",
            taxes: "#ef4444",
            savings: "#4a9bb8",
            business: "#f59e0b",
          };
          const categoryColor =
            categoryColors[category.id as keyof typeof categoryColors] ||
            "#1f7a99";

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
                  sx={{
                    fontWeight: 700,
                    color: "text.primary",
                  }}
                >
                  {category.name}
                </Typography>
              </Box>

              <Grid container spacing={4}>
                {category.calculators.map((calculator, index) => {
                  const IconComponent = iconMap[calculator.icon];
                  const colors = [
                    "#1f7a99",
                    "#10b981",
                    "#ef4444",
                    "#4a9bb8",
                    "#f59e0b",
                    "#155a73",
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
      <PWAInstallPrompt />
    </Box>
  );
}
