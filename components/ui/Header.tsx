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
  FaCalculator,
  FaChartLine,
  FaCoins,
  FaPiggyBank,
  FaBriefcase,
  FaBars,
  FaHome,
} from "react-icons/fa";

interface HeaderProps {
  onCategorySelect?: (categoryId: string) => void;
  onHomeClick?: () => void;
}

const categories = [
  { id: "loans", name: "Loans & Mortgages", icon: FaHome, color: "#2563eb" },
  {
    id: "investments",
    name: "Investments",
    icon: FaChartLine,
    color: "#059669",
  },
  { id: "taxes", name: "Tax Planning", icon: FaCoins, color: "#dc2626" },
  {
    id: "savings",
    name: "Savings & Goals",
    icon: FaPiggyBank,
    color: "#7c3aed",
  },
  {
    id: "business",
    name: "Business Tools",
    icon: FaBriefcase,
    color: "#ea580c",
  },
];

export default function Header({ onCategorySelect, onHomeClick }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
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
      <Box className="p-4 border-b border-gray-200">
        <Typography variant="h6" className="font-bold text-gray-800">
          Calculator Categories
        </Typography>
      </Box>
      <List>
        {categories.map((category) => {
          const IconComponent = category.icon;
          return (
            <ListItem
              key={category.id}
              onClick={() => handleCategorySelect(category.id)}
              className="cursor-pointer hover:bg-gray-50 transition-colors"
            >
              <ListItemIcon>
                <Box
                  className="p-2 rounded-lg"
                  sx={{
                    backgroundColor: `${category.color}20`,
                    color: category.color,
                  }}
                >
                  <IconComponent size={20} />
                </Box>
              </ListItemIcon>
              <ListItemText
                primary={category.name}
                primaryTypographyProps={{
                  className: "font-medium text-gray-800",
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
          backgroundColor: "white",
          borderBottom: "1px solid #e5e7eb",
        }}
      >
        <Container maxWidth="lg">
          <Toolbar className="px-0">
            {/* Logo/Brand */}
            <Box
              className="flex items-center cursor-pointer"
              onClick={onHomeClick}
            >
              <Box className="mr-3 p-2 rounded-lg bg-blue-600 text-white">
                <FaCalculator size={24} />
              </Box>
              <Box>
                <Typography
                  variant="h6"
                  className="font-bold text-gray-800 leading-tight"
                >
                  Finly
                </Typography>
                <Typography
                  variant="caption"
                  className="text-gray-500 leading-tight"
                >
                  A Finance Tools
                </Typography>
              </Box>
            </Box>

            {/* Desktop Navigation */}
            {!isMobile && (
              <Box className="flex items-center ml-auto space-x-1 ml-8">
                {categories.map((category) => {
                  const IconComponent = category.icon;
                  return (
                    <Button
                      key={category.id}
                      onClick={() => handleCategorySelect(category.id)}
                      className="text-gray-700 hover:text-blue-600 hover:bg-blue-50 normal-case font-medium px-4 py-2 rounded-lg"
                      startIcon={<IconComponent size={16} />}
                    >
                      {category.name.split(" ")[0]}
                    </Button>
                  );
                })}
              </Box>
            )}

            {/* Mobile Menu Button */}
            {isMobile && (
              <IconButton
                onClick={handleDrawerToggle}
                className="text-gray-700"
              >
                <FaBars />
              </IconButton>
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
