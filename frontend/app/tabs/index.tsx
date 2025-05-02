import { useState, useRef, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
  Platform,
  RefreshControl,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@/contexts/ThemeContext';
import { Heart, MessageCircle, Bookmark, Share2, MoveHorizontal as MoreHorizontal } from 'lucide-react-native';
import Header from '@/components/Header';
import UserAvatar from '@/components/UserAvatar';
import { mockPosts } from '@/data/mockData';

export default function SocialFeedScreen() {
  const { colors } = useTheme();
  const [refreshing, setRefreshing] = useState(false);
  const [posts, setPosts] = useState(mockPosts);
  const scrollY = useRef(new Animated.Value(0)).current;

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Simulate fetching new data
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  }, []);

  const likePost = (postId) => {
    setPosts(
      posts.map((post) =>
        post.id === postId ? { ...post, liked: !post.liked, likes: post.liked ? post.likes - 1 : post.likes + 1 } : post
      )
    );
  };

  const bookmarkPost = (postId) => {
    setPosts(
      posts.map((post) =>
        post.id === postId ? { ...post, bookmarked: !post.bookmarked } : post
      )
    );
  };

  const renderStoryItem = ({ item }) => (
    <TouchableOpacity style={styles.storyContainer}>
      <View
        style={[
          styles.storyRing,
          { borderColor: item.seen ? colors.border : colors.accent },
        ]}>
        <Image source={{ uri: item.avatar }} style={styles.storyAvatar} />
      </View>
      <Text
        style={[
          styles.storyUsername,
          { color: colors.text, opacity: item.seen ? 0.7 : 1 },
        ]}
        numberOfLines={1}>
        {item.username}
      </Text>
    </TouchableOpacity>
  );

  const renderPost = ({ item }) => (
    <View
      style={[styles.postContainer, { backgroundColor: colors.cardBackground }]}>
      <View style={styles.postHeader}>
        <View style={styles.userInfo}>
          <UserAvatar uri={item.userAvatar} size={40} />
          <View style={styles.postHeaderText}>
            <Text style={[styles.username, { color: colors.text }]}>
              {item.username}
            </Text>
            <Text style={[styles.timestamp, { color: colors.textSecondary }]}>
              {item.timeAgo} • {item.category}
            </Text>
          </View>
        </View>
        <TouchableOpacity>
          <MoreHorizontal color={colors.textSecondary} size={20} />
        </TouchableOpacity>
      </View>

      <View style={styles.postImageContainer}>
        <Image
          source={{ uri: item.imageUrl }}
          style={styles.postImage}
          resizeMode="cover"
        />
      </View>

      <View style={styles.postActions}>
        <View style={styles.leftActions}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => likePost(item.id)}>
            <Heart
              size={24}
              color={item.liked ? colors.heart : colors.textSecondary}
              fill={item.liked ? colors.heart : 'transparent'}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <MessageCircle size={24} color={colors.textSecondary} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Share2 size={24} color={colors.textSecondary} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => bookmarkPost(item.id)}>
          <Bookmark
            size={24}
            color={colors.textSecondary}
            fill={item.bookmarked ? colors.textSecondary : 'transparent'}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.postContent}>
        <Text style={[styles.likesCount, { color: colors.text }]}>
          {item.likes} likes
        </Text>
        <Text style={[styles.caption, { color: colors.text }]}>
          <Text style={styles.captionUsername}>{item.username}</Text>{' '}
          {item.caption}
        </Text>
        {item.tags.length > 0 && (
          <Text style={[styles.tags, { color: colors.primary }]}>
            {item.tags.map(tag => `#${tag}`).join(' ')}
          </Text>
        )}
        <TouchableOpacity>
          <Text style={[styles.viewComments, { color: colors.textSecondary }]}>
            View all {item.commentCount} comments
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <Header
        title="MealMaster"
        scrollY={scrollY}
        rightComponent={
          <TouchableOpacity style={styles.headerButton}>
            <Heart color={colors.text} size={24} />
          </TouchableOpacity>
        }
      />

      <Animated.FlatList
        data={posts}
        renderItem={renderPost}
        keyExtractor={item => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
        ListHeaderComponent={() => (
          <View style={styles.storiesContainer}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Trending Recipes
            </Text>
            <FlatList
              data={mockPosts}
              renderItem={renderStoryItem}
              keyExtractor={item => `story-${item.id}`}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.storiesList}
            />
          </View>
        )}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.primary}
            colors={[colors.primary]}
          />
        }
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      />
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
  storiesContainer: {
    marginTop: 10,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Montserrat-SemiBold',
    marginHorizontal: 16,
    marginBottom: 12,
  },
  storiesList: {
    paddingHorizontal: 8,
  },
  storyContainer: {
    alignItems: 'center',
    marginHorizontal: 8,
    width: 72,
  },
  storyRing: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 2,
    padding: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  storyAvatar: {
    width: 62,
    height: 62,
    borderRadius: 31,
  },
  storyUsername: {
    marginTop: 4,
    fontSize: 12,
    fontFamily: 'Montserrat-Medium',
    textAlign: 'center',
  },
  postContainer: {
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
    marginHorizontal: 16,
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
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  postHeaderText: {
    marginLeft: 10,
  },
  username: {
    fontSize: 14,
    fontFamily: 'Montserrat-SemiBold',
  },
  timestamp: {
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
  },
  postImageContainer: {
    width: '100%',
    height: 375,
    backgroundColor: '#f0f0f0',
  },
  postImage: {
    width: '100%',
    height: '100%',
  },
  postActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  leftActions: {
    flexDirection: 'row',
  },
  actionButton: {
    marginRight: 16,
  },
  postContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  likesCount: {
    fontSize: 14,
    fontFamily: 'Montserrat-SemiBold',
    marginBottom: 6,
  },
  caption: {
    fontSize: 14,
    lineHeight: 20,
    fontFamily: 'Montserrat-Regular',
    marginBottom: 6,
  },
  captionUsername: {
    fontFamily: 'Montserrat-SemiBold',
  },
  tags: {
    fontSize: 14,
    fontFamily: 'Montserrat-Medium',
    marginBottom: 8,
  },
  viewComments: {
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
  },
  headerButton: {
    marginRight: 8,
  },
});