import { observer } from "mobx-react-lite";
import { useFileSystem } from "../../context";
import Header from "./Header";
import PathArea from "./PathArea";
import FileList from "./FileList";
import MakeNewDialog from "./Dialogs/MakeNewDialog";
import RenameDialog from "./Dialogs/RenameDialog";
import RemoveDialog from "./Dialogs/RemoveDialog";


export default observer(function FileSystem() {
    const {
        makeNew: { isShow: isShowMakeNewDialog },
        rename : { isShow: isShowRenameDialog }, 
        remove : { isShow: isShowRemoveDialog }, 
    } = useFileSystem();
    return (
        <div className="flex-grow-1 px-3 py-1 border-end">
            <Header />
            <PathArea />
            {isShowMakeNewDialog && (
                <MakeNewDialog />
            )}
            {isShowRenameDialog && (
                <RenameDialog />
            )}
            {isShowRemoveDialog && (
                <RemoveDialog />
            )}
            <FileList />
        </div>
    );
});
