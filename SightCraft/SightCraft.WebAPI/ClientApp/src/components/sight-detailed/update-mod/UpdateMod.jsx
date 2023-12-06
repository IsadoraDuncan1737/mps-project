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
            <img src={sight.imageUrl} className={styles.image} alt="" />
          </Grid>
          <Grid item xs={6} className={styles.content}>
            <Typography className={styles.title}>РЕДАКТИРОВАНИЕ</Typography>
            <Box className={styles.title_wrapper}>
              <FormControl style={{ width: '60%' }}>
                <Input
                  type="text"
                  defaultValue={newSight.title}
                  onChange={(e) =>
                    handleOnChange({ ...newSight, title: e.target.value })
                  }
                  autoFocus={true}
                  inputProps={{ maxLength: 100, minLength: 3 }}
                  {...register('title', { required: true })}
                ></Input>
              </FormControl>

              <Typography className={styles.user}>
                автор: {author.login}
              </Typography>
            </Box>
            <Divider className={styles.line} />

            <FormControl style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Typography className={styles.type}>Тип: </Typography>
              <Select
                value={newSight.type}
                className={styles.select}
                {...register('type', { required: true })}
              >
                <MenuItem value="">---</MenuItem>
                {SIGHT_TYPES.map((item) => (
                  <MenuItem
                    key={item}
                    value={item}
                    onClick={() => handleOnChange({ ...newSight, type: item })}
                  >
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl style={{ width: '100%' }}>
              <Typography>Расположение:</Typography>
              <Input
                type="text"
                defaultValue={newSight.location}
                onChange={(e) =>
                  handleOnChange({ ...newSight, location: e.target.value })
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
                defaultValue={newSight.history}
                onChange={(e) =>
                  handleOnChange({ ...newSight, history: e.target.value })
                }
                inputProps={{ maxLength: 220, minLength: 3 }}
                {...register('history', { required: true })}
              ></Input>
            </FormControl>

            <FormControl style={{ width: '100%' }}>
              <Typography>Дата основания:</Typography>
              <Input
                type="text"
                defaultValue={newSight.foundingDate}
                onChange={(e) =>
                  handleOnChange({
                    ...newSight,
                    foundingDate: e.target.value,
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

            <FormControl style={{ width: '100%' }}>
              <Typography>URL-адрес изображения:</Typography>
              <Input
                type="url"
                defaultValue={newSight.imageUrl}
                onChange={(e) =>
                  handleOnChange({
                    ...newSight,
                    imageUrl: e.target.value,
                  })
                }
                inputProps={{ maxLength: 220, minLength: 3 }}
                {...register('imageUrl', { required: true })}
              ></Input>
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
