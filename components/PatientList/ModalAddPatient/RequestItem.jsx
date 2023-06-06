import styles from "./RequestItem.module.css";

const RequestItem = ({ name, email, onDeny, onAccept }) => {
    return (
        <div className={styles.requestItem}>
            <div className={styles.data}>
                <p>{name}</p>
                <p className={styles.dataEmail}>{email}</p>
            </div>
            <ul>
                <li>
                    <button onClick={() => onDeny()}>
                        <img className={styles.deny} src="icon-no.svg" />
                    </button>
                </li>
                <li>
                    <button onClick={() => onAccept()}>
                        <img className={styles.accept} src="icon-yes.svg" />
                    </button>
                </li>
            </ul>
        </div>
    );
};

export default RequestItem;
