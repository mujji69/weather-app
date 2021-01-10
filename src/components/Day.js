import React, {useState, useEffect} from 'react';
import {useParams} from "react-router-dom";
import moment from "moment";
import {Card, Accordion, Button} from "react-bootstrap";
import weatherLogo from "../assets/cloudy.png";


const Day = () => {
    //apikey
    const apiKey = "3aebb904e52f6eddf86abd012b23a6ff";
    
    //hourly data state
    const [hourlyData,sethourlyData] = useState(null);

    // specific day
    const [Day,setDay] = useState(null);

    // use params to get the url values
    const params = useParams();

    useEffect(async ()=>{
        // get 5 days data
       await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${params.city}&appid=${apiKey}&units=metric`)
        .then((res)=>res.json())
        .then((data)=>{
            
            // filter to get only the desired day data
         let weekData = data.list.filter(day=>{
                return moment(day.dt_txt).format("dddd") === params.day;
            })
            
            
            setDay(moment(weekData[0].dt_txt).format("dddd , LL"));
            sethourlyData(weekData);
            
        })        
    },[])
    return (
        <>
        <div style={{color:"black",marginTop:"30px",marginBottom:"30px"}}>
            <div className="container">
            <div style={{color:"white"}} className="text-right col-sm-12 mb-5"><img style={{marginBottom:"15px"}} className="d-inline"  src={weatherLogo} /> <h3 className="d-inline ml-3">WEATHER APP</h3></div>

                {Day ?
                <h3 style={{color:"white"}}>{Day}</h3>
                
                :null}
                {hourlyData?
                    hourlyData.map((day,index)=>(
                        <div>
                            <Accordion>
                                    <Card>
                                        <Card.Header  style={{backgroundColor:"#beb1c7"}}>
                                         <div className="d-flex row">
                                             <div className="col-2">{moment(day.dt_txt).format("hh:mm A")}</div>
                                             <div className="col-2">{day.main.temp} C</div>
                                             <div className="col-2"><img src={"http://openweathermap.org/img/wn/"+day.weather[0].icon+"@2x.png"} style={{height:"50px",width:"50px"}} /></div>
                                             <div className="col-2"><span className="text-muted">max: </span> {day.main.temp_max} C</div>
                                             <div className="col-2"><span className="text-muted">min: </span>{day.main.temp_min} C</div>

                                         </div>
                                        <Accordion.Toggle as={Button} variant="link" eventKey="0" className="float-right">
                                           <i style={{color:"#5b506b"}} className="fa fa-chevron-down"></i>
                                        </Accordion.Toggle>
                                        </Card.Header>
                                        <Accordion.Collapse eventKey="0">
                                        <Card.Body style={{backgroundColor:"#c9c6cc"}}>
                                        <div className="row">
                            
                                            
                                            <div className="d-block col-md-4 col-sm-6 col-xs-12">
                                                <div>HUMIDITY</div>
                                                <p>{day.main.humidity} %</p>
                                            </div>
                                            <div className="d-block col-md-4 col-sm-6 col-xs-12">
                                                <div>WIND</div>
                                                <p>{day.wind.speed} m/s</p>
                                            </div>
                                            <div className="d-block col-md-4 col-sm-6 col-xs-12">
                                                <div>FEELS LIKE</div>
                                                <p>{day.main.feels_like} C</p>
                                            </div>
                                            
                                            <div className="d-block col-md-4 col-sm-6 col-xs-12">
                                                <div>Pressure:</div>
                                                <p>{day.main.pressure} hPa</p>
                                            </div>
                                            <div className="d-block col-md-4 col-sm-6 col-xs-12">
                                                <div>Visibility:</div>
                                                <p>{day.visibility} m</p>
                                            </div>
                                            
                                        </div>
                                        </Card.Body>
                                        </Accordion.Collapse>
                                    </Card>
                                    
                             </Accordion>
                        </div>

                    ))
                :null}     
            </div>
        </div>
        </>
    )
}
export default Day;