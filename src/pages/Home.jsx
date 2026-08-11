import "../styles/home.css";
import DashboardOverview from "../components/DashboardOverview";
import ChartCard from "../components/ChartCard";

export default function Home() {

    return(

        <div className="home">

            <h1>DGX A100 Monitoring Dashboard</h1>

            <p className="subtitle">
                Resource monitoring for GPU server environment.
            </p>

            <DashboardOverview/>

            <div className="content">

                <ChartCard/>

            </div>

        </div>

    )

}