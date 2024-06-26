import {
  comments,
  commentsUrl,
  countCommentsAndPosts,
  mappedDatas,
  postUrl,
  posts,
  users,
} from './share/data-distionary';

// Excercise 1: Get all the posts and comments from the API. Map the data with the users array
new Map(users.map((user) => [user.id, user]));

const mappedUser = users.map((user) => {
  const userPosts = posts.filter((post) => post.userId === user.id);
  const userComments = comments.filter(
    (comment) =>
      comment.postId in
      userPosts.reduce((acc, post) => ({ ...acc, [post.id]: true }), {})
  );
  return { ...user, comments: userComments, posts: userPosts };
});

console.log(mappedUser);

// Excercise 2: Filter only users with more than 3 comments.
const usersWithMoreThanThreeComments = mappedDatas.filter(
  (user) => user.comments.length > 3
);

console.log(usersWithMoreThanThreeComments);

// Excercise 3: Reformat the data with the count of comments and posts
const reformattedData = mappedDatas.map((user) => {
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

mappedDatas.forEach((user) => {
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
countCommentsAndPosts.sort((a, b) => b.postsCount - a.postsCount);

console.log(
  `Sorted list of users by postCount descending: ${JSON.stringify(
    countCommentsAndPosts
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
