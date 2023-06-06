import styles from "./InputElement.module.css";

const InputElement = ({ title, value, onChangeValue }) => {
    return (
        <div className={styles.inputElement}>
            <p>{title}</p>
            <input
                value={value}
                onChange={(e) => onChangeValue(e.target.value)}
                required
                type="email"
                autoComplete="off"
            />
        </div>
    );
};

export default InputElement;
