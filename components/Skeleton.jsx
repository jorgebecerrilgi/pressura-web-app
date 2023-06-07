import styles from "./Skeleton.module.css";

const Skeleton = ({ width, height, marginBottom }) => {
    return <div className={styles.skeleton} style={{ width: width, height: height, marginBottom: marginBottom }}></div>;
};

export default Skeleton;
