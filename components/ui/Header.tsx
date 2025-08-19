"use client";

import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  FaChartLine,
  FaCoins,
  FaPiggyBank,
  FaBriefcase,
  FaBars,
  FaHome,
  FaMoon,
  FaSun,
} from "react-icons/fa";
import { useThemeMode } from "../../app/theme";

interface HeaderProps {
  onCategorySelect?: (categoryId: string) => void;
  onHomeClick?: () => void;
}

const categories = [
  { id: "loans", name: "Loans & Mortgages", icon: FaHome, color: "#1f7a99" },
  {
    id: "investments",
    name: "Investments",
    icon: FaChartLine,
    color: "#10b981",
  },
  { id: "taxes", name: "Tax Planning", icon: FaCoins, color: "#ef4444" },
  {
    id: "savings",
    name: "Savings & Goals",
    icon: FaPiggyBank,
    color: "#4a9bb8",
  },
  {
    id: "business",
    name: "Business Tools",
    icon: FaBriefcase,
    color: "#f59e0b",
  },
];

export default function Header({ onCategorySelect, onHomeClick }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const { darkMode, toggleDarkMode } = useThemeMode();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleCategorySelect = (categoryId: string) => {
    onCategorySelect?.(categoryId);
    setMobileOpen(false);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box sx={{ width: 280 }} role="presentation">
      <Box
        sx={{
          p: 3,
          borderBottom: `1px solid ${theme.palette.divider}`,
          background:
            theme.palette.mode === "dark"
              ? "linear-gradient(135deg, #000000 0%, #14213D 100%)"
              : "linear-gradient(135deg, #E5E5E5 0%, #ffffff 100%)",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            color: theme.palette.text.primary,
            mb: 1,
          }}
        >
          Calculator Categories
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: theme.palette.text.secondary,
          }}
        >
          Choose a category to explore
        </Typography>
      </Box>
      <List sx={{ p: 1 }}>
        {categories.map((category) => {
          const IconComponent = category.icon;
          return (
            <ListItem
              key={category.id}
              onClick={() => handleCategorySelect(category.id)}
              sx={{
                cursor: "pointer",
                borderRadius: 2,
                mx: 1,
                mb: 0.5,
                transition: "all 0.2s ease-in-out",
                "&:hover": {
                  backgroundColor:
                    theme.palette.mode === "dark"
                      ? "rgba(31, 122, 153, 0.1)"
                      : "rgba(31, 122, 153, 0.05)",
                  transform: "translateX(4px)",
                },
              }}
            >
              <ListItemIcon>
                <Box
                  sx={{
                    p: 1.5,
                    borderRadius: 2,
                    backgroundColor: `${category.color}20`,
                    color: category.color,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <IconComponent size={20} />
                </Box>
              </ListItemIcon>
              <ListItemText
                primary={category.name}
                primaryTypographyProps={{
                  sx: {
                    fontWeight: 500,
                    color: theme.palette.text.primary,
                  },
                }}
              />
            </ListItem>
          );
        })}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          background:
            theme.palette.mode === "dark"
              ? "linear-gradient(135deg, rgba(0, 0, 0, 0.95) 0%, rgba(20, 33, 61, 0.95) 100%)"
              : "linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.95) 100%)",
          backdropFilter: "blur(20px)",
          borderBottom: `1px solid ${theme.palette.divider}`,
          boxShadow:
            theme.palette.mode === "dark"
              ? "0 1px 3px 0 rgba(0, 0, 0, 0.3), 0 1px 2px 0 rgba(0, 0, 0, 0.2)"
              : "0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px 0 rgba(0, 0, 0, 0.03)",
        }}
      >
        <Container maxWidth="lg">
          <Toolbar sx={{ px: 0, py: 1.5, minHeight: "72px" }}>
            {/* Logo/Brand */}
            <Box
              onClick={onHomeClick}
              sx={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
                transition: "all 0.2s ease-in-out",
                "&:hover": {
                  transform: "scale(1.02)",
                },
              }}
            >
              <Box
                sx={{
                  mr: 2,
                  display: "flex",
                  alignItems: "center",
                  p: 1,
                  borderRadius: 2,
                  backgroundColor:
                    theme.palette.mode === "dark"
                      ? "rgba(252, 163, 17, 0.1)"
                      : "rgba(20, 33, 61, 0.05)",
                  border: `1px solid ${
                    theme.palette.mode === "dark"
                      ? "rgba(252, 163, 17, 0.2)"
                      : "rgba(20, 33, 61, 0.1)"
                  }`,
                }}
              >
                <img
                  src="/logo/new-logo-2.png"
                  alt="Finly Logo"
                  style={{
                    height: "36px",
                    width: "auto",
                  }}
                />
              </Box>
            </Box>

            {/* Desktop Navigation */}
            {!isMobile && (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  ml: "auto",
                  gap: 1,
                }}
              >
                {categories.map((category) => {
                  const IconComponent = category.icon;
                  return (
                    <Button
                      key={category.id}
                      onClick={() => handleCategorySelect(category.id)}
                      startIcon={<IconComponent size={16} />}
                      sx={{
                        color: theme.palette.text.secondary,
                        fontWeight: 500,
                        px: 3,
                        py: 1.5,
                        borderRadius: 3,
                        textTransform: "none",
                        fontSize: "0.875rem",
                        transition: "all 0.2s ease-in-out",
                        border: `1px solid transparent`,
                        "&:hover": {
                          color: theme.palette.primary.main,
                          backgroundColor:
                            theme.palette.mode === "dark"
                              ? "rgba(252, 163, 17, 0.1)"
                              : "rgba(252, 163, 17, 0.05)",
                          border: `1px solid ${
                            theme.palette.mode === "dark"
                              ? "rgba(252, 163, 17, 0.2)"
                              : "rgba(252, 163, 17, 0.1)"
                          }`,
                          transform: "translateY(-1px)",
                        },
                      }}
                    >
                      {category.name.split(" ")[0]}
                    </Button>
                  );
                })}

                {/* Dark Mode Toggle */}
                <IconButton
                  onClick={toggleDarkMode}
                  sx={{
                    ml: 2,
                    p: 1.5,
                    color: theme.palette.text.secondary,
                    backgroundColor:
                      theme.palette.mode === "dark"
                        ? "rgba(252, 163, 17, 0.1)"
                        : "rgba(20, 33, 61, 0.05)",
                    border: `1px solid ${
                      theme.palette.mode === "dark"
                        ? "rgba(252, 163, 17, 0.2)"
                        : "rgba(20, 33, 61, 0.1)"
                    }`,
                    borderRadius: 2,
                    transition: "all 0.2s ease-in-out",
                    "&:hover": {
                      color: theme.palette.primary.main,
                      backgroundColor:
                        theme.palette.mode === "dark"
                          ? "rgba(252, 163, 17, 0.2)"
                          : "rgba(252, 163, 17, 0.1)",
                      border: `1px solid ${theme.palette.primary.main}`,
                      transform: "scale(1.05)",
                    },
                  }}
                >
                  {darkMode ? <FaSun size={18} /> : <FaMoon size={18} />}
                </IconButton>
              </Box>
            )}

            {/* Mobile Menu Button and Dark Mode Toggle */}
            {isMobile && (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  ml: "auto",
                  gap: 1,
                }}
              >
                <IconButton
                  onClick={toggleDarkMode}
                  sx={{
                    p: 1.5,
                    color: theme.palette.text.secondary,
                    backgroundColor:
                      theme.palette.mode === "dark"
                        ? "rgba(252, 163, 17, 0.1)"
                        : "rgba(20, 33, 61, 0.05)",
                    border: `1px solid ${
                      theme.palette.mode === "dark"
                        ? "rgba(252, 163, 17, 0.2)"
                        : "rgba(20, 33, 61, 0.1)"
                    }`,
                    borderRadius: 2,
                    "&:hover": {
                      color: theme.palette.primary.main,
                      backgroundColor:
                        theme.palette.mode === "dark"
                          ? "rgba(252, 163, 17, 0.2)"
                          : "rgba(252, 163, 17, 0.1)",
                      border: `1px solid ${theme.palette.primary.main}`,
                    },
                  }}
                >
                  {darkMode ? <FaSun size={18} /> : <FaMoon size={18} />}
                </IconButton>
                <IconButton
                  onClick={handleDrawerToggle}
                  sx={{
                    ml: 1,
                    p: 1.5,
                    color: theme.palette.text.primary,
                    backgroundColor:
                      theme.palette.mode === "dark"
                        ? "rgba(255, 255, 255, 0.05)"
                        : "rgba(0, 0, 0, 0.03)",
                    border: `1px solid ${theme.palette.divider}`,
                    borderRadius: 2,
                    "&:hover": {
                      backgroundColor:
                        theme.palette.mode === "dark"
                          ? "rgba(255, 255, 255, 0.1)"
                          : "rgba(0, 0, 0, 0.05)",
                      border: `1px solid ${theme.palette.text.secondary}`,
                    },
                  }}
                >
                  <FaBars size={16} />
                </IconButton>
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        PaperProps={{
          sx: {
            backgroundColor:
              theme.palette.mode === "dark"
                ? "rgba(20, 33, 61, 0.95)"
                : "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(20px)",
            borderLeft: `1px solid ${theme.palette.divider}`,
          },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
}
