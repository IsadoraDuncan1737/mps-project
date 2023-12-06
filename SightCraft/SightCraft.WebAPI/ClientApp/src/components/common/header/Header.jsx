import { AppBar, Box, Divider, Grid, Typography } from '@mui/material';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import styles from './Header.module.css';
import { useEffect } from 'react';
import { NavPathes } from '../../../utils/navpathes';
import { useDispatch, useSelector } from 'react-redux';
import { exit, getCurrentUserId, selectors } from './headerSlice';

const Header = () => {
  const location = useLocation();
  const isTokenAlive = useSelector(selectors.selectIsTokenAlive);
  const currentUserId = useSelector(selectors.selectCurrentUserId);
  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentUserId());
  }, [location.pathname, dispatch]);
  let navigate = useNavigate();

  function onExitClick() {
    dispatch(exit());
    navigate(NavPathes.MAIN());
  }

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
                  <NavLink to={`${NavPathes.USER_SIGHTS()}/${currentUserId}`}>
                    Ваши достопримечательности
                  </NavLink>
                  <NavLink to={NavPathes.SIGHT_CREATION()}>
                    Добавить еще!
                  </NavLink>
                </>
              ) : (
                false
              )}
            </Box>
          </Grid>
          <Grid item xs={3}>
            <Box className={styles.auth_links}>
              {isTokenAlive ? (
                <NavLink onClick={onExitClick}>Выход</NavLink>
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
