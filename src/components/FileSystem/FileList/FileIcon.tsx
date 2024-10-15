import { File } from "../../../stores/FileSytemStore";


export default function FileIcon({ file }: { file: File }) {

    if (file.isDir) {
        return (
            <i className="bi bi-folder"></i> 
        );
    }

    if (file.name.endsWith(".c")
     || file.name.endsWith(".h")
    ) {
        return (
            <i className="bi bi-file-code"></i>
        );
    }

    if (file.name.endsWith(".txt")) {
        return (
            <i className="bi bi-file-text"></i>
        );
    }

    return (
        <i className="bi bi-file-earmark"></i>
    );
}
