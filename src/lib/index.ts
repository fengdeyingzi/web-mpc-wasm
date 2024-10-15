

export function contentDownload(filename: string, obj: Blob | MediaSource) {
    const a = document.createElement('a');
    a.download = filename;
    a.href = URL.createObjectURL(obj);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}
