import { useEffect, useRef } from "react";
import { observer } from "mobx-react-lite";
import { useConsole } from "../context";
import FileSystem from "./FileSystem";
import Editor from "./Editor";
import Console from "./Console";


export default observer(function App() {
    const { isShow, startResize, updateResize, endResize } = useConsole();
    const ref = useRef<HTMLDivElement>(null);

    // 拖动调整控制台高度
    useEffect(() => {
        if (ref.current) {
            let isResizing = false;

            ref.current.addEventListener("mousedown", (event) => {
                if ((event.target as HTMLElement).id === "console-split-line") {
                    startResize(event.clientY);
                    isResizing = true;
                }
            });

            ref.current.addEventListener("mousemove", (event) => {
                if (isResizing) {
                    updateResize(event.clientY);
                }
            });

            ref.current.addEventListener("mouseup", () => {
                if (isResizing) {
                    endResize();
                    isResizing = false;
                }
            })
        }
    }, []);

    return (
        <div
            ref={ref}
            className="row gx-0"
        >
            <div className="col-md-3 col-sm-12 vh100 d-flex flex-column">
                <FileSystem />
            </div>
            <div className="col-md-9 col-sm-12 vh100 d-flex flex-column">
                <Editor />
                {isShow && (
                    <Console />
                )}
            </div>
        </div>
    );
});
