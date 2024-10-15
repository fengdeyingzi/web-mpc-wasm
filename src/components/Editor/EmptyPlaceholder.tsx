

export default function EmptyPlaceholder() {
    return (
        <div
            className="h-100 d-flex align-items-center"
            style={{backgroundColor: "#f4f4f4"}}
        >
            <div className="w-100 text-center text-muted">
                <div>
                    当前未选择文件
                </div>
                <div>
                    可在左侧的文件系统选择
                </div>
            </div>
        </div>
    );
}

