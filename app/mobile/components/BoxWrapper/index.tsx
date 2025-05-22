import React from 'react';
import { View, StyleSheet, useWindowDimensions, Platform } from 'react-native';

interface BoxWrapperProps {
  isDashed?: boolean;
  children: React.ReactNode;
}

export const BoxWrapper: React.FC<BoxWrapperProps> = ({ isDashed = false, children }) => {
  const { width } = useWindowDimensions();

  const boxWidth = width > 768 ? width * 0.7 : width * 0.9;

  return (
    <View style={styles.wrapper}>
      <View
        style={[
          styles.innerBox,
          {
            width: boxWidth,
            height: '100%',
            maxHeight: 700,
            columnGap: 15,
          },
          isDashed ? styles.dashedBorder : styles.solidBorder,
        ]}
      >
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Platform.OS === 'web' ? 40 : 20,
  },
  innerBox: {
    padding: 20,
    backgroundColor: 'transparent',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  dashedBorder: {
    borderWidth: 2,
    borderColor: '#000',
    borderStyle: 'dashed',
  },
  solidBorder: {
    borderWidth: 2,
    borderColor: '#000',
    borderStyle: 'solid',
  },
});
