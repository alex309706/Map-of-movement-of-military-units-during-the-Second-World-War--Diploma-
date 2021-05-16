import React from 'react'
import { YMaps, Map, Placemark,ObjectManager } from 'react-yandex-maps';
// import tankIcon from './tank.jpg';
import Calendar from 'react-calendar';
import {useState, useEffect} from 'react';
import axios from 'axios'; 

function GetArrayOfPoints(ActualData) {
    var ArrayOfPoints = ActualData.map((oneActualData)=>
    {
        return{
            type: 'Feature',
            id: oneActualData.id,
            geometry:{
                type:'Point',
                coordinates:[oneActualData.location.coordinateX,oneActualData.location.coordinateY]
            },
            properties:{
                balloonContent:`
                <p>Название: ${oneActualData.subdivision.name? oneActualData.subdivision.name: "Отсутствует поле" }.</p>
                <p>Коммандир:${oneActualData.subdivision.commander.rank.name} 
                 ${oneActualData.subdivision.commander.firstName? oneActualData.subdivision.commander.firstName: " " } 
                 ${oneActualData.subdivision.commander.lastName? oneActualData.subdivision.commander.lastName: " " } 
                 ${oneActualData.subdivision.commander.patronymic? oneActualData.subdivision.commander.patronymic: " " } 
                </p>
                <p>Численность: ${oneActualData.subdivision.strength? oneActualData.subdivision.strength+ " человек": "Отсутствует поле" }.</p>
                <p>Состав: ${oneActualData.subdivision.composition? oneActualData.subdivision.composition: "Отсутствует поле" }.</p>
                <p>Удостоверяющий документ: ${oneActualData.document.name? oneActualData.document.name: "Отсутствует поле" }.</p>` ,
             }
        }
    }) 
    return ArrayOfPoints;
}

function Objects ({ActualData:InitialActualData}) {
    const [ActualData, setActualData] = useState(InitialActualData)

    const ArrayOfPoints=GetArrayOfPoints(ActualData)
    return(
        <ObjectManager
                 objects={{
                   openBalloonOnClick:true
                 }}
                 clusters={{}}
                 options={{
                   clusterize: true,
                   gridSize: 32
                 }}
                 defaultFeatures ={{
                    type: 'FeatureCollection',
                    features: ArrayOfPoints
                }
            }
            modules={[
                "objectManager.addon.objectsBalloon",
                "objectManager.addon.clustersBalloon"
              ]}
                //  defaultFeatures={{
                //    type: "FeatureCollection",
                //     features: ActualData.map((division) => {
                //         console.log(division)
                //      switch(division.subdivision.typeOfSubdivision)
                //      {
                //        case 'Army':division.subdivision.strength=212625
                //        break;
                //        case 'Corps':division.subdivision.strength=70875
                //        break;
                //        case 'Division':division.subdivision.strength=23625
                //        break;
                //        case 'Brigade':division.subdivision.strength=7875
                //        break;
                //        case 'Regiment':division.subdivision.strength=2625
                //        break;
                //      }
                //      return {
                //        id: id,
                //        type: "Feature",
                //        geometry: {
                //          type: "Point",
                //          coordinates: [division.location.x,division.location.y]
                //        },
                //        properties: {
                //          balloonContent: `
                //          <p>Название: ${division.subdivision.name? division.subdivision.name: "Отсутствует поле" }.</p>
                //          <p>Коммандир: ${division.subdivision.commanderNavigation.name? division.subdivision.commanderNavigation.name: "Отсутствует поле" }.</p>
                //          <p>Численность: ${division.subdivision.strength? division.subdivision.strength+ " человек": "Отсутствует поле" }.</p>
                //          <p>Состав: ${division.subdivision.composition? division.subdivision.composition: "Отсутствует поле" }.</p>
                //          <p>Удостоверяющий документ: ${division.subdivision.document? division.subdivision.document: "Отсутствует поле" }.</p>
                        
                //      `,
                //          clusterCaption: `Метка №${id + 1}`,
                //          iconImageHref:tankIcon,
                //          iconImageSize: [30, 42],
                //          iconImageOffset: [-5, -38]
                //        }
                //      };
                //     })
                //  }}
                //  modules={[
                //    "objectManager.addon.objectsBalloon",
                //    "objectManager.addon.clustersBalloon"
                //  ]}
               />
      )
}
function CustomCalendar(props) {
    return (
        <div className="calendar">
          <Calendar
             value={props.date}        
             onClickDay={props.onClick}
          />
          <label htmlFor="selectedDate">Выбранная дата</label>
            <input id="selectedDate" onChange={()=>console.log("Заглушка из MapOfSubdivisions.CustomCalendar. ID=selectedDate")} type="text" value ={props.date.toDateString()}/>
        </div>
      );
}
export default function MapOfSubdivisions() {

    const [Datetime, setDatetime] = useState('1941-06-22')
    const [ActualData, setActualData] = useState([])
    const UrlToApi = 'https://localhost:44315/api/ActualData/';
    const [Url, setUrl] = useState(UrlToApi+Datetime)

    useEffect(() => {
        axios.get(Url)
        .then(response => {
        setActualData(response.data);
          })
    },[Url])
    const onDateClick = e =>
    {
        let year = e.getFullYear()
        let month = e.getMonth()+1
        let day=e.getDate()
        let date = year+"-"+month+"-"+day
        setDatetime(date)
        setUrl(UrlToApi+date)
    }

    return(
        <div>
            
            <CustomCalendar date = {new Date(Datetime)} onClick = {onDateClick}/>
            <CustomMap ActualData = {ActualData} />
        </div>
    )
}
function CustomMap({ActualData}) {
    const mapState = { center: [53.88,28.05], zoom: 7 };
    return(
        <YMaps>
             <Map defaultState={mapState} className="map">
               <Objects ActualData={ActualData}/>
             </Map>
        </YMaps>
    )
}
