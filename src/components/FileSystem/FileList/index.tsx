import { useRef } from "react";
import { useHover } from "ahooks";
import { observer } from "mobx-react-lite";
import { useFileSystem } from "../../../context";
import { File } from "../../../stores/FileSytemStore";
import FileTd from "./FileTd";
import ControlTd from "./ControlTd";


export default observer(function FileList() {
    const { files } = useFileSystem();
    return (
        <div>
            <table className="table table-sm table-hover mb-0">
                <tbody>
                    {files.map((file, index) => (
                        <FileTr
                            key={index}
                            file={file}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
});

function FileTr({ file }: { file: File }) {
    const ref = useRef<HTMLTableRowElement>(null);
    const isHovering = useHover(ref);
    return (
        <tr ref={ref}>
            <FileTd file={file} />
            <ControlTd
                file={file}
                isHovering={isHovering}
            />
        </tr>
    );
}
