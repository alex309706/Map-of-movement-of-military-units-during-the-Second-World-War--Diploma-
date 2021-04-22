import {useStyles,TextField,SaveIcon,Button,Menu,MenuItem,Box,React} from './index';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import {Link} from 'react-router-dom';

const defaultProps = {
    bgcolor: 'background.paper',
    m: 1,
    border: 1,
  };

export default function AddActualData()
{
    const classes = useStyles();
    return(
        <Box borderRadius={16} {...defaultProps}> 
        <div >
        
        <PopupState variant="popover" >
        {(popupState) => (
            <React.Fragment>
            <Button variant="contained" color="secondary" className={classes.documentSelectButon} {...bindTrigger(popupState)}>
                Выбрать подразделение
            </Button>
            <Menu {...bindMenu(popupState)}>
                <MenuItem onClick={popupState.close}>1-я армия</MenuItem>
                <MenuItem onClick={popupState.close}>2-я армия</MenuItem>
                <MenuItem onClick={popupState.close}>3-я армия</MenuItem>
                <Link to='/listOfSubdivisions'>
                    <MenuItem onClick={popupState.close}>Добавить подразделение</MenuItem>
                </Link>
            </Menu>
            </React.Fragment>
        )}
        </PopupState>

        <PopupState variant="popover" >
        {(popupState) => (
        <React.Fragment>
        <Button variant="contained" color="secondary" className={classes.documentSelectButon} {...bindTrigger(popupState)}>
            Выбрать командира
        </Button>
        <Menu {...bindMenu(popupState)}>
            <MenuItem onClick={popupState.close}>Иванов И.И.</MenuItem>
            <MenuItem onClick={popupState.close}>Петров П.П.</MenuItem>
            <MenuItem onClick={popupState.close}>Сидоров С.С.</MenuItem>
            <Link to='/listOfCommanders'>
                <MenuItem onClick={popupState.close}>Добавить командира</MenuItem>
            </Link>
        </Menu>
        </React.Fragment>
        )}
        </PopupState>

         <PopupState variant="popover" >
        {(popupState) => (
            <React.Fragment>
            <Button variant="contained" color="secondary" className={classes.documentSelectButon} {...bindTrigger(popupState)}>
                Выбрать местоположение
            </Button>
            <Menu {...bindMenu(popupState)}>
                <MenuItem onClick={popupState.close}>Гродно</MenuItem>
                <MenuItem onClick={popupState.close}>Москва</MenuItem>
                <MenuItem onClick={popupState.close}>Минск</MenuItem>
                <Link to='/listOfLocations'>
                    <MenuItem onClick={popupState.close}>Добавить местоположение</MenuItem>
                </Link>
            </Menu>
            </React.Fragment>
        )}
        </PopupState>
          
         <PopupState variant="popover" >
        {(popupState) => (
            <React.Fragment>
            <Button variant="contained" color="secondary" className={classes.documentSelectButon} {...bindTrigger(popupState)}>
                Выбрать документ
            </Button>
            <Menu {...bindMenu(popupState)}>
                <MenuItem onClick={popupState.close}>Опись 1 дело 2</MenuItem>
                <MenuItem onClick={popupState.close}>Опись 3 дело 4</MenuItem>
                <MenuItem onClick={popupState.close}>Опись 5 дело 6</MenuItem>
                <MenuItem onClick={popupState.close}>Опись 7 дело 8</MenuItem>
                <Link to='/listOfDocuments'>
                    <MenuItem onClick={popupState.close}>Добавить документ</MenuItem>
                </Link>
            </Menu>
            </React.Fragment>
        )}
        </PopupState>
        <TextField className={classes.textField}
         variant="outlined"
         label ="Введите дату"
         type="date"
         defaultValue="1941-06-22"
         InputProps={{
            shrink: true,
          }}
         />

        <TextField className={classes.textField}
         variant="outlined"
         label ="Введите численность"
         />
      <Button
        variant="contained"
        color="primary"
        className={classes.saveButton}
        startIcon={<SaveIcon />}
      >
        Сохранить
      </Button>
        </div>
    </Box>
    )
}

