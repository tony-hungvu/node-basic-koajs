import {
  Comments,
  CountCommentsAndPosts,
  MappedData,
  Posts,
  Users,
  commentsUrl,
  postUrl,
} from './share/data-distionary';

// Excercise 1: Get all the posts and comments from the API. Map the data with the users array
new Map(Users.map((user) => [user.id, user]));

const mappedData = Users.map((user) => {
  const userPosts = Posts.filter((post) => post.userId === user.id);
  const userComments = Comments.filter(
    (comment) =>
      comment.postId in
      userPosts.reduce((acc, post) => ({ ...acc, [post.id]: true }), {})
  );
  return { ...user, comments: userComments, posts: userPosts };
});

console.log(mappedData);

// Excercise 2: Filter only users with more than 3 comments.
const usersWithMoreThanThreeComments = MappedData.filter(
  (user) => user.comments.length > 3
);

console.log(usersWithMoreThanThreeComments);

// Excercise 3: Reformat the data with the count of comments and posts
const reformattedData = MappedData.map((user) => {
  const commentsCount = user.comments.length;
  const postsCount = user.posts.length;

  const { id, name, username, email } = user;
  return {
    id,
    name,
    username,
    email,
    commentsCount,
    postsCount,
  };
});

console.log(reformattedData);

// Excercise 4: Who is the user with the most comments/posts?
let maxComments = 0;
let userWithMostComments;

MappedData.forEach((user) => {
  const numComments = user.comments.length;
  if (numComments > maxComments) {
    maxComments = numComments;
    userWithMostComments = user;
  }
});

console.log(
  `User with the most comments:, ${JSON.stringify(userWithMostComments)}`
);

// Excercise 5: Sort the list of users by the postsCount value descending?
CountCommentsAndPosts.sort((a, b) => b.postsCount - a.postsCount);

console.log(
  `Sorted list of users by postCount descending: ${JSON.stringify(
    CountCommentsAndPosts
  )}`
);

// Excercise 6: Get the post with ID of 1 via API request, at the same time get comments for post ID of 1 via another API request
Promise.all([
  fetch(postUrl).then((response) => response.json()),
  fetch(commentsUrl).then((response) => response.json()),
])
  .then(([postData, commentsData]) => {
    const mergedData = {
      post: {
        ...postData,
        comments: commentsData,
      },
    };
    console.log(`Merged Data: ${JSON.stringify(mergedData)}`);
  })
  .catch((error) => {
    console.log('Error:', error);
  });
