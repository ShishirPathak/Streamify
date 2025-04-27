import React, { useContext } from 'react';
import {
  Box,
  Typography,
  Grid,
  Link,
  Divider,
  IconButton,
  Stack
} from '@mui/material';
import { GitHub, LinkedIn, YouTube, Twitter } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Footer = () => {
  const { userDetails } = useContext(AuthContext);

  return (
    <Box
      sx={{
        background: 'linear-gradient(to right, #1e3a8a, #1e40af)',
        color: '#e2e8f0',
        px: { xs: 3, md: 10 },
        pt: 6,
        pb: 3,
        mt: 6,
      }}
    >
      <Grid container spacing={4} alignItems="flex-start">
        {/* Brand Info */}
        <Grid item xs={12} md={userDetails ? 4 : 6}>
          <Typography variant="h5" fontWeight="bold" color="#fff">
            Streamify
          </Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            Elevate your video strategy with engagement analytics that matter.
          </Typography>

          <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
            <IconButton color="inherit" size="small" href="https://github.com" target="_blank">
              <GitHub />
            </IconButton>
            <IconButton color="inherit" size="small" href="https://linkedin.com" target="_blank">
              <LinkedIn />
            </IconButton>
            <IconButton color="inherit" size="small" href="https://twitter.com" target="_blank">
              <Twitter />
            </IconButton>
            <IconButton color="inherit" size="small" href="https://youtube.com" target="_blank">
              <YouTube />
            </IconButton>
          </Stack>
        </Grid>

        {/* Navigation - only visible when logged in */}
        {userDetails && (
          <Grid item xs={12} md={4}>
            <Typography variant="h6" fontWeight="bold" color="#facc15">
              Navigation
            </Typography>
            <Stack spacing={1} sx={{ mt: 1 }}>
              <Link component={RouterLink} to="/dashboard" underline="hover" color="inherit">
                Dashboard
              </Link>
              <Link component={RouterLink} to="/my-videos" underline="hover" color="inherit">
                My Videos
              </Link>
              <Link component={RouterLink} to="/upload-videos" underline="hover" color="inherit">
                Upload
              </Link>
              <Link component={RouterLink} to="/myprofile" underline="hover" color="inherit">
                Profile
              </Link>
            </Stack>
          </Grid>
        )}

        {/* Contact Info */}
        <Grid item xs={12} md={userDetails ? 4 : 6}>
          <Typography variant="h6" fontWeight="bold" color="#facc15">
            Contact
          </Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            📧 support@streamify.ai
          </Typography>
          <Typography variant="body2">
            📍 North Dartmouth, USA
          </Typography>
        </Grid>
      </Grid>

      <Divider sx={{ my: 4, borderColor: 'rgba(255,255,255,0.15)' }} />

      <Typography variant="body2" align="center" sx={{ color: '#cbd5e1' }}>
        © {new Date().getFullYear()} Streamify. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
