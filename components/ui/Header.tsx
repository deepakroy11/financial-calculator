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
              ? "linear-gradient(135deg, #1e293b 0%, #334155 100%)"
              : "linear-gradient(135deg, #f8fafc 0%, #ffffff 100%)",
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
              ? "linear-gradient(135deg, #1e293b 0%, #334155 100%)"
              : "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
          backdropFilter: "blur(10px)",
          borderBottom: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Container maxWidth="lg">
          <Toolbar sx={{ px: 0, py: 1 }}>
            {/* Logo/Brand */}
            <Box
              onClick={onHomeClick}
              sx={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
                transition: "transform 0.2s ease-in-out",
                "&:hover": {
                  transform: "scale(1.05)",
                },
              }}
            >
              <Box sx={{ mr: 2, display: "flex", alignItems: "center" }}>
                <img
                  src="/logo/new-logo-2.png"
                  alt="Finly Logo"
                  style={{ height: "40px", width: "auto" }}
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
                        px: 2,
                        py: 1,
                        borderRadius: 2,
                        textTransform: "none",
                        transition: "all 0.2s ease-in-out",
                        "&:hover": {
                          color: theme.palette.primary.main,
                          backgroundColor:
                            theme.palette.mode === "dark"
                              ? "rgba(31, 122, 153, 0.1)"
                              : "rgba(31, 122, 153, 0.05)",
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
                    ml: 1,
                    color: theme.palette.text.secondary,
                    transition: "all 0.2s ease-in-out",
                    "&:hover": {
                      color: theme.palette.primary.main,
                      backgroundColor:
                        theme.palette.mode === "dark"
                          ? "rgba(31, 122, 153, 0.1)"
                          : "rgba(31, 122, 153, 0.05)",
                      transform: "scale(1.1)",
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
                    color: theme.palette.text.secondary,
                    "&:hover": {
                      color: theme.palette.primary.main,
                      backgroundColor:
                        theme.palette.mode === "dark"
                          ? "rgba(31, 122, 153, 0.1)"
                          : "rgba(31, 122, 153, 0.05)",
                    },
                  }}
                >
                  {darkMode ? <FaSun size={18} /> : <FaMoon size={18} />}
                </IconButton>
                <IconButton
                  onClick={handleDrawerToggle}
                  sx={{
                    color: theme.palette.text.primary,
                    "&:hover": {
                      backgroundColor:
                        theme.palette.mode === "dark"
                          ? "rgba(255, 255, 255, 0.1)"
                          : "rgba(0, 0, 0, 0.05)",
                    },
                  }}
                >
                  <FaBars />
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
      >
        {drawer}
      </Drawer>
    </>
  );
}
