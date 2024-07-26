import React, {useEffect, useState} from 'react';
import StarRating, {StarRatingDisplay} from 'react-native-star-rating-widget';
import {TextInput, View} from 'react-native';
import {CustomButton, Typography} from '../../../Components';
import {FeedbackScreenStyles} from './styles';
import {useAddComments} from '../../../CustomHooks/AppHooks/useAddComment';
import {useSelector} from 'react-redux';
import {RootState} from '../../../Redux/rootReducers';

type GiveFeedbackProps = {
  styles: FeedbackScreenStyles;
  colors: any;
  username?: string;
};

export const GiveFeedback = ({styles, colors, username}: GiveFeedbackProps) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [editComment, setEditComment] = useState(true);

  const {success: getYourCommentSuccess, loading: getYourCommentLoading} =
    useSelector((state: RootState) => state.feedbackSlice.getYourComment);

  useEffect(() => {
    if (getYourCommentSuccess?.success) {
      setRating(getYourCommentSuccess?.yourComment?.rating);
      setComment(getYourCommentSuccess?.yourComment?.content);
      setEditComment(false);
    }
  }, [getYourCommentSuccess]);

  const {callAddCommentApi, addCommenetLoading} = useAddComments(
    username,
    comment,
    rating,
  );

  const submitFeedback = () => {
    callAddCommentApi();
  };

  const handleSubmit = () => {
    if (editComment) {
      submitFeedback();
    } else {
      setEditComment(true);
    }
  };

  return (
    <View style={styles.card}>
      <Typography
        bgColor={colors.textPrimaryColor}
        fontWeight="400"
        textStyle={styles.giveFeedbackText}>
        {editComment ? 'Give your feedback' : 'Your Feedback'}
      </Typography>
      {editComment ? (
        <StarRating
          rating={rating}
          onChange={setRating}
          enableHalfStar={false}
          style={styles.giveFeedbackStarsStyle}
        />
      ) : (
        <StarRatingDisplay
          rating={
            getYourCommentSuccess?.yourComment.rating
              ? getYourCommentSuccess?.yourComment.rating
              : 0
          }
          enableHalfStar={false}
          style={styles.giveFeedbackStarsStyle}
        />
      )}

      <Typography
        bgColor={colors.textPrimaryColor}
        fontWeight="400"
        textStyle={styles.giveFeedbackText}>
        {editComment ? 'Add a comment' : 'Your Comment'}
      </Typography>
      <View style={styles.commentContainer}>
        <TextInput
          style={styles.commentBox}
          placeholder="If you have any additional feedback, please type it in here..."
          multiline
          editable={editComment}
          placeholderTextColor={colors.textInputPlaceholderColor}
          numberOfLines={4}
          value={comment}
          onChangeText={setComment}
        />
      </View>
      <CustomButton
        onPress={handleSubmit}
        label={editComment ? 'Give Feedback' : 'Update Feedback'}
        radius={95}
        loading={addCommenetLoading || getYourCommentLoading}
        viewStyle={styles.submitButtonStyle}
      />
    </View>
  );
};
