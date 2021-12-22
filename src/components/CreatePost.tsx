import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { useDropzone } from "react-dropzone";
import Modal from "react-modal";
import Button from "./Button";
import { useDispatch } from "react-redux";
import { createPost } from "../store/actions/createPost";
import { AppDispatch } from '../store/actions/login';

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
  overlay: {
    background: "rgba(0,0,0,.7)",
    zIndex: "1000"
  }
};

const DropStyle = styled.div`
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.cardBg};
  border: ${({ theme }) => theme.navbarBorder};
  color: ${({ theme }) => theme.textPrimary};
  padding: 8px 20px;

  span {
    font-size: 50px;
  }
`;

const ModalHeaderStyle = styled.h3`
`

const ModalBodyStyle = styled.div`
  display: flex;
  justify-content: space-between;

  .image-container {
    max-width:200px;
    img {
      width: 100%;
    }
  }

  .right {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const CreatePost: React.FunctionComponent<{}> = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState("");
  const dispatch: AppDispatch = useDispatch();

  const onDrop = useCallback((acceptedFiles) => {
    setFile(acceptedFiles[0]);
    setModalIsOpen(true);
  }, []);
  const { getRootProps, getInputProps } = useDropzone({ onDrop });
  
  useEffect(() => {
    Modal.setAppElement("body");
  }, []);

  const handleClose = () => {
    setFile(null);
    setModalIsOpen(false);
  };
  
  const handleCreatePost = () => {
    if(file && description) {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        dispatch(createPost(event.target.result, description)).then(() => {
          handleClose();
        });
      };
      reader.readAsDataURL(file);
    }
  }
  return (
    <div>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <DropStyle>
          <span>+</span> Drag image here to post it
        </DropStyle>
      </div>
      <Modal
        style={customStyles}
        isOpen={modalIsOpen}
        onRequestClose={handleClose}
        contentLabel="house detail modal"
      >
        <ModalHeaderStyle>New Post</ModalHeaderStyle>
        <ModalBodyStyle>
          <div className="image-container">
            {file && <img src={URL.createObjectURL(file)} alt="new post" />}
          </div>
          <div className="right">
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <div>
              <Button onClick={handleCreatePost}>Post</Button>
            </div>
          </div>
        </ModalBodyStyle>
      </Modal>
    </div>
  );
};

export default CreatePost;
