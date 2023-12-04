import {
  Box,
  Typography,
  Select,
  FormControl,
  Input,
  MenuItem,
  Button,
  FormHelperText,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { SIGHT_TYPES } from '../sight-detailed/sightSlice';
import styles from './SightCreation.module.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  changePostSightData,
  postSightData,
  selectors,
} from './sightCreationSlice';

const SightCreation = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const sightData = useSelector(selectors.selectSightData);
  const isLoading = useSelector(selectors.selectIsLoading);
  const error = useSelector(selectors.selectError);
  let dispatch = useDispatch();

  function handleOnSumbit(value) {
    // console.log(value);
    let postData = {
      Title: value.title,
      ImageUrl: value.image,
      Summary: value.summary,
      Location: value.location,
      FoundingDate: value.date,
      Type: value.type,
      History: value.history,
    };
    dispatch(postSightData(postData));
  }

  function onTypeClick(value) {
    if (!null) dispatch(changePostSightData({ ...sightData, Type: value }));
  }

  if (isLoading) {
    return 'loading...';
  }
  if (error) {
    return error;
  }

  return (
    <Box className={styles.wrapper}>
      <Typography className={styles.title}>
        Введите данные для добавления достопримечательности в вашу коллекцию
      </Typography>
      <form onSubmit={handleSubmit(handleOnSumbit)} className={styles.form}>
        <FormControl className={styles.form_control}>
          <Typography className={styles.label}>Название: </Typography>
          <Input
            fullWidth
            type="text"
            autoFocus={true}
            inputProps={{ maxLength: 100, minLength: 3 }}
            {...register('title', { required: true })}
          ></Input>
        </FormControl>

        <FormControl className={styles.form_control}>
          <Typography className={styles.label}>Тип: </Typography>
          <Select
            value={sightData.Type}
            className={styles.select}
            {...register('type', { required: true })}
          >
            <MenuItem value="" onClick={() => onTypeClick(null)}>
              ---
            </MenuItem>
            {SIGHT_TYPES.map((item) => (
              <MenuItem
                key={item}
                value={item}
                onClick={() => onTypeClick(item)}
              >
                {item}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl className={styles.form_control}>
          <Typography className={styles.label}>Расположение:</Typography>
          <Input
            fullWidth
            type="text"
            inputProps={{ maxLength: 100, minLength: 3 }}
            {...register('location', { required: true })}
          ></Input>
        </FormControl>

        <FormControl className={styles.form_control}>
          <Typography className={styles.label}>Короткое описание:</Typography>
          <Input
            fullWidth
            type="text"
            inputProps={{ maxLength: 100, minLength: 3 }}
            {...register('summary', { required: true })}
          ></Input>
        </FormControl>

        <FormControl className={styles.form_control}>
          <Typography className={styles.label}>История:</Typography>
          <Input
            fullWidth
            type="text"
            multiline={true}
            maxRows={3}
            inputProps={{ maxLength: 220, minLength: 3 }}
            {...register('history', { required: true })}
          ></Input>
        </FormControl>

        <FormControl
          className={styles.form_control}
          style={{ flexDirection: 'column' }}
        >
          <Box className={styles.date}>
            <Typography className={styles.label}>Дата основания:</Typography>
            <Input
              fullWidth
              type="text"
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
          </Box>
          <FormHelperText error={!!errors.date} className={styles.helper}>
            {errors.date?.message}
          </FormHelperText>
        </FormControl>

        <FormControl className={styles.form_control}>
          <Typography className={styles.label}>
            URL-адрес изображения:
          </Typography>
          <Input
            fullWidth
            type="url"
            inputProps={{ maxLength: 220, minLength: 3 }}
            {...register('image', { required: true })}
          ></Input>
        </FormControl>
        <Box className={styles.buttons}>
          <Button variant="outlined" type="submit">
            Подтвердить
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default SightCreation;
