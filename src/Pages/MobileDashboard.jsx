import React, {  useState ,useEffect} from 'react'
import"../styling/MobileDashboard.css"
import {Chart as ChartJS,BarElement,CategoryScale,LinearScale,Tooltip,Legend} from "chart.js"
import {Bar} from "react-chartjs-2"
import NavigationFooter from './NavigationFooter'
import Footer from './Footer';
import axios from "axios";
import { apiUrl } from '../constant'


ChartJS.register(
  BarElement,CategoryScale,LinearScale,Tooltip,Legend
)

const fetchProjectCounts = async () => {
  return await axios.get(`${apiUrl}/projectsCounts`)}

const MobileDashboard = () => {
  // const [count,setCount]=useState(0)
  // const [Closed,setClosed]=useState([])
  // const [Total,setTotal]=useState([])
  // const [clouser,setClouser]=useState(0)
  // const [Data,setData]=useState([])+

  // console.log(fetchProjectCounts);
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

    if(projectCounts){
      projectCounts.forEach(item => {
      totalSum += item.total;
    });
    setTotalProjects(totalSum);
    let closedSum = 0;

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

    for (let i = 0; i < projectCounts.length; i++) {
      let percentage = (projectCounts[i].closedCount / projectCounts[i].total) * 100;
      departmentDetails.push([`${percentage.toFixed(0)}%`, " ", departmentNames[i]]);
      totalNumbers.push(projectCounts[i].total);
      closedNumbers.push(projectCounts[i].closedCount);
    }

    setDepartmentData(departmentDetails);
    setFailedClosed(closedNumbers);
    setFailedTotal(totalNumbers);
    }

  }, [projectCounts, statusData]);

  const chartData={
    labels:departmentNames,
    datasets:[{
      label:'Total',
      data:failedTotal,
      backgroundColor:'blue',
      borderRadius:10
    },
    {
      label:'Closed',
      data:failedTotal,
      backgroundColor:'green',
      borderRadius:10
    }]
  }
  return (
    <div style={{backgroundColor:" rgb(239, 244, 248)"}}>
        <NavigationFooter />
        <div style={{backgroundColor:" rgb(239, 244, 248)"}}>
        <div id="Mobdashboard" >
            <div id="Mobdashboard_child1">
                    <div className='Mobdashboard_child1_child_first' >
                       <div className='Mobdashboard_child1_one'></div>
                       <div className='Mobdashboard_child1_two'>
                        <p className="Mobdashboard_child1_two_title">Total Projects</p>
                        <p className="Mobdashboard_child1_two_num">{totalProjects}</p>
                       </div>
                    </div>
                    <div className='Mobdashboard_child1_child' >
                       <div className='Mobdashboard_child1_one'></div>
                       <div className='Mobdashboard_child1_two'>
                        <p className="Mobdashboard_child1_two_title">Closed</p>
                        <p className="Mobdashboard_child1_two_num">{closedProjects}</p>
                       </div>
                    </div>
                    <div className='Mobdashboard_child1_child' >
                       <div className='Mobdashboard_child1_one'></div>
                       <div className='Mobdashboard_child1_two'>
                        <p className="Mobdashboard_child1_two_title">Running</p>
                        <p className="Mobdashboard_child1_two_num">{runningProjects}</p>
                       </div>
                    </div>
                    <div className='Mobdashboard_child1_child' >
                       <div className='Mobdashboard_child1_one'></div>
                       <div className='Mobdashboard_child1_two'>
                        <p className="Mobdashboard_child1_two_title">Clousre Delay</p>
                        <p className="Mobdashboard_child1_two_num">{closureDelays}</p>
                       </div>
                    </div>
                    <div className='Mobdashboard_child1_child' >
                       <div className='Mobdashboard_child1_one'></div>
                       <div className='Mobdashboard_child1_two'>
                        <p className="Mobdashboard_child1_two_title">Cancelled</p>
                        <p className="Mobdashboard_child1_two_num">{cancelledProjects}</p>
                       </div>
                    </div>
            </div>
            <div id="Mobdashboard_child2"><p>Department wise - Total Vs Closed</p></div>
            <div id="Mobdashboard_child3">
            <Bar
              data={chartData}
              width={'250px'}
             >
            </Bar>
            </div>
        </div>
    </div>
    <Footer />
    </div>
  )
}

export default MobileDashboard;