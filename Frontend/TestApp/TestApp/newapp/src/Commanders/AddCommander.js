import {SaveIcon,TextField,Button,useStyles,React,Menu,MenuItem,PopupState, axios} from './index';
import {bindTrigger, bindMenu } from 'material-ui-popup-state';
import {Link} from 'react-router-dom';
import {useEffect , useState} from 'react'



import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';





export default function AddCommander(props)
{
    const [CommanderLastName, setCommanderLastName] = useState([])
    


    const HandleWriteCommanderLastName = (event)=>
    {
        setCommanderLastName(event.target.value)
    }

    const baseUrlForRanks = 'https://localhost:44315/api/Ranks'

    const baseUrlForCommanders = 'https://localhost:44315/api/Commanders'


    const [Ranks, setRanks] = useState([])
    useEffect(() => {
        axios.get(baseUrlForRanks)
        .then(
            response => 
            {
                setRanks(response.data)   
            }
        )
    }, [])
   
    
const ranksToMenuItems = Ranks.map((rank)=>
    <MenuItem key={rank.id} value = {rank.name}>{rank.name}</MenuItem>
)
const [SelectedRankName, setSelectedRankName] = useState("Генерал-Майор")

const [SelectedRank, setSelectedRank] = useState({})

const handleChangeRank = (event) => {
    setSelectedRankName(event.target.value)
    setSelectedRank(Ranks.find(rank=>rank.name == SelectedRankName))
};

const [Commander, setCommander] = useState([])


const HandleCreateCommander = () =>{

    setCommander(
            {
                rankid:SelectedRank.id,
                rank:SelectedRank,
                lastName:CommanderLastName,
                firstName:"",
                patronymic:""
            }
        )
        console.log(Commander)
}

useEffect(() => {
    axios.post(baseUrlForCommanders,Commander)
    .then(response=>
        {
            console.log(response)
            console.log(response.data)
        })
},[] )

const classes = useStyles();

    return(
        <div >
        <TextField 
        className={classes.textFieldForAddition}
        variant="outlined"
        label ="Введите Фамилию нового командующего"
        onChange = {HandleWriteCommanderLastName}
       />
        <FormControl className={classes.formControl}>
        <Select
          value = {SelectedRankName}
          onChange={handleChangeRank}
          className={classes.selectEmpty}
          inputProps={{ 'aria-label': 'Without label' }}
        >
          {ranksToMenuItems}
        </Select>
        <FormHelperText>Выберите звание</FormHelperText>
        </FormControl>

        <Button
        variant="contained"
        color="secondary"
        className={classes.saveButton}
        startIcon={<SaveIcon />}
        onClick = {HandleCreateCommander}
      >
        Сохранить
      </Button>
        </div>
    )
}
