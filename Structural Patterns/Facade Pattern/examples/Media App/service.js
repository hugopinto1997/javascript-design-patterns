export class FetchMusic {
  get resources() {
    return [
      { id: 1, title: "The Fragile" },
      { id: 2, title: "Alladin Sane" },
      { id: 3, title: "OK Computer" },
    ];
  }

  fetch(id) {
    return this.resources.find((item) => item.id === id);
  }
}

export class GetMovie {
  constructor(id) {
    this.id = id;
  }

  getResource() {
    return [
      { id: 1, title: "Apocalypse Now" },
      { id: 2, title: "Die Hard" },
      { id: 3, title: "Big Lebowski" },
    ].find((item) => item.id === this.id);
  }
}

export const getTvShow = function (id) {
  const resources = [
    { id: 1, title: "Twin Peaks" },
    { id: 2, title: "Luther" },
    { id: 3, title: "The Simpsons" },
  ];

  return resources.find((item) => item.id === id);
};

export const booksResource = [
  { id: 1, title: "Ulysses" },
  { id: 2, title: "Ham on Rye" },
  { id: 3, title: "Quicksilver" },
];
