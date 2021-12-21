import { rest } from "msw";
import { v4 as uuidv4 } from "uuid";
import * as storage from "../utils/storage"
import queryString from "query-string"
import { PostsResponse } from "../store/actions/posts";

interface LoginBody {
  username: string;
  password: string;
}

interface SignupBody {
  username: string;
  password: string;
  confirmPassword: string;
}

interface CreatePostBody {
  file: string;
  description: string;
}

export interface Post {
  id: string;
  imageUrl: string;
  likes: number;
  likedPost: boolean;
  description: string;
  create_at: string;
}

interface PostQuery {
  offset?: string;
  limit?: string;
  query?: string;
}

// /login - POST - ok
// /signup - POST - ok
// /posts - POST - ok
// /posts/:id/like - PUT - ok
// /posts - GET - ok

export const handlers = [
  rest.post<LoginBody>("/login", (req, res, ctx) => {
    const { username, password } = req.body;
    if (username === "test" && password === "test") {
      return res(ctx.status(200), ctx.json({ username, photoUrl: "" }));
    }

    return res(
      ctx.status(401),
      ctx.json({
        errorMessage: "Not authorized",
      })
    );
  }),
  rest.post<SignupBody>("/signup", (req, res, ctx) => {
    const { username, password, confirmPassword } = req.body;
    if (username && password === confirmPassword) {
      storage.set("is-authenticated", true);
      return res(ctx.status(200), ctx.json({ username, photoUrl: "" }));
    }

    return res(
      ctx.status(400),
      ctx.json({
        errorMessage: "Bad request",
      })
    );
  }),
  rest.get("/posts", async (req, res, ctx) => {
    const { offset, limit, query }: PostQuery = queryString.parse(
      req.url.search
    );
    const offsetToNumber = Number(offset);
    const limitToNumber = Number(limit);
    const posts = await storage.get("db");

    const sortedPostsByDate = posts.sort(function (a: Post, b: Post) {
      return new Date(b.create_at).getTime() - new Date(a.create_at).getTime();
    });

    let response: PostsResponse = {
      posts: [],
      next: null,
    };

    if (query) {
      response.posts = sortedPostsByDate.filter(
        (p: Post) =>
          p.description.toLowerCase().indexOf(query.toLowerCase()) !== -1
      );
    } else {
      response = {
        posts: sortedPostsByDate.filter((p: Post, index: number) => {
          return (
            index >= offsetToNumber && index < offsetToNumber + limitToNumber
          );
        }),
        next:
          offsetToNumber + limitToNumber >= posts.length
            ? null
            : `/posts?offset=${offsetToNumber + 10}&limit=10`,
      };
    }

    return res(ctx.delay(3000), ctx.status(200), ctx.json({ posts: response }));
  }),
  rest.put("/posts/:postId/like", async (req, res, ctx) => {
    const posts = await storage.get("db");
    const { postId } = req.params;
    let postModified: Post | null = null;
    const newPosts = posts.map((p: Post) => {
      if (p.id === postId) {
        postModified = {
          ...p,
          likes: p.likedPost ? p.likes - 1 : p.likes + 1,
          likedPost: !p.likedPost,
        };
        return postModified;
      }
      return p;
    });
    await storage.set("db", newPosts);

    return res(ctx.status(200), ctx.json({ post: postModified }));
  }),
  rest.post<CreatePostBody>("/posts", async (req, res, ctx) => {
    const { file, description } = req.body;
    const newPost: Post = {
      id: uuidv4(),
      imageUrl: file,
      likes: 0,
      likedPost: false,
      description,
      create_at: new Date().toString(),
    };

    const db = storage.get("db");
    const newDB = [newPost, ...db];

    storage.remove("db");
    storage.set("db", newDB);

    return res(
      ctx.status(200),
      ctx.json({ post: newPost})
    )
  }),
];