import React from 'react';
import {useStyles ,ProfileButton,TextField,DeleteIcon,Button,AddLocation} from './index';

function Header(props)
{
    const classes = useStyles();
    return(
        <div className={classes.header}>
            <h2 >Список местоположений</h2>
            <AddLocationButton/>
            <AddLocation/>
        </div>
    )
}
function Location(props)
{
    const classes = useStyles();
    return(
        <div >
            <TextField defaultValue={props.City}
            className={classes.textField}
            variant="outlined"
            label = "Название"
            InputProps={{
                readOnly: true,
            }}
            />
            <TextField defaultValue={props.Coordinates.X}
            className={classes.textField}
            variant="outlined"
            label = "Координата X"
            InputProps={{
                readOnly: true,
            }}
            />
            <TextField defaultValue={props.Coordinates.Y}
            className={classes.textField}
            variant="outlined"
            label = "Координата Y"
            InputProps={{
                readOnly: true,
            }}
            />
        <div className={classes.ButtonsToOneLine}>
        <Button 
        variant="contained"
        color="primary"
        className={classes.button}
        >
        Изменить
        </Button>
        <Button
        variant="contained"
        color="secondary"
        className={classes.button}
        startIcon={<DeleteIcon />}
        >
        Удалить
        </Button>
        </div>  
        
        </div>
    )
}
function AddLocationButton(props)
{
    const classes = useStyles();
    return(
        <div >
            <Button 
            variant="contained"
            color="primary"
            className={classes.buttonAdd}
            >
            Добавить
            </Button>
        </div>
    )
}

function LocationsToComponents(props)
{
    const Locations=props.Locations;
    const mapToComponents = Locations.map((l)=>
    <li style={{ listStyleType: "none" }}>
        { <Location {...l}/> }
    </li>
    );
    return(
        <ul>{mapToComponents}</ul>
    );
}

export default function ListOfLocations()
{
    return(
        <div >
        <ProfileButton/>
        <Header/>
        <LocationsToComponents Locations={locationsFromBackend}/>
        </div>
    )
}
  const locationsFromBackend = [
    {
        "id":"1",
        "City":"Берлин",
        "Coordinates":{
            "X":10,
            "Y":15
        }
    },
    {
        "id":"2",
        "City":"Минск",
        "Coordinates":{
            "X":20,
            "Y":25
        }
    },
    {
        "id":"3",
        "City":"Гродно",
        "Coordinates":{
            "X":25,
            "Y":30
        }
    },
]