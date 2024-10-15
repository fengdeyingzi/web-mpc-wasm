import { observer } from "mobx-react-lite";
import { useCurrentEditFile } from "../../../context";


export default observer(function() {
    const { filePath, encoding } = useCurrentEditFile();
    return (
        <div
            className="px-3 small text-muted border-bottom"
            style={{backgroundColor: "#f4f4f4"}}
        >
            <span className="me-2">{encoding}</span>
            <span>
                {filePath}
            </span>
        </div>
    );    
});
