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
            {book.authors.length < 2
              ? `${book.authors[0].firstName} ${book.authors[0].lastName}`
              : book.authors.map((author) => {
                  const authorName = `${author.firstName} ${author.lastName}`;
                  return author === book.authors[book.authors.length - 1]
                    ? authorName
                    : `${authorName} ,`;
                })}
          </List.Item>
        )}
      />
    </Card>
  );
};
