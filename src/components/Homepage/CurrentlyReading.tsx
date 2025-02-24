import { BookOutline } from "../../types/Book";
import { Card, List } from "antd";
import { BookOutlined } from "@ant-design/icons";

type currentlyReadingProps = {
  bookList: BookOutline[];
  title: string;
};

export const CurrentlyReading = ({
  bookList,
  title,
}: currentlyReadingProps) => {
  return (
    <Card title={title} style={{ marginTop: 20, borderRadius: 8 }}>
      <List
        dataSource={bookList}
        renderItem={(book) => (
          <List.Item>
            <BookOutlined style={{ marginRight: 8, color: "#1890ff" }} />
            {book.title} by{" "}
            {book.author.length < 2
              ? book.author[0]
              : book.author.map((author) => {
                  return author === book.author[book.author.length - 1]
                    ? author
                    : author + ", ";
                })}
          </List.Item>
        )}
      />
    </Card>
  );
};
