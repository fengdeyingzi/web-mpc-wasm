import { makeAutoObservable, reaction } from 'mobx';


export type File = {
    name: string,
    stat: FileStat,
    isDir: boolean,
};
type FileStat = {
    atime: Date,
    blksize: number,
    blocks: number,
    ctime: Date,
    dev: number,
    gid: number,
    ino: number,
    mode: number,
    mtime: Date,
    nlink: number,
    rdev: number,
    size: number,
    uid: number,
};


export default class FileSytemStore {
    path = [''];
    files: File[] = [];

    selected = new MultiSelectStore();
    makeNew  = new MakeNewDialogStore();
    rename   = new RenameDialogStore();
    remove   = new RemoveDialogStore();

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
        this.goHome();
        reaction(() => this.pathString, () => {
            this.selected.clear();
        });
    }

    get pathString() {
        return this.path.length > 1 ? this.path.join("/") : '/';
    }

    go(pathStr: string) {
        this.path = pathStr.split("/");
        this.refresh();
    }

    goHome() {
        this.go("/workspace");
    }

    backPath(index: number) {
        this.path = this.path.slice(0, index + 1);
        this.refresh();
    }

    backParentPath() {
        this.path = this.path.slice(0, this.path.length - 1);
        this.refresh();
    }

    enterDir(dir: string) {
        this.path.push(dir);
        this.refresh();
    }

    refresh() {
        const files: File[] = [];
        for (let name of FS.readdir(this.pathString)) {
            if (name === "." || name === "..") {
                continue;
            }
            const filePath = this.pathString + "/" + name;
            const stat = FS.stat(filePath);
            files.push({
                name : name,
                stat,
                isDir: FS.isDir(stat.mode),
            });
        }
        files.sort((file1, file2) => {
            if (file1.isDir !== file2.isDir) {
                return file1.isDir ? -1 : 1;
            }
            return file1.name.localeCompare(file2.name);
        });
        this.files = files;
    }

    submitMakeNew() {
        const filePath = this.pathString + "/" + this.makeNew.fileName;
        if (this.makeNew.isDir) {
            FS.mkdir(filePath);
        } else {
            FS.close(FS.open(filePath, "w+"));
        }
        this.makeNew.close();
        this.selected.clear();
        this.refresh();
    }

    submitRename() {
        const { dirPath: filePath, oldFileName, newFileName } = this.rename;
        FS.rename(
            filePath + "/" + oldFileName,
            filePath + "/" + newFileName
        );
        this.rename.close();
        this.selected.clear();
        this.refresh();
    }

    submitRemove() {
        for (const filePath of this.remove.filePaths) {
            FS.unlink(filePath);

        }
        this.remove.close();
        this.selected.clear();
        this.refresh();
    }
}

class MultiSelectStore {
    data = new Set<string>();

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
    }

    get count() {
        return this.data.size;
    }

    get first() {
        return this.data.size > 0
            ? Array.from(this.data)[0]
            : null;
    }

    get all() {
        return Array.from(this.data);
    }

    clear() {
        this.data.clear();
    }

    has(key: string) {
        return this.data.has(key);
    }

    toggle(key: string, checked: boolean) {
        if (checked) {
            this.data.add(key);
        } else {
            this.data.delete(key);
        }
    }
}

class MakeNewDialogStore {
    isShow = false;

    fileName = "";
    isDir = false;

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
    }

    start(isDir: boolean) {
        this.isDir = isDir;
        this.fileName = "";
        this.isShow = true;
    }

    updateFileName(value: string) {
        this.fileName = value;
    }

    close() {
        this.isShow = false;
    }
}

class RenameDialogStore {
    isShow = false;

    dirPath = "";
    oldFileName = "";
    newFileName = "";

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
    }

    start(filePath: string, oldFileName: string) {
        this.dirPath = filePath;
        this.newFileName = this.oldFileName = oldFileName;
        this.isShow = true;
    }

    updateFileName(value: string) {
        this.newFileName = value;
    }

    close() {
        this.isShow = false;
    }
}

class RemoveDialogStore {
    isShow = false;

    filePaths: string[] = [];

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
    }

    start(filePaths: string[]) {
        this.filePaths = filePaths;
        this.isShow = true;
    }

    close() {
        this.isShow = false;
    }
}
