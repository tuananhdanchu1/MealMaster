// Mock data for the MealMaster app

// Mock posts for the social feed
export const mockPosts = [
  {
    id: 1,
    username: 'SophieKitchen',
    userAvatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=600',
    imageUrl: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=600',
    caption: 'Made this amazing salmon avocado bowl for dinner tonight! So fresh and healthy.',
    timeAgo: '2h',
    likes: 127,
    commentCount: 18,
    tags: ['healthyeating', 'quickmeals', 'omega3'],
    liked: false,
    bookmarked: false,
    seen: false,
    category: 'Dinner',
  },
  {
    id: 2,
    username: 'TheBusyMom',
    userAvatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600',
    imageUrl: 'https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?auto=compress&cs=tinysrgb&w=600',
    caption: 'Sunday meal prep for the week! 5 lunches ready to go in under an hour.',
    timeAgo: '5h',
    likes: 208,
    commentCount: 32,
    tags: ['mealprep', 'savetime', 'busymom'],
    liked: true,
    bookmarked: true,
    seen: false,
    category: 'Meal Prep',
  },
  {
    id: 3,
    username: 'FamilyChef',
    userAvatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=600',
    imageUrl: 'https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg?auto=compress&cs=tinysrgb&w=600',
    caption: 'My kids absolutely loved these homemade chicken tenders! Healthier than takeout and just as delicious.',
    timeAgo: '1d',
    likes: 156,
    commentCount: 24,
    tags: ['kidapproved', 'homemade', 'familydinner'],
    liked: false,
    bookmarked: false,
    seen: true,
    category: 'Kid-friendly',
  },
  {
    id: 4,
    username: 'NutritionMom',
    userAvatar: 'https://images.pexels.com/photos/789822/pexels-photo-789822.jpeg?auto=compress&cs=tinysrgb&w=600',
    imageUrl: 'https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg?auto=compress&cs=tinysrgb&w=600',
    caption: 'Breakfast smoothie bowls are a hit with the whole family! Packed with fruits, yogurt and granola.',
    timeAgo: '2d',
    likes: 173,
    commentCount: 21,
    tags: ['smoothiebowl', 'breakfast', 'healthystart'],
    liked: false,
    bookmarked: true,
    seen: true,
    category: 'Breakfast',
  },
];

// Mock meal plans
export const mockMealPlans = [
  {
    id: 1,
    title: 'Lemon Herb Grilled Chicken',
    time: '30 min',
    imageUrl: 'https://images.pexels.com/photos/2673353/pexels-photo-2673353.jpeg?auto=compress&cs=tinysrgb&w=600',
    calories: 420,
    type: 'Dinner',
  },
  {
    id: 2,
    title: 'Protein-Packed Quinoa Bowl',
    time: '25 min',
    imageUrl: 'https://images.pexels.com/photos/1211887/pexels-photo-1211887.jpeg?auto=compress&cs=tinysrgb&w=600',
    calories: 380,
    type: 'Lunch',
  },
  {
    id: 3,
    title: 'Blueberry Oatmeal Pancakes',
    time: '20 min',
    imageUrl: 'https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=600',
    calories: 340,
    type: 'Breakfast',
  },
];

// Mock recommended meals
export const mockRecommendedMeals = [
  {
    id: 1,
    title: 'Mediterranean Pasta',
    time: '25 min',
    calories: 450,
    imageUrl: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 2,
    title: 'Spinach Turkey Wraps',
    time: '15 min',
    calories: 320,
    imageUrl: 'https://images.pexels.com/photos/7406784/pexels-photo-7406784.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 3,
    title: 'Veggie Stir Fry',
    time: '20 min',
    calories: 380,
    imageUrl: 'https://images.pexels.com/photos/262897/pexels-photo-262897.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 4,
    title: 'Baked Salmon',
    time: '30 min',
    calories: 410,
    imageUrl: 'https://images.pexels.com/photos/3655916/pexels-photo-3655916.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
];

// Mock shopping lists
export const mockShoppingLists = [
  {
    id: 1,
    name: 'Weekly Dinners',
    itemCount: 23,
  },
  {
    id: 2,
    name: 'Healthy Lunches',
    itemCount: 12,
  },
  {
    id: 3,
    name: 'Party Snacks',
    itemCount: 8,
  },
];

// Mock ingredients for shopping
export const mockIngredients = [
  {
    id: 1,
    name: 'Organic Chicken Breast',
    price: 9.99,
    unit: 'lb',
    quantity: 2,
    selected: true,
    image: 'https://images.pexels.com/photos/616354/pexels-photo-616354.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 2,
    name: 'Avocados',
    price: 1.49,
    unit: 'each',
    quantity: 3,
    selected: true,
    image: 'https://images.pexels.com/photos/2228553/pexels-photo-2228553.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 3,
    name: 'Quinoa',
    price: 5.99,
    unit: 'box',
    quantity: 1,
    selected: true,
    image: 'https://images.pexels.com/photos/7421208/pexels-photo-7421208.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 4,
    name: 'Greek Yogurt',
    price: 4.29,
    unit: 'container',
    quantity: 2,
    selected: false,
    image: 'https://images.pexels.com/photos/4062274/pexels-photo-4062274.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 5,
    name: 'Fresh Spinach',
    price: 3.49,
    unit: 'bag',
    quantity: 1,
    selected: true,
    image: 'https://images.pexels.com/photos/2325843/pexels-photo-2325843.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 6,
    name: 'Sweet Potatoes',
    price: 0.99,
    unit: 'lb',
    quantity: 3,
    selected: false,
    image: 'https://images.pexels.com/photos/2286776/pexels-photo-2286776.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
];