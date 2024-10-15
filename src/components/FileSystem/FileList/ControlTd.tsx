import { observer } from "mobx-react-lite";
import { File } from "../../../stores/FileSytemStore";
import { useFileSystem } from '../../../context';


export default observer(function ControlTd({ file, isHovering }: {
    file: File,
    isHovering: boolean,
}) {
    const { has, toggle } = useFileSystem().selected;
    const key = file.name, isSelected = has(key);
    return (
        <td
            className="text-end"
            style={{width: "40px"}}
        >
            <div className={((isHovering || isSelected) ? "" : "invisible ") + "d-inline-block"}>
                <div className="form-check form-check-inline me-0">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        id={"checkbox-" + key}
                        checked={isSelected}
                        onChange={e => toggle(key, e.target.checked)}
                    />
                    <label
                        className="form-check-label text-muted"
                        htmlFor={"checkbox-" + key}
                    />
                </div>
            </div>
        </td>
    );
});
