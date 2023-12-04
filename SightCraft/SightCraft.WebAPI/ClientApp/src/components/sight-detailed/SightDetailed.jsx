import { useNavigate, useParams } from 'react-router-dom';
import styles from './SightDetailed.module.css';
import { NavPathes } from '../../utils/navpathes';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  compareAuthorAndUserIds,
  fetchAuthorById,
  fetchSightById,
  selectors,
  MOD,
  SIGHT_TYPES,
  changeModToUpdate,
  submit,
  changeModToRead,
  changeNewSight,
  changeModToRemove,
  remove,
  setCurrentSightType,
} from './sightSlice';
import ReadMod from './read-mod/ReadMod';
import { useForm } from 'react-hook-form';
import UpdateMod from './update-mod/UpdateMod';
import DeleteMod from './delete-mod/DeleteMod';
import { Box } from '@mui/material';

const SightDetailed = () => {
  const { id } = useParams();
  const sight = useSelector(selectors.selectInfo);
  const newSight = useSelector(selectors.selectNewInfo);
  const author = useSelector(selectors.selectAuthorInfo);
  const mod = useSelector(selectors.selectMod);
  const currentSightType = useSelector(selectors.selectCurrentSightType);
  const isLoading = useSelector(selectors.selectIsLoading);
  const error = useSelector(selectors.selectError);
  const dispatch = useDispatch();
  const isCurrentUserTheAuthor = useSelector(
    selectors.selectIsCurrentUserTheAuthor
  );
  const { register, handleSubmit, formState } = useForm();
  let navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchSightById(id));
    dispatch(fetchAuthorById(id));
    dispatch(compareAuthorAndUserIds(author.ID));
  }, [dispatch, id, author, mod]);

  if (isLoading) {
    return 'loading...';
  }
  if (error) {
    return error;
  }
  if (!sight) {
    console.log('there`s no sight info');
    return null;
  }

  function handleOnUpdateClick() {
    dispatch(changeModToUpdate());
  }
  function handleOnRemoveClick() {
    dispatch(changeModToRemove());
  }
  function handleOnCancelClick() {
    dispatch(changeNewSight({ ...sight }));
    dispatch(changeModToRead());
  }
  function onSubmit(value) {
    dispatch(
      submit({
        ...newSight,
        Title: value.title,
        Location: value.location,
        History: value.history,
      })
    );
  }
  function confirmRemoving() {
    dispatch(remove(id));
    navigate(NavPathes.MAIN());
    dispatch(changeModToRead());
  }
  function handleOnChange(value) {
    dispatch(changeNewSight(value));
  }
  function changeSightType(value) {
    dispatch(setCurrentSightType(value));
  }

  switch (mod) {
    case MOD.READ: {
      return (
        <ReadMod
          styles={styles}
          sight={sight}
          author={author}
          isCurrentUserTheAuthor={isCurrentUserTheAuthor}
          onUpdateClick={handleOnUpdateClick}
          onRemoveClick={handleOnRemoveClick}
        />
      );
    }
    case MOD.UPDATE: {
      return (
        <UpdateMod
          styles={styles}
          sight={sight}
          newSight={newSight}
          author={author}
          register={register}
          handleSubmit={handleSubmit}
          handleOnSumbit={(value) => onSubmit(value)}
          onCancelClick={handleOnCancelClick}
          handleOnChange={handleOnChange}
          formState={formState}
          SIGHT_TYPES={SIGHT_TYPES}
        />
      );
    }
    case MOD.REMOVE: {
      return (
        <Box>
          <ReadMod
            styles={styles}
            sight={sight}
            author={author}
            isCurrentUserTheAuthor={isCurrentUserTheAuthor}
            onUpdateClick={handleOnUpdateClick}
            onRemoveClick={handleOnRemoveClick}
          />
          <DeleteMod
            styles={styles}
            onCancelClick={() => dispatch(changeModToRead())}
            confirmRemoving={confirmRemoving}
          />
        </Box>
      );
    }
    default: {
    }
  }
};

export default SightDetailed;
