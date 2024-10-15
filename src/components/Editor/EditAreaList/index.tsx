import { observer } from "mobx-react-lite";
import { useEditor } from "../../../context";
import EditArea from "./EditArea";
import ResizingMask from "./ResizingMask";


export default observer(function EditAreaList() {
    const { fileList } = useEditor();
    return (
        <div className="flex-grow-1 position-relative">
            <ResizingMask />
            {fileList.map(file => (
                <EditArea
                    key={file.id}
                    file={file}
                />
            ))}
        </div>
    ); 
});
