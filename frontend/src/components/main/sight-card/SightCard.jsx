import {
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Typography,
} from '@mui/material';
import styles from '../Main.module.css';

const SightCard = ({ id, title, image, summary, date, type, userId, location}) => {
  return (
    <Grid item xs={4}>
      <CardActionArea>
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
            <Typography className={styles.type}>Тип: {type}</Typography>
            <Typography className={styles.location}>Расположение: {location}</Typography>
            <Typography className={styles.summary}>Описание: {summary}</Typography>
            <Typography className={styles.date}>Дата основания: {date}</Typography>
          </CardContent>
        </Card>
      </CardActionArea>
    </Grid>
  );
};

export default SightCard;
