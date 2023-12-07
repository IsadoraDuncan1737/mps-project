import { Box, Typography, Grid, Divider, Button } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { NavPathes } from '../../../utils/navpathes';

const ReadMod = ({
  author,
  sight,
  styles,
  isCurrentUserTheAuthor,
  onUpdateClick,
  onRemoveClick,
}) => {
  return (
    <Box>
      <Grid container className={styles.container}>
        <Grid item xs={6} className={styles.image_wrapper}>
          <img src={sight.imageUrl} className={styles.image} alt="" />
        </Grid>
        <Grid item xs={6} className={styles.content}>
          <Box className={styles.title_wrapper}>
            <Typography className={styles.title}>{sight.title}</Typography>
            <Typography className={styles.user}>
              автор: {author.login}
            </Typography>
          </Box>
          <Divider className={styles.line} />
          <Typography className={styles.type}>Тип: {sight.type}</Typography>
          <Typography className={styles.location}>
            Расположение: {sight.location}
          </Typography>
          <Typography className={styles.history}>
            Описание: {sight.summary}
          </Typography>
          <Typography className={styles.history}>
            История: {sight.history}
          </Typography>
          <Typography className={styles.date}>
            Дата основания: {sight.foundingDate}
          </Typography>
          {isCurrentUserTheAuthor ? (
            <Box className={styles.buttons}>
              <Button variant="outlined" onClick={onUpdateClick}>
                Редактировать
              </Button>
              <Button variant="outlined" onClick={onRemoveClick}>
                Удалить
              </Button>
            </Box>
          ) : (
            <Box className={styles.link}>
              <NavLink to={`${NavPathes.USER_SIGHTS()}/${author.id}`}>
                Посмотреть другие достопримечательности пользователя{' '}
                {author.login}
              </NavLink>
              <img
                src={require('../img/arrow.png')}
                alt=""
                className={styles.arrow}
              />
            </Box>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default ReadMod;
