import { observer } from "mobx-react-lite";
import { useRef } from "react";
import { useEditor } from "../../../context";
import { useClientHeight } from "../../../lib/useClientHeight";
import FileTabs from "./FileTabs";
import StatusBar from "./StatusBar";
import Toolbar from "./Toolbar";


export default observer(function Header() {
    const { setHaderHeight } = useEditor();

    const ref = useRef<HTMLDivElement>(null);
    useClientHeight(ref, setHaderHeight);

    return (
        <div ref={ref}>
            <div className="d-flex justify-content-between bg-white border-bottom">
                <FileTabs />
                <Toolbar />
            </div>
            <StatusBar />
        </div>
    );
});
