import { Box, Grid, Typography } from '@mui/material';
import styles from './Main.module.css';
import { sights } from './data/sights';
import SightCard from './sight-card/SightCard';

const Main = () => {
  return (
    <Box className={styles.wrapper}>
      <Typography className={styles.page_title}>
        Исследуйте и создавайте достопримечательности вместе с другими
        пользователями!
      </Typography>
      <Grid container spacing={5}>
        {sights.map((item) => (
          <SightCard
            key={item.ID}
            id={item.ID}
            title={item.Title}
            location={item.Location}
            image={item.Image}
            summary={item.Summary}
            date={item.FoundingDate}
            type={item.Type}
            userId={item.UserID}
          />
        ))}
      </Grid>
    </Box>
  );
};

export default Main;
