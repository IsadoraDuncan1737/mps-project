import { Box, Typography, Button } from '@mui/material';

const DeleteMod = ({ styles, onCancelClick, confirmRemoving }) => {
  return (
    <Box className={styles.delete_mod__modal}>
      <Box className={styles.delete_mod__wrapper}>
        <Typography className={styles.confirm_remove}>
          Вы действительно хотите удалить достопримечательность?
        </Typography>
        <Box className={styles.buttons}>
          <Button variant="outlined" onClick={confirmRemoving}>
            Удалить
          </Button>
          <Button variant="outlined" onClick={onCancelClick}>
            Отменить
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default DeleteMod;
