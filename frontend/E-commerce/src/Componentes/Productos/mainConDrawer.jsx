import { styled } from "@mui/material/styles";
import Drawer from "@mui/material/Drawer";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

export const drawerWidth = 340;

export const Main = styled("main", {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: open ? 0 : `-${drawerWidth}px`,
  [theme.breakpoints.down("sm")]: {
    marginLeft: 0,
  },
}));

export const CustomDrawer = ({ children, open, setOpen }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery("(max-width:650px)");
  const handleOnClose = () => {
    if (isMobile) {
      setOpen(false );
    }
  }

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          top: isMobile ? 0 : "200px",
          overflowY: "auto",
          border: "none",
          ml: isMobile ? 0 : 5,
          height: isMobile ? "100%" : "auto",
        },
      }}
      variant={isMobile ? "temporary" : "persistent"}
      anchor="left"
      open={open}
      onClose={() => {handleOnClose()}}
    >
      {children}
    </Drawer>
  );
};
