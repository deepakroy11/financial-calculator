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
      className="w-full max-w-3xl mx-auto mt-8 shadow-xl border-0"
      sx={{
        background: "rgba(255, 255, 255, 0.95)",
        backdropFilter: "blur(20px)",
        border: "1px solid rgba(255, 255, 255, 0.2)",
        borderRadius: "20px",
      }}
    >
      <CardContent className="p-6">
        <Typography
          variant="h6"
          component="h3"
          className="mb-4 font-bold text-center bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent"
        >
          Related Calculators
        </Typography>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {relatedCalculators.map((calculator) => {
            const IconComponent = iconMap[calculator.icon];
            return (
              <div
                key={calculator.id}
                onClick={() => onCalculatorSelect(calculator.id)}
                className="flex items-center p-4 rounded-xl bg-gradient-to-r from-gray-50 to-blue-50 hover:from-blue-50 hover:to-indigo-50 cursor-pointer transition-all duration-200 hover:shadow-md border border-gray-100"
              >
                <Box className="mr-3 p-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                  {IconComponent && <IconComponent size={16} />}
                </Box>
                <div className="flex-1">
                  <Typography
                    variant="subtitle2"
                    className="font-semibold text-gray-800"
                  >
                    {calculator.name}
                  </Typography>
                  <Typography variant="caption" className="text-gray-600">
                    {calculator.description}
                  </Typography>
                </div>
                <Chip
                  label="Try"
                  size="small"
                  sx={{
                    background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
                    color: "white",
                    fontWeight: 500,
                    fontSize: "0.7rem",
                  }}
                />
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
