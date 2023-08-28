import React, { useEffect, useState} from 'react';
import "../styling/MyDashboard.css"
import SideMenu from './SideMenu';
import PageHeader from './PageHeader';
import axios from 'axios';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";
import MobileDashboard from './MobileDashboard';

ChartJS.register(
  BarElement, CategoryScale, LinearScale, Tooltip, Legend
);

const fetchProjectCounts = async () => {
  return await axios.get("http://localhost:3000/projectsCounts");
}

const YourDashboardComponent = () => {
  const [projectCounts, setProjectCounts] = useState([]);
  const [totalProjects, setTotalProjects] = useState(0);
  const [closedProjects, setClosedProjects] = useState(0);
  const [closureDelays, setClosureDelays] = useState(0);
  const [failedTotal, setFailedTotal] = useState(0);
  const [failedClosed, setFailedClosed] = useState(0);
  const [departmentData, setDepartmentData] = useState([]);

  const [statusData, setStatusData] = useState([]);
  const [runningProjects, setRunningProjects] = useState(0);
  const [cancelledProjects, setCancelledProjects] = useState(0);

  const pathname = window.location.pathname;

  const departmentNames = ["FIN", "HR", "MAN", "QLT", "STR", "STO"];
  let departmentDetails = [];
  let totalNumbers = [];
  let closedNumbers = [];

  useEffect(() => {
    fetchProjectCounts().then((res) => {
      setProjectCounts(res.data.project);
      setClosureDelays(res.data.clousercount);
      setStatusData(res.data.statusCount);
    });
  }, []);
  
  useEffect(() => {
    let totalSum = 0;

    projectCounts.forEach(item => {
      totalSum += item.total;
    });
    setTotalProjects(totalSum);
    let closedSum = 0;

    projectCounts.forEach((item) => {
      closedSum += item.closedCount;
    });

    setClosedProjects(closedSum);

    projectCounts.forEach((item) => {
      closedSum += item.closedCount;
    });

    setClosedProjects(closedSum);

    statusData.forEach((item) => {
      if (item._id === "Running") {
        setRunningProjects(item.count);
      } else if (item._id === "Cancelled") {
        setCancelledProjects(item.count);
      }
    });

    setClosedProjects(closedSum);

    for (let i = 0; i < projectCounts.length; i++) {
      let percentage = (projectCounts[i].closedCount / projectCounts[i].total) * 100;
      departmentDetails.push([`${percentage.toFixed(0)}%`, " ", departmentNames[i]]);
      totalNumbers.push(projectCounts[i].total);
      closedNumbers.push(projectCounts[i].closedCount);
    }

    setDepartmentData(departmentDetails);
    setFailedClosed(closedNumbers);
    setFailedTotal(totalNumbers);

  }, [projectCounts, statusData]);

  const chartData = {
    labels: departmentData,
    datasets: [
      {
        label: 'Total',
        data: failedTotal,
        backgroundColor: 'blue',
        borderRadius: 10
      },
      {
        label: 'Closed',
        data: failedClosed,
        backgroundColor: 'green',
        borderRadius: 10
      }
    ]
  };

  return (
    <>
      <div id="Dashboard_page">
      <div id="Dashboard_container">
      <SideMenu pathname={pathname} />
      <div id="child2">
         <PageHeader />
         <div id="dashboard_info">
          <div className='dashboard_info_child' >
             <div className='dashboard_info_one'>
             </div>
             <div className='dashboard_info_two'>
                <p className="title">Total Projects</p>
                <p className="num">{totalProjects}</p>
            </div>
          </div>
          <div className='dashboard_info_child' >
            <div className='dashboard_info_one'></div>
            <div className='dashboard_info_two'>
                <p className="title">Closed</p>
                <p className="num">{closedProjects}</p>
            </div>
          </div>
          <div className='dashboard_info_child' >
            <div className='dashboard_info_one'></div>
            <div className='dashboard_info_two'>
                <p className="title">Running</p>
                <p className="num">{runningProjects}</p>
            </div>
          </div>
          <div className='dashboard_info_child' >
            <div className='dashboard_info_one'></div>
            <div className='dashboard_info_two'>
                <p className="title">Clousre Delay</p>
                <p className="num">{closureDelays}</p>
            </div>
          </div>
          <div className='dashboard_info_child' >
            <div className='dashboard_info_one'></div>
            <div className='dashboard_info_two'>
                <p className="title">Cancelled</p>
                <p className="num">{cancelledProjects}</p>
            </div>
          </div>
         </div>
         <p id="totalvsclosed">Department wise - Total vs Closed</p>
         <div id="chart">
            <Bar
            data={chartData}
            width={'250px'}
            >
            </Bar>
         </div>
      </div>
    </div>
    </div>
    <div id="Mobile_dashboard_page">
      <MobileDashboard  fetchProjectCounts={fetchProjectCounts}/>
    </div>
    </>
  );
};

export default YourDashboardComponent;
