const initFolderData = {
  id: "1",
  name: "root",
  isFolder: true,
  items: [
    {
      id: "2",
      name: "sub_folder1",
      isFolder: true,
      items: [
        {
          id: "5",
          name: "sub_folder3",
          isFolder: true,
          items: [],
        },
        {
          id: "4",
          name: "file2",
          isFolder: false,
          items: [],
        },
      ],
    },
    {
      id: "3",
      name: "subfolder2",
      isFolder: true,
      items: [],
    },
    {
      id: "4",
      name: "file1",
      isFolder: false,
      items: [],
    },
  ],
};

export default initFolderData;
