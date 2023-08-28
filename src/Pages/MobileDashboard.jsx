import React, {  useState } from 'react'
import"../styling/MobileDashboard.css"
import {Chart as ChartJS,BarElement,CategoryScale,LinearScale,Tooltip,Legend} from "chart.js"
import {Bar} from "react-chartjs-2"
import NavigationFooter from './NavigationFooter'
import Footer from './Footer'

ChartJS.register(
  BarElement,CategoryScale,LinearScale,Tooltip,Legend
)

const MobileDashboard = ({getCounts}) => {
  const [count,setCount]=useState(0)
  // const [Closed,setClosed]=useState([])
  // const [Total,setTotal]=useState([])
  // const [clouser,setClouser]=useState(0)
  const [Data,setData]=useState([])

  const data={
    
    datasets:[{
      label:'Total',
      backgroundColor:'blue',
      borderRadius:10
    },
    {
      label:'Closed',
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
                        <p className="Mobdashboard_child1_two_num">{count}</p>
                       </div>
                    </div>
                    <div className='Mobdashboard_child1_child' >
                       <div className='Mobdashboard_child1_one'></div>
                       <div className='Mobdashboard_child1_two'>
                        <p className="Mobdashboard_child1_two_title">Closed</p>
                       </div>
                    </div>
                    <div className='Mobdashboard_child1_child' >
                       <div className='Mobdashboard_child1_one'></div>
                       <div className='Mobdashboard_child1_two'>
                        <p className="Mobdashboard_child1_two_title">Running</p>
                       </div>
                    </div>
                    <div className='Mobdashboard_child1_child' >
                       <div className='Mobdashboard_child1_one'></div>
                       <div className='Mobdashboard_child1_two'>
                        <p className="Mobdashboard_child1_two_title">Clousre Delay</p>
                        <p className="Mobdashboard_child1_two_num">clouser</p>
                       </div>
                    </div>
                    <div className='Mobdashboard_child1_child' >
                       <div className='Mobdashboard_child1_one'></div>
                       <div className='Mobdashboard_child1_two'>
                        <p className="Mobdashboard_child1_two_title">Cancelled</p>
                       </div>
                    </div>
            </div>
            <div id="Mobdashboard_child2"><p>Department wise - Total Vs Closed</p></div>
            <div id="Mobdashboard_child3">
            <Bar
              data={Data}
              width={"120px"}
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