CREATE TABLE notes (
    id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    title TEXT NOT NULL,
    content TEXT,
    date_published TIMESTAMP DEFAULT now() NOT NULL,
    folder_id uuid REFERENCES folders(id) NOT NULL
);
