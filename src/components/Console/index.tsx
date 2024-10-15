import { observer } from "mobx-react-lite";
import Header from "./Header";
import TextArea from "./TextArea";


export default observer(function Console() {
    return (
        <div className="d-flex flex-column">
            <SplitLine />
            <Header />
            <TextArea />
        </div>
    );
});

const SplitLine = observer(function() {
    return (
        <div
            id="console-split-line"
            className="pt-1 border-top hover-ns-resize"
        />
    );
});
