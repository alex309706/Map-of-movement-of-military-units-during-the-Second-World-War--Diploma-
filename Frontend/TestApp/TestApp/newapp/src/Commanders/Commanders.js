import {useStyles,AddCommander,ProfileButton,TextField,Button,React,axios,DeleteCommander,EditCommander} from './index';
import {useEffect, useState} from 'react';

function Commander({id,Rank,Name})
{
    const classes = useStyles();
    return(
        <div>
            <TextField defaultValue={Name}
             className={classes.textField}
             variant="outlined"
             label ="Ф.И.О."
             InputProps={{
                readOnly: true,
              }}
             />
            <TextField defaultValue={Rank}
             className={classes.textField}
             variant="outlined"
             label ="Звание"
             InputProps={{
                readOnly: true,
              }}
             />

           <div className={classes.ButtonsToOneLine}>
              <EditCommander/>
              <DeleteCommander id={id}/>
           </div>
        </div>
    )
}

function CommandersToComponents(props)
{
    const mapToComponents = props.commanders.map((c)=>
    <li key={c.id} style={{ listStyleType: "none" }}>
        <Commander id={c.id} Name = {`${c.firstName ? c.firstName : " "} ${c.lastName} ${c.patronymic ? c.patronymic : " "}`} Rank = {c.rank.name}/>
    </li>
    );
    return(
        <ul>{mapToComponents}</ul>
    );
}
function Header()
{
    const classes = useStyles();
    return(
        <div className={classes.header}>
        <h2 >Список командующих</h2>
        <div>
        {/* <Button variant="contained"
        color="primary"
        className={classes.buttonAdd}
        >
            Добавить
        </Button> */}
      { <AddCommander  />}
        </div>
    </div>
    )
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
    },[commanders]);

    return(
        <div >
        <ProfileButton/>

      <Header/>
        <CommandersToComponents commanders={commanders}/>
        </div>
    )
}
