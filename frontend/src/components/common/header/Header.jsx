import { AppBar, Box, Grid, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';
import styles from './Header.module.css'

const Header = () => {
  return (
    <Box>
      <AppBar className={styles.appbar}>
        <Grid container justifyContent='space-between'>
          <Grid item>
            <Typography>SightCraft</Typography>
          </Grid>
          <Grid item>
            <NavLink>Главная</NavLink>
            <NavLink>Ваши достопримечательности</NavLink>
            <NavLink>Добавить еще!</NavLink>
          </Grid>
          <Grid item>
            <NavLink>Вход</NavLink>
            <NavLink>Регистрация</NavLink>
            <NavLink>Выход</NavLink>
          </Grid>
        </Grid>
      </AppBar>
    </Box>
  );
};

export default Header;
