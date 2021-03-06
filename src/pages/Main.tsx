import React, {useRef, useCallback} from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from 'styled-components';

import {getPosts} from "../store/actions/posts"
import { Post } from '../mocks/handlers';
import Card from "../components/Card";
import Grid from "../components/Grid";
import { AppState } from "../store/reducers";
import Spinner from "../components/Spinner";
import useEffectOnce from "../hooks/useEffectOnce";

const NotFoundStyle = styled.h3`
  text-align: center;
`

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


  useEffectOnce(() => {
    if (!postsState.posts.length && !postsState.isLoading) {
      dispatch(getPosts());
    }
  })
  // useEffect(() => {
  //   if (!postsState.posts.length && !postsState.isLoading) {
  //     dispatch(getPosts());
  //   }
  // }, [postsState.posts.length,postsState.isLoading, dispatch]);
  
  if(!postsState.posts.length && !postsState.isLoading) {
    return <NotFoundStyle>We couldn't found any Posts</NotFoundStyle>
  }

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
