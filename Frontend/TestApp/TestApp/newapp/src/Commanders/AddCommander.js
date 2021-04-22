import {SaveIcon,TextField,Button,useStyles,React,Menu,MenuItem,PopupState} from './index';
import {bindTrigger, bindMenu } from 'material-ui-popup-state';
import {Link} from 'react-router-dom';


export default function AddCommander(props)
{
const classes = useStyles();
    return(
        <div >
        <TextField 
        className={classes.textFieldForAddition}
        variant="outlined"
        label ="Введите Ф.И.О. нового командующего"
       />
       <PopupState variant="popover" >
        {(popupState) => (
            <React.Fragment>
            <Button variant="contained" color="primary" className={classes.buttonSelectFromList} {...bindTrigger(popupState)}>
                Выберите звание
            </Button>
            <Menu {...bindMenu(popupState)}>
                <MenuItem onClick={popupState.close}>Генерал-лейтенант</MenuItem>
                <MenuItem onClick={popupState.close}>Генерал-майор</MenuItem>
                <MenuItem onClick={popupState.close}>Полковник</MenuItem>
                <Link to='/listOfRanks'>
                    <MenuItem onClick={popupState.close}>Добавить звание</MenuItem>
                </Link>
            </Menu>
            </React.Fragment>
        )}
        </PopupState>
        <Button
        variant="contained"
        color="secondary"
        className={classes.saveButton}
        startIcon={<SaveIcon />}
      >
        Сохранить
      </Button>
        </div>
    )
}
