import { Box, Typography } from '@mui/material';
import styles from './Footer.module.css';
import { NavLink } from 'react-router-dom';

const Footer = () => {
  return (
    <footer>
      <Box className={styles.content}>
        <Typography>SightCraft (c) 2023</Typography>
        <Typography>
          Профили разработчиков на GitHub:{' '}
          <NavLink to="#" className={styles.link}>
            slamrych
          </NavLink>
          ,{' '}
          <NavLink to="#" className={styles.link}>
            IsadoraDunkan1737
          </NavLink>
        </Typography>
      </Box>
    </footer>
  );
};

export default Footer;
