import { Box, Grid, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUserId, selectors } from './userSightsSlice';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from '../main/Main.module.css';

const UserSights = () => {
  const { id } = useParams();
  let dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      dispatch(getCurrentUserId());
    };
    fetchData();
  }, [dispatch]);

  const isLoading = useSelector(selectors.selectIsLoading);
  const error = useSelector(selectors.selectError);

  if (isLoading) {
    return 'loading...';
  }
  if (error) {
    return error;
  }

  //   function handleOnClick(id) {
  //     navigate(`${NavPathes.SIGHTS()}/${id}`);
  //   }
  return (
    <Box className={styles.wrapper}>
      <Typography className={styles.page_title}>
        Достпримечательности пользователя {id}
      </Typography>
      {/* <Grid container spacing={5}>
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
      </Grid> */}
    </Box>
  );
};

export default UserSights;
