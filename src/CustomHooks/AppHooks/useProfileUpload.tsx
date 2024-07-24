import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../Redux/rootReducers';
import {
  callProfileUpload,
  resetProfileUploadResponse,
} from '../../Redux/Slices/ProfileUpload';
import {useEffect} from 'react';
import {callGetProfile} from '../../Redux/Slices/ProfileSlice';

export const useProfileUpload = () => {
  const dispatch = useDispatch();
  const profileUploadSlice = useSelector(
    (state: RootState) => state.profileUpload,
  );

  const callProfileUploadApi = (data: {
    filePath?: string | null;
    currentPath?: string | null;
    string?: string | null;
  }) => {
    dispatch(callProfileUpload(data));
  };

  const resetProfileUploadReducer = () => {
    dispatch(resetProfileUploadResponse());
  };

  useEffect(() => {
    if (profileUploadSlice.success) {
      resetProfileUploadReducer();
      dispatch(callGetProfile());
    }
  }, [profileUploadSlice.success]);

  useEffect(() => {
    if (profileUploadSlice.error) {
      console.log('error in upload :', profileUploadSlice.error);
    }
  }, [profileUploadSlice.error]);

  return {
    callProfileUploadApi,
    resetProfileUploadReducer,
    profileUploadSuccess: profileUploadSlice.success,
    profileUploadLoading: profileUploadSlice.loading,
    profileUploadError: profileUploadSlice.error,
  };
};
