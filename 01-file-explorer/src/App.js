import "./styles.css";
import { useState } from "react";

import Folder from "./components/Folder";
import initFolderData from "./data/folderData";

export default function App() {
  //HOOKS
  const [folderTree, setFolderTree] = useState(initFolderData);
  //FUNCTIONS
  const insertItem = (folderTree, parent, newItem, isFolder) => {
    //Base case
    if (folderTree.id == parent) {
      const newSubDir = folderTree.items.unshift({
        id: new Date().getTime(),
        name: newItem,
        isFolder,
        items: [],
      });
    }

    folderTree.items.forEach((e) => insertItem(e, parent, newItem, isFolder));

    return folderTree;
  };

  const handleInsertItem = (parent, newItem, isFolder) => {
    const updatedTree = insertItem(folderTree, parent, newItem, isFolder);
    setFolderTree(updatedTree);
  };

  //RENDER
  return (
    <div className="App">
      <Folder folderData={folderTree} handleInsertItem={handleInsertItem} />
    </div>
  );
}
