import * as React from "react";
import { useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { getAuth, signOut } from "firebase/auth";
import { NavLink, Navigate, useNavigate } from "react-router-dom";

const settings = [
  { name: "My Profile", path: "/myprofile" },
  { name: "Logout", path: "/signout" },
];

function ResponsiveAppBar() {
  const navigate = useNavigate();
  const { user, userDetails } = useContext(AuthContext);
  console.log("ResponsiveAppBar-userDetails", userDetails?.firstName);
  console.log("ResponsiveAppBar uid: " + user?.uid);

  const handleSignOut = async () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        console.log("SignOut Success");
        console.log("User", user);
        navigate("/signin"); // Redirect to sign-in page after signing out
      })
      .catch((error) => {
        // An error happened.
        console.error("Error signing out: ", error);
      });
  };

  const pages = [
    { name: "Home", path: "/" },
    ...(user
      ? [
          { name: "My Videos", path: "/my-videos" },
          { name: "Upload Videos", path: "/upload-videos" },
          // { name: "SignOut", path: "/signout", action: handleSignOut }, // Add SignOut
        ]
      : [{ name: "Sign in", path: "/signin" }]),
  ];

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleSettingUserMenu = (setting) => {
    // console.log("setting", setting);

    // setAnchorElUser(null);

    console.log(setting);
    if (setting === "My Profile") {
      // console.log("setting", setting);
      navigate("/dashboard"); // Adjust to your profile route
    } else if (setting === "Logout") {
      console.log("setting", setting);

      handleSignOut(); // Call your logout function
    }
  };
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <PlayArrowIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to={"./dashboard"}
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            STREAMIFY
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {pages.map(({ name, path, action }) => (
                <MenuItem
                  key={name}
                  onClick={() => {
                    handleCloseNavMenu();
                    if (action) action(); // Execute action if defined
                  }}
                  component={Link} // Use div for actions
                  to={action ? undefined : path} // No path for actions
                >
                  <Typography sx={{ textAlign: "center" }}>{name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <PlayArrowIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component={Link}
            to={"./"}
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            STREAMIFY
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map(({ name, path, action }) => (
              <MenuItem
                key={name}
                onClick={() => {
                  handleCloseNavMenu();
                  if (action) action(); // Execute action if defined
                }}
                component={action ? "div" : Link}
                to={action ? undefined : path}
              >
                <Typography sx={{ textAlign: "center" }}>{name}</Typography>
              </MenuItem>
            ))}
          </Box>
          {user && (
            <Box sx={{ flexGrow: 0 }}>
              <Chip
                label={`Logged in user: ${userDetails?.userId}`}
                color="purple"
                variant="outlined"
                sx={{ color: "white" }}
              />
              <Tooltip sx={{ ml: "12px" }} title="Open settings">
                <IconButton
                  onClick={handleOpenUserMenu}
                  sx={{ p: 0, ml: "12px" }}
                >
                  <Avatar alt="Remy Sharp" src={userDetails?.profileImageUrl} />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map(({ name, path }) => (
                  <MenuItem key={name} onClick={handleCloseUserMenu}>
                    <Typography
                      component={Link}
                      to={path}
                      sx={{ textAlign: "center", textDecoration: "none" }}
                    >
                      {name}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
