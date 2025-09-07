"use client";

import { useState, useEffect } from "react";
import {
  Container,
  Typography,
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
import LumpSumCalculator from "../components/calculators/LumpSumCalculator";
import AdvancedSIPCalculator from "../components/calculators/AdvancedSIPCalculator";
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
import MobileBackHandler from "../components/ui/MobileBackHandler";
import DevCacheManager from "../components/DevCacheManager";
import Portfolio from "../components/portfolio/Portfolio";
import { useBackButton } from "../hooks/useBackButton";
import { useCacheManager } from "../hooks/useCacheManager";

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
        id: "lump-sum",
        name: "Lump Sum Calculator",
        description: "Calculate one-time investment returns",
        icon: "FaCoins",
        category: "investments",
      },
      {
        id: "advanced-sip",
        name: "Advanced SIP with Lumpsum",
        description: "Combine lumpsum and SIP investments",
        icon: "FaChartArea",
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
  {
    id: "portfolio",
    name: "Portfolio Management",
    icon: "FaChartPie",
    calculators: [
      {
        id: "portfolio",
        name: "Portfolio Dashboard",
        description: "Track and manage all your financial assets in one place",
        icon: "FaChartPie",
        category: "portfolio",
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

  // Initialize cache manager for development
  useCacheManager();

  // Handle back button navigation
  const handleBackToHome = () => {
    // Clear the calculator selection
    setSelectedCalculator(null);

    // Update URL to home page with programmatic flag
    if (typeof window !== "undefined") {
      window.history.pushState(
        { page: "home", programmatic: true },
        "Financial Calculators",
        "/"
      );
    }
  };

  // Use the back button hook when a calculator is selected
  useBackButton({
    onBack: handleBackToHome,
    enabled: selectedCalculator !== null,
  });

  // Handle URL-based navigation and browser refresh
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Check if there's a calculator in URL params (for future URL routing)
      const urlParams = new URLSearchParams(window.location.search);
      const calculatorFromUrl = urlParams.get("calculator");

      if (calculatorFromUrl && calculatorFromUrl !== selectedCalculator) {
        setSelectedCalculator(calculatorFromUrl);
      }

      // Add history entry to prevent app closing on back button
      if (window.history.length <= 1) {
        window.history.pushState(
          { page: "home" },
          "Financial Calculators",
          "/"
        );
      }
    }
  }, [selectedCalculator]);

  // Update URL when calculator changes (optional - for better UX)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const url = selectedCalculator
        ? `/?calculator=${selectedCalculator}`
        : "/";

      // Only update URL if it's different from current URL
      const currentUrl = window.location.pathname + window.location.search;
      if (currentUrl !== url) {
        // Update URL without triggering page reload
        window.history.replaceState(
          {
            page: selectedCalculator ? "calculator" : "home",
            calculator: selectedCalculator,
            programmatic: true,
          },
          selectedCalculator
            ? `${selectedCalculator} Calculator`
            : "Financial Calculators",
          url
        );
      }
    }
  }, [selectedCalculator]);

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
      case "lump-sum":
        return <LumpSumCalculator onCalculatorSelect={setSelectedCalculator} />;
      case "advanced-sip":
        return (
          <AdvancedSIPCalculator onCalculatorSelect={setSelectedCalculator} />
        );
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
      case "portfolio":
        return (
          <Portfolio
            onNavigateToCalculators={() => setSelectedCalculator(null)}
            onNavigateHome={() => setSelectedCalculator(null)}
          />
        );
      case "portfolio-test":
        return <Portfolio />;
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
      <Box
        sx={{
          minHeight: "100vh",
          backgroundColor: "background.default",
        }}
      >
        <Header
          onCategorySelect={(categoryId) => {
            if (categoryId === "portfolio") {
              setSelectedCalculator("portfolio");
            } else {
              setSelectedCalculator(null);
              setTimeout(() => {
                const element = document.getElementById(categoryId);
                element?.scrollIntoView({ behavior: "smooth" });
              }, 100);
            }
          }}
          onHomeClick={() => setSelectedCalculator(null)}
        />

        <Container maxWidth="lg" sx={{ py: { xs: 1, sm: 3 } }}>
          <Box
            sx={{
              mb: { xs: 1, sm: 3 },
              display: { xs: "none", sm: "flex" },
              alignItems: "center",
              gap: 2,
            }}
          >
            <Button
              onClick={handleBackToHome}
              variant="outlined"
              startIcon={
                <svg
                  className="w-4 h-4"
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
                "&:hover": {
                  boxShadow:
                    "0 0 0 2px rgba(252, 163, 17, 0.2), 0 0 20px rgba(252, 163, 17, 0.3), 0 4px 12px rgba(252, 163, 17, 0.3)",
                },
              }}
            >
              Back to Home
            </Button>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Typography variant="body2" color="text.secondary">
                Home
              </Typography>
              <Typography variant="body2" color="text.secondary">
                /
              </Typography>
              <Typography variant="body2" color="primary.main" fontWeight={500}>
                {selectedCalculator
                  ?.replace("-", " ")
                  .replace(/\b\w/g, (l) => l.toUpperCase())}{" "}
                Calculator
              </Typography>
            </Box>
          </Box>
          {renderCalculator()}
        </Container>

        {/* Mobile Back Button */}
        <MobileBackHandler
          onBack={handleBackToHome}
          show={selectedCalculator !== null}
        />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "background.default",
      }}
    >
      <Header
        onCategorySelect={(categoryId) => {
          if (categoryId === "portfolio") {
            setSelectedCalculator("portfolio");
          } else {
            const element = document.getElementById(categoryId);
            element?.scrollIntoView({ behavior: "smooth" });
          }
        }}
        onHomeClick={() => setSelectedCalculator(null)}
      />

      <Container
        maxWidth="xl"
        sx={{ py: { xs: 2, sm: 3 }, px: { xs: 2, sm: 3 } }}
      >
        <Box sx={{ textAlign: "center", mb: { xs: 3, sm: 4 } }}>
          <Typography
            variant="h2"
            component="h1"
            sx={{
              mb: { xs: 2, sm: 3 },
              fontWeight: 800,
              color: "text.primary",
              fontSize: { xs: "1.75rem", sm: "2.25rem", md: "2.5rem" },
              letterSpacing: "-0.025em",
              lineHeight: 1.1,
            }}
          >
            Professional Financial
            <Box
              component="span"
              sx={{ color: "primary.main", display: "block" }}
            >
              Calculator Suite
            </Box>
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: "text.secondary",
              maxWidth: "700px",
              mx: "auto",
              lineHeight: 1.6,
              mb: { xs: 2, sm: 3 },
              fontSize: { xs: "0.95rem", sm: "1.1rem", md: "1.2rem" },
              fontWeight: 400,
            }}
          >
            Comprehensive financial calculators designed specifically for Indian
            customers. Plan your loans, investments, taxes, and savings goals
            with precision and confidence.
          </Typography>
          <Box
            sx={{
              mt: { xs: 2, sm: 3 },
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: { xs: 1, sm: 2 },
            }}
          >
            <Chip
              label="20+ Professional Calculators"
              sx={{
                backgroundColor: "primary.main",
                color: "white",
                fontWeight: 600,
                px: { xs: 2, sm: 3 },
                py: { xs: 1, sm: 1.5 },
                fontSize: { xs: "0.75rem", sm: "0.875rem" },
                borderRadius: 3,
              }}
            />
            <Chip
              label="Indian Tax Compliant 2024-25"
              sx={{
                backgroundColor: "primary.main",
                color: "#ffffff",
                fontWeight: 600,
                px: { xs: 2, sm: 3 },
                py: { xs: 1, sm: 1.5 },
                fontSize: { xs: "0.75rem", sm: "0.875rem" },
                borderRadius: 3,
              }}
            />
            <Chip
              label="Mobile & Desktop Optimized"
              sx={{
                backgroundColor: "primary.main",
                color: "white",
                fontWeight: 600,
                px: { xs: 2, sm: 3 },
                py: { xs: 1, sm: 1.5 },
                fontSize: { xs: "0.75rem", sm: "0.875rem" },
                borderRadius: 3,
              }}
            />
          </Box>
        </Box>

        {categories.map((category) => {
          const categoryColors = {
            loans: "#FCA311",
            investments: "#FCA311",
            taxes: "#14213D",
            savings: "#FCA311",
            business: "#14213D",
          };
          const categoryColor =
            categoryColors[category.id as keyof typeof categoryColors] ||
            "#FCA311";

          return (
            <Box
              key={category.id}
              sx={{ mb: { xs: 4, sm: 5 } }}
              id={category.id}
            >
              <Box className="flex items-center" sx={{ mb: { xs: 2, sm: 3 } }}>
                <Box
                  className="text-white"
                  sx={{
                    mr: { xs: 2, sm: 3 },
                    p: { xs: 2, sm: 2.5 },
                    borderRadius: 2,
                    backgroundColor: categoryColor,
                    background: `linear-gradient(135deg, ${categoryColor} 0%, ${categoryColor}dd 100%)`,
                    boxShadow: `0 8px 32px ${categoryColor}40`,
                  }}
                >
                  {iconMap[category.icon] &&
                    iconMap[category.icon]({ size: 28 })}
                </Box>
                <Typography
                  variant="h4"
                  component="h2"
                  sx={{
                    fontWeight: 700,
                    color: "text.primary",
                    fontSize: { xs: "1.25rem", sm: "1.4rem", md: "1.5rem" },
                    letterSpacing: "-0.025em",
                  }}
                >
                  {category.name}
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "1fr",
                    sm: "repeat(2, 1fr)",
                    md: "repeat(3, 1fr)",
                    lg: "repeat(4, 1fr)",
                  },
                  gap: { xs: 2, sm: 2.5 },
                }}
              >
                {category.calculators.map((calculator, index) => {
                  const IconComponent = iconMap[calculator.icon];
                  const colors = [
                    "#FCA311",
                    "#14213D",
                    "#FCA311",
                    "#14213D",
                    "#FCA311",
                    "#000000",
                  ];
                  const color = colors[index % colors.length];

                  return (
                    <Box key={calculator.id}>
                      <Card
                        className="h-full cursor-pointer"
                        onClick={() => setSelectedCalculator(calculator.id)}
                        sx={{
                          minHeight: { xs: "120px", sm: "140px" },
                          borderRadius: 3,
                          border: `2px solid ${color}20`,
                          background: `linear-gradient(135deg, ${color}05 0%, ${color}02 100%)`,
                          "&:hover": {
                            transform: "translateY(-4px)",
                            boxShadow: `0 8px 25px ${color}30`,
                            border: `2px solid ${color}40`,
                          },
                        }}
                      >
                        <CardContent
                          sx={{
                            p: { xs: 2, sm: 2.5 },
                            height: "100%",
                            display: "flex",
                            flexDirection: "column",
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              mb: 2,
                            }}
                          >
                            <Box
                              sx={{
                                width: 40,
                                height: 40,
                                borderRadius: 2,
                                background: `linear-gradient(135deg, ${color} 0%, ${color}dd 100%)`,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                mr: 2,
                              }}
                            >
                              {IconComponent && (
                                <IconComponent size={20} color="white" />
                              )}
                            </Box>
                            <Typography
                              variant="h6"
                              sx={{
                                fontWeight: 700,
                                color: "text.primary",
                                fontSize: { xs: "0.9rem", sm: "1rem" },
                                lineHeight: 1.2,
                              }}
                            >
                              {calculator.name}
                            </Typography>
                          </Box>

                          <Typography
                            variant="body2"
                            sx={{
                              color: "text.secondary",
                              fontSize: { xs: "0.8rem", sm: "0.85rem" },
                              lineHeight: 1.4,
                              flexGrow: 1,
                              mb: 2,
                            }}
                          >
                            {calculator.description}
                          </Typography>

                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}
                          >
                            <Box sx={{ display: "flex", gap: 1 }}>
                              <Chip
                                label={category.name.split(" ")[0]}
                                size="small"
                                sx={{
                                  backgroundColor: `${categoryColor}20`,
                                  color: categoryColor,
                                  fontWeight: 600,
                                  fontSize: "0.65rem",
                                  border: `1px solid ${categoryColor}40`,
                                }}
                              />
                              <Chip
                                label="Try Now"
                                size="small"
                                sx={{
                                  backgroundColor: color,
                                  color: "white",
                                  fontWeight: 600,
                                  fontSize: "0.65rem",
                                  "&:hover": { backgroundColor: `${color}dd` },
                                }}
                              />
                            </Box>
                            <Box sx={{ color: color, opacity: 0.8 }}>
                              <svg
                                width="16"
                                height="16"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
                              </svg>
                            </Box>
                          </Box>
                        </CardContent>
                      </Card>
                    </Box>
                  );
                })}
              </Box>
            </Box>
          );
        })}
      </Container>
      <Footer />
      <PWAInstallPrompt />
      <DevCacheManager />
    </Box>
  );
}
