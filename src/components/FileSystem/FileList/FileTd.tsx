import { observer } from "mobx-react-lite";
import { useFileSystem, useEditor } from "../../../context";
import { File } from "../../../stores/FileSytemStore";
import FileIcon from "./FileIcon";


export default function FileTd({ file }: { file: File }) {
    if (file.isDir) {
        return (
            <DirFile file={file} />
        );
    }

    if (file.name.endsWith(".c")
     || file.name.endsWith(".h")
     || file.name.endsWith(".txt")
    ) {
        return (
            <EditableFile file={file} />
        );
    }

    return (
        <td className="bg-transparent">
            <FileIcon file={file} /> {file.name}
        </td>
    ); 
}

const DirFile = observer(function({ file }: { file: File }) {
    const { enterDir } = useFileSystem();
    return (
        <td
            role="button"
            className="bg-transparent"
            onClick={() => enterDir(file.name)}
        >
            <FileIcon file={file} /> {file.name}
        </td>
    );
});

const EditableFile = observer(function({ file }: { file: File }) {
    const { pathString } = useFileSystem();
    const { open: openFile } = useEditor();
    return (
        <td
            role="button"
            className="bg-transparent"
            onClick={() => openFile(pathString + "/" + file.name)}
        >
            <FileIcon file={file} /> {file.name}
        </td>
    );
});
