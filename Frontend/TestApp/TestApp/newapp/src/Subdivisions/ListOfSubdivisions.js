import {Button,DeleteIcon,TextField,ProfileButton,useStyles,React,AddSubdivision} from './index';
function Header(props)
{
    const classes = useStyles();
    return(
        <div className={classes.header}>
            <h2 >Список подразделений</h2>
            <Button variant="contained"
            color="primary"
            className={classes.buttonAdd}
            >
                Добавить
            </Button>
            <AddSubdivision/>
        </div>
    )
}
function Subdivision(props)
{
    const classes = useStyles();
    return(
        <div>
            <TextField defaultValue={props.Name}
             className={classes.textField}
             variant="outlined"
             label = "Название"
             InputProps={{
                readOnly: true,
              }}
             />
              <TextField defaultValue={props.Commander}
             className={classes.textField}
             variant="outlined"
             label = "Командующий"
             InputProps={{
                readOnly: true,
              }}
             />
             <TextField defaultValue={props.Strength}
             className={classes.textField}
             variant="outlined"
             label = "Численность"
             InputProps={{
                readOnly: true,
              }}
             />
             <TextField defaultValue={props.Composition}
             className={classes.textField}
             variant="outlined"
             label = "Состав"
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

function SubdivisionsToComponents(props)
{
    const Subdivisions=props.Subdivisions;
    const mapToComponents = Subdivisions.map((s)=>
    <li style={{ listStyleType: "none" }}>
        { <Subdivision {...s} Location={s.Location.City} /> }
    </li>
    );
    return(
        <ul>{mapToComponents}</ul>
    );
}

export default function ListOfSubdivisions()
{
   
    return(
        <div >
        <ProfileButton/>
        <Header/>
        <SubdivisionsToComponents Subdivisions={subdivisionsFromBackend}/>
        </div>
    )
}
const subdivisionsFromBackend = [
    {
        "id":"1",
        "Name":"3 Армия",
        "Strength":"212625",
        "Composition":"4ск, 11мк, 11сд, 27сд, 56сд, 85сд, 204мсд, 29тд, 33тд, 7птартб",
        "Commander":"Иванов.И.И.",
        "Location":{
            "City":"Берлин",
            "Coordinates":{
                "X":10,
                "Y":20
            }
        }
    },
    {
        "id":"2",
        "Name":"4 Армия",
        "Strength":"212625",
        "Commander":"Иванов.И.И.",
        "Composition":"28ск	14мк	6сд, 42сд, 49сд, 75сд, 205мсд, 22тд, 30тд, 10сад",
        "Location":{
            "City":"Берлин",
            "Coordinates":{
                "X":10,
                "Y":20
            }
        }
        
    },
    {
        "id":"3",
        "Name":"10 Армия",
        "Strength":"212625",
        "Commander":"Иванов.И.И.",
        "Composition":"1ск, 5ск, 6мк, 13мк, 6кав.к., 2сд, 8сд, 13сд, 86сд, 113сд, 26мсд, 115сд, 208мд, 4тд, 7тд, 25тд, 31тд, 6кав.д., 36кав.д., 9сад, 6птб",
        "Location":{
            "City":"Берлин",
            "Coordinates":{
                "X":10,
                "Y":20
            }
        }

    },
]