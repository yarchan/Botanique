\c botanique;

CREATE TABLE devices (
    device_id integer PRIMARY KEY,
    name TEXT,
    description TEXT,
    status boolean, 
    notice VARCHAR(3),
    img TEXT
);

CREATE TABLE device_description (
    description_id integer PRIMARY KEY,
    device_id integer REFERENCES devices(device_id),
    date_start DATE,
    type_works TEXT, 
    works TEXT,
    result TEXT,
    user_name TEXT,
    checked BOOLEAN
);


