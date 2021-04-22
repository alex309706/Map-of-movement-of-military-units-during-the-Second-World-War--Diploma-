import React from 'react';
import {useStyles ,ProfileButton,TextField,DeleteIcon,Button,AddActualData} from './index';
import Box from '@material-ui/core/Box';


const defaultProps = {
    bgcolor: 'background.paper',
    m: 4,
    border: 1,
  };

function ActualData(props)
{
    const classes = useStyles();
    return(
        <Box borderRadius={16} {...defaultProps}> 
            <div >
            <TextField defaultValue={props.date}
             className={classes.textField}
             variant="outlined"
             label ="Дата"
             InputProps={{
                readOnly: true,
              }}
             />
            <TextField defaultValue={props.Subdivision.Name}
             className={classes.textField}
             variant="outlined"
             label ="Название подразделения"
             InputProps={{
                readOnly: true,
              }}
             />
            <TextField defaultValue={props.Subdivision.Commander.Name}
             className={classes.textField}
             variant="outlined"
             label ="Командир"
             InputProps={{
                readOnly: true,
              }}
             />
             <TextField defaultValue={props.Subdivision.Strength}
             className={classes.textField}
             variant="outlined"
             label ="Численность"
             InputProps={{
                readOnly: true,
              }}
             />
             <TextField defaultValue={props.Location.City}
             className={classes.textField}
             variant="outlined"
             label ="Местоположение"
             InputProps={{
                readOnly: true,
              }}
             />
              <TextField defaultValue={props.Document}
             className={classes.textField}
             variant="outlined"
             label ="Документ"
             InputProps={{
                readOnly: true,
              }}
             />
             <div className={classes.ButtonsToOneLine}>
             <Button 
            className={classes.button}
            variant="contained"
            color="primary"
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
        </Box>
    )
}

function ActualDataToComponents(props)
{
    const actualData=props.ActualData;
    const mapToComponents = actualData.map((aD)=>
    <li style={{ listStyleType: "none" }}>
        <ActualData {...aD}/>
    </li>
    );
    return(
        <ul>{mapToComponents}</ul>
    );
}
const actualDataFromBackend = [
    {
        "id":"1",
        "date":"22.06.1941",
        "Subdivision":{
            "Name":"1-я мотострелковая",
            "Commander":{
                "id":"1",
                "Name":"Иванов И.И.",
            },
            "Strength":"12345",
        },
        "Location":{
            "City":"Гродно",
            "Coordinates":{
                "X":"10",
                "Y":"20"
            }
        },
        "Document":"Опись № дело #"
    },
    {
        "id":"2",
        "date":"22.06.1941",
        "Subdivision":{
            "Name":"1-я мотострелковая",
            "Commander":{
                "id":"1",
                "Name":"Иванов И.И.",
            },
            "Strength":"12345",
            },
            "Location":{
                "City":"Гродно",
                "Coordinates":{
                    "X":"10",
                    "Y":"20"
                }
        },
        "Document":"Опись № дело #"
    },
    {
        "id":"3",
        "date":"22.06.1941",
        "Subdivision":{
            "Name":"1-я мотострелковая",
            "Commander":{
                "id":"1",
                "Name":"Иванов И.И.",
            },
            "Strength":"12345",
            },
            "Location":{
                "City":"Гродно",
                "Coordinates":{
                    "X":"10",
                    "Y":"20"
                }
        },
        "Document":"Опись № дело #"
    },
]
function Header(props)
{
    const classes = useStyles();
    return(
        <div className={classes.header}>
            <h2 >Актуализированные данные</h2>
            <AddButton/>
            <AddActualData/>
        </div>
    )
}
function AddButton()
{
    const classes = useStyles();
    return(
        <Button variant="contained"
        color="primary"
        className={classes.buttonAdd}
        >
            Добавить
        </Button>
    )
}

export default function ListOfActualData()
{
    const classes = useStyles();
    return(
        <div >
            <ProfileButton/>
            <Header/>
            
            <ActualDataToComponents ActualData={actualDataFromBackend}/>
        </div>
    )
}
