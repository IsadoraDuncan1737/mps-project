import {
  Box,
  Typography,
  Grid,
  Divider,
  Button,
  FormControl,
  Input,
  FormHelperText,
  Select,
  MenuItem,
} from '@mui/material';

const UpdateMod = ({
  author,
  sight,
  newSight,
  styles,
  handleOnSumbit,
  handleSubmit,
  onCancelClick,
  register,
  handleOnChange,
  formState: { errors },
  SIGHT_TYPES,
}) => {
  function onSubmit(value) {
    handleOnSumbit(value);
  }
  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <Grid container className={styles.container}>
          <Grid item xs={6} className={styles.image_wrapper}>
            <img src={sight.Image} className={styles.image} alt="" />
          </Grid>
          <Grid item xs={6} className={styles.content}>
            <Typography className={styles.title}>РЕДАКТИРОВАНИЕ</Typography>
            <Box className={styles.title_wrapper}>
              <FormControl style={{ width: '60%' }}>
                <Input
                  type="text"
                  defaultValue={newSight.Title}
                  onChange={(e) =>
                    handleOnChange({ ...newSight, Title: e.target.value })
                  }
                  autoFocus={true}
                  inputProps={{ maxLength: 100, minLength: 3 }}
                  {...register('title', { required: true })}
                ></Input>
              </FormControl>

              <Typography className={styles.user}>
                автор: {author.Login}
              </Typography>
            </Box>
            <Divider className={styles.line} />

            <FormControl style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Typography className={styles.type}>Тип: </Typography>
              <Select
                value={newSight.Type}
                onChange={(e) =>
                  handleOnChange({ ...newSight, Type: e.target.value })
                }
                className={styles.select}
              >
                {SIGHT_TYPES.map((item) => (
                  <MenuItem key={item} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl style={{ width: '100%' }}>
              <Typography>Расположение:</Typography>
              <Input
                type="text"
                defaultValue={newSight.Location}
                onChange={(e) =>
                  handleOnChange({ ...newSight, Location: e.target.value })
                }
                inputProps={{ maxLength: 100, minLength: 3 }}
                {...register('location', { required: true })}
              ></Input>
            </FormControl>

            <FormControl style={{ width: '100%' }}>
              <Typography>История:</Typography>
              <Input
                type="text"
                multiline={true}
                maxRows={3}
                defaultValue={newSight.History}
                onChange={(e) =>
                  handleOnChange({ ...newSight, History: e.target.value })
                }
                inputProps={{ maxLength: 220, minLength: 3 }}
                {...register('history', { required: true })}
              ></Input>
            </FormControl>

            <FormControl style={{ width: '100%' }}>
              <Typography>Дата основания:</Typography>
              <Input
                type="text"
                defaultValue={newSight.FoundingDate}
                onChange={(e) =>
                  handleOnChange({
                    ...newSight,
                    FoundingDate: e.target.value,
                  })
                }
                placeholder="гггг-мм-дд"
                inputProps={{ maxLength: 15, minLength: 6 }}
                {...register('date', {
                  required: 'Введите дату в формате гггг-мм-дд',
                  pattern: {
                    value: /-?\d{4}-\d{2}-\d{2}/,
                    message: 'Введите дату в формате гггг-мм-дд',
                  },
                })}
              ></Input>
              <FormHelperText error={!!errors.date}>
                {errors.date?.message}
              </FormHelperText>
            </FormControl>

            <Box className={styles.buttons}>
              <Button variant="outlined" type="submit">
                Подтвердить
              </Button>
              <Button variant="outlined" onClick={onCancelClick}>
                Отменить
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default UpdateMod;
