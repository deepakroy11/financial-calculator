"use client";

import { Box, Container, Typography, Link, Divider } from "@mui/material";
import { FaGithub, FaLinkedin, FaGlobe, FaHeart } from "react-icons/fa";
import {
  SiNextdotjs,
  SiReact,
  SiTailwindcss,
  SiMui,
  SiTypescript,
} from "react-icons/si";

import { useTheme } from "@mui/material/styles";

export default function Footer() {
  const theme = useTheme();
  const techStack = [
    { name: "Next.js", icon: SiNextdotjs },
    { name: "React", icon: SiReact },
    { name: "TypeScript", icon: SiTypescript },
    { name: "Tailwind", icon: SiTailwindcss },
    { name: "Material UI", icon: SiMui },
  ];

  return (
    <Box
      component="footer"
      sx={{
        mt: 12,
        backgroundColor: theme.palette.mode === "dark" 
          ? "rgba(30, 41, 59, 0.8)" 
          : "rgba(255, 255, 255, 0.8)",
        backdropFilter: "blur(20px)",
        borderTop: `1px solid ${theme.palette.divider}`,
        position: "relative",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "1px",
          background: `linear-gradient(90deg, transparent 0%, ${theme.palette.primary.main}40 50%, transparent 100%)`,
        },
      }}
    >
      <Container maxWidth="lg" sx={{ py: 6 }}>
        {/* Main Content */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            alignItems: "center",
            gap: { xs: 3, md: 0 },
          }}
        >
          {/* Brand & Developer Credit */}
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: { xs: "center", md: "flex-start" }, gap: 1 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}>
              <img
                src="/logo/new-logo-2.png"
                alt="Finly Logo"
                style={{ height: "24px", width: "auto" }}
              />
              <Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.875rem" }}>
                Professional Financial Tools
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.8rem" }}>
                Crafted with
              </Typography>
              <FaHeart style={{ color: theme.palette.error.main }} size={12} />
              <Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.8rem" }}>
                by
              </Typography>
              <Link
                href="https://deepakroy.dev"
                target="_blank"
                sx={{
                  color: theme.palette.primary.main,
                  fontWeight: 600,
                  textDecoration: "none",
                  fontSize: "0.8rem",
                  transition: "all 0.2s ease-in-out",
                  "&:hover": {
                    color: theme.palette.primary.dark,
                    textDecoration: "underline",
                  },
                }}
              >
                Deepak Roy
              </Link>
            </Box>
          </Box>

          {/* Tech Stack */}
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
            <Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.8rem", fontWeight: 500 }}>
              Powered by Modern Technologies
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
              {techStack.map((tech) => {
                const IconComponent = tech.icon;
                return (
                  <Box
                    key={tech.name}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 0.5,
                      p: 1,
                      borderRadius: 2,
                      transition: "all 0.2s ease-in-out",
                      "&:hover": {
                        backgroundColor: theme.palette.mode === "dark" 
                          ? "rgba(252, 163, 17, 0.1)" 
                          : "rgba(252, 163, 17, 0.05)",
                        transform: "translateY(-2px)",
                      },
                    }}
                  >
                    <IconComponent
                      size={18}
                      style={{ color: theme.palette.text.secondary }}
                    />
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ 
                        display: { xs: "none", sm: "block" },
                        fontSize: "0.7rem",
                        fontWeight: 500,
                      }}
                    >
                      {tech.name}
                    </Typography>
                  </Box>
                );
              })}
            </Box>
          </Box>

          {/* Social Links */}
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: { xs: "center", md: "flex-end" }, gap: 2 }}>
            <Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.8rem", fontWeight: 500 }}>
              Connect & Follow
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Link
                href="https://github.com/deepakroy11"
                target="_blank"
                sx={{
                  p: 1.5,
                  borderRadius: 2,
                  backgroundColor: theme.palette.mode === "dark" 
                    ? "rgba(255, 255, 255, 0.05)" 
                    : "rgba(0, 0, 0, 0.03)",
                  color: theme.palette.text.secondary,
                  transition: "all 0.2s ease-in-out",
                  "&:hover": {
                    color: theme.palette.primary.main,
                    backgroundColor: theme.palette.mode === "dark" 
                      ? "rgba(252, 163, 17, 0.1)" 
                      : "rgba(252, 163, 17, 0.05)",
                    transform: "translateY(-2px)",
                  },
                }}
              >
                <FaGithub size={16} />
              </Link>
              <Link
                href="https://linkedin.com/in/deepakroy11"
                target="_blank"
                sx={{
                  p: 1.5,
                  borderRadius: 2,
                  backgroundColor: theme.palette.mode === "dark" 
                    ? "rgba(255, 255, 255, 0.05)" 
                    : "rgba(0, 0, 0, 0.03)",
                  color: theme.palette.text.secondary,
                  transition: "all 0.2s ease-in-out",
                  "&:hover": {
                    color: theme.palette.primary.main,
                    backgroundColor: theme.palette.mode === "dark" 
                      ? "rgba(252, 163, 17, 0.1)" 
                      : "rgba(252, 163, 17, 0.05)",
                    transform: "translateY(-2px)",
                  },
                }}
              >
                <FaLinkedin size={16} />
              </Link>
              <Link
                href="https://deepakroy.dev"
                target="_blank"
                sx={{
                  p: 1.5,
                  borderRadius: 2,
                  backgroundColor: theme.palette.mode === "dark" 
                    ? "rgba(255, 255, 255, 0.05)" 
                    : "rgba(0, 0, 0, 0.03)",
                  color: theme.palette.text.secondary,
                  transition: "all 0.2s ease-in-out",
                  "&:hover": {
                    color: theme.palette.primary.main,
                    backgroundColor: theme.palette.mode === "dark" 
                      ? "rgba(252, 163, 17, 0.1)" 
                      : "rgba(252, 163, 17, 0.05)",
                    transform: "translateY(-2px)",
                  },
                }}
              >
                <FaGlobe size={16} />
              </Link>
            </Box>
          </Box>
        </Box>

        {/* Copyright */}
        <Box
          sx={{
            textAlign: "center",
            mt: 5,
            pt: 4,
            borderTop: `1px solid ${theme.palette.divider}`,
            position: "relative",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: "50%",
              transform: "translateX(-50%)",
              width: "100px",
              height: "1px",
              background: `linear-gradient(90deg, transparent 0%, ${theme.palette.primary.main} 50%, transparent 100%)`,
            },
          }}
        >
          <Typography 
            variant="caption" 
            color="text.secondary"
            sx={{ 
              fontSize: "0.75rem",
              letterSpacing: "0.5px",
            }}
          >
            © {new Date().getFullYear()} Finly - Professional Indian Finance Calculator Suite. All rights reserved.
          </Typography>
          <Typography 
            variant="caption" 
            color="text.secondary"
            sx={{ 
              display: "block",
              mt: 1,
              fontSize: "0.7rem",
              opacity: 0.7,
            }}
          >
            Empowering financial decisions with precision and trust.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
