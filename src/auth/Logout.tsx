interface Props {
    handler: Function;
}

function Logout({ handler }: Props) {
    return (
        <button
            onClick={(e) => handler()}
            className="btn btn-link nav-link"
        >
            Log Out
        </button>
    );
}

export default Logout;