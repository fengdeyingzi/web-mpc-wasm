import { observer } from "mobx-react-lite";
import { useConsole } from "../../../context";


export default observer(function ResizingMask() {
    const { isResizing } = useConsole();
    return isResizing ? (
        <div
            className="position-absolute"
            style={{
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                zIndex: 1,
            }}
        >
            <div className="h-100 d-flex align-items-center text-bg-light opacity-50 invisible">
                <div className="w-100 text-center">
                    Resizing
                </div>
            </div>
        </div>
    ) : null;
});
