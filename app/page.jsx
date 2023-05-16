import style from "./page.module.css";
import PatientList from "@/components/PatientList/PatientList";
import PatientInformation from "@/components/PatientInformation/PatientInformation";

const Home = () => {
    return (
        <main className={style.app}>
            <div className={style.content}>
                <PatientList />
                <PatientInformation
                    selectedUser={0}
                    selectedId={0}
                    INVALID_INDEX={0}
                ></PatientInformation>
            </div>
        </main>
    );
};

export default Home;
