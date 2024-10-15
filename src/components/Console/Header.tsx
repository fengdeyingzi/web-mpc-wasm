import { useRef } from "react";
import { observer } from "mobx-react-lite";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { useClientHeight } from "../../lib/useClientHeight";
import { useConsole } from "../../context";


export default observer(function Header() {
    const { setHeaderClient, filePath, encoding } = useConsole();

    const ref = useRef<HTMLDivElement>(null);
    useClientHeight(ref, setHeaderClient);

    return (
        <div
            ref={ref}
            className="d-flex justify-content-between px-2 sticky-top bg-white"
        >
            <div className="d-flex align-items-center">
                <span className="me-2">
                    输出
                </span>
                <span className="small text-muted me-2">
                    {encoding}
                </span>
                <span className="small text-muted">
                    {filePath}
                </span>
            </div>
            <Toolbar />
        </div>
    );
});

const Toolbar = observer(function() {
    const { download, setIsShow } = useConsole();
    return (
        <div>
            <OverlayTrigger
                placement="bottom"
                overlay={<Tooltip>下载文件</Tooltip>}
            >
                <button
                    className="btn btn-sm btn-light py-0 me-2"
                    onClick={download}
                >
                    <i className="bi bi-download"></i>
                </button>
            </OverlayTrigger>

            <OverlayTrigger
                placement="bottom"
                overlay={<Tooltip>隐藏输出区</Tooltip>}
            >
                <button
                    className="btn btn-sm btn-light py-0 me-1"
                    onClick={() => setIsShow(false)}
                >
                    <i className="bi bi-x"></i>
                </button>
            </OverlayTrigger>
        </div>
    );
});
