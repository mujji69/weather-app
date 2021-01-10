import React, { Component } from 'react';

import weatherLogo from "../assets/cloudy.png";

import moment from "moment";
const apiKey = "3aebb904e52f6eddf86abd012b23a6ff";

class Weather extends Component {
    constructor(){
        super();
        this.state = {
            city: "karachi",
            noData: false,
        
        }
    }
    componentDidMount(){
        // use for default data
            this.getData();      
    }

    //Function to get current and weekly weather data
    getData = async () =>{
       
     //------------------ CURRENT WEATHER DATA ------------------//

     await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${this.state.city}&appid=${apiKey}&units=metric`)
        .then((res)=>res.json())
        .then((data)=>{
            if(data){
                    if(data.cod == "404"){
                    // console.log("data: ",data) 

                        this.setState({
                            noData:true,
                        })
                    }else{
                    // console.log("data: ",data) 

                        this.setState({
                            noData:false,
                            currentData: data
                        })  
                    } 
                    
                
                
            }else{
                // console.log("data: ",data) 
                this.setState({
                    noData:true,
                })
            }
            
        })
        .catch((err)=>{
            console.log("error");
        })
     //------------------ END OF CURRENT WEATHER DATA ------------------//
     
     
     //------------------ 5 Days WEATHER DATA ------------------//   

        await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${this.state.city}&appid=${apiKey}&units=metric`)
        .then((res)=>res.json())
        .then((data)=>{
            // console.log("daily data: ",data)
            let weekData = []
             if(data){
                 if(data.cod === "404"){
                    this.setState({
                        noData:true,
                    })
                 }else{
                    for(let i=0;i<data.list.length;i=i+8){
                        weekData.push({day:moment(data.list[i].dt_txt).format("dddd"), data:data.list[i]});
                    }
                    let days = weekData.map(day=>{
                return day.day;
            })
                    this.setState({
                        dailyData: data,
                        days: days,
                        weekData:weekData
                    })
                 }
             }else{
                this.setState({
                    noData:true,
                })
             }   
            
            // console.log("weekData: ",weekData);
            
        
        
            
        })
     //------------------END OF CURRENT WEATHER DATA ------------------//   


    }
    cityHandler = (e) =>{
        this.setState({
            city: e.target.value
        })
    }
    getWeather = (e) =>{
        e.preventDefault();
        this.getData()
        
    }
    render() {
        let { currentData } = this.state;
        return (
            <div className="">
            <form>
            <div style={{color:"white"}} className="text-right col-sm-12 mb-5"><img style={{marginBottom:"15px"}} className="d-inline"  src={weatherLogo} /> <h3 className="d-inline ml-3">WEATHER APP</h3></div>
                
              <div className="d-flex row">
                <div className="col-md-3 col-sm-12">
                  <input
                    style={{marginBottom:"7px"}}
                    type="text"
                    className="form-control"
                    placeholder="City"
                    name="city"
                    autoComplete="off"
                    onChange={this.cityHandler}
                    value = {this.state.city}
                  />
                </div>
                
                <div className="col-md-3">
                  <button disabled={!this.state.city.length} onClick={(e)=>{this.getWeather(e)}} className="btn btn-primary btn-sm" style={{backgroundColor:"#5b506b",borderColor:"#5b506b",boxShadow:"none",marginTop:"7px" }}>Get Weather</button>
                </div>
                

              </div>
            </form>
                {this.state.noData? <div className="no-data">No Data Found</div>:
                 <div>
                     {this.state.currentData ?
                    <div className="main-data mt-5">
                        <h3>{currentData.name}</h3>
                        <div>{currentData.weather[0].description}</div>
                        <h1>{currentData.main.temp} C</h1>
                        {/* <div>{currentData.main.}</div> */}

                    </div>
                    :null    
                    }
                    {this.state.dailyData ?
                    <div className="mt-5">
                        <div className="row set-border mb-3">
                            <div className="col-4">Day</div>
                            <div className="col-4">Icon</div>

                            
                            <div className="col-2">High</div>
                            <div className="col-2">Low</div>
                            
                        </div>
                        {this.state.weekData ?
                        this.state.weekData.map(day=>(
                            <div className="row set-border mb-3">
                            <div className="col-4">
                            <a style={{color:"white"}} href={"/"+this.state.city+"/"+day.day} target="_blank">{day.day}</a>
                            </div>
                            <div className="col-4"><img src={"http://openweathermap.org/img/wn/"+day.data.weather[0].icon+"@2x.png"} style={{height:"50px",width:"50px"}} /></div>

                            
                            <div className="col-2">{day.data.main.temp_max} C</div>
                            <div className="col-2">{day.data.main.temp_min} C</div>
                            
                        </div>
                        ))
                       
                       : null}
                    </div>
                    : null
    }
                    <div className="mt-5">
                        
                        {this.state.currentData ?
                        <div className="row">
                            <div className="d-block col-md-4 col-sm-6 col-xs-12">
                                
                                <div>SUNRISE</div>
                                <p>{moment.unix(currentData.sys.sunrise).format("hh:mm A")}</p>
                            </div>
                            <div className="d-block col-md-4 col-sm-6 col-xs-12">
                               <div>SUNSET</div>
                                <p>{moment.unix(currentData.sys.sunset).format("hh:mm A")}</p>

                            </div>
                            
                            <div className="d-block col-md-4 col-sm-6 col-xs-12">
                                <div>HUMIDITY</div>
                                <p>{currentData.main.humidity} %</p>
                            </div>
                            <div className="d-block col-md-4 col-sm-6 col-xs-12">
                                <div>WIND</div>
                                <p>{currentData.wind.speed} m/s</p>
                            </div>
                            <div className="d-block col-md-4 col-sm-6 col-xs-12">
                                <div>FEELS LIKE</div>
                                <p>{currentData.main.feels_like} C</p>
                            </div>
                            
                            <div className="d-block col-md-4 col-sm-6 col-xs-12">
                                <div>Pressure:</div>
                                <p>{currentData.main.pressure} hPa</p>
                            </div>
                            <div className="d-block col-md-4 col-sm-6 col-xs-12">
                                <div>Visibility:</div>
                                <p>{currentData.visibility} m</p>
                            </div>
                            
                        </div>
                    : null   
                    } 
                       
                    </div>    

                </div>
    }
          </div>
        )
    }
}

export default Weather;