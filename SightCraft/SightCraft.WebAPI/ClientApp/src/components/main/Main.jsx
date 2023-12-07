import { Box, Grid, Typography, Select, MenuItem } from '@mui/material';
import { SIGHT_TYPES } from '../sight-detailed/sightSlice';
import styles from './Main.module.css';
import SightCard from './sight-card/SightCard';
import { useNavigate } from 'react-router-dom';
import { NavPathes } from '../../utils/navpathes';
import { useDispatch, useSelector } from 'react-redux';
import { selectors, fetchSights, setSelectedType } from './mainSlice';
import { useEffect } from 'react';

const Main = () => {
  const sights = useSelector(selectors.selectSights);
  const isLoading = useSelector(selectors.selectIsLoading);
  const selectedType = useSelector(selectors.selectSelectedType);
  const error = useSelector(selectors.selectError);
  let navigate = useNavigate();
  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSights());
  }, [dispatch, selectedType]);

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
  function handleOnTypeClick(type) {
    dispatch(setSelectedType(type));
  }

  return (
    <Box className={styles.wrapper}>
      <Typography className={styles.page_title}>
        Исследуйте и создавайте достопримечательности вместе с другими
        пользователями!
      </Typography>
      <Box className={styles.select_wrapper}>
        <Typography>Выберите тип:</Typography>
        <Select value={selectedType} className={styles.select}>
          <MenuItem value="" onClick={() => handleOnTypeClick('')}>
            Все
          </MenuItem>
          {SIGHT_TYPES.map((type) => (
            <MenuItem
              key={type}
              value={type}
              onClick={() => handleOnTypeClick(type)}
            >
              {type}
            </MenuItem>
          ))}
        </Select>
      </Box>
      <Grid container spacing={5}>
        {selectedType
          ? sights
              .filter((item) => item.type === selectedType)
              .map((item) => (
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
              ))
          : sights.map((item) => (
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
        {/* {sights.map((item) => (
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
        ))} */}
      </Grid>
    </Box>
  );
};

export default Main;
