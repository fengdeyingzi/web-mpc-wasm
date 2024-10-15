import { observer } from "mobx-react-lite";
import { useEditor } from "../../context";
import Header from "./Header";
import EditAreaList from "./EditAreaList";
import EmptyPlaceholder from "./EmptyPlaceholder";


export default observer(function Editor() {
    const { currentIndex } = useEditor();
    return (
        <div className="flex-grow-1 d-flex flex-column">
            {currentIndex !== -1 ? (
                <>
                    <Header />
                    <EditAreaList />
                </>
            ) : (
                <EmptyPlaceholder />
            )}
        </div>
    );
});
