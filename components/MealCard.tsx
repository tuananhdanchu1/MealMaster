import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Platform } from 'react-native';
import { Clock, ChevronRight } from 'lucide-react-native';

interface MealCardProps {
  meal: {
    id: number;
    title: string;
    time: string;
    imageUrl: string;
    calories: number;
    type: string;
  };
  colors: any;
  cardStyle?: object;
}

export default function MealCard({ meal, colors, cardStyle = {} }: MealCardProps) {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        { backgroundColor: colors.cardBackground },
        cardStyle,
      ]}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: meal.imageUrl }} style={styles.image} />
        <View
          style={[styles.mealTypeTag, { backgroundColor: colors.primary }]}>
          <Text style={[styles.mealTypeText, { color: colors.white }]}>
            {meal.type}
          </Text>
        </View>
      </View>
      <View style={styles.content}>
        <View style={styles.textContent}>
          <Text style={[styles.title, { color: colors.text }]} numberOfLines={1}>
            {meal.title}
          </Text>
          <View style={styles.detailsRow}>
            <View style={styles.timeContainer}>
              <Clock size={14} color={colors.textSecondary} />
              <Text style={[styles.time, { color: colors.textSecondary }]}>
                {meal.time}
              </Text>
            </View>
            <Text style={[styles.calories, { color: colors.textSecondary }]}>
              {meal.calories} cal
            </Text>
          </View>
        </View>
        <View style={styles.iconContainer}>
          <ChevronRight size={20} color={colors.textSecondary} />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    overflow: 'hidden',
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
  imageContainer: {
    position: 'relative',
    height: 120,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  mealTypeTag: {
    position: 'absolute',
    top: 10,
    left: 10,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 4,
  },
  mealTypeText: {
    fontSize: 12,
    fontFamily: 'Montserrat-SemiBold',
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
  },
  textContent: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontFamily: 'Montserrat-SemiBold',
    marginBottom: 6,
  },
  detailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  time: {
    marginLeft: 4,
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
  },
  calories: {
    fontSize: 12,
    fontFamily: 'Montserrat-Medium',
  },
  iconContainer: {
    marginLeft: 8,
  },
});