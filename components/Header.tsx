import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Animated, Platform } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';

interface HeaderProps {
  title: string;
  scrollY?: Animated.Value;
  rightComponent?: React.ReactNode;
}

export default function Header({ title, scrollY, rightComponent }: HeaderProps) {
  const { colors } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    if (scrollY) {
      const listenerId = scrollY.addListener(({ value }) => {
        setIsScrolled(value > 20);
      });

      return () => {
        scrollY.removeListener(listenerId);
      };
    }
  }, [scrollY]);

  // Calculate background opacity based on scroll position
  const headerOpacity = scrollY
    ? scrollY.interpolate({
        inputRange: [0, 20, 60],
        outputRange: [0, 0, 1],
        extrapolate: 'clamp',
      })
    : new Animated.Value(1);

  // Calculate header title opacity
  const titleOpacity = scrollY
    ? scrollY.interpolate({
        inputRange: [0, 20, 60],
        outputRange: [0, 0, 1],
        extrapolate: 'clamp',
      })
    : new Animated.Value(1);

  return (
    <View style={styles.headerContainer}>
      <Animated.View
        style={[
          styles.headerBackground,
          {
            backgroundColor: colors.background,
            opacity: headerOpacity,
          },
        ]}
      />
      <View style={styles.headerContent}>
        <Animated.Text
          style={[
            styles.title,
            {
              color: colors.text,
              opacity: titleOpacity,
            },
          ]}>
          {title}
        </Animated.Text>
        {rightComponent}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    height: 48,
    width: '100%',
    position: 'relative',
    zIndex: 100,
  },
  headerBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '100%',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
      web: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
      },
    }),
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '100%',
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 18,
    fontFamily: 'Montserrat-Bold',
  },
});