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
  Menu,
  MenuItem,
  Collapse,
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
  FaCalculator,
  FaPlus,
  FaChartBar,
  FaChevronDown,
} from "react-icons/fa";
import { useThemeMode } from "../../app/theme";

interface HeaderProps {
  onCategorySelect?: (categoryId: string) => void;
  onHomeClick?: () => void;
}

const mainMenus = [
  {
    id: "calculators",
    name: "Calculators",
    icon: FaCalculator,
    color: "#1f7a99",
    submenus: [
      {
        id: "loans",
        name: "Loans & Mortgages",
        icon: FaHome,
        color: "#1f7a99",
      },
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
    ],
  },
  {
    id: "portfolio",
    name: "Portfolio",
    icon: FaChartLine,
    color: "#8b5cf6",
    submenus: [
      {
        id: "portfolio",
        name: "Portfolio Dashboard",
        icon: FaChartLine,
        color: "#8b5cf6",
      },
      {
        id: "portfolio-add",
        name: "Add Assets",
        icon: FaPlus,
        color: "#10b981",
      },
      {
        id: "portfolio-reports",
        name: "Reports & Analytics",
        icon: FaChartBar,
        color: "#f59e0b",
      },
    ],
  },
];

export default function Header({ onCategorySelect, onHomeClick }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const [mobileSubmenuOpen, setMobileSubmenuOpen] = useState<{
    [key: string]: boolean;
  }>({});
  const theme = useTheme();
  const { darkMode, toggleDarkMode } = useThemeMode();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleCategorySelect = (categoryId: string) => {
    onCategorySelect?.(categoryId);
    setMobileOpen(false);
    setAnchorEl(null);
    setOpenSubmenu(null);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMenuClick = (
    event: React.MouseEvent<HTMLElement>,
    menuId: string
  ) => {
    event.preventDefault();
    event.stopPropagation();

    if (menuId === "portfolio") {
      // Direct navigation to portfolio
      handleCategorySelect("portfolio");
    } else {
      // Show submenu for calculators
      setAnchorEl(event.currentTarget);
      setOpenSubmenu(menuId);
    }
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setOpenSubmenu(null);
  };

  const toggleMobileSubmenu = (menuId: string) => {
    setMobileSubmenuOpen((prev) => ({
      ...prev,
      [menuId]: !prev[menuId],
    }));
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
        {mainMenus.map((menu) => {
          const IconComponent = menu.icon;
          return (
            <Box key={menu.id}>
              <ListItem
                onClick={() =>
                  menu.id === "portfolio"
                    ? handleCategorySelect("portfolio")
                    : toggleMobileSubmenu(menu.id)
                }
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
                      backgroundColor: `${menu.color}20`,
                      color: menu.color,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <IconComponent size={20} />
                  </Box>
                </ListItemIcon>
                <ListItemText
                  primary={menu.name}
                  primaryTypographyProps={{
                    sx: {
                      fontWeight: 500,
                      color: theme.palette.text.primary,
                    },
                  }}
                />
                {menu.id === "calculators" && (
                  <FaChevronDown
                    size={12}
                    style={{
                      transform: mobileSubmenuOpen[menu.id]
                        ? "rotate(180deg)"
                        : "rotate(0deg)",
                      transition: "transform 0.2s ease-in-out",
                    }}
                  />
                )}
              </ListItem>

              {/* Submenu for mobile */}
              {menu.id === "calculators" && (
                <Collapse
                  in={mobileSubmenuOpen[menu.id]}
                  timeout="auto"
                  unmountOnExit
                >
                  <List sx={{ pl: 2 }}>
                    {menu.submenus.map((submenu) => {
                      const SubmenuIcon = submenu.icon;
                      return (
                        <ListItem
                          key={submenu.id}
                          onClick={() => handleCategorySelect(submenu.id)}
                          sx={{
                            cursor: "pointer",
                            borderRadius: 2,
                            mx: 1,
                            mb: 0.5,
                            py: 1,
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
                          <ListItemIcon sx={{ minWidth: 36 }}>
                            <Box
                              sx={{
                                p: 1,
                                borderRadius: 1,
                                backgroundColor: `${submenu.color}15`,
                                color: submenu.color,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              <SubmenuIcon size={16} />
                            </Box>
                          </ListItemIcon>
                          <ListItemText
                            primary={submenu.name}
                            primaryTypographyProps={{
                              sx: {
                                fontWeight: 400,
                                fontSize: "0.875rem",
                                color: theme.palette.text.secondary,
                              },
                            }}
                          />
                        </ListItem>
                      );
                    })}
                  </List>
                </Collapse>
              )}
            </Box>
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
          <Toolbar
            sx={{
              px: 0,
              py: { xs: 1, sm: 1.5 },
              minHeight: { xs: "60px", sm: "72px" },
            }}
          >
            {/* Logo/Brand */}
            <Typography
              onClick={onHomeClick}
              variant="h4"
              component="a"
              href="/"
              sx={{
                fontWeight: 700,
                color: "text.primary",
                fontSize: "2rem",
                cursor: "pointer",
                textDecoration: "none",
              }}
            >
              Finly
            </Typography>

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
                {mainMenus.map((menu) => {
                  const IconComponent = menu.icon;
                  return (
                    <Button
                      key={menu.id}
                      onClick={(e) => handleMenuClick(e, menu.id)}
                      startIcon={<IconComponent size={16} />}
                      endIcon={
                        menu.id === "calculators" ? (
                          <FaChevronDown size={12} />
                        ) : undefined
                      }
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
                      {menu.name}
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
        disableScrollLock={true}
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

      {/* Desktop Dropdown Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl) && openSubmenu === "calculators"}
        onClose={handleMenuClose}
        disableScrollLock={true}
        PaperProps={{
          sx: {
            mt: 1,
            minWidth: 250,
            backgroundColor:
              theme.palette.mode === "dark"
                ? "rgba(20, 33, 61, 0.95)"
                : "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(20px)",
            border: `1px solid ${theme.palette.divider}`,
            borderRadius: 2,
            boxShadow:
              theme.palette.mode === "dark"
                ? "0 8px 32px rgba(0, 0, 0, 0.3)"
                : "0 8px 32px rgba(0, 0, 0, 0.1)",
          },
        }}
        MenuListProps={{
          sx: {
            py: 1,
          },
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        {mainMenus
          .find((menu) => menu.id === "calculators")
          ?.submenus.map((submenu) => {
            const SubmenuIcon = submenu.icon;
            return (
              <MenuItem
                key={submenu.id}
                onClick={() => handleCategorySelect(submenu.id)}
                sx={{
                  py: 1.5,
                  px: 2,
                  borderRadius: 1,
                  mx: 1,
                  mb: 0.5,
                  transition: "all 0.2s ease-in-out",
                  "&:hover": {
                    backgroundColor:
                      theme.palette.mode === "dark"
                        ? "rgba(252, 163, 17, 0.1)"
                        : "rgba(252, 163, 17, 0.05)",
                    transform: "translateX(4px)",
                  },
                }}
              >
                <Box
                  sx={{
                    p: 1,
                    borderRadius: 1,
                    backgroundColor: `${submenu.color}15`,
                    color: submenu.color,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mr: 2,
                  }}
                >
                  <SubmenuIcon size={16} />
                </Box>
                <Typography
                  sx={{
                    fontWeight: 500,
                    color: theme.palette.text.primary,
                  }}
                >
                  {submenu.name}
                </Typography>
              </MenuItem>
            );
          })}
      </Menu>
    </>
  );
}
