import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../Redux/rootReducers';
import {
  callSearchUser,
  setSearchedGenre,
  resetSearchUserResponse,
  setSearchResults,
  SearchData,
} from '../../Redux/Slices/SearchUserSlice';
import {useEffect} from 'react';

export const useSearch = () => {
  const dispatch = useDispatch();
  const searchUserSlice = useSelector(
    (state: RootState) => state.searchUserSlice,
  );

  const callSearchUserApi = (data: {
    username?: string;
    genreName?: string[];
    limit?: number;
    lastId?: string;
  }) => {
    dispatch(callSearchUser(data));
  };

  const resetSearchUserReducer = () => {
    dispatch(resetSearchUserResponse());
  };

  const setSearchedGenres = (value: string[]) => {
    dispatch(setSearchedGenre(value));
  };

  const setSearchedResults = (value: SearchData[]) => {
    dispatch(setSearchResults(value));
  };

  useEffect(() => {
    if (searchUserSlice.success) {
      console.log('success is :', searchUserSlice.success);
    }
  }, [searchUserSlice.success]);

  useEffect(() => {
    if (searchUserSlice.error) {
      console.log('error in searchUser :', searchUserSlice.error);
    }
  }, [searchUserSlice.error]);

  return {
    searchedGenres: searchUserSlice.searchedGenres,
    searchedResults: searchUserSlice.searchResults,
    setSearchedGenres,
    setSearchedResults,
    callSearchUserApi,
    resetSearchUserReducer,
    searchSuccess: searchUserSlice.success,
    searchLoading: searchUserSlice.loading,
    searchError: searchUserSlice.error,
  };
};
