import {
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Typography,
} from '@mui/material';
import styles from '../Main.module.css';

const SightCard = ({
  id,
  title,
  image,
  summary,
  date,
  type,
  userId,
  location,
  onClick,
}) => {
  return (
    <Grid item xs={4}>
      <CardActionArea onClick={() => onClick(id)}>
        <Card
          className={styles.card}
          style={{
            backgroundImage: `linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0),
            rgba(0, 0, 0, 0.7)
          ), url(${image})`,
          }}
        >
          <CardContent className={styles.content}>
            <Typography className={styles.title}>{title}</Typography>
            <Typography>Тип: {type}</Typography>
            <Typography>Расположение: {location}</Typography>
            <Typography>Описание: {summary}</Typography>
            <Typography>Дата основания: {date}</Typography>
          </CardContent>
        </Card>
      </CardActionArea>
    </Grid>
  );
};

export default SightCard;
