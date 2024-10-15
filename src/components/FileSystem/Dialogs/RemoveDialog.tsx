import { observer } from "mobx-react-lite";
import { useFileSystem } from "../../../context";


export default observer(function RemoveDialog() {
    const {
        submitRemove: submit,
        remove: { filePaths, close },
    } = useFileSystem();
    return (
        <div className="bg-light px-2 py-1 border rounded">
            <div className="mb-1">
                确认删除选中的文件? (共{filePaths.length}项)
            </div>
            <div className="text-end">
                <button
                    className="btn btn-sm btn-danger px-3 me-3"
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
