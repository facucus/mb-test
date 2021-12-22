import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { likePost } from "../../store/actions/posts";
import { formatDate } from "../../utils/formatDate";

interface CardStylesProps {
  readonly padding?: string;
}

interface ICardProps {
  id: string;
  imageUrl: string;
  create_at: string;
  likes: number;
  description: string;
  likedPost: boolean;
  myref?: any;
  padding?: string;
}

export const CardStyle = styled.div<CardStylesProps>`
  border-radius: 15px;
  background-color:${({ theme }) => theme.cardBg};
  border: ${({ theme }) => `1px solid ${theme.cardBorder}`};
  max-width: 640px;
  padding: ${(props) => (props.padding ? props.padding : "0px")};

  .container {
    position: relative;
    img {
      width: 100%;
      border-radius: 15px 15px 0 0;
      
    }

    .like-container {
      position: absolute;
      bottom: 0;
      right: 0;
      z-index: 10;
      background-color: ${({ theme }) => theme.body};
      padding: 8px;
      border: ${({ theme }) => `1px solid ${theme.divider}`};

      label {
        cursor: pointer;
        color: ${({ theme }) => theme.textPrimary};
      }
    }
  }

  .info {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
  }

  p {
    margin: 0;
  }

  .description {
    padding: 10px;
  }
`;


const ImageContainer = styled.div<{ src: string }>`
  border-radius: 15px 15px 0 0;
  height: 350px;
  background-image: ${({ src }) => `url(${src})`};
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

const Card: React.FunctionComponent<ICardProps> = ({
  id,
  imageUrl,
  create_at,
  likes,
  description,
  likedPost,
  padding,
  myref,
}) => {
  const dispatch = useDispatch();
  const handleLike = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(likePost(id));
  }
  return (
    <CardStyle ref={myref ? myref : null} padding={padding}>
      <div>
        <div className="container">
          <ImageContainer src={imageUrl} />
          {/* <img src={imageUrl} alt="post pic" /> */}
          <div className="like-container">
            <label>
              <input
                data-testid="likedPost"
                onChange={handleLike}
                type="checkbox"
                checked={likedPost}
              />
              Like
            </label>
          </div>
        </div>
        <div className="info">
          <p>{formatDate(create_at)}</p>
          <p>{likes} likes</p>
        </div>
        <p className="description">{description}</p>
      </div>
    </CardStyle>
  );
};

export default Card;
