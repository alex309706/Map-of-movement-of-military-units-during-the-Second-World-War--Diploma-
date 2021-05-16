import React,{useState,useEffect} from 'react';
import {useStyles ,ProfileButton,TextField,DeleteIcon,Button,AddActualData,axios,Box} from './index';

const defaultProps = {
    bgcolor: 'background.paper',
    m: 4,
    border: 1,
    borderRadius:16
  };
function GetActualDataAsComponent(props)
{
    const classes = useStyles();
    return(
        <Box {...defaultProps}> 
            <div >
            <TextField defaultValue={props.date}
             className={classes.textField}
             variant="outlined"
             label ="Дата"
             InputProps={{
                readOnly: true,
              }}
             />
            <TextField defaultValue={props.subdivision.name}
             className={classes.textField}
             variant="outlined"
             label ="Название подразделения"
             InputProps={{
                readOnly: true,
              }}
             />
            <TextField 
            defaultValue={`${props.subdivision.commander.rank.name}${props.subdivision.commander.firstName? props.subdivision.commander.firstName : ''} ${props.subdivision.commander.lastName? props.subdivision.commander.lastName : ''} ${props.subdivision.commander.patronymic? props.subdivision.commander.patronymic : ''}`} 
             className={classes.textField}
             variant="outlined"
             label ="Командир"
             InputProps={{
                readOnly: true,
              }}
             />
             <TextField defaultValue={props.subdivision.strength}
             className={classes.textField}
             variant="outlined"
             label ="Численность"
             InputProps={{
                readOnly: true,
              }}
             />
             <TextField defaultValue={props.location.name}
             className={classes.textField}
             variant="outlined"
             label ="Местоположение"
             InputProps={{
                readOnly: true,
              }}
             />
              <TextField defaultValue={props.document.name}
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

function ActualDataToComponents({ActualData:actualData})
{
    const mapToComponents = actualData.map((aD)=>
    <li key={aD.id} style={{ listStyleType: "none" }}>
        <GetActualDataAsComponent {...aD}/>
    </li>
    );
    return(
        <ul>{mapToComponents}</ul>
    );
}
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
    const Url = 'https://localhost:44315/api/ActualData';
    const [ActualData, setActualData] = useState([])
    useEffect(() => {
       axios.get(Url)
       .then(response=>
        {
        console.log(response.data)
        setActualData(response.data)
        })
    },[])
    return(
        <div >
            <ProfileButton/>
            <Header/>
            <ActualDataToComponents ActualData={ActualData}/>
        </div>
    )
}
