import { observer } from "mobx-react-lite";
import CodeMirror from '@uiw/react-codemirror';
import { cpp } from '@codemirror/lang-cpp';
import { quietlight } from '@uiw/codemirror-theme-quietlight';
import { useApp, useEditor } from "../../../context";
import { EditFileStore } from "../../../stores/EditorStore";


export default observer(function EditArea({ file }: { file: EditFileStore }) {
    const { editAreaClientHeight: height } = useApp();
    const { currentFile: { id: editingId } } = useEditor();
    const { id, content, setContent } = file;
    return (
        <CodeMirror
            key={id}
            height={height ? (height + "px") : undefined}
            theme={quietlight}
            extensions={[cpp()]}
            value={content}
            onChange={value => setContent(value)}
            className={editingId === id ? "" : "d-none"}
            autoFocus={true}
        />
    );
});
