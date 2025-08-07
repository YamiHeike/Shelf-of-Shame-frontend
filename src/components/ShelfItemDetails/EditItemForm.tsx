import { useRef } from "react";
import { EditShelfItemDto, Status } from "../../types";
import { Button, Input, Radio, Slider, Typography } from "antd";
import { useFormValidationContext, useUserShelfItemContext } from "../../store";
import styles from "./EditItem.module.scss";
import { TextAreaRef } from "antd/es/input/TextArea";
import { useEditShelfItemDetailsMutation } from "../../store/shelfApi";
import { QueryStatus } from "@reduxjs/toolkit/query";
import { useNavigate } from "react-router-dom";

const { Text } = Typography;

export const EditItemForm = () => {
  const item = useUserShelfItemContext();
  const statusRef = useRef(item.status);
  const difficultyRef = useRef(item.difficulty);
  const notesRef = useRef<TextAreaRef>(null);
  const navigate = useNavigate();
  const { notesLimit } = useFormValidationContext();
  const [editShelfDetails, result] = useEditShelfItemDetailsMutation();

  const handleSave = () => {
    const newStatus = statusRef.current;
    const newNotes = notesRef.current?.resizableTextArea?.textArea?.value;
    const newDifficulty = difficultyRef.current;

    const dto: EditShelfItemDto = {
      status: newStatus,
      difficulty: newDifficulty,
      notes: newNotes ?? "",
    };

    editShelfDetails({ id: item.id, body: dto });
  };

  const handleCancel = () => {
    navigate(`/shelf/${item.id}`);
  };

  if (result.status === QueryStatus.fulfilled) {
    navigate(`/shelf/${item.id}`);
  }

  return (
    <div className={styles.form}>
      <Text>Status:</Text>
      <Radio.Group
        onChange={(e) => (statusRef.current = e.target.value)}
        defaultValue={item.status}
        className={styles.statusGroup}
      >
        <Radio.Button value={Status.SHAME}>Shame</Radio.Button>
        <Radio.Button value={Status.GLORY}>Glory</Radio.Button>
        <Radio.Button value={Status.READING}>Reading</Radio.Button>
      </Radio.Group>

      <Text>Difficulty:</Text>
      <Slider
        min={1}
        max={10}
        defaultValue={item.difficulty}
        onChange={(val) => (difficultyRef.current = val)}
        marks={{ 1: "1", 5: "5", 10: "10" }}
        className={styles.slider}
      />

      <Text>Notes:</Text>
      <Input.TextArea
        ref={notesRef}
        rows={4}
        defaultValue={item.notes}
        className={styles.notes}
        placeholder="Your personal notes…"
        maxLength={notesLimit}
        showCount={{
          formatter: ({ count }) => `${count}/${notesLimit}`,
        }}
      />
      <div className={styles.buttonRow}>
        <Button type="primary" onClick={handleSave}>
          Save
        </Button>
        <Button onClick={handleCancel}>Cancel</Button>
      </div>
    </div>
  );
};
