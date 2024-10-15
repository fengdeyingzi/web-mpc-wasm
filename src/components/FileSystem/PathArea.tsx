import { observer } from "mobx-react-lite";
import { useFileSystem } from "../../context";


export default observer(function() {
    const { path } = useFileSystem();
    return (
        <div className="lh-sm mb-2">
            {path.map((dir, index) => (
                <PathPart
                    key={index}
                    dir={dir}
                    index={index}
                />
            ))}
        </div>
    );
});

const PathPart = observer(function({ dir, index }: {
    dir: string,
    index: number,
}) {
    const { path, backPath } = useFileSystem();
    const isLast = index < path.length - 1;
    return (
        <span className="d-inline-block">
            <span
                role="button"
                className="d-inline-block px-1 hover-light"
                onClick={() => backPath(index)}
            >
                {index === 0 ? (
                    <span>
                        <i className="bi bi-hdd"></i> 根目录
                    </span>
                ) : (
                    <span>{dir}</span>
                )}
            </span>
            {isLast && (
                <span className="d-inline-block fw-lighter">
                    /
                </span>
            )}
        </span>
    );
});
