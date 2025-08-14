import { useRef } from "react";
import { EditShelfItemDto } from "../../types";
import { Button } from "antd";
import { useUserShelfItemContext } from "../../store";
import styles from "./EditItem.module.scss";
import { TextAreaRef } from "antd/es/input/TextArea";
import { useEditShelfItemDetailsMutation } from "../../store/shelfApi";
import { QueryStatus } from "@reduxjs/toolkit/query";
import { useNavigate } from "react-router-dom";
import { StatusSelector } from "./StatusSelector";
import { NotesTextArea } from "./NotesTextarea";
import { DifficultySlider } from "./DifficultySlider";
import { useMessageContext } from "../../store/MessageContext";

export const EditItemForm = () => {
  const { id, status, difficulty } = useUserShelfItemContext();
  const statusRef = useRef(status);
  const difficultyRef = useRef(difficulty);
  const notesRef = useRef<TextAreaRef>(null);
  const navigate = useNavigate();
  const [editShelfDetails, result] = useEditShelfItemDetailsMutation();
  const messageApi = useMessageContext();

  const handleSave = async () => {
    try {
      const newStatus = statusRef.current;
      const newNotes = notesRef.current?.resizableTextArea?.textArea?.value;
      const newDifficulty = difficultyRef.current;

      const dto: EditShelfItemDto = {
        status: newStatus,
        difficulty: newDifficulty,
        notes: newNotes ?? "",
      };

      await editShelfDetails({ id, body: dto }).unwrap();
    } catch (e: any) {
      console.error(e);
      let errorMessage = "";
      if (e.response) {
        errorMessage = e.response?.data.message || errorMessage;
      }
      messageApi.error(errorMessage || "Operation failed. Please try again.");
      return;
    }
  };

  const handleCancel = () => {
    navigate(`/shelf/${id}`);
  };

  if (result.status === QueryStatus.fulfilled) {
    navigate(`/shelf/${id}?edited=true`);
  }

  return (
    <>
      <div className={styles.form}>
        <StatusSelector statusRef={statusRef} />
        <DifficultySlider difficultyRef={difficultyRef} />
        <NotesTextArea notesRef={notesRef} />
        <div className={styles.buttonRow}>
          <Button type="primary" onClick={handleSave}>
            Save
          </Button>
          <Button onClick={handleCancel}>Cancel</Button>
        </div>
      </div>
    </>
  );
};
