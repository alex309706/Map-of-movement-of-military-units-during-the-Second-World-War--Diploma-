import {useStyles,RedirectionToComponents,ProfileButton,TextField,DeleteIcon,Button,AddCommander,Menu,MenuItem,Box,React,axios} from './index';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import {Link} from 'react-router-dom';
import {useEffect, useState} from 'react';



const defaultProps = {
    bgcolor: 'background.paper',
    m: 1,
    border: 1,
  };


function Header(props)
{
    const classes = useStyles();
    return(
        <div className={classes.header}>
            <h2 >Список командующих</h2>
            <div>
            <Button variant="contained"
            color="primary"
            className={classes.buttonAdd}
            >
                Добавить
            </Button>
          { <AddCommander/>}
        </div>
        </div>
    )
}

function Commander(props)
{
    const classes = useStyles();
    return(
        <div>
            <TextField defaultValue={props.Name}
             className={classes.textField}
             variant="outlined"
             label ="Ф.И.О."
             InputProps={{
                readOnly: true,
              }}
             />
            <TextField defaultValue={props.Rank}
             className={classes.textField}
             variant="outlined"
             label ="Звание"
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
    )
}

function CommandersToComponents(props)
{
    const mapToComponents = props.commanders.map((c)=>
    <li key={c.id} style={{ listStyleType: "none" }}>
        <Commander Name = {`${c.firstName ? c.firstName : " "} ${c.lastName} ${c.patronymic ? c.patronymic : " "}`} Rank = {c.rank.name}/>
    </li>
    );
    return(
        <ul>{mapToComponents}</ul>
    );
}
export default function Commanders()
{
    const [commanders, setcommanders] = useState([])
    const url = 'https://localhost:44315/api/Commanders'
    useEffect(() => {
        axios.get(url)
        .then(res => {
            setcommanders(res.data)
          })
    },[]);

    return(
        <div >
        <ProfileButton/>
        <Header/>
        <CommandersToComponents commanders={commanders}/>
        </div>
    )
}
