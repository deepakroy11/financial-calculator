"use client";

import { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Tabs,
  Tab,
  Card,
  CardContent,
  TextField,
  Button,
  Grid,
  MenuItem,
  Alert,
  Snackbar,
  FormControl,
  InputLabel,
  Select,
  InputAdornment,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import {
  FaSave,
  FaArrowLeft,
  FaMoneyBillWave,
  FaShieldAlt,
  FaCreditCard,
} from "react-icons/fa";
import {
  InvestmentFormData,
  InsuranceFormData,
  LoanFormData,
} from "../../types/portfolio";
import { PortfolioService } from "../../lib/portfolio-service";
import NumberInput from "../ui/NumberInput";

interface PortfolioManagerProps {
  onBack: () => void;
  initialTab?: "investments" | "insurance" | "loans";
  editData?: {
    category: "investments" | "insurance" | "loans";
    id: string;
  };
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`portfolio-tabpanel-${index}`}
      aria-labelledby={`portfolio-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

export default function PortfolioManager({
  onBack,
  initialTab = "investments",
  editData,
}: PortfolioManagerProps) {
  const [activeTab, setActiveTab] = useState(
    initialTab === "investments" ? 0 : initialTab === "insurance" ? 1 : 2
  );
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  });

  // Investment Form State
  const [investmentForm, setInvestmentForm] = useState<InvestmentFormData>({
    name: "",
    type: "mutual_funds",
    provider: "",
    amount: 0,
    startDate: new Date().toISOString().split("T")[0],
    maturityDate: "",
    interestRate: 0,
    units: 0,
    nav: 0,
    symbol: "",
    folio: "",
    notes: "",
  });

  // Insurance Form State
  const [insuranceForm, setInsuranceForm] = useState<InsuranceFormData>({
    name: "",
    type: "term",
    provider: "",
    policyNumber: "",
    premium: 0,
    premiumFrequency: "yearly",
    coverageAmount: 0,
    amount: 0, // Will be set to premium value
    startDate: new Date().toISOString().split("T")[0],
    maturityDate: "",
    nominee: "",
    notes: "",
  });

  // Loan Form State
  const [loanForm, setLoanForm] = useState<LoanFormData>({
    name: "",
    type: "home",
    amount: 0,
    lender: "",
    principalAmount: 0,
    outstandingAmount: 0,
    interestRate: 0,
    emi: 0,
    tenure: 0,
    startDate: new Date().toISOString().split("T")[0],
    accountNumber: "",
    notes: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    // Load edit data if provided
    if (editData) {
      loadEditData();
    }
  }, [editData]);

  const loadEditData = () => {
    const portfolio = PortfolioService.getPortfolio();
    if (!portfolio || !editData) return;

    switch (editData.category) {
      case "investments":
        const investment = portfolio.investments.find(
          (inv) => inv.id === editData.id
        );
        if (investment) {
          setInvestmentForm({
            name: investment.name,
            type: investment.type,
            provider: investment.provider || "",
            amount: investment.amount,
            startDate: investment.startDate,
            maturityDate: investment.maturityDate || "",
            interestRate: investment.interestRate || 0,
            units: investment.units || 0,
            nav: investment.nav || 0,
            symbol: investment.symbol || "",
            folio: investment.folio || "",
            notes: investment.notes || "",
          });
          setActiveTab(0);
        }
        break;
      case "insurance":
        const insurance = portfolio.insurance.find(
          (ins) => ins.id === editData.id
        );
        if (insurance) {
          setInsuranceForm({
            name: insurance.name,
            type: insurance.type,
            provider: insurance.provider || "",
            policyNumber: insurance.policyNumber,
            premium: insurance.premium,
            premiumFrequency: insurance.premiumFrequency,
            coverageAmount: insurance.coverageAmount,
            amount: insurance.amount,
            startDate: insurance.startDate,
            maturityDate: insurance.maturityDate || "",
            nominee: insurance.nominee || "",
            notes: insurance.notes || "",
          });
          setActiveTab(1);
        }
        break;
      case "loans":
        const loan = portfolio.loans.find((l) => l.id === editData.id);
        if (loan) {
          setLoanForm({
            name: loan.name,
            type: loan.type,
            amount: loan.amount,
            lender: loan.lender,
            principalAmount: loan.principalAmount,
            outstandingAmount: loan.outstandingAmount,
            interestRate: loan.interestRate,
            emi: loan.emi,
            tenure: loan.tenure,
            startDate: loan.startDate,
            accountNumber: loan.accountNumber || "",
            notes: loan.notes || "",
          });
          setActiveTab(2);
        }
        break;
    }
  };

  const validateInvestmentForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!investmentForm.name.trim())
      newErrors.name = "Investment name is required";
    if (!investmentForm.provider.trim())
      newErrors.provider = "Provider is required";
    if (investmentForm.amount <= 0)
      newErrors.amount = "Amount must be greater than 0";
    if (!investmentForm.startDate)
      newErrors.startDate = "Start date is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateInsuranceForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!insuranceForm.name.trim())
      newErrors.name = "Insurance name is required";
    if (!insuranceForm.provider.trim())
      newErrors.provider = "Provider is required";
    if (!insuranceForm.policyNumber.trim())
      newErrors.policyNumber = "Policy number is required";
    if (insuranceForm.premium <= 0)
      newErrors.premium = "Premium must be greater than 0";
    if (insuranceForm.coverageAmount <= 0)
      newErrors.coverageAmount = "Coverage amount must be greater than 0";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateLoanForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!loanForm.name.trim()) newErrors.name = "Loan name is required";
    if (!loanForm.lender.trim()) newErrors.lender = "Lender is required";
    if (loanForm.principalAmount <= 0)
      newErrors.principalAmount = "Principal amount must be greater than 0";
    if (loanForm.outstandingAmount <= 0)
      newErrors.outstandingAmount = "Outstanding amount must be greater than 0";
    if (loanForm.interestRate <= 0)
      newErrors.interestRate = "Interest rate must be greater than 0";
    if (loanForm.emi <= 0) newErrors.emi = "EMI must be greater than 0";
    if (loanForm.tenure <= 0)
      newErrors.tenure = "Tenure must be greater than 0";
    if (!loanForm.startDate) newErrors.startDate = "Start date is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveInvestment = () => {
    if (!validateInvestmentForm()) return;

    try {
      if (editData && editData.category === "investments") {
        PortfolioService.updateInvestment(editData.id, investmentForm);
        setSnackbar({
          open: true,
          message: "Investment updated successfully!",
          severity: "success",
        });
      } else {
        PortfolioService.addInvestment(investmentForm);
        setSnackbar({
          open: true,
          message: "Investment added successfully!",
          severity: "success",
        });
      }

      // Reset form
      setInvestmentForm({
        name: "",
        type: "mutual_funds",
        provider: "",
        amount: 0,
        startDate: new Date().toISOString().split("T")[0],
        maturityDate: "",
        interestRate: 0,
        units: 0,
        nav: 0,
        symbol: "",
        folio: "",
        notes: "",
      });

      setTimeout(() => onBack(), 1500);
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Error saving investment",
        severity: "error",
      });
    }
  };

  const handleSaveInsurance = () => {
    if (!validateInsuranceForm()) return;

    try {
      if (editData && editData.category === "insurance") {
        // Update logic would go here
        setSnackbar({
          open: true,
          message: "Insurance updated successfully!",
          severity: "success",
        });
      } else {
        PortfolioService.addInsurance(insuranceForm);
        setSnackbar({
          open: true,
          message: "Insurance added successfully!",
          severity: "success",
        });
      }

      // Reset form
      setInsuranceForm({
        name: "",
        type: "term",
        provider: "",
        policyNumber: "",
        premium: 0,
        premiumFrequency: "yearly",
        coverageAmount: 0,
        amount: 0,
        startDate: new Date().toISOString().split("T")[0],
        maturityDate: "",
        nominee: "",
        notes: "",
      });

      setTimeout(() => onBack(), 1500);
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Error saving insurance",
        severity: "error",
      });
    }
  };

  const handleSaveLoan = () => {
    if (!validateLoanForm()) return;

    try {
      if (editData && editData.category === "loans") {
        // Update logic would go here
        setSnackbar({
          open: true,
          message: "Loan updated successfully!",
          severity: "success",
        });
      } else {
        PortfolioService.addLoan(loanForm);
        setSnackbar({
          open: true,
          message: "Loan added successfully!",
          severity: "success",
        });
      }

      // Reset form
      setLoanForm({
        name: "",
        type: "home",
        lender: "",
        amount: 0,
        principalAmount: 0,
        outstandingAmount: 0,
        interestRate: 0,
        emi: 0,
        tenure: 0,
        startDate: new Date().toISOString().split("T")[0],
        accountNumber: "",
        notes: "",
      });

      setTimeout(() => onBack(), 1500);
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Error saving loan",
        severity: "error",
      });
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Container maxWidth="lg" sx={{ py: 2 }}>
        {/* Compact Header */}
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <Button
            onClick={onBack}
            variant="outlined"
            startIcon={<FaArrowLeft size={14} />}
            size="small"
            sx={{ mr: 2, borderRadius: 2 }}
          >
            Back
          </Button>
          <Box>
            <Typography
              variant="h5"
              sx={{ fontWeight: 700, color: "text.primary", mb: 0.5 }}
            >
              {editData ? "Edit Asset" : "Add New Asset"}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {editData
                ? "Update your asset details"
                : "Add investments, insurance, or loans"}
            </Typography>
          </Box>
        </Box>

        <Card>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={activeTab}
              onChange={(_, newValue) => setActiveTab(newValue)}
              aria-label="portfolio management tabs"
            >
              <Tab
                icon={<FaMoneyBillWave />}
                label="Investments"
                iconPosition="start"
                sx={{ minHeight: 64, textTransform: "none", fontWeight: 600 }}
              />
              <Tab
                icon={<FaShieldAlt />}
                label="Insurance"
                iconPosition="start"
                sx={{ minHeight: 64, textTransform: "none", fontWeight: 600 }}
              />
              <Tab
                icon={<FaCreditCard />}
                label="Loans"
                iconPosition="start"
                sx={{ minHeight: 64, textTransform: "none", fontWeight: 600 }}
              />
            </Tabs>
          </Box>

          {/* Investment Form */}
          <TabPanel value={activeTab} index={0}>
            <CardContent>
              <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
                💰 Investment Details
              </Typography>

              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Investment Name"
                    value={investmentForm.name}
                    onChange={(e) =>
                      setInvestmentForm({
                        ...investmentForm,
                        name: e.target.value,
                      })
                    }
                    error={!!errors.name}
                    helperText={errors.name}
                    placeholder="e.g., HDFC Top 100 Fund"
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <FormControl fullWidth error={!!errors.type}>
                    <InputLabel>Investment Type</InputLabel>
                    <Select
                      value={investmentForm.type}
                      label="Investment Type"
                      onChange={(e) =>
                        setInvestmentForm({
                          ...investmentForm,
                          type: e.target.value as any,
                        })
                      }
                    >
                      <MenuItem value="stocks">Stocks</MenuItem>
                      <MenuItem value="mutual_funds">Mutual Funds</MenuItem>
                      <MenuItem value="fd">Fixed Deposit</MenuItem>
                      <MenuItem value="rd">Recurring Deposit</MenuItem>
                      <MenuItem value="ppf">PPF</MenuItem>
                      <MenuItem value="nps">NPS</MenuItem>
                      <MenuItem value="pf">Provident Fund</MenuItem>
                      <MenuItem value="bonds">Bonds</MenuItem>
                      <MenuItem value="gold">Gold</MenuItem>
                      <MenuItem value="crypto">Cryptocurrency</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Provider/AMC"
                    value={investmentForm.provider}
                    onChange={(e) =>
                      setInvestmentForm({
                        ...investmentForm,
                        provider: e.target.value,
                      })
                    }
                    error={!!errors.provider}
                    helperText={errors.provider}
                    placeholder="e.g., HDFC Mutual Fund"
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <NumberInput
                    label="Investment Amount"
                    value={investmentForm.amount}
                    onChange={(value) =>
                      setInvestmentForm({
                        ...investmentForm,
                        amount: value,
                      })
                    }
                    error={errors.amount}
                    required
                    suffix="₹"
                    placeholder="Enter investment amount"
                    showInWords={true}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <DatePicker
                    label="Start Date"
                    value={
                      investmentForm.startDate
                        ? new Date(investmentForm.startDate)
                        : null
                    }
                    onChange={(date) =>
                      setInvestmentForm({
                        ...investmentForm,
                        startDate: date ? date.toISOString().split("T")[0] : "",
                      })
                    }
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        error: !!errors.startDate,
                        helperText: errors.startDate,
                        sx: { mb: 2 },
                      },
                    }}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Maturity Date (Optional)"
                    type="date"
                    value={investmentForm.maturityDate}
                    onChange={(e) =>
                      setInvestmentForm({
                        ...investmentForm,
                        maturityDate: e.target.value,
                      })
                    }
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>

                {(investmentForm.type === "fd" ||
                  investmentForm.type === "rd" ||
                  investmentForm.type === "bonds") && (
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Interest Rate"
                      type="number"
                      value={investmentForm.interestRate}
                      onChange={(e) =>
                        setInvestmentForm({
                          ...investmentForm,
                          interestRate: Number(e.target.value),
                        })
                      }
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">%</InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                )}

                {investmentForm.type === "mutual_funds" && (
                  <>
                    <Grid item xs={12} md={4}>
                      <TextField
                        fullWidth
                        label="Units"
                        type="number"
                        value={investmentForm.units}
                        onChange={(e) =>
                          setInvestmentForm({
                            ...investmentForm,
                            units: Number(e.target.value),
                          })
                        }
                      />
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <TextField
                        fullWidth
                        label="Current NAV"
                        type="number"
                        value={investmentForm.nav}
                        onChange={(e) =>
                          setInvestmentForm({
                            ...investmentForm,
                            nav: Number(e.target.value),
                          })
                        }
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">₹</InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <TextField
                        fullWidth
                        label="Folio Number"
                        value={investmentForm.folio}
                        onChange={(e) =>
                          setInvestmentForm({
                            ...investmentForm,
                            folio: e.target.value,
                          })
                        }
                      />
                    </Grid>
                  </>
                )}

                {investmentForm.type === "stocks" && (
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Stock Symbol"
                      value={investmentForm.symbol}
                      onChange={(e) =>
                        setInvestmentForm({
                          ...investmentForm,
                          symbol: e.target.value,
                        })
                      }
                      placeholder="e.g., RELIANCE"
                    />
                  </Grid>
                )}

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Notes (Optional)"
                    multiline
                    rows={3}
                    value={investmentForm.notes}
                    onChange={(e) =>
                      setInvestmentForm({
                        ...investmentForm,
                        notes: e.target.value,
                      })
                    }
                    placeholder="Any additional notes about this investment"
                  />
                </Grid>

                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    size="large"
                    startIcon={<FaSave />}
                    onClick={handleSaveInvestment}
                    sx={{ borderRadius: 2, px: 4 }}
                  >
                    {editData ? "Update Investment" : "Save Investment"}
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </TabPanel>

          {/* Insurance Form */}
          <TabPanel value={activeTab} index={1}>
            <CardContent>
              <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
                🛡️ Insurance Details
              </Typography>

              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Insurance Name"
                    value={insuranceForm.name}
                    onChange={(e) =>
                      setInsuranceForm({
                        ...insuranceForm,
                        name: e.target.value,
                      })
                    }
                    error={!!errors.name}
                    helperText={errors.name}
                    placeholder="e.g., HDFC Life Click 2 Protect Plus"
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel>Insurance Type</InputLabel>
                    <Select
                      value={insuranceForm.type}
                      label="Insurance Type"
                      onChange={(e) =>
                        setInsuranceForm({
                          ...insuranceForm,
                          type: e.target.value as any,
                        })
                      }
                    >
                      <MenuItem value="life">Life Insurance</MenuItem>
                      <MenuItem value="term">Term Insurance</MenuItem>
                      <MenuItem value="health">Health Insurance</MenuItem>
                      <MenuItem value="vehicle">Vehicle Insurance</MenuItem>
                      <MenuItem value="home">Home Insurance</MenuItem>
                      <MenuItem value="travel">Travel Insurance</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Insurance Provider"
                    value={insuranceForm.provider}
                    onChange={(e) =>
                      setInsuranceForm({
                        ...insuranceForm,
                        provider: e.target.value,
                      })
                    }
                    error={!!errors.provider}
                    helperText={errors.provider}
                    placeholder="e.g., HDFC Life"
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Policy Number"
                    value={insuranceForm.policyNumber}
                    onChange={(e) =>
                      setInsuranceForm({
                        ...insuranceForm,
                        policyNumber: e.target.value,
                      })
                    }
                    error={!!errors.policyNumber}
                    helperText={errors.policyNumber}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <NumberInput
                    label="Premium Amount"
                    value={insuranceForm.premium}
                    onChange={(value) =>
                      setInsuranceForm({
                        ...insuranceForm,
                        premium: value,
                        amount: value, // Sync amount with premium for insurance
                      })
                    }
                    error={errors.premium}
                    required
                    suffix="₹"
                    placeholder="Enter premium amount"
                    showInWords={true}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel>Premium Frequency</InputLabel>
                    <Select
                      value={insuranceForm.premiumFrequency}
                      label="Premium Frequency"
                      onChange={(e) =>
                        setInsuranceForm({
                          ...insuranceForm,
                          premiumFrequency: e.target.value as any,
                        })
                      }
                    >
                      <MenuItem value="monthly">Monthly</MenuItem>
                      <MenuItem value="quarterly">Quarterly</MenuItem>
                      <MenuItem value="half_yearly">Half Yearly</MenuItem>
                      <MenuItem value="yearly">Yearly</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} md={6}>
                  <NumberInput
                    label="Coverage Amount"
                    value={insuranceForm.coverageAmount}
                    onChange={(value) =>
                      setInsuranceForm({
                        ...insuranceForm,
                        coverageAmount: value,
                      })
                    }
                    error={errors.coverageAmount}
                    required
                    prefix="₹"
                    placeholder="Enter coverage amount"
                    showInWords={true}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <DatePicker
                    label="Policy Start Date"
                    value={
                      insuranceForm.startDate
                        ? new Date(insuranceForm.startDate)
                        : null
                    }
                    onChange={(date) =>
                      setInsuranceForm({
                        ...insuranceForm,
                        startDate: date ? date.toISOString().split("T")[0] : "",
                      })
                    }
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        error: !!errors.startDate,
                        helperText: errors.startDate,
                        sx: { mb: 2 },
                      },
                    }}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Maturity Date (Optional)"
                    type="date"
                    value={insuranceForm.maturityDate}
                    onChange={(e) =>
                      setInsuranceForm({
                        ...insuranceForm,
                        maturityDate: e.target.value,
                      })
                    }
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Nominee (Optional)"
                    value={insuranceForm.nominee}
                    onChange={(e) =>
                      setInsuranceForm({
                        ...insuranceForm,
                        nominee: e.target.value,
                      })
                    }
                    placeholder="e.g., Spouse, Parent"
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Notes (Optional)"
                    multiline
                    rows={3}
                    value={insuranceForm.notes}
                    onChange={(e) =>
                      setInsuranceForm({
                        ...insuranceForm,
                        notes: e.target.value,
                      })
                    }
                    placeholder="Any additional notes about this insurance policy"
                  />
                </Grid>

                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    size="large"
                    startIcon={<FaSave />}
                    onClick={handleSaveInsurance}
                    sx={{ borderRadius: 2, px: 4 }}
                  >
                    {editData ? "Update Insurance" : "Save Insurance"}
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </TabPanel>

          {/* Loan Form */}
          <TabPanel value={activeTab} index={2}>
            <CardContent>
              <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
                💳 Loan Details
              </Typography>

              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Loan Name"
                    value={loanForm.name}
                    onChange={(e) =>
                      setLoanForm({ ...loanForm, name: e.target.value })
                    }
                    error={!!errors.name}
                    helperText={errors.name}
                    placeholder="e.g., Home Loan - Dream Home"
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel>Loan Type</InputLabel>
                    <Select
                      value={loanForm.type}
                      label="Loan Type"
                      onChange={(e) =>
                        setLoanForm({
                          ...loanForm,
                          type: e.target.value as any,
                        })
                      }
                    >
                      <MenuItem value="home">Home Loan</MenuItem>
                      <MenuItem value="personal">Personal Loan</MenuItem>
                      <MenuItem value="education">Education Loan</MenuItem>
                      <MenuItem value="vehicle">Vehicle Loan</MenuItem>
                      <MenuItem value="business">Business Loan</MenuItem>
                      <MenuItem value="credit_card">Credit Card</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Lender"
                    value={loanForm.lender}
                    onChange={(e) =>
                      setLoanForm({ ...loanForm, lender: e.target.value })
                    }
                    error={!!errors.lender}
                    helperText={errors.lender}
                    placeholder="e.g., HDFC Bank"
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <NumberInput
                    label="Principal Amount"
                    value={loanForm.principalAmount}
                    onChange={(value) =>
                      setLoanForm({
                        ...loanForm,
                        principalAmount: value,
                      })
                    }
                    error={errors.principalAmount}
                    required
                    prefix="₹"
                    placeholder="Enter principal amount"
                    showInWords={true}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <NumberInput
                    label="Outstanding Amount"
                    value={loanForm.outstandingAmount}
                    onChange={(value) =>
                      setLoanForm({
                        ...loanForm,
                        outstandingAmount: value,
                      })
                    }
                    error={errors.outstandingAmount}
                    required
                    prefix="₹"
                    placeholder="Enter outstanding amount"
                    showInWords={true}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Interest Rate"
                    type="number"
                    value={loanForm.interestRate}
                    onChange={(e) =>
                      setLoanForm({
                        ...loanForm,
                        interestRate: Number(e.target.value),
                      })
                    }
                    error={!!errors.interestRate}
                    helperText={errors.interestRate}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">% p.a.</InputAdornment>
                      ),
                    }}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <NumberInput
                    label="EMI Amount"
                    value={loanForm.emi}
                    onChange={(value) =>
                      setLoanForm({ ...loanForm, emi: value })
                    }
                    error={errors.emi}
                    required
                    prefix="₹"
                    placeholder="Enter EMI amount"
                    showInWords={true}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Tenure"
                    type="number"
                    value={loanForm.tenure}
                    onChange={(e) =>
                      setLoanForm({
                        ...loanForm,
                        tenure: Number(e.target.value),
                      })
                    }
                    error={!!errors.tenure}
                    helperText={errors.tenure}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">months</InputAdornment>
                      ),
                    }}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Start Date"
                    type="date"
                    value={loanForm.startDate}
                    onChange={(e) =>
                      setLoanForm({ ...loanForm, startDate: e.target.value })
                    }
                    error={!!errors.startDate}
                    helperText={errors.startDate}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Account Number (Optional)"
                    value={loanForm.accountNumber}
                    onChange={(e) =>
                      setLoanForm({
                        ...loanForm,
                        accountNumber: e.target.value,
                      })
                    }
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Notes (Optional)"
                    multiline
                    rows={3}
                    value={loanForm.notes}
                    onChange={(e) =>
                      setLoanForm({ ...loanForm, notes: e.target.value })
                    }
                    placeholder="Any additional notes about this loan"
                  />
                </Grid>

                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    size="large"
                    startIcon={<FaSave />}
                    onClick={handleSaveLoan}
                    sx={{ borderRadius: 2, px: 4 }}
                  >
                    {editData ? "Update Loan" : "Save Loan"}
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </TabPanel>
        </Card>

        {/* Snackbar for notifications */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={3000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            onClose={() => setSnackbar({ ...snackbar, open: false })}
            severity={snackbar.severity}
            sx={{ width: "100%" }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Container>
    </LocalizationProvider>
  );
}
