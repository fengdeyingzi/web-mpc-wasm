import { useRef } from "react";
import { useHover } from "ahooks";
import { observer } from "mobx-react-lite";
import { useEditor } from "../../../context";
import { EditFileStore } from "../../../stores/EditorStore";


export default observer(function() {
    const { fileList } = useEditor();
    return (
        <div>
            <ul className="nav nav-pills">
                {fileList.map(file => (
                    <FileTab
                        key={file.id}
                        file={file}
                    />
                ))}
            </ul>
        </div>
    );
});

const FileTab = observer(function({ file }: { file: EditFileStore }) {
    const { currentFile, setCurrent, closeFile } = useEditor();
    const isActive = currentFile.id === file.id;

    const ref = useRef<HTMLLIElement>(null);
    const isHovering = useHover(ref);

    function onClose(event: React.MouseEvent) {
        event.stopPropagation();
        closeFile(file);        
    }

    return (
        <li
            ref={ref}
            className="nav-item hover-light"
            onClick={() => setCurrent(file)}
            role="button"
        >
            <span
                className={"nav-link rounded-0 ps-3 pe-0" + (isActive
                    ? " border-bottom border-primary text-bg-light"
                    : " text-dark")}
            >
                {file.isChanged && (
                    <span>*</span>
                )}
                <span className="me-1">
                    {file.fileName}
                </span>
                <span
                    className={"px-1 rounded hover-grey" + (isHovering || isActive
                        ? " visible"
                        : " invisible")
                    }
                    onClick={onClose}
                >
                    <i className="bi bi-x"></i>
                </span>
            </span>
        </li>
    );
});
