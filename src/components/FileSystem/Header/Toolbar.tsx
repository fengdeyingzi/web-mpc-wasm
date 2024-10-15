import { observer } from 'mobx-react-lite';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Dropdown from 'react-bootstrap/Dropdown';
import { useFileSystem } from '../../../context';


export default function Toolbar() {
    return (
        <div>
            <div className="btn-group btn-group-sm me-1">
                <BackParentButton />
                <BackHomeButton />
                <NewFileButton />
                <NewDirButton />
                <RefreshButton />
            </div>
            <MoreDropdown />
        </div>
    );
}

const BackParentButton = observer(function() {
    const { backParentPath } = useFileSystem();
    return (
        <OverlayTrigger
            placement="bottom"
            overlay={<Tooltip>返回上级目录</Tooltip>}
        >
            <button
                className="btn btn-sm btn-light"
                onClick={backParentPath}
            >
                <i className="bi bi-arrow-up"></i>
            </button>
        </OverlayTrigger> 
    ); 
});

const BackHomeButton = observer(function() {
    const { goHome } = useFileSystem();
    return (
        <OverlayTrigger
            placement="bottom"
            overlay={<Tooltip>返回工作目录</Tooltip>}
        >
            <button
                className="btn btn-sm btn-light"
                onClick={goHome}
            >
                <i className="bi bi-house"></i>
            </button>
        </OverlayTrigger>
    );
});

const NewFileButton = observer(function() {
    const { makeNew: { start } } = useFileSystem();
    return (
        <OverlayTrigger
            placement="bottom"
            overlay={<Tooltip>新建文件</Tooltip>}
        >
            <button
                className="btn btn-sm btn-light"
                onClick={() => start(false)}
            >
                <i className="bi bi-file-earmark-plus"></i>
            </button>
        </OverlayTrigger>
    );
});

const NewDirButton = observer(function() {
    const { makeNew: { start } } = useFileSystem();
    return (
        <OverlayTrigger
            placement="bottom"
            overlay={<Tooltip>新建文件夹</Tooltip>}
        >
            <button
                className="btn btn-sm btn-light"
                onClick={() => start(true)}
            >
                <i className="bi bi-folder-plus"></i>
            </button>
        </OverlayTrigger>
    );
});

const RefreshButton = observer(function() {
    const { refresh } = useFileSystem();
    return (
        <OverlayTrigger
            placement="bottom"
            overlay={<Tooltip>刷新文件列表</Tooltip>}
        >
            <button
                className="btn btn-sm btn-light"
                onClick={refresh}
            >
                <i className="bi bi-arrow-clockwise"></i>
            </button>
        </OverlayTrigger>
    );
});

const MoreDropdown = observer(function() {
    const {
        pathString,
        selected: { count, first, all },
        rename  : { start: startRename },
        remove  : { start: startRemove },
    } = useFileSystem();

    function handleRename() {
        startRename(pathString, first);
    }

    function handleRemove() {
        startRemove(all.map(fileName => pathString + "/" + fileName));
    }

    return (
        <Dropdown className="d-inline-block">
            <Dropdown.Toggle className="btn btn-sm btn-light"/>
            <Dropdown.Menu className="shadow-sm">
                <Dropdown.Header>
                    已选择 {count} 项
                </Dropdown.Header>

                <Dropdown.Item
                    onClick={handleRename}
                    disabled={count !== 1}
                >
                    重命名
                </Dropdown.Item>

                <Dropdown.Item
                    onClick={handleRemove}
                    disabled={count === 0}
                >
                    删除
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
});
