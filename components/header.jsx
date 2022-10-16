import { Logout, ManageAccounts, MenuOutlined, PersonAddAlt } from "@mui/icons-material";
import { Avatar, Box, Container, Divider, Drawer, IconButton, List, ListItemButton, ListItemIcon, Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import styles from "../styles/Header.module.css";
import { useSession, signOut } from "next-auth/react";

export default function Header() {
    const { data: session } = useSession();
    const [user, setUser] = useState(undefined);
    const [letra, setLetra] = useState(false);

    if (session && user == undefined) {
        setUser(session.user)
        const letra = session.user.name.substr(0, 1);
        setLetra(letra);
    }

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
        signOut();
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
                        {user.image
                            ? <Avatar src={user.image} />
                            : <Avatar>{letra}</Avatar>
                        }
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