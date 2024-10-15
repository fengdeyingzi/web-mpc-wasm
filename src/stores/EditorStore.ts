import { nanoid } from "nanoid";
import { makeAutoObservable } from 'mobx';
import { contentDownload } from '../lib';


export default class EditorStore {

    fileList: EditFileStore[] = [];
    currentFile: EditFileStore = null;
    orders = new OrderStore();

    headerHeight = 0;

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
        this.open("/workspace/test.c");
    }

    setHaderHeight(value: number) {
        this.headerHeight = value;
    }

    get currentIndex() {
        return this.currentFile
            ? this.fileList.findIndex(file => file.id === this.currentFile.id)
            : -1;
    }

    /** 打开新文件 */
    open(filePath: string) {
        const file = this.fileList.find(item => item.filePath === filePath);
        if (file) {  // 已在编辑器打开
            this.setCurrent(file);
        } else { // 新文件
            this.currentFile = new EditFileStore(filePath);
            this.fileList.push(this.currentFile);
            this.orders.push(this.currentFile);
        }
    }

    setCurrent(file: EditFileStore) {
        if (this.currentFile.id !== file.id) {
            this.currentFile = file;
            this.orders.push(file);
        }
    }

    closeFile(file: EditFileStore) {
        const index = this.fileList.findIndex(item => item.id === file.id);
        if (index !== -1) {
            this.fileList.splice(index, 1);
            this.orders.remove(file);
            if (this.currentFile.id === file.id) {
                this.currentFile = this.orders.last;
            }
        }
    }
}

export class OrderStore {
    data: EditFileStore[] = [];

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
    }

    get last() {
        return this.data.length > 0
            ? this.data[this.data.length - 1]
            : null;
    }

    push(file: EditFileStore) {
        this.remove(file);
        this.data.push(file);
    }

    remove(file: EditFileStore) {
        if (file) {
            const index = this.data.findIndex(item => item.id === file.id);
            if (index !== -1) {
                this.data.splice(index, 1);
            }
        }
    }
}

export class EditFileStore {
    id = '';
    filePath = '';
    content = '';
    encoding = '';
    isChanged = false;

    constructor(filePath: string) {
        makeAutoObservable(this, {}, { autoBind: true });
        this.openFile(filePath);
    }

    openFile(filePath: string) {
        this.id = nanoid();
        this.filePath = filePath;

        this.encoding = "GBK";
        this.content = (new TextDecoder(this.encoding)).decode(
            FS.readFile(this.filePath)
        );

        this.isChanged = false;
    }

    get fileName() {
        const paths = this.filePath.split("/");
        return paths[paths.length - 1];
    }

    get dirPath() {
        const paths = this.filePath.split("/");
        return paths.slice(0, paths.length - 1).join("/");
    }

    setContent(value: string) {
        this.content = value;
        this.isChanged = true;
    }

    save() {
        if (this.isChanged) {
            const buffer = (new TextEncoder()).encode(this.content);
            FS.writeFile(this.filePath, buffer);
            this.isChanged = false;
        }
    }

    download() {
        const blob = new Blob(
            [ this.content ],
            { type: "text/plain" }
        );
        contentDownload(
            this.fileName,
            blob
        );
    }
}
