import { useEffect, useRef } from "react";
import { observer } from "mobx-react-lite";
import { useFileSystem } from "../../../context";


export default observer(function NewDialog() {
    const {
        submitMakeNew: submit,
        makeNew: { isShow, isDir, fileName, updateFileName, close },
    } = useFileSystem();

    const ref = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (ref.current) {
            ref.current.addEventListener("keydown", (event) => {
                if (event.key === "Enter") {
                    submit();
                } else if (event.key == "Escape") {
                    close();
                }
            });
        }
    }, [ref.current]);

    useEffect(() => {
        if (isShow && ref.current) {
            window.setTimeout(() => ref.current.focus(), 100);
        }
    }, [ref.current, isShow]);

    return (
        <div className="bg-light px-2 py-1 border rounded">
            <input
                ref={ref}
                type="text"
                className="form-control form-control-sm mb-1"
                placeholder={isDir ? "新建文件夹的名称" : "新建文件的名称"}
                value={fileName}
                onChange={e => updateFileName(e.target.value)}
            />
            <div className="text-end">
                <button
                    className="btn btn-sm btn-primary px-3 me-3"
                    onClick={submit}
                >
                    确定
                </button>
                <button
                    className="btn btn-sm btn-secondary px-3"
                    onClick={close}
                >
                    取消
                </button>
            </div>
        </div>
    );
});
