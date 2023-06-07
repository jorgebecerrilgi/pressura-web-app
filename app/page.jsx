import style from "./page.module.css";
import PatientList from "@/components/PatientList/PatientList";
import PatientInformation from "@/components/PatientInformation/PatientInformation";
import Link from "next/link";

const Home = () => {
    return (
        <main className={style.app}>
            <div className={style.content}>
                <PatientList />
                <PatientInformation />
            </div>
        </main>
    );
};

export default Home;
