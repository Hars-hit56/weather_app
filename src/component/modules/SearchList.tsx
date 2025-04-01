import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import RegularText from '../common/text/RegularText';
import {spacing} from '../../styles/spacing';
import {FONT_FAMILY, FONT_SIZE} from '../../styles/typography';
import colors from '../../utility/colors';

type SearchListProps = {
  suggestions: Record<string, any>[];
  handleLocationSelect: (item: Record<string, any>) => void;
};
const SearchList = ({suggestions, handleLocationSelect}: SearchListProps) => {
  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={suggestions}
      keyExtractor={(item, index) => item.lat + item.lon + index}
      renderItem={({item, index}) => (
        <SearchCard
          suggestion={item}
          key={'renderItem' + item.lat + item.lon + index}
          handleLocationSelect={handleLocationSelect}
        />
      )}
    />
  );
};

type SearchCardProps = {
  suggestion: Record<string, any>;
  handleLocationSelect: (item: Record<string, any>) => void;
};
const SearchCard = ({suggestion, handleLocationSelect}: SearchCardProps) => {
  return (
    <TouchableOpacity
      style={styles.suggestionItem}
      onPress={() => handleLocationSelect(suggestion)}>
      <RegularText style={styles.suggestionText}>{suggestion.name}</RegularText>
      <RegularText style={styles.stateText}>
        {suggestion.state}, {suggestion.country}
      </RegularText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  suggestionItem: {
    padding: spacing.PADDING_10,
  },
  suggestionText: {
    fontSize: FONT_SIZE.SEMI_MEDIUM,
    color: colors.BLACK,
    fontFamily: FONT_FAMILY.PRIMARY_SEMI_BOLD,
  },
  stateText: {
    fontSize: FONT_SIZE.NORMAL,
    color: colors.GREY_600,
  },
});
export default SearchList;
