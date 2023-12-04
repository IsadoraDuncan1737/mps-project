import { Box, Typography, Grid, Divider, Button } from '@mui/material';
import { NavLink } from 'react-router-dom';

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
          <img src={sight.Image} className={styles.image} alt="" />
        </Grid>
        <Grid item xs={6} className={styles.content}>
          <Box className={styles.title_wrapper}>
            <Typography className={styles.title}>{sight.Title}</Typography>
            <Typography className={styles.user}>
              автор: {author.Login}
            </Typography>
          </Box>
          <Divider className={styles.line} />
          <Typography className={styles.type}>Тип: {sight.Type}</Typography>
          <Typography className={styles.location}>
            Расположение: {sight.Location}
          </Typography>
          <Typography className={styles.history}>
            История: {sight.History}
          </Typography>
          <Typography className={styles.date}>
            Дата основания:{' '}
            {!!sight.FoundingDate
              ? sight.FoundingDate[0] === '-'
                ? `${sight.FoundingDate.slice(
                    1,
                    sight.FoundingDate.length
                  )} до н.э.`
                : sight.FoundingDate
              : false}
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
              <NavLink>
                Посмотреть другие достопримечательности пользователя{' '}
                {author.Login}
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
