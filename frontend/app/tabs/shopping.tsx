import { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Animated,
  Image,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@/contexts/ThemeContext';
import {
  Filter,
  ChevronRight,
  Check,
  ArrowRight,
  ShoppingBag,
  Plus,
  Minus,
  ChevronUp,
  ChevronDown,
} from 'lucide-react-native';
import Header from '@/components/Header';
import { mockIngredients, mockShoppingLists } from '@/data/mockData';

export default function ShoppingScreen() {
  const { colors } = useTheme();
  const scrollY = useRef(new Animated.Value(0)).current;
  const [expandedSections, setExpandedSections] = useState(['mealKit', 'suggested']);
  const [cartItems, setCartItems] = useState(mockIngredients);

  const toggleSection = (section) => {
    if (expandedSections.includes(section)) {
      setExpandedSections(expandedSections.filter((s) => s !== section));
    } else {
      setExpandedSections([...expandedSections, section]);
    }
  };

  const updateQuantity = (id, increment) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: Math.max(1, item.quantity + increment),
            }
          : item
      )
    );
  };

  const toggleCartItem = (id) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, selected: !item.selected } : item
      )
    );
  };

  const totalPrice = cartItems
    .filter((item) => item.selected)
    .reduce((sum, item) => sum + item.price * item.quantity, 0);
  
  const totalItems = cartItems
    .filter((item) => item.selected)
    .reduce((sum, item) => sum + item.quantity, 0);

  const renderCartItem = ({ item }) => (
    <View style={[styles.cartItem, { borderBottomColor: colors.border }]}>
      <TouchableOpacity
        style={styles.selectButton}
        onPress={() => toggleCartItem(item.id)}>
        <View
          style={[
            styles.checkbox,
            {
              backgroundColor: item.selected
                ? colors.primary
                : 'transparent',
              borderColor: item.selected ? colors.primary : colors.border,
            },
          ]}>
          {item.selected && <Check size={14} color={colors.white} />}
        </View>
      </TouchableOpacity>
      <Image source={{ uri: item.image }} style={styles.ingredientImage} />
      <View style={styles.itemDetails}>
        <Text style={[styles.itemName, { color: colors.text }]}>
          {item.name}
        </Text>
        <Text style={[styles.itemPrice, { color: colors.textSecondary }]}>
          ${item.price.toFixed(2)} {item.unit && `/ ${item.unit}`}
        </Text>
      </View>
      <View style={styles.quantityControls}>
        <TouchableOpacity
          style={[styles.quantityButton, { borderColor: colors.border }]}
          onPress={() => updateQuantity(item.id, -1)}>
          <Minus size={16} color={colors.textSecondary} />
        </TouchableOpacity>
        <Text style={[styles.quantityText, { color: colors.text }]}>
          {item.quantity}
        </Text>
        <TouchableOpacity
          style={[styles.quantityButton, { borderColor: colors.border }]}
          onPress={() => updateQuantity(item.id, 1)}>
          <Plus size={16} color={colors.primary} />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <Header
        title="Shopping"
        scrollY={scrollY}
        rightComponent={
          <TouchableOpacity style={styles.headerButton}>
            <Filter color={colors.text} size={24} />
          </TouchableOpacity>
        }
      />

      <Animated.FlatList
        data={cartItems}
        renderItem={renderCartItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => (
          <>
            <View style={styles.listSection}>
              <View style={styles.sectionHeaderRow}>
                <Text style={[styles.sectionTitle, { color: colors.text }]}>
                  My Shopping Lists
                </Text>
                <TouchableOpacity style={styles.viewAllButton}>
                  <Text style={[styles.viewAllText, { color: colors.primary }]}>
                    View all
                  </Text>
                  <ChevronRight size={16} color={colors.primary} />
                </TouchableOpacity>
              </View>

              <FlatList
                data={mockShoppingLists}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={[
                      styles.shoppingListCard,
                      { backgroundColor: colors.cardBackground },
                    ]}>
                    <View
                      style={[
                        styles.listIconContainer,
                        { backgroundColor: colors.primaryLight },
                      ]}>
                      <ShoppingBag size={20} color={colors.primary} />
                    </View>
                    <Text
                      style={[styles.listName, { color: colors.text }]}
                      numberOfLines={1}>
                      {item.name}
                    </Text>
                    <Text
                      style={[
                        styles.listItemCount,
                        { color: colors.textSecondary },
                      ]}>
                      {item.itemCount} items
                    </Text>
                  </TouchableOpacity>
                )}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.shoppingListsContainer}
              />
            </View>

            <TouchableOpacity 
              style={[styles.mealKitBanner, { backgroundColor: colors.primary }]}
              onPress={() => {}}
            >
              <View style={styles.mealKitContent}>
                <Text style={[styles.mealKitTitle, { color: colors.white }]}>
                  Get Meal Kit Delivery
                </Text>
                <Text style={[styles.mealKitSubtitle, { color: colors.white }]}>
                  Pre-portioned ingredients for this week's meals
                </Text>
              </View>
              <ArrowRight size={24} color={colors.white} />
            </TouchableOpacity>

            <View style={styles.collapsibleSection}>
              <TouchableOpacity
                style={styles.sectionHeader}
                onPress={() => toggleSection('mealKit')}>
                <Text style={[styles.sectionTitle, { color: colors.text }]}>
                  From Your Meal Plan
                </Text>
                {expandedSections.includes('mealKit') ? (
                  <ChevronUp size={20} color={colors.textSecondary} />
                ) : (
                  <ChevronDown size={20} color={colors.textSecondary} />
                )}
              </TouchableOpacity>
            </View>

            <View style={styles.collapsibleSection}>
              <TouchableOpacity
                style={styles.sectionHeader}
                onPress={() => toggleSection('suggested')}>
                <Text style={[styles.sectionTitle, { color: colors.text }]}>
                  Suggested Items
                </Text>
                {expandedSections.includes('suggested') ? (
                  <ChevronUp size={20} color={colors.textSecondary} />
                ) : (
                  <ChevronDown size={20} color={colors.textSecondary} />
                )}
              </TouchableOpacity>
            </View>

            <View style={styles.cartHeaderSection}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>
                Your Cart
              </Text>
              <Text style={[styles.cartSummary, { color: colors.textSecondary }]}>
                {totalItems} items selected
              </Text>
            </View>
          </>
        )}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
        ListFooterComponent={() => <View style={{ height: 100 }} />}
      />

      <View style={[styles.checkoutBar, { backgroundColor: colors.cardBackground, borderTopColor: colors.border }]}>
        <View style={styles.priceContainer}>
          <Text style={[styles.totalLabel, { color: colors.textSecondary }]}>
            Total:
          </Text>
          <Text style={[styles.totalPrice, { color: colors.text }]}>
            ${totalPrice.toFixed(2)}
          </Text>
        </View>
        <TouchableOpacity
          style={[styles.checkoutButton, { backgroundColor: colors.primary }]}>
          <Text style={[styles.checkoutButtonText, { color: colors.white }]}>
            Checkout
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingBottom: 20,
  },
  listSection: {
    marginBottom: 20,
    paddingHorizontal: 16,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Montserrat-SemiBold',
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewAllText: {
    fontSize: 14,
    fontFamily: 'Montserrat-Medium',
    marginRight: 4,
  },
  shoppingListsContainer: {
    paddingBottom: 8,
  },
  shoppingListCard: {
    width: 140,
    padding: 12,
    borderRadius: 12,
    marginRight: 12,
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
  listIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  listName: {
    fontSize: 14,
    fontFamily: 'Montserrat-SemiBold',
    marginBottom: 4,
  },
  listItemCount: {
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
  },
  mealKitBanner: {
    marginHorizontal: 16,
    marginBottom: 20,
    padding: 16,
    borderRadius:
    12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  mealKitContent: {
    flex: 1,
  },
  mealKitTitle: {
    fontSize: 16,
    fontFamily: 'Montserrat-SemiBold',
    marginBottom: 4,
  },
  mealKitSubtitle: {
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
    opacity: 0.9,
  },
  collapsibleSection: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 10,
  },
  cartHeaderSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 12,
    marginTop: 8,
  },
  cartSummary: {
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
  },
  selectButton: {
    marginRight: 12,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 4,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ingredientImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 12,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 14,
    fontFamily: 'Montserrat-Medium',
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityText: {
    fontSize: 14,
    fontFamily: 'Montserrat-Medium',
    marginHorizontal: 8,
    minWidth: 20,
    textAlign: 'center',
  },
  checkoutBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderTopWidth: 1,
    ...Platform.select({
      ios: {
        paddingBottom: 24,
      },
    }),
  },
  priceContainer: {
    flex: 1,
  },
  totalLabel: {
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
  },
  totalPrice: {
    fontSize: 18,
    fontFamily: 'Montserrat-Bold',
  },
  checkoutButton: {
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 10,
  },
  checkoutButtonText: {
    fontSize: 16,
    fontFamily: 'Montserrat-SemiBold',
  },
  headerButton: {
    marginRight: 8,
  },
});