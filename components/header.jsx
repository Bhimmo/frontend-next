import { Logout, ManageAccounts, PersonAddAlt } from "@mui/icons-material";
import { Avatar, Box, Divider, IconButton, ListItemIcon, Menu, MenuItem } from "@mui/material";
import { useEffect, useState } from "react";
import { deslogar, pegarLetraAvatar, verificarLogin } from "../hooks/usuario/login";
import styles from "../styles/Header.module.css";

export default function Header() {
    var user;
    var letra;
    if (typeof window !== "undefined") {
        user = verificarLogin();
        letra = pegarLetraAvatar(user);
    }
    const [menu, setMenu] = useState(false);
    const open = Boolean(menu);

    const abrirMenu = (event) => {
        setMenu(event.currentTarget);
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
        <div>
            <Box sx={{
                padding: "5px 45px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: "#52AA5E"
            }}>
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
            </Box>
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
        </div>
    )
}