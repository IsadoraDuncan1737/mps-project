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
import { useDispatch, useSelector } from 'react-redux';
import { login, selectors } from '../authorizationSlice';
import { useNavigate } from 'react-router-dom';

const LogIn = () => {
  let navigate = useNavigate();
  // const error = useSelector(selectors.selectError());
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();

  function onSubmit(value) {
    dispatch(login({ value, navigate }));
    // if (!!error) {
    //   return <Typography>Некорректные данные</Typography>;
    // }
  }

  return (
    <Box className={styles.wrapper}>
      <Box className={styles.form_box}>
        <Box className={styles.title_wrapper}>
          <Typography className={styles.title}>Вход</Typography>
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
          <Box className={styles.button_wrapper}>
            <Button variant="outlined" type="submit">
              Войти
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default LogIn;
