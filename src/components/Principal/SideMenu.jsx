import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { MdOutdoorGrill } from "react-icons/md";
import { FaTrello, FaUserPlus, FaUsers, FaBars, FaUser } from "react-icons/fa";
import { FaKitchenSet } from "react-icons/fa6";
import { MdBorderColor, MdOutlineMenuBook } from "react-icons/md";
import { ImExit } from "react-icons/im";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { MdDeliveryDining } from "react-icons/md";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),

  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function MiniDrawer() {
  const navegar = useNavigate();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleExit = (opc) => {
    console.log(opc);
    Swal.fire({
      title: "¿Esta seguro de Salir?",
      text: "Seleccione una opcion",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Salir",
    })
      .then((result) => {
        if (result.isConfirmed) {
          localStorage.removeItem("Usuario");
          navegar("/");
        } else {
          navegar("/inicio/usuario");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const opciones = [
    { text: "Usuario", path: "/inicio/usuario" },
    { text: "Panel", path: "/inicio/panel" },
    { text: "Agregar usuario", path: "/inicio/agregarusuarios" },
    { text: "Empleados", path: "/inicio/empleados" },
    { text: "Sucursal", path: "/inicio/ordenes" },
    { text: "A domicilio", path: "/inicio/envios" },
    { text: "Pedidos", path: "/inicio/pedidos" },
    { text: "Menu digital", path: "/inicio/menudigital" },
    { text: "" },
  ];
  return (
    <>
      <Box sx={{ display: "flex", backgroundColor: "#100b0bf7 " }}>
        <CssBaseline sx={{ backgroundColor: "#100b0bf7 " }} />
        <AppBar
          position="fixed"
          open={open}
          sx={{ backgroundColor: "#100b0bf7 " }}
        >
          <Toolbar style={{ backgroundColor: "#100b0bf7" }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: 5,
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              ARDON <MdOutdoorGrill size={35} />
            </Typography>
          </Toolbar>
        </AppBar>

        <Drawer
          variant="permanent"
          open={open}
          sx={{ backgroundColor: "#100b0bf7 " }}
        >
          <DrawerHeader style={{ color: "white" }}>
            <IconButton onClick={handleDrawerClose} style={{ color: "white" }}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </DrawerHeader>

          <List sx={{ backgroundColor: "#100b0bf7" }} className="mt-4">
            {opciones.map((opcion, index) => (
              <ListItem
                key={opcion.text}
                disablePadding
                sx={{ display: "block", marginLeft: "0px" }}
                as={Link}
                to={opcion.path}
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                      color: "white",
                    }}
                  >
                    <Link
                      to={opcion.path}
                      style={{
                        textDecoration: "none",
                        backgroundColor: "#100b0bf7",
                        color: "white",
                      }}
                      variant="dark"
                    >
                      {index % 9 === 0 ? (
                        <FaUser size={25} />
                      ) : index % 9 === 1 ? (
                        <FaTrello size={25} />
                      ) : index % 9 === 2 ? (
                        <FaUserPlus size={25} />
                      ) : index % 9 === 3 ? (
                        <FaUsers size={25} />
                      ) : index % 9 === 4 ? (
                        <FaKitchenSet size={25} />
                      ) : index % 9 === 5 ? (
                        <MdDeliveryDining size={25} />
                      ) : index % 9 === 6 ? (
                        <MdBorderColor size={25} />
                      ) : index % 9 === 7 ? (
                        <MdOutlineMenuBook size={25} />
                      ) : index % 9 === 8 ? (
                        <button
                          style={{
                            marginTop: "-8px",
                            width: "130px",
                            height: "75px",
                            backgroundColor: "transparent",
                            color: "white",
                            border: "none",
                          }}
                          onClick={handleExit}
                        >
                          <ImExit size={25} className="mt-5" />{" "}
                        </button>
                      ) : (
                        <FaUser />
                      )}
                    </Link>
                  </ListItemIcon>
                  <ListItemText
                    primary={opcion.text}
                    sx={{ opacity: open ? 1 : 0 }}
                    style={{ color: "white" }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Drawer>
      </Box>
    </>
  );
}
