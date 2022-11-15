export type SimplePerson = {
  name: string;
};

export type Person = SimplePerson & {
  druck: {
    start: number;
    end: number | undefined;
  };
};
