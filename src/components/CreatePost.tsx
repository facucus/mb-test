import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { useDropzone } from "react-dropzone";
import Modal from "react-modal";
import Button from "./Button";
import { useDispatch } from "react-redux";
import { createPost } from "../store/actions/createPost";
import { AppDispatch } from '../store/actions/login';
import { toast } from "react-toastify";

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
  text-align: center;
`;

const ModalBodyStyle = styled.div`
  display: flex;
  justify-content: space-between;

  .image-container {
    max-width: 20vw;
    img {
      width: 100%;
    }
  }

  .right {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  textarea {
    min-width: 20vw;
    height: 30vh;
    margin-bottom: 10px;
    margin-left: 20px;
  }
`;

const CreatePost: React.FunctionComponent<{ theme: string | Function }> = ({ theme }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState("");
  const dispatch: AppDispatch = useDispatch();

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: theme === "light" ? "#FFF" : "#423F3E",
    },
    overlay: {
      background: "rgba(0,0,0,.7)",
      zIndex: "1000",
    },
  };
  const onDrop = useCallback((acceptedFiles) => {
    setFile(acceptedFiles[0]);
  }, []);
  const { getRootProps, getInputProps, fileRejections, acceptedFiles }: any = useDropzone({
    onDrop,
    accept: "image/jpg, image/jpeg,image/png",
    maxSize: 3000000,
  });
  useEffect(() => {
    Modal.setAppElement("body");
  }, []);

  useEffect(() => {
    if (!fileRejections.length && acceptedFiles[0]) {
      setModalIsOpen(true);
    }
    fileRejections.forEach(({ errors }: any) => {
      errors.forEach((e: any) => {
        const errMsg = e.code === "file-too-large" ? "File is larger than 3MB" : e.message;
        toast(errMsg, { type: "error" });
      });
    });
  }, [fileRejections, acceptedFiles]);

  const handleClose = () => {
    setFile(null);
    setModalIsOpen(false);
  };

  const handleCreatePost = () => {
    if (file && description) {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        dispatch(createPost(event.target.result, description)).then(() => {
          handleClose();
        });
      };
      reader.readAsDataURL(file);
    }
  };
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
