import style from "./PatientItem.module.css";

const PatientItem = ({ firstName, lastName, selected, onClick }) => {
    return (
        <div 
            className={style.patientItem} 
            // onClick={onClick}
        >
            <div className={selected ? style.selected : style.unselected}></div>
            <div className={style.info}>
                <img src={"/icon-profile.png"} height="32px"></img>
                <span>
                    {firstName}
                    <br />
                    <span className={style.context}>{lastName}</span>
                </span>
            </div>
        </div>
    );
};

PatientItem.defaultProps = {
    selected: false,
};

export default PatientItem;
