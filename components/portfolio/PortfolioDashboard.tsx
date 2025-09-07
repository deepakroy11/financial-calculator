"use client";

import { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Alert,
  LinearProgress,
} from "@mui/material";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import {
  FaPlus,
  FaChartPie,
  FaMoneyBillWave,
  FaShieldAlt,
  FaCreditCard,
  FaFilter,
  FaDownload,
  FaEye,
  FaEdit,
  FaTrash,
} from "react-icons/fa";
import DeleteConfirmationModal from "../ui/DeleteConfirmationModal";
import { MdMoreVert, MdTrendingUp, MdTrendingDown } from "react-icons/md";
import { Portfolio } from "../../types/portfolio";
import { PortfolioService } from "../../lib/portfolio-service";

interface PortfolioDashboardProps {
  onAddAsset: (category: "investments" | "insurance" | "loans") => void;
  onEditAsset: (
    category: "investments" | "insurance" | "loans",
    id: string
  ) => void;
}

const COLORS = {
  investments: ["#FCA311", "#14213D", "#E5E5E5", "#000000", "#F77F00"],
  insurance: ["#2E8B57", "#4682B4", "#DAA520", "#CD853F"],
  loans: ["#DC143C", "#B22222", "#8B0000", "#FF6347"],
};

export default function PortfolioDashboard({
  onAddAsset,
  onEditAsset,
}: PortfolioDashboardProps) {
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
  const [loading, setLoading] = useState(true);
  const [filterAnchor, setFilterAnchor] = useState<null | HTMLElement>(null);
  const [selectedCategory, setSelectedCategory] = useState<
    "all" | "investments" | "insurance" | "loans"
  >("all");
  const [deleteModal, setDeleteModal] = useState<{
    open: boolean;
    category: "investments" | "insurance" | "loans" | null;
    id: string;
    name: string;
  }>({
    open: false,
    category: null,
    id: "",
    name: "",
  });

  useEffect(() => {
    loadPortfolio();
  }, []);

  const loadPortfolio = () => {
    setLoading(true);
    try {
      let portfolioData = PortfolioService.getPortfolio();

      // If no portfolio exists, create sample data for demo
      if (!portfolioData) {
        portfolioData = PortfolioService.getSamplePortfolio();
        PortfolioService.savePortfolio(portfolioData);
      }

      setPortfolio(portfolioData);
    } catch (error) {
      console.error("Error loading portfolio:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    if (num >= 10000000) return `₹${(num / 10000000).toFixed(1)}Cr`;
    if (num >= 100000) return `₹${(num / 100000).toFixed(1)}L`;
    if (num >= 1000) return `₹${(num / 1000).toFixed(1)}K`;
    return `₹${num.toFixed(0)}`;
  };

  const getInvestmentChartData = () => {
    if (!portfolio) return [];

    const { breakdown } = portfolio;
    return [
      {
        name: "Mutual Funds",
        value: breakdown.investments.mutualFunds,
        color: COLORS.investments[0],
      },
      {
        name: "Fixed Deposits",
        value: breakdown.investments.fixedDeposits,
        color: COLORS.investments[1],
      },
      {
        name: "Stocks",
        value: breakdown.investments.stocks,
        color: COLORS.investments[2],
      },
      {
        name: "PPF",
        value: breakdown.investments.ppf,
        color: COLORS.investments[3],
      },
      {
        name: "Others",
        value: breakdown.investments.nps + breakdown.investments.others,
        color: COLORS.investments[4],
      },
    ].filter((item) => item.value > 0);
  };

  const getOverviewChartData = () => {
    if (!portfolio) return [];

    return [
      {
        category: "Investments",
        amount: portfolio.summary.totalInvestments,
        color: "#FCA311",
      },
      {
        category: "Insurance",
        amount: portfolio.summary.totalInsurance / 100, // Scale down for better visualization
        color: "#2E8B57",
      },
      {
        category: "Loans",
        amount: portfolio.summary.totalLoans,
        color: "#DC143C",
      },
    ];
  };

  const handleDeleteAsset = (
    category: "investments" | "insurance" | "loans",
    id: string,
    name: string
  ) => {
    setDeleteModal({
      open: true,
      category,
      id,
      name,
    });
  };

  const confirmDelete = () => {
    if (!deleteModal.category || !deleteModal.id) return;

    try {
      switch (deleteModal.category) {
        case "investments":
          PortfolioService.deleteInvestment(deleteModal.id);
          break;
        case "insurance":
          PortfolioService.deleteInsurance(deleteModal.id);
          break;
        case "loans":
          PortfolioService.deleteLoan(deleteModal.id);
          break;
      }
      loadPortfolio(); // Reload data
    } catch (error) {
      console.error("Error deleting asset:", error);
    }
  };

  const closeDeleteModal = () => {
    setDeleteModal({
      open: false,
      category: null,
      id: "",
      name: "",
    });
  };

  if (loading) {
    return (
      <Box sx={{ width: "100%", mt: 4 }}>
        <LinearProgress />
        <Typography variant="body2" sx={{ mt: 2, textAlign: "center" }}>
          Loading your portfolio...
        </Typography>
      </Box>
    );
  }

  if (!portfolio) {
    return (
      <Alert severity="error" sx={{ mt: 4 }}>
        Failed to load portfolio data. Please try again.
      </Alert>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: { xs: 1, sm: 2 }, px: { xs: 1, sm: 2 } }}>
      {/* Modern Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: { xs: 2, sm: 3 },
          p: { xs: 2, sm: 3 },
          background: "linear-gradient(135deg, #FCA311 0%, #F77F00 100%)",
          borderRadius: 3,
          color: "white",
          boxShadow: "0 8px 32px rgba(252, 163, 17, 0.3)",
        }}
      >
        <Box>
          <Typography
            variant="h4"
            sx={{ fontWeight: 800, mb: 0.5, fontSize: { xs: "1.5rem", sm: "2rem" } }}
          >
            Portfolio Dashboard
          </Typography>
          <Typography variant="body1" sx={{ opacity: 0.9, fontSize: { xs: "0.9rem", sm: "1rem" } }}>
            Track and manage all your financial assets
          </Typography>
        </Box>

        <Box sx={{ display: "flex", gap: 1 }}>
          <IconButton
            onClick={(e) => setFilterAnchor(e.currentTarget)}
            sx={{ color: "white", backgroundColor: "rgba(255,255,255,0.2)" }}
          >
            <FaFilter size={16} />
          </IconButton>

          <Button
            variant="contained"
            onClick={() => onAddAsset("investments")}
            sx={{ 
              backgroundColor: "white", 
              color: "#FCA311", 
              borderRadius: 2, 
              px: 3,
              fontWeight: 600,
              "&:hover": { backgroundColor: "rgba(255,255,255,0.9)" }
            }}
          >
            Add Asset
          </Button>
        </Box>
      </Box>

      {/* Modern Summary Cards */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "repeat(2, 1fr)",
            sm: "repeat(4, 1fr)",
          },
          gap: { xs: 1.5, sm: 2 },
          mb: { xs: 2, sm: 3 },
        }}
      >
        <Box>
          <Card
            sx={{
              background: "linear-gradient(135deg, #FCA311 0%, #F77F00 100%)",
              color: "white",
              minHeight: { xs: 80, sm: 100 },
            }}
          >
            <CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Box>
                  <Typography
                    variant="caption"
                    sx={{ opacity: 0.9, display: "block" }}
                  >
                    Investments
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 700, lineHeight: 1.2 }}
                  >
                    {formatNumber(portfolio.summary.totalInvestments)}
                  </Typography>
                </Box>
                <FaMoneyBillWave size={24} style={{ opacity: 0.8 }} />
              </Box>
            </CardContent>
          </Card>
        </Box>

        <Box>
          <Card
            sx={{
              background: "linear-gradient(135deg, #2E8B57 0%, #228B22 100%)",
              color: "white",
              minHeight: { xs: 80, sm: 100 },
            }}
          >
            <CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Box>
                  <Typography
                    variant="caption"
                    sx={{ opacity: 0.9, display: "block" }}
                  >
                    Insurance
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 700, lineHeight: 1.2 }}
                  >
                    {formatNumber(portfolio.summary.totalInsurance)}
                  </Typography>
                </Box>
                <FaShieldAlt size={24} style={{ opacity: 0.8 }} />
              </Box>
            </CardContent>
          </Card>
        </Box>

        <Box>
          <Card
            sx={{
              background: "linear-gradient(135deg, #DC143C 0%, #B22222 100%)",
              color: "white",
              minHeight: { xs: 80, sm: 100 },
            }}
          >
            <CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Box>
                  <Typography
                    variant="caption"
                    sx={{ opacity: 0.9, display: "block" }}
                  >
                    Loans
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 700, lineHeight: 1.2 }}
                  >
                    {formatNumber(portfolio.summary.totalLoans)}
                  </Typography>
                </Box>
                <FaCreditCard size={24} style={{ opacity: 0.8 }} />
              </Box>
            </CardContent>
          </Card>
        </Box>

        <Box>
          <Card
            sx={{
              background:
                portfolio.summary.netWorth >= 0
                  ? "linear-gradient(135deg, #14213D 0%, #000000 100%)"
                  : "linear-gradient(135deg, #8B0000 0%, #DC143C 100%)",
              color: "white",
              minHeight: { xs: 80, sm: 100 },
            }}
          >
            <CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Box>
                  <Typography
                    variant="caption"
                    sx={{ opacity: 0.9, display: "block" }}
                  >
                    Net Worth
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 700, lineHeight: 1.2 }}
                  >
                    {formatNumber(Math.abs(portfolio.summary.netWorth))}
                  </Typography>
                </Box>
                {portfolio.summary.netWorth >= 0 ? (
                  <MdTrendingUp size={24} style={{ opacity: 0.8 }} />
                ) : (
                  <MdTrendingDown size={24} style={{ opacity: 0.8 }} />
                )}
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>

      {/* Compact Charts Section */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
          gap: 2,
          mb: 3,
        }}
      >
        <Box>
          <Card>
            <CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
              <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
                Investment Allocation
              </Typography>
              <Box sx={{ height: 250 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={getInvestmentChartData()}
                      cx="50%"
                      cy="50%"
                      outerRadius={70}
                      dataKey="value"
                      label={({ name, percent }) =>
                        `${name} ${(percent * 100).toFixed(0)}%`
                      }
                    >
                      {getInvestmentChartData().map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value) => formatCurrency(value as number)}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Box>

        <Box>
          <Card>
            <CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
              <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
                Portfolio Overview
              </Typography>
              <Box sx={{ height: 250 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={getOverviewChartData()}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="category" />
                    <YAxis tickFormatter={(value) => formatNumber(value)} />
                    <Tooltip
                      formatter={(value) => formatCurrency(value as number)}
                    />
                    <Bar dataKey="amount" fill="#FCA311" />
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>

      {/* Compact Assets List */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {/* Investments */}
        {(selectedCategory === "all" || selectedCategory === "investments") && (
          <Box>
            <Card>
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 2,
                  }}
                >
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    💰 Investments ({portfolio.investments.length})
                  </Typography>
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<FaPlus size={12} />}
                    onClick={() => onAddAsset("investments")}
                    sx={{ fontSize: "0.75rem" }}
                  >
                    Add
                  </Button>
                </Box>

                {portfolio.investments.length === 0 ? (
                  <Typography
                    color="text.secondary"
                    sx={{ textAlign: "center", py: 3 }}
                  >
                    No investments added yet. Click "Add" to get started.
                  </Typography>
                ) : (
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: {
                        xs: "1fr",
                        sm: "repeat(2, 1fr)",
                        lg: "repeat(3, 1fr)",
                      },
                      gap: 1.5,
                    }}
                  >
                    {portfolio.investments.map((investment) => (
                      <Box key={investment.id}>
                        <Card
                          variant="outlined"
                          sx={{
                            position: "relative",
                            height: 200,
                            display: "flex",
                            flexDirection: "column",
                          }}
                        >
                          <CardContent
                            sx={{
                              p: 1.5,
                              "&:last-child": { pb: 1.5 },
                              flex: 1,
                              display: "flex",
                              flexDirection: "column",
                            }}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "flex-start",
                                mb: 1,
                              }}
                            >
                              <Box sx={{ flex: 1 }}>
                                <Typography
                                  variant="body2"
                                  sx={{
                                    fontWeight: 600,
                                    mb: 0.5,
                                    fontSize: "0.875rem",
                                  }}
                                >
                                  {investment.name}
                                </Typography>
                                <Chip
                                  label={investment.type
                                    .replace("_", " ")
                                    .toUpperCase()}
                                  size="small"
                                  sx={{ fontSize: "0.65rem", height: 18 }}
                                />
                              </Box>
                            </Box>

                            <Typography
                              variant="subtitle1"
                              sx={{
                                color: "primary.main",
                                fontWeight: 700,
                                mb: 0.5,
                              }}
                            >
                              {formatCurrency(
                                investment.currentValue || investment.amount
                              )}
                            </Typography>

                            {investment.returns && (
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 0.5,
                                  mb: 0.5,
                                }}
                              >
                                <MdTrendingUp size={14} color="#2E8B57" />
                                <Typography
                                  variant="caption"
                                  sx={{ color: "#2E8B57", fontWeight: 600 }}
                                >
                                  +{formatCurrency(investment.returns)} (
                                  {investment.returnsPercentage}%)
                                </Typography>
                              </Box>
                            )}

                            <Typography
                              variant="caption"
                              color="text.secondary"
                              sx={{ display: "block", mb: 1, flex: 1 }}
                            >
                              {investment.provider}
                            </Typography>

                            <Box sx={{ display: "flex", gap: 0.5, mt: "auto" }}>
                              <Button
                                size="small"
                                variant="outlined"
                                startIcon={<FaEdit size={10} />}
                                onClick={() =>
                                  onEditAsset("investments", investment.id)
                                }
                                sx={{ fontSize: "0.65rem", px: 1, py: 0.5 }}
                              >
                                Edit
                              </Button>
                              <Button
                                size="small"
                                variant="outlined"
                                color="error"
                                startIcon={<FaTrash size={10} />}
                                onClick={() =>
                                  handleDeleteAsset(
                                    "investments",
                                    investment.id,
                                    investment.name
                                  )
                                }
                                sx={{ fontSize: "0.65rem", px: 1, py: 0.5 }}
                              >
                                Delete
                              </Button>
                            </Box>
                          </CardContent>
                        </Card>
                      </Box>
                    ))}
                  </Box>
                )}
              </CardContent>
            </Card>
          </Box>
        )}

        {/* Insurance */}
        {(selectedCategory === "all" || selectedCategory === "insurance") && (
          <Box>
            <Card>
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 3,
                  }}
                >
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    🛡️ Insurance ({portfolio.insurance.length})
                  </Typography>
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<FaPlus />}
                    onClick={() => onAddAsset("insurance")}
                  >
                    Add Insurance
                  </Button>
                </Box>

                {portfolio.insurance.length === 0 ? (
                  <Typography
                    color="text.secondary"
                    sx={{ textAlign: "center", py: 4 }}
                  >
                    No insurance policies added yet. Click "Add Insurance" to
                    get started.
                  </Typography>
                ) : (
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: {
                        xs: "1fr",
                        sm: "repeat(2, 1fr)",
                        lg: "repeat(3, 1fr)",
                      },
                      gap: 2,
                    }}
                  >
                    {portfolio.insurance.map((insurance) => (
                      <Box key={insurance.id}>
                        <Card
                          variant="outlined"
                          sx={{
                            height: 200,
                            display: "flex",
                            flexDirection: "column",
                          }}
                        >
                          <CardContent
                            sx={{
                              p: 1.5,
                              "&:last-child": { pb: 1.5 },
                              flex: 1,
                              display: "flex",
                              flexDirection: "column",
                            }}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "flex-start",
                                mb: 1,
                              }}
                            >
                              <Box sx={{ flex: 1 }}>
                                <Typography
                                  variant="body2"
                                  sx={{
                                    fontWeight: 600,
                                    mb: 0.5,
                                    fontSize: "0.875rem",
                                  }}
                                >
                                  {insurance.name}
                                </Typography>
                                <Chip
                                  label={insurance.type.toUpperCase()}
                                  size="small"
                                  color="success"
                                  sx={{ fontSize: "0.65rem", height: 18 }}
                                />
                              </Box>
                              <Chip
                                label={insurance.status}
                                size="small"
                                color={
                                  insurance.status === "active"
                                    ? "success"
                                    : "default"
                                }
                                sx={{ fontSize: "0.65rem" }}
                              />
                            </Box>

                            <Typography
                              variant="subtitle1"
                              sx={{
                                color: "success.main",
                                fontWeight: 700,
                                mb: 0.5,
                              }}
                            >
                              {formatCurrency(insurance.coverageAmount)}
                            </Typography>

                            <Typography
                              variant="caption"
                              sx={{ mb: 0.5, display: "block" }}
                            >
                              Premium: {formatCurrency(insurance.premium)} /{" "}
                              {insurance.premiumFrequency}
                            </Typography>

                            <Typography
                              variant="caption"
                              color="text.secondary"
                              sx={{ flex: 1 }}
                            >
                              {insurance.provider} • {insurance.policyNumber}
                            </Typography>

                            <Box sx={{ display: "flex", gap: 0.5, mt: "auto" }}>
                              <Button
                                size="small"
                                variant="outlined"
                                startIcon={<FaEdit size={10} />}
                                onClick={() =>
                                  onEditAsset("insurance", insurance.id)
                                }
                                sx={{ fontSize: "0.65rem", px: 1, py: 0.5 }}
                              >
                                Edit
                              </Button>
                              <Button
                                size="small"
                                variant="outlined"
                                color="error"
                                startIcon={<FaTrash size={10} />}
                                onClick={() =>
                                  handleDeleteAsset(
                                    "insurance",
                                    insurance.id,
                                    insurance.name
                                  )
                                }
                                sx={{ fontSize: "0.7rem" }}
                              >
                                Delete
                              </Button>
                            </Box>
                          </CardContent>
                        </Card>
                      </Box>
                    ))}
                  </Box>
                )}
              </CardContent>
            </Card>
          </Box>
        )}

        {/* Loans */}
        {(selectedCategory === "all" || selectedCategory === "loans") && (
          <Box>
            <Card>
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 3,
                  }}
                >
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    💳 Loans ({portfolio.loans.length})
                  </Typography>
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<FaPlus />}
                    onClick={() => onAddAsset("loans")}
                  >
                    Add Loan
                  </Button>
                </Box>

                {portfolio.loans.length === 0 ? (
                  <Typography
                    color="text.secondary"
                    sx={{ textAlign: "center", py: 4 }}
                  >
                    No loans added yet. Click "Add Loan" to get started.
                  </Typography>
                ) : (
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: {
                        xs: "1fr",
                        sm: "repeat(2, 1fr)",
                        lg: "repeat(3, 1fr)",
                      },
                      gap: 2,
                    }}
                  >
                    {portfolio.loans.map((loan) => (
                      <Box key={loan.id}>
                        <Card
                          variant="outlined"
                          sx={{
                            height: 200,
                            display: "flex",
                            flexDirection: "column",
                          }}
                        >
                          <CardContent
                            sx={{
                              p: 1.5,
                              "&:last-child": { pb: 1.5 },
                              flex: 1,
                              display: "flex",
                              flexDirection: "column",
                            }}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "flex-start",
                                mb: 1,
                              }}
                            >
                              <Box sx={{ flex: 1 }}>
                                <Typography
                                  variant="body2"
                                  sx={{
                                    fontWeight: 600,
                                    mb: 0.5,
                                    fontSize: "0.875rem",
                                  }}
                                >
                                  {loan.name}
                                </Typography>
                                <Chip
                                  label={loan.type.toUpperCase()}
                                  size="small"
                                  color="error"
                                  sx={{ fontSize: "0.65rem", height: 18 }}
                                />
                              </Box>
                              <Chip
                                label={loan.status}
                                size="small"
                                color={
                                  loan.status === "active"
                                    ? "warning"
                                    : "default"
                                }
                                sx={{ fontSize: "0.65rem" }}
                              />
                            </Box>

                            <Typography
                              variant="subtitle1"
                              sx={{
                                color: "error.main",
                                fontWeight: 700,
                                mb: 0.5,
                              }}
                            >
                              {formatCurrency(loan.outstandingAmount)}
                            </Typography>

                            <Typography
                              variant="caption"
                              sx={{ mb: 0.5, display: "block" }}
                            >
                              EMI: {formatCurrency(loan.emi)} •{" "}
                              {loan.interestRate}% p.a.
                            </Typography>

                            <Typography
                              variant="caption"
                              color="text.secondary"
                              sx={{ flex: 1 }}
                            >
                              {loan.lender}
                            </Typography>

                            <Box sx={{ display: "flex", gap: 0.5, mt: "auto" }}>
                              <Button
                                size="small"
                                variant="outlined"
                                startIcon={<FaEdit size={10} />}
                                onClick={() => onEditAsset("loans", loan.id)}
                                sx={{ fontSize: "0.65rem", px: 1, py: 0.5 }}
                              >
                                Edit
                              </Button>
                              <Button
                                size="small"
                                variant="outlined"
                                color="error"
                                startIcon={<FaTrash size={10} />}
                                onClick={() =>
                                  handleDeleteAsset("loans", loan.id, loan.name)
                                }
                                sx={{ fontSize: "0.65rem", px: 1, py: 0.5 }}
                              >
                                Delete
                              </Button>
                            </Box>
                          </CardContent>
                        </Card>
                      </Box>
                    ))}
                  </Box>
                )}
              </CardContent>
            </Card>
          </Box>
        )}
      </Box>

      {/* Filter Menu */}
      <Menu
        anchorEl={filterAnchor}
        open={Boolean(filterAnchor)}
        onClose={() => setFilterAnchor(null)}
        disableScrollLock={true}
        PaperProps={{
          sx: {
            mt: 1,
            minWidth: 200,
            borderRadius: 2,
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
          },
        }}
        MenuListProps={{
          sx: {
            py: 1,
          },
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem
          onClick={() => {
            setSelectedCategory("all");
            setFilterAnchor(null);
          }}
        >
          All Categories
        </MenuItem>
        <MenuItem
          onClick={() => {
            setSelectedCategory("investments");
            setFilterAnchor(null);
          }}
        >
          Investments Only
        </MenuItem>
        <MenuItem
          onClick={() => {
            setSelectedCategory("insurance");
            setFilterAnchor(null);
          }}
        >
          Insurance Only
        </MenuItem>
        <MenuItem
          onClick={() => {
            setSelectedCategory("loans");
            setFilterAnchor(null);
          }}
        >
          Loans Only
        </MenuItem>
      </Menu>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        open={deleteModal.open}
        onClose={closeDeleteModal}
        onConfirm={confirmDelete}
        itemName={deleteModal.name}
        itemType={deleteModal.category || "asset"}
        title="Delete Asset"
        message={`Are you sure you want to delete "${deleteModal.name}"? This will permanently remove this ${deleteModal.category} from your portfolio.`}
      />
    </Container>
  );
}
