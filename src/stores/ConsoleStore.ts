import { makeAutoObservable } from 'mobx';
import { contentDownload } from '../lib';


export default class ConsoleStore {
    filePath = '/workspace/print.txt';
    output: string = '';
    encoding = 'GBK';

    isShow = false;

    clientHeight = 120;
    headerHeight = 0;

    // 调整高度相关
    isResizing = false;
    resizeStartY = 0;
    resizeStartHeight = 0;

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
    }

    get textAreaClientHeight() {
        return this.clientHeight - this.headerHeight;
    }

    setOutput(value: string) {
        this.output = value;
    }
    
    startResize(mouseY: number) {
        this.isResizing = true;
        this.resizeStartY = mouseY;
        this.resizeStartHeight = this.clientHeight;
    }

    updateResize(mouseY: number) {
        const dy = mouseY - this.resizeStartY;
        this.clientHeight = this.resizeStartHeight - dy;
    }

    endResize() {
        this.isResizing = false;
    }

    setIsShow(value: boolean) {
        this.isShow = value;
    }

    setHeaderClient(value: number) {
        this.headerHeight = value;
    }

    setClientHeight(value: number) {
        this.clientHeight = value;
    }

    clear() {
        this.output = "";
    }

    refresh() {
        this.encoding = "UTF-8";
        this.output = (new TextDecoder(this.encoding)).decode(
            FS.readFile(this.filePath)
        );
    }

    download() {
        const blob = new Blob(
            FS.readFile(this.filePath),
            { type: "text/plain" }
        );
        contentDownload(
            "print.txt",
            blob
        );
    }
}
