import { Box, Grid, Typography } from '@mui/material';
import styles from './Main.module.css';
import SightCard from './sight-card/SightCard';
import { useNavigate } from 'react-router-dom';
import { NavPathes } from '../../utils/navpathes';
import { useDispatch, useSelector } from 'react-redux';
import { selectors, fetchSights } from './mainSlice';
import { useEffect } from 'react';

const Main = () => {
  const sights = useSelector(selectors.selectSights);
  const isLoading = useSelector(selectors.selectIsLoading);
  const error = useSelector(selectors.selectError);
  let navigate = useNavigate();
  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSights());
  }, [dispatch]);

  if (isLoading) {
    return 'loading...';
  }
  if (error) {
    return error;
  }
  if (!sights) {
    return <Typography>Данных нет!</Typography>;
  }

  function handleOnClick(id) {
    navigate(`${NavPathes.SIGHTS()}/${id}`);
  }

  return (
    <Box className={styles.wrapper}>
      <Typography className={styles.page_title}>
        Исследуйте и создавайте достопримечательности вместе с другими
        пользователями!
      </Typography>
      <Grid container spacing={5}>
        {sights.map((item) => (
          <SightCard
            key={item.id}
            id={item.id}
            title={item.title}
            location={item.location}
            image={item.imageUrl}
            summary={item.summary}
            date={item.foundingDate}
            type={item.type}
            userId={item.userID}
            onClick={(id) => handleOnClick(id)}
          />
        ))}
      </Grid>
    </Box>
  );
};

export default Main;
