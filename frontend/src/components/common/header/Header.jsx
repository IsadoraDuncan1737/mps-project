import { AppBar, Box, Divider, Grid, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';
import styles from './Header.module.css';
import checkTokenExpiration from '../../../check-token-expiration/checkTokenExpiration';
import { useEffect, useState } from 'react';
import { NavPathes } from '../../../utils/navpathes';

const Header = () => {
  const [isTokenAlive, setIsTokenAlive] = useState(false);
  useEffect(() => {
    setIsTokenAlive(checkTokenExpiration());
  }, [isTokenAlive]);
  
  return (
    <header>
      <AppBar className={styles.appbar}>
        <Grid container className={styles.container}>
          <Grid item xs={3}>
            <Typography className={styles.title}>SightCraft</Typography>
          </Grid>
          <Grid item xs={6}>
            <Box className={styles.links}>
              <NavLink to={NavPathes.MAIN()}>Главная</NavLink>
              {isTokenAlive ? (
                <>
                  <NavLink>Ваши достопримечательности</NavLink>
                  <NavLink>Добавить еще!</NavLink>
                </>
              ) : (
                false
              )}
            </Box>
          </Grid>
          <Grid item xs={3}>
            <Box className={styles.auth_links}>
              {isTokenAlive ? (
                <NavLink>Выход</NavLink>
              ) : (
                <>
                  <NavLink to={NavPathes.LOG_IN()}>Вход</NavLink>
                  <NavLink to={NavPathes.REGISTRATION()}>Регистрация</NavLink>
                </>
              )}
            </Box>
          </Grid>
        </Grid>
        <Divider className={styles.line} />
      </AppBar>
    </header>
  );
};

export default Header;
