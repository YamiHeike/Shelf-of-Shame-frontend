import { Input, Typography } from "antd";
import { TextAreaRef } from "antd/es/input/TextArea";
import { useFormValidationContext, useUserShelfItemContext } from "../../store";
import styles from "./EditItem.module.scss";

type NotesTextAreaProps = {
  notesRef: React.Ref<TextAreaRef>;
};

const { Text } = Typography;

export const NotesTextArea = ({ notesRef }: NotesTextAreaProps) => {
  const { notes } = useUserShelfItemContext();
  const { notesLimit } = useFormValidationContext();

  return (
    <>
      <Text>Notes:</Text>
      <Input.TextArea
        ref={notesRef}
        rows={4}
        defaultValue={notes}
        className={styles.notes}
        placeholder="Your personal notes…"
        maxLength={notesLimit}
        showCount={{
          formatter: ({ count }) => `${count}/${notesLimit}`,
        }}
      />
    </>
  );
};
