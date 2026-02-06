import {StyleSheet} from 'react-native';
import {colors} from '../../constants/colors';

export const styles = StyleSheet.create({
  card: {
    padding: 14,
    borderRadius: 16,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    shadowColor: colors.shadow,
    shadowOffset: {width: 0, height: 8},
    shadowOpacity: 1,
    shadowRadius: 14,
    elevation: 4,
  },
  image: {
    width: 80,
    height: 80,
  },
  placeholder: {
    width: 80,
    height: 80,
    backgroundColor: colors.surfaceMuted,
    borderRadius: 40,
  },
  name: {
    marginTop: 10,
    fontSize: 13,
    fontWeight: '700',
    textTransform: 'capitalize',
    color: colors.textPrimary,
    letterSpacing: 0.2,
  },
});
