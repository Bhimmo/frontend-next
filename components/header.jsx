import { Logout, ManageAccounts, MenuOutlined, PersonAddAlt } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary, AppBar, Avatar, Box, Container, Divider, Drawer, IconButton, List, ListItemButton, ListItemIcon, Menu, MenuItem, Toolbar } from "@mui/material";
import { useEffect, useState } from "react";
import { deslogar, pegarLetraAvatar, verificarLogin } from "../hooks/usuario/login";
import styles from "../styles/Header.module.css";

export default function Header() {
    const [user, setUser] = useState(undefined);
    const [letra, setLetra] = useState(false);
    useEffect(() => {
        let usuario = verificarLogin();
        if (usuario && !letra) {
            const l = pegarLetraAvatar(user);
            setLetra(l);
            setUser(usuario);
        }
    })

    const [menu, setMenu] = useState(false);
    const [menuMobile, setMenuMobile] = useState(false);
    const open = Boolean(menu);
    const openMobile = Boolean(menuMobile);

    const abrirMenu = (event) => {
        setMenu(event.currentTarget);
    }
    const abrirMenuMobile = (event) => {
        setMenuMobile(true);
    }
    const fecharMenuMobile = () => {
        setMenuMobile(false);
    }
    const fecharMenu = () => {
        setMenu(null);
    }
    function logout() {
        deslogar();
        window.history.go("/");
    }
    function entrarPerfil() {
        window.location.href = "/perfil";
    }

    return (
        <Box className={styles.paiHeader}>
            <Container sx={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>

                <IconButton sx={{color: "#fff", display: {md: "none", sm: "flex"}}} onClick={abrirMenuMobile} >
                    <MenuOutlined fontSize="medium" />
                </IconButton>

                <a href="/" className={styles.textHome}>Turismo Campo Mourão</a>
                <nav>
                    <ul className={styles.navList}>
                        <li><a className={styles.navs} href="/estabelecimentos">Estabelecimentos</a></li>
                        <li><a className={styles.navs} href="/eventos">Eventos</a></li>
                    </ul>
                </nav>
                {user &&
                    <IconButton onClick={abrirMenu}>
                        <Avatar>{letra}</Avatar>
                    </IconButton>
                }
                {!user &&
                    <div className="teste">
                        <a className={styles.logar} href="/login">Entrar <PersonAddAlt sx={{marginLeft: 2}} /> </a>
                    </div>
                }
            </Container>
            <Menu
                anchorEl={menu}
                open={open}
                onClose={fecharMenu}
                id="menu-perfil"
            >
                <MenuItem onClick={entrarPerfil}>
                    <ListItemIcon>
                        <ManageAccounts fontSize="small" />
                    </ListItemIcon>
                    Conta
                </MenuItem>
                <Divider />
                <MenuItem onClick={logout}>
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    Sair
                </MenuItem>
            </Menu>
            <Drawer
                anchor="top"
                open={openMobile}
                onClose={fecharMenuMobile}
            >
                <List component="nav" sx={{backgroundColor: "#52AA5E"}}>
                    <Container>
                        <ListItemButton>
                            <a className={styles.navs} href="/">Inicio</a>
                        </ListItemButton>
                        <ListItemButton>
                            <a className={styles.navs} href="/estabelecimentos">Estabelecimentos</a>
                        </ListItemButton>
                        <ListItemButton>
                            <a className={styles.navs} href="/eventos">Eventos</a>
                        </ListItemButton>
                    </Container>
                </List>
            </Drawer>
        </Box>
    )
}