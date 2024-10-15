import { makeAutoObservable } from 'mobx';
import FileSytemStore from './FileSytemStore';
import EditorStore from './EditorStore';
import ConsoleStore from './ConsoleStore';


export default class AppStore {
    fileSystem = new FileSytemStore();
    editor = new EditorStore();
    console = new ConsoleStore();

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
    }

    get editAreaClientHeight() {
        return document.body.clientHeight
            - this.editor.headerHeight
            - (this.console.isShow ? this.console.clientHeight : 0);
    }

    run() {
        this.editor.currentFile.save();
        this.console.setIsShow(true);
        this.console.clear();
        Module.ccall(
            'picocRun',
            'number',
            ['string', 'string'],
            [this.editor.currentFile.filePath, this.console.filePath]
        );
        this.console.refresh();
        this.fileSystem.refresh();
    }
}
