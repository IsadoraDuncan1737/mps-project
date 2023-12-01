import {
  Box,
  Typography,
  Divider,
  Input,
  FormControl,
  FormHelperText,
  Button,
} from '@mui/material';
import styles from '../Authorization.module.css';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { registration } from '../authorizationSlice';
import { useNavigate } from 'react-router-dom';

const Registration = () => {
  let navigate = useNavigate();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();

  function onSubmit(value) {
    dispatch(registration({ value, navigate }));
  }

  return (
    <Box className={styles.wrapper}>
      <Box className={styles.form_box}>
        <Box className={styles.title_wrapper}>
          <Typography className={styles.title}>Регистрация</Typography>
          <Divider className={styles.line} />
        </Box>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl className={styles.form_control}>
            <Input
              placeholder="Введите логин"
              type="text"
              autoFocus={true}
              className={styles.input}
              inputProps={{ maxLength: 40, minLength: 3 }}
              {...register('login', { required: true })}
            ></Input>
            <FormHelperText error={!!errors.login}>
              {errors.login?.message}
            </FormHelperText>
          </FormControl>
          <FormControl className={styles.form_control}>
            <Input
              placeholder="Введите пароль"
              type="password"
              className={styles.input}
              inputProps={{ maxLength: 20, minLength: 5 }}
              {...register('password', {
                required: true,
              })}
            ></Input>
            <FormHelperText error={!!errors.password}>
              {errors.password?.message}
            </FormHelperText>
          </FormControl>
          <FormControl className={styles.form_control}>
            <Input
              placeholder="Повторите пароль"
              type="password"
              className={styles.input}
              inputProps={{ maxLength: 20 }}
              {...register('repeat_password', {
                required: true,
                validate: (value) =>
                  value === getValues('password') || 'Пароли не совпадают',
              })}
            ></Input>
            {errors.repeat_password && (
              <FormHelperText error>{'Пароли не совпадают'}</FormHelperText>
            )}
          </FormControl>
          <FormControl className={styles.form_control}>
            <Input
              placeholder="Расскажите немного о себе "
              type="text"
              multiline={true}
              maxRows={5}
              className={styles.input}
              inputProps={{ maxLength: 220 }}
              {...register('desc', { required: true })}
            ></Input>
          </FormControl>
          <Box className={styles.button_wrapper}>
            <Button variant="outlined" type="submit">
              Зарегистрироваться
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default Registration;
