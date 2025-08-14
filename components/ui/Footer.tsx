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
        mt: 8,
        backgroundColor: theme.palette.background.paper,
        backdropFilter: "blur(10px)",
        borderTop: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Container maxWidth="lg" className="py-8">
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
          {/* Developer Credit */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography variant="body2" color="text.secondary">
              Developed with
            </Typography>
            <FaHeart style={{ color: theme.palette.error.main }} size={14} />
            <Typography variant="body2" color="text.secondary">
              by
            </Typography>
            <Link
              href="https://deepakroy.dev"
              target="_blank"
              sx={{
                color: theme.palette.primary.main,
                fontWeight: 600,
                textDecoration: "none",
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

          {/* Tech Stack */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Typography variant="body2" color="text.secondary">
              Built with:
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              {techStack.map((tech) => {
                const IconComponent = tech.icon;
                return (
                  <Box
                    key={tech.name}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 0.5,
                      transition: "all 0.2s ease-in-out",
                      "&:hover": {
                        color: theme.palette.primary.main,
                        transform: "translateY(-1px)",
                      },
                    }}
                  >
                    <IconComponent
                      size={16}
                      style={{ color: theme.palette.text.secondary }}
                    />
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ display: { xs: "none", sm: "block" } }}
                    >
                      {tech.name}
                    </Typography>
                  </Box>
                );
              })}
            </Box>
          </Box>

          {/* Social Links */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Link
              href="https://github.com/deepakroy11"
              target="_blank"
              sx={{
                color: theme.palette.text.secondary,
                transition: "all 0.2s ease-in-out",
                "&:hover": {
                  color: theme.palette.primary.main,
                  transform: "translateY(-2px)",
                },
              }}
            >
              <FaGithub size={18} />
            </Link>
            <Link
              href="https://linkedin.com/in/deepakroy11"
              target="_blank"
              sx={{
                color: theme.palette.text.secondary,
                transition: "all 0.2s ease-in-out",
                "&:hover": {
                  color: theme.palette.primary.main,
                  transform: "translateY(-2px)",
                },
              }}
            >
              <FaLinkedin size={18} />
            </Link>
            <Link
              href="https://deepakroy.dev"
              target="_blank"
              sx={{
                color: theme.palette.text.secondary,
                transition: "all 0.2s ease-in-out",
                "&:hover": {
                  color: theme.palette.primary.main,
                  transform: "translateY(-2px)",
                },
              }}
            >
              <FaGlobe size={18} />
            </Link>
          </Box>
        </Box>

        {/* Copyright */}
        <Box
          sx={{
            textAlign: "center",
            mt: 4,
            pt: 3,
            borderTop: `1px solid ${theme.palette.divider}`,
          }}
        >
          <Typography variant="caption" color="text.secondary">
            © {new Date().getFullYear()} Finly - Indian Finance Calculator. All
            rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
