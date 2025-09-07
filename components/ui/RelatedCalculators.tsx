"use client";

import { Card, CardContent, Typography, Chip, Box } from "@mui/material";
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

interface RelatedCalculator {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: string;
}

interface RelatedCalculatorsProps {
  currentCalculator: string;
  onCalculatorSelect: (calculatorId: string) => void;
}

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

const allCalculators: RelatedCalculator[] = [
  {
    id: "emi",
    name: "EMI Calculator",
    description: "Calculate loan EMI",
    icon: "FaCalculator",
    category: "loans",
  },
  {
    id: "home-loan",
    name: "Home Loan",
    description: "Home loan EMI calculator",
    icon: "FaHome",
    category: "loans",
  },
  {
    id: "car-loan",
    name: "Car Loan",
    description: "Auto loan calculator",
    icon: "FaCar",
    category: "loans",
  },
  {
    id: "personal-loan",
    name: "Personal Loan",
    description: "Personal loan EMI",
    icon: "FaUser",
    category: "loans",
  },
  {
    id: "sip",
    name: "SIP Calculator",
    description: "SIP returns calculator",
    icon: "FaChartLine",
    category: "investments",
  },
  {
    id: "fd",
    name: "Fixed Deposit",
    description: "FD maturity calculator",
    icon: "FaUniversity",
    category: "investments",
  },
  {
    id: "rd",
    name: "Recurring Deposit",
    description: "RD returns calculator",
    icon: "MdAccountBalance",
    category: "investments",
  },
  {
    id: "ppf",
    name: "PPF Calculator",
    description: "PPF maturity calculator",
    icon: "FaShieldAlt",
    category: "investments",
  },
  {
    id: "tax",
    name: "Income Tax",
    description: "Tax calculator",
    icon: "FaCoins",
    category: "taxes",
  },
  {
    id: "hra",
    name: "HRA Calculator",
    description: "HRA exemption calculator",
    icon: "FaBuilding",
    category: "taxes",
  },
  {
    id: "retirement",
    name: "Retirement Planning",
    description: "Retirement corpus planning",
    icon: "FaChartPie",
    category: "savings",
  },
  {
    id: "savings-goal",
    name: "Savings Goal",
    description: "Goal-based savings",
    icon: "MdSavings",
    category: "savings",
  },
  {
    id: "credit-card",
    name: "Credit Card Calculator",
    description: "Credit card payoff calculator",
    icon: "FaCreditCard",
    category: "savings",
  },
  {
    id: "compound-interest",
    name: "Compound Interest",
    description: "Compound interest calculator",
    icon: "FaPercentage",
    category: "business",
  },
  {
    id: "simple-interest",
    name: "Simple Interest",
    description: "Simple interest calculator",
    icon: "FaCalculator",
    category: "business",
  },
  {
    id: "nsc",
    name: "NSC Calculator",
    description: "National Savings Certificate",
    icon: "FaCertificate",
    category: "investments",
  },
  {
    id: "capital-gains",
    name: "Capital Gains Tax",
    description: "Capital gains calculator",
    icon: "FaMoneyBillWave",
    category: "taxes",
  },
  {
    id: "tds",
    name: "TDS Calculator",
    description: "Tax deducted at source",
    icon: "FaFileInvoiceDollar",
    category: "taxes",
  },
  {
    id: "inflation",
    name: "Inflation Calculator",
    description: "Inflation impact calculator",
    icon: "FaArrowUp",
    category: "business",
  },
  {
    id: "roi",
    name: "ROI Calculator",
    description: "Return on investment",
    icon: "FaChartBar",
    category: "savings",
  },
  {
    id: "compound-interest",
    name: "Compound Interest",
    description: "Compound interest calculator",
    icon: "FaPercentage",
    category: "business",
  },
];

export default function RelatedCalculators({
  currentCalculator,
  onCalculatorSelect,
}: RelatedCalculatorsProps) {
  const current = allCalculators.find((calc) => calc.id === currentCalculator);
  const relatedCalculators = allCalculators
    .filter(
      (calc) =>
        calc.id !== currentCalculator &&
        (calc.category === current?.category ||
          (current?.category === "loans" &&
            ["savings", "investments"].includes(calc.category)) ||
          (current?.category === "investments" &&
            ["savings", "taxes"].includes(calc.category)) ||
          (current?.category === "taxes" &&
            ["investments", "savings"].includes(calc.category)) ||
          (current?.category === "savings" &&
            ["investments", "loans"].includes(calc.category)))
    )
    .slice(0, 4);

  if (relatedCalculators.length === 0) return null;

  return (
    <Card
      sx={{
        width: "100%",
        mt: 3,
        borderRadius: 4,
        backgroundColor: "background.paper",
        border: 1,
        borderColor: "divider",
        boxShadow: (theme) =>
          theme.palette.mode === "dark"
            ? "0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)"
            : "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Typography
          variant="h6"
          component="h3"
          sx={{
            mb: 2,
            fontWeight: 700,
            color: "text.primary",
          }}
        >
          Related Calculators
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
            gap: 2,
          }}
        >
          {relatedCalculators.map((calculator) => {
            const IconComponent = iconMap[calculator.icon];
            return (
              <Box
                key={calculator.id}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onCalculatorSelect(calculator.id);
                }}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  p: 2,
                  borderRadius: 3,
                  backgroundColor: "action.hover",
                  cursor: "pointer",
                  transition: "all 0.2s ease-in-out",
                  border: 1,
                  borderColor: "divider",
                  "&:hover": {
                    backgroundColor: (theme) =>
                      theme.palette.mode === "dark"
                        ? "rgba(31, 122, 153, 0.1)"
                        : "rgba(31, 122, 153, 0.05)",
                    borderColor: "primary.main",
                    boxShadow: 1,
                  },
                }}
              >
                <Box
                  sx={{
                    mr: 2,
                    p: 1.5,
                    borderRadius: 2,
                    backgroundColor: "primary.main",
                    color: "primary.contrastText",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {IconComponent && <IconComponent size={16} />}
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography
                    variant="subtitle2"
                    sx={{
                      fontWeight: 600,
                      color: "text.primary",
                      mb: 0.5,
                    }}
                  >
                    {calculator.name}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      color: "text.secondary",
                      display: "block",
                    }}
                  >
                    {calculator.description}
                  </Typography>
                </Box>
                <Chip
                  label="Try"
                  size="small"
                  sx={{
                    backgroundColor: "primary.main",
                    color: "primary.contrastText",
                    fontWeight: 500,
                    fontSize: "0.7rem",
                    "&:hover": {
                      backgroundColor: "primary.dark",
                    },
                  }}
                />
              </Box>
            );
          })}
        </Box>
      </CardContent>
    </Card>
  );
}
