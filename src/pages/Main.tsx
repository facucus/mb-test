import React, {useEffect, useRef, useCallback} from "react";
import { useDispatch, useSelector } from "react-redux";

import {getPosts} from "../store/actions/posts"
import { Post } from '../mocks/handlers';
import Card from "../components/Card";
import Grid from "../components/Grid";
import { AppState } from "../store/reducers";
import Spinner from "../components/Spinner";

const Main: React.FunctionComponent<{}> = () => {
  const postsState = useSelector((state: AppState) => state.posts);
  const dispatch = useDispatch();
  const observer = useRef<IntersectionObserver>();
  const lastPostRef = useCallback(
    (node: Element) => {
      if (postsState.isLoading) return;
      if (observer && observer.current) {
        observer.current.disconnect();
      }
      observer.current = new IntersectionObserver((entries: any) => {
        if (entries[0].isIntersecting && postsState.next) {
          dispatch(getPosts(postsState.next));
        }
      });

      if (node) {
        observer.current.observe(node);
      }
    },
    [postsState.isLoading, postsState.next, dispatch]
  );


  
  useEffect(() => {
    if (!postsState.posts.length && !postsState.isLoading) {
      dispatch(getPosts());
    }
  }, [postsState.posts.length,postsState.isLoading, dispatch]);
  
  return (
    <div>
      <Grid>
        {postsState.posts.map((p: Post, index: number) => {
          if (postsState.posts.length === index + 1) {
            return <Card key={p.id} {...p} myref={lastPostRef} />;
          }
          return <Card key={p.id} {...p} />;
        })}
      </Grid>
      <Spinner show={postsState.isLoading} />
    </div>
  );
};

export default Main;
