import {useStyles ,RedirectionToComponents,ProfileButton,TextField,DeleteIcon,Button,AddCommander,Menu,MenuItem,Box,React} from './index';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import {Link} from 'react-router-dom';

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

const commandersFromBackend = [
    {
        "id":"1",
        "Name":"Иванов И.И.",
        "Rank":"Генерал-лейтенант"
    },
    {
        "id":"2",
        "Name":"Петров П.П",
        "Rank":"Генерал-лейтенант"
    },
    {
        "id":"3",
        "Name":"Синичкин С.С.",
        "Rank":"Генерал-лейтенант"
    },
]

function CommandersToComponents(props)
{
    const commanders=props.commanders;
    const mapToComponents = commanders.map((c)=>
    <li style={{ listStyleType: "none" }}>
        <Commander Name = {c.Name} Rank = {c.Rank}/>
    </li>
    );
    return(
        <ul>{mapToComponents}</ul>
    );
}
export default function ListOfCommanders()
{
    return(
        <div >
        <ProfileButton/>
        <Header/>
        <CommandersToComponents commanders={commandersFromBackend}/>
        </div>
    )
}
