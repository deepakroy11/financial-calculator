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

export default function Footer() {
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
      className="mt-16 bg-white/80 backdrop-blur-sm border-t border-gray-200"
    >
      <Container maxWidth="lg" className="py-8">
        {/* Main Content */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          {/* Developer Credit */}
          <div className="flex items-center space-x-3">
            <Typography variant="body2" className="text-gray-600">
              Developed with
            </Typography>
            <FaHeart className="text-red-500" size={14} />
            <Typography variant="body2" className="text-gray-600">
              by
            </Typography>
            <Link
              href="https://deepakroy.dev"
              target="_blank"
              className="text-blue-600 hover:text-blue-800 font-semibold transition-colors"
            >
              Deepak Roy
            </Link>
          </div>

          {/* Tech Stack */}
          <div className="flex items-center space-x-4">
            <Typography variant="body2" className="text-gray-500 mr-2">
              Built with:
            </Typography>
            <div className="flex items-center space-x-3">
              {techStack.map((tech) => {
                const IconComponent = tech.icon;
                return (
                  <div key={tech.name} className="flex items-center space-x-1">
                    <IconComponent size={16} className="text-gray-600" />
                    <Typography
                      variant="caption"
                      className="text-gray-600 hidden sm:block"
                    >
                      {tech.name}
                    </Typography>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Social Links */}
          <div className="flex items-center space-x-4">
            <Link
              href="https://github.com/deepakroy11"
              target="_blank"
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <FaGithub size={18} />
            </Link>
            <Link
              href="https://linkedin.com/in/deepakroy11"
              target="_blank"
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <FaLinkedin size={18} />
            </Link>
            <Link
              href="https://deepakroy.dev"
              target="_blank"
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <FaGlobe size={18} />
            </Link>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center mt-6 pt-4 border-t border-gray-100">
          <Typography variant="caption" className="text-gray-400">
            © {new Date().getFullYear()} Indian Finance Calculator. All rights
            reserved.
          </Typography>
        </div>
      </Container>
    </Box>
  );
}
