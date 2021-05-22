import {Button,DeleteIcon,TextField,ProfileButton,useStyles,React,AddSubdivision,axios} from './index';
import {useState, useEffect} from 'react';

function Header(props)
{
    const classes = useStyles();
    return(
        <div className={classes.header}>
            <h2 >Список подразделений</h2>
            {/* <Button variant="contained"
            color="primary"
            className={classes.buttonAdd}
            >
                Добавить
            </Button> */}
            <AddSubdivision/>
        </div>
    )
}
function Subdivision(props)
{
    const classes = useStyles();
    return(
        <div>
            <TextField defaultValue={props.name}
             className={classes.textField}
             variant="outlined"
             label = "Название"
             InputProps={{
                readOnly: true,
              }}
             />
              <TextField defaultValue={props.commander.lastName}
             className={classes.textField}
             variant="outlined"
             label = "Командующий"
             InputProps={{
                readOnly: true,
              }}
             />
             <TextField defaultValue={props.strength}
             className={classes.textField}
             variant="outlined"
             label = "Численность"
             InputProps={{
                readOnly: true,
              }}
             />
             <TextField defaultValue={props.composition}
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
    <li key={s.id} style={{ listStyleType: "none" }}>
        { <Subdivision  {...s} /> }
    </li>
    );
    return(
        <ul>{mapToComponents}</ul>
    );
}

export default function ListOfSubdivisions()
{
    const [Subdivisions, setSubdivisions] = useState([])
    const Url = 'https://localhost:44315/api/Subdivisions';
    useEffect(() => {
        axios.get(Url)
        .then(response =>
            {
                console.log(response.data);
                setSubdivisions(response.data)
            })
        },[])
    
    return(
        <div >
        <ProfileButton/>
        <Header/>
        <SubdivisionsToComponents Subdivisions={Subdivisions}/>
        </div>
    )
}
