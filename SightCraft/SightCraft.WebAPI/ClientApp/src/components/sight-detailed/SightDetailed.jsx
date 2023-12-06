import { useNavigate, useParams } from 'react-router-dom';
import styles from './SightDetailed.module.css';
import { NavPathes } from '../../utils/navpathes';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchSightById,
  selectors,
  MOD,
  SIGHT_TYPES,
  changeModToUpdate,
  changeModToRead,
  changeNewSight,
  changeModToRemove,
  removeSight,
  updateSight,
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
  }, [dispatch, id, isCurrentUserTheAuthor, mod]);

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
  if (!isCurrentUserTheAuthor) {
    dispatch(changeModToRead());
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
    console.log('value');
    let postData = {
      Id: id,
      History: value.history,
      FoundingDate: value.foundingDate + 'T00:00:00',
      ImageUrl: value.imageUrl,
      Location: value.location,
      Summary: value.summary,
      Title: value.title,
      Type: value.type,
      UserId: author.id,
    };
    console.log(postData);

    dispatch(updateSight(postData));
  }
  function confirmRemoving() {
    dispatch(removeSight(id));
    navigate(NavPathes.MAIN());
    dispatch(changeModToRead());
  }
  function handleOnChange(value) {
    dispatch(changeNewSight(value));
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
