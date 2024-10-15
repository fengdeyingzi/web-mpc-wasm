import { observer } from "mobx-react-lite";
import CodeMirror from '@uiw/react-codemirror';
import { useConsole } from "../../context";


export default observer(function() {
    const { output, textAreaClientHeight: height } = useConsole();
    return (
        <div className="flex-grow-1">
            <CodeMirror
                height={height ? (height + "px") : undefined}
                value={output}
                basicSetup={{
                    syntaxHighlighting: false,
                    history: false,
                }}
                editable={false}
            />
        </div>
    );
});
