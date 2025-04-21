import { useState } from "react";

function Folder({ folderData, handleInsertItem }) {
  //HOOKS-----------------------------------------------------------------------
  const [expandDir, setExpandDir] = useState(false);
  const [showInput, setShowInput] = useState({
    isVisible: false,
    isFolder: false,
  });

  //FUNCTIONS-------------------------------------------------------------------
  const handNewItem = (e, isFolder) => {
    e.stopPropagation();

    setShowInput({
      isVisible: true,
      isFolder,
    });
  };

  const onAddItem = (e) => {
    if (e.keyCode === 13 && e.target.value) {
      handleInsertItem(folderData.id, e.target.value, showInput.isFolder);
      setShowInput({ ...showInput, isVisible: false });
      setExpandDir(true);
    }
  };

  //RENDER------------------------------------------------------------
  if (folderData.isFolder)
    return (
      <div>
        <div className="folder" onClick={() => setExpandDir(!expandDir)}>
          <span>|-📂{folderData.name}</span>
          <hr />
          <div>
            <button onClick={(e) => handNewItem(e, true)}>Add Folder</button>
            <button onClick={(e) => handNewItem(e, false)}>Add File</button>
          </div>
        </div>
        <div>
          {showInput.isVisible && (
            <div className="subfolder">
              <span>|-{showInput.isFolder ? "📂" : "🗃"}</span>
              <input
                type="text"
                onKeyDown={(e) => onAddItem(e)}
                onBlur={() => setShowInput({ ...showInput, isVisible: false })}
                focus
              />
            </div>
          )}
        </div>
        {expandDir &&
          folderData.items.map((item) => {
            return (
              <div className="subfolder">
                <Folder folderData={item} handleInsertItem={handleInsertItem} />
              </div>
            );
          })}
      </div>
    );
  else return <div className="file">|-🗃{folderData.name}</div>;
}

export default Folder;
