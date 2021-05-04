CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE public.folders (
	id uuid NOT NULL DEFAULT uuid_generate_v4(),
	title  text NOT NULL,
	CONSTRAINT folders_pkey PRIMARY KEY (id)
);