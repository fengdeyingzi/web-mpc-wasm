import { observer } from "mobx-react-lite";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { useApp, useConsole, useCurrentEditFile } from "../../../context";


export default observer(function() {
    const { run } = useApp();
    const { save, download } = useCurrentEditFile();
    const { isShow: consoleIsShow, setIsShow: setConsoleIsShow } = useConsole();
    return (
        <div className="d-flex align-items-center pe-3">
            <button
                className="btn btn-sm btn-primary me-2"
                onClick={run}
            >
                <i className="bi bi-play-fill"></i> 运行
            </button>

            <OverlayTrigger
                placement="bottom"
                overlay={<Tooltip>保存</Tooltip>}
            >
                <button
                    className="btn btn-sm btn-light me-2"
                    onClick={save}
                >
                    <i className="bi bi-floppy"></i>
                </button>
            </OverlayTrigger>

            <OverlayTrigger
                placement="bottom"
                overlay={<Tooltip>下载当前文件</Tooltip>}
            >
                <button
                    className="btn btn-sm btn-light me-2"
                    onClick={download}
                >
                    <i className="bi bi-download"></i>
                </button>
            </OverlayTrigger>

            <OverlayTrigger
                placement="bottom"
                overlay={<Tooltip>打开/隐藏输出区</Tooltip>}
            >
                <button
                    className={"btn btn-sm btn-light" + (consoleIsShow ? " border" : "")}
                    onClick={() => setConsoleIsShow(!consoleIsShow)}
                >
                    <i className="bi bi-window-desktop"></i>
                </button>
            </OverlayTrigger>
        </div>
    );
});
