import { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Animated,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@/contexts/ThemeContext';
import { Calendar, ChevronRight, Users, Award, Brain } from 'lucide-react-native';
import Header from '@/components/Header';
import MealCard from '@/components/MealCard';
import { mockMealPlans, mockRecommendedMeals } from '@/data/mockData';

export default function MealPlanningScreen() {
  const { colors } = useTheme();
  const scrollY = useRef(new Animated.Value(0)).current;
  const [selectedDay, setSelectedDay] = useState('Today');

  const days = ['Yesterday', 'Today', 'Tomorrow'];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <Header
        title="Meal Planning"
        scrollY={scrollY}
        rightComponent={
          <TouchableOpacity style={styles.headerButton}>
            <Calendar color={colors.text} size={24} />
          </TouchableOpacity>
        }
      />

      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}>
        <View style={styles.daySelector}>
          {days.map((day) => (
            <TouchableOpacity
              key={day}
              style={[
                styles.dayButton,
                selectedDay === day && {
                  backgroundColor: colors.primary,
                },
              ]}
              onPress={() => setSelectedDay(day)}>
              <Text
                style={[
                  styles.dayText,
                  {
                    color:
                      selectedDay === day ? colors.white : colors.textSecondary,
                  },
                ]}>
                {day}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.nutritionSummary}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Daily Nutrition
          </Text>
          <View style={[styles.nutritionCard, { backgroundColor: colors.cardBackground }]}>
            <View style={styles.nutritionRow}>
              <View style={styles.nutritionItem}>
                <Text style={[styles.nutritionValue, { color: colors.primary }]}>
                  1,850
                </Text>
                <Text style={[styles.nutritionLabel, { color: colors.textSecondary }]}>
                  Calories
                </Text>
              </View>
              <View style={styles.separator} />
              <View style={styles.nutritionItem}>
                <Text style={[styles.nutritionValue, { color: colors.primary }]}>
                  95g
                </Text>
                <Text style={[styles.nutritionLabel, { color: colors.textSecondary }]}>
                  Protein
                </Text>
              </View>
              <View style={styles.separator} />
              <View style={styles.nutritionItem}>
                <Text style={[styles.nutritionValue, { color: colors.primary }]}>
                  65g
                </Text>
                <Text style={[styles.nutritionLabel, { color: colors.textSecondary }]}>
                  Fat
                </Text>
              </View>
              <View style={styles.separator} />
              <View style={styles.nutritionItem}>
                <Text style={[styles.nutritionValue, { color: colors.primary }]}>
                  210g
                </Text>
                <Text style={[styles.nutritionLabel, { color: colors.textSecondary }]}>
                  Carbs
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.currentPlanSection}>
          <View style={styles.sectionHeaderRow}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Today's Plan
            </Text>
            <TouchableOpacity style={styles.viewAllButton}>
              <Text style={[styles.viewAllText, { color: colors.primary }]}>
                Edit
              </Text>
              <ChevronRight color={colors.primary} size={16} />
            </TouchableOpacity>
          </View>

          <View style={styles.mealsContainer}>
            {mockMealPlans.map((meal) => (
              <MealCard
                key={meal.id}
                meal={meal}
                colors={colors}
                cardStyle={styles.mealCard}
              />
            ))}
          </View>
        </View>

        <View style={styles.aiSection}>
          <View style={[styles.aiCard, { backgroundColor: colors.cardBackground }]}>
            <View style={styles.aiCardContent}>
              <View style={[styles.aiIconContainer, { backgroundColor: colors.primaryLight }]}>
                <Brain color={colors.primary} size={24} />
              </View>
              <View style={styles.aiTextContent}>
                <Text style={[styles.aiTitle, { color: colors.text }]}>
                  Smart Meal Planner
                </Text>
                <Text style={[styles.aiDescription, { color: colors.textSecondary }]}>
                  Get AI-powered meal suggestions based on your family's preferences and nutritional needs.
                </Text>
              </View>
            </View>
            <TouchableOpacity
              style={[styles.aiButton, { backgroundColor: colors.primary }]}>
              <Text style={[styles.aiButtonText, { color: colors.white }]}>
                Create New Plan
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.featuresSection}>
          <TouchableOpacity
            style={[
              styles.featureCard, 
              { backgroundColor: colors.cardBackground }
            ]}>
            <Users color={colors.primary} size={24} />
            <Text style={[styles.featureTitle, { color: colors.text }]}>
              Family Profiles
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.featureCard,
              { backgroundColor: colors.cardBackground }
            ]}>
            <Award color={colors.primary} size={24} />
            <Text style={[styles.featureTitle, { color: colors.text }]}>
              Rewards: 240 pts
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.recommendedSection}>
          <View style={styles.sectionHeaderRow}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Recommended for You
            </Text>
            <TouchableOpacity style={styles.viewAllButton}>
              <Text style={[styles.viewAllText, { color: colors.primary }]}>
                View all
              </Text>
              <ChevronRight color={colors.primary} size={16} />
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.recommendedList}>
            {mockRecommendedMeals.map((meal) => (
              <TouchableOpacity
                key={meal.id}
                style={[
                  styles.recommendedCard,
                  { backgroundColor: colors.cardBackground },
                ]}>
                <Image
                  source={{ uri: meal.imageUrl }}
                  style={styles.recommendedImage}
                />
                <View style={styles.recommendedCardContent}>
                  <Text
                    style={[styles.recommendedTitle, { color: colors.text }]}
                    numberOfLines={1}>
                    {meal.title}
                  </Text>
                  <Text
                    style={[
                      styles.recommendedSubtitle,
                      { color: colors.textSecondary },
                    ]}
                    numberOfLines={1}>
                    {meal.time} • {meal.calories} cal
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </Animated.ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 120,
  },
  daySelector: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  dayButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginHorizontal: 8,
  },
  dayText: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 14,
  },
  nutritionSummary: {
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  nutritionCard: {
    borderRadius: 12,
    padding: 16,
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
  nutritionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  nutritionItem: {
    flex: 1,
    alignItems: 'center',
  },
  nutritionValue: {
    fontSize: 18,
    fontFamily: 'Montserrat-Bold',
    marginBottom: 4,
  },
  nutritionLabel: {
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
  },
  separator: {
    height: 30,
    width: 1,
    backgroundColor: '#E0E0E0',
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Montserrat-SemiBold',
    marginBottom: 12,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewAllText: {
    fontSize: 14,
    fontFamily: 'Montserrat-Medium',
  },
  currentPlanSection: {
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  mealsContainer: {
    marginBottom: 8,
  },
  mealCard: {
    marginBottom: 12,
  },
  aiSection: {
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  aiCard: {
    borderRadius: 12,
    padding: 16,
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
  aiCardContent: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  aiIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  aiTextContent: {
    flex: 1,
  },
  aiTitle: {
    fontSize: 16,
    fontFamily: 'Montserrat-SemiBold',
    marginBottom: 4,
  },
  aiDescription: {
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
    lineHeight: 20,
  },
  aiButton: {
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  aiButtonText: {
    fontSize: 14,
    fontFamily: 'Montserrat-SemiBold',
  },
  featuresSection: {
    flexDirection: 'row',
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  featureCard: {
    flex: 1,
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 4,
    alignItems: 'center',
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
  featureTitle: {
    marginTop: 8,
    fontSize: 14,
    fontFamily: 'Montserrat-Medium',
    textAlign: 'center',
  },
  recommendedSection: {
    paddingHorizontal: 16,
  },
  recommendedList: {
    paddingRight: 16,
  },
  recommendedCard: {
    width: 160,
    borderRadius: 12,
    marginRight: 12,
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
  recommendedImage: {
    width: '100%',
    height: 120,
  },
  recommendedCardContent: {
    padding: 12,
  },
  recommendedTitle: {
    fontSize: 14,
    fontFamily: 'Montserrat-SemiBold',
    marginBottom: 4,
  },
  recommendedSubtitle: {
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
  },
  headerButton: {
    marginRight: 8,
  },
});