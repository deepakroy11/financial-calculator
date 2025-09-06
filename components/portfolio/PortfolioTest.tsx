"use client";

import { useState } from "react";
import { Box, Button, Typography, Container } from "@mui/material";
import Portfolio from "./Portfolio";

export default function PortfolioTest() {
  const [showPortfolio, setShowPortfolio] = useState(false);

  if (showPortfolio) {
    return <Portfolio />;
  }

  return (
    <Container maxWidth="md" sx={{ py: 8, textAlign: "center" }}>
      <Typography variant="h3" sx={{ mb: 4, fontWeight: 700 }}>
        Portfolio Management System
      </Typography>

      <Typography variant="h6" sx={{ mb: 4, color: "text.secondary" }}>
        Test the new portfolio features
      </Typography>

      <Box
        sx={{
          display: "flex",
          gap: 2,
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        <Button
          variant="contained"
          size="large"
          onClick={() => setShowPortfolio(true)}
          sx={{ px: 4, py: 2, borderRadius: 3 }}
        >
          Open Portfolio Dashboard
        </Button>
      </Box>

      <Box
        sx={{
          mt: 6,
          p: 3,
          backgroundColor: "background.paper",
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" sx={{ mb: 2 }}>
          ✅ Features Implemented:
        </Typography>
        <Typography variant="body1" sx={{ textAlign: "left", lineHeight: 2 }}>
          • Fixed input box zero issue - no more stuck zeros
          <br />
          • Added number-to-words display for amounts
          <br />
          • Updated navigation with Calculators and Portfolio menus
          <br />
          • Added delete confirmation modal
          <br />
          • Integrated Material-UI date picker
          <br />
          • Responsive design for all screen sizes
          <br />
          • Sample data for immediate testing
          <br />
        </Typography>
      </Box>
    </Container>
  );
}
