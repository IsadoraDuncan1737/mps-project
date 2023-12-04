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
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { NavPathes } from '../../../utils/navpathes';
import { Endpoints } from '../../../utils/endpoints';

const LogIn = () => {
  let navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function onSubmit(value) {
    const userData = {
      Login: value.login,
      Password: value.password,
    };

    axios
      .post(Endpoints.USER_LOGIN(), userData)
      .then((res) => {
        console.log(res);
        sessionStorage.setItem('token', res.data.token);
        navigate(NavPathes.MAIN_PAGE());
      })
      .catch((e) => <Typography>Ошибка: {e}</Typography>);
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
