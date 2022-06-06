import { ShoppingBag } from "@mui/icons-material";
import { AppBar, Badge, Box, IconButton, List, ListItem, Switch, Toolbar, Typography } from "@mui/material";
import { Link, NavLink } from "react-router-dom";
import { useStoreContext } from "../context/StoreContext";

interface Props {
  darkMode: boolean;
  handleThemeChange: () => void;
};

const pageLinks = [
  { title: 'catalog', path: '/catalog' },
  { title: 'about', path: '/about' },
  { title: 'contact', path: '/contact' }
];

const accountLinks = [
  { title: 'sign in', path: '/signin' },
  { title: 'register', path: '/register' }
];

const navStyles = {
  color: 'inherit',
  typography: 'h6',
  textDecoration: 'none',
  '&:hover':
  {
    color: 'grey.500'
  },
  '&.active':
  {
    color: 'text.secondary'
  }
};

export default function Header({ darkMode, handleThemeChange }: Props) {
  const { basket } = useStoreContext();
  const itemsCount = basket?.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <AppBar position='static' sx={{ mb: 4 }}>
      <Toolbar
        sx={
          {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }
        }>

        <Box display='flex' alignItems='center'>
          <Typography
            variant='h6'
            component={NavLink}
            to='/' exact
            sx={navStyles}
          >
            RE-STORE
          </Typography>
          <Switch checked={darkMode} onChange={handleThemeChange} />
        </Box>



        <List sx={{ display: 'flex' }}>
          {pageLinks.map(({ title, path }) => (
            <ListItem
              component={NavLink}
              to={path}
              key={path}
              sx={navStyles}
            >
              {title.toUpperCase()}
            </ListItem>
          ))}
        </List>

        <Box display='flex' alignItems='center'>
          <IconButton component={Link} to='/basket' size='large' sx={{ color: 'inherit' }}>
            <Badge badgeContent={itemsCount} color='secondary'>
              <ShoppingBag />
            </Badge>
          </IconButton>

          <List sx={{ display: 'flex' }}>
            {accountLinks.map(({ title, path }) => (
              <ListItem
                component={NavLink}
                to={path}
                key={path}
                sx={navStyles}
              >
                {title.toUpperCase()}
              </ListItem>
            ))}
          </List>
        </Box>
      </Toolbar>
    </AppBar>
  )
}