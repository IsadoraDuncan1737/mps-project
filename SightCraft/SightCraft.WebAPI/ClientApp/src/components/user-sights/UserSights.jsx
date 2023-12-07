import { Box, Grid, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData, selectors } from './userSightsSlice';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { NavPathes } from '../../utils/navpathes';
import styles from '../main/Main.module.css';
import SightCard from '../main/sight-card/SightCard';

const UserSights = () => {
  const { id } = useParams();
  const isCurrentUserTheAuthor = useSelector(
    selectors.selectIsCurrentUserTheAuthor
  );
  const sights = useSelector(selectors.selectSights);
  const author = useSelector(selectors.selectAuthorData);
  let dispatch = useDispatch();
  let navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchData(id));
  }, [dispatch]);

  const isLoading = useSelector(selectors.selectIsLoading);
  const error = useSelector(selectors.selectError);

  if (isLoading) {
    return 'loading...';
  }
  if (error) {
    return error;
  }

  function handleOnClick(id) {
    navigate(`${NavPathes.SIGHTS()}/${id}`);
  }
  return (
    <Box className={styles.wrapper}>
      {isCurrentUserTheAuthor ? (
        <Typography className={styles.user_sights_page__title}>
          Ваши достопримечательности
        </Typography>
      ) : (
        <Typography className={styles.user_sights_page__title}>
          Достпримечательности пользователя {author.login}
        </Typography>
      )}
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

export default UserSights;
