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

const Registration = () => {
  let navigate = useNavigate();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  async function onSubmit(value) {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    const userData = {
      Login: value.login,
      Password: value.password,
      RegistrationDate: formattedDate,
    };
    console.log(userData);

    axios
      .post(Endpoints.USER_REGISTRATION(), userData)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          alert('Успешная регистрация');
          navigate(NavPathes.MAIN_PAGE());
        } else {
          alert('Ошибка');
        }
      })
      .catch((e) => {
        console.log(e);
      });
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
